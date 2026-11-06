// Avatar động đối thủ (khung chân dung bên trái)
// - Mỗi đối thủ có 3 clip MP4 xếp dọc: trên = màu, dải đen 16px, dưới = alpha (cao 2H+16), 24fps, không tiếng
// - Chỉ nạp 3 clip của đối thủ đang đấu, qua fetch -> blob URL (server không hỗ trợ Range nên không tua được src trực tiếp)
// - Ghép alpha bằng WebGL (premultiplied), idle lặp; phản ứng laugh/angry hoà 0,2s rồi về idle từ khung 0
// - perf-low, không có WebGL, lỗi nạp/phát, mất context -> giữ ảnh tĩnh như cũ
// - Canvas tồn tại lâu dài, được gắn lại vào slot sau mỗi lần renderLeftPanel vẽ lại markup

const CLIP_BASE = 'public/assets/characters/video/';
const CLIP_VER = '3';
const BAND = 16;
const FADE_MS = 200;
const CLIPS = ['idle', 'laugh', 'angry'];

const VS = 'attribute vec2 p;varying vec2 uv;void main(){uv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0,1);}';
// uMap = (colorScale, colorOffset, alphaScale, alphaOffset) theo trục v cho từng texture
const FS =
  'precision mediump float;varying vec2 uv;uniform sampler2D a,b;uniform vec4 ma,mb;uniform float t;' +
  'vec4 s(sampler2D x,vec4 m){vec3 c=texture2D(x,vec2(uv.x,m.y+uv.y*m.x)).rgb;' +
  'float al=texture2D(x,vec2(uv.x,m.w+uv.y*m.z)).r;return vec4(c*al,al);}' +
  'void main(){gl_FragColor=t>=1.0?s(b,mb):mix(s(a,ma),s(b,mb),t);}';

function isPerfLow() {
  return document.body.classList.contains('perf-low');
}

