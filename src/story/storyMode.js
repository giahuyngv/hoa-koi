// Màn chính (chọn chế độ) + chế độ Cốt truyện "Hành trình 12 tháng".
// Vẽ vào #story-root (lớp phủ trong #app, dưới #modal-root). Trận đấu dùng bàn chơi thật của game:
// startMonthMatch() gọi app.startMatchWithOpponent(..., { story: true }), main.js báo lại từng hiệp
// (onRoundFinished) và khi bấm "Nhận phần thưởng" ở bảng chung cuộc (finishMatch).
import { getOpponentById } from '../data/charactersData.js?v=25';
import {
  STORY_PLAYABLE_MONTHS,
  STORY_MATCH_ROUNDS,
  STORY_SEASONS,
  STORY_MONTH_KANJI,
  STORY_MONTHS,
  STORY_CRESTS,
  STORY_CREST_COLORS,
  STORY_TRAVELERS,
  normalizeStoryProgress
} from '../data/storyData.js?v=1';
import { soundEngine } from '../audio/soundEngine.js?v=25';

const STORY_CARD_IMG = (id) => `./public/assets/cards/card_${id}.webp?v=26`;
const STORY_CARD_BACK = './public/assets/backs/back_urushi_red.webp?v=26';
const STORY_OPP_IDS = ['tsuruhime', 'michizane', 'koharu', 'shiori', 'ayame', 'yukiho', 'tsunade', 'kaguya', 'kikumaru', 'renji', 'haruto', 'amaterasu'];

const storyEsc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const storyStars = (n, max = 3) =>
  Array.from({ length: max }, (_, i) => `<i class="${i < n ? 'on' : ''}">★</i>`).join('');
const storyDiff = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

function storyProgressOf(saveData) {
  if (!saveData.storyProgress || saveData.storyProgress._norm !== true) {
    saveData.storyProgress = normalizeStoryProgress(saveData.storyProgress);
    Object.defineProperty(saveData.storyProgress, '_norm', { value: true, enumerable: false });
  }
  return saveData.storyProgress;
}

const storyOwnedOf = (sp, m) => sp.owned[m] || (sp.owned[m] = []);

// Chân dung chủ tháng mở khi thu đủ 4 lá tháng đó (chỉ các tháng có cốt truyện)
function storyPortraitInfo(sp, key) {
  if (STORY_TRAVELERS[key]) return { ...STORY_TRAVELERS[key], locked: false };
  const opp = getOpponentById(key);
  if (!opp || opp.id !== key) return null;
  const locked = !(STORY_MONTHS[opp.month] && storyOwnedOf(sp, opp.month).length === 4);
  return {
    name: opp.name.split(' ')[0],
    img: opp.avatar,
    cut: opp.portrait,
    koikoi: opp.koikoiArt || opp.portrait,
    koikoiScale: opp.koikoiScale,
    koikoiDrop: opp.koikoiDrop,
    pos: '50% 16%',
    month: opp.month,
    locked
  };
}

/** Avatar người chơi (dùng ở bàn đấu máy, pop-up Koi-Koi, cốt truyện). */
export function getStoryPlayerAvatar(saveData) {
  const sp = storyProgressOf(saveData);
  let p = storyPortraitInfo(sp, sp.avatar.portrait);
  if (!p || p.locked) p = { ...STORY_TRAVELERS.m1 };
  return {
    created: !!sp.started,
    name: sp.avatar.name.trim() || 'Lữ khách',
    img: p.img,
    cut: p.cut,
    pos: p.pos,
    koikoi: p.koikoi,
    koikoiScale: p.koikoiScale || 1.1,
    koikoiDrop: p.koikoiDrop || 0,
    crest: sp.avatar.crest,
    color: sp.avatar.color
  };
}

function storyMonHTML(av) {
  const col = STORY_CREST_COLORS.find((c) => c.id === av.color) || STORY_CREST_COLORS[0];
  const crest = STORY_CRESTS[av.crest] || STORY_CRESTS.sakura;
  return `<span class="st-mon" style="background:${col.bg}"><svg viewBox="0 0 100 100" aria-hidden="true">${crest.svg('#ffd98a')}</svg></span>`;
}

/** Avatar tròn = chân dung + gia huy. */
export function storyAvatarHTML(saveData, size, override) {
  const me = getStoryPlayerAvatar(saveData);
  const av = { ...storyProgressOf(saveData).avatar, ...(override || {}) };
  let img = me.img;
  let pos = me.pos;
  if (override && override.portrait) {
    const p = storyPortraitInfo(storyProgressOf(saveData), override.portrait);
    if (p) { img = p.img; pos = p.pos; }
  }
  return `<span class="st-avatar" style="--sz:${size}px"><span class="st-face" style="background-image:url('${img}');background-position:${pos}"></span>${storyMonHTML(av)}</span>`;
}

