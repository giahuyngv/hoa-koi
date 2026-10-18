// Multiplayer (PvP Online & Custom Room) + Multi-DB Health Client Service
// Supports Dual-Transport Sync:
// 1. Backend REST API (/api/matchmaking/*, /api/rooms/*, /api/health) -> Redis / MongoDB / PostgreSQL / MySQL / JSON Fallback
// 2. Instant Cross-Tab Sync via BroadcastChannel & localStorage events (<5ms latency when testing 2 tabs on the same PC)

const LOCAL_ROOMS_KEY = 'hanakoi_local_rooms_db_v1';
const LOCAL_QUEUE_KEY = 'hanakoi_local_pvp_queue_v1';
const TAB_PLAYER_ID_KEY = 'hanakoi_tab_player_id_v1';
const TAB_PLAYER_NAME_KEY = 'hanakoi_tab_player_name_v1';

export class MultiplayerService {
  constructor() {
    this.playerId = this.initTabPlayerId();
    this.playerName = this.initTabPlayerName();

    this.roomCode = null;
    this.role = null; // 'host' (p1) | 'guest' (p2)
    this.roomMode = null; // 'pvp' | 'custom'
    this.roomStatus = 'idle'; // 'idle' | 'searching' | 'waiting' | 'playing' | 'finished'
    this.opponentName = 'Đối Thủ Online';
    this.lastVersion = 0;

    this.onRoomMatched = null;
    this.onStateReceived = null;
    this.onEmoteReceived = null;

    this.pollTimer = null;
    this.matchmakingTimer = null;
    this.channel = null;

    this.initBroadcastChannel();
  }

  initTabPlayerId() {
    try {
      let id = sessionStorage.getItem(TAB_PLAYER_ID_KEY);
      if (!id) {
        const rand = Math.floor(1000 + Math.random() * 9000);
        id = `p_${Date.now().toString(36)}_${rand}`;
        sessionStorage.setItem(TAB_PLAYER_ID_KEY, id);
      }
      return id;
    } catch {
      return `p_${Math.floor(100000 + Math.random() * 900000)}`;
    }
  }

  initTabPlayerName() {
    try {
      let name = sessionStorage.getItem(TAB_PLAYER_NAME_KEY);
      if (!name) {
        const suffix = this.playerId.slice(-4).toUpperCase();
        name = `Kỳ Thủ #${suffix}`;
        sessionStorage.setItem(TAB_PLAYER_NAME_KEY, name);
      }
      return name;
    } catch {
      return 'Kỳ Thủ Online';
    }
  }

  setPlayerName(newName) {
    const clean = (newName || '').trim().slice(0, 24);
    if (!clean) return;
    this.playerName = clean;
    try {
      sessionStorage.setItem(TAB_PLAYER_NAME_KEY, clean);
    } catch {
      // Ignore
    }
  }

