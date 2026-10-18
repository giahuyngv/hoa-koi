/**
 * HOA KOI (花恋) - Node.js 20 Production Server (Port 80 / Docker Ready)
 * Supports:
 * - Environment variable DB connections: REDIS_URL, MONGO_URL, POSTGRES_URL, MYSQL_URL
 * - Automatic error-free fallback to local JSON file (data/local_db.json)
 * - /health (HTML dashboard & JSON API) & /api/health endpoints
 * - Real-time PvP Online Matchmaking (/api/matchmaking/*) & Custom Code Rooms (/api/rooms/*)
 * - Static file serving for index.html, src/, public/assets/
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');
const crypto = require('crypto');
const { URL } = require('url');

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
  '.woff2': 'font/woff2'
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
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
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
          const room = {
            roomCode: code,
            mode: 'pvp',
            status: 'playing',
            hostId: otherId,
            hostName: otherInfo.playerName || 'Kỳ Thủ 1',
            guestId: playerId,
            guestName: playerName,
            version: 1,
            gameState: null,
            lastAction: null,
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
      const room = {
        roomCode: code,
        mode: body.mode === 'pvp' ? 'pvp' : 'custom',
        status: 'waiting',
        hostId,
        hostName,
        guestId: null,
        guestName: null,
        version: 1,
        gameState: body.gameState && typeof body.gameState === 'object' ? body.gameState : null,
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
      room.version = (room.version || 1) + 1;
      room.updatedAtEpoch = now;
      writeJsonStore(store);
      return sendJson(res, { status: 'ok', room, role: 'guest' });
    }

    if (reqPath.startsWith('/api/rooms/') && reqPath.endsWith('/state')) {
      const code = sanitizeRoomCode(reqPath.slice('/api/rooms/'.length, -'/state'.length));
      const room = code && Object.hasOwn(store.rooms, code) ? store.rooms[code] : null;
      if (!room) return sendJson(res, { error: 'Room not found' }, 404);
      if (body.gameState !== undefined && (body.gameState === null || typeof body.gameState === 'object')) {
        room.gameState = body.gameState;
      }
      if (body.lastAction !== undefined && (body.lastAction === null || typeof body.lastAction === 'object')) {
        room.lastAction = body.lastAction;
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

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    ...SECURITY_HEADERS,
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
  });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(filePath).pipe(res);
});

server.headersTimeout = 15000;
server.requestTimeout = 15000;

const PORT = Number(process.env.PORT) || 80;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[HOA KOI 2.5D] Server listening on http://0.0.0.0:${PORT}`);
});
