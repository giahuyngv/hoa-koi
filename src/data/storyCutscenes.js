// Kịch bản cutscene "kịch cắt giấy" trước trận Cốt truyện (chạy bằng src/story/paperCutscene.js).
// Toạ độ trên sân khấu 1600x900. Rối giấy: toạ độ part theo pixel ảnh gốc, nhân `k`.
// Track: { at (giây), id ('layer' | 'layer/sway' | 'rig.part'), kf (keyframes WAAPI), dur, ease, iter ('inf'), dir, fx (bỏ khi perf-low) }
// Ảnh: public/assets/diorama/cutscene_m<tháng>/ (nguồn + script tách nền: art-test/cutscene_m1/)

export const STORY_CUTSCENES = {
  1: {
    base: './public/assets/diorama/cutscene_m1/',
    ver: 10, // >= 6: bản Ukiyo-e
    kicker: 'Hành trình 12 tháng · Tháng Giêng',
    title: 'Tùng Hạc',
    doorL: '松',
    doorR: '鶴',
    duration: 16,
    layers: [
      { id: 'sky', src: 'sky.webp', x: -80, y: -40, w: 1760, h: 982, z: 0 },
      { id: 'mountains', src: 'mountains.webp', x: -60, y: 390, w: 1720, h: 580, z: 1 },
      { id: 'pineL', src: 'pine_l.webp', x: -90, y: 234, w: 596, h: 696, z: 3, origin: '40% 100%' },
      { id: 'pineR', src: 'pine_r.webp', x: 1210, y: 454, w: 435, h: 476, z: 3, origin: '60% 100%' },
      { id: 'ground', src: 'ground.webp', x: -60, y: 545, w: 1720, h: 650, z: 4 },
      // Đối thủ: 1 hình toàn thân liền mảnh (art-test/fullbuild.py), rung/di chuyển cả người, gốc xoay ở chân
      { id: 'tsuru', src: 'tsuru_full.webp', x: 1025, y: 232, w: 330, h: 640, z: 7, origin: '50% 100%' }
    ],
    rigs: [
      {
        id: 'craneA', x: 1700, y: 150, z: 6, k: 0.3, origin: '99px 106px',
        parts: [
          { id: 'wingFar', src: 'crane_wing_far.webp', w: 302, h: 568, at: [286, -141], pivot: [58, 482], z: 0 },
          { id: 'body', src: 'crane_body.webp', w: 911, h: 578, at: [0, 0], pivot: [329, 353], z: 1 },
          { id: 'wingNear', src: 'crane_wing_near.webp', w: 338, h: 544, at: [272, -112], pivot: [57, 465], z: 2 }
        ]
      },
      {
        id: 'craneB', x: 1700, y: 300, z: 2, k: 0.19, origin: '62px 67px',
        parts: [
          { id: 'wingFar', src: 'crane_wing_far.webp', w: 302, h: 568, at: [286, -141], pivot: [58, 482], z: 0 },
          { id: 'body', src: 'crane_body.webp', w: 911, h: 578, at: [0, 0], pivot: [329, 353], z: 1 },
          { id: 'wingNear', src: 'crane_wing_near.webp', w: 338, h: 544, at: [272, -112], pivot: [57, 465], z: 2 }
        ]
      }
    ],
    particles: { count: 16, cls: 'is-snow' },
    tracks: [
      // Phông nền: trời trôi chậm, núi + đất trồi lên, thông trượt vào rồi đung đưa
      { at: 0, id: 'sky', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-70px)' }], dur: 16, ease: 'linear' },
      { at: 1.3, id: 'mountains', kf: [{ transform: 'translateY(340px)' }, { transform: 'translateY(0)' }], dur: 1.5, ease: 'cubic-bezier(.2,1.25,.4,1)' },
      { at: 2.8, id: 'mountains/sway', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-36px)' }], dur: 12, ease: 'linear', fx: true },
      { at: 1.15, id: 'ground', kf: [{ transform: 'translateY(300px)' }, { transform: 'translateY(0)' }], dur: 1.2, ease: 'cubic-bezier(.2,1.2,.4,1)' },
      { at: 1.7, id: 'pineL', kf: [{ transform: 'translateX(-560px) rotate(-8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
      { at: 1.9, id: 'pineR', kf: [{ transform: 'translateX(520px) rotate(8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
      { at: 3.2, id: 'pineL/sway', kf: [{ transform: 'rotate(-1.3deg)' }, { transform: 'rotate(1.1deg)' }], dur: 3.1, iter: 'inf', dir: 'alternate', fx: true },
      { at: 3.4, id: 'pineR/sway', kf: [{ transform: 'rotate(1.2deg)' }, { transform: 'rotate(-1deg)' }], dur: 2.7, iter: 'inf', dir: 'alternate', fx: true },
      // Hạc bay ngang (phải -> trái), vỗ cánh, nhấp nhô
      { at: 2.4, id: 'craneA', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-2200px)' }], dur: 7.4, ease: 'linear' },
      { at: 2.4, id: 'craneA/sway', kf: [{ transform: 'translateY(-16px) rotate(-3deg)' }, { transform: 'translateY(16px) rotate(2deg)' }], dur: 0.62, iter: 'inf', dir: 'alternate' },
      { at: 2.4, id: 'craneA.wingNear', kf: [{ transform: 'rotate(-40deg)' }, { transform: 'rotate(26deg)' }], dur: 0.62, iter: 'inf', dir: 'alternate' },
      { at: 2.45, id: 'craneA.wingFar', kf: [{ transform: 'rotate(-30deg)' }, { transform: 'rotate(22deg)' }], dur: 0.62, iter: 'inf', dir: 'alternate' },
      { at: 3.6, id: 'craneB', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-2100px)' }], dur: 10, ease: 'linear' },
      { at: 3.6, id: 'craneB/sway', kf: [{ transform: 'translateY(-10px)' }, { transform: 'translateY(10px)' }], dur: 0.7, iter: 'inf', dir: 'alternate' },
      { at: 3.6, id: 'craneB.wingNear', kf: [{ transform: 'rotate(-38deg)' }, { transform: 'rotate(24deg)' }], dur: 0.7, iter: 'inf', dir: 'alternate' },
      { at: 3.66, id: 'craneB.wingFar', kf: [{ transform: 'rotate(-28deg)' }, { transform: 'rotate(20deg)' }], dur: 0.7, iter: 'inf', dir: 'alternate' },
      // Tsuruhime (1 hình liền): trượt vào nhún bước, rung chào, cúi chào cả người, nhảy nhẹ khi giơ lá bài, đung đưa.
      // Cùng 1 phần tử: track tạo sau đè track trước -> giữ đúng thứ tự thời gian.
      { at: 5.6, id: 'tsuru', kf: [{ transform: 'translateX(820px)' }, { transform: 'translateX(0)' }], dur: 2.2, ease: 'cubic-bezier(.25,.7,.3,1)' },
      { at: 5.6, id: 'tsuru/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-18px) rotate(-2deg)' }], dur: 0.37, iter: 6, dir: 'alternate', ease: 'ease-out' },
      { at: 7.85, id: 'tsuru/sway', kf: [{ transform: 'rotate(0)' }, { transform: 'rotate(2.5deg)' }, { transform: 'rotate(-2deg)' }, { transform: 'rotate(1deg)' }, { transform: 'rotate(0)' }], dur: 0.45 },
      { at: 8.4, id: 'tsuru/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(10px) rotate(-6deg)', offset: 0.35 }, { transform: 'translateY(10px) rotate(-6deg)', offset: 0.6 }, { transform: 'translateY(0) rotate(0)' }], dur: 1.6 },
      { at: 10.9, id: 'tsuru', kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(-30px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 0.75 }, { transform: 'translateY(-6px)', offset: 0.88 }, { transform: 'translateY(0)' }], dur: 0.8, ease: 'ease-out' },
      { at: 11.7, id: 'tsuru/sway', kf: [{ transform: 'translateY(0) rotate(-1.2deg)' }, { transform: 'translateY(-5px) rotate(1.2deg)' }], dur: 1.6, iter: 'inf', dir: 'alternate' }
    ],
    captions: [
      { at: 2.3, dur: 3.7, text: 'Tháng Giêng... Gió đầu xuân lùa qua rặng thông già, dưới chân núi Phú Sĩ.', jp: '睦月' },
      { at: 6.2, dur: 4.6, text: 'Đàn hạc bay về báo tin: tinh linh Tsuruhime đang giữ bốn lá Thông của tháng đầu năm!', jp: '松に鶴' },
      { at: 10.8, dur: 5.2, who: 'Tsuruhime', text: 'Một lá Hạc... một tấm thăm đỏ. Này lữ khách, ngươi có dám đổi lấy một ván bài không?' }
    ],
    // vol > 1 = khuếch đại (file gốc paper/sparkle/wind rất nhỏ). Âm thanh (zps-ai: nhạc ACE-Step, SFX). kind 'music' theo nút BGM, còn lại theo nút SFX.
    audioVer: 3,
    cues: [
      { at: 0, snd: 'music.mp3', kind: 'music', vol: 0.6, fadeIn: 0.4 },
      { at: 0.15, snd: 'sfx_hyoshigi.mp3', vol: 0.75 },
      { at: 1.1, snd: 'sfx_doors.mp3', vol: 0.7 },
      { at: 1.3, snd: 'sfx_wind.mp3', vol: 1.2, fadeIn: 2 },
      { at: 1.7, snd: 'sfx_paper.mp3', vol: 3 },
      { at: 2.5, snd: 'sfx_wings.mp3', vol: 0.5 },
      { at: 5.6, snd: 'sfx_paper.mp3', vol: 2.6, rate: 0.9 },
      { at: 8.3, snd: 'sfx_paper.mp3', vol: 2, rate: 1.15 },
      { at: 10.9, snd: 'sfx_sparkle.mp3', vol: 8 },
      { at: 16, snd: 'sfx_doors.mp3', vol: 0.6, rate: 0.95 },
      { at: 16.25, snd: 'sfx_hyoshigi.mp3', vol: 0.6 },
      // Lồng tiếng (zps-ai voice): người dẫn truyện thien_minh, Tsuruhime quynh_anh (temperature 1.1)
      { at: 2.4, snd: 'vo_narr1.mp3', vol: 1 },
      { at: 6.3, snd: 'vo_narr2.mp3', vol: 1 },
      { at: 10.85, snd: 'vo_tsuru.mp3', vol: 1 }
    ]
  },

  // ---- Tháng 2: Mơ và chim oanh — Michizane Tenjin ----
  2: {
    base: './public/assets/diorama/cutscene_m2/',
    ver: 1,
    kicker: 'Hành trình 12 tháng · Tháng Hai',
    title: 'Mai Oanh',
    doorL: '梅',
    doorR: '鶯',
    duration: 16,
    layers: [
      { id: 'sky', src: 'sky.webp', x: -80, y: -40, w: 1760, h: 982, z: 0 },
      { id: 'ground', src: 'ground.webp', x: -60, y: 545, w: 1720, h: 650, z: 4 },
      { id: 'plumL', src: 'plum_l.webp', x: -90, y: 200, w: 607, h: 710, z: 3, origin: '40% 100%' },
      { id: 'plumR', src: 'plum_r.webp', x: 1190, y: 400, w: 460, h: 503, z: 3, origin: '60% 100%' },
      { id: 'michi', src: 'michi_full.webp', x: 1022, y: 232, w: 336, h: 640, z: 7, origin: '50% 100%' }
    ],
    rigs: [
      {
        id: 'birdA', x: 1700, y: 140, z: 6, k: 0.32, origin: '120px 12px',
        parts: [
          { id: 'wingFar', src: 'bird_wing_far.webp', w: 284, h: 452, at: [322, -345], pivot: [53, 384], z: 0 },
          { id: 'body', src: 'bird_body.webp', w: 769, h: 245, at: [0, 0], pivot: [375, 39], z: 1 },
          { id: 'wingNear', src: 'bird_wing_near.webp', w: 385, h: 468, at: [190, -364], pivot: [185, 403], z: 2 }
        ]
      },
      {
        id: 'birdB', x: 1700, y: 330, z: 2, k: 0.18, origin: '68px 7px',
        parts: [
          { id: 'wingFar', src: 'bird_wing_far.webp', w: 284, h: 452, at: [322, -345], pivot: [53, 384], z: 0 },
          { id: 'body', src: 'bird_body.webp', w: 769, h: 245, at: [0, 0], pivot: [375, 39], z: 1 },
          { id: 'wingNear', src: 'bird_wing_near.webp', w: 385, h: 468, at: [190, -364], pivot: [185, 403], z: 2 }
        ]
      }
    ],
    particles: { count: 18, cls: 'is-petal is-plum' },
    tracks: [
      { at: 0, id: 'sky', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-70px)' }], dur: 16, ease: 'linear' },
      { at: 1.15, id: 'ground', kf: [{ transform: 'translateY(300px)' }, { transform: 'translateY(0)' }], dur: 1.2, ease: 'cubic-bezier(.2,1.2,.4,1)' },
      { at: 1.6, id: 'plumL', kf: [{ transform: 'translateX(-560px) rotate(-8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
      { at: 1.85, id: 'plumR', kf: [{ transform: 'translateX(520px) rotate(8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
      { at: 3.1, id: 'plumL/sway', kf: [{ transform: 'rotate(-1.2deg)' }, { transform: 'rotate(1deg)' }], dur: 3.2, iter: 'inf', dir: 'alternate', fx: true },
      { at: 3.3, id: 'plumR/sway', kf: [{ transform: 'rotate(1.1deg)' }, { transform: 'rotate(-1deg)' }], dur: 2.8, iter: 'inf', dir: 'alternate', fx: true },
      // Chim oanh bay ngang, vỗ cánh nhanh, nhấp nhô kiểu chim sẻ
      { at: 2.6, id: 'birdA', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-2200px)' }], dur: 6.5, ease: 'linear' },
      { at: 2.6, id: 'birdA/sway', kf: [{ transform: 'translateY(-22px) rotate(-4deg)' }, { transform: 'translateY(22px) rotate(3deg)' }], dur: 0.5, iter: 'inf', dir: 'alternate' },
      { at: 2.6, id: 'birdA.wingNear', kf: [{ transform: 'rotate(-38deg)' }, { transform: 'rotate(28deg)' }], dur: 0.18, iter: 'inf', dir: 'alternate' },
      { at: 2.62, id: 'birdA.wingFar', kf: [{ transform: 'rotate(-30deg)' }, { transform: 'rotate(24deg)' }], dur: 0.18, iter: 'inf', dir: 'alternate' },
      { at: 4.2, id: 'birdB', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-2100px)' }], dur: 9, ease: 'linear' },
      { at: 4.2, id: 'birdB/sway', kf: [{ transform: 'translateY(-12px)' }, { transform: 'translateY(12px)' }], dur: 0.55, iter: 'inf', dir: 'alternate' },
      { at: 4.2, id: 'birdB.wingNear', kf: [{ transform: 'rotate(-36deg)' }, { transform: 'rotate(26deg)' }], dur: 0.2, iter: 'inf', dir: 'alternate' },
      { at: 4.22, id: 'birdB.wingFar', kf: [{ transform: 'rotate(-28deg)' }, { transform: 'rotate(22deg)' }], dur: 0.2, iter: 'inf', dir: 'alternate' },
      // Michizane: bước vào chậm rãi, gật đầu chào trang nghiêm, nhún khi giơ lá bài, đung đưa
      { at: 5.6, id: 'michi', kf: [{ transform: 'translateX(820px)' }, { transform: 'translateX(0)' }], dur: 2.4, ease: 'cubic-bezier(.25,.7,.3,1)' },
      { at: 5.6, id: 'michi/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-12px) rotate(-1.2deg)' }], dur: 0.42, iter: 6, dir: 'alternate', ease: 'ease-out' },
      { at: 8.2, id: 'michi/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(8px) rotate(-5deg)', offset: 0.35 }, { transform: 'translateY(8px) rotate(-5deg)', offset: 0.6 }, { transform: 'translateY(0) rotate(0)' }], dur: 1.8 },
      { at: 10.9, id: 'michi', kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(-22px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 0.75 }, { transform: 'translateY(-5px)', offset: 0.88 }, { transform: 'translateY(0)' }], dur: 0.8, ease: 'ease-out' },
      { at: 11.7, id: 'michi/sway', kf: [{ transform: 'translateY(0) rotate(-1deg)' }, { transform: 'translateY(-4px) rotate(1deg)' }], dur: 2, iter: 'inf', dir: 'alternate' }
    ],
    captions: [
      { at: 2.3, dur: 3.7, text: 'Tháng Hai... Hoa mơ nở giữa tuyết tàn, bên sân đền trên đồi.', jp: '如月' },
      { at: 6.2, dur: 4.6, text: 'Chim oanh cất tiếng gọi xuân: Michizane Tenjin, vị thần chữ nghĩa, đang chờ lữ khách.', jp: '梅に鶯' },
      { at: 10.8, dur: 5.2, who: 'Michizane', text: 'Hoa mơ nở một mình thì buồn lắm. Ngươi có đọc được thơ trên thăm đỏ không?' }
    ],
    audioVer: 1,
    cues: [
      { at: 0, snd: 'music.mp3', kind: 'music', vol: 0.6, fadeIn: 0.4 },
      { at: 0.15, snd: 'sfx_hyoshigi.mp3', vol: 0.75 },
      { at: 1.1, snd: 'sfx_doors.mp3', vol: 0.7 },
      { at: 1.3, snd: 'sfx_wind.mp3', vol: 0.9, fadeIn: 2 },
      { at: 1.6, snd: 'sfx_paper.mp3', vol: 3 },
      { at: 2.7, snd: 'sfx_bird.mp3', vol: 0.35 },
      { at: 2.6, snd: 'sfx_wings.mp3', vol: 0.9 },
      { at: 5.6, snd: 'sfx_paper.mp3', vol: 2.6, rate: 0.9 },
      { at: 8.2, snd: 'sfx_paper.mp3', vol: 2, rate: 1.15 },
      { at: 10.9, snd: 'sfx_sparkle.mp3', vol: 8 },
      { at: 16, snd: 'sfx_doors.mp3', vol: 0.6, rate: 0.95 },
      { at: 16.25, snd: 'sfx_hyoshigi.mp3', vol: 0.6 },
      // Lồng tiếng: dẫn truyện thien_minh, Michizane thien_tam_duc
      { at: 2.4, snd: 'vo_narr1.mp3', vol: 1 },
      { at: 6.3, snd: 'vo_narr2.mp3', vol: 1 },
      { at: 10.85, snd: 'vo_char.mp3', vol: 1 }
    ]
  },

  // ---- Tháng 3: Anh đào và màn che — Koharu Hinata ----
  3: {
    base: './public/assets/diorama/cutscene_m3/',
    ver: 2,
    kicker: 'Hành trình 12 tháng · Tháng Ba',
    title: 'Anh Đào',
    doorL: '桜',
    doorR: '幕',
    duration: 16,
    layers: [
      { id: 'sky', src: 'sky.webp', x: -80, y: -40, w: 1760, h: 982, z: 0 },
      { id: 'maku', src: 'maku.webp', x: 360, y: 360, w: 700, h: 332, z: 2, origin: '50% 0%' },
      { id: 'ground', src: 'ground.webp', x: -60, y: 545, w: 1720, h: 628, z: 4 },
      { id: 'treeL', src: 'tree_l.webp', x: -90, y: 190, w: 620, h: 705, z: 3, origin: '40% 100%' },
      { id: 'treeR', src: 'tree_r.webp', x: 1180, y: 400, w: 476, h: 505, z: 3, origin: '60% 100%' },
      { id: 'koharu', src: 'koharu_full.webp', x: 1012, y: 232, w: 356, h: 640, z: 7, origin: '50% 100%' }
    ],
    particles: { count: 26, cls: 'is-petal is-sakura' },
    tracks: [
      { at: 0, id: 'sky', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-70px)' }], dur: 16, ease: 'linear' },
      { at: 1.15, id: 'ground', kf: [{ transform: 'translateY(300px)' }, { transform: 'translateY(0)' }], dur: 1.2, ease: 'cubic-bezier(.2,1.2,.4,1)' },
      { at: 1.6, id: 'treeL', kf: [{ transform: 'translateX(-560px) rotate(-8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
      { at: 1.85, id: 'treeR', kf: [{ transform: 'translateX(520px) rotate(8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
      { at: 3.1, id: 'treeL/sway', kf: [{ transform: 'rotate(-1.4deg)' }, { transform: 'rotate(1.2deg)' }], dur: 2.9, iter: 'inf', dir: 'alternate', fx: true },
      { at: 3.3, id: 'treeR/sway', kf: [{ transform: 'rotate(1.3deg)' }, { transform: 'rotate(-1.1deg)' }], dur: 2.5, iter: 'inf', dir: 'alternate', fx: true },
      // Màn hội hoa: thả từ trên xuống rồi tung bay trong gió
      { at: 2.5, id: 'maku', kf: [{ transform: 'translateY(-520px)' }, { transform: 'translateY(0)' }], dur: 1.1, ease: 'cubic-bezier(.3,1.35,.5,1)' },
      { at: 3.6, id: 'maku/sway', kf: [{ transform: 'skewX(0deg) scaleY(1)' }, { transform: 'skewX(2.5deg) scaleY(.985)' }, { transform: 'skewX(-1.5deg) scaleY(1.005)' }], dur: 2.2, iter: 'inf', dir: 'alternate' },
      // Koharu: lướt vào xoay nhẹ như điệu múa, xoay vòng rung quạt, cúi chào, nhảy khi giơ lá bài
      { at: 5.6, id: 'koharu', kf: [{ transform: 'translateX(820px)' }, { transform: 'translateX(0)' }], dur: 2, ease: 'cubic-bezier(.25,.7,.3,1)' },
      { at: 5.6, id: 'koharu/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-20px) rotate(-3deg)' }], dur: 0.33, iter: 6, dir: 'alternate', ease: 'ease-out' },
      { at: 7.7, id: 'koharu/sway', kf: [{ transform: 'rotate(0) scaleX(1)' }, { transform: 'rotate(3deg) scaleX(-1)', offset: 0.5 }, { transform: 'rotate(0) scaleX(1)' }], dur: 0.7, ease: 'ease-in-out' },
      { at: 8.6, id: 'koharu/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(10px) rotate(-6deg)', offset: 0.35 }, { transform: 'translateY(10px) rotate(-6deg)', offset: 0.6 }, { transform: 'translateY(0) rotate(0)' }], dur: 1.5 },
      { at: 10.9, id: 'koharu', kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(-34px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 0.75 }, { transform: 'translateY(-8px)', offset: 0.88 }, { transform: 'translateY(0)' }], dur: 0.8, ease: 'ease-out' },
      { at: 11.7, id: 'koharu/sway', kf: [{ transform: 'translateY(0) rotate(-2deg)' }, { transform: 'translateY(-6px) rotate(2deg)' }], dur: 1.2, iter: 'inf', dir: 'alternate' }
    ],
    captions: [
      { at: 2.3, dur: 3.7, text: 'Tháng Ba... Núi Yoshino phủ kín anh đào, gió xuân rắc cánh hoa khắp lối.', jp: '弥生' },
      { at: 6.2, dur: 4.6, text: 'Tấm màn hội hoa đã căng lên: Koharu Hinata đang múa giữa mùa ngắm hoa.', jp: '桜に幕' },
      { at: 10.8, dur: 5.2, who: 'Koharu', text: 'Ngắm hoa mà chơi bài một mình thì phí lắm! Ngồi xuống đi lữ khách, thử giành tấm màn của ta xem!' }
    ],
    audioVer: 1,
    cues: [
      { at: 0, snd: 'music.mp3', kind: 'music', vol: 0.45, fadeIn: 0.4 },
      { at: 0.15, snd: 'sfx_hyoshigi.mp3', vol: 0.75 },
      { at: 1.1, snd: 'sfx_doors.mp3', vol: 0.7 },
      { at: 1.3, snd: 'sfx_petals.mp3', vol: 2.4, fadeIn: 2, loop: true },
      { at: 1.6, snd: 'sfx_paper.mp3', vol: 3 },
      { at: 2.5, snd: 'sfx_paper.mp3', vol: 2.4, rate: 0.8 },
      { at: 5.6, snd: 'sfx_paper.mp3', vol: 2.6, rate: 0.9 },
      { at: 7.7, snd: 'sfx_fan.mp3', vol: 1.3 },
      { at: 8.6, snd: 'sfx_paper.mp3', vol: 2, rate: 1.15 },
      { at: 10.9, snd: 'sfx_sparkle.mp3', vol: 8 },
      { at: 16, snd: 'sfx_doors.mp3', vol: 0.6, rate: 0.95 },
      { at: 16.25, snd: 'sfx_hyoshigi.mp3', vol: 0.6 },
      // Lồng tiếng: dẫn truyện thien_minh, Koharu ngoc_huyen (temperature 1.1)
      { at: 2.4, snd: 'vo_narr1.mp3', vol: 1 },
      { at: 6.3, snd: 'vo_narr2.mp3', vol: 1 },
      { at: 10.85, snd: 'vo_char.mp3', vol: 1.3 }
    ]
  },

  // ---- Tháng 4: Tử đằng và đỗ quyên — Shion (Fujiwara) ----
  4: {
    base: './public/assets/diorama/cutscene_m4/',
    ver: 2,
    kicker: 'Hành trình 12 tháng · Tháng Tư',
    title: 'Đằng Quyên',
    doorL: '藤',
    doorR: '鵑',
    duration: 16,
    layers: [
      { id: 'sky', src: 'sky.webp', x: -80, y: -40, w: 1760, h: 982, z: 0 },
      { id: 'ground', src: 'ground.webp', x: -60, y: 545, w: 1720, h: 650, z: 4 },
      { id: 'treeL', src: 'tree_l.webp', x: -90, y: 190, w: 759, h: 710, z: 3, origin: '10% 100%' },
      { id: 'treeR', src: 'tree_r.webp', x: 1180, y: 400, w: 443, h: 522, z: 3, origin: '60% 100%' },
      { id: 'shion', src: 'shion_full.webp', x: 1008, y: 232, w: 364, h: 640, z: 7, origin: '50% 100%' }
    ],
    rigs: [
      {
        id: 'bird', x: 1700, y: 150, z: 6, k: 0.26, origin: '87px 29px',
        parts: [
          { id: 'wingFar', src: 'bird_wing_far.webp', w: 353, h: 626, at: [114, -451], pivot: [219, 563], z: 0 },
          { id: 'body', src: 'bird_body.webp', w: 1013, h: 305, at: [0, 0], pivot: [333, 112], z: 1 },
          { id: 'wingNear', src: 'bird_wing_near.webp', w: 380, h: 604, at: [150, -426], pivot: [183, 538], z: 2 }
        ]
      }
    ],
    tracks: [
      { at: 0, id: 'sky', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-70px)' }], dur: 16, ease: 'linear' },
      { at: 1.15, id: 'ground', kf: [{ transform: 'translateY(300px)' }, { transform: 'translateY(0)' }], dur: 1.2, ease: 'cubic-bezier(.2,1.2,.4,1)' },
      { at: 1.6, id: 'treeL', kf: [{ transform: 'translateX(-700px)' }, { transform: 'translateX(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
      { at: 1.85, id: 'treeR', kf: [{ transform: 'translateX(520px) rotate(8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
      { at: 3.1, id: 'treeL/sway', kf: [{ transform: 'skewX(-1deg)' }, { transform: 'skewX(1.2deg)' }], dur: 3.4, iter: 'inf', dir: 'alternate', fx: true },
      { at: 3.3, id: 'treeR/sway', kf: [{ transform: 'rotate(1deg)' }, { transform: 'rotate(-1deg)' }], dur: 3, iter: 'inf', dir: 'alternate', fx: true },
      // Đỗ quyên lượn ngang chậm, cánh vỗ sải
      { at: 2.6, id: 'bird', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-2300px)' }], dur: 7.2, ease: 'linear' },
      { at: 2.6, id: 'bird/sway', kf: [{ transform: 'translateY(-14px) rotate(-3deg)' }, { transform: 'translateY(14px) rotate(2deg)' }], dur: 0.8, iter: 'inf', dir: 'alternate' },
      { at: 2.6, id: 'bird.wingNear', kf: [{ transform: 'rotate(-34deg)' }, { transform: 'rotate(26deg)' }], dur: 0.4, iter: 'inf', dir: 'alternate' },
      { at: 2.64, id: 'bird.wingFar', kf: [{ transform: 'rotate(-26deg)' }, { transform: 'rotate(22deg)' }], dur: 0.4, iter: 'inf', dir: 'alternate' },
      // Shion: thong thả bước vào, khẽ nghiêng mình chào, nhún nhẹ khi giơ lá bài, đứng đung đưa chậm
      { at: 5.6, id: 'shion', kf: [{ transform: 'translateX(820px)' }, { transform: 'translateX(0)' }], dur: 2.8, ease: 'cubic-bezier(.25,.7,.3,1)' },
      { at: 5.6, id: 'shion/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-10px) rotate(-1deg)' }], dur: 0.5, iter: 6, dir: 'alternate', ease: 'ease-out' },
      { at: 8.6, id: 'shion/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(8px) rotate(-5deg)', offset: 0.35 }, { transform: 'translateY(8px) rotate(-5deg)', offset: 0.65 }, { transform: 'translateY(0) rotate(0)' }], dur: 2 },
      { at: 10.9, id: 'shion', kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(-18px)', offset: 0.45 }, { transform: 'translateY(0)', offset: 0.8 }, { transform: 'translateY(0)' }], dur: 0.9, ease: 'ease-out' },
      { at: 11.8, id: 'shion/sway', kf: [{ transform: 'translateY(0) rotate(-0.8deg)' }, { transform: 'translateY(-3px) rotate(0.8deg)' }], dur: 2.6, iter: 'inf', dir: 'alternate' }
    ],
    captions: [
      { at: 2.3, dur: 3.7, text: 'Tháng Tư... Hoa tử đằng rủ bên hồ nhà Fujiwara, nắng chiều đầu hạ.', jp: '卯月' },
      { at: 6.2, dur: 4.6, text: 'Chim đỗ quyên cất tiếng: công tử Shion đang chờ người biết kiên nhẫn.', jp: '藤に不如帰' },
      { at: 10.8, dur: 5.2, who: 'Shion', text: 'Hoa tử đằng rủ xuống chậm, ván bài của ta cũng vậy. Ngươi có biết chờ không?' }
    ],
    audioVer: 1,
    cues: [
      { at: 0, snd: 'music.mp3', kind: 'music', vol: 0.6, fadeIn: 0.4 },
      { at: 0.15, snd: 'sfx_hyoshigi.mp3', vol: 0.75 },
      { at: 1.1, snd: 'sfx_doors.mp3', vol: 0.7 },
      { at: 1.3, snd: 'sfx_water.mp3', vol: 2.2, fadeIn: 2, loop: true },
      { at: 1.6, snd: 'sfx_paper.mp3', vol: 3 },
      { at: 3.2, snd: 'sfx_cuckoo.mp3', vol: 0.35 },
      { at: 5.6, snd: 'sfx_paper.mp3', vol: 2.6, rate: 0.9 },
      { at: 8.6, snd: 'sfx_paper.mp3', vol: 2, rate: 1.15 },
      { at: 10.9, snd: 'sfx_sparkle.mp3', vol: 8 },
      { at: 16, snd: 'sfx_doors.mp3', vol: 0.6, rate: 0.95 },
      { at: 16.25, snd: 'sfx_hyoshigi.mp3', vol: 0.6 },
      // Lồng tiếng: dẫn truyện thien_minh, Shion thanh_binh
      { at: 2.4, snd: 'vo_narr1.mp3', vol: 1 },
      { at: 6.3, snd: 'vo_narr2.mp3', vol: 1 },
      { at: 10.85, snd: 'vo_char.mp3', vol: 1 }
    ]
  }
};
