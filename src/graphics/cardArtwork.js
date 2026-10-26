// Authentic Hanafuda Card Face Renderer (using real traditional 48 Hanafuda card images)
// + 10 Collectible Japanese Card Back Designs & 6 Collectible Card Skin Treatments

import { getCardSkinById, getCardBackById } from '../data/collectionData.js';
import { HANAFUDA_CARDS } from '../data/cardsData.js';
import { isPerfLow, getUiScale } from '../ui/viewportScaler.js?v=26';
import { MONTH1_DIORAMA } from '../data/dioramaMonth1.js?v=2';

// ============================================================================
// RASTER CACHE MẶT LÁ BÀI (bước 4 tối ưu mobile/iOS)
// - Mặt lá (ảnh + filter skin + viền + badge) được vẽ 1 lần lên canvas → PNG blob URL,
//   cache theo lá + skin + badge + bề rộng bitmap (theo ui-scale × DPR, làm tròn bậc 32px).
// - Lần đầu (chưa có bitmap): trả SVG cũ kèm data-hk-face, vẽ bitmap ngầm rồi thay tại chỗ.
// - prewarmCardFaces(skin): main.js gọi khi vẽ bàn → vẽ sẵn 48 lá (có/không badge) của skin đang dùng.
// - Bước 5: mặt lưng (renderCardBackSVG) dùng chung cache, khóa b_<backId>_<w>; prewarmCardBack(backId).
// - perf-low: DPR tối đa 1.5 (thường 2). Tắt bằng ?raster=0 (lưu localStorage hanakoi_raster).
// - file:// hoặc canvas lỗi → tự quay về SVG.
// ============================================================================
const CARD_VB_W = 160;
const CARD_VB_H = 248;
const RASTER_DESIGN_W = { md: 128, lg: 240 }; // bề rộng CSS (khung thiết kế 1600x900) lớn nhất cần nét
const RASTER_MIN_W = 96;
const RASTER_MAX_W = 352; // ảnh gốc card_N.webp rộng 330px
const RASTER_CACHE_MAX = 240;
const RASTER_CONCURRENCY = 2;

const rasterCache = new Map(); // key -> blob URL (Map giữ thứ tự chèn → LRU đơn giản)
const rasterPending = new Set();
const rasterQueue = [];
const prewarmed = new Set();
let rasterActive = 0;
let rasterDisabled = null; // null = chưa xét
let canvasFilterOk = null;
const rasterStats = { hits: 0, misses: 0, built: 0, failed: 0, swapped: 0, ms: 0 };

function isRasterEnabled() {
  if (rasterDisabled !== null) return !rasterDisabled;
  let off = false;
  try {
    if (typeof document === 'undefined' || location.protocol === 'file:') off = true;
    const q = new URLSearchParams(location.search).get('raster');
    // ?raster=0 tắt | 1 bật | px: ép lọc màu bằng pixel (giả lập Safari không có ctx.filter)
    if (q === '0' || q === '1' || q === 'px') localStorage.setItem('hanakoi_raster', q);
    if (localStorage.getItem('hanakoi_raster') === '0') off = true;
  } catch (_) {}
  if (!off) {
    try {
      const c = document.createElement('canvas');
      if (!c.getContext || !c.getContext('2d') || !c.toBlob || !window.URL || !URL.createObjectURL) off = true;
    } catch (_) {
      off = true;
    }
  }
  rasterDisabled = off;
  return !off;
}

function supportsCanvasFilter() {
  if (canvasFilterOk !== null) return canvasFilterOk;
  try {
    if (localStorage.getItem('hanakoi_raster') === 'px') return (canvasFilterOk = false);
  } catch (_) {}
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.filter = 'saturate(2)';
    canvasFilterOk = ctx.filter === 'saturate(2)';
  } catch (_) {
    canvasFilterOk = false;
  }
  return canvasFilterOk;
}

function rasterWidthFor(size) {
  const designW = RASTER_DESIGN_W[size] || RASTER_DESIGN_W.md;
  const dpr = Math.min(window.devicePixelRatio || 1, isPerfLow() ? 1.5 : 2);
  const px = designW * getUiScale() * dpr;
  return Math.max(RASTER_MIN_W, Math.min(RASTER_MAX_W, Math.ceil(px / 32) * 32));
}

function rasterKey(cardId, skinId, showBadges, w) {
  return `f${cardId}_${skinId}_${showBadges ? 1 : 0}_${w}`;
}

function rasterImgHTML(url, cls, w) {
  const h = Math.round((w * CARD_VB_H) / CARD_VB_W);
  return `<img class="${cls}" src="${url}" width="${w}" height="${h}" alt="" draggable="false" />`;
}

// Lấy bitmap trong cache (làm mới vị trí LRU) hoặc null
function takeCached(key) {
  const url = rasterCache.get(key);
  if (!url) return null;
  rasterStats.hits++;
  rasterCache.delete(key);
  rasterCache.set(key, url);
  return url;
}

const faceClass = (skinId) => `hanafuda-svg hanafuda-raster skin-${skinId}`;
const BACK_CLASS = 'hanafuda-back-svg hanafuda-raster';

function faceJob(card, skin, showBadges, w, key) {
  return { key, w, cls: faceClass(skin.id), build: () => buildRaster({ card, skin, showBadges, w }) };
}

// Skin có bộ mặt bài vẽ riêng (48 lá, khung đã phủ sẵn) → public/assets/cards/<thư mục>/card_N.webp
const SKIN_ART_DIR = {
  skin_sakura_pastel: 'sakura_pastel',
  skin_sumie_ink: 'sumie_ink',
  skin_kintsugi_gold: 'kintsugi_gold',
  skin_yokai_night: 'yokai_night',
  skin_ukiyoe_neon: 'ukiyoe_celestial'
};
const SKIN_ART_V = '?v=1';

function cardImgHref(cardId, skinId) {
  const dir = SKIN_ART_DIR[skinId];
  if (dir) return `./public/assets/cards/${dir}/card_${cardId}.webp${SKIN_ART_V}`;
  return `./public/assets/cards/card_${cardId}.webp?v=26`;
}

