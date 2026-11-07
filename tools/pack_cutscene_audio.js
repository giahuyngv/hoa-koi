// Gói các file .mp3 của cutscene (public/assets/diorama/cutscene_m*/) thành audio_pack.js (base64)
// để phát được khi mở game bằng file:// (trình duyệt chặn fetch). Chạy lại mỗi khi đổi/thêm âm thanh cutscene.
// Dùng: node tools/pack_cutscene_audio.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const base = path.join(root, 'public', 'assets', 'diorama');
for (const dir of fs.readdirSync(base).filter((d) => /^cutscene_m\d+$/.test(d))) {
  const abs = path.join(base, dir);
  const files = fs.readdirSync(abs).filter((f) => f.endsWith('.mp3')).sort();
  if (!files.length) continue;
  const lines = files.map((f) => `A[${JSON.stringify(`public/assets/diorama/${dir}/${f}`)}]=${JSON.stringify(fs.readFileSync(path.join(abs, f)).toString('base64'))};`);
  const out = `/* Tự sinh bởi tools/pack_cutscene_audio.js, không sửa tay */\n(function(){var A=window.HK_CS_AUDIO=window.HK_CS_AUDIO||{};\n${lines.join('\n')}\n})();\n`;
  fs.writeFileSync(path.join(abs, 'audio_pack.js'), out);
  console.log(`${dir}/audio_pack.js: ${files.length} file, ${(out.length / 1024).toFixed(0)} KB`);
}
