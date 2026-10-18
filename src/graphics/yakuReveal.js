// Popup "ăn bộ" (Yaku Reveal): giấy Washi loang mở ra, các lá bay vào thành xấp rồi xòe quạt,
// tên bộ bằng kanji viết cọ, con vật + hoa của bộ bay lên kiểu parallax, cánh hoa rơi.
import { getCardById } from '../data/cardsData.js';
import { renderCardFaceSVG } from './cardArtwork.js';

const YR_ASSET_DIR = './public/assets/yaku_popup/';

// Lá bài -> hình con vật / vật phẩm (ảnh đã tách nền)
const YR_SUBJECT_BY_CARD = {
  1: 'crane',
  9: 'sakura_curtain',
  29: 'full_moon',
  41: 'michikaze',
  45: 'phoenix',
  33: 'sake_cup',
  25: 'boar',
  37: 'deer',
  21: 'butterfly',
  2: 'akatan_ribbon',
  6: 'akatan_ribbon',
  10: 'akatan_ribbon',
  22: 'aotan_ribbon',
  34: 'aotan_ribbon',
  38: 'aotan_ribbon'
};

// Tháng -> loài hoa + màu cánh hoa rơi
const YR_FLOWER_BY_MONTH = {
  1: { img: 'flower_pine', petal: '#f3efe2' },
  2: { img: 'flower_plum', petal: '#c8203a' },
  3: { img: 'flower_sakura', petal: '#ffb7c5' },
  4: { img: 'flower_wisteria', petal: '#b99be0' },
  5: { img: 'flower_iris', petal: '#6a64cf' },
  6: { img: 'flower_peony', petal: '#d6283b' },
  7: { img: 'flower_hagi', petal: '#c2307a' },
  8: { img: 'flower_susuki', petal: '#e6d29a' },
  9: { img: 'flower_kiku', petal: '#f2b632' },
  10: { img: 'flower_momiji', petal: '#d9411e' },
  11: { img: 'flower_willow', petal: '#a9c46e' },
  12: { img: 'flower_kiri', petal: '#c3aee0' }
};

// Vị trí (theo % khung giấy) cho tối đa 3 con vật và 4 cành hoa
const YR_SUBJECT_SLOTS = [
  { x: -14, y: 4, w: 40, d: 1 },
  { x: 72, y: 0, w: 40, d: 0.75 },
  { x: 32, y: -30, w: 36, d: 0.5 }
];
const YR_FLOWER_SLOTS = [
  { x: -18, y: 62, w: 44, r: -8, d: 0.85, flip: false },
  { x: 74, y: 58, w: 44, r: 10, d: 0.65, flip: true },
  { x: -12, y: -18, w: 36, r: 14, d: 0.4, flip: true },
  { x: 80, y: 22, w: 34, r: -12, d: 0.55, flip: false }
];

const YR_DEFS_SVG = `
  <svg class="yaku-reveal-defs" width="0" height="0" aria-hidden="true" focusable="false">
    <filter id="yr-ink-bleed" x="-25%" y="-25%" width="150%" height="150%">
      <!-- Chỉ quầng mực loang mềm, không dùng feDisplacementMap (làm chữ/mép bị răng cưa) -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur" />
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" result="halo" />
      <feMerge><feMergeNode in="halo" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </svg>`;

function yrEscape(str) {
  return String(str ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[ch]);
}

function yrRand(min, max) {
  return min + Math.random() * (max - min);
}

// 'Ino-Shika-Chō (猪鹿蝶)' -> { romaji: 'Ino-Shika-Chō', kanji: '猪鹿蝶' }
function yrSplitJpName(jpName) {
  const m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(jpName || '');
  return m ? { romaji: m[1], kanji: m[2] } : { romaji: jpName || '', kanji: '' };
}

function yrCollectDecor(cardIds) {
  const subjects = [];
  const months = [];
  for (const id of cardIds) {
    const subj = YR_SUBJECT_BY_CARD[id];
    if (subj && !subjects.includes(subj)) subjects.push(subj);
    const card = getCardById(id);
    if (card && !months.includes(card.month)) months.push(card.month);
  }
  return { subjects: subjects.slice(0, 3), months: months.slice(0, 4) };
}

