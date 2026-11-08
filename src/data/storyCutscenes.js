// Kịch bản cutscene "kịch cắt giấy" trước trận Cốt truyện (chạy bằng src/story/paperCutscene.js).
// Toạ độ trên sân khấu 1600x900. Rối giấy: toạ độ part theo pixel ảnh gốc, nhân `k`.
// Track: { at (giây), id ('layer' | 'layer/sway' | 'rig.part'), kf (keyframes WAAPI), dur, ease, iter ('inf'), dir, fx (bỏ khi perf-low) }
// Ảnh: public/assets/diorama/cutscene_m<tháng>/ (nguồn + script tách nền: art-test/cutscene_m1/)

export const STORY_CUTSCENES = {
  1: {
    base: './public/assets/diorama/cutscene_m1/',
    ver: 11, // >= 6: bản Ukiyo-e
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
      { id: 'tsuru', src: 'tsuru_full.webp', x: 1046, y: 232, w: 289, h: 640, z: 7, origin: '50% 100%' }
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
    ver: 2,
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
      { id: 'michi', src: 'michi_full.webp', x: 1043, y: 232, w: 294, h: 640, z: 7, origin: '50% 100%' }
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
    ver: 3,
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
      { id: 'koharu', src: 'koharu_full.webp', x: 1034, y: 232, w: 313, h: 640, z: 7, origin: '50% 100%' }
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
    ver: 3,
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
      { id: 'shion', src: 'shion_full.webp', x: 1031, y: 232, w: 318, h: 640, z: 7, origin: '50% 100%' }
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

// ---- Tháng 5-12: dựng từ mẫu chung (nền + 2 cây + nhân vật liền mảnh + chim/đạo cụ). Kích thước ảnh lấy từ art-test/buildx.py ----
const PC_MOOD = {
  // step: nhịp nhún khi bước vào; hop/tilt: độ nhún; bow: góc cúi chào; jump: nhảy khi giơ lá bài; idle: [giây, độ lắc]
  lively: { enter: 2.2, step: 0.37, hop: -18, tilt: -2, bow: -6, jump: -30, idle: [1.6, 1.2] },
  calm: { enter: 2.8, step: 0.5, hop: -10, tilt: -1, bow: -5, jump: -18, idle: [2.6, 0.8] },
  bold: { enter: 1.8, step: 0.3, hop: -22, tilt: -2.5, bow: -4, jump: -38, idle: [1.3, 1.5] },
  grand: { enter: 3, step: 0.55, hop: -8, tilt: -0.8, bow: -4, jump: -14, idle: [3, 0.6] }
};
function pcCharTracks(id, mood, at) {
  const p = PC_MOOD[mood] || PC_MOOD.lively;
  const bowAt = 5.6 + p.enter + 0.6;
  return [
    { at: 5.6, id, kf: [{ transform: 'translateX(820px)' }, { transform: 'translateX(0)' }], dur: p.enter, ease: 'cubic-bezier(.25,.7,.3,1)' },
    { at: 5.6, id: `${id}/sway`, kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: `translateY(${p.hop}px) rotate(${p.tilt}deg)` }], dur: p.step, iter: Math.max(2, Math.round(p.enter / p.step / 2) * 2), dir: 'alternate', ease: 'ease-out' },
    { at: bowAt, id: `${id}/sway`, kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: `translateY(9px) rotate(${p.bow}deg)`, offset: 0.35 }, { transform: `translateY(9px) rotate(${p.bow}deg)`, offset: 0.62 }, { transform: 'translateY(0) rotate(0)' }], dur: 1.6 },
    { at, id, kf: [{ transform: 'translateY(0)' }, { transform: `translateY(${p.jump}px)`, offset: 0.4 }, { transform: 'translateY(0)', offset: 0.75 }, { transform: `translateY(${p.jump * 0.2}px)`, offset: 0.88 }, { transform: 'translateY(0)' }], dur: 0.8, ease: 'ease-out' },
    { at: at + 0.8, id: `${id}/sway`, kf: [{ transform: `translateY(0) rotate(${-p.idle[1]}deg)` }, { transform: `translateY(-4px) rotate(${p.idle[1]}deg)` }], dur: p.idle[0], iter: 'inf', dir: 'alternate' }
  ];
}
// Chim/bướm rối 3 mảnh bay ngang phải -> trái. b: { k, y, body:[w,h,pivX,pivY], far:[...], near:[...], flap, wing:[[gần], [xa]] }
function pcBird(id, b) {
  const part = (pid, src, d, z) => ({ id: pid, src, w: d[0], h: d[1], at: pid === 'body' ? [0, 0] : [b.body[2] - d[2], b.body[3] - d[3]], pivot: [d[2], d[3]], z });
  return {
    id, x: 1700, y: b.y || 150, z: b.z || 6, k: b.k, origin: `${Math.round(b.body[2] * b.k)}px ${Math.round(b.body[3] * b.k)}px`,
    parts: [part('wingFar', 'bird_wing_far.webp', b.far, 0), part('body', 'bird_body.webp', b.body, 1), part('wingNear', 'bird_wing_near.webp', b.near, 2)]
  };
}
function pcBirdTracks(id, at, b) {
  const f = b.flap || 0.4, w = b.wing || [[-34, 26], [-26, 22]];
  return [
    { at, id, kf: [{ transform: 'translateX(0)' }, { transform: `translateX(-${b.dist || 2300}px)` }], dur: b.fly || 7, ease: 'linear' },
    { at, id: `${id}/sway`, kf: [{ transform: `translateY(-${b.bob || 14}px) rotate(-3deg)` }, { transform: `translateY(${b.bob || 14}px) rotate(2deg)` }], dur: b.bobDur || f * 2, iter: 'inf', dir: 'alternate' },
    { at, id: `${id}.wingNear`, kf: [{ transform: `rotate(${w[0][0]}deg)` }, { transform: `rotate(${w[0][1]}deg)` }], dur: f, iter: 'inf', dir: 'alternate' },
    { at: at + 0.04, id: `${id}.wingFar`, kf: [{ transform: `rotate(${w[1][0]}deg)` }, { transform: `rotate(${w[1][1]}deg)` }], dur: f, iter: 'inf', dir: 'alternate' }
  ];
}
// o: { m, name, who, kicker, title, doorL, doorR, full:[w,h], ground:[w,h], tl:[w,h], tr:[w,h], mood, bird, layers, tracks, particles, cap, sfx }
function pcMonth(o) {
  const fw = Math.round(o.full[0] * 640 / o.full[1]);
  const tlW = o.tlW || 620, trW = o.trW || 470;
  const charAt = o.charAt || 10.9;
  const dur = o.duration || 17;
  const sw = o.treeSkew;
  const layers = [
    { id: 'sky', src: 'sky.webp', x: -80, y: -40, w: 1760, h: 982, z: 0 },
    { id: 'ground', src: 'ground.webp', x: -60, y: 545, w: 1720, h: Math.round(1720 * o.ground[1] / o.ground[0]), z: 4 },
    { id: 'treeL', src: 'tree_l.webp', x: -90, y: o.tlY || 190, w: tlW, h: Math.round(tlW * o.tl[1] / o.tl[0]), z: 3, origin: '40% 100%' },
    { id: 'treeR', src: 'tree_r.webp', x: 1180, y: o.trY || 400, w: trW, h: Math.round(trW * o.tr[1] / o.tr[0]), z: 3, origin: '60% 100%' },
    ...(o.layers || []),
    { id: o.name, src: `${o.name}_full.webp`, x: 1190 - Math.round(fw / 2), y: 232, w: fw, h: 640, z: 7, origin: '50% 100%' }
  ];
  const tracks = [
    { at: 0, id: 'sky', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-70px)' }], dur, ease: 'linear' },
    { at: 1.15, id: 'ground', kf: [{ transform: 'translateY(300px)' }, { transform: 'translateY(0)' }], dur: 1.2, ease: 'cubic-bezier(.2,1.2,.4,1)' },
    { at: 1.6, id: 'treeL', kf: [{ transform: 'translateX(-700px) rotate(-8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
    { at: 1.85, id: 'treeR', kf: [{ transform: 'translateX(560px) rotate(8deg)' }, { transform: 'translateX(0) rotate(0)' }], dur: 1.3, ease: 'cubic-bezier(.2,1.3,.4,1)' },
    { at: 3.1, id: 'treeL/sway', kf: [{ transform: sw ? 'skewX(-1.5deg)' : 'rotate(-1.3deg)' }, { transform: sw ? 'skewX(1.5deg)' : 'rotate(1.1deg)' }], dur: o.treeSway || 3, iter: 'inf', dir: 'alternate', fx: true },
    { at: 3.3, id: 'treeR/sway', kf: [{ transform: sw ? 'skewX(1.4deg)' : 'rotate(1.2deg)' }, { transform: sw ? 'skewX(-1.4deg)' : 'rotate(-1deg)' }], dur: (o.treeSway || 3) * 0.9, iter: 'inf', dir: 'alternate', fx: true },
    ...(o.bird ? pcBirdTracks('bird', o.bird.at || 2.6, o.bird) : []),
    ...(o.tracks || []),
    ...pcCharTracks(o.name, o.mood, charAt)
  ];
  const c = o.cap;
  return {
    base: `./public/assets/diorama/cutscene_m${o.m}/`,
    ver: o.ver || 1,
    kicker: `Hành trình 12 tháng · ${o.kicker}`,
    title: o.title, doorL: o.doorL, doorR: o.doorR,
    duration: dur,
    layers,
    rigs: o.bird ? [pcBird('bird', o.bird)] : [],
    particles: o.particles,
    tracks,
    captions: [
      { at: 2.3, dur: 3.9, text: c[0], jp: c[1] },
      { at: 6.2, dur: charAt - 6.4, text: c[2], jp: c[3] },
      { at: charAt - 0.1, dur: dur - charAt + 0.1, who: o.who, text: c[4] }
    ],
    audioVer: o.audioVer || 1,
    cues: [
      { at: 0, snd: 'music.mp3', kind: 'music', vol: o.musicVol || 0.55, fadeIn: 0.4 },
      { at: 0.15, snd: 'sfx_hyoshigi.mp3', vol: 0.75 },
      { at: 1.1, snd: 'sfx_doors.mp3', vol: 0.7 },
      { at: 1.6, snd: 'sfx_paper.mp3', vol: 3 },
      { at: 5.6, snd: 'sfx_paper.mp3', vol: 2.6, rate: 0.9 },
      { at: 5.6 + (PC_MOOD[o.mood] || PC_MOOD.lively).enter + 0.6, snd: 'sfx_paper.mp3', vol: 2, rate: 1.15 },
      { at: charAt, snd: 'sfx_sparkle.mp3', vol: 8 },
      { at: dur, snd: 'sfx_doors.mp3', vol: 0.6, rate: 0.95 },
      { at: dur + 0.25, snd: 'sfx_hyoshigi.mp3', vol: 0.6 },
      ...(o.sfx || []),
      // Lồng tiếng (zps-ai): dẫn truyện thien_minh + giọng nhân vật (art-test/gen_audio_mx.py)
      { at: 2.4, snd: 'vo_narr1.mp3', vol: 1 },
      { at: 6.3, snd: 'vo_narr2.mp3', vol: 1 },
      { at: charAt - 0.05, snd: 'vo_char.mp3', vol: o.voVol || 1 }
    ]
  };
}

Object.assign(STORY_CUTSCENES, {
  // ---- Tháng 5: Diên vĩ và cầu tám nhịp — Ayame (người dẫn đường) ----
  5: pcMonth({
    m: 5, name: 'ayame', who: 'Ayame', kicker: 'Tháng Năm', title: 'Diên Vĩ', doorL: '菖', doorR: '橋', mood: 'lively',
    full: [361, 900], ver: 2, ground: [1376, 520], tl: [584, 735], tr: [404, 532], treeSkew: true,
    bird: { k: 0.32, y: 170, body: [890, 288, 488, 107], far: [292, 587, 165, 528], near: [348, 555, 261, 490], flap: 0.16, fly: 5.5, bob: 18, bobDur: 0.5, wing: [[-30, 30], [-24, 26]] },
    cap: ['Tháng Năm... Đầm diên vĩ tím ngắt, cây cầu tám nhịp uốn khúc trên mặt nước.', '皐月',
      'Chim bói cá lướt qua mặt đầm: người dẫn đường Ayame bỗng dừng chân giữa cầu.', '菖蒲に八橋',
      'Người dẫn đường cũng là một tinh linh. Qua được cầu này trên chiếu bài, tôi sẽ đi tiếp cùng lữ khách.'],
    sfx: [{ at: 1.3, snd: 'sfx_water.mp3', vol: 3.5, fadeIn: 2, loop: true }, { at: 2.7, snd: 'sfx_bird.mp3', vol: 0.5 }]
  }),
  // ---- Tháng 6: Mẫu đơn và bướm — Yukiho Katsuragi ----
  6: pcMonth({
    m: 6, name: 'yukiho', who: 'Yukiho', kicker: 'Tháng Sáu', title: 'Mẫu Đơn', doorL: '牡', doorR: '蝶', mood: 'grand',
    full: [387, 900], ver: 2, ground: [1376, 520], tl: [701, 753], tr: [494, 521], tlW: 640, trW: 480,
    particles: { count: 14, cls: 'is-petal is-peony' },
    bird: { k: 0.3, y: 200, body: [670, 266, 282, 115], far: [669, 466, 374, 407], near: [470, 638, 52, 407], flap: 0.14, fly: 8, dist: 2200, bob: 30, bobDur: 0.7, wing: [[-8, 28], [8, -24]] },
    cap: ['Tháng Sáu... Phố đèn lồng lên đèn, mẫu đơn nở đỏ rực trong vườn hoa khôi.', '水無月',
      'Một con bướm phượng bay vào: Yukiho Katsuragi, đệ nhất hoa khôi, đang đợi khách.', '牡丹に蝶',
      'Một lữ khách lấm bụi đường dám ngồi đối diện ta. Bắt được hồ điệp trên chiếu, ta cho ngươi vào vườn.'],
    sfx: [{ at: 1.3, snd: 'sfx_bell.mp3', vol: 1.2 }, { at: 2.7, snd: 'sfx_wings.mp3', vol: 12 }, { at: 8.6, snd: 'sfx_bell.mp3', vol: 1, rate: 1.1 }]
  })
});

Object.assign(STORY_CUTSCENES, {
  // ---- Tháng 7: Hồ chi và lợn rừng — Tsunade ----
  7: pcMonth({
    m: 7, name: 'tsunade', who: 'Tsunade', kicker: 'Tháng Bảy', title: 'Hồ Chi', doorL: '萩', doorR: '猪', mood: 'bold',
    full: [419, 900], ver: 2, ground: [1376, 520], tl: [745, 732], tr: [517, 526], tlW: 660, trW: 480,
    particles: { count: 22, cls: 'is-petal is-hagi' },
    layers: [{ id: 'boar', src: 'prop.webp', x: 1700, y: 590, w: 440, h: 242, z: 5, origin: '50% 100%' }],
    tracks: [
      // Lợn rừng lao ngang đồi, nảy người theo nhịp chạy
      { at: 2.6, id: 'boar', kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-2300px)' }], dur: 3.2, ease: 'linear' },
      { at: 2.6, id: 'boar/sway', kf: [{ transform: 'translateY(0) rotate(1.5deg)' }, { transform: 'translateY(-14px) rotate(-2deg)' }], dur: 0.17, iter: 'inf', dir: 'alternate' }
    ],
    cap: ['Tháng Bảy... Hoa hồ chi nở hồng trên đồi, gió thu đầu mùa thổi qua cỏ khô.', '文月',
      'Một con lợn rừng lao vút qua: công chúa Tsunade đã bày sẵn chiếu bạc.', '萩に猪',
      'Ha! Nhóc lữ khách đi được nửa năm rồi à? Lợn, hươu, bướm, gom đủ cả ba trước mặt ta xem!'],
    sfx: [{ at: 1.3, snd: 'sfx_wind.mp3', vol: 1.6, fadeIn: 2 }, { at: 2.5, snd: 'sfx_boar.mp3', vol: 0.9 }]
  }),
  // ---- Tháng 8: Cỏ lau và trăng rằm — Kaguya ----
  8: pcMonth({
    m: 8, name: 'kaguya', who: 'Kaguya', kicker: 'Tháng Tám', title: 'Trăng Rằm', doorL: '芒', doorR: '月', mood: 'calm',
    full: [440, 900], ver: 2, ground: [1376, 566], tl: [775, 734], tr: [492, 527], tlW: 660, trW: 480, treeSkew: true, treeSway: 3.6,
    particles: { count: 14, cls: 'is-fluff', slow: 1.4 },
    bird: { k: 0.25, y: 130, z: 2, body: [1165, 293, 612, 103], far: [541, 497, 64, 417], near: [572, 341, 61, 231], flap: 0.45, fly: 9, dist: 2400, bob: 10, wing: [[-30, 18], [-24, 16]] },
    cap: ['Tháng Tám... Đêm rằm, trăng sáng vằng vặc trên đồi cỏ lau bạc.', '葉月',
      'Đàn nhạn bay ngang mặt trăng: công chúa Kaguya đã xuống trần.', '芒に月',
      'Người trần thường mang quà tới để xin ta. Ngươi mang gì? Hãy ngắm trăng cùng ta trong một ván bài.'],
    sfx: [{ at: 1.3, snd: 'sfx_wind.mp3', vol: 0.5, fadeIn: 2, loop: true }, { at: 2.8, snd: 'sfx_geese.mp3', vol: 2 }]
  }),
  // ---- Tháng 9: Cúc và chén rượu — Shuten Kikumaru ----
  9: pcMonth({
    m: 9, name: 'kikumaru', who: 'Kikumaru', kicker: 'Tháng Chín', title: 'Cúc Tửu', doorL: '菊', doorR: '盃', mood: 'bold',
    full: [366, 900], ver: 2, ground: [1376, 520], tl: [585, 742], tr: [460, 523],
    particles: { count: 16, cls: 'is-petal is-kiku' },
    layers: [{ id: 'cup', src: 'prop.webp', x: 450, y: 290, w: 420, h: 229, z: 2, origin: '50% 50%' }],
    tracks: [
      // Chén rượu thọ hạ xuống từ trời rồi bồng bềnh
      { at: 2.5, id: 'cup', kf: [{ transform: 'translateY(-720px) rotate(-12deg)' }, { transform: 'translateY(0) rotate(0)' }], dur: 1.6, ease: 'cubic-bezier(.3,1.3,.5,1)' },
      { at: 4.1, id: 'cup/sway', kf: [{ transform: 'translateY(-8px) rotate(-3deg)' }, { transform: 'translateY(8px) rotate(3deg)' }], dur: 2.2, iter: 'inf', dir: 'alternate' }
    ],
    cap: ['Tháng Chín... Hoa cúc vàng phủ kín núi Ōe, mùi rượu thoảng trong gió chiều.', '長月',
      'Chén rượu thọ đã rót đầy: Shuten Kikumaru đang chờ người đối ẩm.', '菊に盃',
      'Khách hiếm đấy! Chén rượu này chưa rời tay ta bao giờ. Giành được trên chiếu thì nó là của ngươi.'],
    sfx: [{ at: 2.8, snd: 'sfx_pour.mp3', vol: 1 }, { at: 8.6, snd: 'sfx_laugh.mp3', vol: 0.35 }]
  }),
  // ---- Tháng 10: Phong đỏ và hươu — Renji Akatsuki ----
  10: pcMonth({
    m: 10, name: 'renji', who: 'Renji', kicker: 'Tháng Mười', title: 'Phong Lộc', doorL: '紅', doorR: '鹿', mood: 'calm',
    full: [405, 900], ver: 2, ground: [1376, 520], tl: [632, 738], tr: [480, 528],
    particles: { count: 16, cls: 'is-maple' },
    // Hươu lật ngang (quay mặt sang phải), bước vào từ trái
    layers: [{ id: 'deer', src: 'prop.webp', x: 640, y: 420, w: 230, h: 389, z: 5, origin: '50% 100%', scale: '-1 1' }],
    tracks: [
      { at: 2.5, id: 'deer', kf: [{ transform: 'translateX(-820px)' }, { transform: 'translateX(0)' }], dur: 2.4, ease: 'cubic-bezier(.25,.7,.3,1)' },
      { at: 2.5, id: 'deer/sway', kf: [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-10px) rotate(1.5deg)' }], dur: 0.3, iter: 8, dir: 'alternate', ease: 'ease-out' },
      { at: 4.9, id: 'deer/sway', kf: [{ transform: 'rotate(-0.8deg)' }, { transform: 'translateY(-2px) rotate(0.8deg)' }], dur: 2.2, iter: 'inf', dir: 'alternate' }
    ],
    cap: ['Tháng Mười... Rừng phong đỏ rực, lá rơi lả tả trên dòng suối nhỏ.', '神無月',
      'Con hươu sao ngoái nhìn: kiếm thánh Renji Akatsuki đã đứng đợi từ đầu thu.', '紅葉に鹿',
      'Mười tháng, ngươi đi xa đấy, nhưng xa chưa chắc đã giỏi. Ba tấm thăm xanh, ba đường kiếm trong một nhịp.'],
    sfx: [{ at: 1.3, snd: 'sfx_leaves.mp3', vol: 0.45, fadeIn: 2 }, { at: 9.3, snd: 'sfx_sword.mp3', vol: 1.5 }]
  }),
  // ---- Tháng 11: Liễu và người đội mưa — Haruto Abe ----
  11: pcMonth({
    m: 11, name: 'haruto', who: 'Haruto', kicker: 'Tháng Mười Một', title: 'Liễu Vũ', doorL: '柳', doorR: '雨', mood: 'calm',
    full: [421, 900], ver: 2, ground: [1376, 520], tl: [682, 747], tr: [466, 536], treeSkew: true, treeSway: 2.4,
    particles: { count: 60, cls: 'is-rain', rain: true },
    bird: { k: 0.3, y: 190, body: [882, 235, 261, 111], far: [367, 458, 47, 385], near: [491, 362, 62, 321], flap: 0.12, fly: 4.5, bob: 26, bobDur: 0.6, wing: [[-36, 28], [-28, 24]] },
    cap: ['Tháng Mười Một... Mưa rơi trên bến sông, rặng liễu rũ tóc xuống mặt nước.', '霜月',
      'Chim én chao qua làn mưa: âm dương sư Haruto đã bói trước ngày ngươi tới.', '柳に燕',
      'Quẻ nói ngươi sẽ tới, nhưng không nói ngươi sẽ thắng. Bắt được người đội mưa, quẻ sẽ đổi.'],
    sfx: [{ at: 1.2, snd: 'sfx_rain.mp3', vol: 1.1, fadeIn: 1.5, loop: true }, { at: 4.4, snd: 'sfx_thunder.mp3', vol: 0.25 }]
  }),
  // ---- Tháng 12: Ngô đồng và phượng hoàng — Amaterasu Hōō ----
  12: pcMonth({
    m: 12, name: 'amaterasu', who: 'Amaterasu', kicker: 'Tháng Chạp', title: 'Phượng Hoàng', doorL: '桐', doorR: '鳳', mood: 'grand', charAt: 11.4,
    full: [456, 900], ver: 2, ground: [1376, 520], tl: [589, 750], tr: [450, 534],
    particles: { count: 18, cls: 'is-gold', slow: 1.3 },
    bird: { k: 0.34, y: 230, body: [1254, 388, 259, 181], far: [392, 435, 100, 393], near: [505, 368, 55, 297], flap: 0.5, fly: 9.5, dist: 2500, bob: 16, bobDur: 1.4, wing: [[-30, 22], [-24, 18]] },
    cap: ['Tháng Chạp... Bình minh cuối năm nhuộm vàng tán ngô đồng.', '師走',
      'Phượng hoàng giáng xuống: Nữ đế Amaterasu, người xé bộ bài thành mười hai phần, đang chờ.', '桐に鳳凰',
      'Ngươi đã đi qua mười một tháng. Phượng hoàng chỉ đậu trên ngô đồng, hãy giành nó từ tay ta.'],
    sfx: [{ at: 1.3, snd: 'sfx_gong.mp3', vol: 0.35 }, { at: 2.8, snd: 'sfx_phoenix.mp3', vol: 0.25 }]
  })
});
