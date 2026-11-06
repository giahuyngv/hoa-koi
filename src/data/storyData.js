// Dữ liệu chế độ Cốt truyện "Hành trình 12 tháng" (đủ 4 chương, tháng 1–12).
// Tháng 1–3 lấy từ demo đã duyệt (docs/story-demo/hanh-trinh-12-thang.html).
// Tiến trình lưu ở saveData.storyProgress (xem createStoryProgress).
import { HANAFUDA_CARDS } from './cardsData.js';

export const STORY_PLAYABLE_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Lá Thú (Tane), dùng cho thử thách tháng 4
const STORY_TANE_IDS = HANAFUDA_CARDS.filter((c) => c.type === 'tane').map((c) => c.id);
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
      ['ayame', 'Mùa xuân đã mở. Phía trước là mùa Hạ, hoa tử đằng đang rủ.']
    ]
  },
  4: {
    oppId: 'shiori',
    flower: 'Tử đằng và đỗ quyên',
    challenge: 'Gom đủ 5 lá Thú (Tane) trong một ván',
    chKanji: '種',
    check: (ctx) => ctx.playerCardIds.filter((id) => STORY_TANE_IDS.includes(id)).length >= 5,
    cards: [[13, 'Đỗ quyên'], [14, 'Thăm đỏ'], [15, 'Lá tử đằng'], [16, 'Lá tử đằng']],
    pre: [
      ['ayame', 'Mùa Hạ bắt đầu ở hiên nhà Fujiwara. Công tử Shion giữ chùm tử đằng, và cả tiếng hót của chim đỗ quyên.'],
      ['opp', 'Lữ khách đi bộ từ núi Yoshino tới đây sao? Ngồi đi, hoa tử đằng rủ xuống chậm, ván bài của ta cũng vậy.'],
      ['me', 'Tôi xin bốn lá tử đằng. Ngài muốn tôi làm gì?'],
      ['opp', 'Người vội chỉ nhặt được hoa rụng. Hãy gom đủ năm con thú trên chiếu, ta sẽ biết ngươi biết chờ.']
    ],
    post: [
      ['opp', 'Ngươi kiên nhẫn hơn vẻ ngoài. Đỗ quyên chỉ hót cho người chịu ngồi yên, lá này là của ngươi.'],
      ['ayame', 'Đi tiếp về phía đầm nước. Tháng Năm là nhà của tôi.']
    ]
  },
  5: {
    oppId: 'ayame',
    flower: 'Diên vĩ và cầu tám nhịp',
    challenge: 'Giành lá Cầu gỗ Yatsuhashi',
    chKanji: '橋',
    check: (ctx) => ctx.playerCardIds.includes(17),
    cards: [[17, 'Cầu gỗ'], [18, 'Thăm đỏ'], [19, 'Lá diên vĩ'], [20, 'Lá diên vĩ']],
    // Ayame vừa là người dẫn đường vừa là chủ tháng 5: chỉ dùng 'opp' và 'me'
    pre: [
      ['opp', 'Đây là đầm diên vĩ, cây cầu tám nhịp bắc qua đây đã mấy trăm năm. Tôi chưa kể với lữ khách nhỉ?'],
      ['me', 'Chẳng lẽ người giữ bốn lá tháng Năm là cô?'],
      ['opp', 'Người dẫn đường cũng là một tinh linh. Tôi muốn biết lữ khách có đi nổi nửa còn lại của năm không.'],
      ['opp', 'Qua được cầu Yatsuhashi trên chiếu bài, tôi sẽ tiếp tục đi cùng. Lần này tôi không nương tay đâu.']
    ],
    post: [
      ['opp', 'Lữ khách bước qua cầu vững lắm. Diên vĩ tháng Năm là của lữ khách rồi.'],
      ['me', 'Vậy cô vẫn đi cùng tôi chứ?'],
      ['opp', 'Tất nhiên. Phía trước là phố hoa, nơi Yukiho đang đợi dưới tán mẫu đơn.']
    ]
  },
  6: {
    oppId: 'yukiho',
    flower: 'Mẫu đơn và bướm',
    challenge: 'Giành lá Hồ điệp mẫu đơn',
    chKanji: '蝶',
    check: (ctx) => ctx.playerCardIds.includes(21),
    cards: [[21, 'Hồ điệp'], [22, 'Thăm xanh'], [23, 'Lá mẫu đơn'], [24, 'Lá mẫu đơn']],
    pre: [
      ['ayame', 'Yukiho Katsuragi, hoa khôi của phố đèn lồng. Cả kinh thành xếp hàng chỉ để được cô ấy rót một chén trà.'],
      ['opp', 'Một lữ khách lấm bụi đường dám ngồi đối diện ta. Ngươi có biết mẫu đơn là vua của trăm hoa không?'],
      ['me', 'Tôi biết, và tôi cũng biết con bướm trên lá mẫu đơn không chịu đậu yên.'],
      ['opp', 'Thú vị. Bắt được hồ điệp của ta trên chiếu, ta sẽ cho ngươi vào vườn.']
    ],
    post: [
      ['opp', 'Con bướm chọn ngươi. Ta không ghen đâu, chỉ hơi tiếc một chút.'],
      ['ayame', 'Mùa Hạ đã khép. Gió thu thổi từ đồi hồ chi, và có tiếng cười rất lớn.']
    ]
  },
  7: {
    oppId: 'tsunade',
    flower: 'Hồ chi và lợn rừng',
    challenge: 'Hoàn thành bộ Inoshikachō (Lợn, Hươu, Bướm)',
    chKanji: '猪鹿蝶',
    check: (ctx) => [21, 25, 37].every((id) => ctx.playerCardIds.includes(id)),
    cards: [[25, 'Lợn rừng'], [26, 'Thăm đỏ'], [27, 'Lá hồ chi'], [28, 'Lá hồ chi']],
    pre: [
      ['ayame', 'Công chúa Tsunade. Bà ấy thắng trên chiếu bạc nhiều đến mức con lợn rừng trên lá bài cũng phải nghe lời.'],
      ['opp', 'Ha! Nhóc lữ khách đi được nửa năm rồi à? Chiếu này không có chỗ cho người chơi rụt rè đâu.'],
      ['me', 'Tôi không rụt rè. Bà muốn cược gì?'],
      ['opp', 'Lợn, hươu, bướm. Gom đủ cả ba trong một ván trước mặt ta, bốn lá hồ chi là của ngươi.']
    ],
    post: [
      ['opp', 'Được lắm! Lâu rồi mới có đứa làm ta đổ mồ hôi. Cầm lấy, và đừng thua ai trước khi gặp lại ta.'],
      ['ayame', 'Đêm nay trăng rằm. Trên đồi cỏ lau, công chúa Nguyệt Cung đã xuống trần.']
    ]
  },
  8: {
    oppId: 'kaguya',
    flower: 'Cỏ lau và trăng rằm',
    challenge: 'Hoàn thành bộ Tsukimi-zake (Trăng + Chén rượu)',
    chKanji: '月見',
    check: (ctx) => [29, 33].every((id) => ctx.playerCardIds.includes(id)),
    cards: [[29, 'Trăng rằm'], [30, 'Nhạn bay'], [31, 'Lá cỏ lau'], [32, 'Lá cỏ lau']],
    pre: [
      ['ayame', 'Kaguya Tsukuyomi. Cô ấy từ chối năm vị hoàng tử, và chưa từng thua một ván dưới trăng.'],
      ['opp', 'Người trần thường mang quà tới để xin ta. Ngươi mang gì?'],
      ['me', 'Không có quà. Chỉ có một ván bài và mong muốn trả bộ bài về chỗ cũ.'],
      ['opp', 'Thẳng thắn. Vậy hãy ngắm trăng với ta: trăng rằm và chén rượu cúc, cùng trong một ván.']
    ],
    post: [
      ['opp', 'Lần đầu có người ngắm trăng cùng ta mà không đòi gì thêm. Lá trăng này ta tặng.'],
      ['ayame', 'Chén rượu cúc vừa rồi... chủ của nó đang đợi ở tháng Chín.']
    ]
  },
  9: {
    oppId: 'kikumaru',
    flower: 'Cúc và chén rượu',
    challenge: 'Giành lá Chén rượu cúc (Thọ tửu)',
    chKanji: '盃',
    check: (ctx) => ctx.playerCardIds.includes(33),
    cards: [[33, 'Chén rượu'], [34, 'Thăm xanh'], [35, 'Lá cúc'], [36, 'Lá cúc']],
    pre: [
      ['ayame', 'Núi Ōe, nơi Shuten Kikumaru uống rượu hoa cúc mỗi đêm. Người ta nói uống một chén là sống thêm mười năm.'],
      ['opp', 'Khách hiếm đấy. Nghe đâu ngươi đã mượn chén của ta để ngắm trăng với Kaguya?'],
      ['me', 'Chỉ trên lá bài thôi. Giờ tôi muốn giữ hẳn nó.'],
      ['opp', 'Chén rượu này chưa rời tay ta bao giờ. Giành được nó trên chiếu thì nó là của ngươi.']
    ],
    post: [
      ['opp', 'Tay ngươi vững hơn kẻ say. Cầm chén đi, nhớ rót cho Koharu một chén như cô ta dặn.'],
      ['ayame', 'Rừng phong phía tây đã đỏ. Có người cầm kiếm đứng đó từ đầu mùa thu.']
    ]
  },
  10: {
    oppId: 'renji',
    flower: 'Phong đỏ và hươu',
    challenge: 'Hoàn thành bộ Aotan (3 thăm xanh)',
    chKanji: '青短',
    check: (ctx) => [22, 34, 38].every((id) => ctx.playerCardIds.includes(id)),
    cards: [[37, 'Hươu sao'], [38, 'Thăm xanh'], [39, 'Lá phong'], [40, 'Lá phong']],
    pre: [
      ['ayame', 'Renji Akatsuki, kiếm thánh của rừng phong. Ông ấy nhìn ván bài như nhìn một trận đấu kiếm.'],
      ['opp', 'Mười tháng. Ngươi đi xa đấy, nhưng xa chưa chắc đã giỏi.'],
      ['me', 'Xin ngài chỉ giáo.'],
      ['opp', 'Ba tấm thăm xanh: mẫu đơn, cúc, phong. Ba đường kiếm trong một nhịp. Gom đủ trong một ván.']
    ],
    post: [
      ['opp', 'Đường bài gọn, không thừa một nước. Con hươu này theo ngươi được rồi.'],
      ['ayame', 'Trời bắt đầu mưa. Dưới rặng liễu, âm dương sư Haruto đã bày sẵn chiếu.']
    ]
  },
  11: {
    oppId: 'haruto',
    flower: 'Liễu và người đội mưa',
    challenge: 'Giành lá Người đội mưa dưới liễu',
    chKanji: '雨',
    check: (ctx) => ctx.playerCardIds.includes(41),
    cards: [[41, 'Người đội mưa'], [42, 'Chim én'], [43, 'Thăm đỏ'], [44, 'Sấm sét']],
    pre: [
      ['ayame', 'Haruto Abe đọc được vận số trong từng giọt mưa. Cẩn thận, lá bài của ông ấy hay đổi chiều.'],
      ['opp', 'Ta đã thấy ngươi trong quẻ bói từ tháng Giêng. Quẻ nói ngươi sẽ tới, nhưng không nói ngươi sẽ thắng.'],
      ['me', 'Vậy ván này sẽ trả lời.'],
      ['opp', 'Người dưới mưa nhìn con ếch nhảy bảy lần mới tới cành liễu. Bắt được ông ấy, quẻ sẽ đổi.']
    ],
    post: [
      ['opp', 'Quẻ đã đổi. Mưa tạnh rồi, đi đi, Nữ đế đang đợi ở cây ngô đồng cuối cùng.'],
      ['ayame', 'Chỉ còn một tháng. Lữ khách sẵn sàng chưa?']
    ]
  },
  12: {
    oppId: 'amaterasu',
    flower: 'Ngô đồng và phượng hoàng',
    challenge: 'Giành lá Phượng hoàng',
    chKanji: '鳳凰',
    check: (ctx) => ctx.playerCardIds.includes(45),
    cards: [[45, 'Phượng hoàng'], [46, 'Lá đáy vàng'], [47, 'Lá ngô đồng'], [48, 'Lá ngô đồng']],
    pre: [
      ['ayame', 'Tháng Chạp. Amaterasu Hōō là người đã xé bộ bài thành mười hai phần.'],
      ['opp', 'Ngươi đã đi qua mười một tháng. Ta muốn xem kẻ dám ghép lại năm cũ trông thế nào.'],
      ['me', 'Vì sao người lại xé bộ bài?'],
      ['opp', 'Để xem có ai đủ kiên nhẫn đi hết bốn mùa. Phượng hoàng chỉ đậu trên cây ngô đồng, hãy giành nó từ tay ta.']
    ],
    post: [
      ['opp', 'Phượng hoàng đã chọn ngươi. Mười hai tháng, bốn mươi tám lá, bộ bài hoa lại liền một mối.'],
      ['ayame', 'Lữ khách làm được rồi. Năm mới sắp tới, hạc tháng Giêng lại bay về.'],
      ['opp', 'Lá nào còn thiếu, cứ quay lại tìm từng tháng. Ta sẽ đợi một ván nữa.']
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
