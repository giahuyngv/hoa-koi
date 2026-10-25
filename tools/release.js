// Ra phiên bản mới: node tools/release.js patch|minor|major
// 1) Tăng "version" trong package.json (nguồn version duy nhất)
// 2) Đổi mục "## [Chưa phát hành]" trong CHANGELOG.md thành "## [x.y.z] - YYYY-MM-DD" và mở mục trống mới
// 3) Build lại bundle (version được nhúng vào game) và tăng ?v= trong index.html
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const kind = process.argv[2];
if (!['patch', 'minor', 'major'].includes(kind)) {
  console.error('Dùng: node tools/release.js patch|minor|major');
  process.exit(1);
}

const pkgFile = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
let [ma, mi, pa] = pkg.version.split('.').map(Number);
if (kind === 'major') { ma++; mi = 0; pa = 0; } else if (kind === 'minor') { mi++; pa = 0; } else pa++;
const ver = `${ma}.${mi}.${pa}`;

const clFile = path.join(root, 'CHANGELOG.md');
let cl = fs.readFileSync(clFile, 'utf8');
const head = '## [Chưa phát hành]';
const start = cl.indexOf(head);
if (start < 0) throw new Error('CHANGELOG.md thiếu mục "' + head + '"');
const next = cl.indexOf('\n## [', start + head.length);
const body = cl.slice(start + head.length, next < 0 ? cl.length : next).trim();
if (!body) {
  console.error('Mục [Chưa phát hành] đang trống — ghi thay đổi vào CHANGELOG.md trước.');
  process.exit(1);
}
const d = new Date();
const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
cl = cl.slice(0, start) + `${head}\n\n## [${ver}] - ${date}\n${body}\n` + (next < 0 ? '' : cl.slice(next));
fs.writeFileSync(clFile, cl, { encoding: 'utf8' });

pkg.version = ver;
fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n', { encoding: 'utf8' });

execFileSync(process.execPath, [path.join(__dirname, 'build_bundle.js')], { stdio: 'inherit' });

const idxFile = path.join(root, 'index.html');
const idx = fs.readFileSync(idxFile, 'utf8')
  .replace(/(app\.bundle\.js\?v=)(\d+)/, (_, p, n) => p + (Number(n) + 1))
  .replace(/(main\.min\.css\?v=)(\d+)/, (_, p, n) => p + (Number(n) + 1))
  .replace(/(mobile-compact\.min\.css\?v=)(\d+)/, (_, p, n) => p + (Number(n) + 1))
  .replace(/(loader\.js\?v=)(\d+)/, (_, p, n) => p + (Number(n) + 1));
fs.writeFileSync(idxFile, idx, { encoding: 'utf8' });

console.log(`✓ Đã ra bản v${ver} (${date})`);
