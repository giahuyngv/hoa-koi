// Dữ liệu chế độ Cốt truyện "Hành trình 12 tháng" (chương Xuân: tháng 1–3 chơi được).
// Lời thoại + thử thách lấy từ demo đã duyệt (docs/story-demo/hanh-trinh-12-thang.html).
// Tiến trình lưu ở saveData.storyProgress (xem createStoryProgress).

export const STORY_PLAYABLE_MONTHS = [1, 2, 3];
export const STORY_MATCH_ROUNDS = 3;

export const STORY_SEASONS = [
  { name: 'Xuân', jp: '春', months: [1, 2, 3] },
  { name: 'Hạ', jp: '夏', months: [4, 5, 6] },
  { name: 'Thu', jp: '秋', months: [7, 8, 9] },
  { name: 'Đông', jp: '冬', months: [10, 11, 12] }
];

// Kanji hoa của từng tháng (hiện ở ô tháng bị khoá / watermark hội thoại)
export const STORY_MONTH_KANJI = ['松', '梅', '桜', '藤', '菖', '牡', '萩', '芒', '菊', '紅', '柳', '桐'];

// check(ctx): ctx = { playerWonRound, playerCardIds } của 1 hiệp; đạt ở bất kỳ hiệp nào là đạt.
export const STORY_MONTHS = {
  1: {
    oppId: 'tsuruhime',
    flower: 'Thông và hạc',
    challenge: 'Thắng 1 ván bất kỳ',
    chKanji: '鶴',
    check: (ctx) => ctx.playerWonRound,
    cards: [[1, 'Hạc'], [2, 'Thăm đỏ'], [3, 'Lá thông'], [4, 'Lá thông']],
    pre: [
      ['ayame', 'Tháng Giêng. Bộ bài hoa đã bị xé thành 12 phần, mỗi tháng do một tinh linh giữ. Người đầu tiên là Tsuruhime.'],
      ['opp', 'Lữ khách đến từ xa à? Tháng Giêng là để bắt đầu, nên ta sẽ chơi chậm thôi.'],
      ['me', 'Tôi cần lấy lại bốn lá Thông của tháng này.'],
      ['opp', 'Thắng ta một ván, ta sẽ trả một lá. Hạc của ta không giữ lá bài của người có lòng tốt.']
    ],
    post: [
      ['opp', 'Ngươi ghép bài cẩn thận như người gấp hạc giấy. Lá Thông là của ngươi, muốn đủ bộ thì quay lại.'],
      ['ayame', 'Hướng nam, gió đã có mùi hoa mơ. Tháng Hai đang chờ.']
    ]
  },
  2: {
    oppId: 'michizane',
    flower: 'Mơ và chim oanh',
    challenge: 'Hoàn thành bộ Akatan (3 thăm đỏ có chữ)',
    chKanji: '赤短',
    check: (ctx) => [2, 6, 10].every((id) => ctx.playerCardIds.includes(id)),
    cards: [[5, 'Chim oanh'], [6, 'Thăm đỏ'], [7, 'Lá mơ'], [8, 'Lá mơ']],
    pre: [
      ['ayame', 'Michizane Tenjin, vị thần của chữ nghĩa. Ông ấy thích những tấm thăm có viết thơ.'],
      ['opp', 'Hoa mơ nở trước mọi loài hoa, nhưng nở một mình thì buồn. Ngươi có biết đọc thơ trên thăm đỏ không?'],
      ['me', 'Akatan: ba tấm thăm đỏ có chữ, tháng Giêng, Hai và Ba.'],
      ['opp', 'Đúng. Hãy gom đủ ba tấm đó trước mắt ta, và cành mơ sẽ là của ngươi.']
    ],
    post: [
      ['opp', 'Chữ "akayoroshi" trên thăm đỏ nghĩa là "thật tốt". Hôm nay quả là một ván tốt.'],
      ['ayame', 'Phía trước là núi Yoshino. Ai đó đang múa dưới tán anh đào.']
    ]
  },
  3: {
    oppId: 'koharu',
    flower: 'Anh đào và màn che',
    challenge: 'Giành lá Màn anh đào (Sakura ni Maku)',
    chKanji: '幕',
    check: (ctx) => ctx.playerCardIds.includes(9),
    cards: [[9, 'Màn che'], [10, 'Thăm đỏ'], [11, 'Lá anh đào'], [12, 'Lá anh đào']],
    pre: [
      ['ayame', 'Koharu Hinata. Cô ấy múa giỏi, uống rượu giỏi, và giữ tấm màn hội hoa rất chặt.'],
      ['opp', 'Mùa ngắm hoa mà chơi bài một mình thì phí lắm! Ngồi xuống đi lữ khách.'],
      ['me', 'Tôi muốn tấm màn anh đào của cô.'],
      ['opp', 'Ha! Có màn che rồi chỉ thiếu chén rượu là thành Hanami-zake. Thử lấy xem!']
    ],
    post: [
      ['opp', 'Ngươi lấy được tấm màn rồi. Lần sau mang theo chén rượu cúc, ta sẽ múa cho xem.'],
      ['ayame', 'Mùa xuân đã mở. Lá nào còn thiếu, ta sẽ quay lại tìm.']
    ]
  }
};

