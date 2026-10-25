// Co giãn toàn bộ #app theo khung thiết kế 16:9 (1600x900) để chơi được trên
// mobile / iPad màn hình ngang mà bố cục không bị co cụm, đè lên nhau.
// - Màn hình >= khung thiết kế: giữ nguyên (scale = 1), bố cục giãn như cũ.
// - Màn hình nhỏ hơn: thu nhỏ đồng đều; chiều còn dư được trả lại cho bố cục.
// - Chừa vùng an toàn (tai thỏ / Dynamic Island / thanh home) trên iPhone.
// - iOS "Thêm vào MH chính" (standalone): lúc mở app, iOS báo sai kích thước và
//   không bắn resize -> đo lại nhiều lần sau khi khởi động / quay lại app.
const DESIGN_W = 1600;
const DESIGN_H = 900;
const COMPACT_W = 1000;
const COMPACT_H = 460;
const COMPACT_MQ = '(orientation: landscape) and (max-height: 500px) and (pointer: coarse)';

export function getUiScale() {
  return window.HK_UI_SCALE || 1;
}

export function isLayoutCompact() {
  return document.body.classList.contains('layout-compact');
}

function detectLayoutCompact() {
  const m = /[?&]compact=(1|0)\b/.exec(location.search);
  if (m) return m[1] === '1';
  return !!(window.matchMedia && window.matchMedia(COMPACT_MQ).matches);
}

const isStandalone = () =>
  window.navigator.standalone === true ||
  (window.matchMedia && window.matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches);

// Đọc env(safe-area-inset-*) qua 1 phần tử thăm dò
let probe = null;
function readSafeArea() {
  if (!probe) {
    probe = document.createElement('div');
    probe.style.cssText =
      'position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;pointer-events:none;' +
      'padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);';
    document.body.appendChild(probe);
  }
  const cs = getComputedStyle(probe);
  return {
    t: parseFloat(cs.paddingTop) || 0,
    r: parseFloat(cs.paddingRight) || 0,
    b: parseFloat(cs.paddingBottom) || 0,
    l: parseFloat(cs.paddingLeft) || 0
  };
}

// Bảng debug tạm thời (chỉ bật khi thêm ?debug=1 vào link)
let dbgEl = null, dbgSize = '', dbgTap = '';
function updateDebug(size, tap) {
  if (!dbgEl) return;
  if (size) dbgSize = size;
  if (tap) dbgTap = tap + ' | ' + dbgTap.split(' | ').slice(0, 3).join(' | ');
  dbgEl.textContent = dbgSize + '\n' + dbgTap;
}
function initDebug() {
  if (!/[?&]debug=1/.test(location.search)) return;
  dbgEl = document.createElement('pre');
  dbgEl.style.cssText = 'position:fixed;left:4px;bottom:4px;z-index:2147483647;margin:0;padding:4px 6px;' +
    'background:rgba(0,0,0,.75);color:#0f0;font:10px/1.3 monospace;pointer-events:none;white-space:pre-wrap;max-width:70vw;transform:translateZ(9999px)';
  document.body.appendChild(dbgEl);
  const name = (el) => el ? (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '')) : 'null';
  ['touchstart', 'touchend', 'pointerdown', 'click'].forEach((t) =>
    window.addEventListener(t, (e) => {
      const p = e.changedTouches ? e.changedTouches[0] : e;
      updateDebug(null, `${t}@${Math.round(p.clientX)},${Math.round(p.clientY)} ${name(e.target)} hit:${name(document.elementFromPoint(p.clientX, p.clientY))}`);
    }, { capture: true, passive: true }));
}

// iOS bản "Thêm vào MH chính": WebKit nhận touch/pointer nhưng KHÔNG sinh sự kiện click
// -> tự phát click khi chạm gọn (không kéo) và chặn click gốc để không bị bấm 2 lần.
function initStandaloneTapFix() {
  if (!isStandalone()) return;
  let sx = 0, sy = 0, st = 0, moved = false;
  window.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    sx = t.clientX; sy = t.clientY; st = Date.now(); moved = e.touches.length > 1;
  }, { capture: true, passive: true });
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (Math.abs(t.clientX - sx) > 10 || Math.abs(t.clientY - sy) > 10) moved = true;
  }, { capture: true, passive: true });
  window.addEventListener('touchend', (e) => {
    if (moved || e.touches.length || Date.now() - st > 800) return;
    const t = e.changedTouches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY) || e.target;
    if (!el || el.closest('input, textarea, select, [contenteditable="true"]')) return;
    e.preventDefault();
    el.dispatchEvent(new MouseEvent('click', {
      bubbles: true, cancelable: true, view: window,
      clientX: t.clientX, clientY: t.clientY, screenX: t.screenX, screenY: t.screenY
    }));
  }, { capture: true, passive: false });
}