class OpponentVideoAvatar {
  constructor() {
    this.id = null;
    this.videos = null; // { idle, laugh, angry }
    this.urls = [];
    this.badIds = new Set();
    this.blobCache = new Map(); // '<id>_<clip>' -> Promise<Blob>
    this.loadToken = 0;
    this.canvas = null;
    this.gl = null;
    this.failed = false; // lỗi WebGL vĩnh viễn trong phiên
    this.ready = false; // đã vẽ khung đầu
    this.cur = 'idle';
    this.prev = null;
    this.fadeStart = 0;
    this.pendingSwitch = 0;
    this.raf = 0;
    this.card = null;
    this.lastTimes = { a: -1, b: -1 };
    this._tick = (now) => this.draw(now);
    this._onVis = () => this.syncRunning();
    document.addEventListener('visibilitychange', this._onVis);
    try {
      new MutationObserver(() => this.onPerfChange()).observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });
    } catch (_) {}
    this._wasPerfLow = isPerfLow();
  }

  get enabled() {
    return !this.failed && !isPerfLow() && location.protocol !== 'file:';
  }

  restUrl(id) {
    return `${CLIP_BASE}${id}_idle_rest.webp?v=${CLIP_VER}`;
  }

  onPerfChange() {
    const low = isPerfLow();
    if (low === this._wasPerfLow) {
      this.syncRunning(); // mở/đóng màn chính (hk-story-open) -> dừng/chạy video
      return;
    }
    this._wasPerfLow = low;
    if (low) this.teardown();
    else if (this.card && this.card.isConnected) this.attach(this.card, this.wantId);
  }

  // Gọi sau mỗi lần renderLeftPanel; card = .opponent-vn-card, id = id đối thủ (null nếu không có clip)
  attach(card, id) {
    if (!card) return;
    this.card = card;
    this.wantId = id;
    if (!id || !this.enabled || this.badIds.has(id)) {
      this.markCard(false);
      if (this.id && this.id !== id) this.teardown();
      return;
    }
    if (!this.initGL()) {
      this.markCard(false);
      return;
    }
    if (id !== this.id) this.load(id); // load() gọi teardown -> phải chạy trước khi gắn canvas
    const slot = card.querySelector('.opp-anim-slot');
    if (slot && this.canvas.parentNode !== slot) slot.appendChild(this.canvas);
    this.markCard(this.ready);
    this.syncRunning();
  }

  markCard(on) {
    const card = this.card;
    if (!card) return;
    card.classList.toggle('has-anim-avatar', !!on);
    card.classList.toggle('anim-avatar-loading', !on && !!this.id && this.enabled);
    const slot = card.querySelector('.opp-anim-slot');
    if (slot && this.id) {
      const url = this.restUrl(this.id);
      if (slot.dataset.rest !== url) {
        slot.dataset.rest = url;
        // khung chờ (nhân vật cắt nền) + nền cảnh trống vẽ lại riêng từng nhân vật
        // URL tuyệt đối: url() trong biến CSS được phân giải theo file .css, không theo trang
        const abs = (p) => new URL(p, document.baseURI).href;
        slot.style.setProperty('--opp-rest', `url("${abs(url)}")`);
        slot.style.setProperty('--opp-bg', `url("${abs(`${CLIP_BASE}${this.id}_bg.webp?v=${CLIP_VER}`)}")`);
      }
    }
  }

  initGL() {
    if (this.gl) return true;
    if (this.failed) return false;
    const cv = document.createElement('canvas');
    cv.className = 'opp-anim-canvas';
    cv.width = 400;
    cv.height = 600;
    const gl = cv.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) {
      this.failed = true;
      return false;
    }
    const sh = (type, src) => {
      const o = gl.createShader(type);
      gl.shaderSource(o, src);
      gl.compileShader(o);
      return o;
    };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      this.failed = true;
      return false;
    }
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tex = (unit) => {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return t;
    };
    this.texA = tex(0);
    this.texB = tex(1);
    gl.uniform1i(gl.getUniformLocation(pr, 'a'), 0);
    gl.uniform1i(gl.getUniformLocation(pr, 'b'), 1);
    this.uT = gl.getUniformLocation(pr, 't');
    this.uMa = gl.getUniformLocation(pr, 'ma');
    this.uMb = gl.getUniformLocation(pr, 'mb');
    cv.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.failed = true;
      this.teardown();
    });
    this.canvas = cv;
    this.gl = gl;
    return true;
  }

  // Tải 1 clip (Blob), nhớ theo đối thủ để đổi qua lại / tải trước không phải tải lại
  fetchClip(id, name) {
    const key = `${id}_${name}`;
    let p = this.blobCache.get(key);
    if (!p) {
      p = fetch(`${CLIP_BASE}${key}.mp4?v=${CLIP_VER}`).then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return new Blob([await res.arrayBuffer()], { type: 'video/mp4' });
      });
      p.catch(() => this.blobCache.delete(key));
      this.blobCache.set(key, p);
      // Giữ tối đa 4 đối thủ (12 clip) trong bộ nhớ
      while (this.blobCache.size > 12) this.blobCache.delete(this.blobCache.keys().next().value);
    } else {
      this.blobCache.delete(key);
      this.blobCache.set(key, p);
    }
    return p;
  }

  // Tải trước clip của đối thủ (màn loading, hội thoại cốt truyện, chọn đối thủ)
  preload(id) {
    if (!id || !this.enabled || this.badIds.has(id)) return;
    CLIPS.forEach((name) => this.fetchClip(id, name).catch(() => {}));
  }

  makeVideo(name, blob) {
    const url = URL.createObjectURL(blob);
    this.urls.push(url);
    const v = document.createElement('video');
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('muted', '');
    v.preload = 'auto';
    v.loop = name === 'idle';
    v.src = url;
    v.addEventListener('error', () => this.fail());
    if (name !== 'idle') v.addEventListener('ended', () => this.play('idle'));
    return v;
  }

  async load(id) {
    this.teardown(true);
    this.id = id;
    const token = ++this.loadToken;
    this.preload(id); // 3 clip tải song song
    try {
      // Clip idle về là chạy ngay; cười / bực gắn thêm khi tải xong
      const idle = await this.fetchClip(id, 'idle');
      if (token !== this.loadToken) return;
      this.videos = { idle: this.makeVideo('idle', idle) };
      this.cur = 'idle';
      this.prev = null;
      this.markCard(false);
      this.syncRunning();
      await Promise.all(
        CLIPS.filter((n) => n !== 'idle').map(async (name) => {
          const blob = await this.fetchClip(id, name);
          if (token !== this.loadToken || !this.videos) return;
          this.videos[name] = this.makeVideo(name, blob);
        })
      );
    } catch (err) {
      if (token === this.loadToken) this.fail();
    }
  }

  // Xoá khung cũ còn đọng trên canvas (tránh hiện avatar đối thủ trước khi đổi đối thủ)
  clearCanvas() {
    const gl = this.gl;
    if (!gl) return;
    try {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    } catch (_) {}
  }

  fail() {
    if (this.id) this.badIds.add(this.id); // không thử lại trong phiên -> tránh vòng lặp nạp lỗi
    this.teardown();
    this.markCard(false);
  }

  // keepId = true khi đang chuyển sang đối thủ khác (load sẽ đặt lại id)
  teardown(keepId) {
    this.loadToken++;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    if (this.videos) {
      Object.values(this.videos).forEach((v) => {
        try {
          v.pause();
          v.removeAttribute('src');
          v.load();
        } catch (_) {}
      });
    }
    this.urls.forEach((u) => URL.revokeObjectURL(u));
    this.urls = [];
    this.videos = null;
    this.ready = false;
    this.prev = null;
    this.cur = 'idle';
    this.switchingTo = null;
    this.lastTimes = { a: -1, b: -1 };
    if (!keepId) this.id = null;
    if (this.card) {
      this.card.classList.remove('has-anim-avatar', 'anim-avatar-loading');
    }
    this.clearCanvas();
    if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }

  shouldRun() {
    return (
      !!this.videos &&
      !!this.canvas &&
      this.canvas.isConnected &&
      this.canvas.getClientRects().length > 0 && // layout-compact ẩn #left-panel
      document.visibilityState === 'visible' &&
      !document.body.classList.contains('hk-story-open') &&
      this.enabled
    );
  }

  syncRunning() {
    if (this.shouldRun()) {
      const v = this.videos[this.cur];
      if (v.paused) v.play().catch(() => {});
      if (!this.raf) this.raf = requestAnimationFrame(this._tick);
    } else {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
      if (this.videos) Object.values(this.videos).forEach((v) => v.pause());
    }
  }

  // name: 'laugh' | 'angry' | 'idle'
  play(name) {
    if (!this.videos || !this.videos[name] || !this.shouldRun()) return;
    if (name !== 'idle' && (this.cur !== 'idle' || this.switchingTo)) return; // không chồng phản ứng
    if (name === this.cur || name === this.switchingTo) return;
    this.switchingTo = name;
    const v = this.videos[name];
    const token = ++this.pendingSwitch;
    const start = () => {
      if (token !== this.pendingSwitch || !this.videos || this.cur === name) return;
      this.switchingTo = null;
      if (this.prev && this.prev !== this.cur) this.videos[this.prev].pause();
      this.prev = this.cur;
      this.cur = name;
      this.fadeStart = performance.now();
      this.lastTimes = { a: -1, b: -1 };
    };
    v.pause();
    const go = () => {
      v.play()
        .then(() => {
          // chờ khung mới thật sự lên rồi mới hoà; dự phòng 250ms nếu callback không tới
          if (typeof v.requestVideoFrameCallback === 'function') v.requestVideoFrameCallback(start);
          setTimeout(start, 250);
        })
        .catch(() => start());
    };
    if (v.currentTime > 0.001) {
      v.addEventListener('seeked', go, { once: true });
      v.currentTime = 0;
    } else {
      go();
    }
  }

  mapFor(v) {
    const T = v.videoHeight;
    const H = (T - BAND) / 2;
    const half = 0.5 / T; // lùi nửa texel để LINEAR không ăn vào dải đen
    const cs = (H - 1) / T;
    return [cs, half, cs, (H + BAND) / T + half];
  }

  upload(tex, unit, v, key) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    if (this.lastTimes[key] === v.currentTime) return;
    this.lastTimes[key] = v.currentTime;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, v);
  }

  draw(now) {
    this.raf = 0;
    if (!this.shouldRun()) {
      this.syncRunning(); // rời màn trận / ẩn tab -> dừng video
      return;
    }
    const gl = this.gl;
    const B = this.videos[this.cur];
    let t = 1;
    if (this.prev) {
      t = Math.min(1, (now - this.fadeStart) / FADE_MS);
      if (t >= 1) {
        this.videos[this.prev].pause();
        this.prev = null;
        this.lastTimes.a = -1;
      }
    }
    // idle lặp mà bị trình duyệt dừng ngầm -> phát lại
    if (this.cur === 'idle' && !this.switchingTo && B.paused) B.play().catch(() => {});
    // Dự phòng: có trình duyệt không bắn 'ended' -> tự về idle khi phản ứng chạm cuối
    if (this.cur !== 'idle' && !this.prev && B.duration && B.currentTime >= B.duration - 0.05) {
      this.play('idle');
    }
    const A = this.prev ? this.videos[this.prev] : null;
    if (B.readyState >= 2 && (!A || A.readyState >= 2) && B.videoHeight > BAND) {
      const H = (B.videoHeight - BAND) / 2;
      if (this.canvas.width !== B.videoWidth || this.canvas.height !== H) {
        this.canvas.width = B.videoWidth;
        this.canvas.height = H;
      }
      try {
        if (A) {
          this.upload(this.texA, 0, A, 'a');
          gl.uniform4fv(this.uMa, this.mapFor(A));
        }
        this.upload(this.texB, 1, B, 'b');
        gl.uniform4fv(this.uMb, this.mapFor(B));
        gl.uniform1f(this.uT, A ? t : 1);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!this.ready) {
          this.ready = true;
          this.markCard(true);
        }
      } catch (_) {
        this.fail();
        return;
      }
    }
    this.raf = requestAnimationFrame(this._tick);
  }
}

export const opponentVideoAvatar = new OpponentVideoAvatar();
// Móc thử nhanh trong console: __hkOppAnim.play('laugh' | 'angry')
window.__hkOppAnim = opponentVideoAvatar;
