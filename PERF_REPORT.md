# PERF_REPORT — HOA KOI

Ngày đo: 2026-10-18 · `node server.js` (localhost:8123), Chromium trong app, viewport 1024px, DPR 1.25, **không throttle** (chưa chạy Lighthouse/Fast 4G).

## 1. Tổng quan

| Chỉ số | Hiện tại |
|---|---|
| Tổng `public/` | **~23 MB** (154 file trong `public/`+`src/`) |
| Tải lần đầu (mở game → vào trận ngay) | **4.66 MB / 40 request** (chưa tính file font woff2 từ gstatic) |
| FCP (local, không throttle) | 704 ms · DOMContentLoaded 413 ms · load 598 ms |
| `app.bundle.js` | 389 KB (gzip 98 KB · brotli 80 KB) — chưa minify |
| `main.css` | 363 KB (gzip 177 KB · brotli 101 KB) — chưa minify |
| Nén server | **Không** gzip/brotli |
| Cache server | **`no-store` cho mọi file** → mỗi lần mở lại tải lại toàn bộ |

> Game vào thẳng bàn chơi, nên "lần tải đầu" = asset của trận (portrait đối thủ, diorama tháng 9, lá bài trên bàn/tay, mặt sau).

## 2. Top 20 file nặng nhất

| # | File | KB | Ghi chú |
|---|---|---|---|
| 1 | characters/amaterasu.jpg | 951 | 896×1200 JPG chất lượng gần 100 |
| 2 | characters/yukiho.jpg | 904 | ″ |
| 3 | characters/kikumaru.jpg | 860 | ″ |
| 4 | characters/tsuruhime.jpg | 831 | ″ |
| 5 | characters/koharu.jpg | 830 | ″ |
| 6 | characters/kaguya.jpg | 815 | ″ |
| 7 | characters/michizane.jpg | 812 | ″ |
| 8 | characters/tsunade.jpg | 794 | ″ |
| 9 | characters/ayame.jpg | 791 | ″ (đang tải **2 lần** ở lần mở đầu) |
| 10 | characters/renji.jpg | 783 | ″ |
| 11 | characters/haruto.jpg | 779 | ″ |
| 12 | characters/shiori.jpg | 732 | ″ |
| 13 | yaku_popup/flower_kiku.png | 412 | PNG RGBA 512px |
| 14 | yaku_popup/sakura_curtain.png | 396 | ″ |
| 15 | src/app.bundle.js | 380 | chưa minify |
| 16 | yaku_popup/flower_wisteria.png | 362 | PNG RGBA |
| 17 | src/styles/main.css | 355 | chứa ~213 KB base64 PNG **bị lặp 2 lần** (4 ảnh × 2) |
| 18 | yaku_popup/flower_peony.png | 350 | PNG RGBA |
| 19 | yaku_popup/flower_willow.png | 333 | ″ |
| 20 | yaku_popup/flower_susuki.png | 318 | ″ |

Theo nhóm: characters 9.9 MB (+ cutout 1.7 MB) · yaku_popup 6.1 MB · cards 1.9 MB · diorama 1.2 MB · koikoi_scroll 0.8 MB · backs 0.7 MB.

## 3. Lần tải đầu — chi tiết (4.66 MB)

| Nhóm | KB | Cần ngay? |
|---|---|---|
| Portrait đối thủ `ayame.jpg` ×2 | 1584 | Có (1 lần) — hiển thị 311×969 khung 1600 |
| `app.bundle.js` + `main.css` | 735 | Có |
| Diorama tháng 9 (9 PNG + 4 cánh hoa ×2 URL) | ~1260 | Có, nhưng PNG quá nặng; cánh hoa tải 2 lần (có/không `?v=31`) |
| Google Fonts CSS | 237 | Có — nhưng kéo 6 họ font, 1051 `@font-face` |
| Lá bài + mặt sau + nền | ~800 | Có |

Chỉ tải khi cần (đã ổn): yaku_popup (khi ăn Yaku), cutout (cut-in Koi-Koi), koikoi_scroll (modal), pvp banner.

## 4. Phát hiện

