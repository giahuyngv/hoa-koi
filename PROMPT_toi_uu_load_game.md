# PROMPT — Tối ưu tốc độ load & dung lượng game HOA KOI (Claude Code)

> Copy toàn bộ phần dưới đây dán vào Claude Code, mở tại thư mục game.

---

Bạn là kỹ sư tối ưu hiệu năng web game. Nhiệm vụ: làm game **HOA KOI (Hanafuda Koi-Koi 2.5D)** **load nhanh hơn và nhẹ hơn** mà **không thay đổi gameplay, luật, giao diện hay chất lượng hình ảnh mà người chơi nhìn thấy**.

## 0. Quy tắc bắt buộc (đọc trước khi làm)
- Đọc `AGENTS.md` trước và tuân thủ hoàn toàn (thư mục làm việc, build bundle, tăng `?v=`, sửa file bằng `[IO.File]::ReadAllText/WriteAllText` + `UTF8Encoding($false)`).
- Trả lời bằng tiếng Việt, ngắn gọn.
- **Không xóa file gốc.** Trước khi tối ưu ảnh/âm thanh, backup bản gốc vào `_backup_assets/` (thêm thư mục này vào `.dockerignore`).
- Không thêm npm package vào `server.js` / Docker image (giữ yêu cầu chống CVE). Công cụ tối ưu (sharp, esbuild, svgo…) chỉ dùng ở máy dev trong `tools/`, không vào image deploy.
- Giữ `index.html` mở được bằng `file://` (bundle IIFE) — không chuyển sang ES module.
- Làm theo từng giai đoạn, **dừng lại báo cáo sau Giai đoạn 1** để tôi duyệt kế hoạch trước khi sửa.

## Giai đoạn 1 — Đo & lập báo cáo (CHƯA sửa gì)
1. Liệt kê dung lượng toàn bộ `public/assets/` (cards, characters, backs, diorama), `src/app.bundle.js`, `src/styles/main.css`, font, âm thanh. Sắp xếp **top 20 file nặng nhất**.
2. Tổng dung lượng tải ở lần mở đầu tiên (những gì `index.html` tải ngay) vs. những gì chỉ cần khi vào trận / mở gacha / mở collection.
3. Kiểm tra: ảnh có kích thước pixel lớn hơn kích thước hiển thị thực tế không; ảnh nào đang là PNG/JPG có thể chuyển WebP/AVIF; SVG có thể minify; font load những weight/ký tự nào; code chết / hàm không dùng trong bundle; CSS không dùng.
4. Kiểm tra `server.js`: có gzip/brotli chưa, `Cache-Control`/`ETag` cho static chưa.
5. Nếu được, đo bằng Lighthouse / Chrome DevTools (Performance, Network, Coverage) với throttling "Fast 4G": ghi FCP, LCP, TTI, tổng bytes.
6. Xuất `PERF_REPORT.md` gồm bảng số liệu hiện tại + danh sách đề xuất xếp theo **(mức giảm dung lượng / thời gian) ÷ rủi ro**. → **Dừng, chờ tôi duyệt.**

## Giai đoạn 2 — Tối ưu asset (thường lợi nhất)
- **Ảnh lá bài (48 lá)**: resize về đúng kích thước hiển thị lớn nhất ×2 (cho màn retina), chuyển **WebP** (quality ~80–85, kiểm tra bằng mắt không vỡ nét viền cọ). Cân nhắc gộp thành **sprite sheet/atlas** nếu giảm số request đáng kể.
- **Ảnh nhân vật `*_v7.jpg`**: WebP, resize theo khung 3:4 hiển thị thực; tạo bản thumbnail nhỏ cho danh sách/collection, bản lớn chỉ tải khi xem chi tiết.
- **Diorama / tiểu cảnh / mặt sau bài**: WebP có alpha thay PNG; SVG chạy qua svgo (giữ `viewBox`, không phá filter).
- Giữ fallback: dùng `<picture>`/kiểm tra hỗ trợ WebP nếu cần, hoặc chỉ dùng WebP nếu mọi trình duyệt mục tiêu hỗ trợ.
- Viết script `tools/optimize_assets.js` để chạy lại được, cập nhật mọi đường dẫn trong `src/data/*` và CSS.

