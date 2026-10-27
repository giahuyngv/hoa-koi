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
  prewarmCardFaces,
  prewarmCardBack,
  renderTabletopFlowerDioramaSVG,
  renderTabletopBillboardDioramaHTML,
  AVAILABLE_DIORAMA_MONTHS
} from './graphics/cardArtwork.js?v=26';
import { createHacRig } from './graphics/hacRig.js?v=1';
import { ParticleSystem25D } from './graphics/particles25d.js?v=27';
import { playYakuReveal, warmYakuRevealAssets } from './graphics/yakuReveal.js?v=25';
import { cardAnimator } from './graphics/cardAnimator.js?v=25';
import { soundEngine, BGM_TRACKS } from './audio/soundEngine.js?v=25';
import { KoiKoiEngine, compareDealerCards } from './engine/koiKoiEngine.js?v=25';
import { multiplayerService } from './services/multiplayerService.js?v=25';
import { initViewportScaler, isPerfLow, getPerfModePref, setPerfMode } from './ui/viewportScaler.js?v=26';
import { StoryController, getStoryPlayerAvatar, storyAvatarHTML } from './story/storyMode.js?v=1';

const STORAGE_KEY = 'hanakoi_25d_save_v1';
const THEME_STORAGE_KEY = 'hanakoi_theme_mode';
const ANIM_SPEED_STORAGE_KEY = 'hanakoi_anim_speed';