**Ảnh**
- Portrait JPG nén gần lossless: WebP q82 cùng kích thước **9.9 MB → 1.76 MB (−83%)**; resize 640px rộng → 1.1 MB (−89%).
- yaku_popup PNG → WebP alpha q85: **6.1 MB → 1.5 MB (−76%)**.
- Diorama PNG → WebP alpha: **1.2 MB → 0.24 MB (−81%)**; kích thước pixel đã gần 2× hiển thị, giữ nguyên.
- Lá bài JPG (330×541, ≈2× hiển thị) → WebP q85: **1.9 MB → 1.0 MB (−47%)**.
- Mặt sau → WebP: 0.69 → 0.42 MB · pvp banner: 198 → 103 KB.
- cutout/koikoi_scroll đã là WebP: lợi ít (−9…17%), bỏ qua.
- `main.css` nhúng 4 PNG base64 (~107 KB) và mỗi cái **lặp 2 lần** → tách ra file WebP: CSS giảm ~210 KB.
- Cánh hoa diorama tải 2 lần do `cardArtwork.js` và `particles25d.js` dùng URL khác nhau (`?v=31` vs không).
- `ayame.jpg` tải 2 lần (do `no-store` cache + 2 thẻ `<img>`).

**Font**
- Google Fonts kéo `M PLUS 1p` (4 weight), `Noto Serif` (6 weight), `Noto Serif JP`, `Playfair Display`, `Yuji Boku`, `Yuji Syuku`. `M PLUS 1p` chỉ dùng cho `--font-ui`, `Yuji Syuku` dùng 1 chỗ. Noto Serif 500/600 có thể không dùng → cắt weight.
- Đã có `yuji_boku_yaku.woff2` tự host (11 KB) — tốt.

**Code**
- Bundle/CSS chưa minify. Không có `console.log` trong src.
- `particles25d` chạy `requestAnimationFrame` liên tục, không dừng khi tab ẩn / không có hạt.
- 5 chỗ `backdrop-filter` — cần xem vùng phủ.
- Không có audio file (âm thanh tổng hợp bằng WebAudio) → không cần tối ưu audio.

**Server (`server.js`)**
- Không nén; `Cache-Control: no-store` cho cả static; không ETag.

## 5. Đề xuất — xếp theo (lợi ích ÷ rủi ro)

| # | Việc | Lợi ích ước tính | Rủi ro |
|---|---|---|---|
| 1 | **server.js**: brotli/gzip (zlib có sẵn) cho js/css/html/svg/json + `Cache-Control` dài cho file có `?v=`, `no-cache`+ETag cho index.html | JS+CSS 735 → ~180 KB; lần mở lại ~0 MB | Thấp |
| 2 | **Portrait → WebP q82** (giữ 896×1200 hoặc 720px) | −8.1 MB tổng; lần đầu −0.65 MB | Thấp |
| 3 | **Diorama PNG → WebP alpha** + thống nhất URL cánh hoa | lần đầu −1 MB | Thấp |
| 4 | **Tách base64 khỏi main.css** ra WebP, bỏ bản lặp | CSS −210 KB | Thấp |
| 5 | Sửa tải trùng `ayame.jpg` / preload portrait đối thủ 1 lần | lần đầu −0.8 MB | Thấp |
| 6 | **yaku_popup PNG → WebP** + preload ngầm khi rảnh | −4.6 MB tổng, popup hiện nhanh hơn | Thấp |
| 7 | Lá bài + mặt sau + banner → WebP | −1.2 MB | Thấp–TB (kiểm mắt viền cọ) |
| 8 | Gọn Google Fonts: bỏ weight không dùng, cân nhắc bỏ M PLUS 1p/Yuji Syuku | −100…300 KB font | TB (đổi nét chữ nếu sai) |
| 9 | Minify bundle + CSS ở dev (esbuild, chỉ trong `tools/`), giữ `.dev.js` | −40% raw | TB |
| 10 | particles25d: dừng rAF khi tab ẩn / không có hạt | CPU/pin | Thấp |

Tất cả ảnh mới chỉ dùng WebP (mọi trình duyệt hiện đại hỗ trợ), backup gốc vào `_backup_assets/` (thêm vào `.dockerignore`), script `tools/optimize_assets.js` (dùng `sharp` chỉ ở máy dev; hoặc Python Pillow đã có sẵn).

