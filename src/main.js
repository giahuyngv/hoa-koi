// Main Application Controller for HOA KOI (花恋)
// Manages 2.5D Tabletop UI, 3 Game Modes (PvE, PvP Online, Custom Room), Dark Mode, DB Health, Collection, Gacha & Audio

import { HANAFUDA_CARDS, MONTHS_INFO, CARD_TYPES, getCardById, getMonthInfo } from './data/cardsData.js?v=25';
import { YAKU_CATALOG, evaluateCapturedYaku, getYakuProgressHints } from './data/yakuData.js?v=25';
import { ANIME_OPPONENTS, getOpponentById } from './data/charactersData.js?v=25';
import {
  CARD_BACKS,
  CARD_SKINS,
  RARITY_CONFIG,
  getCardBackById,
  getCardSkinById
} from './data/collectionData.js?v=25';
import {
  renderCardFaceSVG,
  renderCardBackSVG,
  renderTabletopFlowerDioramaSVG,
  renderTabletopBillboardDioramaHTML,
  getTabletopDioramaInfo
} from './graphics/cardArtwork.js?v=25';
import { ParticleSystem25D } from './graphics/particles25d.js?v=25';
import { playYakuReveal, warmYakuRevealAssets } from './graphics/yakuReveal.js?v=25';
import { cardAnimator } from './graphics/cardAnimator.js?v=25';
import { soundEngine, BGM_TRACKS } from './audio/soundEngine.js?v=25';
import { KoiKoiEngine } from './engine/koiKoiEngine.js?v=25';
import { multiplayerService } from './services/multiplayerService.js?v=25';
import { initViewportScaler } from './ui/viewportScaler.js?v=25';

const STORAGE_KEY = 'hanakoi_25d_save_v1';
const THEME_STORAGE_KEY = 'hanakoi_theme_mode';
const ANIM_SPEED_STORAGE_KEY = 'hanakoi_anim_speed';

function setElementMarkup(el, markup) {
  if (!el) return;
  if (!markup) {
    el.replaceChildren();
    return;
  }
  const doc = new DOMParser().parseFromString(String(markup), 'text/html');
  doc.querySelectorAll('script, iframe, object, embed').forEach((n) => n.remove());
  el.replaceChildren(...Array.from(doc.body.childNodes));
}

// Replace a single element (in place) with the first element parsed from markup.
// Siblings are left untouched, so their running CSS animations are not restarted.
function replaceElementWithMarkup(oldEl, markup) {
  if (!oldEl) return null;
  const doc = new DOMParser().parseFromString(String(markup), 'text/html');
  doc.querySelectorAll('script, iframe, object, embed').forEach((n) => n.remove());
  const next = doc.body.firstElementChild;
  if (!next) return null;
  oldEl.replaceWith(next);
  return next;
}

class HanaKoiApp {
  // Opponent speech: Vietnamese only, shown in one short line under the name, auto-hides after a few seconds.
  get currentDialogue() {
    return this._currentDialogue || '';
  }

  set currentDialogue(value) {
    this._currentDialogue = String(value || '').replace(/\s*「[^」]*」/g, '').trim();
    this.dialogueHideAt = Date.now() + 4500;
    if (this._dialogueTimer) clearTimeout(this._dialogueTimer);
    this._dialogueTimer = setTimeout(() => {
      if (typeof this.renderLeftPanel === 'function') this.renderLeftPanel();
    }, 4600);
  }

  constructor() {
    this.saveData = this.loadSaveData();
    this.darkMode = localStorage.getItem(THEME_STORAGE_KEY) === 'dark';
    this.animSpeedOptions = [0.2, 0.5, 0.75, 1, 2, 5];
    const savedSpeed = Number(localStorage.getItem(ANIM_SPEED_STORAGE_KEY));
    this.animSpeed = this.animSpeedOptions.includes(savedSpeed) ? savedSpeed : 1;
    cardAnimator.setSpeedMultiplier(this.animSpeed);
    this.settingsMenuOpen = false;
    this.applyThemeMode();

    this.engine = new KoiKoiEngine();
    this.gameMode = 'pve'; // 'pve' | 'pvp' | 'custom'
    this.currentOpponent = getOpponentById(this.saveData.selectedOpponentId || 'koharu');
    this.currentDialogue = this.pickRandom(this.currentOpponent.dialogues.intro);
    this.tableFlowerMonth = 9;

    this.hoveredHandCardMonth = null;
    this.isAnimating = false;
    this.activeTeasePopup = null;
    this.lastTeaseLineIndex = -1;
    this.teaseTimer = null;
    // Modals: 'opponents' | 'pvp_lobby' | 'custom_room' | 'db_health' | 'collection' | 'gacha' | 'rules' | 'round_end'
    this.activeModal = null;
    this.collectionTab = 'backs';
    this.inspectedCardId = 1;
    this.inspectorFlipped = false;
    this.gachaResults = [];
    this.lastRoundSummary = null;
    this.newlyUnlockedItems = [];
    this.healthReport = null;
    this.customRoomError = '';
    this.pendingMpMoveAction = null;
    this.tutorialStep = 0;
    // Popup trình diễn bộ vừa ăn đang mở (chặn AI + modal Koi-Koi)
    this.yakuRevealActive = false;

    this.cameraAngles = [
      { label: 'Góc 2.5D Chuẩn', deg: '21deg' },
      { label: 'Góc Điện Ảnh Sâu', deg: '30deg' },
      { label: 'Góc Nhìn Cao', deg: '8deg' }
    ];
    this.cameraIndex = 0;

    this.initDOM();
    this.particles = new ParticleSystem25D(document.getElementById('particle-canvas'));
    this.particles.setMonthTheme(9);
    this.particles.start();

    document.addEventListener(
      'pointerdown',
      (e) => {
        if (this.settingsMenuOpen && !e.target.closest('.nav-settings-wrap')) {
          this.settingsMenuOpen = false;
          this.renderTopNav();
        }
      },
      true
    );

    document.addEventListener('keydown', (e) => {
      if (this.activeModal === 'tutorial') {
        const total = this.getTutorialSteps().length;
        if (e.key === 'ArrowRight' && this.tutorialStep < total - 1) {
          this.tutorialStep += 1;
          this.renderActiveModal();
        } else if (e.key === 'ArrowLeft' && this.tutorialStep > 0) {
          this.tutorialStep -= 1;
          this.renderActiveModal();
        }
        return;
      }
      if (e.key === 'Escape' && this.settingsMenuOpen) {
        this.settingsMenuOpen = false;
        this.renderTopNav();
      }
    });

    this.bindMultiplayerEvents();
    this.bindAutoStartAudio();
    this.startMatchWithOpponent(this.currentOpponent.id, this.saveData.matchRounds || 3);
    this.checkUrlMultiplayerParams();
    this.maybeShowFirstTutorial();
  }

  /**
   * Temporarily locked to Month 9 (Kiku - Chrysanthemum & Sake Cup) while previewing Month 9 watercolor elements
   */
  rollNewTableFlowerMonth() {
    this.tableFlowerMonth = 9;
    if (this.particles) {
      this.particles.setMonthTheme(9);
    }
  }

  setAnimSpeed(mult) {
    const val = Number(mult);
    if (!this.animSpeedOptions.includes(val)) return;
    this.animSpeed = val;
    cardAnimator.setSpeedMultiplier(val);
    try {
      localStorage.setItem(ANIM_SPEED_STORAGE_KEY, String(val));
    } catch {
      // Ignore
    }
    soundEngine.playCardHover();
    this.renderTopNav();
  }

