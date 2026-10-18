(function () {
  "use strict";

  // ============================================================================
  // FILE: src/data/cardsData.js
  // ============================================================================
// Complete 48-Card Hanafuda Deck Database (12 Months x 4 Cards)
// Includes authentic Japanese names, Vietnamese translations, categories, Yaku tags, and visual motifs.

const MONTHS_INFO = [
  {
    month: 1,
    jpName: 'Matsu (松)',
    viName: 'Tháng 1 - Tùng (Thông)',
    flower: 'Cây Tùng (Pine)',
    season: 'Xuân',
    symbolism: 'Biểu tượng của sự trường thọ, kiên cường trong sương tuyết đầu năm mới.',
    accentColor: '#2d6a4f'
  },
  {
    month: 2,
    jpName: 'Ume (梅)',
    viName: 'Tháng 2 - Mai Đỏ',
    flower: 'Hoa Mai Mơ (Plum Blossom)',
    season: 'Xuân',
    symbolism: 'Loài hoa nở sớm nhất bất chấp giá lạnh cuối đông, báo hiệu mùa xuân về.',
    accentColor: '#d90429'
  },
  {
    month: 3,
    jpName: 'Sakura (桜)',
    viName: 'Tháng 3 - Anh Đào',
    flower: 'Hoa Anh Đào (Cherry Blossom)',
    season: 'Xuân',
    symbolism: 'Vẻ đẹp rực rỡ nhưng mong manh của mùa lễ hội thưởng hoa (Hanami).',
    accentColor: '#ff758f'
  },
  {
    month: 4,
    jpName: 'Fuji (藤)',
    viName: 'Tháng 4 - Tử Đằng',
    flower: 'Hoa Tử Đằng (Wisteria)',
    season: 'Hạ',
    symbolism: 'Những chùm hoa tím rủ xuống duyên dáng tượng trưng cho tình yêu và sự thanh tao.',
    accentColor: '#7209b7'
  },
  {
    month: 5,
    jpName: 'Ayame (菖蒲)',
    viName: 'Tháng 5 - Diên Vĩ',
    flower: 'Hoa Diên Vĩ (Iris)',
    season: 'Hạ',
    symbolism: 'Mọc bên đầm nước và cầu gỗ tám nhịp, xua đuổi tà khí trong tiết Đoan Ngọ.',
    accentColor: '#4361ee'
  },
  {
    month: 6,
    jpName: 'Botan (牡丹)',
    viName: 'Tháng 6 - Mẫu Đơn',
    flower: 'Hoa Mẫu Đơn (Peony)',
    season: 'Hạ',
    symbolism: 'Vua của các loài hoa, biểu trưng cho phú quý, vương giả và vinh hoa.',
    accentColor: '#e63946'
  },
  {
    month: 7,
    jpName: 'Hagi (萩)',
    viName: 'Tháng 7 - Hồ Chi',
    flower: 'Cỏ Đậu Khấu (Bush Clover)',
    season: 'Thu',
    symbolism: 'Thảo mộc đầu thu đung đưa trong gió núi, nơi lợn rừng phóng qua.',
    accentColor: '#b5179e'
  },
  {
    month: 8,
    jpName: 'Susuki (芒)',
    viName: 'Tháng 8 - Cỏ Lau',
    flower: 'Đồi Cỏ Lau (Pampas Grass)',
    season: 'Thu',
    symbolism: 'Cánh đồng cỏ lau bạc dưới ánh trăng rằm tháng tám (Tsukimi).',
    accentColor: '#e76f51'
  },
  {
    month: 9,
    jpName: 'Kiku (菊)',
    viName: 'Tháng 9 - Cúc Vàng',
    flower: 'Hoa Cúc (Chrysanthemum)',
    season: 'Thu',
    symbolism: 'Quốc hoa của Hoàng gia Nhật Bản, gắn liền với tiệc rượu hoa cúc trường thọ.',
    accentColor: '#f4a261'
  },
  {
    month: 10,
    jpName: 'Momiji (紅葉)',
    viName: 'Tháng 10 - Phong Đỏ',
    flower: 'Lá Phong Thu (Maple)',
    season: 'Thu',
    symbolism: 'Rừng phong nhuộm đỏ cả núi đồi, nơi hươu sao cất tiếng gọi bạn.',
    accentColor: '#c1121f'
  },
  {
    month: 11,
    jpName: 'Yanagi (柳)',
    viName: 'Tháng 11 - Liễu Mưa',
    flower: 'Cây Liễu (Willow)',
    season: 'Đông',
    symbolism: 'Cơn mưa lạnh đầu đông và câu chuyện kiên trì của Ono no Michikaze.',
    accentColor: '#2a9d8f'
  },
  {
    month: 12,
    jpName: 'Kiri (桐)',
    viName: 'Tháng 12 - Ngô Đồng',
    flower: 'Hoa Ngô Đồng (Paulownia)',
    season: 'Đông',
    symbolism: 'Loài cây thần mộc duy nhất mà chim Phượng Hoàng chọn để đậu xuống.',
    accentColor: '#6d597a'
  }
];

const CARD_TYPES = {
  hikari: {
    id: 'hikari',
    jpName: 'Hikari (光)',
    viName: 'Quang (20đ)',
    points: 20,
    badgeColor: '#ffd166',
    description: '5 lá bài quý giá nhất bộ bài, mang ánh sáng của tự nhiên và thần thoại.'
  },
  tane: {
    id: 'tane',
    jpName: 'Tane (種)',
    viName: 'Thú / Vật (10đ)',
    points: 10,
    badgeColor: '#ef476f',
    description: '9 lá bài khắc họa chim muông, thú rừng, cầu gỗ và chén rượu Sake.'
  },
  tanzaku: {
    id: 'tanzaku',
    jpName: 'Tanzaku (短冊)',
    viName: 'Dải Thơ (5đ)',
    points: 5,
    badgeColor: '#118ab2',
    description: '10 lá bài có dải giấy viết thơ buộc trên cành cây (Đỏ chữ, Xanh tím, Đỏ trơn).'
  },
  kasu: {
    id: 'kasu',
    jpName: 'Kasu (カス)',
    viName: 'Lá Thường (1đ)',
    points: 1,
    badgeColor: '#8d99ae',
    description: '24 lá bài chỉ khắc họa hoa lá thuần túy, tích lũy đủ 10 lá sẽ tạo thành Yaku.'
  }
};

const HANAFUDA_CARDS = [
  // ================= MONTH 1: MATSU (PINE) =================
  {
    id: 1,
    month: 1,
    indexInMonth: 1,
    jpName: 'Matsu ni Tsuru',
    kanji: '松に鶴',
    viName: 'Tùng Hạc Diên Niên',
    type: 'hikari',
    points: 20,
    tags: ['hikari', 'dry_hikari', 'crane'],
    motif: 'pine_crane',
    lore: 'Chim Hạc đầu đỏ đứng uy nghiêm dưới gốc Tùng cổ thụ và mặt trời mọc đầu năm.'
  },
  {
    id: 2,
    month: 1,
    indexInMonth: 2,
    jpName: 'Matsu ni Akatan',
    kanji: '松に赤短',
    viName: 'Tùng Xích Đan (Thơ Đỏ)',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'akatan'],
    ribbonText: 'あかよろし',
    motif: 'pine_ribbon',
    lore: 'Dải giấy đỏ khắc dòng chữ cổ "Akayoroshi" (Rất đỗi tốt lành), thuộc bộ Xích Đan.'
  },
  {
    id: 3,
    month: 1,
    indexInMonth: 3,
    jpName: 'Matsu no Kasu 1',
    kanji: '松のカス',
    viName: 'Tùng Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'pine_plain_1',
    lore: 'Tán lá thông xanh kiên cường trước gió xuân.'
  },
  {
    id: 4,
    month: 1,
    indexInMonth: 4,
    jpName: 'Matsu no Kasu 2',
    kanji: '松のカス',
    viName: 'Tùng Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'pine_plain_2',
    lore: 'Thân thông già vươn mình đón nắng mới.'
  },

  // ================= MONTH 2: UME (PLUM) =================
  {
    id: 5,
    month: 2,
    indexInMonth: 1,
    jpName: 'Ume ni Uguisu',
    kanji: '梅に鴬',
    viName: 'Mai Hoàng Oanh',
    type: 'tane',
    points: 10,
    tags: ['tane', 'bird'],
    motif: 'plum_warbler',
    lore: 'Chim Hoàng Oanh (Uguisu) hót vang trên cành hoa Mai đỏ, báo tin xuân ấm áp.'
  },
  {
    id: 6,
    month: 2,
    indexInMonth: 2,
    jpName: 'Ume ni Akatan',
    kanji: '梅に赤短',
    viName: 'Mai Xích Đan (Thơ Đỏ)',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'akatan'],
    ribbonText: 'あかよろし',
    motif: 'plum_ribbon',
    lore: 'Dải thơ đỏ treo giữa những đóa mai thắm, mảnh ghép thứ hai của bộ Xích Đan.'
  },
  {
    id: 7,
    month: 2,
    indexInMonth: 3,
    jpName: 'Ume no Kasu 1',
    kanji: '梅のカス',
    viName: 'Mai Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'plum_plain_1',
    lore: 'Cành mai đỏ nở rộ giữa trời xuân.'
  },
  {
    id: 8,
    month: 2,
    indexInMonth: 4,
    jpName: 'Ume no Kasu 2',
    kanji: '梅のカス',
    viName: 'Mai Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'plum_plain_2',
    lore: 'Những nụ hoa mai e ấp trong sương sớm.'
  },

  // ================= MONTH 3: SAKURA (CHERRY BLOSSOM) =================
  {
    id: 9,
    month: 3,
    indexInMonth: 1,
    jpName: 'Sakura ni Maku',
    kanji: '桜に幕',
    viName: 'Màn Hoa Anh Đào',
    type: 'hikari',
    points: 20,
    tags: ['hikari', 'dry_hikari', 'curtain', 'hanami'],
    motif: 'sakura_curtain',
    lore: 'Bức màn trướng lễ hội (Jinmaku) căng dưới tán Anh Đào, kết hợp cùng Chén Rượu tạo thành Hoa Kiến Tửu!'
  },
  {
    id: 10,
    month: 3,
    indexInMonth: 2,
    jpName: 'Sakura ni Akatan',
    kanji: '桜に赤短',
    viName: 'Anh Đào Xích Đan (Thơ Đỏ)',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'akatan'],
    ribbonText: 'みよしの',
    motif: 'sakura_ribbon',
    lore: 'Dải thơ đỏ viết chữ "Miyoshino" — vùng núi Yoshino nổi tiếng nhất Nhật Bản về hoa Anh Đào.'
  },
  {
    id: 11,
    month: 3,
    indexInMonth: 3,
    jpName: 'Sakura no Kasu 1',
    kanji: '桜のカス',
    viName: 'Anh Đào Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'sakura_plain_1',
    lore: 'Chùm hoa anh đào hồng phấn khoe sắc.'
  },
  {
    id: 12,
    month: 3,
    indexInMonth: 4,
    jpName: 'Sakura no Kasu 2',
    kanji: '桜のカス',
    viName: 'Anh Đào Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'sakura_plain_2',
    lore: 'Cánh hoa anh đào bay theo làn gió xuân.'
  },

  // ================= MONTH 4: FUJI (WISTERIA) =================
  {
    id: 13,
    month: 4,
    indexInMonth: 1,
    jpName: 'Fuji ni Hototogisu',
    kanji: '藤に不如帰',
    viName: 'Tử Đằng Chim Đỗ Quyên',
    type: 'tane',
    points: 10,
    tags: ['tane', 'bird'],
    motif: 'wisteria_cuckoo',
    lore: 'Chim Đỗ Quyên vỗ cánh bay ngang vầng trăng khuyết và giàn hoa Tử Đằng rủ bóng.'
  },
  {
    id: 14,
    month: 4,
    indexInMonth: 2,
    jpName: 'Fuji ni Tanzaku',
    kanji: '藤に短冊',
    viName: 'Tử Đằng Dải Đỏ',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'plain_tanzaku'],
    motif: 'wisteria_ribbon',
    lore: 'Dải giấy đỏ trơn đung đưa giữa những chuỗi hoa Tử Đằng tím.'
  },
  {
    id: 15,
    month: 4,
    indexInMonth: 3,
    jpName: 'Fuji no Kasu 1',
    kanji: '藤のカス',
    viName: 'Tử Đằng Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'wisteria_plain_1',
    lore: 'Chuỗi hoa Tử Đằng buông rủ bên hồ nước.'
  },
  {
    id: 16,
    month: 4,
    indexInMonth: 4,
    jpName: 'Fuji no Kasu 2',
    kanji: '藤のカス',
    viName: 'Tử Đằng Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'wisteria_plain_2',
    lore: 'Sắc tím Tử Đằng dịu mát ngày đầu hạ.'
  },

  // ================= MONTH 5: AYAME (IRIS) =================
  {
    id: 17,
    month: 5,
    indexInMonth: 1,
    jpName: 'Ayame ni Yatsuhashi',
    kanji: '菖蒲に八橋',
    viName: 'Cầu Gỗ Diên Vĩ',
    type: 'tane',
    points: 10,
    tags: ['tane'],
    motif: 'iris_bridge',
    lore: 'Cây cầu gỗ tám nhịp Yatsuhashi nổi tiếng trong Truyện Ise, bắc ngang đầm hoa Diên Vĩ.'
  },
  {
    id: 18,
    month: 5,
    indexInMonth: 2,
    jpName: 'Ayame ni Tanzaku',
    kanji: '菖蒲に短冊',
    viName: 'Diên Vĩ Dải Đỏ',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'plain_tanzaku'],
    motif: 'iris_ribbon',
    lore: 'Dải lụa đỏ nổi bật trên nền lá Diên Vĩ xanh biếc.'
  },
  {
    id: 19,
    month: 5,
    indexInMonth: 3,
    jpName: 'Ayame no Kasu 1',
    kanji: '菖蒲のカス',
    viName: 'Diên Vĩ Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'iris_plain_1',
    lore: 'Đóa Diên Vĩ tím vươn lên từ mặt nước.'
  },
  {
    id: 20,
    month: 5,
    indexInMonth: 4,
    jpName: 'Ayame no Kasu 2',
    kanji: '菖蒲のカス',
    viName: 'Diên Vĩ Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'iris_plain_2',
    lore: 'Lá Diên Vĩ sắc như thanh kiếm hộ mệnh.'
  },

  // ================= MONTH 6: BOTAN (PEONY) =================
  {
    id: 21,
    month: 6,
    indexInMonth: 1,
    jpName: 'Botan ni Chō',
    kanji: '牡丹に蝶',
    viName: 'Mẫu Đơn Hồ Điệp',
    type: 'tane',
    points: 10,
    tags: ['tane', 'inoshikacho', 'butterfly'],
    motif: 'peony_butterfly',
    lore: 'Đôi bướm vàng rập rờn bên đóa Mẫu Đơn đỏ thẫm — mảnh ghép quan trọng của bộ Trư-Lộc-Điệp (Ino-Shika-Chō).'
  },
  {
    id: 22,
    month: 6,
    indexInMonth: 2,
    jpName: 'Botan ni Aotan',
    kanji: '牡丹に青短',
    viName: 'Mẫu Đơn Thanh Đan (Dải Xanh)',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'aotan'],
    motif: 'peony_ribbon',
    lore: 'Dải giấy màu xanh tím (Aotan) quý phái, mở đầu cho tổ hợp Thanh Đan 5 điểm.'
  },
  {
    id: 23,
    month: 6,
    indexInMonth: 3,
    jpName: 'Botan no Kasu 1',
    kanji: '牡丹のカス',
    viName: 'Mẫu Đơn Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'peony_plain_1',
    lore: 'Đóa Mẫu Đơn bung nở đầy kiêu hãnh.'
  },
  {
    id: 24,
    month: 6,
    indexInMonth: 4,
    jpName: 'Botan no Kasu 2',
    kanji: '牡丹のカス',
    viName: 'Mẫu Đơn Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'peony_plain_2',
    lore: 'Cánh hoa Mẫu Đơn dày và rực rỡ.'
  },

  // ================= MONTH 7: HAGI (BUSH CLOVER) =================
  {
    id: 25,
    month: 7,
    indexInMonth: 1,
    jpName: 'Hagi ni Inoshishi',
    kanji: '萩に猪',
    viName: 'Hồ Chi Lợn Rừng (Trư)',
    type: 'tane',
    points: 10,
    tags: ['tane', 'inoshikacho', 'boar'],
    motif: 'clover_boar',
    lore: 'Chú lợn rừng dũng mãnh lao qua bụi Hồ Chi — mảnh ghép đầu tiên của bộ Trư-Lộc-Điệp.'
  },
  {
    id: 26,
    month: 7,
    indexInMonth: 2,
    jpName: 'Hagi ni Tanzaku',
    kanji: '萩に短冊',
    viName: 'Hồ Chi Dải Đỏ',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'plain_tanzaku'],
    motif: 'clover_ribbon',
    lore: 'Dải giấy đỏ vắt ngang những nhánh cỏ Hồ Chi mềm mại.'
  },
  {
    id: 27,
    month: 7,
    indexInMonth: 3,
    jpName: 'Hagi no Kasu 1',
    kanji: '萩のカス',
    viName: 'Hồ Chi Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'clover_plain_1',
    lore: 'Nhánh hoa Hồ Chi đỏ tím báo hiệu thu sang.'
  },
  {
    id: 28,
    month: 7,
    indexInMonth: 4,
    jpName: 'Hagi no Kasu 2',
    kanji: '萩のカス',
    viName: 'Hồ Chi Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'clover_plain_2',
    lore: 'Bụi cỏ Hồ Chi đung đưa trong sương thu.'
  },

  // ================= MONTH 8: SUSUKI (PAMPAS GRASS) =================
  {
    id: 29,
    month: 8,
    indexInMonth: 1,
    jpName: 'Susuki ni Tsuki',
    kanji: '芒に月',
    viName: 'Trăng Rằm Cỏ Lau',
    type: 'hikari',
    points: 20,
    tags: ['hikari', 'dry_hikari', 'moon', 'tsukimi'],
    motif: 'pampas_moon',
    lore: 'Vầng trăng rằm tháng Tám tỏa sáng trên bầu trời đỏ rực. Khi đi cùng Chén Rượu sẽ tạo nên Nguyệt Kiến Tửu!'
  },
  {
    id: 30,
    month: 8,
    indexInMonth: 2,
    jpName: 'Susuki ni Kari',
    kanji: '芒に雁',
    viName: 'Cỏ Lau Nhạn Bay',
    type: 'tane',
    points: 10,
    tags: ['tane', 'bird'],
    motif: 'pampas_geese',
    lore: 'Ba chú ngỗng trời nối đuôi nhau bay về phương Nam qua đồi cỏ lau chiều thu.'
  },
  {
    id: 31,
    month: 8,
    indexInMonth: 3,
    jpName: 'Susuki no Kasu 1',
    kanji: '芒のカス',
    viName: 'Cỏ Lau Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'pampas_plain_1',
    lore: 'Đồi cỏ lau nghiêng mình dưới gió thu.'
  },
  {
    id: 32,
    month: 8,
    indexInMonth: 4,
    jpName: 'Susuki no Kasu 2',
    kanji: '芒のカス',
    viName: 'Cỏ Lau Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'pampas_plain_2',
    lore: 'Bông cỏ lau trắng muốt trên sườn đồi.'
  },

  // ================= MONTH 9: KIKU (CHRYSANTHEMUM) =================
  {
    id: 33,
    month: 9,
    indexInMonth: 1,
    jpName: 'Kiku ni Sakazuki',
    kanji: '菊に盃',
    viName: 'Cúc Chén Rượu (Thọ Tửu)',
    type: 'tane',
    points: 10,
    tags: ['tane', 'kasu_bonus', 'sake', 'hanami', 'tsukimi'],
    motif: 'chrysanthemum_sake',
    lore: 'Chén rượu sơn mài đỏ khắc chữ Thọ (壽). Lá bài chiến lược bậc nhất: vừa là Thú, lại mở khóa Hoa Kiến Tửu & Nguyệt Kiến Tửu!'
  },
  {
    id: 34,
    month: 9,
    indexInMonth: 2,
    jpName: 'Kiku ni Aotan',
    kanji: '菊に青短',
    viName: 'Cúc Thanh Đan (Dải Xanh)',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'aotan'],
    motif: 'chrysanthemum_ribbon',
    lore: 'Dải giấy xanh tím bên những đóa cúc vàng — mảnh ghép thứ hai của bộ Thanh Đan.'
  },
  {
    id: 35,
    month: 9,
    indexInMonth: 3,
    jpName: 'Kiku no Kasu 1',
    kanji: '菊のカス',
    viName: 'Cúc Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'chrysanthemum_plain_1',
    lore: 'Hoa cúc vàng-đỏ thanh tao của mùa thu.'
  },
  {
    id: 36,
    month: 9,
    indexInMonth: 4,
    jpName: 'Kiku no Kasu 2',
    kanji: '菊のカス',
    viName: 'Cúc Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'chrysanthemum_plain_2',
    lore: 'Hương hoa cúc thoang thoảng trong tiết Trùng Cửu.'
  },

  // ================= MONTH 10: MOMIJI (MAPLE) =================
  {
    id: 37,
    month: 10,
    indexInMonth: 1,
    jpName: 'Momiji ni Shika',
    kanji: '紅葉に鹿',
    viName: 'Phong Đỏ Hươu Sao (Lộc)',
    type: 'tane',
    points: 10,
    tags: ['tane', 'inoshikacho', 'deer'],
    motif: 'maple_deer',
    lore: 'Chú hươu sao ngoảnh đầu dưới tán lá Phong đỏ rực — mảnh ghép hoàn thiện bộ Trư-Lộc-Điệp.'
  },
  {
    id: 38,
    month: 10,
    indexInMonth: 2,
    jpName: 'Momiji ni Aotan',
    kanji: '紅葉に青短',
    viName: 'Phong Đỏ Thanh Đan (Dải Xanh)',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'aotan'],
    motif: 'maple_ribbon',
    lore: 'Dải giấy xanh tím giữa rừng lá phong thu — mảnh ghép cuối cùng của bộ Thanh Đan.'
  },
  {
    id: 39,
    month: 10,
    indexInMonth: 3,
    jpName: 'Momiji no Kasu 1',
    kanji: '紅葉のカス',
    viName: 'Phong Đỏ Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'maple_plain_1',
    lore: 'Những chiếc lá phong năm cánh đỏ thẫm.'
  },
  {
    id: 40,
    month: 10,
    indexInMonth: 4,
    jpName: 'Momiji no Kasu 2',
    kanji: '紅葉のカス',
    viName: 'Phong Đỏ Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'maple_plain_2',
    lore: 'Lá phong rơi trên dòng suối mùa thu.'
  },

  // ================= MONTH 11: YANAGI (WILLOW) =================
  {
    id: 41,
    month: 11,
    indexInMonth: 1,
    jpName: 'Yanagi ni Ono no Michikaze',
    kanji: '柳に小野道風',
    viName: 'Người Đội Mưa Dưới Liễu (Vũ Quang)',
    type: 'hikari',
    points: 20,
    tags: ['hikari', 'rain_hikari'],
    motif: 'willow_rainman',
    lore: 'Danh sĩ thư pháp Ono no Michikaze cầm ô đứng dưới mưa nhìn chú ếch nhỏ kiên trì nhảy lên cành liễu.'
  },
  {
    id: 42,
    month: 11,
    indexInMonth: 2,
    jpName: 'Yanagi ni Tsubame',
    kanji: '柳に燕',
    viName: 'Liễu Chim Én',
    type: 'tane',
    points: 10,
    tags: ['tane', 'bird'],
    motif: 'willow_swallow',
    lore: 'Chim én sải cánh bay lượn trên mặt nước dưới rặng liễu rủ.'
  },
  {
    id: 43,
    month: 11,
    indexInMonth: 3,
    jpName: 'Yanagi ni Tanzaku',
    kanji: '柳に短冊',
    viName: 'Liễu Dải Đỏ',
    type: 'tanzaku',
    points: 5,
    tags: ['tanzaku', 'plain_tanzaku'],
    motif: 'willow_ribbon',
    lore: 'Dải thơ đỏ duy nhất của mùa đông treo trên cành liễu.'
  },
  {
    id: 44,
    month: 11,
    indexInMonth: 4,
    jpName: 'Yanagi ni Inazuma',
    kanji: '柳に稲妻',
    viName: 'Liễu Sấm Sét (Lôi Vũ)',
    type: 'kasu',
    points: 1,
    tags: ['kasu', 'lightning'],
    motif: 'willow_lightning',
    lore: 'Tia chớp đỏ rạch ngang bầu trời giông bão và những đám mây đen cuồn cuộn.'
  },

  // ================= MONTH 12: KIRI (PAULOWNIA) =================
  {
    id: 45,
    month: 12,
    indexInMonth: 1,
    jpName: 'Kiri ni Hōō',
    kanji: '桐に鳳凰',
    viName: 'Ngô Đồng Phượng Hoàng',
    type: 'hikari',
    points: 20,
    tags: ['hikari', 'dry_hikari', 'phoenix'],
    motif: 'paulownia_phoenix',
    lore: 'Chim thần Phượng Hoàng sải đôi cánh ngũ sắc rực rỡ trên hoa Ngô Đồng hoàng gia.'
  },
  {
    id: 46,
    month: 12,
    indexInMonth: 2,
    jpName: 'Kiri no Kasu (Ki)',
    kanji: '桐のカス（黄）',
    viName: 'Ngô Đồng Đáy Vàng',
    type: 'kasu',
    points: 1,
    tags: ['kasu', 'yellow_kiri'],
    motif: 'paulownia_plain_gold',
    lore: 'Lá Ngô Đồng đặc biệt có phần nền dưới nhuộm sắc vàng kim truyền thống.'
  },
  {
    id: 47,
    month: 12,
    indexInMonth: 3,
    jpName: 'Kiri no Kasu 1',
    kanji: '桐のカス',
    viName: 'Ngô Đồng Thường I',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'paulownia_plain_1',
    lore: 'Hoa và lá Ngô Đồng — gia huy truyền thống của triều đình Nhật Bản.'
  },
  {
    id: 48,
    month: 12,
    indexInMonth: 4,
    jpName: 'Kiri no Kasu 2',
    kanji: '桐のカス',
    viName: 'Ngô Đồng Thường II',
    type: 'kasu',
    points: 1,
    tags: ['kasu'],
    motif: 'paulownia_plain_2',
    lore: 'Chùm hoa Ngô Đồng tím nở vào dịp cuối năm.'
  }
];