// Bộ lọc màu của từng skin (cùng chuỗi dùng cho style SVG / ctx.filter)
const SKIN_IMG_FILTER = {
  skin_sakura_pastel: 'saturate(1.12) brightness(1.04) contrast(0.98)',
  skin_sumie_ink: 'sepia(0.32) contrast(1.08) saturate(0.82)',
  skin_kintsugi_gold: 'contrast(1.06) saturate(1.15)',
  skin_yokai_night: 'contrast(1.1) saturate(1.22) hue-rotate(-8deg)',
  skin_ukiyoe_neon: 'saturate(1.28) contrast(1.08)'
};

/**
 * Generates the card face markup using the authentic real Hanafuda card image (card_1.webp .. card_48.webp)
 * with optional collectible Skin frame/tint and compact gameplay month/point badges.
 * Trả về <img> bitmap đã cache nếu có; nếu chưa thì trả SVG và vẽ bitmap ngầm.
 * opts.size: 'md' (trong trận, mặc định) | 'lg' (xem lá phóng to).
 */
export function renderCardFaceSVG(card, skinId = 'skin_traditional_edo', showBadges = true, opts = {}) {
  if (!card || !isRasterEnabled()) return renderCardFaceVector(card, skinId, showBadges);
  const skin = getCardSkinById(skinId);
  const size = opts.size === 'lg' ? 'lg' : 'md';
  const w = rasterWidthFor(size);
  const key = rasterKey(card.id, skin.id, showBadges, w);
  const url = takeCached(key);
  if (url) return rasterImgHTML(url, faceClass(skin.id), w);
  rasterStats.misses++;
  queueRaster(faceJob(card, skin, showBadges, w, key), true);
  return renderCardFaceVector(card, skin.id, showBadges, key);
}

/** Vẽ sẵn bitmap cả 48 lá cho 1 skin (lúc rảnh). main.js gọi khi render bàn chơi với skin đang dùng. */
export function prewarmCardFaces(skinId = 'skin_traditional_edo', showBadges = true) {
  if (!isRasterEnabled()) return;
  const skin = getCardSkinById(skinId);
  const w = rasterWidthFor('md');
  const pk = rasterKey('all', skin.id, showBadges, w);
  if (prewarmed.has(pk)) return;
  prewarmed.add(pk);
  for (const c of HANAFUDA_CARDS) {
    const key = rasterKey(c.id, skin.id, showBadges, w);
    if (!rasterCache.has(key)) queueRaster(faceJob(c, skin, showBadges, w, key), false);
  }
}

function queueRaster(job, urgent) {
  const key = job.key;
  if (rasterPending.has(key)) {
    if (urgent) {
      const i = rasterQueue.findIndex((j) => j.key === key);
      if (i > 0) rasterQueue.unshift(rasterQueue.splice(i, 1)[0]);
    }
    return;
  }
  rasterPending.add(key);
  if (urgent) rasterQueue.unshift(job);
  else rasterQueue.push(job);
  pumpRaster();
}

const idle = (fn) =>
  typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(fn, { timeout: 120 }) : setTimeout(fn, 16);

function pumpRaster() {
  while (rasterActive < RASTER_CONCURRENCY && rasterQueue.length) {
    const job = rasterQueue.shift();
    rasterActive++;
    idle(() => {
      job
        .build()
        .then((url) => {
          rasterStats.built++;
          storeRaster(job.key, url);
          swapRasterInDom(job.key, url, job.cls, job.w);
        })
        .catch((err) => {
          rasterStats.failed++;
          // Canvas bị "tainted" (file://, CORS) → tắt hẳn, dùng SVG
          if (err && (err.name === 'SecurityError' || err.code === 18)) rasterDisabled = true;
        })
        .finally(() => {
          rasterPending.delete(job.key);
          rasterActive--;
          if (!rasterDisabled) pumpRaster();
          else rasterQueue.length = 0;
        });
    });
  }
}

function storeRaster(key, url) {
  rasterCache.set(key, url);
  while (rasterCache.size > RASTER_CACHE_MAX) {
    const oldKey = rasterCache.keys().next().value;
    const oldUrl = rasterCache.get(oldKey);
    rasterCache.delete(oldKey);
    // Chỉ thu hồi khi không còn <img> nào đang dùng
    if (!document.querySelector(`img[src="${oldUrl}"]`)) URL.revokeObjectURL(oldUrl);
  }
}

function swapRasterInDom(key, url, cls, w) {
  const sel = `[data-hk-face="${key}"]`;
  if (!document.querySelector(sel)) return;
  const img = document.createElement('img');
  img.className = cls;
  img.width = w;
  img.height = Math.round((w * CARD_VB_H) / CARD_VB_W);
  img.alt = '';
  img.draggable = false;
  img.src = url;
  let done = false;
  const swap = () => {
    if (done) return;
    done = true;
    // Truy vấn lại lúc thay: màn hình có thể đã render lại trong lúc decode
    document.querySelectorAll(sel).forEach((n) => {
      if (n.isConnected) {
        n.replaceWith(img.cloneNode());
        rasterStats.swapped++;
      }
    });
  };
  // Đợi ảnh giải mã xong mới thay để không nháy trắng; decode() có thể treo khi
  // trang không vẽ frame (tab nền) → hết 250ms thì thay luôn
  if (img.decode) {
    img.decode().then(swap, swap);
    setTimeout(swap, 250);
  } else swap();
}