// Gia huy (kamon) SVG, tô màu được
export const STORY_CRESTS = {
  sakura: { name: 'Anh đào', svg: (c) => { let p = ''; for (let i = 0; i < 5; i++) p += `<path transform="rotate(${i * 72} 50 50)" d="M50 50 C36 34 38 14 46 10 L50 16 L54 10 C62 14 64 34 50 50Z" fill="${c}"/>`; return p + '<circle cx="50" cy="50" r="6" fill="#00000033"/>'; } },
  kiku: { name: 'Cúc', svg: (c) => { let p = ''; for (let i = 0; i < 16; i++) p += `<ellipse transform="rotate(${i * 22.5} 50 50)" cx="50" cy="24" rx="6" ry="20" fill="${c}"/>`; return p + `<circle cx="50" cy="50" r="12" fill="${c}" stroke="#00000033" stroke-width="3"/>`; } },
  tsuki: { name: 'Trăng', svg: (c) => `<path d="M62 14 A36 36 0 1 0 86 62 A28 28 0 1 1 62 14Z" fill="${c}"/><path d="M12 92 Q30 70 34 92 Q46 66 52 92 Q66 70 70 92 Q82 74 90 92Z" fill="${c}"/>` },
  ogi: { name: 'Quạt', svg: (c) => `<path d="M50 88 L10 40 A52 52 0 0 1 90 40 Z" fill="${c}"/><path d="M50 88 L22 30 M50 88 L36 22 M50 88 L50 20 M50 88 L64 22 M50 88 L78 30" stroke="#00000040" stroke-width="2.5"/><circle cx="50" cy="86" r="5" fill="${c}"/>` },
  nami: { name: 'Sóng', svg: (c) => { let p = ''; [[30, 80], [70, 80], [50, 62]].forEach(([x, y]) => { for (let r = 26; r > 4; r -= 7) p += `<path d="M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r} ${y}" fill="none" stroke="${c}" stroke-width="4"/>`; }); return p + `<rect x="4" y="80" width="92" height="6" fill="${c}"/>`; } },
  torii: { name: 'Cổng torii', svg: (c) => `<path d="M8 22 Q50 12 92 22 L90 30 Q50 22 10 30Z" fill="${c}"/><rect x="18" y="38" width="64" height="7" fill="${c}"/><rect x="26" y="28" width="9" height="62" fill="${c}"/><rect x="65" y="28" width="9" height="62" fill="${c}"/><rect x="46" y="30" width="8" height="10" fill="${c}"/>` }
};

export const STORY_CREST_COLORS = [
  { id: 'shu', name: 'Đỏ son', bg: '#b0301c' },
  { id: 'ai', name: 'Chàm', bg: '#1f3a5f' },
  { id: 'matcha', name: 'Trà xanh', bg: '#4c6b36' },
  { id: 'fuji', name: 'Tử đằng', bg: '#5d3f7a' },
  { id: 'sumi', name: 'Mực', bg: '#2a2622' }
];

// 4 chân dung lữ khách: img = chân dung có nền, cut = tách nền (hội thoại), koikoi = pop-up Koi-Koi.
// pos = khung cắt tròn quanh mặt cho avatar.
const TRAVELER_DIR = './public/assets/travelers';
export const STORY_TRAVELERS = {
  m1: { name: 'Áo chàm', pos: '50% 19%' },
  m2: { name: 'Lãng tử', pos: '46% 17%' },
  f1: { name: 'Kimono son', pos: '50% 21%' },
  f2: { name: 'Tử đằng', pos: '49% 22%' }
};
Object.entries(STORY_TRAVELERS).forEach(([k, t]) => {
  t.img = `${TRAVELER_DIR}/${k}.webp?v=1`;
  t.cut = `${TRAVELER_DIR}/${k}_cut.webp?v=1`;
  t.koikoi = `${TRAVELER_DIR}/${k}_koikoi.webp?v=1`;
});

export function createStoryProgress() {
  return {
    started: false,
    avatar: { name: '', portrait: 'm1', crest: 'sakura', color: 'shu' },
    stars: {},
    owned: {},
    petals: 0,
    cleared: []
  };
}

// Gộp save cũ với mặc định (save cũ có thể thiếu trường)
export function normalizeStoryProgress(raw) {
  const d = createStoryProgress();
  if (!raw || typeof raw !== 'object') return d;
  const avatar = { ...d.avatar, ...(raw.avatar || {}) };
  if (!STORY_CREST_COLORS.some((c) => c.id === avatar.color)) avatar.color = d.avatar.color;
  if (!STORY_CRESTS[avatar.crest]) avatar.crest = d.avatar.crest;
  avatar.name = String(avatar.name || '').slice(0, 16);
  const owned = {};
  Object.entries(raw.owned || {}).forEach(([m, arr]) => {
    owned[m] = Array.from(new Set((arr || []).map(Number).filter((k) => k >= 0 && k < 4)));
  });
  return {
    started: !!raw.started,
    avatar,
    stars: { ...(raw.stars || {}) },
    owned,
    petals: Number(raw.petals) || 0,
    cleared: Array.from(new Set((raw.cleared || []).map(Number)))
  };
}