export class StoryController {
  constructor(app) {
    this.app = app;
    this.root = document.getElementById('story-root');
    this.screen = null; // null = ẩn | 'home' | 'intro' | 'avatar' | 'map' | 'scene' | 'result'
    this.panel = null; // 'settings' trên màn chính
    this.dlg = { month: 1, i: 0, phase: 'pre' };
    this.match = null; // { month, challengeMet }
    this.result = null;
    storyProgressOf(app.saveData);
    if (this.root) {
      this.root.addEventListener('click', (e) => this.onClick(e));
      this.root.addEventListener('input', (e) => this.onInput(e));
    }
    document.addEventListener('keydown', (e) => {
      if (this.screen === 'scene' && (e.key === ' ' || e.key === 'Enter') && !/^(BUTTON|INPUT)$/.test(e.target.tagName)) {
        e.preventDefault();
        this.advance();
      } else if (e.key === 'Escape' && this.panel) {
        this.panel = null;
        this.render();
      }
    });
  }

  get sp() {
    return storyProgressOf(this.app.saveData);
  }

  isOpen() {
    return !!this.screen;
  }

  // ---------------- Trận cốt truyện ----------------
  isStoryMatch() {
    return !!this.match && !this.app.isMultiplayerMatch();
  }

  /** main.js gọi mỗi khi bắt đầu trận đấu máy: đổi đối thủ thì thoát trận cốt truyện. */
  onMatchStarted(opponentId, isStory) {
    if (!this.match) return;
    if (!isStory && STORY_MONTHS[this.match.month].oppId !== opponentId) {
      this.match = null;
      return;
    }
    this.match.challengeMet = false;
  }

  onRoundFinished(outcome) {
    if (!this.isStoryMatch()) return;
    const M = STORY_MONTHS[this.match.month];
    const ctx = {
      playerWonRound: outcome.winner === 'player',
      playerCardIds: (this.app.engine.playerCaptured || []).map((c) => c.id)
    };
    if (M.check(ctx)) this.match.challengeMet = true;
  }

  startMonthMatch(m) {
    const M = STORY_MONTHS[m];
    this.match = { month: m, challengeMet: false };
    this.hide();
    this.app.startMatchWithOpponent(M.oppId, STORY_MATCH_ROUNDS, { story: true });
  }

  /** Bấm "Nhận phần thưởng" ở bảng chung cuộc của trận cốt truyện. */
  finishMatch() {
    if (!this.match) return;
    const m = this.match.month;
    const e = this.app.engine;
    const win = e.playerScore > e.aiScore;
    const ch = win && this.match.challengeMet;
    const gap = win && e.playerScore - e.aiScore >= 5;
    const n = (win ? 1 : 0) + (ch ? 1 : 0) + (gap ? 1 : 0);
    const sp = this.sp;
    const draws = [];
    let unlocked = false;
    if (win) {
      sp.stars[m] = Math.max(sp.stars[m] || 0, n);
      if (!sp.cleared.includes(m)) sp.cleared.push(m);
      const own = storyOwnedOf(sp, m);
      const before = own.length;
      for (let i = 0; i < n; i++) {
        const k = Math.floor(Math.random() * 4);
        const isNew = !own.includes(k);
        if (isNew) own.push(k);
        else sp.petals += 1;
        draws.push({ k, isNew });
      }
      unlocked = before < 4 && own.length === 4;
    }
    // Sao mới có thể đạt thành tựu Xuân Viên Mãn (main.js checkAchievements)
    const ach = this.app.checkAchievements ? this.app.checkAchievements() : [];
    this.result = { month: m, win, ch, gap, n, draws, unlocked, ach, playerScore: e.playerScore, aiScore: e.aiScore };
    this.match = null;
    this.app.persistSave();
    this.app.activeModal = null;
    this.app.renderActiveModal();
    this.show('result');
    if (win) setTimeout(() => soundEngine.playCoinReward(Math.max(1, n) + 2), 350);
  }

  /** Nút "Cốt truyện" trên thanh trên khi đang đấu: bỏ trận dở (hỏi trước) và về bản đồ 4 mùa. */
  leaveMatchToMap() {
    if (this.isStoryMatch() && !window.confirm('Rời trận cốt truyện đang đấu và về bản đồ? Trận này sẽ không được tính.')) return;
    this.app.goHome();
    this.show('map');
  }

  // ---------------- Hiện / ẩn ----------------
  show(screen) {
    this.screen = screen;
    this.panel = null;
    this.app.settingsMenuOpen = false;
    this.render();
  }

  showHome() {
    this.show('home');
  }