const imgLoadCache = new Map(); // href -> Promise<HTMLImageElement>
function loadCardImage(href) {
  let p = imgLoadCache.get(href);
  if (!p) {
    p = new Promise((resolve, reject) => {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => resolve(im);
      im.onerror = () => {
        imgLoadCache.delete(href);
        reject(new Error('card image load failed: ' + href));
      };
      im.src = href;
    });
    imgLoadCache.set(href, p);
  }
  return p;
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// --- Bộ lọc màu bằng pixel (cho trình duyệt không có ctx.filter, vd Safari cũ) ---
function parseFilterOps(str) {
  const ops = [];
  String(str || '').replace(/([a-z-]+)\(\s*(-?[\d.]+)(deg)?\s*\)/g, (_, fn, v) => {
    ops.push([fn, parseFloat(v)]);
    return '';
  });
  return ops;
}
function opMatrix(fn, v) {
  // Ma trận 3x3 + offset theo Filter Effects spec (sRGB, giá trị 0..1)
  if (fn === 'brightness') return [v, 0, 0, 0, v, 0, 0, 0, v, 0];
  if (fn === 'contrast') return [v, 0, 0, 0, v, 0, 0, 0, v, 0.5 - 0.5 * v];
  if (fn === 'saturate') {
    const s = v;
    return [
      0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s,
      0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s,
      0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0
    ];
  }
  if (fn === 'sepia') {
    const a = 1 - Math.min(1, v);
    return [
      0.393 + 0.607 * a, 0.769 - 0.769 * a, 0.189 - 0.189 * a,
      0.349 - 0.349 * a, 0.686 + 0.314 * a, 0.168 - 0.168 * a,
      0.272 - 0.272 * a, 0.534 - 0.534 * a, 0.131 + 0.869 * a, 0
    ];
  }
  if (fn === 'hue-rotate') {
    const r = (v * Math.PI) / 180;
    const c = Math.cos(r);
    const s = Math.sin(r);
    return [
      0.213 + c * 0.787 - s * 0.213, 0.715 - c * 0.715 - s * 0.715, 0.072 - c * 0.072 + s * 0.928,
      0.213 - c * 0.213 + s * 0.143, 0.715 + c * 0.285 + s * 0.14, 0.072 - c * 0.072 - s * 0.283,
      0.213 - c * 0.213 - s * 0.787, 0.715 - c * 0.715 + s * 0.715, 0.072 + c * 0.928 + s * 0.072, 0
    ];
  }
  return null;
}
function applyPixelFilter(ctx, w, h, filterStr) {
  const mats = parseFilterOps(filterStr).map(([fn, v]) => opMatrix(fn, v)).filter(Boolean);
  if (!mats.length) return;
  const data = ctx.getImageData(0, 0, w, h); // ném SecurityError nếu canvas bị tainted
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    if (!d[i + 3]) continue;
    let r = d[i] / 255;
    let g = d[i + 1] / 255;
    let b = d[i + 2] / 255;
    for (const m of mats) {
      const nr = m[0] * r + m[1] * g + m[2] * b + m[9];
      const ng = m[3] * r + m[4] * g + m[5] * b + m[9];
      const nb = m[6] * r + m[7] * g + m[8] * b + m[9];
      r = nr < 0 ? 0 : nr > 1 ? 1 : nr;
      g = ng < 0 ? 0 : ng > 1 ? 1 : ng;
      b = nb < 0 ? 0 : nb > 1 ? 1 : nb;
    }
    d[i] = r * 255 + 0.5;
    d[i + 1] = g * 255 + 0.5;
    d[i + 2] = b * 255 + 0.5;
  }
  ctx.putImageData(data, 0, 0);
}

function strokeRR(ctx, x, y, w, h, r, color, width, alpha = 1) {
  roundRectPath(ctx, x, y, w, h, r);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.globalAlpha = 1;
}
function fillRR(ctx, x, y, w, h, r, color, alpha, blend) {
  roundRectPath(ctx, x, y, w, h, r);
  ctx.globalAlpha = alpha;
  if (blend) ctx.globalCompositeOperation = blend;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}
function strokePath(ctx, d, color, width, alpha = 1) {
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke(new Path2D(d));
  ctx.globalAlpha = 1;
}

// Vẽ viền/lớp phủ skin — khớp từng case với renderCardFaceVector()
function drawSkinOverlay(ctx, card, skinId) {
  switch (skinId) {
    case 'skin_sakura_pastel':
      fillRR(ctx, 2, 2, 156, 244, 8, '#ffb3c1', 0.1, 'multiply');
      strokeRR(ctx, 3, 3, 154, 242, 7, '#ff758f', 2.5, 0.85);
      break;
    case 'skin_sumie_ink':
      fillRR(ctx, 2, 2, 156, 244, 8, '#e8dcc4', 0.14, 'multiply');
      strokeRR(ctx, 3, 3, 154, 242, 7, '#8d775f', 2.2, 0.8);
      break;
    case 'skin_kintsugi_gold':
      strokePath(ctx, 'M12 2 L38 42 L24 88 L56 135 M148 210 L118 175 L132 130', '#ffd166', 1.3, 0.75);
      strokeRR(ctx, 2.5, 2.5, 155, 243, 8, '#ffd166', 3);
      strokePath(ctx, 'M10 22 L10 10 L22 10 M138 10 L150 10 L150 22 M10 226 L10 238 L22 238 M138 238 L150 238 L150 226', '#fff3b0', 2);
      break;
    case 'skin_yokai_night':
      fillRR(ctx, 2, 2, 156, 244, 8, '#240046', 0.14);
      strokeRR(ctx, 2.5, 2.5, 155, 243, 8, '#9d4edd', 2.8);
      break;
    case 'skin_ukiyoe_neon':
      strokeRR(ctx, 2.5, 2.5, 155, 243, 8, '#f72585', 2.6);
      strokeRR(ctx, 5, 5, 150, 238, 6, '#4cc9f0', 1.1, 0.75);
      break;
    default: {
      const hk = card.type === 'hikari';
      strokeRR(ctx, 1.5, 1.5, 157, 245, 8, hk ? '#ffd166' : '#1a1617', hk ? 2.2 : 1.5);
    }
  }
}

function drawBadges(ctx, card, p) {
  const isBright = card.type === 'hikari';
  ctx.globalAlpha = 0.88;
  roundRectPath(ctx, 6, 6, 24, 14, 4);
  ctx.fillStyle = isBright ? '#8f1822' : 'rgba(20, 14, 18, 0.72)';
  ctx.fill();
  ctx.strokeStyle = p.gold;
  ctx.lineWidth = 0.7;
  ctx.stroke();
  ctx.fillStyle = '#fff6e5';
  ctx.font = "800 8.5px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(`T${card.month}`, 18, 15.8);
  ctx.globalAlpha = 1;
}

