# Changelog — HOA KOI (花恋)

Mọi thay đổi đáng chú ý của game được ghi ở đây.
Định dạng theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/), đánh số theo [SemVer](https://semver.org/lang/vi/):
- **MAJOR** (x.0.0): thay đổi lớn, phá vỡ save/luật cũ.
- **MINOR** (1.x.0): thêm tính năng mới.
- **PATCH** (1.0.x): sửa lỗi, tối ưu nhỏ.

Nhóm mục: `Thêm` · `Thay đổi` · `Sửa lỗi` · `Tối ưu` · `Gỡ bỏ`.
Ghi thay đổi vào **[Chưa phát hành]**, khi ra bản chạy `node tools/release.js patch|minor|major`.

## [Chưa phát hành]
### Thêm
- Màn chính khi mở game (sau loading): logo 花恋 HOA KOI và 4 ô Cốt truyện / Đấu máy / PvP / Cài đặt; nút "Màn chính" trên thanh trên và menu ≡ để quay lại.
- Chế độ Cốt truyện "Hành trình 12 tháng" (chương Xuân, tháng 1–3): Ayame dẫn truyện, tạo lữ khách (4 chân dung + 6 gia huy + màu nền), bản đồ 4 mùa, hội thoại trước/sau trận, thử thách tháng, trận Koi-Koi thật với AI chủ tháng; sao (thắng / thử thách / cách biệt ≥5) đổi thành lượt bốc lá của tháng, lá trùng thành mảnh hoa, đủ 4 lá mở avatar chủ tháng. Lưu ở `saveData.storyProgress`.
- Màn chính: ô PvP = Ghép trận nhanh, ô dưới phải = Phòng mã, Cài đặt là nút nhỏ ở góc trên phải cạnh chip lữ khách; trong trận bỏ 2 nút Ghép Trận / Phòng Mã ở góc trên (chỉ vào từ Màn chính); trận cốt truyện thì nút góc trái ghi "Cốt truyện" (bấm để về bản đồ).
- Avatar lữ khách hiện ở ô điểm "Bạn" khi đấu máy; pop-up Koi-Koi của người chơi dùng ảnh riêng của lữ khách, cùng chữ và bố cục với pop-up của đối thủ.
- Sưu tầm: 5 skin mặt bài (Anh Đào Pastel, Thủy Mặc Sumi-e, Sơn Mài Hoàng Kim, Bách Quỷ Dạ Hành, Phù Thế Ánh Trăng) có bộ 48 lá vẽ riêng ở `public/assets/cards/<skin>/`, viền gốc được cắt và phủ khung chung theo từng skin; trận đấu và Sưu tầm tự dùng ảnh của skin đang chọn (Truyền Thống Edo giữ ảnh cũ).
- Bảng quyết định Koi-Koi/Shōbu có tiếng mở bảng (giấy lật trầm + phách gỗ nhẹ).
- Sưu tầm: skin mặt bài mới "Điểm Ảnh Cổ Điển (Pixel 16-bit)" (SR, 1200 xu, cửa hàng/gacha): 48 lá vẽ lại kiểu pixel art máy game 16-bit, khung pixel đinh tán vàng, ảnh ở `public/assets/cards/pixel_16bit/`.
- Mặt lưng mới "Lá Gai Đêm (Asanoha Kuro)" (SR, 800 xu, cửa hàng/gacha): sơn mài đen, hoa văn lá gai Asanoha in nổi; mặt lưng này không phủ lớp sóng mờ (`noWagara`).
- 13 mặt lưng mới vẽ kiểu sơn mài in chìm/nổi (cửa hàng/gacha, không phủ lớp sóng mờ): Mây Lành Chàm, Sóng Biển Đỏ Đô, Mai Rùa Trà Xanh, Thất Bảo Tử Đằng, Lông Tên Đêm, Anh Đào Phấn Hồng, Vảy Rồng Hoàng Kim, Bàn Cờ Hạt Dẻ, Hơi Nước Ngọc Bích, Da Cá Mập Bạc, Sương Hoàng Hôn, Đan Tre Rêu Xanh, Lá Gai Ngà Trắng. Ảnh ở `public/assets/backs/`.
### Thay đổi
- Thanh trên cùng trận (mobile/compact): pill Hiệp/Tháng luôn đúng tâm (grid 1fr·auto·1fr), chip Đối thủ sát trái pill, chip Bạn sát phải pill, tên không xuống dòng, nút Yaku dính mép phải.
- Ô Lữ khách (avatar + tên) ở góc trên phải màn chính rộng hơn: khoảng trống ngang trước/sau chữ tăng gấp 3 (desktop gap 30px/phải 48px, mobile 18px/30px).
- Khi ăn Yaku (cả người chơi và đối thủ), nhạc nền tạm dừng đúng lúc tiếng Koto của bộ vang lên rồi phát tiếp từ chỗ cũ (chỉ khi đang bật cả nhạc nền và hiệu ứng).
- Menu ⚙: mục Tiểu cảnh bàn chỉ ghi "Tháng N" (hoặc "Ngẫu nhiên · Tháng N"); menu tự giãn ngang theo chữ, không xuống dòng.
- Bảng Luật chơi & Yaku dùng khung "Bàn Chiếu" như các panel khác: viền sơn mài, nền chiếu, header chữ vàng, mục tiêu đề trên dải sơn mài, mỗi Yaku là một thẻ washi với nhãn điểm sơn mài; nút hướng dẫn đỏ son.
- Kết quả rút quẻ: thẻ đáp án thu nhỏ, 5 thẻ của lượt Rút 5 Quẻ nằm vừa một hàng (kèm tên và nhãn Mới/Trùng); trên điện thoại thẻ nhỏ hơn nữa.
- Bảng kết quả tháng/chung cuộc: khung điểm "Tổng Điểm Bạn VS đối thủ" dùng nền washi be giống thẻ ghi chú phía trên.
### Sửa lỗi
- Điện thoại (iPhone): nút "Sang tháng …" trên bảng kết quả hiệp không hiện (vẫn bấm được ở góc dưới phải) khi bảng có nhiều Yaku; hàng nút của bảng kết quả và bảng Koi-Koi/Shōbu nay nằm ngoài vùng cuộn nên luôn hiển thị.
- PvP: máy đối thủ thấy animation đánh/bốc bài cả ở nước ăn bộ (Koi-Koi/Shōbu) và thấy hiệu ứng yaku; nước đi không còn bị bỏ qua khi đang chạy hiệu ứng; hỏi server mỗi 0,5s. Ăn yaku là gửi ngay cho đối thủ (không chờ chọn Koi-Koi/Shōbu), đối thủ thấy dòng "đang cân nhắc". Lá đánh/lật ra mà không ăn cũng có animation bay xuống chiếu ở máy đối thủ.
- Ảnh ống Rút 5 Quẻ còn sót mảng nền trắng giữa dây tua và thân ống, nay đã xóa sạch.
- Ảnh thông (thong_dung_cao) tiểu cảnh tháng 1 thay mới nhưng bản deploy vẫn hiện ảnh cũ: URL ảnh month1 giữ `?v=1` nên trình duyệt dùng bản cache 1 năm; tăng lên `?v=2`.
- Bảng kết quả tháng hoà hiện thừa chữ `(引き分け)">` ở góc trái trên: tiêu đề có thẻ HTML làm vỡ thuộc tính aria-label, nay bỏ thẻ HTML trước khi đưa vào aria-label.
- iPhone: gõ tên ở màn Lữ khách (hay ô nhập bất kỳ) không còn làm cả UI co nhỏ khi bàn phím hiện: đang gõ thì giữ nguyên scale, rời ô nhập mới đo lại; ô nhập `.st-inp` / `.tt-input` dùng chữ 16px để iOS không tự zoom.
### Gỡ bỏ
- Bỏ nút "+2,000 Xu Trải Nghiệm" trong panel Sưu tầm (cùng lời nhắc tới nút này trong thông báo thiếu xu).
- Dọn CSS giao diện cuộn giấy cũ của bảng Koi-Koi/kết quả hiệp (.kk-scroll, .kk-roller, .kk-paper, .kk-sheet, .kk-title, nét cọ .kk-stroke-btn, cành mai, vệt mực, con dấu, cánh hoa) cùng keyframes và mask giấy nhúng base64 không còn dùng; giữ các lớp .kk-* bảng "Bàn Chiếu" và Rút quẻ vẫn dùng. CSS nhẹ hơn khoảng 28 KB (bản min).
- Gỡ 7 ảnh cuộn giấy cũ của Sưu tầm/Rút quẻ (paper, roller_top/bottom/body, divider, stroke_indigo/vermilion trong koikoi_scroll, chuyển vào _backup_assets) cùng CSS nền giấy, trục cuộn, đường chia, nét cọ và mask mép giấy nhúng base64 đã bị khung "Bàn Chiếu" ghi đè; khung không đổi, CSS nhẹ hơn khoảng 11 KB.

## [1.2.0] - 2026-10-25
### Thêm
- Bấm vào ảnh kỳ thủ trong bảng Chọn đối thủ để xem ảnh lớn toàn màn hình: khung sơn mài viền gấm, bảng tên (tháng, tên Nhật, danh hiệu không kèm tháng, độ khó, tiểu sử) và nút Khiêu chiến; đổi nhân vật bằng nút ‹ ›, phím ← → hoặc vuốt ngang, đóng bằng ✕, Esc hoặc chạm nền.
- Tiểu cảnh tháng 1 (Tùng Hạc & Mặt Trời Đỏ): mặt trời đỏ sau bàn, tùng lắc theo gió, dải thơ あのよろし đung đưa trên cành, hạc đứng thở, co chân, cúi cắp mồi; tùng hàng trên và hạc gắn theo mặt bàn khi đổi góc 2.5D nhưng luôn đứng thẳng, có bóng trên chiếu; mây trôi giống tháng 9. Trên điện thoại (bố cục thu gọn) dùng bố cục riêng: chỉ tùng và dải thơ, nằm dưới lá bài và mờ như tháng 9.
- Mỗi trận chọn ngẫu nhiên tiểu cảnh (tháng 1 hoặc tháng 9); menu ⚙ "Tiểu cảnh bàn" đổi giữa Ngẫu nhiên / Tháng 1 / Tháng 9 / Tắt (được lưu lại).
- Màn hình loading: nền Ukiyo-e ngày/đêm (theo theme đã lưu, chưa lưu thì theo dark mode của hệ thống), mỗi lần chọn ngẫu nhiên 1 bộ Yaku (Ngũ Quang, Trư Lộc Điệp, Xích Đan, Thanh Đan, Hoa/Nguyệt Kiến Tửu) lật dần theo tiến độ tải thật, cánh hoa rơi; xong thì mờ dần (fade) vào màn chơi.
### Thay đổi
- Bảng Quyết định Koi-Koi/Shōbu và bảng kết quả tháng/chung cuộc đổi sang phong cách panel "Bàn Chiếu": khung sơn mài nâu đen, nền chiếu cói như bàn chơi, 2 mép viền gấm đỏ-vàng, tiêu đề trên bảng sơn mài chữ vàng (font Noto Serif 900 cho tiêu đề có dấu), Yaku trên thẻ washi, nút chính đỏ son và nút phụ sơn mài viền vàng; giữ nguyên nội dung và cách chơi, trên điện thoại 2 nút vẫn ở 2 góc dưới.
- Bảng Chọn đối thủ (Đài Khiêu Chiến) đổi sang phong cách "Bàn Chiếu": mỗi kỳ thủ là một thẻ washi trên chiếu, banner ảnh khung sơn mài có dải gấm, đối thủ đang chọn viền vàng, nút Khiêu chiến đỏ son; thêm số đối thủ đã chinh phục cạnh chọn độ dài trận. Bỏ nhãn tuổi/giới tính trên ảnh, chỉ còn nhãn "✓ Đã thắng".
- Bảng Ghép trận và Phòng mã đổi sang phong cách "Bàn Chiếu": banner khung sơn mài, ô nhập và nút trên thẻ washi, dải chiếu báo đang tìm trận, mã phòng hiện như các thẻ gỗ sơn mài chữ vàng, nhãn Chủ phòng/Khách; giữ nguyên nội dung và cách hoạt động.
- Bảng Sưu tầm và Rút quẻ đổi từ cuộn giấy sang phong cách "Bàn Chiếu": tab như thẻ washi gài trên chiếu, vật phẩm trên thẻ washi (đang trang bị viền vàng, nút xanh ngọc), nút mua sơn mài viền vàng, nút trang bị đỏ son; Rút quẻ đặt trên thẻ washi với 2 nút ống quẻ gọn "Rút 1 Quẻ"/"Rút 5 Quẻ" (sơn mài và đỏ son), kết quả hiện trên dải chiếu.
- Popup đối thủ hô Koi-Koi dùng ảnh mới cho cả 12 đối thủ, mỗi người một pose và biểu cảm riêng hợp tính cách; nhân vật tháng 1, 2, 4, 6, 8, 11, 12 được phóng to thêm 15% và hạ thấp một chút.
- Popup đối thủ hô Koi-Koi: nền phía sau tối mờ để popup nổi hơn, hiện lâu hơn (~3 giây thay vì ~1,9 giây), chạm vào popup hoặc nền để đóng ngay.
- Theme game mặc định theo dark mode của máy (và tự đổi khi máy đổi) nếu người chơi chưa chọn Nền Sáng/Tối trong menu ⚙; đã chọn thì giữ lựa chọn.
### Sửa lỗi
- Cho phép nhúng game vào iframe trên innovation-center.zingplay.dev (CSP `frame-ancestors`), trước đó trang này hiển thị "refused to connect".
- Xáo bài đều thật sự (Fisher-Yates) thay cho cách `sort` ngẫu nhiên bị lệch.
- Game không còn trắng màn khi trình duyệt chặn lưu dữ liệu trang (Safari/iframe chặn localStorage).
- Chạm 2 lần nhanh vào Shōbu/Koi-Koi hoặc "Ván tiếp" không còn cộng điểm 2 lần hay nhảy qua 2 ván.
- Tên người chơi PvP bỏ ký tự `< > " ' &` để không vỡ giao diện.
- Bàn không còn đứng im khi một hiệu ứng lá bài/popup bị lỗi giữa chừng (lượt mình, lượt đối thủ, chọn lá ghép khi bốc): tự gỡ khoá, vẽ lại bàn và đi tiếp đúng lượt.
- PvP: chỉ chủ phòng chia bài khi sang ván/tái đấu (khách bấm thì hiện "Đang chờ chủ phòng…"), hết cảnh hai máy mỗi bên một bộ bài khác nhau.
- Bắt đầu trận/ván mới (hoặc tái đấu) khi đối thủ máy đang đánh dở không còn bị lượt cũ chạy tiếp, sửa bài của trận mới.
- PvP: state nhận từ đối thủ được xếp hàng xử lý tuần tự theo version, không còn hiệu ứng nước đi chồng nhau hay bị bỏ qua khi 2 state đến liên tiếp.
- Game không còn kẹt ở màn hình loading (chỉ thấy logo + nền) trên bản chạy qua server: script loading chuyển từ inline sang `src/loader.js` vì CSP `script-src 'self'` chặn script inline.

### Tối ưu
- Đánh/ăn/bốc bài không còn dựng lại cả bàn giữa hiệu ứng: bàn, tay, bài đối thủ và khay bài đã ăn chỉ vẽ lại lá/khối thay đổi, panel trái và thanh trên bỏ qua khi không đổi (iPad CPU chậm 4x: số khung giật >50ms mỗi lượt giảm ~3 → ~1,3).
- Chế độ đồ hoạ nhẹ (iPad/điện thoại): canvas hạt hoa vẽ ~30 khung/giây ở DPR 1, lớp mây tiểu cảnh bỏ mask-image (mép mờ bằng opacity), animation tiểu cảnh giữ nguyên → iPad ngang (CPU chậm 4x) từ ~22 lên ~38 FPS; chế độ thường không đổi.
- Chế độ đồ hoạ nhẹ: bóng mây trôi và cánh hoa rung trên chiếu làm cả mặt bàn vẽ lại mỗi khung → ẩn bóng mây, cánh hoa trên chiếu đứng yên (mây, cây, chén rượu, cánh hoa rơi vẫn chạy); hạt nổ khi ăn bài bay đúng tốc độ ở 30 khung/giây. Lúc đánh bài trên iPad mô phỏng ~41 → ~57 FPS.
- `mobile-compact.css` được nén thành `mobile-compact.min.css` khi build (index.html nạp bản nén), giảm dung lượng tải trên mobile.

## [1.1.0] - 2026-10-21
### Thêm
- Bốc bài chọn người đi trước (Bước 1 — Oya Kime): áp dụng ở Ván 1 của trận đấu; úp 2 lá bài ngẫu nhiên giữa chiếu bàn cờ để người chơi chạm bốc (đối thủ lấy lá còn lại), lật bài 3D kèm âm thanh `playCardFlip()`, so sánh tháng (hoặc điểm lá) để phân định người đi trước và hiển thị thông báo kết quả; trong PvP Online máy chủ `server.js` sinh và gửi canonical state đồng bộ hoàn toàn giữa hai bên.
- Hiệu ứng chia bài mở trận (Bước 2): chia tuần tự từng lá một (24 lá: Đối thủ $\rightarrow$ Chiếu $\rightarrow$ Tay mình $\times$ 8 vòng), quỹ đạo bay 3D mượt mà 60fps, khớp chuẩn xác tâm, tỉ lệ scale và độ nghiêng phối cảnh 2.5D (`rotateX`, `rotateY`, `rotateZ`, `perspective`) ở từng góc bàn cờ (chiếu, tay đối thủ và dock tay người chơi), đồng bộ nhịp nhàng với nút tốc độ trận và SFX chia bài `playCardDeal()`.
- Hiệu ứng mở đầu mỗi ván: chữ thư pháp Yuji Kanji tháng tiếng Nhật (`一月`, `二月`, `三月`...) hiện dần rồi mờ đi giữa màn hình (~1,2 giây) kèm tiếng trống Taiko + chiêng đồng trước khi bắt đầu ván.
- Âm thanh lá bài thật bản quyền CC0 (xào bài, chia bài, lật lá, đập lá) phát qua Web Audio API (tương thích iOS, tôn trọng nút bật/tắt SFX).
- Âm thanh nhạc cụ Nhật Bản & hiệu ứng thu âm thật bản quyền CC0 (VCSL & Kenney CC0, 1–18KB/file): trống Taiko + chiêng đồng khi mở đầu "Tháng X", 4 cấp bậc âm thanh đàn Koto & Hạc cầm khi thành bộ Yaku (Bậc 1 Bộ Thường mộc mạc, Bậc 2 Bộ Dải Thơ kèm chuông gió Furin, Bậc 3 Bộ Thú/Rượu cổ điển trầm ấm, Bậc 4 Bộ Quang mở chiêng đồng & hòa âm Koto 2 quãng tám), phách gỗ Hyoshigi khi Koi-Koi, tiếng mộc bản bấm nút và tiếng nhận Xu Hoa.
### Thay đổi
- Cập nhật 3 bản nhạc nền thu âm/phối khí thật phong cách Lowkey / Ambient cổ phong Nhật Bản của PeriTune (`Minamo — Mặt Nước Tĩnh Lặng`, `Minamo 2 — Hồ Đêm Gợn Sóng`, `Shizima 2 — Tĩnh Mịch Rừng Khuya`) thay cho nhạc tổng hợp bằng code, tích hợp vòng lặp Crossfade liền mạch qua Web Audio API và lưu bài đã chọn.
- Tối ưu Bốc bài chọn lượt (Bước 1): ẩn hoàn toàn bộ bài bốc phía sau; lật bài chuẩn xác mặt trước 1 trong 48 lá Hanafuda bằng hiệu ứng xoay 3D; tăng thời gian chờ tự động lên 10 giây; bỏ banner thông báo bên dưới; phóng to nhãn `★ ĐI TRƯỚC (親)` và dòng tên tháng; thêm lớp phủ mờ tối nền toàn màn hình và phóng to 2 lá bốc trên cả desktop lẫn mobile.
- Điều chỉnh tốc độ chia bài chậm lại: chuyển tốc độ cũ của mức 0.5x thành mức 0.75x (thời gian bay và nhịp chia giãn $1.5\times$), giúp quan sát đường bay từng lá rõ ràng và đĩnh đạc hơn trên mọi mức tốc độ.
- Mobile: bấm ô "Bạn đã ăn"/"Đối thủ đã ăn" mở panel toàn bộ lá đã ăn của người đó (bộ đã thành, bộ sắp thành, 4 hàng Quang/Thú/Dải/Thường) thay vì bảng Yaku.
- Đối thủ AI nghỉ ngẫu nhiên 0,65–1,25 giây (như đang suy nghĩ) trước mỗi lượt đánh.
### Sửa lỗi
- Ăn lá bài Quang (20đ) hoặc Chén Rượu Cúc không còn phát nhầm đoạn ngắn tiếng đàn Koto thành bộ rồi ngắt.
- Đổi bài nhạc nền không còn phát đè lên bài cũ (bài cũ tắt hẳn rồi mới vào bài mới).
- Lá bài đang bay không còn hiện đè lên cut-in Koi-Koi/Shōbu.
- Mobile: tiểu cảnh nền (bụi cúc trái/phải) không còn bị cắt ở mép vùng chơi, được thò ra phần nền hai bên tai thỏ.
- Hạ vị trí các lá bài trên tay người chơi trên giao diện mobile xuống sát mép dưới bàn chơi (tránh bị dính gần bộ bài và bài ngửa trên sân), đồng thời đưa layer panel chứa bài trên tay và các lá bài trên tay người chơi lên trên cùng của bàn chơi (cả theo `z-index` lẫn trục chiều sâu 3D `Z` trên iPad/Safari).
- Mobile: khi mở panel "Bài đã ăn", ẩn hoàn toàn lớp hiệu ứng lá bài bay/ghép cặp (`#fx-card-flight-layer`), đẩy `.hk-capv-backdrop` lên trước theo trục 3D, tạm hoãn lượt AI và bỏ qua hiệu ứng bay bài của đối thủ online (cập nhật trực tiếp danh sách lá trong panel) để lá bài lúc đánh và ăn không hiện đè lên panel.
- Mobile: mở rộng `.cutin-overlay` bù vùng safe-area 2 bên để dải cut-in Koi-Koi không bị cắt cụt mép màn hình; thu gọn kích thước chân dung/chữ (`.cutin-band.has-portrait`), dịch cụm popup xuống 40px và đồng bộ bộ font (`Yuji Boku`, `Yuji Syuku`, `Noto Serif`) khớp với bản web.

### Gỡ bỏ
- Bỏ thanh trạng thái/hướng dẫn lượt nằm giữa bài trên chiếu và bài trên tay.

## [1.0.0] - 2026-10-19
### Thêm
- Mốc phiên bản đầu tiên: toàn bộ game hiện tại (đấu AI, PvP, phòng tùy chỉnh, sưu tập, gacha Omikuji, hướng dẫn, popup Yaku, tối ưu mobile/iOS).
- Hệ thống changelog: `CHANGELOG.md`, version lấy từ `package.json`, hiện trong menu ⚙.
