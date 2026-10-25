// 2.5D Card Flight, Pairing Impact ("Pachin!"), and Capture Tray Animator
// Uses hardware-accelerated Web Animations API to fly cards from Hand/Deck -> Field -> Captured Tray.

import { renderCardFaceSVG, renderCardBackSVG } from './cardArtwork.js?v=25';

export class CardFlightAnimator {
  constructor() {
    this.layer = null;
    this.speedMultiplier = 1;
  }

  setSpeedMultiplier(mult) {
    const val = Number(mult);
    if (val > 0 && isFinite(val)) {
      this.speedMultiplier = val;
    }
  }

  scaleMs(baseMs) {
    return Math.max(18, Math.round(baseMs / (this.speedMultiplier || 1)));
  }

  ensureLayer() {
    if (!this.layer || !document.body.contains(this.layer)) {
      this.layer = document.createElement('div');
      this.layer.id = 'fx-card-flight-layer';
      this.layer.className = 'fx-card-flight-layer';
      document.body.appendChild(this.layer);
    }
    return this.layer;
  }

  /**
   * Dọn sạch các lá bài đang bay / ghép cặp trên lớp hiệu ứng (khi mở modal đè lên bàn)
   */
  clearAllFloaters() {
    if (this.layer) {
      this.layer.replaceChildren();
    }
    document.querySelectorAll('[data-field-id]').forEach((el) => {
      if (el.style.opacity === '0') el.style.opacity = '1';
    });
  }