function yrBuildMarkup(yaku, opts, index, total) {
  const cardIds = (yaku.cards || []).slice(0, 15);
  const n = cardIds.length;
  const mid = (n - 1) / 2;
  const { romaji, kanji } = yrSplitJpName(yaku.jpName);
  const { subjects, months } = yrCollectDecor(cardIds);

  // Lá nhỏ dần khi bộ có nhiều lá; góc xòe giới hạn trong ~76 độ
  const cardPx = n <= 3 ? 96 : n <= 6 ? 84 : n <= 9 ? 70 : 58;
  const cardVw = n <= 3 ? 20 : n <= 6 ? 15 : n <= 9 ? 11.5 : 9;
  const step = n > 1 ? Math.min(15, 76 / (n - 1)) : 0;
  const stagger = Math.min(0.035, 0.16 / Math.max(1, n));

  const cardsHtml = cardIds
    .map((id, i) => {
      const card = getCardById(id);
      if (!card) return '';
      const style = [
        `--i:${i}`,
        `--stag:${stagger.toFixed(3)}`,
        `--rot:${((i - mid) * step).toFixed(2)}deg`,
        `--dx:${((i - mid) * 6).toFixed(1)}px`,
        `--sr:${((i - mid) * 1.6).toFixed(2)}deg`,
        `--fx:${yrRand(-260, 260).toFixed(0)}px`,
        `--fy:${yrRand(180, 320).toFixed(0)}px`,
        `--fr:${yrRand(-50, 50).toFixed(0)}deg`
      ].join(';');
      return `<div class="yaku-reveal-card" style="${style}">${renderCardFaceSVG(card, opts.skinId, false)}</div>`;
    })
    .join('');

  const subjectsHtml = subjects
    .map((name, i) => {
      const s = YR_SUBJECT_SLOTS[i];
      return `<div class="yr-float yr-subject" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;--d:${s.d};--k:${i}">
        <img src="${YR_ASSET_DIR}${name}.webp?v=2" alt="" draggable="false" />
      </div>`;
    })
    .join('');

  const flowersHtml = months
    .map((m, i) => {
      const s = YR_FLOWER_SLOTS[i];
      const f = YR_FLOWER_BY_MONTH[m];
      return `<div class="yr-float yr-flower${s.flip ? ' is-flip' : ''}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;--d:${s.d};--k:${i + 1};--r:${s.r}deg">
        <img src="${YR_ASSET_DIR}${f.img}.webp?v=2" alt="" draggable="false" />
      </div>`;
    })
    .join('');

  const petalColors = months.map((m) => YR_FLOWER_BY_MONTH[m].petal);
  if (!petalColors.length) petalColors.push('#ffb7c5');
  const petalCount = opts.short ? 10 : 16;
  let petalsHtml = '';
  for (let i = 0; i < petalCount; i++) {
    const style = [
      `left:${yrRand(-5, 100).toFixed(1)}%`,
      `--pc:${petalColors[i % petalColors.length]}`,
      `--pd:${yrRand(0.05, 0.55).toFixed(2)}`,
      `--pl:${yrRand(0.45, 0.75).toFixed(2)}`,
      `--sx:${yrRand(-70, 70).toFixed(0)}px`,
      `--ps:${yrRand(0.6, 1.25).toFixed(2)}`,
      `--spin:${yrRand(260, 720).toFixed(0)}deg`
    ].join(';');
    petalsHtml += `<span class="yaku-reveal-petal" style="${style}"></span>`;
  }

  const kanjiHtml = Array.from(kanji)
    .map((ch, i) => `<span class="${ch === '・' ? 'is-dot' : ''}" style="--c:${i}">${yrEscape(ch)}</span>`)
    .join('');

  const kicker = opts.short
    ? `Đối thủ ${yrEscape(opts.actorName || '')} đã ăn bộ…`
    : 'Bạn đã ăn bộ!';
  const counter = total > 1 ? ` · ${index + 1}/${total}` : '';

  return `
    <div class="yaku-reveal-overlay${opts.short ? ' is-short' : ''}" style="--yr-t:${opts.durationMs}ms;--cw:min(${cardPx}px, calc(${cardVw} * var(--avw, 1vw)));--n:${n}" role="dialog" aria-label="${yrEscape(`${yaku.viName} – ${romaji}`)}">
      ${YR_DEFS_SVG}
      <div class="yaku-reveal-stage">
        <div class="yaku-reveal-paper-wrap"><div class="yaku-reveal-paper"></div></div>
        <div class="yaku-reveal-decor" aria-hidden="true">${flowersHtml}${subjectsHtml}</div>
        <div class="yaku-reveal-petals" aria-hidden="true">${petalsHtml}</div>
        <div class="yaku-reveal-content">
          <div class="yaku-reveal-kicker">${kicker}</div>
          <div class="yaku-reveal-fan">${cardsHtml}</div>
          <h2 class="yaku-reveal-kanji" lang="ja">${kanjiHtml}</h2>
          <div class="yaku-reveal-romaji">${yrEscape(romaji)}</div>
          <div class="yaku-reveal-vi">${yrEscape(yaku.viName)}</div>
          <div class="yaku-reveal-points">+${Number(yaku.points) || 0} điểm</div>
        </div>
        <div class="yaku-reveal-hint">Chạm để bỏ qua${counter}</div>
      </div>
    </div>`;
}