  applyThemeMode() {
    document.body.classList.toggle('dark-mode', this.darkMode);
    document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, this.darkMode ? 'dark' : 'light');
    } catch {
      // Ignore
    }
    this.applyThemeMode();
    soundEngine.playCardHover();
    this.renderAll();
  }

  isMultiplayerMatch() {
    return (
      (this.gameMode === 'pvp' || this.gameMode === 'custom') &&
      multiplayerService.roomStatus === 'playing' &&
      Boolean(multiplayerService.roomCode)
    );
  }

  getOpponentDisplayName() {
    if (this.isMultiplayerMatch()) {
      return multiplayerService.opponentName || 'Đối Thủ Trực Tuyến';
    }
    return this.currentOpponent.name;
  }

  bindMultiplayerEvents() {
    multiplayerService.onRoomMatched = ({
      roomCode,
      role,
      mode,
      opponentName,
      initialGameState,
      guestJustJoined
    }) => {
      this.gameMode = mode || 'custom';
      this.activeModal = null;
      this.customRoomError = '';
      this.rollNewTableFlowerMonth();
      soundEngine.playShobuVictory();

      if (role === 'host') {
        if (!initialGameState || guestJustJoined) {
          this.engine.startNewMatch(this.saveData.matchRounds || 3);
          const canonical = this.engine.exportCanonicalState('host', null);
          multiplayerService.syncRoomState(canonical, { type: 'MATCH_START' });
        } else {
          this.engine.importCanonicalState(initialGameState, 'host');
        }
      } else if (initialGameState) {
        this.engine.importCanonicalState(initialGameState, 'guest');
      }

      this.currentDialogue = `Đã kết nối phòng #${roomCode}! Đang đấu trực tiếp với ${opponentName || 'Kỳ Thủ Online'}!`;
      this.triggerAnimeCutin(
        opponentName || 'KỲ THỦ ONLINE',
        this.currentOpponent.avatar,
        mode === 'pvp' ? 'GHÉP TRẬN THÀNH CÔNG!' : `PHÒNG #${roomCode} BẮT ĐẦU!`,
        `Bạn là ${role === 'host' ? 'Chủ Phòng (Đi Trước)' : 'Khách Thách Đấu'} — Chúc may mắn!`
      );
      this.renderAll();
    };

    multiplayerService.onStateReceived = async (canonicalState, lastAction) => {
      if (!this.isMultiplayerMatch()) return;

      // Animate remote opponent's played and drawn cards if provided
      if (lastAction && lastAction.type === 'TURN_MOVE' && !this.isAnimating) {
        await this.animateRemoteOpponentAction(lastAction);
      } else if (lastAction && lastAction.type === 'CALL_KOIKOI') {
        this.triggerAnimeCutin(
          this.getOpponentDisplayName(),
          this.currentOpponent.avatar,
          'KOI-KOI! (こいこい)',
          `${this.getOpponentDisplayName()} tuyên bố cược tiếp để nhân đôi điểm!`,
          this.currentOpponent.portrait
        );
      }

      const prevPhase = this.engine.phase;
      const roundOutcome = this.engine.importCanonicalState(
        canonicalState,
        multiplayerService.role
      );

      if (
        roundOutcome &&
        (this.engine.phase === 'ROUND_OVER' || this.engine.phase === 'MATCH_OVER')
      ) {
        this.handleRoundFinished(roundOutcome, true);
        return;
      }

      if (this.activeModal === 'round_end' && this.engine.phase !== 'ROUND_OVER') {
        this.activeModal = null;
      }

      if (prevPhase === 'AI_TURN' && this.engine.phase === 'PLAYER_HAND') {
        soundEngine.playCardHover();
        this.currentDialogue = `Đến lượt của bạn! Hãy chọn 1 lá bài trên tay để đánh.`;
      }

      this.renderAll();
    };

    multiplayerService.onEmoteReceived = (lineObj, senderName) => {
      this.activeTeasePopup = lineObj;
      this.currentDialogue = lineObj.vi;
      this.renderLeftPanel();
      if (this.teaseTimer) clearTimeout(this.teaseTimer);
      this.teaseTimer = setTimeout(() => {
        this.activeTeasePopup = null;
        this.renderLeftPanel();
      }, 5200);
    };
  }

  async animateRemoteOpponentAction(action) {
    try {
      this.isAnimating = true;
      const skinId = this.saveData.equippedSkin;
      const aiHandRect = cardAnimator.getRect('.ai-hand-zone .hana-card-3d:last-child');
      const fieldRects = this.snapshotFieldRects();

      if (action.handCard) {
        if (action.capturedHand && action.capturedHand.length > 0) {
          const matchedCards = action.capturedHand.slice(1);
          const targetRect = fieldRects[matchedCards[0]?.id];
          await cardAnimator.animateCaptureSequence({
            actor: 'ai',
            playedCard: action.handCard,
            matchedCards,
            skinId,
            fromRect: aiHandRect,
            fieldTargetRect: targetRect,
            onImpactSound: (bright) => soundEngine.playCardSnap(bright)
          });
        } else {
          soundEngine.playCardSnap(false);
        }
      }

      if (action.drawnCard) {
        const deckRect = cardAnimator.getRect('#draw-pile-stack');
        if (action.capturedDraw && action.capturedDraw.length > 0) {
          const matchedDraw = action.capturedDraw.slice(1);
          const targetRect2 = fieldRects[matchedDraw[0]?.id];
          await cardAnimator.animateCaptureSequence({
            actor: 'ai',
            playedCard: action.drawnCard,
            matchedCards: matchedDraw,
            skinId,
            fromRect: deckRect,
            fieldTargetRect: targetRect2,
            onImpactSound: (bright) => soundEngine.playCardSnap(bright)
          });
        } else {
          soundEngine.playCardSnap(false);
        }
      }
    } catch {
      // Ignore animation interruptions
    } finally {
      this.isAnimating = false;
    }
  }

  async checkUrlMultiplayerParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const joinCode = params.get('joinRoom');
      const autoPvp = params.get('autoPvp');

      if (joinCode) {
        this.gameMode = 'custom';
        this.activeModal = 'custom_room';
        this.renderAll();
        await multiplayerService.joinCustomRoom(joinCode);
        this.renderAll();
      } else if (autoPvp === '1') {
        this.gameMode = 'pvp';
        this.activeModal = 'pvp_lobby';
        await multiplayerService.startMatchmaking();
        this.renderAll();
      }
    } catch {
      // Ignore URL param errors
    }
  }

  bindAutoStartAudio() {
    const unlockAndPlay = () => {
      if (soundEngine.bgmEnabled) {
        soundEngine.startBgm();
        this.renderTopNav();
      }
      if (soundEngine.ctx && soundEngine.ctx.state === 'running') {
        window.removeEventListener('pointerdown', unlockAndPlay);
        window.removeEventListener('keydown', unlockAndPlay);
      }
    };
    window.addEventListener('pointerdown', unlockAndPlay, { passive: true });
    window.addEventListener('keydown', unlockAndPlay, { passive: true });
    setTimeout(() => {
      try {
        soundEngine.startBgm();
        this.renderTopNav();
      } catch {
        // Will unlock on first pointerdown
      }
    }, 150);
  }

  loadSaveData() {
    const defaults = {
      coins: 650,
      unlockedBacks: ['back_urushi_red'],
      unlockedSkins: ['skin_traditional_edo'],
      equippedBack: 'back_urushi_red',
      equippedSkin: 'skin_traditional_edo',
      defeatedOpponents: [],
      selectedOpponentId: 'koharu',
      matchRounds: 3,
      tutorialSeen: false
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        ...defaults,
        ...parsed,
        unlockedBacks: Array.from(
          new Set([...defaults.unlockedBacks, ...(parsed.unlockedBacks || [])])
        ),
        unlockedSkins: Array.from(
          new Set([...defaults.unlockedSkins, ...(parsed.unlockedSkins || [])])
        ),
        defeatedOpponents: Array.from(new Set(parsed.defeatedOpponents || []))
      };
    } catch {
      return defaults;
    }
  }

  persistSave() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.saveData));
    } catch {
      // Ignore storage quota issues
    }
  }

  pickRandom(arr) {
    if (!arr || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
  }

  initDOM() {
    const app = document.getElementById('app');
    setElementMarkup(app, `
      <!-- Okami 4-Corner Sumi-e Lattice Frame Overlay -->
      <div class="okami-screen-frame" aria-hidden="true">
        <span class="okami-fret tl"></span>
        <span class="okami-fret tr"></span>
        <span class="okami-fret bl"></span>
        <span class="okami-fret br"></span>
      </div>

      <!-- Top Bar (Okami Sumi-e Brush Banner & Scroll Controls) -->
      <header class="top-nav" id="top-nav"></header>

      <!-- 3-Column 16:9 Main Gameplay Area -->
      <main class="game-layout">
        <aside class="left-stage-panel" id="left-panel"></aside>
        <section class="center-tabletop-stage" id="center-stage"></section>
        <aside class="right-sidebar-panel" id="right-panel"></aside>
      </main>

      <!-- Modal & Cut-in Containers -->
      <div id="modal-root"></div>
      <div id="cutin-root"></div>
    `);
  }

  startMatchWithOpponent(opponentId, rounds = 3) {
    multiplayerService.leaveCurrentRoom();
    this.gameMode = 'pve';
    this.currentOpponent = getOpponentById(opponentId);
    this.saveData.selectedOpponentId = this.currentOpponent.id;
    this.saveData.matchRounds = rounds;
    this.persistSave();

    this.rollNewTableFlowerMonth();
    this.currentDialogue = this.pickRandom(this.currentOpponent.dialogues.intro);
    this.activeModal = null;
    this.isAnimating = false;
    this.activeTeasePopup = null;
    this.lastTeaseLineIndex = -1;
    if (this.teaseTimer) {
      clearTimeout(this.teaseTimer);
      this.teaseTimer = null;
    }
    this.newlyUnlockedItems = [];

    this.engine.startNewMatch(rounds);
    this.renderAll();

    if (this.engine.phase === 'AI_TURN') {
      this.scheduleAiTurn();
    }
  }

  triggerOpponentTeaseLine(force = false) {
    const opp = this.currentOpponent;
    const lines = opp.teaseVoiceLines || [];
    if (lines.length === 0) return;

    if (!force && Math.random() > 0.58) return;

    let nextIdx = (this.lastTeaseLineIndex + 1) % lines.length;
    if (!force && lines.length > 1) {
      const candidates = lines.map((_, i) => i).filter((i) => i !== this.lastTeaseLineIndex);
      nextIdx = candidates[Math.floor(Math.random() * candidates.length)];
    }
    this.lastTeaseLineIndex = nextIdx;
    const lineObj = lines[nextIdx];

    this.activeTeasePopup = lineObj;
    this.currentDialogue = lineObj.vi;

    if (this.isMultiplayerMatch() && force) {
      multiplayerService.sendEmote(lineObj);
    }
    this.renderLeftPanel();

    if (this.teaseTimer) {
      clearTimeout(this.teaseTimer);
    }
    this.teaseTimer = setTimeout(() => {
      this.activeTeasePopup = null;
      this.renderLeftPanel();
    }, 5200);
  }

  // ==========================================================================
  // RENDER ORCHESTRATION
  // ==========================================================================

  renderAll() {
    this.renderTopNav();
    this.renderLeftPanel();
    this.renderCenterBoard();
    this.renderRightPanel();
    this.renderActiveModal();
  }

  renderTopNav() {
    const nav = document.getElementById('top-nav');
    if (!nav) return;
    const totalOwned =
      this.saveData.unlockedBacks.length + this.saveData.unlockedSkins.length;
    const totalCollectibles = CARD_BACKS.length + CARD_SKINS.length;
    const currentTrack = soundEngine.getCurrentTrack();
    const isMp = this.isMultiplayerMatch();

    setElementMarkup(nav, `
      <!-- Left: 3 Game Modes Scroll Switcher -->
      <div class="mode-switcher-group okami-scroll-bar">
        <button class="mode-pill-btn ${this.gameMode === 'pve' ? 'active-mode' : ''}" id="btn-mode-pve" title="Chế độ 1: Đấu với 12 Kỳ Thủ Nhật Bản (PvE)">
          <span class="hanko-mini">対</span> Đấu Máy (12 Tháng)
        </button>
        <button class="mode-pill-btn ${this.gameMode === 'pvp' ? 'active-mode' : ''}" id="btn-mode-pvp" title="Chế độ 2: Ghép trận người thật trực tuyến (PvP Online)">
          <span class="hanko-mini">戦</span> Ghép Trận
        </button>
        <button class="mode-pill-btn ${this.gameMode === 'custom' ? 'active-mode' : ''}" id="btn-mode-custom" title="Chế độ 3: Tạo phòng mã số để mở 2 tab chơi thử (Custom Room)">
          <span class="hanko-mini">室</span> Phòng Mã
        </button>
        ${
          isMp
            ? `<span class="live-room-pill" id="btn-live-room-info" title="Đang kết nối trực tiếp phòng #${multiplayerService.roomCode}">
                 🟢 #${multiplayerService.roomCode}
               </span>`
            : ''
        }
      </div>

      <!-- Center: Okami Sumi-e Brush Banner & Vermilion Sun Seal -->
      <div class="brand-logo okami-center-plaque">
        <div class="okami-brush-banner">
          <span class="okami-jp-calligraphy">花札 こいこい</span>
          <span class="okami-vi-subtitle">HOA KOI ・ ĐẤU BÀI HOA</span>
        </div>
        <div class="brand-emblem" title="Con dấu Mặt Trời Amaterasu (Ōkami)">大神</div>
      </div>

      <!-- Right: Makimono Scroll Action Buttons -->
      <div class="nav-actions">
        <button class="nav-btn primary-gold" id="btn-open-collection" title="Bộ Sưu Tập (${totalOwned}/${totalCollectibles})">
          <span class="hanko-seal">集</span> Sưu Tập
        </button>
        <button class="nav-btn" id="btn-open-gacha" title="Rút Quẻ Gacha Omikuji">
          <span class="hanko-seal">籤</span> Rút Quẻ (${this.saveData.coins}🪙)
        </button>
        <button class="nav-icon-btn" id="btn-toggle-dark" title="Chuyển đổi giao diện Sáng (Giấy Washi Ōkami) / Tối (Đêm Mặc Thủy)">
          ${this.darkMode ? '☀️' : '🌙'}
        </button>

        <div class="nav-settings-wrap">
          <button class="nav-icon-btn" id="btn-toggle-settings" title="Mở / Đóng menu cài đặt (Esc)">
            ${this.settingsMenuOpen ? '✕' : '⚙️'}
          </button>
          <div class="nav-settings-dropdown ${this.settingsMenuOpen ? 'open' : ''}" id="nav-settings-dropdown">
            <div class="speed-selector-box">
              <div class="speed-selector-label">
                <span>⚡ Tốc độ đánh bài</span>
                <span style="color:var(--okami-vermilion); font-weight:800;">${this.animSpeed}x</span>
              </div>
              <div class="speed-pills-row">
                ${this.animSpeedOptions
                  .map(
                    (spd) => `
                  <button class="speed-pill-btn ${this.animSpeed === spd ? 'active-speed' : ''}" data-anim-speed="${spd}">
                    ${spd}x
                  </button>
                `
                  )
                  .join('')}
              </div>
            </div>
            <button class="dropdown-item-btn" id="btn-toggle-bgm">
              <span>${soundEngine.bgmEnabled ? '🎵 Nhạc nền' : '🔇 Nhạc nền'}</span>
              <span class="item-sub">${soundEngine.bgmEnabled ? 'Đang bật' : 'Đang tắt'}</span>
            </button>
            <button class="dropdown-item-btn" id="btn-cycle-bgm">
              <span>🎶 Đổi bài nhạc</span>
              <span class="item-sub">${currentTrack.name}</span>
            </button>
            <button class="dropdown-item-btn" id="btn-toggle-sound">
              <span>${soundEngine.sfxEnabled ? '🔊 Hiệu ứng (SFX)' : '🔇 Hiệu ứng (SFX)'}</span>
              <span class="item-sub">${soundEngine.sfxEnabled ? 'Đang bật' : 'Đang tắt'}</span>
            </button>
            <button class="dropdown-item-btn" id="btn-toggle-cam">
              <span>📐 Góc bàn 2.5D</span>
              <span class="item-sub">${this.cameraAngles[this.cameraIndex].label}</span>
            </button>
            <button class="dropdown-item-btn" id="btn-cycle-diorama-menu">
              <span>🌸 Tiểu cảnh bàn</span>
              <span class="item-sub">Hoa tháng ${this.tableFlowerMonth}</span>
            </button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item-btn" id="btn-open-tutorial">
              <span>🎓 Hướng dẫn chơi</span>
              <span class="item-sub">Cùng Ayame</span>
            </button>
            <button class="dropdown-item-btn" id="btn-open-rules">
              <span>📜 Luật & Bảng Yaku</span>
              <span class="item-sub">Xem chi tiết</span>
            </button>
            <button class="dropdown-item-btn" id="btn-change-opp-menu" ${isMp ? 'disabled' : ''}>
              <span>⇄ Đổi đối thủ</span>
              <span class="item-sub">Chọn kỳ thủ khác</span>
            </button>
            <button class="dropdown-item-btn" id="btn-restart-match">
              <span>🔄 Ván mới</span>
              <span class="item-sub">Chia lại bài</span>
            </button>
          </div>
        </div>
      </div>
    `);

    nav.querySelector('#btn-mode-pve').onclick = () => {
      this.settingsMenuOpen = false;
      this.activeModal = 'opponents';
      this.renderTopNav();
      this.renderActiveModal();
    };
    nav.querySelector('#btn-mode-pvp').onclick = () => {
      this.settingsMenuOpen = false;
      this.activeModal = 'pvp_lobby';
      this.renderTopNav();
      this.renderActiveModal();
    };
    nav.querySelector('#btn-mode-custom').onclick = () => {
      this.settingsMenuOpen = false;
      this.activeModal = 'custom_room';
      this.renderTopNav();
      this.renderActiveModal();
    };
    const livePill = nav.querySelector('#btn-live-room-info');
    if (livePill) {
      livePill.onclick = () => {
        this.settingsMenuOpen = false;
        this.activeModal = this.gameMode === 'pvp' ? 'pvp_lobby' : 'custom_room';
        this.renderTopNav();
        this.renderActiveModal();
      };
    }
    nav.querySelector('#btn-open-collection').onclick = () => {
      this.settingsMenuOpen = false;
      this.activeModal = 'collection';
      this.renderTopNav();
      this.renderActiveModal();
    };
    nav.querySelector('#btn-open-gacha').onclick = () => {
      this.settingsMenuOpen = false;
      this.activeModal = 'gacha';
      this.renderTopNav();
      this.renderActiveModal();
    };
    nav.querySelector('#btn-toggle-dark').onclick = () => {
      this.toggleDarkMode();
    };
    nav.querySelector('#btn-toggle-settings').onclick = (e) => {
      e.stopPropagation();
      this.settingsMenuOpen = !this.settingsMenuOpen;
      this.renderTopNav();
    };
    nav.querySelectorAll('[data-anim-speed]').forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const spd = Number(btn.getAttribute('data-anim-speed'));
        this.setAnimSpeed(spd);
      };
    });
    nav.querySelector('#btn-cycle-bgm').onclick = (e) => {
      e.stopPropagation();
      soundEngine.cycleTrack();
      this.renderTopNav();
    };
    nav.querySelector('#btn-toggle-bgm').onclick = (e) => {
      e.stopPropagation();
      soundEngine.toggleBgm();
      this.renderTopNav();
    };
    nav.querySelector('#btn-toggle-sound').onclick = (e) => {
      e.stopPropagation();
      const on = soundEngine.toggleSfx();
      if (on) soundEngine.playCardHover();
      this.renderTopNav();
    };
    nav.querySelector('#btn-toggle-cam').onclick = (e) => {
      e.stopPropagation();
      this.cameraIndex = (this.cameraIndex + 1) % this.cameraAngles.length;
      document.documentElement.style.setProperty(
        '--board-tilt',
        this.cameraAngles[this.cameraIndex].deg
      );
      this.renderTopNav();
    };
    nav.querySelector('#btn-open-tutorial').onclick = () => {
      this.openTutorial();
    };
    nav.querySelector('#btn-open-rules').onclick = () => {
      this.settingsMenuOpen = false;
      this.activeModal = 'rules';
      this.renderTopNav();
      this.renderActiveModal();
    };
    nav.querySelector('#btn-cycle-diorama-menu').onclick = () => {
      this.rollNewTableFlowerMonth();
      soundEngine.playCardHover();
      this.renderCenterBoard();
      this.renderTopNav();
    };
    nav.querySelector('#btn-change-opp-menu').onclick = () => {
      if (isMp) return;
      this.settingsMenuOpen = false;
      this.openOpponentPicker();
    };
    nav.querySelector('#btn-restart-match').onclick = () => {
      this.settingsMenuOpen = false;
      if (isMp) {
        this.rollNewTableFlowerMonth();
        this.engine.startNewMatch(this.engine.totalRounds);
        const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
        multiplayerService.syncRoomState(canonical, { type: 'MATCH_START' });
        this.renderAll();
      } else {
        this.startMatchWithOpponent(this.currentOpponent.id, this.engine.totalRounds);
      }
    };
  }

  renderLeftPanel() {
    const left = document.getElementById('left-panel');
    if (!left) return;
    const opp = this.currentOpponent;
    const isPlayerTurn = this.engine.phase.startsWith('PLAYER');
    const isMp = this.isMultiplayerMatch();
    const oppDisplayName = this.getOpponentDisplayName();
    const modeBadgeText = isMp
      ? `🟢 PHÒNG #${multiplayerService.roomCode}`
      : (opp.difficultyLabel || '').split(' ')[0];
    const showDialogue = !!this.currentDialogue && Date.now() < this.dialogueHideAt;

    const roundMonth = ((this.engine.currentRound - 1) % 12) + 1;

    setElementMarkup(left, `
      <!-- 3:4 Kakejiku Hanging Scroll Character Portrait -->
      <div class="opponent-vn-card okami-kakejiku">
        <div class="scroll-roller-bar top"></div>
        <img src="${opp.avatar}" alt="${oppDisplayName}" class="opponent-portrait-img" />
        ${isMp ? '' : '<button class="opp-swap-btn" id="btn-swap-opp" title="Đổi đối thủ">⇄</button>'}

        <div class="opponent-portrait-overlay">
          <div class="opponent-name-badge">
            <span class="jp-sub">${modeBadgeText}</span>
            <h2>${oppDisplayName}</h2>
          </div>
          ${
            showDialogue
              ? `<div class="dialogue-bubble">${this.currentDialogue}</div>`
              : ''
          }
        </div>
        <div class="scroll-roller-bar bottom"></div>
      </div>

      <!-- Okami Washi Scroll Scoreboard -->
      <div class="match-scoreboard okami-makimono-box">
        <div class="scroll-roller-bar top"></div>
        <div class="round-banner">
          <span class="round-month-title">Hiệp ${this.engine.currentRound}/${this.engine.totalRounds} · Tháng ${roundMonth}</span>
        </div>

        <div class="score-vs-grid">
          <div class="score-box ${isPlayerTurn ? 'active-turn' : ''}">
            <span class="who-label">Bạn</span>
            <span class="pts-num">${this.engine.playerScore}</span>
            ${this.engine.playerCalledKoiKoi ? '<span class="pts-unit">🔥 Koi</span>' : ''}
          </div>
          <div class="score-box ${!isPlayerTurn ? 'active-turn' : ''}">
            <span class="who-label">Đối thủ</span>
            <span class="pts-num">${this.engine.aiScore}</span>
            ${this.engine.aiCalledKoiKoi ? '<span class="pts-unit">🔥 Koi</span>' : ''}
          </div>
        </div>
        <div class="scroll-roller-bar bottom"></div>
      </div>
    `);
    const swapBtn = left.querySelector('#btn-swap-opp');
    if (swapBtn) swapBtn.onclick = (e) => {
      e.stopPropagation();
      this.openOpponentPicker();
    };
  }

  // Opens the opponent selector; mid-match it asks first since picking restarts the match.
  openOpponentPicker() {
    const e = this.engine;
    const midMatch = !['ROUND_OVER', 'MATCH_OVER'].includes(e.phase)
      && (e.playerCaptured.length || e.aiCaptured.length || e.currentRound > 1);
    if (midMatch && !window.confirm('Đổi đối thủ sẽ bỏ trận hiện tại. Tiếp tục?')) return;
    this.activeModal = 'opponents';
    this.renderTopNav();
    this.renderActiveModal();
  }

  /**
   * Builds the static tabletop scene shell ONCE (board frame, diorama plaque, Enso brush ring,
   * ground-plane & billboard diorama layers) with empty placeholders for the dynamic zones.
   * Re-rendering the board only swaps those placeholders, so decor animations keep running.
   */
  buildCenterBoardShell(stage) {
    setElementMarkup(stage, `
      <div class="tabletop-25d-scene-wrap">
        <div class="tabletop-25d-board">
          <div class="board-corner tl"></div>
          <div class="board-corner tr"></div>
          <div class="board-corner bl"></div>
          <div class="board-corner br"></div>

          <!-- Okami Sumi-e Enso Brush Circle & Golden Spirit Wisps Painted on the Tatami Mat -->
          <svg class="okami-enso-svg" viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <radialGradient id="okamiFireGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#fff4c2" stop-opacity="0.45"/>
                <stop offset="55%" stop-color="#f4a226" stop-opacity="0.22"/>
                <stop offset="100%" stop-color="#d12c1f" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="325" cy="185" r="165" fill="url(#okamiFireGlow)" />
            <!-- Expressive Sumi-e Enso Brush Ring -->
            <path d="M 325,38 C 418,34 488,96 485,184 C 482,272 406,332 318,330 C 228,328 162,264 166,178 C 170,102 232,48 308,42"
                  fill="none" stroke="#18100c" stroke-width="22" stroke-linecap="round" opacity="0.58" />
            <path d="M 332,48 C 412,46 472,102 470,184 C 468,262 398,318 318,316 C 238,314 178,256 180,178"
                  fill="none" stroke="#0f0906" stroke-width="8" stroke-dasharray="48 14 90 18" stroke-linecap="round" opacity="0.68" />
            <!-- Golden Spirit Flame Wisps -->
            <path d="M 215,95 Q 245,55 295,62 M 435,110 Q 465,165 435,235 M 225,275 Q 285,315 365,295"
                  fill="none" stroke="#ffd166" stroke-width="3.5" stroke-linecap="round" opacity="0.55" />
          </svg>

          <!-- Ground-Plane Shadows & Resting Petals on the Tilted Tatami Mat -->
          ${renderTabletopFlowerDioramaSVG(this.tableFlowerMonth)}

          <!-- Dynamic zone placeholders (swapped in place by renderCenterBoard) -->
          <div class="ai-hand-wrapper"></div>
          <div class="field-ba-zone"></div>
        </div>

        <!-- Upright 2.5D Billboard Pop-up Elements (100% Perpendicular to Player POV & Unclipped by Board Frame) -->
        ${renderTabletopBillboardDioramaHTML(this.tableFlowerMonth)}
      </div>

      <div class="player-hand-zone okami-tefuda-dock"></div>
    `);
  }

  renderCenterBoard() {
    const stage = document.getElementById('center-stage');
    if (!stage) return;
    const opp = this.currentOpponent;
    const oppDisplayName = this.getOpponentDisplayName();
    const isMp = this.isMultiplayerMatch();
    const equippedBack = this.saveData.equippedBack;
    const equippedSkin = this.saveData.equippedSkin;

    const aiBackId = equippedBack;

    const candidateIds = new Set(this.engine.matchingFieldCandidates.map((c) => c.id));
    const fieldMonthsSet = new Set(this.engine.field.map((c) => c.month));
    const pendingDrawnCard =
      this.engine.phase === 'PLAYER_SELECT_FIELD_DRAW'
        ? this.engine.drawnCard || this.engine.pendingCard
        : null;

    let instructionText =
      '🟢 LƯỢT CỦA BẠN · Lá có chấm ngọc sẽ ăn được bài cùng Tháng trên chiếu';
    if (this.engine.phase === 'PLAYER_SELECT_FIELD_HAND') {
      instructionText = `🎯 Chọn 1 trong 2 lá Tháng ${this.engine.pendingCard?.month} phát sáng trên bàn để ăn`;
    } else if (this.engine.phase === 'PLAYER_SELECT_FIELD_DRAW') {
      instructionText = `🎯 Lá vừa bốc (${pendingDrawnCard?.viName || ''} · Tháng ${this.engine.pendingCard?.month}) khớp 2 lá trên bàn · Chọn lá muốn lấy`;
    } else if (this.engine.phase === 'AI_TURN') {
      instructionText = isMp
        ? `⏳ Đang chờ ${oppDisplayName} đánh bài...`
        : `⏳ ${opp.name} đang suy nghĩ nước đi...`;
    }

    const hasRow3 = this.engine.hasFieldRow3();
    const visualSlotOrder = hasRow3
      ? [8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3]
      : [4, 5, 6, 7, 0, 1, 2, 3];

    // The static scene shell (board frame, plaque, Enso, ground & billboard diorama) is built ONCE
    // per diorama month and kept alive across re-renders, so the decor CSS animations (clouds,
    // plants, sake cup, petals) are never restarted by game actions. Only the dynamic zones
    // (opponent hand, field, player hand) are swapped below.
    const sceneKey = String(this.tableFlowerMonth);
    if (stage.dataset.sceneKey !== sceneKey || !stage.querySelector('.tabletop-25d-board')) {
      this.buildCenterBoardShell(stage);
      stage.dataset.sceneKey = sceneKey;
    }

    const board = stage.querySelector('.tabletop-25d-board');
    const boardClass = `tabletop-25d-board wood-${opp.boardWood} flora-month-${this.tableFlowerMonth}`;
    if (board.className !== boardClass) {
      board.className = boardClass;
    }


    replaceElementWithMarkup(board.querySelector(':scope > .ai-hand-wrapper'), `
          <!-- Opponent Hand (Face Down - Kept Clean & Unblurred) -->
          <div class="ai-hand-wrapper">
            <div class="ai-hand-zone">
              ${this.engine.aiHand
                .map(
                  () => `
                <div class="hana-card-3d ai-small-card" title="Bài trên tay của ${oppDisplayName}">
                  ${renderCardBackSVG(aiBackId)}
                </div>
              `
                )
                .join('')}
            </div>
          </div>
    `);

    replaceElementWithMarkup(board.querySelector(':scope > .field-ba-zone'), `
          <!-- Center Field (Fixed Draw Deck Stack + Fixed-Slot 2x4 / 3x4 Field Card Grid) -->
          <div class="field-ba-zone">
            <!-- Fixed 3D Draw Pile (Yama) Locked on the Left Side of the Field -->
            <div class="draw-pile-container ${pendingDrawnCard ? 'has-drawn-reveal' : ''}" title="${pendingDrawnCard ? `Lá vừa bốc: ${pendingDrawnCard.viName} (Tháng ${pendingDrawnCard.month}) — Chọn 1 trong 2 lá cùng tháng trên bàn` : `Bộ bài bốc cố định trên bàn (Còn ${this.engine.deck.length} lá)`}">
              <div class="draw-pile-stack" id="draw-pile-stack">
                ${renderCardBackSVG(equippedBack)}
              </div>
              ${
                pendingDrawnCard
                  ? `
                <div class="drawn-card-reveal hana-card-3d" id="drawn-card-reveal" data-drawn-card-id="${pendingDrawnCard.id}" title="${pendingDrawnCard.viName} - Tháng ${pendingDrawnCard.month} (${pendingDrawnCard.points}đ) · Chọn 1 trong 2 lá phát sáng trên bàn để ăn">
                  <div class="drawn-card-label">LÁ VỪA BỐC</div>
                  <div class="match-glow-dot selected-dot"></div>
                  ${renderCardFaceSVG(pendingDrawnCard, equippedSkin, true)}
                </div>
              `
                  : ''
              }
              <div class="draw-count-badge" title="Số lá còn trong bộ bài">${this.engine.deck.length}</div>
            </div>

            <!-- Fixed-Slot Face-up Field Cards (2x4 expanding to 3x4) -->
            <div class="field-cards-grid ${hasRow3 ? 'has-row-3' : 'rows-2'}" id="field-cards-grid">
              ${visualSlotOrder
                .map((slotIdx) => {
                  const card = this.engine.fieldSlots[slotIdx];
                  if (!card) {
                    return `<div class="field-card-slot empty" data-slot-index="${slotIdx}" aria-hidden="true"></div>`;
                  }
                  const isChoiceCandidate = candidateIds.has(card.id);
                  const isHoverMatch =
                    this.hoveredHandCardMonth === card.month && !isChoiceCandidate;
                  const extraClass = isChoiceCandidate
                    ? 'field-choice-candidate'
                    : isHoverMatch
                    ? 'field-match-highlight'
                    : '';

                  return `
                    <div class="field-card-slot occupied" data-slot-index="${slotIdx}">
                      <div class="hana-card-3d ${extraClass}"
                           data-field-id="${card.id}"
                           data-slot-index="${slotIdx}"
                           data-month="${card.month}"
                           title="${card.viName} (${card.jpName}) - Tháng ${card.month} (${card.points}đ)">
                        ${renderCardFaceSVG(card, equippedSkin, true)}
                      </div>
                    </div>
                  `;
                })
                .join('')}
            </div>
          </div>
    `);

    replaceElementWithMarkup(stage.querySelector(':scope > .player-hand-zone'), `
      <!-- Player Hand Foreground Dock (Okami Brush Splash & Washi Scroll Tray) -->
      <div class="player-hand-zone okami-tefuda-dock">
        <div class="scroll-roller-bar top"></div>
        <div class="turn-instruction-bar">${instructionText}</div>
        <div class="player-hand-cards" id="player-hand-cards">
          ${this.engine.playerHand
            .map((card) => {
              const hasMatch = fieldMonthsSet.has(card.month);
              const isSelected =
                this.engine.phase === 'PLAYER_SELECT_FIELD_HAND' &&
                this.engine.pendingCard?.id === card.id;
              return `
                <div class="hana-card-3d ${hasMatch ? 'has-field-match' : ''} ${isSelected ? 'selected-hand-card' : ''}"
                     data-hand-id="${card.id}"
                     data-month="${card.month}"
                     title="${card.viName} - Tháng ${card.month} (${card.points}đ)\n${card.lore}">
                  ${
                    hasMatch || isSelected
                      ? `<div class="match-glow-dot ${isSelected ? 'selected-dot' : ''}" title="Khớp bài Tháng ${card.month} trên bàn"></div>`
                      : ''
                  }
                  ${renderCardFaceSVG(card, equippedSkin, true)}
                </div>
              `;
            })
            .join('')}
        </div>
        <div class="scroll-roller-bar bottom"></div>
      </div>
    `);

    const handEls = stage.querySelectorAll('[data-hand-id]');
    handEls.forEach((el) => {
      const cardId = Number(el.getAttribute('data-hand-id'));
      const month = Number(el.getAttribute('data-month'));

      el.addEventListener('mouseenter', () => {
        if (
          this.engine.phase !== 'PLAYER_HAND' &&
          this.engine.phase !== 'PLAYER_SELECT_FIELD_HAND'
        ) {
          return;
        }
        soundEngine.playCardHover();
        this.hoveredHandCardMonth = month;
        this.updateFieldHighlightOnly();
      });

      el.addEventListener('mouseleave', () => {
        if (this.hoveredHandCardMonth !== null) {
          this.hoveredHandCardMonth = null;
          this.updateFieldHighlightOnly();
        }
      });

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (
          this.engine.phase !== 'PLAYER_HAND' &&
          this.engine.phase !== 'PLAYER_SELECT_FIELD_HAND'
        ) {
          return;
        }
        this.handlePlayerPlayHandCard(cardId, e.clientX, e.clientY);
      });
    });

    const fieldEls = stage.querySelectorAll('[data-field-id]');
    fieldEls.forEach((el) => {
      const fieldCardId = Number(el.getAttribute('data-field-id'));
      const fieldMonth = Number(el.getAttribute('data-month'));

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (
          this.engine.phase === 'PLAYER_SELECT_FIELD_HAND' &&
          candidateIds.has(fieldCardId)
        ) {
          this.handlePlayerSelectFieldTarget(fieldCardId, e.clientX, e.clientY);
        } else if (
          this.engine.phase === 'PLAYER_SELECT_FIELD_DRAW' &&
          candidateIds.has(fieldCardId)
        ) {
          this.handlePlayerSelectDrawTarget(fieldCardId, e.clientX, e.clientY);
        } else if (
          this.engine.phase === 'PLAYER_HAND' ||
          this.engine.phase === 'PLAYER_SELECT_FIELD_HAND'
        ) {
          const matchingHandCard = this.engine.playerHand.find(
            (c) => c.month === fieldMonth
          );
          if (matchingHandCard) {
            this.handlePlayerPlayHandCard(
              matchingHandCard.id,
              e.clientX,
              e.clientY,
              fieldCardId
            );
          }
        }
      });
    });

    const drawnRevealEl = stage.querySelector('#drawn-card-reveal');
    if (drawnRevealEl) {
      drawnRevealEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (
          this.engine.phase === 'PLAYER_SELECT_FIELD_DRAW' &&
          this.engine.matchingFieldCandidates.length > 0
        ) {
          const bestTarget = [...this.engine.matchingFieldCandidates].sort(
            (a, b) => b.points - a.points
          )[0];
          if (bestTarget) {
            this.handlePlayerSelectDrawTarget(bestTarget.id, e.clientX, e.clientY);
          }
        }
      });
    }
  }

  updateFieldHighlightOnly() {
    const fieldEls = document.querySelectorAll('[data-field-id]');
    fieldEls.forEach((el) => {
      const m = Number(el.getAttribute('data-month'));
      if (this.hoveredHandCardMonth === m) {
        el.classList.add('field-match-highlight');
      } else {
        el.classList.remove('field-match-highlight');
      }
    });
  }

  renderRightPanel() {
    const right = document.getElementById('right-panel');
    const equippedSkin = this.saveData.equippedSkin;

    setElementMarkup(right, `
      <!-- Yaku list button (opens the full Yaku table) -->
      <button class="yaku-list-btn okami-makimono-box" id="btn-yaku-more" title="Xem bảng Yaku">
        <span class="hanko-seal">役</span> YAKU LIST
      </button>

      <!-- Opponent Captured Cards Hanging Scroll -->
      <div class="captured-tray-box okami-makimono-box" id="ai-captured-tray">
        <div class="scroll-roller-bar top"></div>
        <div class="tray-header">
          <span>BÀI ĐỐI THỦ (${this.engine.aiCaptured.length})</span>
        </div>
        ${this.renderCategorizedCapturedHTML(this.engine.aiCaptured, equippedSkin)}
        <div class="scroll-roller-bar bottom"></div>
      </div>

      <!-- Player Captured Cards Hanging Scroll -->
      <div class="captured-tray-box okami-makimono-box" id="player-captured-tray">
        <div class="scroll-roller-bar top"></div>
        <div class="tray-header">
          <span>BÀI CỦA BẠN (${this.engine.playerCaptured.length})</span>
        </div>
        ${this.renderCategorizedCapturedHTML(this.engine.playerCaptured, equippedSkin)}
        <div class="scroll-roller-bar bottom"></div>
      </div>
    `);

    const yakuMoreBtn = right.querySelector('#btn-yaku-more');
    if (yakuMoreBtn) {
      yakuMoreBtn.onclick = () => {
        this.activeModal = 'rules';
        this.renderActiveModal();
      };
    }

    right.querySelectorAll('[data-inspect-id]').forEach((el) => {
      el.addEventListener('click', () => {
        this.inspectedCardId = Number(el.getAttribute('data-inspect-id'));
        this.collectionTab = 'compendium';
        this.activeModal = 'collection';
        this.renderActiveModal();
      });
    });
  }

  renderCategorizedCapturedHTML(cards, skinId) {
    if (cards.length === 0) {
      return `<div style="font-size:11px; color:var(--text-muted); padding:4px 2px;">Chưa ăn lá bài nào</div>`;
    }

    const groups = [
      { label: 'Quang', list: cards.filter((c) => c.type === 'hikari') },
      { label: 'Thú', list: cards.filter((c) => c.type === 'tane') },
      { label: 'Thơ', list: cards.filter((c) => c.type === 'tanzaku') },
      {
        label: 'Lá',
        list: cards.filter((c) => c.type === 'kasu')
      }
    ].filter((g) => g.list.length > 0);

    return `
      <div class="captured-categories">
        ${groups
          .map(
            (g) => `
          <div class="cap-group-row">
            <div class="cap-group-label">${g.label} (${g.list.length})</div>
            <div class="cap-mini-cards">
              ${g.list
                .map(
                  (c) => `
                <div class="mini-captured-card" data-inspect-id="${c.id}" title="${c.viName} (Bấm để soi 3D)">
                  ${renderCardFaceSVG(c, skinId, false)}
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  // ==========================================================================
  // PLAYER, AI & MULTIPLAYER GAMEPLAY TURN EXECUTION
  // ==========================================================================

  snapshotFieldRects() {
    const map = {};
    document.querySelectorAll('[data-field-id]').forEach((el) => {
      const id = Number(el.getAttribute('data-field-id'));
      map[id] = el.getBoundingClientRect();
    });
    return map;
  }

  async handlePlayerPlayHandCard(cardId, clientX, clientY, targetFieldCardId = null) {
    if (this.isAnimating) return;
    this.hoveredHandCardMonth = null;

    const fromRect = cardAnimator.getRect(`[data-hand-id="${cardId}"]`);
    const fieldRects = this.snapshotFieldRects();

    const res = this.engine.playHandCard(cardId, targetFieldCardId);
    if (res.error) return;

    if (res.status === 'NEEDS_FIELD_SELECTION') {
      this.pendingHandCardRect = fromRect;
      soundEngine.playCardHover();
      this.renderAll();
      return;
    }

    await this.animatePlayerHandStepResult(res, fromRect, fieldRects);
  }

  async handlePlayerSelectFieldTarget(fieldCardId, clientX, clientY) {
    if (this.isAnimating) return;
    const pendingId = this.engine.pendingCard?.id;
    const fromRect =
      this.pendingHandCardRect ||
      cardAnimator.getRect(`[data-hand-id="${pendingId}"]`);
    const fieldRects = this.snapshotFieldRects();

    const res = this.engine.playHandCard(pendingId, fieldCardId);
    if (res.error) return;

    await this.animatePlayerHandStepResult(res, fromRect, fieldRects);
  }

  async animatePlayerHandStepResult(res, fromRect, fieldRects) {
    this.isAnimating = true;
    const skinId = this.saveData.equippedSkin;
    this.pendingMpMoveAction = {
      type: 'TURN_MOVE',
      handCard: res.card,
      capturedHand: res.captured || [],
      drawnCard: null,
      capturedDraw: []
    };

    if (res.captured && res.captured.length > 0) {
      this.renderCenterBoard();
      this.renderLeftPanel();

      const matchedCards = res.captured.slice(1);
      const targetRect = fieldRects[matchedCards[0]?.id];
      const relocatedIds = (this.engine.lastFieldRelocations || []).map((r) => r.card.id);
      const relocPromise = cardAnimator.animateFieldRelocations(fieldRects, {
        delayMs: 220,
        relocatedIds
      });

      await Promise.all([
        cardAnimator.animateCaptureSequence({
          actor: 'player',
          playedCard: res.card,
          matchedCards,
          skinId,
          fromRect,
          fieldTargetRect: targetRect,
          onImpactSound: (gotBright) => {
            soundEngine.playCardSnap(gotBright);
            if (targetRect) {
              this.particles.triggerBurst(
                targetRect.left + targetRect.width / 2,
                targetRect.top + targetRect.height / 2,
                gotBright ? '#ffd166' : '#ff758f',
                gotBright ? 36 : 22
              );
            }
            if (gotBright) {
              this.currentDialogue = this.pickRandom(
                this.currentOpponent.dialogues.playerCaptureBright
              );
            }
            const hasHighCard = res.captured.some((c) => c.points >= 5);
            this.triggerOpponentTeaseLine(gotBright || hasHighCard);
          }
        }),
        relocPromise
      ]);

      this.renderRightPanel();
      this.renderLeftPanel();
    } else {
      this.renderCenterBoard();
      const shiftPromise = cardAnimator.animateFieldRelocations(fieldRects, {
        delayMs: 0
      });
      await Promise.all([
        cardAnimator.animateCardToFieldSlot({
          card: res.card,
          skinId,
          fromRect,
          toFieldCardId: res.card.id,
          onLandSound: () => soundEngine.playCardSnap(false)
        }),
        shiftPromise
      ]);
    }

    await this.executePlayerDrawStep();
  }

  async executePlayerDrawStep() {
    const deckRect = cardAnimator.getRect('#draw-pile-stack');
    const fieldRects = this.snapshotFieldRects();

    const drawRes = this.engine.drawStepForPlayer();
    if (drawRes.status === 'DRAW_NEEDS_SELECTION') {
      this.pendingDrawRect = deckRect;
      this.isAnimating = false;
      soundEngine.playCardHover();
      this.renderAll();
      return;
    }

    await this.animateAndFinishPlayerDraw(drawRes, deckRect, fieldRects);
  }

  async handlePlayerSelectDrawTarget(fieldCardId, clientX, clientY) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const revealEl = document.querySelector('#drawn-card-reveal');
    const deckRect = revealEl
      ? cardAnimator.getRect(revealEl)
      : this.pendingDrawRect || cardAnimator.getRect('#draw-pile-stack');
    const fieldRects = this.snapshotFieldRects();

    const drawRes = this.engine.selectFieldForDrawnCard(fieldCardId);
    await this.animateAndFinishPlayerDraw(drawRes, deckRect, fieldRects);
  }

  async animateAndFinishPlayerDraw(drawRes, deckRect, fieldRects) {
    const skinId = this.saveData.equippedSkin;
    if (this.pendingMpMoveAction) {
      this.pendingMpMoveAction.drawnCard = drawRes.drawnCard || null;
      this.pendingMpMoveAction.capturedDraw = drawRes.captured || [];
    }

    if (drawRes.drawnCard) {
      if (drawRes.captured && drawRes.captured.length > 0) {
        this.renderCenterBoard();
        const matchedCards = drawRes.captured.slice(1);
        const targetRect = fieldRects[matchedCards[0]?.id];
        const relocatedIds = (this.engine.lastFieldRelocations || []).map((r) => r.card.id);
        const relocPromise = cardAnimator.animateFieldRelocations(fieldRects, {
          delayMs: 220,
          relocatedIds
        });

        await Promise.all([
          cardAnimator.animateCaptureSequence({
            actor: 'player',
            playedCard: drawRes.drawnCard,
            matchedCards,
            skinId,
            fromRect: deckRect,
            fieldTargetRect: targetRect,
            onImpactSound: (gotBright) => {
              soundEngine.playCardSnap(gotBright);
              if (targetRect) {
                this.particles.triggerBurst(
                  targetRect.left + targetRect.width / 2,
                  targetRect.top + targetRect.height / 2,
                  gotBright ? '#ffd166' : '#06d6a0',
                  gotBright ? 34 : 20
                );
              }
              if (!this.activeTeasePopup) {
                this.triggerOpponentTeaseLine(gotBright);
              }
            }
          }),
          relocPromise
        ]);
        this.renderRightPanel();
      } else {
        this.renderCenterBoard();
        const shiftPromise = cardAnimator.animateFieldRelocations(fieldRects, {
          delayMs: 0
        });
        await Promise.all([
          cardAnimator.animateCardToFieldSlot({
            card: drawRes.drawnCard,
            skinId,
            fromRect: deckRect,
            toFieldCardId: drawRes.drawnCard.id,
            onLandSound: () => soundEngine.playCardSnap(false)
          }),
          shiftPromise
        ]);
      }
    }

    this.isAnimating = false;
    this.afterPlayerDrawResolved(drawRes);
  }

  async afterPlayerDrawResolved(drawRes) {
    const yCheck = drawRes.yakuCheck;
    const isMp = this.isMultiplayerMatch();

    if (yCheck?.newYaku) {
      soundEngine.playShobuVictory();
      await this.showYakuReveal(yCheck, 'player');
      this.triggerOpponentTeaseLine(true);
      if (yCheck.autoShobu) {
        this.handleRoundFinished(yCheck.outcome);
        return;
      }
      // Show Koi-Koi vs Shobu modal!
      this.renderAll();
      return;
    }

    if (yCheck?.roundDraw) {
      this.handleRoundFinished(yCheck.outcome);
      return;
    }

    if (isMp) {
      const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
      multiplayerService.syncRoomState(canonical, this.pendingMpMoveAction);
      this.pendingMpMoveAction = null;
      this.renderAll();
      return;
    }

    this.renderAll();
    if (this.engine.phase === 'AI_TURN') {
      this.scheduleAiTurn();
    }
  }

  /**
   * Trình diễn các bộ vừa ăn (mới hoặc vừa nâng điểm) trước bước Koi-Koi/Shōbu.
   * actor 'ai' dùng bản ngắn kèm dòng "Đối thủ ... đã ăn bộ".
   */
  async showYakuReveal(yakuCheck, actor) {
    const evalRes = yakuCheck?.evalResult;
    if (!evalRes?.yakus?.length) return;
    const prev = new Set((yakuCheck.prevSignature || '').split('|'));
    const fresh = evalRes.yakus.filter((y) => !prev.has(`${y.id}:${y.points}`));
    const isAi = actor === 'ai';
    this.yakuRevealActive = true;
    // Vẽ lại bàn (lá vừa ăn vào khay) nhưng giữ modal Koi-Koi đóng tới khi popup xong
    this.renderAll();
    try {
      await playYakuReveal(fresh.length ? fresh : evalRes.yakus, {
        short: isAi,
        actorName: isAi ? this.currentOpponent?.name : '',
        skinId: this.saveData.equippedSkin,
        durationMs: cardAnimator.scaleMs(isAi ? 2000 : 2800)
      });
    } finally {
      this.yakuRevealActive = false;
    }
  }

  scheduleAiTurn() {
    if (this.isMultiplayerMatch()) return;
    // Tạm dừng AI khi đang mở hướng dẫn / popup ăn bộ; closeTutorial() sẽ gọi lại
    if (this.activeModal === 'tutorial' || this.yakuRevealActive) return;
    setTimeout(async () => {
      if (
        this.engine.phase !== 'AI_TURN' ||
        this.isAnimating ||
        this.isMultiplayerMatch() ||
        this.activeModal === 'tutorial' ||
        this.yakuRevealActive
      ) {
        return;
      }
      this.isAnimating = true;

      const opp = this.currentOpponent;
      const skinId = this.saveData.equippedSkin;
      const move = this.engine.computeBestAiMove(opp.aiProfile);
      if (!move) {
        this.isAnimating = false;
        return;
      }

      const aiHandRect = cardAnimator.getRect('.ai-hand-zone .hana-card-3d:last-child');
      const fieldRects1 = this.snapshotFieldRects();

      const idx = this.engine.aiHand.findIndex((c) => c.id === move.handCard.id);
      if (idx !== -1) this.engine.aiHand.splice(idx, 1);

      const matches = this.engine.getFieldMatches(move.handCard);
      const capturedHand = this.engine.resolveCardPlacement(
        'ai',
        move.handCard,
        matches,
        move.fieldTarget?.id
      );

      if (capturedHand.length > 0) {
        this.renderCenterBoard();
        const matchedCards = capturedHand.slice(1);
        const targetRect = fieldRects1[matchedCards[0]?.id];
        const relocatedIds1 = (this.engine.lastFieldRelocations || []).map((r) => r.card.id);
        const relocPromise1 = cardAnimator.animateFieldRelocations(fieldRects1, {
          delayMs: 220,
          relocatedIds: relocatedIds1
        });

        await Promise.all([
          cardAnimator.animateCaptureSequence({
            actor: 'ai',
            playedCard: move.handCard,
            matchedCards,
            skinId,
            fromRect: aiHandRect,
            fieldTargetRect: targetRect,
            onImpactSound: (brightHand) => {
              soundEngine.playCardSnap(brightHand);
              if (brightHand) {
                this.currentDialogue = this.pickRandom(opp.dialogues.captureBright);
              } else {
                this.currentDialogue = this.pickRandom(opp.dialogues.matchCard);
              }
            }
          }),
          relocPromise1
        ]);
        this.renderRightPanel();
        this.renderLeftPanel();
      } else {
        this.renderCenterBoard();
        const shiftPromise1 = cardAnimator.animateFieldRelocations(fieldRects1, {
          delayMs: 0
        });
        await Promise.all([
          cardAnimator.animateCardToFieldSlot({
            card: move.handCard,
            skinId,
            fromRect: aiHandRect,
            toFieldCardId: move.handCard.id,
            onLandSound: () => soundEngine.playCardSnap(false)
          }),
          shiftPromise1
        ]);
      }

      if (this.engine.deck.length > 0) {
        const deckRect = cardAnimator.getRect('#draw-pile-stack');
        const fieldRects2 = this.snapshotFieldRects();
        const drawn = this.engine.deck.shift();
        const drawMatches = this.engine.getFieldMatches(drawn);
        const capturedDraw = this.engine.resolveCardPlacement('ai', drawn, drawMatches);

        if (capturedDraw.length > 0) {
          this.renderCenterBoard();
          const matchedDrawCards = capturedDraw.slice(1);
          const targetRect2 = fieldRects2[matchedDrawCards[0]?.id];
          const relocatedIds2 = (this.engine.lastFieldRelocations || []).map((r) => r.card.id);
          const relocPromise2 = cardAnimator.animateFieldRelocations(fieldRects2, {
            delayMs: 220,
            relocatedIds: relocatedIds2
          });

          await Promise.all([
            cardAnimator.animateCaptureSequence({
              actor: 'ai',
              playedCard: drawn,
              matchedCards: matchedDrawCards,
              skinId,
              fromRect: deckRect,
              fieldTargetRect: targetRect2,
              onImpactSound: (brightDraw) => {
                soundEngine.playCardSnap(brightDraw);
                if (brightDraw) {
                  this.currentDialogue = this.pickRandom(opp.dialogues.captureBright);
                }
              }
            }),
            relocPromise2
          ]);
          this.renderRightPanel();
          this.renderLeftPanel();
        } else {
          this.renderCenterBoard();
          const shiftPromise2 = cardAnimator.animateFieldRelocations(fieldRects2, {
            delayMs: 0
          });
          await Promise.all([
            cardAnimator.animateCardToFieldSlot({
              card: drawn,
              skinId,
              fromRect: deckRect,
              toFieldCardId: drawn.id,
              onLandSound: () => soundEngine.playCardSnap(false)
            }),
            shiftPromise2
          ]);
        }
      }

      this.isAnimating = false;
      const yakuCheck = this.engine.checkPostTurnYaku('ai');
      if (yakuCheck.newYaku) {
        this.isAnimating = true;
        await this.showYakuReveal(yakuCheck, 'ai');
        this.isAnimating = false;
        const wantKoiKoi = this.engine.shouldAiCallKoiKoi(
          opp.aiProfile,
          yakuCheck.evalResult
        );
        if (wantKoiKoi) {
          this.currentDialogue = this.pickRandom(opp.dialogues.callKoiKoi);
          this.engine.declareKoiKoi('ai');
          this.triggerAnimeCutin(
            opp.name,
            opp.avatar,
            'KOI-KOI! (こいこい)',
            `${opp.name} tuyên bố cược tiếp để nhân đôi điểm!`,
            opp.portrait
          );
          this.renderAll();
          return;
        } else {
          const outcome = this.engine.declareShobu('ai', yakuCheck.evalResult);
          this.handleRoundFinished(outcome);
          return;
        }
      }

      if (yakuCheck.roundDraw) {
        this.handleRoundFinished(yakuCheck.outcome);
        return;
      }

      this.renderAll();
    }, cardAnimator.scaleMs(350));
  }

  /**
   * portraitUrl (tuỳ chọn): ảnh chân dung tách nền (cutout/*.webp) → bản cut-in lớn,
   * nhân vật trồi khỏi dải đỏ; tiêu đề tách phần "(こいこい)" xuống dòng riêng.
   * Không có portraitUrl → giữ bản avatar tròn.
   */
  triggerAnimeCutin(name, avatarUrl, mainTitle, subText, portraitUrl = '') {
    soundEngine.playKoiKoiFanfare();
    const root = document.getElementById('cutin-root');
    if (portraitUrl) {
      const [, latin = mainTitle, jp = ''] = mainTitle.match(/^(.*?)\s*(\(.+\))$/) || [];
      setElementMarkup(root, `
        <div class="cutin-overlay">
          <div class="cutin-band has-portrait">
            <div class="cutin-portrait-clip">
              <img src="${portraitUrl}" class="cutin-portrait" alt="${name}" draggable="false" />
            </div>
            <div class="cutin-text-group">
              <h2>${latin}${jp ? ` <span class="kk-jp" lang="ja">${jp}</span>` : ''}</h2>
              <p>${subText}</p>
            </div>
          </div>
        </div>
      `);
    } else {
      setElementMarkup(root, `
        <div class="cutin-overlay">
          <div class="cutin-band">
            <img src="${avatarUrl}" class="cutin-avatar" alt="${name}" />
            <div class="cutin-text-group">
              <h2>${mainTitle}</h2>
              <p>${subText}</p>
            </div>
          </div>
        </div>
      `);
    }
    setTimeout(() => {
      root.replaceChildren();
    }, 1900);
  }

  handleRoundFinished(outcome, fromRemoteSync = false) {
    this.lastRoundSummary = outcome;
    const opp = this.currentOpponent;
    const isMp = this.isMultiplayerMatch();

    if (outcome.winner === 'player') {
      soundEngine.playShobuVictory();
      this.currentDialogue = this.pickRandom(opp.dialogues.loseRound);
      const roundCoins = (outcome.finalPoints || 1) * 25;
      this.saveData.coins += roundCoins;
      outcome.earnedRoundCoins = roundCoins;
    } else if (outcome.winner === 'ai') {
      soundEngine.playKoiKoiFanfare();
      this.currentDialogue = this.pickRandom(opp.dialogues.winRound);
      outcome.earnedRoundCoins = 20;
      this.saveData.coins += 20;
    } else {
      outcome.earnedRoundCoins = 30;
      this.saveData.coins += 30;
    }

    this.newlyUnlockedItems = [];
    if (outcome.isMatchComplete && this.engine.playerScore > this.engine.aiScore && !isMp) {
      const isFirstDefeat = !this.saveData.defeatedOpponents.includes(opp.id);
      const matchReward = isFirstDefeat
        ? opp.rewardCoins + opp.firstWinBonusCoins
        : opp.rewardCoins;
      this.saveData.coins += matchReward;
      outcome.matchBonusCoins = matchReward;

      if (isFirstDefeat) {
        this.saveData.defeatedOpponents.push(opp.id);
      }

      if (opp.unlocksCardBack && !this.saveData.unlockedBacks.includes(opp.unlocksCardBack)) {
        this.saveData.unlockedBacks.push(opp.unlocksCardBack);
        const bObj = getCardBackById(opp.unlocksCardBack);
        this.newlyUnlockedItems.push({ type: 'Mặt Lưng Độc Quyền', name: bObj.name });
      }
      if (opp.unlocksCardSkin && !this.saveData.unlockedSkins.includes(opp.unlocksCardSkin)) {
        this.saveData.unlockedSkins.push(opp.unlocksCardSkin);
        const sObj = getCardSkinById(opp.unlocksCardSkin);
        this.newlyUnlockedItems.push({ type: 'Thiết Kế Mặt Bài', name: sObj.name });
      }
      this.currentDialogue = this.pickRandom(opp.dialogues.defeatMatch);
    }

    if (isMp && !fromRemoteSync) {
      const canonical = this.engine.exportCanonicalState(
        multiplayerService.role,
        outcome
      );
      multiplayerService.syncRoomState(canonical, {
        ...(this.pendingMpMoveAction || {}),
        type: 'ROUND_FINISHED'
      });
      this.pendingMpMoveAction = null;
    }

    if (outcome.isMatchComplete) {
      multiplayerService.recordMatchResult({
        mode: this.gameMode,
        roomCode: multiplayerService.roomCode || null,
        playerScore: this.engine.playerScore,
        opponentScore: this.engine.aiScore,
        opponent: this.getOpponentDisplayName()
      });
    }

    this.persistSave();
    this.activeModal = 'round_end';
    this.renderAll();
  }

  // ==========================================================================
  // MODAL RENDERERS
  // ==========================================================================

  updateModalMarkup(root, modalKey, markup) {
    const existingWindow = root.querySelector('.modal-window');
    if (root.dataset.activeModalKey === modalKey && existingWindow) {
      const oldBody = existingWindow.querySelector('.modal-body');
      const oldScrollTop = oldBody ? oldBody.scrollTop : 0;
      const oldCompGrid = existingWindow.querySelector('.compendium-48-grid');
      const oldCompScroll = oldCompGrid ? oldCompGrid.scrollTop : 0;
      const prevTab = existingWindow.dataset.colTab || '';
      const nextTab = modalKey === 'collection' ? this.collectionTab : '';

      const range = document.createRange();
      range.selectNodeContents(existingWindow);
      const frag = range.createContextualFragment(markup);
      const nextWindow = frag.querySelector('.modal-window');
      if (nextWindow) {
        if (modalKey === 'collection' && prevTab === nextTab) {
          const oldPreviews = existingWindow.querySelectorAll('.collection-grid .preview-card-holder');
          const newPreviews = nextWindow.querySelectorAll('.collection-grid .preview-card-holder');
          if (oldPreviews.length > 0 && oldPreviews.length === newPreviews.length) {
            newPreviews.forEach((np, idx) => np.replaceWith(oldPreviews[idx]));
          }
        }
        existingWindow.replaceChildren(...nextWindow.childNodes);
        existingWindow.onclick = (e) => e.stopPropagation();
        existingWindow.dataset.colTab = nextTab;
        const newBody = existingWindow.querySelector('.modal-body');
        if (newBody && prevTab === nextTab) {
          newBody.scrollTop = oldScrollTop;
        }
        const newCompGrid = existingWindow.querySelector('.compendium-48-grid');
        if (newCompGrid && prevTab === nextTab) {
          newCompGrid.scrollTop = oldCompScroll;
        }
        return;
      }
    }

    root.dataset.activeModalKey = modalKey;
    setElementMarkup(root, markup);
    const win = root.querySelector('.modal-window');
    if (win) {
      win.onclick = (e) => e.stopPropagation();
      if (modalKey === 'collection') {
        win.dataset.colTab = this.collectionTab;
      }
    }
  }

  renderActiveModal() {
    const root = document.getElementById('modal-root');

    if (this.engine.phase === 'PLAYER_KOIKOI_DECISION') {
      // Chờ popup ăn bộ diễn xong rồi mới mở bảng Koi-Koi/Shōbu
      if (this.yakuRevealActive) {
        delete root.dataset.activeModalKey;
        root.replaceChildren();
        return;
      }
      // Giữ nguyên DOM nếu nội dung không đổi để cuộn giấy không diễn lại animation mở mỗi lần renderAll()
      const markup = this.buildKoiKoiDecisionModalHTML();
      if (root.dataset.activeModalKey === 'koikoi_decision' && this.koikoiModalMarkup === markup && root.firstElementChild) {
        return;
      }
      this.koikoiModalMarkup = markup;
      this.updateModalMarkup(root, 'koikoi_decision', markup);
      this.bindKoiKoiDecisionEvents(root);
      return;
    }

    if (!this.activeModal) {
      delete root.dataset.activeModalKey;
      root.replaceChildren();
      return;
    }

    switch (this.activeModal) {
      case 'round_end': {
        // Giữ nguyên DOM khi nội dung không đổi để animation mở bảng không diễn lại mỗi lần renderAll()
        const markup = this.buildRoundEndModalHTML();
        if (root.dataset.activeModalKey === 'round_end' && this.roundEndModalMarkup === markup && root.firstElementChild) {
          break;
        }
        this.roundEndModalMarkup = markup;
        this.updateModalMarkup(root, 'round_end', markup);
        this.bindRoundEndEvents(root);
        break;
      }
      case 'opponents':
        this.updateModalMarkup(root, 'opponents', this.buildOpponentsModalHTML());
        this.bindOpponentsModalEvents(root);
        break;
      case 'pvp_lobby':
        this.updateModalMarkup(root, 'pvp_lobby', this.buildPvpLobbyModalHTML());
        this.bindPvpLobbyModalEvents(root);
        break;
      case 'custom_room':
        this.updateModalMarkup(root, 'custom_room', this.buildCustomRoomModalHTML());
        this.bindCustomRoomModalEvents(root);
        break;
      case 'db_health':
        this.updateModalMarkup(root, 'db_health', this.buildDbHealthModalHTML());
        this.bindDbHealthModalEvents(root);
        break;
      case 'collection':
        this.updateModalMarkup(root, 'collection', this.buildCollectionModalHTML());
        this.bindCollectionModalEvents(root);
        break;
      case 'gacha':
        this.updateModalMarkup(root, 'gacha', this.buildGachaModalHTML());
        this.bindGachaModalEvents(root);
        break;
      case 'rules':
        this.updateModalMarkup(root, 'rules', this.buildRulesModalHTML());
        this.bindRulesModalEvents(root);
        break;
      case 'tutorial':
        this.updateModalMarkup(root, 'tutorial', this.buildTutorialModalHTML());
        this.bindTutorialModalEvents(root);
        break;
      default:
        delete root.dataset.activeModalKey;
        root.replaceChildren();
    }
  }

  /**
   * Khung cuộn giấy Makimono dùng chung cho bảng Koi-Koi/Shōbu và bảng kết quả hiệp.
   * Ảnh element nằm ở public/assets/koikoi_scroll/, CSS ở nhóm .kk-* trong main.css.
   */
  buildScrollModalHTML({ ariaLabel, extraClass = '', contentHtml }) {
    // Cánh hoa rơi: vị trí cố định theo chỉ số để markup không đổi giữa các lần render
    const petalColors = ['#ffb7c5', '#f6a3b4', '#e9798f', '#ffd1dc'];
    const petalsHtml = Array.from({ length: 9 }, (_, i) => {
      const style = [
        `left:${(7 + ((i * 37) % 88)).toFixed(0)}%`,
        `--pc:${petalColors[i % petalColors.length]}`,
        `--pd:${(1.1 + ((i * 0.83) % 4.2)).toFixed(2)}s`,
        `--pl:${(6 + ((i * 1.7) % 4)).toFixed(1)}s`,
        `--sx:${(((i * 53) % 120) - 60).toFixed(0)}px`,
        `--ps:${(0.7 + ((i * 0.29) % 0.6)).toFixed(2)}`
      ].join(';');
      return `<span class="kk-petal" style="${style}"></span>`;
    }).join('');

    return `
      <div class="modal-backdrop kk-backdrop ${extraClass}">
        <svg class="kk-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <filter id="kk-ink-bleed" x="-20%" y="-30%" width="140%" height="160%">
            <!-- Chỉ quầng mực loang mềm, không dùng feDisplacementMap (làm chữ bị răng cưa) -->
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.45 0" result="halo" />
            <feMerge><feMergeNode in="halo" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </svg>
        <div class="kk-scroll" role="dialog" aria-label="${ariaLabel}">
          <div class="kk-roller is-left" aria-hidden="true"></div>
          <div class="kk-sheet">
            <div class="kk-paper" aria-hidden="true"></div>
            <div class="kk-decor-branch" aria-hidden="true"></div>
            <div class="kk-decor-ink" aria-hidden="true"></div>
            <div class="kk-petals" aria-hidden="true">${petalsHtml}</div>
            <div class="kk-content">${contentHtml}</div>
            <div class="kk-seal" aria-hidden="true"></div>
          </div>
          <div class="kk-roller is-right" aria-hidden="true"></div>
        </div>
      </div>
    `;
  }

  buildYakuLinesHTML(yakus, ptsLabel = (y) => `+${y.points} Điểm`) {
    return `
      <div class="kk-yaku-list">
        ${yakus
          .map(
            (y, i) => `
          <div class="kk-yaku-line" style="--j:${i}">
            <span class="kk-yaku-name">${y.viName} <small>${y.jpName}</small></span>
            <span class="kk-yaku-pts">${ptsLabel(y)}</span>
          </div>`
          )
          .join('')}
      </div>`;
  }

  buildKoiKoiDecisionModalHTML() {
    const evalRes =
      this.engine.pendingYakuEvaluation ||
      evaluateCapturedYaku(this.engine.playerCaptured, this.engine.currentRound);
    const isDouble7 = evalRes.totalBasePoints >= 7;
    const isCounterKoi = this.engine.aiCalledKoiKoi;
    const mult = (isDouble7 ? 2 : 1) * (isCounterKoi ? 2 : 1);
    const totalNow = evalRes.totalBasePoints * mult;

    return this.buildScrollModalHTML({
      ariaLabel: 'Quyết Định Định Mệnh',
      contentHtml: `
        <h2 class="kk-title">Quyết Định Định Mệnh</h2>
        ${this.buildYakuLinesHTML(evalRes.yakus)}
        <div class="kk-divider" aria-hidden="true"></div>
        <div class="kk-total">
          Tổng Điểm Nếu Dừng (Shōbu): <strong>${totalNow} Điểm</strong>${mult > 1 ? ` <em>(Nhân ×${mult}!)</em>` : ''}
        </div>
        <div class="kk-actions">
          <button class="kk-stroke-btn is-indigo" id="btn-choose-shobu">
            <span class="kk-btn-main">SHŌBU! <span lang="ja">(勝負)</span></span>
            <span class="kk-btn-sub">Dừng &amp; Ăn ${totalNow} Điểm</span>
          </button>
          <button class="kk-stroke-btn is-vermilion is-glow" id="btn-choose-koikoi">
            <span class="kk-btn-main">KOI-KOI! <span lang="ja">(こいこい)</span></span>
            <span class="kk-btn-sub">Cược Tiếp Săn Điểm Lớn</span>
          </button>
        </div>`
    });
  }

  bindKoiKoiDecisionEvents(root) {
    root.querySelector('#btn-choose-shobu').onclick = () => {
      const outcome = this.engine.declareShobu('player');
      this.handleRoundFinished(outcome);
    };
    root.querySelector('#btn-choose-koikoi').onclick = () => {
      this.currentDialogue = this.pickRandom(
        this.currentOpponent.dialogues.playerCallKoiKoi
      );
      this.engine.declareKoiKoi('player');
      this.triggerAnimeCutin(
        'KỲ THỦ (BẠN)',
        this.currentOpponent.avatar,
        'KOI-KOI! (こいこい)',
        'Bạn tuyên bố tiếp tục ván bài để săn tổ hợp lớn!'
      );
      if (this.isMultiplayerMatch()) {
        const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
        multiplayerService.syncRoomState(canonical, { type: 'CALL_KOIKOI' });
        this.pendingMpMoveAction = null;
        this.renderAll();
        return;
      }
      this.renderAll();
      if (this.engine.phase === 'AI_TURN') {
        this.scheduleAiTurn();
      }
    };
  }

  buildRoundEndModalHTML() {
    const s = this.lastRoundSummary;
    if (!s) return '';

    const oppDisplayName = this.getOpponentDisplayName();
    const oppShortName = oppDisplayName.split(' ')[0];
    const isMatchEnd = s.isMatchComplete;
    const playerWonMatch = this.engine.playerScore > this.engine.aiScore;
    const monthOf = (round) => ((round - 1) % 12) + 1;
    const nextMonthInfo = getMonthInfo(monthOf(s.round + 1));
    const nextMonthLabel = nextMonthInfo
      ? nextMonthInfo.viName.replace(' - ', ' · ')
      : `Tháng ${monthOf(s.round + 1)}`;

    const headline =
      s.winner === 'player'
        ? 'Bạn thắng'
        : s.winner === 'ai'
        ? `${oppDisplayName} thắng`
        : 'Hòa <small lang="ja">(引き分け)</small>';

    const yakuHtml =
      s.yakus && s.yakus.length > 0
        ? `${this.buildYakuLinesHTML(s.yakus)}
          ${
            s.multiplier > 1
              ? `<div class="kk-note">Hệ số nhân ×${s.multiplier}: ${(s.multiplierReasons || []).join(' + ')} · Tổng <strong>+${s.finalPoints} Điểm</strong></div>`
              : ''
          }`
        : `<div class="kk-note">Cả hai bên đã đánh hết bài mà không ai gọi Shōbu.</div>`;

    const unlockHtml =
      this.newlyUnlockedItems.length > 0
        ? `<div class="kk-unlock">
            <div class="kk-unlock-title">🎁 Mở khóa vật phẩm độc quyền!</div>
            ${this.newlyUnlockedItems
              .map((item) => `<div>✨ ${item.type}: <strong>${item.name}</strong></div>`)
              .join('')}
          </div>`
        : '';

    const actionsHtml = isMatchEnd
      ? `<div class="kk-match-result ${playerWonMatch ? 'is-win' : 'is-lose'}">
          ${
            playerWonMatch
              ? `👑 Chúc mừng! Bạn đã chiến thắng ${oppDisplayName} chung cuộc!`
              : `🌸 ${oppDisplayName} giành chiến thắng chung cuộc sau ${s.totalRounds} tháng. Hãy tái đấu nhé!`
          }
        </div>
        <div class="kk-actions">
          <button class="kk-stroke-btn is-vermilion is-glow" id="btn-play-again">
            <span class="kk-btn-main">Tái Đấu</span>
            <span class="kk-btn-sub">Đấu lại với ${oppShortName}</span>
          </button>
          <button class="kk-stroke-btn is-indigo" id="btn-pick-new-opp">
            <span class="kk-btn-main">Đổi Đối Thủ</span>
            <span class="kk-btn-sub">Chọn chế độ / đối thủ khác</span>
          </button>
        </div>`
      : `<div class="kk-actions is-single">
          <button class="kk-stroke-btn is-vermilion is-glow" id="btn-next-round">
            <span class="kk-btn-main">Sang ${nextMonthLabel}</span>
          </button>
        </div>`;

    return this.buildScrollModalHTML({
      ariaLabel: `Tháng ${monthOf(s.round)} – ${headline}`,
      extraClass: 'is-round-end',
      contentHtml: `
        <div class="kk-kicker">Tháng ${monthOf(s.round)}</div>
        <h2 class="kk-title">${headline}</h2>
        ${yakuHtml}
        <div class="kk-divider" aria-hidden="true"></div>
        <div class="kk-scores">
          <div class="kk-score">
            <span class="kk-score-label">Tổng Điểm Bạn</span>
            <span class="kk-score-num">${this.engine.playerScore}</span>
          </div>
          <span class="kk-score-vs" aria-hidden="true">—</span>
          <div class="kk-score">
            <span class="kk-score-label">Tổng Điểm ${oppShortName}</span>
            <span class="kk-score-num">${this.engine.aiScore}</span>
          </div>
        </div>
        <div class="kk-reward">
          🪙 Thưởng Hiệp Đấu: <strong>+${s.earnedRoundCoins || 25} Xu Hoa</strong>
          ${s.matchBonusCoins ? ` · 🏆 Thưởng Chung Cuộc: <strong>+${s.matchBonusCoins} Xu Hoa</strong>` : ''}
        </div>
        ${unlockHtml}
        ${actionsHtml}`
    });
  }

  bindRoundEndEvents(root) {
    const nextBtn = root.querySelector('#btn-next-round');
    if (nextBtn) {
      nextBtn.onclick = () => {
        this.activeModal = null;
        this.engine.nextRound();
        if (this.isMultiplayerMatch()) {
          const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
          multiplayerService.syncRoomState(canonical, { type: 'NEXT_ROUND' });
          this.renderAll();
          return;
        }
        this.renderAll();
        if (this.engine.phase === 'AI_TURN') {
          this.scheduleAiTurn();
        }
      };
    }
    const againBtn = root.querySelector('#btn-play-again');
    if (againBtn) {
      againBtn.onclick = () => {
        if (this.isMultiplayerMatch()) {
          this.activeModal = null;
          this.rollNewTableFlowerMonth();
          this.engine.startNewMatch(this.engine.totalRounds);
          const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
          multiplayerService.syncRoomState(canonical, { type: 'REMATCH' });
          this.renderAll();
        } else {
          this.startMatchWithOpponent(this.currentOpponent.id, this.engine.totalRounds);
        }
      };
    }
    const newOppBtn = root.querySelector('#btn-pick-new-opp');
    if (newOppBtn) {
      newOppBtn.onclick = () => {
        this.activeModal = 'opponents';
        this.renderActiveModal();
      };
    }
  }

  // ==========================================================================
  // MODAL: PVP ONLINE MATCHMAKING (GHÉP TRẬN NGƯỜI THẬT)
  // ==========================================================================

  buildPvpLobbyModalHTML() {
    const isSearching = multiplayerService.roomStatus === 'searching';
    const isPlaying =
      this.gameMode === 'pvp' && multiplayerService.roomStatus === 'playing';

    return `
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window" style="width:min(860px, calc(95 * var(--avw, 1vw)));">
          <div class="modal-header">
            <h2>⚔️ Ghép Trận Người Thật Trực Tuyến (PvP Online)</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="arena-hero-banner">
              <img src="./public/assets/pvp_arena_banner.webp?v=2" alt="PvP Online Banner" />
              <div class="arena-hero-overlay">
                <h3>⚔️ Đấu Trường Hoa Bài Trực Tuyến (PvP Online)</h3>
                <p>Hệ thống tự động ghép cặp 2 người chơi đang tìm trận theo thời gian thực qua Server Database & kênh đồng bộ đa Tab tốc độ cao.</p>
              </div>
            </div>

            <div class="mp-panel-card" style="text-align:center; align-items:center;">
              <div style="width:100%; max-width:440px; text-align:left;">
                <label style="font-size:12px; font-weight:800; display:block; margin-bottom:5px;">
                  👤 Tên Kỳ Thủ Của Bạn Ở Tab Này:
                </label>
                <input type="text" class="mp-input" id="input-pvp-name" value="${multiplayerService.playerName}" placeholder="Nhập tên hiển thị..." />
              </div>

              ${
                isPlaying
                  ? `
                <div class="room-code-showcase" style="width:100%; max-width:540px;">
                  <div style="font-size:13px; font-weight:800; color:var(--jade);">
                    🟢 ĐANG ĐẤU TRỰC TIẾP VỚI: ${multiplayerService.opponentName}
                  </div>
                  <div class="room-code-digits">#${multiplayerService.roomCode}</div>
                  <p style="font-size:12.5px; color:var(--text-muted);">
                    Bạn đang ở trong trận PvP trực tuyến. Đóng cửa sổ này để tiếp tục đánh bài!
                  </p>
                </div>
              `
                  : isSearching
                  ? `
                <div class="room-code-showcase" style="width:100%; max-width:580px;">
                  <div style="font-size:16px; font-weight:900; color:#c91e29; margin-bottom:6px;">
                    🔍 Đang tìm kiếm đối thủ trực tuyến...
                  </div>
                  <p style="font-size:12.5px; color:var(--text-muted); line-height:1.5; margin-bottom:12px;">
                    Hãy mở thêm <strong>1 Tab trình duyệt nữa</strong> và bấm <strong>Ghép Trận (PvP)</strong>, hoặc bấm nút <strong>Mở Tab Thứ 2 Ghép Trận Ngay</strong> bên dưới để 2 tab tự động bắt cặp!
                  </p>
                  <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button class="decision-big-btn shobu" id="btn-open-tab2-pvp" style="padding:10px 18px; font-size:13px;">
                      🗗 Mở Tab Thứ 2 & Tự Động Ghép Trận Ngay
                    </button>
                    <button class="nav-btn" id="btn-cancel-pvp" style="padding:10px 18px;">
                      ✕ Hủy Tìm Trận
                    </button>
                  </div>
                </div>
              `
                  : `
                <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:6px;">
                  <button class="decision-big-btn koikoi" id="btn-start-pvp" style="min-width:250px;">
                    ⚔️ Bắt Đầu Tìm Đối Thủ (PvP)<br/>
                    <span style="font-size:11.5px; font-weight:600;">Ghép trận tự động trực tuyến</span>
                  </button>
                  <button class="decision-big-btn shobu" id="btn-start-and-open-tab2" style="min-width:250px;">
                    🗗 Tìm Trận & Mở Luôn Tab 2<br/>
                    <span style="font-size:11.5px; font-weight:600;">Tiện lợi để test 2 Tab đối kháng</span>
                  </button>
                </div>
              `
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindPvpLobbyModalEvents(root) {
    root.querySelector('#btn-close-modal').onclick = () => {
      this.activeModal = null;
      this.renderActiveModal();
    };
    root.querySelector('#modal-backdrop-close').onclick = (e) => {
      if (e.target !== e.currentTarget) return;
      this.activeModal = null;
      this.renderActiveModal();
    };

    const nameInput = root.querySelector('#input-pvp-name');
    if (nameInput) {
      nameInput.onchange = () => {
        multiplayerService.setPlayerName(nameInput.value);
      };
    }

    const startBtn = root.querySelector('#btn-start-pvp');
    if (startBtn) {
      startBtn.onclick = async () => {
        if (nameInput) multiplayerService.setPlayerName(nameInput.value);
        this.gameMode = 'pvp';
        await multiplayerService.startMatchmaking();
        this.renderAll();
      };
    }

    const startAndOpenBtn = root.querySelector('#btn-start-and-open-tab2');
    if (startAndOpenBtn) {
      startAndOpenBtn.onclick = async () => {
        if (nameInput) multiplayerService.setPlayerName(nameInput.value);
        this.gameMode = 'pvp';
        await multiplayerService.startMatchmaking();
        this.renderAll();
        const url = `${window.location.pathname}?autoPvp=1`;
        window.open(url, '_blank');
      };
    }

    const openTab2Btn = root.querySelector('#btn-open-tab2-pvp');
    if (openTab2Btn) {
      openTab2Btn.onclick = () => {
        const url = `${window.location.pathname}?autoPvp=1`;
        window.open(url, '_blank');
      };
    }

    const cancelBtn = root.querySelector('#btn-cancel-pvp');
    if (cancelBtn) {
      cancelBtn.onclick = async () => {
        await multiplayerService.cancelMatchmaking();
        this.renderAll();
      };
    }
  }

  // ==========================================================================
  // MODAL: CUSTOM ROOM WITH CODE (TẠO PHÒNG MÃ SỐ ĐỂ MỞ 2 TAB CHƠI THỬ)
  // ==========================================================================

  buildCustomRoomModalHTML() {
    const waitingRoomCode =
      multiplayerService.roomCode && multiplayerService.roomStatus !== 'idle'
        ? multiplayerService.roomCode
        : null;
    const localRooms = Object.values(multiplayerService.readLocalRooms()).filter(
      (r) => r && r.roomCode && r.status === 'waiting'
    );

    return `
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window" style="width:min(920px, calc(95 * var(--avw, 1vw)));">
          <div class="modal-header">
            <h2>🏯 Tạo Phòng Mã Số & Vào Phòng (Mở 2 Tab Chơi Thử)</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="arena-hero-banner">
              <img src="./public/assets/pvp_arena_banner.webp?v=2" alt="Custom Room Banner" />
              <div class="arena-hero-overlay">
                <h3>🏯 Phòng Trà Đạo Mã Số (Custom Room 2 Tab)</h3>
                <p>Tạo mã phòng riêng ở Tab 1 rồi nhập mã số đó ở Tab 2 (hoặc bấm nút Mở Tab 2 tự động vào phòng) để chơi thử 2 người trực tiếp!</p>
              </div>
            </div>

            ${
              this.customRoomError
                ? `<div style="background:#ffe3e8; border:2px solid #d62839; color:#8f1822; padding:10px 14px; border-radius:12px; font-weight:800; font-size:13px; margin-bottom:12px;">
                     ⚠️ ${this.customRoomError}
                   </div>`
                : ''
            }

            <div class="mp-split-grid">
              <!-- Column 1: Create Room (Tab 1 - Host) -->
              <div class="mp-panel-card">
                <div style="font-size:12px; font-weight:800; color:#b52b2f;">
                  CHỦ PHÒNG (TAB 1)
                </div>
                <h3 style="font-size:18px; color:#8f1822;">🏯 Tạo Phòng Mã Số Mới</h3>
                <p style="font-size:12.5px; color:var(--text-muted); line-height:1.45;">
                  Đặt mã phòng tùy ý (VD: <strong>6868</strong>) hoặc để trống để hệ thống tự sinh mã 4 chữ số.
                </p>

                <div>
                  <label style="font-size:11.5px; font-weight:800; display:block; margin-bottom:4px;">Tên của bạn:</label>
                  <input type="text" class="mp-input" id="input-host-name" value="${multiplayerService.playerName}" style="margin-bottom:8px;" />
                  <label style="font-size:11.5px; font-weight:800; display:block; margin-bottom:4px;">Mã số phòng muốn tạo (Tùy chọn):</label>
                  <input type="text" class="mp-input" id="input-create-code" placeholder="VD: 6868 (Để trống = Tự tạo mã)" maxlength="8" />
                </div>

                <button class="decision-big-btn koikoi" id="btn-create-room" style="width:100%;">
                  🏯 Tạo Phòng Mã Số Ngay
                </button>

                ${
                  waitingRoomCode
                    ? `
                  <div class="room-code-showcase">
                    <div style="font-size:12px; font-weight:800; color:#b52b2f;">
                      ${multiplayerService.roomStatus === 'playing' ? '🟢 ĐANG TRONG TRẬN ĐẤU' : '⏳ ĐANG CHỜ NGƯỜI CHƠI THỨ 2 VÀO PHÒNG'}
                    </div>
                    <div class="room-code-digits">${waitingRoomCode}</div>
                    <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
                      Hãy mở Tab 2 và nhập mã <strong>${waitingRoomCode}</strong> ở khung bên phải, hoặc bấm nút dưới đây:
                    </p>
                    <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
                      <button class="nav-btn primary-gold" id="btn-open-tab2-room" style="justify-content:center;">
                        🗗 Mở Tab 2 & Vào Thẳng Phòng #${waitingRoomCode}
                      </button>
                      <button class="nav-btn" id="btn-copy-room-code" style="justify-content:center;">
                        📋 Sao Chép Mã
                      </button>
                    </div>
                  </div>
                `
                    : ''
                }
              </div>

              <!-- Column 2: Join Room by Code (Tab 2 - Guest) -->
              <div class="mp-panel-card">
                <div style="font-size:12px; font-weight:800; color:var(--jade);">
                  KHÁCH THÁCH ĐẤU (TAB 2)
                </div>
                <h3 style="font-size:18px; color:#8f1822;">🚪 Nhập Mã Số Để Vào Phòng</h3>
                <p style="font-size:12.5px; color:var(--text-muted); line-height:1.45;">
                  Nhập mã số phòng đã tạo ở Tab 1 để kết nối 2 Tab và bắt đầu ván bài Hoa đối kháng thời gian thực!
                </p>

                <div>
                  <label style="font-size:11.5px; font-weight:800; display:block; margin-bottom:4px;">Nhập Mã Số Phòng:</label>
                  <input type="text" class="mp-input" id="input-join-code" placeholder="Nhập mã phòng (VD: 6868)..." maxlength="8" style="font-size:18px; text-align:center; letter-spacing:3px;" />
                </div>

                <button class="decision-big-btn shobu" id="btn-join-room" style="width:100%;">
                  🚪 Vào Phòng Bằng Mã Số
                </button>

                ${
                  localRooms.length > 0
                    ? `
                  <div style="margin-top:6px; padding-top:10px; border-top:1px dashed var(--hinoki-border);">
                    <div style="font-size:12px; font-weight:800; margin-bottom:6px;">
                      ⚡ Phòng đang mở trên máy của bạn (Bấm để vào ngay):
                    </div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                      ${localRooms
                        .map(
                          (r) => `
                        <button class="nav-btn primary-gold" data-quick-join="${r.roomCode}">
                          🚪 Vào Phòng #${r.roomCode} (${r.hostName || 'Chủ phòng'})
                        </button>
                      `
                        )
                        .join('')}
                    </div>
                  </div>
                `
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindCustomRoomModalEvents(root) {
    root.querySelector('#btn-close-modal').onclick = () => {
      this.activeModal = null;
      this.renderActiveModal();
    };
    root.querySelector('#modal-backdrop-close').onclick = (e) => {
      if (e.target !== e.currentTarget) return;
      this.activeModal = null;
      this.renderActiveModal();
    };

    const hostNameInput = root.querySelector('#input-host-name');
    const createCodeInput = root.querySelector('#input-create-code');
    const joinCodeInput = root.querySelector('#input-join-code');

    root.querySelector('#btn-create-room').onclick = async () => {
      if (hostNameInput) multiplayerService.setPlayerName(hostNameInput.value);
      this.customRoomError = '';
      this.gameMode = 'custom';
      this.engine.startNewMatch(this.saveData.matchRounds || 3);
      const initialCanonical = this.engine.exportCanonicalState('host', null);
      await multiplayerService.createCustomRoom(
        createCodeInput?.value || '',
        initialCanonical
      );
      soundEngine.playCardSnap(true);
      this.renderAll();
    };

    root.querySelector('#btn-join-room').onclick = async () => {
      if (hostNameInput) multiplayerService.setPlayerName(hostNameInput.value);
      const code = joinCodeInput?.value || '';
      const res = await multiplayerService.joinCustomRoom(code);
      if (res.error) {
        this.customRoomError = res.error;
        this.renderActiveModal();
      } else {
        this.customRoomError = '';
      }
    };

    root.querySelectorAll('[data-quick-join]').forEach((btn) => {
      btn.onclick = async () => {
        const code = btn.getAttribute('data-quick-join');
        const res = await multiplayerService.joinCustomRoom(code);
        if (res.error) {
          this.customRoomError = res.error;
          this.renderActiveModal();
        }
      };
    });

    const openTab2Btn = root.querySelector('#btn-open-tab2-room');
    if (openTab2Btn && multiplayerService.roomCode) {
      openTab2Btn.onclick = () => {
        const url = `${window.location.pathname}?joinRoom=${encodeURIComponent(multiplayerService.roomCode)}`;
        window.open(url, '_blank');
      };
    }

    const copyBtn = root.querySelector('#btn-copy-room-code');
    if (copyBtn && multiplayerService.roomCode) {
      copyBtn.onclick = () => {
        navigator.clipboard?.writeText(multiplayerService.roomCode).catch(() => {});
        copyBtn.textContent = '✅ Đã Sao Chép!';
      };
    }
  }

  // ==========================================================================
  // MODAL: DATABASE HEALTH CHECK (/health)
  // ==========================================================================

  buildDbHealthModalHTML() {
    const rep = this.healthReport;
    const dbs = rep?.databases || {};
    const jf = rep?.jsonFallback || {
      enabled: true,
      filePath: 'data/local_db.json',
      roomsCount: 0,
      matchesSaved: 0
    };

    const renderCard = (key, icon, fallbackTitle, envName) => {
      const info = dbs[key] || {
        name: fallbackTitle,
        envVar: envName,
        connected: false,
        detail: `Chưa đặt ${envName} — Tự động lưu tạm vào file JSON (data/local_db.json)`
      };
      const isConn = Boolean(info.connected);
      return `
        <div class="db-health-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:14px;">${icon} ${info.name}</strong>
            <span style="padding:2px 8px; border-radius:99px; font-size:10px; font-weight:800; color:#fff; background:${isConn ? '#1b8a5a' : '#d98218'};">
              ${isConn ? 'ĐÃ KẾT NỐI' : 'JSON FALLBACK'}
            </span>
          </div>
          <div style="font-size:11.5px; color:var(--text-muted);">
            Biến môi trường: <code>${info.envVar}</code>
          </div>
          <div style="font-size:12px; line-height:1.4;">
            ${info.detail}
          </div>
        </div>
      `;
    };

    return `
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window" style="width:min(900px, calc(95 * var(--avw, 1vw)));">
          <div class="modal-header">
            <h2>🩺 Kiểm Tra Kết Nối Database & JSON Fallback (/health)</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div style="background:rgba(27,138,90,0.12); border:2px solid #1b8a5a; border-radius:14px; padding:12px 16px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div>
                <div style="font-size:12px; font-weight:900; color:var(--jade);">
                  ● HTTP 200 OK — HỆ THỐNG LƯU TRỮ HOẠT ĐỘNG AN TOÀN
                </div>
                <div style="font-size:13px; margin-top:3px;">
                  Chế độ hiện tại: <strong><code>${rep?.activeStorageMode || 'local_json_fallback'}</code></strong> —
                  File JSON dự phòng: <strong><code>${jf.filePath}</code></strong>
                </div>
              </div>
              <div style="display:flex; gap:8px;">
                <a href="/health" target="_blank" class="nav-btn primary-gold" style="text-decoration:none;">
                  🌐 Mở Trang /health Đầy Đủ
                </a>
                <a href="/health?format=json" target="_blank" class="nav-btn" style="text-decoration:none;">
                  📄 Xem Raw JSON
                </a>
              </div>
            </div>

            <div class="db-health-grid">
              ${renderCard('redis', '⚡', 'Redis', 'REDIS_URL')}
              ${renderCard('mongodb', '🍃', 'MongoDB', 'MONGO_URL')}
              ${renderCard('postgresql', '🐘', 'PostgreSQL', 'POSTGRES_URL')}
              ${renderCard('mysql', '🐬', 'MySQL', 'MYSQL_URL')}
            </div>

            <div style="font-size:12.5px; font-weight:800; margin-bottom:6px;">
              📦 Phản hồi trực tiếp từ Endpoint <code>/health</code>:
            </div>
            <pre style="background:#171124; color:#9ef0c0; padding:14px; border-radius:12px; font-size:12px; overflow-x:auto; max-height:240px;">${
              rep ? JSON.stringify(rep, null, 2) : 'Đang kiểm tra kết nối...'
            }</pre>
          </div>
        </div>
      </div>
    `;
  }

  bindDbHealthModalEvents(root) {
    root.querySelector('#btn-close-modal').onclick = () => {
      this.activeModal = null;
      this.renderActiveModal();
    };
    root.querySelector('#modal-backdrop-close').onclick = (e) => {
      if (e.target !== e.currentTarget) return;
      this.activeModal = null;
      this.renderActiveModal();
    };
  }

  // ==========================================================================
  // MODAL: ANIME OPPONENT SELECTOR
  // ==========================================================================

  buildOpponentsModalHTML() {
    return `
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window">
          <div class="modal-header">
            <h2>🌸 Đài Khiêu Chiến 12 Kỳ Thủ Điển Tích Nhật Bản (12 Tháng Bài Hoa)</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
              <p style="font-size:13px; color:var(--text-muted);">
                Chinh phục trọn bộ <strong>12 Nhân Vật Điển Tích Ukiyo-e × Anime</strong> đại diện cho 12 Tháng Bài Hoa (gồm cả <strong>Công Chúa Tsunade</strong> Tháng 7)!
              </p>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:12.5px; color:#9e1f28; font-weight:800;">Độ dài trận đấu:</span>
                ${[3, 6, 12]
                  .map(
                    (r) => `
                  <button class="tab-btn ${this.engine.totalRounds === r ? 'active' : ''}" data-round-len="${r}">
                    ${r} Tháng
                  </button>
                `
                  )
                  .join('')}
              </div>
            </div>

            <div class="opponents-select-grid">
              ${ANIME_OPPONENTS.map((opp) => {
                const defeated = this.saveData.defeatedOpponents.includes(opp.id);
                const backReward = opp.unlocksCardBack
                  ? getCardBackById(opp.unlocksCardBack)?.name
                  : '';
                const skinReward = opp.unlocksCardSkin
                  ? getCardSkinById(opp.unlocksCardSkin)?.name
                  : '';

                return `
                  <div class="opponent-select-card" style="border-color:${this.currentOpponent.id === opp.id ? opp.themeColor : '#dfba92'}">
                    <div class="opp-card-banner">
                      <img src="${opp.avatar}" alt="${opp.name}" />
                      <div style="position:absolute; top:10px; left:10px; background:rgba(255,248,237,0.95); border:1.5px solid #c97a40; padding:3px 9px; border-radius:99px; font-size:11px; color:#9e1f28; font-weight:800;">
                        ${opp.monthLabel || `Tháng ${opp.month || 1}`} ・ ${opp.difficultyLabel}
                      </div>
                      <div style="position:absolute; top:10px; right:10px; background:${defeated ? '#1b8a5a' : 'rgba(255,248,237,0.92)'}; color:${defeated ? '#fff' : '#5a2716'}; border:1.5px solid #c97a40; padding:3px 9px; border-radius:99px; font-size:11px; font-weight:800;">
                        ${defeated ? `✅ ${opp.gender} (${opp.age}t)` : `${opp.gender} ・ ${opp.age} tuổi`}
                      </div>
                    </div>
                    <div class="opp-card-body">
                      <div>
                        <span style="font-size:11px; color:#b87314; font-weight:700;">${opp.jpName}</span>
                        <h3 style="font-size:17px; color:#8f1822; font-family:var(--font-display);">${opp.name}</h3>
                      </div>
                      <p style="font-size:12px; color:var(--text-muted); line-height:1.4; flex:1;">
                        ${opp.bio}
                      </p>
                      <div style="background:#fff4e2; border:1px solid #e2be98; border-radius:10px; padding:7px 9px; font-size:11px; color:#6b3b25;">
                        🎁 <strong>Thưởng thắng:</strong> +${opp.rewardCoins} Xu
                        ${backReward ? `<br/>🎴 Mặt lưng: <em>${backReward}</em>` : ''}
                        ${skinReward ? `<br/>🎨 Mặt bài: <em>${skinReward}</em>` : ''}
                      </div>
                      <button class="nav-btn primary-gold" data-challenge-opp="${opp.id}" style="width:100%; justify-content:center; margin-top:4px;">
                        🌸 Khiêu Chiến ${opp.name}
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindOpponentsModalEvents(root) {
    root.querySelector('#btn-close-modal').onclick = () => {
      this.activeModal = null;
      this.renderActiveModal();
    };
    root.querySelector('#modal-backdrop-close').onclick = (e) => {
      if (e.target !== e.currentTarget) return;
      this.activeModal = null;
      this.renderActiveModal();
    };
    root.querySelectorAll('[data-round-len]').forEach((btn) => {
      btn.onclick = () => {
        const len = Number(btn.getAttribute('data-round-len'));
        this.engine.totalRounds = len;
        this.saveData.matchRounds = len;
        this.persistSave();
        this.renderActiveModal();
      };
    });
    root.querySelectorAll('[data-challenge-opp]').forEach((btn) => {
      btn.onclick = () => {
        const oppId = btn.getAttribute('data-challenge-opp');
        this.startMatchWithOpponent(oppId, this.saveData.matchRounds || 3);
      };
    });
  }

  // ==========================================================================
  // MODAL: COLLECTION (10 CARD BACKS, 6 CARD FACE SKINS, 3D 48-CARD COMPENDIUM)
  // ==========================================================================

  buildCollectionModalHTML() {
    let tabContent = '';

    if (this.collectionTab === 'backs') {
      tabContent = `
        <div class="collection-grid">
          ${CARD_BACKS.map((back) => {
            const unlocked = this.saveData.unlockedBacks.includes(back.id);
            const equipped = this.saveData.equippedBack === back.id;
            const rarity = RARITY_CONFIG[back.rarity];
            const boss = back.bossUnlockId ? getOpponentById(back.bossUnlockId) : null;

            return `
              <div class="collectible-item-card ${equipped ? 'equipped' : ''}">
                <span class="rarity-tag" style="background:#fff4e2; color:#9e1f28; border:1.5px solid #d49556;">
                  ${rarity.label}
                </span>
                <div class="preview-card-holder">
                  ${renderCardBackSVG(back.id)}
                </div>
                <div>
                  <h4 style="font-size:14px; color:#8f1822;">${back.name}</h4>
                  <span style="font-size:11px; color:#b87314; font-weight:700;">${back.jpName}</span>
                </div>
                <p style="font-size:11.5px; color:var(--text-muted); line-height:1.35; flex:1;">
                  ${back.description}
                </p>
                ${
                  unlocked
                    ? `<button class="nav-btn ${equipped ? 'is-equipped' : 'primary-gold'}" data-equip-back="${back.id}" style="width:100%; justify-content:center;">
                        ${equipped ? '✅ Đang Trang Bị' : '🎴 Trang Bị Mặt Lưng'}
                       </button>`
                    : `<div style="font-size:11px; color:var(--sakura); font-weight:700;">
                        ${boss ? `Đánh bại <strong>${boss.name}</strong> hoặc Mua:` : 'Mở tại Tiệm / Gacha:'}
                       </div>
                       <button class="nav-btn" data-buy-back="${back.id}" style="width:100%; justify-content:center;">
                         🪙 Mua Ngay (${back.price} Xu)
                       </button>`
                }
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (this.collectionTab === 'skins') {
      const sampleCard = getCardById(1); // Tùng Hạc 20pt sample
      const sampleCard2 = getCardById(9); // Màn Anh Đào 20pt sample

      tabContent = `
        <div class="collection-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
          ${CARD_SKINS.map((skin) => {
            const unlocked = this.saveData.unlockedSkins.includes(skin.id);
            const equipped = this.saveData.equippedSkin === skin.id;
            const rarity = RARITY_CONFIG[skin.rarity];
            const boss = skin.bossUnlockId ? getOpponentById(skin.bossUnlockId) : null;

            return `
              <div class="collectible-item-card ${equipped ? 'equipped' : ''}">
                <span class="rarity-tag" style="background:#fff4e2; color:#9e1f28; border:1.5px solid #d49556;">
                  ${rarity.label}
                </span>
                <div style="display:flex; gap:10px;">
                  <div class="preview-card-holder" style="width:82px; height:126px;">
                    ${renderCardFaceSVG(sampleCard, skin.id, true)}
                  </div>
                  <div class="preview-card-holder" style="width:82px; height:126px;">
                    ${renderCardFaceSVG(sampleCard2, skin.id, true)}
                  </div>
                </div>
                <div>
                  <h4 style="font-size:15px; color:#8f1822;">${skin.name}</h4>
                  <span style="font-size:11px; color:#b87314; font-weight:700;">${skin.jpName}</span>
                </div>
                <p style="font-size:11.5px; color:var(--text-muted); line-height:1.38; flex:1;">
                  ${skin.description}
                </p>
                ${
                  unlocked
                    ? `<button class="nav-btn ${equipped ? 'is-equipped' : 'primary-gold'}" data-equip-skin="${skin.id}" style="width:100%; justify-content:center;">
                        ${equipped ? '✅ Đang Sử Dụng' : '🎨 Áp Dụng Cho 48 Lá Bài'}
                       </button>`
                    : `<div style="font-size:11px; color:var(--sakura); font-weight:700;">
                        ${boss ? `Đánh bại <strong>${boss.name}</strong> hoặc Mua:` : 'Mở khóa bằng Xu Hoa:'}
                       </div>
                       <button class="nav-btn" data-buy-skin="${skin.id}" style="width:100%; justify-content:center;">
                         🪙 Mua Ngay (${skin.price} Xu)
                       </button>`
                }
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      // 3D 48-Card Compendium Inspector
      const inspected = getCardById(this.inspectedCardId) || HANAFUDA_CARDS[0];

      tabContent = `
        <div class="compendium-layout">
          <!-- Left: Interactive 3D Flippable Card Inspector -->
          <div class="inspector-3d-stage">
            ${this.buildCompendiumInspectorHTML(inspected)}
          </div>

          <!-- Right: All 48 Cards Grid -->
          <div class="compendium-48-grid">
            ${HANAFUDA_CARDS.map(
              (c) => `
              <div class="hana-card-3d ${c.id === inspected.id ? 'field-choice-candidate' : ''}"
                   data-compendium-card="${c.id}"
                   style="width:74px; height:114px;"
                   title="#${c.id} ${c.viName}">
                ${renderCardFaceSVG(c, this.saveData.equippedSkin, true)}
              </div>
            `
            ).join('')}
          </div>
        </div>
      `;
    }

    return `
      <div class="modal-backdrop kk-backdrop" id="modal-backdrop-close">
        <div class="modal-window scroll-modal">
          <div class="modal-header">
            <h2>Bộ Sưu Tập <small>Mặt Lưng · Thiết Kế Bài · Phòng Trưng Bày 3D</small></h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="sm-toolbar">
              <div class="modal-tabs">
                <button class="tab-btn ${this.collectionTab === 'backs' ? 'active' : ''}" data-col-tab="backs">
                  🎴 Thiết Kế Mặt Lưng (${this.saveData.unlockedBacks.length}/${CARD_BACKS.length})
                </button>
                <button class="tab-btn ${this.collectionTab === 'skins' ? 'active' : ''}" data-col-tab="skins">
                  🎨 Thiết Kế Mặt Bài (${this.saveData.unlockedSkins.length}/${CARD_SKINS.length})
                </button>
                <button class="tab-btn ${this.collectionTab === 'compendium' ? 'active' : ''}" data-col-tab="compendium">
                  🔍 Soi 3D 48 Lá Bài Hoa
                </button>
              </div>
              <div class="sm-wallet">
                <span class="sm-coins">🪙 ${this.saveData.coins.toLocaleString('vi-VN')} Xu Hoa</span>
                <button class="nav-btn" id="btn-unlock-all-demo" title="Nhận 2000 Xu Hoa để trải nghiệm mua sắm & Gacha">
                  🎁 +2,000 Xu Trải Nghiệm
                </button>
              </div>
            </div>

            ${tabContent}
          </div>
        </div>
      </div>
    `;
  }

  buildCompendiumInspectorHTML(inspected) {
    const mInfo = getMonthInfo(inspected.month);
    return `
      <div style="font-size:11px; color:#9e1f28; font-weight:800;">
        BẤM VÀO LÁ BÀI ĐỂ LẬT MẶT TRƯỚC / MẶT LƯNG 3D
      </div>
      <div class="inspector-flippable-card ${this.inspectorFlipped ? 'flipped' : ''}" id="inspector-3d-card">
        <div class="inspector-face front">
          ${renderCardFaceSVG(inspected, this.saveData.equippedSkin, true)}
        </div>
        <div class="inspector-face back">
          ${renderCardBackSVG(this.saveData.equippedBack)}
        </div>
      </div>
      <button class="nav-btn" id="btn-flip-inspector" style="justify-content:center;">
        🔄 Lật Xem Mặt Lưng / Mặt Bài
      </button>
      <div>
        <span style="font-size:12px; color:#b87314; font-weight:800;">${mInfo.viName} ・ ${inspected.kanji}</span>
        <h3 style="font-size:18px; color:#8f1822; margin:3px 0;">#${inspected.id}. ${inspected.viName}</h3>
        <span style="font-size:12px; color:var(--sakura); font-weight:800;">${inspected.jpName} (${inspected.points} Điểm)</span>
      </div>
      <p style="font-size:12.5px; color:var(--text-muted); line-height:1.45;">
        ${inspected.lore}
      </p>
      <div style="font-size:11.5px; color:#5a2716; background:#fff4e2; border:1px solid #e2be98; padding:8px; border-radius:10px; width:100%;">
        <strong>Ý nghĩa ${mInfo.flower}:</strong> ${mInfo.symbolism}
      </div>
    `;
  }

  bindCompendiumInspectorFlipEvents(root) {
    const flipCard = root.querySelector('#inspector-3d-card');
    const flipBtn = root.querySelector('#btn-flip-inspector');
    if (flipCard) {
      flipCard.onclick = () => {
        this.inspectorFlipped = !this.inspectorFlipped;
        soundEngine.playCardSnap(false);
        flipCard.classList.toggle('flipped', this.inspectorFlipped);
      };
    }
    if (flipBtn && flipCard) {
      flipBtn.onclick = () => {
        this.inspectorFlipped = !this.inspectorFlipped;
        soundEngine.playCardSnap(false);
        flipCard.classList.toggle('flipped', this.inspectorFlipped);
      };
    }
  }

  bindCollectionModalEvents(root) {
    root.querySelector('#btn-close-modal').onclick = () => {
      this.activeModal = null;
      this.renderActiveModal();
    };
    root.querySelector('#modal-backdrop-close').onclick = (e) => {
      if (e.target !== e.currentTarget) return;
      this.activeModal = null;
      this.renderActiveModal();
    };

    root.querySelectorAll('[data-col-tab]').forEach((btn) => {
      btn.onclick = () => {
        const nextTab = btn.getAttribute('data-col-tab');
        if (this.collectionTab === nextTab) return;
        this.collectionTab = nextTab;
        this.renderActiveModal();
      };
    });

    const bonusBtn = root.querySelector('#btn-unlock-all-demo');
    if (bonusBtn) {
      bonusBtn.onclick = () => {
        soundEngine.playGachaReveal(true);
        this.saveData.coins += 2000;
        this.persistSave();
        this.renderTopNav();
        this.renderActiveModal();
      };
    }

    // Equip Back
    root.querySelectorAll('[data-equip-back]').forEach((btn) => {
      btn.onclick = () => {
        this.saveData.equippedBack = btn.getAttribute('data-equip-back');
        soundEngine.playCardSnap(false);
        this.persistSave();
        this.renderCenterBoard();
        this.renderActiveModal();
      };
    });

    // Buy Back
    root.querySelectorAll('[data-buy-back]').forEach((btn) => {
      btn.onclick = () => {
        const backId = btn.getAttribute('data-buy-back');
        const back = getCardBackById(backId);
        if (this.saveData.coins < back.price) {
          alert(`Bạn cần ${back.price} Xu Hoa để mở khóa "${back.name}"! (Có thể bấm nút +2,000 Xu Trải Nghiệm hoặc thắng các ván bài)`);
          return;
        }
        this.saveData.coins -= back.price;
        this.saveData.unlockedBacks.push(back.id);
        this.saveData.equippedBack = back.id;
        soundEngine.playGachaReveal(true);
        this.persistSave();
        this.renderTopNav();
        this.renderCenterBoard();
        this.renderActiveModal();
      };
    });

    // Equip Skin
    root.querySelectorAll('[data-equip-skin]').forEach((btn) => {
      btn.onclick = () => {
        this.saveData.equippedSkin = btn.getAttribute('data-equip-skin');
        soundEngine.playCardSnap(true);
        this.persistSave();
        this.renderCenterBoard();
        this.renderRightPanel();
        this.renderActiveModal();
      };
    });

    // Buy Skin
    root.querySelectorAll('[data-buy-skin]').forEach((btn) => {
      btn.onclick = () => {
        const skinId = btn.getAttribute('data-buy-skin');
        const skin = getCardSkinById(skinId);
        if (this.saveData.coins < skin.price) {
          alert(`Bạn cần ${skin.price} Xu Hoa để mở khóa "${skin.name}"!`);
          return;
        }
        this.saveData.coins -= skin.price;
        this.saveData.unlockedSkins.push(skin.id);
        this.saveData.equippedSkin = skin.id;
        soundEngine.playGachaReveal(true);
        this.persistSave();
        this.renderTopNav();
        this.renderCenterBoard();
        this.renderRightPanel();
        this.renderActiveModal();
      };
    });

    // 3D Inspector flip & card selection
    this.bindCompendiumInspectorFlipEvents(root);

    root.querySelectorAll('[data-compendium-card]').forEach((el) => {
      el.onclick = () => {
        const nextId = Number(el.getAttribute('data-compendium-card'));
        if (this.inspectedCardId === nextId && !this.inspectorFlipped) return;
        this.inspectedCardId = nextId;
        this.inspectorFlipped = false;
        soundEngine.playCardHover();

        const stage = root.querySelector('.inspector-3d-stage');
        const inspected = getCardById(this.inspectedCardId) || HANAFUDA_CARDS[0];
        if (stage) {
          setElementMarkup(stage, this.buildCompendiumInspectorHTML(inspected));
          this.bindCompendiumInspectorFlipEvents(root);
        }
        root.querySelectorAll('[data-compendium-card]').forEach((cardEl) => {
          cardEl.classList.toggle(
            'field-choice-candidate',
            Number(cardEl.getAttribute('data-compendium-card')) === this.inspectedCardId
          );
        });
      };
    });
  }

  // ==========================================================================
  // MODAL: OMIKUJI GACHA SHRINE
  // ==========================================================================

  buildGachaModalHTML() {
    return `
      <div class="modal-backdrop kk-backdrop" id="modal-backdrop-close">
        <div class="modal-window scroll-modal is-gacha">
          <div class="modal-header">
            <h2>Điện Cầu May <small>Omikuji · Sưu tầm Mặt Lưng &amp; Bộ Bài Hiếm</small></h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="gacha-hero">
              <div class="kk-kicker">🌸 Ước nguyện đền hoa anh đào 🌸</div>
              <h3 class="gacha-title">Rút Quẻ Mở Hộp Sơn Mài Edo</h3>
              <p class="gacha-desc">
                Cơ hội trúng tất cả <strong>10 Thiết Kế Mặt Lưng</strong> và <strong>6 Bộ Mặt Bài Nghệ Thuật</strong> (bao gồm cả bậc Huyền Thoại SSR &amp; Thần Thoại UR!). Nếu rút trùng sẽ được hoàn trả <strong>+90 Xu Hoa Lộc</strong>!
              </p>

              <div class="kk-actions gacha-actions">
                <button class="kk-stroke-btn is-indigo gacha-btn is-tube-left" id="btn-gacha-1">
                  <img class="gacha-tube" src="./public/assets/koikoi_scroll/omikuji_1.webp" alt="" draggable="false" />
                  <span class="kk-btn-main">Rút 1 Quẻ Hoa</span>
                  <span class="kk-btn-sub">🪙 150 Xu Hoa</span>
                </button>
                <button class="kk-stroke-btn is-vermilion is-glow gacha-btn is-tube-right" id="btn-gacha-5">
                  <img class="gacha-tube" src="./public/assets/koikoi_scroll/omikuji_5.webp" alt="" draggable="false" />
                  <span class="kk-btn-main">Rút 5 Quẻ Liên Hoàn</span>
                  <span class="kk-btn-sub">🪙 650 Xu Hoa · Tiết kiệm 100 Xu</span>
                </button>
              </div>

              <div class="gacha-balance">
                Số dư hiện tại: <strong>🪙 ${this.saveData.coins.toLocaleString('vi-VN')} Xu Hoa</strong>
              </div>
            </div>

            ${
              this.gachaResults.length > 0
                ? `
              <div class="kk-divider sm-divider" aria-hidden="true"></div>
              <h4 class="gacha-results-title">🎉 Kết quả rút quẻ vừa rồi</h4>
              <div class="collection-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
                ${this.gachaResults
                  .map((r) => {
                    const rar = RARITY_CONFIG[r.item.rarity];
                    const sampleCard = getCardById(r.sampleCardId || 45) || HANAFUDA_CARDS[0];
                    return `
                    <div class="collectible-item-card ${r.isNew ? 'is-new' : ''}">
                      <span class="rarity-tag">${rar.label}</span>
                      <div class="preview-card-holder" style="width:78px; height:120px;">
                        ${
                          r.kind === 'back'
                            ? renderCardBackSVG(r.item.id)
                            : renderCardFaceSVG(sampleCard, r.item.id, true)
                        }
                      </div>
                      <div style="font-size:12.5px; font-weight:800; color:#8f1822;">${r.item.name}</div>
                      <div style="font-size:10.5px; color:#7a5533; font-weight:700;">
                        ${r.kind === 'back' ? 'Mặt Lưng Bài' : `Lá: ${sampleCard.viName}`}
                      </div>
                      <div style="font-size:11px; color:${r.isNew ? 'var(--jade)' : '#b87314'}; font-weight:800;">
                        ${r.isNew ? '✨ MỚI MỞ KHÓA!' : '🔄 Trùng (+90 Xu)'}
                      </div>
                    </div>
                  `;
                  })
                  .join('')}
              </div>
            `
                : ''
            }
          </div>
        </div>
      </div>
    `;
  }

  bindGachaModalEvents(root) {
    root.querySelector('#btn-close-modal').onclick = () => {
      this.activeModal = null;
      this.renderActiveModal();
    };
    root.querySelector('#modal-backdrop-close').onclick = (e) => {
      if (e.target !== e.currentTarget) return;
      this.activeModal = null;
      this.renderActiveModal();
    };

    const rollGacha = (count, cost) => {
      if (this.saveData.coins < cost) {
        alert(`Bạn cần ${cost} Xu Hoa để rút quẻ! Hãy đấu thêm ván bài hoặc nhận Xu Trải Nghiệm trong Bộ Sưu Tập nhé.`);
        return;
      }
      this.saveData.coins -= cost;

      // Build weighted pool of all collectible backs & skins (excluding default free ones)
      const pool = [
        ...CARD_BACKS.filter((b) => !b.unlockedByDefault).map((item) => ({
          kind: 'back',
          item,
          weight: RARITY_CONFIG[item.rarity].weight
        })),
        ...CARD_SKINS.filter((s) => !s.unlockedByDefault).map((item) => ({
          kind: 'skin',
          item,
          weight: RARITY_CONFIG[item.rarity].weight
        }))
      ];

      const totalWeight = pool.reduce((s, p) => s + p.weight, 0);
      const results = [];
      let hasHigh = false;
      const prevCardIds = new Set(
        (this.gachaResults || []).map((prev) => prev.sampleCardId).filter(Boolean)
      );
      const usedCardIds = new Set();

      for (let i = 0; i < count; i++) {
        let r = Math.random() * totalWeight;
        let picked = pool[0];
        for (const entry of pool) {
          if (r < entry.weight) {
            picked = entry;
            break;
          }
          r -= entry.weight;
        }

        const isNew =
          picked.kind === 'back'
            ? !this.saveData.unlockedBacks.includes(picked.item.id)
            : !this.saveData.unlockedSkins.includes(picked.item.id);

        if (isNew) {
          if (picked.kind === 'back') {
            this.saveData.unlockedBacks.push(picked.item.id);
          } else {
            this.saveData.unlockedSkins.push(picked.item.id);
          }
        } else {
          this.saveData.coins += 90; // Duplicate refund
        }

        if (picked.item.rarity === 'legendary' || picked.item.rarity === 'mythic') {
          hasHigh = true;
        }

        const candidateCards = HANAFUDA_CARDS.filter(
          (c) => !usedCardIds.has(c.id) && !prevCardIds.has(c.id)
        );
        const cardPool = candidateCards.length > 0 ? candidateCards : HANAFUDA_CARDS;
        const randomCard = cardPool[Math.floor(Math.random() * cardPool.length)];
        usedCardIds.add(randomCard.id);

        results.push({ ...picked, isNew, sampleCardId: randomCard.id });
      }

      soundEngine.playGachaReveal(hasHigh);
      this.particles.triggerBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        hasHigh ? '#ffd166' : '#ff758f',
        42
      );
      this.gachaResults = results;
      this.persistSave();
      this.renderAll();
    };

    // Lắc ống quẻ ~0.5s rồi mới ra kết quả (giống động tác xin quẻ Omikuji)
    const shakeThenRoll = (btn, count, cost) => {
      if (btn.classList.contains('is-shaking')) return;
      if (this.saveData.coins < cost) {
        rollGacha(count, cost);
        return;
      }
      btn.classList.add('is-shaking');
      setTimeout(() => rollGacha(count, cost), 520);
    };
    const btn1 = root.querySelector('#btn-gacha-1');
    const btn5 = root.querySelector('#btn-gacha-5');
    btn1.onclick = () => shakeThenRoll(btn1, 1, 150);
    btn5.onclick = () => shakeThenRoll(btn5, 5, 650);
  }

  // ==========================================================================
  // MODAL: RULES & ILLUSTRATED YAKU GUIDE
  // ==========================================================================

  buildRulesModalHTML() {
    return `
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window">
          <div class="modal-header">
            <h2>📜 Cẩm Nang Luật Chơi Bài Hoa (Hanafuda Koi-Koi) & Bảng Tổ Hợp Yaku</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <button class="tut-replay-banner" id="btn-rules-open-tutorial">
              <img src="${getOpponentById('ayame').avatar}" alt="" />
              <span><strong>Lần đầu chơi?</strong> Xem hướng dẫn từng bước cùng Ayame ▶</span>
            </button>
            <div style="background:#fff4e2; border-left:4px solid #b52b2f; padding:12px 16px; border-radius:12px; margin-bottom:18px; font-size:13px; line-height:1.55; color:#3a1f16;">
              <strong>🌸 Cách chơi cơ bản cực dễ trong 30 giây:</strong><br/>
              1. Bộ bài Hoa gồm <strong>48 lá</strong> chia đều cho <strong>12 Tháng</strong> (mỗi tháng 4 lá ứng với 1 loài hoa/cây).<br/>
              2. Đến lượt mình, bạn thực hiện <strong>2 bước</strong>:<br/>
              &nbsp;&nbsp;• <strong>Bước 1 (Đánh bài trên tay):</strong> Chọn 1 lá trên tay. Nếu trên bàn có lá <strong>cùng Tháng</strong>, bạn ăn cả 2 lá đó về! Nếu không có lá cùng tháng, lá bài được đặt ngửa xuống bàn.<br/>
              &nbsp;&nbsp;• <strong>Bước 2 (Lật bài rút):</strong> Hệ thống tự lật 1 lá từ chồng bài rút. Nếu trùng Tháng với bài trên bàn, bạn ăn thêm cặp đó về!<br/>
              3. Khi các lá bài bạn ăn được tạo thành một <strong>Tổ hợp điểm (Yaku)</strong>, bạn được quyền chọn:<br/>
              &nbsp;&nbsp;• <strong>SHŌBU (勝負):</strong> Dừng hiệp đấu ngay để ghi điểm an toàn.<br/>
              &nbsp;&nbsp;• <strong>KOI-KOI (こいこい):</strong> Cược tiếp để ghép thêm Yaku mới! Đạt từ <strong>7 điểm trở lên sẽ được NHÂN ĐÔI (×2)</strong>, nhưng nếu đối thủ tạo được Yaku trước khi bạn dừng, đối thủ sẽ cướp chiến thắng và nhân đôi điểm của họ!
            </div>

            <h3 style="color:#8f1822; font-family:var(--font-display); margin-bottom:12px;">
              🏆 Bảng Tổ Hợp Điểm Yaku (Chuẩn Koi-Koi Nhật Bản)
            </h3>

            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(440px, 1fr)); gap:12px;">
              ${YAKU_CATALOG.map(
                (y) => `
                <div style="background:#fffdf9; border:1.5px solid #e2be98; border-radius:14px; padding:12px; display:flex; flex-direction:column; gap:6px;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:#9e1f28; font-size:14.5px;">${y.viName} ・ ${y.jpName}</strong>
                    <span class="yaku-prog-badge" style="font-size:12px;">${y.basePoints} Điểm</span>
                  </div>
                  ${this.renderYakuCardStrip(y)}
                  <p style="font-size:12px; color:var(--text-muted); line-height:1.4;">${y.description}</p>
                  ${
                    y.bonusRule
                      ? `<div style="font-size:11px; color:var(--jade); font-weight:700;">${y.bonusRule}</div>`
                      : ''
                  }
                </div>
              `
              ).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Small row of card images for a Yaku in the rules table, so players can see which cards form it.
   * Yaku with no fixed cards (Tsuki-fuda, Tane, Tanzaku, Kasu) show an example set, labelled "Ví dụ".
   */
  renderYakuCardStrip(yaku) {
    const skin = this.saveData.equippedSkin;
    let ids = yaku.requiredCardIds || [];
    let isExample = false;
    if (ids.length === 0) {
      isExample = true;
      const byType = (type, n) =>
        HANAFUDA_CARDS.filter((c) => c.type === type).slice(0, n).map((c) => c.id);
      if (yaku.id === 'tane') ids = byType('tane', 5);
      else if (yaku.id === 'tanzaku') ids = byType('tanzaku', 5);
      else if (yaku.id === 'kasu') ids = byType('kasu', 10);
    }
    const cards = ids.map((id) => getCardById(id)).filter(Boolean);
    if (cards.length === 0) return '';
    return `
      <div class="yaku-card-strip">
        ${isExample ? '<span class="yaku-card-strip-note">Ví dụ</span>' : ''}
        ${cards
          .map(
            (c) => `<div class="yaku-strip-card" title="${c.viName} (Tháng ${c.month})">${renderCardFaceSVG(c, skin, false)}</div>`
          )
          .join('')}
      </div>
    `;
  }

  bindRulesModalEvents(root) {
    const tutBtn = root.querySelector('#btn-rules-open-tutorial');
    if (tutBtn) tutBtn.onclick = () => this.openTutorial();
    root.querySelector('#btn-close-modal').onclick = () => {
      this.activeModal = null;
      this.renderActiveModal();
    };
    root.querySelector('#modal-backdrop-close').onclick = (e) => {
      if (e.target !== e.currentTarget) return;
      this.activeModal = null;
      this.renderActiveModal();
    };
  }

  // ==========================================================================
  // FIRST-RUN TUTORIAL (Ayame Shirakawa hướng dẫn từng bước)
  // ==========================================================================

  maybeShowFirstTutorial() {
    if (this.saveData.tutorialSeen || this.activeModal) return;
    this.openTutorial();
  }

  openTutorial() {
    this.settingsMenuOpen = false;
    this.tutorialStep = 0;
    this.activeModal = 'tutorial';
    this.renderTopNav();
    this.renderActiveModal();
  }

  closeTutorial() {
    this.saveData.tutorialSeen = true;
    this.persistSave();
    this.activeModal = null;
    this.renderActiveModal();
    if (!this.isMultiplayerMatch() && this.engine.phase === 'AI_TURN' && !this.isAnimating) {
      this.scheduleAiTurn();
    }
  }

  tutorialCardHTML(cardId, opts = {}) {
    const card = getCardById(cardId);
    if (!card) return '';
    const size = opts.size || 'md';
    const cls = ['tut-card', `tut-card-${size}`, opts.extraClass || ''].join(' ').trim();
    return `
      <div class="${cls}" title="${card.viName}">
        ${renderCardFaceSVG(card, this.saveData.equippedSkin, !!opts.badges)}
      </div>
    `;
  }

  getTutorialSteps() {
    // Bỏ phần chữ Hán/Kana trong ngoặc, chỉ giữ phiên âm Romaji
    const romaji = (s) =>
      String(s || '')
        .replace(/\s*\([^)]*[぀-ヿ一-鿿][^)]*\)/g, '')
        .trim();
    const yakuById = (id) => YAKU_CATALOG.find((y) => y.id === id);
    const card = (id, opts) => this.tutorialCardHTML(id, opts);

    const yakuRow = (id, cardIds, opts = {}) => {
      const y = yakuById(id);
      if (!y) return '';
      const viShort = y.viName.replace(/\s*\(.*\)$/, '');
      return `
        <div class="tut-yaku-row">
          <div class="tut-yaku-info">
            <div class="tut-yaku-name">
              <span class="tut-yaku-romaji">${romaji(y.jpName)}</span>
              <span class="tut-yaku-vi">${viShort}</span>
            </div>
            <div class="tut-yaku-note">${opts.note || ''}</div>
          </div>
          <div class="tut-yaku-cards">
            ${cardIds.map((cid) => card(cid, { size: 'xs' })).join('')}
            ${opts.more ? `<span class="tut-more-chip">${opts.more}</span>` : ''}
          </div>
          <div class="tut-yaku-pts">${y.basePoints}<small>điểm</small></div>
        </div>
      `;
    };

    const typeCol = (typeId, cardId, desc) => {
      const t = CARD_TYPES[typeId];
      return `
        <div class="tut-type-col">
          ${card(cardId, { size: 'md', badges: true })}
          <div class="tut-type-label" style="--type-color:${t.badgeColor}">
            <strong>${romaji(t.jpName)}</strong>
            <span>${t.viName}</span>
          </div>
          <p>${desc}</p>
        </div>
      `;
    };

    return [
      {
        title: 'Chào ngươi, lữ khách!',
        text: `Ta là <b>Ayame</b>, vu nữ giữ đền Inari bên cầu Yatsuhashi. Hôm nay ta sẽ dạy ngươi chơi <b>Koi-Koi</b> – trò bài hoa <b>Hanafuda</b> của xứ Phù Tang.<br/>Luật rất gọn: <b>ăn lá bài cùng tháng</b>, gom chúng thành <b>bộ ăn điểm (Yaku)</b>. Sau các hiệp đấu, ai nhiều điểm hơn sẽ thắng.`,
        stage: `
          <div class="tut-fan">
            ${[1, 9, 29, 41, 45].map((id) => card(id, { size: 'lg' })).join('')}
          </div>
          <div class="tut-caption">5 lá <b>Hikari</b> – báu vật của bộ bài</div>
        `
      },
      {
        title: '48 lá bài – 12 tháng hoa',
        text: `Bộ bài có <b>48 lá</b>, chia cho <b>12 tháng</b>, mỗi tháng <b>4 lá</b> vẽ cùng một loài hoa.<br/>Nhìn hoa là biết tháng – đó chính là chìa khóa để ăn bài!`,
        stage: `
          <div class="tut-month-row">
            <div class="tut-month-label"><b>Tháng 1</b><span>Matsu · Cây Tùng</span></div>
            <div class="tut-card-line">${[1, 2, 3, 4].map((id) => card(id, { size: 'sm' })).join('')}</div>
          </div>
          <div class="tut-month-row">
            <div class="tut-month-label"><b>Tháng 5</b><span>Ayame · Diên Vĩ</span></div>
            <div class="tut-card-line">${[17, 18, 19, 20].map((id) => card(id, { size: 'sm' })).join('')}</div>
          </div>
          <div class="tut-caption">Tháng 5 là tháng hoa của ta đấy, nhớ nhé!</div>
        `
      },
      {
        title: '4 loại lá bài',
        text: `Trong cùng một tháng, các lá có giá trị khác nhau. Có <b>4 loại</b> – mỗi bộ ăn điểm cần đúng loại lá, nên hãy nhớ kỹ:`,
        stage: `
          <div class="tut-type-grid">
            ${typeCol('hikari', 29, '5 lá quý nhất')}
            ${typeCol('tane', 37, '9 lá chim, thú, đồ vật')}
            ${typeCol('tanzaku', 22, '10 lá có dải giấy thơ')}
            ${typeCol('kasu', 47, '24 lá chỉ có hoa lá')}
          </div>
        `
      },
      {
        title: 'Lượt chơi ① – Đánh 1 lá trên tay',
        text: `Chọn <b>1 lá trên tay</b>. Nếu trên bàn có lá <b>cùng tháng</b>, ngươi ăn cả hai lá về khay của mình.<br/>Không có lá nào cùng tháng? Lá đó sẽ được đặt ngửa xuống bàn.`,
        stage: `
          <div class="tut-flow">
            <div class="tut-flow-slot"><span class="tut-slot-tag">Trên tay</span>${card(18, { size: 'lg' })}</div>
            <div class="tut-arrow">➜</div>
            <div class="tut-flow-slot"><span class="tut-slot-tag">Trên bàn</span>${card(17, { size: 'lg', extraClass: 'is-match' })}</div>
            <div class="tut-arrow">=</div>
            <div class="tut-flow-slot tut-win">
              <span class="tut-slot-tag gold">Ăn cả 2 lá!</span>
              <div class="tut-stack">${card(17, { size: 'md' })}${card(18, { size: 'md' })}</div>
            </div>
          </div>
          <div class="tut-caption">Cùng hoa <b>Diên Vĩ</b> (tháng 5) → ăn!</div>
        `
      },
      {
        title: 'Lượt chơi ② – Lật bài từ chồng bốc',
        text: `Tiếp theo, lá trên cùng của <b>chồng bốc</b> được lật lên. Trùng tháng với lá trên bàn → ngươi ăn thêm một cặp nữa!<br/>Nếu trên bàn có <b>2 lá cùng tháng</b>, ngươi được chọn lá muốn ăn – hãy chọn lá giá trị hơn.`,
        stage: `
          <div class="tut-flow">
            <div class="tut-flow-slot">
              <span class="tut-slot-tag">Chồng bốc</span>
              <div class="tut-card tut-card-lg tut-deck">${renderCardBackSVG(this.saveData.equippedBack)}</div>
            </div>
            <div class="tut-arrow">➜</div>
            <div class="tut-flow-slot"><span class="tut-slot-tag">Lật được</span>${card(34, { size: 'lg' })}</div>
            <div class="tut-arrow">➜</div>
            <div class="tut-flow-slot">
              <span class="tut-slot-tag">Trên bàn có 2 lá tháng 9</span>
              <div class="tut-card-line">
                ${card(33, { size: 'lg', extraClass: 'is-pick' })}
                ${card(35, { size: 'lg', extraClass: 'is-dim' })}
              </div>
            </div>
          </div>
          <div class="tut-caption">Chọn <b>Chén Rượu</b> – lá Thú quý hơn lá Thường!</div>
        `
      },
      {
        title: 'Bảng bộ ăn điểm ① – Quang & Rượu',
        text: `Đây là những bộ đáng giá nhất. Gom đủ các lá như hình là thành bộ.`,
        stage: `
          <div class="tut-yaku-list">
            ${yakuRow('goko', [1, 9, 29, 41, 45], { note: 'Đủ cả 5 lá Quang' })}
            ${yakuRow('shiko', [1, 9, 29, 45], { note: '4 lá Quang, không có Người Đội Mưa' })}
            ${yakuRow('ameshiko', [1, 9, 29, 41], { note: '4 lá Quang, có Người Đội Mưa' })}
            ${yakuRow('sanko', [1, 9, 45], { note: '3 lá Quang bất kỳ, trừ Người Đội Mưa' })}
            ${yakuRow('hanamizake', [9, 33], { note: 'Màn Anh Đào + Chén Rượu' })}
            ${yakuRow('tsukimizake', [29, 33], { note: 'Trăng Rằm + Chén Rượu' })}
          </div>
        `
      },
      {
        title: 'Bảng bộ ăn điểm ② – Thú, Dải Thơ & Lá Thường',
        text: `Các bộ này dễ gom hơn. Bộ tính theo số lá còn được <b>+1 điểm</b> cho mỗi lá vượt mức.`,
        stage: `
          <div class="tut-yaku-list">
            ${yakuRow('inoshikacho', [25, 37, 21], { note: 'Lợn Rừng + Hươu + Bướm' })}
            ${yakuRow('akatan', [2, 6, 10], { note: '3 Dải Thơ Đỏ có chữ' })}
            ${yakuRow('aotan', [22, 34, 38], { note: '3 Dải Thơ Xanh' })}
            ${yakuRow('tane', [5, 13, 17, 30, 42], { note: '5 lá Thú bất kỳ' })}
            ${yakuRow('tanzaku', [2, 14, 18, 26, 43], { note: '5 lá Dải Thơ bất kỳ' })}
            ${yakuRow('kasu', [3, 7, 11, 15, 19, 23], { note: '10 lá Thường bất kỳ', more: '+4 lá' })}
          </div>
          <div class="tut-tip">💡 Gom đủ cả Xích Đan lẫn Thanh Đan = bộ <b>Song Đan</b>, 10 điểm!</div>
        `
      },
      {
        title: 'Koi-Koi hay Shōbu?',
        text: `Mỗi khi vừa ra bộ, ngươi phải chọn: <b>dừng lại ăn điểm</b>, hay <b>đánh tiếp</b> để gom thêm. Đây là lúc bản lĩnh lên tiếng!`,
        stage: `
          <div class="tut-choice-grid">
            <div class="tut-choice shobu">
              <div class="tut-choice-title">SHŌBU</div>
              <div class="tut-choice-sub">“Thắng thua tại đây!”</div>
              <p>Dừng hiệp ngay và ghi điểm các bộ đang có. An toàn, chắc ăn.</p>
            </div>
            <div class="tut-choice koikoi">
              <div class="tut-choice-title">KOI-KOI</div>
              <div class="tut-choice-sub">“Tới nữa đi!”</div>
              <p>Chơi tiếp để gom thêm bộ. Nhưng nếu đối thủ ra bộ và dừng trước, <b>điểm của họ được nhân đôi</b>!</p>
            </div>
          </div>
          <div class="tut-tip">✨ Tổng từ <b>7 điểm</b> trở lên khi dừng sẽ được <b>×2</b>. Bảng đầy đủ luôn ở <b>⚙ → Luật &amp; Bảng Yaku</b>.</div>
        `
      }
    ];
  }

  buildTutorialModalHTML() {
    const steps = this.getTutorialSteps();
    const total = steps.length;
    const idx = Math.max(0, Math.min(this.tutorialStep || 0, total - 1));
    const step = steps[idx];
    const isFirst = idx === 0;
    const isLast = idx === total - 1;
    const ayame = getOpponentById('ayame');

    return `
      <div class="modal-backdrop tutorial-backdrop" id="modal-backdrop-close">
        <div class="modal-window tutorial-window" role="dialog" aria-label="Hướng dẫn chơi">
          <aside class="tut-guide">
            <div class="tut-portrait">
              <img src="${ayame.avatar}" alt="${ayame.name}" draggable="false" />
            </div>
            <div class="tut-nameplate">
              <strong>${ayame.name}</strong>
              <span>Vu nữ đền Inari · Người dẫn đường</span>
            </div>
          </aside>

          <section class="tut-main">
            <div class="tut-topline">
              <span class="tut-step-kicker">Hướng dẫn · Bước ${idx + 1}/${total}</span>
              <button class="tut-skip-btn" id="btn-tut-skip">${isLast ? 'Đóng' : 'Bỏ qua ✕'}</button>
            </div>

            <div class="tut-bubble">
              <h3>${step.title}</h3>
              <p>${step.text}</p>
            </div>

            <div class="tut-stage">${step.stage}</div>

            <div class="tut-footer">
              <button class="tut-nav-btn ghost" id="btn-tut-prev" ${isFirst ? 'disabled' : ''}>◀ Quay lại</button>
              <div class="tut-dots">
                ${steps
                  .map(
                    (_, i) =>
                      `<button class="tut-dot ${i === idx ? 'active' : ''} ${i < idx ? 'done' : ''}" data-tut-step="${i}" aria-label="Bước ${i + 1}"></button>`
                  )
                  .join('')}
              </div>
              <button class="tut-nav-btn primary" id="btn-tut-next">
                ${isLast ? 'Vào trận! 🎴' : 'Tiếp ▶'}
              </button>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  bindTutorialModalEvents(root) {
    const total = this.getTutorialSteps().length;
    const goTo = (i) => {
      this.tutorialStep = Math.max(0, Math.min(i, total - 1));
      soundEngine.playCardHover();
      this.renderActiveModal();
    };
    const next = root.querySelector('#btn-tut-next');
    if (next) {
      next.onclick = () => {
        if ((this.tutorialStep || 0) >= total - 1) {
          this.closeTutorial();
        } else {
          goTo((this.tutorialStep || 0) + 1);
        }
      };
    }
    const prev = root.querySelector('#btn-tut-prev');
    if (prev) prev.onclick = () => goTo((this.tutorialStep || 0) - 1);
    const skip = root.querySelector('#btn-tut-skip');
    if (skip) skip.onclick = () => this.closeTutorial();
    root.querySelectorAll('[data-tut-step]').forEach((dot) => {
      dot.onclick = () => goTo(Number(dot.getAttribute('data-tut-step')));
    });
    // Không đóng khi bấm ra ngoài để tránh lỡ tay bỏ qua hướng dẫn
    const backdrop = root.querySelector('#modal-backdrop-close');
    if (backdrop) backdrop.onclick = (e) => e.stopPropagation();
  }
}

// Sau khi trận đã hiện: tải ngầm font menu cài đặt (M PLUS 1p, CSS ~120 KB) + ảnh popup Yaku
function warmDeferredAssets() {
  const run = () => {
    if (!document.getElementById('hk-font-ui')) {
      const link = document.createElement('link');
      link.id = 'hk-font-ui';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;500;700;800&display=swap';
      document.head.appendChild(link);
    }
    warmYakuRevealAssets();
  };
  const start = () => setTimeout(run, 1500);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

function bootHanaKoiApp() {
  if (!window.hanaKoiApp) {
    initViewportScaler();
    window.hanaKoiApp = new HanaKoiApp();
    warmDeferredAssets();
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootHanaKoiApp);
} else {
  bootHanaKoiApp();
}