// ---------------------------------------------------------------------------
// Chế độ đồ họa nhẹ (perf-low) cho iOS / điện thoại / tablet
// - Gắn class `perf-low` lên <body>; CSS (cuối main.css) tắt nghiêng 3D bàn chơi,
//   blur, drop-shadow, backdrop-filter, box-shadow động; chỉ animate transform/opacity.
// - Tự bật trên iOS/iPadOS và thiết bị có con trỏ chính là cảm ứng.
// - Người chơi đổi trong menu ⚙ (lưu localStorage) hoặc thử bằng link ?perf=low|high|auto.
// - Khi đổi chế độ bắn sự kiện `hk-perfmodechange` (detail: { low }) trên window.
// ---------------------------------------------------------------------------
const PERF_STORAGE_KEY = 'hanakoi_perf_mode'; // 'low' | 'high' (không có = tự động)

const isIOSDevice = () =>
  /iP(hone|ad|od)/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS báo là Mac

function detectPerfLow() {
  if (isIOSDevice()) return true;
  return !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
}

function readPerfPref() {
  try {
    const v = localStorage.getItem(PERF_STORAGE_KEY);
    return v === 'low' || v === 'high' ? v : 'auto';
  } catch (_) {
    return 'auto';
  }
}

export function getPerfModePref() {
  return readPerfPref();
}

export function isPerfLow() {
  return document.body.classList.contains('perf-low');
}

function applyPerfClass(low) {
  const changed = isPerfLow() !== low;
  document.body.classList.toggle('perf-low', low);
  window.HK_PERF_LOW = low;
  if (changed) window.dispatchEvent(new CustomEvent('hk-perfmodechange', { detail: { low } }));
}

// mode: 'low' | 'high' | 'auto'
export function setPerfMode(mode) {
  try {
    if (mode === 'low' || mode === 'high') localStorage.setItem(PERF_STORAGE_KEY, mode);
    else localStorage.removeItem(PERF_STORAGE_KEY);
  } catch (_) { /* private mode */ }
  applyPerfClass(mode === 'low' ? true : mode === 'high' ? false : detectPerfLow());
}

export function initPerfMode() {
  const m = /[?&]perf=(low|high|auto)\b/.exec(location.search);
  if (m) {
    setPerfMode(m[1]);
    return;
  }
  const pref = readPerfPref();
  applyPerfClass(pref === 'low' ? true : pref === 'high' ? false : detectPerfLow());
}