  /**
   * Helper to get bounding rect or fallback center rect
   */
  getRect(elOrSelector, fallbackX = window.innerWidth / 2, fallbackY = window.innerHeight / 2) {
    const el =
      typeof elOrSelector === 'string'
        ? document.querySelector(elOrSelector)
        : elOrSelector;
    if (el && el.getBoundingClientRect) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) return r;
    }
    return {
      left: fallbackX - 38,
      top: fallbackY - 59,
      width: 76,
      height: 118,
      right: fallbackX + 38,
      bottom: fallbackY + 59
    };
  }

  /**
   * Creates a floating card DOM element at a specific rect
   */
  createFloatingCard(card, skinId, rect, backId = null) {
    const layer = this.ensureLayer();
    const wrapper = document.createElement('div');
    wrapper.className = 'fx-floating-card';
    wrapper.style.left = `${rect.left}px`;
    wrapper.style.top = `${rect.top}px`;
    wrapper.style.width = `${rect.width || 76}px`;
    wrapper.style.height = `${rect.height || 118}px`;

    const svgMarkup = backId
      ? renderCardBackSVG(backId)
      : renderCardFaceSVG(card, skinId, true);
    const doc = new DOMParser().parseFromString(String(svgMarkup), 'text/html');
    wrapper.replaceChildren(...Array.from(doc.body.childNodes));

    layer.appendChild(wrapper);
    return wrapper;
  }

  /**
   * Creates a golden shockwave ring at (x, y) when cards slam together on the board
   */
  spawnImpactShockwave(x, y, isBright = false) {
    const layer = this.ensureLayer();
    const ring = document.createElement('div');
    ring.className = `fx-impact-shockwave ${isBright ? 'bright-shockwave' : ''}`;
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    layer.appendChild(ring);
    setTimeout(() => ring.remove(), this.scaleMs(650));
  }

  /**
   * Pulses the target captured tray when cards arrive
   */
  pulseCapturedTray(actor) {
    const trayId = actor === 'player' ? '#player-captured-tray' : '#ai-captured-tray';
    const tray = document.querySelector(trayId);
    if (!tray) return;
    tray.classList.remove('tray-receive-pulse');
    void tray.offsetWidth;
    tray.classList.add('tray-receive-pulse');
    setTimeout(() => tray.classList.remove('tray-receive-pulse'), this.scaleMs(600));
  }

  /**
   * Smoothly animates existing field cards when:
   * 1) A 9th card is added -> Row 1 & Row 2 gently shift downward to open Row 3 at the top
   * 2) A card in Row 1 or Row 2 is captured while Row 3 has cards -> Row 3 card(s) glide into the empty slot(s) in Row 1/2,
   *    and if Row 3 becomes empty, Row 1 & Row 2 gently shift back to their 2-row position.
   */
  animateFieldRelocations(
    prevFieldRects,
    { delayMs = 0, durationMs = 350, relocatedIds = [] } = {}
  ) {
    if (!prevFieldRects) return Promise.resolve();
    const relocatedSet = new Set(relocatedIds.map(Number));
    const animations = [];
    const fieldEls = document.querySelectorAll('[data-field-id]');

    fieldEls.forEach((el) => {
      const id = Number(el.getAttribute('data-field-id'));
      const prev = prevFieldRects[id];
      if (!prev) return;
      const curr = el.getBoundingClientRect();
      if (!curr || curr.width === 0) return;

      // Rect đo theo px màn hình; transform áp trong #app đã scale -> quy đổi về px thiết kế
      const uiScale = window.HK_UI_SCALE || 1;
      const dx = (prev.left - curr.left) / uiScale;
      const dy = (prev.top - curr.top) / uiScale;
      if (Math.abs(dx) < 1.5 && Math.abs(dy) < 1.5) return;

      const isSlotHop = relocatedSet.has(id) || Math.abs(dx) > 8;
      if (isSlotHop) {
        el.style.zIndex = '38';
      }

      const keyframes = isSlotHop
        ? [
            {
              transform: `translate3d(${dx}px, ${dy}px, 0px) scale(1) rotateZ(0deg)`
            },
            {
              transform: `translate3d(${dx * 0.45}px, ${dy * 0.45 - 18}px, 0px) scale(1.08) rotateZ(-3deg)`,
              offset: 0.52
            },
            {
              transform: 'translate3d(0px, 0px, 0px) scale(1) rotateZ(0deg)'
            }
          ]
        : [
            {
              transform: `translate3d(${dx}px, ${dy}px, 0px)`
            },
            {
              transform: 'translate3d(0px, 0px, 0px)'
            }
          ];

      const anim = el.animate(keyframes, {
        duration: this.scaleMs(isSlotHop ? durationMs + 40 : durationMs),
        delay: this.scaleMs(delayMs),
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'backwards'
      });

      animations.push(
        anim.finished
          .catch(() => {})
          .finally(() => {
            if (isSlotHop) {
              el.style.zIndex = '';
            }
          })
      );
    });

    return Promise.all(animations);
  }

  /**
   * Scenario 1: Card flies from Hand (or Deck) onto an empty spot on the Field (no match)
   */
  async animateCardToFieldSlot({
    card,
    skinId,
    fromRect,
    toFieldCardId,
    onLandSound
  }) {
    if (document.body.classList.contains('hk-capv-open')) {
      if (onLandSound) onLandSound();
      return;
    }
    const targetEl = document.querySelector(`[data-field-id="${toFieldCardId}"]`);
    const toRect = this.getRect(
      targetEl,
      window.innerWidth * 0.5,
      window.innerHeight * 0.42
    );

    if (targetEl) {
      targetEl.style.opacity = '0';
    }

    const floater = this.createFloatingCard(card, skinId, fromRect);
    const dx = toRect.left - fromRect.left;
    const dy = toRect.top - fromRect.top;
    const scaleX = toRect.width / (fromRect.width || 76);
    const scaleY = toRect.height / (fromRect.height || 118);

    const flightFrames = [
      {
        transform: 'translate3d(0px, 0px, 0px) scale(1) rotateZ(0deg)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.65)'
      },
      {
        transform: `translate3d(${dx * 0.55}px, ${dy * 0.55 - 42}px, 0px) scale(1.16) rotateZ(-4deg)`,
        boxShadow: '0 28px 45px rgba(0,0,0,0.85)',
        offset: 0.55
      },
      {
        transform: `translate3d(${dx}px, ${dy}px, 0px) scale(${scaleX}, ${scaleY}) rotateZ(0deg)`,
        boxShadow: '0 4px 10px rgba(0,0,0,0.6)'
      }
    ];
    // perf-low (iOS/mobile): chỉ animate transform, giữ bóng tĩnh của .fx-floating-card
    if (document.body.classList.contains('perf-low')) {
      flightFrames.forEach((f) => delete f.boxShadow);
    }
    const anim = floater.animate(
      flightFrames,
      {
        duration: this.scaleMs(330),
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      }
    );

    await anim.finished;
    if (onLandSound) onLandSound();
    this.spawnImpactShockwave(
      toRect.left + toRect.width / 2,
      toRect.top + toRect.height / 2,
      false
    );

    if (targetEl) {
      targetEl.style.opacity = '1';
    }
    floater.remove();
  }

  /**
   * Scenario 2: Card flies from Hand (or Deck) onto a matching Field Card,
   * pairs up on the board with a "Pachin!" impact, then BOTH cards fly together into the actor's Captured Tray!
   */
  async animateCaptureSequence({
    actor,
    playedCard,
    matchedCards,
    skinId,
    fromRect,
    fieldTargetRect,
    onImpactSound
  }) {
    if (document.body.classList.contains('hk-capv-open')) {
      const isBright =
        playedCard?.type === 'hikari' ||
        playedCard?.id === 33 ||
        (matchedCards || []).some((c) => c.type === 'hikari' || c.id === 33);
      if (onImpactSound) onImpactSound(isBright);
      return;
    }
    const primaryTarget = matchedCards[0];
    const targetRect =
      fieldTargetRect ||
      this.getRect(
        `[data-field-id="${primaryTarget?.id}"]`,
        window.innerWidth * 0.5,
        window.innerHeight * 0.42
      );

    // Create floating representations for the already-sitting field card(s) at targetRect
    const fieldFloaters = matchedCards.map((mCard, idx) => {
      const r = {
        ...targetRect,
        left: targetRect.left + idx * 6,
        top: targetRect.top - idx * 4
      };
      return this.createFloatingCard(mCard, skinId, r);
    });

    // Create floating card for the incoming played/drawn card starting at fromRect
    const incomingFloater = this.createFloatingCard(playedCard, skinId, fromRect);
    incomingFloater.style.zIndex = '220';

    // Impact point is slightly offset on top of the field card so both cards are visible in the pair!
    const pairLandLeft = targetRect.left + 12;
    const pairLandTop = targetRect.top - 10;
    const dx1 = pairLandLeft - fromRect.left;
    const dy1 = pairLandTop - fromRect.top;
    const scale1 = targetRect.width / (fromRect.width || 76);

    // PHASE 1: Fly from Hand/Deck to slam onto the Field Card
    const flyToFieldAnim = incomingFloater.animate(
      [
        {
          transform: 'translate3d(0px, 0px, 0px) scale(1) rotateZ(0deg)'
        },
        {
          transform: `translate3d(${dx1 * 0.5}px, ${dy1 * 0.5 - 52}px, 0px) scale(1.22) rotateZ(-8deg)`,
          offset: 0.55
        },
        {
          transform: `translate3d(${dx1}px, ${dy1}px, 0px) scale(${scale1 * 1.06}) rotateZ(7deg)`
        }
      ],
      {
        duration: this.scaleMs(320),
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      }
    );

    await flyToFieldAnim.finished;

    // IMPACT ("Pachin!") + Shockwave + Pair Lock Highlight
    const isBright =
      playedCard.type === 'hikari' ||
      playedCard.id === 33 ||
      matchedCards.some((c) => c.type === 'hikari' || c.id === 33);

    if (onImpactSound) onImpactSound(isBright);
    this.spawnImpactShockwave(
      targetRect.left + targetRect.width / 2,
      targetRect.top + targetRect.height / 2,
      isBright
    );

    // Add golden pair glow to both cards while they lock together on the board
    incomingFloater.classList.add('fx-paired-glow');
    fieldFloaters.forEach((f) => {
      f.classList.add('fx-paired-glow');
      f.animate(
        [
          { transform: 'scale(1) rotateZ(0deg)' },
          { transform: 'scale(1.08) rotateZ(-5deg)' }
        ],
        { duration: this.scaleMs(160), fill: 'forwards', easing: 'ease-out' }
      );
    });

    // Hold the paired cards on the board briefly so the player admires the match
    await new Promise((r) => setTimeout(r, this.scaleMs(250)));

    // PHASE 2: Fly the entire paired stack together into the actor's Captured Tray!
    const traySelector =
      actor === 'player' ? '#player-captured-tray' : '#ai-captured-tray';
    const trayRect = this.getRect(
      traySelector,
      window.innerWidth - 150,
      actor === 'player' ? window.innerHeight * 0.55 : window.innerHeight * 0.22
    );

    const destCenterX = trayRect.left + trayRect.width * 0.45 - targetRect.width / 2;
    const destCenterY = trayRect.top + trayRect.height * 0.48 - targetRect.height / 2;

    // Animate all field floaters + incoming floater flying together to the tray
    const allPromises = [];

    fieldFloaters.forEach((fEl, idx) => {
      const fDx = destCenterX - targetRect.left + idx * 4;
      const fDy = destCenterY - targetRect.top - idx * 4;
      const a = fEl.animate(
        [
          {
            transform: 'translate3d(0px, 0px, 0px) scale(1.08) rotateZ(-5deg)',
            opacity: 1
          },
          {
            transform: `translate3d(${fDx * 0.5}px, ${fDy * 0.5 - 30}px, 0px) scale(0.85) rotateZ(-12deg)`,
            opacity: 1,
            offset: 0.5
          },
          {
            transform: `translate3d(${fDx}px, ${fDy}px, 0px) scale(0.36) rotateZ(0deg)`,
            opacity: 0.2
          }
        ],
        {
          duration: this.scaleMs(390),
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        }
      );
      allPromises.push(a.finished);
    });

    const incDx = destCenterX + 8 - fromRect.left;
    const incDy = destCenterY - 6 - fromRect.top;
    const incAnim = incomingFloater.animate(
      [
        {
          transform: `translate3d(${dx1}px, ${dy1}px, 0px) scale(${scale1 * 1.06}) rotateZ(7deg)`,
          opacity: 1
        },
        {
          transform: `translate3d(${(dx1 + incDx) * 0.5}px, ${(dy1 + incDy) * 0.5 - 35}px, 0px) scale(0.88) rotateZ(14deg)`,
          opacity: 1,
          offset: 0.5
        },
        {
          transform: `translate3d(${incDx}px, ${incDy}px, 0px) scale(0.36) rotateZ(4deg)`,
          opacity: 0.2
        }
      ],
      {
        duration: this.scaleMs(390),
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );
    allPromises.push(incAnim.finished);

    await Promise.all(allPromises);

    this.pulseCapturedTray(actor);
    fieldFloaters.forEach((f) => f.remove());
    incomingFloater.remove();
  }

  /**
   * Scenario 3: Bàn cờ mở trận - Chia bài tuần tự từng lá một (24 lá: Đối thủ -> Chiếu -> Tay mình x 8 vòng)
   * Bay đúng tâm, đúng scale và đúng độ nghiêng 2.5D ở từng góc bàn cờ (perspective, board-tilt).
   * Co giãn theo nút tốc độ qua scaleMs (~2s ở 1x).
   */
  async animateRoundDeal({
    deckSelector = '#draw-pile-stack',
    aiElements = [],
    fieldElements = [],
    playerElements = [],
    fieldCards = [],
    playerCards = [],
    skinId = 'standard',
    equippedBack = 'back-standard',
    aiBackId = null,
    onDealSound = null,
    isCancelled = null
  } = {}) {
    const deckRect = this.getRect(deckSelector);
    if (!deckRect || deckRect.width === 0) return;

    const startCenterX = deckRect.left + deckRect.width * 0.5;
    const startCenterY = deckRect.top + deckRect.height * 0.5;

    // Lấy góc tilt 2.5D hiện tại của bàn và tâm bàn cờ để tính góc nghiêng phối cảnh
    const tiltStr = getComputedStyle(document.documentElement).getPropertyValue('--board-tilt').trim() || '21deg';
    const isPerfLow = document.body.classList.contains('perf-low');
    const boardTiltDeg = isPerfLow ? 0 : parseFloat(tiltStr) || 21;

    const boardEl = document.querySelector('.tabletop-25d-board');
    const boardRect = boardEl ? boardEl.getBoundingClientRect() : null;
    const boardCenterX = boardRect ? boardRect.left + boardRect.width * 0.5 : window.innerWidth * 0.5;

    const allTargets = [...aiElements, ...fieldElements, ...playerElements];
    allTargets.forEach((el) => {
      if (el) el.classList.add('card-deal-hidden');
    });

    const activeFloaters = new Set();
    const flightPromises = [];

    // Chia tuần tự từng lá một: 8 vòng x 3 nơi = 24 lá
    const roundsCount = 8;
    const stepInterval = this.scaleMs(102);
    const flightDuration = this.scaleMs(345);

    let stepIndex = 0;

    for (let r = 0; r < roundsCount; r++) {
      if (isCancelled && isCancelled()) break;

      // Mỗi vòng chia tuần tự từng lá: 1. Đối thủ, 2. Chiếu, 3. Tay mình
      const sequence = [
        {
          actor: 'ai',
          targetEl: aiElements[r],
          cardObj: null,
          backId: aiBackId || equippedBack
        },
        {
          actor: 'field',
          targetEl: fieldElements[r],
          cardObj: fieldCards[r],
          backId: null
        },
        {
          actor: 'player',
          targetEl: playerElements[r],
          cardObj: playerCards[r],
          backId: null
        }
      ];

      for (const item of sequence) {
        if (isCancelled && isCancelled()) break;

        const targetEl = item.targetEl;
        if (!targetEl) continue;

        if (onDealSound) {
          onDealSound(stepIndex, item.actor);
        }

        const toRect = this.getRect(targetEl);
        const targetCenterX = toRect.left + toRect.width * 0.5;
        const targetCenterY = toRect.top + toRect.height * 0.5;

        // Vector di chuyển tâm bài chính xác tuyệt đối
        const dx = targetCenterX - startCenterX;
        const dy = targetCenterY - startCenterY;
        const scaleX = toRect.width / (deckRect.width || 76);
        const scaleY = toRect.height / (deckRect.height || 118);

        // Độ lệch tâm theo trục X của slot đích (-1 đến +1)
        const relX = boardRect && boardRect.width > 0 ? (targetCenterX - boardCenterX) / (boardRect.width * 0.5) : 0;
        const clampedRelX = Math.max(-1.1, Math.min(1.1, relX));

        let targetTiltX = 0;
        let targetTiltY = 0;
        let targetTiltZ = 0;

        if (item.actor === 'player') {
          // Tay người chơi: dock phẳng ở dưới, không nghiêng bàn
          targetTiltX = 0;
          targetTiltY = 0;
          targetTiltZ = clampedRelX * 2.2;
        } else if (item.actor === 'field') {
          // Chiếu: nằm trên mặt bàn nghiêng 2.5D, góc xoay phối cảnh theo góc bàn trái/phải
          targetTiltX = boardTiltDeg;
          targetTiltY = isPerfLow ? 0 : -clampedRelX * (boardTiltDeg / 21) * 3.2;
          targetTiltZ = isPerfLow ? 0 : clampedRelX * (boardTiltDeg / 21) * 1.5;
        } else {
          // Tay đối thủ: đỉnh xa nhất trên bàn cờ
          targetTiltX = boardTiltDeg;
          targetTiltY = isPerfLow ? 0 : -clampedRelX * (boardTiltDeg / 21) * 2.6;
          targetTiltZ = isPerfLow ? 0 : clampedRelX * (boardTiltDeg / 21) * 1.2;
        }

        // Tạo floating card tại đúng tâm cọc bài
        const floater = this.createFloatingCard(
          item.cardObj,
          skinId,
          deckRect,
          item.backId
        );
        floater.style.left = `${startCenterX - deckRect.width * 0.5}px`;
        floater.style.top = `${startCenterY - deckRect.height * 0.5}px`;
        floater.style.width = `${deckRect.width}px`;
        floater.style.height = `${deckRect.height}px`;
        floater.style.transformOrigin = 'center center';
        activeFloaters.add(floater);

        const midDx = dx * 0.5;
        const archHeight = item.actor === 'ai' ? 18 : item.actor === 'player' ? 34 : 24;
        const midDy = dy * 0.5 - archHeight;
        const midTiltX = (boardTiltDeg + targetTiltX) * 0.5 + 4;
        const midTiltZ = (dx > 0 ? 5 : -5) + targetTiltZ * 0.5;
        const midScale = ((1 + Math.max(scaleX, scaleY)) * 0.5) * 1.08;

        const p = new Promise((resolve) => {
          const anim = floater.animate(
            [
              {
                transform: `translate3d(0px, 0px, 0px) perspective(1200px) rotateX(${boardTiltDeg}deg) rotateY(0deg) rotateZ(0deg) scale(1)`,
                opacity: 0.95
              },
              {
                transform: `translate3d(${midDx}px, ${midDy}px, 30px) perspective(1200px) rotateX(${midTiltX}deg) rotateY(${-clampedRelX * 5}deg) rotateZ(${midTiltZ}deg) scale(${midScale})`,
                opacity: 1,
                offset: 0.5
              },
              {
                transform: `translate3d(${dx}px, ${dy}px, 0px) perspective(1200px) rotateX(${targetTiltX}deg) rotateY(${targetTiltY}deg) rotateZ(${targetTiltZ}deg) scale(${scaleX}, ${scaleY})`,
                opacity: 1
              }
            ],
            {
              duration: flightDuration,
              easing: 'cubic-bezier(0.18, 0.95, 0.32, 1)',
              fill: 'forwards'
            }
          );

          anim.finished
            .catch(() => {})
            .finally(() => {
              targetEl.classList.remove('card-deal-hidden');
              activeFloaters.delete(floater);
              floater.remove();
              resolve();
            });
        });

        flightPromises.push(p);
        stepIndex++;
        await new Promise((r) => setTimeout(r, stepInterval));
      }
    }

    await Promise.all(flightPromises);
    if (!isCancelled || !isCancelled()) {
      await new Promise((r) => setTimeout(r, this.scaleMs(210)));
    }

    allTargets.forEach((el) => {
      if (el) el.classList.remove('card-deal-hidden');
    });
    activeFloaters.forEach((f) => f.remove());
    activeFloaters.clear();
  }
}

export const cardAnimator = new CardFlightAnimator();
