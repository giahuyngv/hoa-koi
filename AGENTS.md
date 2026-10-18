# HOA KOI (花恋) — Hanafuda Koi-Koi 2.5D

## Quy tắc
- Trả lời tiếng Việt, ngắn gọn. Chỉ sửa trong thư mục dự án này.
- Sửa `.js` trong `src/` hoặc `src/styles/main.css` → `node tools/build_bundle.js` (tạo `app.bundle.js` minify, `app.bundle.dev.js` để debug, `main.min.css`; lần đầu `npm install --prefix tools`), rồi tăng `?v=` của `app.bundle.js` và `main.min.css` trong `index.html` (bundle IIFE để chạy `file://`). Không sửa tay `app.bundle.js`/`main.min.css`.
- Ảnh mới (.jpg/.png) trong characters, yaku_popup, diorama, cards, backs → `python tools/optimize_assets.py` (chuyển WebP, gốc vào `_backup_assets/`), tham chiếu `.webp?v=` và tăng `?v=` khi đổi ảnh (server cache 1 năm cho URL có `?v=`).
- PowerShell ghi file: `[IO.File]::WriteAllText` + `UTF8Encoding($false)`, không `Set-Content`.
- Deploy/Dockerfile/server.js bảo mật → dùng skill `hoakoi-deploy`.

## Cấu trúc
`server.js` (Node, cổng 80, DB env hoặc `data/local_db.json`) · `src/data/` (cards, yaku, characters, collection) · `src/engine/koiKoiEngine.js` (luật + AI) · `src/main.js` (UI, vòng đời trận, modal) · `src/graphics/` · `src/audio/` · `src/ui/viewportScaler.js` (khung 1600×900; trong `#app` dùng `var(--avh)`/`var(--avw)`) · `src/styles/main.css` · `public/assets/`.

## Lưu ý
- Lá bài: tên là `viName`/`jpName` (không có `name`).
- Theme: light = Ōkami/Washi (`#f5ebd6`→`#ead7b3`, nút Vermilion); dark = Urushi (`#1d1628`→`#120d1a`, chữ `#fff`/`#ffd166`).
- `#draw-pile-stack` luôn trên chiếu; khi `PLAYER_SELECT_FIELD_DRAW`, `#drawn-card-reveal` lật ngửa đè trên bộ bài.
- Billboard: cụm trong `.kiku-board-plane` xoay bù `rotateX(calc(-1 * var(--board-tilt, 21deg)))`; `.kiku-left-plant-group` cố định dưới `#left-panel`; `.plant-br-tall` đè trên `#right-panel`/`.player-hand-zone`.
- Modal: dùng `updateModalMarkup()` (giữ backdrop/window, không chớp, giữ scroll); backdrop close check `e.target === e.currentTarget`; gacha không tái dùng `.preview-card-holder`.
- Ảnh nhân vật v7: bán tả thực Nhật, 18–45 tuổi, cổ phục cổ chữ Y, viền cọ fude, 3:4 waist-up, chừa 20% trên, nền Ukiyo-e + hào quang Washi.
