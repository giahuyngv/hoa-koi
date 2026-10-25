// 12 Ukiyo-e × Anime Opponents representing the 12 Months of Hanafuda & Classic Japanese Legends
// Each opponent has Personality, Folklore Archetype, AI Strategy, Stage Theme, Dialogues, Teasing/Praising Voice Lines & Rewards

export const ANIME_OPPONENTS = [
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
    avatar: './public/assets/characters/tsuruhime.webp?v=26',
    portrait: './public/assets/characters/cutout/tsuruhime.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/tsuruhime.webp?v=2',
    koikoiScale: 1.15,
    koikoiDrop: 1,
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
    avatar: './public/assets/characters/michizane.webp?v=26',
    portrait: './public/assets/characters/cutout/michizane.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/michizane.webp?v=2',
    koikoiScale: 1.15,
    koikoiDrop: 1,
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
    avatar: './public/assets/characters/koharu.webp?v=26',
    portrait: './public/assets/characters/cutout/koharu.webp?v=2',
    koikoiArt: './public/assets/characters/koikoi/koharu.webp?v=2',
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
    avatar: './public/assets/characters/shiori.webp?v=26',
    portrait: './public/assets/characters/cutout/shiori.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/shiori.webp?v=2',
    koikoiScale: 1.15,
    koikoiDrop: 1,
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
    avatar: './public/assets/characters/ayame.webp?v=26',
    portrait: './public/assets/characters/cutout/ayame.webp?v=2',
    koikoiArt: './public/assets/characters/koikoi/ayame.webp?v=2',
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
    avatar: './public/assets/characters/yukiho.webp?v=26',
    portrait: './public/assets/characters/cutout/yukiho.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/yukiho.webp?v=2',
    koikoiScale: 1.15,
    koikoiDrop: 1,
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
    avatar: './public/assets/characters/tsunade.webp?v=26',
    portrait: './public/assets/characters/cutout/tsunade.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/tsunade.webp?v=2',
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
    avatar: './public/assets/characters/kaguya.webp?v=26',
    portrait: './public/assets/characters/cutout/kaguya.webp?v=2',
    koikoiArt: './public/assets/characters/koikoi/kaguya.webp?v=2',
    koikoiScale: 1.15,
    koikoiDrop: 1,
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
    avatar: './public/assets/characters/kikumaru.webp?v=26',
    portrait: './public/assets/characters/cutout/kikumaru.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/kikumaru.webp?v=2',
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
    avatar: './public/assets/characters/renji.webp?v=26',
    portrait: './public/assets/characters/cutout/renji.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/renji.webp?v=2',
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
    avatar: './public/assets/characters/haruto.webp?v=26',
    portrait: './public/assets/characters/cutout/haruto.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/haruto.webp?v=2',
    koikoiScale: 1.15,
    koikoiDrop: 1,
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
    avatar: './public/assets/characters/amaterasu.webp?v=26',
    portrait: './public/assets/characters/cutout/amaterasu.webp?v=1',
    koikoiArt: './public/assets/characters/koikoi/amaterasu.webp?v=2',
    koikoiScale: 1.15,
    koikoiDrop: 1,
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

export function getOpponentById(id) {
  return ANIME_OPPONENTS.find((o) => o.id === id) || ANIME_OPPONENTS[0];
}