  hide() {
    this.screen = null;
    this.panel = null;
    this.render();
  }

  render() {
    if (!this.root) return;
    document.body.classList.toggle('hk-story-open', !!this.screen);
    if (!this.screen) {
      this.root.replaceChildren();
      this.root.hidden = true;
      return;
    }
    this.root.hidden = false;
    const views = {
      home: () => this.homeView(),
      intro: () => this.introView(),
      avatar: () => this.avatarView(),
      map: () => this.mapView(),
      scene: () => this.sceneView(),
      result: () => this.resultView()
    };
    const html = (views[this.screen] || views.home)() + (this.screen === 'home' ? this.panelView() : '');
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script, iframe, object, embed').forEach((n) => n.remove());
    this.root.replaceChildren(...Array.from(doc.body.childNodes));
    this.root.dataset.screen = this.screen;
  }

  // ---------------- Khung chung ----------------
  totalStars() {
    return Object.values(this.sp.stars).reduce((a, b) => a + b, 0);
  }

  cardsCollected() {
    return Object.values(this.sp.owned).reduce((a, b) => a + b.length, 0);
  }

  playerName() {
    return this.sp.avatar.name.trim() || 'Lữ khách';
  }

  topbar(title, jp) {
    const sd = this.app.saveData;
    return `<header class="st-topbar">
      <button class="tt-dbtn is-dark st-back" data-go="home" aria-label="Về màn chính"><span class="kk-btn-main">‹ Màn chính</span></button>
      <div class="st-plaque"><b>${title}</b>${jp ? `<span lang="ja">${jp}</span>` : ''}</div>
      <div class="st-stats">
        <span class="st-pill" title="Sao"><i class="st-ic-star">★</i><b>${this.totalStars()}</b>/36</span>
        <span class="st-pill" title="Lá thu lại"><i class="st-ic-card"></i><b>${this.cardsCollected()}</b>/48</span>
        <span class="st-pill" title="Lá trùng đổi thành mảnh hoa"><i class="st-ic-petal">✿</i><b>${this.sp.petals}</b></span>
        <button class="st-chip" data-go="avatar" aria-label="Sửa avatar">${storyAvatarHTML(sd, 46)}<span class="st-chip-tx"><small>Lữ khách</small><b>${storyEsc(this.playerName())}</b></span></button>
      </div>
    </header>`;
  }

  // ---------------- Màn chính ----------------
  homeView() {
    const sd = this.app.saveData;
    const sp = this.sp;
    const made = sp.started;
    const storySub = made ? `Chương Xuân · đã thắng ${sp.cleared.length}/3 tháng` : 'Đi qua 12 tháng, thu lại bộ bài hoa';
    const face = (id) => `<span style="background-image:url('${getOpponentById(id).avatar}')"></span>`;
    const version = typeof APP_VERSION !== 'undefined' ? APP_VERSION : 'dev';
    return `<section class="st-screen st-home">
      <div class="st-home-top">
        <div class="st-logo"><b lang="ja">花恋</b><span>HOA KOI</span><small>Đấu Bài Hoa Nhật Bản</small></div>
        <div class="st-home-right">
          ${made ? `<button class="st-chip is-big" data-go="avatar">${storyAvatarHTML(sd, 60)}<span class="st-chip-tx"><small>Lữ khách</small><b>${storyEsc(this.playerName())}</b></span></button>` : ''}
          <button class="st-gear" data-panel="settings" title="Cài đặt" aria-label="Cài đặt"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#ffd98a" fill-rule="evenodd" d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 0 0-.61.22L2.71 8.84a.5.5 0 0 0 .12.64l2.03 1.58a7.07 7.07 0 0 0 0 1.88l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.3.61.22l2.39-.96c.49.38 1.03.7 1.62.94l.36 2.54c.04.24.25.42.5.42h3.84c.25 0 .46-.18.5-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.48 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Z"/></svg></button>
        </div>
      </div>
      <div class="st-modes">
        <button class="st-mode is-story" data-mode="story">
          <span class="st-mode-art" style="background-image:url('${getOpponentById('ayame').avatar}')"></span>
          <span class="st-new">MỚI</span>
          <span class="st-mode-tx">
            <span class="st-mode-jp" lang="ja">花の旅</span>
            <b>Cốt truyện</b>
            <small>Hành trình 12 tháng · ${storySub}</small>
            <span class="st-mode-meta"><span class="st-pill"><i class="st-ic-card"></i><b>${this.cardsCollected()}</b>/48 lá</span><span class="st-pill"><i class="st-ic-star">★</i><b>${this.totalStars()}</b>/36 sao</span></span>
            <span class="tt-dbtn is-red is-glow st-mode-cta"><span class="kk-btn-main">${made ? 'Tiếp tục hành trình' : 'Bắt đầu'}</span></span>
          </span>
        </button>
        <button class="st-mode is-vsai" data-mode="pve">
          <span class="st-mode-art is-trio">${face('koharu')}${face('kaguya')}${face('renji')}</span>
          <span class="st-mode-tx"><span class="st-mode-jp" lang="ja">対局</span><b>Đấu máy</b><small>12 kỳ thủ · độ khó 1–5 sao</small></span>
        </button>
        <button class="st-mode is-pvp" data-mode="pvp">
          <span class="st-mode-art" style="background-image:url('./public/assets/pvp_arena_banner.webp')"></span>
          <span class="st-vs-row">${storyAvatarHTML(sd, 84)}<span class="st-vs">VS</span><span class="st-avatar st-unknown" style="--sz:84px"><span class="st-face"></span><b>?</b></span></span>
          <span class="st-mode-tx"><span class="st-mode-jp" lang="ja">対戦</span><b>PvP</b><small>Ghép trận nhanh với người chơi khác</small></span>
        </button>
        <button class="st-mode is-room" data-mode="custom">
          <span class="st-mode-art" style="background-image:url('./public/assets/room_torii_banner.webp?v=1')"></span>
          <span class="st-mode-tx"><span class="st-mode-jp" lang="ja">部屋</span><b>Phòng mã</b><small>Tạo phòng hoặc nhập mã để đấu bạn bè</small></span>
        </button>
      </div>
      <div class="st-foot">v${version}</div>
    </section>`;
  }

