// Complete Koi-Koi Yaku (Tổ hợp điểm) Engine & Progress Tracker

export const YAKU_CATALOG = [
  {
    id: 'goko',
    jpName: 'Gokō (五光)',
    viName: 'Ngũ Quang',
    basePoints: 10,
    category: 'hikari',
    description: 'Thu thập đủ cả 5 lá Quang (Tùng Hạc, Màn Anh Đào, Trăng Rằm, Người Đội Mưa, Phượng Hoàng).',
    requiredCardIds: [1, 9, 29, 41, 45]
  },
  {
    id: 'shiko',
    jpName: 'Shikō (四光)',
    viName: 'Tứ Quang',
    basePoints: 8,
    category: 'hikari',
    description: 'Thu thập 4 lá Quang không bao gồm lá Người Đội Mưa Dưới Liễu (#41).',
    requiredCardIds: [1, 9, 29, 45]
  },
  {
    id: 'ameshiko',
    jpName: 'Ame-Shikō (雨四光)',
    viName: 'Vũ Tứ Quang',
    basePoints: 7,
    category: 'hikari',
    description: 'Thu thập 4 lá Quang bất kỳ có bao gồm lá Người Đội Mưa Dưới Liễu (#41).',
    requiredCardIds: [1, 9, 29, 41, 45]
  },
  {
    id: 'sanko',
    jpName: 'Sankō (三光)',
    viName: 'Tam Quang',
    basePoints: 5,
    category: 'hikari',
    description: 'Thu thập 3 trong 4 lá Quang khô (không tính lá Người Đội Mưa Dưới Liễu #41).',
    requiredCardIds: [1, 9, 29, 45]
  },
  {
    id: 'hanamizake',
    jpName: 'Hanami-zake (花見酒)',
    viName: 'Hoa Kiến Tửu (Thưởng Hoa Uống Rượu)',
    basePoints: 5,
    category: 'special',
    description: 'Kết hợp Màn Hoa Anh Đào (Tháng 3) và Chén Rượu Hoa Cúc (Tháng 9).',
    requiredCardIds: [9, 33]
  },
  {
    id: 'tsukimizake',
    jpName: 'Tsukimi-zake (月見酒)',
    viName: 'Nguyệt Kiến Tửu (Ngắm Trăng Uống Rượu)',
    basePoints: 5,
    category: 'special',
    description: 'Kết hợp Trăng Rằm Cỏ Lau (Tháng 8) và Chén Rượu Hoa Cúc (Tháng 9).',
    requiredCardIds: [29, 33]
  },
  {
    id: 'inoshikacho',
    jpName: 'Ino-Shika-Chō (猪鹿蝶)',
    viName: 'Trư - Lộc - Điệp',
    basePoints: 5,
    bonusRule: '+1 điểm cho mỗi lá Thú (Tane) vượt quá 5 lá',
    category: 'tane',
    description: 'Bộ ba Lợn Rừng (Tháng 7) + Hươu Sao (Tháng 10) + Bướm Mẫu Đơn (Tháng 6).',
    requiredCardIds: [21, 25, 37]
  },
  {
    id: 'akatan_aotan',
    jpName: 'Akatan・Aotan no Chōfuku (赤短・青短)',
    viName: 'Song Đan Hợp Bích (Xích Đan & Thanh Đan)',
    basePoints: 10,
    bonusRule: '+1 điểm cho mỗi lá Dải Thơ (Tanzaku) thêm',
    category: 'tanzaku',
    description: 'Thu thập trọn bộ 3 lá Dải Thơ Đỏ (Tháng 1, 2, 3) VÀ 3 lá Dải Xanh (Tháng 6, 9, 10).',
    requiredCardIds: [2, 6, 10, 22, 34, 38]
  },
  {
    id: 'akatan',
    jpName: 'Akatan (赤短)',
    viName: 'Xích Đan (Ba Dải Thơ Đỏ)',
    basePoints: 5,
    bonusRule: '+1 điểm cho mỗi lá Dải Thơ (Tanzaku) thêm',
    category: 'tanzaku',
    description: 'Thu thập đủ 3 lá Dải Thơ Đỏ có chữ của Tháng 1 (Tùng), Tháng 2 (Mai), Tháng 3 (Anh Đào).',
    requiredCardIds: [2, 6, 10]
  },
  {
    id: 'aotan',
    jpName: 'Aotan (青短)',
    viName: 'Thanh Đan (Ba Dải Xanh)',
    basePoints: 5,
    bonusRule: '+1 điểm cho mỗi lá Dải Thơ (Tanzaku) thêm',
    category: 'tanzaku',
    description: 'Thu thập đủ 3 lá Dải Xanh của Tháng 6 (Mẫu Đơn), Tháng 9 (Cúc), Tháng 10 (Phong Đỏ).',
    requiredCardIds: [22, 34, 38]
  },
  {
    id: 'tane',
    jpName: 'Tane (タネ)',
    viName: 'Ngũ Thú (5 Lá Thú)',
    basePoints: 1,
    bonusRule: '+1 điểm cho mỗi lá Thú thêm trên 5 lá',
    category: 'tane',
    description: 'Thu thập từ 5 lá bài Thú/Vật (10đ) trở lên.',
    requiredCardIds: []
  },
  {
    id: 'tanzaku',
    jpName: 'Tanzaku (短冊)',
    viName: 'Ngũ Đan (5 Dải Thơ)',
    basePoints: 1,
    bonusRule: '+1 điểm cho mỗi lá Dải Thơ thêm trên 5 lá',
    category: 'tanzaku',
    description: 'Thu thập từ 5 lá bài Dải Thơ (5đ) trở lên.',
    requiredCardIds: []
  },
  {
    id: 'kasu',
    jpName: 'Kasu (カス)',
    viName: 'Thập Thảo (10 Lá Thường)',
    basePoints: 1,
    bonusRule: '+1 điểm cho mỗi lá Thường thêm trên 10 lá',
    category: 'kasu',
    description: 'Thu thập từ 10 lá bài Thường (1đ) trở lên.',
    requiredCardIds: []
  }
];

