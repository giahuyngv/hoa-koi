// Co giãn toàn bộ #app theo khung thiết kế 16:9 (1600x900) để chơi được trên
// mobile / iPad màn hình ngang mà bố cục không bị co cụm, đè lên nhau.
// - Màn hình >= khung thiết kế: giữ nguyên (scale = 1), bố cục giãn như cũ.
// - Màn hình nhỏ hơn: thu nhỏ đồng đều; chiều còn dư được trả lại cho bố cục
//   (iPad 4:3 cao hơn, điện thoại 19.5:9 rộng hơn) nên không có viền đen.
const DESIGN_W = 1600;
const DESIGN_H = 900;

export function getUiScale() {
  return window.HK_UI_SCALE || 1;
}

export function initViewportScaler() {
  const root = document.documentElement;

  const apply = () => {
    // visualViewport chuẩn hơn innerHeight trên iOS Safari / Chrome Android khi thanh địa chỉ hiện
    const vv = window.visualViewport;
    const vw = Math.floor(vv ? Math.min(window.innerWidth, vv.width) : window.innerWidth);
    const vh = Math.floor(vv ? Math.min(window.innerHeight, vv.height) : window.innerHeight);
    if (!vw || !vh) return;
    const scale = Math.min(1, vw / DESIGN_W, vh / DESIGN_H);
    root.style.setProperty('--ui-scale', String(scale));
    root.style.setProperty('--app-w', `${vw / scale}px`);
    root.style.setProperty('--app-h', `${vh / scale}px`);
    root.classList.toggle('hk-scaled', scale < 1);
    window.HK_UI_SCALE = scale;
    // Trình duyệt mobile đôi khi tự cuộn trang khi ẩn/hiện thanh địa chỉ -> kéo về gốc
    if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
  };

  if (!document.getElementById('hk-rotate-hint')) {
    const hint = document.createElement('div');
    hint.id = 'hk-rotate-hint';
    hint.setAttribute('role', 'alert');
    const icon = document.createElement('div');
    icon.className = 'hk-rotate-icon';
    icon.textContent = '📱';
    const text = document.createElement('p');
    text.textContent = 'Xoay ngang thiết bị để chơi';
    const sub = document.createElement('span');
    sub.textContent = '横向きにしてください';
    hint.append(icon, text, sub);
    document.body.appendChild(hint);
  }

  apply();
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', () => setTimeout(apply, 250));
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', apply);
    window.visualViewport.addEventListener('scroll', apply);
  }
}