  panelView() {
    if (this.panel !== 'settings') return '';
    const row = (k, l, d, on) =>
      `<div class="st-set-row"><span><b>${l}</b><small>${d}</small></span><button class="st-tgl" data-set="${k}" aria-pressed="${on}" aria-label="${l}"></button></div>`;
    const version = typeof APP_VERSION !== 'undefined' ? APP_VERSION : 'dev';
    return `<div class="st-backdrop"><div class="tt-panel st-modal is-narrow" role="dialog" aria-modal="true" aria-label="Cài đặt">
      <div class="tt-head"><div class="tt-title">Cài đặt <small lang="ja">設定</small></div><button class="st-x" data-close aria-label="Đóng">✕</button></div>
      <div class="tt-body">
        <div class="tt-card st-set">
          ${row('sfx', 'Hiệu ứng âm thanh', 'Tiếng lật bài, ăn bộ', soundEngine.sfxEnabled)}
          ${row('bgm', 'Nhạc nền', 'Shamisen theo mùa', soundEngine.bgmEnabled)}
          ${row('dark', 'Giao diện tối', 'Sơn mài Urushi', this.app.darkMode)}
          <div class="st-set-row"><span><b>Hướng dẫn chơi</b><small>Ayame dẫn từng bước</small></span><button class="tt-dbtn is-dark st-sm" data-tutorial><span class="kk-btn-main">Xem</span></button></div>
          <div class="st-set-row"><span><b>Phiên bản</b></span><span class="st-ver">v${version}</span></div>
        </div>
        <div class="st-row-end"><button class="tt-dbtn is-dark st-sm" data-close><span class="kk-btn-main">‹ Về màn chính</span></button></div>
      </div>
    </div></div>`;
  }

  // ---------------- Mở đầu cốt truyện ----------------
  introView() {
    const ayame = getOpponentById('ayame');
    return `<section class="st-screen st-center">
      <div class="tt-panel st-intro">
        <div class="tut-guide"><div class="tut-portrait"><img src="${ayame.avatar}" alt="Ayame Shirakawa"></div>
          <div class="tut-nameplate"><strong>Ayame Shirakawa</strong><span>Hồ Tiên Cầu Yatsuhashi · người dẫn đường</span></div></div>
        <div class="tut-main">
          <div class="tut-topline"><span class="tut-step-kicker">Cốt truyện · Chương Xuân</span><button class="tut-skip-btn" data-go="home">Về màn chính</button></div>
          <div class="st-big-jp" lang="ja">花の旅</div>
          <div class="tut-bubble"><h3>Hành trình 12 tháng</h3>
            <p>Bộ bài hoa của xứ này đã bị xé thành mười hai phần. Mỗi tinh linh của một tháng giữ bốn lá và chỉ trả lại cho <b>người thắng họ</b>.</p>
            <p>Hãy đi cùng tôi qua từng tháng, từ hạc tháng Giêng đến phượng hoàng tháng Chạp. Thu đủ <b>48 lá</b> thì mùa xuân mới trở lại.</p></div>
          <div class="st-intro-rules">
            <div class="tt-card"><b>★ Sao</b><span>1 sao khi thắng, +1 khi đạt thử thách, +1 khi thắng cách biệt từ 5 điểm.</span></div>
            <div class="tt-card"><b>🎴 Lá bài</b><span>Mỗi sao là 1 lượt bốc trong 4 lá của tháng. Lá trùng thành 1 mảnh hoa.</span></div>
            <div class="tt-card"><b>👤 Avatar</b><span>Thu đủ 4 lá của tháng nào thì mở chân dung chủ tháng đó.</span></div>
          </div>
          <div class="st-row-end"><button class="tt-dbtn is-red is-glow" data-go="avatar"><span class="kk-btn-main">Tạo lữ khách</span><span class="kk-btn-sub">Chọn chân dung và gia huy</span></button></div>
        </div>
      </div>
    </section>`;
  }