/**
 * Evaluates all active Yaku for a given array of captured card objects.
 * @param {Array} capturedCards - Array of card objects captured by a player
 * @param {number} roundMonth - Current round number (1-12) for Tsuki-fuda check
 * @returns {{ yakus: Array, totalBasePoints: number, signature: string }}
 */
export function evaluateCapturedYaku(capturedCards, roundMonth = 1) {
  const ids = new Set(capturedCards.map((c) => c.id));
  const hikariCards = capturedCards.filter((c) => c.type === 'hikari');
  const dryHikariCards = hikariCards.filter((c) => !c.tags.includes('rain_hikari'));
  const hasRainHikari = ids.has(41);

  const taneCards = capturedCards.filter((c) => c.type === 'tane');
  const tanzakuCards = capturedCards.filter((c) => c.type === 'tanzaku');
  // Sake Cup (#33) counts only as Tane, never as an extra Kasu.
  const kasuCards = capturedCards.filter((c) => c.type === 'kasu');

  const yakus = [];

  // 1. Hikari Yaku (mutually exclusive: Goko > Shiko > Ame-Shiko > Sanko)
  if (hikariCards.length === 5) {
    yakus.push({
      id: 'goko',
      jpName: 'Gokō (五光)',
      viName: 'Ngũ Quang',
      points: 10,
      cards: hikariCards.map((c) => c.id)
    });
  } else if (dryHikariCards.length === 4 && !hasRainHikari) {
    yakus.push({
      id: 'shiko',
      jpName: 'Shikō (四光)',
      viName: 'Tứ Quang',
      points: 8,
      cards: dryHikariCards.map((c) => c.id)
    });
  } else if (hikariCards.length === 4 && hasRainHikari) {
    yakus.push({
      id: 'ameshiko',
      jpName: 'Ame-Shikō (雨四光)',
      viName: 'Vũ Tứ Quang',
      points: 7,
      cards: hikariCards.map((c) => c.id)
    });
  } else if (dryHikariCards.length === 3) {
    yakus.push({
      id: 'sanko',
      jpName: 'Sankō (三光)',
      viName: 'Tam Quang',
      points: 5,
      cards: dryHikariCards.map((c) => c.id)
    });
  }

  // 2. Hanami-zake (Sakura Curtain #9 + Sake Cup #33)
  if (ids.has(9) && ids.has(33)) {
    yakus.push({
      id: 'hanamizake',
      jpName: 'Hanami-zake (花見酒)',
      viName: 'Hoa Kiến Tửu',
      points: 5,
      cards: [9, 33]
    });
  }

  // 3. Tsukimi-zake (Full Moon #29 + Sake Cup #33)
  if (ids.has(29) && ids.has(33)) {
    yakus.push({
      id: 'tsukimizake',
      jpName: 'Tsukimi-zake (月見酒)',
      viName: 'Nguyệt Kiến Tửu',
      points: 5,
      cards: [29, 33]
    });
  }

  // 4. Ino-Shika-Cho (#21 Butterfly, #25 Boar, #37 Deer)
  if (ids.has(21) && ids.has(25) && ids.has(37)) {
    const extraTane = Math.max(0, taneCards.length - 3);
    yakus.push({
      id: 'inoshikacho',
      jpName: 'Ino-Shika-Chō (猪鹿蝶)',
      viName: extraTane > 0 ? `Trư - Lộc - Điệp (+${extraTane})` : 'Trư - Lộc - Điệp',
      points: 5 + extraTane,
      cards: [21, 25, 37]
    });
  }

  // 5. Akatan (#2, #6, #10) & Aotan (#22, #34, #38)
  const hasAkatan = ids.has(2) && ids.has(6) && ids.has(10);
  const hasAotan = ids.has(22) && ids.has(34) && ids.has(38);

  if (hasAkatan && hasAotan) {
    const extraRibbons = Math.max(0, tanzakuCards.length - 6);
    yakus.push({
      id: 'akatan_aotan',
      jpName: 'Akatan・Aotan (赤短・青短)',
      viName: extraRibbons > 0 ? `Song Đan Hợp Bích (+${extraRibbons})` : 'Song Đan Hợp Bích',
      points: 10 + extraRibbons,
      cards: [2, 6, 10, 22, 34, 38]
    });
  } else if (hasAkatan) {
    const extraRibbons = Math.max(0, tanzakuCards.length - 3);
    yakus.push({
      id: 'akatan',
      jpName: 'Akatan (赤短)',
      viName: extraRibbons > 0 ? `Xích Đan (+${extraRibbons})` : 'Xích Đan',
      points: 5 + extraRibbons,
      cards: [2, 6, 10]
    });
  } else if (hasAotan) {
    const extraRibbons = Math.max(0, tanzakuCards.length - 3);
    yakus.push({
      id: 'aotan',
      jpName: 'Aotan (青短)',
      viName: extraRibbons > 0 ? `Thanh Đan (+${extraRibbons})` : 'Thanh Đan',
      points: 5 + extraRibbons,
      cards: [22, 34, 38]
    });
  }

  // 7. Tane (5+ Tane cards)
  if (taneCards.length >= 5) {
    const pts = 1 + (taneCards.length - 5);
    yakus.push({
      id: 'tane',
      jpName: 'Tane (タネ)',
      viName: `Thú (${taneCards.length} lá)`,
      points: pts,
      cards: taneCards.map((c) => c.id)
    });
  }

  // 8. Tanzaku (5+ Ribbon cards)
  if (tanzakuCards.length >= 5) {
    const pts = 1 + (tanzakuCards.length - 5);
    yakus.push({
      id: 'tanzaku',
      jpName: 'Tanzaku (短冊)',
      viName: `Dải Thơ (${tanzakuCards.length} lá)`,
      points: pts,
      cards: tanzakuCards.map((c) => c.id)
    });
  }

  // 9. Kasu (10+ Plain cards)
  if (kasuCards.length >= 10) {
    const pts = 1 + (kasuCards.length - 10);
    yakus.push({
      id: 'kasu',
      jpName: 'Kasu (カス)',
      viName: `Lá Thường (${kasuCards.length} lá)`,
      points: pts,
      cards: kasuCards.map((c) => c.id)
    });
  }

  const totalBasePoints = yakus.reduce((sum, y) => sum + y.points, 0);
  // Signature captures exact yaku IDs and their point levels so we know when a NEW yaku or upgraded yaku is formed
  const signature = yakus
    .map((y) => `${y.id}:${y.points}`)
    .sort()
    .join('|');

  return {
    yakus,
    totalBasePoints,
    signature
  };
}