// Làm ấm cache toàn bộ ảnh popup khi trình duyệt rảnh (tải lần lượt, không tranh băng thông với trận)
export function warmYakuRevealAssets() {
  const names = [
    ...new Set(Object.values(YR_SUBJECT_BY_CARD)),
    ...Object.values(YR_FLOWER_BY_MONTH).map((f) => f.img)
  ];
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
  const next = () => {
    const name = names.shift();
    if (!name) return;
    const img = new Image();
    img.decoding = 'async';
    img.onload = img.onerror = () => idle(next);
    img.src = `${YR_ASSET_DIR}${name}.webp?v=2`;
  };
  idle(next);
}

// Tải trước ảnh trang trí + font kanji của bộ (tối đa ~350ms để không làm chậm trận)
function yrPreload(yaku) {
  const { subjects, months } = yrCollectDecor((yaku.cards || []).slice(0, 15));
  const urls = [
    ...subjects.map((n) => `${YR_ASSET_DIR}${n}.webp?v=2`),
    ...months.map((m) => `${YR_ASSET_DIR}${YR_FLOWER_BY_MONTH[m].img}.webp?v=2`)
  ];
  const jobs = urls.map((url) => {
    const img = new Image();
    img.src = url;
    return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
  });
  if (document.fonts?.load) {
    jobs.push(document.fonts.load('64px "Yuji Boku Yaku"', yrSplitJpName(yaku.jpName).kanji).catch(() => {}));
  }
  return Promise.race([Promise.all(jobs), new Promise((r) => setTimeout(r, 350))]);
}

function yrEnsureRoot() {
  let root = document.getElementById('yaku-reveal-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'yaku-reveal-root';
    // Gắn vào #app để popup được scale cùng UI (mobile/iPad) thay vì to đùng theo px màn hình
    (document.getElementById('app') || document.body).appendChild(root);
  }
  return root;
}

function yrShowOne(root, yaku, opts, index, total) {
  return new Promise((resolve) => {
    const doc = new DOMParser().parseFromString(yrBuildMarkup(yaku, opts, index, total), 'text/html');
    root.replaceChildren(...Array.from(doc.body.childNodes));
    const overlay = root.querySelector('.yaku-reveal-overlay');
    let done = false;
    let leaveTimer = 0;

    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(leaveTimer);
      overlay.removeEventListener('pointerdown', onSkip);
      document.removeEventListener('keydown', onKey, true);
      overlay.classList.add('is-leaving');
      setTimeout(resolve, 260);
    };
    const onSkip = (e) => {
      e.preventDefault();
      e.stopPropagation();
      finish();
    };
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        finish();
      }
    };

    overlay.addEventListener('pointerdown', onSkip);
    document.addEventListener('keydown', onKey, true);
    // Hiệu ứng mờ dần 260ms nằm trong tổng thời lượng
    leaveTimer = setTimeout(finish, Math.max(400, opts.durationMs - 260));
  });
}

/**
 * Trình diễn lần lượt từng bộ vừa ăn. Trả về Promise khi popup đóng hẳn.
 * @param {Array} yakus - phần tử từ evaluateCapturedYaku().yakus
 * @param {{short?: boolean, actorName?: string, skinId?: string, durationMs?: number}} options
 */
export async function playYakuReveal(yakus, options = {}) {
  const list = (yakus || []).filter(Boolean);
  if (!list.length) return;
  const opts = {
    short: !!options.short,
    actorName: options.actorName || '',
    skinId: options.skinId || 'skin_traditional_edo',
    durationMs: options.durationMs || (options.short ? 2000 : 2800)
  };
  const root = yrEnsureRoot();
  try {
    for (let i = 0; i < list.length; i++) {
      await yrPreload(list[i]);
      await yrShowOne(root, list[i], opts, i, list.length);
    }
  } finally {
    root.replaceChildren();
  }
}