  // ---------------- Tạo / sửa avatar ----------------
  avatarView() {
    const sp = this.sp;
    const a = sp.avatar;
    const keys = [...Object.keys(STORY_TRAVELERS), ...STORY_OPP_IDS];
    const ports = keys
      .map((k) => {
        const p = storyPortraitInfo(sp, k);
        if (!p) return '';
        return `<button class="st-port ${p.locked ? 'is-locked' : ''}" data-portrait="${k}" aria-pressed="${a.portrait === k}" aria-label="${storyEsc(p.name)}" ${p.locked ? 'disabled' : ''}>
          <img src="${p.img}" alt="" loading="lazy"><span>${p.locked ? `🔒 Tháng ${p.month}` : storyEsc(p.name)}</span></button>`;
      })
      .join('');
    const head = sp.started
      ? this.topbar('Lữ khách của bạn', '旅人')
      : `<header class="st-topbar"><button class="tt-dbtn is-dark st-back" data-go="intro"><span class="kk-btn-main">‹ Quay lại</span></button><div class="st-plaque"><b>Tạo lữ khách</b><span lang="ja">旅人</span></div><div></div></header>`;
    return `<section class="st-screen">
      ${head}
      <div class="tt-panel st-fill st-av">
        <div class="tt-body st-av-body">
          <div class="tt-card st-av-form">
            <label class="st-fl" for="st-name">Tên hiển thị</label>
            <input class="st-inp" id="st-name" maxlength="16" placeholder="Lữ khách" value="${storyEsc(a.name)}" autocomplete="off">
            <div class="st-fl">Chân dung <small>4 lữ khách · 12 chủ tháng mở khi thu đủ 4 lá</small></div>
            <div class="st-ports">${ports}</div>
            <div class="st-av-split">
              <div><div class="st-fl">Gia huy (kamon)</div>
                <div class="st-crests">${Object.entries(STORY_CRESTS).map(([k, c]) => `<button class="st-crest" data-crest="${k}" aria-pressed="${a.crest === k}" title="${c.name}" aria-label="${c.name}"><svg viewBox="0 0 100 100">${c.svg('#2e1a10')}</svg></button>`).join('')}</div></div>
              <div><div class="st-fl">Màu nền gia huy</div>
                <div class="st-swatches">${STORY_CREST_COLORS.map((c) => `<button class="st-sw" data-color="${c.id}" aria-pressed="${a.color === c.id}" title="${c.name}" aria-label="${c.name}" style="background:${c.bg}"></button>`).join('')}</div></div>
            </div>
          </div>
          <div class="st-av-preview" id="st-pv">${this.previewInner()}</div>
        </div>
      </div>
    </section>`;
  }

  previewInner() {
    const sd = this.app.saveData;
    const a = this.sp.avatar;
    const me = getStoryPlayerAvatar(sd);
    const col = STORY_CREST_COLORS.find((c) => c.id === a.color) || STORY_CREST_COLORS[0];
    return `<div class="st-pv-card"><img src="${me.img}" alt="Chân dung">${storyMonHTML(a)}</div>
      <div class="st-pv-name">${storyEsc(this.playerName())}</div>
      <div class="st-pv-sub">Gia huy ${(STORY_CRESTS[a.crest] || STORY_CRESTS.sakura).name} · nền ${col.name}</div>
      <div class="st-pv-mini">${storyAvatarHTML(sd, 54)}<small>Hiện ở góc trên, khi bạn nói trong hội thoại, trên bàn đấu và pop-up Koi-Koi</small></div>
      <button class="tt-dbtn is-red" data-start><span class="kk-btn-main">${this.sp.started ? 'Lưu và về bản đồ' : 'Lên đường'}</span></button>`;
  }