/**
 * Checks for instant-win initial hand conditions:
 * - Teshi (手四): 4 cards of the same month in the 8-card starting hand (6 pts)
 * - Kuttsuki (くっつき): 4 pairs of months in the 8-card starting hand (6 pts)
 */
export function checkInitialHandYaku(handCards) {
  const monthCounts = {};
  for (const c of handCards) {
    monthCounts[c.month] = (monthCounts[c.month] || 0) + 1;
  }
  const counts = Object.values(monthCounts);
  if (counts.includes(4)) {
    const month = Object.keys(monthCounts).find((m) => monthCounts[m] === 4);
    return {
      id: 'teshi',
      jpName: 'Teshi (手四)',
      viName: `Tứ Quý Khởi Thủ (Tháng ${month})`,
      points: 6
    };
  }
  if (counts.length === 4 && counts.every((n) => n === 2)) {
    return {
      id: 'kuttsuki',
      jpName: 'Kuttsuki (くっつき)',
      viName: 'Tứ Đôi Khởi Thủ (4 Cặp Tháng)',
      points: 6
    };
  }
  return null;
}

/**
 * Computes real-time Yaku progress hints for the UI tracker
 */
export function getYakuProgressHints(playerCaptured, opponentCaptured) {
  const pIds = new Set(playerCaptured.map((c) => c.id));
  const oIds = new Set(opponentCaptured.map((c) => c.id));

  const trackers = [
    {
      id: 'hanamizake',
      name: 'Hoa Kiến Tửu',
      jp: '花見酒',
      pts: 5,
      targetIds: [9, 33],
      labels: { 9: 'Màn Anh Đào (T3)', 33: 'Chén Rượu (T9)' }
    },
    {
      id: 'tsukimizake',
      name: 'Nguyệt Kiến Tửu',
      jp: '月見酒',
      pts: 5,
      targetIds: [29, 33],
      labels: { 29: 'Trăng Rằm (T8)', 33: 'Chén Rượu (T9)' }
    },
    {
      id: 'sanko',
      name: 'Tam Quang / Ngũ Quang',
      jp: '三光・五光',
      pts: 5,
      targetIds: [1, 9, 29, 41, 45],
      needCount: 3,
      labels: {
        1: 'Tùng Hạc (T1)',
        9: 'Màn Đào (T3)',
        29: 'Trăng Rằm (T8)',
        41: 'Liễu Mưa (T11)',
        45: 'Phượng Hoàng (T12)'
      }
    },
    {
      id: 'inoshikacho',
      name: 'Trư - Lộc - Điệp',
      jp: '猪鹿蝶',
      pts: 5,
      targetIds: [21, 25, 37],
      labels: { 21: 'Hồ Điệp (T6)', 25: 'Lợn Rừng (T7)', 37: 'Hươu Sao (T10)' }
    },
    {
      id: 'akatan',
      name: 'Xích Đan (Thơ Đỏ)',
      jp: '赤短',
      pts: 5,
      targetIds: [2, 6, 10],
      labels: { 2: 'Tùng Đỏ (T1)', 6: 'Mai Đỏ (T2)', 10: 'Đào Đỏ (T3)' }
    },
    {
      id: 'aotan',
      name: 'Thanh Đan (Dải Xanh)',
      jp: '青短',
      pts: 5,
      targetIds: [22, 34, 38],
      labels: { 22: 'Mẫu Đơn (T6)', 34: 'Cúc Xanh (T9)', 38: 'Phong Xanh (T10)' }
    }
  ];

  return trackers.map((t) => {
    const owned = t.targetIds.filter((id) => pIds.has(id));
    const blocked = t.targetIds.filter((id) => oIds.has(id));
    const need = t.needCount || t.targetIds.length;
    const isCompleted =
      t.id === 'sanko'
        ? owned.filter((id) => id !== 41).length >= 3 || owned.length >= 4
        : owned.length >= need;
    const isPossible =
      t.id === 'sanko'
        ? 5 - blocked.length >= 3
        : blocked.length === 0;

    return {
      ...t,
      ownedCount: owned.length,
      needCount: need,
      ownedIds: owned,
      blockedIds: blocked,
      isCompleted,
      isPossible
    };
  });
}
