// Authentic Hanafuda Koi-Koi Game State Machine & Anime AI Decision Engine

import { HANAFUDA_CARDS } from '../data/cardsData.js';
import { evaluateCapturedYaku, checkInitialHandYaku } from '../data/yakuData.js';

/**
 * So sánh 2 lá bài để chọn người đi trước (親決め - Oya Kime):
 * 1. Tháng nhỏ hơn đi trước (Tháng 1 < Tháng 2 < ... < Tháng 12)
 * 2. Cùng tháng: So điểm lá bài (Hikari 20 > Tane 10 > Tanzaku 5 > Kasu 1)
 * Trả về < 0 nếu cardA thắng, > 0 nếu cardB thắng, 0 nếu hòa (cần bốc lại).
 */
export function compareDealerCards(cardA, cardB) {
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

export class KoiKoiEngine {
  constructor() {
    this.totalRounds = 3;
    this.currentRound = 1;
    this.playerScore = 0;
    this.aiScore = 0;
    this.dealer = 'player'; // 'player' or 'ai'

    this.deck = [];
    this.field = [];
    this.fieldSlots = Array(12).fill(null);
    this.lastFieldRelocations = [];
    this.lastRow3Opened = false;
    this.lastRow3Closed = false;
    this.playerHand = [];
    this.aiHand = [];
    this.playerCaptured = [];
    this.aiCaptured = [];

    this.playerLastYakuSig = '';
    this.aiLastYakuSig = '';
    this.playerCalledKoiKoi = false;
    this.aiCalledKoiKoi = false;

    // Turn state: 'PLAYER_HAND', 'PLAYER_SELECT_FIELD_HAND', 'PLAYER_DRAWING', 'PLAYER_SELECT_FIELD_DRAW',
    // 'PLAYER_KOIKOI_DECISION', 'AI_TURN', 'ROUND_OVER', 'MATCH_OVER'
    this.phase = 'PLAYER_HAND';
    this.pendingCard = null;
    this.matchingFieldCandidates = [];
    this.drawnCard = null;
    this.pendingYakuEvaluation = null;
    this.dealerDraw = null;
  }

  startNewMatch(totalRounds = 3) {
    this.totalRounds = totalRounds;
    this.currentRound = 1;
    this.playerScore = 0;
    this.aiScore = 0;
    this.dealer = 'player';
    this.startRound();
  }

  startRound() {
    // Shuffle until neither field nor hands have 4-of-a-month or 4-pairs so every round is playable
    let validDeal = false;
    while (!validDeal) {
      // Fisher-Yates: xáo đều (sort + Math.random bị lệch, lá dễ giữ gần vị trí cũ)
      const shuffled = [...HANAFUDA_CARDS];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      this.playerHand = shuffled
        .slice(0, 8)
        .sort((a, b) => a.month - b.month || b.points - a.points);
      this.aiHand = shuffled.slice(8, 16);
      this.field = shuffled.slice(16, 24);
      this.deck = shuffled.slice(24);

      const fieldMonths = {};
      for (const c of this.field) {
        fieldMonths[c.month] = (fieldMonths[c.month] || 0) + 1;
      }
      const hasFourOnField = Object.values(fieldMonths).includes(4);
      const pInit = checkInitialHandYaku(this.playerHand);
      const aInit = checkInitialHandYaku(this.aiHand);

      if (!hasFourOnField && !pInit && !aInit) {
        validDeal = true;
      }
    }

    // Initialize fixed 12-slot grid:
    // Row 1 (nearest player, bottom): slots 0..3 (left to right)
    // Row 2 (middle/upper row):       slots 4..7 (left to right)
    // Row 3 (nearest opponent, top):  slots 8..11 (left to right, active only when > 8 cards)
    this.fieldSlots = Array(12).fill(null);
    for (let i = 0; i < 8; i++) {
      this.fieldSlots[i] = this.field[i] || null;
    }
    this.lastFieldRelocations = [];
    this.lastRow3Opened = false;
    this.lastRow3Closed = false;
    this.syncFieldFromSlots();

    this.playerCaptured = [];
    this.aiCaptured = [];
    this.playerLastYakuSig = '';
    this.aiLastYakuSig = '';
    this.playerCalledKoiKoi = false;
    this.aiCalledKoiKoi = false;
    this.pendingCard = null;
    this.drawnCard = null;
    this.matchingFieldCandidates = [];
    this.pendingYakuEvaluation = null;

    this.phase = this.dealer === 'player' ? 'PLAYER_HAND' : 'AI_TURN';
  }

  setDealer(role) {
    this.dealer = role === 'ai' ? 'ai' : 'player';
    this.phase = this.dealer === 'player' ? 'PLAYER_HAND' : 'AI_TURN';
  }

  /**
   * Synchronizes this.field flat array from this.fieldSlots while keeping slot positions intact
   */
  syncFieldFromSlots() {
    if (!Array.isArray(this.fieldSlots) || this.fieldSlots.length < 12) {
      const backup = [...(this.field || [])];
      this.fieldSlots = Array(Math.max(12, backup.length)).fill(null);
      backup.forEach((c, idx) => {
        this.fieldSlots[idx] = c;
      });
    }
    this.field = this.fieldSlots.filter(Boolean);
  }

  /**
   * Returns true if Row 3 (indices 8+) currently has at least one card
   */
  hasFieldRow3() {
    return this.fieldSlots.slice(8).some((c) => c !== null);
  }

  /**
   * Places a non-matching card into the nearest empty slot scanning:
   * Left-to-Right (Col 1 -> Col 4), from Row 1 (nearest player, 0..3) -> Row 2 (4..7) -> Row 3 (nearest opponent, 8..11)
   */
  placeCardInNearestEmptySlot(card) {
    const hadRow3 = this.hasFieldRow3();
    this.lastFieldRelocations = [];
    let emptyIdx = this.fieldSlots.findIndex((s) => s === null);
    if (emptyIdx === -1) {
      emptyIdx = this.fieldSlots.length;
      this.fieldSlots.push(card);
    } else {
      this.fieldSlots[emptyIdx] = card;
    }
    this.syncFieldFromSlots();
    const hasRow3Now = this.hasFieldRow3();
    this.lastRow3Opened = !hadRow3 && hasRow3Now;
    this.lastRow3Closed = false;
    return emptyIdx;
  }

  /**
   * Removes captured field cards by setting their slots to null (leaving empty spaces in place).
   * If Row 3 (slots 8+) currently has cards and Row 1 or Row 2 (slots 0..7) has empty slots,
   * cards from Row 3 automatically relocate into those empty slots in Row 1/Row 2!
   */
  removeCardsFromFieldSlots(cardIdsToRemove) {
    const hadRow3 = this.hasFieldRow3();
    const idSet = new Set(cardIdsToRemove);
    for (let i = 0; i < this.fieldSlots.length; i++) {
      if (this.fieldSlots[i] && idSet.has(this.fieldSlots[i].id)) {
        this.fieldSlots[i] = null;
      }
    }

    const relocations = [];
    // If Row 3 had cards, move Row 3 cards into any empty slots in Row 1 (0..3) or Row 2 (4..7)
    for (let targetIdx = 0; targetIdx < 8; targetIdx++) {
      if (this.fieldSlots[targetIdx] === null) {
        const sourceIdx = this.fieldSlots.findIndex((c, idx) => idx >= 8 && c !== null);
        if (sourceIdx !== -1) {
          const movingCard = this.fieldSlots[sourceIdx];
          this.fieldSlots[targetIdx] = movingCard;
          this.fieldSlots[sourceIdx] = null;
          relocations.push({
            card: movingCard,
            fromSlot: sourceIdx,
            toSlot: targetIdx
          });
        }
      }
    }

    // Compact any remaining cards in Row 3 (indices 8+) leftward starting from slot 8 (first left slot of Row 3)
    let writeIdx = 8;
    for (let readIdx = 8; readIdx < this.fieldSlots.length; readIdx++) {
      const c = this.fieldSlots[readIdx];
      if (c !== null) {
        if (readIdx !== writeIdx) {
          this.fieldSlots[writeIdx] = c;
          this.fieldSlots[readIdx] = null;
          relocations.push({
            card: c,
            fromSlot: readIdx,
            toSlot: writeIdx
          });
        }
        writeIdx++;
      }
    }

    if (this.fieldSlots.length > 12) {
      this.fieldSlots.length = Math.max(12, writeIdx);
    }

    this.syncFieldFromSlots();
    const hasRow3Now = this.hasFieldRow3();
    this.lastFieldRelocations = relocations;
    this.lastRow3Opened = false;
    this.lastRow3Closed = hadRow3 && !hasRow3Now;
    return relocations;
  }

  /**
   * Returns all field cards matching the month of a given card
   */
  getFieldMatches(card) {
    if (!card) return [];
    return this.field.filter((f) => f.month === card.month);
  }

  /**
   * Step 1 for Player: Play a card from hand.
   * Supports:
   * - Direct play when 0, 1, or 3 matches exist on field
   * - Entering selection mode when 2 matches exist on field
   * - Switching to another hand card at any time while in selection mode
   * - Auto-picking best match if clicking the same selected hand card again
   */
  playHandCard(handCardId, targetFieldCardId = null) {
    if (this.phase !== 'PLAYER_HAND' && this.phase !== 'PLAYER_SELECT_FIELD_HAND') {
      return { error: 'Not in player hand phase' };
    }

    const cardIndex = this.playerHand.findIndex((c) => c.id === handCardId);
    if (cardIndex === -1) {
      return { error: 'Card not in hand' };
    }

    const card = this.playerHand[cardIndex];
    const matches = this.getFieldMatches(card);

    // If clicking the SAME card that is already waiting for field selection, auto-select the best field card!
    if (
      this.phase === 'PLAYER_SELECT_FIELD_HAND' &&
      this.pendingCard?.id === card.id &&
      !targetFieldCardId &&
      matches.length === 2
    ) {
      const bestTarget = [...matches].sort((a, b) => b.points - a.points)[0];
      targetFieldCardId = bestTarget.id;
    }

    // If there are 2 matches on the field and player hasn't picked which one yet
    if (matches.length === 2 && !targetFieldCardId) {
      this.pendingCard = card;
      this.matchingFieldCandidates = matches;
      this.phase = 'PLAYER_SELECT_FIELD_HAND';
      return {
        status: 'NEEDS_FIELD_SELECTION',
        card,
        candidates: matches
      };
    }

    // Remove card from hand now that placement is confirmed
    this.playerHand.splice(cardIndex, 1);
    this.pendingCard = null;
    this.matchingFieldCandidates = [];
    this.phase = 'PLAYER_DRAWING';

    const capturedNow = this.resolveCardPlacement('player', card, matches, targetFieldCardId);
    return {
      status: 'HAND_STEP_DONE',
      card,
      captured: capturedNow,
      relocations: this.lastFieldRelocations,
      row3Opened: this.lastRow3Opened,
      row3Closed: this.lastRow3Closed
    };
  }

  /**
   * Resolves placing or capturing a card on the field for 'player' or 'ai'
   */
  resolveCardPlacement(actor, card, matches, chosenFieldCardId = null) {
    const capturedList = actor === 'player' ? this.playerCaptured : this.aiCaptured;
    let newlyCaptured = [];

    if (matches.length === 0) {
      this.placeCardInNearestEmptySlot(card);
    } else if (matches.length === 1) {
      const target = matches[0];
      this.removeCardsFromFieldSlots([target.id]);
      newlyCaptured = [card, target];
      capturedList.push(...newlyCaptured);
    } else if (matches.length === 3) {
      this.removeCardsFromFieldSlots(matches.map((m) => m.id));
      newlyCaptured = [card, ...matches];
      capturedList.push(...newlyCaptured);
    } else if (matches.length >= 2) {
      const chosen =
        matches.find((m) => m.id === chosenFieldCardId) ||
        [...matches].sort((a, b) => b.points - a.points)[0];
      this.removeCardsFromFieldSlots([chosen.id]);
      newlyCaptured = [card, chosen];
      capturedList.push(...newlyCaptured);
    }

    return newlyCaptured;
  }

  /**
   * Step 2 for Player: Draw top card from the deck pile
   */
  drawStepForPlayer() {
    if (this.deck.length === 0) {
      const yakuCheck = this.checkPostTurnYaku('player');
      return {
        status: 'DRAW_COMPLETE',
        drawnCard: null,
        captured: [],
        yakuCheck
      };
    }

    const drawn = this.deck.shift();
    this.drawnCard = drawn;
    const matches = this.getFieldMatches(drawn);

    if (matches.length === 2) {
      this.pendingCard = drawn;
      this.matchingFieldCandidates = matches;
      this.phase = 'PLAYER_SELECT_FIELD_DRAW';
      return {
        status: 'DRAW_NEEDS_SELECTION',
        drawnCard: drawn,
        candidates: matches
      };
    }

    const capturedNow = this.resolveCardPlacement('player', drawn, matches);
    this.drawnCard = null;
    const yakuCheck = this.checkPostTurnYaku('player');

    return {
      status: 'DRAW_COMPLETE',
      drawnCard: drawn,
      captured: capturedNow,
      yakuCheck
    };
  }

  /**
   * Completes player's choice when a drawn card matches 2 cards on the field
   */
  selectFieldForDrawnCard(targetFieldCardId) {
    if (this.phase !== 'PLAYER_SELECT_FIELD_DRAW' || !this.pendingCard) {
      return { error: 'Not waiting for drawn card selection' };
    }
    const drawn = this.pendingCard;
    const matches = this.getFieldMatches(drawn);
    const capturedNow = this.resolveCardPlacement('player', drawn, matches, targetFieldCardId);

    this.pendingCard = null;
    this.drawnCard = null;
    this.matchingFieldCandidates = [];

    const yakuCheck = this.checkPostTurnYaku('player');
    return {
      status: 'DRAW_COMPLETE',
      drawnCard: drawn,
      captured: capturedNow,
      yakuCheck
    };
  }

  /**
   * Checks if the actor formed a new or upgraded Yaku at the end of their turn
   */
  checkPostTurnYaku(actor) {
    const captured = actor === 'player' ? this.playerCaptured : this.aiCaptured;
    const prevSig = actor === 'player' ? this.playerLastYakuSig : this.aiLastYakuSig;
    const handLeft = actor === 'player' ? this.playerHand.length : this.aiHand.length;

    const evalResult = evaluateCapturedYaku(captured, this.currentRound);

    if (evalResult.yakus.length > 0 && evalResult.signature !== prevSig) {
      this.pendingYakuEvaluation = evalResult;
      if (actor === 'player') {
        this.playerLastYakuSig = evalResult.signature;
        if (handLeft === 0) {
          const outcome = this.declareShobu('player', evalResult);
          return { newYaku: true, autoShobu: true, evalResult, outcome, prevSignature: prevSig };
        }
        this.phase = 'PLAYER_KOIKOI_DECISION';
        return { newYaku: true, autoShobu: false, evalResult, prevSignature: prevSig };
      } else {
        this.aiLastYakuSig = evalResult.signature;
        return { newYaku: true, evalResult, prevSignature: prevSig };
      }
    }

    // No new Yaku formed: check if both hands are empty
    if (this.playerHand.length === 0 && this.aiHand.length === 0) {
      const drawOutcome = this.finishRound('draw', [], 0, 1);
      return { newYaku: false, roundDraw: true, outcome: drawOutcome };
    }

    // Advance turn to the other player
    this.phase = actor === 'player' ? 'AI_TURN' : 'PLAYER_HAND';
    return { newYaku: false };
  }

  /**
   * Player or AI chooses "Koi-Koi!" to continue the round
   */
  declareKoiKoi(actor) {
    if (actor === 'player') {
      this.playerCalledKoiKoi = true;
      if (this.playerHand.length === 0 && this.aiHand.length === 0) {
        return this.finishRound('draw', [], 0, 1);
      }
      this.phase = 'AI_TURN';
    } else {
      this.aiCalledKoiKoi = true;
      if (this.playerHand.length === 0 && this.aiHand.length === 0) {
        return this.finishRound('draw', [], 0, 1);
      }
      this.phase = 'PLAYER_HAND';
    }
    return { status: 'KOIKOI_DECLARED', actor };
  }

  /**
   * Player or AI declares "Shōbu!" to end the round and score their Yaku
   */
  declareShobu(actor, evalResult = null) {
    const captured = actor === 'player' ? this.playerCaptured : this.aiCaptured;
    const evaluation = evalResult || evaluateCapturedYaku(captured, this.currentRound);

    let multiplier = 1;
    const reasons = [];

    if (evaluation.totalBasePoints >= 7) {
      multiplier *= 2;
      reasons.push('Điểm Yaku ≥ 7 (×2)');
    }

    const opponentCalledKoi = actor === 'player' ? this.aiCalledKoiKoi : this.playerCalledKoiKoi;
    if (opponentCalledKoi) {
      multiplier *= 2;
      reasons.push('Phản đòn Koi-Koi của đối thủ (×2)');
    }

    const finalPoints = evaluation.totalBasePoints * multiplier;
    return this.finishRound(actor, evaluation.yakus, finalPoints, multiplier, reasons);
  }

  finishRound(winner, yakus, finalPoints, multiplier = 1, multiplierReasons = []) {
    if (winner === 'player') {
      this.playerScore += finalPoints;
      this.dealer = 'player';
    } else if (winner === 'ai') {
      this.aiScore += finalPoints;
      this.dealer = 'ai';
    }

    const isMatchComplete = this.currentRound >= this.totalRounds;
    this.phase = isMatchComplete ? 'MATCH_OVER' : 'ROUND_OVER';

    return {
      winner,
      yakus,
      finalPoints,
      multiplier,
      multiplierReasons,
      round: this.currentRound,
      totalRounds: this.totalRounds,
      playerScore: this.playerScore,
      aiScore: this.aiScore,
      isMatchComplete
    };
  }

  nextRound() {
    if (this.currentRound < this.totalRounds) {
      this.currentRound += 1;
      this.startRound();
      return true;
    }
    return false;
  }

  // ==========================================================================
  // SMART ANIME AI DECISION ENGINE
  // ==========================================================================

  computeBestAiMove(opponentProfile) {
    const skill = opponentProfile?.skillLevel ?? 0.6;
    const defenseWeight = opponentProfile?.defenseWeight ?? 0.5;
    const favTags = new Set(opponentProfile?.favoriteTags || []);

    let possibleMoves = [];

    for (const handCard of this.aiHand) {
      const matches = this.getFieldMatches(handCard);
      if (matches.length === 0) {
        possibleMoves.push({
          handCard,
          fieldTarget: null,
          score: this.evaluateDiscardSafety(handCard)
        });
      } else {
        for (const fieldCard of matches) {
          const score = this.evaluateCaptureValue(
            handCard,
            fieldCard,
            skill,
            defenseWeight,
            favTags
          );
          possibleMoves.push({
            handCard,
            fieldTarget: fieldCard,
            score
          });
        }
      }
    }

    possibleMoves.sort((a, b) => b.score - a.score);

    if (possibleMoves.length > 1 && Math.random() > skill + 0.15) {
      return possibleMoves[1];
    }
    return possibleMoves[0];
  }

  evaluateCaptureValue(handCard, fieldCard, skill, defenseWeight, favTags) {
    let score = 10 + handCard.points + fieldCard.points;

    const pair = [handCard, fieldCard];
    for (const c of pair) {
      if (c.id === 33) score += 45;
      if (c.id === 9 || c.id === 29) score += 32;
      if (c.type === 'hikari') score += 28;
      if (c.tags.includes('inoshikacho')) score += 20;
      if (c.tags.includes('akatan') || c.tags.includes('aotan')) score += 18;

      for (const tag of c.tags) {
        if (favTags.has(tag)) score += 10;
      }
    }

    const simulatedAi = [...this.aiCaptured, handCard, fieldCard];
    const simEval = evaluateCapturedYaku(simulatedAi, this.currentRound);
    if (simEval.signature !== this.aiLastYakuSig && simEval.totalBasePoints > 0) {
      score += 75 + simEval.totalBasePoints * 12;
    }

    if (skill >= 0.5) {
      const simulatedPlayer = [...this.playerCaptured, fieldCard];
      const playerSim = evaluateCapturedYaku(simulatedPlayer, this.currentRound);
      if (playerSim.signature !== this.playerLastYakuSig && playerSim.totalBasePoints > 0) {
        score += 65 * defenseWeight;
      }
      const pIds = new Set(this.playerCaptured.map((c) => c.id));
      if (pIds.has(33) && (fieldCard.id === 9 || fieldCard.id === 29)) {
        score += 80 * defenseWeight;
      }
      if ((pIds.has(9) || pIds.has(29)) && fieldCard.id === 33) {
        score += 85 * defenseWeight;
      }
    }

    return score;
  }

  evaluateDiscardSafety(handCard) {
    let score = -handCard.points * 1.5;
    if (handCard.id === 33) score -= 40;
    if (handCard.type === 'hikari') score -= 30;
    return score;
  }

  shouldAiCallKoiKoi(opponentProfile, evalResult) {
    if (this.aiHand.length === 0) return false;
    if (this.playerCalledKoiKoi && evalResult.totalBasePoints >= 3) {
      return false;
    }
    if (evalResult.totalBasePoints >= 7) {
      return false;
    }
    const pEval = evaluateCapturedYaku(this.playerCaptured, this.currentRound);
    if (pEval.totalBasePoints > 0) {
      return false;
    }
    const greed = opponentProfile?.koiKoiGreed ?? 0.35;
    const handFactor = this.aiHand.length >= 4 ? 0.2 : -0.15;
    return Math.random() < greed + handFactor;
  }

  // ==========================================================================
  // MULTIPLAYER CANONICAL STATE SERIALIZATION (HOST = P1, GUEST = P2)
  // ==========================================================================

  exportCanonicalState(myRole = 'host', roundSummary = null) {
    const isHost = myRole === 'host';
    let activeTurn = isHost ? 'p1' : 'p2';
    let subPhase = 'HAND';

    if (this.phase === 'ROUND_OVER' || this.phase === 'MATCH_OVER') {
      activeTurn = null;
      subPhase = this.phase;
    } else if (this.phase === 'AI_TURN') {
      activeTurn = isHost ? 'p2' : 'p1';
      subPhase = 'HAND';
    } else if (this.phase === 'PLAYER_KOIKOI_DECISION') {
      activeTurn = isHost ? 'p1' : 'p2';
      subPhase = 'KOIKOI_DECISION';
    }

    const dealerRole =
      this.dealer === 'player' ? (isHost ? 'p1' : 'p2') : isHost ? 'p2' : 'p1';

    let canonicalSummary = null;
    if (roundSummary) {
      let winnerRole = 'draw';
      if (roundSummary.winner === 'player') {
        winnerRole = isHost ? 'p1' : 'p2';
      } else if (roundSummary.winner === 'ai') {
        winnerRole = isHost ? 'p2' : 'p1';
      }
      canonicalSummary = {
        ...roundSummary,
        winnerRole,
        p1Score: isHost ? this.playerScore : this.aiScore,
        p2Score: isHost ? this.aiScore : this.playerScore
      };
    }

    return {
      totalRounds: this.totalRounds,
      currentRound: this.currentRound,
      dealerRole,
      activeTurn,
      subPhase,
      deck: this.deck,
      field: this.field,
      fieldSlots: this.fieldSlots,
      p1Hand: isHost ? this.playerHand : this.aiHand,
      p2Hand: isHost ? this.aiHand : this.playerHand,
      p1Captured: isHost ? this.playerCaptured : this.aiCaptured,
      p2Captured: isHost ? this.aiCaptured : this.playerCaptured,
      p1Score: isHost ? this.playerScore : this.aiScore,
      p2Score: isHost ? this.aiScore : this.playerScore,
      p1LastYakuSig: isHost ? this.playerLastYakuSig : this.aiLastYakuSig,
      p2LastYakuSig: isHost ? this.aiLastYakuSig : this.playerLastYakuSig,
      p1CalledKoiKoi: isHost ? this.playerCalledKoiKoi : this.aiCalledKoiKoi,
      p2CalledKoiKoi: isHost ? this.aiCalledKoiKoi : this.playerCalledKoiKoi,
      dealerDraw: this.dealerDraw || null,
      roundSummary: canonicalSummary
    };
  }

  importCanonicalState(canonical, myRole = 'host') {
    if (!canonical) return null;
    const isHost = myRole === 'host';
    const myActorCode = isHost ? 'p1' : 'p2';

    this.totalRounds = canonical.totalRounds || 3;
    this.currentRound = canonical.currentRound || 1;
    this.dealerDraw = canonical.dealerDraw || null;
    this.deck = [...(canonical.deck || [])];
    this.field = [...(canonical.field || [])];
    if (Array.isArray(canonical.fieldSlots) && canonical.fieldSlots.length >= 8) {
      this.fieldSlots = [...canonical.fieldSlots];
      while (this.fieldSlots.length < 12) this.fieldSlots.push(null);
      this.syncFieldFromSlots();
    } else {
      this.fieldSlots = Array(Math.max(12, this.field.length)).fill(null);
      this.field.forEach((c, idx) => {
        this.fieldSlots[idx] = c;
      });
      this.syncFieldFromSlots();
    }

    const myHandRaw = isHost ? canonical.p1Hand : canonical.p2Hand;
    const oppHandRaw = isHost ? canonical.p2Hand : canonical.p1Hand;
    this.playerHand = [...(myHandRaw || [])].sort(
      (a, b) => a.month - b.month || b.points - a.points
    );
    this.aiHand = [...(oppHandRaw || [])];

    this.playerCaptured = [...((isHost ? canonical.p1Captured : canonical.p2Captured) || [])];
    this.aiCaptured = [...((isHost ? canonical.p2Captured : canonical.p1Captured) || [])];

    this.playerScore = (isHost ? canonical.p1Score : canonical.p2Score) || 0;
    this.aiScore = (isHost ? canonical.p2Score : canonical.p1Score) || 0;

    this.playerLastYakuSig = (isHost ? canonical.p1LastYakuSig : canonical.p2LastYakuSig) || '';
    this.aiLastYakuSig = (isHost ? canonical.p2LastYakuSig : canonical.p1LastYakuSig) || '';

    this.playerCalledKoiKoi = Boolean(
      isHost ? canonical.p1CalledKoiKoi : canonical.p2CalledKoiKoi
    );
    this.aiCalledKoiKoi = Boolean(
      isHost ? canonical.p2CalledKoiKoi : canonical.p1CalledKoiKoi
    );

    this.dealer = canonical.dealerRole === myActorCode ? 'player' : 'ai';
    this.pendingCard = null;
    this.matchingFieldCandidates = [];
    this.drawnCard = null;

    if (canonical.subPhase === 'ROUND_OVER' || canonical.subPhase === 'MATCH_OVER') {
      this.phase = canonical.subPhase;
    } else if (canonical.activeTurn === myActorCode) {
      this.phase =
        canonical.subPhase === 'KOIKOI_DECISION'
          ? 'PLAYER_KOIKOI_DECISION'
          : 'PLAYER_HAND';
    } else {
      this.phase = 'AI_TURN';
    }

    if (canonical.roundSummary) {
      let localWinner = 'draw';
      if (canonical.roundSummary.winnerRole === myActorCode) {
        localWinner = 'player';
      } else if (
        canonical.roundSummary.winnerRole &&
        canonical.roundSummary.winnerRole !== 'draw'
      ) {
        localWinner = 'ai';
      }
      return {
        ...canonical.roundSummary,
        winner: localWinner,
        playerScore: this.playerScore,
        aiScore: this.aiScore
      };
    }

    return null;
  }
}

