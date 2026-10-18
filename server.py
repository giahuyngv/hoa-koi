#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HOA KOI (花恋) - Unified Game Server, Multiplayer Coordinator & Multi-DB Adapter
Supports:
- Environment variable DB connections: REDIS_URL, MONGO_URL, POSTGRES_URL, MYSQL_URL
- Automatic error-free fallback to local JSON file (data/local_db.json) when running on a personal PC without DBs
- /health (HTML dashboard & JSON API) & /api/health endpoints
- Real-time PvP Online Matchmaking (/api/matchmaking/*) & Custom Code Rooms (/api/rooms/*) for 2-tab / multi-browser play
- Static file serving for index.html, src/, assets/, public/assets/
"""

import json
import mimetypes
import os
import random
import socket
import string
import threading
import time
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT_DIR = Path(__file__).resolve().parent
DATA_DIR = ROOT_DIR / "data"
FALLBACK_JSON_PATH = DATA_DIR / "local_db.json"

# Ensure proper MIME types for ES6 modules, SVG, WebP, JPG, WOFF2
mimetypes.init()
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("image/jpeg", ".jpg")
mimetypes.add_type("image/png", ".png")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("application/json", ".json")


def load_dotenv_if_exists():
    """Loads key=value pairs from .env if present without external dependencies."""
    env_file = ROOT_DIR / ".env"
    if not env_file.exists():
        return
    try:
        for raw_line in env_file.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = val
    except Exception:
        pass


load_dotenv_if_exists()


class MultiDatabaseAdapter:
    """
    Manages connections to Redis (REDIS_URL), MongoDB (MONGO_URL),
    PostgreSQL (POSTGRES_URL), and MySQL (MYSQL_URL).
    Automatically falls back to data/local_db.json if no DB is configured or reachable.
    """

    def __init__(self):
        self.lock = threading.Lock()
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        self._ensure_json_store()

        self.redis_client = None
        self.mongo_client = None
        self.postgres_conn = None
        self.mysql_conn = None

        self.db_status = {
            "redis": self._probe_redis(),
            "mongodb": self._probe_mongo(),
            "postgresql": self._probe_postgres(),
            "mysql": self._probe_mysql(),
        }

    def _ensure_json_store(self):
        if not FALLBACK_JSON_PATH.exists():
            initial_data = {
                "meta": {
                    "app": "HOA KOI (花恋)",
                    "createdAt": datetime.now(timezone.utc).isoformat(),
                    "updatedAt": datetime.now(timezone.utc).isoformat(),
                    "storageEngine": "local_json_fallback",
                },
                "rooms": {},
                "matchmakingQueue": {},
                "matches": [],
                "healthChecks": 0,
            }
            FALLBACK_JSON_PATH.write_text(
                json.dumps(initial_data, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )

    def _read_json_store(self):
        with self.lock:
            try:
                self._ensure_json_store()
                raw = FALLBACK_JSON_PATH.read_text(encoding="utf-8")
                data = json.loads(raw)
                if not isinstance(data, dict):
                    raise ValueError("Invalid JSON root")
                data.setdefault("rooms", {})
                data.setdefault("matchmakingQueue", {})
                data.setdefault("matches", [])
                data.setdefault("meta", {})
                return data
            except Exception:
                # Re-initialize if corrupted
                FALLBACK_JSON_PATH.unlink(missing_ok=True)
                self._ensure_json_store()
                return json.loads(FALLBACK_JSON_PATH.read_text(encoding="utf-8"))

    def _write_json_store(self, data):
        with self.lock:
            data.setdefault("meta", {})
            data["meta"]["updatedAt"] = datetime.now(timezone.utc).isoformat()
            FALLBACK_JSON_PATH.write_text(
                json.dumps(data, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )

    def _tcp_ping(self, url_str, default_port):
        """Lightweight TCP connectivity test for a database URL."""
        try:
            parsed = urlparse(url_str)
            host = parsed.hostname or "localhost"
            port = parsed.port or default_port
            with socket.create_connection((host, port), timeout=1.2):
                return True, f"{host}:{port}"
        except Exception as exc:
            return False, str(exc)

    def _probe_redis(self):
        url = os.environ.get("REDIS_URL", "").strip()
        if not url:
            return {
                "name": "Redis",
                "envVar": "REDIS_URL",
                "configured": False,
                "connected": False,
                "status": "fallback_json",
                "detail": "Chưa đặt biến môi trường REDIS_URL — Tự động lưu tạm vào file JSON (data/local_db.json)",
            }
        try:
            import redis  # type: ignore

            client = redis.from_url(url, socket_connect_timeout=1.5)
            client.ping()
            self.redis_client = client
            return {
                "name": "Redis",
                "envVar": "REDIS_URL",
                "configured": True,
                "connected": True,
                "status": "connected",
                "detail": f"Đã kết nối Redis thành công ({self._mask_url(url)})",
            }
        except Exception:
            ok, info = self._tcp_ping(url, 6379)
            return {
                "name": "Redis",
                "envVar": "REDIS_URL",
                "configured": True,
                "connected": ok,
                "status": "connected_tcp" if ok else "fallback_json",
                "detail": (
                    f"Kết nối cổng Redis ({info}) thành công"
                    if ok
                    else f"Không kết nối được REDIS_URL ({info}) — Đã chuyển sang lưu tạm JSON an toàn"
                ),
            }

    def _probe_mongo(self):
        url = os.environ.get("MONGO_URL", "").strip()
        if not url:
            return {
                "name": "MongoDB",
                "envVar": "MONGO_URL",
                "configured": False,
                "connected": False,
                "status": "fallback_json",
                "detail": "Chưa đặt biến môi trường MONGO_URL — Tự động lưu tạm vào file JSON (data/local_db.json)",
            }
        try:
            import pymongo  # type: ignore

            client = pymongo.MongoClient(url, serverSelectionTimeoutMS=1500)
            client.admin.command("ping")
            self.mongo_client = client
            return {
                "name": "MongoDB",
                "envVar": "MONGO_URL",
                "configured": True,
                "connected": True,
                "status": "connected",
                "detail": f"Đã kết nối MongoDB thành công ({self._mask_url(url)})",
            }
        except Exception:
            ok, info = self._tcp_ping(url, 27017)
            return {
                "name": "MongoDB",
                "envVar": "MONGO_URL",
                "configured": True,
                "connected": ok,
                "status": "connected_tcp" if ok else "fallback_json",
                "detail": (
                    f"Kết nối cổng MongoDB ({info}) thành công"
                    if ok
                    else f"Không kết nối được MONGO_URL ({info}) — Đã chuyển sang lưu tạm JSON an toàn"
                ),
            }

    def _probe_postgres(self):
        url = os.environ.get("POSTGRES_URL", "").strip()
        if not url:
            return {
                "name": "PostgreSQL",
                "envVar": "POSTGRES_URL",
                "configured": False,
                "connected": False,
                "status": "fallback_json",
                "detail": "Chưa đặt biến môi trường POSTGRES_URL — Tự động lưu tạm vào file JSON (data/local_db.json)",
            }
        try:
            import psycopg2  # type: ignore

            conn = psycopg2.connect(url, connect_timeout=2)
            self.postgres_conn = conn
            return {
                "name": "PostgreSQL",
                "envVar": "POSTGRES_URL",
                "configured": True,
                "connected": True,
                "status": "connected",
                "detail": f"Đã kết nối PostgreSQL thành công ({self._mask_url(url)})",
            }
        except Exception:
            ok, info = self._tcp_ping(url, 5432)
            return {
                "name": "PostgreSQL",
                "envVar": "POSTGRES_URL",
                "configured": True,
                "connected": ok,
                "status": "connected_tcp" if ok else "fallback_json",
                "detail": (
                    f"Kết nối cổng PostgreSQL ({info}) thành công"
                    if ok
                    else f"Không kết nối được POSTGRES_URL ({info}) — Đã chuyển sang lưu tạm JSON an toàn"
                ),
            }

    def _probe_mysql(self):
        url = os.environ.get("MYSQL_URL", "").strip()
        if not url:
            return {
                "name": "MySQL",
                "envVar": "MYSQL_URL",
                "configured": False,
                "connected": False,
                "status": "fallback_json",
                "detail": "Chưa đặt biến môi trường MYSQL_URL — Tự động lưu tạm vào file JSON (data/local_db.json)",
            }
        ok, info = self._tcp_ping(url, 3306)
        return {
            "name": "MySQL",
            "envVar": "MYSQL_URL",
            "configured": True,
            "connected": ok,
            "status": "connected" if ok else "fallback_json",
            "detail": (
                f"Đã kết nối MySQL ({info}) thành công"
                if ok
                else f"Không kết nối được MYSQL_URL ({info}) — Đã chuyển sang lưu tạm JSON an toàn"
            ),
        }

    @staticmethod
    def _mask_url(url):
        try:
            parsed = urlparse(url)
            host = parsed.hostname or "localhost"
            port = f":{parsed.port}" if parsed.port else ""
            return f"{parsed.scheme}://{host}{port}{parsed.path or ''}"
        except Exception:
            return "configured"

    def refresh_health(self):
        self.db_status = {
            "redis": self._probe_redis(),
            "mongodb": self._probe_mongo(),
            "postgresql": self._probe_postgres(),
            "mysql": self._probe_mysql(),
        }
        store = self._read_json_store()
        store["healthChecks"] = store.get("healthChecks", 0) + 1
        self._write_json_store(store)

        any_external_connected = any(
            d.get("connected") for d in self.db_status.values()
        )
        return {
            "status": "ok",
            "httpCode": 200,
            "service": "HOA KOI (花恋) Game & Multiplayer DB Server",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "activeStorageMode": (
                "hybrid_external_db_and_json"
                if any_external_connected
                else "local_json_fallback"
            ),
            "envVars": {
                "REDIS_URL": os.environ.get("REDIS_URL") or None,
                "MONGO_URL": os.environ.get("MONGO_URL") or None,
                "POSTGRES_URL": os.environ.get("POSTGRES_URL") or None,
                "MYSQL_URL": os.environ.get("MYSQL_URL") or None,
            },
            "databases": self.db_status,
            "jsonFallback": {
                "enabled": True,
                "filePath": "data/local_db.json",
                "exists": FALLBACK_JSON_PATH.exists(),
                "sizeBytes": (
                    FALLBACK_JSON_PATH.stat().st_size
                    if FALLBACK_JSON_PATH.exists()
                    else 0
                ),
                "roomsCount": len(store.get("rooms", {})),
                "queueCount": len(store.get("matchmakingQueue", {})),
                "matchesSaved": len(store.get("matches", [])),
                "healthChecksCount": store.get("healthChecks", 1),
                "message": "Tự động lưu vào data/local_db.json khi chạy trên máy cá nhân chưa cài DB",
            },
        }

    # =========================================================================
    # MULTIPLAYER ROOMS & MATCHMAKING PERSISTENCE
    # =========================================================================

    def _clean_stale_entries(self, store):
        now = time.time()
        # Clean matchmaking entries older than 45 seconds without heartbeat
        queue = store.get("matchmakingQueue", {})
        stale_q = [
            pid
            for pid, info in queue.items()
            if now - info.get("updatedAtEpoch", 0) > 45
        ]
        for pid in stale_q:
            del queue[pid]

        # Clean rooms older than 2 hours
        rooms = store.get("rooms", {})
        stale_r = [
            rc
            for rc, rinfo in rooms.items()
            if now - rinfo.get("updatedAtEpoch", 0) > 7200
        ]
        for rc in stale_r:
            del rooms[rc]

    def create_room(self, host_id, host_name, custom_code=None, mode="custom", initial_state=None):
        store = self._read_json_store()
        self._clean_stale_entries(store)

        if custom_code:
            code = str(custom_code).strip().upper()
        else:
            code = "".join(random.choices(string.digits, k=4))
            while code in store["rooms"]:
                code = "".join(random.choices(string.digits, k=4))

        now = time.time()
        room = {
            "roomCode": code,
            "mode": mode,
            "status": "waiting",
            "hostId": host_id,
            "hostName": host_name or "Kỳ Thủ 1",
            "guestId": None,
            "guestName": None,
            "version": 1,
            "gameState": initial_state or None,
            "lastAction": None,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "updatedAtEpoch": now,
        }
        store["rooms"][code] = room
        self._write_json_store(store)
        return room

    def join_room(self, room_code, guest_id, guest_name):
        store = self._read_json_store()
        self._clean_stale_entries(store)
        code = str(room_code).strip().upper()
        room = store["rooms"].get(code)
        if not room:
            return {"error": f"Không tìm thấy phòng mã số [{code}]! Hãy kiểm tra lại mã phòng."}

        if room["hostId"] == guest_id:
            room["updatedAtEpoch"] = time.time()
            self._write_json_store(store)
            return {"room": room, "role": "host"}

        if room["guestId"] and room["guestId"] != guest_id:
            # Allow replacing if room was waiting or rejoining
            pass

        room["guestId"] = guest_id
        room["guestName"] = guest_name or "Kỳ Thủ 2"
        room["status"] = "playing"
        room["version"] = room.get("version", 1) + 1
        room["updatedAtEpoch"] = time.time()
        self._write_json_store(store)
        return {"room": room, "role": "guest"}

    def get_room(self, room_code):
        store = self._read_json_store()
        code = str(room_code).strip().upper()
        return store["rooms"].get(code)

    def update_room_state(self, room_code, actor_id, game_state, last_action=None, status=None):
        store = self._read_json_store()
        code = str(room_code).strip().upper()
        room = store["rooms"].get(code)
        if not room:
            return {"error": "Room not found"}

        room["gameState"] = game_state
        if last_action is not None:
            room["lastAction"] = last_action
        if status:
            room["status"] = status
        room["version"] = room.get("version", 1) + 1
        room["updatedAtEpoch"] = time.time()
        self._write_json_store(store)
        return {"room": room}

    def join_matchmaking(self, player_id, player_name):
        store = self._read_json_store()
        self._clean_stale_entries(store)
        queue = store["matchmakingQueue"]
        now = time.time()

        # Check if this player was already matched into a room
        existing = queue.get(player_id)
        if existing and existing.get("matchedRoomCode"):
            room = store["rooms"].get(existing["matchedRoomCode"])
            if room:
                role = "host" if room["hostId"] == player_id else "guest"
                return {"status": "matched", "room": room, "role": role}

        # Look for another waiting player in the queue
        for other_id, other_info in list(queue.items()):
            if other_id != player_id and not other_info.get("matchedRoomCode"):
                # Match found! Create a shared PvP room
                code = "PVP" + "".join(random.choices(string.digits, k=4))
                room = {
                    "roomCode": code,
                    "mode": "pvp",
                    "status": "playing",
                    "hostId": other_id,
                    "hostName": other_info.get("playerName", "Kỳ Thủ 1"),
                    "guestId": player_id,
                    "guestName": player_name or "Kỳ Thủ 2",
                    "version": 1,
                    "gameState": None,
                    "lastAction": None,
                    "createdAt": datetime.now(timezone.utc).isoformat(),
                    "updatedAtEpoch": now,
                }
                store["rooms"][code] = room
                other_info["matchedRoomCode"] = code
                other_info["updatedAtEpoch"] = now
                queue[player_id] = {
                    "playerId": player_id,
                    "playerName": player_name or "Kỳ Thủ 2",
                    "matchedRoomCode": code,
                    "updatedAtEpoch": now,
                }
                self._write_json_store(store)
                return {"status": "matched", "room": room, "role": "guest"}

        # Otherwise place player in waiting queue
        queue[player_id] = {
            "playerId": player_id,
            "playerName": player_name or "Kỳ Thủ",
            "matchedRoomCode": None,
            "updatedAtEpoch": now,
        }
        self._write_json_store(store)
        return {
            "status": "searching",
            "queueSize": len([q for q in queue.values() if not q.get("matchedRoomCode")]),
        }

    def poll_matchmaking(self, player_id):
        store = self._read_json_store()
        self._clean_stale_entries(store)
        queue = store["matchmakingQueue"]
        entry = queue.get(player_id)
        if not entry:
            return {"status": "idle"}

        entry["updatedAtEpoch"] = time.time()
        matched_code = entry.get("matchedRoomCode")
        if matched_code and matched_code in store["rooms"]:
            room = store["rooms"][matched_code]
            role = "host" if room["hostId"] == player_id else "guest"
            self._write_json_store(store)
            return {"status": "matched", "room": room, "role": role}

        self._write_json_store(store)
        return {
            "status": "searching",
            "queueSize": len([q for q in queue.values() if not q.get("matchedRoomCode")]),
        }

    def leave_matchmaking(self, player_id):
        store = self._read_json_store()
        if player_id in store["matchmakingQueue"]:
            del store["matchmakingQueue"][player_id]
            self._write_json_store(store)
        return {"status": "left"}

    def record_match(self, record):
        store = self._read_json_store()
        entry = {
            "id": f"match_{int(time.time() * 1000)}",
            "recordedAt": datetime.now(timezone.utc).isoformat(),
            **(record if isinstance(record, dict) else {}),
        }
        store.setdefault("matches", []).insert(0, entry)
        store["matches"] = store["matches"][:50]
        self._write_json_store(store)
        return entry


db_adapter = MultiDatabaseAdapter()


def build_health_html(health_data):
    """Renders a Vietnamese 16:9 Health Check Dashboard Page for /health."""
    json_pretty = json.dumps(health_data, ensure_ascii=False, indent=2)
    dbs = health_data["databases"]
    jf = health_data["jsonFallback"]

    def render_db_card(key, icon):
        info = dbs[key]
        is_conn = info["connected"]
        badge_bg = "#1b8a5a" if is_conn else "#d98218"
        badge_text = "ĐÃ KẾT NỐI DB" if is_conn else "DÙNG JSON FALLBACK"
        env_val = health_data["envVars"].get(info["envVar"]) or "Chưa thiết lập (Mặc định máy cá nhân)"
        return f"""
        <div class="db-card">
          <div class="db-card-head">
            <span class="db-title">{icon} {info['name']} (<code>{info['envVar']}</code>)</span>
            <span class="db-badge" style="background:{badge_bg}">{badge_text}</span>
          </div>
          <div class="db-env">Biến môi trường: <code>{env_val}</code></div>
          <div class="db-detail">{info['detail']}</div>
        </div>
        """

    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kiểm Tra Kết Nối Database (/health) - HANA-KOI 2.5D</title>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&family=Noto+Serif+JP:wght@700;900&display=swap" rel="stylesheet" />
  <style>
    :root {{
      --bg: #f6e7d7;
      --card: #fff9f0;
      --text: #3a1f16;
      --muted: #785546;
      --border: #c88a51;
      --accent: #b52b2f;
    }}
    body.dark-mode {{
      --bg: #120e1a;
      --card: #21192d;
      --text: #f7efe2;
      --muted: #bda9cf;
      --border: #7c5694;
      --accent: #ff758f;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: var(--bg);
      color: var(--text);
      font-family: 'Be Vietnam Pro', system-ui, sans-serif;
      padding: 20px;
      min-height: 100vh;
    }}
    .container {{
      max-width: 1180px;
      margin: 0 auto;
    }}
    .header-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(180deg, #9e2327, #7d171b);
      color: #fff;
      padding: 16px 24px;
      border-radius: 18px;
      border: 2.5px solid #f2c15a;
      margin-bottom: 18px;
      flex-wrap: wrap;
      gap: 12px;
    }}
    .header-bar h1 {{
      font-family: 'Noto Serif JP', serif;
      font-size: 22px;
    }}
    .btn {{
      padding: 8px 16px;
      border-radius: 999px;
      border: 2px solid #f2c15a;
      background: #fff8ed;
      color: #4a2315;
      font-weight: 800;
      text-decoration: none;
      cursor: pointer;
      font-size: 13px;
    }}
    .status-banner {{
      background: var(--card);
      border: 2.5px solid #1b8a5a;
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }}
    .db-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 14px;
      margin-bottom: 18px;
    }}
    .db-card {{
      background: var(--card);
      border: 2px solid var(--border);
      border-radius: 16px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }}
    .db-card-head {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }}
    .db-title {{ font-weight: 800; font-size: 15px; }}
    .db-badge {{
      color: #fff;
      font-size: 10.5px;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 99px;
    }}
    .db-env {{ font-size: 12px; color: var(--muted); }}
    .db-detail {{ font-size: 12.5px; line-height: 1.45; }}
    pre {{
      background: #1a1423;
      color: #9ef0c0;
      padding: 16px;
      border-radius: 14px;
      overflow-x: auto;
      font-size: 12.5px;
      border: 2px solid var(--border);
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header-bar">
      <div>
        <h1>🩺 TRẠNG THÁI DATABASE & HỆ THỐNG (/health)</h1>
        <div style="font-size:12.5px; color:#ffd6de;">Hỗ trợ REDIS_URL ・ MONGO_URL ・ POSTGRES_URL ・ MYSQL_URL & Tự động lưu JSON Fallback</div>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn" onclick="document.body.classList.toggle('dark-mode')">🌙 Đổi Sáng/Tối</button>
        <a class="btn" href="/health?format=json">📄 Xem Raw JSON</a>
        <a class="btn" href="/">🎴 Về Bàn Chơi HANA-KOI 2.5D</a>
      </div>
    </div>

    <div class="status-banner">
      <div>
        <div style="font-size:12px; font-weight:800; color:#1b8a5a;">● HTTP 200 OK — HEALTH CHECK PASSED</div>
        <h2 style="font-size:18px; margin-top:3px;">Chế độ lưu trữ hiện tại: <code>{health_data['activeStorageMode']}</code></h2>
        <p style="font-size:13px; color:var(--muted); margin-top:4px;">
          File lưu tạm tự động: <strong><code>{jf['filePath']}</code></strong> ({jf['sizeBytes']} bytes) —
          Phòng đang mở: <strong>{jf['roomsCount']}</strong> | Lịch sử trận đấu: <strong>{jf['matchesSaved']}</strong> | Lượt kiểm tra: <strong>{jf['healthChecksCount']}</strong>
        </p>
      </div>
      <button class="btn" id="btn-test-write" style="background:#1b8a5a; color:#fff; border-color:#fff;">
        🧪 Kiểm Thử Ghi Dữ Liệu Vào DB / JSON
      </button>
    </div>

    <div class="db-grid">
      {render_db_card('redis', '⚡')}
      {render_db_card('mongodb', '🍃')}
      {render_db_card('postgresql', '🐘')}
      {render_db_card('mysql', '🐬')}
    </div>

    <h3 style="margin-bottom:8px; font-size:15px;">📦 Dữ Liệu JSON Trả Về Từ Endpoint <code>/health</code>:</h3>
    <pre id="health-json">{json_pretty}</pre>
  </div>
  <script>
    if (localStorage.getItem('hanakoi_theme_mode') === 'dark') {{
      document.body.classList.add('dark-mode');
    }}
    document.getElementById('btn-test-write')?.addEventListener('click', async () => {{
      const res = await fetch('/api/matches/record', {{
        method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify({{ mode: 'health_test', winner: 'player', score: '15-0', note: 'Kiểm thử ghi DB từ trang /health' }})
      }});
      const data = await res.json();
      alert('Đã ghi bản ghi kiểm thử thành công vào DB / JSON: ' + data.record.id);
      window.location.reload();
    }});
  </script>
</body>
</html>"""


class HanaKoiRequestHandler(SimpleHTTPRequestHandler):
    """Custom HTTP handler serving static game files, /health, and Multiplayer/DB REST APIs."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)

    def log_message(self, format, *args):
        # Keep logs clean and concise
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def _send_json(self, payload, status=200):
        raw = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(raw)

    def _send_html(self, html_str, status=200):
        raw = html_str.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(raw)

    def _read_json_body(self):
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0:
            return {}
        raw = self.rfile.read(length).decode("utf-8")
        try:
            return json.loads(raw)
        except Exception:
            return {}

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Accept")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"
        qs = parse_qs(parsed.query)

        # 1. Health check endpoint (/health and /api/health)
        if path in ("/health", "/api/health", "/health.html"):
            health_data = db_adapter.refresh_health()
            accept = self.headers.get("Accept", "")
            wants_json = (
                path == "/api/health"
                or qs.get("format", [""])[0].lower() == "json"
                or "application/json" in accept
                or ("text/html" not in accept and accept != "*/*")
            )
            if wants_json and path != "/health.html":
                return self._send_json(health_data, 200)
            return self._send_html(build_health_html(health_data), 200)

        # 2. Get room state (/api/rooms/<code>)
        if path.startswith("/api/rooms/"):
            code = path.split("/api/rooms/", 1)[1].strip()
            room = db_adapter.get_room(code)
            if not room:
                return self._send_json({"error": "Không tìm thấy phòng"}, 404)
            return self._send_json({"status": "ok", "room": room}, 200)

        # 3. Map /assets/* or /public/assets/* seamlessly if either exists
        if path.startswith("/assets/"):
            rel = path.lstrip("/")
            if not (ROOT_DIR / rel).exists() and (ROOT_DIR / "public" / rel).exists():
                self.path = "/public/" + rel
        elif path.startswith("/public/assets/"):
            rel = path.lstrip("/")
            if not (ROOT_DIR / rel).exists():
                alt = rel.replace("public/", "", 1)
                if (ROOT_DIR / alt).exists():
                    self.path = "/" + alt

        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        body = self._read_json_body()

        if path == "/api/matchmaking/join":
            player_id = body.get("playerId") or f"p_{int(time.time()*1000)}"
            player_name = body.get("playerName") or "Kỳ Thủ"
            res = db_adapter.join_matchmaking(player_id, player_name)
            return self._send_json(res, 200)

        if path == "/api/matchmaking/poll":
            player_id = body.get("playerId") or ""
            res = db_adapter.poll_matchmaking(player_id)
            return self._send_json(res, 200)

        if path == "/api/matchmaking/leave":
            player_id = body.get("playerId") or ""
            res = db_adapter.leave_matchmaking(player_id)
            return self._send_json(res, 200)

        if path == "/api/rooms/create":
            host_id = body.get("hostId") or f"p_{int(time.time()*1000)}"
            host_name = body.get("hostName") or "Kỳ Thủ 1"
            custom_code = body.get("roomCode")
            mode = body.get("mode") or "custom"
            initial_state = body.get("gameState")
            room = db_adapter.create_room(host_id, host_name, custom_code, mode, initial_state)
            return self._send_json({"status": "ok", "room": room, "role": "host"}, 200)

        if path == "/api/rooms/join":
            room_code = body.get("roomCode") or ""
            guest_id = body.get("guestId") or f"p_{int(time.time()*1000)}"
            guest_name = body.get("guestName") or "Kỳ Thủ 2"
            res = db_adapter.join_room(room_code, guest_id, guest_name)
            if "error" in res:
                return self._send_json(res, 404)
            return self._send_json({"status": "ok", **res}, 200)

        if path.startswith("/api/rooms/") and path.endswith("/state"):
            code = path[len("/api/rooms/") : -len("/state")].strip("/")
            actor_id = body.get("actorId")
            game_state = body.get("gameState")
            last_action = body.get("lastAction")
            status = body.get("status")
            res = db_adapter.update_room_state(code, actor_id, game_state, last_action, status)
            if "error" in res:
                return self._send_json(res, 404)
            return self._send_json({"status": "ok", **res}, 200)

        if path == "/api/matches/record":
            rec = db_adapter.record_match(body)
            return self._send_json({"status": "ok", "record": rec}, 200)

        return self._send_json({"error": "Unknown API endpoint"}, 404)


def run_server():
    port = int(os.environ.get("PORT", "8080"))
    # Đa luồng: HTTPServer đơn luồng bị kẹt khi trình duyệt mở sẵn kết nối dự phòng (preconnect)
    # mà chưa gửi request => các ảnh/CSS tải sau không bao giờ về (mất nền bảng, popup)
    server = ThreadingHTTPServer(("0.0.0.0", port), HanaKoiRequestHandler)
    server.daemon_threads = True
    print(f"[HANA-KOI 2.5D] Server listening on http://localhost:{port}")
    print(f"[HANA-KOI 2.5D] Health check page: http://localhost:{port}/health")
    server.serve_forever()


if __name__ == "__main__":
    run_server()
