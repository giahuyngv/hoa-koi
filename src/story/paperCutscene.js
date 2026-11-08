/* Cutscene "kịch cắt giấy" (kamishibai) trước trận Cốt truyện.
   Kịch bản là dữ liệu (src/data/storyCutscenes.js): các lớp ảnh, rối giấy nhiều khớp, track chuyển động (Web Animations API), phụ đề.
   Sân khấu cố định 1600x900, tự co theo khung cha. Chạy riêng ngoài vòng render() của StoryController (render lại không giết anim).
   Dùng: const cs = playPaperCutscene(hostEl, script, { onDone, lite }); cs.skip(); cs.isActive()
   - Chạm sân khấu: tua nhanh x3 (chạm lần nữa về x1). Nút "Bỏ qua" / Esc / Enter: kết thúc ngay.
   - lite (perf-low / giảm chuyển động): bỏ hạt rơi + các track có `fx: true`. */
// Hằng số để trong hàm: bundle IIFE gộp chung scope.
export function playPaperCutscene(host, script, opt = {}) {
  const SW = 1600, SH = 900;
  const lite = !!opt.lite;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const base = script.base || '';
  const ver = script.ver ? `?v=${script.ver}` : '';
  const px = (n) => `${n}px`;

  const root = document.createElement('div');
  root.className = 'pc-root';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-label', script.title || 'Cutscene');
  const stage = document.createElement('div');
  stage.className = 'pc-stage';
  root.appendChild(stage);
  const world = document.createElement('div');
  world.className = 'pc-world';
  stage.appendChild(world);

  const nodes = {}; // id -> element (đích của track); id/sway -> lớp lắc lư bên trong
  const actors = []; // { el, d } cho thị sai
  const mkImg = (src, w, h) => {
    const im = document.createElement('img');
    im.src = base + src + ver;
    im.alt = '';
    im.decoding = 'async';
    im.draggable = false;
    im.style.width = px(w);
    if (h) im.style.height = px(h);
    return im;
  };
  // Mỗi actor: .pc-actor (vị trí + track di chuyển) > .pc-sway (lắc lư) > nội dung
  const mkActor = (a) => {
    const el = document.createElement('div');
    el.className = 'pc-actor' + (a.cls ? ` ${a.cls}` : '');
    el.style.left = px(a.x || 0);
    el.style.top = px(a.y || 0);
    el.style.zIndex = a.z || 0;
    // Độ sâu lớp giấy: z càng lớn càng gần -> bóng đổ dài hơn, thị sai mạnh hơn; lớp xa (z 1-2) phủ sương
    el.style.setProperty('--pc-d', String(a.z || 0));
    if ((a.z || 0) > 0 && (a.z || 0) <= 2) el.classList.add('is-far');
    actors.push({ el, d: a.z || 0 });
    const sway = document.createElement('div');
    sway.className = 'pc-sway';
    if (a.origin) sway.style.transformOrigin = a.origin;
    if (a.scale) { sway.style.scale = String(a.scale); }
    el.appendChild(sway);
    nodes[a.id] = el;
    nodes[`${a.id}/sway`] = sway;
    return { el, sway };
  };

  // Lớp ảnh phẳng
  (script.layers || []).forEach((L) => {
    const { el, sway } = mkActor(L);
    sway.appendChild(mkImg(L.src, L.w, L.h));
    world.appendChild(el);
  });
  // Rối giấy: parts lồng nhau theo `parent`, mỗi part xoay quanh pivot [px,py] (toạ độ trong ảnh của part)
  (script.rigs || []).forEach((R) => {
    const { el, sway } = mkActor(R);
    const box = document.createElement('div');
    box.className = 'pc-rig';
    box.style.transform = `scale(${R.k || 1})${R.flip ? ' scaleX(-1)' : ''}`;
    sway.appendChild(box);
    const partEl = {};
    R.parts.forEach((p) => {
      const j = document.createElement('div');
      j.className = 'pc-part';
      j.style.left = px(p.at[0]);
      j.style.top = px(p.at[1]);
      j.style.zIndex = p.z || 0;
      j.style.transformOrigin = `${p.pivot[0]}px ${p.pivot[1]}px`;
      if (p.rot) j.style.transform = `rotate(${p.rot}deg)`; // góc nghỉ (track sau sẽ ghi đè)
      j.appendChild(mkImg(p.src, p.w, p.h));
      (p.parent ? partEl[p.parent] : box).appendChild(j);
      partEl[p.id] = j;
      nodes[`${R.id}.${p.id}`] = j;
    });
    world.appendChild(el);
  });

  // Hạt rơi (tuyết / cánh hoa giấy)
  if (script.particles && !lite) {
    const P = script.particles;
    for (let i = 0; i < (P.count || 18); i++) {
      const f = document.createElement('i');
      f.className = `pc-flake ${P.cls || ''}`;
      f.style.left = px(Math.random() * SW);
      f.style.top = px(-40);
      const s = 8 + Math.random() * 12;
      f.style.width = px(s);
      f.style.height = px(s * (0.6 + Math.random() * 0.5));
      world.appendChild(f);
      if (P.rain) { // mưa: rơi thẳng xiên nhanh, không xoay
        const rd = 650 + Math.random() * 350;
        f.animate([{ transform: 'translate(0,0) rotate(12deg)' }, { transform: `translate(-${SH * 0.21}px, ${SH + 80}px) rotate(12deg)` }],
          { duration: rd, delay: Math.random() * rd * 3, iterations: Infinity, easing: 'linear' });
        continue;
      }
      const dx = (Math.random() - 0.5) * 260;
      const dur = (7000 + Math.random() * 6000) * (P.slow || 1);
      f.animate([
        { transform: 'translate(0,0) rotate(0deg)' },
        { transform: `translate(${dx * 0.5}px, ${SH * 0.5}px) rotate(${180 + Math.random() * 180}deg)` },
        { transform: `translate(${dx}px, ${SH + 80}px) rotate(${360 + Math.random() * 360}deg)` }
      ], { duration: dur, delay: Math.random() * dur, iterations: Infinity, easing: 'linear' });
    }
  }

  // Phụ đề (dải giấy phía dưới) + khung gỗ kamishibai + 2 cánh cửa
  // Quầng đèn chân sân khấu hắt lên từ mép sàn
  const light = document.createElement('div');
  light.className = 'pc-light';
  light.innerHTML = '<i class="pc-foot"></i>';
  world.appendChild(light);
  const capWrap = document.createElement('div');
  capWrap.className = 'pc-caps';
  world.appendChild(capWrap);
  const capEls = (script.captions || []).map((c) => {
    const d = document.createElement('div');
    d.className = 'pc-cap' + (c.who ? ' has-who' : '');
    d.innerHTML = `${c.who ? `<b>${esc(c.who)}</b>` : ''}<p>${esc(c.text)}</p>${c.jp ? `<span lang="ja">${esc(c.jp)}</span>` : ''}`;
    capWrap.appendChild(d);
    return d;
  });
  const frame = document.createElement('div');
  frame.className = 'pc-frame';
  frame.innerHTML = `<div class="pc-door is-l"><span lang="ja">${esc(script.doorL || '')}</span></div><div class="pc-door is-r"><span lang="ja">${esc(script.doorR || '')}</span></div><div class="pc-apron"></div>${script.title ? `<div class="pc-title"><small>${esc(script.kicker || '')}</small><b>${esc(script.title)}</b></div>` : ''}`;
  stage.appendChild(frame);
  const ui = document.createElement('div');
  ui.className = 'pc-ui';
  ui.innerHTML = '<span class="pc-ff" aria-hidden="true">▸▸ x3</span><button type="button" class="tut-skip-btn pc-skip" data-pc-skip>Bỏ qua ▸</button>';
  root.appendChild(ui);
  host.appendChild(root);

  // Co sân khấu 1600x900 vừa khung cha (contain)
  const fit = () => {
    const w = root.clientWidth || SW, h = root.clientHeight || SH;
    const s = Math.min(w / SW, h / SH);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  };
  fit();
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
  if (ro) ro.observe(root); else window.addEventListener('resize', fit);

  // ---- Dòng thời gian ----
  const anims = [];
  // Tạo ở trạng thái dừng, chờ ảnh giải mã xong mới chạy (tránh mảnh giấy hiện muộn sau khi cửa mở)
  const run = (el, kf, o) => { const a = el.animate(kf, o); a.pause(); anims.push(a); return a; };
  const T = (s) => Math.round(s * 1000);
  const total = script.duration || 15;
  const OPEN = script.open ?? 1.1, CLOSE = 0.9;
  const doors = frame.querySelectorAll('.pc-door');
  const title = frame.querySelector('.pc-title');
  // Cửa mở / đóng
  run(doors[0], [{ transform: 'translateX(0)' }, { transform: 'translateX(-102%)' }], { duration: 900, delay: T(OPEN), fill: 'both', easing: 'cubic-bezier(.6,0,.3,1)' });
  run(doors[1], [{ transform: 'translateX(0)' }, { transform: 'translateX(102%)' }], { duration: 900, delay: T(OPEN), fill: 'both', easing: 'cubic-bezier(.6,0,.3,1)' });
  run(doors[0], [{ transform: 'translateX(-102%)' }, { transform: 'translateX(0)' }], { duration: T(CLOSE), delay: T(total), fill: 'forwards', easing: 'cubic-bezier(.6,0,.3,1)' });
  run(doors[1], [{ transform: 'translateX(102%)' }, { transform: 'translateX(0)' }], { duration: T(CLOSE), delay: T(total), fill: 'forwards', easing: 'cubic-bezier(.6,0,.3,1)' });
  if (title) run(title, [{ opacity: 0, transform: 'translate(-50%,-40%)' }, { opacity: 1, transform: 'translate(-50%,-50%)', offset: 0.25 }, { opacity: 1, offset: 0.75 }, { opacity: 0, transform: 'translate(-50%,-60%)' }], { duration: T(OPEN + 0.6), fill: 'both' });
  // Máy quay trôi chậm sang phải: lớp gần dịch nhiều hơn lớp xa (thị sai) -> thấy rõ các lớp giấy tách nhau.
  // Dùng thuộc tính `translate` riêng nên không đụng `transform` của track.
  if (!lite) {
    actors.forEach(({ el, d }) => {
      if (!d) return;
      run(el, [{ translate: `${d * 5}px 0` }, { translate: `${-d * 9}px ${-d * 1.2}px` }], { duration: T(total), fill: 'both', easing: 'ease-in-out' });
    });
  }
  // Track: { at, id, kf, dur, ease, iter, dir, fx }. Track đầu của mỗi phần tử fill 'both' (giữ trạng thái ban đầu trước khi chạy).
  const seen = new Set();
  (script.tracks || []).forEach((t) => {
    if (lite && t.fx) return;
    const el = nodes[t.id];
    if (!el) return;
    const first = !seen.has(t.id);
    seen.add(t.id);
    run(el, t.kf, {
      duration: T(t.dur || 1),
      delay: T(t.at || 0),
      iterations: t.iter === 'inf' ? Infinity : (t.iter || 1),
      direction: t.dir || 'normal',
      easing: t.ease || 'ease-in-out',
      fill: first ? 'both' : 'forwards'
    });
  });
  capEls.forEach((d, i) => {
    const c = script.captions[i];
    run(d, [
      { opacity: 0, transform: 'translateY(16px)' },
      { opacity: 1, transform: 'translateY(0)', offset: 0.1 },
      { opacity: 1, transform: 'translateY(0)', offset: 0.9 },
      { opacity: 0, transform: 'translateY(-8px)' }
    ], { duration: T(c.dur), delay: T(c.at), fill: 'both', easing: 'ease-out' });
  });
  // Âm thanh theo mốc: { at, fn: tên hàm soundEngine }
  const cues = (script.cues || []).map((c) => ({ ...c, done: false }));
  // Đồng hồ chủ: kết thúc khi anim này xong (tua nhanh dùng chung playbackRate)
  const clock = run(root, [{ opacity: 1 }, { opacity: 1 }], { duration: T(total + CLOSE + 0.15) });
  let rate = 1, done = false, raf = 0;
  const tickCues = () => {
    const t = (clock.currentTime || 0) / 1000;
    cues.forEach((c) => { if (!c.done && t >= c.at) { c.done = true; try { opt.onCue && opt.onCue(c); } catch (e) { /* bỏ qua */ } } });
    if (!done) raf = requestAnimationFrame(tickCues);
  };
  const imgs = Array.from(world.querySelectorAll('img'));
  const ready = Promise.all(imgs.map((im) => (im.decode ? im.decode().catch(() => {}) : Promise.resolve())));
  Promise.race([ready, new Promise((r) => setTimeout(r, 2500))]).then(() => {
    if (done) return;
    anims.forEach((x) => x.play());
    raf = requestAnimationFrame(tickCues);
  });

  const finish = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    if (ro) ro.disconnect(); else window.removeEventListener('resize', fit);
    document.removeEventListener('keydown', onKey, true);
    root.style.pointerEvents = 'none';
    root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' }).onfinish = () => {
      anims.forEach((a) => a.cancel());
      root.remove();
    };
    opt.onDone && opt.onDone();
  };
  clock.onfinish = finish;
  const setRate = (r) => {
    rate = r;
    anims.forEach((a) => { a.playbackRate = r; });
    root.classList.toggle('is-ff', r > 1);
  };
  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-pc-skip]')) { finish(); return; }
    setRate(rate > 1 ? 1 : 3);
  });
  const onKey = (e) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (e.key === ' ') setRate(rate > 1 ? 1 : 3); else finish();
    }
  };
  document.addEventListener('keydown', onKey, true);

  return { skip: finish, isActive: () => !done };
}
