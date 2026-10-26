// Rebuild src/app.bundle.js (IIFE) from the ES module sources so index.html works via file://
// Usage: node tools/build_bundle.js
// - src/app.bundle.dev.js : bản chưa minify để debug (không deploy)
// - src/app.bundle.js     : bản minify (esbuild trong tools/node_modules, cài bằng `npm install --prefix tools`)
// - src/styles/main.min.css: CSS minify từ src/styles/main.css (index.html dùng bản này)
// - src/styles/mobile-compact.min.css: CSS minify từ src/styles/mobile-compact.css (index.html dùng bản này)
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outFile = path.join(root, 'src', 'app.bundle.js');
const devFile = path.join(root, 'src', 'app.bundle.dev.js');

let esbuild = null;
try {
  esbuild = require(path.join(__dirname, 'node_modules', 'esbuild'));
} catch (_) {
  console.warn('! Chưa có esbuild (npm install --prefix tools) → ghi bản KHÔNG minify');
}

// Dependency order matters
const files = [
  'src/data/cardsData.js',
  'src/data/yakuData.js',
  'src/data/charactersData.js',
  'src/data/collectionData.js',
  'src/data/dioramaMonth1.js',
  'src/graphics/cardArtwork.js',
  'src/graphics/cardAnimator.js',
  'src/graphics/particles25d.js',
  'src/graphics/yakuReveal.js',
  'src/graphics/hacRig.js',
  'src/audio/soundEngine.js',
  'src/engine/koiKoiEngine.js',
  'src/services/multiplayerService.js',
  'src/ui/viewportScaler.js',
  'src/data/storyData.js',
  'src/story/storyMode.js',
  'src/main.js'
];

// Version lấy từ package.json (nguồn duy nhất) → nhúng vào bundle thành APP_VERSION
const appVersion = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;

let out = '(function () {\r\n  "use strict";\r\n  const APP_VERSION = ' + JSON.stringify(appVersion) + ';\r\n';
for (const rel of files) {
  let src = fs.readFileSync(path.join(root, rel), 'utf8').replace(/^\uFEFF/, '');
  src = src.replace(/^import\s[\s\S]*?\sfrom\s+['"][^'"]+['"];?[ \t]*\r?\n/gm, '');
  src = src.replace(/^import\s+['"][^'"]+['"];?[ \t]*\r?\n/gm, '');
  src = src.replace(/^export\s+(const|let|var|function|class|async function)\s/gm, '$1 ');
  src = src.replace(/^export\s+default\s+/gm, '');
  if (/^\s*export\s/m.test(src)) throw new Error('Unhandled export in ' + rel);
  out += '\r\n  // ============================================================================\r\n';
  out += '  // FILE: ' + rel + '\r\n';
  out += '  // ============================================================================\r\n';
  out += src.endsWith('\n') ? src : src + '\n';
}
out += '})();\r\n';
fs.writeFileSync(devFile, out, { encoding: 'utf8' }); // UTF-8 without BOM
const js = esbuild ? esbuild.transformSync(out, { minify: true, target: 'es2020', charset: 'utf8', legalComments: 'none' }).code : out;
fs.writeFileSync(outFile, js, { encoding: 'utf8' });
console.log('Built', path.relative(root, outFile), 'v' + appVersion, '(' + out.length + ' -> ' + js.length + ' chars)');

// CSS: [nguồn, bản minify] — index.html dùng bản .min.css
const cssFiles = [
  ['main.css', 'main.min.css'],
  ['mobile-compact.css', 'mobile-compact.min.css']
];
for (const [inName, outName] of cssFiles) {
  const cssIn = path.join(root, 'src', 'styles', inName);
  const cssOut = path.join(root, 'src', 'styles', outName);
  const cssSrc = fs.readFileSync(cssIn, 'utf8').replace(/^\uFEFF/, '');
  const css = esbuild ? esbuild.transformSync(cssSrc, { loader: 'css', minify: true, charset: 'utf8', target: ['chrome100', 'safari15', 'firefox100'] }).code : cssSrc;
  fs.writeFileSync(cssOut, css, { encoding: 'utf8' });
  console.log('Built', path.relative(root, cssOut), '(' + cssSrc.length + ' -> ' + css.length + ' chars)');
}
