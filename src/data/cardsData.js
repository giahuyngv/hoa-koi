// Complete 48-Card Hanafuda Deck Database (12 Months x 4 Cards)
// Includes authentic Japanese names, Vietnamese translations, categories, Yaku tags, and visual motifs.

export const MONTHS_INFO = [
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

export const CARD_TYPES = {
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

export const HANAFUDA_CARDS = [
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

export function getCardById(id) {
  return HANAFUDA_CARDS.find((c) => c.id === id);
}

export function getCardsByMonth(month) {
  return HANAFUDA_CARDS.filter((c) => c.month === month);
}

export function getMonthInfo(month) {
  return MONTHS_INFO.find((m) => m.month === month);
}