  // ---------------- Bản đồ 4 mùa ----------------
  mapView() {
    const sp = this.sp;
    const nextM = STORY_PLAYABLE_MONTHS.find((m) => !sp.cleared.includes(m));
    const seasons = STORY_SEASONS.map((se) => {
      const open = se.months.some((m) => STORY_MONTHS[m]);
      return `<div class="tt-card st-season ${open ? '' : 'is-locked'}">
        <div class="st-season-h"><b>${se.name}</b><span lang="ja">${se.jp}</span><small>${open ? `Chương ${se.name}` : 'Sắp ra mắt'}</small></div>
        ${se.months.map((m) => this.monthCard(m, nextM)).join('')}</div>`;
    }).join('');
    const done = STORY_PLAYABLE_MONTHS.every((m) => sp.cleared.includes(m));
    return `<section class="st-screen">
      ${this.topbar('Bản đồ bốn mùa', '四季の旅')}
      <div class="tt-panel st-fill st-map">
        <div class="tt-body">
          <div class="st-collect"><span class="tut-step-kicker">Bộ bài hoa thu lại</span><div class="st-bar"><i style="width:${(this.cardsCollected() / 48) * 100}%"></i></div><b>${this.cardsCollected()}/48 lá</b></div>
          <div class="st-seasons">${seasons}</div>
          ${done ? `<p class="st-done">Đã thắng cả 3 tháng mùa Xuân. ${this.cardsCollected() < 12 ? 'Đấu lại để thu đủ lá còn thiếu và mở avatar. ' : ''}Chương Hạ sẽ mở ở bản sau.</p>` : ''}
        </div>
      </div>
    </section>`;
  }

  monthCard(m, nextM) {
    const opp = getOpponentById(STORY_OPP_IDS[m - 1]);
    const M = STORY_MONTHS[m];
    if (!M) {
      return `<button class="st-month is-soon" disabled><span class="st-month-pic"><img src="${opp.avatar}" alt="" loading="lazy"><span lang="ja">${STORY_MONTH_KANJI[m - 1]}</span></span>
        <span class="st-month-tx"><small>Tháng ${m}</small><b>${storyEsc(opp.name)}</b><span class="st-soon">Sắp ra mắt</span></span></button>`;
    }
    const sp = this.sp;
    const unlocked = m === 1 || sp.cleared.includes(m - 1);
    const own = storyOwnedOf(sp, m);
    const mini = M.cards
      .map(([id], i) => `<img class="${own.includes(i) ? '' : 'is-miss'}" src="${own.includes(i) ? STORY_CARD_IMG(id) : STORY_CARD_BACK}" alt="">`)
      .join('');
    return `<button class="st-month ${m === nextM ? 'is-next' : ''} ${unlocked ? '' : 'is-locked'}" data-month="${m}" ${unlocked ? '' : 'disabled'}>
      <span class="st-month-pic"><img src="${opp.avatar}" alt="" loading="lazy">${unlocked ? '' : '<span class="st-lock">🔒</span>'}</span>
      <span class="st-month-tx"><small>Tháng ${m} · <span lang="ja">${STORY_MONTH_KANJI[m - 1]}</span> ${storyEsc(M.flower)}</small><b>${storyEsc(opp.name)}</b>
        <span class="st-stars">${storyStars(sp.stars[m] || 0)}</span>
        <span class="st-mini">${mini}<em>${own.length}/4${own.length === 4 ? ' · đã mở avatar' : ''}</em></span></span>
      ${m === nextM ? '<span class="st-next-tag">Tiếp theo</span>' : ''}${!unlocked ? '<span class="st-lock-tx">Thắng tháng trước để mở</span>' : ''}
    </button>`;
  }

  // ---------------- Hội thoại ----------------
  startDialogue(m, phase) {
    this.dlg = { month: m, i: 0, phase };
    this.show('scene');
  }

