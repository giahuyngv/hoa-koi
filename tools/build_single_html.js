// Đóng gói toàn bộ game HOA KOI (花恋) thành 1 file HTML duy nhất (HOAKOI_Standalone.html)
// có thể mở trực tiếp qua file:// hoặc gửi cho người khác chơi ngay không cần server/giải nén.
// Usage: node tools/build_single_html.js

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outHtmlPath = path.join(root, 'HOAKOI_Standalone.html');

// 1. Đảm bảo bundle mới nhất
require('./build_bundle.js');

let esbuild = null;
try {
  esbuild = require(path.join(__dirname, 'node_modules', 'esbuild'));
} catch (_) {}

// 2. Quét toàn bộ tài nguyên đang dùng trong public/assets (.webp, .woff2)
const MIME_BY_EXT = {
  '.webp': 'image/webp',
  '.woff2': 'font/woff2'
};

function walkDir(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkDir(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

const assetFiles = walkDir(path.join(root, 'public', 'assets'));
const assetMap = {}; // "public/assets/..." -> "data:<mime>;base64,..."
let assetCount = 0;

for (const file of assetFiles) {
  const ext = path.extname(file).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  if (!mime) continue; // Bỏ qua 4 file .png mask cũ không sử dụng
  const relKey = path.relative(root, file).replace(/\\/g, '/');
  const b64 = fs.readFileSync(file).toString('base64');
  assetMap[relKey] = `data:${mime};base64,${b64}`;
  assetCount++;
}

// 3. Đọc và gộp CSS (main.min.css + mobile-compact.css)
const mainCss = fs.readFileSync(path.join(root, 'src', 'styles', 'main.min.css'), 'utf8').replace(/^\uFEFF/, '');
const mobileCssRaw = fs.readFileSync(path.join(root, 'src', 'styles', 'mobile-compact.css'), 'utf8').replace(/^\uFEFF/, '');
const mobileCss = esbuild
  ? esbuild.transformSync(mobileCssRaw, { loader: 'css', minify: true, charset: 'utf8', target: ['chrome100', 'safari15', 'firefox100'] }).code
  : mobileCssRaw;
const combinedCss = mainCss + '\n' + mobileCss;

// 4. Đọc src/app.bundle.dev.js và chuyển mọi tham chiếu ./public/assets/... qua hàm lookup __hkA(...)
let jsDev = fs.readFileSync(path.join(root, 'src', 'app.bundle.dev.js'), 'utf8').replace(/^\uFEFF/, '');

// Cho phép Raster Cache hoạt động trên file:// vì ảnh đã là data: URI (không gây tainted canvas)
jsDev = jsDev.replace(
  "if (typeof document === 'undefined' || location.protocol === 'file:') off = true;",
  "if (typeof document === 'undefined') off = true;"
);

// a) Thay trong thuộc tính src="..." của HTML template literal
jsDev = jsDev.replace(/src="\.\/public\/assets\/([^"]+)"/g, 'src="${__hkA(\'public/assets/$1\')}"');
jsDev = jsDev.replace(/src="\$\{YR_ASSET_DIR\}([^"]+)"/g, 'src="${__hkA(`public/assets/yaku_popup/$1`)}"');

// b) Thay các template literal độc lập `./public/assets/...` và `${YR_ASSET_DIR}...`
jsDev = jsDev.replace(/`\.\/public\/assets\/([^`]+)`/g, '__hkA(`public/assets/$1`)');
jsDev = jsDev.replace(/`\$\{YR_ASSET_DIR\}([^`]+)`/g, '__hkA(`public/assets/yaku_popup/$1`)');

// c) Thay các string literal đơn './public/assets/...' (bỏ qua khai báo YR_ASSET_DIR)
jsDev = jsDev.replace(/'\.\/public\/assets\/(?!yaku_popup\/')([^']+)'/g, "__hkA('public/assets/$1')");

const jsFinal = esbuild
  ? esbuild.transformSync(jsDev, { minify: true, target: 'es2020', charset: 'utf8', legalComments: 'none' }).code
  : jsDev;

// 5. Tạo nội dung HTML độc lập
const html = `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <meta name="theme-color" content="#1a0f0a" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="screen-orientation" content="landscape" />
    <title>HOA KOI (花恋) - Đấu Bài Hoa Nhật Bản (Standalone)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600;700;800&family=Noto+Serif:wght@400;600;700;800;900&family=Noto+Serif+JP:wght@500;700&family=Playfair+Display:wght@700&family=Yuji+Boku&display=swap"
      rel="stylesheet"
    />
    <link href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&text=(%E3%81%93%E3%81%84)&display=swap" rel="stylesheet" />
    <script>
      window.__HK_ASSETS__ = ${JSON.stringify(assetMap)};
      window.__hkA = function (p) {
        var k = String(p).replace(/^(\\.\\.\\/)+|^\\.\\//, '').replace(/\\?.*$/, '');
        return window.__HK_ASSETS__[k] || p;
      };
      (function () {
        var rawCss = ${JSON.stringify(combinedCss)};
        var resolvedCss = rawCss.replace(/url\\((['"]?)(?:\\.\\.\\/)+(public\\/assets\\/[^)'"?]+)(?:\\?[^)'"]*)?\\1\\)/g, function (_, _q, relPath) {
          return 'url("' + window.__hkA(relPath) + '")';
        });
        var st = document.createElement('style');
        st.id = 'hk-standalone-styles';
        st.textContent = resolvedCss;
        document.head.appendChild(st);
      })();
    </script>
  </head>
  <body>
    <canvas id="particle-canvas"></canvas>
    <div id="app"></div>
    <script>
${jsFinal}
    </script>
  </body>
</html>
`;

fs.writeFileSync(outHtmlPath, html, { encoding: 'utf8' });
const sizeMB = (fs.statSync(outHtmlPath).size / (1024 * 1024)).toFixed(2);

// 6. Tự động kiểm tra tính toàn vẹn của file HTML xuất ra
const closeScripts = (html.match(/<\/script>/gi) || []).length;
const unresolvedJs = (jsFinal.match(/\.\/public\/assets\/[a-zA-Z0-9_./?=-]+/g) || []).filter(
  (m) => m !== './public/assets/yaku_popup/'
);
if (closeScripts !== 2 || unresolvedJs.length > 0) {
  console.error('! Cảnh báo đóng gói:', { closeScripts, unresolvedJs });
  process.exit(1);
}
console.log(`Built ${path.basename(outHtmlPath)} (${assetCount} assets embedded, ${sizeMB} MB) — OK`);