export function initViewportScaler() {
  initPerfMode();
  initDebug();
  initStandaloneTapFix();
  const root = document.documentElement;
  root.classList.toggle('hk-standalone', isStandalone());

  // Bước 6: chặn menu "Lưu ảnh" / kéo ảnh khi nhấn giữ lá bài trên iOS/iPadOS
  const preventCardMenu = (e) => {
    const t = e.target;
    if (t && t.closest && t.closest('.hana-card-3d, .mini-captured-card, .draw-pile-container, img.hanafuda-raster')) {
      e.preventDefault();
    }
  };
  window.addEventListener('contextmenu', preventCardMenu, { capture: true, passive: false });
  window.addEventListener('dragstart', preventCardMenu, { capture: true, passive: false });

  const apply = () => {
    let vw, vh;
    if (isStandalone()) {
      // Không có thanh địa chỉ: lấy kích thước lớn nhất đáng tin (iOS hay báo nhỏ lúc mở)
      vw = Math.max(window.innerWidth, root.clientWidth);
      vh = Math.max(window.innerHeight, root.clientHeight);
    } else {
      const vv = window.visualViewport;
      vw = vv ? Math.min(window.innerWidth, vv.width) : window.innerWidth;
      vh = vv ? Math.min(window.innerHeight, vv.height) : window.innerHeight;
    }
    const sa = readSafeArea();
    // Màn ngang: chỉ chừa 2 bên (tai thỏ) + đáy (thanh home), giữ mép trên sát màn hình
    vw = Math.floor(vw - sa.l - sa.r);
    vh = Math.floor(vh - sa.b);
    if (vw <= 0 || vh <= 0) return;

    const compact = detectLayoutCompact();
    const prevCompact = document.body.classList.contains('layout-compact');
    document.body.classList.toggle('layout-compact', compact);
    window.HK_COMPACT = compact;

    const designH = compact ? COMPACT_H : DESIGN_H;
    const designW = compact
      ? Math.min(COMPACT_W, Math.max(760, Math.round(COMPACT_H * (vw / vh))))
      : DESIGN_W;
    const scale = Math.min(1, vw / designW, vh / designH);
    root.style.setProperty('--ui-scale', String(scale));
    root.style.setProperty('--app-w', `${vw / scale}px`);
    root.style.setProperty('--app-h', `${vh / scale}px`);
    root.style.setProperty('--app-left', `${sa.l}px`);
    root.style.setProperty('--sa-l', `${sa.l}px`);
    root.style.setProperty('--sa-r', `${sa.r}px`);
    root.style.setProperty('--sa-b', `${sa.b}px`);
    root.classList.toggle('hk-scaled', scale < 1);
    window.HK_UI_SCALE = scale;
    if (prevCompact !== compact) {
      window.dispatchEvent(new CustomEvent('hk-compactchange', { detail: { compact } }));
    }
    // Trình duyệt mobile đôi khi tự cuộn trang khi ẩn/hiện thanh địa chỉ -> kéo về gốc
    if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
    updateDebug(`in ${innerWidth}x${innerHeight} | cl ${root.clientWidth}x${root.clientHeight} | vv ${window.visualViewport ? Math.round(visualViewport.width) + 'x' + Math.round(visualViewport.height) : '-'} | scr ${screen.width}x${screen.height} | sa ${sa.t},${sa.r},${sa.b},${sa.l} | app ${vw}x${vh} s${scale.toFixed(3)} ${compact ? 'compact' : 'full'} | perf ${isPerfLow() ? 'low' : 'high'}`);
  };

  // Đo lại vài lần sau khởi động / quay lại app (iOS standalone báo kích thước trễ)
  const applyBurst = () => {
    apply();
    [60, 250, 600, 1200, 2500].forEach((ms) => setTimeout(apply, ms));
  };

  if (!document.getElementById('hk-rotate-hint')) {
    const hint = document.createElement('div');
    hint.id = 'hk-rotate-hint';
    hint.setAttribute('role', 'alert');
    const icon = document.createElement('div');
    icon.className = 'hk-rotate-icon';
    icon.textContent = '📱';
    const text = document.createElement('p');
    text.textContent = 'Xoay ngang để chơi';
    const sub = document.createElement('span');
    sub.textContent = '横向きにしてください';
    hint.append(icon, text, sub);
    document.body.appendChild(hint);
  }

  applyBurst();
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', applyBurst);
  window.addEventListener('pageshow', applyBurst);
  window.addEventListener('load', applyBurst);
  if (window.matchMedia) {
    const mq = window.matchMedia(COMPACT_MQ);
    if (mq.addEventListener) mq.addEventListener('change', applyBurst);
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) applyBurst();
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', apply);
    window.visualViewport.addEventListener('scroll', apply);
  }

  // Toàn màn hình ở lần chạm đầu (iPad Safari, Android). iPhone Safari không hỗ trợ
  // -> dùng "Thêm vào Màn hình chính" để mở không có thanh địa chỉ.
  const goFullscreen = () => {
    if (isStandalone() || document.fullscreenElement || document.webkitFullscreenElement) return;
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (!req) return;
    try {
      const p = req.call(el, { navigationUI: 'hide' });
      if (p && p.catch) p.catch(() => {});
    } catch (_) { /* không hỗ trợ */ }
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {});
    }
  };
  if (matchMedia('(pointer: coarse)').matches) {
    window.addEventListener('touchend', goFullscreen, { once: true, passive: true });
  }
  document.addEventListener('fullscreenchange', applyBurst);
  document.addEventListener('webkitfullscreenchange', applyBurst);
}