**Dự kiến sau Giai đoạn 2–5:** tổng asset ~23 MB → **~7 MB (−70%)**; lần tải đầu 4.66 MB → **~1.2 MB** (đã nén), mở lại gần 0 nhờ cache.

---

## 6. Kết quả sau tối ưu (Giai đoạn 2–6, đã làm cả 10 đề xuất)

| Chỉ số | Trước | Sau | Giảm |
|---|---|---|---|
| Tổng `public/` | ~23 MB | **7.9 MB** | −66% |
| Ảnh đã chuyển WebP (107 file) | 19.5 MB | 4.9 MB | −75% |
| Tải lần đầu (bytes thực qua mạng, server local) | 4.66 MB | **~0.92 MB** + ~92 KB CSS Google Fonts | −78% |
| Số request lần đầu | 40 | 35 (yaku_popup + font menu tải ngầm sau `load` +1.5s) | |
| `app.bundle.js` (qua mạng) | 380 KB | 62 KB (minify + brotli) | −84% |
| CSS (qua mạng) | 355 KB | 60 KB (`main.min.css` + brotli) | −83% |
| Google Fonts CSS lần đầu | 237 KB | ~92 KB (M PLUS 1p tải trễ, Yuji Syuku `&text=`) | −61% |
| Mở lại lần 2 | tải lại toàn bộ (`no-store`) | ~0 KB (cache 1 năm cho `?v=`, 304 cho index.html) | ~−100% |
| FCP (local, không throttle) | 704 ms | 476 ms | −32% |

Chưa đo Lighthouse/Fast 4G (máy không có Chrome DevTools throttling trong môi trường này).

### Đã làm
1. **server.js**: brotli/gzip bằng `zlib` có sẵn (cache bản nén trong RAM theo ETag) cho html/js/css/json/svg; `ETag` + 304; `Cache-Control: public, max-age=31536000, immutable` khi URL có `?v=`, `no-cache` cho phần còn lại. `SECURITY_HEADERS`/CSP/whitelist giữ nguyên.
2. **Portrait** `characters/*.jpg` → `.webp` (q82, giữ 896×1200).
3. **Diorama** tháng 9 PNG → WebP alpha; cánh hoa dùng chung URL `?v=32` (hết tải 2 lần).
4. **main.css**: 4 mask base64 PNG (bị lặp) → 4 biến `--mask-*` trong `:root`, nén lại WebP → CSS 363 → 208 KB nguồn. (Giữ nhúng base64 vì `mask-image` từ file không chạy qua `file://`.)
5. Portrait đối thủ giờ chỉ tải 1 lần (cache hợp lệ).
6. **yaku_popup** PNG → WebP; tải ngầm lần lượt bằng `requestIdleCallback` sau khi trận hiện (`warmYakuRevealAssets`).
7. **Lá bài, mặt sau, pvp banner** → WebP (q85/q82).
8. **Font**: bỏ Noto Serif 500 (không dùng), Yuji Syuku chỉ lấy ký tự `(こい)`, M PLUS 1p (menu ⚙) chèn `<link>` sau khi load.
9. **Build**: `tools/build_bundle.js` ghi `src/app.bundle.dev.js` (debug, không deploy) + `src/app.bundle.js` minify + `src/styles/main.min.css` (esbuild chỉ trong `tools/node_modules`).
10. **particles25d**: dừng vòng `requestAnimationFrame` khi tab ẩn, chạy lại khi hiện.

Ảnh gốc nằm ở `_backup_assets/` (đã thêm `.dockerignore`). Chạy lại: `python tools/optimize_assets.py`.

### Đã kiểm tra
- `node server.js`: chơi tự động 1 tháng (đánh bài, chọn lá trùng tháng, ăn Yaku → SHŌBU → modal cuộn kết quả → sang tháng 2), mở Sưu Tập / Rút Quẻ / Ghép Trận: không lỗi console, không request 4xx, không ảnh hỏng.
- `file://` (Edge headless): game + tutorial hiển thị đúng.