function prefersSystemDark() {
  return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

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

// Như setElementMarkup nhưng bỏ qua khi markup giống lần trước và DOM chưa bị thay (không parse/vẽ lại).
function setElementMarkupIfChanged(el, markup) {
  if (!el) return false;
  const str = String(markup || '');
  if (el._hkMarkup === str && el._hkFirst === el.firstChild && el._hkLast === el.lastChild) return false;
  setElementMarkup(el, str);
  el._hkMarkup = str;
  el._hkFirst = el.firstChild;
  el._hkLast = el.lastChild;
  return true;
}

function parseSingleElement(markup) {
  const doc = new DOMParser().parseFromString(String(markup), 'text/html');
  doc.querySelectorAll('script, iframe, object, embed').forEach((n) => n.remove());
  return doc.body.firstElementChild;
}

// Cập nhật danh sách con theo key: con nào markup không đổi thì giữ nguyên node (không restart
// animation, không vẽ lại), chỉ tạo/thay/bỏ phần khác. items: [{ key, markup }]. Trả về các node mới tạo.
function patchKeyedChildren(parent, items) {
  const created = [];
  if (!parent) return created;
  const existing = new Map();
  for (const el of Array.from(parent.children)) {
    if (el._hkKey === undefined || existing.has(el._hkKey)) el.remove();
    else existing.set(el._hkKey, el);
  }
  const wanted = new Set(items.map((it) => it.key));
  existing.forEach((el, key) => {
    if (!wanted.has(key)) el.remove();
  });
  const make = (key, markup) => {
    const el = parseSingleElement(markup);
    el._hkKey = key;
    el._hkMarkup = markup;
    created.push(el);
    return el;
  };
  let cursor = parent.firstElementChild;
  for (const { key, markup } of items) {
    let el = wanted.has(key) ? existing.get(key) : null;
    if (el && el._hkMarkup !== markup) {
      const fresh = make(key, markup);
      if (cursor === el) cursor = fresh;
      el.replaceWith(fresh);
      el = fresh;
    } else if (!el) {
      el = make(key, markup);
    }
    if (el !== cursor) parent.insertBefore(el, cursor);
    cursor = el.nextElementSibling;
  }
  return created;
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
    const isCompact =
      typeof document !== 'undefined' && document.body.classList.contains('layout-compact');
    const holdMs = isCompact ? 2000 : 4500;
    this.dialogueHideAt = Date.now() + holdMs;
    if (this._dialogueTimer) clearTimeout(this._dialogueTimer);
    if (typeof this.syncCompactHeaderState === 'function') this.syncCompactHeaderState();
    this._dialogueTimer = setTimeout(() => {
      if (typeof this.renderLeftPanel === 'function') this.renderLeftPanel();
      if (typeof this.syncCompactHeaderState === 'function') this.syncCompactHeaderState();
    }, holdMs + 60);
  }

  constructor() {
    this.saveData = this.loadSaveData();
    // Chưa chọn theme trong menu ⚙ → theo dark mode của máy (và đổi theo khi máy đổi)
    // localStorage có thể ném lỗi (Safari chặn dữ liệu trang / iframe) → không để game trắng màn
    let savedTheme = null;
    let savedSpeed = NaN;
    try {
      savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      savedSpeed = Number(localStorage.getItem(ANIM_SPEED_STORAGE_KEY));
    } catch {
      // Ignore
    }
    this.darkMode = savedTheme ? savedTheme === 'dark' : prefersSystemDark();
    this.animSpeedOptions = [0.2, 0.5, 0.75, 1, 2, 5];
    this.animSpeed = this.animSpeedOptions.includes(savedSpeed) ? savedSpeed : 1;
    cardAnimator.setSpeedMultiplier(this.animSpeed);
    this.settingsMenuOpen = false;
    this.applyThemeMode();
    this.watchSystemTheme();

    this.engine = new KoiKoiEngine();
    this.gameMode = 'pve'; // 'pve' | 'pvp' | 'custom'
    this.currentOpponent = getOpponentById(this.saveData.selectedOpponentId || 'koharu');
    this.currentDialogue = this.pickRandom(this.currentOpponent.dialogues.intro);
    this.tableFlowerMonth = this.pickTableFlowerMonth();

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
    this.particles.setMonthTheme(this.tableFlowerMonth || 9);
    this.particles.start();

    // Modal toàn màn hình che canvas hạt → dừng hạt nền (burst vẫn chạy)
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      const syncParticleOcclusion = () =>
        this.particles.setOccluded(!!modalRoot.querySelector('.modal-backdrop, .hk-capv-backdrop'));
      new MutationObserver(syncParticleOcclusion).observe(modalRoot, { childList: true });
      syncParticleOcclusion();
    }

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
    this.story = new StoryController(this);
    // Link vào phòng PvP thì vào thẳng bàn chơi; còn lại mở Màn chính (bàn chơi chia sẵn phía sau, chưa chạy mở hiệp)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('joinRoom') || urlParams.get('autoPvp') === '1') {
      this.startMatchWithOpponent(this.currentOpponent.id, this.saveData.matchRounds || 3);
      this.checkUrlMultiplayerParams();
      this.maybeShowFirstTutorial();
    } else {
      this.engine.startNewMatch(this.saveData.matchRounds || 3);
      this.renderAll();
      this.story.showHome();
    }
  }

  /** Từ Màn chính: 'pve' mở bảng Chọn đối thủ, 'pvp' mở Ghép trận, 'custom' mở Phòng mã (đều trên trận đấu máy mới). */
  enterModeFromHome(mode) {
    this.story.match = null;
    // Chia sẵn trận đấu máy nhưng chưa mở hiệp (bốc bài chọn người đi trước nằm trên mọi modal):
    // chọn đối thủ / vào phòng PvP sẽ tự mở hiệp; đóng bảng mà không chọn thì mở hiệp với đối thủ hiện tại.
    multiplayerService.leaveCurrentRoom();
    this.gameMode = 'pve';
    this.bumpMatchToken();
    this.engine.startNewMatch(this.saveData.matchRounds || 3);
    this._openingPending = true;
    // Lần đầu đấu máy: hướng dẫn của Ayame trước (giống lúc mở game trước đây)
    this.activeModal = mode === 'pve' && !this.saveData.tutorialSeen ? null : mode === 'pvp' ? 'pvp_lobby' : mode === 'custom' ? 'custom_room' : 'opponents';
    this.renderAll();
    if (!this.activeModal) this.maybeShowFirstTutorial();
  }

  // Về Màn chính giữa trận: bỏ trận cốt truyện đang dở (trận đấu máy vẫn để nguyên phía sau)
  goHome() {
    this.story.match = null;
    // Dừng trình tự mở hiệp đang dở (bốc bài chọn người đi trước / chữ tháng / chia bài)
    this._openingSeqId = (this._openingSeqId || 0) + 1;
    document.querySelectorAll('.dealer-draw-overlay').forEach((n) => n.remove());
    const introRoot = document.getElementById('month-intro-root');
    if (introRoot) introRoot.replaceChildren();
    this.revealAllRoundCards();
    this.isAnimating = false;
    this.settingsMenuOpen = false;
    this.activeModal = null;
    this.renderActiveModal();
    this.renderTopNav();
    this.story.showHome();
  }

  /** Cài đặt tiểu cảnh: 'random' (mặc định, mỗi trận ngẫu nhiên) | '1' | '9' (cố định 1 tháng) | 'off' (tắt) */
  getDioramaPref() {
    const p = String(this.saveData.dioramaPref || 'random');
    return p === 'off' || AVAILABLE_DIORAMA_MONTHS.includes(Number(p)) ? p : 'random';
  }

  /** Tháng tiểu cảnh cho trận mới theo cài đặt; 0 = tắt tiểu cảnh */
  pickTableFlowerMonth() {
    const p = this.getDioramaPref();
    if (p === 'off') return 0;
    if (p !== 'random') return Number(p);
    return AVAILABLE_DIORAMA_MONTHS[Math.floor(Math.random() * AVAILABLE_DIORAMA_MONTHS.length)];
  }

  rollNewTableFlowerMonth() {
    this.tableFlowerMonth = this.pickTableFlowerMonth();
    if (this.particles) {
      this.particles.setMonthTheme(this.tableFlowerMonth || 9);
    }
  }

  /** Nhãn cài đặt tiểu cảnh trong menu ⚙ */
  dioramaPrefLabel() {
    const p = this.getDioramaPref();
    if (p === 'off') return 'Đang tắt';
    if (p !== 'random') return `Tháng ${p}`;
    return this.tableFlowerMonth ? `Ngẫu nhiên · Tháng ${this.tableFlowerMonth}` : 'Ngẫu nhiên';
  }

  /** Hạc tháng 1: rig 5 mảnh chạy bằng requestAnimationFrame, gắn vào anchor trên mặt bàn */
  mountDioramaActors(stage) {
    if (this.dioramaRaf) cancelAnimationFrame(this.dioramaRaf);
    this.dioramaRaf = 0;
    const rigs = [...stage.querySelectorAll('.m1-hac-anchor')].map((an) =>
      createHacRig(an, {
        base: './public/assets/diorama/month1/hac_',
        ext: '.webp?v=1',
        scale: Number(an.dataset.scale) || 0.21,
        pos: [0, 0],
        flip: an.dataset.flip === '1'
      })
    );
    if (!rigs.length) return;
    let last = performance.now();
    const loop = (now) => {
      if (!rigs[0].el.isConnected) { this.dioramaRaf = 0; return; }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!document.hidden) rigs.forEach((r) => r.tick(dt));
      this.dioramaRaf = requestAnimationFrame(loop);
    };
    rigs.forEach((r) => r.tick(0));
    this.dioramaRaf = requestAnimationFrame(loop);
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

  watchSystemTheme() {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (!mq) return;
    const onChange = () => {
      let saved = null;
      try {
        saved = localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        // Ignore
      }
      if (saved || this.darkMode === mq.matches) return;
      this.darkMode = mq.matches;
      this.applyThemeMode();
      this.renderAll();
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange); // Safari/iOS < 14
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

  // PvP: khách không tự chia bài; bấm Ván tiếp/Tái đấu chỉ chuyển sang chờ chủ phòng
  waitForHostDeal() {
    if (!this.isMultiplayerMatch() || multiplayerService.role === 'host') return false;
    if (!this.mpWaitingHost) {
      this.mpWaitingHost = true;
      this.currentDialogue = 'Đang chờ chủ phòng chia bài…';
      this.renderAll();
    }
    return true;
  }

  isGuestWaitingHost() {
    return !!this.mpWaitingHost && this.isMultiplayerMatch() && multiplayerService.role !== 'host';
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
      this.mpWaitingHost = false;
      this.customRoomError = '';
      this.rollNewTableFlowerMonth();
      soundEngine.playShobuVictory();
      this.bumpMatchToken();

      if (role === 'host') {
        if (!initialGameState) {
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
        `Bạn là ${role === 'host' ? 'Chủ Phòng' : 'Khách Thách Đấu'} — Bốc bài chọn người đi trước!`
      );
      this.renderAll();
      this.runRoundOpeningSequence();
    };

    // Hàng đợi state PvP: service gọi không await (polling + BroadcastChannel) nên xếp chuỗi promise để xử lý tuần tự đúng thứ tự version
    multiplayerService.onStateReceived = (canonicalState, lastAction, version) => {
      const roomCode = multiplayerService.roomCode;
      this._mpStateQueue = (this._mpStateQueue || Promise.resolve())
        .then(() => {
          if (roomCode !== multiplayerService.roomCode) return;
          if (version && this._mpQueuedRoom === roomCode && version <= (this._mpLastAppliedVersion || 0)) return;
          if (version) {
            this._mpQueuedRoom = roomCode;
            this._mpLastAppliedVersion = version;
          }
          return this.applyRemoteState(canonicalState, lastAction);
        })
        .catch((err) => {
          console.error('[PvP] Lỗi xử lý state:', err);
          this.isAnimating = false;
        });
      return this._mpStateQueue;
    };

    this.applyRemoteState = async (canonicalState, lastAction) => {
      if (!this.isMultiplayerMatch()) return;

      // TURN_MOVE / CALL_KOIKOI / ROUND_FINISHED đều có thể mang nước đi của đối thủ
      const hasMove = !!(lastAction && (lastAction.handCard || lastAction.drawnCard));

      // Chờ hiệu ứng cục bộ đang chạy xong (tối đa 12s) rồi mới diễn nước đi của đối thủ
      if (hasMove || lastAction?.yakuReveal) {
        const waitStart = Date.now();
        while (
          (this.isAnimating || this.yakuRevealActive) &&
          Date.now() - waitStart < 12000
        ) {
          await new Promise((r) => setTimeout(r, 50));
        }
        if (!this.isMultiplayerMatch()) return;
      }

      // Animate remote opponent's played and drawn cards if provided (skip visual flight while viewing captured panel)
      if (hasMove && this.activeModal !== 'captured_view') {
        await this.animateRemoteOpponentAction(lastAction);
      }

      // Đối thủ vừa ăn bộ: phát hiệu ứng yaku bản ngắn như khi AI ăn
      if (lastAction?.yakuReveal?.evalResult?.yakus?.length) {
        this.isAnimating = true;
        try {
          await this.showYakuReveal(lastAction.yakuReveal, 'ai');
        } catch {
          // Bỏ qua lỗi hiệu ứng
        } finally {
          this.isAnimating = false;
        }
        if (!this.isMultiplayerMatch()) return;
      }

      if (lastAction && lastAction.type === 'CALL_KOIKOI') {
        this.triggerAnimeCutin(
          this.getOpponentDisplayName(),
          this.currentOpponent.avatar,
          'KOI-KOI! (こいこい)',
          `${this.getOpponentDisplayName()} tuyên bố cược tiếp để nhân đôi điểm!`,
          this.currentOpponent.koikoiArt || this.currentOpponent.portrait,
          this.currentOpponent.koikoiScale,
          this.currentOpponent.koikoiDrop
        );
      }

      // Khách PvP nhận ván/trận mới từ chủ phòng: tính là ván mới
      if (
        lastAction &&
        (lastAction.type === 'NEXT_ROUND' ||
          lastAction.type === 'REMATCH' ||
          lastAction.type === 'MATCH_START')
      ) {
        this.bumpMatchToken();
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
      if (this.engine.phase !== 'ROUND_OVER' && this.engine.phase !== 'MATCH_OVER') {
        this.mpWaitingHost = false;
      }

      if (
        lastAction &&
        (lastAction.type === 'NEXT_ROUND' ||
          lastAction.type === 'REMATCH' ||
          lastAction.type === 'MATCH_START')
      ) {
        this.renderAll();
        this.runRoundOpeningSequence();
        return;
      }

      if (lastAction?.type === 'YAKU_PENDING') {
        this.currentDialogue = `${this.getOpponentDisplayName()} đang cân nhắc Koi-Koi hay Shōbu…`;
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
      if (this.activeModal === 'captured_view') return;
      this.isAnimating = true;
      const skinId = this.saveData.equippedSkin;
      const engine = this.engine;

      // Diễn lại nước đi trên engine cục bộ (giống lượt AI) để lá không ăn có ô đích trên chiếu;
      // state chuẩn từ server được import ngay sau đó.
      const playRemoteCard = async (card, captured, fromRect) => {
        const fieldRects = this.snapshotFieldRects();
        const matches = engine.getFieldMatches(card);
        const placed = engine.resolveCardPlacement('ai', card, matches, captured?.[1]?.id);
        this.renderCenterBoard();
        if (placed.length > 0) {
          const matchedCards = placed.slice(1);
          const relocatedIds = (engine.lastFieldRelocations || []).map((r) => r.card.id);
          await Promise.all([
            cardAnimator.animateCaptureSequence({
              actor: 'ai',
              playedCard: card,
              matchedCards,
              skinId,
              fromRect,
              fieldTargetRect: fieldRects[matchedCards[0]?.id],
              onImpactSound: (bright) => soundEngine.playCardSnap(bright)
            }),
            cardAnimator.animateFieldRelocations(fieldRects, { delayMs: 220, relocatedIds })
          ]);
          this.renderRightPanel();
          this.renderLeftPanel();
        } else {
          await Promise.all([
            cardAnimator.animateCardToFieldSlot({
              card,
              skinId,
              fromRect,
              toFieldCardId: card.id,
              onLandSound: () => soundEngine.playCardSnap(false)
            }),
            cardAnimator.animateFieldRelocations(fieldRects, { delayMs: 0 })
          ]);
        }
      };

      if (action.handCard && this.activeModal !== 'captured_view') {
        const aiHandRect = cardAnimator.getRect('.ai-hand-zone .hana-card-3d:last-child');
        const idx = engine.aiHand.findIndex((c) => c.id === action.handCard.id);
        engine.aiHand.splice(idx !== -1 ? idx : engine.aiHand.length - 1, 1);
        soundEngine.playCardDeal(0.36);
        await playRemoteCard(action.handCard, action.capturedHand, aiHandRect);
      }

      if (action.drawnCard && this.activeModal !== 'captured_view') {
        soundEngine.playCardFlip();
        const deckRect = cardAnimator.getRect('#draw-pile-stack');
        const di = engine.deck.findIndex((c) => c.id === action.drawnCard.id);
        engine.deck.splice(di !== -1 ? di : 0, 1);
        await playRemoteCard(action.drawnCard, action.capturedDraw, deckRect);
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
    const unlockEvents = ['touchstart', 'touchend', 'pointerdown', 'keydown'];
    const unlockAndPlay = () => {
      this._userHasInteracted = true;
      soundEngine.unlockAudio();
      if (this._monthIntroShowing && !this._monthIntroSfxPlayed) {
        this._monthIntroSfxPlayed = true;
        soundEngine.playMonthIntro();
      }
      if (soundEngine.bgmEnabled) {
        soundEngine.startBgm();
        this.renderTopNav();
      }
      if (soundEngine.ctx && soundEngine.ctx.state === 'running') {
        unlockEvents.forEach((evt) => window.removeEventListener(evt, unlockAndPlay));
      }
    };
    unlockEvents.forEach((evt) => window.addEventListener(evt, unlockAndPlay, { passive: true }));
    setTimeout(() => {
      try {
        soundEngine.startBgm();
        this.renderTopNav();
      } catch {
        // Will unlock on first touch/pointerdown
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

      <!-- Màn chính + Cốt truyện (lớp phủ, dưới modal) -->
      <div id="story-root" hidden></div>

      <!-- Modal & Cut-in Containers -->
      <div id="modal-root"></div>
      <div id="cutin-root"></div>
      <div id="month-intro-root"></div>
    `);

    this.bindLongPressCardInspect(app);
    this.bindGlobalButtonClickSound(app);
    window.addEventListener('hk-compactchange', () => {
      if (this.engine) this.renderAll();
    });
  }

  bindGlobalButtonClickSound(app) {
    if (!app || this._buttonClickSoundBound) return;
    this._buttonClickSoundBound = true;
    app.addEventListener(
      'click',
      (e) => {
        const btn = e.target.closest('button, .live-room-pill, .hk-cap-compact-block');
        if (!btn || btn.disabled) return;
        // Các nút đã có hiệu ứng âm thanh đặc trưng riêng thì không phát đè tiếng click thường
        if (
          btn.hasAttribute('data-sfx-test') ||
          btn.id === 'btn-toggle-sound' ||
          btn.id === 'btn-cycle-bgm' ||
          btn.id === 'btn-flip-inspector' ||
          btn.id === 'btn-choose-koikoi' ||
          btn.id === 'btn-choose-shobu' ||
          btn.id === 'btn-next-round' ||
          btn.id === 'btn-play-again' ||
          btn.id === 'btn-restart-match'
        ) {
          return;
        }
        soundEngine.playButtonClick();
      },
      true
    );
  }

  bindLongPressCardInspect(app) {
    if (!app || this._longPressBound) return;
    this._longPressBound = true;
    let timer = null;
    let sx = 0;
    let sy = 0;

    const clear = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    app.addEventListener(
      'pointerdown',
      (e) => {
        clear();
        const cardEl = e.target.closest(
          '[data-hand-id], [data-field-id], [data-drawn-card-id], [data-inspect-id]'
        );
        if (!cardEl || this.activeModal === 'card_inspect') return;
        const rawId =
          cardEl.getAttribute('data-hand-id') ||
          cardEl.getAttribute('data-field-id') ||
          cardEl.getAttribute('data-drawn-card-id') ||
          cardEl.getAttribute('data-inspect-id');
        const cardId = Number(rawId);
        if (!cardId) return;
        sx = e.clientX;
        sy = e.clientY;
        timer = setTimeout(() => {
          timer = null;
          this._suppressNextClick = true;
          setTimeout(() => {
            this._suppressNextClick = false;
          }, 450);
          this.openQuickCardInspector(cardId);
        }, 420);
      },
      { passive: true }
    );

    app.addEventListener(
      'pointermove',
      (e) => {
        if (!timer) return;
        if (Math.abs(e.clientX - sx) > 10 || Math.abs(e.clientY - sy) > 10) {
          clear();
        }
      },
      { passive: true }
    );

    ['pointerup', 'pointercancel', 'contextmenu'].forEach((evt) =>
      app.addEventListener(evt, clear, { passive: true })
    );
  }

  openQuickCardInspector(cardId) {
    const c = getCardById(Number(cardId));
    if (!c) return;
    this.inspectedCardId = c.id;
    this.inspectorFlipped = false;
    soundEngine.playCardFlip();
    this.activeModal = 'card_inspect';
    this.renderActiveModal();
  }

  // opts.story: trận cốt truyện → không ghi đè đối thủ / số hiệp đã chọn cho chế độ Đấu máy
  startMatchWithOpponent(opponentId, rounds = 3, opts = {}) {
    multiplayerService.leaveCurrentRoom();
    this.gameMode = 'pve';
    if (this.story) this.story.onMatchStarted(opponentId, !!opts.story);
    this.currentOpponent = getOpponentById(opponentId);
    if (!opts.story) {
      this.saveData.selectedOpponentId = this.currentOpponent.id;
      this.saveData.matchRounds = rounds;
    }
    this.persistSave();

    this.rollNewTableFlowerMonth();
    this.currentDialogue = this.pickRandom(this.currentOpponent.dialogues.intro);
    this.activeModal = null;
    this.isAnimating = true;
    this.selectedHandCardId = null;
    this.activeTeasePopup = null;
    this.lastTeaseLineIndex = -1;
    if (this.teaseTimer) {
      clearTimeout(this.teaseTimer);
      this.teaseTimer = null;
    }
    this.newlyUnlockedItems = [];

    this.bumpMatchToken();
    this.engine.startNewMatch(rounds);
    this.renderAll();
    this.runRoundOpeningSequence();
  }

  /**
   * Trình tự mở hiệp đấu:
   * - Bước 1: Bốc bài chọn người đi trước (Chỉ ở Ván 1 của trận; từ Ván 2 giữ luật người thắng ván trước đi trước)
   * - Bước 3: Hiện chữ Kanji tháng thư pháp Yuji Boku (一月, 二月...) giữa màn hình ~1,2s
   * - Bước 2: Chia 24 lá bài tuần tự từng lá một từ cọc bài #draw-pile-stack ~2s
   */
  async runRoundOpeningSequence() {
    this._openingPending = false;
    const seqId = (this._openingSeqId = (this._openingSeqId || 0) + 1);
    const introRoot = document.getElementById('month-intro-root');
    if (introRoot) introRoot.replaceChildren();
    this._monthIntroShowing = false;
    this.isAnimating = true;

    // Chờ 1 microtask để maybeShowFirstTutorial() (nếu mở game lần đầu) kịp bật modal hướng dẫn
    await Promise.resolve();
    if (this._openingSeqId !== seqId) return;
    if (this.activeModal === 'tutorial') {
      this._pendingRoundOpening = true;
      this.isAnimating = false;
      return;
    }
    this._pendingRoundOpening = false;

    // Ẩn các lá bài khởi đầu để bàn cờ sạch sẽ trong khi hiện bốc bài và banner tháng
    this.hideInitialRoundCards();

    try {
      // 1. Bước 1 (Chỉ áp dụng ở Ván 1 của trận): Bốc bài chọn người đi trước (親決め - Oya Kime)
      if (this.engine.currentRound === 1) {
        await this.playDealerSelectionStep(seqId);
        if (this._openingSeqId !== seqId) return;
      }

      // 2. Bước 3: Hiện Banner Tháng (Kanji thư pháp Yuji Boku) ~1.2s
      await this.playMonthIntroBanner(this.engine.currentRound, seqId);
      if (this._openingSeqId !== seqId) return;

      // 3. Bước 2: Chia bài: Lá bay từ bộ bài (#draw-pile-stack), mỗi lượt 2 lá (tay đối thủ, chiếu, tay mình - 4 vòng) ~2s
      await this.playRoundDealAnimation(seqId);
    } finally {
      this.revealAllRoundCards();
      if (this._openingSeqId === seqId) {
        this.isAnimating = false;
        if (!this.isMultiplayerMatch() && this.engine.phase === 'AI_TURN') {
          this.scheduleAiTurn();
        }
      }
    }
  }

  hideInitialRoundCards() {
    const cards = document.querySelectorAll(
      '.ai-hand-zone .hana-card-3d, .ai-hand-zone .ai-small-card, #field-cards-grid .field-card-slot.occupied .hana-card-3d, #player-hand-cards .hana-card-3d'
    );
    cards.forEach((el) => el.classList.add('card-deal-hidden'));
  }

  revealAllRoundCards() {
    const cards = document.querySelectorAll('.card-deal-hidden');
    cards.forEach((el) => el.classList.remove('card-deal-hidden'));
  }

  async playRoundDealAnimation(seqId) {
    if (this._openingSeqId !== seqId) return;

    const aiElements = Array.from(
      document.querySelectorAll('.ai-hand-zone .hana-card-3d, .ai-hand-zone .ai-small-card')
    );
    const fieldElements = Array.from(
      document.querySelectorAll('#field-cards-grid .field-card-slot.occupied .hana-card-3d')
    );
    const playerElements = Array.from(
      document.querySelectorAll('#player-hand-cards .hana-card-3d')
    );

    if (playerElements.length === 0) {
      this.revealAllRoundCards();
      return;
    }

    const fieldCards = fieldElements.map((el) => {
      const cardId = Number(el.getAttribute('data-field-id'));
      return (
        this.engine.field.find((c) => c.id === cardId) ||
        getCardById(cardId) ||
        null
      );
    });

    const playerCards = playerElements.map((el) => {
      const cardId = Number(el.getAttribute('data-hand-id'));
      return (
        this.engine.playerHand.find((c) => c.id === cardId) ||
        getCardById(cardId) ||
        null
      );
    });

    const opp = this.currentOpponent;
    const aiBackId = opp?.backId || this.saveData.equippedBack;

    await cardAnimator.animateRoundDeal({
      deckSelector: '#draw-pile-stack',
      aiElements,
      fieldElements,
      playerElements,
      fieldCards,
      playerCards,
      skinId: this.saveData.equippedSkin,
      equippedBack: this.saveData.equippedBack,
      aiBackId,
      onDealSound: (stepIndex) => {
        if (this._userHasInteracted || (soundEngine.ctx && soundEngine.ctx.state === 'running')) {
          const pitch = 0.94 + (stepIndex % 3) * 0.04 + Math.random() * 0.02;
          soundEngine.playCardDeal(0.46, pitch);
        }
      },
      isCancelled: () => this._openingSeqId !== seqId
    });
  }

  async playMonthIntroBanner(roundNum, seqId) {
    const root = document.getElementById('month-intro-root');
    if (!root) return;

    const jpMonthKanji = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ];
    const roundMonth = ((Math.max(1, Number(roundNum) || 1) - 1) % 12) + 1;
    const text = jpMonthKanji[roundMonth - 1] || '一月';
    if (document.fonts?.load) {
      await Promise.race([
        document.fonts.load('108px "Yuji Boku"', text).catch(() => {}),
        new Promise((r) => setTimeout(r, 120))
      ]);
    }
    if (this._openingSeqId !== seqId) return;

    this._monthIntroShowing = true;
    this._monthIntroSfxPlayed = false;
    if (this._userHasInteracted || (soundEngine.ctx && soundEngine.ctx.state === 'running')) {
      this._monthIntroSfxPlayed = true;
      soundEngine.playMonthIntro();
    }

    setElementMarkup(
      root,
      `<div class="month-intro-overlay" aria-live="polite">
        <div class="month-intro-banner">
          <span class="month-intro-text" lang="ja">${text}</span>
        </div>
      </div>`
    );

    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (this._openingSeqId === seqId) {
      this._monthIntroShowing = false;
      root.replaceChildren();
    }
  }

  /**
   * BƯỚC 1: Bốc bài chọn người đi trước (親決め - Oya Kime)
   * - Áp dụng ở Ván 1 của trận đấu
   * - Úp 2 lá bài ngẫu nhiên giữa chiếu bàn cờ
   * - Người chơi chạm/chọn 1 lá -> Đối thủ lấy lá còn lại
   * - Lật cả 2 lá bài kèm âm thanh soundEngine.playCardFlip()
   * - So sánh: Tháng nhỏ hơn đi trước; nếu bằng tháng thì so điểm lá bài
   * - Hiện thông báo người đi trước (Bạn hay Đối thủ)
   * - PvP Online: Đồng bộ canonical state từ server.js
   */
  async playDealerSelectionStep(seqId) {
    if (this._openingSeqId !== seqId) return;

    const appRoot = document.getElementById('app') || document.body;
    if (!appRoot) return;

    // Ẩn bộ bài bốc trong suốt quá trình bốc bài chọn lượt
    const drawPileContainer = document.querySelector('.draw-pile-container');
    if (drawPileContainer) {
      drawPileContainer.classList.add('card-deal-hidden');
    }

    const opp = this.currentOpponent;
    const oppName = this.getOpponentDisplayName();
    const equippedBack = this.saveData.equippedBack;
    const aiBackId = opp?.backId || equippedBack;
    const equippedSkin = this.saveData.equippedSkin;

    let cardLeft = null;
    let cardRight = null;
    let preWinnerRole = null;
    const isPvp = this.isMultiplayerMatch();

    if (isPvp && this.engine.dealerDraw) {
      const d = this.engine.dealerDraw;
      cardLeft = getCardById(d.cardLeftId) || HANAFUDA_CARDS[0];
      cardRight = getCardById(d.cardRightId) || HANAFUDA_CARDS[1];
      preWinnerRole = d.winnerRole;
    } else {
      let diff = 0;
      while (diff === 0) {
        const idxA = Math.floor(Math.random() * HANAFUDA_CARDS.length);
        let idxB = Math.floor(Math.random() * HANAFUDA_CARDS.length);
        while (idxB === idxA) {
          idxB = Math.floor(Math.random() * HANAFUDA_CARDS.length);
        }
        cardLeft = HANAFUDA_CARDS[idxA];
        cardRight = HANAFUDA_CARDS[idxB];
        diff = compareDealerCards(cardLeft, cardRight);
      }
      this.engine.dealerDraw = {
        cardLeftId: cardLeft.id,
        cardRightId: cardRight.id,
        p1CardId: cardLeft.id,
        p2CardId: cardRight.id,
        p1Side: 'left',
        p2Side: 'right',
        winnerRole: diff < 0 ? 'p1' : 'p2',
        winnerSide: diff < 0 ? 'left' : 'right'
      };
      preWinnerRole = this.engine.dealerDraw.winnerRole;
    }

    const overlay = document.createElement('div');
    overlay.className = 'dealer-draw-overlay';
    overlay.id = 'dealer-draw-overlay';
    overlay.innerHTML = `
      <div class="dealer-draw-prompt" id="dealer-draw-prompt">
        <span>🎴 CHẠM 1 LÁ BÀI ĐỂ CHỌN NGƯỜI ĐI TRƯỚC (親決め)</span>
      </div>
      <div class="dealer-cards-pair">
        <div class="dealer-card-slot" id="dealer-slot-left" data-side="left">
          <div class="dealer-card-3d" id="dealer-card-left">
            ${renderCardBackSVG(equippedBack)}
          </div>
          <div class="dealer-role-tag" id="dealer-tag-left">Chạm để chọn</div>
          <div class="dealer-card-info" id="dealer-info-left"></div>
        </div>
        <div class="dealer-card-slot" id="dealer-slot-right" data-side="right">
          <div class="dealer-card-3d" id="dealer-card-right">
            ${renderCardBackSVG(aiBackId)}
          </div>
          <div class="dealer-role-tag" id="dealer-tag-right">Chạm để chọn</div>
          <div class="dealer-card-info" id="dealer-info-right"></div>
        </div>
      </div>
    `;

    appRoot.appendChild(overlay);

    return new Promise((resolve) => {
      let resolved = false;
      let timer = null;

      const finishStep = () => {
        if (resolved) return;
        resolved = true;
        if (timer) clearTimeout(timer);
        overlay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.95)';
        setTimeout(() => {
          overlay.remove();
          // Khôi phục lại cọc bài bốc khi vào bước chia bài
          if (drawPileContainer) {
            drawPileContainer.classList.remove('card-deal-hidden');
          }
          resolve();
        }, 300);
      };

      const doReveal = (chosenSide = 'left') => {
        if (resolved) return;
        const promptEl = overlay.querySelector('#dealer-draw-prompt');
        if (promptEl) promptEl.classList.add('is-hidden');

        if (this._userHasInteracted || (soundEngine.ctx && soundEngine.ctx.state === 'running')) {
          soundEngine.playCardFlip();
        }

        const leftSlot = overlay.querySelector('#dealer-slot-left');
        const rightSlot = overlay.querySelector('#dealer-slot-right');
        const cardLeftEl = overlay.querySelector('#dealer-card-left');
        const cardRightEl = overlay.querySelector('#dealer-card-right');
        const tagLeft = overlay.querySelector('#dealer-tag-left');
        const tagRight = overlay.querySelector('#dealer-tag-right');
        const infoLeft = overlay.querySelector('#dealer-info-left');
        const infoRight = overlay.querySelector('#dealer-info-right');

        if (leftSlot) leftSlot.style.pointerEvents = 'none';
        if (rightSlot) rightSlot.style.pointerEvents = 'none';

        // Lật bài thật 3D: xoay 90deg, tráo sang mặt bài chính 1 trong 48 lá, rồi xoay tiếp về 0deg
        const flipToCardFace = (cardEl, cardData) => {
          if (!cardEl) return;
          if (cardEl.animate) {
            cardEl.animate(
              [
                { transform: 'scale(1) rotateY(0deg)' },
                { transform: 'scale(1.06) rotateY(90deg)' }
              ],
              { duration: 220, easing: 'ease-in', fill: 'forwards' }
            ).onfinish = () => {
              cardEl.innerHTML = renderCardFaceSVG(cardData, equippedSkin, true);
              cardEl.animate(
                [
                  { transform: 'scale(1.06) rotateY(-90deg)' },
                  { transform: 'scale(1) rotateY(0deg)' }
                ],
                { duration: 240, easing: 'ease-out', fill: 'forwards' }
              );
            };
          } else {
            cardEl.innerHTML = renderCardFaceSVG(cardData, equippedSkin, true);
          }
        };

        flipToCardFace(cardLeftEl, cardLeft);
        flipToCardFace(cardRightEl, cardRight);

        let playerWins = false;
        let playerSide = chosenSide;
        let playerCard = playerSide === 'left' ? cardLeft : cardRight;
        let oppCard = playerSide === 'left' ? cardRight : cardLeft;

        if (isPvp) {
          const myRole = multiplayerService.role;
          playerSide = myRole === 'host' ? 'left' : 'right';
          playerCard = myRole === 'host' ? cardLeft : cardRight;
          oppCard = myRole === 'host' ? cardRight : cardLeft;
          playerWins = preWinnerRole === myRole;
        } else {
          const cmp = compareDealerCards(playerCard, oppCard);
          playerWins = cmp < 0;
        }

        const leftIsPlayer = playerSide === 'left';
        const myTag = leftIsPlayer ? tagLeft : tagRight;
        const oppTag = leftIsPlayer ? tagRight : tagLeft;

        if (infoLeft) {
          infoLeft.textContent = `${cardLeft.viName} (Tháng ${cardLeft.month})`;
          infoLeft.classList.add('is-visible');
        }
        if (infoRight) {
          infoRight.textContent = `${cardRight.viName} (Tháng ${cardRight.month})`;
          infoRight.classList.add('is-visible');
        }

        const winnerCardEl = playerWins
          ? playerSide === 'left'
            ? cardLeftEl
            : cardRightEl
          : playerSide === 'left'
          ? cardRightEl
          : cardLeftEl;
        const loserCardEl = playerWins
          ? playerSide === 'left'
            ? cardRightEl
            : cardLeftEl
          : playerSide === 'left'
          ? cardLeftEl
          : cardRightEl;

        const winnerTag = playerWins ? myTag : oppTag;
        const loserTag = playerWins ? oppTag : myTag;
        const winnerName = playerWins ? 'BẠN' : oppName;
        const loserName = playerWins ? oppName : 'BẠN';

        setTimeout(() => {
          if (winnerCardEl) winnerCardEl.classList.add('is-winner');
          if (loserCardEl) loserCardEl.classList.add('is-loser');
          if (winnerTag) {
            winnerTag.className = 'dealer-role-tag tag-winner';
            winnerTag.textContent = `${winnerName} ★ ĐI TRƯỚC (親)`;
          }
          if (loserTag) {
            loserTag.className = 'dealer-role-tag tag-loser';
            loserTag.textContent = `${loserName} · ĐI SAU (子)`;
          }
        }, 250);

        const dealerRole = playerWins ? 'player' : 'ai';
        this.engine.setDealer(dealerRole);

        if (isPvp && multiplayerService.role === 'host') {
          const canonical = this.engine.exportCanonicalState('host', null);
          multiplayerService.syncRoomState(canonical, { type: 'DEALER_DECIDED' });
        }

        setTimeout(() => {
          finishStep();
        }, 2200);
      };

      const leftSlot = overlay.querySelector('#dealer-slot-left');
      const rightSlot = overlay.querySelector('#dealer-slot-right');
      if (leftSlot) {
        leftSlot.onclick = (e) => {
          e.stopPropagation();
          doReveal('left');
        };
      }
      if (rightSlot) {
        rightSlot.onclick = (e) => {
          e.stopPropagation();
          doReveal('right');
        };
      }

      // Nếu người chơi không ấn vào lá bài nào thì đợi 10s rồi mới tự động lật
      timer = setTimeout(() => {
        doReveal('left');
      }, 10000);
    });
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

  getCompactYakuSummary(myCards, oppCards, isOpponent = false) {
    const evalRes = evaluateCapturedYaku(myCards);
    const completed = evalRes.yakus || [];
    const hints = getYakuProgressHints(myCards, oppCards);
    const shortNames = {
      hanamizake: 'Hanami-zake',
      tsukimizake: 'Tsukimi-zake',
      sanko: 'Sankō',
      inoshikacho: 'Ino-Shika-Chō',
      akatan: 'Akatan',
      aotan: 'Aotan'
    };
    const candidates = [];
    for (const h of hints) {
      if (h.isPossible && !h.isCompleted && h.ownedCount >= 1) {
        candidates.push({
          id: h.id,
          shortName: shortNames[h.id] || h.name,
          viName: h.name,
          owned: h.ownedCount,
          need: h.needCount,
          ratio: h.ownedCount / h.needCount,
          missing: h.needCount - h.ownedCount,
          pts: h.pts
        });
      }
    }
    const taneCount = myCards.filter((c) => c.type === 'tane').length;
    const tanzakuCount = myCards.filter((c) => c.type === 'tanzaku').length;
    const kasuCount = myCards.filter((c) => c.type === 'kasu').length;
    if (taneCount >= 3 && taneCount < 5) {
      candidates.push({
        id: 'tane',
        shortName: 'Tane',
        viName: 'Ngũ Thú',
        owned: taneCount,
        need: 5,
        ratio: taneCount / 5,
        missing: 5 - taneCount,
        pts: 1
      });
    }
    if (tanzakuCount >= 3 && tanzakuCount < 5) {
      candidates.push({
        id: 'tanzaku',
        shortName: 'Tanzaku',
        viName: 'Ngũ Đan',
        owned: tanzakuCount,
        need: 5,
        ratio: tanzakuCount / 5,
        missing: 5 - tanzakuCount,
        pts: 1
      });
    }
    if (kasuCount >= 6 && kasuCount < 10) {
      candidates.push({
        id: 'kasu',
        shortName: 'Kasu',
        viName: 'Thập Thảo',
        owned: kasuCount,
        need: 10,
        ratio: kasuCount / 10,
        missing: 10 - kasuCount,
        pts: 1
      });
    }

    candidates.sort((a, b) => a.missing - b.missing || b.ratio - a.ratio || b.pts - a.pts);

    let chipLabel = '';
    let chipRatio = 0;
    let hasAlert = false;
    if (completed.length > 0) {
      const topY = completed[0];
      const sName = topY.jpName.split(' ')[0];
      chipLabel = `${isOpponent ? '▲' : '✦'} ${sName} · Đủ bộ (${evalRes.totalBasePoints}đ)`;
      chipRatio = 1;
      hasAlert = true;
    } else if (candidates.length > 0) {
      const topC = candidates[0];
      chipLabel = `${isOpponent ? '▲' : '✦'} ${topC.shortName} ${topC.owned}/${topC.need}`;
      chipRatio = topC.ratio;
      hasAlert = true;
    } else if (myCards.length > 0) {
      const bestCat = [
        { name: 'Tam Quang', owned: myCards.filter((c) => c.type === 'hikari').length, need: 3 },
        { name: 'Ngũ Thú', owned: taneCount, need: 5 },
        { name: 'Ngũ Đan', owned: tanzakuCount, need: 5 },
        { name: 'Thập Thảo', owned: kasuCount, need: 10 }
      ].sort((a, b) => b.owned / b.need - a.owned / a.need)[0];
      chipLabel = `${isOpponent ? '▲' : '✦'} ${bestCat.name} ${bestCat.owned}/${bestCat.need}`;
      chipRatio = Math.min(1, bestCat.owned / bestCat.need);
      hasAlert = bestCat.owned > 0;
    } else {
      chipLabel = isOpponent ? 'Chưa có bộ sắp thành' : '✦ Chạm xem bảng Yaku';
      chipRatio = 0;
    }

    return {
      completed,
      candidates,
      nearCount: completed.length + candidates.length,
      chipLabel,
      chipRatio,
      hasAlert
    };
  }

  getCompactHeaderData() {
    const opp = this.currentOpponent;
    const isPlayerTurn = this.engine.phase.startsWith('PLAYER');
    const isMp = this.isMultiplayerMatch();
    const oppDisplayName = this.getOpponentDisplayName();
    const stars = (opp.difficultyLabel || '★☆☆☆☆').split(' ')[0];
    const compactOppSub = isMp
      ? `🟢 Phòng #${multiplayerService.roomCode}`
      : `Đối thủ · ${stars}`;
    const showDialogue = !!this.currentDialogue && Date.now() < this.dialogueHideAt;
    const roundMonth = ((this.engine.currentRound - 1) % 12) + 1;
    const jpMonths = ['睦月', '如月', '弥生', '卯月', '皐月', '水無月', '文月', '葉月', '長月', '神無月', '霜月', '師走'];
    const jpMonth = jpMonths[roundMonth - 1] || '睦月';
    const pYaku = this.getCompactYakuSummary(this.engine.playerCaptured, this.engine.aiCaptured, false);
    const oYaku = this.getCompactYakuSummary(this.engine.aiCaptured, this.engine.playerCaptured, true);
    const yakuBadgeCount = pYaku.nearCount + oYaku.nearCount;
    return {
      opp,
      isPlayerTurn,
      isMp,
      oppDisplayName,
      compactOppSub,
      showDialogue,
      roundMonth,
      jpMonth,
      yakuBadgeCount
    };
  }

  syncCompactHeaderState() {
    const bar = document.getElementById('hk-compact-topbar');
    if (!bar) return;
    const d = this.getCompactHeaderData();
    const avatarEl = bar.querySelector('.hk-compact-opp-avatar');
    if (avatarEl && avatarEl.getAttribute('src') !== d.opp.avatar) {
      avatarEl.setAttribute('src', d.opp.avatar);
    }
    const oppNameEl = bar.querySelector('#hk-compact-opp-name');
    if (oppNameEl) oppNameEl.textContent = d.oppDisplayName;
    const oppSubEl = bar.querySelector('#hk-compact-opp-sub');
    if (oppSubEl) oppSubEl.textContent = d.compactOppSub;
    const oppScoreEl = bar.querySelector('#hk-compact-opp-score');
    if (oppScoreEl) {
      oppScoreEl.textContent = `${this.engine.aiScore}${this.engine.aiCalledKoiKoi ? '🔥' : ''}`;
    }
    const bubbleEl = bar.querySelector('#hk-compact-speech-bubble');
    if (bubbleEl) {
      bubbleEl.textContent = this.currentDialogue || '';
      bubbleEl.classList.toggle('is-visible', d.showDialogue);
    }
    const roundPill = bar.querySelector('#hk-compact-round-pill');
    if (roundPill) {
      const k = roundPill.querySelector('.hk-round-kanji');
      const t = roundPill.querySelector('.hk-round-text');
      if (k) k.textContent = d.jpMonth;
      if (t) t.textContent = `Hiệp ${this.engine.currentRound}/${this.engine.totalRounds} · Tháng ${d.roundMonth}`;
    }
    const playerChip = bar.querySelector('#hk-compact-player-chip');
    if (playerChip) {
      playerChip.classList.toggle('is-turn', d.isPlayerTurn);
    }
    const playerSub = bar.querySelector('#hk-compact-player-sub');
    if (playerSub) {
      playerSub.textContent = d.isPlayerTurn ? 'Lượt của bạn' : 'Lượt đối thủ';
    }
    const playerScore = bar.querySelector('#hk-compact-player-score');
    if (playerScore) {
      playerScore.textContent = `${this.engine.playerScore}${this.engine.playerCalledKoiKoi ? '🔥' : ''}`;
    }
    const badgeEl = bar.querySelector('#hk-compact-yaku-badge');
    if (badgeEl) {
      badgeEl.textContent = String(d.yakuBadgeCount);
      badgeEl.classList.toggle('is-empty', d.yakuBadgeCount === 0);
    }
  }

  renderTopNav() {
    const nav = document.getElementById('top-nav');
    if (!nav) return;
    const totalOwned =
      this.saveData.unlockedBacks.length + this.saveData.unlockedSkins.length;
    const totalCollectibles = CARD_BACKS.length + CARD_SKINS.length;
    const currentTrack = soundEngine.getCurrentTrack();
    const isMp = this.isMultiplayerMatch();
    const isStory = !!(this.story && this.story.isStoryMatch());
    const cd = this.getCompactHeaderData();

    const navChanged = setElementMarkupIfChanged(nav, `
      <!-- Left: 3 Game Modes Scroll Switcher -->
      <div class="mode-switcher-group okami-scroll-bar">
        <button class="mode-pill-btn" id="btn-go-home" title="Về Màn chính (chọn chế độ, Cốt truyện)">
          <span class="hanko-mini">家</span> Màn chính
        </button>
        ${
          // Ghép trận / Phòng mã chỉ vào từ Màn chính; đang chơi cốt truyện thì nút này ghi "Cốt truyện"
          isStory
            ? `<button class="mode-pill-btn active-mode" id="btn-mode-story" title="Trận cốt truyện · bấm để về bản đồ 4 mùa">
                <span class="hanko-mini">旅</span> Cốt truyện
              </button>`
            : `<button class="mode-pill-btn ${this.gameMode === 'pve' ? 'active-mode' : ''}" id="btn-mode-pve" title="Chế độ 1: Đấu với 12 Kỳ Thủ Nhật Bản (PvE)">
                <span class="hanko-mini">対</span> Đấu Máy (12 Tháng)
              </button>`
        }
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
            <!-- Compact Lobby & Mode Section (chỉ hiện trong layout-compact khi mở ≡) -->
            <div class="hk-compact-only hk-dropdown-lobby-section">
              <div class="hk-dropdown-section-title">SẢNH & CHẾ ĐỘ CHƠI</div>
              <div class="hk-dropdown-grid">
                <button class="dropdown-item-btn" id="btn-compact-home">
                  <span>🏠 Màn chính</span>
                  <span class="item-sub">Cốt truyện · chế độ</span>
                </button>
                ${
                  isStory
                    ? `<button class="dropdown-item-btn is-active-mode" id="btn-compact-mode-story">
                        <span>旅 Cốt Truyện</span>
                        <span class="item-sub">Bản đồ 4 mùa</span>
                      </button>`
                    : `<button class="dropdown-item-btn ${this.gameMode === 'pve' ? 'is-active-mode' : ''}" id="btn-compact-mode-pve">
                        <span>⚔️ Đấu Máy</span>
                        <span class="item-sub">12 Kỳ Thủ</span>
                      </button>`
                }
                <button class="dropdown-item-btn" id="btn-compact-collection">
                  <span>🎴 Sưu Tập</span>
                  <span class="item-sub">${totalOwned}/${totalCollectibles}</span>
                </button>
                <button class="dropdown-item-btn" id="btn-compact-gacha">
                  <span>⛩️ Rút Quẻ</span>
                  <span class="item-sub">${this.saveData.coins} 🪙</span>
                </button>
                <button class="dropdown-item-btn" id="btn-compact-dark">
                  <span>${this.darkMode ? '☀️ Nền Sáng' : '🌙 Nền Tối'}</span>
                  <span class="item-sub">${this.darkMode ? 'Washi' : 'Urushi'}</span>
                </button>
              </div>
              <div class="dropdown-divider"></div>
              <div class="hk-dropdown-section-title">CÀI ĐẶT TRẬN ĐẤU</div>
            </div>

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
            <button class="dropdown-item-btn" id="btn-toggle-perf" title="Đồ họa nhẹ: tắt nghiêng 3D bàn, đổ bóng, làm mờ — mượt hơn trên điện thoại / iPhone">
              <span>🎨 Đồ họa</span>
              <span class="item-sub">${
                { auto: 'Tự động', low: 'Nhẹ', high: 'Đầy đủ' }[getPerfModePref()]
              }${getPerfModePref() === 'auto' ? (isPerfLow() ? ' · Nhẹ' : ' · Đầy đủ') : ''}</span>
            </button>
            <button class="dropdown-item-btn" id="btn-cycle-diorama-menu" title="Ngẫu nhiên mỗi trận → Tháng 1 → Tháng 9 → Tắt">
              <span>🌸 Tiểu cảnh bàn</span>
              <span class="item-sub">${this.dioramaPrefLabel()}</span>
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
            <div class="dropdown-divider"></div>
            <div class="app-version-label" style="text-align:center; font-size:12px; opacity:0.6; padding:4px 0 2px;">
              Phiên bản v${typeof APP_VERSION !== 'undefined' ? APP_VERSION : 'dev'}
            </div>
          </div>
        </div>
      </div>

      <!-- Compact Top Bar for iPhone Landscape (body.layout-compact) -->
      <div class="hk-compact-topbar hk-compact-only" id="hk-compact-topbar">
        <div class="hk-compact-header-left">
          <div class="nav-settings-wrap hk-compact-menu-wrap">
            <button class="hk-compact-menu-btn" id="btn-compact-menu" title="Menu sảnh & Cài đặt" aria-label="Menu">
              ${this.settingsMenuOpen ? '✕' : '≡'}
            </button>
          </div>
          <div class="hk-compact-opp-wrap">
            <button class="hk-compact-opp-chip" id="btn-compact-opp" title="Đổi đối thủ (${cd.oppDisplayName})">
              <img src="${cd.opp.avatar}" alt="${cd.oppDisplayName}" class="hk-compact-opp-avatar" />
              <div class="hk-compact-opp-meta">
                <span class="hk-compact-opp-name" id="hk-compact-opp-name">${cd.oppDisplayName}</span>
                <span class="hk-compact-opp-sub" id="hk-compact-opp-sub">${cd.compactOppSub}</span>
              </div>
              <span class="hk-compact-score opp-score" id="hk-compact-opp-score">${this.engine.aiScore}${this.engine.aiCalledKoiKoi ? '🔥' : ''}</span>
            </button>
            <div class="hk-compact-speech-bubble ${cd.showDialogue ? 'is-visible' : ''}" id="hk-compact-speech-bubble">${this.currentDialogue || ''}</div>
          </div>
        </div>

        <div class="hk-compact-round-pill" id="hk-compact-round-pill">
          <span class="hk-round-kanji">${cd.jpMonth}</span>
          <span class="hk-round-text">Hiệp ${this.engine.currentRound}/${this.engine.totalRounds} · Tháng ${cd.roundMonth}</span>
        </div>

        <div class="hk-compact-header-right">
          <div class="hk-compact-player-chip ${cd.isPlayerTurn ? 'is-turn' : ''}" id="hk-compact-player-chip">
            ${storyAvatarHTML(this.saveData, 30)}
            <div class="hk-compact-player-meta">
              <span class="hk-compact-player-name">${getStoryPlayerAvatar(this.saveData).name.replace(/[<>&"]/g, '')}</span>
              <span class="hk-compact-player-sub" id="hk-compact-player-sub">${cd.isPlayerTurn ? 'Lượt của bạn' : 'Lượt đối thủ'}</span>
            </div>
            <span class="hk-compact-score player-score" id="hk-compact-player-score">${this.engine.playerScore}${this.engine.playerCalledKoiKoi ? '🔥' : ''}</span>
          </div>
          <button class="hk-compact-yaku-btn" id="btn-compact-yaku" title="Xem bảng Yaku & tiến độ bộ">
            <span class="hk-yaku-kanji">役</span>
            <span class="hk-yaku-label">Yaku</span>
            <span class="hk-yaku-badge ${cd.yakuBadgeCount === 0 ? 'is-empty' : ''}" id="hk-compact-yaku-badge">${cd.yakuBadgeCount}</span>
          </button>
        </div>
      </div>
    `);
    if (!navChanged) {
      this.syncCompactHeaderState();
      return;
    }

    const bindClick = (sel, fn) => {
      const el = nav.querySelector(sel);
      if (el) el.onclick = fn;
    };

    bindClick('#btn-go-home', () => this.goHome());
    bindClick('#btn-compact-home', () => this.goHome());
    bindClick('#btn-mode-story', () => this.story.leaveMatchToMap());
    bindClick('#btn-compact-mode-story', () => this.story.leaveMatchToMap());
    bindClick('#btn-mode-pve', () => {
      this.settingsMenuOpen = false;
      this.activeModal = 'opponents';
      this.renderTopNav();
      this.renderActiveModal();
    });
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

    // Compact header & lobby menu bindings
    bindClick('#btn-compact-menu', (e) => {
      e.stopPropagation();
      this.settingsMenuOpen = !this.settingsMenuOpen;
      this.renderTopNav();
    });
    bindClick('#btn-compact-opp', (e) => {
      e.stopPropagation();
      if (isMp) {
        this.activeModal = this.gameMode === 'pvp' ? 'pvp_lobby' : 'custom_room';
        this.renderActiveModal();
      } else {
        this.openOpponentPicker();
      }
    });
    bindClick('#btn-compact-yaku', (e) => {
      e.stopPropagation();
      this.settingsMenuOpen = false;
      this.activeModal = 'rules';
      this.renderTopNav();
      this.renderActiveModal();
    });
    bindClick('#btn-compact-mode-pve', () => nav.querySelector('#btn-mode-pve').click());
    bindClick('#btn-compact-collection', () => nav.querySelector('#btn-open-collection').click());
    bindClick('#btn-compact-gacha', () => nav.querySelector('#btn-open-gacha').click());
    bindClick('#btn-compact-dark', (e) => {
      e.stopPropagation();
      this.toggleDarkMode();
    });

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
      if (on) soundEngine.playCardFlip();
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
    nav.querySelector('#btn-toggle-perf').onclick = (e) => {
      e.stopPropagation();
      const order = ['auto', 'low', 'high'];
      setPerfMode(order[(order.indexOf(getPerfModePref()) + 1) % order.length]);
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
      // Ngẫu nhiên -> Tháng 1 -> Tháng 9 -> Tắt -> Ngẫu nhiên
      const order = ['random', ...AVAILABLE_DIORAMA_MONTHS.map(String), 'off'];
      this.saveData.dioramaPref = order[(order.indexOf(this.getDioramaPref()) + 1) % order.length];
      this.persistSave();
      this.rollNewTableFlowerMonth();
      soundEngine.playCardFlip();
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
        // Chỉ chủ phòng được chia lại bài cho trận mới
        if (multiplayerService.role !== 'host') {
          this.currentDialogue = 'Chỉ chủ phòng mới bắt đầu lại trận được.';
          this.renderAll();
          return;
        }
        this.rollNewTableFlowerMonth();
        this.bumpMatchToken();
        this.engine.startNewMatch(this.engine.totalRounds);
        const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
        multiplayerService.syncRoomState(canonical, { type: 'MATCH_START' });
        this.renderAll();
        this.runRoundOpeningSequence();
      } else {
        this.startMatchWithOpponent(this.currentOpponent.id, this.engine.totalRounds);
      }
    };
  }

  renderLeftPanel() {
    this.syncCompactHeaderState();
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

    const leftChanged = setElementMarkupIfChanged(left, `
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
          <div class="score-box hk-me-score ${isPlayerTurn ? 'active-turn' : ''}">
            <span class="who-label">${storyAvatarHTML(this.saveData, 34)}<span class="hk-me-name">${getStoryPlayerAvatar(this.saveData).name.replace(/[<>&"]/g, '')}</span></span>
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
    if (!leftChanged) return;
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
    // Bước 4: vẽ sẵn bitmap mặt lá của skin đang dùng (chỉ chạy 1 lần cho mỗi skin/kích thước)
    prewarmCardBack(equippedBack);
    prewarmCardFaces(equippedSkin, true);
    prewarmCardFaces(equippedSkin, false);

    const aiBackId = equippedBack;
    const isCompact = document.body.classList.contains('layout-compact');

    if (
      this.selectedHandCardId &&
      (!this.engine.phase.startsWith('PLAYER') ||
        !this.engine.playerHand.some((c) => c.id === this.selectedHandCardId))
    ) {
      this.selectedHandCardId = null;
    }

    const activeSelectedHandCard =
      this.engine.phase === 'PLAYER_SELECT_FIELD_HAND'
        ? this.engine.pendingCard
        : isCompact && this.selectedHandCardId
        ? this.engine.playerHand.find((c) => c.id === this.selectedHandCardId) || null
        : null;

    if (isCompact && this.engine.phase === 'PLAYER_HAND' && activeSelectedHandCard) {
      this.hoveredHandCardMonth = activeSelectedHandCard.month;
    }

    const candidateIds = new Set(this.engine.matchingFieldCandidates.map((c) => c.id));
    const fieldMonthsSet = new Set(this.engine.field.map((c) => c.month));
    const pendingDrawnCard =
      this.engine.phase === 'PLAYER_SELECT_FIELD_DRAW'
        ? this.engine.drawnCard || this.engine.pendingCard
        : null;

    const hasRow3 = this.engine.hasFieldRow3();
    const hasCompactCol6 =
      isCompact && Boolean(this.engine.fieldSlots[10] || this.engine.fieldSlots[11]);
    const visualSlotOrder = isCompact
      ? hasCompactCol6
        ? [4, 5, 6, 7, 8, 10, 0, 1, 2, 3, 9, 11]
        : [4, 5, 6, 7, 8, 0, 1, 2, 3, 9]
      : hasRow3
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
      this.mountDioramaActors(stage);
    }

    const board = stage.querySelector('.tabletop-25d-board');
    const boardClass = `tabletop-25d-board wood-${opp.boardWood} flora-month-${this.tableFlowerMonth}`;
    if (board.className !== boardClass) {
      board.className = boardClass;
    }

    // Chỉ cập nhật phần thay đổi (từng lá đối thủ / ô bàn / lá trên tay): lá giữ nguyên thì giữ nguyên
    // DOM, nên lúc đánh/ăn/bốc không phải parse + vẽ lại cả bàn giữa animation.
    let aiWrap = board.querySelector(':scope > .ai-hand-wrapper');
    if (!aiWrap || !aiWrap.querySelector(':scope > .ai-hand-zone')) {
      aiWrap = replaceElementWithMarkup(aiWrap, `
          <!-- Opponent Hand (Face Down - Kept Clean & Unblurred) -->
          <div class="ai-hand-wrapper">
            <div class="ai-hand-zone"></div>
            <span class="hk-compact-only hk-ai-hand-count"></span>
          </div>
      `);
    }
    const aiCardMarkup = `
                <div class="hana-card-3d ai-small-card" title="Bài trên tay của ${oppDisplayName}">
                  ${renderCardBackSVG(aiBackId)}
                </div>
              `;
    patchKeyedChildren(
      aiWrap.querySelector(':scope > .ai-hand-zone'),
      this.engine.aiHand.map((_, i) => ({ key: i, markup: aiCardMarkup }))
    );
    const aiCountEl = aiWrap.querySelector(':scope > .hk-ai-hand-count');
    const aiCountText = `${this.engine.aiHand.length} lá`;
    if (aiCountEl.textContent !== aiCountText) aiCountEl.textContent = aiCountText;

    let fieldZone = board.querySelector(':scope > .field-ba-zone');
    if (!fieldZone || !fieldZone.querySelector(':scope > #field-cards-grid')) {
      fieldZone = replaceElementWithMarkup(fieldZone, `
          <!-- Center Field (Fixed Draw Deck Stack + Fixed-Slot 2x4 / 3x4 Field Card Grid) -->
          <div class="field-ba-zone">
            <div class="draw-pile-container"></div>
            <div class="field-cards-grid" id="field-cards-grid"></div>
          </div>
      `);
    }

    const pileMarkup = `
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
            </div>`;
    const pileEl = fieldZone.querySelector(':scope > .draw-pile-container');
    if (pileEl._hkMarkup !== pileMarkup) {
      const freshPile = replaceElementWithMarkup(pileEl, pileMarkup);
      freshPile._hkMarkup = pileMarkup;
      const drawnRevealEl = freshPile.querySelector('#drawn-card-reveal');
      if (drawnRevealEl) this.bindDrawnRevealEl(drawnRevealEl);
    }

    // Fixed-Slot Face-up Field Cards (2x4 expanding to 3x4; 2x5 on layout-compact)
    const grid = fieldZone.querySelector(':scope > #field-cards-grid');
    const gridClass = `field-cards-grid ${hasRow3 ? 'has-row-3' : 'rows-2'} ${hasCompactCol6 ? 'compact-cols-6' : ''}`;
    if (grid.className !== gridClass) grid.className = gridClass;
    const slotItems = visualSlotOrder.map((slotIdx) => {
      const card = this.engine.fieldSlots[slotIdx];
      if (!card) {
        return {
          key: slotIdx,
          markup: `<div class="field-card-slot empty" data-slot-index="${slotIdx}" aria-hidden="true"></div>`
        };
      }
      const isChoiceCandidate = candidateIds.has(card.id);
      const isHoverMatch = this.hoveredHandCardMonth === card.month && !isChoiceCandidate;
      const extraClass = isChoiceCandidate
        ? 'field-choice-candidate'
        : isHoverMatch
        ? 'field-match-highlight'
        : '';
      return {
        key: slotIdx,
        markup: `
                    <div class="field-card-slot occupied" data-slot-index="${slotIdx}">
                      <div class="hana-card-3d ${extraClass}"
                           data-field-id="${card.id}"
                           data-slot-index="${slotIdx}"
                           data-month="${card.month}"
                           title="${card.viName} (${card.jpName}) - Tháng ${card.month} (${card.points}đ)">
                        <span class="hk-compact-only hk-field-eat-badge">Ăn</span>
                        ${renderCardFaceSVG(card, equippedSkin, true)}
                      </div>
                    </div>
                  `
      };
    });
    patchKeyedChildren(grid, slotItems).forEach((slotEl) => {
      const fieldEl = slotEl.querySelector('[data-field-id]');
      if (fieldEl) this.bindFieldCardEl(fieldEl);
      else this.bindEmptySlotEl(slotEl);
    });

    let handZone = stage.querySelector(':scope > .player-hand-zone');
    if (!handZone || !handZone.querySelector('#player-hand-cards')) {
      handZone = replaceElementWithMarkup(handZone, `
      <!-- Player Hand Foreground Dock (Okami Brush Splash & Washi Scroll Tray) -->
      <div class="player-hand-zone okami-tefuda-dock">
        <div class="scroll-roller-bar top"></div>
        <div class="player-hand-cards" id="player-hand-cards"></div>
        <div class="scroll-roller-bar bottom"></div>
      </div>
      `);
    }
    const handItems = this.engine.playerHand.map((card) => {
      const hasMatch = fieldMonthsSet.has(card.month);
      const isSelected =
        (this.engine.phase === 'PLAYER_SELECT_FIELD_HAND' &&
          this.engine.pendingCard?.id === card.id) ||
        (isCompact && activeSelectedHandCard?.id === card.id);
      return {
        key: card.id,
        markup: `
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
              `
      };
    });
    patchKeyedChildren(handZone.querySelector('#player-hand-cards'), handItems).forEach((el) =>
      this.bindHandCardEl(el)
    );
  }

  // Sự kiện gắn cho từng lá khi lá đó được tạo; trạng thái (ứng viên, tháng trên bàn) đọc lúc bấm
  // vì phần tử có thể được giữ lại qua nhiều lần render.
  bindHandCardEl(el) {
    const cardId = Number(el.getAttribute('data-hand-id'));
    const month = Number(el.getAttribute('data-month'));

    el.addEventListener('mouseenter', () => {
      if (this.isAnimating) return;
      if (document.body.classList.contains('layout-compact')) return;
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
      if (document.body.classList.contains('layout-compact')) return;
      if (this.hoveredHandCardMonth !== null) {
        this.hoveredHandCardMonth = null;
        this.updateFieldHighlightOnly();
      }
    });

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this._suppressNextClick || this.isAnimating) return;
      if (
        this.engine.phase !== 'PLAYER_HAND' &&
        this.engine.phase !== 'PLAYER_SELECT_FIELD_HAND'
      ) {
        return;
      }
      if (document.body.classList.contains('layout-compact')) {
        if (this.engine.phase === 'PLAYER_HAND' && this.selectedHandCardId !== cardId) {
          this.selectedHandCardId = cardId;
          this.hoveredHandCardMonth = month;
          soundEngine.playCardFlip();
          this.renderCenterBoard();
          return;
        }
        if (
          this.engine.phase === 'PLAYER_SELECT_FIELD_HAND' &&
          this.engine.pendingCard?.id !== cardId
        ) {
          this.engine.phase = 'PLAYER_HAND';
          this.engine.pendingCard = null;
          this.engine.matchingFieldCandidates = [];
          this.selectedHandCardId = cardId;
          this.hoveredHandCardMonth = month;
          soundEngine.playCardFlip();
          this.renderCenterBoard();
          return;
        }
      }
      this.selectedHandCardId = null;
      this.handlePlayerPlayHandCard(cardId, e.clientX, e.clientY);
    });
  }

  bindFieldCardEl(el) {
    const fieldCardId = Number(el.getAttribute('data-field-id'));
    const fieldMonth = Number(el.getAttribute('data-month'));

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this._suppressNextClick || this.isAnimating) return;
      const isCandidate = this.engine.matchingFieldCandidates.some((c) => c.id === fieldCardId);
      if (this.engine.phase === 'PLAYER_SELECT_FIELD_HAND' && isCandidate) {
        this.selectedHandCardId = null;
        this.handlePlayerSelectFieldTarget(fieldCardId, e.clientX, e.clientY);
      } else if (this.engine.phase === 'PLAYER_SELECT_FIELD_DRAW' && isCandidate) {
        this.selectedHandCardId = null;
        this.handlePlayerSelectDrawTarget(fieldCardId, e.clientX, e.clientY);
      } else if (
        this.engine.phase === 'PLAYER_HAND' ||
        this.engine.phase === 'PLAYER_SELECT_FIELD_HAND'
      ) {
        const selectedHand =
          this.selectedHandCardId &&
          this.engine.playerHand.find(
            (c) => c.id === this.selectedHandCardId && c.month === fieldMonth
          );
        const matchingHandCard =
          selectedHand || this.engine.playerHand.find((c) => c.month === fieldMonth);
        if (matchingHandCard) {
          this.selectedHandCardId = null;
          this.handlePlayerPlayHandCard(matchingHandCard.id, e.clientX, e.clientY, fieldCardId);
        }
      }
    });
  }

  bindEmptySlotEl(slotEl) {
    slotEl.addEventListener('click', (e) => {
      if (this.isAnimating) return;
      if (!document.body.classList.contains('layout-compact')) return;
      if (this.engine.phase !== 'PLAYER_HAND' || !this.selectedHandCardId) return;
      const sel = this.engine.playerHand.find((c) => c.id === this.selectedHandCardId);
      if (sel && !this.engine.field.some((c) => c.month === sel.month)) {
        e.stopPropagation();
        this.selectedHandCardId = null;
        this.handlePlayerPlayHandCard(sel.id, e.clientX, e.clientY);
      }
    });
  }

  bindDrawnRevealEl(drawnRevealEl) {
    drawnRevealEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this._suppressNextClick) return;
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

  updateFieldHighlightOnly() {
    const fieldEls = document.querySelectorAll('[data-field-id]');
    fieldEls.forEach((el) => {
      const m = Number(el.getAttribute('data-month'));
      const want = this.hoveredHandCardMonth === m;
      if (el.classList.contains('field-match-highlight') === want) return;
      el.classList.toggle('field-match-highlight', want);
      // DOM đã khác markup đã lưu → lần render sau dựng lại ô này
      const slotEl = el.closest('.field-card-slot');
      if (slotEl) slotEl._hkMarkup = null;
    });
  }

  renderRightPanel() {
    this.syncCompactHeaderState();
    const right = document.getElementById('right-panel');
    if (!right) return;
    const equippedSkin = this.saveData.equippedSkin;

    // Mỗi khối (nút Yaku, khay đối thủ, khay của bạn) chỉ dựng lại khi nội dung khối đó đổi
    patchKeyedChildren(right, [
      {
        key: 'yaku-btn',
        markup: `
      <!-- Yaku list button (opens the full Yaku table) -->
      <button class="yaku-list-btn okami-makimono-box" id="btn-yaku-more" title="Xem bảng Yaku">
        <span class="hanko-seal">役</span> YAKU LIST
      </button>`
      },
      {
        key: 'ai-tray',
        markup: `
      <!-- Opponent Captured Cards Hanging Scroll -->
      <div class="captured-tray-box okami-makimono-box" id="ai-captured-tray">
        <div class="scroll-roller-bar top"></div>
        <div class="tray-header">
          <span>BÀI ĐỐI THỦ (${this.engine.aiCaptured.length})</span>
        </div>
        ${this.renderCategorizedCapturedHTML(this.engine.aiCaptured, equippedSkin)}
        ${this.renderCompactCapturedBlockHTML(this.engine.aiCaptured, this.engine.playerCaptured, equippedSkin, true)}
        <div class="scroll-roller-bar bottom"></div>
      </div>`
      },
      {
        key: 'player-tray',
        markup: `
      <!-- Player Captured Cards Hanging Scroll -->
      <div class="captured-tray-box okami-makimono-box" id="player-captured-tray">
        <div class="scroll-roller-bar top"></div>
        <div class="tray-header">
          <span>BÀI CỦA BẠN (${this.engine.playerCaptured.length})</span>
        </div>
        ${this.renderCategorizedCapturedHTML(this.engine.playerCaptured, equippedSkin)}
        ${this.renderCompactCapturedBlockHTML(this.engine.playerCaptured, this.engine.aiCaptured, equippedSkin, false)}
        <div class="scroll-roller-bar bottom"></div>
      </div>`
      }
    ]);

    // Gắn sự kiện 1 lần cho cả panel (ủy quyền), nên khối nào giữ nguyên DOM vẫn bấm được
    if (right._hkClickBound) return;
    right._hkClickBound = true;
    right.addEventListener('click', (e) => {
      if (e.target.closest('#btn-yaku-more')) {
        this.activeModal = 'rules';
        this.renderActiveModal();
        return;
      }
      // Bấm ô "đã ăn" mở panel toàn bộ lá đã ăn của đúng người đó (bảng Yaku vẫn mở bằng nút 役 Yaku)
      const box = e.target.closest('.hk-cap-compact-block');
      if (box) {
        if (this._suppressNextClick) return;
        e.stopPropagation();
        this.capturedViewSide = box.classList.contains('is-opp') ? 'ai' : 'player';
        this.activeModal = 'captured_view';
        this.renderActiveModal();
        return;
      }
      const inspectEl = e.target.closest('.captured-categories [data-inspect-id]');
      if (inspectEl) {
        this.inspectedCardId = Number(inspectEl.getAttribute('data-inspect-id'));
        this.collectionTab = 'compendium';
        this.activeModal = 'collection';
        this.renderActiveModal();
      }
    });
  }

  renderCompactCapturedBlockHTML(myCards, oppCards, skinId, isOpponent) {
    const cols = [
      { label: 'Quang', list: myCards.filter((c) => c.type === 'hikari') },
      { label: 'Thú', list: myCards.filter((c) => c.type === 'tane') },
      { label: 'Dải', list: myCards.filter((c) => c.type === 'tanzaku') },
      { label: 'Thường', list: myCards.filter((c) => c.type === 'kasu') }
    ];
    const summary = this.getCompactYakuSummary(myCards, oppCards, isOpponent);
    const pct = Math.max(0, Math.min(100, Math.round(summary.chipRatio * 100)));

    return `
      <div class="hk-compact-only hk-cap-compact-block ${isOpponent ? 'is-opp' : 'is-player'}" title="Chạm để xem toàn bộ lá đã ăn">
        <div class="hk-cap-head">
          <span class="hk-cap-title">${isOpponent ? 'ĐỐI THỦ ĐÃ ĂN' : 'BẠN ĐÃ ĂN'}</span>
          <span class="hk-cap-count">${myCards.length} lá</span>
        </div>
        <div class="hk-cap-4cols">
          ${cols
            .map(
              (g) => `
            <div class="hk-cap-col">
              <div class="hk-cap-stack ${g.list.length === 0 ? 'is-empty' : ''}">
                ${
                  g.list.length === 0
                    ? '<div class="hk-cap-empty-slot"></div>'
                    : g.list
                        .slice(0, 5)
                        .map(
                          (c, idx) => `
                        <div class="hk-cap-mini-card" data-inspect-id="${c.id}" style="z-index:${idx + 1}">
                          ${renderCardFaceSVG(c, skinId, false)}
                        </div>
                      `
                        )
                        .join('')
                }
              </div>
              <div class="hk-cap-col-label">${g.label} <strong>${g.list.length}</strong></div>
            </div>
          `
            )
            .join('')}
        </div>
        <div class="hk-cap-progress-chip ${isOpponent ? 'chip-warn' : 'chip-good'}">
          <span class="hk-cap-chip-text">${summary.chipLabel}</span>
          <span class="hk-cap-bar-track">
            <span class="hk-cap-bar-fill" style="width:${pct}%"></span>
          </span>
        </div>
      </div>
    `;
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
      soundEngine.playCardFlip();
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
    try {
      const skinId = this.saveData.equippedSkin;
      this.pendingMpMoveAction = {
        type: 'TURN_MOVE',
        handCard: res.card,
        capturedHand: res.captured || [],
        drawnCard: null,
        capturedDraw: []
      };

      await this.safeAnimate(async () => {
        soundEngine.playCardDeal(0.38);

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
      });

      await this.executePlayerDrawStep();
    } catch (err) {
      this.recoverFromAnimationError(err, 'lượt đánh bài của bạn');
    }
  }

  async executePlayerDrawStep() {
    const deckRect = cardAnimator.getRect('#draw-pile-stack');
    const fieldRects = this.snapshotFieldRects();

    const drawRes = this.engine.drawStepForPlayer();
    if (drawRes.status === 'DRAW_NEEDS_SELECTION') {
      this.pendingDrawRect = deckRect;
      this.isAnimating = false;
      soundEngine.playCardFlip();
      this.renderAll();
      return;
    }

    if (drawRes.drawnCard) {
      soundEngine.playCardFlip();
    }
    await this.animateAndFinishPlayerDraw(drawRes, deckRect, fieldRects);
  }

  async handlePlayerSelectDrawTarget(fieldCardId, clientX, clientY) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    try {
      const revealEl = document.querySelector('#drawn-card-reveal');
      const deckRect = revealEl
        ? cardAnimator.getRect(revealEl)
        : this.pendingDrawRect || cardAnimator.getRect('#draw-pile-stack');
      const fieldRects = this.snapshotFieldRects();

      const drawRes = this.engine.selectFieldForDrawnCard(fieldCardId);
      await this.animateAndFinishPlayerDraw(drawRes, deckRect, fieldRects);
    } catch (err) {
      this.recoverFromAnimationError(err, 'chọn lá ghép cho lá bốc');
    }
  }

  async animateAndFinishPlayerDraw(drawRes, deckRect, fieldRects) {
    const skinId = this.saveData.equippedSkin;
    if (this.pendingMpMoveAction) {
      this.pendingMpMoveAction.drawnCard = drawRes.drawnCard || null;
      this.pendingMpMoveAction.capturedDraw = drawRes.captured || [];
    }

    await this.safeAnimate(async () => {
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
    });

    this.isAnimating = false;
    this.afterPlayerDrawResolved(drawRes).catch((err) =>
      this.recoverFromAnimationError(err, 'kết thúc lượt của bạn')
    );
  }

  async afterPlayerDrawResolved(drawRes) {
    const yCheck = drawRes.yakuCheck;
    const isMp = this.isMultiplayerMatch();

    if (yCheck?.newYaku) {
      // PvP: gửi kèm bộ vừa ăn để máy đối thủ cũng phát hiệu ứng yaku
      if (isMp && this.pendingMpMoveAction) {
        this.pendingMpMoveAction.yakuReveal = {
          evalResult: { yakus: yCheck.evalResult?.yakus || [] },
          prevSignature: yCheck.prevSignature || ''
        };
        // Gửi ngay (không chờ chọn Koi-Koi/Shōbu) để đối thủ thấy nước đi + yaku cùng lúc
        if (!yCheck.autoShobu) {
          const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
          multiplayerService.syncRoomState(canonical, {
            ...this.pendingMpMoveAction,
            type: 'YAKU_PENDING'
          });
          this.pendingMpMoveAction = null;
        }
      }
      await this.safeAnimate(() => this.showYakuReveal(yCheck, 'player'));
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
        actorName: isAi ? this.getOpponentDisplayName() : '',
        skinId: this.saveData.equippedSkin,
        durationMs: cardAnimator.scaleMs(isAi ? 2000 : 2800),
        onShow: (yaku) => {
          soundEngine.playYakuKotoGlissando(yaku, { pauseBgm: true });
        }
      });
    } finally {
      this.yakuRevealActive = false;
    }
  }

  scheduleAiTurn() {
    if (this.isMultiplayerMatch()) return;
    // Tạm dừng AI khi đang mở hướng dẫn / xem bài đã ăn / popup ăn bộ; đóng modal sẽ gọi lại
    if (
      this.activeModal === 'tutorial' ||
      this.activeModal === 'captured_view' ||
      this.yakuRevealActive
    ) {
      return;
    }
    const token = this._matchToken;
    setTimeout(() => {
      if (
        token !== this._matchToken ||
        this.engine.phase !== 'AI_TURN' ||
        this.isAnimating ||
        this.isMultiplayerMatch() ||
        this.activeModal === 'tutorial' ||
        this.activeModal === 'captured_view' ||
        this.yakuRevealActive
      ) {
        return;
      }
      this.runAiTurn(token).catch((err) => {
        // Lượt của trận/ván cũ lỗi thì bỏ, không đụng trận mới
        if (token === this._matchToken) this.recoverFromAnimationError(err, 'lượt đối thủ');
      });
    }, cardAnimator.scaleMs(this.randomAiThinkMs()));
  }

  /**
   * Tăng mã trận/ván mỗi khi bắt đầu trận hoặc ván mới; lượt AI đang chạy dở
   * của trận/ván cũ thấy mã đổi sẽ dừng, không sửa engine của trận mới.
   */
  bumpMatchToken() {
    this._matchToken = (this._matchToken || 0) + 1;
  }

  /** Thân lượt AI: đánh 1 lá trên tay, bốc 1 lá, rồi xét bộ (Koi-Koi/Shōbu). */
  async runAiTurn(token = this._matchToken) {
    // Trận/ván đã đổi trong lúc lượt này chờ hiệu ứng → dừng
    const stale = () => token !== this._matchToken;
    if (stale()) return;
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

    await this.safeAnimate(async () => {
      soundEngine.playCardDeal(0.36);

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
    });
    if (stale()) return;

    if (this.engine.deck.length > 0) {
      soundEngine.playCardFlip();
      const deckRect = cardAnimator.getRect('#draw-pile-stack');
      const fieldRects2 = this.snapshotFieldRects();
      const drawn = this.engine.deck.shift();
      const drawMatches = this.engine.getFieldMatches(drawn);
      const capturedDraw = this.engine.resolveCardPlacement('ai', drawn, drawMatches);

      await this.safeAnimate(async () => {
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
      });
      if (stale()) return;
    }

    this.isAnimating = false;
    const yakuCheck = this.engine.checkPostTurnYaku('ai');
    if (yakuCheck.newYaku) {
      this.isAnimating = true;
      await this.safeAnimate(() => this.showYakuReveal(yakuCheck, 'ai'));
      if (stale()) return;
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
          opp.koikoiArt || opp.portrait,
          opp.koikoiScale,
          opp.koikoiDrop
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
  }

  /**
   * Chạy 1 đoạn hiệu ứng (render + bay lá). Lỗi chỉ ghi console rồi bỏ qua,
   * để phần luật phía sau (bốc bài, xét bộ, chuyển lượt) vẫn chạy tiếp.
   */
  async safeAnimate(fn) {
    try {
      await fn();
    } catch (err) {
      console.error('[HoaKoi] Hiệu ứng lỗi, bỏ qua để trận đi tiếp:', err);
    }
  }

  /**
   * Lưới an toàn khi một luồng có bật isAnimating ném lỗi giữa chừng:
   * gỡ khoá, vẽ lại bàn rồi đi tiếp theo phase hiện tại của engine.
   */
  recoverFromAnimationError(err, where) {
    console.error(`[HoaKoi] Lỗi trong ${where}, tự gỡ khoá bàn:`, err);
    this.isAnimating = false;
    this.yakuRevealActive = false;
    try {
      this.renderAll();
    } catch (renderErr) {
      console.error('[HoaKoi] renderAll lỗi khi gỡ khoá:', renderErr);
    }

    // Chặn vòng lặp nếu lỗi lặp lại liên tục: tối đa 3 lần tự đi tiếp trong 5 giây
    const now = Date.now();
    if (!this._animRecovery || now - this._animRecovery.since > 5000) {
      this._animRecovery = { since: now, count: 0 };
    }
    if (++this._animRecovery.count > 3) return;

    const phase = this.engine.phase;
    if (phase === 'PLAYER_DRAWING') {
      // Đã đánh lá trên tay nhưng chưa bốc: bốc tiếp
      this.isAnimating = true;
      this.executePlayerDrawStep().catch((e) =>
        this.recoverFromAnimationError(e, 'bốc bài của bạn')
      );
    } else if (phase === 'AI_TURN') {
      if (this.isMultiplayerMatch()) {
        // Lượt mình đã xong nhưng chưa kịp gửi cho đối thủ
        if (this.pendingMpMoveAction) {
          const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
          multiplayerService.syncRoomState(canonical, this.pendingMpMoveAction);
          this.pendingMpMoveAction = null;
        }
      } else {
        this.scheduleAiTurn();
      }
    }
    // PLAYER_HAND / chọn lá / Koi-Koi / hết ván: renderAll() ở trên đã hiện đúng giao diện
  }

  // Khoảng nghỉ "đối thủ đang nghĩ" trước mỗi lượt AI, ngẫu nhiên nhẹ cho tự nhiên
  randomAiThinkMs() {
    return 650 + Math.round(Math.random() * 600);
  }

  /**
   * portraitUrl (tuỳ chọn): ảnh chân dung tách nền (cutout/*.webp) → bản cut-in lớn,
   * nhân vật trồi khỏi dải đỏ; tiêu đề tách phần "(こいこい)" xuống dòng riêng.
   * Không có portraitUrl → giữ bản avatar tròn.
   * portraitScale / portraitDrop (tuỳ chọn): phóng to / hạ thấp riêng nhân vật (koikoiScale / koikoiDrop trong charactersData).
   */
  triggerAnimeCutin(name, avatarUrl, mainTitle, subText, portraitUrl = '', portraitScale = 1, portraitDrop = 0) {
    soundEngine.playKoiKoiFanfare();
    const root = document.getElementById('cutin-root');
    if (portraitUrl) {
      const [, latin = mainTitle, jp = ''] = mainTitle.match(/^(.*?)\s*(\(.+\))$/) || [];
      setElementMarkup(root, `
        <div class="cutin-overlay is-opponent" title="Chạm để đóng">
          <div class="cutin-band has-portrait">
            <div class="cutin-portrait-clip">
              <img src="${portraitUrl}" class="cutin-portrait" alt="${name}" draggable="false" style="--kk-scale: ${portraitScale || 1}; --kk-drop: ${portraitDrop || 0}" />
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
    // Lá bài đang bay nằm ở lớp trên body (trên cả #app) → ẩn tạm để không đè lên cut-in
    document.body.classList.add('hk-cutin-open');
    clearTimeout(this.cutinTimer);
    const closeCutin = () => {
      clearTimeout(this.cutinTimer);
      root.replaceChildren();
      document.body.classList.remove('hk-cutin-open');
    };
    // Cut-in đối thủ (có chân dung): nền tối, hiện lâu hơn, chạm bất kỳ đâu để đóng ngay
    if (portraitUrl) {
      root.querySelector('.cutin-overlay').addEventListener('click', (e) => {
        e.stopPropagation();
        closeCutin();
      });
    }
    this.cutinTimer = setTimeout(closeCutin, portraitUrl ? 3000 : 1900);
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

    if (this.story) this.story.onRoundFinished(outcome);

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

    // Tiếng đồng xu Koban leng keng khi bảng tổng kết hiệp trao Xu Hoa
    const coinChimeCount = outcome.matchBonusCoins ? 6 : outcome.winner === 'player' ? 5 : 3;
    setTimeout(() => {
      if (this.activeModal === 'round_end') {
        soundEngine.playCoinReward(coinChimeCount);
      }
    }, 340);
  }

  // ==========================================================================
  // MODAL RENDERERS
  // ==========================================================================

  updateModalMarkup(root, modalKey, markup) {
    const existingWindow = root.querySelector('.modal-window, .hk-capv');
    if (root.dataset.activeModalKey === modalKey && existingWindow) {
      const oldBody = existingWindow.querySelector('.modal-body');
      const oldScrollTop = oldBody ? oldBody.scrollTop : 0;
      const oldCapvScroll = existingWindow.classList.contains('hk-capv') ? existingWindow.scrollTop : 0;
      const oldCompGrid = existingWindow.querySelector('.compendium-48-grid');
      const oldCompScroll = oldCompGrid ? oldCompGrid.scrollTop : 0;
      const prevTab = existingWindow.dataset.colTab || '';
      const nextTab = modalKey === 'collection' ? this.collectionTab : '';

      const range = document.createRange();
      range.selectNodeContents(existingWindow);
      const frag = range.createContextualFragment(markup);
      const nextWindow = frag.querySelector('.modal-window, .hk-capv');
      if (nextWindow) {
        if (modalKey === 'collection' && prevTab === nextTab) {
          const oldPreviews = existingWindow.querySelectorAll('.collection-grid .preview-card-holder');
          const newPreviews = nextWindow.querySelectorAll('.collection-grid .preview-card-holder');
          if (oldPreviews.length > 0 && oldPreviews.length === newPreviews.length) {
            newPreviews.forEach((np, idx) => np.replaceWith(oldPreviews[idx]));
          }
        }
        existingWindow.className = nextWindow.className;
        existingWindow.replaceChildren(...nextWindow.childNodes);
        existingWindow.onclick = (e) => e.stopPropagation();
        existingWindow.dataset.colTab = nextTab;
        const newBody = existingWindow.querySelector('.modal-body');
        if (newBody && prevTab === nextTab) {
          newBody.scrollTop = oldScrollTop;
        }
        if (existingWindow.classList.contains('hk-capv')) {
          existingWindow.scrollTop = oldCapvScroll;
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
    const win = root.querySelector('.modal-window, .hk-capv');
    if (win) {
      win.onclick = (e) => e.stopPropagation();
      if (modalKey === 'collection') {
        win.dataset.colTab = this.collectionTab;
      }
    }
  }

  renderActiveModal() {
    const root = document.getElementById('modal-root');
    // Panel bài đã ăn: ẩn lớp cánh hoa rơi + lớp lá bài bay/ghép cặp (nằm trên #app) để không bay đè lên panel
    const isCapvOpen =
      this.activeModal === 'captured_view' && this.engine.phase !== 'PLAYER_KOIKOI_DECISION';
    document.body.classList.toggle('hk-capv-open', isCapvOpen);
    if (isCapvOpen) {
      cardAnimator.clearAllFloaters();
    }

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
      if (root.dataset.activeModalKey !== 'koikoi_decision') soundEngine.playScrollOpen();
      this.koikoiModalMarkup = markup;
      this.updateModalMarkup(root, 'koikoi_decision', markup);
      this.bindKoiKoiDecisionEvents(root);
      return;
    }

    if (!this.activeModal) {
      delete root.dataset.activeModalKey;
      root.replaceChildren();
      // Vào Đấu máy / PvP từ Màn chính rồi đóng bảng mà không chọn gì → mở hiệp với đối thủ hiện tại
      if (this._openingPending && !(this.story && this.story.isOpen())) {
        this._openingPending = false;
        this.runRoundOpeningSequence();
      }
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
      case 'captured_view':
        this.updateModalMarkup(root, 'captured_view', this.buildCapturedViewModalHTML());
        this.bindCapturedViewModalEvents(root);
        break;
      case 'card_inspect':
        this.updateModalMarkup(root, 'card_inspect', this.buildCardInspectModalHTML());
        this.bindCardInspectModalEvents(root);
        break;
      default:
        delete root.dataset.activeModalKey;
        root.replaceChildren();
    }
  }

  // Panel "Bài đã ăn" (mobile): bộ đã thành, bộ sắp thành, 4 hàng Quang/Thú/Dải/Thường
  buildCapturedViewModalHTML() {
    const isOpp = this.capturedViewSide === 'ai';
    const myCards = isOpp ? this.engine.aiCaptured : this.engine.playerCaptured;
    const oppCards = isOpp ? this.engine.playerCaptured : this.engine.aiCaptured;
    const skinId = this.saveData.equippedSkin;
    const summary = this.getCompactYakuSummary(myCards, oppCards, isOpp);
    const inYaku = new Set();
    summary.completed.forEach((y) => (y.cards || []).forEach((id) => inYaku.add(id)));
    const who = isOpp ? this.getOpponentDisplayName() : 'Bạn';
    const pills = [
      ...summary.completed.map((y) => `<span class="hk-capv-pill done">✓ ${y.viName} · ${y.points} điểm</span>`),
      ...summary.candidates.map((c) => `<span class="hk-capv-pill prog">✦ ${c.shortName} ${c.owned}/${c.need}</span>`)
    ];
    const rows = [
      { label: 'Quang', type: 'hikari' },
      { label: 'Thú', type: 'tane' },
      { label: 'Dải', type: 'tanzaku' },
      { label: 'Thường', type: 'kasu' }
    ].map((g) => {
      const list = myCards.filter((c) => c.type === g.type);
      const cards = list.length
        ? list
            .map(
              (c) => `<div class="hk-capv-card${inYaku.has(c.id) ? ' in-yaku' : ''}" title="${c.viName}">${renderCardFaceSVG(c, skinId, false)}</div>`
            )
            .join('')
        : '<span class="hk-capv-empty">Chưa có</span>';
      return `<div class="hk-capv-row"><div class="hk-capv-label">${g.label}<b>${list.length} lá</b></div><div class="hk-capv-cards">${cards}</div></div>`;
    });

    return `
      <div class="hk-capv-backdrop" id="hk-capv-backdrop">
        <div class="hk-capv ${isOpp ? 'is-opp' : 'is-player'}" role="dialog" aria-label="${who} đã ăn">
          <div class="hk-capv-head">
            <h3>${who} đã ăn<small>· ${myCards.length} lá</small></h3>
            <button class="hk-capv-close" id="btn-close-modal" aria-label="Đóng">✕</button>
          </div>
          <div class="hk-capv-yaku">${pills.length ? pills.join('') : '<span class="hk-capv-pill muted">Chưa có bộ nào</span>'}</div>
          ${rows.join('')}
        </div>
      </div>`;
  }

  bindCapturedViewModalEvents(root) {
    const close = () => {
      this.activeModal = null;
      this.renderActiveModal();
      if (this.engine.phase === 'AI_TURN') {
        this.scheduleAiTurn();
      }
    };
    root.querySelector('#btn-close-modal').onclick = close;
    root.querySelector('#hk-capv-backdrop').onclick = (e) => {
      if (e.target === e.currentTarget) close();
    };
  }

  buildCardInspectModalHTML() {
    const inspected = getCardById(this.inspectedCardId) || HANAFUDA_CARDS[0];
    const mInfo = getMonthInfo(inspected.month);
    const typeLabel =
      {
        hikari: 'Quang (20đ)',
        tane: 'Thú (10đ)',
        tanzaku: 'Dải Thơ (5đ)',
        kasu: 'Thường (1đ)'
      }[inspected.type] || `${inspected.points}đ`;

    return `
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window card-inspect-modal-window">
          <div class="modal-header">
            <h2>🔍 Soi Lá Bài 3D · #${inspected.id} ${inspected.viName}</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body card-inspect-body">
            <div class="card-inspect-left">
              <div class="inspector-flippable-card ${this.inspectorFlipped ? 'flipped' : ''}" id="inspector-3d-card">
                <div class="inspector-face front">
                  ${renderCardFaceSVG(inspected, this.saveData.equippedSkin, true, { size: 'lg' })}
                </div>
                <div class="inspector-face back">
                  ${renderCardBackSVG(this.saveData.equippedBack, { size: 'lg' })}
                </div>
              </div>
            </div>
            <div class="card-inspect-right">
              <div class="card-inspect-badges">
                <span class="hk-live-pill done">${mInfo.viName} · ${inspected.kanji}</span>
                <span class="hk-live-pill prog">${typeLabel}</span>
              </div>
              <h3 class="card-inspect-title">${inspected.viName} <small>(${inspected.jpName})</small></h3>
              <p class="card-inspect-lore">${inspected.lore}</p>
              <div class="card-inspect-symbolism">
                <strong>🌸 ${mInfo.flower}:</strong> ${mInfo.symbolism}
              </div>
              <div class="card-inspect-actions">
                <button class="nav-btn" id="btn-flip-inspector">🔄 Lật Mặt Trước / Lưng 3D</button>
                <button class="nav-btn primary-gold" id="btn-open-full-compendium">🎴 Mở Trưng Bày 48 Lá</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindCardInspectModalEvents(root) {
    this.bindCompendiumInspectorFlipEvents(root);
    const closeBtn = root.querySelector('#btn-close-modal');
    if (closeBtn) {
      closeBtn.onclick = () => {
        this.activeModal = null;
        this.renderActiveModal();
      };
    }
    const fullBtn = root.querySelector('#btn-open-full-compendium');
    if (fullBtn) {
      fullBtn.onclick = () => {
        this.collectionTab = 'compendium';
        this.activeModal = 'collection';
        this.renderActiveModal();
      };
    }
    const backdrop = root.querySelector('#modal-backdrop-close');
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target !== e.currentTarget) return;
        this.activeModal = null;
        this.renderActiveModal();
      };
    }
  }

  /**
   * Khung "Bàn Chiếu" dùng chung cho bảng Koi-Koi/Shōbu và bảng kết quả hiệp:
   * khung sơn mài + nền chiếu cói + 2 mép viền gấm, tiêu đề trên bảng sơn mài. CSS ở nhóm .tt-* / .tt-kk trong main.css.
   */
  // footerHtml nằm ngoài .tt-body (vùng cuộn): trên iOS, nút định vị absolute bên trong vùng cuộn tràn bị cắt mất (vẫn bấm được)
  buildScrollModalHTML({ ariaLabel, extraClass = '', kicker = '', title, bodyHtml, footerHtml = '' }) {
    return `
      <div class="modal-backdrop kk-backdrop ${extraClass}">
        <div class="tt-panel tt-kk" role="dialog" aria-label="${ariaLabel.replace(/<[^>]*>/g, '')}">
          <div class="tt-head is-center">
            ${kicker ? `<span class="tt-kicker">${kicker}</span>` : ''}
            <h2 class="tt-title">${title}</h2>
          </div>
          <div class="tt-body">${bodyHtml}</div>
          ${footerHtml ? `<div class="tt-foot">${footerHtml}</div>` : ''}
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
      title: 'Quyết Định Định Mệnh',
      bodyHtml: `
        <div class="tt-card kk-card">
          ${this.buildYakuLinesHTML(evalRes.yakus)}
          <div class="kk-total">
            Tổng Điểm Nếu Dừng (Shōbu): <strong>${totalNow} Điểm</strong>${mult > 1 ? ` <em>(Nhân ×${mult}!)</em>` : ''}
          </div>
        </div>`,
      footerHtml: `
        <div class="kk-actions">
          <button class="tt-dbtn is-dark" id="btn-choose-shobu">
            <span class="kk-btn-main">SHŌBU! <span lang="ja">(勝負)</span></span>
            <span class="kk-btn-sub">Dừng &amp; Ăn ${totalNow} Điểm</span>
          </button>
          <button class="tt-dbtn is-red is-glow" id="btn-choose-koikoi">
            <span class="kk-btn-main">KOI-KOI! <span lang="ja">(こいこい)</span></span>
            <span class="kk-btn-sub">Cược Tiếp Săn Điểm Lớn</span>
          </button>
        </div>`
    });
  }

  bindKoiKoiDecisionEvents(root) {
    root.querySelector('#btn-choose-shobu').onclick = () => {
      // Chạm 2 lần nhanh không được cộng điểm 2 lần
      if (this.engine.phase !== 'PLAYER_KOIKOI_DECISION') return;
      const outcome = this.engine.declareShobu('player');
      this.handleRoundFinished(outcome);
    };
    root.querySelector('#btn-choose-koikoi').onclick = () => {
      if (this.engine.phase !== 'PLAYER_KOIKOI_DECISION') return;
      this.currentDialogue = this.pickRandom(
        this.currentOpponent.dialogues.playerCallKoiKoi
      );
      this.engine.declareKoiKoi('player');
      // Pop-up Koi-Koi của người chơi: avatar lữ khách, cùng chữ + bố cục với pop-up của đối thủ
      const me = getStoryPlayerAvatar(this.saveData);
      this.triggerAnimeCutin(
        me.name,
        me.img,
        'KOI-KOI! (こいこい)',
        `${me.name} tuyên bố cược tiếp để nhân đôi điểm!`,
        me.koikoi,
        me.koikoiScale,
        me.koikoiDrop
      );
      if (this.isMultiplayerMatch()) {
        const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
        multiplayerService.syncRoomState(canonical, {
          ...(this.pendingMpMoveAction || {}),
          type: 'CALL_KOIKOI'
        });
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

    // PvP: chỉ chủ phòng chia bài; khách đã bấm thì khoá nút và hiện đang chờ
    const waitHost = this.isGuestWaitingHost();
    const waitAttr = waitHost ? ' disabled aria-busy="true"' : '';
    const storyEnd = isMatchEnd && this.story && this.story.isStoryMatch();
    const matchResultHtml = isMatchEnd
      ? `<div class="kk-match-result ${playerWonMatch ? 'is-win' : 'is-lose'}">
          ${
            storyEnd
              ? playerWonMatch ? `👑 Bạn đã thắng ${oppDisplayName}!` : `🌸 ${oppDisplayName} thắng trận này.`
              : playerWonMatch
              ? `👑 Chúc mừng! Bạn đã chiến thắng ${oppDisplayName} chung cuộc!`
              : `🌸 ${oppDisplayName} giành chiến thắng chung cuộc sau ${s.totalRounds} tháng. Hãy tái đấu nhé!`
          }
        </div>`
      : '';
    const actionsHtml = storyEnd
      ? `<div class="kk-actions is-single">
          <button class="tt-dbtn is-red is-glow" id="btn-story-reward">
            <span class="kk-btn-main">${playerWonMatch ? 'Nhận phần thưởng' : 'Xem kết quả'}</span>
            <span class="kk-btn-sub">Hành trình 12 tháng</span>
          </button>
        </div>`
      : isMatchEnd
      ? `<div class="kk-actions">
          <button class="tt-dbtn is-red is-glow" id="btn-play-again"${waitAttr}>
            <span class="kk-btn-main">Tái Đấu</span>
            <span class="kk-btn-sub">${waitHost ? 'Đang chờ chủ phòng…' : `Đấu lại với ${oppShortName}`}</span>
          </button>
          <button class="tt-dbtn is-dark" id="btn-pick-new-opp">
            <span class="kk-btn-main">Đổi Đối Thủ</span>
            <span class="kk-btn-sub">Chọn chế độ / đối thủ khác</span>
          </button>
        </div>`
      : `<div class="kk-actions is-single">
          <button class="tt-dbtn is-red is-glow" id="btn-next-round"${waitAttr}>
            <span class="kk-btn-main">Sang ${nextMonthLabel}</span>
            ${waitHost ? '<span class="kk-btn-sub">Đang chờ chủ phòng…</span>' : ''}
          </button>
        </div>`;

    return this.buildScrollModalHTML({
      ariaLabel: `Tháng ${monthOf(s.round)} – ${headline}`,
      extraClass: 'is-round-end',
      kicker: `Tháng ${monthOf(s.round)}`,
      title: headline,
      bodyHtml: `
        <div class="tt-card kk-card">${yakuHtml}</div>
        <div class="kk-scores">
          <div class="kk-score">
            <span class="kk-score-label">Tổng Điểm Bạn</span>
            <span class="kk-score-num">${this.engine.playerScore}</span>
          </div>
          <span class="kk-score-vs" aria-hidden="true">VS</span>
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
        ${matchResultHtml}`,
      footerHtml: actionsHtml
    });
  }

  bindRoundEndEvents(root) {
    const nextBtn = root.querySelector('#btn-next-round');
    if (nextBtn) {
      nextBtn.onclick = () => {
        // Chạm 2 lần nhanh không được nhảy qua 2 ván
        if (this.engine.phase !== 'ROUND_OVER') return;
        // PvP: chỉ chủ phòng chia bài, khách chờ nhận NEXT_ROUND qua onStateReceived
        if (this.waitForHostDeal()) return;
        this.activeModal = null;
        this.bumpMatchToken();
        this.engine.nextRound();
        if (this.isMultiplayerMatch()) {
          const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
          multiplayerService.syncRoomState(canonical, { type: 'NEXT_ROUND' });
        }
        this.renderAll();
        this.runRoundOpeningSequence();
      };
    }
    const againBtn = root.querySelector('#btn-play-again');
    if (againBtn) {
      againBtn.onclick = () => {
        if (this.isMultiplayerMatch()) {
          if (this.activeModal !== 'round_end' || this.waitForHostDeal()) return;
          this.activeModal = null;
          this.rollNewTableFlowerMonth();
          this.bumpMatchToken();
          this.engine.startNewMatch(this.engine.totalRounds);
          const canonical = this.engine.exportCanonicalState(multiplayerService.role, null);
          // Server tự chia lại bộ bài khi nhận REMATCH → chủ phòng dùng đúng bộ đó để hai máy khớp nhau
          multiplayerService
            .syncRoomState(canonical, { type: 'REMATCH' })
            .then((serverState) => {
              if (serverState) this.engine.importCanonicalState(serverState, 'host');
            })
            .catch(() => {})
            .finally(() => {
              this.renderAll();
              this.runRoundOpeningSequence();
            });
        } else {
          this.startMatchWithOpponent(this.currentOpponent.id, this.engine.totalRounds);
        }
      };
    }
    const storyBtn = root.querySelector('#btn-story-reward');
    if (storyBtn) storyBtn.onclick = () => this.story.finishMatch();
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
        <div class="modal-window tt-panel tt-mp" style="width:min(860px, calc(95 * var(--avw, 1vw)));">
          <div class="modal-header tt-head">
            <h2 class="tt-title">⚔️ Ghép Trận <small>Người Thật Trực Tuyến (PvP Online)</small></h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="tt-hero">
              <img src="./public/assets/pvp_arena_banner.webp?v=2" alt="PvP Online Banner" />
              <div class="tt-hero-text">
                <h3>⚔️ Đấu Trường Hoa Bài Trực Tuyến (PvP Online)</h3>
                <p>Hệ thống tự động ghép cặp 2 người chơi đang tìm trận theo thời gian thực qua Server Database & kênh đồng bộ đa Tab tốc độ cao.</p>
              </div>
            </div>

            <div class="tt-card tt-form">
              <label class="tt-label" for="input-pvp-name">👤 Tên Kỳ Thủ Của Bạn Ở Tab Này:</label>
              <input type="text" class="tt-input" id="input-pvp-name" value="${multiplayerService.playerName}" placeholder="Nhập tên hiển thị..." />

              ${
                isPlaying
                  ? `
                <div class="tt-code">
                  <small>🟢 ĐANG ĐẤU TRỰC TIẾP VỚI: ${multiplayerService.opponentName}</small>
                  ${this.buildRoomCodeTilesHTML(`#${multiplayerService.roomCode}`)}
                  <p>Bạn đang ở trong trận PvP trực tuyến. Đóng cửa sổ này để tiếp tục đánh bài!</p>
                </div>
              `
                  : isSearching
                  ? `
                <div class="tt-search"><span class="tt-search-dot" aria-hidden="true"></span>🔍 Đang tìm kiếm đối thủ trực tuyến...</div>
                <p class="tt-help">
                  Hãy mở thêm <strong>1 Tab trình duyệt nữa</strong> và bấm <strong>Ghép Trận (PvP)</strong>, hoặc bấm nút <strong>Mở Tab Thứ 2 Ghép Trận Ngay</strong> bên dưới để 2 tab tự động bắt cặp!
                </p>
                <div class="tt-btn-row">
                  <button class="tt-bigbtn is-dark" id="btn-open-tab2-pvp">🗗 Mở Tab Thứ 2 & Tự Động Ghép Trận Ngay</button>
                  <button class="tt-bigbtn is-washi" id="btn-cancel-pvp">✕ Hủy Tìm Trận</button>
                </div>
              `
                  : `
                <div class="tt-btn-row">
                  <button class="tt-bigbtn is-red" id="btn-start-pvp">
                    ⚔️ Bắt Đầu Tìm Đối Thủ (PvP)
                    <em>Ghép trận tự động trực tuyến</em>
                  </button>
                  <button class="tt-bigbtn is-dark" id="btn-start-and-open-tab2">
                    🗗 Tìm Trận & Mở Luôn Tab 2
                    <em>Tiện lợi để test 2 Tab đối kháng</em>
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

  /** Mã phòng hiển thị như các thẻ gỗ sơn mài, mỗi ký tự một ô */
  buildRoomCodeTilesHTML(code) {
    const chars = Array.from(String(code));
    return `<div class="tt-code-tiles" aria-label="Mã phòng ${code}">${chars
      .map((c) => `<i aria-hidden="true">${c}</i>`)
      .join('')}</div>`;
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
        <div class="modal-window tt-panel tt-mp" style="width:min(920px, calc(95 * var(--avw, 1vw)));">
          <div class="modal-header tt-head">
            <h2 class="tt-title">🏯 Phòng Mã Số <small>Tạo Phòng & Vào Phòng (Mở 2 Tab Chơi Thử)</small></h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="tt-hero is-short">
              <img src="./public/assets/pvp_arena_banner.webp?v=2" alt="Custom Room Banner" />
              <div class="tt-hero-text">
                <h3>🏯 Phòng Trà Đạo Mã Số (Custom Room 2 Tab)</h3>
                <p>Tạo mã phòng riêng ở Tab 1 rồi nhập mã số đó ở Tab 2 (hoặc bấm nút Mở Tab 2 tự động vào phòng) để chơi thử 2 người trực tiếp!</p>
              </div>
            </div>

            ${this.customRoomError ? `<div class="tt-error">⚠️ ${this.customRoomError}</div>` : ''}

            <div class="tt-split">
              <!-- Cột 1: Tạo phòng (Tab 1 - Chủ phòng) -->
              <div class="tt-card tt-form">
                <span class="tt-role is-red">CHỦ PHÒNG (TAB 1)</span>
                <h3 class="tt-form-title">🏯 Tạo Phòng Mã Số Mới</h3>
                <p class="tt-help">
                  Đặt mã phòng tùy ý (VD: <strong>6868</strong>) hoặc để trống để hệ thống tự sinh mã 4 chữ số.
                </p>
                <label class="tt-label" for="input-host-name">Tên của bạn:</label>
                <input type="text" class="tt-input" id="input-host-name" value="${multiplayerService.playerName}" />
                <label class="tt-label" for="input-create-code">Mã số phòng muốn tạo (Tùy chọn):</label>
                <input type="text" class="tt-input" id="input-create-code" placeholder="VD: 6868 (Để trống = Tự tạo mã)" maxlength="8" />

                <button class="tt-bigbtn is-red" id="btn-create-room">🏯 Tạo Phòng Mã Số Ngay</button>

                ${
                  waitingRoomCode
                    ? `
                  <div class="tt-code">
                    <small>${multiplayerService.roomStatus === 'playing' ? '🟢 ĐANG TRONG TRẬN ĐẤU' : '⏳ ĐANG CHỜ NGƯỜI CHƠI THỨ 2 VÀO PHÒNG'}</small>
                    ${this.buildRoomCodeTilesHTML(waitingRoomCode)}
                    <p>Hãy mở Tab 2 và nhập mã <strong>${waitingRoomCode}</strong> ở khung bên phải, hoặc bấm nút dưới đây:</p>
                    <div class="tt-mini-row">
                      <button class="tt-mini" id="btn-open-tab2-room">🗗 Mở Tab 2 & Vào Thẳng Phòng #${waitingRoomCode}</button>
                      <button class="tt-mini" id="btn-copy-room-code">📋 Sao Chép Mã</button>
                    </div>
                  </div>
                `
                    : ''
                }
              </div>

              <!-- Cột 2: Vào phòng bằng mã (Tab 2 - Khách) -->
              <div class="tt-card tt-form">
                <span class="tt-role is-jade">KHÁCH THÁCH ĐẤU (TAB 2)</span>
                <h3 class="tt-form-title">🚪 Nhập Mã Số Để Vào Phòng</h3>
                <p class="tt-help">
                  Nhập mã số phòng đã tạo ở Tab 1 để kết nối 2 Tab và bắt đầu ván bài Hoa đối kháng thời gian thực!
                </p>
                <label class="tt-label" for="input-join-code">Nhập Mã Số Phòng:</label>
                <input type="text" class="tt-input is-code" id="input-join-code" placeholder="Nhập mã phòng (VD: 6868)..." maxlength="8" />

                <button class="tt-bigbtn is-dark" id="btn-join-room">🚪 Vào Phòng Bằng Mã Số</button>

                ${
                  localRooms.length > 0
                    ? `
                  <div class="tt-open-rooms">
                    <small>⚡ Phòng đang mở trên máy của bạn (Bấm để vào ngay):</small>
                    ${localRooms
                      .map(
                        (r) => `
                      <button class="tt-open-room" data-quick-join="${r.roomCode}">🚪 Vào Phòng #${r.roomCode} (${r.hostName || 'Chủ phòng'})</button>`
                      )
                      .join('')}
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
      this.bumpMatchToken();
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
    const defeatedCount = ANIME_OPPONENTS.filter((o) => this.saveData.defeatedOpponents.includes(o.id)).length;
    return `
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window tt-panel tt-opp">
          <div class="modal-header tt-head">
            <h2 class="tt-title">🌸 Đài Khiêu Chiến <small>12 Kỳ Thủ Điển Tích Nhật Bản · 12 Tháng Bài Hoa</small></h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="tt-toolbar">
            <span class="tt-tb-label">Độ dài trận đấu:</span>
            ${[3, 6, 12]
              .map(
                (r) => `
              <button class="tt-tab ${this.engine.totalRounds === r ? 'active' : ''}" data-round-len="${r}">${r} Tháng</button>`
              )
              .join('')}
            <span class="tt-pill">${defeatedCount}/${ANIME_OPPONENTS.length} đã chinh phục</span>
          </div>
          <div class="modal-body">
            <p class="tt-note">
              Chinh phục trọn bộ <strong>12 Nhân Vật Điển Tích Ukiyo-e × Anime</strong> đại diện cho 12 Tháng Bài Hoa (gồm cả <strong>Công Chúa Tsunade</strong> Tháng 7)!
            </p>
            <div class="tt-opp-grid">
              ${ANIME_OPPONENTS.map((opp) => {
                const defeated = this.saveData.defeatedOpponents.includes(opp.id);
                const backReward = opp.unlocksCardBack
                  ? getCardBackById(opp.unlocksCardBack)?.name
                  : '';
                const skinReward = opp.unlocksCardSkin
                  ? getCardSkinById(opp.unlocksCardSkin)?.name
                  : '';

                return `
                  <div class="tt-opp-card ${this.currentOpponent.id === opp.id ? 'is-current' : ''}">
                    <div class="tt-opp-banner">
                      <button class="tt-opp-zoom" data-view-opp="${opp.id}" aria-label="Xem ảnh ${opp.name}">
                        <img src="${opp.avatar}" alt="${opp.name}" />
                        <span class="tt-opp-zoom-hint" aria-hidden="true">⤢ Xem ảnh</span>
                      </button>
                      <span class="tt-opp-month">${opp.monthLabel || `Tháng ${opp.month || 1}`}</span>
                      ${defeated ? '<span class="tt-opp-who is-won">✓ Đã thắng</span>' : ''}
                      <span class="tt-opp-diff">${opp.difficultyLabel}</span>
                    </div>
                    <div class="tt-opp-body">
                      <small class="tt-opp-jp">${opp.jpName}</small>
                      <h3 class="tt-opp-name">${opp.name}</h3>
                      <p class="tt-opp-bio">${opp.bio}</p>
                      <div class="tt-opp-reward">
                        🎁 <strong>Thưởng thắng:</strong> +${opp.rewardCoins} Xu
                        ${backReward ? `<br/>🎴 Mặt lưng: <em>${backReward}</em>` : ''}
                        ${skinReward ? `<br/>🎨 Mặt bài: <em>${skinReward}</em>` : ''}
                      </div>
                      <button class="tt-cta" data-challenge-opp="${opp.id}">🌸 Khiêu Chiến ${opp.name}</button>
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
    root.querySelectorAll('[data-view-opp]').forEach((btn) => {
      btn.onclick = () => this.openCharacterViewer(btn.getAttribute('data-view-opp'));
    });
    root.querySelectorAll('[data-challenge-opp]').forEach((btn) => {
      btn.onclick = () => {
        const oppId = btn.getAttribute('data-challenge-opp');
        this.startMatchWithOpponent(oppId, this.saveData.matchRounds || 3);
      };
    });
  }

  /**
   * Xem ảnh nhân vật toàn màn hình (bấm ảnh trong bảng Chọn đối thủ).
   * Lớp phủ gắn thẳng vào #modal-root, không đi qua renderActiveModal; ← → đổi nhân vật, Esc/chạm nền để đóng.
   */
  openCharacterViewer(oppId) {
    const root = document.getElementById('modal-root');
    if (!root) return;
    let idx = ANIME_OPPONENTS.findIndex((o) => o.id === oppId);
    if (idx < 0) return;
    this.closeCharacterViewer();

    const viewer = document.createElement('div');
    viewer.className = 'tt-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    const total = ANIME_OPPONENTS.length;

    const render = () => {
      const opp = ANIME_OPPONENTS[idx];
      const defeated = this.saveData.defeatedOpponents.includes(opp.id);
      viewer.setAttribute('aria-label', `Ảnh ${opp.name}`);
      setElementMarkup(
        viewer,
        `
        <button class="tt-viewer-close" data-viewer="close" aria-label="Đóng">✕</button>
        <button class="tt-viewer-nav is-prev" data-viewer="prev" aria-label="Nhân vật trước">‹</button>
        <figure class="tt-viewer-stage">
          <div class="tt-viewer-frame">
            <img src="${opp.avatar}" alt="${opp.name}" />
          </div>
          <figcaption class="tt-viewer-plate">
            <span class="tt-viewer-month">${opp.monthLabel || `Tháng ${opp.month || 1}`}</span>
            <small class="tt-viewer-jp">${opp.jpName}</small>
            <h3 class="tt-viewer-name">${opp.name}</h3>
            ${opp.title ? `<div class="tt-viewer-sub">${opp.title.replace(/\s*\(Tháng \d+\)\s*$/, '')}</div>` : ''}
            <div class="tt-viewer-tags">
              <span>${opp.difficultyLabel}</span>
              ${defeated ? '<span class="is-won">✓ Đã thắng</span>' : ''}
            </div>
            <p class="tt-viewer-bio">${opp.bio}</p>
            <button class="tt-cta" data-viewer="challenge">🌸 Khiêu Chiến ${opp.name}</button>
            <span class="tt-viewer-count">${idx + 1} / ${total}</span>
          </figcaption>
        </figure>
        <button class="tt-viewer-nav is-next" data-viewer="next" aria-label="Nhân vật sau">›</button>
      `
      );
    };
    const step = (d) => {
      idx = (idx + d + total) % total;
      render();
    };

    viewer.onclick = (e) => {
      const act = e.target.closest('[data-viewer]')?.getAttribute('data-viewer');
      if (act === 'prev') step(-1);
      else if (act === 'next') step(1);
      else if (act === 'challenge') {
        const oppId = ANIME_OPPONENTS[idx].id;
        this.closeCharacterViewer();
        this.startMatchWithOpponent(oppId, this.saveData.matchRounds || 3);
      } else if (act === 'close' || !e.target.closest('.tt-viewer-frame, .tt-viewer-plate')) {
        this.closeCharacterViewer();
      }
    };
    // Vuốt ngang trên điện thoại để đổi nhân vật
    let touchX = null;
    viewer.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    viewer.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    });
    this.characterViewerKeys = (e) => {
      if (e.key === 'Escape') this.closeCharacterViewer();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else return;
      e.stopPropagation();
    };
    document.addEventListener('keydown', this.characterViewerKeys, true);

    render();
    root.appendChild(viewer);
    this.characterViewer = viewer;
    viewer.querySelector('.tt-viewer-close').focus({ preventScroll: true });
  }

  closeCharacterViewer() {
    if (this.characterViewerKeys) {
      document.removeEventListener('keydown', this.characterViewerKeys, true);
      this.characterViewerKeys = null;
    }
    if (this.characterViewer) {
      this.characterViewer.remove();
      this.characterViewer = null;
    }
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
        <div class="modal-window scroll-modal tt-panel tt-shop">
          <div class="modal-header tt-head">
            <h2 class="tt-title">Bộ Sưu Tập <small>Mặt Lưng · Thiết Kế Bài · Phòng Trưng Bày 3D</small></h2>
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
          ${renderCardFaceSVG(inspected, this.saveData.equippedSkin, true, { size: 'lg' })}
        </div>
        <div class="inspector-face back">
          ${renderCardBackSVG(this.saveData.equippedBack, { size: 'lg' })}
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
        soundEngine.playCardFlip();
        flipCard.classList.toggle('flipped', this.inspectorFlipped);
      };
    }
    if (flipBtn && flipCard) {
      flipBtn.onclick = () => {
        this.inspectorFlipped = !this.inspectorFlipped;
        soundEngine.playCardFlip();
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
          alert(`Bạn cần ${back.price} Xu Hoa để mở khóa "${back.name}"! Hãy thắng thêm ván bài để nhận Xu Hoa.`);
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
        <div class="modal-window scroll-modal is-gacha tt-panel tt-shop">
          <div class="modal-header tt-head">
            <h2 class="tt-title">Điện Cầu May <small>Omikuji · Sưu tầm Mặt Lưng &amp; Bộ Bài Hiếm</small></h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="tt-card gacha-hero">
              <div class="tt-gacha-kicker">🌸 Ước nguyện đền hoa anh đào 🌸</div>
              <h3 class="gacha-title">Rút Quẻ Mở Hộp Sơn Mài Edo</h3>
              <p class="gacha-desc">
                Cơ hội trúng tất cả <strong>10 Thiết Kế Mặt Lưng</strong> và <strong>6 Bộ Mặt Bài Nghệ Thuật</strong> (bao gồm cả bậc Huyền Thoại SSR &amp; Thần Thoại UR!). Nếu rút trùng sẽ được hoàn trả <strong>+90 Xu Hoa Lộc</strong>!
              </p>

              <div class="tt-gacha-actions">
                <button class="tt-gacha-btn is-dark gacha-btn" id="btn-gacha-1">
                  <img class="gacha-tube" src="./public/assets/koikoi_scroll/omikuji_1.webp" alt="" draggable="false" />
                  <span class="tt-gacha-text"><b>Rút 1 Quẻ Hoa</b><em>🪙 150 Xu Hoa</em></span>
                </button>
                <button class="tt-gacha-btn is-red is-glow gacha-btn" id="btn-gacha-5">
                  <img class="gacha-tube" src="./public/assets/koikoi_scroll/omikuji_5.webp?v=2" alt="" draggable="false" />
                  <span class="tt-gacha-text"><b>Rút 5 Quẻ Liên Hoàn</b><em>🪙 650 Xu Hoa · Tiết kiệm 100 Xu</em></span>
                </button>
              </div>

              <div class="gacha-balance">
                Số dư hiện tại: <strong>🪙 ${this.saveData.coins.toLocaleString('vi-VN')} Xu Hoa</strong>
              </div>
              ${
                this.gachaResults.length > 0
                  ? `
              <div class="tt-results">
                <h4 class="gacha-results-title">🎉 Kết quả rút quẻ vừa rồi</h4>
                <div class="tt-res-cards">
                  ${this.gachaResults
                    .map((r) => {
                      const rar = RARITY_CONFIG[r.item.rarity];
                      const sampleCard = getCardById(r.sampleCardId || 45) || HANAFUDA_CARDS[0];
                      const kindLabel = r.kind === 'back' ? 'Mặt Lưng Bài' : `Lá: ${sampleCard.viName}`;
                      return `
                    <div class="tt-res-card ${r.isNew ? 'is-new' : ''}" title="${r.item.name} · ${rar.label} · ${kindLabel}">
                      <div class="tt-res-face">
                        ${r.kind === 'back' ? renderCardBackSVG(r.item.id) : renderCardFaceSVG(sampleCard, r.item.id, true)}
                      </div>
                      <span class="tt-res-name">${r.item.name.replace(/\s*\(.*\)\s*$/, '')}</span>
                      <span class="tt-res-badge">${r.isNew ? '✨ MỚI MỞ KHÓA!' : '🔄 Trùng (+90 Xu)'}</span>
                    </div>`;
                    })
                    .join('')}
                </div>
              </div>`
                  : ''
              }
            </div>
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
        alert(`Bạn cần ${cost} Xu Hoa để rút quẻ! Hãy đấu thêm ván bài để nhận Xu Hoa nhé.`);
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
      const dupCount = results.filter((r) => !r.isNew).length;
      if (dupCount > 0) {
        setTimeout(() => {
          soundEngine.playCoinReward(Math.min(5, dupCount + 2));
        }, 420);
      }
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
    const pSum = this.getCompactYakuSummary(this.engine.playerCaptured, this.engine.aiCaptured, false);
    const oSum = this.getCompactYakuSummary(this.engine.aiCaptured, this.engine.playerCaptured, true);
    const oppName = this.getOpponentDisplayName();

    return `
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window rules-modal-window tt-panel tt-rules">
          <div class="hk-compact-only hk-sheet-grabber" aria-hidden="true"></div>
          <div class="modal-header tt-head">
            <h2 class="tt-title">📜 Bảng Tổ Hợp Yaku & Luật Chơi</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="hk-compact-only hk-yaku-sheet-live">
              <div class="hk-yaku-live-col is-player">
                <div class="hk-yaku-live-head">
                  <strong>Bạn đã ăn (${this.engine.playerCaptured.length} lá)</strong>
                  <span>${pSum.chipLabel}</span>
                </div>
                <div class="hk-yaku-live-tags">
                  ${
                    pSum.completed.length + pSum.candidates.length > 0
                      ? [
                          ...pSum.completed.map(
                            (y) => `<span class="hk-live-pill done">✓ ${y.viName} (${y.points}đ)</span>`
                          ),
                          ...pSum.candidates.map(
                            (c) => `<span class="hk-live-pill prog">✦ ${c.shortName} ${c.owned}/${c.need}</span>`
                          )
                        ].join('')
                      : '<span class="hk-live-pill muted">Chưa có bộ sắp thành</span>'
                  }
                </div>
              </div>
              <div class="hk-yaku-live-col is-opp">
                <div class="hk-yaku-live-head">
                  <strong>${oppName} (${this.engine.aiCaptured.length} lá)</strong>
                  <span>${oSum.chipLabel}</span>
                </div>
                <div class="hk-yaku-live-tags">
                  ${
                    oSum.completed.length + oSum.candidates.length > 0
                      ? [
                          ...oSum.completed.map(
                            (y) => `<span class="hk-live-pill warn">⚠ ${y.viName} (${y.points}đ)</span>`
                          ),
                          ...oSum.candidates.map(
                            (c) => `<span class="hk-live-pill warn">▲ ${c.shortName} ${c.owned}/${c.need}</span>`
                          )
                        ].join('')
                      : '<span class="hk-live-pill muted">Chưa có bộ sắp thành</span>'
                  }
                </div>
              </div>
            </div>

            <button class="tut-replay-banner" id="btn-rules-open-tutorial">
              <img src="${getOpponentById('ayame').avatar}" alt="" />
              <span><strong>Lần đầu chơi?</strong> Xem hướng dẫn từng bước cùng Ayame ▶</span>
            </button>
            <div class="rules-quick-box tt-card">
              <strong>🌸 Cách chơi cơ bản cực dễ trong 30 giây:</strong><br/>
              1. Bộ bài Hoa gồm <strong>48 lá</strong> chia đều cho <strong>12 Tháng</strong> (mỗi tháng 4 lá ứng với 1 loài hoa/cây).<br/>
              2. Đến lượt mình, bạn thực hiện <strong>2 bước</strong>:<br/>
              &nbsp;&nbsp;• <strong>Bước 1 (Đánh bài trên tay):</strong> Chọn 1 lá trên tay. Nếu trên bàn có lá <strong>cùng Tháng</strong>, bạn ăn cả 2 lá đó về! Nếu không có lá cùng tháng, lá bài được đặt ngửa xuống bàn.<br/>
              &nbsp;&nbsp;• <strong>Bước 2 (Lật bài rút):</strong> Hệ thống tự lật 1 lá từ chồng bài rút. Nếu trùng Tháng với bài trên bàn, bạn ăn thêm cặp đó về!<br/>
              3. Khi các lá bài bạn ăn được tạo thành một <strong>Tổ hợp điểm (Yaku)</strong>, bạn được quyền chọn:<br/>
              &nbsp;&nbsp;• <strong>SHŌBU (勝負):</strong> Dừng hiệp đấu ngay để ghi điểm an toàn.<br/>
              &nbsp;&nbsp;• <strong>KOI-KOI (こいこい):</strong> Cược tiếp để ghép thêm Yaku mới! Đạt từ <strong>7 điểm trở lên sẽ được NHÂN ĐÔI (×2)</strong>, nhưng nếu đối thủ tạo được Yaku trước khi bạn dừng, đối thủ sẽ cướp chiến thắng và nhân đôi điểm của họ!
            </div>

            <h3 class="rules-section-h3">
              🏆 Bảng Tổ Hợp Điểm Yaku (Chuẩn Koi-Koi Nhật Bản)
            </h3>

            <div class="yaku-catalog-grid">
              ${YAKU_CATALOG.map(
                (y) => `
                <div class="yaku-catalog-card">
                  <div class="yaku-catalog-head">
                    <strong class="yaku-catalog-title">${y.viName} ・ <span class="yaku-catalog-jp">${y.jpName}</span></strong>
                    <span class="yaku-catalog-pts">${y.basePoints} Điểm</span>
                  </div>
                  ${this.renderYakuCardStrip(y)}
                  <p class="yaku-catalog-desc">${y.description}</p>
                  ${
                    y.bonusRule
                      ? `<div class="yaku-catalog-bonus">${y.bonusRule}</div>`
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
    if (this._pendingRoundOpening) {
      this._pendingRoundOpening = false;
      this.runRoundOpeningSequence();
      return;
    }
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
