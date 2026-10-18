// Authentic Hanafuda Card Face Renderer (using real traditional 48 Hanafuda card images)
// + 10 Collectible Japanese Card Back Designs & 6 Collectible Card Skin Treatments

import { getCardSkinById, getCardBackById } from '../data/collectionData.js';

/**
 * Generates the card face markup using the authentic real Hanafuda card image (card_1.jpg .. card_48.jpg)
 * with optional collectible Skin frame/tint and compact gameplay month/point badges.
 */
export function renderCardFaceSVG(card, skinId = 'skin_traditional_edo', showBadges = true) {
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

export function renderCardBackSVG(backId = 'back_urushi_red') {
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

export const TABLETOP_DIORAMA_CATALOG = {
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

export function getTabletopDioramaInfo() {
  // Temporarily locked to Month 9 (Kiku - Chrysanthemum & Sake Cup) per user request
  return TABLETOP_DIORAMA_CATALOG[9];
}

export function renderTabletopFlowerDioramaSVG() {
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

export function renderTabletopBillboardDioramaHTML() {
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

