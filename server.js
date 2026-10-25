/**
 * HOA KOI (花恋) - Node.js 20 Production Server (Port 80 / Docker Ready)
 * Supports:
 * - Environment variable DB connections: REDIS_URL, MONGO_URL, POSTGRES_URL, MYSQL_URL
 * - Automatic error-free fallback to local JSON file (data/local_db.json)
 * - /health (HTML dashboard & JSON API) & /api/health endpoints
 * - Real-time PvP Online Matchmaking (/api/matchmaking/*) & Custom Code Rooms (/api/rooms/*)
 * - Static file serving for index.html, src/, public/assets/ (brotli/gzip + ETag; file có ?v= cache 1 năm)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');
const crypto = require('crypto');
const { URL } = require('url');
const zlib = require('zlib');

const ROOT_DIR = path.resolve(__dirname);
const DATA_DIR = path.join(ROOT_DIR, 'data');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');
const FALLBACK_JSON_PATH = path.join(DATA_DIR, 'local_db.json');
const MAX_BODY_BYTES = 64 * 1024;

// Load .env if present
(function loadDotEnv() {
  const envFile = path.join(ROOT_DIR, '.env');
  if (!fs.existsSync(envFile)) return;
  try {
    const lines = fs.readFileSync(envFile, 'utf8').split(/\r?\n/);
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith('#') || !line.includes('=')) continue;
      const idx = line.indexOf('=');
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (key && !Object.hasOwn(process.env, key)) {
        process.env[key] = val;
      }
    }
  } catch (_) {}
})();

const MIME_TYPES = Object.freeze({
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4'
});

const SECURITY_HEADERS = Object.freeze({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self' data: blob:; connect-src 'self' data: blob:; frame-ancestors 'self' https://innovation-center.zingplay.dev; base-uri 'self'; form-action 'self'"
});

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeId(raw, fallbackPrefix = 'p') {
  const cleaned = String(raw || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
  if (!cleaned || cleaned === '__proto__' || cleaned === 'constructor' || cleaned === 'prototype') {
    return `${fallbackPrefix}_${crypto.randomUUID().slice(0, 12)}`;
  }
  return cleaned;
}

function sanitizeRoomCode(raw) {
  const cleaned = String(raw || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 12);
  if (cleaned === '__PROTO__' || cleaned === 'CONSTRUCTOR' || cleaned === 'PROTOTYPE') {
    return '';
  }
  return cleaned;
}

function sanitizeText(raw, fallback = 'Kỳ Thủ', maxLen = 32) {
  const cleaned = String(raw || '').replace(/[<>'"&]/g, '').trim().slice(0, maxLen);
  return cleaned || fallback;
}

function maskConnectionUrl(urlStr) {
  if (!urlStr) return null;
  try {
    const parsed = new URL(urlStr);
    const port = parsed.port ? `:${parsed.port}` : '';
    return `${parsed.protocol}//***@${parsed.hostname || 'localhost'}${port}`;
  } catch (_) {
    return 'configured';
  }
}

function ensureJsonStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FALLBACK_JSON_PATH)) {
    const initial = {
      meta: {
        app: 'HOA KOI (花恋)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        storageEngine: 'local_json_fallback'
      },
      rooms: {},
      matchmakingQueue: {},
      matches: [],
      healthChecks: 0
    };
    fs.writeFileSync(FALLBACK_JSON_PATH, JSON.stringify(initial, null, 2), 'utf8');
  }
}

function readJsonStore() {
  try {
    ensureJsonStore();
    const raw = fs.readFileSync(FALLBACK_JSON_PATH, 'utf8');
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') throw new Error('Invalid root');
    data.rooms = data.rooms && typeof data.rooms === 'object' ? data.rooms : {};
    data.matchmakingQueue =
      data.matchmakingQueue && typeof data.matchmakingQueue === 'object' ? data.matchmakingQueue : {};
    data.matches = Array.isArray(data.matches) ? data.matches : [];
    data.meta = data.meta && typeof data.meta === 'object' ? data.meta : {};
    return data;
  } catch (_) {
    try {
      if (fs.existsSync(FALLBACK_JSON_PATH)) fs.unlinkSync(FALLBACK_JSON_PATH);
    } catch (_) {}
    ensureJsonStore();
    return JSON.parse(fs.readFileSync(FALLBACK_JSON_PATH, 'utf8'));
  }
}

function writeJsonStore(data) {
  ensureJsonStore();
  data.meta = data.meta || {};
  data.meta.updatedAt = new Date().toISOString();
  fs.writeFileSync(FALLBACK_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function tcpPing(urlStr, defaultPort) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(urlStr);
      const host = parsed.hostname || 'localhost';
      const port = Number(parsed.port) || defaultPort;
      const socket = net.createConnection({ host, port });
      let done = false;
      const finish = (ok, info) => {
        if (done) return;
        done = true;
        socket.destroy();
        resolve({ ok, info });
      };
      socket.setTimeout(1200);
      socket.on('connect', () => finish(true, `${host}:${port}`));
      socket.on('timeout', () => finish(false, 'Connection timeout'));
      socket.on('error', (err) => finish(false, err.message));
    } catch (err) {
      resolve({ ok: false, info: err.message });
    }
  });
}

async function probeDb(name, envVar, defaultPort) {
  const url = (process.env[envVar] || '').trim();
  if (!url) {
    return {
      name,
      envVar,
      configured: false,
      connected: false,
      status: 'fallback_json',
      detail: `Chưa đặt biến môi trường ${envVar} — Tự động lưu tạm vào file JSON (data/local_db.json)`
    };
  }
  const { ok, info } = await tcpPing(url, defaultPort);
  return {
    name,
    envVar,
    configured: true,
    connected: ok,
    status: ok ? 'connected' : 'fallback_json',
    detail: ok
      ? `Đã kết nối ${name} (${info}) thành công`
      : `Không kết nối được ${envVar} (${info}) — Đã chuyển sang lưu tạm JSON an toàn`
  };
}

async function getHealthReport() {
  const [redis, mongodb, postgresql, mysql] = await Promise.all([
    probeDb('Redis', 'REDIS_URL', 6379),
    probeDb('MongoDB', 'MONGO_URL', 27017),
    probeDb('PostgreSQL', 'POSTGRES_URL', 5432),
    probeDb('MySQL', 'MYSQL_URL', 3306)
  ]);

  const databases = { redis, mongodb, postgresql, mysql };
  const store = readJsonStore();
  store.healthChecks = (store.healthChecks || 0) + 1;
  writeJsonStore(store);

  const anyConnected = Object.values(databases).some((d) => d.connected);
  const statSize = fs.existsSync(FALLBACK_JSON_PATH) ? fs.statSync(FALLBACK_JSON_PATH).size : 0;

  return {
    status: 'ok',
    httpCode: 200,
    service: 'HOA KOI (花恋) Game & Multiplayer DB Server (Node 20)',
    timestamp: new Date().toISOString(),
    activeStorageMode: anyConnected ? 'hybrid_external_db_and_json' : 'local_json_fallback',
    envVars: {
      REDIS_URL: maskConnectionUrl(process.env.REDIS_URL),
      MONGO_URL: maskConnectionUrl(process.env.MONGO_URL),
      POSTGRES_URL: maskConnectionUrl(process.env.POSTGRES_URL),
      MYSQL_URL: maskConnectionUrl(process.env.MYSQL_URL)
    },
    databases,
    jsonFallback: {
      enabled: true,
      filePath: 'data/local_db.json',
      exists: fs.existsSync(FALLBACK_JSON_PATH),
      sizeBytes: statSize,
      roomsCount: Object.keys(store.rooms || {}).length,
      queueCount: Object.keys(store.matchmakingQueue || {}).length,
      matchesSaved: (store.matches || []).length,
      healthChecksCount: store.healthChecks || 1,
      message: 'Tự động lưu vào data/local_db.json khi chạy trên máy cá nhân chưa cài DB'
    }
  };
}

function buildHealthHtml(healthData) {
  const jsonPretty = escapeHtml(JSON.stringify(healthData, null, 2));
  const dbs = healthData.databases;
  const jf = healthData.jsonFallback;

  const renderCard = (key, icon) => {
    const info = dbs[key];
    const badgeBg = info.connected ? '#1b8a5a' : '#d98218';
    const badgeText = info.connected ? 'ĐÃ KẾT NỐI DB' : 'DÙNG JSON FALLBACK';
    const envVal = escapeHtml(healthData.envVars[info.envVar] || 'Chưa thiết lập (Mặc định JSON Fallback)');
    return `
      <div class="db-card">
        <div class="db-card-head">
          <span class="db-title">${escapeHtml(icon)} ${escapeHtml(info.name)} (<code>${escapeHtml(info.envVar)}</code>)</span>
          <span class="db-badge" style="background:${badgeBg}">${badgeText}</span>
        </div>
        <div class="db-env">Biến môi trường: <code>${envVal}</code></div>
        <div class="db-detail">${escapeHtml(info.detail)}</div>
      </div>`;
  };

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kiểm Tra Kết Nối Database (/health) - HOA KOI</title>
  <style>
    body { background:#f6e7d7; color:#3a1f16; font-family:system-ui,sans-serif; padding:20px; }
    .container { max-width:1180px; margin:0 auto; }
    .header-bar { display:flex; justify-content:space-between; align-items:center; background:#8c1d22; color:#fff; padding:16px 24px; border-radius:14px; border:2px solid #f2c15a; margin-bottom:18px; }
    .btn { padding:8px 16px; border-radius:99px; border:2px solid #f2c15a; background:#fff8ed; color:#4a2315; font-weight:800; text-decoration:none; font-size:13px; }
    .db-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; margin-bottom:18px; }
    .db-card { background:#fff9f0; border:2px solid #c88a51; border-radius:14px; padding:15px; }
    .db-card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
    .db-title { font-weight:800; }
    .db-badge { color:#fff; font-size:11px; font-weight:800; padding:3px 9px; border-radius:99px; }
    pre { background:#1a1423; color:#9ef0c0; padding:16px; border-radius:12px; overflow-x:auto; font-size:12.5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-bar">
      <div>
        <h1>🩺 TRẠNG THÁI DATABASE & HỆ THỐNG (/health)</h1>
        <div style="font-size:13px;color:#ffd6de;">REDIS_URL ・ MONGO_URL ・ POSTGRES_URL ・ MYSQL_URL & JSON Fallback (${escapeHtml(jf.filePath)})</div>
      </div>
      <div style="display:flex;gap:8px;">
        <a class="btn" href="/health?format=json">📄 Raw JSON</a>
        <a class="btn" href="/">🎴 Về Bàn Chơi HOA KOI</a>
      </div>
    </div>
    <div class="db-grid">
      ${renderCard('redis', '⚡')}
      ${renderCard('mongodb', '🍃')}
      ${renderCard('postgresql', '🐘')}
      ${renderCard('mysql', '🐬')}
    </div>
    <pre>${jsonPretty}</pre>
  </div>
</body>
</html>`;
}

function cleanStaleEntries(store) {
  const now = Date.now() / 1000;
  for (const [pid, info] of Object.entries(store.matchmakingQueue || {})) {
    if (now - (info.updatedAtEpoch || 0) > 45) delete store.matchmakingQueue[pid];
  }
  for (const [rc, rinfo] of Object.entries(store.rooms || {})) {
    if (now - (rinfo.updatedAtEpoch || 0) > 7200) delete store.rooms[rc];
  }
}

function randomDigits(len = 4) {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += String(crypto.randomInt(0, 10));
  }
  return s;
}

// 48 lá bài Hanafuda tóm tắt để máy chủ tính toán thẩm quyền luật Oya Kime (Chọn người đi trước)
const HANAFUDA_DECK_DEF = Object.freeze([
  { id: 1, month: 1, type: 'hikari', points: 20 },
  { id: 2, month: 1, type: 'tanzaku', points: 5 },
  { id: 3, month: 1, type: 'kasu', points: 1 },
  { id: 4, month: 1, type: 'kasu', points: 1 },
  { id: 5, month: 2, type: 'tane', points: 10 },
  { id: 6, month: 2, type: 'tanzaku', points: 5 },
  { id: 7, month: 2, type: 'kasu', points: 1 },
  { id: 8, month: 2, type: 'kasu', points: 1 },
  { id: 9, month: 3, type: 'hikari', points: 20 },
  { id: 10, month: 3, type: 'tanzaku', points: 5 },
  { id: 11, month: 3, type: 'kasu', points: 1 },
  { id: 12, month: 3, type: 'kasu', points: 1 },
  { id: 13, month: 4, type: 'tane', points: 10 },
  { id: 14, month: 4, type: 'tanzaku', points: 5 },
  { id: 15, month: 4, type: 'kasu', points: 1 },
  { id: 16, month: 4, type: 'kasu', points: 1 },
  { id: 17, month: 5, type: 'tane', points: 10 },
  { id: 18, month: 5, type: 'tanzaku', points: 5 },
  { id: 19, month: 5, type: 'kasu', points: 1 },
  { id: 20, month: 5, type: 'kasu', points: 1 },
  { id: 21, month: 6, type: 'tane', points: 10 },
  { id: 22, month: 6, type: 'tanzaku', points: 5 },
  { id: 23, month: 6, type: 'kasu', points: 1 },
  { id: 24, month: 6, type: 'kasu', points: 1 },
  { id: 25, month: 7, type: 'tane', points: 10 },
  { id: 26, month: 7, type: 'tanzaku', points: 5 },
  { id: 27, month: 7, type: 'kasu', points: 1 },
  { id: 28, month: 7, type: 'kasu', points: 1 },
  { id: 29, month: 8, type: 'hikari', points: 20 },
  { id: 30, month: 8, type: 'tane', points: 10 },
  { id: 31, month: 8, type: 'kasu', points: 1 },
  { id: 32, month: 8, type: 'kasu', points: 1 },
  { id: 33, month: 9, type: 'tane', points: 10 },
  { id: 34, month: 9, type: 'tanzaku', points: 5 },
  { id: 35, month: 9, type: 'kasu', points: 1 },
  { id: 36, month: 9, type: 'kasu', points: 1 },
  { id: 37, month: 10, type: 'tane', points: 10 },
  { id: 38, month: 10, type: 'tanzaku', points: 5 },
  { id: 39, month: 10, type: 'kasu', points: 1 },
  { id: 40, month: 10, type: 'kasu', points: 1 },
  { id: 41, month: 11, type: 'hikari', points: 20 },
  { id: 42, month: 11, type: 'tane', points: 10 },
  { id: 43, month: 11, type: 'tanzaku', points: 5 },
  { id: 44, month: 11, type: 'kasu', points: 1 },
  { id: 45, month: 12, type: 'hikari', points: 20 },
  { id: 46, month: 12, type: 'kasu', points: 1 },
  { id: 47, month: 12, type: 'kasu', points: 1 },
  { id: 48, month: 12, type: 'kasu', points: 1 }
]);

function compareDealerCards(cardA, cardB) {
  if (!cardA || !cardB) return 0;
  if (cardA.month !== cardB.month) {
    return cardA.month - cardB.month;
  }
  const ptsA = Number(cardA.points) || 1;
  const ptsB = Number(cardB.points) || 1;
  if (ptsA !== ptsB) {
    return ptsB - ptsA;
  }
  return 0;
}

function generateServerDealerDraw() {
  let cardA, cardB;
  let diff = 0;
  while (diff === 0) {
    const idxA = crypto.randomInt(0, HANAFUDA_DECK_DEF.length);
    let idxB = crypto.randomInt(0, HANAFUDA_DECK_DEF.length);
    while (idxB === idxA) {
      idxB = crypto.randomInt(0, HANAFUDA_DECK_DEF.length);
    }
    cardA = HANAFUDA_DECK_DEF[idxA];
    cardB = HANAFUDA_DECK_DEF[idxB];
    diff = compareDealerCards(cardA, cardB);
  }

  const winnerRole = diff < 0 ? 'p1' : 'p2';
  const winnerSide = diff < 0 ? 'left' : 'right';

  return {
    cardLeftId: cardA.id,
    cardRightId: cardB.id,
    p1CardId: cardA.id,
    p2CardId: cardB.id,
    p1Side: 'left',
    p2Side: 'right',
    winnerRole,
    winnerSide,
    monthA: cardA.month,
    monthB: cardB.month
  };
}

function createServerInitialMatchState(totalRounds = 3) {
  const dealerDraw = generateServerDealerDraw();
  const dealerRole = dealerDraw.winnerRole;

  let validDeal = false;
  let p1Hand = [], p2Hand = [], field = [], deck = [];
  while (!validDeal) {
    const shuffled = [...HANAFUDA_DECK_DEF];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0, i + 1);
      const tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }
    p1Hand = shuffled.slice(0, 8).sort((a, b) => a.month - b.month || b.points - a.points);
    p2Hand = shuffled.slice(8, 16);
    field = shuffled.slice(16, 24);
    deck = shuffled.slice(24);

    const fieldMonths = {};
    for (const c of field) {
      fieldMonths[c.month] = (fieldMonths[c.month] || 0) + 1;
    }
    const hasFourOnField = Object.values(fieldMonths).includes(4);
    if (!hasFourOnField) {
      validDeal = true;
    }
  }

  const fieldSlots = Array(12).fill(null);
  for (let i = 0; i < 8; i++) {
    fieldSlots[i] = field[i] || null;
  }

  return {
    totalRounds,
    currentRound: 1,
    dealerRole,
    activeTurn: dealerRole,
    subPhase: 'HAND',
    deck,
    field,
    fieldSlots,
    p1Hand,
    p2Hand,
    p1Captured: [],
    p2Captured: [],
    p1Score: 0,
    p2Score: 0,
    p1LastYakuSig: '',
    p2LastYakuSig: '',
    p1CalledKoiKoi: false,
    p2CalledKoiKoi: false,
    dealerDraw,
    roundSummary: null
  };
}

function sendJson(res, payload, status = 200) {
  const raw = Buffer.from(JSON.stringify(payload, null, 2), 'utf8');
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': raw.length,
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
  });
  res.end(raw);
}

function sendHtml(res, htmlStr, status = 200) {
  const raw = Buffer.from(htmlStr, 'utf8');
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': raw.length,
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
  });
  res.end(raw);
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    let totalBytes = 0;
    let aborted = false;
    req.on('data', (c) => {
      if (aborted) return;
      totalBytes += c.length;
      if (totalBytes > MAX_BODY_BYTES) {
        aborted = true;
        req.destroy();
        resolve({});
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      if (aborted) return;
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        const parsed = raw ? JSON.parse(raw) : {};
        resolve(parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {});
      } catch (_) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function resolveSafeStaticFile(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname || '/');
  } catch (_) {
    return null;
  }
  if (decoded.includes('\0')) return null;
  if (decoded === '/' || decoded === '' || decoded === '/index.html') {
    return INDEX_FILE;
  }

  let candidate = null;
  if (decoded.startsWith('/src/')) {
    const resolved = path.resolve(ROOT_DIR, '.' + decoded);
    if (resolved.startsWith(SRC_DIR + path.sep)) candidate = resolved;
  } else if (decoded.startsWith('/public/')) {
    const resolved = path.resolve(ROOT_DIR, '.' + decoded);
    if (resolved.startsWith(PUBLIC_DIR + path.sep)) candidate = resolved;
  } else if (decoded.startsWith('/assets/')) {
    const resolved = path.resolve(PUBLIC_DIR, '.' + decoded);
    if (resolved.startsWith(PUBLIC_DIR + path.sep)) candidate = resolved;
  }

  if (!candidate) return null;
  const base = path.basename(candidate);
  if (base.startsWith('.')) return null;
  const ext = path.extname(candidate).toLowerCase();
  if (!Object.hasOwn(MIME_TYPES, ext)) return null;
  return candidate;
}

const COMPRESSIBLE_EXTS = new Set(['.html', '.js', '.mjs', '.css', '.json', '.svg']);
const compressedCache = new Map(); // filePath -> { etag, br, gzip }

function getCompressed(filePath, etag, encoding) {
  let entry = compressedCache.get(filePath);
  if (!entry || entry.etag !== etag) {
    entry = { etag, br: null, gzip: null };
    compressedCache.set(filePath, entry);
  }
  if (!entry[encoding]) {
    const raw = fs.readFileSync(filePath);
    entry[encoding] =
      encoding === 'br'
        ? zlib.brotliCompressSync(raw, {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
              [zlib.constants.BROTLI_PARAM_SIZE_HINT]: raw.length
            }
          })
        : zlib.gzipSync(raw, { level: 9 });
  }
  return entry[encoding];
}

function pickEncoding(acceptEncoding) {
  const accept = String(acceptEncoding || '').toLowerCase();
  if (/\bbr\b/.test(accept)) return 'br';
  if (/\bgzip\b/.test(accept)) return 'gzip';
  return null;
}

function sendStaticFile(req, res, filePath, searchParams) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(filePath);
  const etag = `W/"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
  // URL có ?v= (bundle, css, ảnh đã đánh version) → cache dài; còn lại (index.html…) phải hỏi lại server bằng ETag
  const versioned = filePath !== INDEX_FILE && searchParams.has('v');
  const compressible = COMPRESSIBLE_EXTS.has(ext);
  const headers = {
    ...SECURITY_HEADERS,
    'Content-Type': contentType,
    'Cache-Control': versioned ? 'public, max-age=31536000, immutable' : 'no-cache',
    ETag: etag
  };
  if (compressible) headers.Vary = 'Accept-Encoding';

  const inm = req.headers['if-none-match'];
  if (inm && inm.split(',').some((t) => t.trim() === etag)) {
    res.writeHead(304, headers);
    return res.end();
  }

  const encoding = compressible && stat.size > 1024 ? pickEncoding(req.headers['accept-encoding']) : null;
  if (encoding) {
    const body = getCompressed(filePath, etag, encoding);
    res.writeHead(200, { ...headers, 'Content-Encoding': encoding, 'Content-Length': body.length });
    return res.end(req.method === 'HEAD' ? undefined : body);
  }

  res.writeHead(200, { ...headers, 'Content-Length': stat.size });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(filePath).pipe(res);
}

ensureJsonStore();

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      ...SECURITY_HEADERS,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url || '/', 'http://localhost');
  const reqPath = parsedUrl.pathname.replace(/\/+$/, '') || '/';

  // 1. Health endpoints
  if (req.method === 'GET' && (reqPath === '/health' || reqPath === '/api/health' || reqPath === '/health.html')) {
    const healthData = await getHealthReport();
    const accept = req.headers.accept || '';
    const wantsJson =
      reqPath === '/api/health' ||
      (parsedUrl.searchParams.get('format') || '').toLowerCase() === 'json' ||
      accept.includes('application/json') ||
      (!accept.includes('text/html') && accept !== '*/*');

    if (wantsJson && reqPath !== '/health.html') {
      return sendJson(res, healthData, 200);
    }
    return sendHtml(res, buildHealthHtml(healthData), 200);
  }

  // 2. Get Room State
  if (req.method === 'GET' && reqPath.startsWith('/api/rooms/')) {
    const code = sanitizeRoomCode(reqPath.slice('/api/rooms/'.length));
    if (!code) return sendJson(res, { error: 'Mã phòng không hợp lệ' }, 400);
    const store = readJsonStore();
    const room = Object.hasOwn(store.rooms, code) ? store.rooms[code] : null;
    if (!room) return sendJson(res, { error: 'Không tìm thấy phòng' }, 404);
    return sendJson(res, { status: 'ok', room }, 200);
  }

  // 3. POST API endpoints
  if (req.method === 'POST') {
    const body = await readJsonBody(req);
    const store = readJsonStore();
    cleanStaleEntries(store);
    const now = Date.now() / 1000;

    if (reqPath === '/api/matchmaking/join') {
      const playerId = sanitizeId(body.playerId, 'p');
      const playerName = sanitizeText(body.playerName, 'Kỳ Thủ');
      const queue = store.matchmakingQueue;

      const existing = Object.hasOwn(queue, playerId) ? queue[playerId] : null;
      if (existing && existing.matchedRoomCode && Object.hasOwn(store.rooms, existing.matchedRoomCode)) {
        const room = store.rooms[existing.matchedRoomCode];
        return sendJson(res, { status: 'matched', room, role: room.hostId === playerId ? 'host' : 'guest' });
      }

      for (const [otherId, otherInfo] of Object.entries(queue)) {
        if (otherId !== playerId && !otherInfo.matchedRoomCode) {
          const code = 'PVP' + randomDigits(4);
          const initialMatchState = createServerInitialMatchState(3);
          const room = {
            roomCode: code,
            mode: 'pvp',
            status: 'playing',
            hostId: otherId,
            hostName: otherInfo.playerName || 'Kỳ Thủ 1',
            guestId: playerId,
            guestName: playerName,
            version: 1,
            gameState: initialMatchState,
            lastAction: { type: 'MATCH_START' },
            createdAt: new Date().toISOString(),
            updatedAtEpoch: now
          };
          store.rooms[code] = room;
          otherInfo.matchedRoomCode = code;
          otherInfo.updatedAtEpoch = now;
          queue[playerId] = { playerId, playerName, matchedRoomCode: code, updatedAtEpoch: now };
          writeJsonStore(store);
          return sendJson(res, { status: 'matched', room, role: 'guest' });
        }
      }

      queue[playerId] = { playerId, playerName, matchedRoomCode: null, updatedAtEpoch: now };
      writeJsonStore(store);
      const queueSize = Object.values(queue).filter((q) => !q.matchedRoomCode).length;
      return sendJson(res, { status: 'searching', queueSize });
    }

    if (reqPath === '/api/matchmaking/poll') {
      const playerId = sanitizeId(body.playerId, '');
      const entry = playerId && Object.hasOwn(store.matchmakingQueue, playerId) ? store.matchmakingQueue[playerId] : null;
      if (!entry) return sendJson(res, { status: 'idle' });
      entry.updatedAtEpoch = now;
      if (entry.matchedRoomCode && Object.hasOwn(store.rooms, entry.matchedRoomCode)) {
        const room = store.rooms[entry.matchedRoomCode];
        writeJsonStore(store);
        return sendJson(res, { status: 'matched', room, role: room.hostId === playerId ? 'host' : 'guest' });
      }
      writeJsonStore(store);
      const queueSize = Object.values(store.matchmakingQueue).filter((q) => !q.matchedRoomCode).length;
      return sendJson(res, { status: 'searching', queueSize });
    }

    if (reqPath === '/api/matchmaking/leave') {
      const playerId = sanitizeId(body.playerId, '');
      if (playerId && Object.hasOwn(store.matchmakingQueue, playerId)) {
        delete store.matchmakingQueue[playerId];
      }
      writeJsonStore(store);
      return sendJson(res, { status: 'left' });
    }

    if (reqPath === '/api/rooms/create') {
      const hostId = sanitizeId(body.hostId, 'p');
      const hostName = sanitizeText(body.hostName, 'Kỳ Thủ 1');
      const requestedCode = sanitizeRoomCode(body.roomCode);
      let code = requestedCode || randomDigits(4);
      while (!requestedCode && Object.hasOwn(store.rooms, code)) {
        code = randomDigits(4);
      }
      let initialGameState =
        body.gameState && typeof body.gameState === 'object' ? body.gameState : null;
      if (!initialGameState) {
        initialGameState = createServerInitialMatchState(3);
      } else if (!initialGameState.dealerDraw || initialGameState.currentRound === 1) {
        const dealerDraw = generateServerDealerDraw();
        initialGameState.dealerDraw = dealerDraw;
        initialGameState.dealerRole = dealerDraw.winnerRole;
        initialGameState.activeTurn = dealerDraw.winnerRole;
      }
      const room = {
        roomCode: code,
        mode: body.mode === 'pvp' ? 'pvp' : 'custom',
        status: 'waiting',
        hostId,
        hostName,
        guestId: null,
        guestName: null,
        version: 1,
        gameState: initialGameState,
        lastAction: null,
        createdAt: new Date().toISOString(),
        updatedAtEpoch: now
      };
      store.rooms[code] = room;
      writeJsonStore(store);
      return sendJson(res, { status: 'ok', room, role: 'host' });
    }

    if (reqPath === '/api/rooms/join') {
      const code = sanitizeRoomCode(body.roomCode);
      const guestId = sanitizeId(body.guestId, 'p');
      const guestName = sanitizeText(body.guestName, 'Kỳ Thủ 2');
      const room = code && Object.hasOwn(store.rooms, code) ? store.rooms[code] : null;
      if (!room) {
        return sendJson(res, { error: `Không tìm thấy phòng mã số [${code}]!` }, 404);
      }
      if (room.hostId === guestId) {
        room.updatedAtEpoch = now;
        writeJsonStore(store);
        return sendJson(res, { status: 'ok', room, role: 'host' });
      }
      room.guestId = guestId;
      room.guestName = guestName;
      room.status = 'playing';
      // Đảm bảo ván 1 có dealerDraw hợp lệ do server thẩm quyền
      if (room.gameState && (!room.gameState.dealerDraw || room.gameState.currentRound === 1)) {
        if (!room.gameState.dealerDraw) {
          const dealerDraw = generateServerDealerDraw();
          room.gameState.dealerDraw = dealerDraw;
          room.gameState.dealerRole = dealerDraw.winnerRole;
          room.gameState.activeTurn = dealerDraw.winnerRole;
        }
      }
      room.version = (room.version || 1) + 1;
      room.updatedAtEpoch = now;
      writeJsonStore(store);
      return sendJson(res, { status: 'ok', room, role: 'guest' });
    }

    if (reqPath.startsWith('/api/rooms/') && reqPath.endsWith('/state')) {
      const code = sanitizeRoomCode(reqPath.slice('/api/rooms/'.length, -'/state'.length));
      const room = code && Object.hasOwn(store.rooms, code) ? store.rooms[code] : null;
      if (!room) return sendJson(res, { error: 'Room not found' }, 404);
      if (body.lastAction && body.lastAction.type === 'REMATCH') {
        const totalRounds = (body.gameState && body.gameState.totalRounds) || 3;
        room.gameState = createServerInitialMatchState(totalRounds);
        room.lastAction = body.lastAction;
      } else {
        if (body.gameState !== undefined && (body.gameState === null || typeof body.gameState === 'object')) {
          room.gameState = body.gameState;
        }
        if (body.lastAction !== undefined && (body.lastAction === null || typeof body.lastAction === 'object')) {
          room.lastAction = body.lastAction;
        }
      }
      if (typeof body.status === 'string' && ['waiting', 'playing', 'finished'].includes(body.status)) {
        room.status = body.status;
      }
      room.version = (room.version || 1) + 1;
      room.updatedAtEpoch = now;
      writeJsonStore(store);
      return sendJson(res, { status: 'ok', room });
    }

    if (reqPath === '/api/matches/record') {
      const entry = {
        id: `match_${crypto.randomUUID().slice(0, 12)}`,
        recordedAt: new Date().toISOString(),
        winner: sanitizeText(body.winner, 'none', 16),
        playerScore: Number(body.playerScore) || 0,
        aiScore: Number(body.aiScore) || 0,
        rounds: Number(body.rounds) || 0
      };
      store.matches.unshift(entry);
      store.matches = store.matches.slice(0, 50);
      writeJsonStore(store);
      return sendJson(res, { status: 'ok', record: entry });
    }

    return sendJson(res, { error: 'Unknown API endpoint' }, 404);
  }

  // 4. Static file serving (index.html, src/*, public/*, assets/*)
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Method Not Allowed');
  }

  const filePath = resolveSafeStaticFile(parsedUrl.pathname);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('404 Not Found');
  }

  return sendStaticFile(req, res, filePath, parsedUrl.searchParams);
});

server.headersTimeout = 15000;
server.requestTimeout = 15000;

const PORT = Number(process.env.PORT) || 80;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[HOA KOI 2.5D] Server listening on http://0.0.0.0:${PORT}`);
});