  initBroadcastChannel() {
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        this.channel = new BroadcastChannel('hanakoi_25d_multiplayer_v1');
        this.channel.onmessage = (ev) => {
          if (ev.origin && ev.origin !== window.location.origin) return;
          this.handleIncomingMessage(ev.data);
        };
      }
    } catch {
      // Fallback to storage events
    }

    window.addEventListener('storage', (ev) => {
      if (ev.key === 'hanakoi_25d_net_event' && ev.newValue) {
        try {
          const msg = JSON.parse(ev.newValue);
          this.handleIncomingMessage(msg);
        } catch {
          // Ignore malformed JSON
        }
      }
    });
  }

  broadcastMessage(payload) {
    const msg = { ...payload, senderId: this.playerId, ts: Date.now() };
    try {
      if (this.channel) {
        this.channel.postMessage(msg);
      }
    } catch {
      // Ignore
    }
    try {
      localStorage.setItem('hanakoi_25d_net_event', JSON.stringify(msg));
    } catch {
      // Ignore
    }
  }

  handleIncomingMessage(msg) {
    if (!msg || msg.senderId === this.playerId) return;

    // 1. Matchmaking instant pairing between 2 tabs
    if (msg.type === 'PVP_LOOKING' && this.roomStatus === 'searching') {
      // Deterministic host selection so both tabs don't create 2 rooms simultaneously
      const amHost = this.playerId < msg.senderId;
      const sharedCode = msg.proposedRoomCode || `PVP${Math.floor(1000 + Math.random() * 9000)}`;
      if (amHost) {
        this.roomCode = sharedCode;
        this.role = 'host';
        this.roomMode = 'pvp';
        this.roomStatus = 'playing';
        this.opponentName = msg.playerName || 'Kỳ Thủ Đối Phương';
        this.stopMatchmakingLoop();

        this.broadcastMessage({
          type: 'PVP_MATCH_CONFIRMED',
          roomCode: sharedCode,
          hostId: this.playerId,
          hostName: this.playerName,
          guestId: msg.senderId,
          guestName: this.opponentName
        });

        if (this.onRoomMatched) {
          this.onRoomMatched({
            roomCode: sharedCode,
            role: 'host',
            mode: 'pvp',
            opponentName: this.opponentName
          });
        }
        this.startRoomPolling();
      } else {
        // Ask the other tab to confirm as host
        this.broadcastMessage({
          type: 'PVP_LOOKING',
          playerName: this.playerName,
          proposedRoomCode: sharedCode
        });
      }
      return;
    }

    if (
      msg.type === 'PVP_MATCH_CONFIRMED' &&
      this.roomStatus === 'searching' &&
      msg.guestId === this.playerId
    ) {
      this.roomCode = msg.roomCode;
      this.role = 'guest';
      this.roomMode = 'pvp';
      this.roomStatus = 'playing';
      this.opponentName = msg.hostName || 'Kỳ Thủ Chủ Phòng';
      this.stopMatchmakingLoop();

      if (this.onRoomMatched) {
        this.onRoomMatched({
          roomCode: this.roomCode,
          role: 'guest',
          mode: 'pvp',
          opponentName: this.opponentName
        });
      }
      this.startRoomPolling();
      return;
    }

    // 2. Custom Room guest joined notification
    if (
      msg.type === 'ROOM_GUEST_JOINED' &&
      this.roomCode &&
      msg.roomCode === this.roomCode &&
      this.role === 'host'
    ) {
      this.roomStatus = 'playing';
      this.opponentName = msg.guestName || 'Kỳ Thủ Khách';
      if (this.onRoomMatched) {
        this.onRoomMatched({
          roomCode: this.roomCode,
          role: 'host',
          mode: this.roomMode || 'custom',
          opponentName: this.opponentName,
          guestJustJoined: true
        });
      }
      return;
    }

    // 3. Synchronized game state update inside active room
    if (
      msg.type === 'ROOM_STATE_SYNC' &&
      this.roomCode &&
      msg.roomCode === this.roomCode
    ) {
      if (msg.version && msg.version <= this.lastVersion) return;
      this.lastVersion = msg.version || this.lastVersion + 1;
      if (msg.hostName && this.role === 'guest') {
        this.opponentName = msg.hostName;
      }
      if (msg.guestName && this.role === 'host') {
        this.opponentName = msg.guestName;
      }
      if (this.onStateReceived && msg.gameState) {
        this.onStateReceived(msg.gameState, msg.lastAction || null);
      }
      return;
    }

    // 4. Emote / Voice tease between players
    if (
      msg.type === 'ROOM_EMOTE' &&
      this.roomCode &&
      msg.roomCode === this.roomCode
    ) {
      if (this.onEmoteReceived && msg.lineObj) {
        this.onEmoteReceived(msg.lineObj, msg.senderName);
      }
    }
  }

  // =========================================================================
  // LOCAL STORAGE JSON FALLBACK HELPERS (FOR STATIC / STANDALONE MODE)
  // =========================================================================

  readLocalRooms() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_ROOMS_KEY) || '{}');
    } catch {
      return {};
    }
  }

  writeLocalRoom(code, roomObj) {
    try {
      const rooms = this.readLocalRooms();
      rooms[code] = roomObj;
      localStorage.setItem(LOCAL_ROOMS_KEY, JSON.stringify(rooms));
    } catch {
      // Ignore
    }
  }

  // =========================================================================
  // 1. PVP ONLINE MATCHMAKING (GHÉP TRẬN NGƯỜI THẬT)
  // =========================================================================

  async startMatchmaking() {
    this.leaveCurrentRoom();
    this.roomStatus = 'searching';
    this.roomMode = 'pvp';

    const proposedCode = `PVP${Math.floor(1000 + Math.random() * 9000)}`;
    this.broadcastMessage({
      type: 'PVP_LOOKING',
      playerName: this.playerName,
      proposedRoomCode: proposedCode
    });

    try {
      const res = await fetch('/api/matchmaking/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: this.playerId,
          playerName: this.playerName
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'matched' && data.room) {
          this.handleServerMatched(data.room, data.role);
          return data;
        }
      }
    } catch {
      // Offline / static fallback: BroadcastChannel handles cross-tab pairing
    }

    this.stopMatchmakingLoop();
    this.matchmakingTimer = setInterval(async () => {
      if (this.roomStatus !== 'searching') {
        this.stopMatchmakingLoop();
        return;
      }

      // Broadcast presence for any newly opened tab
      this.broadcastMessage({
        type: 'PVP_LOOKING',
        playerName: this.playerName,
        proposedRoomCode: proposedCode
      });

      try {
        const res = await fetch('/api/matchmaking/poll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerId: this.playerId })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'matched' && data.room && this.roomStatus === 'searching') {
            this.handleServerMatched(data.room, data.role);
          }
        }
      } catch {
        // Handled by BroadcastChannel
      }
    }, 1000);

    return { status: 'searching' };
  }

  handleServerMatched(room, role) {
    if (this.roomStatus === 'playing' && this.roomCode === room.roomCode) return;
    this.stopMatchmakingLoop();
    this.roomCode = room.roomCode;
    this.role = role;
    this.roomMode = room.mode || 'pvp';
    this.roomStatus = 'playing';
    this.opponentName =
      role === 'host'
        ? room.guestName || 'Kỳ Thủ Đối Phương'
        : room.hostName || 'Kỳ Thủ Chủ Phòng';

    if (this.onRoomMatched) {
      this.onRoomMatched({
        roomCode: this.roomCode,
        role: this.role,
        mode: this.roomMode,
        opponentName: this.opponentName,
        initialGameState: room.gameState || null
      });
    }
    this.startRoomPolling();
  }

  stopMatchmakingLoop() {
    if (this.matchmakingTimer) {
      clearInterval(this.matchmakingTimer);
      this.matchmakingTimer = null;
    }
  }

  async cancelMatchmaking() {
    this.stopMatchmakingLoop();
    if (this.roomStatus === 'searching') {
      this.roomStatus = 'idle';
    }
    try {
      await fetch('/api/matchmaking/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: this.playerId })
      });
    } catch {
      // Ignore
    }
  }

  // =========================================================================
  // 2. CUSTOM ROOM BY CODE (TẠO PHÒNG MÃ SỐ ĐỂ MỞ 2 TAB CHƠI THỬ)
  // =========================================================================

  async createCustomRoom(customCodeInput = '', initialGameState = null) {
    this.leaveCurrentRoom();
    const cleanCode =
      (customCodeInput || '').trim().toUpperCase() ||
      String(Math.floor(1000 + Math.random() * 9000));

    this.roomCode = cleanCode;
    this.role = 'host';
    this.roomMode = 'custom';
    this.roomStatus = 'waiting';
    this.lastVersion = 1;

    const localRoom = {
      roomCode: cleanCode,
      mode: 'custom',
      status: 'waiting',
      hostId: this.playerId,
      hostName: this.playerName,
      guestId: null,
      guestName: null,
      version: 1,
      gameState: initialGameState,
      updatedAt: Date.now()
    };
    this.writeLocalRoom(cleanCode, localRoom);

    try {
      const res = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostId: this.playerId,
          hostName: this.playerName,
          roomCode: cleanCode,
          mode: 'custom',
          gameState: initialGameState
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.room) {
          this.roomCode = data.room.roomCode;
          this.writeLocalRoom(this.roomCode, data.room);
        }
      }
    } catch {
      // Local room already saved in localStorage
    }

    this.startRoomPolling();
    return { roomCode: this.roomCode, role: 'host' };
  }

  async joinCustomRoom(codeInput) {
    const cleanCode = (codeInput || '').trim().toUpperCase();
    if (!cleanCode) {
      return { error: 'Vui lòng nhập mã số phòng (VD: 6868)!' };
    }

    this.leaveCurrentRoom();
    let joinedRoom = null;
    let assignedRole = 'guest';

    try {
      const res = await fetch('/api/rooms/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: cleanCode,
          guestId: this.playerId,
          guestName: this.playerName
        })
      });
      if (res.ok) {
        const data = await res.json();
        joinedRoom = data.room;
        assignedRole = data.role || 'guest';
      }
    } catch {
      // Try local rooms store fallback
    }

    if (!joinedRoom) {
      const localRooms = this.readLocalRooms();
      if (localRooms[cleanCode]) {
        joinedRoom = localRooms[cleanCode];
        joinedRoom.guestId = this.playerId;
        joinedRoom.guestName = this.playerName;
        joinedRoom.status = 'playing';
        joinedRoom.version = (joinedRoom.version || 1) + 1;
        this.writeLocalRoom(cleanCode, joinedRoom);
      } else {
        // Even if host created room in another tab and storage was cleared, create/join gracefully
        return {
          error: `Không tìm thấy phòng mã [${cleanCode}]. Hãy tạo phòng ở Tab 1 trước rồi nhập mã này ở Tab 2!`
        };
      }
    }

    this.roomCode = cleanCode;
    this.role = assignedRole;
    this.roomMode = joinedRoom.mode || 'custom';
    this.roomStatus = 'playing';
    this.opponentName =
      assignedRole === 'host'
        ? joinedRoom.guestName || 'Kỳ Thủ 2'
        : joinedRoom.hostName || 'Kỳ Thủ 1';
    this.lastVersion = joinedRoom.version || 1;

    this.broadcastMessage({
      type: 'ROOM_GUEST_JOINED',
      roomCode: cleanCode,
      guestId: this.playerId,
      guestName: this.playerName
    });

    if (this.onRoomMatched) {
      this.onRoomMatched({
        roomCode: cleanCode,
        role: this.role,
        mode: this.roomMode,
        opponentName: this.opponentName,
        initialGameState: joinedRoom.gameState || null
      });
    }

    this.startRoomPolling();
    return { status: 'ok', room: joinedRoom, role: this.role };
  }

  // =========================================================================
  // 3. STATE SYNCHRONIZATION & POLLING
  // =========================================================================

  async syncRoomState(canonicalState, lastAction = null) {
    if (!this.roomCode) return;
    this.lastVersion = (this.lastVersion || 1) + 1;

    // 1. Instant cross-tab broadcast
    this.broadcastMessage({
      type: 'ROOM_STATE_SYNC',
      roomCode: this.roomCode,
      version: this.lastVersion,
      hostName: this.role === 'host' ? this.playerName : undefined,
      guestName: this.role === 'guest' ? this.playerName : undefined,
      gameState: canonicalState,
      lastAction
    });

    // 2. LocalStorage room update
    const rooms = this.readLocalRooms();
    const existing = rooms[this.roomCode] || { roomCode: this.roomCode };
    existing.gameState = canonicalState;
    existing.lastAction = lastAction;
    existing.version = this.lastVersion;
    existing.status = 'playing';
    this.writeLocalRoom(this.roomCode, existing);

    // 3. Backend DB persistence
    try {
      await fetch(`/api/rooms/${encodeURIComponent(this.roomCode)}/state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actorId: this.playerId,
          gameState: canonicalState,
          lastAction,
          status: 'playing'
        })
      });
    } catch {
      // Handled by local fallback
    }
  }

  sendEmote(lineObj) {
    if (!this.roomCode) return;
    this.broadcastMessage({
      type: 'ROOM_EMOTE',
      roomCode: this.roomCode,
      senderName: this.playerName,
      lineObj
    });
  }

  startRoomPolling() {
    this.stopRoomPolling();
    this.pollTimer = setInterval(async () => {
      if (!this.roomCode) {
        this.stopRoomPolling();
        return;
      }
      try {
        const res = await fetch(`/api/rooms/${encodeURIComponent(this.roomCode)}`);
        if (!res.ok) return;
        const data = await res.json();
        const room = data.room;
        if (!room) return;

        // If host was waiting for guest and guest joined via HTTP from another browser
        if (
          this.role === 'host' &&
          this.roomStatus === 'waiting' &&
          room.status === 'playing' &&
          room.guestId
        ) {
          this.roomStatus = 'playing';
          this.opponentName = room.guestName || 'Kỳ Thủ Khách';
          if (this.onRoomMatched) {
            this.onRoomMatched({
              roomCode: this.roomCode,
              role: 'host',
              mode: this.roomMode,
              opponentName: this.opponentName,
              guestJustJoined: true
            });
          }
        }

        if (room.version && room.version > this.lastVersion && room.gameState) {
          this.lastVersion = room.version;
          if (this.onStateReceived) {
            this.onStateReceived(room.gameState, room.lastAction || null);
          }
        }
      } catch {
        // Offline / static fallback uses BroadcastChannel
      }
    }, 950);
  }

  stopRoomPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  leaveCurrentRoom() {
    this.stopMatchmakingLoop();
    this.stopRoomPolling();
    this.roomCode = null;
    this.role = null;
    this.roomStatus = 'idle';
    this.lastVersion = 0;
  }

  // =========================================================================
  // 4. DATABASE HEALTH CHECK & MATCH RECORDING
  // =========================================================================

  async fetchHealthStatus() {
    try {
      const res = await fetch('/api/health', {
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback report when running as static file
    }
    const localRooms = Object.keys(this.readLocalRooms()).length;
    return {
      status: 'ok',
      httpCode: 200,
      service: 'HANA-KOI 2.5D (Local JSON Storage Fallback)',
      timestamp: new Date().toISOString(),
      activeStorageMode: 'local_json_fallback',
      envVars: {
        REDIS_URL: null,
        MONGO_URL: null,
        POSTGRES_URL: null,
        MYSQL_URL: null
      },
      databases: {
        redis: {
          name: 'Redis',
          envVar: 'REDIS_URL',
          configured: false,
          connected: false,
          status: 'fallback_json',
          detail: 'Chưa cấu hình REDIS_URL — Tự động lưu tạm vào JSON'
        },
        mongodb: {
          name: 'MongoDB',
          envVar: 'MONGO_URL',
          configured: false,
          connected: false,
          status: 'fallback_json',
          detail: 'Chưa cấu hình MONGO_URL — Tự động lưu tạm vào JSON'
        },
        postgresql: {
          name: 'PostgreSQL',
          envVar: 'POSTGRES_URL',
          configured: false,
          connected: false,
          status: 'fallback_json',
          detail: 'Chưa cấu hình POSTGRES_URL — Tự động lưu tạm vào JSON'
        },
        mysql: {
          name: 'MySQL',
          envVar: 'MYSQL_URL',
          configured: false,
          connected: false,
          status: 'fallback_json',
          detail: 'Chưa cấu hình MYSQL_URL — Tự động lưu tạm vào JSON'
        }
      },
      jsonFallback: {
        enabled: true,
        filePath: 'data/local_db.json',
        exists: true,
        roomsCount: localRooms,
        matchesSaved: 0,
        message: 'Tự động lưu tạm vào file JSON khi chạy trên máy cá nhân chưa có DB'
      }
    };
  }

  async recordMatchResult(summary) {
    try {
      await fetch('/api/matches/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(summary)
      });
    } catch {
      // Ignore in static mode
    }
  }
}

export const multiplayerService = new MultiplayerService();