async function buildRaster({ card, skin, showBadges, w }) {
  const t0 = performance.now();
  const hasArt = !!SKIN_ART_DIR[skin.id];
  const img = await loadCardImage(cardImgHref(card.id, skin.id));
  const h = Math.round((w * CARD_VB_H) / CARD_VB_W);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const sx = w / CARD_VB_W;
  const sy = h / CARD_VB_H;
  const filterStr = hasArt ? '' : SKIN_IMG_FILTER[skin.id] || '';
  const useCtxFilter = filterStr && supportsCanvasFilter();

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.save();
  ctx.scale(sx, sy);
  roundRectPath(ctx, 2, 2, 156, 244, 8);
  ctx.clip();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(2, 2, 156, 244);
  if (useCtxFilter) ctx.filter = filterStr;
  ctx.drawImage(img, 2, 2, 156, 244);
  if (useCtxFilter) ctx.filter = 'none';
  ctx.restore();
  if (filterStr && !useCtxFilter) applyPixelFilter(ctx, w, h, filterStr);

  ctx.save();
  ctx.scale(sx, sy);
  if (!hasArt) drawSkinOverlay(ctx, card, skin.id);
  if (showBadges) drawBadges(ctx, card, skin.palette);
  ctx.restore();

  return canvasToUrl(canvas, t0);
}

async function canvasToUrl(canvas, t0) {
  const blob = await new Promise((resolve, reject) => {
    try {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob null'))), 'image/png');
    } catch (e) {
      reject(e); // SecurityError khi canvas tainted
    }
  });
  canvas.width = canvas.height = 0; // giải phóng bộ nhớ canvas (iOS)
  rasterStats.ms += performance.now() - t0;
  return URL.createObjectURL(blob);
}