function getCardById(id) {
  return HANAFUDA_CARDS.find((c) => c.id === id);
}

function getCardsByMonth(month) {
  return HANAFUDA_CARDS.filter((c) => c.month === month);
}

function getMonthInfo(month) {
  return MONTHS_INFO.find((m) => m.month === month);
}

  // ============================================================================
  // FILE: src/data/yakuData.js
  // ============================================================================
// Complete Koi-Koi Yaku (Tổ hợp điểm) Engine & Progress Tracker

const YAKU_CATALOG = [
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
function evaluateCapturedYaku(capturedCards, roundMonth = 1) {
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
function checkInitialHandYaku(handCards) {
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
function getYakuProgressHints(playerCaptured, opponentCaptured) {
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

  // ============================================================================
  // FILE: src/data/charactersData.js
  // ============================================================================
// 12 Ukiyo-e × Anime Opponents representing the 12 Months of Hanafuda & Classic Japanese Legends
// Each opponent has Personality, Folklore Archetype, AI Strategy, Stage Theme, Dialogues, Teasing/Praising Voice Lines & Rewards

const ANIME_OPPONENTS = [
  // ==========================================================================
  // THÁNG 1 (TÙNG HẠC) - TSURUHIME (ĐIỂN TÍCH HẠC BÁO ÂN - TSURU NO ONGAESHI)
  // ==========================================================================
  {
    id: 'tsuruhime',
    month: 1,
    monthLabel: 'Tháng 1 ・ Tùng Hạc',
    name: 'Tsuruhime',
    jpName: '鶴姫 ・ 鶴の恩返し',
    title: 'Tiên Hạc Báo Ân (Tháng 1)',
    gender: 'Nữ',
    age: 20,
    archetype: 'Điển Tích Hạc Báo Ân',
    difficulty: 1,
    difficultyLabel: '★☆☆☆☆ Nhập Môn',
    avatar: './public/assets/characters/tsuruhime.jpg?v=25',
    portrait: './public/assets/characters/cutout/tsuruhime.webp?v=1',
    themeColor: '#d93843',
    secondaryColor: '#ffe5e5',
    particleType: 'sakura',
    boardWood: 'tatami_warm',
    rewardCoins: 220,
    firstWinBonusCoins: 350,
    unlocksCardBack: 'back_urushi_red',
    unlocksCardSkin: null,
    bio: 'Lấy cảm hứng từ điển tích Hạc Báo Ân (Tsuru no Ongaeshi). Thiếu nữ 20 tuổi mang vẻ đẹp thanh tao thoát tục và ánh mắt phượng bí ẩn dưới làn sương tùng đầu xuân.',
    strategyHint: 'Lối đánh hiền hòa, ưu tiên thu thập các lá bài Tháng 1 (Tùng Hạc) và lá Thường (Kasu).',
    voiceProfile: {
      pitch: 1.32,
      rate: 1.0,
      baseFreq: 520
    },
    teaseVoiceLines: [
      {
        mood: '🦢 Dịu dàng khen ngợi',
        jp: 'まあ…お見事な打ち筋でございますね！',
        romaji: 'Maa... Omigoto na uchisuji de gozaimasu ne!',
        vi: 'Ôi chà... Bạn chơi hay lắm! Nước bài thanh thoát như cánh hạc đầu xuân vậy!'
      },
      {
        mood: '🥺 Khẽ trách yêu',
        jp: 'あの松の札…私が織っていたのに、いじわるです…',
        romaji: 'Ano matsu no fuda... Watashi ga otte ita no ni, ijiwaru desu...',
        vi: 'Lá bài Tùng đó em đang dệt dở mà... Ngươi nỡ lòng nào lấy mất của em!'
      },
      {
        mood: '😳 Đỏ mặt bối rối',
        jp: '覗かないでと言ったのに…もう、敵いませんね！',
        romaji: 'Nozokanaide to itta no ni... Mou, kanaimasu ne!',
        vi: 'Đã dặn đừng nhìn trộm bài của em rồi mà! Khá khen cho ngươi đã đọc thấu tâm tư!'
      }
    ],
    aiProfile: {
      skillLevel: 0.3,
      koiKoiGreed: 0.15,
      favoriteTags: ['crane', 'hikari', 'akatan'],
      defenseWeight: 0.1
    },
    dialogues: {
      intro: [
        'Xin chào ân nhân. Đầu xuân năm mới, hãy cùng thiếp thưởng trà và dệt một ván bài Tùng Hạc nhé! 🦢',
        'Xin đừng nhìn trộm lúc thiếp đang tính bài nha~'
      ],
      matchCard: [
        'Cành tùng đón gió xuân vừa vặn quá.',
        'Thiếp xin nhận cặp bài này để dệt gấm nhé.',
        'Một nhịp bài êm dịu.'
      ],
      captureBright: [
        'Cánh Hạc Đầu Xuân đã sải cánh dưới ánh mặt trời đỏ! 🌅',
        'Hào quang của lá Tùng Hạc thật ấm áp!'
      ],
      playerCaptureBright: [
        'Ôi... Ân nhân đã rước mất lá Quang của thiếp rồi.',
        'Nước bài của ngài sáng rực như mặt trời mọc vậy!'
      ],
      callKoiKoi: [
        'Khung cửi vẫn còn tơ... Thiếp xin phép KOI-KOI! 🦢',
        'Hãy để thiếp dệt thêm một nhịp nữa nhé — Koi-Koi!'
      ],
      playerCallKoiKoi: [
        'Ngài muốn cược tiếp sao? Thiếp sẽ cố gắng hết sức!',
        'Đôi cánh này sẽ không dễ dàng chùn bước đâu!'
      ],
      winRound: [
        'Tấm gấm mùa xuân đã dệt xong rồi, cảm ơn ngài đã nhường thiếp~',
        'Hiệp này cánh hạc đã gặp may rồi!'
      ],
      loseRound: [
        'Ngài quả thực tài hoa, khung cửi của thiếp theo không kịp rồi...',
        'Ván sau thiếp sẽ dệt khéo hơn nữa!'
      ],
      defeatMatch: [
        'Ân nhân đánh bài tuyệt đẹp! Xin gửi tặng ngài chiếc hộp Sơn Mài Chu Sa truyền thống để tạ ơn!'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 2 (MAI ĐIỂU) - MICHIZANE SUGAWARA (ĐIỂN TÍCH THẦN HỌC VẤN TENJIN & HOA MƠ BAY)
  // ==========================================================================
  {
    id: 'michizane',
    month: 2,
    monthLabel: 'Tháng 2 ・ Mai Điểu',
    name: 'Michizane Tenjin',
    jpName: '菅原 道真 ・ 飛梅天神',
    title: 'Thần Học Vấn Hoa Mơ (Tháng 2)',
    gender: 'Nam',
    age: 19,
    archetype: 'Điển Tích Thần Văn Học Tenjin',
    difficulty: 2,
    difficultyLabel: '★★☆☆☆ Sơ Cấp',
    avatar: './public/assets/characters/michizane.jpg?v=25',
    portrait: './public/assets/characters/cutout/michizane.webp?v=1',
    themeColor: '#3a86ff',
    secondaryColor: '#bde0fe',
    particleType: 'sakura',
    boardWood: 'tatami_warm',
    rewardCoins: 300,
    firstWinBonusCoins: 500,
    unlocksCardBack: 'back_kanagawa_wave',
    unlocksCardSkin: null,
    bio: 'Hóa thân tuổi 19 tuấn tú của học giả thiên tài Sugawara no Michizane trong điển tích cành hoa mơ bay ngàn dặm (Tobiume). Trầm tĩnh, sắc sảo và mang khí chất quý tộc lạnh lùng.',
    strategyHint: 'Chuyên săn tìm bộ Xích Đan (Akatan - Dải Thơ Đỏ) và lá Chim Oanh trên cành Mơ.',
    voiceProfile: {
      pitch: 0.92,
      rate: 1.0,
      baseFreq: 210
    },
    teaseVoiceLines: [
      {
        mood: '📜 Nho nhã tán thưởng',
        jp: 'ほう、見事な一手だ。君の才覚、感服したよ！',
        romaji: 'Hou, migoto na itte da. Kimi no saikaku, kanpuku shita yo!',
        vi: 'Khá khen cho ngươi! Nước bài vừa rồi uyên bác chẳng kém một câu thơ tuyệt cú!'
      },
      {
        mood: '😤 Khẽ nhíu mày hờn',
        jp: 'むっ…僕の紅短冊を先に詠まれるとはね。悔しいな！',
        romaji: 'Mu... Boku no akatanzaku wo saki ni yomareru to wa ne. Kuyashii na!',
        vi: 'Chà... Dải thơ đỏ ta đang định ngâm lại bị ngươi lấy mất. Bạn chơi hay lắm đấy!'
      },
      {
        mood: '🐦 Mỉm cười thách thức',
        jp: '東風吹かば…次は僕が鶯を飛ばしてみせるよ！',
        romaji: 'Kochi fukaba... Tsugi wa boku ga uguisu wo tobashite miseru yo!',
        vi: 'Gió đông vừa thổi... Lượt tới ta sẽ để chim Oanh Tháng 2 lật ngược thế cờ!'
      }
    ],
    aiProfile: {
      skillLevel: 0.48,
      koiKoiGreed: 0.25,
      favoriteTags: ['akatan', 'tanzaku', 'tane'],
      defenseWeight: 0.3
    },
    dialogues: {
      intro: [
        'Hương hoa mơ đầu xuân đã nở. Hãy cùng ta đối ẩm một ván bài văn chương nhé! 📜',
        'Mỗi dải thơ trên bàn đều ẩn chứa cơ duyên của người quân tử.'
      ],
      matchCard: [
        'Câu thơ này đối rất chỉnh.',
        'Chim Oanh đã đậu đúng cành mơ.',
        'Một nước đi hợp tình hợp lý.'
      ],
      captureBright: [
        'Ánh sáng của tri thức đã khai mở trên chiếu bài! ✨',
        'Thiên thời địa lợi đều hội tụ!'
      ],
      playerCaptureBright: [
        'Hảo thủ pháp! Ngươi đã nhìn thấu nước cờ của ta.',
        'Tài nghệ ấy quả xứng danh bậc kỳ tài.'
      ],
      callKoiKoi: [
        'Bài thơ này vẫn chưa viết tới câu kết... KOI-KOI! 📜',
        'Gió xuân còn thổi, ta xin cược tiếp — Koi-Koi!'
      ],
      playerCallKoiKoi: [
        'Khí phách lắm! Để xem ngươi sẽ viết tiếp ván bài này ra sao.',
        'Ta sẽ cẩn trọng phòng thủ trước đợt tấn công của ngươi.'
      ],
      winRound: [
        'Vần thơ đã trọn vẹn, đa tạ ngươi đã chỉ giáo.',
        'Sự kiên nhẫn luôn mang lại quả ngọt.'
      ],
      loseRound: [
        'Bút lực của ngươi sắc sảo hơn ta tưởng tượng đấy!',
        'Một thất bại đáng để ta ghi chép lại học hỏi.'
      ],
      defeatMatch: [
        'Trí tuệ của ngươi thật đáng kính nể! Xin tặng ngươi bức chạm khắc Sóng Thần Kanagawa làm kỷ vật!'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 3 (ANH ĐÀO) - KOHARU HINATA (ĐIỂN TÍCH VŨ NỮ SHIZUKA GOZEN NÚI YOSHINO)
  // ==========================================================================
  {
    id: 'koharu',
    month: 3,
    monthLabel: 'Tháng 3 ・ Anh Đào',
    name: 'Koharu Hinata',
    jpName: '日向 小春 ・ 吉野桜',
    title: 'Vũ Nữ Anh Đào Yoshino (Tháng 3)',
    gender: 'Nữ',
    age: 18,
    archetype: 'Điển Tích Vũ Nữ Shizuka Gozen',
    difficulty: 2,
    difficultyLabel: '★★☆☆☆ Sơ Cấp',
    avatar: './public/assets/characters/koharu.jpg?v=25',
    portrait: './public/assets/characters/cutout/koharu.webp?v=2',
    themeColor: '#ff758f',
    secondaryColor: '#ffb3c1',
    particleType: 'sakura',
    boardWood: 'tatami_warm',
    rewardCoins: 320,
    firstWinBonusCoins: 500,
    unlocksCardBack: 'back_sakura_gakuen',
    unlocksCardSkin: null,
    bio: 'Thiếu nữ vũ nữ 18 tuổi lấy cảm hứng từ nàng Shizuka Gozen múa quạt dưới rừng hoa Anh Đào núi Yoshino. Vẻ đẹp xuân thì rạng rỡ nhưng ẩn chứa ánh nhìn tinh nghịch đầy mê hoặc sau chiếc quạt gập.',
    strategyHint: 'Rất thích săn lá Rèm Hoa Anh Đào (Tháng 3) kết hợp với Chén Rượu Cúc (Tháng 9).',
    voiceProfile: {
      pitch: 1.35,
      rate: 1.06,
      baseFreq: 540
    },
    teaseVoiceLines: [
      {
        mood: '😤 Phồng má hờn dỗi',
        jp: 'もう〜！先輩、なかなかやりますね！',
        romaji: 'Mou~! Senpai, nakanaka yarimasu ne!',
        vi: 'Hứ~! Bạn chơi hay lắm đó nha! Đừng tưởng em sẽ chịu thua dễ vậy đâu!'
      },
      {
        mood: '🥺 Mếu máo trách yêu',
        jp: 'むぅ…その桜の幕、私が狙ってたのに！ずるいです！',
        romaji: 'Muu... Sono sakura no maku, watashi ga neratteta no ni! Zurui desu!',
        vi: 'Ư ư... Lá Rèm Anh Đào đó em đang nhắm mà! Tiền bối bắt bài hay quá, ăn hiếp em!'
      },
      {
        mood: '😳 Ngưỡng mộ đỏ mặt',
        jp: 'すごい…！やっぱり先輩は手強いですね！',
        romaji: 'Sugoi...! Yappari senpai wa tegowai desu ne!',
        vi: 'Bạn chơi hay lắm luôn á! Nước bài vừa rồi làm em trở tay không kịp!'
      },
      {
        mood: '💢 Dỗi quyết tâm',
        jp: 'ぷんぷん！次は絶対に取り返しますからね！',
        romaji: 'Pun-pun! Tsugi wa zettai ni torikaeshimasu kara ne!',
        vi: 'Dỗi thật sự luôn đó! Lượt sau em nhất định sẽ ăn lại bộ to hơn cho xem!'
      }
    ],
    aiProfile: {
      skillLevel: 0.42,
      koiKoiGreed: 0.24,
      favoriteTags: ['sakura', 'curtain', 'sake', 'akatan'],
      defenseWeight: 0.22
    },
    dialogues: {
      intro: [
        'Cánh hoa Anh Đào núi Yoshino đang bay kìa! Mình cùng mở tiệc Hoa Kiến Tửu trên chiếu bài nhé~ 🌸',
        'Em đã luyện múa quạt suốt mùa xuân, tiền bối đừng nương tay nha!'
      ],
      matchCard: [
        'Yay! Cánh hoa Anh Đào rơi đúng chỗ rồi nè!',
        'Hehe, em xin phép lấy cặp hoa này nha~',
        'Ồ, vừa khít nhịp quạt luôn!'
      ],
      captureBright: [
        'Oa!! Là lá Rèm Hoa Anh Đào 20 điểm lấp lánh kìa!! ✨',
        'Áaa, em bắt được lá Quang rồi, may quá đi mất!'
      ],
      playerCaptureBright: [
        'Hự... Tiền bối lấy mất lá Quang em đang nhắm rồi! 😢',
        'Giỏi quá đi! Nước đi đó của tiền bối sắc bén thật đấy!'
      ],
      callKoiKoi: [
        'Điệu múa mùa xuân vẫn chưa dừng đâu... KOI-KOI!! 🌸',
        'Trái tim em mách bảo ván này còn ăn to hơn! Koi-Koi!!'
      ],
      playerCallKoiKoi: [
        'Hể?! Tiền bối hô Koi-Koi sao?! Em phải cẩn thận mới được!',
        'Áp lực quá đi... nhưng em không bỏ cuộc đâu!'
      ],
      winRound: [
        'Yatta!! Em thắng hiệp này rồi nhé tiền bối~ 🎉',
        'Tổ hợp Yaku của em hoàn thành rồi! Vui quá đi!'
      ],
      loseRound: [
        'Hu hu, tiền bối tính bài siêu quá, em theo không kịp luôn...',
        'Ván sau em nhất định sẽ phục thù đó nha!'
      ],
      defeatMatch: [
        'Tiền bối quả thực rất cừ! Xin tặng tiền bối mẫu Mặt Lưng Anh Đào Yoshino làm kỷ niệm nhé! 💝'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 4 (TỬ ĐẰNG) - FUJIWARA SHION (VƯƠNG TÔN GIA TỘC FUJIWARA & HOA TỬ ĐẰNG)
  // ==========================================================================
  {
    id: 'shiori',
    month: 4,
    monthLabel: 'Tháng 4 ・ Tử Đằng',
    name: 'Fujiwara Shion',
    jpName: '藤原 紫音 ・ 藤の貴公子',
    title: 'Quý Công Tử Tử Đằng (Tháng 4)',
    gender: 'Nam',
    age: 25,
    archetype: 'Điển Tích Vương Tôn Gia Tộc Fujiwara',
    difficulty: 2,
    difficultyLabel: '★★☆☆☆ Sơ Cấp',
    avatar: './public/assets/characters/shiori.jpg?v=25',
    portrait: './public/assets/characters/cutout/shiori.webp?v=1',
    themeColor: '#9b5de5',
    secondaryColor: '#e0aaff',
    particleType: 'lantern',
    boardWood: 'shrine_cedar',
    rewardCoins: 360,
    firstWinBonusCoins: 550,
    unlocksCardBack: 'back_wisteria_moon',
    unlocksCardSkin: null,
    bio: 'Vương tôn 25 tuổi của gia tộc quyền quý Fujiwara thời Heian — lấy cảm hứng từ điển tích gia huy Hoa Tử Đằng (Fuji-mon) và chàng công tử Hikaru Genji. Mang vẻ đẹp phi giới tính đầy ma mị và ánh nhìn nửa khép quyến rũ.',
    strategyHint: 'Kiên nhẫn gom đủ 5 lá Thú (Tane) và 5 Dải Thơ (Tanzaku) để thắng chắc chắn.',
    voiceProfile: {
      pitch: 0.9,
      rate: 0.95,
      baseFreq: 185
    },
    teaseVoiceLines: [
      {
        mood: '💜 Mỉm cười phong lưu',
        jp: 'ふふ、お上手ですね…藤の花も揺れてしまいましたよ。',
        romaji: 'Fufu, ojouzu desu ne... Fuji no hana mo yurete shimaimashita yo.',
        vi: 'Fufu, bạn chơi hay lắm... Đến nhành hoa Tử Đằng trên vai ta cũng rung rinh vì nước cờ ấy!'
      },
      {
        mood: '😏 Trách nhẹ tao nhã',
        jp: 'やれやれ…ホトトギスの札まで奪うとは、つれないお人だ。',
        romaji: 'Yare yare... Hototogisu no fuda made ubau to wa, tsurenai ohito da.',
        vi: 'Ái chà... Ngay cả lá Chim Đỗ Quyên Tháng 4 ngươi cũng đoạt mất, thật biết cách làm khó ta.'
      },
      {
        mood: '✨ Khen ngợi quyến rũ',
        jp: '見事な読み筋だ。君との対局、ますます愉しくなってきたよ。',
        romaji: 'Migoto na yomisuji da. Kimi to no taikyoku, masumasu tanoshiku natte kita yo.',
        vi: 'Khá khen cho ngươi! Đánh với ngươi càng lúc càng khiến ta say mê đấy!'
      }
    ],
    aiProfile: {
      skillLevel: 0.5,
      koiKoiGreed: 0.28,
      favoriteTags: ['tane', 'tanzaku', 'kasu'],
      defenseWeight: 0.35
    },
    dialogues: {
      intro: [
        'Dưới giàn hoa Tử Đằng rủ bóng đêm xuân, mời tri kỷ cùng ta thưởng thức một ván bài phong lưu. 💜',
        'Tiếng chim Đỗ Quyên Tháng 4 đã ngân vang trên chiếu bài rồi.'
      ],
      matchCard: [
        'Nhành hoa tím đã tìm được tri âm.',
        'Ta xin nhận cặp bài này nhé.',
        'Nhẹ nhàng như gió thoảng qua giàn Tử Đằng.'
      ],
      captureBright: [
        'Ánh trăng và hoa tím cùng tỏa sáng rực rỡ trên tay ta! ✨',
        'Một lá Quang quý giá xứng tầm gia tộc Fujiwara!'
      ],
      playerCaptureBright: [
        'Ôi chà, ngươi nhanh tay thật đấy!',
        'Hào quang của lá bài rất hợp với khí chất của ngươi.'
      ],
      callKoiKoi: [
        'Hương hoa Tử Đằng vẫn còn nồng đượm... KOI-KOI! 💜',
        'Đêm còn dài, hãy để ta đi thêm vài nước nữa nhé — Koi-Koi!'
      ],
      playerCallKoiKoi: [
        'Ngươi muốn cược lớn sao? Thú vị lắm, ta xin奉 bồi!',
        'Ánh mắt quyết đoán của ngươi thật cuốn hút!'
      ],
      winRound: [
        'Giàn hoa Tử Đằng đã nở rộ trọn vẹn trong hiệp này rồi~',
        'Cảm ơn ngươi vì một hiệp đấu thật tao nhã.'
      ],
      loseRound: [
        'Ngươi tính bài khéo quá, ta xin nghiêng mình bái phục...',
        'Hiệp tới ta sẽ không để lộ sơ hở nữa đâu!'
      ],
      defeatMatch: [
        'Tài nghệ của ngươi thật xuất chúng! Xin trao tặng ngươi Mặt Lưng Tử Đằng Đêm Trăng của gia tộc Fujiwara!'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 5 (DIÊN VĨ) - AYAME SHIRAKAWA (ĐIỂN TÍCH CẦU YATSUHASHI & VU NỮ INARI)
  // ==========================================================================
  {
    id: 'ayame',
    month: 5,
    monthLabel: 'Tháng 5 ・ Diên Vĩ',
    name: 'Ayame Shirakawa',
    jpName: '白川 菖蒲 ・ 八橋稲荷',
    title: 'Hồ Tiên Cầu Yatsuhashi (Tháng 5)',
    gender: 'Nữ',
    age: 24,
    archetype: 'Điển Tích Cầu Tám Nhịp & Đền Inari',
    difficulty: 3,
    difficultyLabel: '★★★☆☆ Trung Cấp',
    avatar: './public/assets/characters/ayame.jpg?v=25',
    portrait: './public/assets/characters/cutout/ayame.webp?v=2',
    themeColor: '#7209b7',
    secondaryColor: '#e0aaff',
    particleType: 'lantern',
    boardWood: 'shrine_cedar',
    rewardCoins: 420,
    firstWinBonusCoins: 650,
    unlocksCardBack: 'back_kitsune_shrine',
    unlocksCardSkin: 'skin_sakura_pastel',
    bio: 'Kết hợp điển tích Cầu Tám Nhịp Yatsuhashi giữa đầm hoa Diên Vĩ và Hồ Tiên Vu Nữ đền Inari. Mỹ nhân 24 tuổi mang vẻ đẹp yêu mị, đôi mắt xanh lục bảo nửa khép viền chu sa đầy mê hoặc.',
    strategyHint: 'Ưu tiên gom bộ Thanh Đan (Aotan - 3 Dải Thơ Xanh) và phòng thủ chặt chẽ.',
    voiceProfile: {
      pitch: 1.18,
      rate: 0.96,
      baseFreq: 460
    },
    teaseVoiceLines: [
      {
        mood: '🦊 Cười mỉm bí ẩn',
        jp: 'ふふっ、なかなかお見事ですね。お稲荷様も驚いていますわ。',
        romaji: 'Fufu, nakanaka omigoto desu ne. O-Inari-sama mo odoroite imasu wa.',
        vi: 'Khá khen cho ngươi! Nước đi vừa rồi ngay cả thần Cáo Inari cũng phải bất ngờ đấy!'
      },
      {
        mood: '😤 Hờn mát vu nữ',
        jp: 'まあ…私の狙い札を先に取るとは、少し意地悪なお方ですね。',
        romaji: 'Maa... Watashi no neraifuda wo saki ni toru to wa, sukoshi ijiwaru na okata desu ne.',
        vi: 'Ôi chà... Bạn chơi hay lắm nhưng cũng hơi bị ác đó nha, dám chặn ngay lá bài thần đền!'
      },
      {
        mood: '✨ Tán thưởng thực lực',
        jp: 'お見事です！その読みの深さ、褒めて差し上げますわ。',
        romaji: 'Omigoto desu! Sono yomi no fukasa, homete sashiagemasu wa.',
        vi: 'Khá khen cho ngươi! Nhãn quan đọc bài sâu sắc như vậy thật đáng nể phục!'
      }
    ],
    aiProfile: {
      skillLevel: 0.56,
      koiKoiGreed: 0.32,
      favoriteTags: ['tanzaku', 'aotan', 'tane'],
      defenseWeight: 0.42
    },
    dialogues: {
      intro: [
        'Bên nhịp cầu gỗ Yatsuhashi nở đầy hoa Diên Vĩ, thần Cáo đã báo trước cuộc hội ngộ này. ⛩️',
        'Hãy để những lá bài phán xét vận mệnh của chúng ta.'
      ],
      matchCard: [
        'Duyên phận đã định sẵn cho cặp bài này.',
        'Một nhành hoa Diên Vĩ rơi đúng nhịp cầu.',
        'Như lời tiên tri của đền Inari.'
      ],
      captureBright: [
        'Ánh sáng thần linh đã soi chiếu xuống bàn đấu! ✨⛩️',
        'Lá Quang này mang phước lành của Bạch Hồ!'
      ],
      playerCaptureBright: [
        'Ồ... Có vẻ thần linh đang mỉm cười với bạn rồi đó.',
        'Một nước đi làm xoay chuyển cả quẻ bói của tôi.'
      ],
      callKoiKoi: [
        'Gió thần vẫn đang thổi qua cổng Torii... KOI-KOI! 🦊',
        'Quẻ bói báo hiệu đại cát — Tôi xin gọi Koi-Koi!'
      ],
      playerCallKoiKoi: [
        'Ồ, bạn muốn thách thức vận mệnh sao? Thú vị lắm.',
        'Cẩn thận kẻo lòng tham làm mờ mắt nhé, lữ khách.'
      ],
      winRound: [
        'Thần linh đã ban phước cho hiệp đấu này. Cảm ơn vì ván bài tuyệt đẹp.',
        'Mọi lá bài đều đã về đúng vị trí của nó.'
      ],
      loseRound: [
        'Quẻ bói của tôi đã sai sao...? Bạn thật sự rất đáng gờm.',
        'Tôi xin ghi nhận thất bại này với lòng kính trọng.'
      ],
      defeatMatch: [
        'Bạn đã vượt qua thử thách của Đền Inari! Xin trao tặng bạn Bùa Hộ Mệnh Bạch Hồ và Giao Diện Anh Đào Phấn!'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 6 (MẪU ĐƠN) - YUKIHO KATSURAGI (ĐIỂN TÍCH HOA KHÔI YOSHINO TAYŪ)
  // ==========================================================================
  {
    id: 'yukiho',
    month: 6,
    monthLabel: 'Tháng 6 ・ Mẫu Đơn',
    name: 'Yukiho Katsuragi',
    jpName: '葛城 雪穂 ・ 牡丹太夫',
    title: 'Đệ Nhất Hoa Khôi Mẫu Đơn (Tháng 6)',
    gender: 'Nữ',
    age: 29,
    archetype: 'Điển Tích Danh Kỹ Yoshino Tayū',
    difficulty: 3,
    difficultyLabel: '★★★☆☆ Trung Cấp',
    avatar: './public/assets/characters/yukiho.jpg?v=25',
    portrait: './public/assets/characters/cutout/yukiho.webp?v=1',
    themeColor: '#e63946',
    secondaryColor: '#ffb703',
    particleType: 'gold',
    boardWood: 'urushi_black',
    rewardCoins: 520,
    firstWinBonusCoins: 850,
    unlocksCardBack: 'back_oiran_gold',
    unlocksCardSkin: 'skin_kintsugi_gold',
    bio: 'Đệ nhất danh kỹ Oiran 29 tuổi lấy cảm hứng từ huyền thoại Yoshino Tayū thời Edo. Ở độ chín muồi rực rỡ nhất của nhan sắc, nàng làm say đắm cả kinh thành bằng tà áo Mẫu Đơn đỏ thẫm và ánh nhìn quyền lực.',
    strategyHint: 'Rất giỏi gom bộ Thanh Đan (Aotan - Mẫu Đơn, Cúc, Phong) và biết dừng đúng lúc khi điểm cao.',
    voiceProfile: {
      pitch: 1.08,
      rate: 0.9,
      baseFreq: 410
    },
    teaseVoiceLines: [
      {
        mood: '💋 Liếc mắt hờn dỗi',
        jp: 'あらあら〜、わっちの牡丹を横取りするなんて、いけずなお人ね！',
        romaji: 'Ara ara~, wacchi no botan wo yokodori suru nante, ikezu na ohito ne!',
        vi: 'Ái chà chà~ Dám cướp đóa Mẫu Đơn của thiếp sao, ngươi chơi hay mà đáng ghét lắm đấy!'
      },
      {
        mood: '🪭 Phe phẩy quạt khen',
        jp: 'お見事どすえ！あんさん、ほんまに手強いお方やなぁ♡',
        romaji: 'Omigoto dosu e! Ansan, honma ni tegowai ohito ya naa~',
        vi: 'Bạn chơi hay lắm đó nha! Càng đánh với chàng, thiếp lại càng thấy say mê rồi đấy♡'
      },
      {
        mood: '😤 Dỗi nhẹ kiêu kỳ',
        jp: 'むぅ…レディに花を持たせてくれてもええやないの！',
        romaji: 'Muu... Redi ni hana wo motasete kuretemo ee yanai no!',
        vi: 'Hứ... Khá khen cho ngươi, nhưng chẳng biết nhường nhịn mỹ nhân chút nào cả!'
      }
    ],
    aiProfile: {
      skillLevel: 0.68,
      koiKoiGreed: 0.42,
      favoriteTags: ['aotan', 'butterfly', 'sake', 'hikari'],
      defenseWeight: 0.58
    },
    dialogues: {
      intro: [
        'Ara ara~ Chào mừng thượng khách. Đêm nay chàng muốn cược bao nhiêu Điểm Văn cùng đóa Mẫu Đơn này nào? 🌺',
        'Trong trà thất của thiếp, chỉ có kẻ sắc sảo nhất mới được mỉm cười cuối cùng thôi nhé~'
      ],
      matchCard: [
        'Cặp cánh bướm vàng này thuộc về thiếp nhé~',
        'Nhẹ nhàng như một cái chớp mắt.',
        'Cảm ơn chàng đã dâng lá bài đúng lúc nha~'
      ],
      captureBright: [
        'Ôi chà, lá Quang lấp lánh làm sao~ Giống hệt trâm vàng của thiếp vậy! ✨',
        'Xin lỗi chàng nhé, báu vật này thiếp xin nhận trước~'
      ],
      playerCaptureBright: [
        'Ái chà~ Thượng khách không biết thương hoa tiếc ngọc chút nào cả!',
        'Nước bài vừa rồi làm trái tim thiếp hơi loạn nhịp đấy nhé~'
      ],
      callKoiKoi: [
        'Đêm còn dài mà chàng vội gì chứ... KOI-KOI~ 💋',
        'Thiếp muốn xem bản lĩnh của chàng tới đâu — Koi-Koi nhé!'
      ],
      playerCallKoiKoi: [
        'Ồ~ Chàng định dồn thiếp vào chân tường sao? Thú vị thật đấy!',
        'Cẩn thận kẻo bị sắc hương làm hoa mắt nhé thượng khách~'
      ],
      winRound: [
        'Fufu, hiệp này phần thắng thuộc về thiếp rồi nha~',
        'Một ván bài hoàn hảo không tì vết!'
      ],
      loseRound: [
        'Ara... Chàng quả nhiên không phải tay mơ đâu nhé.',
        'Thiếp bất cẩn để chàng qua mặt mất rồi~'
      ],
      defeatMatch: [
        'Chàng thật biết cách chinh phục lòng người! Hãy nhận lấy Trâm Vàng Kanzashi và Bộ Bài Hoàng Kim Kintsugi của thiếp nhé! 🌺'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 7 (HỒ CHI) - CÔNG CHÚA TSUNADE (ĐIỂN TÍCH JIRAIYA GŌKETSU MONOGATARI)
  // ==========================================================================
  {
    id: 'tsunade',
    month: 7,
    monthLabel: 'Tháng 7 ・ Hồ Chi',
    name: 'Công Chúa Tsunade',
    jpName: '綱手姫 ・ 児雷也豪傑譚',
    title: 'Công Chúa Đỏ Đen Huyền Thoại (Tháng 7)',
    gender: 'Nữ',
    age: 36,
    archetype: 'Điển Tích Công Chúa Tsunade (Jiraiya)',
    difficulty: 4,
    difficultyLabel: '★★★★☆ Cao Thủ',
    avatar: './public/assets/characters/tsunade.jpg?v=25',
    portrait: './public/assets/characters/cutout/tsunade.webp?v=1',
    themeColor: '#2a9d8f',
    secondaryColor: '#e9c46a',
    particleType: 'gold',
    boardWood: 'autumn_maple',
    rewardCoins: 680,
    firstWinBonusCoins: 1100,
    unlocksCardBack: 'back_imperial_dragon',
    unlocksCardSkin: 'skin_sumie_ink',
    bio: 'Bước ra từ cổ tích hiệp khách "Jiraiya Gōketsu Monogatari". Mỹ nhân 36 tuổi mang vẻ đẹp trưởng thành rực lửa bất chấp thời gian, ấn chú tím trên trán và khí chất chị đại hào sảng trên chiếu bạc.',
    strategyHint: 'Cực kỳ máu lửa! Rất thích săn bộ Heo-Nai-Bướm (Ino-Shika-Chō) và sẵn sàng hô Koi-Koi liên hoàn để nhân đôi điểm.',
    voiceProfile: {
      pitch: 1.12,
      rate: 1.04,
      baseFreq: 440
    },
    teaseVoiceLines: [
      {
        mood: '🍶 Cười lớn hào sảng',
        jp: 'ハハッ！やるじゃないか！面白くなってきたねぇ！',
        romaji: 'Haha! Yaru janai ka! Omoshiroくなって kita nee!',
        vi: 'Haha! Khá khen cho ngươi! Đánh hay lắm, ván cược này bắt đầu nóng lên rồi đấy!'
      },
      {
        mood: '💢 Đập bàn hờn dỗi',
        jp: 'ちっ…！私の猪鹿蝶を邪魔するなんて、いい度胸じゃないか！',
        romaji: 'Chi...! Watashi no Ino-Shika-Chou wo jama suru nante, ii dokyou janai ka!',
        vi: 'Chậc...! Dám chặn bộ Heo-Nai-Bướm của bổn công chúa sao?! Bạn chơi hay mà gan to đấy!'
      },
      {
        mood: '🔥 Thách cược tất tay',
        jp: '見事な勝負勘だ！さあ、倍プッシュで来な！',
        romaji: 'Migoto na shoubukan da! Saa, bai pusshu de kina!',
        vi: 'Trực giác cờ bạc của ngươi nhạy bén lắm! Nào, ngon thì cược gấp đôi Koi-Koi với ta!'
      },
      {
        mood: '😤 Khoanh tay phục sát',
        jp: 'ふん、大したタマだよあんたは。次で全部取り返すけどね！',
        romaji: 'Fun, taishita tama da yo anta wa. Tsugi de zenbu torikaesu kedo ne!',
        vi: 'Hừ, khá khen cho ngươi! Nhưng ván sau bổn công chúa sẽ gỡ lại cả vốn lẫn lời cho xem!'
      }
    ],
    aiProfile: {
      skillLevel: 0.78,
      koiKoiGreed: 0.65,
      favoriteTags: ['boar', 'deer', 'butterfly', 'tane', 'sake'],
      defenseWeight: 0.5
    },
    dialogues: {
      intro: [
        'Ta là Công chúa Tsunade! Đã ngồi vào chiếu bài Hoa với ta thì chỉ có cược tất tay thôi nhé! 🐗🍶',
        'Hôm nay vận đỏ đang lên, để xem ai sẽ gom được bộ Heo-Nai-Bướm trước nào!'
      ],
      matchCard: [
        'Bắt gọn! Nước này là của ta!',
        'Haha, lá bài này vừa khít tay bổn công chúa!',
        'Một cú ra đòn chuẩn xác!'
      ],
      captureBright: [
        'Haha!! Độc đắc rồi! Lá Quang 20 điểm đã về tay Tsunade này! ✨',
        'Thấy chưa! Ai bảo vận may của ta kém nào?!'
      ],
      playerCaptureBright: [
        'Hả?! Ngươi vừa nẫng tay trên lá Quang của ta đấy à?!',
        'Khá lắm! Đánh thế mới xứng làm đối thủ trên sòng bài của ta chứ!'
      ],
      callKoiKoi: [
        'Tất tay luôn!! Bổn công chúa không bao giờ dừng ở điểm lẻ — KOI-KOI!! 🔥',
        'Nhân đôi tiền cược lên nào! KOI-KOI!!'
      ],
      playerCallKoiKoi: [
        'Haha! Ngươi dám hô Koi-Koi trước mặt Tsunade này sao?! Máu mặt đấy!',
        'Được lắm, để xem ai mới là kẻ cười cuối cùng trong ván cược này!'
      ],
      winRound: [
        'Thắng đậm rồi!! Hôm nay vận đỏ của bổn công chúa đã trở lại!',
        'Haha! Cược lớn thắng lớn, sảng khoái thật!'
      ],
      loseRound: [
        'Grrr... Lại cháy túi hiệp này rồi! Nhưng ván sau ta sẽ gỡ gấp đôi!',
        'Tay bài của ngươi đỏ thật đấy, bổn công chúa xin nhận thua hiệp này!'
      ],
      defeatMatch: [
        'Haha, tâm phục khẩu phục! Ngươi đúng là Kỳ Thủ Đỏ Đen số một! Cầm lấy Mặt Lưng Long Vương Hoàng Gia và Bộ Bài Thủy Mặc của ta đi!'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 8 (TRĂNG THU) - KAGUYA TSUKUYOMI (ĐIỂN TÍCH CÔNG CHÚA ỐNG TRE)
  // ==========================================================================
  {
    id: 'kaguya',
    month: 8,
    monthLabel: 'Tháng 8 ・ Trăng Thu',
    name: 'Kaguya Tsukuyomi',
    jpName: '月読 かぐや ・ 竹取物語',
    title: 'Công Chúa Nguyệt Cung (Tháng 8)',
    gender: 'Nữ',
    age: 26,
    archetype: 'Điển Tích Công Chúa Ống Tre',
    difficulty: 5,
    difficultyLabel: '★★★★★ Đại Kiện Tướng',
    avatar: './public/assets/characters/kaguya.jpg?v=25',
    portrait: './public/assets/characters/cutout/kaguya.webp?v=2',
    themeColor: '#f72585',
    secondaryColor: '#ffd166',
    particleType: 'celestial',
    boardWood: 'moon_palace',
    rewardCoins: 1000,
    firstWinBonusCoins: 2000,
    unlocksCardBack: 'back_tsukuyomi_moon',
    unlocksCardSkin: 'skin_ukiyoe_neon',
    bio: 'Nguyên mẫu từ kiệt tác cổ điển "Taketori Monogatari". Mỹ nhân Nguyệt Cung 26 tuổi với mái tóc bạch kim suôn dài, đôi mắt sắc lạnh kiêu kỳ dưới vầng trăng tròn Tháng 8.',
    strategyHint: 'Tuyệt kỹ Nguyệt Kiến Tửu (Trăng Rằm + Chén Rượu) và săn tìm Ngũ Quang với khả năng đọc bài siêu việt.',
    voiceProfile: {
      pitch: 1.22,
      rate: 0.94,
      baseFreq: 490
    },
    teaseVoiceLines: [
      {
        mood: '👑 Uy nghiêm tán thưởng',
        jp: 'ほう…人の子の身で、わらわを追い詰めるとは褒めてつかわす！',
        romaji: 'Hou... Hito no ko no mi de, warawa wo oitsumeru to wa homete tsukawasu!',
        vi: 'Ồ... Khá khen cho ngươi! Phàm nhân mà dám dồn ép cả Công Chúa Nguyệt Cung sao!'
      },
      {
        mood: '😤 Nữ thần hờn dỗi',
        jp: 'むぅ〜！わらわの月見酒を邪魔するでないわ！いじわる！',
        romaji: 'Muu~! Warawa no tsukimizake wo jama suru de nai wa! Ijiwaru!',
        vi: 'Hứ~! Không được phá tiệc thưởng nguyệt của ta chứ! Bạn chơi hay mà ác lắm nha!'
      },
      {
        mood: '🌕 Say mê tán phục',
        jp: '見事じゃ！そなたの打ち筋、月光のように美しいぞ！',
        romaji: 'Migoto ja! Sonata no uchisuji, gekkou no you ni utsukushii zo!',
        vi: 'Bạn chơi hay lắm! Đường bài của ngươi lấp lánh chẳng kém gì ánh trăng rằm Tháng 8!'
      }
    ],
    aiProfile: {
      skillLevel: 0.95,
      koiKoiGreed: 0.58,
      favoriteTags: ['hikari', 'moon', 'sake', 'phoenix', 'crane'],
      defenseWeight: 0.88
    },
    dialogues: {
      intro: [
        'Từ Nguyệt Cung xa xôi, ta mang theo vầng trăng tròn Tháng 8 xuống chiếu bài này. Liệu ngươi có giải được bài toán của Kaguya? 🌕',
        '48 lá bài là 48 mảnh ghép của nhân gian dưới ánh trăng thu.'
      ],
      matchCard: [
        'Hoa nở rồi lại tàn dưới ánh nguyệt quang.',
        'Vận mệnh đã nghiêng về phía Nguyệt Cung.',
        'Một giai điệu tuyệt đẹp của bốn mùa.'
      ],
      captureBright: [
        'Vạn vật quy phục dưới ánh sáng của Trăng Rằm Tháng 8! ✨🌕',
        'Hào quang thiên giới đang tỏa rạng trên tay ta!'
      ],
      playerCaptureBright: [
        'Ôi chà~ Một người phàm lại có thể chạm tới ánh sáng của Nguyệt Cung sao?',
        'Trái tim ta khẽ rung động trước nước bài đầy khí phách của ngươi.'
      ],
      callKoiKoi: [
        'Đêm trăng rằm chỉ vừa mới bắt đầu... KOI-KOI!! 🌕✨',
        'Hãy nhảy múa cùng ta thêm một khúc nhạc nữa nào — KOI-KOI!'
      ],
      playerCallKoiKoi: [
        'Thật dũng cảm! Dám thách thức cả Công Chúa Kaguya, ta rất tán thưởng!',
        'Hãy chứng minh rằng lời tuyên bố Koi-Koi của ngươi không phải là phù du!'
      ],
      winRound: [
        'Ánh trăng vĩnh cửu đã bao trùm toàn bộ bàn đấu.',
        'Một ván đấu tuyệt mỹ, nhưng ngôi vương vẫn thuộc về Nguyệt Cung.'
      ],
      loseRound: [
        'Tuyệt diệu...! Ngươi đã khiến cả mặt trăng phải lu mờ trước trí tuệ ấy!',
        'Hàng ngàn năm qua, chưa ai mang lại cho ta niềm vui sướng đến nhường này.'
      ],
      defeatMatch: [
        'Ngươi đã giải được thử thách khó nhất của Kaguya! Hãy nhận lấy Mặt Lưng Nguyệt Cung Thần Thoại và Bộ Bài Ukiyo-e Ánh Trăng! 👑'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 9 (CÚC RƯỢU) - SHUTEN KIKUMARU (ĐIỂN TÍCH TỬU THÔN ĐỒNG TỬ & TIỆC CÚC)
  // ==========================================================================
  {
    id: 'kikumaru',
    month: 9,
    monthLabel: 'Tháng 9 ・ Cúc Rượu',
    name: 'Shuten Kikumaru',
    jpName: '酒呑 菊丸 ・ 菊慈童',
    title: 'Bá Chủ Chén Rượu Cúc (Tháng 9)',
    gender: 'Nam',
    age: 37,
    archetype: 'Điển Tích Shuten-dōji & Kiku Jidō',
    difficulty: 4,
    difficultyLabel: '★★★★☆ Cao Thủ',
    avatar: './public/assets/characters/kikumaru.jpg?v=25',
    portrait: './public/assets/characters/cutout/kikumaru.webp?v=1',
    themeColor: '#d97706',
    secondaryColor: '#fde68a',
    particleType: 'gold',
    boardWood: 'urushi_black',
    rewardCoins: 720,
    firstWinBonusCoins: 1200,
    unlocksCardBack: 'back_urushi_red',
    unlocksCardSkin: null,
    bio: 'Nam thần 37 tuổi lấy cảm hứng từ bá chủ Shuten-dōji núi Ōe và điển tích rượu hoa cúc trường sinh. Vẻ đẹp phong trần, tà mị với vạt áo đen mở hờ và chén rượu sơn mài đỏ trên tay.',
    strategyHint: 'Bậc thầy săn lá Chén Rượu Cúc (lá Thú quý giá) để lập tức kích hoạt Hoa/Nguyệt Kiến Tửu.',
    voiceProfile: {
      pitch: 0.85,
      rate: 0.98,
      baseFreq: 175
    },
    teaseVoiceLines: [
      {
        mood: '🍶 Nâng chén tán thưởng',
        jp: 'ほほう、見事な手並みだ！この盃、お前に献上したくなるねぇ！',
        romaji: 'Hohou, migoto na tenami da! Kono sakazuki, omae ni kenjou shitaku naru nee!',
        vi: 'Ồ hô, khá khen cho ngươi! Đánh hay đến mức ta muốn mời ngươi cạn ngay chén rượu Cúc này!'
      },
      {
        mood: '😤 Tặc lưỡi tiếc rượu',
        jp: 'ちっ…俺の菊に盃を奪うとは、粋じゃないねぇ！',
        romaji: 'Chi... Ore no kiku ni sakazuki wo ubau to wa, iki janai nee!',
        vi: 'Chậc... Dám giành mất Chén Rượu Cúc của ta sao?! Bạn chơi hay nhưng làm ta mất hứng nhậu rồi đấy!'
      },
      {
        mood: '😏 Cười nửa miệng',
        jp: 'やるじゃねぇか。酔いが一気に覚めちまったよ！',
        romaji: 'Yaru janee ka. Yoi ga ikki ni samechimatta yo!',
        vi: 'Bạn chơi hay lắm! Nước bài sắc bén làm ta tỉnh cả cơn say luôn rồi!'
      }
    ],
    aiProfile: {
      skillLevel: 0.8,
      koiKoiGreed: 0.52,
      favoriteTags: ['sake', 'moon', 'curtain', 'aotan', 'kasu_bonus'],
      defenseWeight: 0.62
    },
    dialogues: {
      intro: [
        'Không có Chén Rượu Hoa Cúc Tháng 9 thì trăng hay hoa cũng mất nửa vị ngon. Nào, cạn với ta một ván! 🍶',
        'Rượu Thọ đã rót đầy chén sơn mài đỏ, mời kỳ thủ xuất chiêu!'
      ],
      matchCard: [
        'Chén rượu thêm nồng!',
        'Hương hoa cúc mùa thu thơm lừng chiếu bài.',
        'Một nước bài đáng để uống cạn một chén!'
      ],
      captureBright: [
        'Haha! Có thêm lá Quang này thì tiệc rượu đêm nay trọn vẹn rồi! 🍶✨',
        'Ánh trăng và hoa anh đào đều đang chờ chén rượu của ta!'
      ],
      playerCaptureBright: [
        'Ồ~ Ngươi lấy mất đồ nhắm rượu ngon nhất trên bàn rồi đấy!',
        'Khá lắm! Đánh thế mới bõ công ta mang rượu quý ra đãi!'
      ],
      callKoiKoi: [
        'Tiệc rượu mới chỉ qua tuần đầu... Rót tiếp đi, KOI-KOI!! 🍶🔥',
        'Men rượu đang bốc lên rồi — KOI-KOI!'
      ],
      playerCallKoiKoi: [
        'Haha, tửu lượng của ngươi trên chiếu bài cũng không vừa đâu nhỉ!',
        'Cứ việc tấn công, chén rượu của ta vẫn chưa cạn đâu!'
      ],
      winRound: [
        'Khà~ Một chén rượu thắng cuộc ngọt lịm đầu môi!',
        'Hoa Kiến Tửu, Nguyệt Kiến Tửu đều nằm trong lòng bàn tay ta!'
      ],
      loseRound: [
        'Chà, hiệp này ngươi làm đổ chén rượu của ta rồi đấy...',
        'Tửu lượng và kỳ nghệ của ngươi đều cao cường thật!'
      ],
      defeatMatch: [
        'Ta xin cạn chén bái phục! Ngươi chính là tri kỷ trăm năm khó gặp trên bàn Hoa Bài!'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 10 (LÁ PHONG) - RENJI AKATSUKI (ĐIỂN TÍCH KIẾM KHÁCH MIYAMOTO MUSASHI)
  // ==========================================================================
  {
    id: 'renji',
    month: 10,
    monthLabel: 'Tháng 10 ・ Lá Phong',
    name: 'Renji Akatsuki',
    jpName: '暁 蓮司 ・ 紅葉武蔵',
    title: 'Kiếm Thánh Rừng Phong (Tháng 10)',
    gender: 'Nam',
    age: 45,
    archetype: 'Điển Tích Kiếm Thánh Musashi',
    difficulty: 4,
    difficultyLabel: '★★★★☆ Cao Thủ',
    avatar: './public/assets/characters/renji.jpg?v=25',
    portrait: './public/assets/characters/cutout/renji.webp?v=1',
    themeColor: '#e76f51',
    secondaryColor: '#f4a261',
    particleType: 'maple',
    boardWood: 'autumn_maple',
    rewardCoins: 750,
    firstWinBonusCoins: 1250,
    unlocksCardBack: 'back_katana_momiji',
    unlocksCardSkin: 'skin_sumie_ink',
    bio: 'Đại Kiếm Thánh 45 tuổi lấy cảm hứng từ Miyamoto Musashi dưới rừng phong đỏ mùa thu. Vẻ đẹp trung niên lịch lãm đỉnh cao với mái tóc đen điểm bạc nơi thái dương, đường nét gương mặt góc cạnh và đôi mắt hổ phách sắc lạnh.',
    strategyHint: 'Chuyên gia săn tìm tổ hợp Heo-Nai-Bướm (Ino-Shika-Chō) với lá Nai Vàng Tháng 10 làm chủ lực.',
    voiceProfile: {
      pitch: 0.78,
      rate: 0.92,
      baseFreq: 145
    },
    teaseVoiceLines: [
      {
        mood: '⚔️ Tán thưởng đối thủ',
        jp: 'ほう…見事な太刀筋だ！褒めてつかわす！',
        romaji: 'Hou... Migoto na tachisuji da! Homete tsukawasu!',
        vi: 'Ồ... Khá khen cho ngươi! Nước bài sắc bén chẳng kém gì một nhát kiếm thượng thừa!'
      },
      {
        mood: '😠 Cau mày cay cú',
        jp: 'くっ…！俺の鹿札を先に斬るとは、なかなかやるな！',
        romaji: 'Ku...! Ore no shikafuda wo saki ni kiru to wa, nakanaka yaru na!',
        vi: 'Hừ...! Dám đoạt mất lá Nai Tháng 10 của ta trước sao, bạn chơi hay lắm đấy!'
      },
      {
        mood: '🍶 Gật gù nể phục',
        jp: 'おぬし、只者ではないな。背筋が凍るほど見事な一手だ！',
        romaji: 'Onushi, tadamono de wa nai na. Sesuji ga kooru hodo migoto na itte da!',
        vi: 'Khá khen cho ngươi! Một nước cờ lạnh lùng khiến cả kiếm khách như ta cũng phải dè chừng!'
      }
    ],
    aiProfile: {
      skillLevel: 0.82,
      koiKoiGreed: 0.48,
      favoriteTags: ['deer', 'boar', 'butterfly', 'aotan', 'tane'],
      defenseWeight: 0.65
    },
    dialogues: {
      intro: [
        'Lá phong rơi chưa chạm đất thì thắng bại đã phân. Nào, rút bài của ngươi đi! 🍁',
        'Trong kiếm đạo hay bài Hoa, do dự một khắc là bại trận.'
      ],
      matchCard: [
        'Nhát chém gọn gàng!',
        'Thuộc về ta!',
        'Không trượt một ly.'
      ],
      captureBright: [
        'Hào quang của thanh kiếm danh trấn thiên hạ! ⚔️',
        'Một nước đi chí mạng!'
      ],
      playerCaptureBright: [
        'Khá lắm! Ngươi đã đỡ được đòn thế của ta rồi phản kích sao?!',
        'Tốc độ ra bài của ngươi không tầm thường chút nào.'
      ],
      callKoiKoi: [
        'Máu chiến binh trong ta đang sôi sục... KOI-KOI!! 🔥',
        'Chưa đến lúc tra kiếm vào vỏ đâu — KOI-KOI!'
      ],
      playerCallKoiKoi: [
        'Haha! Dám dồn ép ta sao? Đúng là đối thủ mà ta hằng tìm kiếm!',
        'Tới đi! Để xem lưỡi kiếm của ai sắc hơn!'
      ],
      winRound: [
        'Một trận giao đấu sảng khoái. Hãy uống với ta một chén!',
        'Chiến thắng thuộc về kẻ quyết đoán hơn.'
      ],
      loseRound: [
        'Ta đã lộ sơ hở... Đường bài của ngươi sắc như kiếm báu!',
        'Khá khen cho ngươi. Hiệp sau ta sẽ dùng toàn lực!'
      ],
      defeatMatch: [
        'Tâm phục khẩu phục! Kiếm tâm của ngươi còn sáng hơn cả trăng thu. Hãy nhận lấy Mặt Lưng Kiếm Khách Phong Đỏ của ta!'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 11 (MƯA LIỄU) - HARUTO ABE (ĐIỂN TÍCH ONO NO MICHIKAZE & ABE NO SEIMEI)
  // ==========================================================================
  {
    id: 'haruto',
    month: 11,
    monthLabel: 'Tháng 11 ・ Mưa Liễu',
    name: 'Haruto Abe',
    jpName: '安倍 晴人 ・ 柳に道風',
    title: 'Âm Dương Sư Mưa Liễu (Tháng 11)',
    gender: 'Nam',
    age: 30,
    archetype: 'Điển Tích Ono no Michikaze & Seimei',
    difficulty: 5,
    difficultyLabel: '★★★★★ Đại Kiện Tướng',
    avatar: './public/assets/characters/haruto.jpg?v=25',
    portrait: './public/assets/characters/cutout/haruto.webp?v=1',
    themeColor: '#4cc9f0',
    secondaryColor: '#7209b7',
    particleType: 'spirit',
    boardWood: 'midnight_indigo',
    rewardCoins: 900,
    firstWinBonusCoins: 1600,
    unlocksCardBack: 'back_seimei_onmyo',
    unlocksCardSkin: 'skin_yokai_night',
    bio: 'Đại Âm Dương Sư 30 tuổi kết hợp điển tích Ono no Michikaze dưới mưa liễu và Abe no Seimei. Mỹ nam trưởng thành với mái tóc bạc ánh xanh, đôi mắt vàng kim huyền bí và ngón tay thon dài kết ấn.',
    strategyHint: 'Rất giỏi dùng lá Quang Mưa (Tháng 11) để hoàn tất Vũ Tứ Quang (4 lá Quang có Mưa) và khóa bài đối phương.',
    voiceProfile: {
      pitch: 0.86,
      rate: 0.96,
      baseFreq: 168
    },
    teaseVoiceLines: [
      {
        mood: '🔯 Nhếch môi tán thưởng',
        jp: 'ほう…私の占術を上回るとは、褒めてやろう。',
        romaji: 'Hou... Watashi no senjutsu wo uwamawaru to wa, homete yarou.',
        vi: 'Ồ... Khá khen cho ngươi! Dám đi nước cờ vượt ngoài cả quẻ bói Âm Dương của ta!'
      },
      {
        mood: '😤 Lạnh lùng hờn trách',
        jp: 'ちっ…柳に小野道風を封じられるとはな。お前、なかなかやるじゃないか。',
        romaji: 'Chi... Yanagi ni Ono no Michikaze wo fuujirareru to wa na. Omae, nakanaka yaru janai ka.',
        vi: 'Chậc... Phá được cả lá Mưa Liễu của ta sao. Bạn chơi hay lắm, làm ta phải nghiêm túc rồi đấy!'
      },
      {
        mood: '🌌 Kinh ngạc thừa nhận',
        jp: '見事だ…これほど美しい一手は、平安の都でも見たことがない。',
        romaji: 'Migoto da... Kore hodo utsukushii itte wa, Heian no miyako demo mita koto ga nai.',
        vi: 'Khá khen cho ngươi! Một nước bài tuyệt diệu mà khắp kinh thành Heian hiếm ai sánh kịp!'
      }
    ],
    aiProfile: {
      skillLevel: 0.92,
      koiKoiGreed: 0.5,
      favoriteTags: ['hikari', 'rain', 'sake', 'moon', 'curtain'],
      defenseWeight: 0.85
    },
    dialogues: {
      intro: [
        'Dưới cơn mưa liễu Tháng 11, chú ếch nhỏ đã nhảy lên cành sau bảy lần thất bại. Còn ngươi thì sao? 🌧️🔯',
        'Trong trận đồ 48 lá bài này, không có gì gọi là ngẫu nhiên cả.'
      ],
      matchCard: [
        'Đúng như quỹ đạo của các vì sao.',
        'Nước cờ của ngươi đã bị cơn mưa Tháng 11 phong ấn.',
        'Mọi xác suất đều hội tụ tại điểm này.'
      ],
      captureBright: [
        'Tinh tú hội tụ! Lá Quang Mưa Liễu này là mắt trận của ta. 🔯',
        'Ánh sáng trong cơn mưa luôn thuộc về kẻ nắm giữ thiên cơ.'
      ],
      playerCaptureBright: [
        'Thú vị... Một biến số nằm ngoài dự đoán của tinh bàn.',
        'Ngươi vừa phá vỡ một góc trận pháp của ta đấy.'
      ],
      callKoiKoi: [
        'Thiên thời đang đứng về phía ta... KOI-KOI! 🌌',
        'Trận pháp Âm Dương đã mở hoàn toàn — KOI-KOI!'
      ],
      playerCallKoiKoi: [
        'Ngươi nghĩ mình có thể vượt qua ải tiếp theo trước khi ta kết liễu ván đấu sao?',
        'Một quyết định liều lĩnh. Để ta cho ngươi thấy cái giá của sự kiêu ngạo.'
      ],
      winRound: [
        'Kết cục đã định sẵn từ nước bài thứ ba rồi.',
        'Trật tự của Âm Dương không bao giờ sai lệch.'
      ],
      loseRound: [
        'Không thể nào... Tinh bàn của ta lại tính sót nước đi của ngươi sao?!',
        'Ngươi sở hữu trực giác vượt qua cả thuật toán học của Âm Dương Liêu.'
      ],
      defeatMatch: [
        'Ta hoàn toàn bái phục. Trực giác và bản lĩnh của ngươi đã vượt qua cả thiên cơ. Hãy nhận Ấn Chú Ngôi Sao Âm Dương!'
      ]
    }
  },

  // ==========================================================================
  // THÁNG 12 (NGÔ ĐỒNG) - AMATERASU HŌŌ (ĐIỂN TÍCH NỮ THẦN MẶT TRỜI & PHƯỢNG HOÀNG)
  // ==========================================================================
  {
    id: 'amaterasu',
    month: 12,
    monthLabel: 'Tháng 12 ・ Ngô Đồng',
    name: 'Amaterasu Hōō',
    jpName: '天照 鳳凰 ・ 桐に鳳凰',
    title: 'Nữ Đế Phượng Hoàng (Tháng 12)',
    gender: 'Nữ',
    age: 42,
    archetype: 'Điển Tích Thần Điểu Hōō & Amaterasu',
    difficulty: 5,
    difficultyLabel: '★★★★★ Thần Thoại (Boss Cuối)',
    avatar: './public/assets/characters/amaterasu.jpg?v=25',
    portrait: './public/assets/characters/cutout/amaterasu.webp?v=1',
    themeColor: '#ffb703',
    secondaryColor: '#9d4edd',
    particleType: 'celestial',
    boardWood: 'moon_palace',
    rewardCoins: 1500,
    firstWinBonusCoins: 3000,
    unlocksCardBack: 'back_imperial_dragon',
    unlocksCardSkin: 'skin_kintsugi_gold',
    bio: 'Đỉnh cao của 12 tháng bài Hoa: Nữ Đế Phượng Hoàng 42 tuổi mang vẻ đẹp quý phái bất lão, uy quyền tối thượng với đôi mắt phượng kẻ chu sa đỏ kim và trâm vàng Thần Điểu Hōō.',
    strategyHint: 'Boss tối thượng Tháng 12: tính toán toàn diện cả Ngũ Quang (Gokō), Tứ Quang, Xích/Thanh Đan và chặn đứng mọi đường thắng của đối phương.',
    voiceProfile: {
      pitch: 1.16,
      rate: 0.92,
      baseFreq: 470
    },
    teaseVoiceLines: [
      {
        mood: '🔥 Uy quyền tối thượng',
        jp: 'ほう…鳳凰の翼に届くとは、見事な器量じゃ！褒めてつかわす！',
        romaji: 'Hou... Houou no tsubasa ni todoku to wa, migoto na kiryou ja! Homete tsukawasu!',
        vi: 'Ồ... Khá khen cho ngươi! Bản lĩnh của ngươi đã chạm tới đôi cánh Phượng Hoàng của trẫm rồi đấy!'
      },
      {
        mood: '😤 Nữ đế hờn trách',
        jp: 'むぅ…桐の鳳凰を先に召すとは、不届き千万ながら天晴れじゃ！',
        romaji: 'Muu... Kiri no Houou wo saki ni mesu to wa, futodoki senban nagara appare ja!',
        vi: 'Hứ... Dám thu phục lá Phượng Hoàng Tháng 12 trước cả trẫm sao?! Bạn chơi hay lắm đó!'
      },
      {
        mood: '☀️ Tỏa sáng tán phục',
        jp: '天晴れじゃ！そなたの采配、太陽のように眩しいぞ！',
        romaji: 'Appare ja! Sonata no saihai, taiyou no you ni mabushii zo!',
        vi: 'Tuyệt vời lắm! Đường bài của ngươi rực rỡ chẳng kém ánh mặt trời của Amaterasu!'
      }
    ],
    aiProfile: {
      skillLevel: 1.0,
      koiKoiGreed: 0.65,
      favoriteTags: ['hikari', 'phoenix', 'crane', 'curtain', 'moon', 'sake'],
      defenseWeight: 0.95
    },
    dialogues: {
      intro: [
        'Khi Phượng Hoàng đáp xuống cành Ngô Đồng Tháng 12, bốn mùa hoàn tất một vòng luân hồi. Hãy cho trẫm thấy cực hạn kỳ nghệ của ngươi! 🔥👑',
        'Từ Tùng Hạc Tháng Giêng đến Ngô Đồng Tháng Chạp — ngươi đã sẵn sàng đối mặt với thử thách cuối cùng chưa?'
      ],
      matchCard: [
        'Cành Ngô Đồng tím đã nở hoa dưới ánh thái dương.',
        'Đôi cánh Phượng Hoàng quét qua chiếu bài.',
        'Thiên mệnh đã quy về một mối.'
      ],
      captureBright: [
        'Ngũ Quang quy vị! Đôi cánh Phượng Hoàng Lửa rực sáng cả đất trời! 🔥✨',
        'Hào quang tối thượng của Tháng 12 đã giáng lâm!'
      ],
      playerCaptureBright: [
        'Ồ~ Ngươi dám đoạt lấy ánh hào quang ngay trước mắt Nữ Đế sao?',
        'Khí phách lắm! Phượng Hoàng chỉ cúi đầu trước bậc kỳ tài chân chính!'
      ],
      callKoiKoi: [
        'Ngọn lửa Niết Bàn của Phượng Hoàng không bao giờ tắt... KOI-KOI!! 🔥👑',
        'Hãy cùng trẫm bay lên tầng mây cao nhất — KOI-KOI!'
      ],
      playerCallKoiKoi: [
        'Hảo đảm lượng! Dám tuyên chiến Koi-Koi với Nữ Đế Tháng 12, trẫm chuẩn tấu!',
        'Hãy chứng minh cho trẫm thấy ngươi xứng đáng với ngôi vị Kỳ Thánh!'
      ],
      winRound: [
        'Vòng quay 12 tháng đã khép lại dưới đôi cánh hoàng kim của Phượng Hoàng.',
        'Ánh mặt trời đã soi rọi chiến thắng của trẫm.'
      ],
      loseRound: [
        'Không ngờ trên thế gian lại có kỳ thủ đánh bại được cả Phượng Hoàng Tháng 12!',
        'Một ván bài xứng đáng lưu danh sử sách!'
      ],
      defeatMatch: [
        'Ngươi đã chinh phục trọn vẹn 12 Tháng Bài Hoa! Hãy nhận lấy vinh quang tối thượng của Nữ Đế Phượng Hoàng Amaterasu! 👑🔥'
      ]
    }
  }
];

function getOpponentById(id) {
  return ANIME_OPPONENTS.find((o) => o.id === id) || ANIME_OPPONENTS[0];
}

  // ============================================================================
  // FILE: src/data/collectionData.js
  // ============================================================================
// Collectible Card Back Designs & Card Face Skins (Themes) + Gacha & Shop Configuration

const RARITY_CONFIG = {
  common: { label: 'Cổ Điển', color: '#8d99ae', glow: 'rgba(141, 153, 174, 0.35)', weight: 40 },
  rare: { label: 'Hiếm (R)', color: '#4cc9f0', glow: 'rgba(76, 201, 240, 0.45)', weight: 32 },
  epic: { label: 'Sử Thi (SR)', color: '#b5179e', glow: 'rgba(181, 23, 158, 0.5)', weight: 18 },
  legendary: { label: 'Huyền Thoại (SSR)', color: '#ffb703', glow: 'rgba(255, 183, 3, 0.6)', weight: 8 },
  mythic: { label: 'Thần Thoại (UR)', color: '#f72585', glow: 'rgba(247, 37, 133, 0.7)', weight: 3 }
};

const CARD_BACKS = [
  {
    id: 'back_urushi_red',
    name: 'Sơn Mài Chu Sa (Urushi Red)',
    jpName: '朱塗り伝統',
    rarity: 'common',
    price: 0,
    unlockedByDefault: true,
    bossUnlockId: null,
    description: 'Mặt lưng truyền thống thời Edo với lớp sơn mài đỏ chu sa và viền đen tuyền đặc trưng của bài Hoa Nintendo cổ điển.',
    bgGradient: 'linear-gradient(145deg, #9b111e 0%, #5c060c 100%)',
    borderColor: '#161316',
    accentColor: '#ffd166',
    patternType: 'urushi_classic'
  },
  {
    id: 'back_sakura_gakuen',
    name: 'Học Viện Anh Đào (Sakura Gakuen)',
    jpName: '桜学園の春',
    rarity: 'rare',
    price: 450,
    unlockedByDefault: false,
    bossUnlockId: 'koharu',
    description: 'Thiết kế mặt lưng hồng phấn điểm hoa Anh Đào năm cánh và huy hiệu CLB Bài Hoa của Koharu.',
    bgGradient: 'linear-gradient(145deg, #ff758f 0%, #c9184a 100%)',
    borderColor: '#4a1525',
    accentColor: '#fff0f3',
    patternType: 'sakura_emblem'
  },
  {
    id: 'back_kitsune_shrine',
    name: 'Đền Cáo Linh Thiêng (Kitsune Inari)',
    jpName: '稲荷白狐の護符',
    rarity: 'epic',
    price: 750,
    unlockedByDefault: false,
    bossUnlockId: 'ayame',
    description: 'Khắc họa mặt nạ Bạch Hồ chín đuôi, cổng Torii đỏ và ngọn lửa hồ ly hộ mệnh của vu nữ Ayame.',
    bgGradient: 'linear-gradient(145deg, #5a189a 0%, #240046 100%)',
    borderColor: '#1b0633',
    accentColor: '#ff9e00',
    patternType: 'kitsune_torii'
  },
  {
    id: 'back_katana_momiji',
    name: 'Kiếm Khách Phong Đỏ (Katana Momiji)',
    jpName: '紅葉と名刀',
    rarity: 'epic',
    price: 900,
    unlockedByDefault: false,
    bossUnlockId: 'renji',
    description: 'Song kiếm giao nhau dưới vầng trăng tròn và cơn lốc lá phong đỏ mùa thu của lãng khách Renji.',
    bgGradient: 'linear-gradient(145deg, #780000 0%, #1d1e2c 100%)',
    borderColor: '#141115',
    accentColor: '#f4a261',
    patternType: 'katana_maple'
  },
  {
    id: 'back_oiran_gold',
    name: 'Kim Tuyến Hoa Khôi (Oiran Kanzashi)',
    jpName: '花魁の黄金簪',
    rarity: 'legendary',
    price: 1400,
    unlockedByDefault: false,
    bossUnlockId: 'yukiho',
    description: 'Trâm cài tóc vàng ròng Kanzashi và cánh quạt lụa Hạc Vàng xa hoa của hoa khôi Yukiho tại phố Gion.',
    bgGradient: 'linear-gradient(145deg, #3c0919 0%, #110b11 100%)',
    borderColor: '#d4af37',
    accentColor: '#ffd166',
    patternType: 'oiran_fan'
  },
  {
    id: 'back_seimei_onmyo',
    name: 'Tinh Bàn Âm Dương (Seimei Pentagram)',
    jpName: '晴明桔梗印',
    rarity: 'legendary',
    price: 1600,
    unlockedByDefault: false,
    bossUnlockId: 'haruto',
    description: 'Ngôi sao năm cánh Seimei-kikyō phát sáng giữa vòng tròn bát quái và bùa chú của Âm Dương Sư Haruto.',
    bgGradient: 'linear-gradient(145deg, #03045e 0%, #0a091c 100%)',
    borderColor: '#00b4d8',
    accentColor: '#90e0ef',
    patternType: 'onmyo_star'
  },
  {
    id: 'back_tsukuyomi_moon',
    name: 'Nguyệt Cung Thần Thoại (Tsukuyomi UR)',
    jpName: '月読の天羽衣',
    rarity: 'mythic',
    price: 2800,
    unlockedByDefault: false,
    bossUnlockId: 'kaguya',
    description: 'Báu vật tối thượng của Nữ Hoàng Kaguya: Vầng trăng ngọc bích, thỏ ngọc giã thuốc tiên và dải ngân hà lấp lánh.',
    bgGradient: 'linear-gradient(145deg, #3a0ca3 0%, #7209b7 50%, #f72585 100%)',
    borderColor: '#ffd166',
    accentColor: '#ffffff',
    patternType: 'celestial_moon'
  },
  {
    id: 'back_kanagawa_wave',
    name: 'Sóng Thần Kanagawa (Hokusai Wave)',
    jpName: '富嶽三十六景・波',
    rarity: 'epic',
    price: 800,
    unlockedByDefault: false,
    bossUnlockId: null,
    description: 'Lấy cảm hứng từ kiệt tác tranh khắc gỗ Ukiyo-e: Ngọn sóng khổng lồ cuộn trào trước đỉnh núi Phú Sĩ.',
    bgGradient: 'linear-gradient(145deg, #1d3557 0%, #0b132b 100%)',
    borderColor: '#457b9d',
    accentColor: '#f1faee',
    patternType: 'great_wave'
  },
  {
    id: 'back_imperial_dragon',
    name: 'Long Vương Hoàng Gia (Imperial Ryū)',
    jpName: '黄金雲龍図',
    rarity: 'legendary',
    price: 1800,
    unlockedByDefault: false,
    bossUnlockId: null,
    description: 'Thần Long uốn lượn giữa biển mây vàng kim trên nền sơn mài lục bảo hoàng thất.',
    bgGradient: 'linear-gradient(145deg, #081c15 0%, #1b4332 100%)',
    borderColor: '#d4af37',
    accentColor: '#ffd166',
    patternType: 'golden_dragon'
  },
  {
    id: 'back_wisteria_moon',
    name: 'Tử Đằng Đêm Trăng (Fuji Nocturne)',
    jpName: '月夜の藤棚',
    rarity: 'rare',
    price: 550,
    unlockedByDefault: false,
    bossUnlockId: null,
    description: 'Những chùm hoa Tử Đằng tím biếc buông rủ dưới ánh trăng bạc và đom đóm mùa hạ.',
    bgGradient: 'linear-gradient(145deg, #3c096c 0%, #10002b 100%)',
    borderColor: '#c77dff',
    accentColor: '#e0aaff',
    patternType: 'wisteria_night'
  }
];

const CARD_SKINS = [
  {
    id: 'skin_traditional_edo',
    name: 'Truyền Thống Edo (Daitōryō)',
    jpName: '江戸伝統・花札',
    rarity: 'common',
    price: 0,
    unlockedByDefault: true,
    bossUnlockId: null,
    description: 'Phong cách khắc gỗ Ukiyo-e cổ điển trên nền giấy Washi ngà ấm, màu chu sa, chàm và lục tùng chuẩn mực.',
    palette: {
      paperBg: '#f6eedf',
      paperGrad: '#eadbc2',
      frameBorder: '#1a1617',
      sunRed: '#d90429',
      skyHighlight: '#fff8eb',
      foliageDark: '#1b4332',
      foliageMid: '#2d6a4f',
      blossomPink: '#ff758f',
      crimson: '#c1121f',
      gold: '#e9c46a',
      indigo: '#264653',
      purple: '#7209b7',
      ink: '#1d181a',
      foilEffect: 'none'
    }
  },
  {
    id: 'skin_sakura_pastel',
    name: 'Anh Đào Mộng Mơ (Sakura Pastel)',
    jpName: '桜パステル調',
    rarity: 'rare',
    price: 650,
    unlockedByDefault: false,
    bossUnlockId: 'ayame',
    description: 'Phối màu Pastel Anime dịu ngọt với giấy kem hồng phấn, viền vàng hồng (Rose Gold) và sắc hoa tươi sáng.',
    palette: {
      paperBg: '#fff5f8',
      paperGrad: '#ffe3ec',
      frameBorder: '#7a2848',
      sunRed: '#ff4d6d',
      skyHighlight: '#ffffff',
      foliageDark: '#386641',
      foliageMid: '#6a994e',
      blossomPink: '#ff8fa3',
      crimson: '#e01e5a',
      gold: '#ffca3a',
      indigo: '#5e60ce',
      purple: '#9d4edd',
      ink: '#4a192c',
      foilEffect: 'pastel_shimmer'
    }
  },
  {
    id: 'skin_sumie_ink',
    name: 'Thủy Mặc Cổ Điển (Sumi-e Ink)',
    jpName: '水墨画・朱印',
    rarity: 'epic',
    price: 950,
    unlockedByDefault: false,
    bossUnlockId: 'renji',
    description: 'Tranh thủy mặc Sumi-e trên giấy tuyên chỉ cổ, kết hợp nét mực tàu phóng khoáng với dấu ấn chu sa đỏ rực.',
    palette: {
      paperBg: '#ece6d8',
      paperGrad: '#d8cebe',
      frameBorder: '#1c1b18',
      sunRed: '#b81d13',
      skyHighlight: '#f5f2eb',
      foliageDark: '#22252a',
      foliageMid: '#495057',
      blossomPink: '#d96b6b',
      crimson: '#9e1b1b',
      gold: '#c89d54',
      indigo: '#343a40',
      purple: '#493b52',
      ink: '#111111',
      foilEffect: 'ink_wash'
    }
  },
  {
    id: 'skin_kintsugi_gold',
    name: 'Sơn Mài Hoàng Kim (Kintsugi Gold)',
    jpName: '黒漆・金継ぎ',
    rarity: 'legendary',
    price: 1600,
    unlockedByDefault: false,
    bossUnlockId: 'yukiho',
    description: 'Nền sơn mài đen tuyền Urushi của giới quý tộc Kyōto, mọi chi tiết hoa lá và chim muông đều được khảm vàng ròng 24K.',
    palette: {
      paperBg: '#19151c',
      paperGrad: '#0d0b0e',
      frameBorder: '#d4af37',
      sunRed: '#e63946',
      skyHighlight: '#2c222e',
      foliageDark: '#8c6d1f',
      foliageMid: '#d4af37',
      blossomPink: '#ffb3c1',
      crimson: '#d90429',
      gold: '#ffd700',
      indigo: '#4ea8de',
      purple: '#b5179e',
      ink: '#fcefb4',
      foilEffect: 'gold_foil'
    }
  },
  {
    id: 'skin_yokai_night',
    name: 'Bách Quỷ Dạ Hành (Yōkai Night)',
    jpName: '百鬼夜行・妖狐',
    rarity: 'legendary',
    price: 1750,
    unlockedByDefault: false,
    bossUnlockId: 'haruto',
    description: 'Lấy cảm hứng từ cuộn tranh Bách Quỷ Dạ Hành thời Heian với sắc tím dạ quang, lửa hồ ly xanh và huyết nguyệt.',
    palette: {
      paperBg: '#16132b',
      paperGrad: '#0b0818',
      frameBorder: '#4cc9f0',
      sunRed: '#f72585',
      skyHighlight: '#241e4e',
      foliageDark: '#1b3a4b',
      foliageMid: '#00b4d8',
      blossomPink: '#ff70a6',
      crimson: '#e01a4f',
      gold: '#fee440',
      indigo: '#7209b7',
      purple: '#b5179e',
      ink: '#e0fbfc',
      foilEffect: 'spirit_glow'
    }
  },
  {
    id: 'skin_ukiyoe_neon',
    name: 'Phù Thế Ánh Trăng (Ukiyo-e Celestial)',
    jpName: '浮世月華・極彩',
    rarity: 'mythic',
    price: 2600,
    unlockedByDefault: false,
    bossUnlockId: 'kaguya',
    description: 'Bộ bài thần thoại của Nữ Hoàng Kaguya: Hiệu ứng lăng kính Hologram 7 sắc cầu vồng kết hợp họa tiết Ukiyo-e thiên giới.',
    palette: {
      paperBg: '#210f37',
      paperGrad: '#120721',
      frameBorder: '#ffd166',
      sunRed: '#ff007f',
      skyHighlight: '#3b1c5e',
      foliageDark: '#06d6a0',
      foliageMid: '#4cc9f0',
      blossomPink: '#ff85ea',
      crimson: '#ff2a85',
      gold: '#ffe66d',
      indigo: '#7b2cbf',
      purple: '#c77dff',
      ink: '#ffffff',
      foilEffect: 'holo_rainbow'
    }
  }
];

function getCardBackById(id) {
  return CARD_BACKS.find((b) => b.id === id) || CARD_BACKS[0];
}

function getCardSkinById(id) {
  return CARD_SKINS.find((s) => s.id === id) || CARD_SKINS[0];
}

  // ============================================================================
  // FILE: src/graphics/cardArtwork.js
  // ============================================================================
// Authentic Hanafuda Card Face Renderer (using real traditional 48 Hanafuda card images)
// + 10 Collectible Japanese Card Back Designs & 6 Collectible Card Skin Treatments


/**
 * Generates the card face markup using the authentic real Hanafuda card image (card_1.jpg .. card_48.jpg)
 * with optional collectible Skin frame/tint and compact gameplay month/point badges.
 */
function renderCardFaceSVG(card, skinId = 'skin_traditional_edo', showBadges = true) {
  const skin = getCardSkinById(skinId);
  const p = skin.palette;
  const uid = `c${card.id}_${skin.id}`;
  const imgHref = `./public/assets/cards/card_${card.id}.jpg`;

  // Optional skin decorative overlay (keeps the real Hanafuda artwork 100% recognizable)
  let skinOverlay = '';
  let imgFilterStyle = '';

  switch (skin.id) {
    case 'skin_sakura_pastel':
      imgFilterStyle = 'filter: saturate(1.12) brightness(1.04) contrast(0.98);';
      skinOverlay = `
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#ffb3c1" fill-opacity="0.10" style="mix-blend-mode: multiply;" />
        <rect x="3" y="3" width="154" height="242" rx="7" fill="none" stroke="#ff758f" stroke-width="2.5" stroke-opacity="0.85" />
      `;
      break;
    case 'skin_sumie_ink':
      imgFilterStyle = 'filter: sepia(0.32) contrast(1.08) saturate(0.82);';
      skinOverlay = `
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#e8dcc4" fill-opacity="0.14" style="mix-blend-mode: multiply;" />
        <rect x="3" y="3" width="154" height="242" rx="7" fill="none" stroke="#8d775f" stroke-width="2.2" stroke-opacity="0.8" />
      `;
      break;
    case 'skin_kintsugi_gold':
      imgFilterStyle = 'filter: contrast(1.06) saturate(1.15);';
      skinOverlay = `
        <path d="M12 2 L38 42 L24 88 L56 135 M148 210 L118 175 L132 130" fill="none" stroke="#ffd166" stroke-width="1.3" stroke-opacity="0.75" />
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#ffd166" stroke-width="3" />
        <path d="M10 22 L10 10 L22 10 M138 10 L150 10 L150 22 M10 226 L10 238 L22 238 M138 238 L150 238 L150 226" fill="none" stroke="#fff3b0" stroke-width="2" />
      `;
      break;
    case 'skin_yokai_night':
      imgFilterStyle = 'filter: contrast(1.1) saturate(1.22) hue-rotate(-8deg);';
      skinOverlay = `
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#240046" fill-opacity="0.14" />
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#9d4edd" stroke-width="2.8" />
      `;
      break;
    case 'skin_ukiyoe_neon':
      imgFilterStyle = 'filter: saturate(1.28) contrast(1.08);';
      skinOverlay = `
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#f72585" stroke-width="2.6" />
        <rect x="5" y="5" width="150" height="238" rx="6" fill="none" stroke="#4cc9f0" stroke-width="1.1" stroke-opacity="0.75" />
      `;
      break;
    case 'skin_traditional_edo':
    default:
      skinOverlay = `
        <rect x="1.5" y="1.5" width="157" height="245" rx="8" fill="none" stroke="${card.type === 'hikari' ? '#ffd166' : '#1a1617'}" stroke-width="${card.type === 'hikari' ? '2.2' : '1.5'}" />
      `;
      break;
  }

  const typeBadge = showBadges ? renderCardHeaderBadges(card, p) : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 248" class="hanafuda-svg skin-${skin.id}">
    <defs>
      <clipPath id="cardClip_${uid}">
        <rect x="2" y="2" width="156" height="244" rx="8" />
      </clipPath>
    </defs>

    <!-- Authentic Traditional Hanafuda Card Artwork -->
    <g clip-path="url(#cardClip_${uid})">
      <rect x="2" y="2" width="156" height="244" fill="#ffffff" />
      <image
        href="${imgHref}"
        x="2"
        y="2"
        width="156"
        height="244"
        preserveAspectRatio="none"
        style="${imgFilterStyle}"
      />
    </g>

    ${skinOverlay}
    ${typeBadge}
  </svg>`;
}

function renderCardHeaderBadges(card, p) {
  const isBright = card.type === 'hikari';
  return `
    <g class="card-ui-badge" opacity="0.88">
      <rect x="6" y="6" width="24" height="14" rx="4" fill="${isBright ? '#8f1822' : 'rgba(20, 14, 18, 0.72)'}" stroke="${p.gold}" stroke-width="0.7" />
      <text x="18" y="15.8" text-anchor="middle" fill="#fff6e5" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="800">T${card.month}</text>
    </g>
  `;
}

// ============================================================================
// COLLECTIBLE CARD BACK RENDERER (10 AI-Generated Japanese Card Back Artworks)
// ============================================================================

function renderCardBackSVG(backId = 'back_urushi_red') {
  const back = getCardBackById(backId);
  const uid = `b_${back.id}`;
  const backImgHref = `./public/assets/backs/${back.id}.jpg?v=25`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 248" class="hanafuda-back-svg">
    <defs>
      <clipPath id="backClip_${uid}">
        <rect x="2" y="2" width="156" height="244" rx="8" />
      </clipPath>
      <pattern id="wagara_${uid}" width="24" height="14" patternUnits="userSpaceOnUse">
        <path d="M0 14 A12 12 0 0 1 24 14 M-12 14 A12 12 0 0 1 12 14 M12 14 A12 12 0 0 1 36 14" fill="none" stroke="${back.accentColor}" stroke-width="0.7" stroke-opacity="0.16"/>
      </pattern>
    </defs>
    <!-- Clean Card Back Frame -->
    <rect x="1" y="1" width="158" height="246" rx="9" fill="${back.borderColor}" stroke="${back.accentColor}" stroke-width="1.3" stroke-opacity="0.75" />
    <g clip-path="url(#backClip_${uid})">
      <image
        href="${backImgHref}"
        x="2"
        y="2"
        width="156"
        height="244"
        preserveAspectRatio="xMidYMid slice"
      />
      <!-- Subtle Japanese Wagara Seigaiha Pattern Overlay -->
      <rect x="2" y="2" width="156" height="244" fill="url(#wagara_${uid})" />
    </g>
    <rect x="5" y="5" width="150" height="238" rx="6" fill="none" stroke="${back.accentColor}" stroke-width="0.9" stroke-opacity="0.55" />
  </svg>`;
}

// ============================================================================
// 12-MONTH LIVING TABLETOP FLOWER & SIGNATURE MOTIF DIORAMA RENDERER
// Renders swaying corner flora, animated Hikari/Tane card props (e.g., Kiku Sake Cup
// with sloshing golden wine, Sakura Hanami curtain, Yatsuhashi bridge ripples,
// Botan butterflies, Susuki full moon, etc.) & fallen petals on the 2.5D Tatami.
// ============================================================================

const TABLETOP_DIORAMA_CATALOG = {
  1: {
    month: 1,
    jpTitle: '睦月・松に鶴',
    viTitle: 'Tháng 1 · Tùng Hạc & Mặt Trời Đỏ',
    flowerName: 'Cây Tùng (Matsu)',
    propName: 'Hạc Đỏ & Dải Thơ Akayoroshi',
    badgeIcon: '🌲'
  },
  2: {
    month: 2,
    jpTitle: '如月・梅に鶯',
    viTitle: 'Tháng 2 · Mai Đỏ & Chim Oanh Xuân',
    flowerName: 'Hoa Mai Đỏ (Ume)',
    propName: 'Chim Oanh Hót Trên Cành Mai',
    badgeIcon: '🌺'
  },
  3: {
    month: 3,
    jpTitle: '弥生・桜に幕',
    viTitle: 'Tháng 3 · Anh Đào & Rèm Hội Hanami',
    flowerName: 'Hoa Anh Đào (Sakura)',
    propName: 'Rèm Trẩy Hội Maku & Hoa Đào Rơi',
    badgeIcon: '🌸'
  },
  4: {
    month: 4,
    jpTitle: '卯月・藤に不如帰',
    viTitle: 'Tháng 4 · Giàn Tử Đằng & Chim Cu Nhỏ',
    flowerName: 'Hoa Tử Đằng (Fuji)',
    propName: 'Chim Cu Bay Qua Trăng Lưỡi Liềm',
    badgeIcon: '🍇'
  },
  5: {
    month: 5,
    jpTitle: '皐月・菖蒲に八橋',
    viTitle: 'Tháng 5 · Diên Vĩ & Cầu Gỗ Tám Nhịp',
    flowerName: 'Hoa Diên Vĩ (Ayame)',
    propName: 'Cầu Gỗ Yatsuhashi & Sóng Nước',
    badgeIcon: '⚜️'
  },
  6: {
    month: 6,
    jpTitle: '水無月・牡丹に蝶',
    viTitle: 'Tháng 6 · Mẫu Đơn Phú Quý & Hồ Điệp',
    flowerName: 'Hoa Mẫu Đơn (Botan)',
    propName: 'Đôi Bướm Vàng Lượn Quanh Hoa',
    badgeIcon: '🏵️'
  },
  7: {
    month: 7,
    jpTitle: '文月・萩に猪',
    viTitle: 'Tháng 7 · Cỏ Hồ Chi & Lợn Rừng Thu',
    flowerName: 'Cỏ Đậu Khấu (Hagi)',
    propName: 'Lợn Rừng Inoshishi & Dải Thơ Đỏ',
    badgeIcon: '🌿'
  },
  8: {
    month: 8,
    jpTitle: '葉月・芒に月',
    viTitle: 'Tháng 8 · Đồi Cỏ Lau & Trăng Rằm Thu',
    flowerName: 'Cỏ Lau Bạc (Susuki)',
    propName: 'Trăng Rằm Tsukimi & Đàn Ngỗng Trời',
    badgeIcon: '🌕'
  },
  9: {
    month: 9,
    jpTitle: '長月・菊に盃',
    viTitle: 'Tháng 9 · Cúc Hoàng Gia & Chén Rượu Thọ',
    flowerName: 'Hoa Cúc Vàng (Kiku)',
    propName: 'Chén Rượu Sake Chữ Thọ Sóng Sánh',
    badgeIcon: '🍶'
  },
  10: {
    month: 10,
    jpTitle: '神無月・紅葉に鹿',
    viTitle: 'Tháng 10 · Rừng Phong Đỏ & Hươu Sao',
    flowerName: 'Lá Phong Thu (Momiji)',
    propName: 'Hươu Sao Sừng Vàng & Lá Phong Rơi',
    badgeIcon: '🍁'
  },
  11: {
    month: 11,
    jpTitle: '霜月・柳に小野道風',
    viTitle: 'Tháng 11 · Liễu Mưa, Ô Giấy & Ếch Xanh',
    flowerName: 'Cành Liễu Rủ (Yanagi)',
    propName: 'Ô Giấy Wagasa, Ếch Xanh & Tia Chớp',
    badgeIcon: '☔'
  },
  12: {
    month: 12,
    jpTitle: '師走・桐に鳳凰',
    viTitle: 'Tháng 12 · Hoa Ngô Đồng & Phượng Hoàng',
    flowerName: 'Hoa Ngô Đồng (Kiri)',
    propName: 'Phượng Hoàng Lửa Tung Cánh Kim Sắc',
    badgeIcon: '🦚'
  }
};

function getTabletopDioramaInfo() {
  // Temporarily locked to Month 9 (Kiku - Chrysanthemum & Sake Cup) per user request
  return TABLETOP_DIORAMA_CATALOG[9];
}

function renderTabletopFlowerDioramaSVG() {
  // Ground-plane layer inside .tabletop-25d-board (tilted with the Tatami mat):
  // - Soft ground shadows cast onto the mat by the 3 high-floating red clouds
  //   (drift tracks share the same timing vars as the clouds, so each shadow follows its cloud)
  // - 4 individual chrysanthemum petals resting flat on the Tatami mat
  return `
    <div class="kiku-month9-ground-layer" aria-hidden="true">
      <div class="kiku-shadow-drift-layer">
        <div class="kiku-drift-track drift-a track-left-mid">
          <div class="kiku-drift-offset"><div class="kiku-cloud-shadow shadow-left-mid"></div></div>
        </div>
        <div class="kiku-drift-track drift-b track-center-high">
          <div class="kiku-drift-offset"><div class="kiku-cloud-shadow shadow-center-high"></div></div>
        </div>
        <div class="kiku-drift-track drift-c track-right-low">
          <div class="kiku-drift-offset"><div class="kiku-cloud-shadow shadow-right-low"></div></div>
        </div>
      </div>

      <img src="./public/assets/diorama/month9/kiku_petal_yellow_1.png?v=31"
           class="kiku-el kiku-landed-petal lp-1" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_1.png?v=31"
           class="kiku-el kiku-landed-petal lp-2" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_yellow_2.png?v=31"
           class="kiku-el kiku-landed-petal lp-3" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_2.png?v=31"
           class="kiku-el kiku-landed-petal lp-4" alt="" decoding="async" />
    </div>
  `;
}

function renderTabletopBillboardDioramaHTML() {
  // 2.5D Tabletop Overlay Layers outside .tabletop-25d-board:
  // 1) .kiku-month9-billboard-stage: Flat camera-space layer for the 3 drifting red clouds (unaffected by board tilt)
  // 2) .kiku-back-decor-clip: Clipped at the inner edges of #left-panel & #right-panel (z-index: 24)
  //    - .kiku-left-plant-group: Fixed in camera space under Left UI panel (does not move with board tilt)
  //    - .kiku-board-plane.plane-back: 3D board plane for Top-Right plant (upright billboard, moves/scales with board)
  // 3) .kiku-board-plane.plane-front: 3D board plane for Bottom-Left Sake Cup, Bottom-Right Plant & Falling Petals
  //    (upright billboards that move/scale with board and render on top of side UI panels)
  return `
    <!-- 1. FLAT CAMERA-SPACE DRIFTING WATERCOLOR RED CLOUDS (Unaffected by board tilt) -->
    <div class="kiku-month9-billboard-stage" aria-hidden="true">
      <div class="kiku-cloud-drift-layer layer-back">
        <div class="kiku-drift-track drift-b track-center-high">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v3.png?v=31"
                 class="kiku-el kiku-cloud cloud-center-high"
                 alt="" decoding="async" />
          </div>
        </div>
      </div>
      <div class="kiku-cloud-drift-layer layer-front">
        <div class="kiku-drift-track drift-a track-left-mid">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v2.png?v=31"
                 class="kiku-el kiku-cloud cloud-left-mid cloud-over-field"
                 alt="" decoding="async" />
          </div>
        </div>
        <div class="kiku-drift-track drift-c track-right-low">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v1.png?v=31"
                 class="kiku-el kiku-cloud cloud-right-low cloud-over-field"
                 alt="" decoding="async" />
          </div>
        </div>
      </div>
    </div>

    <!-- 2. BACK DECOR CLIP LAYER (Tucked behind Left/Right UI panels, on top of wooden board) -->
    <div class="kiku-back-decor-clip" aria-hidden="true">
      <!-- Top-Left Chrysanthemum Plant (+130% size) with Purple Poetry Ribbon:
           Fixed under Left UI panel (does NOT move with board tilt) -->
      <div class="kiku-left-plant-group">
        <img src="./public/assets/diorama/month9/kiku_plant_v2.png?v=31"
             class="kiku-el kiku-plant plant-tl-sweep"
             alt="" decoding="async" />
        <img src="./public/assets/diorama/month9/kiku_purple_ribbon.png?v=31"
             class="kiku-el kiku-ribbon-aotan"
             alt="" decoding="async" />
      </div>

      <!-- 3D Board Plane for Top-Right Chrysanthemum Cluster (moves/scales with board, stays upright to POV) -->
      <div class="kiku-board-plane plane-back">
        <div class="kiku-billboard-anchor anchor-tr-cluster">
          <img src="./public/assets/diorama/month9/kiku_plant_v3.png?v=31"
               class="kiku-el kiku-plant plant-tr-cluster"
               alt="" decoding="async" />
        </div>
      </div>
    </div>

    <!-- 3. BOARD-BOUND FRONT DECOR PLANE (Moves/scales with board, stays upright to POV, on top of Left/Right UI panels) -->
    <div class="kiku-board-plane plane-front" aria-hidden="true">
      <!-- Bottom-Right Standing Chrysanthemum Plant -->
      <div class="kiku-billboard-anchor anchor-br-tall">
        <img src="./public/assets/diorama/month9/kiku_plant_v1.png?v=31"
             class="kiku-el kiku-plant plant-br-tall"
             alt="" decoding="async" />
      </div>

      <!-- Bottom-Left Rock Stream & Sloshing Sakazuki Sake Cup (寿) -->
      <div class="kiku-sakazuki-group">
        <img src="./public/assets/diorama/month9/kiku_rock_stream.png?v=31"
             class="kiku-el kiku-rock-stream"
             alt="" decoding="async" />
        <div class="kiku-sake-cup-holder">
          <img src="./public/assets/diorama/month9/kiku_sake_cup.png?v=31"
               class="kiku-el kiku-sake-cup"
               alt="" decoding="async" />
          <div class="kiku-sake-ripple-ring ring-1"></div>
          <div class="kiku-sake-ripple-ring ring-2"></div>
        </div>
      </div>

      <!-- Falling Petals Drifting into the Playing Board -->
      <img src="./public/assets/diorama/month9/kiku_petal_red_1.png?v=31"
           class="kiku-el kiku-falling-petal fp-1" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_yellow_1.png?v=31"
           class="kiku-el kiku-falling-petal fp-2" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_2.png?v=31"
           class="kiku-el kiku-falling-petal fp-3" alt="" decoding="async" />
    </div>
  `;
}


  // ============================================================================
  // FILE: src/graphics/cardAnimator.js
  // ============================================================================
// 2.5D Card Flight, Pairing Impact ("Pachin!"), and Capture Tray Animator
// Uses hardware-accelerated Web Animations API to fly cards from Hand/Deck -> Field -> Captured Tray.


class CardFlightAnimator {
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

    const anim = floater.animate(
      [
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
      ],
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
}

const cardAnimator = new CardFlightAnimator();

  // ============================================================================
  // FILE: src/graphics/particles25d.js
  // ============================================================================
// 2.5D Ambient, Tabletop-Landing & Impact Particle Renderer
// Supports all 12 Hanafuda Month Floral Themes + Legacy Opponent Particle Themes

const MONTH_PARTICLE_MAP = {
  1: 'matsu',
  2: 'ume',
  3: 'sakura',
  4: 'fuji',
  5: 'ayame',
  6: 'botan',
  7: 'hagi',
  8: 'susuki',
  9: 'kiku',
  10: 'momiji',
  11: 'yanagi',
  12: 'kiri'
};

class ParticleSystem25D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.theme = 'kiku';
    this.monthNumber = 9;
    this.ambientParticles = [];
    this.landedParticles = [];
    this.burstParticles = [];
    this.running = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Preload Month 9 (Kiku) standalone watercolor petal sprites (2 red + 2 yellow)
    this.kikuPetalSprites = [
      './public/assets/diorama/month9/kiku_petal_red_1.png',
      './public/assets/diorama/month9/kiku_petal_yellow_1.png',
      './public/assets/diorama/month9/kiku_petal_red_2.png',
      './public/assets/diorama/month9/kiku_petal_yellow_2.png'
    ].map((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      return img;
    });

    this.handleResize = () => {
      if (!this.canvas) return;
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.initAmbient(20);
  }

  setTheme(theme) {
    this.theme = theme || 'kiku';
    this.landedParticles = [];
    this.initAmbient(20);
  }

  setMonthTheme(monthNumber = 9) {
    const m = ((Number(monthNumber) - 1) % 12) + 1;
    this.monthNumber = m;
    this.theme = MONTH_PARTICLE_MAP[m] || 'kiku';
    this.landedParticles = [];
    this.initAmbient(20);
  }

  initAmbient(count = 20) {
    this.ambientParticles = [];
    for (let i = 0; i < count; i++) {
      this.ambientParticles.push(this.createAmbientParticle(true));
    }
  }

  createAmbientParticle(randomY = false) {
    const isRain = this.theme === 'yanagi';
    // Concentrate 85% of falling petals within the central playing board horizontal bounds
    const inBoardBand = Math.random() < 0.85;
    const x = inBoardBand
      ? this.width * (0.27 + Math.random() * 0.46)
      : Math.random() * this.width;
    const y = randomY ? Math.random() * (this.height * 0.68) : -24 - Math.random() * 40;
    // Co theo tỉ lệ UI (mobile/iPad) để cánh hoa không quá to so với bàn chơi
    const uiScale = window.HK_UI_SCALE || 1;
    const size = (isRain ? 7 + Math.random() * 8 : 6.5 + Math.random() * 8.0) * uiScale;
    const speedY = (isRain ? 4.2 + Math.random() * 2.8 : 0.44 + Math.random() * 0.82) * uiScale;
    const speedX = (isRain ? -1.1 - Math.random() * 0.6 : -0.42 + Math.random() * 0.88) * uiScale;
    const rot = Math.random() * Math.PI * 2;
    const rotSpeed = (-0.02 + Math.random() * 0.04);

    // 55% of particles passing through the central tabletop region land on the mat
    const canLandOnTable = Math.random() < 0.55;
    const tableTopY = this.height * 0.18;
    const tableBottomY = this.height * 0.64;
    const landY = tableTopY + Math.random() * (tableBottomY - tableTopY);

    return {
      x,
      y,
      size,
      speedX,
      speedY,
      rot,
      rotSpeed,
      alpha: 0.68 + Math.random() * 0.3,
      swayOffset: Math.random() * 100,
      variant: Math.floor(Math.random() * 4),
      canLandOnTable,
      landY
    };
  }

  isInsideTableBounds(x, y) {
    const left = this.width * 0.27;
    const right = this.width * 0.73;
    const top = this.height * 0.17;
    const bottom = this.height * 0.65;
    return x >= left && x <= right && y >= top && y <= bottom;
  }

  spawnLandedParticle(p) {
    if (this.landedParticles.length >= 10) {
      this.landedParticles.shift();
    }
    const isWaterRipple = this.theme === 'yanagi' || this.theme === 'ayame';
    this.landedParticles.push({
      x: p.x,
      y: p.y,
      size: p.size * 0.95,
      rot: p.rot,
      alpha: isWaterRipple ? 0.65 : 0.92,
      maxLife: isWaterRipple ? 1.35 : 5.0 + Math.random() * 2.8,
      age: 0,
      swayOffset: p.swayOffset,
      variant: p.variant,
      isWaterRipple
    });
  }

  /**
   * Triggers a celebratory burst at screen coordinates (x, y) when cards are captured or Yaku is formed
   */
  triggerBurst(x, y, color = '#ffd166', count = 26) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 2.2 + Math.random() * 6.5;
      this.burstParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: (3 + Math.random() * 5.5) * (window.HK_UI_SCALE || 1),
        color,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02
      });
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    let lastTime = performance.now();
    const tick = (now) => {
      if (!this.running) return;
      const dt = Math.min(0.05, (now - lastTime) * 0.001);
      lastTime = now;
      this.updateAndDraw(now * 0.001, dt);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
  }

  drawSingleFloraMotif(ctx, size, variant = 0, isLanded = false) {
    switch (this.theme) {
      case 'matsu': {
        // Pine needle cluster or golden New Year snow crystal
        if (variant === 0) {
          ctx.fillStyle = '#ffd166';
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = '#2d6a4f';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, size * 0.55);
          ctx.lineTo(-size * 0.45, -size * 0.65);
          ctx.moveTo(0, size * 0.55);
          ctx.lineTo(size * 0.45, -size * 0.65);
          ctx.stroke();
        }
        break;
      }

      case 'ume': {
        // Rounded red/pink Ume plum blossom petal
        const r = size * 0.58;
        ctx.fillStyle = variant === 0 ? '#e63946' : '#ff758f';
        ctx.strokeStyle = '#9e1b24';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'fuji': {
        // Lavender & violet Wisteria teardrop petal
        const r = size * 0.68;
        ctx.fillStyle = variant === 0 ? '#9d4edd' : '#c77dff';
        ctx.strokeStyle = '#5a189a';
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.85);
        ctx.quadraticCurveTo(r * 0.75, 0, 0, r * 0.85);
        ctx.quadraticCurveTo(-r * 0.75, 0, 0, -r * 0.85);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }

      case 'ayame': {
        // Iris violet petal or glowing pond dewdrop
        if (variant === 0) {
          ctx.fillStyle = '#4cc9f0';
          ctx.shadowColor = '#4895ef';
          ctx.shadowBlur = isLanded ? 2 : 6;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.36, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const r = size * 0.68;
          ctx.fillStyle = '#5e60ce';
          ctx.strokeStyle = '#ffd166';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 0.48, r * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        break;
      }

      case 'botan': {
        // Lush ruffled crimson/rose Peony petal + gold butterfly dust
        if (variant === 0) {
          ctx.fillStyle = '#ffd166';
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const r = size * 0.76;
          ctx.fillStyle = variant === 1 ? '#d90429' : '#ff4d6d';
          ctx.strokeStyle = '#ffd166';
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(0, r * 0.7);
          ctx.bezierCurveTo(-r, r * 0.2, -r * 0.9, -r * 0.75, -r * 0.3, -r * 0.65);
          ctx.quadraticCurveTo(0, -r * 0.95, r * 0.3, -r * 0.65);
          ctx.bezierCurveTo(r * 0.9, -r * 0.75, r, r * 0.2, 0, r * 0.7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        break;
      }

      case 'hagi': {
        // Small magenta/rose Bush Clover floret
        const r = size * 0.52;
        ctx.fillStyle = variant === 0 ? '#d81159' : '#ff70a6';
        ctx.strokeStyle = '#7209b7';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 0.85, r * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      }

      case 'susuki': {
        // Silver pampas grass seed plume & warm Tsukimi moon mote
        if (variant === 0) {
          ctx.fillStyle = '#fff3b0';
          ctx.shadowColor = '#ffd166';
          ctx.shadowBlur = isLanded ? 2 : 7;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.34, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = '#f8f9fa';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-size * 0.6, size * 0.3);
          ctx.quadraticCurveTo(0, -size * 0.2, size * 0.65, -size * 0.35);
          ctx.stroke();
        }
        break;
      }

      case 'kiku': {
        // Draw one of the 4 standalone watercolor Chrysanthemum petal PNGs (2 red + 2 yellow)
        const sprite =
          this.kikuPetalSprites &&
          this.kikuPetalSprites[Math.abs(variant) % this.kikuPetalSprites.length];
        if (sprite && sprite.complete && sprite.naturalWidth > 0) {
          const h = size * (isLanded ? 2.25 : 2.45);
          const w = h * (sprite.naturalWidth / sprite.naturalHeight);
          if (isLanded) {
            ctx.shadowColor = 'rgba(20, 10, 5, 0.42)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetY = 2;
          }
          ctx.drawImage(sprite, -w * 0.5, -h * 0.5, w, h);
        } else {
          const r = size * 0.78;
          ctx.fillStyle = variant % 2 === 0 ? '#e02424' : '#ffb703';
          ctx.strokeStyle = '#18100c';
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 0.36, r * 0.9, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        break;
      }

      case 'momiji': {
        // 5-lobed Japanese Autumn Maple Leaf
        ctx.fillStyle = variant === 0 ? '#d93829' : '#f48c06';
        ctx.strokeStyle = '#780000';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.32, -size * 0.35);
        ctx.lineTo(size * 0.88, -size * 0.22);
        ctx.lineTo(size * 0.42, size * 0.18);
        ctx.lineTo(size * 0.55, size * 0.75);
        ctx.lineTo(0, size * 0.38);
        ctx.lineTo(-size * 0.55, size * 0.75);
        ctx.lineTo(-size * 0.42, size * 0.18);
        ctx.lineTo(-size * 0.88, -size * 0.22);
        ctx.lineTo(-size * 0.32, -size * 0.35);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }

      case 'yanagi': {
        // Slanted silver-blue raindrop or slender green willow leaf
        if (variant === 0) {
          ctx.fillStyle = '#2a9d8f';
          ctx.strokeStyle = '#1d3557';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 0.22, size * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(168, 218, 220, 0.82)';
          ctx.lineWidth = 1.35;
          ctx.beginPath();
          ctx.moveTo(0, -size * 0.8);
          ctx.lineTo(-size * 0.25, size * 0.8);
          ctx.stroke();
        }
        break;
      }

      case 'kiri':
      case 'celestial': {
        // Imperial violet Paulownia blossom or golden Phoenix feather spark
        if (variant === 0) {
          ctx.fillStyle = '#ffd166';
          ctx.shadowColor = '#f48c06';
          ctx.shadowBlur = isLanded ? 3 : 8;
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 0.28, size * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const r = size * 0.65;
          ctx.fillStyle = '#9d4edd';
          ctx.strokeStyle = '#ffd166';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(0, -r * 0.8);
          ctx.bezierCurveTo(r * 0.8, -r * 0.5, r * 0.7, r * 0.6, 0, r * 0.85);
          ctx.bezierCurveTo(-r * 0.7, r * 0.6, -r * 0.8, -r * 0.5, 0, -r * 0.8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        break;
      }

      case 'goldleaf':
        ctx.fillStyle = '#e09f1f';
        ctx.strokeStyle = '#fff3b0';
        ctx.lineWidth = 0.8;
        ctx.fillRect(-size * 0.42, -size * 0.42, size * 0.84, size * 0.84);
        ctx.strokeRect(-size * 0.42, -size * 0.42, size * 0.84, size * 0.84);
        break;

      case 'spiritfire':
      case 'lantern':
        ctx.fillStyle = this.theme === 'spiritfire' ? '#2b9348' : '#e85d04';
        ctx.shadowColor = this.theme === 'spiritfire' ? '#52b788' : '#ff9e00';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.42, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'sakura':
      default: {
        // Notched pink Sakura cherry blossom petal
        const r = size * 0.74;
        ctx.fillStyle = variant === 0 ? '#ffb3c6' : '#ff8fab';
        ctx.strokeStyle = '#e64980';
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(0, r * 0.75);
        ctx.bezierCurveTo(-r * 0.9, r * 0.25, -r * 0.85, -r * 0.65, -r * 0.22, -r * 0.85);
        ctx.lineTo(0, -r * 0.48);
        ctx.lineTo(r * 0.22, -r * 0.85);
        ctx.bezierCurveTo(r * 0.85, -r * 0.65, r * 0.9, r * 0.25, 0, r * 0.75);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
    }
  }

  updateAndDraw(t, dt = 0.016) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Landed Petals / Water Ripples Resting on the 2.5D Tabletop
    for (let i = this.landedParticles.length - 1; i >= 0; i--) {
      const lp = this.landedParticles[i];
      lp.age += dt;
      if (lp.age >= lp.maxLife) {
        this.landedParticles.splice(i, 1);
        continue;
      }

      const progress = lp.age / lp.maxLife;
      const fadeAlpha =
        progress < 0.15
          ? (progress / 0.15) * lp.alpha
          : progress > 0.72
          ? ((1 - progress) / 0.28) * lp.alpha
          : lp.alpha;

      ctx.save();
      ctx.globalAlpha = Math.max(0, fadeAlpha);

      if (lp.isWaterRipple) {
        const radius = 3 + progress * 22;
        ctx.translate(lp.x, lp.y);
        ctx.scale(1, 0.58); // 2.5D tabletop foreshortening
        ctx.strokeStyle = this.theme === 'ayame' ? '#90e0ef' : '#a8dadc';
        ctx.lineWidth = 1.4 * (1 - progress);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        const breezeQuiver = Math.sin(t * 2.4 + lp.swayOffset) * 1.1;
        ctx.translate(lp.x + breezeQuiver, lp.y);
        ctx.scale(1, 0.72); // Flatten slightly onto the 2.5D Tatami plane
        ctx.rotate(lp.rot + Math.sin(t * 1.8 + lp.swayOffset) * 0.08);
        this.drawSingleFloraMotif(ctx, lp.size, lp.variant, true);
      }
      ctx.restore();
    }

    // 2. Ambient Airborne Particles (Flying & Landing on Tabletop)
    for (let p of this.ambientParticles) {
      const windSway = this.theme === 'yanagi' ? 0.1 : Math.sin(t * 1.3 + p.swayOffset) * 0.55;
      p.x += p.speedX + windSway;
      p.y += p.speedY;
      if (this.theme !== 'yanagi') {
        p.rot += p.rotSpeed;
      }

      // Check if this particle should gently land on the 2.5D playing table
      if (
        p.canLandOnTable &&
        p.y >= p.landY &&
        this.isInsideTableBounds(p.x, p.y)
      ) {
        this.spawnLandedParticle(p);
        p.y = -24 - Math.random() * 30;
        p.x = Math.random() * this.width;
        p.landY = this.height * (0.16 + Math.random() * 0.51);
        continue;
      }

      if (p.y > this.height + 30) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
      if (p.x < -30) p.x = this.width + 20;
      if (p.x > this.width + 30) p.x = -20;

      ctx.save();
      ctx.translate(p.x, p.y);
      if (this.theme !== 'yanagi') {
        ctx.rotate(p.rot);
      }
      ctx.globalAlpha = p.alpha;
      this.drawSingleFloraMotif(ctx, p.size, p.variant, false);
      ctx.restore();
    }

    // 3. Celebratory Impact Burst Particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const b = this.burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.14;
      b.alpha -= b.decay;

      if (b.alpha <= 0) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, b.alpha);
      ctx.fillStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}


  // ============================================================================
  // FILE: src/graphics/yakuReveal.js
  // ============================================================================
// Popup "ăn bộ" (Yaku Reveal): giấy Washi loang mở ra, các lá bay vào thành xấp rồi xòe quạt,
// tên bộ bằng kanji viết cọ, con vật + hoa của bộ bay lên kiểu parallax, cánh hoa rơi.

const YR_ASSET_DIR = './public/assets/yaku_popup/';

// Lá bài -> hình con vật / vật phẩm (ảnh đã tách nền)
const YR_SUBJECT_BY_CARD = {
  1: 'crane',
  9: 'sakura_curtain',
  29: 'full_moon',
  41: 'michikaze',
  45: 'phoenix',
  33: 'sake_cup',
  25: 'boar',
  37: 'deer',
  21: 'butterfly',
  2: 'akatan_ribbon',
  6: 'akatan_ribbon',
  10: 'akatan_ribbon',
  22: 'aotan_ribbon',
  34: 'aotan_ribbon',
  38: 'aotan_ribbon'
};

// Tháng -> loài hoa + màu cánh hoa rơi
const YR_FLOWER_BY_MONTH = {
  1: { img: 'flower_pine', petal: '#f3efe2' },
  2: { img: 'flower_plum', petal: '#c8203a' },
  3: { img: 'flower_sakura', petal: '#ffb7c5' },
  4: { img: 'flower_wisteria', petal: '#b99be0' },
  5: { img: 'flower_iris', petal: '#6a64cf' },
  6: { img: 'flower_peony', petal: '#d6283b' },
  7: { img: 'flower_hagi', petal: '#c2307a' },
  8: { img: 'flower_susuki', petal: '#e6d29a' },
  9: { img: 'flower_kiku', petal: '#f2b632' },
  10: { img: 'flower_momiji', petal: '#d9411e' },
  11: { img: 'flower_willow', petal: '#a9c46e' },
  12: { img: 'flower_kiri', petal: '#c3aee0' }
};

// Vị trí (theo % khung giấy) cho tối đa 3 con vật và 4 cành hoa
const YR_SUBJECT_SLOTS = [
  { x: -14, y: 4, w: 40, d: 1 },
  { x: 72, y: 0, w: 40, d: 0.75 },
  { x: 32, y: -30, w: 36, d: 0.5 }
];
const YR_FLOWER_SLOTS = [
  { x: -18, y: 62, w: 44, r: -8, d: 0.85, flip: false },
  { x: 74, y: 58, w: 44, r: 10, d: 0.65, flip: true },
  { x: -12, y: -18, w: 36, r: 14, d: 0.4, flip: true },
  { x: 80, y: 22, w: 34, r: -12, d: 0.55, flip: false }
];

const YR_DEFS_SVG = `
  <svg class="yaku-reveal-defs" width="0" height="0" aria-hidden="true" focusable="false">
    <filter id="yr-ink-bleed" x="-25%" y="-25%" width="150%" height="150%">
      <!-- Chỉ quầng mực loang mềm, không dùng feDisplacementMap (làm chữ/mép bị răng cưa) -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur" />
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" result="halo" />
      <feMerge><feMergeNode in="halo" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </svg>`;

function yrEscape(str) {
  return String(str ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[ch]);
}

function yrRand(min, max) {
  return min + Math.random() * (max - min);
}

// 'Ino-Shika-Chō (猪鹿蝶)' -> { romaji: 'Ino-Shika-Chō', kanji: '猪鹿蝶' }
function yrSplitJpName(jpName) {
  const m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(jpName || '');
  return m ? { romaji: m[1], kanji: m[2] } : { romaji: jpName || '', kanji: '' };
}

function yrCollectDecor(cardIds) {
  const subjects = [];
  const months = [];
  for (const id of cardIds) {
    const subj = YR_SUBJECT_BY_CARD[id];
    if (subj && !subjects.includes(subj)) subjects.push(subj);
    const card = getCardById(id);
    if (card && !months.includes(card.month)) months.push(card.month);
  }
  return { subjects: subjects.slice(0, 3), months: months.slice(0, 4) };
}

function yrBuildMarkup(yaku, opts, index, total) {
  const cardIds = (yaku.cards || []).slice(0, 15);
  const n = cardIds.length;
  const mid = (n - 1) / 2;
  const { romaji, kanji } = yrSplitJpName(yaku.jpName);
  const { subjects, months } = yrCollectDecor(cardIds);

  // Lá nhỏ dần khi bộ có nhiều lá; góc xòe giới hạn trong ~76 độ
  const cardPx = n <= 3 ? 96 : n <= 6 ? 84 : n <= 9 ? 70 : 58;
  const cardVw = n <= 3 ? 20 : n <= 6 ? 15 : n <= 9 ? 11.5 : 9;
  const step = n > 1 ? Math.min(15, 76 / (n - 1)) : 0;
  const stagger = Math.min(0.035, 0.16 / Math.max(1, n));

  const cardsHtml = cardIds
    .map((id, i) => {
      const card = getCardById(id);
      if (!card) return '';
      const style = [
        `--i:${i}`,
        `--stag:${stagger.toFixed(3)}`,
        `--rot:${((i - mid) * step).toFixed(2)}deg`,
        `--dx:${((i - mid) * 6).toFixed(1)}px`,
        `--sr:${((i - mid) * 1.6).toFixed(2)}deg`,
        `--fx:${yrRand(-260, 260).toFixed(0)}px`,
        `--fy:${yrRand(180, 320).toFixed(0)}px`,
        `--fr:${yrRand(-50, 50).toFixed(0)}deg`
      ].join(';');
      return `<div class="yaku-reveal-card" style="${style}">${renderCardFaceSVG(card, opts.skinId, false)}</div>`;
    })
    .join('');

  const subjectsHtml = subjects
    .map((name, i) => {
      const s = YR_SUBJECT_SLOTS[i];
      return `<div class="yr-float yr-subject" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;--d:${s.d};--k:${i}">
        <img src="${YR_ASSET_DIR}${name}.png" alt="" draggable="false" />
      </div>`;
    })
    .join('');

  const flowersHtml = months
    .map((m, i) => {
      const s = YR_FLOWER_SLOTS[i];
      const f = YR_FLOWER_BY_MONTH[m];
      return `<div class="yr-float yr-flower${s.flip ? ' is-flip' : ''}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;--d:${s.d};--k:${i + 1};--r:${s.r}deg">
        <img src="${YR_ASSET_DIR}${f.img}.png" alt="" draggable="false" />
      </div>`;
    })
    .join('');

  const petalColors = months.map((m) => YR_FLOWER_BY_MONTH[m].petal);
  if (!petalColors.length) petalColors.push('#ffb7c5');
  const petalCount = opts.short ? 10 : 16;
  let petalsHtml = '';
  for (let i = 0; i < petalCount; i++) {
    const style = [
      `left:${yrRand(-5, 100).toFixed(1)}%`,
      `--pc:${petalColors[i % petalColors.length]}`,
      `--pd:${yrRand(0.05, 0.55).toFixed(2)}`,
      `--pl:${yrRand(0.45, 0.75).toFixed(2)}`,
      `--sx:${yrRand(-70, 70).toFixed(0)}px`,
      `--ps:${yrRand(0.6, 1.25).toFixed(2)}`,
      `--spin:${yrRand(260, 720).toFixed(0)}deg`
    ].join(';');
    petalsHtml += `<span class="yaku-reveal-petal" style="${style}"></span>`;
  }

  const kanjiHtml = Array.from(kanji)
    .map((ch, i) => `<span class="${ch === '・' ? 'is-dot' : ''}" style="--c:${i}">${yrEscape(ch)}</span>`)
    .join('');

  const kicker = opts.short
    ? `Đối thủ ${yrEscape(opts.actorName || '')} đã ăn bộ…`
    : 'Bạn đã ăn bộ!';
  const counter = total > 1 ? ` · ${index + 1}/${total}` : '';

  return `
    <div class="yaku-reveal-overlay${opts.short ? ' is-short' : ''}" style="--yr-t:${opts.durationMs}ms;--cw:min(${cardPx}px, calc(${cardVw} * var(--avw, 1vw)));--n:${n}" role="dialog" aria-label="${yrEscape(`${yaku.viName} – ${romaji}`)}">
      ${YR_DEFS_SVG}
      <div class="yaku-reveal-stage">
        <div class="yaku-reveal-paper-wrap"><div class="yaku-reveal-paper"></div></div>
        <div class="yaku-reveal-decor" aria-hidden="true">${flowersHtml}${subjectsHtml}</div>
        <div class="yaku-reveal-petals" aria-hidden="true">${petalsHtml}</div>
        <div class="yaku-reveal-content">
          <div class="yaku-reveal-kicker">${kicker}</div>
          <div class="yaku-reveal-fan">${cardsHtml}</div>
          <h2 class="yaku-reveal-kanji" lang="ja">${kanjiHtml}</h2>
          <div class="yaku-reveal-romaji">${yrEscape(romaji)}</div>
          <div class="yaku-reveal-vi">${yrEscape(yaku.viName)}</div>
          <div class="yaku-reveal-points">+${Number(yaku.points) || 0} điểm</div>
        </div>
        <div class="yaku-reveal-hint">Chạm để bỏ qua${counter}</div>
      </div>
    </div>`;
}

// Tải trước ảnh trang trí + font kanji của bộ (tối đa ~350ms để không làm chậm trận)
function yrPreload(yaku) {
  const { subjects, months } = yrCollectDecor((yaku.cards || []).slice(0, 15));
  const urls = [
    ...subjects.map((n) => `${YR_ASSET_DIR}${n}.png`),
    ...months.map((m) => `${YR_ASSET_DIR}${YR_FLOWER_BY_MONTH[m].img}.png`)
  ];
  const jobs = urls.map((url) => {
    const img = new Image();
    img.src = url;
    return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
  });
  if (document.fonts?.load) {
    jobs.push(document.fonts.load('64px "Yuji Boku Yaku"', yrSplitJpName(yaku.jpName).kanji).catch(() => {}));
  }
  return Promise.race([Promise.all(jobs), new Promise((r) => setTimeout(r, 350))]);
}

function yrEnsureRoot() {
  let root = document.getElementById('yaku-reveal-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'yaku-reveal-root';
    // Gắn vào #app để popup được scale cùng UI (mobile/iPad) thay vì to đùng theo px màn hình
    (document.getElementById('app') || document.body).appendChild(root);
  }
  return root;
}

function yrShowOne(root, yaku, opts, index, total) {
  return new Promise((resolve) => {
    const doc = new DOMParser().parseFromString(yrBuildMarkup(yaku, opts, index, total), 'text/html');
    root.replaceChildren(...Array.from(doc.body.childNodes));
    const overlay = root.querySelector('.yaku-reveal-overlay');
    let done = false;
    let leaveTimer = 0;

    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(leaveTimer);
      overlay.removeEventListener('pointerdown', onSkip);
      document.removeEventListener('keydown', onKey, true);
      overlay.classList.add('is-leaving');
      setTimeout(resolve, 260);
    };
    const onSkip = (e) => {
      e.preventDefault();
      e.stopPropagation();
      finish();
    };
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        finish();
      }
    };

    overlay.addEventListener('pointerdown', onSkip);
    document.addEventListener('keydown', onKey, true);
    // Hiệu ứng mờ dần 260ms nằm trong tổng thời lượng
    leaveTimer = setTimeout(finish, Math.max(400, opts.durationMs - 260));
  });
}

/**
 * Trình diễn lần lượt từng bộ vừa ăn. Trả về Promise khi popup đóng hẳn.
 * @param {Array} yakus - phần tử từ evaluateCapturedYaku().yakus
 * @param {{short?: boolean, actorName?: string, skinId?: string, durationMs?: number}} options
 */
async function playYakuReveal(yakus, options = {}) {
  const list = (yakus || []).filter(Boolean);
  if (!list.length) return;
  const opts = {
    short: !!options.short,
    actorName: options.actorName || '',
    skinId: options.skinId || 'skin_traditional_edo',
    durationMs: options.durationMs || (options.short ? 2000 : 2800)
  };
  const root = yrEnsureRoot();
  try {
    for (let i = 0; i < list.length; i++) {
      await yrPreload(list[i]);
      await yrShowOne(root, list[i], opts, i, list.length);
    }
  } finally {
    root.replaceChildren();
  }
}

  // ============================================================================
  // FILE: src/audio/soundEngine.js
  // ============================================================================
// Procedural Japanese Acoustic Sound & Chill BGM Engine (Web Audio API)
// Synthesizes:
// 1. Relaxing Japanese Chill Background Music (Koto, Shakuhachi bamboo flute, Warm Washitsu Pad, Furin wind chimes, Edo Lo-Fi)
// 2. Hanafuda card snaps ("Pachin!"), Koto pentatonic chimes, Kabuki Hyoshigi clappers, and Taiko drums.

const BGM_TRACKS = [
  {
    id: 'sakura_washitsu',
    name: '🌸 Trà Thất Anh Đào',
    subtitle: 'Koto & Sáo Trúc Shakuhachi êm dịu',
    stepMs: 430
  },
  {
    id: 'tsukimi_bamboo',
    name: '🌕 Trăng Thu Rừng Trúc',
    subtitle: 'Hirajoshi Thiền Tịnh & Chuông Gió Furin',
    stepMs: 490
  },
  {
    id: 'kyoto_lofi',
    name: '🍵 Quán Trà Edo Lo-Fi',
    subtitle: 'Giai điệu Koto Chill & Nhịp Lo-Fi ấm áp',
    stepMs: 390
  }
];

const BGM_ENABLED_STORAGE_KEY = 'hanakoi_bgm_enabled';
const SFX_ENABLED_STORAGE_KEY = 'hanakoi_sfx_enabled';

function readAudioPref(key) {
  try {
    return localStorage.getItem(key) !== '0';
  } catch {
    return true;
  }
}

function writeAudioPref(key, enabled) {
  try {
    localStorage.setItem(key, enabled ? '1' : '0');
  } catch {
    // Ignore storage errors
  }
}

class SoundEngine {
  constructor() {
    this.ctx = null;
    // Nhạc nền (BGM) và hiệu ứng âm thanh (SFX + giọng nhân vật) bật/tắt độc lập
    this.bgmEnabled = readAudioPref(BGM_ENABLED_STORAGE_KEY);
    this.sfxEnabled = readAudioPref(SFX_ENABLED_STORAGE_KEY);
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
    this.currentTrackIndex = 0;
    this.bgmVolume = 0.42;

    // Audio bus nodes for lush Japanese room reverb/delay
    this.bgmMasterGain = null;
    this.bgmDryGain = null;
    this.bgmWetNode = null;

    // Traditional Japanese Hirajoshi / Yo pentatonic scale frequencies
    this.kotoScale = [293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
  }

  // Tắt hết cả nhạc nền lẫn SFX
  get muted() {
    return !this.bgmEnabled && !this.sfxEnabled;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.setupBgmBus(this.ctx);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Context dành cho SFX: trả về null khi SFX đang tắt
  sfxContext() {
    if (!this.sfxEnabled) return null;
    return this.ensureContext();
  }

  /**
   * Creates a warm stereo echo/reverb acoustic space for the BGM instruments
   */
  setupBgmBus(ctx) {
    this.bgmMasterGain = ctx.createGain();
    this.bgmMasterGain.gain.setValueAtTime(this.bgmVolume, ctx.currentTime);
    this.bgmMasterGain.connect(ctx.destination);

    this.bgmDryGain = ctx.createGain();
    this.bgmDryGain.gain.setValueAtTime(0.85, ctx.currentTime);
    this.bgmDryGain.connect(this.bgmMasterGain);

    // Lush warm echo loop (simulates wooden Washitsu / garden acoustics)
    const delay1 = ctx.createDelay(1.0);
    const delay2 = ctx.createDelay(1.0);
    delay1.delayTime.setValueAtTime(0.36, ctx.currentTime);
    delay2.delayTime.setValueAtTime(0.54, ctx.currentTime);

    const feedback = ctx.createGain();
    feedback.gain.setValueAtTime(0.34, ctx.currentTime);

    const dampFilter = ctx.createBiquadFilter();
    dampFilter.type = 'lowpass';
    dampFilter.frequency.setValueAtTime(1650, ctx.currentTime);

    const wetGain = ctx.createGain();
    wetGain.gain.setValueAtTime(0.42, ctx.currentTime);

    delay1.connect(dampFilter);
    dampFilter.connect(delay2);
    delay2.connect(feedback);
    feedback.connect(delay1);

    dampFilter.connect(wetGain);
    delay2.connect(wetGain);
    wetGain.connect(this.bgmMasterGain);

    this.bgmWetNode = delay1;
  }

  connectToBgmSpace(node) {
    if (!this.bgmDryGain || !this.bgmWetNode) return;
    node.connect(this.bgmDryGain);
    node.connect(this.bgmWetNode);
  }

  getCurrentTrack() {
    return BGM_TRACKS[this.currentTrackIndex] || BGM_TRACKS[0];
  }

  cycleTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % BGM_TRACKS.length;
    this.bgmStep = 0;
    this.bgmEnabled = true;
    writeAudioPref(BGM_ENABLED_STORAGE_KEY, true);
    this.startBgm();
    this.restartBgmLoop();
    // Play a gentle Koto confirmation chord
    this.playKotoNote(440, 0, 0.5, 0.09);
    this.playKotoNote(659.25, 0.06, 0.6, 0.09);
    return this.getCurrentTrack();
  }

  toggleBgm() {
    this.bgmEnabled = !this.bgmEnabled;
    writeAudioPref(BGM_ENABLED_STORAGE_KEY, this.bgmEnabled);
    if (this.bgmEnabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
    return this.bgmEnabled;
  }

  toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    writeAudioPref(SFX_ENABLED_STORAGE_KEY, this.sfxEnabled);
    if (!this.sfxEnabled && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
    return this.sfxEnabled;
  }

  startBgm() {
    if (!this.bgmEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    if (this.bgmPlaying && this.bgmTimer) return;
    this.bgmPlaying = true;

    if (this.bgmMasterGain) {
      const now = ctx.currentTime;
      this.bgmMasterGain.gain.cancelScheduledValues(now);
      this.bgmMasterGain.gain.setValueAtTime(0.01, now);
      this.bgmMasterGain.gain.linearRampToValueAtTime(this.bgmVolume, now + 1.2);
    }

    this.restartBgmLoop();
  }

  restartBgmLoop() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (!this.bgmEnabled) {
      this.bgmPlaying = false;
      return;
    }
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.bgmPlaying = true;
    const track = this.getCurrentTrack();
    // Play first step immediately
    this.tickBgmStep();
    this.bgmTimer = setInterval(() => {
      this.tickBgmStep();
    }, track.stepMs);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.ctx && this.bgmMasterGain) {
      const now = this.ctx.currentTime;
      this.bgmMasterGain.gain.cancelScheduledValues(now);
      this.bgmMasterGain.gain.setValueAtTime(this.bgmMasterGain.gain.value, now);
      this.bgmMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
    }
  }

  /**
   * Sequencer tick for the 3 Japanese Chill BGM tracks (32-step cycle = 4 bars of 8 steps)
   */
  tickBgmStep() {
    if (!this.bgmEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx || ctx.state !== 'running') return;

    const step = this.bgmStep % 32;
    this.bgmStep++;

    const trackId = this.getCurrentTrack().id;
    if (trackId === 'sakura_washitsu') {
      this.playSakuraWashitsuStep(step);
    } else if (trackId === 'tsukimi_bamboo') {
      this.playTsukimiBambooStep(step);
    } else {
      this.playKyotoLofiStep(step);
    }
  }

  /**
   * Track 1: 🌸 Trà Thất Anh Đào (Sakura Washitsu Chill)
   * Warm Japanese Yo pentatonic in G / D major-pentatonic with Koto arpeggios & Shakuhachi flute
   */
  playSakuraWashitsuStep(step) {
    // 1. Warm Washitsu Pad Chords at the start of each 8-step bar
    if (step === 0) {
      // Gmaj7 warm pad
      this.playBgmWarmPad([196.00, 293.66, 369.99, 493.88], 3.4, 0.085);
    } else if (step === 8) {
      // Asus4 / F#m7 warm pad
      this.playBgmWarmPad([220.00, 293.66, 369.99, 440.00], 3.4, 0.085);
    } else if (step === 16) {
      // Em9 warm pad
      this.playBgmWarmPad([164.81, 246.94, 293.66, 392.00], 3.4, 0.085);
    } else if (step === 24) {
      // Dadd9 warm pad
      this.playBgmWarmPad([146.83, 220.00, 293.66, 329.63, 369.99], 3.4, 0.085);
    }

    // 2. Expressive Koto Plucked Pattern (D4=293.66, E4=329.63, F#4=369.99, G4=392.00, A4=440.00, B4=493.88, D5=587.33, E5=659.25, G5=783.99, A5=880.00)
    const kotoPattern = {
      0:  { f: 293.66, dur: 1.5, v: 0.11 },
      1:  { f: 392.00, dur: 1.4, v: 0.09 },
      2:  { f: 440.00, dur: 1.4, v: 0.10 },
      3:  { f: 493.88, dur: 1.6, v: 0.11 },
      5:  { f: 587.33, dur: 1.8, v: 0.12 },
      6:  { f: 493.88, dur: 1.2, v: 0.08 },
      7:  { f: 440.00, dur: 1.3, v: 0.09 },

      8:  { f: 329.63, dur: 1.5, v: 0.10 },
      10: { f: 440.00, dur: 1.4, v: 0.10 },
      11: { f: 493.88, dur: 1.4, v: 0.09 },
      12: { f: 659.25, dur: 1.9, v: 0.11 },
      14: { f: 587.33, dur: 1.5, v: 0.10 },
      15: { f: 440.00, dur: 1.2, v: 0.08 },

      16: { f: 246.94, dur: 1.6, v: 0.10 },
      17: { f: 329.63, dur: 1.4, v: 0.09 },
      18: { f: 392.00, dur: 1.5, v: 0.10 },
      19: { f: 493.88, dur: 1.7, v: 0.11 },
      21: { f: 659.25, dur: 1.6, v: 0.11 },
      22: { f: 587.33, dur: 1.4, v: 0.09 },
      23: { f: 493.88, dur: 1.3, v: 0.08 },

      24: { f: 293.66, dur: 1.7, v: 0.11 },
      25: { f: 369.99, dur: 1.4, v: 0.09 },
      26: { f: 440.00, dur: 1.5, v: 0.10 },
      27: { f: 587.33, dur: 1.8, v: 0.11 },
      29: { f: 493.88, dur: 1.4, v: 0.09 },
      30: { f: 440.00, dur: 1.5, v: 0.09 },
      31: { f: 392.00, dur: 1.5, v: 0.08 }
    };

    const note = kotoPattern[step];
    if (note) {
      this.playBgmKotoPluck(note.f, note.dur, note.v);
    }

    // 3. Gentle Shakuhachi Bamboo Flute phrases
    if (step === 4) {
      this.playBgmShakuhachi(587.33, 554.37, 2.1, 0.075);
    } else if (step === 13) {
      this.playBgmShakuhachi(659.25, 587.33, 1.9, 0.07);
    } else if (step === 20) {
      this.playBgmShakuhachi(493.88, 440.00, 2.2, 0.075);
    } else if (step === 28) {
      this.playBgmShakuhachi(440.00, 392.00, 2.0, 0.07);
    }

    // 4. Delicate Furin glass wind chime shimmer
    if (step === 7 || step === 23) {
      if (Math.random() < 0.75) {
        this.playBgmFurinChime(1174.66, 0.032);
      }
    }
  }

  /**
   * Track 2: 🌕 Trăng Thu Rừng Trúc (Tsukimi Bamboo Forest)
   * Contemplative Japanese Hirajoshi pentatonic scale (A, B, C, E, F) with deep bamboo flute & night chimes
   */
  playTsukimiBambooStep(step) {
    // 1. Deep Moonlight Ambient Pads
    if (step === 0) {
      // Am9
      this.playBgmWarmPad([110.00, 220.00, 261.63, 329.63, 493.88], 3.8, 0.085);
    } else if (step === 8) {
      // Fmaj7#11
      this.playBgmWarmPad([174.61, 261.63, 329.63, 440.00, 493.88], 3.8, 0.085);
    } else if (step === 16) {
      // Dm9
      this.playBgmWarmPad([146.83, 220.00, 261.63, 329.63, 349.23], 3.8, 0.085);
    } else if (step === 24) {
      // Esus4 -> E7 peaceful resolution
      this.playBgmWarmPad([164.81, 246.94, 329.63, 440.00], 3.8, 0.08);
    }

    // 2. Hirajoshi Koto Plucks (A3=220, B3=246.94, C4=261.63, E4=329.63, F4=349.23, A4=440, B4=493.88, C5=523.25, E5=659.25, F5=698.46, A5=880)
    const hirajoshiPattern = {
      0:  { f: 220.00, dur: 1.8, v: 0.11 },
      2:  { f: 329.63, dur: 1.6, v: 0.10 },
      3:  { f: 349.23, dur: 1.5, v: 0.09 },
      4:  { f: 440.00, dur: 1.9, v: 0.11 },
      6:  { f: 523.25, dur: 1.7, v: 0.10 },
      7:  { f: 493.88, dur: 1.5, v: 0.09 },

      8:  { f: 261.63, dur: 1.8, v: 0.10 },
      10: { f: 349.23, dur: 1.6, v: 0.09 },
      11: { f: 440.00, dur: 1.6, v: 0.10 },
      12: { f: 659.25, dur: 2.1, v: 0.11 },
      14: { f: 523.25, dur: 1.6, v: 0.09 },

      16: { f: 293.66, dur: 1.8, v: 0.10 },
      18: { f: 349.23, dur: 1.5, v: 0.09 },
      19: { f: 440.00, dur: 1.6, v: 0.10 },
      20: { f: 523.25, dur: 1.9, v: 0.11 },
      22: { f: 493.88, dur: 1.6, v: 0.09 },
      23: { f: 329.63, dur: 1.5, v: 0.08 },

      24: { f: 246.94, dur: 1.8, v: 0.10 },
      26: { f: 329.63, dur: 1.6, v: 0.10 },
      27: { f: 493.88, dur: 1.7, v: 0.10 },
      28: { f: 440.00, dur: 2.2, v: 0.11 },
      30: { f: 329.63, dur: 1.6, v: 0.09 }
    };

    const note = hirajoshiPattern[step];
    if (note) {
      this.playBgmKotoPluck(note.f, note.dur, note.v);
    }

    // 3. Soulful Shakuhachi Moonlight solo
    if (step === 3) {
      this.playBgmShakuhachi(659.25, 587.33, 2.4, 0.08);
    } else if (step === 12) {
      this.playBgmShakuhachi(523.25, 493.88, 2.2, 0.075);
    } else if (step === 20) {
      this.playBgmShakuhachi(440.00, 392.00, 2.5, 0.08);
    }

    // 4. Furin wind chime & Shishi-odoshi bamboo tap
    if (step === 15) {
      this.playBgmFurinChime(1318.51, 0.035);
    } else if (step === 31) {
      this.playBgmBambooTap(0.055);
    }
  }

  /**
   * Track 3: 🍵 Quán Trà Edo Lo-Fi (Kyoto Tea House Lo-Fi)
   * Cozy downtempo Lo-Fi pulse with jazzy Japanese pentatonic Koto & warm Rhodes chords
   */
  playKyotoLofiStep(step) {
    // 1. Cozy Lo-Fi Heartbeat Pulse (every 8-step bar: soft sub-kick on 0, 5; soft brush on 2, 6; warm wood rim on 4)
    const barStep = step % 8;
    if (barStep === 0 || barStep === 5) {
      this.playBgmLofiKick(0.13);
    }
    if (barStep === 2 || barStep === 6) {
      this.playBgmLofiBrush(0.035);
    }
    if (barStep === 4) {
      this.playBgmBambooTap(0.045);
    }

    // 2. Jazzy Lo-Fi Warm Pad Chords (Fmaj9 -> Em7 -> Dm9 -> G13sus4)
    if (step === 0) {
      this.playBgmWarmPad([174.61, 261.63, 329.63, 392.00, 440.00], 2.9, 0.09);
    } else if (step === 8) {
      this.playBgmWarmPad([164.81, 246.94, 293.66, 392.00, 493.88], 2.9, 0.09);
    } else if (step === 16) {
      this.playBgmWarmPad([146.83, 220.00, 261.63, 329.63, 392.00], 2.9, 0.09);
    } else if (step === 24) {
      this.playBgmWarmPad([196.00, 293.66, 349.23, 440.00, 523.25], 2.9, 0.09);
    }

    // 3. Chill Pentatonic Koto Lo-Fi Melody (C major / A minor pentatonic: C, D, E, G, A)
    const lofiMelody = {
      0:  { f: 523.25, dur: 1.2, v: 0.11 },
      1:  { f: 659.25, dur: 1.2, v: 0.10 },
      3:  { f: 783.99, dur: 1.5, v: 0.11 },
      5:  { f: 659.25, dur: 1.2, v: 0.09 },
      6:  { f: 587.33, dur: 1.3, v: 0.10 },

      8:  { f: 493.88, dur: 1.3, v: 0.10 },
      10: { f: 587.33, dur: 1.2, v: 0.10 },
      11: { f: 659.25, dur: 1.5, v: 0.11 },
      13: { f: 523.25, dur: 1.3, v: 0.09 },
      15: { f: 440.00, dur: 1.3, v: 0.09 },

      16: { f: 440.00, dur: 1.4, v: 0.10 },
      17: { f: 523.25, dur: 1.3, v: 0.10 },
      19: { f: 659.25, dur: 1.5, v: 0.11 },
      21: { f: 587.33, dur: 1.3, v: 0.10 },
      22: { f: 523.25, dur: 1.4, v: 0.09 },

      24: { f: 392.00, dur: 1.4, v: 0.10 },
      25: { f: 440.00, dur: 1.3, v: 0.09 },
      27: { f: 523.25, dur: 1.5, v: 0.11 },
      29: { f: 587.33, dur: 1.4, v: 0.10 },
      30: { f: 659.25, dur: 1.6, v: 0.11 }
    };

    const note = lofiMelody[step];
    if (note) {
      this.playBgmKotoPluck(note.f, note.dur, note.v);
    }

    if (step === 12 || step === 28) {
      this.playBgmShakuhachi(659.25, 587.33, 1.5, 0.065);
    }
  }

  // ==========================================================================
  // BGM INSTRUMENT SYNTHESIZERS
  // ==========================================================================

  /**
   * Warm plucked silk-string Koto with natural pitch-bend attack and lowpass resonant decay
   */
  playBgmKotoPluck(freq, duration = 1.5, volume = 0.1) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    // Subtle Koto string pluck pitch bend (starts slightly sharp, settles quickly)
    osc1.frequency.setValueAtTime(freq * 1.007, now);
    osc1.frequency.exponentialRampToValueAtTime(freq, now + 0.03);

    osc2.frequency.setValueAtTime(freq * 2, now);

    // Warm resonant low-pass filter that mellows out as the string rings
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.2, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(420, freq * 1.15), now + duration);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.32, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    gain.gain.setValueAtTime(0.0005, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(gain);

    this.connectToBgmSpace(gain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  }

  /**
   * Breath-infused Shakuhachi bamboo flute with expressive pitch glide and gentle vibrato
   */
  playBgmShakuhachi(freq, startGlideFreq, duration = 2.0, volume = 0.075) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    subOsc.type = 'triangle';

    // Expressive bamboo flute pitch glide (portamento)
    osc.frequency.setValueAtTime(startGlideFreq || freq * 0.96, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.22);
    subOsc.frequency.setValueAtTime((startGlideFreq || freq * 0.96) * 2, now);
    subOsc.frequency.exponentialRampToValueAtTime(freq * 2, now + 0.22);

    // Natural breath vibrato LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.6, now);
    lfoGain.gain.setValueAtTime(0.1, now);
    lfoGain.gain.linearRampToValueAtTime(3.2, now + duration * 0.55);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.18, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    // Smooth swell and gentle release
    gain.gain.setValueAtTime(0.0005, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.35);
    gain.gain.setValueAtTime(volume * 0.9, now + duration * 0.65);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

    osc.connect(filter);
    subOsc.connect(subGain);
    subGain.connect(filter);
    filter.connect(gain);

    this.connectToBgmSpace(gain);

    osc.start(now);
    subOsc.start(now);
    lfo.start(now);
    osc.stop(now + duration + 0.05);
    subOsc.stop(now + duration + 0.05);
    lfo.stop(now + duration + 0.05);
  }

  /**
   * Warm Washitsu Ambient Chord Pad
   */
  playBgmWarmPad(freqs, duration = 3.4, volume = 0.08) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(580, now);

    const masterChordGain = ctx.createGain();
    const perNoteVol = volume / Math.max(1, freqs.length * 0.65);

    masterChordGain.gain.setValueAtTime(0.0005, now);
    masterChordGain.gain.linearRampToValueAtTime(perNoteVol, now + 0.9);
    masterChordGain.gain.setValueAtTime(perNoteVol * 0.85, now + duration * 0.6);
    masterChordGain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

    filter.connect(masterChordGain);
    this.connectToBgmSpace(masterChordGain);

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      // Slight chorus detune for warmth
      osc.frequency.setValueAtTime(f * (1 + (idx - 1.5) * 0.0015), now);
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + duration + 0.08);
    });
  }

  /**
   * Japanese Furin (glass wind chime) high shimmer
   */
  playBgmFurinChime(freq = 1174.66, volume = 0.032) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2.41, now);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.25, now);

    gain.gain.setValueAtTime(0.0005, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0004, now + 1.4);

    osc1.connect(gain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(gain);

    this.connectToBgmSpace(gain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.45);
    osc2.stop(now + 1.45);
  }

  /**
   * Soft Shishi-odoshi bamboo tap / woodblock
   */
  playBgmBambooTap(volume = 0.05) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(680, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.065);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.075);

    osc.connect(gain);
    this.connectToBgmSpace(gain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Soft muffled Lo-Fi heartbeat sub-kick
   */
  playBgmLofiKick(volume = 0.12) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(105, now);
    osc.frequency.exponentialRampToValueAtTime(44, now + 0.14);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.bgmMasterGain);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  /**
   * Soft brushed bamboo shaker for Lo-Fi groove
   */
  playBgmLofiBrush(volume = 0.03) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = Math.floor(ctx.sampleRate * 0.05);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmMasterGain);
    noise.start(now);
  }

  // ==========================================================================
  // GAMEPLAY SOUND EFFECTS (SFX)
  // ==========================================================================

  /**
   * Soft paper slide when hovering or drawing a card
   */
  playCardHover() {
    const ctx = this.sfxContext();
    if (!ctx) return;
    if (this.bgmEnabled && !this.bgmPlaying) {
      this.startBgm();
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.045);
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Iconic Hanafuda "Pachin!" card slap onto the tatami mat
   */
  playCardSnap(isBright = false) {
    const ctx = this.sfxContext();
    if (!ctx) return;
    if (this.bgmEnabled && !this.bgmPlaying) {
      this.startBgm();
    }
    const now = ctx.currentTime;

    // 1. White noise burst for crisp card slap
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.28, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.06);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // 2. Wooden body thud
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(58, now + 0.08);
    oscGain.gain.setValueAtTime(0.25, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);

    // 3. Golden Koto harmonic if capturing a 20pt Bright (Hikari) or Sake Cup!
    if (isBright) {
      this.playKotoNote(587.33, 0.05, 0.35);
      this.playKotoNote(880.0, 0.12, 0.45);
    }
  }

  /**
   * Plucked Koto string note for UI / SFX
   */
  playKotoNote(freq = 440, delay = 0, duration = 0.55, volume = 0.14) {
    const ctx = this.sfxContext();
    if (!ctx) return;
    const start = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc2.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);
    osc2.frequency.setValueAtTime(freq * 2, start);

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0008, start + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc2.start(start);
    osc.stop(start + duration + 0.02);
    osc2.stop(start + duration + 0.02);
  }

  /**
   * Traditional Kabuki Hyoshigi clapper + Taiko drum for "KOI-KOI!" cut-in
   */
  playKoiKoiFanfare() {
    const ctx = this.sfxContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Double Hyoshigi wooden clack ("Kaan! Kaan!")
    [0, 0.16].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2250, now + offset);
      osc.frequency.exponentialRampToValueAtTime(1650, now + offset + 0.09);
      gain.gain.setValueAtTime(0.16, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.11);
    });

    // Deep Taiko Drum boom
    const taiko = ctx.createOscillator();
    const tGain = ctx.createGain();
    taiko.type = 'sine';
    taiko.frequency.setValueAtTime(135, now + 0.02);
    taiko.frequency.exponentialRampToValueAtTime(42, now + 0.45);
    tGain.gain.setValueAtTime(0.35, now + 0.02);
    tGain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
    taiko.connect(tGain);
    tGain.connect(ctx.destination);
    taiko.start(now + 0.02);
    taiko.stop(now + 0.5);

    // Rising Koto glissando
    [293.66, 392.0, 440.0, 587.33, 783.99].forEach((f, idx) => {
      this.playKotoNote(f, 0.18 + idx * 0.055, 0.5, 0.12);
    });
  }

  /**
   * Celebratory Koto fanfare when declaring Shōbu / Winning a round
   */
  playShobuVictory() {
    const notes = [392.0, 440.0, 587.33, 659.25, 880.0, 1174.66];
    notes.forEach((f, idx) => {
      this.playKotoNote(f, idx * 0.075, 0.75, 0.15);
    });
  }

  /**
   * Gacha Omikuji pull & reveal chime
   */
  playGachaReveal(isHighRarity = false) {
    const seq = isHighRarity
      ? [440, 523.25, 659.25, 783.99, 880, 1046.5, 1318.5]
      : [392, 440, 587.33, 659.25, 783.99];
    seq.forEach((f, i) => {
      this.playKotoNote(f, i * 0.065, 0.6, 0.14);
    });
  }

  /**
   * Speaks a character's teasing / pouting / praising line in Japanese (via Web Speech API)
   * accompanied by an expressive character chime inflection.
   */
  speakCharacterLine(opponent, lineObj) {
    if (!this.sfxEnabled || !lineObj) return;
    const ctx = this.sfxContext();
    const vp = (opponent && opponent.voiceProfile) || { pitch: 1.1, rate: 1.0, baseFreq: 440 };

    // 1. Play a cute/expressive Visual Novel vocal inflection chime
    if (ctx) {
      const f = vp.baseFreq || 440;
      this.playKotoNote(f, 0, 0.28, 0.11);
      this.playKotoNote(f * 1.25, 0.09, 0.34, 0.12);
      this.playKotoNote(f * 1.5, 0.18, 0.42, 0.10);
    }

    // 2. Speak Japanese voice line via browser SpeechSynthesis if available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const voices = window.speechSynthesis.getVoices() || [];
        const jpVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('ja'));
        const viVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('vi'));

        const utter = new SpeechSynthesisUtterance(
          jpVoice ? lineObj.jp : viVoice ? lineObj.vi : lineObj.jp
        );
        if (jpVoice) {
          utter.voice = jpVoice;
          utter.lang = 'ja-JP';
        } else if (viVoice) {
          utter.voice = viVoice;
          utter.lang = 'vi-VN';
        } else {
          utter.lang = 'ja-JP';
        }
        utter.pitch = vp.pitch || 1.1;
        utter.rate = vp.rate || 1.0;
        utter.volume = 0.9;
        window.speechSynthesis.speak(utter);
      } catch (e) {
        // Ignore TTS errors on restricted browsers
      }
    }
  }
}

const soundEngine = new SoundEngine();


  // ============================================================================
  // FILE: src/engine/koiKoiEngine.js
  // ============================================================================
// Authentic Hanafuda Koi-Koi Game State Machine & Anime AI Decision Engine


class KoiKoiEngine {
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
      const shuffled = [...HANAFUDA_CARDS].sort(() => Math.random() - 0.5);
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
      roundSummary: canonicalSummary
    };
  }

  importCanonicalState(canonical, myRole = 'host') {
    if (!canonical) return null;
    const isHost = myRole === 'host';
    const myActorCode = isHost ? 'p1' : 'p2';

    this.totalRounds = canonical.totalRounds || 3;
    this.currentRound = canonical.currentRound || 1;
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


  // ============================================================================
  // FILE: src/services/multiplayerService.js
  // ============================================================================
// Multiplayer (PvP Online & Custom Room) + Multi-DB Health Client Service
// Supports Dual-Transport Sync:
// 1. Backend REST API (/api/matchmaking/*, /api/rooms/*, /api/health) -> Redis / MongoDB / PostgreSQL / MySQL / JSON Fallback
// 2. Instant Cross-Tab Sync via BroadcastChannel & localStorage events (<5ms latency when testing 2 tabs on the same PC)

const LOCAL_ROOMS_KEY = 'hanakoi_local_rooms_db_v1';
const LOCAL_QUEUE_KEY = 'hanakoi_local_pvp_queue_v1';
const TAB_PLAYER_ID_KEY = 'hanakoi_tab_player_id_v1';
const TAB_PLAYER_NAME_KEY = 'hanakoi_tab_player_name_v1';

class MultiplayerService {
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

const multiplayerService = new MultiplayerService();

  // ============================================================================
  // FILE: src/ui/viewportScaler.js
  // ============================================================================
// Co giãn toàn bộ #app theo khung thiết kế 16:9 (1600x900) để chơi được trên
// mobile / iPad màn hình ngang mà bố cục không bị co cụm, đè lên nhau.
// - Màn hình >= khung thiết kế: giữ nguyên (scale = 1), bố cục giãn như cũ.
// - Màn hình nhỏ hơn: thu nhỏ đồng đều; chiều còn dư được trả lại cho bố cục
//   (iPad 4:3 cao hơn, điện thoại 19.5:9 rộng hơn) nên không có viền đen.
const DESIGN_W = 1600;
const DESIGN_H = 900;

function getUiScale() {
  return window.HK_UI_SCALE || 1;
}

function initViewportScaler() {
  const root = document.documentElement;

  const apply = () => {
    // visualViewport chuẩn hơn innerHeight trên iOS Safari / Chrome Android khi thanh địa chỉ hiện
    const vv = window.visualViewport;
    const vw = Math.floor(vv ? Math.min(window.innerWidth, vv.width) : window.innerWidth);
    const vh = Math.floor(vv ? Math.min(window.innerHeight, vv.height) : window.innerHeight);
    if (!vw || !vh) return;
    const scale = Math.min(1, vw / DESIGN_W, vh / DESIGN_H);
    root.style.setProperty('--ui-scale', String(scale));
    root.style.setProperty('--app-w', `${vw / scale}px`);
    root.style.setProperty('--app-h', `${vh / scale}px`);
    root.classList.toggle('hk-scaled', scale < 1);
    window.HK_UI_SCALE = scale;
    // Trình duyệt mobile đôi khi tự cuộn trang khi ẩn/hiện thanh địa chỉ -> kéo về gốc
    if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
  };

  if (!document.getElementById('hk-rotate-hint')) {
    const hint = document.createElement('div');
    hint.id = 'hk-rotate-hint';
    hint.setAttribute('role', 'alert');
    const icon = document.createElement('div');
    icon.className = 'hk-rotate-icon';
    icon.textContent = '📱';
    const text = document.createElement('p');
    text.textContent = 'Xoay ngang thiết bị để chơi';
    const sub = document.createElement('span');
    sub.textContent = '横向きにしてください';
    hint.append(icon, text, sub);
    document.body.appendChild(hint);
  }

  apply();
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', () => setTimeout(apply, 250));
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', apply);
    window.visualViewport.addEventListener('scroll', apply);
  }
}

  // ============================================================================
  // FILE: src/main.js
  // ============================================================================
// Main Application Controller for HOA KOI (花恋)
// Manages 2.5D Tabletop UI, 3 Game Modes (PvE, PvP Online, Custom Room), Dark Mode, DB Health, Collection, Gacha & Audio


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
              <img src="./public/assets/pvp_arena_banner.jpg" alt="PvP Online Banner" />
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
              <img src="./public/assets/pvp_arena_banner.jpg" alt="Custom Room Banner" />
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

function bootHanaKoiApp() {
  if (!window.hanaKoiApp) {
    initViewportScaler();
    window.hanaKoiApp = new HanaKoiApp();
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootHanaKoiApp);
} else {
  bootHanaKoiApp();
}
})();