  sceneView() {
    const sd = this.app.saveData;
    const { month, i, phase } = this.dlg;
    const M = STORY_MONTHS[month];
    const opp = getOpponentById(M.oppId);
    const ayame = getOpponentById('ayame');
    const lines = phase === 'pre' ? M.pre : M.post;
    const [spk, txt] = lines[i];
    const me = spk === 'me';
    const ay = spk === 'ayame';
    const name = me ? this.playerName() : ay ? 'Ayame Shirakawa' : opp.name;
    const role = me ? 'Lữ khách' : ay ? 'Người dẫn đường' : `Chủ tháng ${month} · ${opp.title.replace(/\s*\(Tháng \d+\)/, '')}`;
    const last = i === lines.length - 1;
    const nextLabel = last ? (phase === 'pre' ? 'Vào trận ▸' : 'Về bản đồ ▸') : 'Tiếp ▸';
    const meAv = getStoryPlayerAvatar(sd);
    const left = me
      ? `<div class="st-actor is-left is-on"><img src="${meAv.cut}" alt="${storyEsc(name)}"></div>`
      : `<div class="st-actor is-left ${ay ? 'is-on' : ''}"><img src="${ayame.portrait}" alt="Ayame"></div>`;
    return `<section class="st-screen st-scene">
      ${this.topbar(`Tháng ${month} · ${storyEsc(opp.title.replace(/\s*\(Tháng \d+\)/, ''))}`, STORY_MONTH_KANJI[month - 1])}
      <div class="st-stage" data-stage>
        <span class="st-watermark" lang="ja">${STORY_MONTH_KANJI[month - 1]}</span>
        ${phase === 'pre' ? `<div class="st-challenge"><span lang="ja">${M.chKanji}</span><div><small>Thử thách của tháng</small><b>${storyEsc(M.challenge)}</b></div></div>` : ''}
        ${left}
        <div class="st-actor is-right ${spk === 'opp' ? 'is-on' : ''}"><img src="${opp.portrait}" alt="${storyEsc(opp.name)}"></div>
        <div class="st-say ${me ? 'is-me' : ''}">
          <div class="tut-nameplate st-np">${me ? storyAvatarHTML(sd, 40) : ''}<span><strong>${storyEsc(name)}</strong><span>${storyEsc(role)}</span></span></div>
          <div class="tut-bubble st-bubble"><p>${storyEsc(txt)}</p>
            <div class="st-say-ctl"><span class="st-hint">${i + 1}/${lines.length} · chạm hoặc Space</span>
              ${last ? '' : '<button class="tut-skip-btn" data-skip>Bỏ qua</button>'}
              <button class="tt-dbtn is-red st-sm" data-next><span class="kk-btn-main">${nextLabel}</span></button></div></div>
        </div>
      </div>
    </section>`;
  }

  advance() {
    const M = STORY_MONTHS[this.dlg.month];
    const lines = this.dlg.phase === 'pre' ? M.pre : M.post;
    if (this.dlg.i < lines.length - 1) {
      this.dlg.i += 1;
      this.render();
      return;
    }
    if (this.dlg.phase === 'pre') {
      this.startMonthMatch(this.dlg.month);
    } else {
      this.show('map');
    }
  }

  // ---------------- Kết quả + bốc lá ----------------
  resultView() {
    const sd = this.app.saveData;
    const r = this.result;
    const M = STORY_MONTHS[r.month];
    const opp = getOpponentById(M.oppId);
    const short = opp.name.split(' ')[0];
    const own = storyOwnedOf(this.sp, r.month);
    const line = (ok, t, d) =>
      `<div class="kk-yaku-line st-line ${ok ? '' : 'is-off'}"><span class="kk-yaku-name">${t}<small>${storyEsc(d)}</small></span><span class="kk-yaku-pts">${ok ? '+1 ★' : '—'}</span></div>`;
    let body = '';
    if (r.win) {
      const cards = M.cards
        .map(([id, nm], i) => {
          const isNew = r.draws.some((d) => d.k === i && d.isNew);
          const dup = r.draws.some((d) => d.k === i && !d.isNew);
          if (!own.includes(i)) return `<div class="st-rcard is-back" style="--d:${i}"><img src="${STORY_CARD_BACK}" alt="Chưa có"><small>Chưa có</small></div>`;
          return `<div class="st-rcard ${isNew || dup ? 'is-drawn' : 'is-dim'}" style="--d:${i}">${isNew ? '<span class="st-tag is-new">MỚI</span>' : dup ? '<span class="st-tag is-dup">TRÙNG</span>' : ''}<img src="${STORY_CARD_IMG(id)}" alt="${nm}"><small>${nm}</small></div>`;
        })
        .join('');
      const nNew = r.draws.filter((d) => d.isNew).length;
      const nDup = r.draws.length - nNew;
      const unlock = r.unlocked
        ? `<div class="kk-unlock st-unlock">${storyAvatarHTML(sd, 64, { portrait: opp.id })}<div><span class="kk-unlock-title">Mở avatar ${storyEsc(opp.name)}!</span><br><small>Chọn trong Sửa avatar.</small></div></div>`
        : own.length < 4
          ? `<p class="st-draws">Còn thiếu ${4 - own.length} lá. Đấu lại để bốc tiếp và mở avatar ${storyEsc(short)}.</p>`
          : '';
      body = `<div class="st-rcards">${cards}</div>
        <p class="st-draws">Bốc ${r.draws.length} lần: <b>${nNew} lá mới</b>${nDup ? `, ${nDup} lá trùng đổi thành <b>${nDup} mảnh hoa ✿</b>` : ''}. Đã có ${own.length}/4 lá tháng ${r.month}.</p>${unlock}`;
    } else {
      body = `<p class="st-draws">${storyEsc(opp.name)} vẫn giữ bốn lá của tháng ${r.month}. Thử lại nhé.</p>`;
    }
    const actions = r.win
      ? `<button class="tt-dbtn is-red" data-post><span class="kk-btn-main">Nghe ${storyEsc(short)} nói ▸</span></button><button class="tt-dbtn is-dark" data-retry><span class="kk-btn-main">Đấu lại</span><span class="kk-btn-sub">Bốc thêm lá còn thiếu</span></button>`
      : `<button class="tt-dbtn is-red" data-retry><span class="kk-btn-main">Đấu lại</span></button><button class="tt-dbtn is-dark" data-go="map"><span class="kk-btn-main">Về bản đồ</span></button>`;
    return `<section class="st-screen st-center st-dim">
      <div class="tt-panel tt-kk st-result">
        <div class="tt-head is-center"><span class="tt-kicker">Tháng ${r.month} · ${storyEsc(opp.title.replace(/\s*\(Tháng \d+\)/, ''))} · ${r.playerScore}–${r.aiScore}</span><div class="tt-title">${r.win ? `Thắng ${storyEsc(short)}!` : 'Chưa thắng được'}</div></div>
        <div class="tt-body">
          <div class="st-res-top">
            <div class="st-res-who">${storyAvatarHTML(sd, 84)}<b>${storyEsc(this.playerName())}</b></div>
            <div class="st-res-stars">${storyStars(r.n)}</div>
            <div class="tt-card st-res-lines">${line(r.win, 'Thắng trận', 'Thắng là mở tháng sau')}${line(r.ch, 'Thử thách', M.challenge)}${line(r.gap, 'Cách biệt', 'Hơn từ 5 điểm')}</div>
          </div>
          ${body}
          ${(r.ach || []).map((it) => `<div class="kk-unlock"><span class="kk-unlock-title">${storyEsc(it.type)}</span><br><strong>${storyEsc(it.name)}</strong></div>`).join('')}
          <div class="kk-actions">${actions}</div>
        </div>
      </div>
    </section>`;
  }