// --- Mặt lưng lá bài (bước 5): ảnh lưng + hoa văn sóng seigaiha + 2 viền ---
async function buildBackRaster(back, w) {
  const t0 = performance.now();
  const img = await loadCardImage(`./public/assets/backs/${back.id}.webp?v=26`);
  const h = Math.round((w * CARD_VB_H) / CARD_VB_W);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.scale(w / CARD_VB_W, h / CARD_VB_H);

  // Khung ngoài (fill viền + nét accent mờ)
  roundRectPath(ctx, 1, 1, 158, 246, 9);
  ctx.fillStyle = back.borderColor;
  ctx.fill();
  ctx.globalAlpha = 0.75;
  ctx.strokeStyle = back.accentColor;
  ctx.lineWidth = 1.3;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.save();
  roundRectPath(ctx, 2, 2, 156, 244, 8);
  ctx.clip();
  // preserveAspectRatio="xMidYMid slice" (phủ kín, cắt giữa)
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const k = Math.max(156 / iw, 244 / ih);
  const dw = iw * k;
  const dh = ih * k;
  ctx.drawImage(img, 2 + (156 - dw) / 2, 2 + (244 - dh) / 2, dw, dh);
  // Hoa văn sóng: pattern 24x14 = các nửa vòng tròn r=12, tâm mỗi 12px trên đường y=14k
  // (bỏ qua với mặt lưng có hoa văn in chìm riêng — back.noWagara)
  if (!back.noWagara) {
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = back.accentColor;
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    for (let y = 14; y <= CARD_VB_H + 14; y += 14) {
      for (let cx = 0; cx <= CARD_VB_W + 12; cx += 12) {
        ctx.moveTo(cx - 12, y);
        ctx.arc(cx, y, 12, Math.PI, 2 * Math.PI);
      }
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  ctx.restore();

  // Viền trong
  ctx.globalAlpha = 0.55;
  roundRectPath(ctx, 5, 5, 150, 238, 6);
  ctx.strokeStyle = back.accentColor;
  ctx.lineWidth = 0.9;
  ctx.stroke();
  ctx.globalAlpha = 1;

  return canvasToUrl(canvas, t0);
}

function backJob(back, w, key) {
  return { key, w, cls: BACK_CLASS, build: () => buildBackRaster(back, w) };
}

/** Vẽ sẵn bitmap mặt lưng (main.js gọi khi vẽ bàn). */
export function prewarmCardBack(backId = 'back_urushi_red') {
  if (!isRasterEnabled()) return;
  const back = getCardBackById(backId);
  const w = rasterWidthFor('md');
  const key = `b_${back.id}_${w}`;
  if (!rasterCache.has(key)) queueRaster(backJob(back, w, key), true);
}

if (typeof window !== 'undefined') {
  // Đổi chế độ đồ họa → bề rộng bitmap đổi → cho phép prewarm lại theo khóa mới
  window.addEventListener('hk-perfmodechange', () => prewarmed.clear());
  window.HK_CARD_RASTER = {
    stats: rasterStats,
    get size() {
      return rasterCache.size;
    },
    get enabled() {
      return isRasterEnabled();
    },
    get canvasFilter() {
      return supportsCanvasFilter();
    },
    widthFor: rasterWidthFor,
    debug: () => ({
      queue: rasterQueue.length,
      active: rasterActive,
      pending: rasterPending.size,
      keys: [...rasterCache.keys()].slice(-6),
      prewarmed: [...prewarmed]
    })
  };
}

/** Bản SVG gốc (dùng khi chưa có bitmap / tắt raster). rasterKeyAttr: đánh dấu để thay bằng bitmap. */
function renderCardFaceVector(card, skinId = 'skin_traditional_edo', showBadges = true, rasterKeyAttr = '') {
  const skin = getCardSkinById(skinId);
  const p = skin.palette;
  const uid = `c${card.id}_${skin.id}`;
  const hasArt = !!SKIN_ART_DIR[skin.id];
  const imgHref = cardImgHref(card.id, skin.id);

  // Optional skin decorative overlay (keeps the real Hanafuda artwork 100% recognizable)
  let skinOverlay = '';
  const imgFilterStyle = !hasArt && SKIN_IMG_FILTER[skin.id] ? `filter: ${SKIN_IMG_FILTER[skin.id]};` : '';

  switch (hasArt ? '' : skin.id) {
    case 'skin_sakura_pastel':
      skinOverlay = `
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#ffb3c1" fill-opacity="0.10" style="mix-blend-mode: multiply;" />
        <rect x="3" y="3" width="154" height="242" rx="7" fill="none" stroke="#ff758f" stroke-width="2.5" stroke-opacity="0.85" />
      `;
      break;
    case 'skin_sumie_ink':
      skinOverlay = `
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#e8dcc4" fill-opacity="0.14" style="mix-blend-mode: multiply;" />
        <rect x="3" y="3" width="154" height="242" rx="7" fill="none" stroke="#8d775f" stroke-width="2.2" stroke-opacity="0.8" />
      `;
      break;
    case 'skin_kintsugi_gold':
      skinOverlay = `
        <path d="M12 2 L38 42 L24 88 L56 135 M148 210 L118 175 L132 130" fill="none" stroke="#ffd166" stroke-width="1.3" stroke-opacity="0.75" />
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#ffd166" stroke-width="3" />
        <path d="M10 22 L10 10 L22 10 M138 10 L150 10 L150 22 M10 226 L10 238 L22 238 M138 238 L150 238 L150 226" fill="none" stroke="#fff3b0" stroke-width="2" />
      `;
      break;
    case 'skin_yokai_night':
      skinOverlay = `
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#240046" fill-opacity="0.14" />
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#9d4edd" stroke-width="2.8" />
      `;
      break;
    case 'skin_ukiyoe_neon':
      skinOverlay = `
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#f72585" stroke-width="2.6" />
        <rect x="5" y="5" width="150" height="238" rx="6" fill="none" stroke="#4cc9f0" stroke-width="1.1" stroke-opacity="0.75" />
      `;
      break;
    case '':
      break; // skin có ảnh riêng: khung đã nằm trong ảnh
    case 'skin_traditional_edo':
    default:
      skinOverlay = `
        <rect x="1.5" y="1.5" width="157" height="245" rx="8" fill="none" stroke="${card.type === 'hikari' ? '#ffd166' : '#1a1617'}" stroke-width="${card.type === 'hikari' ? '2.2' : '1.5'}" />
      `;
      break;
  }

  const typeBadge = showBadges ? renderCardHeaderBadges(card, p) : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 248" class="hanafuda-svg skin-${skin.id}"${rasterKeyAttr ? ` data-hk-face="${rasterKeyAttr}"` : ''}>
    <defs>
      <clipPath id="cardClip_${uid}">
        <rect x="2" y="2" width="156" height="244" rx="8" />
      </clipPath>
    </defs>

    <!-- Authentic Traditional Hanafuda Card Artwork -->
    <g clip-path="url(#cardClip_${uid})">
      <rect x="2" y="2" width="156" height="244" fill="#ffffff" />
      <image
        href="${imgHref}"
        x="2"
        y="2"
        width="156"
        height="244"
        preserveAspectRatio="none"
        style="${imgFilterStyle}"
      />
    </g>

    ${skinOverlay}
    ${typeBadge}
  </svg>`;
}

function renderCardHeaderBadges(card, p) {
  const isBright = card.type === 'hikari';
  return `
    <g class="card-ui-badge" opacity="0.88">
      <rect x="6" y="6" width="24" height="14" rx="4" fill="${isBright ? '#8f1822' : 'rgba(20, 14, 18, 0.72)'}" stroke="${p.gold}" stroke-width="0.7" />
      <text x="18" y="15.8" text-anchor="middle" fill="#fff6e5" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="800">T${card.month}</text>
    </g>
  `;
}

// ============================================================================
// COLLECTIBLE CARD BACK RENDERER (10 AI-Generated Japanese Card Back Artworks)
// ============================================================================

/**
 * Mặt lưng lá bài. Trả <img> bitmap đã cache nếu có; nếu chưa thì trả SVG và vẽ bitmap ngầm.
 * opts.size: 'md' (mặc định) | 'lg' (thẻ soi phóng to).
 */
export function renderCardBackSVG(backId = 'back_urushi_red', opts = {}) {
  if (!isRasterEnabled()) return renderCardBackVector(backId);
  const back = getCardBackById(backId);
  const w = rasterWidthFor(opts.size === 'lg' ? 'lg' : 'md');
  const key = `b_${back.id}_${w}`;
  const url = takeCached(key);
  if (url) return rasterImgHTML(url, BACK_CLASS, w);
  rasterStats.misses++;
  queueRaster(backJob(back, w, key), true);
  return renderCardBackVector(back.id, key);
}

function renderCardBackVector(backId = 'back_urushi_red', rasterKeyAttr = '') {
  const back = getCardBackById(backId);
  const uid = `b_${back.id}`;
  const backImgHref = `./public/assets/backs/${back.id}.webp?v=26`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 248" class="hanafuda-back-svg"${rasterKeyAttr ? ` data-hk-face="${rasterKeyAttr}"` : ''}>
    <defs>
      <clipPath id="backClip_${uid}">
        <rect x="2" y="2" width="156" height="244" rx="8" />
      </clipPath>
      <pattern id="wagara_${uid}" width="24" height="14" patternUnits="userSpaceOnUse">
        <path d="M0 14 A12 12 0 0 1 24 14 M-12 14 A12 12 0 0 1 12 14 M12 14 A12 12 0 0 1 36 14" fill="none" stroke="${back.accentColor}" stroke-width="0.7" stroke-opacity="0.16"/>
      </pattern>
    </defs>
    <!-- Clean Card Back Frame -->
    <rect x="1" y="1" width="158" height="246" rx="9" fill="${back.borderColor}" stroke="${back.accentColor}" stroke-width="1.3" stroke-opacity="0.75" />
    <g clip-path="url(#backClip_${uid})">
      <image
        href="${backImgHref}"
        x="2"
        y="2"
        width="156"
        height="244"
        preserveAspectRatio="xMidYMid slice"
      />
      <!-- Subtle Japanese Wagara Seigaiha Pattern Overlay -->
      ${back.noWagara ? '' : `<rect x="2" y="2" width="156" height="244" fill="url(#wagara_${uid})" />`}
    </g>
    <rect x="5" y="5" width="150" height="238" rx="6" fill="none" stroke="${back.accentColor}" stroke-width="0.9" stroke-opacity="0.55" />
  </svg>`;
}

// ============================================================================
// 12-MONTH LIVING TABLETOP FLOWER & SIGNATURE MOTIF DIORAMA RENDERER
// Renders swaying corner flora, animated Hikari/Tane card props (e.g., Kiku Sake Cup
// with sloshing golden wine, Sakura Hanami curtain, Yatsuhashi bridge ripples,
// Botan butterflies, Susuki full moon, etc.) & fallen petals on the 2.5D Tatami.
// ============================================================================

export const TABLETOP_DIORAMA_CATALOG = {
  1: {
    month: 1,
    jpTitle: '睦月・松に鶴',
    viTitle: 'Tháng 1 · Tùng Hạc & Mặt Trời Đỏ',
    flowerName: 'Cây Tùng (Matsu)',
    propName: 'Hạc Đỏ & Dải Thơ Akayoroshi',
    badgeIcon: '🌲'
  },
  2: {
    month: 2,
    jpTitle: '如月・梅に鶯',
    viTitle: 'Tháng 2 · Mai Đỏ & Chim Oanh Xuân',
    flowerName: 'Hoa Mai Đỏ (Ume)',
    propName: 'Chim Oanh Hót Trên Cành Mai',
    badgeIcon: '🌺'
  },
  3: {
    month: 3,
    jpTitle: '弥生・桜に幕',
    viTitle: 'Tháng 3 · Anh Đào & Rèm Hội Hanami',
    flowerName: 'Hoa Anh Đào (Sakura)',
    propName: 'Rèm Trẩy Hội Maku & Hoa Đào Rơi',
    badgeIcon: '🌸'
  },
  4: {
    month: 4,
    jpTitle: '卯月・藤に不如帰',
    viTitle: 'Tháng 4 · Giàn Tử Đằng & Chim Cu Nhỏ',
    flowerName: 'Hoa Tử Đằng (Fuji)',
    propName: 'Chim Cu Bay Qua Trăng Lưỡi Liềm',
    badgeIcon: '🍇'
  },
  5: {
    month: 5,
    jpTitle: '皐月・菖蒲に八橋',
    viTitle: 'Tháng 5 · Diên Vĩ & Cầu Gỗ Tám Nhịp',
    flowerName: 'Hoa Diên Vĩ (Ayame)',
    propName: 'Cầu Gỗ Yatsuhashi & Sóng Nước',
    badgeIcon: '⚜️'
  },
  6: {
    month: 6,
    jpTitle: '水無月・牡丹に蝶',
    viTitle: 'Tháng 6 · Mẫu Đơn Phú Quý & Hồ Điệp',
    flowerName: 'Hoa Mẫu Đơn (Botan)',
    propName: 'Đôi Bướm Vàng Lượn Quanh Hoa',
    badgeIcon: '🏵️'
  },
  7: {
    month: 7,
    jpTitle: '文月・萩に猪',
    viTitle: 'Tháng 7 · Cỏ Hồ Chi & Lợn Rừng Thu',
    flowerName: 'Cỏ Đậu Khấu (Hagi)',
    propName: 'Lợn Rừng Inoshishi & Dải Thơ Đỏ',
    badgeIcon: '🌿'
  },
  8: {
    month: 8,
    jpTitle: '葉月・芒に月',
    viTitle: 'Tháng 8 · Đồi Cỏ Lau & Trăng Rằm Thu',
    flowerName: 'Cỏ Lau Bạc (Susuki)',
    propName: 'Trăng Rằm Tsukimi & Đàn Ngỗng Trời',
    badgeIcon: '🌕'
  },
  9: {
    month: 9,
    jpTitle: '長月・菊に盃',
    viTitle: 'Tháng 9 · Cúc Hoàng Gia & Chén Rượu Thọ',
    flowerName: 'Hoa Cúc Vàng (Kiku)',
    propName: 'Chén Rượu Sake Chữ Thọ Sóng Sánh',
    badgeIcon: '🍶'
  },
  10: {
    month: 10,
    jpTitle: '神無月・紅葉に鹿',
    viTitle: 'Tháng 10 · Rừng Phong Đỏ & Hươu Sao',
    flowerName: 'Lá Phong Thu (Momiji)',
    propName: 'Hươu Sao Sừng Vàng & Lá Phong Rơi',
    badgeIcon: '🍁'
  },
  11: {
    month: 11,
    jpTitle: '霜月・柳に小野道風',
    viTitle: 'Tháng 11 · Liễu Mưa, Ô Giấy & Ếch Xanh',
    flowerName: 'Cành Liễu Rủ (Yanagi)',
    propName: 'Ô Giấy Wagasa, Ếch Xanh & Tia Chớp',
    badgeIcon: '☔'
  },
  12: {
    month: 12,
    jpTitle: '師走・桐に鳳凰',
    viTitle: 'Tháng 12 · Hoa Ngô Đồng & Phượng Hoàng',
    flowerName: 'Hoa Ngô Đồng (Kiri)',
    propName: 'Phượng Hoàng Lửa Tung Cánh Kim Sắc',
    badgeIcon: '🦚'
  }
};

// Các tháng đã có tiểu cảnh (mỗi trận chọn ngẫu nhiên trong danh sách này, hoặc theo cài đặt người chơi)
export const AVAILABLE_DIORAMA_MONTHS = [1, 9];

export function getTabletopDioramaInfo(month = 9) {
  return TABLETOP_DIORAMA_CATALOG[month] || null;
}

// ---------- Tháng 1: Tùng Hạc (bố cục xuất từ editor art-test/tieucanh, xem xuat_game_thang1.py) ----------
const M1_DIR = './public/assets/diorama/month1/';
const M1_V = '?v=2'; // tăng mỗi khi thay ảnh trong month1/ (server cache 1 năm cho URL có ?v=)
const m1Src = (name) => `${M1_DIR}${name}.webp${M1_V}`;
// nhịp lắc riêng cho từng element, cố định theo chỉ số để không đổi giữa các lần dựng lại
const m1Rand = (i, a, b) => a + (((Math.sin(i * 12.9898 + 4.1) * 43758.5453) % 1 + 1) % 1) * (b - a);

function m1ItemHTML(e, i) {
  const sway = e.sway
    ? ` m1-sway" style="--d:${m1Rand(i, 4.5, 7).toFixed(2)}s;--dl:${(-m1Rand(i + 7, 0, 7)).toFixed(2)}s;--a:${m1Rand(i + 3, 0.8, 1.6).toFixed(2)}deg;`
    : '" style="';
  const rb = e.ribbon
    ? `<div class="m1-ribbon" style="left:${e.ribbon.left}%;top:${e.ribbon.top}%;width:${e.ribbon.w}%;--r0:${e.ribbon.rot}deg;` +
      `--d:${m1Rand(i + 11, 2.8, 3.8).toFixed(2)}s;--dl:${(-m1Rand(i + 13, 0, 3)).toFixed(2)}s;z-index:${e.ribbon.behind ? -1 : 1}">` +
      `<img src="${m1Src(e.ribbon.src)}" alt="" decoding="async" /></div>`
    : '';
  const img = `<img class="m1-img" src="${m1Src(e.src)}" alt="" decoding="async"${e.flip ? ' style="transform:scaleX(-1)"' : ''} />`;
  if (e.ribbon_solo) { // dải thơ đứng riêng (mobile): đung đưa quanh mép trên
    return `<div class="m1-item" style="left:${e.x}%;top:${e.y}%;width:${e.w}px;z-index:${e.order};transform:translate(-50%,-50%)">` +
      `<div class="m1-ribbon m1-ribbon-solo" style="--r0:${e.rot}deg;--d:${m1Rand(i + 11, 2.8, 3.8).toFixed(2)}s;--dl:${(-m1Rand(i + 13, 0, 3)).toFixed(2)}s">${img}</div></div>`;
  }
  const inner = `<div class="m1-sw">${img}${rb}</div>`;
  if (e.board) {
    // billboard: neo gốc vào mặt bàn (đi theo bàn khi đổi góc 2.5D), xoay bù để luôn đứng thẳng
    return `<div class="kiku-billboard-anchor m1-anchor" style="left:${e.u}%;top:${e.v}%;z-index:${e.order}">` +
      `<div class="m1-item m1-on-board${sway}width:${e.w}px;transform:translate(-50%,-100%) rotate(${e.rot}deg)">${inner}</div></div>`;
  }
  return `<div class="m1-item${sway}left:${e.x}%;top:${e.y}%;width:${e.w}px;z-index:${e.order};transform:translate(-50%,-50%) rotate(${e.rot}deg)">${inner}</div>`;
}

function m1LayerHTML(list, cls, extraBoard = '') {
  const board = list.filter((e) => e.board).map(m1ItemHTML).join('');
  const flat = list.filter((e) => !e.board).map((e, i) => m1ItemHTML(e, i + 40)).join('');
  return `
    <div class="kiku-back-decor-clip ${cls}" aria-hidden="true">
      <div class="kiku-board-plane plane-back">${board}${extraBoard}</div>
      <div class="m1-wrapbox">${flat}</div>
    </div>`;
}

// mây trôi giống hệt tháng 9: cùng lớp trôi, mask mờ 2 mép, độ trong suốt và nhịp "thở"; vị trí bắt đầu = chỗ đặt trong editor
function m1CloudTimings() {
  let low = 0;
  return MONTH1_DIORAMA.clouds.map((c) => {
    const dur = c.high ? 82 : 58;
    const cls = c.high ? 'cloud-center-high' : (low++ % 2 ? 'cloud-right-low' : 'cloud-left-mid') + ' cloud-over-field';
    return { ...c, dur, delay: -(c.phase * dur).toFixed(2), cls };
  });
}

function renderMonth1Ground() {
  const shadows = m1CloudTimings().map((c) => `
        <div class="kiku-drift-track" style="top:${c.shadowTop}px;--drift-dur:${c.dur}s;--drift-delay:${c.delay}s;--cloud-w:${c.w}px">
          <div class="kiku-drift-offset"><div class="kiku-cloud-shadow" style="width:${c.shadowW}px;height:${c.shadowH}px"></div></div>
        </div>`).join('');
  const ground = MONTH1_DIORAMA.shadows.map((g) =>
    `<div class="m1-ground-shadow" style="left:${g.u}%;top:${g.v}%;width:${g.w}px;height:${g.h}px"></div>`).join('');
  return `
    <div class="kiku-month9-ground-layer m1-ground-layer" aria-hidden="true">
      <div class="kiku-shadow-drift-layer">${shadows}
      </div>
      ${ground}
    </div>`;
}

function renderMonth1Billboard() {
  const D = MONTH1_DIORAMA, h = D.hac;
  const hac = h
    ? `<div class="kiku-billboard-anchor m1-anchor m1-hac-anchor" data-scale="${h.scale}" data-flip="${h.flip ? 1 : 0}" style="left:${h.u}%;top:${h.v}%;z-index:${h.order}"></div>`
    : '';
  const clouds = m1CloudTimings().map((c) => `
        <div class="kiku-drift-track" style="top:${c.top + 80}px;--drift-dur:${c.dur}s;--drift-delay:${c.delay}s;--cloud-w:${c.w}px">
          <div class="kiku-drift-offset"><img src="${m1Src(c.src)}" class="kiku-el kiku-cloud ${c.cls}" alt="" decoding="async" /></div>
        </div>`).join('');
  const M = D.mobile || { under: [], over: [] };
  const mobile = `
    <!-- Tháng 1 · Mobile (bố cục thu gọn): bố cục riêng từ editor, không mặt trời / mây / hạc / tùng hàng trên -->
    <div class="m1-mobile m1-m-under" aria-hidden="true">${M.under.map((e, i) => m1ItemHTML(e, i + 80)).join('')}</div>
    <div class="m1-mobile m1-m-over" aria-hidden="true">${M.over.map((e, i) => m1ItemHTML(e, i + 90)).join('')}</div>`;
  return `${mobile}
    <!-- Tháng 1 · Sau bàn (trên nền): mặt trời đỏ + hàng tùng phía sau, nằm dưới mặt bàn và dưới 2 panel -->
    ${m1LayerHTML(D.back, 'm1-back-clip')}
    <!-- Tháng 1 · Trên bài, dưới panel: tùng, dải thơ, hạc -->
    ${m1LayerHTML(D.front, 'm1-front-clip', hac)}
    <!-- Tháng 1 · Mây trôi (trên mọi element) -->
    <div class="kiku-month9-billboard-stage m1-cloud-stage" aria-hidden="true">
      <div class="kiku-cloud-drift-layer layer-front">${clouds}
      </div>
    </div>`;
}

export function renderTabletopFlowerDioramaSVG(month = 9) {
  if (month === 1) return renderMonth1Ground();
  if (month !== 9) return '';
  // Ground-plane layer inside .tabletop-25d-board (tilted with the Tatami mat):
  // - Soft ground shadows cast onto the mat by the 3 high-floating red clouds
  //   (drift tracks share the same timing vars as the clouds, so each shadow follows its cloud)
  // - 4 individual chrysanthemum petals resting flat on the Tatami mat
  return `
    <div class="kiku-month9-ground-layer" aria-hidden="true">
      <div class="kiku-shadow-drift-layer">
        <div class="kiku-drift-track drift-a track-left-mid">
          <div class="kiku-drift-offset"><div class="kiku-cloud-shadow shadow-left-mid"></div></div>
        </div>
        <div class="kiku-drift-track drift-b track-center-high">
          <div class="kiku-drift-offset"><div class="kiku-cloud-shadow shadow-center-high"></div></div>
        </div>
        <div class="kiku-drift-track drift-c track-right-low">
          <div class="kiku-drift-offset"><div class="kiku-cloud-shadow shadow-right-low"></div></div>
        </div>
      </div>

      <img src="./public/assets/diorama/month9/kiku_petal_yellow_1.webp?v=32"
           class="kiku-el kiku-landed-petal lp-1" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_1.webp?v=32"
           class="kiku-el kiku-landed-petal lp-2" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_yellow_2.webp?v=32"
           class="kiku-el kiku-landed-petal lp-3" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_2.webp?v=32"
           class="kiku-el kiku-landed-petal lp-4" alt="" decoding="async" />
    </div>
  `;
}

export function renderTabletopBillboardDioramaHTML(month = 9) {
  if (month === 1) return renderMonth1Billboard();
  if (month !== 9) return '';
  // 2.5D Tabletop Overlay Layers outside .tabletop-25d-board:
  // 1) .kiku-month9-billboard-stage: Flat camera-space layer for the 3 drifting red clouds (unaffected by board tilt)
  // 2) .kiku-back-decor-clip: Clipped at the inner edges of #left-panel & #right-panel (z-index: 24)
  //    - .kiku-left-plant-group: Fixed in camera space under Left UI panel (does not move with board tilt)
  //    - .kiku-board-plane.plane-back: 3D board plane for Top-Right plant (upright billboard, moves/scales with board)
  // 3) .kiku-board-plane.plane-front: 3D board plane for Bottom-Left Sake Cup, Bottom-Right Plant & Falling Petals
  //    (upright billboards that move/scale with board and render on top of side UI panels)
  return `
    <!-- 1. FLAT CAMERA-SPACE DRIFTING WATERCOLOR RED CLOUDS (Unaffected by board tilt) -->
    <div class="kiku-month9-billboard-stage" aria-hidden="true">
      <div class="kiku-cloud-drift-layer layer-back">
        <div class="kiku-drift-track drift-b track-center-high">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v3.webp?v=32"
                 class="kiku-el kiku-cloud cloud-center-high"
                 alt="" decoding="async" />
          </div>
        </div>
      </div>
      <div class="kiku-cloud-drift-layer layer-front">
        <div class="kiku-drift-track drift-a track-left-mid">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v2.webp?v=32"
                 class="kiku-el kiku-cloud cloud-left-mid cloud-over-field"
                 alt="" decoding="async" />
          </div>
        </div>
        <div class="kiku-drift-track drift-c track-right-low">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v1.webp?v=32"
                 class="kiku-el kiku-cloud cloud-right-low cloud-over-field"
                 alt="" decoding="async" />
          </div>
        </div>
      </div>
    </div>

    <!-- 2. BACK DECOR CLIP LAYER (Tucked behind Left/Right UI panels, on top of wooden board) -->
    <div class="kiku-back-decor-clip" aria-hidden="true">
      <!-- Top-Left Chrysanthemum Plant (+130% size) with Purple Poetry Ribbon:
           Fixed under Left UI panel (does NOT move with board tilt) -->
      <div class="kiku-left-plant-group">
        <img src="./public/assets/diorama/month9/kiku_plant_v2.webp?v=32"
             class="kiku-el kiku-plant plant-tl-sweep"
             alt="" decoding="async" />
        <img src="./public/assets/diorama/month9/kiku_purple_ribbon.webp?v=32"
             class="kiku-el kiku-ribbon-aotan"
             alt="" decoding="async" />
      </div>

      <!-- 3D Board Plane for Top-Right Chrysanthemum Cluster (moves/scales with board, stays upright to POV) -->
      <div class="kiku-board-plane plane-back">
        <div class="kiku-billboard-anchor anchor-tr-cluster">
          <img src="./public/assets/diorama/month9/kiku_plant_v3.webp?v=32"
               class="kiku-el kiku-plant plant-tr-cluster"
               alt="" decoding="async" />
        </div>
      </div>
    </div>

    <!-- 3. BOARD-BOUND FRONT DECOR PLANE (Moves/scales with board, stays upright to POV, on top of Left/Right UI panels) -->
    <div class="kiku-board-plane plane-front" aria-hidden="true">
      <!-- Bottom-Right Standing Chrysanthemum Plant -->
      <div class="kiku-billboard-anchor anchor-br-tall">
        <img src="./public/assets/diorama/month9/kiku_plant_v1.webp?v=32"
             class="kiku-el kiku-plant plant-br-tall"
             alt="" decoding="async" />
      </div>

      <!-- Bottom-Left Rock Stream & Sloshing Sakazuki Sake Cup (寿) -->
      <div class="kiku-sakazuki-group">
        <img src="./public/assets/diorama/month9/kiku_rock_stream.webp?v=32"
             class="kiku-el kiku-rock-stream"
             alt="" decoding="async" />
        <div class="kiku-sake-cup-holder">
          <img src="./public/assets/diorama/month9/kiku_sake_cup.webp?v=32"
               class="kiku-el kiku-sake-cup"
               alt="" decoding="async" />
          <div class="kiku-sake-ripple-ring ring-1"></div>
          <div class="kiku-sake-ripple-ring ring-2"></div>
        </div>
      </div>

      <!-- Falling Petals Drifting into the Playing Board -->
      <img src="./public/assets/diorama/month9/kiku_petal_red_1.webp?v=32"
           class="kiku-el kiku-falling-petal fp-1" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_yellow_1.webp?v=32"
           class="kiku-el kiku-falling-petal fp-2" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_2.webp?v=32"
           class="kiku-el kiku-falling-petal fp-3" alt="" decoding="async" />
    </div>
  `;
}