## Giai đoạn 3 — Tối ưu tải (loading strategy)
- **Tải theo màn**: màn hình chính chỉ tải asset cần cho menu; asset trong trận (48 lá, diorama, âm thanh) **preload ngầm** khi người chơi đang ở menu; asset gacha/collection/tutorial chỉ tải khi mở.
- Ảnh ngoài màn hình đầu: `loading="lazy"` + `decoding="async"`.
- `<link rel="preload">` cho 1–2 asset quan trọng nhất của màn đầu (font chính, ảnh nền); không preload tràn lan.
- **Âm thanh**: nén (OGG/MP3 bitrate hợp lý, mono cho SFX ngắn), chỉ decode khi cần, không tải nhạc nền trước khi người chơi tương tác.
- **Font (Yuji, v.v.)**: chỉ lấy weight thực dùng, `font-display: swap`, subset ký tự nếu tự host; nếu dùng Google Fonts thì dùng `&text=` cho font chỉ hiển thị vài chữ (tên Yaku).
- Thêm màn loading nhẹ có thanh tiến trình (nếu chưa có) để cảm giác nhanh hơn.

## Giai đoạn 4 — Tối ưu code
- `tools/build_bundle.js`: thêm bước **minify** (ví dụ esbuild chạy ở dev, output vẫn là IIFE `src/app.bundle.js`) + giữ bản không minify để debug (`app.bundle.dev.js`, không deploy).
- Minify `main.css`, xóa selector không dùng (cẩn thận class tạo động trong `main.js` như `.tut-*`, `.kiku-*`, `.anchor-*`).
- Xóa code chết/log debug; tách dữ liệu lớn ít dùng (collectionData, tutorial) ra file riêng tải sau nếu đáng kể.
- **Runtime**: kiểm tra `particles25d`, `cardAnimator`, tiểu cảnh 2.5D — giới hạn số particle, dùng `transform/opacity` thay vì thuộc tính gây layout, tránh `filter`/`backdrop-filter` nặng trên vùng lớn, dừng `requestAnimationFrame` khi tab ẩn hoặc không có animation.

## Giai đoạn 5 — Server & cache (`server.js`)
- Bật nén **gzip/brotli** bằng module `zlib` có sẵn của Node (không thêm package) cho `.js/.css/.html/.svg/.json`.
- `Cache-Control: public, max-age=31536000, immutable` cho asset có version (`?v=` hoặc hash trong tên file); `no-cache` cho `index.html`.
- Giữ nguyên `SECURITY_HEADERS`, whitelist static, CSP — nếu thêm nguồn font/ảnh mới thì cập nhật CSP tương ứng.

## Giai đoạn 6 — Kiểm tra & báo cáo cuối
1. Chạy `node tools/build_bundle.js`, tăng `?v=`, mở game qua cả `file://` và `node server.js`.
2. Chơi thử 1 trận đầy đủ (bốc bài, chọn lá khi trùng tháng, ăn Yaku → popup, Koi-Koi, kết thúc), mở gacha, collection, tutorial — **không có lỗi console, không có ảnh hỏng/thiếu**.
3. So sánh trực quan ảnh trước/sau ở các lá bài & nhân vật (chụp màn hình cạnh nhau).
4. Đo lại như Giai đoạn 1, cập nhật `PERF_REPORT.md` với bảng **Trước / Sau / % giảm** (tổng dung lượng, dung lượng lần tải đầu, số request, FCP, LCP).
5. Cập nhật `AGENTS.md` (mục build/asset) nếu có quy trình mới (vd: phải chạy `tools/optimize_assets.js` khi thêm ảnh).
6. Cập nhật `.dockerignore` / quy trình tạo `GAME_DEPLOY.zip` để không đóng gói `_backup_assets/`, file `.dev.js`, ảnh gốc chưa nén.

**Mục tiêu tham khảo:** giảm ≥50% tổng dung lượng asset, lần tải đầu (trước khi vào menu) < 1.5 MB, LCP < 2.5s trên Fast 4G.