  // ---------------- Sự kiện ----------------
  onClick(e) {
    const bd = e.target.closest('.st-backdrop');
    if (bd && e.target === bd) {
      this.panel = null;
      this.render();
      return;
    }
    const t = e.target.closest('button');
    if (!t) {
      if (this.screen === 'scene' && e.target.closest('[data-stage]')) this.advance();
      return;
    }
    const ds = t.dataset;
    const sp = this.sp;
    if ('close' in ds) { this.panel = null; this.render(); return; }
    if (ds.go) { this.show(ds.go); return; }
    if (ds.panel) { this.panel = ds.panel; this.render(); return; }
    if (ds.mode === 'story') { this.show(sp.started ? 'map' : 'intro'); return; }
    if (ds.mode === 'pve' || ds.mode === 'pvp' || ds.mode === 'custom') { this.hide(); this.app.enterModeFromHome(ds.mode); return; }
    if ('start' in ds) {
      sp.started = true;
      this.app.persistSave();
      this.app.renderAll();
      this.show('map');
      return;
    }
    if (ds.set) {
      if (ds.set === 'dark') this.app.toggleDarkMode();
      else if (ds.set === 'bgm') soundEngine.toggleBgm();
      else if (ds.set === 'sfx' && soundEngine.toggleSfx()) soundEngine.playCardFlip();
      this.render();
      return;
    }
    if ('tutorial' in ds) { this.panel = null; this.render(); this.app.openTutorial(); return; }
    if (ds.portrait) { sp.avatar.portrait = ds.portrait; this.app.persistSave(); this.render(); return; }
    if (ds.crest) { sp.avatar.crest = ds.crest; this.app.persistSave(); this.render(); return; }
    if (ds.color) { sp.avatar.color = ds.color; this.app.persistSave(); this.render(); return; }
    if (ds.month) { this.startDialogue(Number(ds.month), 'pre'); return; }
    if ('next' in ds) { this.advance(); return; }
    if ('skip' in ds) {
      const M = STORY_MONTHS[this.dlg.month];
      this.dlg.i = (this.dlg.phase === 'pre' ? M.pre : M.post).length - 1;
      this.render();
      return;
    }
    if ('post' in ds) { this.startDialogue(this.result.month, 'post'); return; }
    if ('retry' in ds) { this.startDialogue(this.result.month, 'pre'); }
  }

  onInput(e) {
    if (e.target.id !== 'st-name') return;
    this.sp.avatar.name = e.target.value.slice(0, 16);
    this.app.persistSave();
    const pv = this.root.querySelector('#st-pv');
    if (pv) {
      const doc = new DOMParser().parseFromString(this.previewInner(), 'text/html');
      pv.replaceChildren(...Array.from(doc.body.childNodes));
    }
  }
}
