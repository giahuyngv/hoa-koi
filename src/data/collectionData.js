// Collectible Card Back Designs & Card Face Skins (Themes) + Gacha & Shop Configuration

export const RARITY_CONFIG = {
  common: { label: 'Cổ Điển', color: '#8d99ae', glow: 'rgba(141, 153, 174, 0.35)', weight: 40 },
  rare: { label: 'Hiếm (R)', color: '#4cc9f0', glow: 'rgba(76, 201, 240, 0.45)', weight: 32 },
  epic: { label: 'Sử Thi (SR)', color: '#b5179e', glow: 'rgba(181, 23, 158, 0.5)', weight: 18 },
  legendary: { label: 'Huyền Thoại (SSR)', color: '#ffb703', glow: 'rgba(255, 183, 3, 0.6)', weight: 8 },
  mythic: { label: 'Thần Thoại (UR)', color: '#f72585', glow: 'rgba(247, 37, 133, 0.7)', weight: 3 }
};

export const CARD_BACKS = [
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
  },
  {
    id: 'back_asanoha_kuro',
    name: 'Lá Gai Đêm (Asanoha Kuro)',
    jpName: '黒漆麻の葉',
    rarity: 'epic',
    price: 800,
    unlockedByDefault: false,
    bossUnlockId: null,
    description: 'Sơn mài đen tuyền với hoa văn lá gai Asanoha in nổi tinh tế, chỉ hiện lên khi ánh sáng lướt qua mặt bài.',
    bgGradient: 'linear-gradient(145deg, #1c1a1f 0%, #0b0a0c 100%)',
    borderColor: '#0b0a0c',
    accentColor: '#6b6570',
    patternType: 'asanoha_kuro',
    noWagara: true
  }
];

export const CARD_SKINS = [
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

export function getCardBackById(id) {
  return CARD_BACKS.find((b) => b.id === id) || CARD_BACKS[0];
}

export function getCardSkinById(id) {
  return CARD_SKINS.find((s) => s.id === id) || CARD_SKINS[0];
}
