/* Hạc 5 mảnh (thân, cổ, đùi, cẳng, bàn chân) của tiểu cảnh tháng 1 + anim đứng yên: thở, ngó, co chân luân phiên, cúi cắp mồi.
   Bản demo tương ứng: art-test/tieucanh/demo_hac/hac_rig.js (sửa dáng ở đây thì chép sang đó).
   Dùng: const hac = createHacRig(parentEl, { base: './public/assets/diorama/month1/hac_', ext: '.webp?v=1', scale: 0.21, pos: [x, y], flip: false });
         mỗi khung: hac.tick(dt)   |  hac.act('lift' | 'peck')   |  hac.setScale(s) / hac.setPos([x,y])
   pos = điểm bàn chân gần chạm đất (px trong khung cha). Khung rig 896x1200, hạc quay mặt sang trái. */
// Mọi hằng số nằm trong hàm: bundle IIFE gộp các file chung 1 scope nên tránh trùng tên ở cấp trên cùng.
export function createHacRig(parent, opt = {}) {
  const PART = {
    dui:  { src: 'dui',      w: 310, h: 1170, px: 155, py: 90, k: 0.26 * 1.3, len: (1105 - 90) * 0.26 * 1.3 }, // hông -> cổ chân
    cang: { src: 'cang',     w: 330, h: 585,  px: 235, py: 15, k: 0.36, len: (575 - 15) * 0.36 },              // cổ chân -> gốc ngón
    ban:  { src: 'ban_chan', w: 330, h: 235,  px: 236, py: 30, k: 0.36, len: (225 - 30) * 0.36 },              // gốc ngón -> chạm đất
  };
  const HIP = { near: [505, 562], far: [548, 556] };
  const NECK = [335, 372];
  // Góc dương = theo chiều kim đồng hồ = đưa về phía trước. Cổ chân hạc chỉ gập về phía trước (b >= 0).
  const STAND = [[3, 4], [-3, 4]];            // [đùi a, cổ chân b] chân gần / chân xa khi đứng
  const LIFT = [-26, 70, -100];               // co chân: gót ra sau, cẳng chéo lên trước, ngón cụp xuống
  const PECK = { pitch: -58, neck: -24 };     // cúi cắp mồi
  const R = Math.PI / 180;
  const ease = (s) => s * s * (3 - 2 * s);
  const lerp = (a, b, t) => a + (b - a) * t;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const seg = ([x, y], l, deg) => [x - l * Math.sin(deg * R), y + l * Math.cos(deg * R)];

    const base = opt.base || '', ext = opt.ext || '.png';
    let S = opt.scale || 0.21, POS = opt.pos || [0, 0];
    const flipK = opt.flip ? -1 : 1;
    const img = (p) => `<img src="${base}${p.src}${ext}" alt="" decoding="async" style="position:absolute;display:block;max-width:none;pointer-events:none;width:${p.w * p.k}px;height:${p.h * p.k}px;left:${-p.px * p.k}px;top:${-p.py * p.k}px" />`;
    const J = 'position:absolute;width:0;height:0;';
    const FULL = 'position:absolute;left:0;top:0;width:896px;height:1200px;';

    const root = document.createElement('div');
    root.className = 'hac-rig';
    root.style.cssText = FULL + 'transform-origin:0 0;pointer-events:none;';
    function makeLeg([x, y], dark) {
      const d = document.createElement('div');
      d.style.cssText = J + `left:${x}px;top:${y}px;` + (dark ? 'filter:brightness(.7);' : '');
      d.innerHTML = img(PART.dui) + `<div class="ankle" style="${J}top:${PART.dui.len}px">${img(PART.cang)}` +
        `<div class="foot" style="${J}top:${PART.cang.len}px">${img(PART.ban)}</div></div>`;
      return { el: d, ankle: d.querySelector('.ankle'), foot: d.querySelector('.foot'), hip: [x, y], a: 0, b: 4, c: -4 };
    }
    const legs = [makeLeg(HIP.near, false), makeLeg(HIP.far, true)];
    const torso = document.createElement('div');
    torso.style.cssText = FULL + `transform-origin:${HIP.near[0]}px ${HIP.near[1]}px;`;
    torso.innerHTML = `<img src="${base}than2${ext}" alt="" decoding="async" style="position:absolute;left:0;top:0;width:896px;max-width:none" />` +
      `<div class="neck" style="${FULL}transform-origin:${NECK[0]}px ${NECK[1]}px"><img src="${base}co${ext}" alt="" decoding="async" style="position:absolute;left:0;top:0;width:896px;max-width:none" /></div>`;
    const neck = torso.querySelector('.neck');
    root.append(legs[1].el, torso, legs[0].el); // chân xa sau thân, chân gần trước thân
    parent.appendChild(root);

    function contact(L) {
      const k1 = seg(L.hip, PART.dui.len, L.a), k2 = seg(k1, PART.cang.len, L.a + L.b);
      return seg(k2, PART.ban.len, L.a + L.b + L.c);
    }
    function setStand(L, i) { [L.a, L.b] = STAND[i]; L.c = -(L.a + L.b); }
    setStand(legs[0], 0); setStand(legs[1], 1);
    const G0 = contact(legs[0]), G1 = contact(legs[1]), GAP = [G1[0] - G0[0], G1[1] - G0[1]];

    let mode = 'idle', t = 0, dur = rnd(1, 3), liftLeg = 1, nextLift = 1, lastAct = '', clock = rnd(0, 10);
    function act(m) {
      t = 0; mode = m; lastAct = m;
      if (m === 'peck') dur = 2.6;
      if (m === 'lift') { dur = rnd(2.6, 3.6); liftLeg = nextLift; nextLift = 1 - nextLift; } // luân phiên 2 chân
    }
    function tick(dt) {
      t += dt; clock += dt;
      let pitch = Math.sin(clock * 1.6) * 0.8, neckRot = Math.sin(clock * 0.7) * 2.5 + Math.sin(clock * 1.9) * 1; // thở, ngó
      setStand(legs[0], 0); setStand(legs[1], 1);
      if (mode === 'idle') {
        if (t > dur) act(lastAct !== 'peck' && Math.random() < 0.35 ? 'peck' : 'lift');
      } else if (mode === 'lift') {
        const s = t / dur, up = s < 0.3 ? ease(s / 0.3) : s < 0.7 ? 1 : ease(1 - (s - 0.7) / 0.3);
        const L = legs[liftLeg], [a0, b0] = STAND[liftLeg];
        L.a = lerp(a0, LIFT[0], up); L.b = lerp(b0, LIFT[1], up);
        L.c = lerp(-(a0 + b0), LIFT[2] + (s > 0.3 && s < 0.7 ? Math.sin((s - 0.3) * 30) * 4 : 0), up);
        pitch += 2.5 * up * (liftLeg ? 1 : -1);
        neckRot -= 3 * up;
        if (s >= 1) { mode = 'idle'; t = 0; dur = rnd(1.8, 3.5); }
      } else if (mode === 'peck') {
        const s = t / dur, down = s < 0.3 ? ease(s / 0.3) : s < 0.72 ? 1 : ease(1 - (s - 0.72) / 0.28);
        const jab = s > 0.32 && s < 0.7 ? Math.max(0, Math.sin((s - 0.32) / 0.19 * Math.PI)) : 0;
        pitch += PECK.pitch * down; neckRot += PECK.neck * down - 7 * jab;
        if (s >= 1) { mode = 'idle'; t = 0; dur = rnd(2.2, 4); }
      }
      // chân đang đứng giữ nguyên chỗ: chân gần tại POS, chân xa lệch theo khoảng cách 2 bàn chân lúc đứng
      const stance = mode === 'lift' ? 1 - liftLeg : 0;
      const g = contact(legs[stance]), F = stance ? [POS[0] + S * flipK * GAP[0], POS[1] + S * GAP[1]] : POS;
      const OX = F[0] - S * flipK * g[0], OY = F[1] - S * g[1];
      for (const L of legs) {
        L.el.style.transform = `rotate(${L.a}deg)`;
        L.ankle.style.transform = `rotate(${L.b}deg)`;
        L.foot.style.transform = `rotate(${L.c}deg)`;
      }
      neck.style.transform = `rotate(${neckRot}deg)`;
      torso.style.transform = `rotate(${pitch}deg)`;
      root.style.transform = `translate(${OX}px, ${OY}px) scale(${S * flipK}, ${S})`;
      return mode;
    }
    // gap: khoảng cách bàn chân xa so với bàn chân gần lúc đứng (đơn vị khung rig, chưa nhân scale/lật)
    return { el: root, tick, act, gap: GAP, setScale(s) { S = s; }, setPos(p) { POS = p; }, get mode() { return mode; } };
}
