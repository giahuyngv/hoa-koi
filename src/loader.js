// Màn hình loading (#hk-loader trong index.html). File riêng, KHÔNG inline: CSP của server.js là script-src 'self' nên script inline bị chặn → kẹt loading.
document.documentElement.classList.add('hk-booting');
// Loading: mỗi lần chọn ngẫu nhiên 1 bộ Yaku, lá lật dần theo tiến độ tải thật (ảnh, bundle, font, window load)
(function () {
  var L = document.getElementById('hk-loader'), $ = function (id) { return document.getElementById(id); };
  var saved = null; try { saved = localStorage.getItem('hanakoi_theme_mode'); } catch (e) {}
  var night = saved ? saved === 'dark' : !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  if (night) L.classList.add('night');
  var YAKU = [
    ['五光', 'Gokō', 'Ngũ Quang', [1, 9, 29, 41, 45]],
    ['猪鹿蝶', 'Ino-Shika-Chō', 'Trư · Lộc · Điệp', [21, 25, 37]],
    ['赤短', 'Akatan', 'Xích Đan · Ba dải thơ đỏ', [2, 6, 10]],
    ['青短', 'Aotan', 'Thanh Đan · Ba dải xanh', [22, 34, 38]],
    ['花見酒', 'Hanami-zake', 'Hoa Kiến Tửu · Ngắm hoa uống rượu', [9, 33]],
    ['月見酒', 'Tsukimi-zake', 'Nguyệt Kiến Tửu · Ngắm trăng uống rượu', [29, 33]]
  ];
  var MSG = ['Đang xào bài…', 'Đang chia bài…', 'Đang thắp đèn lồng…', 'Đang pha trà…', 'Sắp vào trận…'];
  var y = YAKU[Math.floor(Math.random() * YAKU.length)];
  var back = './public/assets/backs/back_urushi_red.webp?v=26';
  $('hkl-cards').innerHTML = y[3].map(function (id) {
    return '<div class="hkl-card"><img src="' + back + '" alt=""><img class="face" src="./public/assets/cards/card_' + id + '.webp?v=26" alt=""></div>';
  }).join('');
  $('hkl-jp').innerHTML = y[0] + '<i>' + y[1] + '</i>';
  $('hkl-vi').textContent = y[2];
  var cards = [].slice.call(L.querySelectorAll('.hkl-card'));

  // Tiến độ thật: ảnh loading 25 · app khởi tạo 45 · font 10 · window load 20
  var target = 0, p = 0, done = { app: 0, font: 0, load: 0 }, imgs = L.querySelectorAll('img'), imgLeft = imgs.length;
  function recalc() { target = 25 * (1 - imgLeft / imgs.length) + (done.app ? 45 : 0) + (done.font ? 10 : 0) + (done.load ? 20 : 0); }
  [].forEach.call(imgs, function (im) {
    var f = function () { imgLeft--; recalc(); };
    if (im.complete) f(); else { im.addEventListener('load', f, { once: true }); im.addEventListener('error', f, { once: true }); }
  });
  document.addEventListener('DOMContentLoaded', function () { done.app = 1; recalc(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { done.font = 1; recalc(); }); else done.font = 1;
  window.addEventListener('load', function () { done.load = 1; done.app = 1; recalc(); });
  setTimeout(function () { done.app = done.font = done.load = 1; imgLeft = 0; recalc(); }, 15000); // chống kẹt

  var finished = false;
  function tick() {
    var cap = Math.min(99, target + 6); // nhích chậm trong lúc chờ mốc tiếp theo
    if (p < target) p = Math.min(target, p + Math.max(0.7, (target - p) * 0.08));
    else if (p < cap) p += 0.05;
    if (target >= 100) p = Math.min(100, p);
    $('hkl-fill').style.width = p + '%';
    $('hkl-pct').textContent = Math.floor(p) + '%';
    $('hkl-msg').textContent = p >= 100 ? 'Sẵn sàng!' : MSG[Math.min(MSG.length - 1, Math.floor(p / 100 * MSG.length))];
    var n = Math.floor(p / 100 * cards.length + 1e-9);
    cards.forEach(function (c, i) { c.classList.toggle('on', i < n); });
    if (p >= 100 && !finished) { finished = true; return finish(); }
    requestAnimationFrame(tick);
  }
  function finish() {
    cards.forEach(function (c) { c.classList.add('done'); });
    setTimeout(function () {
      L.classList.add('out');
      document.documentElement.classList.remove('hk-booting'); // fade-in màn chơi
      setTimeout(function () { stopPetals = true; removeEventListener('resize', rs); L.remove(); }, 950);
    }, 650);
  }
  requestAnimationFrame(tick);

  // Cánh hoa anh đào rơi
  var cv = $('hkl-petals'), cx = cv.getContext('2d'), W, H, P = [], stopPetals = false;
  function rs() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  rs(); addEventListener('resize', rs);
  for (var i = 0; i < 20; i++) P.push({ x: Math.random() * W, y: Math.random() * H, s: 4 + Math.random() * 5, v: .4 + Math.random() * .7, a: Math.random() * 6.28, w: .01 + Math.random() * .02 });
  if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) (function f() {
    if (stopPetals) return;
    cx.clearRect(0, 0, W, H);
    P.forEach(function (q) {
      q.y += q.v; q.a += q.w; q.x += Math.sin(q.a) * .6;
      if (q.y > H + 10) { q.y = -10; q.x = Math.random() * W; }
      cx.save(); cx.translate(q.x, q.y); cx.rotate(q.a); cx.fillStyle = 'rgba(255,170,190,.75)';
      cx.beginPath(); cx.ellipse(0, 0, q.s, q.s * .55, 0, 0, 6.28); cx.fill(); cx.restore();
    });
    requestAnimationFrame(f);
  })();
})();
