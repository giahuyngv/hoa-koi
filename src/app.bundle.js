(function(){"use strict";const ft=[{month:1,jpName:"Matsu (松)",viName:"Tháng 1 - Tùng (Thông)",flower:"Cây Tùng (Pine)",season:"Xuân",symbolism:"Biểu tượng của sự trường thọ, kiên cường trong sương tuyết đầu năm mới.",accentColor:"#2d6a4f"},{month:2,jpName:"Ume (梅)",viName:"Tháng 2 - Mai Đỏ",flower:"Hoa Mai Mơ (Plum Blossom)",season:"Xuân",symbolism:"Loài hoa nở sớm nhất bất chấp giá lạnh cuối đông, báo hiệu mùa xuân về.",accentColor:"#d90429"},{month:3,jpName:"Sakura (桜)",viName:"Tháng 3 - Anh Đào",flower:"Hoa Anh Đào (Cherry Blossom)",season:"Xuân",symbolism:"Vẻ đẹp rực rỡ nhưng mong manh của mùa lễ hội thưởng hoa (Hanami).",accentColor:"#ff758f"},{month:4,jpName:"Fuji (藤)",viName:"Tháng 4 - Tử Đằng",flower:"Hoa Tử Đằng (Wisteria)",season:"Hạ",symbolism:"Những chùm hoa tím rủ xuống duyên dáng tượng trưng cho tình yêu và sự thanh tao.",accentColor:"#7209b7"},{month:5,jpName:"Ayame (菖蒲)",viName:"Tháng 5 - Diên Vĩ",flower:"Hoa Diên Vĩ (Iris)",season:"Hạ",symbolism:"Mọc bên đầm nước và cầu gỗ tám nhịp, xua đuổi tà khí trong tiết Đoan Ngọ.",accentColor:"#4361ee"},{month:6,jpName:"Botan (牡丹)",viName:"Tháng 6 - Mẫu Đơn",flower:"Hoa Mẫu Đơn (Peony)",season:"Hạ",symbolism:"Vua của các loài hoa, biểu trưng cho phú quý, vương giả và vinh hoa.",accentColor:"#e63946"},{month:7,jpName:"Hagi (萩)",viName:"Tháng 7 - Hồ Chi",flower:"Cỏ Đậu Khấu (Bush Clover)",season:"Thu",symbolism:"Thảo mộc đầu thu đung đưa trong gió núi, nơi lợn rừng phóng qua.",accentColor:"#b5179e"},{month:8,jpName:"Susuki (芒)",viName:"Tháng 8 - Cỏ Lau",flower:"Đồi Cỏ Lau (Pampas Grass)",season:"Thu",symbolism:"Cánh đồng cỏ lau bạc dưới ánh trăng rằm tháng tám (Tsukimi).",accentColor:"#e76f51"},{month:9,jpName:"Kiku (菊)",viName:"Tháng 9 - Cúc Vàng",flower:"Hoa Cúc (Chrysanthemum)",season:"Thu",symbolism:"Quốc hoa của Hoàng gia Nhật Bản, gắn liền với tiệc rượu hoa cúc trường thọ.",accentColor:"#f4a261"},{month:10,jpName:"Momiji (紅葉)",viName:"Tháng 10 - Phong Đỏ",flower:"Lá Phong Thu (Maple)",season:"Thu",symbolism:"Rừng phong nhuộm đỏ cả núi đồi, nơi hươu sao cất tiếng gọi bạn.",accentColor:"#c1121f"},{month:11,jpName:"Yanagi (柳)",viName:"Tháng 11 - Liễu Mưa",flower:"Cây Liễu (Willow)",season:"Đông",symbolism:"Cơn mưa lạnh đầu đông và câu chuyện kiên trì của Ono no Michikaze.",accentColor:"#2a9d8f"},{month:12,jpName:"Kiri (桐)",viName:"Tháng 12 - Ngô Đồng",flower:"Hoa Ngô Đồng (Paulownia)",season:"Đông",symbolism:"Loài cây thần mộc duy nhất mà chim Phượng Hoàng chọn để đậu xuống.",accentColor:"#6d597a"}],kt={hikari:{id:"hikari",jpName:"Hikari (光)",viName:"Quang (20đ)",points:20,badgeColor:"#ffd166",description:"5 lá bài quý giá nhất bộ bài, mang ánh sáng của tự nhiên và thần thoại."},tane:{id:"tane",jpName:"Tane (種)",viName:"Thú / Vật (10đ)",points:10,badgeColor:"#ef476f",description:"9 lá bài khắc họa chim muông, thú rừng, cầu gỗ và chén rượu Sake."},tanzaku:{id:"tanzaku",jpName:"Tanzaku (短冊)",viName:"Dải Thơ (5đ)",points:5,badgeColor:"#118ab2",description:"10 lá bài có dải giấy viết thơ buộc trên cành cây (Đỏ chữ, Xanh tím, Đỏ trơn)."},kasu:{id:"kasu",jpName:"Kasu (カス)",viName:"Lá Thường (1đ)",points:1,badgeColor:"#8d99ae",description:"24 lá bài chỉ khắc họa hoa lá thuần túy, tích lũy đủ 10 lá sẽ tạo thành Yaku."}},H=[{id:1,month:1,indexInMonth:1,jpName:"Matsu ni Tsuru",kanji:"松に鶴",viName:"Tùng Hạc Diên Niên",type:"hikari",points:20,tags:["hikari","dry_hikari","crane"],motif:"pine_crane",lore:"Chim Hạc đầu đỏ đứng uy nghiêm dưới gốc Tùng cổ thụ và mặt trời mọc đầu năm."},{id:2,month:1,indexInMonth:2,jpName:"Matsu ni Akatan",kanji:"松に赤短",viName:"Tùng Xích Đan (Thơ Đỏ)",type:"tanzaku",points:5,tags:["tanzaku","akatan"],ribbonText:"あかよろし",motif:"pine_ribbon",lore:'Dải giấy đỏ khắc dòng chữ cổ "Akayoroshi" (Rất đỗi tốt lành), thuộc bộ Xích Đan.'},{id:3,month:1,indexInMonth:3,jpName:"Matsu no Kasu 1",kanji:"松のカス",viName:"Tùng Thường I",type:"kasu",points:1,tags:["kasu"],motif:"pine_plain_1",lore:"Tán lá thông xanh kiên cường trước gió xuân."},{id:4,month:1,indexInMonth:4,jpName:"Matsu no Kasu 2",kanji:"松のカス",viName:"Tùng Thường II",type:"kasu",points:1,tags:["kasu"],motif:"pine_plain_2",lore:"Thân thông già vươn mình đón nắng mới."},{id:5,month:2,indexInMonth:1,jpName:"Ume ni Uguisu",kanji:"梅に鴬",viName:"Mai Hoàng Oanh",type:"tane",points:10,tags:["tane","bird"],motif:"plum_warbler",lore:"Chim Hoàng Oanh (Uguisu) hót vang trên cành hoa Mai đỏ, báo tin xuân ấm áp."},{id:6,month:2,indexInMonth:2,jpName:"Ume ni Akatan",kanji:"梅に赤短",viName:"Mai Xích Đan (Thơ Đỏ)",type:"tanzaku",points:5,tags:["tanzaku","akatan"],ribbonText:"あかよろし",motif:"plum_ribbon",lore:"Dải thơ đỏ treo giữa những đóa mai thắm, mảnh ghép thứ hai của bộ Xích Đan."},{id:7,month:2,indexInMonth:3,jpName:"Ume no Kasu 1",kanji:"梅のカス",viName:"Mai Thường I",type:"kasu",points:1,tags:["kasu"],motif:"plum_plain_1",lore:"Cành mai đỏ nở rộ giữa trời xuân."},{id:8,month:2,indexInMonth:4,jpName:"Ume no Kasu 2",kanji:"梅のカス",viName:"Mai Thường II",type:"kasu",points:1,tags:["kasu"],motif:"plum_plain_2",lore:"Những nụ hoa mai e ấp trong sương sớm."},{id:9,month:3,indexInMonth:1,jpName:"Sakura ni Maku",kanji:"桜に幕",viName:"Màn Hoa Anh Đào",type:"hikari",points:20,tags:["hikari","dry_hikari","curtain","hanami"],motif:"sakura_curtain",lore:"Bức màn trướng lễ hội (Jinmaku) căng dưới tán Anh Đào, kết hợp cùng Chén Rượu tạo thành Hoa Kiến Tửu!"},{id:10,month:3,indexInMonth:2,jpName:"Sakura ni Akatan",kanji:"桜に赤短",viName:"Anh Đào Xích Đan (Thơ Đỏ)",type:"tanzaku",points:5,tags:["tanzaku","akatan"],ribbonText:"みよしの",motif:"sakura_ribbon",lore:'Dải thơ đỏ viết chữ "Miyoshino" — vùng núi Yoshino nổi tiếng nhất Nhật Bản về hoa Anh Đào.'},{id:11,month:3,indexInMonth:3,jpName:"Sakura no Kasu 1",kanji:"桜のカス",viName:"Anh Đào Thường I",type:"kasu",points:1,tags:["kasu"],motif:"sakura_plain_1",lore:"Chùm hoa anh đào hồng phấn khoe sắc."},{id:12,month:3,indexInMonth:4,jpName:"Sakura no Kasu 2",kanji:"桜のカス",viName:"Anh Đào Thường II",type:"kasu",points:1,tags:["kasu"],motif:"sakura_plain_2",lore:"Cánh hoa anh đào bay theo làn gió xuân."},{id:13,month:4,indexInMonth:1,jpName:"Fuji ni Hototogisu",kanji:"藤に不如帰",viName:"Tử Đằng Chim Đỗ Quyên",type:"tane",points:10,tags:["tane","bird"],motif:"wisteria_cuckoo",lore:"Chim Đỗ Quyên vỗ cánh bay ngang vầng trăng khuyết và giàn hoa Tử Đằng rủ bóng."},{id:14,month:4,indexInMonth:2,jpName:"Fuji ni Tanzaku",kanji:"藤に短冊",viName:"Tử Đằng Dải Đỏ",type:"tanzaku",points:5,tags:["tanzaku","plain_tanzaku"],motif:"wisteria_ribbon",lore:"Dải giấy đỏ trơn đung đưa giữa những chuỗi hoa Tử Đằng tím."},{id:15,month:4,indexInMonth:3,jpName:"Fuji no Kasu 1",kanji:"藤のカス",viName:"Tử Đằng Thường I",type:"kasu",points:1,tags:["kasu"],motif:"wisteria_plain_1",lore:"Chuỗi hoa Tử Đằng buông rủ bên hồ nước."},{id:16,month:4,indexInMonth:4,jpName:"Fuji no Kasu 2",kanji:"藤のカス",viName:"Tử Đằng Thường II",type:"kasu",points:1,tags:["kasu"],motif:"wisteria_plain_2",lore:"Sắc tím Tử Đằng dịu mát ngày đầu hạ."},{id:17,month:5,indexInMonth:1,jpName:"Ayame ni Yatsuhashi",kanji:"菖蒲に八橋",viName:"Cầu Gỗ Diên Vĩ",type:"tane",points:10,tags:["tane"],motif:"iris_bridge",lore:"Cây cầu gỗ tám nhịp Yatsuhashi nổi tiếng trong Truyện Ise, bắc ngang đầm hoa Diên Vĩ."},{id:18,month:5,indexInMonth:2,jpName:"Ayame ni Tanzaku",kanji:"菖蒲に短冊",viName:"Diên Vĩ Dải Đỏ",type:"tanzaku",points:5,tags:["tanzaku","plain_tanzaku"],motif:"iris_ribbon",lore:"Dải lụa đỏ nổi bật trên nền lá Diên Vĩ xanh biếc."},{id:19,month:5,indexInMonth:3,jpName:"Ayame no Kasu 1",kanji:"菖蒲のカス",viName:"Diên Vĩ Thường I",type:"kasu",points:1,tags:["kasu"],motif:"iris_plain_1",lore:"Đóa Diên Vĩ tím vươn lên từ mặt nước."},{id:20,month:5,indexInMonth:4,jpName:"Ayame no Kasu 2",kanji:"菖蒲のカス",viName:"Diên Vĩ Thường II",type:"kasu",points:1,tags:["kasu"],motif:"iris_plain_2",lore:"Lá Diên Vĩ sắc như thanh kiếm hộ mệnh."},{id:21,month:6,indexInMonth:1,jpName:"Botan ni Chō",kanji:"牡丹に蝶",viName:"Mẫu Đơn Hồ Điệp",type:"tane",points:10,tags:["tane","inoshikacho","butterfly"],motif:"peony_butterfly",lore:"Đôi bướm vàng rập rờn bên đóa Mẫu Đơn đỏ thẫm — mảnh ghép quan trọng của bộ Trư-Lộc-Điệp (Ino-Shika-Chō)."},{id:22,month:6,indexInMonth:2,jpName:"Botan ni Aotan",kanji:"牡丹に青短",viName:"Mẫu Đơn Thanh Đan (Dải Xanh)",type:"tanzaku",points:5,tags:["tanzaku","aotan"],motif:"peony_ribbon",lore:"Dải giấy màu xanh tím (Aotan) quý phái, mở đầu cho tổ hợp Thanh Đan 5 điểm."},{id:23,month:6,indexInMonth:3,jpName:"Botan no Kasu 1",kanji:"牡丹のカス",viName:"Mẫu Đơn Thường I",type:"kasu",points:1,tags:["kasu"],motif:"peony_plain_1",lore:"Đóa Mẫu Đơn bung nở đầy kiêu hãnh."},{id:24,month:6,indexInMonth:4,jpName:"Botan no Kasu 2",kanji:"牡丹のカス",viName:"Mẫu Đơn Thường II",type:"kasu",points:1,tags:["kasu"],motif:"peony_plain_2",lore:"Cánh hoa Mẫu Đơn dày và rực rỡ."},{id:25,month:7,indexInMonth:1,jpName:"Hagi ni Inoshishi",kanji:"萩に猪",viName:"Hồ Chi Lợn Rừng (Trư)",type:"tane",points:10,tags:["tane","inoshikacho","boar"],motif:"clover_boar",lore:"Chú lợn rừng dũng mãnh lao qua bụi Hồ Chi — mảnh ghép đầu tiên của bộ Trư-Lộc-Điệp."},{id:26,month:7,indexInMonth:2,jpName:"Hagi ni Tanzaku",kanji:"萩に短冊",viName:"Hồ Chi Dải Đỏ",type:"tanzaku",points:5,tags:["tanzaku","plain_tanzaku"],motif:"clover_ribbon",lore:"Dải giấy đỏ vắt ngang những nhánh cỏ Hồ Chi mềm mại."},{id:27,month:7,indexInMonth:3,jpName:"Hagi no Kasu 1",kanji:"萩のカス",viName:"Hồ Chi Thường I",type:"kasu",points:1,tags:["kasu"],motif:"clover_plain_1",lore:"Nhánh hoa Hồ Chi đỏ tím báo hiệu thu sang."},{id:28,month:7,indexInMonth:4,jpName:"Hagi no Kasu 2",kanji:"萩のカス",viName:"Hồ Chi Thường II",type:"kasu",points:1,tags:["kasu"],motif:"clover_plain_2",lore:"Bụi cỏ Hồ Chi đung đưa trong sương thu."},{id:29,month:8,indexInMonth:1,jpName:"Susuki ni Tsuki",kanji:"芒に月",viName:"Trăng Rằm Cỏ Lau",type:"hikari",points:20,tags:["hikari","dry_hikari","moon","tsukimi"],motif:"pampas_moon",lore:"Vầng trăng rằm tháng Tám tỏa sáng trên bầu trời đỏ rực. Khi đi cùng Chén Rượu sẽ tạo nên Nguyệt Kiến Tửu!"},{id:30,month:8,indexInMonth:2,jpName:"Susuki ni Kari",kanji:"芒に雁",viName:"Cỏ Lau Nhạn Bay",type:"tane",points:10,tags:["tane","bird"],motif:"pampas_geese",lore:"Ba chú ngỗng trời nối đuôi nhau bay về phương Nam qua đồi cỏ lau chiều thu."},{id:31,month:8,indexInMonth:3,jpName:"Susuki no Kasu 1",kanji:"芒のカス",viName:"Cỏ Lau Thường I",type:"kasu",points:1,tags:["kasu"],motif:"pampas_plain_1",lore:"Đồi cỏ lau nghiêng mình dưới gió thu."},{id:32,month:8,indexInMonth:4,jpName:"Susuki no Kasu 2",kanji:"芒のカス",viName:"Cỏ Lau Thường II",type:"kasu",points:1,tags:["kasu"],motif:"pampas_plain_2",lore:"Bông cỏ lau trắng muốt trên sườn đồi."},{id:33,month:9,indexInMonth:1,jpName:"Kiku ni Sakazuki",kanji:"菊に盃",viName:"Cúc Chén Rượu (Thọ Tửu)",type:"tane",points:10,tags:["tane","kasu_bonus","sake","hanami","tsukimi"],motif:"chrysanthemum_sake",lore:"Chén rượu sơn mài đỏ khắc chữ Thọ (壽). Lá bài chiến lược bậc nhất: vừa là Thú, lại mở khóa Hoa Kiến Tửu & Nguyệt Kiến Tửu!"},{id:34,month:9,indexInMonth:2,jpName:"Kiku ni Aotan",kanji:"菊に青短",viName:"Cúc Thanh Đan (Dải Xanh)",type:"tanzaku",points:5,tags:["tanzaku","aotan"],motif:"chrysanthemum_ribbon",lore:"Dải giấy xanh tím bên những đóa cúc vàng — mảnh ghép thứ hai của bộ Thanh Đan."},{id:35,month:9,indexInMonth:3,jpName:"Kiku no Kasu 1",kanji:"菊のカス",viName:"Cúc Thường I",type:"kasu",points:1,tags:["kasu"],motif:"chrysanthemum_plain_1",lore:"Hoa cúc vàng-đỏ thanh tao của mùa thu."},{id:36,month:9,indexInMonth:4,jpName:"Kiku no Kasu 2",kanji:"菊のカス",viName:"Cúc Thường II",type:"kasu",points:1,tags:["kasu"],motif:"chrysanthemum_plain_2",lore:"Hương hoa cúc thoang thoảng trong tiết Trùng Cửu."},{id:37,month:10,indexInMonth:1,jpName:"Momiji ni Shika",kanji:"紅葉に鹿",viName:"Phong Đỏ Hươu Sao (Lộc)",type:"tane",points:10,tags:["tane","inoshikacho","deer"],motif:"maple_deer",lore:"Chú hươu sao ngoảnh đầu dưới tán lá Phong đỏ rực — mảnh ghép hoàn thiện bộ Trư-Lộc-Điệp."},{id:38,month:10,indexInMonth:2,jpName:"Momiji ni Aotan",kanji:"紅葉に青短",viName:"Phong Đỏ Thanh Đan (Dải Xanh)",type:"tanzaku",points:5,tags:["tanzaku","aotan"],motif:"maple_ribbon",lore:"Dải giấy xanh tím giữa rừng lá phong thu — mảnh ghép cuối cùng của bộ Thanh Đan."},{id:39,month:10,indexInMonth:3,jpName:"Momiji no Kasu 1",kanji:"紅葉のカス",viName:"Phong Đỏ Thường I",type:"kasu",points:1,tags:["kasu"],motif:"maple_plain_1",lore:"Những chiếc lá phong năm cánh đỏ thẫm."},{id:40,month:10,indexInMonth:4,jpName:"Momiji no Kasu 2",kanji:"紅葉のカス",viName:"Phong Đỏ Thường II",type:"kasu",points:1,tags:["kasu"],motif:"maple_plain_2",lore:"Lá phong rơi trên dòng suối mùa thu."},{id:41,month:11,indexInMonth:1,jpName:"Yanagi ni Ono no Michikaze",kanji:"柳に小野道風",viName:"Người Đội Mưa Dưới Liễu (Vũ Quang)",type:"hikari",points:20,tags:["hikari","rain_hikari"],motif:"willow_rainman",lore:"Danh sĩ thư pháp Ono no Michikaze cầm ô đứng dưới mưa nhìn chú ếch nhỏ kiên trì nhảy lên cành liễu."},{id:42,month:11,indexInMonth:2,jpName:"Yanagi ni Tsubame",kanji:"柳に燕",viName:"Liễu Chim Én",type:"tane",points:10,tags:["tane","bird"],motif:"willow_swallow",lore:"Chim én sải cánh bay lượn trên mặt nước dưới rặng liễu rủ."},{id:43,month:11,indexInMonth:3,jpName:"Yanagi ni Tanzaku",kanji:"柳に短冊",viName:"Liễu Dải Đỏ",type:"tanzaku",points:5,tags:["tanzaku","plain_tanzaku"],motif:"willow_ribbon",lore:"Dải thơ đỏ duy nhất của mùa đông treo trên cành liễu."},{id:44,month:11,indexInMonth:4,jpName:"Yanagi ni Inazuma",kanji:"柳に稲妻",viName:"Liễu Sấm Sét (Lôi Vũ)",type:"kasu",points:1,tags:["kasu","lightning"],motif:"willow_lightning",lore:"Tia chớp đỏ rạch ngang bầu trời giông bão và những đám mây đen cuồn cuộn."},{id:45,month:12,indexInMonth:1,jpName:"Kiri ni Hōō",kanji:"桐に鳳凰",viName:"Ngô Đồng Phượng Hoàng",type:"hikari",points:20,tags:["hikari","dry_hikari","phoenix"],motif:"paulownia_phoenix",lore:"Chim thần Phượng Hoàng sải đôi cánh ngũ sắc rực rỡ trên hoa Ngô Đồng hoàng gia."},{id:46,month:12,indexInMonth:2,jpName:"Kiri no Kasu (Ki)",kanji:"桐のカス（黄）",viName:"Ngô Đồng Đáy Vàng",type:"kasu",points:1,tags:["kasu","yellow_kiri"],motif:"paulownia_plain_gold",lore:"Lá Ngô Đồng đặc biệt có phần nền dưới nhuộm sắc vàng kim truyền thống."},{id:47,month:12,indexInMonth:3,jpName:"Kiri no Kasu 1",kanji:"桐のカス",viName:"Ngô Đồng Thường I",type:"kasu",points:1,tags:["kasu"],motif:"paulownia_plain_1",lore:"Hoa và lá Ngô Đồng — gia huy truyền thống của triều đình Nhật Bản."},{id:48,month:12,indexInMonth:4,jpName:"Kiri no Kasu 2",kanji:"桐のカス",viName:"Ngô Đồng Thường II",type:"kasu",points:1,tags:["kasu"],motif:"paulownia_plain_2",lore:"Chùm hoa Ngô Đồng tím nở vào dịp cuối năm."}];function I(d){return H.find(t=>t.id===d)}function Ft(d){return H.filter(t=>t.month===d)}function et(d){return ft.find(t=>t.month===d)}const it=[{id:"goko",jpName:"Gokō (五光)",viName:"Ngũ Quang",basePoints:10,category:"hikari",description:"Thu thập đủ cả 5 lá Quang (Tùng Hạc, Màn Anh Đào, Trăng Rằm, Người Đội Mưa, Phượng Hoàng).",requiredCardIds:[1,9,29,41,45]},{id:"shiko",jpName:"Shikō (四光)",viName:"Tứ Quang",basePoints:8,category:"hikari",description:"Thu thập 4 lá Quang không bao gồm lá Người Đội Mưa Dưới Liễu (#41).",requiredCardIds:[1,9,29,45]},{id:"ameshiko",jpName:"Ame-Shikō (雨四光)",viName:"Vũ Tứ Quang",basePoints:7,category:"hikari",description:"Thu thập 4 lá Quang bất kỳ có bao gồm lá Người Đội Mưa Dưới Liễu (#41).",requiredCardIds:[1,9,29,41,45]},{id:"sanko",jpName:"Sankō (三光)",viName:"Tam Quang",basePoints:5,category:"hikari",description:"Thu thập 3 trong 4 lá Quang khô (không tính lá Người Đội Mưa Dưới Liễu #41).",requiredCardIds:[1,9,29,45]},{id:"hanamizake",jpName:"Hanami-zake (花見酒)",viName:"Hoa Kiến Tửu (Thưởng Hoa Uống Rượu)",basePoints:5,category:"special",description:"Kết hợp Màn Hoa Anh Đào (Tháng 3) và Chén Rượu Hoa Cúc (Tháng 9).",requiredCardIds:[9,33]},{id:"tsukimizake",jpName:"Tsukimi-zake (月見酒)",viName:"Nguyệt Kiến Tửu (Ngắm Trăng Uống Rượu)",basePoints:5,category:"special",description:"Kết hợp Trăng Rằm Cỏ Lau (Tháng 8) và Chén Rượu Hoa Cúc (Tháng 9).",requiredCardIds:[29,33]},{id:"inoshikacho",jpName:"Ino-Shika-Chō (猪鹿蝶)",viName:"Trư - Lộc - Điệp",basePoints:5,bonusRule:"+1 điểm cho mỗi lá Thú (Tane) vượt quá 5 lá",category:"tane",description:"Bộ ba Lợn Rừng (Tháng 7) + Hươu Sao (Tháng 10) + Bướm Mẫu Đơn (Tháng 6).",requiredCardIds:[21,25,37]},{id:"akatan_aotan",jpName:"Akatan・Aotan no Chōfuku (赤短・青短)",viName:"Song Đan Hợp Bích (Xích Đan & Thanh Đan)",basePoints:10,bonusRule:"+1 điểm cho mỗi lá Dải Thơ (Tanzaku) thêm",category:"tanzaku",description:"Thu thập trọn bộ 3 lá Dải Thơ Đỏ (Tháng 1, 2, 3) VÀ 3 lá Dải Xanh (Tháng 6, 9, 10).",requiredCardIds:[2,6,10,22,34,38]},{id:"akatan",jpName:"Akatan (赤短)",viName:"Xích Đan (Ba Dải Thơ Đỏ)",basePoints:5,bonusRule:"+1 điểm cho mỗi lá Dải Thơ (Tanzaku) thêm",category:"tanzaku",description:"Thu thập đủ 3 lá Dải Thơ Đỏ có chữ của Tháng 1 (Tùng), Tháng 2 (Mai), Tháng 3 (Anh Đào).",requiredCardIds:[2,6,10]},{id:"aotan",jpName:"Aotan (青短)",viName:"Thanh Đan (Ba Dải Xanh)",basePoints:5,bonusRule:"+1 điểm cho mỗi lá Dải Thơ (Tanzaku) thêm",category:"tanzaku",description:"Thu thập đủ 3 lá Dải Xanh của Tháng 6 (Mẫu Đơn), Tháng 9 (Cúc), Tháng 10 (Phong Đỏ).",requiredCardIds:[22,34,38]},{id:"tane",jpName:"Tane (タネ)",viName:"Ngũ Thú (5 Lá Thú)",basePoints:1,bonusRule:"+1 điểm cho mỗi lá Thú thêm trên 5 lá",category:"tane",description:"Thu thập từ 5 lá bài Thú/Vật (10đ) trở lên.",requiredCardIds:[]},{id:"tanzaku",jpName:"Tanzaku (短冊)",viName:"Ngũ Đan (5 Dải Thơ)",basePoints:1,bonusRule:"+1 điểm cho mỗi lá Dải Thơ thêm trên 5 lá",category:"tanzaku",description:"Thu thập từ 5 lá bài Dải Thơ (5đ) trở lên.",requiredCardIds:[]},{id:"kasu",jpName:"Kasu (カス)",viName:"Thập Thảo (10 Lá Thường)",basePoints:1,bonusRule:"+1 điểm cho mỗi lá Thường thêm trên 10 lá",category:"kasu",description:"Thu thập từ 10 lá bài Thường (1đ) trở lên.",requiredCardIds:[]}];function K(d,t=1){const e=new Set(d.map(c=>c.id)),i=d.filter(c=>c.type==="hikari"),n=i.filter(c=>!c.tags.includes("rain_hikari")),a=e.has(41),o=d.filter(c=>c.type==="tane"),s=d.filter(c=>c.type==="tanzaku"),r=d.filter(c=>c.type==="kasu"),l=[];if(i.length===5?l.push({id:"goko",jpName:"Gokō (五光)",viName:"Ngũ Quang",points:10,cards:i.map(c=>c.id)}):n.length===4&&!a?l.push({id:"shiko",jpName:"Shikō (四光)",viName:"Tứ Quang",points:8,cards:n.map(c=>c.id)}):i.length===4&&a?l.push({id:"ameshiko",jpName:"Ame-Shikō (雨四光)",viName:"Vũ Tứ Quang",points:7,cards:i.map(c=>c.id)}):n.length===3&&l.push({id:"sanko",jpName:"Sankō (三光)",viName:"Tam Quang",points:5,cards:n.map(c=>c.id)}),e.has(9)&&e.has(33)&&l.push({id:"hanamizake",jpName:"Hanami-zake (花見酒)",viName:"Hoa Kiến Tửu",points:5,cards:[9,33]}),e.has(29)&&e.has(33)&&l.push({id:"tsukimizake",jpName:"Tsukimi-zake (月見酒)",viName:"Nguyệt Kiến Tửu",points:5,cards:[29,33]}),e.has(21)&&e.has(25)&&e.has(37)){const c=Math.max(0,o.length-3);l.push({id:"inoshikacho",jpName:"Ino-Shika-Chō (猪鹿蝶)",viName:c>0?`Trư - Lộc - Điệp (+${c})`:"Trư - Lộc - Điệp",points:5+c,cards:[21,25,37]})}const h=e.has(2)&&e.has(6)&&e.has(10),u=e.has(22)&&e.has(34)&&e.has(38);if(h&&u){const c=Math.max(0,s.length-6);l.push({id:"akatan_aotan",jpName:"Akatan・Aotan (赤短・青短)",viName:c>0?`Song Đan Hợp Bích (+${c})`:"Song Đan Hợp Bích",points:10+c,cards:[2,6,10,22,34,38]})}else if(h){const c=Math.max(0,s.length-3);l.push({id:"akatan",jpName:"Akatan (赤短)",viName:c>0?`Xích Đan (+${c})`:"Xích Đan",points:5+c,cards:[2,6,10]})}else if(u){const c=Math.max(0,s.length-3);l.push({id:"aotan",jpName:"Aotan (青短)",viName:c>0?`Thanh Đan (+${c})`:"Thanh Đan",points:5+c,cards:[22,34,38]})}if(o.length>=5){const c=1+(o.length-5);l.push({id:"tane",jpName:"Tane (タネ)",viName:`Thú (${o.length} lá)`,points:c,cards:o.map(y=>y.id)})}if(s.length>=5){const c=1+(s.length-5);l.push({id:"tanzaku",jpName:"Tanzaku (短冊)",viName:`Dải Thơ (${s.length} lá)`,points:c,cards:s.map(y=>y.id)})}if(r.length>=10){const c=1+(r.length-10);l.push({id:"kasu",jpName:"Kasu (カス)",viName:`Lá Thường (${r.length} lá)`,points:c,cards:r.map(y=>y.id)})}const g=l.reduce((c,y)=>c+y.points,0),k=l.map(c=>`${c.id}:${c.points}`).sort().join("|");return{yakus:l,totalBasePoints:g,signature:k}}function at(d){const t={};for(const i of d)t[i.month]=(t[i.month]||0)+1;const e=Object.values(t);return e.includes(4)?{id:"teshi",jpName:"Teshi (手四)",viName:`Tứ Quý Khởi Thủ (Tháng ${Object.keys(t).find(n=>t[n]===4)})`,points:6}:e.length===4&&e.every(i=>i===2)?{id:"kuttsuki",jpName:"Kuttsuki (くっつき)",viName:"Tứ Đôi Khởi Thủ (4 Cặp Tháng)",points:6}:null}function Vt(d,t){const e=new Set(d.map(a=>a.id)),i=new Set(t.map(a=>a.id));return[{id:"hanamizake",name:"Hoa Kiến Tửu",jp:"花見酒",pts:5,targetIds:[9,33],labels:{9:"Màn Anh Đào (T3)",33:"Chén Rượu (T9)"}},{id:"tsukimizake",name:"Nguyệt Kiến Tửu",jp:"月見酒",pts:5,targetIds:[29,33],labels:{29:"Trăng Rằm (T8)",33:"Chén Rượu (T9)"}},{id:"sanko",name:"Tam Quang / Ngũ Quang",jp:"三光・五光",pts:5,targetIds:[1,9,29,41,45],needCount:3,labels:{1:"Tùng Hạc (T1)",9:"Màn Đào (T3)",29:"Trăng Rằm (T8)",41:"Liễu Mưa (T11)",45:"Phượng Hoàng (T12)"}},{id:"inoshikacho",name:"Trư - Lộc - Điệp",jp:"猪鹿蝶",pts:5,targetIds:[21,25,37],labels:{21:"Hồ Điệp (T6)",25:"Lợn Rừng (T7)",37:"Hươu Sao (T10)"}},{id:"akatan",name:"Xích Đan (Thơ Đỏ)",jp:"赤短",pts:5,targetIds:[2,6,10],labels:{2:"Tùng Đỏ (T1)",6:"Mai Đỏ (T2)",10:"Đào Đỏ (T3)"}},{id:"aotan",name:"Thanh Đan (Dải Xanh)",jp:"青短",pts:5,targetIds:[22,34,38],labels:{22:"Mẫu Đơn (T6)",34:"Cúc Xanh (T9)",38:"Phong Xanh (T10)"}}].map(a=>{const o=a.targetIds.filter(u=>e.has(u)),s=a.targetIds.filter(u=>i.has(u)),r=a.needCount||a.targetIds.length,l=a.id==="sanko"?o.filter(u=>u!==41).length>=3||o.length>=4:o.length>=r,h=a.id==="sanko"?5-s.length>=3:s.length===0;return{...a,ownedCount:o.length,needCount:r,ownedIds:o,blockedIds:s,isCompleted:l,isPossible:h}})}const W=[{id:"tsuruhime",month:1,monthLabel:"Tháng 1 ・ Tùng Hạc",name:"Tsuruhime",jpName:"鶴姫 ・ 鶴の恩返し",title:"Tiên Hạc Báo Ân (Tháng 1)",gender:"Nữ",age:20,archetype:"Điển Tích Hạc Báo Ân",difficulty:1,difficultyLabel:"★☆☆☆☆ Nhập Môn",avatar:"./public/assets/characters/tsuruhime.webp?v=26",portrait:"./public/assets/characters/cutout/tsuruhime.webp?v=1",themeColor:"#d93843",secondaryColor:"#ffe5e5",particleType:"sakura",boardWood:"tatami_warm",rewardCoins:220,firstWinBonusCoins:350,unlocksCardBack:"back_urushi_red",unlocksCardSkin:null,bio:"Lấy cảm hứng từ điển tích Hạc Báo Ân (Tsuru no Ongaeshi). Thiếu nữ 20 tuổi mang vẻ đẹp thanh tao thoát tục và ánh mắt phượng bí ẩn dưới làn sương tùng đầu xuân.",strategyHint:"Lối đánh hiền hòa, ưu tiên thu thập các lá bài Tháng 1 (Tùng Hạc) và lá Thường (Kasu).",voiceProfile:{pitch:1.32,rate:1,baseFreq:520},teaseVoiceLines:[{mood:"🦢 Dịu dàng khen ngợi",jp:"まあ…お見事な打ち筋でございますね！",romaji:"Maa... Omigoto na uchisuji de gozaimasu ne!",vi:"Ôi chà... Bạn chơi hay lắm! Nước bài thanh thoát như cánh hạc đầu xuân vậy!"},{mood:"🥺 Khẽ trách yêu",jp:"あの松の札…私が織っていたのに、いじわるです…",romaji:"Ano matsu no fuda... Watashi ga otte ita no ni, ijiwaru desu...",vi:"Lá bài Tùng đó em đang dệt dở mà... Ngươi nỡ lòng nào lấy mất của em!"},{mood:"😳 Đỏ mặt bối rối",jp:"覗かないでと言ったのに…もう、敵いませんね！",romaji:"Nozokanaide to itta no ni... Mou, kanaimasu ne!",vi:"Đã dặn đừng nhìn trộm bài của em rồi mà! Khá khen cho ngươi đã đọc thấu tâm tư!"}],aiProfile:{skillLevel:.3,koiKoiGreed:.15,favoriteTags:["crane","hikari","akatan"],defenseWeight:.1},dialogues:{intro:["Xin chào ân nhân. Đầu xuân năm mới, hãy cùng thiếp thưởng trà và dệt một ván bài Tùng Hạc nhé! 🦢","Xin đừng nhìn trộm lúc thiếp đang tính bài nha~"],matchCard:["Cành tùng đón gió xuân vừa vặn quá.","Thiếp xin nhận cặp bài này để dệt gấm nhé.","Một nhịp bài êm dịu."],captureBright:["Cánh Hạc Đầu Xuân đã sải cánh dưới ánh mặt trời đỏ! 🌅","Hào quang của lá Tùng Hạc thật ấm áp!"],playerCaptureBright:["Ôi... Ân nhân đã rước mất lá Quang của thiếp rồi.","Nước bài của ngài sáng rực như mặt trời mọc vậy!"],callKoiKoi:["Khung cửi vẫn còn tơ... Thiếp xin phép KOI-KOI! 🦢","Hãy để thiếp dệt thêm một nhịp nữa nhé — Koi-Koi!"],playerCallKoiKoi:["Ngài muốn cược tiếp sao? Thiếp sẽ cố gắng hết sức!","Đôi cánh này sẽ không dễ dàng chùn bước đâu!"],winRound:["Tấm gấm mùa xuân đã dệt xong rồi, cảm ơn ngài đã nhường thiếp~","Hiệp này cánh hạc đã gặp may rồi!"],loseRound:["Ngài quả thực tài hoa, khung cửi của thiếp theo không kịp rồi...","Ván sau thiếp sẽ dệt khéo hơn nữa!"],defeatMatch:["Ân nhân đánh bài tuyệt đẹp! Xin gửi tặng ngài chiếc hộp Sơn Mài Chu Sa truyền thống để tạ ơn!"]}},{id:"michizane",month:2,monthLabel:"Tháng 2 ・ Mai Điểu",name:"Michizane Tenjin",jpName:"菅原 道真 ・ 飛梅天神",title:"Thần Học Vấn Hoa Mơ (Tháng 2)",gender:"Nam",age:19,archetype:"Điển Tích Thần Văn Học Tenjin",difficulty:2,difficultyLabel:"★★☆☆☆ Sơ Cấp",avatar:"./public/assets/characters/michizane.webp?v=26",portrait:"./public/assets/characters/cutout/michizane.webp?v=1",themeColor:"#3a86ff",secondaryColor:"#bde0fe",particleType:"sakura",boardWood:"tatami_warm",rewardCoins:300,firstWinBonusCoins:500,unlocksCardBack:"back_kanagawa_wave",unlocksCardSkin:null,bio:"Hóa thân tuổi 19 tuấn tú của học giả thiên tài Sugawara no Michizane trong điển tích cành hoa mơ bay ngàn dặm (Tobiume). Trầm tĩnh, sắc sảo và mang khí chất quý tộc lạnh lùng.",strategyHint:"Chuyên săn tìm bộ Xích Đan (Akatan - Dải Thơ Đỏ) và lá Chim Oanh trên cành Mơ.",voiceProfile:{pitch:.92,rate:1,baseFreq:210},teaseVoiceLines:[{mood:"📜 Nho nhã tán thưởng",jp:"ほう、見事な一手だ。君の才覚、感服したよ！",romaji:"Hou, migoto na itte da. Kimi no saikaku, kanpuku shita yo!",vi:"Khá khen cho ngươi! Nước bài vừa rồi uyên bác chẳng kém một câu thơ tuyệt cú!"},{mood:"😤 Khẽ nhíu mày hờn",jp:"むっ…僕の紅短冊を先に詠まれるとはね。悔しいな！",romaji:"Mu... Boku no akatanzaku wo saki ni yomareru to wa ne. Kuyashii na!",vi:"Chà... Dải thơ đỏ ta đang định ngâm lại bị ngươi lấy mất. Bạn chơi hay lắm đấy!"},{mood:"🐦 Mỉm cười thách thức",jp:"東風吹かば…次は僕が鶯を飛ばしてみせるよ！",romaji:"Kochi fukaba... Tsugi wa boku ga uguisu wo tobashite miseru yo!",vi:"Gió đông vừa thổi... Lượt tới ta sẽ để chim Oanh Tháng 2 lật ngược thế cờ!"}],aiProfile:{skillLevel:.48,koiKoiGreed:.25,favoriteTags:["akatan","tanzaku","tane"],defenseWeight:.3},dialogues:{intro:["Hương hoa mơ đầu xuân đã nở. Hãy cùng ta đối ẩm một ván bài văn chương nhé! 📜","Mỗi dải thơ trên bàn đều ẩn chứa cơ duyên của người quân tử."],matchCard:["Câu thơ này đối rất chỉnh.","Chim Oanh đã đậu đúng cành mơ.","Một nước đi hợp tình hợp lý."],captureBright:["Ánh sáng của tri thức đã khai mở trên chiếu bài! ✨","Thiên thời địa lợi đều hội tụ!"],playerCaptureBright:["Hảo thủ pháp! Ngươi đã nhìn thấu nước cờ của ta.","Tài nghệ ấy quả xứng danh bậc kỳ tài."],callKoiKoi:["Bài thơ này vẫn chưa viết tới câu kết... KOI-KOI! 📜","Gió xuân còn thổi, ta xin cược tiếp — Koi-Koi!"],playerCallKoiKoi:["Khí phách lắm! Để xem ngươi sẽ viết tiếp ván bài này ra sao.","Ta sẽ cẩn trọng phòng thủ trước đợt tấn công của ngươi."],winRound:["Vần thơ đã trọn vẹn, đa tạ ngươi đã chỉ giáo.","Sự kiên nhẫn luôn mang lại quả ngọt."],loseRound:["Bút lực của ngươi sắc sảo hơn ta tưởng tượng đấy!","Một thất bại đáng để ta ghi chép lại học hỏi."],defeatMatch:["Trí tuệ của ngươi thật đáng kính nể! Xin tặng ngươi bức chạm khắc Sóng Thần Kanagawa làm kỷ vật!"]}},{id:"koharu",month:3,monthLabel:"Tháng 3 ・ Anh Đào",name:"Koharu Hinata",jpName:"日向 小春 ・ 吉野桜",title:"Vũ Nữ Anh Đào Yoshino (Tháng 3)",gender:"Nữ",age:18,archetype:"Điển Tích Vũ Nữ Shizuka Gozen",difficulty:2,difficultyLabel:"★★☆☆☆ Sơ Cấp",avatar:"./public/assets/characters/koharu.webp?v=26",portrait:"./public/assets/characters/cutout/koharu.webp?v=2",themeColor:"#ff758f",secondaryColor:"#ffb3c1",particleType:"sakura",boardWood:"tatami_warm",rewardCoins:320,firstWinBonusCoins:500,unlocksCardBack:"back_sakura_gakuen",unlocksCardSkin:null,bio:"Thiếu nữ vũ nữ 18 tuổi lấy cảm hứng từ nàng Shizuka Gozen múa quạt dưới rừng hoa Anh Đào núi Yoshino. Vẻ đẹp xuân thì rạng rỡ nhưng ẩn chứa ánh nhìn tinh nghịch đầy mê hoặc sau chiếc quạt gập.",strategyHint:"Rất thích săn lá Rèm Hoa Anh Đào (Tháng 3) kết hợp với Chén Rượu Cúc (Tháng 9).",voiceProfile:{pitch:1.35,rate:1.06,baseFreq:540},teaseVoiceLines:[{mood:"😤 Phồng má hờn dỗi",jp:"もう〜！先輩、なかなかやりますね！",romaji:"Mou~! Senpai, nakanaka yarimasu ne!",vi:"Hứ~! Bạn chơi hay lắm đó nha! Đừng tưởng em sẽ chịu thua dễ vậy đâu!"},{mood:"🥺 Mếu máo trách yêu",jp:"むぅ…その桜の幕、私が狙ってたのに！ずるいです！",romaji:"Muu... Sono sakura no maku, watashi ga neratteta no ni! Zurui desu!",vi:"Ư ư... Lá Rèm Anh Đào đó em đang nhắm mà! Tiền bối bắt bài hay quá, ăn hiếp em!"},{mood:"😳 Ngưỡng mộ đỏ mặt",jp:"すごい…！やっぱり先輩は手強いですね！",romaji:"Sugoi...! Yappari senpai wa tegowai desu ne!",vi:"Bạn chơi hay lắm luôn á! Nước bài vừa rồi làm em trở tay không kịp!"},{mood:"💢 Dỗi quyết tâm",jp:"ぷんぷん！次は絶対に取り返しますからね！",romaji:"Pun-pun! Tsugi wa zettai ni torikaeshimasu kara ne!",vi:"Dỗi thật sự luôn đó! Lượt sau em nhất định sẽ ăn lại bộ to hơn cho xem!"}],aiProfile:{skillLevel:.42,koiKoiGreed:.24,favoriteTags:["sakura","curtain","sake","akatan"],defenseWeight:.22},dialogues:{intro:["Cánh hoa Anh Đào núi Yoshino đang bay kìa! Mình cùng mở tiệc Hoa Kiến Tửu trên chiếu bài nhé~ 🌸","Em đã luyện múa quạt suốt mùa xuân, tiền bối đừng nương tay nha!"],matchCard:["Yay! Cánh hoa Anh Đào rơi đúng chỗ rồi nè!","Hehe, em xin phép lấy cặp hoa này nha~","Ồ, vừa khít nhịp quạt luôn!"],captureBright:["Oa!! Là lá Rèm Hoa Anh Đào 20 điểm lấp lánh kìa!! ✨","Áaa, em bắt được lá Quang rồi, may quá đi mất!"],playerCaptureBright:["Hự... Tiền bối lấy mất lá Quang em đang nhắm rồi! 😢","Giỏi quá đi! Nước đi đó của tiền bối sắc bén thật đấy!"],callKoiKoi:["Điệu múa mùa xuân vẫn chưa dừng đâu... KOI-KOI!! 🌸","Trái tim em mách bảo ván này còn ăn to hơn! Koi-Koi!!"],playerCallKoiKoi:["Hể?! Tiền bối hô Koi-Koi sao?! Em phải cẩn thận mới được!","Áp lực quá đi... nhưng em không bỏ cuộc đâu!"],winRound:["Yatta!! Em thắng hiệp này rồi nhé tiền bối~ 🎉","Tổ hợp Yaku của em hoàn thành rồi! Vui quá đi!"],loseRound:["Hu hu, tiền bối tính bài siêu quá, em theo không kịp luôn...","Ván sau em nhất định sẽ phục thù đó nha!"],defeatMatch:["Tiền bối quả thực rất cừ! Xin tặng tiền bối mẫu Mặt Lưng Anh Đào Yoshino làm kỷ niệm nhé! 💝"]}},{id:"shiori",month:4,monthLabel:"Tháng 4 ・ Tử Đằng",name:"Fujiwara Shion",jpName:"藤原 紫音 ・ 藤の貴公子",title:"Quý Công Tử Tử Đằng (Tháng 4)",gender:"Nam",age:25,archetype:"Điển Tích Vương Tôn Gia Tộc Fujiwara",difficulty:2,difficultyLabel:"★★☆☆☆ Sơ Cấp",avatar:"./public/assets/characters/shiori.webp?v=26",portrait:"./public/assets/characters/cutout/shiori.webp?v=1",themeColor:"#9b5de5",secondaryColor:"#e0aaff",particleType:"lantern",boardWood:"shrine_cedar",rewardCoins:360,firstWinBonusCoins:550,unlocksCardBack:"back_wisteria_moon",unlocksCardSkin:null,bio:"Vương tôn 25 tuổi của gia tộc quyền quý Fujiwara thời Heian — lấy cảm hứng từ điển tích gia huy Hoa Tử Đằng (Fuji-mon) và chàng công tử Hikaru Genji. Mang vẻ đẹp phi giới tính đầy ma mị và ánh nhìn nửa khép quyến rũ.",strategyHint:"Kiên nhẫn gom đủ 5 lá Thú (Tane) và 5 Dải Thơ (Tanzaku) để thắng chắc chắn.",voiceProfile:{pitch:.9,rate:.95,baseFreq:185},teaseVoiceLines:[{mood:"💜 Mỉm cười phong lưu",jp:"ふふ、お上手ですね…藤の花も揺れてしまいましたよ。",romaji:"Fufu, ojouzu desu ne... Fuji no hana mo yurete shimaimashita yo.",vi:"Fufu, bạn chơi hay lắm... Đến nhành hoa Tử Đằng trên vai ta cũng rung rinh vì nước cờ ấy!"},{mood:"😏 Trách nhẹ tao nhã",jp:"やれやれ…ホトトギスの札まで奪うとは、つれないお人だ。",romaji:"Yare yare... Hototogisu no fuda made ubau to wa, tsurenai ohito da.",vi:"Ái chà... Ngay cả lá Chim Đỗ Quyên Tháng 4 ngươi cũng đoạt mất, thật biết cách làm khó ta."},{mood:"✨ Khen ngợi quyến rũ",jp:"見事な読み筋だ。君との対局、ますます愉しくなってきたよ。",romaji:"Migoto na yomisuji da. Kimi to no taikyoku, masumasu tanoshiku natte kita yo.",vi:"Khá khen cho ngươi! Đánh với ngươi càng lúc càng khiến ta say mê đấy!"}],aiProfile:{skillLevel:.5,koiKoiGreed:.28,favoriteTags:["tane","tanzaku","kasu"],defenseWeight:.35},dialogues:{intro:["Dưới giàn hoa Tử Đằng rủ bóng đêm xuân, mời tri kỷ cùng ta thưởng thức một ván bài phong lưu. 💜","Tiếng chim Đỗ Quyên Tháng 4 đã ngân vang trên chiếu bài rồi."],matchCard:["Nhành hoa tím đã tìm được tri âm.","Ta xin nhận cặp bài này nhé.","Nhẹ nhàng như gió thoảng qua giàn Tử Đằng."],captureBright:["Ánh trăng và hoa tím cùng tỏa sáng rực rỡ trên tay ta! ✨","Một lá Quang quý giá xứng tầm gia tộc Fujiwara!"],playerCaptureBright:["Ôi chà, ngươi nhanh tay thật đấy!","Hào quang của lá bài rất hợp với khí chất của ngươi."],callKoiKoi:["Hương hoa Tử Đằng vẫn còn nồng đượm... KOI-KOI! 💜","Đêm còn dài, hãy để ta đi thêm vài nước nữa nhé — Koi-Koi!"],playerCallKoiKoi:["Ngươi muốn cược lớn sao? Thú vị lắm, ta xin奉 bồi!","Ánh mắt quyết đoán của ngươi thật cuốn hút!"],winRound:["Giàn hoa Tử Đằng đã nở rộ trọn vẹn trong hiệp này rồi~","Cảm ơn ngươi vì một hiệp đấu thật tao nhã."],loseRound:["Ngươi tính bài khéo quá, ta xin nghiêng mình bái phục...","Hiệp tới ta sẽ không để lộ sơ hở nữa đâu!"],defeatMatch:["Tài nghệ của ngươi thật xuất chúng! Xin trao tặng ngươi Mặt Lưng Tử Đằng Đêm Trăng của gia tộc Fujiwara!"]}},{id:"ayame",month:5,monthLabel:"Tháng 5 ・ Diên Vĩ",name:"Ayame Shirakawa",jpName:"白川 菖蒲 ・ 八橋稲荷",title:"Hồ Tiên Cầu Yatsuhashi (Tháng 5)",gender:"Nữ",age:24,archetype:"Điển Tích Cầu Tám Nhịp & Đền Inari",difficulty:3,difficultyLabel:"★★★☆☆ Trung Cấp",avatar:"./public/assets/characters/ayame.webp?v=26",portrait:"./public/assets/characters/cutout/ayame.webp?v=2",themeColor:"#7209b7",secondaryColor:"#e0aaff",particleType:"lantern",boardWood:"shrine_cedar",rewardCoins:420,firstWinBonusCoins:650,unlocksCardBack:"back_kitsune_shrine",unlocksCardSkin:"skin_sakura_pastel",bio:"Kết hợp điển tích Cầu Tám Nhịp Yatsuhashi giữa đầm hoa Diên Vĩ và Hồ Tiên Vu Nữ đền Inari. Mỹ nhân 24 tuổi mang vẻ đẹp yêu mị, đôi mắt xanh lục bảo nửa khép viền chu sa đầy mê hoặc.",strategyHint:"Ưu tiên gom bộ Thanh Đan (Aotan - 3 Dải Thơ Xanh) và phòng thủ chặt chẽ.",voiceProfile:{pitch:1.18,rate:.96,baseFreq:460},teaseVoiceLines:[{mood:"🦊 Cười mỉm bí ẩn",jp:"ふふっ、なかなかお見事ですね。お稲荷様も驚いていますわ。",romaji:"Fufu, nakanaka omigoto desu ne. O-Inari-sama mo odoroite imasu wa.",vi:"Khá khen cho ngươi! Nước đi vừa rồi ngay cả thần Cáo Inari cũng phải bất ngờ đấy!"},{mood:"😤 Hờn mát vu nữ",jp:"まあ…私の狙い札を先に取るとは、少し意地悪なお方ですね。",romaji:"Maa... Watashi no neraifuda wo saki ni toru to wa, sukoshi ijiwaru na okata desu ne.",vi:"Ôi chà... Bạn chơi hay lắm nhưng cũng hơi bị ác đó nha, dám chặn ngay lá bài thần đền!"},{mood:"✨ Tán thưởng thực lực",jp:"お見事です！その読みの深さ、褒めて差し上げますわ。",romaji:"Omigoto desu! Sono yomi no fukasa, homete sashiagemasu wa.",vi:"Khá khen cho ngươi! Nhãn quan đọc bài sâu sắc như vậy thật đáng nể phục!"}],aiProfile:{skillLevel:.56,koiKoiGreed:.32,favoriteTags:["tanzaku","aotan","tane"],defenseWeight:.42},dialogues:{intro:["Bên nhịp cầu gỗ Yatsuhashi nở đầy hoa Diên Vĩ, thần Cáo đã báo trước cuộc hội ngộ này. ⛩️","Hãy để những lá bài phán xét vận mệnh của chúng ta."],matchCard:["Duyên phận đã định sẵn cho cặp bài này.","Một nhành hoa Diên Vĩ rơi đúng nhịp cầu.","Như lời tiên tri của đền Inari."],captureBright:["Ánh sáng thần linh đã soi chiếu xuống bàn đấu! ✨⛩️","Lá Quang này mang phước lành của Bạch Hồ!"],playerCaptureBright:["Ồ... Có vẻ thần linh đang mỉm cười với bạn rồi đó.","Một nước đi làm xoay chuyển cả quẻ bói của tôi."],callKoiKoi:["Gió thần vẫn đang thổi qua cổng Torii... KOI-KOI! 🦊","Quẻ bói báo hiệu đại cát — Tôi xin gọi Koi-Koi!"],playerCallKoiKoi:["Ồ, bạn muốn thách thức vận mệnh sao? Thú vị lắm.","Cẩn thận kẻo lòng tham làm mờ mắt nhé, lữ khách."],winRound:["Thần linh đã ban phước cho hiệp đấu này. Cảm ơn vì ván bài tuyệt đẹp.","Mọi lá bài đều đã về đúng vị trí của nó."],loseRound:["Quẻ bói của tôi đã sai sao...? Bạn thật sự rất đáng gờm.","Tôi xin ghi nhận thất bại này với lòng kính trọng."],defeatMatch:["Bạn đã vượt qua thử thách của Đền Inari! Xin trao tặng bạn Bùa Hộ Mệnh Bạch Hồ và Giao Diện Anh Đào Phấn!"]}},{id:"yukiho",month:6,monthLabel:"Tháng 6 ・ Mẫu Đơn",name:"Yukiho Katsuragi",jpName:"葛城 雪穂 ・ 牡丹太夫",title:"Đệ Nhất Hoa Khôi Mẫu Đơn (Tháng 6)",gender:"Nữ",age:29,archetype:"Điển Tích Danh Kỹ Yoshino Tayū",difficulty:3,difficultyLabel:"★★★☆☆ Trung Cấp",avatar:"./public/assets/characters/yukiho.webp?v=26",portrait:"./public/assets/characters/cutout/yukiho.webp?v=1",themeColor:"#e63946",secondaryColor:"#ffb703",particleType:"gold",boardWood:"urushi_black",rewardCoins:520,firstWinBonusCoins:850,unlocksCardBack:"back_oiran_gold",unlocksCardSkin:"skin_kintsugi_gold",bio:"Đệ nhất danh kỹ Oiran 29 tuổi lấy cảm hứng từ huyền thoại Yoshino Tayū thời Edo. Ở độ chín muồi rực rỡ nhất của nhan sắc, nàng làm say đắm cả kinh thành bằng tà áo Mẫu Đơn đỏ thẫm và ánh nhìn quyền lực.",strategyHint:"Rất giỏi gom bộ Thanh Đan (Aotan - Mẫu Đơn, Cúc, Phong) và biết dừng đúng lúc khi điểm cao.",voiceProfile:{pitch:1.08,rate:.9,baseFreq:410},teaseVoiceLines:[{mood:"💋 Liếc mắt hờn dỗi",jp:"あらあら〜、わっちの牡丹を横取りするなんて、いけずなお人ね！",romaji:"Ara ara~, wacchi no botan wo yokodori suru nante, ikezu na ohito ne!",vi:"Ái chà chà~ Dám cướp đóa Mẫu Đơn của thiếp sao, ngươi chơi hay mà đáng ghét lắm đấy!"},{mood:"🪭 Phe phẩy quạt khen",jp:"お見事どすえ！あんさん、ほんまに手強いお方やなぁ♡",romaji:"Omigoto dosu e! Ansan, honma ni tegowai ohito ya naa~",vi:"Bạn chơi hay lắm đó nha! Càng đánh với chàng, thiếp lại càng thấy say mê rồi đấy♡"},{mood:"😤 Dỗi nhẹ kiêu kỳ",jp:"むぅ…レディに花を持たせてくれてもええやないの！",romaji:"Muu... Redi ni hana wo motasete kuretemo ee yanai no!",vi:"Hứ... Khá khen cho ngươi, nhưng chẳng biết nhường nhịn mỹ nhân chút nào cả!"}],aiProfile:{skillLevel:.68,koiKoiGreed:.42,favoriteTags:["aotan","butterfly","sake","hikari"],defenseWeight:.58},dialogues:{intro:["Ara ara~ Chào mừng thượng khách. Đêm nay chàng muốn cược bao nhiêu Điểm Văn cùng đóa Mẫu Đơn này nào? 🌺","Trong trà thất của thiếp, chỉ có kẻ sắc sảo nhất mới được mỉm cười cuối cùng thôi nhé~"],matchCard:["Cặp cánh bướm vàng này thuộc về thiếp nhé~","Nhẹ nhàng như một cái chớp mắt.","Cảm ơn chàng đã dâng lá bài đúng lúc nha~"],captureBright:["Ôi chà, lá Quang lấp lánh làm sao~ Giống hệt trâm vàng của thiếp vậy! ✨","Xin lỗi chàng nhé, báu vật này thiếp xin nhận trước~"],playerCaptureBright:["Ái chà~ Thượng khách không biết thương hoa tiếc ngọc chút nào cả!","Nước bài vừa rồi làm trái tim thiếp hơi loạn nhịp đấy nhé~"],callKoiKoi:["Đêm còn dài mà chàng vội gì chứ... KOI-KOI~ 💋","Thiếp muốn xem bản lĩnh của chàng tới đâu — Koi-Koi nhé!"],playerCallKoiKoi:["Ồ~ Chàng định dồn thiếp vào chân tường sao? Thú vị thật đấy!","Cẩn thận kẻo bị sắc hương làm hoa mắt nhé thượng khách~"],winRound:["Fufu, hiệp này phần thắng thuộc về thiếp rồi nha~","Một ván bài hoàn hảo không tì vết!"],loseRound:["Ara... Chàng quả nhiên không phải tay mơ đâu nhé.","Thiếp bất cẩn để chàng qua mặt mất rồi~"],defeatMatch:["Chàng thật biết cách chinh phục lòng người! Hãy nhận lấy Trâm Vàng Kanzashi và Bộ Bài Hoàng Kim Kintsugi của thiếp nhé! 🌺"]}},{id:"tsunade",month:7,monthLabel:"Tháng 7 ・ Hồ Chi",name:"Công Chúa Tsunade",jpName:"綱手姫 ・ 児雷也豪傑譚",title:"Công Chúa Đỏ Đen Huyền Thoại (Tháng 7)",gender:"Nữ",age:36,archetype:"Điển Tích Công Chúa Tsunade (Jiraiya)",difficulty:4,difficultyLabel:"★★★★☆ Cao Thủ",avatar:"./public/assets/characters/tsunade.webp?v=26",portrait:"./public/assets/characters/cutout/tsunade.webp?v=1",themeColor:"#2a9d8f",secondaryColor:"#e9c46a",particleType:"gold",boardWood:"autumn_maple",rewardCoins:680,firstWinBonusCoins:1100,unlocksCardBack:"back_imperial_dragon",unlocksCardSkin:"skin_sumie_ink",bio:'Bước ra từ cổ tích hiệp khách "Jiraiya Gōketsu Monogatari". Mỹ nhân 36 tuổi mang vẻ đẹp trưởng thành rực lửa bất chấp thời gian, ấn chú tím trên trán và khí chất chị đại hào sảng trên chiếu bạc.',strategyHint:"Cực kỳ máu lửa! Rất thích săn bộ Heo-Nai-Bướm (Ino-Shika-Chō) và sẵn sàng hô Koi-Koi liên hoàn để nhân đôi điểm.",voiceProfile:{pitch:1.12,rate:1.04,baseFreq:440},teaseVoiceLines:[{mood:"🍶 Cười lớn hào sảng",jp:"ハハッ！やるじゃないか！面白くなってきたねぇ！",romaji:"Haha! Yaru janai ka! Omoshiroくなって kita nee!",vi:"Haha! Khá khen cho ngươi! Đánh hay lắm, ván cược này bắt đầu nóng lên rồi đấy!"},{mood:"💢 Đập bàn hờn dỗi",jp:"ちっ…！私の猪鹿蝶を邪魔するなんて、いい度胸じゃないか！",romaji:"Chi...! Watashi no Ino-Shika-Chou wo jama suru nante, ii dokyou janai ka!",vi:"Chậc...! Dám chặn bộ Heo-Nai-Bướm của bổn công chúa sao?! Bạn chơi hay mà gan to đấy!"},{mood:"🔥 Thách cược tất tay",jp:"見事な勝負勘だ！さあ、倍プッシュで来な！",romaji:"Migoto na shoubukan da! Saa, bai pusshu de kina!",vi:"Trực giác cờ bạc của ngươi nhạy bén lắm! Nào, ngon thì cược gấp đôi Koi-Koi với ta!"},{mood:"😤 Khoanh tay phục sát",jp:"ふん、大したタマだよあんたは。次で全部取り返すけどね！",romaji:"Fun, taishita tama da yo anta wa. Tsugi de zenbu torikaesu kedo ne!",vi:"Hừ, khá khen cho ngươi! Nhưng ván sau bổn công chúa sẽ gỡ lại cả vốn lẫn lời cho xem!"}],aiProfile:{skillLevel:.78,koiKoiGreed:.65,favoriteTags:["boar","deer","butterfly","tane","sake"],defenseWeight:.5},dialogues:{intro:["Ta là Công chúa Tsunade! Đã ngồi vào chiếu bài Hoa với ta thì chỉ có cược tất tay thôi nhé! 🐗🍶","Hôm nay vận đỏ đang lên, để xem ai sẽ gom được bộ Heo-Nai-Bướm trước nào!"],matchCard:["Bắt gọn! Nước này là của ta!","Haha, lá bài này vừa khít tay bổn công chúa!","Một cú ra đòn chuẩn xác!"],captureBright:["Haha!! Độc đắc rồi! Lá Quang 20 điểm đã về tay Tsunade này! ✨","Thấy chưa! Ai bảo vận may của ta kém nào?!"],playerCaptureBright:["Hả?! Ngươi vừa nẫng tay trên lá Quang của ta đấy à?!","Khá lắm! Đánh thế mới xứng làm đối thủ trên sòng bài của ta chứ!"],callKoiKoi:["Tất tay luôn!! Bổn công chúa không bao giờ dừng ở điểm lẻ — KOI-KOI!! 🔥","Nhân đôi tiền cược lên nào! KOI-KOI!!"],playerCallKoiKoi:["Haha! Ngươi dám hô Koi-Koi trước mặt Tsunade này sao?! Máu mặt đấy!","Được lắm, để xem ai mới là kẻ cười cuối cùng trong ván cược này!"],winRound:["Thắng đậm rồi!! Hôm nay vận đỏ của bổn công chúa đã trở lại!","Haha! Cược lớn thắng lớn, sảng khoái thật!"],loseRound:["Grrr... Lại cháy túi hiệp này rồi! Nhưng ván sau ta sẽ gỡ gấp đôi!","Tay bài của ngươi đỏ thật đấy, bổn công chúa xin nhận thua hiệp này!"],defeatMatch:["Haha, tâm phục khẩu phục! Ngươi đúng là Kỳ Thủ Đỏ Đen số một! Cầm lấy Mặt Lưng Long Vương Hoàng Gia và Bộ Bài Thủy Mặc của ta đi!"]}},{id:"kaguya",month:8,monthLabel:"Tháng 8 ・ Trăng Thu",name:"Kaguya Tsukuyomi",jpName:"月読 かぐや ・ 竹取物語",title:"Công Chúa Nguyệt Cung (Tháng 8)",gender:"Nữ",age:26,archetype:"Điển Tích Công Chúa Ống Tre",difficulty:5,difficultyLabel:"★★★★★ Đại Kiện Tướng",avatar:"./public/assets/characters/kaguya.webp?v=26",portrait:"./public/assets/characters/cutout/kaguya.webp?v=2",themeColor:"#f72585",secondaryColor:"#ffd166",particleType:"celestial",boardWood:"moon_palace",rewardCoins:1e3,firstWinBonusCoins:2e3,unlocksCardBack:"back_tsukuyomi_moon",unlocksCardSkin:"skin_ukiyoe_neon",bio:'Nguyên mẫu từ kiệt tác cổ điển "Taketori Monogatari". Mỹ nhân Nguyệt Cung 26 tuổi với mái tóc bạch kim suôn dài, đôi mắt sắc lạnh kiêu kỳ dưới vầng trăng tròn Tháng 8.',strategyHint:"Tuyệt kỹ Nguyệt Kiến Tửu (Trăng Rằm + Chén Rượu) và săn tìm Ngũ Quang với khả năng đọc bài siêu việt.",voiceProfile:{pitch:1.22,rate:.94,baseFreq:490},teaseVoiceLines:[{mood:"👑 Uy nghiêm tán thưởng",jp:"ほう…人の子の身で、わらわを追い詰めるとは褒めてつかわす！",romaji:"Hou... Hito no ko no mi de, warawa wo oitsumeru to wa homete tsukawasu!",vi:"Ồ... Khá khen cho ngươi! Phàm nhân mà dám dồn ép cả Công Chúa Nguyệt Cung sao!"},{mood:"😤 Nữ thần hờn dỗi",jp:"むぅ〜！わらわの月見酒を邪魔するでないわ！いじわる！",romaji:"Muu~! Warawa no tsukimizake wo jama suru de nai wa! Ijiwaru!",vi:"Hứ~! Không được phá tiệc thưởng nguyệt của ta chứ! Bạn chơi hay mà ác lắm nha!"},{mood:"🌕 Say mê tán phục",jp:"見事じゃ！そなたの打ち筋、月光のように美しいぞ！",romaji:"Migoto ja! Sonata no uchisuji, gekkou no you ni utsukushii zo!",vi:"Bạn chơi hay lắm! Đường bài của ngươi lấp lánh chẳng kém gì ánh trăng rằm Tháng 8!"}],aiProfile:{skillLevel:.95,koiKoiGreed:.58,favoriteTags:["hikari","moon","sake","phoenix","crane"],defenseWeight:.88},dialogues:{intro:["Từ Nguyệt Cung xa xôi, ta mang theo vầng trăng tròn Tháng 8 xuống chiếu bài này. Liệu ngươi có giải được bài toán của Kaguya? 🌕","48 lá bài là 48 mảnh ghép của nhân gian dưới ánh trăng thu."],matchCard:["Hoa nở rồi lại tàn dưới ánh nguyệt quang.","Vận mệnh đã nghiêng về phía Nguyệt Cung.","Một giai điệu tuyệt đẹp của bốn mùa."],captureBright:["Vạn vật quy phục dưới ánh sáng của Trăng Rằm Tháng 8! ✨🌕","Hào quang thiên giới đang tỏa rạng trên tay ta!"],playerCaptureBright:["Ôi chà~ Một người phàm lại có thể chạm tới ánh sáng của Nguyệt Cung sao?","Trái tim ta khẽ rung động trước nước bài đầy khí phách của ngươi."],callKoiKoi:["Đêm trăng rằm chỉ vừa mới bắt đầu... KOI-KOI!! 🌕✨","Hãy nhảy múa cùng ta thêm một khúc nhạc nữa nào — KOI-KOI!"],playerCallKoiKoi:["Thật dũng cảm! Dám thách thức cả Công Chúa Kaguya, ta rất tán thưởng!","Hãy chứng minh rằng lời tuyên bố Koi-Koi của ngươi không phải là phù du!"],winRound:["Ánh trăng vĩnh cửu đã bao trùm toàn bộ bàn đấu.","Một ván đấu tuyệt mỹ, nhưng ngôi vương vẫn thuộc về Nguyệt Cung."],loseRound:["Tuyệt diệu...! Ngươi đã khiến cả mặt trăng phải lu mờ trước trí tuệ ấy!","Hàng ngàn năm qua, chưa ai mang lại cho ta niềm vui sướng đến nhường này."],defeatMatch:["Ngươi đã giải được thử thách khó nhất của Kaguya! Hãy nhận lấy Mặt Lưng Nguyệt Cung Thần Thoại và Bộ Bài Ukiyo-e Ánh Trăng! 👑"]}},{id:"kikumaru",month:9,monthLabel:"Tháng 9 ・ Cúc Rượu",name:"Shuten Kikumaru",jpName:"酒呑 菊丸 ・ 菊慈童",title:"Bá Chủ Chén Rượu Cúc (Tháng 9)",gender:"Nam",age:37,archetype:"Điển Tích Shuten-dōji & Kiku Jidō",difficulty:4,difficultyLabel:"★★★★☆ Cao Thủ",avatar:"./public/assets/characters/kikumaru.webp?v=26",portrait:"./public/assets/characters/cutout/kikumaru.webp?v=1",themeColor:"#d97706",secondaryColor:"#fde68a",particleType:"gold",boardWood:"urushi_black",rewardCoins:720,firstWinBonusCoins:1200,unlocksCardBack:"back_urushi_red",unlocksCardSkin:null,bio:"Nam thần 37 tuổi lấy cảm hứng từ bá chủ Shuten-dōji núi Ōe và điển tích rượu hoa cúc trường sinh. Vẻ đẹp phong trần, tà mị với vạt áo đen mở hờ và chén rượu sơn mài đỏ trên tay.",strategyHint:"Bậc thầy săn lá Chén Rượu Cúc (lá Thú quý giá) để lập tức kích hoạt Hoa/Nguyệt Kiến Tửu.",voiceProfile:{pitch:.85,rate:.98,baseFreq:175},teaseVoiceLines:[{mood:"🍶 Nâng chén tán thưởng",jp:"ほほう、見事な手並みだ！この盃、お前に献上したくなるねぇ！",romaji:"Hohou, migoto na tenami da! Kono sakazuki, omae ni kenjou shitaku naru nee!",vi:"Ồ hô, khá khen cho ngươi! Đánh hay đến mức ta muốn mời ngươi cạn ngay chén rượu Cúc này!"},{mood:"😤 Tặc lưỡi tiếc rượu",jp:"ちっ…俺の菊に盃を奪うとは、粋じゃないねぇ！",romaji:"Chi... Ore no kiku ni sakazuki wo ubau to wa, iki janai nee!",vi:"Chậc... Dám giành mất Chén Rượu Cúc của ta sao?! Bạn chơi hay nhưng làm ta mất hứng nhậu rồi đấy!"},{mood:"😏 Cười nửa miệng",jp:"やるじゃねぇか。酔いが一気に覚めちまったよ！",romaji:"Yaru janee ka. Yoi ga ikki ni samechimatta yo!",vi:"Bạn chơi hay lắm! Nước bài sắc bén làm ta tỉnh cả cơn say luôn rồi!"}],aiProfile:{skillLevel:.8,koiKoiGreed:.52,favoriteTags:["sake","moon","curtain","aotan","kasu_bonus"],defenseWeight:.62},dialogues:{intro:["Không có Chén Rượu Hoa Cúc Tháng 9 thì trăng hay hoa cũng mất nửa vị ngon. Nào, cạn với ta một ván! 🍶","Rượu Thọ đã rót đầy chén sơn mài đỏ, mời kỳ thủ xuất chiêu!"],matchCard:["Chén rượu thêm nồng!","Hương hoa cúc mùa thu thơm lừng chiếu bài.","Một nước bài đáng để uống cạn một chén!"],captureBright:["Haha! Có thêm lá Quang này thì tiệc rượu đêm nay trọn vẹn rồi! 🍶✨","Ánh trăng và hoa anh đào đều đang chờ chén rượu của ta!"],playerCaptureBright:["Ồ~ Ngươi lấy mất đồ nhắm rượu ngon nhất trên bàn rồi đấy!","Khá lắm! Đánh thế mới bõ công ta mang rượu quý ra đãi!"],callKoiKoi:["Tiệc rượu mới chỉ qua tuần đầu... Rót tiếp đi, KOI-KOI!! 🍶🔥","Men rượu đang bốc lên rồi — KOI-KOI!"],playerCallKoiKoi:["Haha, tửu lượng của ngươi trên chiếu bài cũng không vừa đâu nhỉ!","Cứ việc tấn công, chén rượu của ta vẫn chưa cạn đâu!"],winRound:["Khà~ Một chén rượu thắng cuộc ngọt lịm đầu môi!","Hoa Kiến Tửu, Nguyệt Kiến Tửu đều nằm trong lòng bàn tay ta!"],loseRound:["Chà, hiệp này ngươi làm đổ chén rượu của ta rồi đấy...","Tửu lượng và kỳ nghệ của ngươi đều cao cường thật!"],defeatMatch:["Ta xin cạn chén bái phục! Ngươi chính là tri kỷ trăm năm khó gặp trên bàn Hoa Bài!"]}},{id:"renji",month:10,monthLabel:"Tháng 10 ・ Lá Phong",name:"Renji Akatsuki",jpName:"暁 蓮司 ・ 紅葉武蔵",title:"Kiếm Thánh Rừng Phong (Tháng 10)",gender:"Nam",age:45,archetype:"Điển Tích Kiếm Thánh Musashi",difficulty:4,difficultyLabel:"★★★★☆ Cao Thủ",avatar:"./public/assets/characters/renji.webp?v=26",portrait:"./public/assets/characters/cutout/renji.webp?v=1",themeColor:"#e76f51",secondaryColor:"#f4a261",particleType:"maple",boardWood:"autumn_maple",rewardCoins:750,firstWinBonusCoins:1250,unlocksCardBack:"back_katana_momiji",unlocksCardSkin:"skin_sumie_ink",bio:"Đại Kiếm Thánh 45 tuổi lấy cảm hứng từ Miyamoto Musashi dưới rừng phong đỏ mùa thu. Vẻ đẹp trung niên lịch lãm đỉnh cao với mái tóc đen điểm bạc nơi thái dương, đường nét gương mặt góc cạnh và đôi mắt hổ phách sắc lạnh.",strategyHint:"Chuyên gia săn tìm tổ hợp Heo-Nai-Bướm (Ino-Shika-Chō) với lá Nai Vàng Tháng 10 làm chủ lực.",voiceProfile:{pitch:.78,rate:.92,baseFreq:145},teaseVoiceLines:[{mood:"⚔️ Tán thưởng đối thủ",jp:"ほう…見事な太刀筋だ！褒めてつかわす！",romaji:"Hou... Migoto na tachisuji da! Homete tsukawasu!",vi:"Ồ... Khá khen cho ngươi! Nước bài sắc bén chẳng kém gì một nhát kiếm thượng thừa!"},{mood:"😠 Cau mày cay cú",jp:"くっ…！俺の鹿札を先に斬るとは、なかなかやるな！",romaji:"Ku...! Ore no shikafuda wo saki ni kiru to wa, nakanaka yaru na!",vi:"Hừ...! Dám đoạt mất lá Nai Tháng 10 của ta trước sao, bạn chơi hay lắm đấy!"},{mood:"🍶 Gật gù nể phục",jp:"おぬし、只者ではないな。背筋が凍るほど見事な一手だ！",romaji:"Onushi, tadamono de wa nai na. Sesuji ga kooru hodo migoto na itte da!",vi:"Khá khen cho ngươi! Một nước cờ lạnh lùng khiến cả kiếm khách như ta cũng phải dè chừng!"}],aiProfile:{skillLevel:.82,koiKoiGreed:.48,favoriteTags:["deer","boar","butterfly","aotan","tane"],defenseWeight:.65},dialogues:{intro:["Lá phong rơi chưa chạm đất thì thắng bại đã phân. Nào, rút bài của ngươi đi! 🍁","Trong kiếm đạo hay bài Hoa, do dự một khắc là bại trận."],matchCard:["Nhát chém gọn gàng!","Thuộc về ta!","Không trượt một ly."],captureBright:["Hào quang của thanh kiếm danh trấn thiên hạ! ⚔️","Một nước đi chí mạng!"],playerCaptureBright:["Khá lắm! Ngươi đã đỡ được đòn thế của ta rồi phản kích sao?!","Tốc độ ra bài của ngươi không tầm thường chút nào."],callKoiKoi:["Máu chiến binh trong ta đang sôi sục... KOI-KOI!! 🔥","Chưa đến lúc tra kiếm vào vỏ đâu — KOI-KOI!"],playerCallKoiKoi:["Haha! Dám dồn ép ta sao? Đúng là đối thủ mà ta hằng tìm kiếm!","Tới đi! Để xem lưỡi kiếm của ai sắc hơn!"],winRound:["Một trận giao đấu sảng khoái. Hãy uống với ta một chén!","Chiến thắng thuộc về kẻ quyết đoán hơn."],loseRound:["Ta đã lộ sơ hở... Đường bài của ngươi sắc như kiếm báu!","Khá khen cho ngươi. Hiệp sau ta sẽ dùng toàn lực!"],defeatMatch:["Tâm phục khẩu phục! Kiếm tâm của ngươi còn sáng hơn cả trăng thu. Hãy nhận lấy Mặt Lưng Kiếm Khách Phong Đỏ của ta!"]}},{id:"haruto",month:11,monthLabel:"Tháng 11 ・ Mưa Liễu",name:"Haruto Abe",jpName:"安倍 晴人 ・ 柳に道風",title:"Âm Dương Sư Mưa Liễu (Tháng 11)",gender:"Nam",age:30,archetype:"Điển Tích Ono no Michikaze & Seimei",difficulty:5,difficultyLabel:"★★★★★ Đại Kiện Tướng",avatar:"./public/assets/characters/haruto.webp?v=26",portrait:"./public/assets/characters/cutout/haruto.webp?v=1",themeColor:"#4cc9f0",secondaryColor:"#7209b7",particleType:"spirit",boardWood:"midnight_indigo",rewardCoins:900,firstWinBonusCoins:1600,unlocksCardBack:"back_seimei_onmyo",unlocksCardSkin:"skin_yokai_night",bio:"Đại Âm Dương Sư 30 tuổi kết hợp điển tích Ono no Michikaze dưới mưa liễu và Abe no Seimei. Mỹ nam trưởng thành với mái tóc bạc ánh xanh, đôi mắt vàng kim huyền bí và ngón tay thon dài kết ấn.",strategyHint:"Rất giỏi dùng lá Quang Mưa (Tháng 11) để hoàn tất Vũ Tứ Quang (4 lá Quang có Mưa) và khóa bài đối phương.",voiceProfile:{pitch:.86,rate:.96,baseFreq:168},teaseVoiceLines:[{mood:"🔯 Nhếch môi tán thưởng",jp:"ほう…私の占術を上回るとは、褒めてやろう。",romaji:"Hou... Watashi no senjutsu wo uwamawaru to wa, homete yarou.",vi:"Ồ... Khá khen cho ngươi! Dám đi nước cờ vượt ngoài cả quẻ bói Âm Dương của ta!"},{mood:"😤 Lạnh lùng hờn trách",jp:"ちっ…柳に小野道風を封じられるとはな。お前、なかなかやるじゃないか。",romaji:"Chi... Yanagi ni Ono no Michikaze wo fuujirareru to wa na. Omae, nakanaka yaru janai ka.",vi:"Chậc... Phá được cả lá Mưa Liễu của ta sao. Bạn chơi hay lắm, làm ta phải nghiêm túc rồi đấy!"},{mood:"🌌 Kinh ngạc thừa nhận",jp:"見事だ…これほど美しい一手は、平安の都でも見たことがない。",romaji:"Migoto da... Kore hodo utsukushii itte wa, Heian no miyako demo mita koto ga nai.",vi:"Khá khen cho ngươi! Một nước bài tuyệt diệu mà khắp kinh thành Heian hiếm ai sánh kịp!"}],aiProfile:{skillLevel:.92,koiKoiGreed:.5,favoriteTags:["hikari","rain","sake","moon","curtain"],defenseWeight:.85},dialogues:{intro:["Dưới cơn mưa liễu Tháng 11, chú ếch nhỏ đã nhảy lên cành sau bảy lần thất bại. Còn ngươi thì sao? 🌧️🔯","Trong trận đồ 48 lá bài này, không có gì gọi là ngẫu nhiên cả."],matchCard:["Đúng như quỹ đạo của các vì sao.","Nước cờ của ngươi đã bị cơn mưa Tháng 11 phong ấn.","Mọi xác suất đều hội tụ tại điểm này."],captureBright:["Tinh tú hội tụ! Lá Quang Mưa Liễu này là mắt trận của ta. 🔯","Ánh sáng trong cơn mưa luôn thuộc về kẻ nắm giữ thiên cơ."],playerCaptureBright:["Thú vị... Một biến số nằm ngoài dự đoán của tinh bàn.","Ngươi vừa phá vỡ một góc trận pháp của ta đấy."],callKoiKoi:["Thiên thời đang đứng về phía ta... KOI-KOI! 🌌","Trận pháp Âm Dương đã mở hoàn toàn — KOI-KOI!"],playerCallKoiKoi:["Ngươi nghĩ mình có thể vượt qua ải tiếp theo trước khi ta kết liễu ván đấu sao?","Một quyết định liều lĩnh. Để ta cho ngươi thấy cái giá của sự kiêu ngạo."],winRound:["Kết cục đã định sẵn từ nước bài thứ ba rồi.","Trật tự của Âm Dương không bao giờ sai lệch."],loseRound:["Không thể nào... Tinh bàn của ta lại tính sót nước đi của ngươi sao?!","Ngươi sở hữu trực giác vượt qua cả thuật toán học của Âm Dương Liêu."],defeatMatch:["Ta hoàn toàn bái phục. Trực giác và bản lĩnh của ngươi đã vượt qua cả thiên cơ. Hãy nhận Ấn Chú Ngôi Sao Âm Dương!"]}},{id:"amaterasu",month:12,monthLabel:"Tháng 12 ・ Ngô Đồng",name:"Amaterasu Hōō",jpName:"天照 鳳凰 ・ 桐に鳳凰",title:"Nữ Đế Phượng Hoàng (Tháng 12)",gender:"Nữ",age:42,archetype:"Điển Tích Thần Điểu Hōō & Amaterasu",difficulty:5,difficultyLabel:"★★★★★ Thần Thoại (Boss Cuối)",avatar:"./public/assets/characters/amaterasu.webp?v=26",portrait:"./public/assets/characters/cutout/amaterasu.webp?v=1",themeColor:"#ffb703",secondaryColor:"#9d4edd",particleType:"celestial",boardWood:"moon_palace",rewardCoins:1500,firstWinBonusCoins:3e3,unlocksCardBack:"back_imperial_dragon",unlocksCardSkin:"skin_kintsugi_gold",bio:"Đỉnh cao của 12 tháng bài Hoa: Nữ Đế Phượng Hoàng 42 tuổi mang vẻ đẹp quý phái bất lão, uy quyền tối thượng với đôi mắt phượng kẻ chu sa đỏ kim và trâm vàng Thần Điểu Hōō.",strategyHint:"Boss tối thượng Tháng 12: tính toán toàn diện cả Ngũ Quang (Gokō), Tứ Quang, Xích/Thanh Đan và chặn đứng mọi đường thắng của đối phương.",voiceProfile:{pitch:1.16,rate:.92,baseFreq:470},teaseVoiceLines:[{mood:"🔥 Uy quyền tối thượng",jp:"ほう…鳳凰の翼に届くとは、見事な器量じゃ！褒めてつかわす！",romaji:"Hou... Houou no tsubasa ni todoku to wa, migoto na kiryou ja! Homete tsukawasu!",vi:"Ồ... Khá khen cho ngươi! Bản lĩnh của ngươi đã chạm tới đôi cánh Phượng Hoàng của trẫm rồi đấy!"},{mood:"😤 Nữ đế hờn trách",jp:"むぅ…桐の鳳凰を先に召すとは、不届き千万ながら天晴れじゃ！",romaji:"Muu... Kiri no Houou wo saki ni mesu to wa, futodoki senban nagara appare ja!",vi:"Hứ... Dám thu phục lá Phượng Hoàng Tháng 12 trước cả trẫm sao?! Bạn chơi hay lắm đó!"},{mood:"☀️ Tỏa sáng tán phục",jp:"天晴れじゃ！そなたの采配、太陽のように眩しいぞ！",romaji:"Appare ja! Sonata no saihai, taiyou no you ni mabushii zo!",vi:"Tuyệt vời lắm! Đường bài của ngươi rực rỡ chẳng kém ánh mặt trời của Amaterasu!"}],aiProfile:{skillLevel:1,koiKoiGreed:.65,favoriteTags:["hikari","phoenix","crane","curtain","moon","sake"],defenseWeight:.95},dialogues:{intro:["Khi Phượng Hoàng đáp xuống cành Ngô Đồng Tháng 12, bốn mùa hoàn tất một vòng luân hồi. Hãy cho trẫm thấy cực hạn kỳ nghệ của ngươi! 🔥👑","Từ Tùng Hạc Tháng Giêng đến Ngô Đồng Tháng Chạp — ngươi đã sẵn sàng đối mặt với thử thách cuối cùng chưa?"],matchCard:["Cành Ngô Đồng tím đã nở hoa dưới ánh thái dương.","Đôi cánh Phượng Hoàng quét qua chiếu bài.","Thiên mệnh đã quy về một mối."],captureBright:["Ngũ Quang quy vị! Đôi cánh Phượng Hoàng Lửa rực sáng cả đất trời! 🔥✨","Hào quang tối thượng của Tháng 12 đã giáng lâm!"],playerCaptureBright:["Ồ~ Ngươi dám đoạt lấy ánh hào quang ngay trước mắt Nữ Đế sao?","Khí phách lắm! Phượng Hoàng chỉ cúi đầu trước bậc kỳ tài chân chính!"],callKoiKoi:["Ngọn lửa Niết Bàn của Phượng Hoàng không bao giờ tắt... KOI-KOI!! 🔥👑","Hãy cùng trẫm bay lên tầng mây cao nhất — KOI-KOI!"],playerCallKoiKoi:["Hảo đảm lượng! Dám tuyên chiến Koi-Koi với Nữ Đế Tháng 12, trẫm chuẩn tấu!","Hãy chứng minh cho trẫm thấy ngươi xứng đáng với ngôi vị Kỳ Thánh!"],winRound:["Vòng quay 12 tháng đã khép lại dưới đôi cánh hoàng kim của Phượng Hoàng.","Ánh mặt trời đã soi rọi chiến thắng của trẫm."],loseRound:["Không ngờ trên thế gian lại có kỳ thủ đánh bại được cả Phượng Hoàng Tháng 12!","Một ván bài xứng đáng lưu danh sử sách!"],defeatMatch:["Ngươi đã chinh phục trọn vẹn 12 Tháng Bài Hoa! Hãy nhận lấy vinh quang tối thượng của Nữ Đế Phượng Hoàng Amaterasu! 👑🔥"]}}];function j(d){return W.find(t=>t.id===d)||W[0]}const O={common:{label:"Cổ Điển",color:"#8d99ae",glow:"rgba(141, 153, 174, 0.35)",weight:40},rare:{label:"Hiếm (R)",color:"#4cc9f0",glow:"rgba(76, 201, 240, 0.45)",weight:32},epic:{label:"Sử Thi (SR)",color:"#b5179e",glow:"rgba(181, 23, 158, 0.5)",weight:18},legendary:{label:"Huyền Thoại (SSR)",color:"#ffb703",glow:"rgba(255, 183, 3, 0.6)",weight:8},mythic:{label:"Thần Thoại (UR)",color:"#f72585",glow:"rgba(247, 37, 133, 0.7)",weight:3}},D=[{id:"back_urushi_red",name:"Sơn Mài Chu Sa (Urushi Red)",jpName:"朱塗り伝統",rarity:"common",price:0,unlockedByDefault:!0,bossUnlockId:null,description:"Mặt lưng truyền thống thời Edo với lớp sơn mài đỏ chu sa và viền đen tuyền đặc trưng của bài Hoa Nintendo cổ điển.",bgGradient:"linear-gradient(145deg, #9b111e 0%, #5c060c 100%)",borderColor:"#161316",accentColor:"#ffd166",patternType:"urushi_classic"},{id:"back_sakura_gakuen",name:"Học Viện Anh Đào (Sakura Gakuen)",jpName:"桜学園の春",rarity:"rare",price:450,unlockedByDefault:!1,bossUnlockId:"koharu",description:"Thiết kế mặt lưng hồng phấn điểm hoa Anh Đào năm cánh và huy hiệu CLB Bài Hoa của Koharu.",bgGradient:"linear-gradient(145deg, #ff758f 0%, #c9184a 100%)",borderColor:"#4a1525",accentColor:"#fff0f3",patternType:"sakura_emblem"},{id:"back_kitsune_shrine",name:"Đền Cáo Linh Thiêng (Kitsune Inari)",jpName:"稲荷白狐の護符",rarity:"epic",price:750,unlockedByDefault:!1,bossUnlockId:"ayame",description:"Khắc họa mặt nạ Bạch Hồ chín đuôi, cổng Torii đỏ và ngọn lửa hồ ly hộ mệnh của vu nữ Ayame.",bgGradient:"linear-gradient(145deg, #5a189a 0%, #240046 100%)",borderColor:"#1b0633",accentColor:"#ff9e00",patternType:"kitsune_torii"},{id:"back_katana_momiji",name:"Kiếm Khách Phong Đỏ (Katana Momiji)",jpName:"紅葉と名刀",rarity:"epic",price:900,unlockedByDefault:!1,bossUnlockId:"renji",description:"Song kiếm giao nhau dưới vầng trăng tròn và cơn lốc lá phong đỏ mùa thu của lãng khách Renji.",bgGradient:"linear-gradient(145deg, #780000 0%, #1d1e2c 100%)",borderColor:"#141115",accentColor:"#f4a261",patternType:"katana_maple"},{id:"back_oiran_gold",name:"Kim Tuyến Hoa Khôi (Oiran Kanzashi)",jpName:"花魁の黄金簪",rarity:"legendary",price:1400,unlockedByDefault:!1,bossUnlockId:"yukiho",description:"Trâm cài tóc vàng ròng Kanzashi và cánh quạt lụa Hạc Vàng xa hoa của hoa khôi Yukiho tại phố Gion.",bgGradient:"linear-gradient(145deg, #3c0919 0%, #110b11 100%)",borderColor:"#d4af37",accentColor:"#ffd166",patternType:"oiran_fan"},{id:"back_seimei_onmyo",name:"Tinh Bàn Âm Dương (Seimei Pentagram)",jpName:"晴明桔梗印",rarity:"legendary",price:1600,unlockedByDefault:!1,bossUnlockId:"haruto",description:"Ngôi sao năm cánh Seimei-kikyō phát sáng giữa vòng tròn bát quái và bùa chú của Âm Dương Sư Haruto.",bgGradient:"linear-gradient(145deg, #03045e 0%, #0a091c 100%)",borderColor:"#00b4d8",accentColor:"#90e0ef",patternType:"onmyo_star"},{id:"back_tsukuyomi_moon",name:"Nguyệt Cung Thần Thoại (Tsukuyomi UR)",jpName:"月読の天羽衣",rarity:"mythic",price:2800,unlockedByDefault:!1,bossUnlockId:"kaguya",description:"Báu vật tối thượng của Nữ Hoàng Kaguya: Vầng trăng ngọc bích, thỏ ngọc giã thuốc tiên và dải ngân hà lấp lánh.",bgGradient:"linear-gradient(145deg, #3a0ca3 0%, #7209b7 50%, #f72585 100%)",borderColor:"#ffd166",accentColor:"#ffffff",patternType:"celestial_moon"},{id:"back_kanagawa_wave",name:"Sóng Thần Kanagawa (Hokusai Wave)",jpName:"富嶽三十六景・波",rarity:"epic",price:800,unlockedByDefault:!1,bossUnlockId:null,description:"Lấy cảm hứng từ kiệt tác tranh khắc gỗ Ukiyo-e: Ngọn sóng khổng lồ cuộn trào trước đỉnh núi Phú Sĩ.",bgGradient:"linear-gradient(145deg, #1d3557 0%, #0b132b 100%)",borderColor:"#457b9d",accentColor:"#f1faee",patternType:"great_wave"},{id:"back_imperial_dragon",name:"Long Vương Hoàng Gia (Imperial Ryū)",jpName:"黄金雲龍図",rarity:"legendary",price:1800,unlockedByDefault:!1,bossUnlockId:null,description:"Thần Long uốn lượn giữa biển mây vàng kim trên nền sơn mài lục bảo hoàng thất.",bgGradient:"linear-gradient(145deg, #081c15 0%, #1b4332 100%)",borderColor:"#d4af37",accentColor:"#ffd166",patternType:"golden_dragon"},{id:"back_wisteria_moon",name:"Tử Đằng Đêm Trăng (Fuji Nocturne)",jpName:"月夜の藤棚",rarity:"rare",price:550,unlockedByDefault:!1,bossUnlockId:null,description:"Những chùm hoa Tử Đằng tím biếc buông rủ dưới ánh trăng bạc và đom đóm mùa hạ.",bgGradient:"linear-gradient(145deg, #3c096c 0%, #10002b 100%)",borderColor:"#c77dff",accentColor:"#e0aaff",patternType:"wisteria_night"}],E=[{id:"skin_traditional_edo",name:"Truyền Thống Edo (Daitōryō)",jpName:"江戸伝統・花札",rarity:"common",price:0,unlockedByDefault:!0,bossUnlockId:null,description:"Phong cách khắc gỗ Ukiyo-e cổ điển trên nền giấy Washi ngà ấm, màu chu sa, chàm và lục tùng chuẩn mực.",palette:{paperBg:"#f6eedf",paperGrad:"#eadbc2",frameBorder:"#1a1617",sunRed:"#d90429",skyHighlight:"#fff8eb",foliageDark:"#1b4332",foliageMid:"#2d6a4f",blossomPink:"#ff758f",crimson:"#c1121f",gold:"#e9c46a",indigo:"#264653",purple:"#7209b7",ink:"#1d181a",foilEffect:"none"}},{id:"skin_sakura_pastel",name:"Anh Đào Mộng Mơ (Sakura Pastel)",jpName:"桜パステル調",rarity:"rare",price:650,unlockedByDefault:!1,bossUnlockId:"ayame",description:"Phối màu Pastel Anime dịu ngọt với giấy kem hồng phấn, viền vàng hồng (Rose Gold) và sắc hoa tươi sáng.",palette:{paperBg:"#fff5f8",paperGrad:"#ffe3ec",frameBorder:"#7a2848",sunRed:"#ff4d6d",skyHighlight:"#ffffff",foliageDark:"#386641",foliageMid:"#6a994e",blossomPink:"#ff8fa3",crimson:"#e01e5a",gold:"#ffca3a",indigo:"#5e60ce",purple:"#9d4edd",ink:"#4a192c",foilEffect:"pastel_shimmer"}},{id:"skin_sumie_ink",name:"Thủy Mặc Cổ Điển (Sumi-e Ink)",jpName:"水墨画・朱印",rarity:"epic",price:950,unlockedByDefault:!1,bossUnlockId:"renji",description:"Tranh thủy mặc Sumi-e trên giấy tuyên chỉ cổ, kết hợp nét mực tàu phóng khoáng với dấu ấn chu sa đỏ rực.",palette:{paperBg:"#ece6d8",paperGrad:"#d8cebe",frameBorder:"#1c1b18",sunRed:"#b81d13",skyHighlight:"#f5f2eb",foliageDark:"#22252a",foliageMid:"#495057",blossomPink:"#d96b6b",crimson:"#9e1b1b",gold:"#c89d54",indigo:"#343a40",purple:"#493b52",ink:"#111111",foilEffect:"ink_wash"}},{id:"skin_kintsugi_gold",name:"Sơn Mài Hoàng Kim (Kintsugi Gold)",jpName:"黒漆・金継ぎ",rarity:"legendary",price:1600,unlockedByDefault:!1,bossUnlockId:"yukiho",description:"Nền sơn mài đen tuyền Urushi của giới quý tộc Kyōto, mọi chi tiết hoa lá và chim muông đều được khảm vàng ròng 24K.",palette:{paperBg:"#19151c",paperGrad:"#0d0b0e",frameBorder:"#d4af37",sunRed:"#e63946",skyHighlight:"#2c222e",foliageDark:"#8c6d1f",foliageMid:"#d4af37",blossomPink:"#ffb3c1",crimson:"#d90429",gold:"#ffd700",indigo:"#4ea8de",purple:"#b5179e",ink:"#fcefb4",foilEffect:"gold_foil"}},{id:"skin_yokai_night",name:"Bách Quỷ Dạ Hành (Yōkai Night)",jpName:"百鬼夜行・妖狐",rarity:"legendary",price:1750,unlockedByDefault:!1,bossUnlockId:"haruto",description:"Lấy cảm hứng từ cuộn tranh Bách Quỷ Dạ Hành thời Heian với sắc tím dạ quang, lửa hồ ly xanh và huyết nguyệt.",palette:{paperBg:"#16132b",paperGrad:"#0b0818",frameBorder:"#4cc9f0",sunRed:"#f72585",skyHighlight:"#241e4e",foliageDark:"#1b3a4b",foliageMid:"#00b4d8",blossomPink:"#ff70a6",crimson:"#e01a4f",gold:"#fee440",indigo:"#7209b7",purple:"#b5179e",ink:"#e0fbfc",foilEffect:"spirit_glow"}},{id:"skin_ukiyoe_neon",name:"Phù Thế Ánh Trăng (Ukiyo-e Celestial)",jpName:"浮世月華・極彩",rarity:"mythic",price:2600,unlockedByDefault:!1,bossUnlockId:"kaguya",description:"Bộ bài thần thoại của Nữ Hoàng Kaguya: Hiệu ứng lăng kính Hologram 7 sắc cầu vồng kết hợp họa tiết Ukiyo-e thiên giới.",palette:{paperBg:"#210f37",paperGrad:"#120721",frameBorder:"#ffd166",sunRed:"#ff007f",skyHighlight:"#3b1c5e",foliageDark:"#06d6a0",foliageMid:"#4cc9f0",blossomPink:"#ff85ea",crimson:"#ff2a85",gold:"#ffe66d",indigo:"#7b2cbf",purple:"#c77dff",ink:"#ffffff",foilEffect:"holo_rainbow"}}];function G(d){return D.find(t=>t.id===d)||D[0]}function Y(d){return E.find(t=>t.id===d)||E[0]}function $(d,t="skin_traditional_edo",e=!0){const i=Y(t),n=i.palette,a=`c${d.id}_${i.id}`,o=`./public/assets/cards/card_${d.id}.webp?v=26`;let s="",r="";switch(i.id){case"skin_sakura_pastel":r="filter: saturate(1.12) brightness(1.04) contrast(0.98);",s=`
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#ffb3c1" fill-opacity="0.10" style="mix-blend-mode: multiply;" />
        <rect x="3" y="3" width="154" height="242" rx="7" fill="none" stroke="#ff758f" stroke-width="2.5" stroke-opacity="0.85" />
      `;break;case"skin_sumie_ink":r="filter: sepia(0.32) contrast(1.08) saturate(0.82);",s=`
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#e8dcc4" fill-opacity="0.14" style="mix-blend-mode: multiply;" />
        <rect x="3" y="3" width="154" height="242" rx="7" fill="none" stroke="#8d775f" stroke-width="2.2" stroke-opacity="0.8" />
      `;break;case"skin_kintsugi_gold":r="filter: contrast(1.06) saturate(1.15);",s=`
        <path d="M12 2 L38 42 L24 88 L56 135 M148 210 L118 175 L132 130" fill="none" stroke="#ffd166" stroke-width="1.3" stroke-opacity="0.75" />
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#ffd166" stroke-width="3" />
        <path d="M10 22 L10 10 L22 10 M138 10 L150 10 L150 22 M10 226 L10 238 L22 238 M138 238 L150 238 L150 226" fill="none" stroke="#fff3b0" stroke-width="2" />
      `;break;case"skin_yokai_night":r="filter: contrast(1.1) saturate(1.22) hue-rotate(-8deg);",s=`
        <rect x="2" y="2" width="156" height="244" rx="8" fill="#240046" fill-opacity="0.14" />
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#9d4edd" stroke-width="2.8" />
      `;break;case"skin_ukiyoe_neon":r="filter: saturate(1.28) contrast(1.08);",s=`
        <rect x="2.5" y="2.5" width="155" height="243" rx="8" fill="none" stroke="#f72585" stroke-width="2.6" />
        <rect x="5" y="5" width="150" height="238" rx="6" fill="none" stroke="#4cc9f0" stroke-width="1.1" stroke-opacity="0.75" />
      `;break;case"skin_traditional_edo":default:s=`
        <rect x="1.5" y="1.5" width="157" height="245" rx="8" fill="none" stroke="${d.type==="hikari"?"#ffd166":"#1a1617"}" stroke-width="${d.type==="hikari"?"2.2":"1.5"}" />
      `;break}const l=e?yt(d,n):"";return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 248" class="hanafuda-svg skin-${i.id}">
    <defs>
      <clipPath id="cardClip_${a}">
        <rect x="2" y="2" width="156" height="244" rx="8" />
      </clipPath>
    </defs>

    <!-- Authentic Traditional Hanafuda Card Artwork -->
    <g clip-path="url(#cardClip_${a})">
      <rect x="2" y="2" width="156" height="244" fill="#ffffff" />
      <image
        href="${o}"
        x="2"
        y="2"
        width="156"
        height="244"
        preserveAspectRatio="none"
        style="${r}"
      />
    </g>

    ${s}
    ${l}
  </svg>`}function yt(d,t){return`
    <g class="card-ui-badge" opacity="0.88">
      <rect x="6" y="6" width="24" height="14" rx="4" fill="${d.type==="hikari"?"#8f1822":"rgba(20, 14, 18, 0.72)"}" stroke="${t.gold}" stroke-width="0.7" />
      <text x="18" y="15.8" text-anchor="middle" fill="#fff6e5" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="800">T${d.month}</text>
    </g>
  `}function B(d="back_urushi_red"){const t=G(d),e=`b_${t.id}`,i=`./public/assets/backs/${t.id}.webp?v=26`;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 248" class="hanafuda-back-svg">
    <defs>
      <clipPath id="backClip_${e}">
        <rect x="2" y="2" width="156" height="244" rx="8" />
      </clipPath>
      <pattern id="wagara_${e}" width="24" height="14" patternUnits="userSpaceOnUse">
        <path d="M0 14 A12 12 0 0 1 24 14 M-12 14 A12 12 0 0 1 12 14 M12 14 A12 12 0 0 1 36 14" fill="none" stroke="${t.accentColor}" stroke-width="0.7" stroke-opacity="0.16"/>
      </pattern>
    </defs>
    <!-- Clean Card Back Frame -->
    <rect x="1" y="1" width="158" height="246" rx="9" fill="${t.borderColor}" stroke="${t.accentColor}" stroke-width="1.3" stroke-opacity="0.75" />
    <g clip-path="url(#backClip_${e})">
      <image
        href="${i}"
        x="2"
        y="2"
        width="156"
        height="244"
        preserveAspectRatio="xMidYMid slice"
      />
      <!-- Subtle Japanese Wagara Seigaiha Pattern Overlay -->
      <rect x="2" y="2" width="156" height="244" fill="url(#wagara_${e})" />
    </g>
    <rect x="5" y="5" width="150" height="238" rx="6" fill="none" stroke="${t.accentColor}" stroke-width="0.9" stroke-opacity="0.55" />
  </svg>`}const bt={1:{month:1,jpTitle:"睦月・松に鶴",viTitle:"Tháng 1 · Tùng Hạc & Mặt Trời Đỏ",flowerName:"Cây Tùng (Matsu)",propName:"Hạc Đỏ & Dải Thơ Akayoroshi",badgeIcon:"🌲"},2:{month:2,jpTitle:"如月・梅に鶯",viTitle:"Tháng 2 · Mai Đỏ & Chim Oanh Xuân",flowerName:"Hoa Mai Đỏ (Ume)",propName:"Chim Oanh Hót Trên Cành Mai",badgeIcon:"🌺"},3:{month:3,jpTitle:"弥生・桜に幕",viTitle:"Tháng 3 · Anh Đào & Rèm Hội Hanami",flowerName:"Hoa Anh Đào (Sakura)",propName:"Rèm Trẩy Hội Maku & Hoa Đào Rơi",badgeIcon:"🌸"},4:{month:4,jpTitle:"卯月・藤に不如帰",viTitle:"Tháng 4 · Giàn Tử Đằng & Chim Cu Nhỏ",flowerName:"Hoa Tử Đằng (Fuji)",propName:"Chim Cu Bay Qua Trăng Lưỡi Liềm",badgeIcon:"🍇"},5:{month:5,jpTitle:"皐月・菖蒲に八橋",viTitle:"Tháng 5 · Diên Vĩ & Cầu Gỗ Tám Nhịp",flowerName:"Hoa Diên Vĩ (Ayame)",propName:"Cầu Gỗ Yatsuhashi & Sóng Nước",badgeIcon:"⚜️"},6:{month:6,jpTitle:"水無月・牡丹に蝶",viTitle:"Tháng 6 · Mẫu Đơn Phú Quý & Hồ Điệp",flowerName:"Hoa Mẫu Đơn (Botan)",propName:"Đôi Bướm Vàng Lượn Quanh Hoa",badgeIcon:"🏵️"},7:{month:7,jpTitle:"文月・萩に猪",viTitle:"Tháng 7 · Cỏ Hồ Chi & Lợn Rừng Thu",flowerName:"Cỏ Đậu Khấu (Hagi)",propName:"Lợn Rừng Inoshishi & Dải Thơ Đỏ",badgeIcon:"🌿"},8:{month:8,jpTitle:"葉月・芒に月",viTitle:"Tháng 8 · Đồi Cỏ Lau & Trăng Rằm Thu",flowerName:"Cỏ Lau Bạc (Susuki)",propName:"Trăng Rằm Tsukimi & Đàn Ngỗng Trời",badgeIcon:"🌕"},9:{month:9,jpTitle:"長月・菊に盃",viTitle:"Tháng 9 · Cúc Hoàng Gia & Chén Rượu Thọ",flowerName:"Hoa Cúc Vàng (Kiku)",propName:"Chén Rượu Sake Chữ Thọ Sóng Sánh",badgeIcon:"🍶"},10:{month:10,jpTitle:"神無月・紅葉に鹿",viTitle:"Tháng 10 · Rừng Phong Đỏ & Hươu Sao",flowerName:"Lá Phong Thu (Momiji)",propName:"Hươu Sao Sừng Vàng & Lá Phong Rơi",badgeIcon:"🍁"},11:{month:11,jpTitle:"霜月・柳に小野道風",viTitle:"Tháng 11 · Liễu Mưa, Ô Giấy & Ếch Xanh",flowerName:"Cành Liễu Rủ (Yanagi)",propName:"Ô Giấy Wagasa, Ếch Xanh & Tia Chớp",badgeIcon:"☔"},12:{month:12,jpTitle:"師走・桐に鳳凰",viTitle:"Tháng 12 · Hoa Ngô Đồng & Phượng Hoàng",flowerName:"Hoa Ngô Đồng (Kiri)",propName:"Phượng Hoàng Lửa Tung Cánh Kim Sắc",badgeIcon:"🦚"}};function Gt(){return bt[9]}function vt(){return`
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

      <img src="./public/assets/diorama/month9/kiku_petal_yellow_1.webp?v=32"
           class="kiku-el kiku-landed-petal lp-1" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_1.webp?v=32"
           class="kiku-el kiku-landed-petal lp-2" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_yellow_2.webp?v=32"
           class="kiku-el kiku-landed-petal lp-3" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_2.webp?v=32"
           class="kiku-el kiku-landed-petal lp-4" alt="" decoding="async" />
    </div>
  `}function Tt(){return`
    <!-- 1. FLAT CAMERA-SPACE DRIFTING WATERCOLOR RED CLOUDS (Unaffected by board tilt) -->
    <div class="kiku-month9-billboard-stage" aria-hidden="true">
      <div class="kiku-cloud-drift-layer layer-back">
        <div class="kiku-drift-track drift-b track-center-high">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v3.webp?v=32"
                 class="kiku-el kiku-cloud cloud-center-high"
                 alt="" decoding="async" />
          </div>
        </div>
      </div>
      <div class="kiku-cloud-drift-layer layer-front">
        <div class="kiku-drift-track drift-a track-left-mid">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v2.webp?v=32"
                 class="kiku-el kiku-cloud cloud-left-mid cloud-over-field"
                 alt="" decoding="async" />
          </div>
        </div>
        <div class="kiku-drift-track drift-c track-right-low">
          <div class="kiku-drift-offset">
            <img src="./public/assets/diorama/month9/kiku_red_cloud_v1.webp?v=32"
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
        <img src="./public/assets/diorama/month9/kiku_plant_v2.webp?v=32"
             class="kiku-el kiku-plant plant-tl-sweep"
             alt="" decoding="async" />
        <img src="./public/assets/diorama/month9/kiku_purple_ribbon.webp?v=32"
             class="kiku-el kiku-ribbon-aotan"
             alt="" decoding="async" />
      </div>

      <!-- 3D Board Plane for Top-Right Chrysanthemum Cluster (moves/scales with board, stays upright to POV) -->
      <div class="kiku-board-plane plane-back">
        <div class="kiku-billboard-anchor anchor-tr-cluster">
          <img src="./public/assets/diorama/month9/kiku_plant_v3.webp?v=32"
               class="kiku-el kiku-plant plant-tr-cluster"
               alt="" decoding="async" />
        </div>
      </div>
    </div>

    <!-- 3. BOARD-BOUND FRONT DECOR PLANE (Moves/scales with board, stays upright to POV, on top of Left/Right UI panels) -->
    <div class="kiku-board-plane plane-front" aria-hidden="true">
      <!-- Bottom-Right Standing Chrysanthemum Plant -->
      <div class="kiku-billboard-anchor anchor-br-tall">
        <img src="./public/assets/diorama/month9/kiku_plant_v1.webp?v=32"
             class="kiku-el kiku-plant plant-br-tall"
             alt="" decoding="async" />
      </div>

      <!-- Bottom-Left Rock Stream & Sloshing Sakazuki Sake Cup (寿) -->
      <div class="kiku-sakazuki-group">
        <img src="./public/assets/diorama/month9/kiku_rock_stream.webp?v=32"
             class="kiku-el kiku-rock-stream"
             alt="" decoding="async" />
        <div class="kiku-sake-cup-holder">
          <img src="./public/assets/diorama/month9/kiku_sake_cup.webp?v=32"
               class="kiku-el kiku-sake-cup"
               alt="" decoding="async" />
          <div class="kiku-sake-ripple-ring ring-1"></div>
          <div class="kiku-sake-ripple-ring ring-2"></div>
        </div>
      </div>

      <!-- Falling Petals Drifting into the Playing Board -->
      <img src="./public/assets/diorama/month9/kiku_petal_red_1.webp?v=32"
           class="kiku-el kiku-falling-petal fp-1" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_yellow_1.webp?v=32"
           class="kiku-el kiku-falling-petal fp-2" alt="" decoding="async" />
      <img src="./public/assets/diorama/month9/kiku_petal_red_2.webp?v=32"
           class="kiku-el kiku-falling-petal fp-3" alt="" decoding="async" />
    </div>
  `}class Ct{constructor(){this.layer=null,this.speedMultiplier=1}setSpeedMultiplier(t){const e=Number(t);e>0&&isFinite(e)&&(this.speedMultiplier=e)}scaleMs(t){return Math.max(18,Math.round(t/(this.speedMultiplier||1)))}ensureLayer(){return(!this.layer||!document.body.contains(this.layer))&&(this.layer=document.createElement("div"),this.layer.id="fx-card-flight-layer",this.layer.className="fx-card-flight-layer",document.body.appendChild(this.layer)),this.layer}getRect(t,e=window.innerWidth/2,i=window.innerHeight/2){const n=typeof t=="string"?document.querySelector(t):t;if(n&&n.getBoundingClientRect){const a=n.getBoundingClientRect();if(a.width>0&&a.height>0)return a}return{left:e-38,top:i-59,width:76,height:118,right:e+38,bottom:i+59}}createFloatingCard(t,e,i,n=null){const a=this.ensureLayer(),o=document.createElement("div");o.className="fx-floating-card",o.style.left=`${i.left}px`,o.style.top=`${i.top}px`,o.style.width=`${i.width||76}px`,o.style.height=`${i.height||118}px`;const s=n?B(n):$(t,e,!0),r=new DOMParser().parseFromString(String(s),"text/html");return o.replaceChildren(...Array.from(r.body.childNodes)),a.appendChild(o),o}spawnImpactShockwave(t,e,i=!1){const n=this.ensureLayer(),a=document.createElement("div");a.className=`fx-impact-shockwave ${i?"bright-shockwave":""}`,a.style.left=`${t}px`,a.style.top=`${e}px`,n.appendChild(a),setTimeout(()=>a.remove(),this.scaleMs(650))}pulseCapturedTray(t){const e=t==="player"?"#player-captured-tray":"#ai-captured-tray",i=document.querySelector(e);i&&(i.classList.remove("tray-receive-pulse"),i.offsetWidth,i.classList.add("tray-receive-pulse"),setTimeout(()=>i.classList.remove("tray-receive-pulse"),this.scaleMs(600)))}animateFieldRelocations(t,{delayMs:e=0,durationMs:i=350,relocatedIds:n=[]}={}){if(!t)return Promise.resolve();const a=new Set(n.map(Number)),o=[];return document.querySelectorAll("[data-field-id]").forEach(r=>{const l=Number(r.getAttribute("data-field-id")),h=t[l];if(!h)return;const u=r.getBoundingClientRect();if(!u||u.width===0)return;const g=window.HK_UI_SCALE||1,k=(h.left-u.left)/g,c=(h.top-u.top)/g;if(Math.abs(k)<1.5&&Math.abs(c)<1.5)return;const y=a.has(l)||Math.abs(k)>8;y&&(r.style.zIndex="38");const T=y?[{transform:`translate3d(${k}px, ${c}px, 0px) scale(1) rotateZ(0deg)`},{transform:`translate3d(${k*.45}px, ${c*.45-18}px, 0px) scale(1.08) rotateZ(-3deg)`,offset:.52},{transform:"translate3d(0px, 0px, 0px) scale(1) rotateZ(0deg)"}]:[{transform:`translate3d(${k}px, ${c}px, 0px)`},{transform:"translate3d(0px, 0px, 0px)"}],N=r.animate(T,{duration:this.scaleMs(y?i+40:i),delay:this.scaleMs(e),easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"backwards"});o.push(N.finished.catch(()=>{}).finally(()=>{y&&(r.style.zIndex="")}))}),Promise.all(o)}async animateCardToFieldSlot({card:t,skinId:e,fromRect:i,toFieldCardId:n,onLandSound:a}){const o=document.querySelector(`[data-field-id="${n}"]`),s=this.getRect(o,window.innerWidth*.5,window.innerHeight*.42);o&&(o.style.opacity="0");const r=this.createFloatingCard(t,e,i),l=s.left-i.left,h=s.top-i.top,u=s.width/(i.width||76),g=s.height/(i.height||118);await r.animate([{transform:"translate3d(0px, 0px, 0px) scale(1) rotateZ(0deg)",boxShadow:"0 12px 24px rgba(0,0,0,0.65)"},{transform:`translate3d(${l*.55}px, ${h*.55-42}px, 0px) scale(1.16) rotateZ(-4deg)`,boxShadow:"0 28px 45px rgba(0,0,0,0.85)",offset:.55},{transform:`translate3d(${l}px, ${h}px, 0px) scale(${u}, ${g}) rotateZ(0deg)`,boxShadow:"0 4px 10px rgba(0,0,0,0.6)"}],{duration:this.scaleMs(330),easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"forwards"}).finished,a&&a(),this.spawnImpactShockwave(s.left+s.width/2,s.top+s.height/2,!1),o&&(o.style.opacity="1"),r.remove()}async animateCaptureSequence({actor:t,playedCard:e,matchedCards:i,skinId:n,fromRect:a,fieldTargetRect:o,onImpactSound:s}){const r=i[0],l=o||this.getRect(`[data-field-id="${r?.id}"]`,window.innerWidth*.5,window.innerHeight*.42),h=i.map((A,V)=>{const U={...l,left:l.left+V*6,top:l.top-V*4};return this.createFloatingCard(A,n,U)}),u=this.createFloatingCard(e,n,a);u.style.zIndex="220";const g=l.left+12,k=l.top-10,c=g-a.left,y=k-a.top,T=l.width/(a.width||76);await u.animate([{transform:"translate3d(0px, 0px, 0px) scale(1) rotateZ(0deg)"},{transform:`translate3d(${c*.5}px, ${y*.5-52}px, 0px) scale(1.22) rotateZ(-8deg)`,offset:.55},{transform:`translate3d(${c}px, ${y}px, 0px) scale(${T*1.06}) rotateZ(7deg)`}],{duration:this.scaleMs(320),easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"forwards"}).finished;const R=e.type==="hikari"||e.id===33||i.some(A=>A.type==="hikari"||A.id===33);s&&s(R),this.spawnImpactShockwave(l.left+l.width/2,l.top+l.height/2,R),u.classList.add("fx-paired-glow"),h.forEach(A=>{A.classList.add("fx-paired-glow"),A.animate([{transform:"scale(1) rotateZ(0deg)"},{transform:"scale(1.08) rotateZ(-5deg)"}],{duration:this.scaleMs(160),fill:"forwards",easing:"ease-out"})}),await new Promise(A=>setTimeout(A,this.scaleMs(250)));const _=t==="player"?"#player-captured-tray":"#ai-captured-tray",f=this.getRect(_,window.innerWidth-150,t==="player"?window.innerHeight*.55:window.innerHeight*.22),b=f.left+f.width*.45-l.width/2,S=f.top+f.height*.48-l.height/2,C=[];h.forEach((A,V)=>{const U=b-l.left+V*4,gt=S-l.top-V*4,qt=A.animate([{transform:"translate3d(0px, 0px, 0px) scale(1.08) rotateZ(-5deg)",opacity:1},{transform:`translate3d(${U*.5}px, ${gt*.5-30}px, 0px) scale(0.85) rotateZ(-12deg)`,opacity:1,offset:.5},{transform:`translate3d(${U}px, ${gt}px, 0px) scale(0.36) rotateZ(0deg)`,opacity:.2}],{duration:this.scaleMs(390),easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"forwards"});C.push(qt.finished)});const w=b+8-a.left,M=S-6-a.top,x=u.animate([{transform:`translate3d(${c}px, ${y}px, 0px) scale(${T*1.06}) rotateZ(7deg)`,opacity:1},{transform:`translate3d(${(c+w)*.5}px, ${(y+M)*.5-35}px, 0px) scale(0.88) rotateZ(14deg)`,opacity:1,offset:.5},{transform:`translate3d(${w}px, ${M}px, 0px) scale(0.36) rotateZ(4deg)`,opacity:.2}],{duration:this.scaleMs(390),easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"forwards"});C.push(x.finished),await Promise.all(C),this.pulseCapturedTray(t),h.forEach(A=>A.remove()),u.remove()}}const v=new Ct,wt={1:"matsu",2:"ume",3:"sakura",4:"fuji",5:"ayame",6:"botan",7:"hagi",8:"susuki",9:"kiku",10:"momiji",11:"yanagi",12:"kiri"};class Mt{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.theme="kiku",this.monthNumber=9,this.ambientParticles=[],this.landedParticles=[],this.burstParticles=[],this.running=!1,this.width=window.innerWidth,this.height=window.innerHeight,this.kikuPetalSprites=["./public/assets/diorama/month9/kiku_petal_red_1.webp?v=32","./public/assets/diorama/month9/kiku_petal_yellow_1.webp?v=32","./public/assets/diorama/month9/kiku_petal_red_2.webp?v=32","./public/assets/diorama/month9/kiku_petal_yellow_2.webp?v=32"].map(e=>{const i=new Image;return i.decoding="async",i.src=e,i}),this.handleResize=()=>{this.canvas&&(this.width=this.canvas.width=window.innerWidth,this.height=this.canvas.height=window.innerHeight)},window.addEventListener("resize",this.handleResize),this.handleResize(),this.initAmbient(20)}setTheme(t){this.theme=t||"kiku",this.landedParticles=[],this.initAmbient(20)}setMonthTheme(t=9){const e=(Number(t)-1)%12+1;this.monthNumber=e,this.theme=wt[e]||"kiku",this.landedParticles=[],this.initAmbient(20)}initAmbient(t=20){this.ambientParticles=[];for(let e=0;e<t;e++)this.ambientParticles.push(this.createAmbientParticle(!0))}createAmbientParticle(t=!1){const e=this.theme==="yanagi",n=Math.random()<.85?this.width*(.27+Math.random()*.46):Math.random()*this.width,a=t?Math.random()*(this.height*.68):-24-Math.random()*40,o=window.HK_UI_SCALE||1,s=(e?7+Math.random()*8:6.5+Math.random()*8)*o,r=(e?4.2+Math.random()*2.8:.44+Math.random()*.82)*o,l=(e?-1.1-Math.random()*.6:-.42+Math.random()*.88)*o,h=Math.random()*Math.PI*2,u=-.02+Math.random()*.04,g=Math.random()<.55,k=this.height*.18,c=this.height*.64,y=k+Math.random()*(c-k);return{x:n,y:a,size:s,speedX:l,speedY:r,rot:h,rotSpeed:u,alpha:.68+Math.random()*.3,swayOffset:Math.random()*100,variant:Math.floor(Math.random()*4),canLandOnTable:g,landY:y}}isInsideTableBounds(t,e){const i=this.width*.27,n=this.width*.73,a=this.height*.17,o=this.height*.65;return t>=i&&t<=n&&e>=a&&e<=o}spawnLandedParticle(t){this.landedParticles.length>=10&&this.landedParticles.shift();const e=this.theme==="yanagi"||this.theme==="ayame";this.landedParticles.push({x:t.x,y:t.y,size:t.size*.95,rot:t.rot,alpha:e?.65:.92,maxLife:e?1.35:5+Math.random()*2.8,age:0,swayOffset:t.swayOffset,variant:t.variant,isWaterRipple:e})}triggerBurst(t,e,i="#ffd166",n=26){for(let a=0;a<n;a++){const o=Math.PI*2*a/n+(Math.random()-.5)*.3,s=2.2+Math.random()*6.5;this.burstParticles.push({x:t,y:e,vx:Math.cos(o)*s,vy:Math.sin(o)*s-1.2,size:(3+Math.random()*5.5)*(window.HK_UI_SCALE||1),color:i,alpha:1,decay:.02+Math.random()*.02})}}start(){if(this.running)return;this.running=!0;let t=performance.now();const e=i=>{if(!this.running)return;if(document.hidden){this.pausedByVisibility=!0;return}const n=Math.min(.05,(i-t)*.001);t=i,this.updateAndDraw(i*.001,n),requestAnimationFrame(e)};this.handleVisibility||(this.handleVisibility=()=>{!document.hidden&&this.running&&this.pausedByVisibility&&(this.pausedByVisibility=!1,t=performance.now(),requestAnimationFrame(e))},document.addEventListener("visibilitychange",this.handleVisibility)),requestAnimationFrame(e)}stop(){this.running=!1}drawSingleFloraMotif(t,e,i=0,n=!1){switch(this.theme){case"matsu":{i===0?(t.fillStyle="#ffd166",t.beginPath(),t.arc(0,0,e*.32,0,Math.PI*2),t.fill()):(t.strokeStyle="#2d6a4f",t.lineWidth=1.5,t.beginPath(),t.moveTo(0,e*.55),t.lineTo(-e*.45,-e*.65),t.moveTo(0,e*.55),t.lineTo(e*.45,-e*.65),t.stroke());break}case"ume":{const a=e*.58;t.fillStyle=i===0?"#e63946":"#ff758f",t.strokeStyle="#9e1b24",t.lineWidth=.7,t.beginPath(),t.arc(0,0,a,0,Math.PI*2),t.fill(),t.stroke(),t.fillStyle="#ffd166",t.beginPath(),t.arc(0,0,a*.28,0,Math.PI*2),t.fill();break}case"fuji":{const a=e*.68;t.fillStyle=i===0?"#9d4edd":"#c77dff",t.strokeStyle="#5a189a",t.lineWidth=.65,t.beginPath(),t.moveTo(0,-a*.85),t.quadraticCurveTo(a*.75,0,0,a*.85),t.quadraticCurveTo(-a*.75,0,0,-a*.85),t.closePath(),t.fill(),t.stroke();break}case"ayame":{if(i===0)t.fillStyle="#4cc9f0",t.shadowColor="#4895ef",t.shadowBlur=n?2:6,t.beginPath(),t.arc(0,0,e*.36,0,Math.PI*2),t.fill();else{const a=e*.68;t.fillStyle="#5e60ce",t.strokeStyle="#ffd166",t.lineWidth=.6,t.beginPath(),t.ellipse(0,0,a*.48,a*.85,0,0,Math.PI*2),t.fill(),t.stroke()}break}case"botan":{if(i===0)t.fillStyle="#ffd166",t.beginPath(),t.arc(0,0,e*.32,0,Math.PI*2),t.fill();else{const a=e*.76;t.fillStyle=i===1?"#d90429":"#ff4d6d",t.strokeStyle="#ffd166",t.lineWidth=.75,t.beginPath(),t.moveTo(0,a*.7),t.bezierCurveTo(-a,a*.2,-a*.9,-a*.75,-a*.3,-a*.65),t.quadraticCurveTo(0,-a*.95,a*.3,-a*.65),t.bezierCurveTo(a*.9,-a*.75,a,a*.2,0,a*.7),t.closePath(),t.fill(),t.stroke()}break}case"hagi":{const a=e*.52;t.fillStyle=i===0?"#d81159":"#ff70a6",t.strokeStyle="#7209b7",t.lineWidth=.6,t.beginPath(),t.ellipse(0,0,a*.85,a*.52,0,0,Math.PI*2),t.fill(),t.stroke();break}case"susuki":{i===0?(t.fillStyle="#fff3b0",t.shadowColor="#ffd166",t.shadowBlur=n?2:7,t.beginPath(),t.arc(0,0,e*.34,0,Math.PI*2),t.fill()):(t.strokeStyle="#f8f9fa",t.lineWidth=1.2,t.beginPath(),t.moveTo(-e*.6,e*.3),t.quadraticCurveTo(0,-e*.2,e*.65,-e*.35),t.stroke());break}case"kiku":{const a=this.kikuPetalSprites&&this.kikuPetalSprites[Math.abs(i)%this.kikuPetalSprites.length];if(a&&a.complete&&a.naturalWidth>0){const o=e*(n?2.25:2.45),s=o*(a.naturalWidth/a.naturalHeight);n&&(t.shadowColor="rgba(20, 10, 5, 0.42)",t.shadowBlur=3,t.shadowOffsetY=2),t.drawImage(a,-s*.5,-o*.5,s,o)}else{const o=e*.78;t.fillStyle=i%2===0?"#e02424":"#ffb703",t.strokeStyle="#18100c",t.lineWidth=1.1,t.beginPath(),t.ellipse(0,0,o*.36,o*.9,0,0,Math.PI*2),t.fill(),t.stroke()}break}case"momiji":{t.fillStyle=i===0?"#d93829":"#f48c06",t.strokeStyle="#780000",t.lineWidth=.8,t.beginPath(),t.moveTo(0,-e),t.lineTo(e*.32,-e*.35),t.lineTo(e*.88,-e*.22),t.lineTo(e*.42,e*.18),t.lineTo(e*.55,e*.75),t.lineTo(0,e*.38),t.lineTo(-e*.55,e*.75),t.lineTo(-e*.42,e*.18),t.lineTo(-e*.88,-e*.22),t.lineTo(-e*.32,-e*.35),t.closePath(),t.fill(),t.stroke();break}case"yanagi":{i===0?(t.fillStyle="#2a9d8f",t.strokeStyle="#1d3557",t.lineWidth=.6,t.beginPath(),t.ellipse(0,0,e*.22,e*.85,0,0,Math.PI*2),t.fill(),t.stroke()):(t.strokeStyle="rgba(168, 218, 220, 0.82)",t.lineWidth=1.35,t.beginPath(),t.moveTo(0,-e*.8),t.lineTo(-e*.25,e*.8),t.stroke());break}case"kiri":case"celestial":{if(i===0)t.fillStyle="#ffd166",t.shadowColor="#f48c06",t.shadowBlur=n?3:8,t.beginPath(),t.ellipse(0,0,e*.28,e*.75,0,0,Math.PI*2),t.fill();else{const a=e*.65;t.fillStyle="#9d4edd",t.strokeStyle="#ffd166",t.lineWidth=.7,t.beginPath(),t.moveTo(0,-a*.8),t.bezierCurveTo(a*.8,-a*.5,a*.7,a*.6,0,a*.85),t.bezierCurveTo(-a*.7,a*.6,-a*.8,-a*.5,0,-a*.8),t.closePath(),t.fill(),t.stroke()}break}case"goldleaf":t.fillStyle="#e09f1f",t.strokeStyle="#fff3b0",t.lineWidth=.8,t.fillRect(-e*.42,-e*.42,e*.84,e*.84),t.strokeRect(-e*.42,-e*.42,e*.84,e*.84);break;case"spiritfire":case"lantern":t.fillStyle=this.theme==="spiritfire"?"#2b9348":"#e85d04",t.shadowColor=this.theme==="spiritfire"?"#52b788":"#ff9e00",t.shadowBlur=8,t.beginPath(),t.arc(0,0,e*.42,0,Math.PI*2),t.fill();break;case"sakura":default:{const a=e*.74;t.fillStyle=i===0?"#ffb3c6":"#ff8fab",t.strokeStyle="#e64980",t.lineWidth=.75,t.beginPath(),t.moveTo(0,a*.75),t.bezierCurveTo(-a*.9,a*.25,-a*.85,-a*.65,-a*.22,-a*.85),t.lineTo(0,-a*.48),t.lineTo(a*.22,-a*.85),t.bezierCurveTo(a*.85,-a*.65,a*.9,a*.25,0,a*.75),t.closePath(),t.fill(),t.stroke();break}}}updateAndDraw(t,e=.016){const i=this.ctx;i.clearRect(0,0,this.width,this.height);for(let n=this.landedParticles.length-1;n>=0;n--){const a=this.landedParticles[n];if(a.age+=e,a.age>=a.maxLife){this.landedParticles.splice(n,1);continue}const o=a.age/a.maxLife,s=o<.15?o/.15*a.alpha:o>.72?(1-o)/.28*a.alpha:a.alpha;if(i.save(),i.globalAlpha=Math.max(0,s),a.isWaterRipple){const r=3+o*22;i.translate(a.x,a.y),i.scale(1,.58),i.strokeStyle=this.theme==="ayame"?"#90e0ef":"#a8dadc",i.lineWidth=1.4*(1-o),i.beginPath(),i.arc(0,0,r,0,Math.PI*2),i.stroke()}else{const r=Math.sin(t*2.4+a.swayOffset)*1.1;i.translate(a.x+r,a.y),i.scale(1,.72),i.rotate(a.rot+Math.sin(t*1.8+a.swayOffset)*.08),this.drawSingleFloraMotif(i,a.size,a.variant,!0)}i.restore()}for(let n of this.ambientParticles){const a=this.theme==="yanagi"?.1:Math.sin(t*1.3+n.swayOffset)*.55;if(n.x+=n.speedX+a,n.y+=n.speedY,this.theme!=="yanagi"&&(n.rot+=n.rotSpeed),n.canLandOnTable&&n.y>=n.landY&&this.isInsideTableBounds(n.x,n.y)){this.spawnLandedParticle(n),n.y=-24-Math.random()*30,n.x=Math.random()*this.width,n.landY=this.height*(.16+Math.random()*.51);continue}n.y>this.height+30&&(n.y=-20,n.x=Math.random()*this.width),n.x<-30&&(n.x=this.width+20),n.x>this.width+30&&(n.x=-20),i.save(),i.translate(n.x,n.y),this.theme!=="yanagi"&&i.rotate(n.rot),i.globalAlpha=n.alpha,this.drawSingleFloraMotif(i,n.size,n.variant,!1),i.restore()}for(let n=this.burstParticles.length-1;n>=0;n--){const a=this.burstParticles[n];if(a.x+=a.vx,a.y+=a.vy,a.vy+=.14,a.alpha-=a.decay,a.alpha<=0){this.burstParticles.splice(n,1);continue}i.save(),i.globalAlpha=Math.max(0,a.alpha),i.fillStyle=a.color,i.shadowColor=a.color,i.shadowBlur=8,i.beginPath(),i.arc(a.x,a.y,a.size,0,Math.PI*2),i.fill(),i.restore()}}}const q="./public/assets/yaku_popup/",nt={1:"crane",9:"sakura_curtain",29:"full_moon",41:"michikaze",45:"phoenix",33:"sake_cup",25:"boar",37:"deer",21:"butterfly",2:"akatan_ribbon",6:"akatan_ribbon",10:"akatan_ribbon",22:"aotan_ribbon",34:"aotan_ribbon",38:"aotan_ribbon"},z={1:{img:"flower_pine",petal:"#f3efe2"},2:{img:"flower_plum",petal:"#c8203a"},3:{img:"flower_sakura",petal:"#ffb7c5"},4:{img:"flower_wisteria",petal:"#b99be0"},5:{img:"flower_iris",petal:"#6a64cf"},6:{img:"flower_peony",petal:"#d6283b"},7:{img:"flower_hagi",petal:"#c2307a"},8:{img:"flower_susuki",petal:"#e6d29a"},9:{img:"flower_kiku",petal:"#f2b632"},10:{img:"flower_momiji",petal:"#d9411e"},11:{img:"flower_willow",petal:"#a9c46e"},12:{img:"flower_kiri",petal:"#c3aee0"}},St=[{x:-14,y:4,w:40,d:1},{x:72,y:0,w:40,d:.75},{x:32,y:-30,w:36,d:.5}],Nt=[{x:-18,y:62,w:44,r:-8,d:.85,flip:!1},{x:74,y:58,w:44,r:10,d:.65,flip:!0},{x:-12,y:-18,w:36,r:14,d:.4,flip:!0},{x:80,y:22,w:34,r:-12,d:.55,flip:!1}],Rt=`
  <svg class="yaku-reveal-defs" width="0" height="0" aria-hidden="true" focusable="false">
    <filter id="yr-ink-bleed" x="-25%" y="-25%" width="150%" height="150%">
      <!-- Chỉ quầng mực loang mềm, không dùng feDisplacementMap (làm chữ/mép bị răng cưa) -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur" />
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" result="halo" />
      <feMerge><feMergeNode in="halo" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </svg>`;function F(d){return String(d??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function P(d,t){return d+Math.random()*(t-d)}function ot(d){const t=/^(.*?)\s*\(([^)]+)\)\s*$/.exec(d||"");return t?{romaji:t[1],kanji:t[2]}:{romaji:d||"",kanji:""}}function st(d){const t=[],e=[];for(const i of d){const n=nt[i];n&&!t.includes(n)&&t.push(n);const a=I(i);a&&!e.includes(a.month)&&e.push(a.month)}return{subjects:t.slice(0,3),months:e.slice(0,4)}}function _t(d,t,e,i){const n=(d.cards||[]).slice(0,15),a=n.length,o=(a-1)/2,{romaji:s,kanji:r}=ot(d.jpName),{subjects:l,months:h}=st(n),u=a<=3?96:a<=6?84:a<=9?70:58,g=a<=3?20:a<=6?15:a<=9?11.5:9,k=a>1?Math.min(15,76/(a-1)):0,c=Math.min(.035,.16/Math.max(1,a)),y=n.map((w,M)=>{const x=I(w);return x?`<div class="yaku-reveal-card" style="${[`--i:${M}`,`--stag:${c.toFixed(3)}`,`--rot:${((M-o)*k).toFixed(2)}deg`,`--dx:${((M-o)*6).toFixed(1)}px`,`--sr:${((M-o)*1.6).toFixed(2)}deg`,`--fx:${P(-260,260).toFixed(0)}px`,`--fy:${P(180,320).toFixed(0)}px`,`--fr:${P(-50,50).toFixed(0)}deg`].join(";")}">${$(x,t.skinId,!1)}</div>`:""}).join(""),T=l.map((w,M)=>{const x=St[M];return`<div class="yr-float yr-subject" style="left:${x.x}%;top:${x.y}%;width:${x.w}%;--d:${x.d};--k:${M}">
        <img src="${q}${w}.webp?v=2" alt="" draggable="false" />
      </div>`}).join(""),N=h.map((w,M)=>{const x=Nt[M],A=z[w];return`<div class="yr-float yr-flower${x.flip?" is-flip":""}" style="left:${x.x}%;top:${x.y}%;width:${x.w}%;--d:${x.d};--k:${M+1};--r:${x.r}deg">
        <img src="${q}${A.img}.webp?v=2" alt="" draggable="false" />
      </div>`}).join(""),R=h.map(w=>z[w].petal);R.length||R.push("#ffb7c5");const _=t.short?10:16;let f="";for(let w=0;w<_;w++){const M=[`left:${P(-5,100).toFixed(1)}%`,`--pc:${R[w%R.length]}`,`--pd:${P(.05,.55).toFixed(2)}`,`--pl:${P(.45,.75).toFixed(2)}`,`--sx:${P(-70,70).toFixed(0)}px`,`--ps:${P(.6,1.25).toFixed(2)}`,`--spin:${P(260,720).toFixed(0)}deg`].join(";");f+=`<span class="yaku-reveal-petal" style="${M}"></span>`}const b=Array.from(r).map((w,M)=>`<span class="${w==="・"?"is-dot":""}" style="--c:${M}">${F(w)}</span>`).join(""),S=t.short?`Đối thủ ${F(t.actorName||"")} đã ăn bộ…`:"Bạn đã ăn bộ!",C=i>1?` · ${e+1}/${i}`:"";return`
    <div class="yaku-reveal-overlay${t.short?" is-short":""}" style="--yr-t:${t.durationMs}ms;--cw:min(${u}px, calc(${g} * var(--avw, 1vw)));--n:${a}" role="dialog" aria-label="${F(`${d.viName} – ${s}`)}">
      ${Rt}
      <div class="yaku-reveal-stage">
        <div class="yaku-reveal-paper-wrap"><div class="yaku-reveal-paper"></div></div>
        <div class="yaku-reveal-decor" aria-hidden="true">${N}${T}</div>
        <div class="yaku-reveal-petals" aria-hidden="true">${f}</div>
        <div class="yaku-reveal-content">
          <div class="yaku-reveal-kicker">${S}</div>
          <div class="yaku-reveal-fan">${y}</div>
          <h2 class="yaku-reveal-kanji" lang="ja">${b}</h2>
          <div class="yaku-reveal-romaji">${F(s)}</div>
          <div class="yaku-reveal-vi">${F(d.viName)}</div>
          <div class="yaku-reveal-points">+${Number(d.points)||0} điểm</div>
        </div>
        <div class="yaku-reveal-hint">Chạm để bỏ qua${C}</div>
      </div>
    </div>`}function xt(){const d=[...new Set(Object.values(nt)),...Object.values(z).map(i=>i.img)],t=window.requestIdleCallback||(i=>setTimeout(i,200)),e=()=>{const i=d.shift();if(!i)return;const n=new Image;n.decoding="async",n.onload=n.onerror=()=>t(e),n.src=`${q}${i}.webp?v=2`};t(e)}function At(d){const{subjects:t,months:e}=st((d.cards||[]).slice(0,15)),n=[...t.map(a=>`${q}${a}.webp?v=2`),...e.map(a=>`${q}${z[a].img}.webp?v=2`)].map(a=>{const o=new Image;return o.src=a,o.decode?o.decode().catch(()=>{}):Promise.resolve()});return document.fonts?.load&&n.push(document.fonts.load('64px "Yuji Boku Yaku"',ot(d.jpName).kanji).catch(()=>{})),Promise.race([Promise.all(n),new Promise(a=>setTimeout(a,350))])}function $t(){let d=document.getElementById("yaku-reveal-root");return d||(d=document.createElement("div"),d.id="yaku-reveal-root",(document.getElementById("app")||document.body).appendChild(d)),d}function Ht(d,t,e,i,n){return new Promise(a=>{const o=new DOMParser().parseFromString(_t(t,e,i,n),"text/html");d.replaceChildren(...Array.from(o.body.childNodes));const s=d.querySelector(".yaku-reveal-overlay");let r=!1,l=0;const h=()=>{r||(r=!0,clearTimeout(l),s.removeEventListener("pointerdown",u),document.removeEventListener("keydown",g,!0),s.classList.add("is-leaving"),setTimeout(a,260))},u=k=>{k.preventDefault(),k.stopPropagation(),h()},g=k=>{(k.key==="Escape"||k.key==="Enter"||k.key===" ")&&(k.preventDefault(),k.stopPropagation(),h())};s.addEventListener("pointerdown",u),document.addEventListener("keydown",g,!0),l=setTimeout(h,Math.max(400,e.durationMs-260))})}async function It(d,t={}){const e=(d||[]).filter(Boolean);if(!e.length)return;const i={short:!!t.short,actorName:t.actorName||"",skinId:t.skinId||"skin_traditional_edo",durationMs:t.durationMs||(t.short?2e3:2800)},n=$t();try{for(let a=0;a<e.length;a++)await At(e[a]),await Ht(n,e[a],i,a,e.length)}finally{n.replaceChildren()}}const X=[{id:"sakura_washitsu",name:"🌸 Trà Thất Anh Đào",subtitle:"Koto & Sáo Trúc Shakuhachi êm dịu",stepMs:430},{id:"tsukimi_bamboo",name:"🌕 Trăng Thu Rừng Trúc",subtitle:"Hirajoshi Thiền Tịnh & Chuông Gió Furin",stepMs:490},{id:"kyoto_lofi",name:"🍵 Quán Trà Edo Lo-Fi",subtitle:"Giai điệu Koto Chill & Nhịp Lo-Fi ấm áp",stepMs:390}],Q="hanakoi_bgm_enabled",rt="hanakoi_sfx_enabled";function lt(d){try{return localStorage.getItem(d)!=="0"}catch{return!0}}function J(d,t){try{localStorage.setItem(d,t?"1":"0")}catch{}}class Pt{constructor(){this.ctx=null,this.bgmEnabled=lt(Q),this.sfxEnabled=lt(rt),this.bgmPlaying=!1,this.bgmTimer=null,this.bgmStep=0,this.currentTrackIndex=0,this.bgmVolume=.42,this.bgmMasterGain=null,this.bgmDryGain=null,this.bgmWetNode=null,this.kotoScale=[293.66,329.63,392,440,523.25,587.33,659.25,783.99,880]}get muted(){return!this.bgmEnabled&&!this.sfxEnabled}ensureContext(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this.setupBgmBus(this.ctx))}return this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}),this.ctx}sfxContext(){return this.sfxEnabled?this.ensureContext():null}setupBgmBus(t){this.bgmMasterGain=t.createGain(),this.bgmMasterGain.gain.setValueAtTime(this.bgmVolume,t.currentTime),this.bgmMasterGain.connect(t.destination),this.bgmDryGain=t.createGain(),this.bgmDryGain.gain.setValueAtTime(.85,t.currentTime),this.bgmDryGain.connect(this.bgmMasterGain);const e=t.createDelay(1),i=t.createDelay(1);e.delayTime.setValueAtTime(.36,t.currentTime),i.delayTime.setValueAtTime(.54,t.currentTime);const n=t.createGain();n.gain.setValueAtTime(.34,t.currentTime);const a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(1650,t.currentTime);const o=t.createGain();o.gain.setValueAtTime(.42,t.currentTime),e.connect(a),a.connect(i),i.connect(n),n.connect(e),a.connect(o),i.connect(o),o.connect(this.bgmMasterGain),this.bgmWetNode=e}connectToBgmSpace(t){!this.bgmDryGain||!this.bgmWetNode||(t.connect(this.bgmDryGain),t.connect(this.bgmWetNode))}getCurrentTrack(){return X[this.currentTrackIndex]||X[0]}cycleTrack(){return this.currentTrackIndex=(this.currentTrackIndex+1)%X.length,this.bgmStep=0,this.bgmEnabled=!0,J(Q,!0),this.startBgm(),this.restartBgmLoop(),this.playKotoNote(440,0,.5,.09),this.playKotoNote(659.25,.06,.6,.09),this.getCurrentTrack()}toggleBgm(){return this.bgmEnabled=!this.bgmEnabled,J(Q,this.bgmEnabled),this.bgmEnabled?this.startBgm():this.stopBgm(),this.bgmEnabled}toggleSfx(){if(this.sfxEnabled=!this.sfxEnabled,J(rt,this.sfxEnabled),!this.sfxEnabled&&window.speechSynthesis)try{window.speechSynthesis.cancel()}catch{}return this.sfxEnabled}startBgm(){if(!this.bgmEnabled)return;const t=this.ensureContext();if(t&&!(this.bgmPlaying&&this.bgmTimer)){if(this.bgmPlaying=!0,this.bgmMasterGain){const e=t.currentTime;this.bgmMasterGain.gain.cancelScheduledValues(e),this.bgmMasterGain.gain.setValueAtTime(.01,e),this.bgmMasterGain.gain.linearRampToValueAtTime(this.bgmVolume,e+1.2)}this.restartBgmLoop()}}restartBgmLoop(){if(this.bgmTimer&&(clearInterval(this.bgmTimer),this.bgmTimer=null),!this.bgmEnabled){this.bgmPlaying=!1;return}if(!this.ensureContext())return;this.bgmPlaying=!0;const e=this.getCurrentTrack();this.tickBgmStep(),this.bgmTimer=setInterval(()=>{this.tickBgmStep()},e.stepMs)}stopBgm(){if(this.bgmPlaying=!1,this.bgmTimer&&(clearInterval(this.bgmTimer),this.bgmTimer=null),this.ctx&&this.bgmMasterGain){const t=this.ctx.currentTime;this.bgmMasterGain.gain.cancelScheduledValues(t),this.bgmMasterGain.gain.setValueAtTime(this.bgmMasterGain.gain.value,t),this.bgmMasterGain.gain.linearRampToValueAtTime(1e-4,t+.35)}}tickBgmStep(){if(!this.bgmEnabled)return;const t=this.ensureContext();if(!t||t.state!=="running")return;const e=this.bgmStep%32;this.bgmStep++;const i=this.getCurrentTrack().id;i==="sakura_washitsu"?this.playSakuraWashitsuStep(e):i==="tsukimi_bamboo"?this.playTsukimiBambooStep(e):this.playKyotoLofiStep(e)}playSakuraWashitsuStep(t){t===0?this.playBgmWarmPad([196,293.66,369.99,493.88],3.4,.085):t===8?this.playBgmWarmPad([220,293.66,369.99,440],3.4,.085):t===16?this.playBgmWarmPad([164.81,246.94,293.66,392],3.4,.085):t===24&&this.playBgmWarmPad([146.83,220,293.66,329.63,369.99],3.4,.085);const i={0:{f:293.66,dur:1.5,v:.11},1:{f:392,dur:1.4,v:.09},2:{f:440,dur:1.4,v:.1},3:{f:493.88,dur:1.6,v:.11},5:{f:587.33,dur:1.8,v:.12},6:{f:493.88,dur:1.2,v:.08},7:{f:440,dur:1.3,v:.09},8:{f:329.63,dur:1.5,v:.1},10:{f:440,dur:1.4,v:.1},11:{f:493.88,dur:1.4,v:.09},12:{f:659.25,dur:1.9,v:.11},14:{f:587.33,dur:1.5,v:.1},15:{f:440,dur:1.2,v:.08},16:{f:246.94,dur:1.6,v:.1},17:{f:329.63,dur:1.4,v:.09},18:{f:392,dur:1.5,v:.1},19:{f:493.88,dur:1.7,v:.11},21:{f:659.25,dur:1.6,v:.11},22:{f:587.33,dur:1.4,v:.09},23:{f:493.88,dur:1.3,v:.08},24:{f:293.66,dur:1.7,v:.11},25:{f:369.99,dur:1.4,v:.09},26:{f:440,dur:1.5,v:.1},27:{f:587.33,dur:1.8,v:.11},29:{f:493.88,dur:1.4,v:.09},30:{f:440,dur:1.5,v:.09},31:{f:392,dur:1.5,v:.08}}[t];i&&this.playBgmKotoPluck(i.f,i.dur,i.v),t===4?this.playBgmShakuhachi(587.33,554.37,2.1,.075):t===13?this.playBgmShakuhachi(659.25,587.33,1.9,.07):t===20?this.playBgmShakuhachi(493.88,440,2.2,.075):t===28&&this.playBgmShakuhachi(440,392,2,.07),(t===7||t===23)&&Math.random()<.75&&this.playBgmFurinChime(1174.66,.032)}playTsukimiBambooStep(t){t===0?this.playBgmWarmPad([110,220,261.63,329.63,493.88],3.8,.085):t===8?this.playBgmWarmPad([174.61,261.63,329.63,440,493.88],3.8,.085):t===16?this.playBgmWarmPad([146.83,220,261.63,329.63,349.23],3.8,.085):t===24&&this.playBgmWarmPad([164.81,246.94,329.63,440],3.8,.08);const i={0:{f:220,dur:1.8,v:.11},2:{f:329.63,dur:1.6,v:.1},3:{f:349.23,dur:1.5,v:.09},4:{f:440,dur:1.9,v:.11},6:{f:523.25,dur:1.7,v:.1},7:{f:493.88,dur:1.5,v:.09},8:{f:261.63,dur:1.8,v:.1},10:{f:349.23,dur:1.6,v:.09},11:{f:440,dur:1.6,v:.1},12:{f:659.25,dur:2.1,v:.11},14:{f:523.25,dur:1.6,v:.09},16:{f:293.66,dur:1.8,v:.1},18:{f:349.23,dur:1.5,v:.09},19:{f:440,dur:1.6,v:.1},20:{f:523.25,dur:1.9,v:.11},22:{f:493.88,dur:1.6,v:.09},23:{f:329.63,dur:1.5,v:.08},24:{f:246.94,dur:1.8,v:.1},26:{f:329.63,dur:1.6,v:.1},27:{f:493.88,dur:1.7,v:.1},28:{f:440,dur:2.2,v:.11},30:{f:329.63,dur:1.6,v:.09}}[t];i&&this.playBgmKotoPluck(i.f,i.dur,i.v),t===3?this.playBgmShakuhachi(659.25,587.33,2.4,.08):t===12?this.playBgmShakuhachi(523.25,493.88,2.2,.075):t===20&&this.playBgmShakuhachi(440,392,2.5,.08),t===15?this.playBgmFurinChime(1318.51,.035):t===31&&this.playBgmBambooTap(.055)}playKyotoLofiStep(t){const e=t%8;(e===0||e===5)&&this.playBgmLofiKick(.13),(e===2||e===6)&&this.playBgmLofiBrush(.035),e===4&&this.playBgmBambooTap(.045),t===0?this.playBgmWarmPad([174.61,261.63,329.63,392,440],2.9,.09):t===8?this.playBgmWarmPad([164.81,246.94,293.66,392,493.88],2.9,.09):t===16?this.playBgmWarmPad([146.83,220,261.63,329.63,392],2.9,.09):t===24&&this.playBgmWarmPad([196,293.66,349.23,440,523.25],2.9,.09);const n={0:{f:523.25,dur:1.2,v:.11},1:{f:659.25,dur:1.2,v:.1},3:{f:783.99,dur:1.5,v:.11},5:{f:659.25,dur:1.2,v:.09},6:{f:587.33,dur:1.3,v:.1},8:{f:493.88,dur:1.3,v:.1},10:{f:587.33,dur:1.2,v:.1},11:{f:659.25,dur:1.5,v:.11},13:{f:523.25,dur:1.3,v:.09},15:{f:440,dur:1.3,v:.09},16:{f:440,dur:1.4,v:.1},17:{f:523.25,dur:1.3,v:.1},19:{f:659.25,dur:1.5,v:.11},21:{f:587.33,dur:1.3,v:.1},22:{f:523.25,dur:1.4,v:.09},24:{f:392,dur:1.4,v:.1},25:{f:440,dur:1.3,v:.09},27:{f:523.25,dur:1.5,v:.11},29:{f:587.33,dur:1.4,v:.1},30:{f:659.25,dur:1.6,v:.11}}[t];n&&this.playBgmKotoPluck(n.f,n.dur,n.v),(t===12||t===28)&&this.playBgmShakuhachi(659.25,587.33,1.5,.065)}playBgmKotoPluck(t,e=1.5,i=.1){const n=this.ctx;if(!n)return;const a=n.currentTime,o=n.createOscillator(),s=n.createOscillator(),r=n.createBiquadFilter(),l=n.createGain();o.type="triangle",s.type="sine",o.frequency.setValueAtTime(t*1.007,a),o.frequency.exponentialRampToValueAtTime(t,a+.03),s.frequency.setValueAtTime(t*2,a),r.type="lowpass",r.frequency.setValueAtTime(t*4.2,a),r.frequency.exponentialRampToValueAtTime(Math.max(420,t*1.15),a+e);const h=n.createGain();h.gain.setValueAtTime(.32,a),h.gain.exponentialRampToValueAtTime(.01,a+.18),l.gain.setValueAtTime(5e-4,a),l.gain.linearRampToValueAtTime(i,a+.014),l.gain.exponentialRampToValueAtTime(8e-4,a+e),o.connect(r),s.connect(h),h.connect(r),r.connect(l),this.connectToBgmSpace(l),o.start(a),s.start(a),o.stop(a+e+.05),s.stop(a+e+.05)}playBgmShakuhachi(t,e,i=2,n=.075){const a=this.ctx;if(!a)return;const o=a.currentTime,s=a.createOscillator(),r=a.createOscillator(),l=a.createBiquadFilter(),h=a.createGain();s.type="sine",r.type="triangle",s.frequency.setValueAtTime(e||t*.96,o),s.frequency.exponentialRampToValueAtTime(t,o+.22),r.frequency.setValueAtTime((e||t*.96)*2,o),r.frequency.exponentialRampToValueAtTime(t*2,o+.22);const u=a.createOscillator(),g=a.createGain();u.frequency.setValueAtTime(4.6,o),g.gain.setValueAtTime(.1,o),g.gain.linearRampToValueAtTime(3.2,o+i*.55),u.connect(g),g.connect(s.frequency);const k=a.createGain();k.gain.setValueAtTime(.18,o),l.type="lowpass",l.frequency.setValueAtTime(1400,o),h.gain.setValueAtTime(5e-4,o),h.gain.linearRampToValueAtTime(n,o+.35),h.gain.setValueAtTime(n*.9,o+i*.65),h.gain.exponentialRampToValueAtTime(5e-4,o+i),s.connect(l),r.connect(k),k.connect(l),l.connect(h),this.connectToBgmSpace(h),s.start(o),r.start(o),u.start(o),s.stop(o+i+.05),r.stop(o+i+.05),u.stop(o+i+.05)}playBgmWarmPad(t,e=3.4,i=.08){const n=this.ctx;if(!n)return;const a=n.currentTime,o=n.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(580,a);const s=n.createGain(),r=i/Math.max(1,t.length*.65);s.gain.setValueAtTime(5e-4,a),s.gain.linearRampToValueAtTime(r,a+.9),s.gain.setValueAtTime(r*.85,a+e*.6),s.gain.exponentialRampToValueAtTime(5e-4,a+e),o.connect(s),this.connectToBgmSpace(s),t.forEach((l,h)=>{const u=n.createOscillator();u.type=h%2===0?"sine":"triangle",u.frequency.setValueAtTime(l*(1+(h-1.5)*.0015),a),u.connect(o),u.start(a),u.stop(a+e+.08)})}playBgmFurinChime(t=1174.66,e=.032){const i=this.ctx;if(!i)return;const n=i.currentTime,a=i.createOscillator(),o=i.createOscillator(),s=i.createGain();a.type="sine",o.type="sine",a.frequency.setValueAtTime(t,n),o.frequency.setValueAtTime(t*2.41,n);const r=i.createGain();r.gain.setValueAtTime(.25,n),s.gain.setValueAtTime(5e-4,n),s.gain.linearRampToValueAtTime(e,n+.01),s.gain.exponentialRampToValueAtTime(4e-4,n+1.4),a.connect(s),o.connect(r),r.connect(s),this.connectToBgmSpace(s),a.start(n),o.start(n),a.stop(n+1.45),o.stop(n+1.45)}playBgmBambooTap(t=.05){const e=this.ctx;if(!e)return;const i=e.currentTime,n=e.createOscillator(),a=e.createGain();n.type="triangle",n.frequency.setValueAtTime(680,i),n.frequency.exponentialRampToValueAtTime(420,i+.065),a.gain.setValueAtTime(t,i),a.gain.exponentialRampToValueAtTime(5e-4,i+.075),n.connect(a),this.connectToBgmSpace(a),n.start(i),n.stop(i+.08)}playBgmLofiKick(t=.12){const e=this.ctx;if(!e)return;const i=e.currentTime,n=e.createOscillator(),a=e.createGain();n.type="sine",n.frequency.setValueAtTime(105,i),n.frequency.exponentialRampToValueAtTime(44,i+.14),a.gain.setValueAtTime(t,i),a.gain.exponentialRampToValueAtTime(.001,i+.18),n.connect(a),a.connect(this.bgmMasterGain),n.start(i),n.stop(i+.19)}playBgmLofiBrush(t=.03){const e=this.ctx;if(!e)return;const i=e.currentTime,n=Math.floor(e.sampleRate*.05),a=e.createBuffer(1,n,e.sampleRate),o=a.getChannelData(0);for(let h=0;h<n;h++)o[h]=(Math.random()*2-1)*Math.exp(-h/(n*.35));const s=e.createBufferSource();s.buffer=a;const r=e.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(3200,i);const l=e.createGain();l.gain.setValueAtTime(t,i),l.gain.exponentialRampToValueAtTime(.001,i+.05),s.connect(r),r.connect(l),l.connect(this.bgmMasterGain),s.start(i)}playCardHover(){const t=this.sfxContext();if(!t)return;this.bgmEnabled&&!this.bgmPlaying&&this.startBgm();const e=t.currentTime,i=t.createOscillator(),n=t.createGain();i.type="sine",i.frequency.setValueAtTime(520,e),i.frequency.exponentialRampToValueAtTime(680,e+.045),n.gain.setValueAtTime(.025,e),n.gain.exponentialRampToValueAtTime(.001,e+.045),i.connect(n),n.connect(t.destination),i.start(e),i.stop(e+.05)}playCardSnap(t=!1){const e=this.sfxContext();if(!e)return;this.bgmEnabled&&!this.bgmPlaying&&this.startBgm();const i=e.currentTime,n=e.sampleRate*.06,a=e.createBuffer(1,n,e.sampleRate),o=a.getChannelData(0);for(let g=0;g<n;g++)o[g]=(Math.random()*2-1)*Math.exp(-g/(n*.25));const s=e.createBufferSource();s.buffer=a;const r=e.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(1400,i);const l=e.createGain();l.gain.setValueAtTime(.28,i),l.gain.exponentialRampToValueAtTime(.005,i+.06),s.connect(r),r.connect(l),l.connect(e.destination),s.start(i);const h=e.createOscillator(),u=e.createGain();h.type="triangle",h.frequency.setValueAtTime(190,i),h.frequency.exponentialRampToValueAtTime(58,i+.08),u.gain.setValueAtTime(.25,i),u.gain.exponentialRampToValueAtTime(.001,i+.085),h.connect(u),u.connect(e.destination),h.start(i),h.stop(i+.09),t&&(this.playKotoNote(587.33,.05,.35),this.playKotoNote(880,.12,.45))}playKotoNote(t=440,e=0,i=.55,n=.14){const a=this.sfxContext();if(!a)return;const o=a.currentTime+e,s=a.createOscillator(),r=a.createOscillator(),l=a.createGain();s.type="triangle",r.type="sine",s.frequency.setValueAtTime(t,o),r.frequency.setValueAtTime(t*2,o),l.gain.setValueAtTime(.001,o),l.gain.linearRampToValueAtTime(n,o+.012),l.gain.exponentialRampToValueAtTime(8e-4,o+i),s.connect(l),r.connect(l),l.connect(a.destination),s.start(o),r.start(o),s.stop(o+i+.02),r.stop(o+i+.02)}playKoiKoiFanfare(){const t=this.sfxContext();if(!t)return;const e=t.currentTime;[0,.16].forEach(a=>{const o=t.createOscillator(),s=t.createGain();o.type="square",o.frequency.setValueAtTime(2250,e+a),o.frequency.exponentialRampToValueAtTime(1650,e+a+.09),s.gain.setValueAtTime(.16,e+a),s.gain.exponentialRampToValueAtTime(.001,e+a+.1),o.connect(s),s.connect(t.destination),o.start(e+a),o.stop(e+a+.11)});const i=t.createOscillator(),n=t.createGain();i.type="sine",i.frequency.setValueAtTime(135,e+.02),i.frequency.exponentialRampToValueAtTime(42,e+.45),n.gain.setValueAtTime(.35,e+.02),n.gain.exponentialRampToValueAtTime(.001,e+.48),i.connect(n),n.connect(t.destination),i.start(e+.02),i.stop(e+.5),[293.66,392,440,587.33,783.99].forEach((a,o)=>{this.playKotoNote(a,.18+o*.055,.5,.12)})}playShobuVictory(){[392,440,587.33,659.25,880,1174.66].forEach((e,i)=>{this.playKotoNote(e,i*.075,.75,.15)})}playGachaReveal(t=!1){(t?[440,523.25,659.25,783.99,880,1046.5,1318.5]:[392,440,587.33,659.25,783.99]).forEach((i,n)=>{this.playKotoNote(i,n*.065,.6,.14)})}speakCharacterLine(t,e){if(!this.sfxEnabled||!e)return;const i=this.sfxContext(),n=t&&t.voiceProfile||{pitch:1.1,rate:1,baseFreq:440};if(i){const a=n.baseFreq||440;this.playKotoNote(a,0,.28,.11),this.playKotoNote(a*1.25,.09,.34,.12),this.playKotoNote(a*1.5,.18,.42,.1)}if(typeof window<"u"&&"speechSynthesis"in window)try{window.speechSynthesis.cancel();const a=window.speechSynthesis.getVoices()||[],o=a.find(l=>l.lang&&l.lang.toLowerCase().startsWith("ja")),s=a.find(l=>l.lang&&l.lang.toLowerCase().startsWith("vi")),r=new SpeechSynthesisUtterance(o?e.jp:s?e.vi:e.jp);o?(r.voice=o,r.lang="ja-JP"):s?(r.voice=s,r.lang="vi-VN"):r.lang="ja-JP",r.pitch=n.pitch||1.1,r.rate=n.rate||1,r.volume=.9,window.speechSynthesis.speak(r)}catch{}}}const m=new Pt;class Lt{constructor(){this.totalRounds=3,this.currentRound=1,this.playerScore=0,this.aiScore=0,this.dealer="player",this.deck=[],this.field=[],this.fieldSlots=Array(12).fill(null),this.lastFieldRelocations=[],this.lastRow3Opened=!1,this.lastRow3Closed=!1,this.playerHand=[],this.aiHand=[],this.playerCaptured=[],this.aiCaptured=[],this.playerLastYakuSig="",this.aiLastYakuSig="",this.playerCalledKoiKoi=!1,this.aiCalledKoiKoi=!1,this.phase="PLAYER_HAND",this.pendingCard=null,this.matchingFieldCandidates=[],this.drawnCard=null,this.pendingYakuEvaluation=null}startNewMatch(t=3){this.totalRounds=t,this.currentRound=1,this.playerScore=0,this.aiScore=0,this.dealer="player",this.startRound()}startRound(){let t=!1;for(;!t;){const e=[...H].sort(()=>Math.random()-.5);this.playerHand=e.slice(0,8).sort((s,r)=>s.month-r.month||r.points-s.points),this.aiHand=e.slice(8,16),this.field=e.slice(16,24),this.deck=e.slice(24);const i={};for(const s of this.field)i[s.month]=(i[s.month]||0)+1;const n=Object.values(i).includes(4),a=at(this.playerHand),o=at(this.aiHand);!n&&!a&&!o&&(t=!0)}this.fieldSlots=Array(12).fill(null);for(let e=0;e<8;e++)this.fieldSlots[e]=this.field[e]||null;this.lastFieldRelocations=[],this.lastRow3Opened=!1,this.lastRow3Closed=!1,this.syncFieldFromSlots(),this.playerCaptured=[],this.aiCaptured=[],this.playerLastYakuSig="",this.aiLastYakuSig="",this.playerCalledKoiKoi=!1,this.aiCalledKoiKoi=!1,this.pendingCard=null,this.drawnCard=null,this.matchingFieldCandidates=[],this.pendingYakuEvaluation=null,this.phase=this.dealer==="player"?"PLAYER_HAND":"AI_TURN"}syncFieldFromSlots(){if(!Array.isArray(this.fieldSlots)||this.fieldSlots.length<12){const t=[...this.field||[]];this.fieldSlots=Array(Math.max(12,t.length)).fill(null),t.forEach((e,i)=>{this.fieldSlots[i]=e})}this.field=this.fieldSlots.filter(Boolean)}hasFieldRow3(){return this.fieldSlots.slice(8).some(t=>t!==null)}placeCardInNearestEmptySlot(t){const e=this.hasFieldRow3();this.lastFieldRelocations=[];let i=this.fieldSlots.findIndex(a=>a===null);i===-1?(i=this.fieldSlots.length,this.fieldSlots.push(t)):this.fieldSlots[i]=t,this.syncFieldFromSlots();const n=this.hasFieldRow3();return this.lastRow3Opened=!e&&n,this.lastRow3Closed=!1,i}removeCardsFromFieldSlots(t){const e=this.hasFieldRow3(),i=new Set(t);for(let s=0;s<this.fieldSlots.length;s++)this.fieldSlots[s]&&i.has(this.fieldSlots[s].id)&&(this.fieldSlots[s]=null);const n=[];for(let s=0;s<8;s++)if(this.fieldSlots[s]===null){const r=this.fieldSlots.findIndex((l,h)=>h>=8&&l!==null);if(r!==-1){const l=this.fieldSlots[r];this.fieldSlots[s]=l,this.fieldSlots[r]=null,n.push({card:l,fromSlot:r,toSlot:s})}}let a=8;for(let s=8;s<this.fieldSlots.length;s++){const r=this.fieldSlots[s];r!==null&&(s!==a&&(this.fieldSlots[a]=r,this.fieldSlots[s]=null,n.push({card:r,fromSlot:s,toSlot:a})),a++)}this.fieldSlots.length>12&&(this.fieldSlots.length=Math.max(12,a)),this.syncFieldFromSlots();const o=this.hasFieldRow3();return this.lastFieldRelocations=n,this.lastRow3Opened=!1,this.lastRow3Closed=e&&!o,n}getFieldMatches(t){return t?this.field.filter(e=>e.month===t.month):[]}playHandCard(t,e=null){if(this.phase!=="PLAYER_HAND"&&this.phase!=="PLAYER_SELECT_FIELD_HAND")return{error:"Not in player hand phase"};const i=this.playerHand.findIndex(s=>s.id===t);if(i===-1)return{error:"Card not in hand"};const n=this.playerHand[i],a=this.getFieldMatches(n);if(this.phase==="PLAYER_SELECT_FIELD_HAND"&&this.pendingCard?.id===n.id&&!e&&a.length===2&&(e=[...a].sort((r,l)=>l.points-r.points)[0].id),a.length===2&&!e)return this.pendingCard=n,this.matchingFieldCandidates=a,this.phase="PLAYER_SELECT_FIELD_HAND",{status:"NEEDS_FIELD_SELECTION",card:n,candidates:a};this.playerHand.splice(i,1),this.pendingCard=null,this.matchingFieldCandidates=[],this.phase="PLAYER_DRAWING";const o=this.resolveCardPlacement("player",n,a,e);return{status:"HAND_STEP_DONE",card:n,captured:o,relocations:this.lastFieldRelocations,row3Opened:this.lastRow3Opened,row3Closed:this.lastRow3Closed}}resolveCardPlacement(t,e,i,n=null){const a=t==="player"?this.playerCaptured:this.aiCaptured;let o=[];if(i.length===0)this.placeCardInNearestEmptySlot(e);else if(i.length===1){const s=i[0];this.removeCardsFromFieldSlots([s.id]),o=[e,s],a.push(...o)}else if(i.length===3)this.removeCardsFromFieldSlots(i.map(s=>s.id)),o=[e,...i],a.push(...o);else if(i.length>=2){const s=i.find(r=>r.id===n)||[...i].sort((r,l)=>l.points-r.points)[0];this.removeCardsFromFieldSlots([s.id]),o=[e,s],a.push(...o)}return o}drawStepForPlayer(){if(this.deck.length===0){const a=this.checkPostTurnYaku("player");return{status:"DRAW_COMPLETE",drawnCard:null,captured:[],yakuCheck:a}}const t=this.deck.shift();this.drawnCard=t;const e=this.getFieldMatches(t);if(e.length===2)return this.pendingCard=t,this.matchingFieldCandidates=e,this.phase="PLAYER_SELECT_FIELD_DRAW",{status:"DRAW_NEEDS_SELECTION",drawnCard:t,candidates:e};const i=this.resolveCardPlacement("player",t,e);this.drawnCard=null;const n=this.checkPostTurnYaku("player");return{status:"DRAW_COMPLETE",drawnCard:t,captured:i,yakuCheck:n}}selectFieldForDrawnCard(t){if(this.phase!=="PLAYER_SELECT_FIELD_DRAW"||!this.pendingCard)return{error:"Not waiting for drawn card selection"};const e=this.pendingCard,i=this.getFieldMatches(e),n=this.resolveCardPlacement("player",e,i,t);this.pendingCard=null,this.drawnCard=null,this.matchingFieldCandidates=[];const a=this.checkPostTurnYaku("player");return{status:"DRAW_COMPLETE",drawnCard:e,captured:n,yakuCheck:a}}checkPostTurnYaku(t){const e=t==="player"?this.playerCaptured:this.aiCaptured,i=t==="player"?this.playerLastYakuSig:this.aiLastYakuSig,n=t==="player"?this.playerHand.length:this.aiHand.length,a=K(e,this.currentRound);if(a.yakus.length>0&&a.signature!==i)if(this.pendingYakuEvaluation=a,t==="player"){if(this.playerLastYakuSig=a.signature,n===0){const o=this.declareShobu("player",a);return{newYaku:!0,autoShobu:!0,evalResult:a,outcome:o,prevSignature:i}}return this.phase="PLAYER_KOIKOI_DECISION",{newYaku:!0,autoShobu:!1,evalResult:a,prevSignature:i}}else return this.aiLastYakuSig=a.signature,{newYaku:!0,evalResult:a,prevSignature:i};return this.playerHand.length===0&&this.aiHand.length===0?{newYaku:!1,roundDraw:!0,outcome:this.finishRound("draw",[],0,1)}:(this.phase=t==="player"?"AI_TURN":"PLAYER_HAND",{newYaku:!1})}declareKoiKoi(t){if(t==="player"){if(this.playerCalledKoiKoi=!0,this.playerHand.length===0&&this.aiHand.length===0)return this.finishRound("draw",[],0,1);this.phase="AI_TURN"}else{if(this.aiCalledKoiKoi=!0,this.playerHand.length===0&&this.aiHand.length===0)return this.finishRound("draw",[],0,1);this.phase="PLAYER_HAND"}return{status:"KOIKOI_DECLARED",actor:t}}declareShobu(t,e=null){const i=t==="player"?this.playerCaptured:this.aiCaptured,n=e||K(i,this.currentRound);let a=1;const o=[];n.totalBasePoints>=7&&(a*=2,o.push("Điểm Yaku ≥ 7 (×2)")),(t==="player"?this.aiCalledKoiKoi:this.playerCalledKoiKoi)&&(a*=2,o.push("Phản đòn Koi-Koi của đối thủ (×2)"));const r=n.totalBasePoints*a;return this.finishRound(t,n.yakus,r,a,o)}finishRound(t,e,i,n=1,a=[]){t==="player"?(this.playerScore+=i,this.dealer="player"):t==="ai"&&(this.aiScore+=i,this.dealer="ai");const o=this.currentRound>=this.totalRounds;return this.phase=o?"MATCH_OVER":"ROUND_OVER",{winner:t,yakus:e,finalPoints:i,multiplier:n,multiplierReasons:a,round:this.currentRound,totalRounds:this.totalRounds,playerScore:this.playerScore,aiScore:this.aiScore,isMatchComplete:o}}nextRound(){return this.currentRound<this.totalRounds?(this.currentRound+=1,this.startRound(),!0):!1}computeBestAiMove(t){const e=t?.skillLevel??.6,i=t?.defenseWeight??.5,n=new Set(t?.favoriteTags||[]);let a=[];for(const o of this.aiHand){const s=this.getFieldMatches(o);if(s.length===0)a.push({handCard:o,fieldTarget:null,score:this.evaluateDiscardSafety(o)});else for(const r of s){const l=this.evaluateCaptureValue(o,r,e,i,n);a.push({handCard:o,fieldTarget:r,score:l})}}return a.sort((o,s)=>s.score-o.score),a.length>1&&Math.random()>e+.15?a[1]:a[0]}evaluateCaptureValue(t,e,i,n,a){let o=10+t.points+e.points;const s=[t,e];for(const h of s){h.id===33&&(o+=45),(h.id===9||h.id===29)&&(o+=32),h.type==="hikari"&&(o+=28),h.tags.includes("inoshikacho")&&(o+=20),(h.tags.includes("akatan")||h.tags.includes("aotan"))&&(o+=18);for(const u of h.tags)a.has(u)&&(o+=10)}const r=[...this.aiCaptured,t,e],l=K(r,this.currentRound);if(l.signature!==this.aiLastYakuSig&&l.totalBasePoints>0&&(o+=75+l.totalBasePoints*12),i>=.5){const h=[...this.playerCaptured,e],u=K(h,this.currentRound);u.signature!==this.playerLastYakuSig&&u.totalBasePoints>0&&(o+=65*n);const g=new Set(this.playerCaptured.map(k=>k.id));g.has(33)&&(e.id===9||e.id===29)&&(o+=80*n),(g.has(9)||g.has(29))&&e.id===33&&(o+=85*n)}return o}evaluateDiscardSafety(t){let e=-t.points*1.5;return t.id===33&&(e-=40),t.type==="hikari"&&(e-=30),e}shouldAiCallKoiKoi(t,e){if(this.aiHand.length===0||this.playerCalledKoiKoi&&e.totalBasePoints>=3||e.totalBasePoints>=7||K(this.playerCaptured,this.currentRound).totalBasePoints>0)return!1;const n=t?.koiKoiGreed??.35,a=this.aiHand.length>=4?.2:-.15;return Math.random()<n+a}exportCanonicalState(t="host",e=null){const i=t==="host";let n=i?"p1":"p2",a="HAND";this.phase==="ROUND_OVER"||this.phase==="MATCH_OVER"?(n=null,a=this.phase):this.phase==="AI_TURN"?(n=i?"p2":"p1",a="HAND"):this.phase==="PLAYER_KOIKOI_DECISION"&&(n=i?"p1":"p2",a="KOIKOI_DECISION");const o=this.dealer==="player"?i?"p1":"p2":i?"p2":"p1";let s=null;if(e){let r="draw";e.winner==="player"?r=i?"p1":"p2":e.winner==="ai"&&(r=i?"p2":"p1"),s={...e,winnerRole:r,p1Score:i?this.playerScore:this.aiScore,p2Score:i?this.aiScore:this.playerScore}}return{totalRounds:this.totalRounds,currentRound:this.currentRound,dealerRole:o,activeTurn:n,subPhase:a,deck:this.deck,field:this.field,fieldSlots:this.fieldSlots,p1Hand:i?this.playerHand:this.aiHand,p2Hand:i?this.aiHand:this.playerHand,p1Captured:i?this.playerCaptured:this.aiCaptured,p2Captured:i?this.aiCaptured:this.playerCaptured,p1Score:i?this.playerScore:this.aiScore,p2Score:i?this.aiScore:this.playerScore,p1LastYakuSig:i?this.playerLastYakuSig:this.aiLastYakuSig,p2LastYakuSig:i?this.aiLastYakuSig:this.playerLastYakuSig,p1CalledKoiKoi:i?this.playerCalledKoiKoi:this.aiCalledKoiKoi,p2CalledKoiKoi:i?this.aiCalledKoiKoi:this.playerCalledKoiKoi,roundSummary:s}}importCanonicalState(t,e="host"){if(!t)return null;const i=e==="host",n=i?"p1":"p2";if(this.totalRounds=t.totalRounds||3,this.currentRound=t.currentRound||1,this.deck=[...t.deck||[]],this.field=[...t.field||[]],Array.isArray(t.fieldSlots)&&t.fieldSlots.length>=8){for(this.fieldSlots=[...t.fieldSlots];this.fieldSlots.length<12;)this.fieldSlots.push(null);this.syncFieldFromSlots()}else this.fieldSlots=Array(Math.max(12,this.field.length)).fill(null),this.field.forEach((s,r)=>{this.fieldSlots[r]=s}),this.syncFieldFromSlots();const a=i?t.p1Hand:t.p2Hand,o=i?t.p2Hand:t.p1Hand;if(this.playerHand=[...a||[]].sort((s,r)=>s.month-r.month||r.points-s.points),this.aiHand=[...o||[]],this.playerCaptured=[...(i?t.p1Captured:t.p2Captured)||[]],this.aiCaptured=[...(i?t.p2Captured:t.p1Captured)||[]],this.playerScore=(i?t.p1Score:t.p2Score)||0,this.aiScore=(i?t.p2Score:t.p1Score)||0,this.playerLastYakuSig=(i?t.p1LastYakuSig:t.p2LastYakuSig)||"",this.aiLastYakuSig=(i?t.p2LastYakuSig:t.p1LastYakuSig)||"",this.playerCalledKoiKoi=!!(i?t.p1CalledKoiKoi:t.p2CalledKoiKoi),this.aiCalledKoiKoi=!!(i?t.p2CalledKoiKoi:t.p1CalledKoiKoi),this.dealer=t.dealerRole===n?"player":"ai",this.pendingCard=null,this.matchingFieldCandidates=[],this.drawnCard=null,t.subPhase==="ROUND_OVER"||t.subPhase==="MATCH_OVER"?this.phase=t.subPhase:t.activeTurn===n?this.phase=t.subPhase==="KOIKOI_DECISION"?"PLAYER_KOIKOI_DECISION":"PLAYER_HAND":this.phase="AI_TURN",t.roundSummary){let s="draw";return t.roundSummary.winnerRole===n?s="player":t.roundSummary.winnerRole&&t.roundSummary.winnerRole!=="draw"&&(s="ai"),{...t.roundSummary,winner:s,playerScore:this.playerScore,aiScore:this.aiScore}}return null}}const ht="hanakoi_local_rooms_db_v1",Yt="hanakoi_local_pvp_queue_v1",ct="hanakoi_tab_player_id_v1",Z="hanakoi_tab_player_name_v1";class Bt{constructor(){this.playerId=this.initTabPlayerId(),this.playerName=this.initTabPlayerName(),this.roomCode=null,this.role=null,this.roomMode=null,this.roomStatus="idle",this.opponentName="Đối Thủ Online",this.lastVersion=0,this.onRoomMatched=null,this.onStateReceived=null,this.onEmoteReceived=null,this.pollTimer=null,this.matchmakingTimer=null,this.channel=null,this.initBroadcastChannel()}initTabPlayerId(){try{let t=sessionStorage.getItem(ct);if(!t){const e=Math.floor(1e3+Math.random()*9e3);t=`p_${Date.now().toString(36)}_${e}`,sessionStorage.setItem(ct,t)}return t}catch{return`p_${Math.floor(1e5+Math.random()*9e5)}`}}initTabPlayerName(){try{let t=sessionStorage.getItem(Z);return t||(t=`Kỳ Thủ #${this.playerId.slice(-4).toUpperCase()}`,sessionStorage.setItem(Z,t)),t}catch{return"Kỳ Thủ Online"}}setPlayerName(t){const e=(t||"").trim().slice(0,24);if(e){this.playerName=e;try{sessionStorage.setItem(Z,e)}catch{}}}initBroadcastChannel(){try{typeof BroadcastChannel<"u"&&(this.channel=new BroadcastChannel("hanakoi_25d_multiplayer_v1"),this.channel.onmessage=t=>{t.origin&&t.origin!==window.location.origin||this.handleIncomingMessage(t.data)})}catch{}window.addEventListener("storage",t=>{if(t.key==="hanakoi_25d_net_event"&&t.newValue)try{const e=JSON.parse(t.newValue);this.handleIncomingMessage(e)}catch{}})}broadcastMessage(t){const e={...t,senderId:this.playerId,ts:Date.now()};try{this.channel&&this.channel.postMessage(e)}catch{}try{localStorage.setItem("hanakoi_25d_net_event",JSON.stringify(e))}catch{}}handleIncomingMessage(t){if(!(!t||t.senderId===this.playerId)){if(t.type==="PVP_LOOKING"&&this.roomStatus==="searching"){const e=this.playerId<t.senderId,i=t.proposedRoomCode||`PVP${Math.floor(1e3+Math.random()*9e3)}`;e?(this.roomCode=i,this.role="host",this.roomMode="pvp",this.roomStatus="playing",this.opponentName=t.playerName||"Kỳ Thủ Đối Phương",this.stopMatchmakingLoop(),this.broadcastMessage({type:"PVP_MATCH_CONFIRMED",roomCode:i,hostId:this.playerId,hostName:this.playerName,guestId:t.senderId,guestName:this.opponentName}),this.onRoomMatched&&this.onRoomMatched({roomCode:i,role:"host",mode:"pvp",opponentName:this.opponentName}),this.startRoomPolling()):this.broadcastMessage({type:"PVP_LOOKING",playerName:this.playerName,proposedRoomCode:i});return}if(t.type==="PVP_MATCH_CONFIRMED"&&this.roomStatus==="searching"&&t.guestId===this.playerId){this.roomCode=t.roomCode,this.role="guest",this.roomMode="pvp",this.roomStatus="playing",this.opponentName=t.hostName||"Kỳ Thủ Chủ Phòng",this.stopMatchmakingLoop(),this.onRoomMatched&&this.onRoomMatched({roomCode:this.roomCode,role:"guest",mode:"pvp",opponentName:this.opponentName}),this.startRoomPolling();return}if(t.type==="ROOM_GUEST_JOINED"&&this.roomCode&&t.roomCode===this.roomCode&&this.role==="host"){this.roomStatus="playing",this.opponentName=t.guestName||"Kỳ Thủ Khách",this.onRoomMatched&&this.onRoomMatched({roomCode:this.roomCode,role:"host",mode:this.roomMode||"custom",opponentName:this.opponentName,guestJustJoined:!0});return}if(t.type==="ROOM_STATE_SYNC"&&this.roomCode&&t.roomCode===this.roomCode){if(t.version&&t.version<=this.lastVersion)return;this.lastVersion=t.version||this.lastVersion+1,t.hostName&&this.role==="guest"&&(this.opponentName=t.hostName),t.guestName&&this.role==="host"&&(this.opponentName=t.guestName),this.onStateReceived&&t.gameState&&this.onStateReceived(t.gameState,t.lastAction||null);return}t.type==="ROOM_EMOTE"&&this.roomCode&&t.roomCode===this.roomCode&&this.onEmoteReceived&&t.lineObj&&this.onEmoteReceived(t.lineObj,t.senderName)}}readLocalRooms(){try{return JSON.parse(localStorage.getItem(ht)||"{}")}catch{return{}}}writeLocalRoom(t,e){try{const i=this.readLocalRooms();i[t]=e,localStorage.setItem(ht,JSON.stringify(i))}catch{}}async startMatchmaking(){this.leaveCurrentRoom(),this.roomStatus="searching",this.roomMode="pvp";const t=`PVP${Math.floor(1e3+Math.random()*9e3)}`;this.broadcastMessage({type:"PVP_LOOKING",playerName:this.playerName,proposedRoomCode:t});try{const e=await fetch("/api/matchmaking/join",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:this.playerId,playerName:this.playerName})});if(e.ok){const i=await e.json();if(i.status==="matched"&&i.room)return this.handleServerMatched(i.room,i.role),i}}catch{}return this.stopMatchmakingLoop(),this.matchmakingTimer=setInterval(async()=>{if(this.roomStatus!=="searching"){this.stopMatchmakingLoop();return}this.broadcastMessage({type:"PVP_LOOKING",playerName:this.playerName,proposedRoomCode:t});try{const e=await fetch("/api/matchmaking/poll",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:this.playerId})});if(e.ok){const i=await e.json();i.status==="matched"&&i.room&&this.roomStatus==="searching"&&this.handleServerMatched(i.room,i.role)}}catch{}},1e3),{status:"searching"}}handleServerMatched(t,e){this.roomStatus==="playing"&&this.roomCode===t.roomCode||(this.stopMatchmakingLoop(),this.roomCode=t.roomCode,this.role=e,this.roomMode=t.mode||"pvp",this.roomStatus="playing",this.opponentName=e==="host"?t.guestName||"Kỳ Thủ Đối Phương":t.hostName||"Kỳ Thủ Chủ Phòng",this.onRoomMatched&&this.onRoomMatched({roomCode:this.roomCode,role:this.role,mode:this.roomMode,opponentName:this.opponentName,initialGameState:t.gameState||null}),this.startRoomPolling())}stopMatchmakingLoop(){this.matchmakingTimer&&(clearInterval(this.matchmakingTimer),this.matchmakingTimer=null)}async cancelMatchmaking(){this.stopMatchmakingLoop(),this.roomStatus==="searching"&&(this.roomStatus="idle");try{await fetch("/api/matchmaking/leave",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:this.playerId})})}catch{}}async createCustomRoom(t="",e=null){this.leaveCurrentRoom();const i=(t||"").trim().toUpperCase()||String(Math.floor(1e3+Math.random()*9e3));this.roomCode=i,this.role="host",this.roomMode="custom",this.roomStatus="waiting",this.lastVersion=1;const n={roomCode:i,mode:"custom",status:"waiting",hostId:this.playerId,hostName:this.playerName,guestId:null,guestName:null,version:1,gameState:e,updatedAt:Date.now()};this.writeLocalRoom(i,n);try{const a=await fetch("/api/rooms/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hostId:this.playerId,hostName:this.playerName,roomCode:i,mode:"custom",gameState:e})});if(a.ok){const o=await a.json();o.room&&(this.roomCode=o.room.roomCode,this.writeLocalRoom(this.roomCode,o.room))}}catch{}return this.startRoomPolling(),{roomCode:this.roomCode,role:"host"}}async joinCustomRoom(t){const e=(t||"").trim().toUpperCase();if(!e)return{error:"Vui lòng nhập mã số phòng (VD: 6868)!"};this.leaveCurrentRoom();let i=null,n="guest";try{const a=await fetch("/api/rooms/join",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({roomCode:e,guestId:this.playerId,guestName:this.playerName})});if(a.ok){const o=await a.json();i=o.room,n=o.role||"guest"}}catch{}if(!i){const a=this.readLocalRooms();if(a[e])i=a[e],i.guestId=this.playerId,i.guestName=this.playerName,i.status="playing",i.version=(i.version||1)+1,this.writeLocalRoom(e,i);else return{error:`Không tìm thấy phòng mã [${e}]. Hãy tạo phòng ở Tab 1 trước rồi nhập mã này ở Tab 2!`}}return this.roomCode=e,this.role=n,this.roomMode=i.mode||"custom",this.roomStatus="playing",this.opponentName=n==="host"?i.guestName||"Kỳ Thủ 2":i.hostName||"Kỳ Thủ 1",this.lastVersion=i.version||1,this.broadcastMessage({type:"ROOM_GUEST_JOINED",roomCode:e,guestId:this.playerId,guestName:this.playerName}),this.onRoomMatched&&this.onRoomMatched({roomCode:e,role:this.role,mode:this.roomMode,opponentName:this.opponentName,initialGameState:i.gameState||null}),this.startRoomPolling(),{status:"ok",room:i,role:this.role}}async syncRoomState(t,e=null){if(!this.roomCode)return;this.lastVersion=(this.lastVersion||1)+1,this.broadcastMessage({type:"ROOM_STATE_SYNC",roomCode:this.roomCode,version:this.lastVersion,hostName:this.role==="host"?this.playerName:void 0,guestName:this.role==="guest"?this.playerName:void 0,gameState:t,lastAction:e});const n=this.readLocalRooms()[this.roomCode]||{roomCode:this.roomCode};n.gameState=t,n.lastAction=e,n.version=this.lastVersion,n.status="playing",this.writeLocalRoom(this.roomCode,n);try{await fetch(`/api/rooms/${encodeURIComponent(this.roomCode)}/state`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actorId:this.playerId,gameState:t,lastAction:e,status:"playing"})})}catch{}}sendEmote(t){this.roomCode&&this.broadcastMessage({type:"ROOM_EMOTE",roomCode:this.roomCode,senderName:this.playerName,lineObj:t})}startRoomPolling(){this.stopRoomPolling(),this.pollTimer=setInterval(async()=>{if(!this.roomCode){this.stopRoomPolling();return}try{const t=await fetch(`/api/rooms/${encodeURIComponent(this.roomCode)}`);if(!t.ok)return;const i=(await t.json()).room;if(!i)return;this.role==="host"&&this.roomStatus==="waiting"&&i.status==="playing"&&i.guestId&&(this.roomStatus="playing",this.opponentName=i.guestName||"Kỳ Thủ Khách",this.onRoomMatched&&this.onRoomMatched({roomCode:this.roomCode,role:"host",mode:this.roomMode,opponentName:this.opponentName,guestJustJoined:!0})),i.version&&i.version>this.lastVersion&&i.gameState&&(this.lastVersion=i.version,this.onStateReceived&&this.onStateReceived(i.gameState,i.lastAction||null))}catch{}},950)}stopRoomPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}leaveCurrentRoom(){this.stopMatchmakingLoop(),this.stopRoomPolling(),this.roomCode=null,this.role=null,this.roomStatus="idle",this.lastVersion=0}async fetchHealthStatus(){try{const e=await fetch("/api/health",{headers:{Accept:"application/json"}});if(e.ok)return await e.json()}catch{}const t=Object.keys(this.readLocalRooms()).length;return{status:"ok",httpCode:200,service:"HANA-KOI 2.5D (Local JSON Storage Fallback)",timestamp:new Date().toISOString(),activeStorageMode:"local_json_fallback",envVars:{REDIS_URL:null,MONGO_URL:null,POSTGRES_URL:null,MYSQL_URL:null},databases:{redis:{name:"Redis",envVar:"REDIS_URL",configured:!1,connected:!1,status:"fallback_json",detail:"Chưa cấu hình REDIS_URL — Tự động lưu tạm vào JSON"},mongodb:{name:"MongoDB",envVar:"MONGO_URL",configured:!1,connected:!1,status:"fallback_json",detail:"Chưa cấu hình MONGO_URL — Tự động lưu tạm vào JSON"},postgresql:{name:"PostgreSQL",envVar:"POSTGRES_URL",configured:!1,connected:!1,status:"fallback_json",detail:"Chưa cấu hình POSTGRES_URL — Tự động lưu tạm vào JSON"},mysql:{name:"MySQL",envVar:"MYSQL_URL",configured:!1,connected:!1,status:"fallback_json",detail:"Chưa cấu hình MYSQL_URL — Tự động lưu tạm vào JSON"}},jsonFallback:{enabled:!0,filePath:"data/local_db.json",exists:!0,roomsCount:t,matchesSaved:0,message:"Tự động lưu tạm vào file JSON khi chạy trên máy cá nhân chưa có DB"}}}async recordMatchResult(t){try{await fetch("/api/matches/record",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch{}}}const p=new Bt,Kt=1600,jt=900;function zt(){return window.HK_UI_SCALE||1}function Dt(){const d=document.documentElement,t=()=>{const e=window.visualViewport,i=Math.floor(e?Math.min(window.innerWidth,e.width):window.innerWidth),n=Math.floor(e?Math.min(window.innerHeight,e.height):window.innerHeight);if(!i||!n)return;const a=Math.min(1,i/Kt,n/jt);d.style.setProperty("--ui-scale",String(a)),d.style.setProperty("--app-w",`${i/a}px`),d.style.setProperty("--app-h",`${n/a}px`),d.classList.toggle("hk-scaled",a<1),window.HK_UI_SCALE=a,(window.scrollX||window.scrollY)&&window.scrollTo(0,0)};if(!document.getElementById("hk-rotate-hint")){const e=document.createElement("div");e.id="hk-rotate-hint",e.setAttribute("role","alert");const i=document.createElement("div");i.className="hk-rotate-icon",i.textContent="📱";const n=document.createElement("p");n.textContent="Xoay ngang thiết bị để chơi";const a=document.createElement("span");a.textContent="横向きにしてください",e.append(i,n,a),document.body.appendChild(e)}t(),window.addEventListener("resize",t),window.addEventListener("orientationchange",()=>setTimeout(t,250)),window.visualViewport&&(window.visualViewport.addEventListener("resize",t),window.visualViewport.addEventListener("scroll",t))}const dt="hanakoi_25d_save_v1",ut="hanakoi_theme_mode",pt="hanakoi_anim_speed";function L(d,t){if(!d)return;if(!t){d.replaceChildren();return}const e=new DOMParser().parseFromString(String(t),"text/html");e.querySelectorAll("script, iframe, object, embed").forEach(i=>i.remove()),d.replaceChildren(...Array.from(e.body.childNodes))}function tt(d,t){if(!d)return null;const e=new DOMParser().parseFromString(String(t),"text/html");e.querySelectorAll("script, iframe, object, embed").forEach(n=>n.remove());const i=e.body.firstElementChild;return i?(d.replaceWith(i),i):null}class Et{get currentDialogue(){return this._currentDialogue||""}set currentDialogue(t){this._currentDialogue=String(t||"").replace(/\s*「[^」]*」/g,"").trim(),this.dialogueHideAt=Date.now()+4500,this._dialogueTimer&&clearTimeout(this._dialogueTimer),this._dialogueTimer=setTimeout(()=>{typeof this.renderLeftPanel=="function"&&this.renderLeftPanel()},4600)}constructor(){this.saveData=this.loadSaveData(),this.darkMode=localStorage.getItem(ut)==="dark",this.animSpeedOptions=[.2,.5,.75,1,2,5];const t=Number(localStorage.getItem(pt));this.animSpeed=this.animSpeedOptions.includes(t)?t:1,v.setSpeedMultiplier(this.animSpeed),this.settingsMenuOpen=!1,this.applyThemeMode(),this.engine=new Lt,this.gameMode="pve",this.currentOpponent=j(this.saveData.selectedOpponentId||"koharu"),this.currentDialogue=this.pickRandom(this.currentOpponent.dialogues.intro),this.tableFlowerMonth=9,this.hoveredHandCardMonth=null,this.isAnimating=!1,this.activeTeasePopup=null,this.lastTeaseLineIndex=-1,this.teaseTimer=null,this.activeModal=null,this.collectionTab="backs",this.inspectedCardId=1,this.inspectorFlipped=!1,this.gachaResults=[],this.lastRoundSummary=null,this.newlyUnlockedItems=[],this.healthReport=null,this.customRoomError="",this.pendingMpMoveAction=null,this.tutorialStep=0,this.yakuRevealActive=!1,this.cameraAngles=[{label:"Góc 2.5D Chuẩn",deg:"21deg"},{label:"Góc Điện Ảnh Sâu",deg:"30deg"},{label:"Góc Nhìn Cao",deg:"8deg"}],this.cameraIndex=0,this.initDOM(),this.particles=new Mt(document.getElementById("particle-canvas")),this.particles.setMonthTheme(9),this.particles.start(),document.addEventListener("pointerdown",e=>{this.settingsMenuOpen&&!e.target.closest(".nav-settings-wrap")&&(this.settingsMenuOpen=!1,this.renderTopNav())},!0),document.addEventListener("keydown",e=>{if(this.activeModal==="tutorial"){const i=this.getTutorialSteps().length;e.key==="ArrowRight"&&this.tutorialStep<i-1?(this.tutorialStep+=1,this.renderActiveModal()):e.key==="ArrowLeft"&&this.tutorialStep>0&&(this.tutorialStep-=1,this.renderActiveModal());return}e.key==="Escape"&&this.settingsMenuOpen&&(this.settingsMenuOpen=!1,this.renderTopNav())}),this.bindMultiplayerEvents(),this.bindAutoStartAudio(),this.startMatchWithOpponent(this.currentOpponent.id,this.saveData.matchRounds||3),this.checkUrlMultiplayerParams(),this.maybeShowFirstTutorial()}rollNewTableFlowerMonth(){this.tableFlowerMonth=9,this.particles&&this.particles.setMonthTheme(9)}setAnimSpeed(t){const e=Number(t);if(this.animSpeedOptions.includes(e)){this.animSpeed=e,v.setSpeedMultiplier(e);try{localStorage.setItem(pt,String(e))}catch{}m.playCardHover(),this.renderTopNav()}}applyThemeMode(){document.body.classList.toggle("dark-mode",this.darkMode),document.documentElement.setAttribute("data-theme",this.darkMode?"dark":"light")}toggleDarkMode(){this.darkMode=!this.darkMode;try{localStorage.setItem(ut,this.darkMode?"dark":"light")}catch{}this.applyThemeMode(),m.playCardHover(),this.renderAll()}isMultiplayerMatch(){return(this.gameMode==="pvp"||this.gameMode==="custom")&&p.roomStatus==="playing"&&!!p.roomCode}getOpponentDisplayName(){return this.isMultiplayerMatch()?p.opponentName||"Đối Thủ Trực Tuyến":this.currentOpponent.name}bindMultiplayerEvents(){p.onRoomMatched=({roomCode:t,role:e,mode:i,opponentName:n,initialGameState:a,guestJustJoined:o})=>{if(this.gameMode=i||"custom",this.activeModal=null,this.customRoomError="",this.rollNewTableFlowerMonth(),m.playShobuVictory(),e==="host")if(!a||o){this.engine.startNewMatch(this.saveData.matchRounds||3);const s=this.engine.exportCanonicalState("host",null);p.syncRoomState(s,{type:"MATCH_START"})}else this.engine.importCanonicalState(a,"host");else a&&this.engine.importCanonicalState(a,"guest");this.currentDialogue=`Đã kết nối phòng #${t}! Đang đấu trực tiếp với ${n||"Kỳ Thủ Online"}!`,this.triggerAnimeCutin(n||"KỲ THỦ ONLINE",this.currentOpponent.avatar,i==="pvp"?"GHÉP TRẬN THÀNH CÔNG!":`PHÒNG #${t} BẮT ĐẦU!`,`Bạn là ${e==="host"?"Chủ Phòng (Đi Trước)":"Khách Thách Đấu"} — Chúc may mắn!`),this.renderAll()},p.onStateReceived=async(t,e)=>{if(!this.isMultiplayerMatch())return;e&&e.type==="TURN_MOVE"&&!this.isAnimating?await this.animateRemoteOpponentAction(e):e&&e.type==="CALL_KOIKOI"&&this.triggerAnimeCutin(this.getOpponentDisplayName(),this.currentOpponent.avatar,"KOI-KOI! (こいこい)",`${this.getOpponentDisplayName()} tuyên bố cược tiếp để nhân đôi điểm!`,this.currentOpponent.portrait);const i=this.engine.phase,n=this.engine.importCanonicalState(t,p.role);if(n&&(this.engine.phase==="ROUND_OVER"||this.engine.phase==="MATCH_OVER")){this.handleRoundFinished(n,!0);return}this.activeModal==="round_end"&&this.engine.phase!=="ROUND_OVER"&&(this.activeModal=null),i==="AI_TURN"&&this.engine.phase==="PLAYER_HAND"&&(m.playCardHover(),this.currentDialogue="Đến lượt của bạn! Hãy chọn 1 lá bài trên tay để đánh."),this.renderAll()},p.onEmoteReceived=(t,e)=>{this.activeTeasePopup=t,this.currentDialogue=t.vi,this.renderLeftPanel(),this.teaseTimer&&clearTimeout(this.teaseTimer),this.teaseTimer=setTimeout(()=>{this.activeTeasePopup=null,this.renderLeftPanel()},5200)}}async animateRemoteOpponentAction(t){try{this.isAnimating=!0;const e=this.saveData.equippedSkin,i=v.getRect(".ai-hand-zone .hana-card-3d:last-child"),n=this.snapshotFieldRects();if(t.handCard)if(t.capturedHand&&t.capturedHand.length>0){const a=t.capturedHand.slice(1),o=n[a[0]?.id];await v.animateCaptureSequence({actor:"ai",playedCard:t.handCard,matchedCards:a,skinId:e,fromRect:i,fieldTargetRect:o,onImpactSound:s=>m.playCardSnap(s)})}else m.playCardSnap(!1);if(t.drawnCard){const a=v.getRect("#draw-pile-stack");if(t.capturedDraw&&t.capturedDraw.length>0){const o=t.capturedDraw.slice(1),s=n[o[0]?.id];await v.animateCaptureSequence({actor:"ai",playedCard:t.drawnCard,matchedCards:o,skinId:e,fromRect:a,fieldTargetRect:s,onImpactSound:r=>m.playCardSnap(r)})}else m.playCardSnap(!1)}}catch{}finally{this.isAnimating=!1}}async checkUrlMultiplayerParams(){try{const t=new URLSearchParams(window.location.search),e=t.get("joinRoom"),i=t.get("autoPvp");e?(this.gameMode="custom",this.activeModal="custom_room",this.renderAll(),await p.joinCustomRoom(e),this.renderAll()):i==="1"&&(this.gameMode="pvp",this.activeModal="pvp_lobby",await p.startMatchmaking(),this.renderAll())}catch{}}bindAutoStartAudio(){const t=()=>{m.bgmEnabled&&(m.startBgm(),this.renderTopNav()),m.ctx&&m.ctx.state==="running"&&(window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t))};window.addEventListener("pointerdown",t,{passive:!0}),window.addEventListener("keydown",t,{passive:!0}),setTimeout(()=>{try{m.startBgm(),this.renderTopNav()}catch{}},150)}loadSaveData(){const t={coins:650,unlockedBacks:["back_urushi_red"],unlockedSkins:["skin_traditional_edo"],equippedBack:"back_urushi_red",equippedSkin:"skin_traditional_edo",defeatedOpponents:[],selectedOpponentId:"koharu",matchRounds:3,tutorialSeen:!1};try{const e=localStorage.getItem(dt);if(!e)return t;const i=JSON.parse(e);return{...t,...i,unlockedBacks:Array.from(new Set([...t.unlockedBacks,...i.unlockedBacks||[]])),unlockedSkins:Array.from(new Set([...t.unlockedSkins,...i.unlockedSkins||[]])),defeatedOpponents:Array.from(new Set(i.defeatedOpponents||[]))}}catch{return t}}persistSave(){try{localStorage.setItem(dt,JSON.stringify(this.saveData))}catch{}}pickRandom(t){return!t||t.length===0?"":t[Math.floor(Math.random()*t.length)]}initDOM(){const t=document.getElementById("app");L(t,`
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
    `)}startMatchWithOpponent(t,e=3){p.leaveCurrentRoom(),this.gameMode="pve",this.currentOpponent=j(t),this.saveData.selectedOpponentId=this.currentOpponent.id,this.saveData.matchRounds=e,this.persistSave(),this.rollNewTableFlowerMonth(),this.currentDialogue=this.pickRandom(this.currentOpponent.dialogues.intro),this.activeModal=null,this.isAnimating=!1,this.activeTeasePopup=null,this.lastTeaseLineIndex=-1,this.teaseTimer&&(clearTimeout(this.teaseTimer),this.teaseTimer=null),this.newlyUnlockedItems=[],this.engine.startNewMatch(e),this.renderAll(),this.engine.phase==="AI_TURN"&&this.scheduleAiTurn()}triggerOpponentTeaseLine(t=!1){const i=this.currentOpponent.teaseVoiceLines||[];if(i.length===0||!t&&Math.random()>.58)return;let n=(this.lastTeaseLineIndex+1)%i.length;if(!t&&i.length>1){const o=i.map((s,r)=>r).filter(s=>s!==this.lastTeaseLineIndex);n=o[Math.floor(Math.random()*o.length)]}this.lastTeaseLineIndex=n;const a=i[n];this.activeTeasePopup=a,this.currentDialogue=a.vi,this.isMultiplayerMatch()&&t&&p.sendEmote(a),this.renderLeftPanel(),this.teaseTimer&&clearTimeout(this.teaseTimer),this.teaseTimer=setTimeout(()=>{this.activeTeasePopup=null,this.renderLeftPanel()},5200)}renderAll(){this.renderTopNav(),this.renderLeftPanel(),this.renderCenterBoard(),this.renderRightPanel(),this.renderActiveModal()}renderTopNav(){const t=document.getElementById("top-nav");if(!t)return;const e=this.saveData.unlockedBacks.length+this.saveData.unlockedSkins.length,i=D.length+E.length,n=m.getCurrentTrack(),a=this.isMultiplayerMatch();L(t,`
      <!-- Left: 3 Game Modes Scroll Switcher -->
      <div class="mode-switcher-group okami-scroll-bar">
        <button class="mode-pill-btn ${this.gameMode==="pve"?"active-mode":""}" id="btn-mode-pve" title="Chế độ 1: Đấu với 12 Kỳ Thủ Nhật Bản (PvE)">
          <span class="hanko-mini">対</span> Đấu Máy (12 Tháng)
        </button>
        <button class="mode-pill-btn ${this.gameMode==="pvp"?"active-mode":""}" id="btn-mode-pvp" title="Chế độ 2: Ghép trận người thật trực tuyến (PvP Online)">
          <span class="hanko-mini">戦</span> Ghép Trận
        </button>
        <button class="mode-pill-btn ${this.gameMode==="custom"?"active-mode":""}" id="btn-mode-custom" title="Chế độ 3: Tạo phòng mã số để mở 2 tab chơi thử (Custom Room)">
          <span class="hanko-mini">室</span> Phòng Mã
        </button>
        ${a?`<span class="live-room-pill" id="btn-live-room-info" title="Đang kết nối trực tiếp phòng #${p.roomCode}">
                 🟢 #${p.roomCode}
               </span>`:""}
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
        <button class="nav-btn primary-gold" id="btn-open-collection" title="Bộ Sưu Tập (${e}/${i})">
          <span class="hanko-seal">集</span> Sưu Tập
        </button>
        <button class="nav-btn" id="btn-open-gacha" title="Rút Quẻ Gacha Omikuji">
          <span class="hanko-seal">籤</span> Rút Quẻ (${this.saveData.coins}🪙)
        </button>
        <button class="nav-icon-btn" id="btn-toggle-dark" title="Chuyển đổi giao diện Sáng (Giấy Washi Ōkami) / Tối (Đêm Mặc Thủy)">
          ${this.darkMode?"☀️":"🌙"}
        </button>

        <div class="nav-settings-wrap">
          <button class="nav-icon-btn" id="btn-toggle-settings" title="Mở / Đóng menu cài đặt (Esc)">
            ${this.settingsMenuOpen?"✕":"⚙️"}
          </button>
          <div class="nav-settings-dropdown ${this.settingsMenuOpen?"open":""}" id="nav-settings-dropdown">
            <div class="speed-selector-box">
              <div class="speed-selector-label">
                <span>⚡ Tốc độ đánh bài</span>
                <span style="color:var(--okami-vermilion); font-weight:800;">${this.animSpeed}x</span>
              </div>
              <div class="speed-pills-row">
                ${this.animSpeedOptions.map(s=>`
                  <button class="speed-pill-btn ${this.animSpeed===s?"active-speed":""}" data-anim-speed="${s}">
                    ${s}x
                  </button>
                `).join("")}
              </div>
            </div>
            <button class="dropdown-item-btn" id="btn-toggle-bgm">
              <span>${m.bgmEnabled?"🎵 Nhạc nền":"🔇 Nhạc nền"}</span>
              <span class="item-sub">${m.bgmEnabled?"Đang bật":"Đang tắt"}</span>
            </button>
            <button class="dropdown-item-btn" id="btn-cycle-bgm">
              <span>🎶 Đổi bài nhạc</span>
              <span class="item-sub">${n.name}</span>
            </button>
            <button class="dropdown-item-btn" id="btn-toggle-sound">
              <span>${m.sfxEnabled?"🔊 Hiệu ứng (SFX)":"🔇 Hiệu ứng (SFX)"}</span>
              <span class="item-sub">${m.sfxEnabled?"Đang bật":"Đang tắt"}</span>
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
            <button class="dropdown-item-btn" id="btn-change-opp-menu" ${a?"disabled":""}>
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
    `),t.querySelector("#btn-mode-pve").onclick=()=>{this.settingsMenuOpen=!1,this.activeModal="opponents",this.renderTopNav(),this.renderActiveModal()},t.querySelector("#btn-mode-pvp").onclick=()=>{this.settingsMenuOpen=!1,this.activeModal="pvp_lobby",this.renderTopNav(),this.renderActiveModal()},t.querySelector("#btn-mode-custom").onclick=()=>{this.settingsMenuOpen=!1,this.activeModal="custom_room",this.renderTopNav(),this.renderActiveModal()};const o=t.querySelector("#btn-live-room-info");o&&(o.onclick=()=>{this.settingsMenuOpen=!1,this.activeModal=this.gameMode==="pvp"?"pvp_lobby":"custom_room",this.renderTopNav(),this.renderActiveModal()}),t.querySelector("#btn-open-collection").onclick=()=>{this.settingsMenuOpen=!1,this.activeModal="collection",this.renderTopNav(),this.renderActiveModal()},t.querySelector("#btn-open-gacha").onclick=()=>{this.settingsMenuOpen=!1,this.activeModal="gacha",this.renderTopNav(),this.renderActiveModal()},t.querySelector("#btn-toggle-dark").onclick=()=>{this.toggleDarkMode()},t.querySelector("#btn-toggle-settings").onclick=s=>{s.stopPropagation(),this.settingsMenuOpen=!this.settingsMenuOpen,this.renderTopNav()},t.querySelectorAll("[data-anim-speed]").forEach(s=>{s.onclick=r=>{r.stopPropagation();const l=Number(s.getAttribute("data-anim-speed"));this.setAnimSpeed(l)}}),t.querySelector("#btn-cycle-bgm").onclick=s=>{s.stopPropagation(),m.cycleTrack(),this.renderTopNav()},t.querySelector("#btn-toggle-bgm").onclick=s=>{s.stopPropagation(),m.toggleBgm(),this.renderTopNav()},t.querySelector("#btn-toggle-sound").onclick=s=>{s.stopPropagation(),m.toggleSfx()&&m.playCardHover(),this.renderTopNav()},t.querySelector("#btn-toggle-cam").onclick=s=>{s.stopPropagation(),this.cameraIndex=(this.cameraIndex+1)%this.cameraAngles.length,document.documentElement.style.setProperty("--board-tilt",this.cameraAngles[this.cameraIndex].deg),this.renderTopNav()},t.querySelector("#btn-open-tutorial").onclick=()=>{this.openTutorial()},t.querySelector("#btn-open-rules").onclick=()=>{this.settingsMenuOpen=!1,this.activeModal="rules",this.renderTopNav(),this.renderActiveModal()},t.querySelector("#btn-cycle-diorama-menu").onclick=()=>{this.rollNewTableFlowerMonth(),m.playCardHover(),this.renderCenterBoard(),this.renderTopNav()},t.querySelector("#btn-change-opp-menu").onclick=()=>{a||(this.settingsMenuOpen=!1,this.openOpponentPicker())},t.querySelector("#btn-restart-match").onclick=()=>{if(this.settingsMenuOpen=!1,a){this.rollNewTableFlowerMonth(),this.engine.startNewMatch(this.engine.totalRounds);const s=this.engine.exportCanonicalState(p.role,null);p.syncRoomState(s,{type:"MATCH_START"}),this.renderAll()}else this.startMatchWithOpponent(this.currentOpponent.id,this.engine.totalRounds)}}renderLeftPanel(){const t=document.getElementById("left-panel");if(!t)return;const e=this.currentOpponent,i=this.engine.phase.startsWith("PLAYER"),n=this.isMultiplayerMatch(),a=this.getOpponentDisplayName(),o=n?`🟢 PHÒNG #${p.roomCode}`:(e.difficultyLabel||"").split(" ")[0],s=!!this.currentDialogue&&Date.now()<this.dialogueHideAt,r=(this.engine.currentRound-1)%12+1;L(t,`
      <!-- 3:4 Kakejiku Hanging Scroll Character Portrait -->
      <div class="opponent-vn-card okami-kakejiku">
        <div class="scroll-roller-bar top"></div>
        <img src="${e.avatar}" alt="${a}" class="opponent-portrait-img" />
        ${n?"":'<button class="opp-swap-btn" id="btn-swap-opp" title="Đổi đối thủ">⇄</button>'}

        <div class="opponent-portrait-overlay">
          <div class="opponent-name-badge">
            <span class="jp-sub">${o}</span>
            <h2>${a}</h2>
          </div>
          ${s?`<div class="dialogue-bubble">${this.currentDialogue}</div>`:""}
        </div>
        <div class="scroll-roller-bar bottom"></div>
      </div>

      <!-- Okami Washi Scroll Scoreboard -->
      <div class="match-scoreboard okami-makimono-box">
        <div class="scroll-roller-bar top"></div>
        <div class="round-banner">
          <span class="round-month-title">Hiệp ${this.engine.currentRound}/${this.engine.totalRounds} · Tháng ${r}</span>
        </div>

        <div class="score-vs-grid">
          <div class="score-box ${i?"active-turn":""}">
            <span class="who-label">Bạn</span>
            <span class="pts-num">${this.engine.playerScore}</span>
            ${this.engine.playerCalledKoiKoi?'<span class="pts-unit">🔥 Koi</span>':""}
          </div>
          <div class="score-box ${i?"":"active-turn"}">
            <span class="who-label">Đối thủ</span>
            <span class="pts-num">${this.engine.aiScore}</span>
            ${this.engine.aiCalledKoiKoi?'<span class="pts-unit">🔥 Koi</span>':""}
          </div>
        </div>
        <div class="scroll-roller-bar bottom"></div>
      </div>
    `);const l=t.querySelector("#btn-swap-opp");l&&(l.onclick=h=>{h.stopPropagation(),this.openOpponentPicker()})}openOpponentPicker(){const t=this.engine;!["ROUND_OVER","MATCH_OVER"].includes(t.phase)&&(t.playerCaptured.length||t.aiCaptured.length||t.currentRound>1)&&!window.confirm("Đổi đối thủ sẽ bỏ trận hiện tại. Tiếp tục?")||(this.activeModal="opponents",this.renderTopNav(),this.renderActiveModal())}buildCenterBoardShell(t){L(t,`
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
          ${vt(this.tableFlowerMonth)}

          <!-- Dynamic zone placeholders (swapped in place by renderCenterBoard) -->
          <div class="ai-hand-wrapper"></div>
          <div class="field-ba-zone"></div>
        </div>

        <!-- Upright 2.5D Billboard Pop-up Elements (100% Perpendicular to Player POV & Unclipped by Board Frame) -->
        ${Tt(this.tableFlowerMonth)}
      </div>

      <div class="player-hand-zone okami-tefuda-dock"></div>
    `)}renderCenterBoard(){const t=document.getElementById("center-stage");if(!t)return;const e=this.currentOpponent,i=this.getOpponentDisplayName(),n=this.isMultiplayerMatch(),a=this.saveData.equippedBack,o=this.saveData.equippedSkin,s=a,r=new Set(this.engine.matchingFieldCandidates.map(f=>f.id)),l=new Set(this.engine.field.map(f=>f.month)),h=this.engine.phase==="PLAYER_SELECT_FIELD_DRAW"?this.engine.drawnCard||this.engine.pendingCard:null;let u="🟢 LƯỢT CỦA BẠN · Lá có chấm ngọc sẽ ăn được bài cùng Tháng trên chiếu";this.engine.phase==="PLAYER_SELECT_FIELD_HAND"?u=`🎯 Chọn 1 trong 2 lá Tháng ${this.engine.pendingCard?.month} phát sáng trên bàn để ăn`:this.engine.phase==="PLAYER_SELECT_FIELD_DRAW"?u=`🎯 Lá vừa bốc (${h?.viName||""} · Tháng ${this.engine.pendingCard?.month}) khớp 2 lá trên bàn · Chọn lá muốn lấy`:this.engine.phase==="AI_TURN"&&(u=n?`⏳ Đang chờ ${i} đánh bài...`:`⏳ ${e.name} đang suy nghĩ nước đi...`);const g=this.engine.hasFieldRow3(),k=g?[8,9,10,11,4,5,6,7,0,1,2,3]:[4,5,6,7,0,1,2,3],c=String(this.tableFlowerMonth);(t.dataset.sceneKey!==c||!t.querySelector(".tabletop-25d-board"))&&(this.buildCenterBoardShell(t),t.dataset.sceneKey=c);const y=t.querySelector(".tabletop-25d-board"),T=`tabletop-25d-board wood-${e.boardWood} flora-month-${this.tableFlowerMonth}`;y.className!==T&&(y.className=T),tt(y.querySelector(":scope > .ai-hand-wrapper"),`
          <!-- Opponent Hand (Face Down - Kept Clean & Unblurred) -->
          <div class="ai-hand-wrapper">
            <div class="ai-hand-zone">
              ${this.engine.aiHand.map(()=>`
                <div class="hana-card-3d ai-small-card" title="Bài trên tay của ${i}">
                  ${B(s)}
                </div>
              `).join("")}
            </div>
          </div>
    `),tt(y.querySelector(":scope > .field-ba-zone"),`
          <!-- Center Field (Fixed Draw Deck Stack + Fixed-Slot 2x4 / 3x4 Field Card Grid) -->
          <div class="field-ba-zone">
            <!-- Fixed 3D Draw Pile (Yama) Locked on the Left Side of the Field -->
            <div class="draw-pile-container ${h?"has-drawn-reveal":""}" title="${h?`Lá vừa bốc: ${h.viName} (Tháng ${h.month}) — Chọn 1 trong 2 lá cùng tháng trên bàn`:`Bộ bài bốc cố định trên bàn (Còn ${this.engine.deck.length} lá)`}">
              <div class="draw-pile-stack" id="draw-pile-stack">
                ${B(a)}
              </div>
              ${h?`
                <div class="drawn-card-reveal hana-card-3d" id="drawn-card-reveal" data-drawn-card-id="${h.id}" title="${h.viName} - Tháng ${h.month} (${h.points}đ) · Chọn 1 trong 2 lá phát sáng trên bàn để ăn">
                  <div class="drawn-card-label">LÁ VỪA BỐC</div>
                  <div class="match-glow-dot selected-dot"></div>
                  ${$(h,o,!0)}
                </div>
              `:""}
              <div class="draw-count-badge" title="Số lá còn trong bộ bài">${this.engine.deck.length}</div>
            </div>

            <!-- Fixed-Slot Face-up Field Cards (2x4 expanding to 3x4) -->
            <div class="field-cards-grid ${g?"has-row-3":"rows-2"}" id="field-cards-grid">
              ${k.map(f=>{const b=this.engine.fieldSlots[f];if(!b)return`<div class="field-card-slot empty" data-slot-index="${f}" aria-hidden="true"></div>`;const S=r.has(b.id),C=this.hoveredHandCardMonth===b.month&&!S;return`
                    <div class="field-card-slot occupied" data-slot-index="${f}">
                      <div class="hana-card-3d ${S?"field-choice-candidate":C?"field-match-highlight":""}"
                           data-field-id="${b.id}"
                           data-slot-index="${f}"
                           data-month="${b.month}"
                           title="${b.viName} (${b.jpName}) - Tháng ${b.month} (${b.points}đ)">
                        ${$(b,o,!0)}
                      </div>
                    </div>
                  `}).join("")}
            </div>
          </div>
    `),tt(t.querySelector(":scope > .player-hand-zone"),`
      <!-- Player Hand Foreground Dock (Okami Brush Splash & Washi Scroll Tray) -->
      <div class="player-hand-zone okami-tefuda-dock">
        <div class="scroll-roller-bar top"></div>
        <div class="turn-instruction-bar">${u}</div>
        <div class="player-hand-cards" id="player-hand-cards">
          ${this.engine.playerHand.map(f=>{const b=l.has(f.month),S=this.engine.phase==="PLAYER_SELECT_FIELD_HAND"&&this.engine.pendingCard?.id===f.id;return`
                <div class="hana-card-3d ${b?"has-field-match":""} ${S?"selected-hand-card":""}"
                     data-hand-id="${f.id}"
                     data-month="${f.month}"
                     title="${f.viName} - Tháng ${f.month} (${f.points}đ)
${f.lore}">
                  ${b||S?`<div class="match-glow-dot ${S?"selected-dot":""}" title="Khớp bài Tháng ${f.month} trên bàn"></div>`:""}
                  ${$(f,o,!0)}
                </div>
              `}).join("")}
        </div>
        <div class="scroll-roller-bar bottom"></div>
      </div>
    `),t.querySelectorAll("[data-hand-id]").forEach(f=>{const b=Number(f.getAttribute("data-hand-id")),S=Number(f.getAttribute("data-month"));f.addEventListener("mouseenter",()=>{this.engine.phase!=="PLAYER_HAND"&&this.engine.phase!=="PLAYER_SELECT_FIELD_HAND"||(m.playCardHover(),this.hoveredHandCardMonth=S,this.updateFieldHighlightOnly())}),f.addEventListener("mouseleave",()=>{this.hoveredHandCardMonth!==null&&(this.hoveredHandCardMonth=null,this.updateFieldHighlightOnly())}),f.addEventListener("click",C=>{C.stopPropagation(),!(this.engine.phase!=="PLAYER_HAND"&&this.engine.phase!=="PLAYER_SELECT_FIELD_HAND")&&this.handlePlayerPlayHandCard(b,C.clientX,C.clientY)})}),t.querySelectorAll("[data-field-id]").forEach(f=>{const b=Number(f.getAttribute("data-field-id")),S=Number(f.getAttribute("data-month"));f.addEventListener("click",C=>{if(C.stopPropagation(),this.engine.phase==="PLAYER_SELECT_FIELD_HAND"&&r.has(b))this.handlePlayerSelectFieldTarget(b,C.clientX,C.clientY);else if(this.engine.phase==="PLAYER_SELECT_FIELD_DRAW"&&r.has(b))this.handlePlayerSelectDrawTarget(b,C.clientX,C.clientY);else if(this.engine.phase==="PLAYER_HAND"||this.engine.phase==="PLAYER_SELECT_FIELD_HAND"){const w=this.engine.playerHand.find(M=>M.month===S);w&&this.handlePlayerPlayHandCard(w.id,C.clientX,C.clientY,b)}})});const _=t.querySelector("#drawn-card-reveal");_&&_.addEventListener("click",f=>{if(f.stopPropagation(),this.engine.phase==="PLAYER_SELECT_FIELD_DRAW"&&this.engine.matchingFieldCandidates.length>0){const b=[...this.engine.matchingFieldCandidates].sort((S,C)=>C.points-S.points)[0];b&&this.handlePlayerSelectDrawTarget(b.id,f.clientX,f.clientY)}})}updateFieldHighlightOnly(){document.querySelectorAll("[data-field-id]").forEach(e=>{const i=Number(e.getAttribute("data-month"));this.hoveredHandCardMonth===i?e.classList.add("field-match-highlight"):e.classList.remove("field-match-highlight")})}renderRightPanel(){const t=document.getElementById("right-panel"),e=this.saveData.equippedSkin;L(t,`
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
        ${this.renderCategorizedCapturedHTML(this.engine.aiCaptured,e)}
        <div class="scroll-roller-bar bottom"></div>
      </div>

      <!-- Player Captured Cards Hanging Scroll -->
      <div class="captured-tray-box okami-makimono-box" id="player-captured-tray">
        <div class="scroll-roller-bar top"></div>
        <div class="tray-header">
          <span>BÀI CỦA BẠN (${this.engine.playerCaptured.length})</span>
        </div>
        ${this.renderCategorizedCapturedHTML(this.engine.playerCaptured,e)}
        <div class="scroll-roller-bar bottom"></div>
      </div>
    `);const i=t.querySelector("#btn-yaku-more");i&&(i.onclick=()=>{this.activeModal="rules",this.renderActiveModal()}),t.querySelectorAll("[data-inspect-id]").forEach(n=>{n.addEventListener("click",()=>{this.inspectedCardId=Number(n.getAttribute("data-inspect-id")),this.collectionTab="compendium",this.activeModal="collection",this.renderActiveModal()})})}renderCategorizedCapturedHTML(t,e){return t.length===0?'<div style="font-size:11px; color:var(--text-muted); padding:4px 2px;">Chưa ăn lá bài nào</div>':`
      <div class="captured-categories">
        ${[{label:"Quang",list:t.filter(n=>n.type==="hikari")},{label:"Thú",list:t.filter(n=>n.type==="tane")},{label:"Thơ",list:t.filter(n=>n.type==="tanzaku")},{label:"Lá",list:t.filter(n=>n.type==="kasu")}].filter(n=>n.list.length>0).map(n=>`
          <div class="cap-group-row">
            <div class="cap-group-label">${n.label} (${n.list.length})</div>
            <div class="cap-mini-cards">
              ${n.list.map(a=>`
                <div class="mini-captured-card" data-inspect-id="${a.id}" title="${a.viName} (Bấm để soi 3D)">
                  ${$(a,e,!1)}
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `}snapshotFieldRects(){const t={};return document.querySelectorAll("[data-field-id]").forEach(e=>{const i=Number(e.getAttribute("data-field-id"));t[i]=e.getBoundingClientRect()}),t}async handlePlayerPlayHandCard(t,e,i,n=null){if(this.isAnimating)return;this.hoveredHandCardMonth=null;const a=v.getRect(`[data-hand-id="${t}"]`),o=this.snapshotFieldRects(),s=this.engine.playHandCard(t,n);if(!s.error){if(s.status==="NEEDS_FIELD_SELECTION"){this.pendingHandCardRect=a,m.playCardHover(),this.renderAll();return}await this.animatePlayerHandStepResult(s,a,o)}}async handlePlayerSelectFieldTarget(t,e,i){if(this.isAnimating)return;const n=this.engine.pendingCard?.id,a=this.pendingHandCardRect||v.getRect(`[data-hand-id="${n}"]`),o=this.snapshotFieldRects(),s=this.engine.playHandCard(n,t);s.error||await this.animatePlayerHandStepResult(s,a,o)}async animatePlayerHandStepResult(t,e,i){this.isAnimating=!0;const n=this.saveData.equippedSkin;if(this.pendingMpMoveAction={type:"TURN_MOVE",handCard:t.card,capturedHand:t.captured||[],drawnCard:null,capturedDraw:[]},t.captured&&t.captured.length>0){this.renderCenterBoard(),this.renderLeftPanel();const a=t.captured.slice(1),o=i[a[0]?.id],s=(this.engine.lastFieldRelocations||[]).map(l=>l.card.id),r=v.animateFieldRelocations(i,{delayMs:220,relocatedIds:s});await Promise.all([v.animateCaptureSequence({actor:"player",playedCard:t.card,matchedCards:a,skinId:n,fromRect:e,fieldTargetRect:o,onImpactSound:l=>{m.playCardSnap(l),o&&this.particles.triggerBurst(o.left+o.width/2,o.top+o.height/2,l?"#ffd166":"#ff758f",l?36:22),l&&(this.currentDialogue=this.pickRandom(this.currentOpponent.dialogues.playerCaptureBright));const h=t.captured.some(u=>u.points>=5);this.triggerOpponentTeaseLine(l||h)}}),r]),this.renderRightPanel(),this.renderLeftPanel()}else{this.renderCenterBoard();const a=v.animateFieldRelocations(i,{delayMs:0});await Promise.all([v.animateCardToFieldSlot({card:t.card,skinId:n,fromRect:e,toFieldCardId:t.card.id,onLandSound:()=>m.playCardSnap(!1)}),a])}await this.executePlayerDrawStep()}async executePlayerDrawStep(){const t=v.getRect("#draw-pile-stack"),e=this.snapshotFieldRects(),i=this.engine.drawStepForPlayer();if(i.status==="DRAW_NEEDS_SELECTION"){this.pendingDrawRect=t,this.isAnimating=!1,m.playCardHover(),this.renderAll();return}await this.animateAndFinishPlayerDraw(i,t,e)}async handlePlayerSelectDrawTarget(t,e,i){if(this.isAnimating)return;this.isAnimating=!0;const n=document.querySelector("#drawn-card-reveal"),a=n?v.getRect(n):this.pendingDrawRect||v.getRect("#draw-pile-stack"),o=this.snapshotFieldRects(),s=this.engine.selectFieldForDrawnCard(t);await this.animateAndFinishPlayerDraw(s,a,o)}async animateAndFinishPlayerDraw(t,e,i){const n=this.saveData.equippedSkin;if(this.pendingMpMoveAction&&(this.pendingMpMoveAction.drawnCard=t.drawnCard||null,this.pendingMpMoveAction.capturedDraw=t.captured||[]),t.drawnCard)if(t.captured&&t.captured.length>0){this.renderCenterBoard();const a=t.captured.slice(1),o=i[a[0]?.id],s=(this.engine.lastFieldRelocations||[]).map(l=>l.card.id),r=v.animateFieldRelocations(i,{delayMs:220,relocatedIds:s});await Promise.all([v.animateCaptureSequence({actor:"player",playedCard:t.drawnCard,matchedCards:a,skinId:n,fromRect:e,fieldTargetRect:o,onImpactSound:l=>{m.playCardSnap(l),o&&this.particles.triggerBurst(o.left+o.width/2,o.top+o.height/2,l?"#ffd166":"#06d6a0",l?34:20),this.activeTeasePopup||this.triggerOpponentTeaseLine(l)}}),r]),this.renderRightPanel()}else{this.renderCenterBoard();const a=v.animateFieldRelocations(i,{delayMs:0});await Promise.all([v.animateCardToFieldSlot({card:t.drawnCard,skinId:n,fromRect:e,toFieldCardId:t.drawnCard.id,onLandSound:()=>m.playCardSnap(!1)}),a])}this.isAnimating=!1,this.afterPlayerDrawResolved(t)}async afterPlayerDrawResolved(t){const e=t.yakuCheck,i=this.isMultiplayerMatch();if(e?.newYaku){if(m.playShobuVictory(),await this.showYakuReveal(e,"player"),this.triggerOpponentTeaseLine(!0),e.autoShobu){this.handleRoundFinished(e.outcome);return}this.renderAll();return}if(e?.roundDraw){this.handleRoundFinished(e.outcome);return}if(i){const n=this.engine.exportCanonicalState(p.role,null);p.syncRoomState(n,this.pendingMpMoveAction),this.pendingMpMoveAction=null,this.renderAll();return}this.renderAll(),this.engine.phase==="AI_TURN"&&this.scheduleAiTurn()}async showYakuReveal(t,e){const i=t?.evalResult;if(!i?.yakus?.length)return;const n=new Set((t.prevSignature||"").split("|")),a=i.yakus.filter(s=>!n.has(`${s.id}:${s.points}`)),o=e==="ai";this.yakuRevealActive=!0,this.renderAll();try{await It(a.length?a:i.yakus,{short:o,actorName:o?this.currentOpponent?.name:"",skinId:this.saveData.equippedSkin,durationMs:v.scaleMs(o?2e3:2800)})}finally{this.yakuRevealActive=!1}}scheduleAiTurn(){this.isMultiplayerMatch()||this.activeModal==="tutorial"||this.yakuRevealActive||setTimeout(async()=>{if(this.engine.phase!=="AI_TURN"||this.isAnimating||this.isMultiplayerMatch()||this.activeModal==="tutorial"||this.yakuRevealActive)return;this.isAnimating=!0;const t=this.currentOpponent,e=this.saveData.equippedSkin,i=this.engine.computeBestAiMove(t.aiProfile);if(!i){this.isAnimating=!1;return}const n=v.getRect(".ai-hand-zone .hana-card-3d:last-child"),a=this.snapshotFieldRects(),o=this.engine.aiHand.findIndex(h=>h.id===i.handCard.id);o!==-1&&this.engine.aiHand.splice(o,1);const s=this.engine.getFieldMatches(i.handCard),r=this.engine.resolveCardPlacement("ai",i.handCard,s,i.fieldTarget?.id);if(r.length>0){this.renderCenterBoard();const h=r.slice(1),u=a[h[0]?.id],g=(this.engine.lastFieldRelocations||[]).map(c=>c.card.id),k=v.animateFieldRelocations(a,{delayMs:220,relocatedIds:g});await Promise.all([v.animateCaptureSequence({actor:"ai",playedCard:i.handCard,matchedCards:h,skinId:e,fromRect:n,fieldTargetRect:u,onImpactSound:c=>{m.playCardSnap(c),c?this.currentDialogue=this.pickRandom(t.dialogues.captureBright):this.currentDialogue=this.pickRandom(t.dialogues.matchCard)}}),k]),this.renderRightPanel(),this.renderLeftPanel()}else{this.renderCenterBoard();const h=v.animateFieldRelocations(a,{delayMs:0});await Promise.all([v.animateCardToFieldSlot({card:i.handCard,skinId:e,fromRect:n,toFieldCardId:i.handCard.id,onLandSound:()=>m.playCardSnap(!1)}),h])}if(this.engine.deck.length>0){const h=v.getRect("#draw-pile-stack"),u=this.snapshotFieldRects(),g=this.engine.deck.shift(),k=this.engine.getFieldMatches(g),c=this.engine.resolveCardPlacement("ai",g,k);if(c.length>0){this.renderCenterBoard();const y=c.slice(1),T=u[y[0]?.id],N=(this.engine.lastFieldRelocations||[]).map(_=>_.card.id),R=v.animateFieldRelocations(u,{delayMs:220,relocatedIds:N});await Promise.all([v.animateCaptureSequence({actor:"ai",playedCard:g,matchedCards:y,skinId:e,fromRect:h,fieldTargetRect:T,onImpactSound:_=>{m.playCardSnap(_),_&&(this.currentDialogue=this.pickRandom(t.dialogues.captureBright))}}),R]),this.renderRightPanel(),this.renderLeftPanel()}else{this.renderCenterBoard();const y=v.animateFieldRelocations(u,{delayMs:0});await Promise.all([v.animateCardToFieldSlot({card:g,skinId:e,fromRect:h,toFieldCardId:g.id,onLandSound:()=>m.playCardSnap(!1)}),y])}}this.isAnimating=!1;const l=this.engine.checkPostTurnYaku("ai");if(l.newYaku)if(this.isAnimating=!0,await this.showYakuReveal(l,"ai"),this.isAnimating=!1,this.engine.shouldAiCallKoiKoi(t.aiProfile,l.evalResult)){this.currentDialogue=this.pickRandom(t.dialogues.callKoiKoi),this.engine.declareKoiKoi("ai"),this.triggerAnimeCutin(t.name,t.avatar,"KOI-KOI! (こいこい)",`${t.name} tuyên bố cược tiếp để nhân đôi điểm!`,t.portrait),this.renderAll();return}else{const u=this.engine.declareShobu("ai",l.evalResult);this.handleRoundFinished(u);return}if(l.roundDraw){this.handleRoundFinished(l.outcome);return}this.renderAll()},v.scaleMs(350))}triggerAnimeCutin(t,e,i,n,a=""){m.playKoiKoiFanfare();const o=document.getElementById("cutin-root");if(a){const[,s=i,r=""]=i.match(/^(.*?)\s*(\(.+\))$/)||[];L(o,`
        <div class="cutin-overlay">
          <div class="cutin-band has-portrait">
            <div class="cutin-portrait-clip">
              <img src="${a}" class="cutin-portrait" alt="${t}" draggable="false" />
            </div>
            <div class="cutin-text-group">
              <h2>${s}${r?` <span class="kk-jp" lang="ja">${r}</span>`:""}</h2>
              <p>${n}</p>
            </div>
          </div>
        </div>
      `)}else L(o,`
        <div class="cutin-overlay">
          <div class="cutin-band">
            <img src="${e}" class="cutin-avatar" alt="${t}" />
            <div class="cutin-text-group">
              <h2>${i}</h2>
              <p>${n}</p>
            </div>
          </div>
        </div>
      `);setTimeout(()=>{o.replaceChildren()},1900)}handleRoundFinished(t,e=!1){this.lastRoundSummary=t;const i=this.currentOpponent,n=this.isMultiplayerMatch();if(t.winner==="player"){m.playShobuVictory(),this.currentDialogue=this.pickRandom(i.dialogues.loseRound);const a=(t.finalPoints||1)*25;this.saveData.coins+=a,t.earnedRoundCoins=a}else t.winner==="ai"?(m.playKoiKoiFanfare(),this.currentDialogue=this.pickRandom(i.dialogues.winRound),t.earnedRoundCoins=20,this.saveData.coins+=20):(t.earnedRoundCoins=30,this.saveData.coins+=30);if(this.newlyUnlockedItems=[],t.isMatchComplete&&this.engine.playerScore>this.engine.aiScore&&!n){const a=!this.saveData.defeatedOpponents.includes(i.id),o=a?i.rewardCoins+i.firstWinBonusCoins:i.rewardCoins;if(this.saveData.coins+=o,t.matchBonusCoins=o,a&&this.saveData.defeatedOpponents.push(i.id),i.unlocksCardBack&&!this.saveData.unlockedBacks.includes(i.unlocksCardBack)){this.saveData.unlockedBacks.push(i.unlocksCardBack);const s=G(i.unlocksCardBack);this.newlyUnlockedItems.push({type:"Mặt Lưng Độc Quyền",name:s.name})}if(i.unlocksCardSkin&&!this.saveData.unlockedSkins.includes(i.unlocksCardSkin)){this.saveData.unlockedSkins.push(i.unlocksCardSkin);const s=Y(i.unlocksCardSkin);this.newlyUnlockedItems.push({type:"Thiết Kế Mặt Bài",name:s.name})}this.currentDialogue=this.pickRandom(i.dialogues.defeatMatch)}if(n&&!e){const a=this.engine.exportCanonicalState(p.role,t);p.syncRoomState(a,{...this.pendingMpMoveAction||{},type:"ROUND_FINISHED"}),this.pendingMpMoveAction=null}t.isMatchComplete&&p.recordMatchResult({mode:this.gameMode,roomCode:p.roomCode||null,playerScore:this.engine.playerScore,opponentScore:this.engine.aiScore,opponent:this.getOpponentDisplayName()}),this.persistSave(),this.activeModal="round_end",this.renderAll()}updateModalMarkup(t,e,i){const n=t.querySelector(".modal-window");if(t.dataset.activeModalKey===e&&n){const o=n.querySelector(".modal-body"),s=o?o.scrollTop:0,r=n.querySelector(".compendium-48-grid"),l=r?r.scrollTop:0,h=n.dataset.colTab||"",u=e==="collection"?this.collectionTab:"",g=document.createRange();g.selectNodeContents(n);const c=g.createContextualFragment(i).querySelector(".modal-window");if(c){if(e==="collection"&&h===u){const N=n.querySelectorAll(".collection-grid .preview-card-holder"),R=c.querySelectorAll(".collection-grid .preview-card-holder");N.length>0&&N.length===R.length&&R.forEach((_,f)=>_.replaceWith(N[f]))}n.replaceChildren(...c.childNodes),n.onclick=N=>N.stopPropagation(),n.dataset.colTab=u;const y=n.querySelector(".modal-body");y&&h===u&&(y.scrollTop=s);const T=n.querySelector(".compendium-48-grid");T&&h===u&&(T.scrollTop=l);return}}t.dataset.activeModalKey=e,L(t,i);const a=t.querySelector(".modal-window");a&&(a.onclick=o=>o.stopPropagation(),e==="collection"&&(a.dataset.colTab=this.collectionTab))}renderActiveModal(){const t=document.getElementById("modal-root");if(this.engine.phase==="PLAYER_KOIKOI_DECISION"){if(this.yakuRevealActive){delete t.dataset.activeModalKey,t.replaceChildren();return}const e=this.buildKoiKoiDecisionModalHTML();if(t.dataset.activeModalKey==="koikoi_decision"&&this.koikoiModalMarkup===e&&t.firstElementChild)return;this.koikoiModalMarkup=e,this.updateModalMarkup(t,"koikoi_decision",e),this.bindKoiKoiDecisionEvents(t);return}if(!this.activeModal){delete t.dataset.activeModalKey,t.replaceChildren();return}switch(this.activeModal){case"round_end":{const e=this.buildRoundEndModalHTML();if(t.dataset.activeModalKey==="round_end"&&this.roundEndModalMarkup===e&&t.firstElementChild)break;this.roundEndModalMarkup=e,this.updateModalMarkup(t,"round_end",e),this.bindRoundEndEvents(t);break}case"opponents":this.updateModalMarkup(t,"opponents",this.buildOpponentsModalHTML()),this.bindOpponentsModalEvents(t);break;case"pvp_lobby":this.updateModalMarkup(t,"pvp_lobby",this.buildPvpLobbyModalHTML()),this.bindPvpLobbyModalEvents(t);break;case"custom_room":this.updateModalMarkup(t,"custom_room",this.buildCustomRoomModalHTML()),this.bindCustomRoomModalEvents(t);break;case"db_health":this.updateModalMarkup(t,"db_health",this.buildDbHealthModalHTML()),this.bindDbHealthModalEvents(t);break;case"collection":this.updateModalMarkup(t,"collection",this.buildCollectionModalHTML()),this.bindCollectionModalEvents(t);break;case"gacha":this.updateModalMarkup(t,"gacha",this.buildGachaModalHTML()),this.bindGachaModalEvents(t);break;case"rules":this.updateModalMarkup(t,"rules",this.buildRulesModalHTML()),this.bindRulesModalEvents(t);break;case"tutorial":this.updateModalMarkup(t,"tutorial",this.buildTutorialModalHTML()),this.bindTutorialModalEvents(t);break;default:delete t.dataset.activeModalKey,t.replaceChildren()}}buildScrollModalHTML({ariaLabel:t,extraClass:e="",contentHtml:i}){const n=["#ffb7c5","#f6a3b4","#e9798f","#ffd1dc"],a=Array.from({length:9},(o,s)=>`<span class="kk-petal" style="${[`left:${(7+s*37%88).toFixed(0)}%`,`--pc:${n[s%n.length]}`,`--pd:${(1.1+s*.83%4.2).toFixed(2)}s`,`--pl:${(6+s*1.7%4).toFixed(1)}s`,`--sx:${(s*53%120-60).toFixed(0)}px`,`--ps:${(.7+s*.29%.6).toFixed(2)}`].join(";")}"></span>`).join("");return`
      <div class="modal-backdrop kk-backdrop ${e}">
        <svg class="kk-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <filter id="kk-ink-bleed" x="-20%" y="-30%" width="140%" height="160%">
            <!-- Chỉ quầng mực loang mềm, không dùng feDisplacementMap (làm chữ bị răng cưa) -->
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.45 0" result="halo" />
            <feMerge><feMergeNode in="halo" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </svg>
        <div class="kk-scroll" role="dialog" aria-label="${t}">
          <div class="kk-roller is-left" aria-hidden="true"></div>
          <div class="kk-sheet">
            <div class="kk-paper" aria-hidden="true"></div>
            <div class="kk-decor-branch" aria-hidden="true"></div>
            <div class="kk-decor-ink" aria-hidden="true"></div>
            <div class="kk-petals" aria-hidden="true">${a}</div>
            <div class="kk-content">${i}</div>
            <div class="kk-seal" aria-hidden="true"></div>
          </div>
          <div class="kk-roller is-right" aria-hidden="true"></div>
        </div>
      </div>
    `}buildYakuLinesHTML(t,e=i=>`+${i.points} Điểm`){return`
      <div class="kk-yaku-list">
        ${t.map((i,n)=>`
          <div class="kk-yaku-line" style="--j:${n}">
            <span class="kk-yaku-name">${i.viName} <small>${i.jpName}</small></span>
            <span class="kk-yaku-pts">${e(i)}</span>
          </div>`).join("")}
      </div>`}buildKoiKoiDecisionModalHTML(){const t=this.engine.pendingYakuEvaluation||K(this.engine.playerCaptured,this.engine.currentRound),e=t.totalBasePoints>=7,i=this.engine.aiCalledKoiKoi,n=(e?2:1)*(i?2:1),a=t.totalBasePoints*n;return this.buildScrollModalHTML({ariaLabel:"Quyết Định Định Mệnh",contentHtml:`
        <h2 class="kk-title">Quyết Định Định Mệnh</h2>
        ${this.buildYakuLinesHTML(t.yakus)}
        <div class="kk-divider" aria-hidden="true"></div>
        <div class="kk-total">
          Tổng Điểm Nếu Dừng (Shōbu): <strong>${a} Điểm</strong>${n>1?` <em>(Nhân ×${n}!)</em>`:""}
        </div>
        <div class="kk-actions">
          <button class="kk-stroke-btn is-indigo" id="btn-choose-shobu">
            <span class="kk-btn-main">SHŌBU! <span lang="ja">(勝負)</span></span>
            <span class="kk-btn-sub">Dừng &amp; Ăn ${a} Điểm</span>
          </button>
          <button class="kk-stroke-btn is-vermilion is-glow" id="btn-choose-koikoi">
            <span class="kk-btn-main">KOI-KOI! <span lang="ja">(こいこい)</span></span>
            <span class="kk-btn-sub">Cược Tiếp Săn Điểm Lớn</span>
          </button>
        </div>`})}bindKoiKoiDecisionEvents(t){t.querySelector("#btn-choose-shobu").onclick=()=>{const e=this.engine.declareShobu("player");this.handleRoundFinished(e)},t.querySelector("#btn-choose-koikoi").onclick=()=>{if(this.currentDialogue=this.pickRandom(this.currentOpponent.dialogues.playerCallKoiKoi),this.engine.declareKoiKoi("player"),this.triggerAnimeCutin("KỲ THỦ (BẠN)",this.currentOpponent.avatar,"KOI-KOI! (こいこい)","Bạn tuyên bố tiếp tục ván bài để săn tổ hợp lớn!"),this.isMultiplayerMatch()){const e=this.engine.exportCanonicalState(p.role,null);p.syncRoomState(e,{type:"CALL_KOIKOI"}),this.pendingMpMoveAction=null,this.renderAll();return}this.renderAll(),this.engine.phase==="AI_TURN"&&this.scheduleAiTurn()}}buildRoundEndModalHTML(){const t=this.lastRoundSummary;if(!t)return"";const e=this.getOpponentDisplayName(),i=e.split(" ")[0],n=t.isMatchComplete,a=this.engine.playerScore>this.engine.aiScore,o=k=>(k-1)%12+1,s=et(o(t.round+1)),r=s?s.viName.replace(" - "," · "):`Tháng ${o(t.round+1)}`,l=t.winner==="player"?"Bạn thắng":t.winner==="ai"?`${e} thắng`:'Hòa <small lang="ja">(引き分け)</small>',h=t.yakus&&t.yakus.length>0?`${this.buildYakuLinesHTML(t.yakus)}
          ${t.multiplier>1?`<div class="kk-note">Hệ số nhân ×${t.multiplier}: ${(t.multiplierReasons||[]).join(" + ")} · Tổng <strong>+${t.finalPoints} Điểm</strong></div>`:""}`:'<div class="kk-note">Cả hai bên đã đánh hết bài mà không ai gọi Shōbu.</div>',u=this.newlyUnlockedItems.length>0?`<div class="kk-unlock">
            <div class="kk-unlock-title">🎁 Mở khóa vật phẩm độc quyền!</div>
            ${this.newlyUnlockedItems.map(k=>`<div>✨ ${k.type}: <strong>${k.name}</strong></div>`).join("")}
          </div>`:"",g=n?`<div class="kk-match-result ${a?"is-win":"is-lose"}">
          ${a?`👑 Chúc mừng! Bạn đã chiến thắng ${e} chung cuộc!`:`🌸 ${e} giành chiến thắng chung cuộc sau ${t.totalRounds} tháng. Hãy tái đấu nhé!`}
        </div>
        <div class="kk-actions">
          <button class="kk-stroke-btn is-vermilion is-glow" id="btn-play-again">
            <span class="kk-btn-main">Tái Đấu</span>
            <span class="kk-btn-sub">Đấu lại với ${i}</span>
          </button>
          <button class="kk-stroke-btn is-indigo" id="btn-pick-new-opp">
            <span class="kk-btn-main">Đổi Đối Thủ</span>
            <span class="kk-btn-sub">Chọn chế độ / đối thủ khác</span>
          </button>
        </div>`:`<div class="kk-actions is-single">
          <button class="kk-stroke-btn is-vermilion is-glow" id="btn-next-round">
            <span class="kk-btn-main">Sang ${r}</span>
          </button>
        </div>`;return this.buildScrollModalHTML({ariaLabel:`Tháng ${o(t.round)} – ${l}`,extraClass:"is-round-end",contentHtml:`
        <div class="kk-kicker">Tháng ${o(t.round)}</div>
        <h2 class="kk-title">${l}</h2>
        ${h}
        <div class="kk-divider" aria-hidden="true"></div>
        <div class="kk-scores">
          <div class="kk-score">
            <span class="kk-score-label">Tổng Điểm Bạn</span>
            <span class="kk-score-num">${this.engine.playerScore}</span>
          </div>
          <span class="kk-score-vs" aria-hidden="true">—</span>
          <div class="kk-score">
            <span class="kk-score-label">Tổng Điểm ${i}</span>
            <span class="kk-score-num">${this.engine.aiScore}</span>
          </div>
        </div>
        <div class="kk-reward">
          🪙 Thưởng Hiệp Đấu: <strong>+${t.earnedRoundCoins||25} Xu Hoa</strong>
          ${t.matchBonusCoins?` · 🏆 Thưởng Chung Cuộc: <strong>+${t.matchBonusCoins} Xu Hoa</strong>`:""}
        </div>
        ${u}
        ${g}`})}bindRoundEndEvents(t){const e=t.querySelector("#btn-next-round");e&&(e.onclick=()=>{if(this.activeModal=null,this.engine.nextRound(),this.isMultiplayerMatch()){const a=this.engine.exportCanonicalState(p.role,null);p.syncRoomState(a,{type:"NEXT_ROUND"}),this.renderAll();return}this.renderAll(),this.engine.phase==="AI_TURN"&&this.scheduleAiTurn()});const i=t.querySelector("#btn-play-again");i&&(i.onclick=()=>{if(this.isMultiplayerMatch()){this.activeModal=null,this.rollNewTableFlowerMonth(),this.engine.startNewMatch(this.engine.totalRounds);const a=this.engine.exportCanonicalState(p.role,null);p.syncRoomState(a,{type:"REMATCH"}),this.renderAll()}else this.startMatchWithOpponent(this.currentOpponent.id,this.engine.totalRounds)});const n=t.querySelector("#btn-pick-new-opp");n&&(n.onclick=()=>{this.activeModal="opponents",this.renderActiveModal()})}buildPvpLobbyModalHTML(){const t=p.roomStatus==="searching",e=this.gameMode==="pvp"&&p.roomStatus==="playing";return`
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window" style="width:min(860px, calc(95 * var(--avw, 1vw)));">
          <div class="modal-header">
            <h2>⚔️ Ghép Trận Người Thật Trực Tuyến (PvP Online)</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="arena-hero-banner">
              <img src="./public/assets/pvp_arena_banner.webp?v=2" alt="PvP Online Banner" />
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
                <input type="text" class="mp-input" id="input-pvp-name" value="${p.playerName}" placeholder="Nhập tên hiển thị..." />
              </div>

              ${e?`
                <div class="room-code-showcase" style="width:100%; max-width:540px;">
                  <div style="font-size:13px; font-weight:800; color:var(--jade);">
                    🟢 ĐANG ĐẤU TRỰC TIẾP VỚI: ${p.opponentName}
                  </div>
                  <div class="room-code-digits">#${p.roomCode}</div>
                  <p style="font-size:12.5px; color:var(--text-muted);">
                    Bạn đang ở trong trận PvP trực tuyến. Đóng cửa sổ này để tiếp tục đánh bài!
                  </p>
                </div>
              `:t?`
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
              `:`
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
              `}
            </div>
          </div>
        </div>
      </div>
    `}bindPvpLobbyModalEvents(t){t.querySelector("#btn-close-modal").onclick=()=>{this.activeModal=null,this.renderActiveModal()},t.querySelector("#modal-backdrop-close").onclick=s=>{s.target===s.currentTarget&&(this.activeModal=null,this.renderActiveModal())};const e=t.querySelector("#input-pvp-name");e&&(e.onchange=()=>{p.setPlayerName(e.value)});const i=t.querySelector("#btn-start-pvp");i&&(i.onclick=async()=>{e&&p.setPlayerName(e.value),this.gameMode="pvp",await p.startMatchmaking(),this.renderAll()});const n=t.querySelector("#btn-start-and-open-tab2");n&&(n.onclick=async()=>{e&&p.setPlayerName(e.value),this.gameMode="pvp",await p.startMatchmaking(),this.renderAll();const s=`${window.location.pathname}?autoPvp=1`;window.open(s,"_blank")});const a=t.querySelector("#btn-open-tab2-pvp");a&&(a.onclick=()=>{const s=`${window.location.pathname}?autoPvp=1`;window.open(s,"_blank")});const o=t.querySelector("#btn-cancel-pvp");o&&(o.onclick=async()=>{await p.cancelMatchmaking(),this.renderAll()})}buildCustomRoomModalHTML(){const t=p.roomCode&&p.roomStatus!=="idle"?p.roomCode:null,e=Object.values(p.readLocalRooms()).filter(i=>i&&i.roomCode&&i.status==="waiting");return`
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window" style="width:min(920px, calc(95 * var(--avw, 1vw)));">
          <div class="modal-header">
            <h2>🏯 Tạo Phòng Mã Số & Vào Phòng (Mở 2 Tab Chơi Thử)</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="arena-hero-banner">
              <img src="./public/assets/pvp_arena_banner.webp?v=2" alt="Custom Room Banner" />
              <div class="arena-hero-overlay">
                <h3>🏯 Phòng Trà Đạo Mã Số (Custom Room 2 Tab)</h3>
                <p>Tạo mã phòng riêng ở Tab 1 rồi nhập mã số đó ở Tab 2 (hoặc bấm nút Mở Tab 2 tự động vào phòng) để chơi thử 2 người trực tiếp!</p>
              </div>
            </div>

            ${this.customRoomError?`<div style="background:#ffe3e8; border:2px solid #d62839; color:#8f1822; padding:10px 14px; border-radius:12px; font-weight:800; font-size:13px; margin-bottom:12px;">
                     ⚠️ ${this.customRoomError}
                   </div>`:""}

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
                  <input type="text" class="mp-input" id="input-host-name" value="${p.playerName}" style="margin-bottom:8px;" />
                  <label style="font-size:11.5px; font-weight:800; display:block; margin-bottom:4px;">Mã số phòng muốn tạo (Tùy chọn):</label>
                  <input type="text" class="mp-input" id="input-create-code" placeholder="VD: 6868 (Để trống = Tự tạo mã)" maxlength="8" />
                </div>

                <button class="decision-big-btn koikoi" id="btn-create-room" style="width:100%;">
                  🏯 Tạo Phòng Mã Số Ngay
                </button>

                ${t?`
                  <div class="room-code-showcase">
                    <div style="font-size:12px; font-weight:800; color:#b52b2f;">
                      ${p.roomStatus==="playing"?"🟢 ĐANG TRONG TRẬN ĐẤU":"⏳ ĐANG CHỜ NGƯỜI CHƠI THỨ 2 VÀO PHÒNG"}
                    </div>
                    <div class="room-code-digits">${t}</div>
                    <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
                      Hãy mở Tab 2 và nhập mã <strong>${t}</strong> ở khung bên phải, hoặc bấm nút dưới đây:
                    </p>
                    <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
                      <button class="nav-btn primary-gold" id="btn-open-tab2-room" style="justify-content:center;">
                        🗗 Mở Tab 2 & Vào Thẳng Phòng #${t}
                      </button>
                      <button class="nav-btn" id="btn-copy-room-code" style="justify-content:center;">
                        📋 Sao Chép Mã
                      </button>
                    </div>
                  </div>
                `:""}
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

                ${e.length>0?`
                  <div style="margin-top:6px; padding-top:10px; border-top:1px dashed var(--hinoki-border);">
                    <div style="font-size:12px; font-weight:800; margin-bottom:6px;">
                      ⚡ Phòng đang mở trên máy của bạn (Bấm để vào ngay):
                    </div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                      ${e.map(i=>`
                        <button class="nav-btn primary-gold" data-quick-join="${i.roomCode}">
                          🚪 Vào Phòng #${i.roomCode} (${i.hostName||"Chủ phòng"})
                        </button>
                      `).join("")}
                    </div>
                  </div>
                `:""}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}bindCustomRoomModalEvents(t){t.querySelector("#btn-close-modal").onclick=()=>{this.activeModal=null,this.renderActiveModal()},t.querySelector("#modal-backdrop-close").onclick=s=>{s.target===s.currentTarget&&(this.activeModal=null,this.renderActiveModal())};const e=t.querySelector("#input-host-name"),i=t.querySelector("#input-create-code"),n=t.querySelector("#input-join-code");t.querySelector("#btn-create-room").onclick=async()=>{e&&p.setPlayerName(e.value),this.customRoomError="",this.gameMode="custom",this.engine.startNewMatch(this.saveData.matchRounds||3);const s=this.engine.exportCanonicalState("host",null);await p.createCustomRoom(i?.value||"",s),m.playCardSnap(!0),this.renderAll()},t.querySelector("#btn-join-room").onclick=async()=>{e&&p.setPlayerName(e.value);const s=n?.value||"",r=await p.joinCustomRoom(s);r.error?(this.customRoomError=r.error,this.renderActiveModal()):this.customRoomError=""},t.querySelectorAll("[data-quick-join]").forEach(s=>{s.onclick=async()=>{const r=s.getAttribute("data-quick-join"),l=await p.joinCustomRoom(r);l.error&&(this.customRoomError=l.error,this.renderActiveModal())}});const a=t.querySelector("#btn-open-tab2-room");a&&p.roomCode&&(a.onclick=()=>{const s=`${window.location.pathname}?joinRoom=${encodeURIComponent(p.roomCode)}`;window.open(s,"_blank")});const o=t.querySelector("#btn-copy-room-code");o&&p.roomCode&&(o.onclick=()=>{navigator.clipboard?.writeText(p.roomCode).catch(()=>{}),o.textContent="✅ Đã Sao Chép!"})}buildDbHealthModalHTML(){const t=this.healthReport,e=t?.databases||{},i=t?.jsonFallback||{enabled:!0,filePath:"data/local_db.json",roomsCount:0,matchesSaved:0},n=(a,o,s,r)=>{const l=e[a]||{name:s,envVar:r,connected:!1,detail:`Chưa đặt ${r} — Tự động lưu tạm vào file JSON (data/local_db.json)`},h=!!l.connected;return`
        <div class="db-health-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:14px;">${o} ${l.name}</strong>
            <span style="padding:2px 8px; border-radius:99px; font-size:10px; font-weight:800; color:#fff; background:${h?"#1b8a5a":"#d98218"};">
              ${h?"ĐÃ KẾT NỐI":"JSON FALLBACK"}
            </span>
          </div>
          <div style="font-size:11.5px; color:var(--text-muted);">
            Biến môi trường: <code>${l.envVar}</code>
          </div>
          <div style="font-size:12px; line-height:1.4;">
            ${l.detail}
          </div>
        </div>
      `};return`
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
                  Chế độ hiện tại: <strong><code>${t?.activeStorageMode||"local_json_fallback"}</code></strong> —
                  File JSON dự phòng: <strong><code>${i.filePath}</code></strong>
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
              ${n("redis","⚡","Redis","REDIS_URL")}
              ${n("mongodb","🍃","MongoDB","MONGO_URL")}
              ${n("postgresql","🐘","PostgreSQL","POSTGRES_URL")}
              ${n("mysql","🐬","MySQL","MYSQL_URL")}
            </div>

            <div style="font-size:12.5px; font-weight:800; margin-bottom:6px;">
              📦 Phản hồi trực tiếp từ Endpoint <code>/health</code>:
            </div>
            <pre style="background:#171124; color:#9ef0c0; padding:14px; border-radius:12px; font-size:12px; overflow-x:auto; max-height:240px;">${t?JSON.stringify(t,null,2):"Đang kiểm tra kết nối..."}</pre>
          </div>
        </div>
      </div>
    `}bindDbHealthModalEvents(t){t.querySelector("#btn-close-modal").onclick=()=>{this.activeModal=null,this.renderActiveModal()},t.querySelector("#modal-backdrop-close").onclick=e=>{e.target===e.currentTarget&&(this.activeModal=null,this.renderActiveModal())}}buildOpponentsModalHTML(){return`
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
                ${[3,6,12].map(t=>`
                  <button class="tab-btn ${this.engine.totalRounds===t?"active":""}" data-round-len="${t}">
                    ${t} Tháng
                  </button>
                `).join("")}
              </div>
            </div>

            <div class="opponents-select-grid">
              ${W.map(t=>{const e=this.saveData.defeatedOpponents.includes(t.id),i=t.unlocksCardBack?G(t.unlocksCardBack)?.name:"",n=t.unlocksCardSkin?Y(t.unlocksCardSkin)?.name:"";return`
                  <div class="opponent-select-card" style="border-color:${this.currentOpponent.id===t.id?t.themeColor:"#dfba92"}">
                    <div class="opp-card-banner">
                      <img src="${t.avatar}" alt="${t.name}" />
                      <div style="position:absolute; top:10px; left:10px; background:rgba(255,248,237,0.95); border:1.5px solid #c97a40; padding:3px 9px; border-radius:99px; font-size:11px; color:#9e1f28; font-weight:800;">
                        ${t.monthLabel||`Tháng ${t.month||1}`} ・ ${t.difficultyLabel}
                      </div>
                      <div style="position:absolute; top:10px; right:10px; background:${e?"#1b8a5a":"rgba(255,248,237,0.92)"}; color:${e?"#fff":"#5a2716"}; border:1.5px solid #c97a40; padding:3px 9px; border-radius:99px; font-size:11px; font-weight:800;">
                        ${e?`✅ ${t.gender} (${t.age}t)`:`${t.gender} ・ ${t.age} tuổi`}
                      </div>
                    </div>
                    <div class="opp-card-body">
                      <div>
                        <span style="font-size:11px; color:#b87314; font-weight:700;">${t.jpName}</span>
                        <h3 style="font-size:17px; color:#8f1822; font-family:var(--font-display);">${t.name}</h3>
                      </div>
                      <p style="font-size:12px; color:var(--text-muted); line-height:1.4; flex:1;">
                        ${t.bio}
                      </p>
                      <div style="background:#fff4e2; border:1px solid #e2be98; border-radius:10px; padding:7px 9px; font-size:11px; color:#6b3b25;">
                        🎁 <strong>Thưởng thắng:</strong> +${t.rewardCoins} Xu
                        ${i?`<br/>🎴 Mặt lưng: <em>${i}</em>`:""}
                        ${n?`<br/>🎨 Mặt bài: <em>${n}</em>`:""}
                      </div>
                      <button class="nav-btn primary-gold" data-challenge-opp="${t.id}" style="width:100%; justify-content:center; margin-top:4px;">
                        🌸 Khiêu Chiến ${t.name}
                      </button>
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>
        </div>
      </div>
    `}bindOpponentsModalEvents(t){t.querySelector("#btn-close-modal").onclick=()=>{this.activeModal=null,this.renderActiveModal()},t.querySelector("#modal-backdrop-close").onclick=e=>{e.target===e.currentTarget&&(this.activeModal=null,this.renderActiveModal())},t.querySelectorAll("[data-round-len]").forEach(e=>{e.onclick=()=>{const i=Number(e.getAttribute("data-round-len"));this.engine.totalRounds=i,this.saveData.matchRounds=i,this.persistSave(),this.renderActiveModal()}}),t.querySelectorAll("[data-challenge-opp]").forEach(e=>{e.onclick=()=>{const i=e.getAttribute("data-challenge-opp");this.startMatchWithOpponent(i,this.saveData.matchRounds||3)}})}buildCollectionModalHTML(){let t="";if(this.collectionTab==="backs")t=`
        <div class="collection-grid">
          ${D.map(e=>{const i=this.saveData.unlockedBacks.includes(e.id),n=this.saveData.equippedBack===e.id,a=O[e.rarity],o=e.bossUnlockId?j(e.bossUnlockId):null;return`
              <div class="collectible-item-card ${n?"equipped":""}">
                <span class="rarity-tag" style="background:#fff4e2; color:#9e1f28; border:1.5px solid #d49556;">
                  ${a.label}
                </span>
                <div class="preview-card-holder">
                  ${B(e.id)}
                </div>
                <div>
                  <h4 style="font-size:14px; color:#8f1822;">${e.name}</h4>
                  <span style="font-size:11px; color:#b87314; font-weight:700;">${e.jpName}</span>
                </div>
                <p style="font-size:11.5px; color:var(--text-muted); line-height:1.35; flex:1;">
                  ${e.description}
                </p>
                ${i?`<button class="nav-btn ${n?"is-equipped":"primary-gold"}" data-equip-back="${e.id}" style="width:100%; justify-content:center;">
                        ${n?"✅ Đang Trang Bị":"🎴 Trang Bị Mặt Lưng"}
                       </button>`:`<div style="font-size:11px; color:var(--sakura); font-weight:700;">
                        ${o?`Đánh bại <strong>${o.name}</strong> hoặc Mua:`:"Mở tại Tiệm / Gacha:"}
                       </div>
                       <button class="nav-btn" data-buy-back="${e.id}" style="width:100%; justify-content:center;">
                         🪙 Mua Ngay (${e.price} Xu)
                       </button>`}
              </div>
            `}).join("")}
        </div>
      `;else if(this.collectionTab==="skins"){const e=I(1),i=I(9);t=`
        <div class="collection-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
          ${E.map(n=>{const a=this.saveData.unlockedSkins.includes(n.id),o=this.saveData.equippedSkin===n.id,s=O[n.rarity],r=n.bossUnlockId?j(n.bossUnlockId):null;return`
              <div class="collectible-item-card ${o?"equipped":""}">
                <span class="rarity-tag" style="background:#fff4e2; color:#9e1f28; border:1.5px solid #d49556;">
                  ${s.label}
                </span>
                <div style="display:flex; gap:10px;">
                  <div class="preview-card-holder" style="width:82px; height:126px;">
                    ${$(e,n.id,!0)}
                  </div>
                  <div class="preview-card-holder" style="width:82px; height:126px;">
                    ${$(i,n.id,!0)}
                  </div>
                </div>
                <div>
                  <h4 style="font-size:15px; color:#8f1822;">${n.name}</h4>
                  <span style="font-size:11px; color:#b87314; font-weight:700;">${n.jpName}</span>
                </div>
                <p style="font-size:11.5px; color:var(--text-muted); line-height:1.38; flex:1;">
                  ${n.description}
                </p>
                ${a?`<button class="nav-btn ${o?"is-equipped":"primary-gold"}" data-equip-skin="${n.id}" style="width:100%; justify-content:center;">
                        ${o?"✅ Đang Sử Dụng":"🎨 Áp Dụng Cho 48 Lá Bài"}
                       </button>`:`<div style="font-size:11px; color:var(--sakura); font-weight:700;">
                        ${r?`Đánh bại <strong>${r.name}</strong> hoặc Mua:`:"Mở khóa bằng Xu Hoa:"}
                       </div>
                       <button class="nav-btn" data-buy-skin="${n.id}" style="width:100%; justify-content:center;">
                         🪙 Mua Ngay (${n.price} Xu)
                       </button>`}
              </div>
            `}).join("")}
        </div>
      `}else{const e=I(this.inspectedCardId)||H[0];t=`
        <div class="compendium-layout">
          <!-- Left: Interactive 3D Flippable Card Inspector -->
          <div class="inspector-3d-stage">
            ${this.buildCompendiumInspectorHTML(e)}
          </div>

          <!-- Right: All 48 Cards Grid -->
          <div class="compendium-48-grid">
            ${H.map(i=>`
              <div class="hana-card-3d ${i.id===e.id?"field-choice-candidate":""}"
                   data-compendium-card="${i.id}"
                   style="width:74px; height:114px;"
                   title="#${i.id} ${i.viName}">
                ${$(i,this.saveData.equippedSkin,!0)}
              </div>
            `).join("")}
          </div>
        </div>
      `}return`
      <div class="modal-backdrop kk-backdrop" id="modal-backdrop-close">
        <div class="modal-window scroll-modal">
          <div class="modal-header">
            <h2>Bộ Sưu Tập <small>Mặt Lưng · Thiết Kế Bài · Phòng Trưng Bày 3D</small></h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="sm-toolbar">
              <div class="modal-tabs">
                <button class="tab-btn ${this.collectionTab==="backs"?"active":""}" data-col-tab="backs">
                  🎴 Thiết Kế Mặt Lưng (${this.saveData.unlockedBacks.length}/${D.length})
                </button>
                <button class="tab-btn ${this.collectionTab==="skins"?"active":""}" data-col-tab="skins">
                  🎨 Thiết Kế Mặt Bài (${this.saveData.unlockedSkins.length}/${E.length})
                </button>
                <button class="tab-btn ${this.collectionTab==="compendium"?"active":""}" data-col-tab="compendium">
                  🔍 Soi 3D 48 Lá Bài Hoa
                </button>
              </div>
              <div class="sm-wallet">
                <span class="sm-coins">🪙 ${this.saveData.coins.toLocaleString("vi-VN")} Xu Hoa</span>
                <button class="nav-btn" id="btn-unlock-all-demo" title="Nhận 2000 Xu Hoa để trải nghiệm mua sắm & Gacha">
                  🎁 +2,000 Xu Trải Nghiệm
                </button>
              </div>
            </div>

            ${t}
          </div>
        </div>
      </div>
    `}buildCompendiumInspectorHTML(t){const e=et(t.month);return`
      <div style="font-size:11px; color:#9e1f28; font-weight:800;">
        BẤM VÀO LÁ BÀI ĐỂ LẬT MẶT TRƯỚC / MẶT LƯNG 3D
      </div>
      <div class="inspector-flippable-card ${this.inspectorFlipped?"flipped":""}" id="inspector-3d-card">
        <div class="inspector-face front">
          ${$(t,this.saveData.equippedSkin,!0)}
        </div>
        <div class="inspector-face back">
          ${B(this.saveData.equippedBack)}
        </div>
      </div>
      <button class="nav-btn" id="btn-flip-inspector" style="justify-content:center;">
        🔄 Lật Xem Mặt Lưng / Mặt Bài
      </button>
      <div>
        <span style="font-size:12px; color:#b87314; font-weight:800;">${e.viName} ・ ${t.kanji}</span>
        <h3 style="font-size:18px; color:#8f1822; margin:3px 0;">#${t.id}. ${t.viName}</h3>
        <span style="font-size:12px; color:var(--sakura); font-weight:800;">${t.jpName} (${t.points} Điểm)</span>
      </div>
      <p style="font-size:12.5px; color:var(--text-muted); line-height:1.45;">
        ${t.lore}
      </p>
      <div style="font-size:11.5px; color:#5a2716; background:#fff4e2; border:1px solid #e2be98; padding:8px; border-radius:10px; width:100%;">
        <strong>Ý nghĩa ${e.flower}:</strong> ${e.symbolism}
      </div>
    `}bindCompendiumInspectorFlipEvents(t){const e=t.querySelector("#inspector-3d-card"),i=t.querySelector("#btn-flip-inspector");e&&(e.onclick=()=>{this.inspectorFlipped=!this.inspectorFlipped,m.playCardSnap(!1),e.classList.toggle("flipped",this.inspectorFlipped)}),i&&e&&(i.onclick=()=>{this.inspectorFlipped=!this.inspectorFlipped,m.playCardSnap(!1),e.classList.toggle("flipped",this.inspectorFlipped)})}bindCollectionModalEvents(t){t.querySelector("#btn-close-modal").onclick=()=>{this.activeModal=null,this.renderActiveModal()},t.querySelector("#modal-backdrop-close").onclick=i=>{i.target===i.currentTarget&&(this.activeModal=null,this.renderActiveModal())},t.querySelectorAll("[data-col-tab]").forEach(i=>{i.onclick=()=>{const n=i.getAttribute("data-col-tab");this.collectionTab!==n&&(this.collectionTab=n,this.renderActiveModal())}});const e=t.querySelector("#btn-unlock-all-demo");e&&(e.onclick=()=>{m.playGachaReveal(!0),this.saveData.coins+=2e3,this.persistSave(),this.renderTopNav(),this.renderActiveModal()}),t.querySelectorAll("[data-equip-back]").forEach(i=>{i.onclick=()=>{this.saveData.equippedBack=i.getAttribute("data-equip-back"),m.playCardSnap(!1),this.persistSave(),this.renderCenterBoard(),this.renderActiveModal()}}),t.querySelectorAll("[data-buy-back]").forEach(i=>{i.onclick=()=>{const n=i.getAttribute("data-buy-back"),a=G(n);if(this.saveData.coins<a.price){alert(`Bạn cần ${a.price} Xu Hoa để mở khóa "${a.name}"! (Có thể bấm nút +2,000 Xu Trải Nghiệm hoặc thắng các ván bài)`);return}this.saveData.coins-=a.price,this.saveData.unlockedBacks.push(a.id),this.saveData.equippedBack=a.id,m.playGachaReveal(!0),this.persistSave(),this.renderTopNav(),this.renderCenterBoard(),this.renderActiveModal()}}),t.querySelectorAll("[data-equip-skin]").forEach(i=>{i.onclick=()=>{this.saveData.equippedSkin=i.getAttribute("data-equip-skin"),m.playCardSnap(!0),this.persistSave(),this.renderCenterBoard(),this.renderRightPanel(),this.renderActiveModal()}}),t.querySelectorAll("[data-buy-skin]").forEach(i=>{i.onclick=()=>{const n=i.getAttribute("data-buy-skin"),a=Y(n);if(this.saveData.coins<a.price){alert(`Bạn cần ${a.price} Xu Hoa để mở khóa "${a.name}"!`);return}this.saveData.coins-=a.price,this.saveData.unlockedSkins.push(a.id),this.saveData.equippedSkin=a.id,m.playGachaReveal(!0),this.persistSave(),this.renderTopNav(),this.renderCenterBoard(),this.renderRightPanel(),this.renderActiveModal()}}),this.bindCompendiumInspectorFlipEvents(t),t.querySelectorAll("[data-compendium-card]").forEach(i=>{i.onclick=()=>{const n=Number(i.getAttribute("data-compendium-card"));if(this.inspectedCardId===n&&!this.inspectorFlipped)return;this.inspectedCardId=n,this.inspectorFlipped=!1,m.playCardHover();const a=t.querySelector(".inspector-3d-stage"),o=I(this.inspectedCardId)||H[0];a&&(L(a,this.buildCompendiumInspectorHTML(o)),this.bindCompendiumInspectorFlipEvents(t)),t.querySelectorAll("[data-compendium-card]").forEach(s=>{s.classList.toggle("field-choice-candidate",Number(s.getAttribute("data-compendium-card"))===this.inspectedCardId)})}})}buildGachaModalHTML(){return`
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
                Số dư hiện tại: <strong>🪙 ${this.saveData.coins.toLocaleString("vi-VN")} Xu Hoa</strong>
              </div>
            </div>

            ${this.gachaResults.length>0?`
              <div class="kk-divider sm-divider" aria-hidden="true"></div>
              <h4 class="gacha-results-title">🎉 Kết quả rút quẻ vừa rồi</h4>
              <div class="collection-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
                ${this.gachaResults.map(t=>{const e=O[t.item.rarity],i=I(t.sampleCardId||45)||H[0];return`
                    <div class="collectible-item-card ${t.isNew?"is-new":""}">
                      <span class="rarity-tag">${e.label}</span>
                      <div class="preview-card-holder" style="width:78px; height:120px;">
                        ${t.kind==="back"?B(t.item.id):$(i,t.item.id,!0)}
                      </div>
                      <div style="font-size:12.5px; font-weight:800; color:#8f1822;">${t.item.name}</div>
                      <div style="font-size:10.5px; color:#7a5533; font-weight:700;">
                        ${t.kind==="back"?"Mặt Lưng Bài":`Lá: ${i.viName}`}
                      </div>
                      <div style="font-size:11px; color:${t.isNew?"var(--jade)":"#b87314"}; font-weight:800;">
                        ${t.isNew?"✨ MỚI MỞ KHÓA!":"🔄 Trùng (+90 Xu)"}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            `:""}
          </div>
        </div>
      </div>
    `}bindGachaModalEvents(t){t.querySelector("#btn-close-modal").onclick=()=>{this.activeModal=null,this.renderActiveModal()},t.querySelector("#modal-backdrop-close").onclick=o=>{o.target===o.currentTarget&&(this.activeModal=null,this.renderActiveModal())};const e=(o,s)=>{if(this.saveData.coins<s){alert(`Bạn cần ${s} Xu Hoa để rút quẻ! Hãy đấu thêm ván bài hoặc nhận Xu Trải Nghiệm trong Bộ Sưu Tập nhé.`);return}this.saveData.coins-=s;const r=[...D.filter(c=>!c.unlockedByDefault).map(c=>({kind:"back",item:c,weight:O[c.rarity].weight})),...E.filter(c=>!c.unlockedByDefault).map(c=>({kind:"skin",item:c,weight:O[c.rarity].weight}))],l=r.reduce((c,y)=>c+y.weight,0),h=[];let u=!1;const g=new Set((this.gachaResults||[]).map(c=>c.sampleCardId).filter(Boolean)),k=new Set;for(let c=0;c<o;c++){let y=Math.random()*l,T=r[0];for(const b of r){if(y<b.weight){T=b;break}y-=b.weight}const N=T.kind==="back"?!this.saveData.unlockedBacks.includes(T.item.id):!this.saveData.unlockedSkins.includes(T.item.id);N?T.kind==="back"?this.saveData.unlockedBacks.push(T.item.id):this.saveData.unlockedSkins.push(T.item.id):this.saveData.coins+=90,(T.item.rarity==="legendary"||T.item.rarity==="mythic")&&(u=!0);const R=H.filter(b=>!k.has(b.id)&&!g.has(b.id)),_=R.length>0?R:H,f=_[Math.floor(Math.random()*_.length)];k.add(f.id),h.push({...T,isNew:N,sampleCardId:f.id})}m.playGachaReveal(u),this.particles.triggerBurst(window.innerWidth/2,window.innerHeight/2,u?"#ffd166":"#ff758f",42),this.gachaResults=h,this.persistSave(),this.renderAll()},i=(o,s,r)=>{if(!o.classList.contains("is-shaking")){if(this.saveData.coins<r){e(s,r);return}o.classList.add("is-shaking"),setTimeout(()=>e(s,r),520)}},n=t.querySelector("#btn-gacha-1"),a=t.querySelector("#btn-gacha-5");n.onclick=()=>i(n,1,150),a.onclick=()=>i(a,5,650)}buildRulesModalHTML(){return`
      <div class="modal-backdrop" id="modal-backdrop-close">
        <div class="modal-window">
          <div class="modal-header">
            <h2>📜 Cẩm Nang Luật Chơi Bài Hoa (Hanafuda Koi-Koi) & Bảng Tổ Hợp Yaku</h2>
            <button class="close-modal-btn" id="btn-close-modal">✕</button>
          </div>
          <div class="modal-body">
            <button class="tut-replay-banner" id="btn-rules-open-tutorial">
              <img src="${j("ayame").avatar}" alt="" />
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
              ${it.map(t=>`
                <div style="background:#fffdf9; border:1.5px solid #e2be98; border-radius:14px; padding:12px; display:flex; flex-direction:column; gap:6px;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:#9e1f28; font-size:14.5px;">${t.viName} ・ ${t.jpName}</strong>
                    <span class="yaku-prog-badge" style="font-size:12px;">${t.basePoints} Điểm</span>
                  </div>
                  ${this.renderYakuCardStrip(t)}
                  <p style="font-size:12px; color:var(--text-muted); line-height:1.4;">${t.description}</p>
                  ${t.bonusRule?`<div style="font-size:11px; color:var(--jade); font-weight:700;">${t.bonusRule}</div>`:""}
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `}renderYakuCardStrip(t){const e=this.saveData.equippedSkin;let i=t.requiredCardIds||[],n=!1;if(i.length===0){n=!0;const o=(s,r)=>H.filter(l=>l.type===s).slice(0,r).map(l=>l.id);t.id==="tane"?i=o("tane",5):t.id==="tanzaku"?i=o("tanzaku",5):t.id==="kasu"&&(i=o("kasu",10))}const a=i.map(o=>I(o)).filter(Boolean);return a.length===0?"":`
      <div class="yaku-card-strip">
        ${n?'<span class="yaku-card-strip-note">Ví dụ</span>':""}
        ${a.map(o=>`<div class="yaku-strip-card" title="${o.viName} (Tháng ${o.month})">${$(o,e,!1)}</div>`).join("")}
      </div>
    `}bindRulesModalEvents(t){const e=t.querySelector("#btn-rules-open-tutorial");e&&(e.onclick=()=>this.openTutorial()),t.querySelector("#btn-close-modal").onclick=()=>{this.activeModal=null,this.renderActiveModal()},t.querySelector("#modal-backdrop-close").onclick=i=>{i.target===i.currentTarget&&(this.activeModal=null,this.renderActiveModal())}}maybeShowFirstTutorial(){this.saveData.tutorialSeen||this.activeModal||this.openTutorial()}openTutorial(){this.settingsMenuOpen=!1,this.tutorialStep=0,this.activeModal="tutorial",this.renderTopNav(),this.renderActiveModal()}closeTutorial(){this.saveData.tutorialSeen=!0,this.persistSave(),this.activeModal=null,this.renderActiveModal(),!this.isMultiplayerMatch()&&this.engine.phase==="AI_TURN"&&!this.isAnimating&&this.scheduleAiTurn()}tutorialCardHTML(t,e={}){const i=I(t);return i?`
      <div class="${["tut-card",`tut-card-${e.size||"md"}`,e.extraClass||""].join(" ").trim()}" title="${i.viName}">
        ${$(i,this.saveData.equippedSkin,!!e.badges)}
      </div>
    `:""}getTutorialSteps(){const t=o=>String(o||"").replace(/\s*\([^)]*[぀-ヿ一-鿿][^)]*\)/g,"").trim(),e=o=>it.find(s=>s.id===o),i=(o,s)=>this.tutorialCardHTML(o,s),n=(o,s,r={})=>{const l=e(o);if(!l)return"";const h=l.viName.replace(/\s*\(.*\)$/,"");return`
        <div class="tut-yaku-row">
          <div class="tut-yaku-info">
            <div class="tut-yaku-name">
              <span class="tut-yaku-romaji">${t(l.jpName)}</span>
              <span class="tut-yaku-vi">${h}</span>
            </div>
            <div class="tut-yaku-note">${r.note||""}</div>
          </div>
          <div class="tut-yaku-cards">
            ${s.map(u=>i(u,{size:"xs"})).join("")}
            ${r.more?`<span class="tut-more-chip">${r.more}</span>`:""}
          </div>
          <div class="tut-yaku-pts">${l.basePoints}<small>điểm</small></div>
        </div>
      `},a=(o,s,r)=>{const l=kt[o];return`
        <div class="tut-type-col">
          ${i(s,{size:"md",badges:!0})}
          <div class="tut-type-label" style="--type-color:${l.badgeColor}">
            <strong>${t(l.jpName)}</strong>
            <span>${l.viName}</span>
          </div>
          <p>${r}</p>
        </div>
      `};return[{title:"Chào ngươi, lữ khách!",text:"Ta là <b>Ayame</b>, vu nữ giữ đền Inari bên cầu Yatsuhashi. Hôm nay ta sẽ dạy ngươi chơi <b>Koi-Koi</b> – trò bài hoa <b>Hanafuda</b> của xứ Phù Tang.<br/>Luật rất gọn: <b>ăn lá bài cùng tháng</b>, gom chúng thành <b>bộ ăn điểm (Yaku)</b>. Sau các hiệp đấu, ai nhiều điểm hơn sẽ thắng.",stage:`
          <div class="tut-fan">
            ${[1,9,29,41,45].map(o=>i(o,{size:"lg"})).join("")}
          </div>
          <div class="tut-caption">5 lá <b>Hikari</b> – báu vật của bộ bài</div>
        `},{title:"48 lá bài – 12 tháng hoa",text:"Bộ bài có <b>48 lá</b>, chia cho <b>12 tháng</b>, mỗi tháng <b>4 lá</b> vẽ cùng một loài hoa.<br/>Nhìn hoa là biết tháng – đó chính là chìa khóa để ăn bài!",stage:`
          <div class="tut-month-row">
            <div class="tut-month-label"><b>Tháng 1</b><span>Matsu · Cây Tùng</span></div>
            <div class="tut-card-line">${[1,2,3,4].map(o=>i(o,{size:"sm"})).join("")}</div>
          </div>
          <div class="tut-month-row">
            <div class="tut-month-label"><b>Tháng 5</b><span>Ayame · Diên Vĩ</span></div>
            <div class="tut-card-line">${[17,18,19,20].map(o=>i(o,{size:"sm"})).join("")}</div>
          </div>
          <div class="tut-caption">Tháng 5 là tháng hoa của ta đấy, nhớ nhé!</div>
        `},{title:"4 loại lá bài",text:"Trong cùng một tháng, các lá có giá trị khác nhau. Có <b>4 loại</b> – mỗi bộ ăn điểm cần đúng loại lá, nên hãy nhớ kỹ:",stage:`
          <div class="tut-type-grid">
            ${a("hikari",29,"5 lá quý nhất")}
            ${a("tane",37,"9 lá chim, thú, đồ vật")}
            ${a("tanzaku",22,"10 lá có dải giấy thơ")}
            ${a("kasu",47,"24 lá chỉ có hoa lá")}
          </div>
        `},{title:"Lượt chơi ① – Đánh 1 lá trên tay",text:"Chọn <b>1 lá trên tay</b>. Nếu trên bàn có lá <b>cùng tháng</b>, ngươi ăn cả hai lá về khay của mình.<br/>Không có lá nào cùng tháng? Lá đó sẽ được đặt ngửa xuống bàn.",stage:`
          <div class="tut-flow">
            <div class="tut-flow-slot"><span class="tut-slot-tag">Trên tay</span>${i(18,{size:"lg"})}</div>
            <div class="tut-arrow">➜</div>
            <div class="tut-flow-slot"><span class="tut-slot-tag">Trên bàn</span>${i(17,{size:"lg",extraClass:"is-match"})}</div>
            <div class="tut-arrow">=</div>
            <div class="tut-flow-slot tut-win">
              <span class="tut-slot-tag gold">Ăn cả 2 lá!</span>
              <div class="tut-stack">${i(17,{size:"md"})}${i(18,{size:"md"})}</div>
            </div>
          </div>
          <div class="tut-caption">Cùng hoa <b>Diên Vĩ</b> (tháng 5) → ăn!</div>
        `},{title:"Lượt chơi ② – Lật bài từ chồng bốc",text:"Tiếp theo, lá trên cùng của <b>chồng bốc</b> được lật lên. Trùng tháng với lá trên bàn → ngươi ăn thêm một cặp nữa!<br/>Nếu trên bàn có <b>2 lá cùng tháng</b>, ngươi được chọn lá muốn ăn – hãy chọn lá giá trị hơn.",stage:`
          <div class="tut-flow">
            <div class="tut-flow-slot">
              <span class="tut-slot-tag">Chồng bốc</span>
              <div class="tut-card tut-card-lg tut-deck">${B(this.saveData.equippedBack)}</div>
            </div>
            <div class="tut-arrow">➜</div>
            <div class="tut-flow-slot"><span class="tut-slot-tag">Lật được</span>${i(34,{size:"lg"})}</div>
            <div class="tut-arrow">➜</div>
            <div class="tut-flow-slot">
              <span class="tut-slot-tag">Trên bàn có 2 lá tháng 9</span>
              <div class="tut-card-line">
                ${i(33,{size:"lg",extraClass:"is-pick"})}
                ${i(35,{size:"lg",extraClass:"is-dim"})}
              </div>
            </div>
          </div>
          <div class="tut-caption">Chọn <b>Chén Rượu</b> – lá Thú quý hơn lá Thường!</div>
        `},{title:"Bảng bộ ăn điểm ① – Quang & Rượu",text:"Đây là những bộ đáng giá nhất. Gom đủ các lá như hình là thành bộ.",stage:`
          <div class="tut-yaku-list">
            ${n("goko",[1,9,29,41,45],{note:"Đủ cả 5 lá Quang"})}
            ${n("shiko",[1,9,29,45],{note:"4 lá Quang, không có Người Đội Mưa"})}
            ${n("ameshiko",[1,9,29,41],{note:"4 lá Quang, có Người Đội Mưa"})}
            ${n("sanko",[1,9,45],{note:"3 lá Quang bất kỳ, trừ Người Đội Mưa"})}
            ${n("hanamizake",[9,33],{note:"Màn Anh Đào + Chén Rượu"})}
            ${n("tsukimizake",[29,33],{note:"Trăng Rằm + Chén Rượu"})}
          </div>
        `},{title:"Bảng bộ ăn điểm ② – Thú, Dải Thơ & Lá Thường",text:"Các bộ này dễ gom hơn. Bộ tính theo số lá còn được <b>+1 điểm</b> cho mỗi lá vượt mức.",stage:`
          <div class="tut-yaku-list">
            ${n("inoshikacho",[25,37,21],{note:"Lợn Rừng + Hươu + Bướm"})}
            ${n("akatan",[2,6,10],{note:"3 Dải Thơ Đỏ có chữ"})}
            ${n("aotan",[22,34,38],{note:"3 Dải Thơ Xanh"})}
            ${n("tane",[5,13,17,30,42],{note:"5 lá Thú bất kỳ"})}
            ${n("tanzaku",[2,14,18,26,43],{note:"5 lá Dải Thơ bất kỳ"})}
            ${n("kasu",[3,7,11,15,19,23],{note:"10 lá Thường bất kỳ",more:"+4 lá"})}
          </div>
          <div class="tut-tip">💡 Gom đủ cả Xích Đan lẫn Thanh Đan = bộ <b>Song Đan</b>, 10 điểm!</div>
        `},{title:"Koi-Koi hay Shōbu?",text:"Mỗi khi vừa ra bộ, ngươi phải chọn: <b>dừng lại ăn điểm</b>, hay <b>đánh tiếp</b> để gom thêm. Đây là lúc bản lĩnh lên tiếng!",stage:`
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
        `}]}buildTutorialModalHTML(){const t=this.getTutorialSteps(),e=t.length,i=Math.max(0,Math.min(this.tutorialStep||0,e-1)),n=t[i],a=i===0,o=i===e-1,s=j("ayame");return`
      <div class="modal-backdrop tutorial-backdrop" id="modal-backdrop-close">
        <div class="modal-window tutorial-window" role="dialog" aria-label="Hướng dẫn chơi">
          <aside class="tut-guide">
            <div class="tut-portrait">
              <img src="${s.avatar}" alt="${s.name}" draggable="false" />
            </div>
            <div class="tut-nameplate">
              <strong>${s.name}</strong>
              <span>Vu nữ đền Inari · Người dẫn đường</span>
            </div>
          </aside>

          <section class="tut-main">
            <div class="tut-topline">
              <span class="tut-step-kicker">Hướng dẫn · Bước ${i+1}/${e}</span>
              <button class="tut-skip-btn" id="btn-tut-skip">${o?"Đóng":"Bỏ qua ✕"}</button>
            </div>

            <div class="tut-bubble">
              <h3>${n.title}</h3>
              <p>${n.text}</p>
            </div>

            <div class="tut-stage">${n.stage}</div>

            <div class="tut-footer">
              <button class="tut-nav-btn ghost" id="btn-tut-prev" ${a?"disabled":""}>◀ Quay lại</button>
              <div class="tut-dots">
                ${t.map((r,l)=>`<button class="tut-dot ${l===i?"active":""} ${l<i?"done":""}" data-tut-step="${l}" aria-label="Bước ${l+1}"></button>`).join("")}
              </div>
              <button class="tut-nav-btn primary" id="btn-tut-next">
                ${o?"Vào trận! 🎴":"Tiếp ▶"}
              </button>
            </div>
          </section>
        </div>
      </div>
    `}bindTutorialModalEvents(t){const e=this.getTutorialSteps().length,i=r=>{this.tutorialStep=Math.max(0,Math.min(r,e-1)),m.playCardHover(),this.renderActiveModal()},n=t.querySelector("#btn-tut-next");n&&(n.onclick=()=>{(this.tutorialStep||0)>=e-1?this.closeTutorial():i((this.tutorialStep||0)+1)});const a=t.querySelector("#btn-tut-prev");a&&(a.onclick=()=>i((this.tutorialStep||0)-1));const o=t.querySelector("#btn-tut-skip");o&&(o.onclick=()=>this.closeTutorial()),t.querySelectorAll("[data-tut-step]").forEach(r=>{r.onclick=()=>i(Number(r.getAttribute("data-tut-step")))});const s=t.querySelector("#modal-backdrop-close");s&&(s.onclick=r=>r.stopPropagation())}}function Ot(){const d=()=>{if(!document.getElementById("hk-font-ui")){const e=document.createElement("link");e.id="hk-font-ui",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;500;700;800&display=swap",document.head.appendChild(e)}xt()},t=()=>setTimeout(d,1500);document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0})}function mt(){window.hanaKoiApp||(Dt(),window.hanaKoiApp=new Et,Ot())}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",mt):mt()})();
