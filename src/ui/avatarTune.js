// Thông số khung avatar đối thủ, riêng cho từng nhân vật
// - bs/bx/by: nền cảnh  — cỡ (%), dịch ngang/dọc (% khung)
// - cs/cx/cy: nhân vật  — cỡ (%), dịch ngang/dọc (% khung). Chỉ áp cho avatar động; ảnh tĩnh giữ nguyên
// - Chỉnh trực tiếp: mở game với ?avataredit=1, bấm "Sao chép" rồi dán vào AVATAR_TUNE bên dưới
// - Bề ngang cột avatar (--opp-col-w) dùng chung, mặc định trong main.css
export const AVATAR_TUNE = {
  tsuruhime: { bs: 101, bx: -10, by: 43, cs: 154, cx: 5, cy: 8 },
  michizane: { bs: 100, bx: -11, by: 0, cs: 105, cx: -3, cy: 8 },
  koharu: { bs: 100, bx: -10, by: 0, cs: 152, cx: 6, cy: 27 },
  shiori: { bs: 100, bx: -10, by: 0, cs: 120, cx: 7, cy: 15 },
  ayame: { bs: 100, bx: -10, by: 0, cs: 134, cx: 6, cy: 16 },
  yukiho: { bs: 100, bx: -10, by: 0, cs: 150, cx: -4, cy: 0 },
  tsunade: { bs: 100, bx: -10, by: 0, cs: 120, cx: 3, cy: 14 },
  kaguya: { bs: 100, bx: -9, by: 0, cs: 144, cx: -1, cy: 11 },
  kikumaru: { bs: 100, bx: -10, by: 0, cs: 120, cx: -6, cy: 21 },
  renji: { bs: 100, bx: -12, by: 0, cs: 134, cx: 2, cy: 25 },
  haruto: { bs: 100, bx: -10, by: 0, cs: 136, cx: 2, cy: 20 },
  amaterasu: { bs: 100, bx: -10, by: 0, cs: 149, cx: 4, cy: 25 },
};

const DEF = { bs: 100, bx: 0, by: 0, cs: 100, cx: 0, cy: 0 };
const EDIT_KEY = 'hanakoi_avatar_tune3';
const COLW_KEY = 'hanakoi_avatar_colw';
const isEditing = () => /[?&]avataredit=1\b/.test(location.search);

function readEdits() {
  try { return JSON.parse(localStorage.getItem(EDIT_KEY) || '{}') || {}; } catch (_) { return {}; }
}
function writeEdits(obj) {
  try { localStorage.setItem(EDIT_KEY, JSON.stringify(obj)); } catch (_) { /* private mode */ }
}

export function getAvatarTune(id) {
  const base = { ...DEF, ...(AVATAR_TUNE[id] || {}) };
  if (isEditing()) Object.assign(base, readEdits()[id] || {});
  return base;
}

let curCard = null;
let curId = null;

function setVars(card, t) {
  if (!card) return;
  const st = card.style;
  st.setProperty('--opp-bg-scale', String(t.bs / 100));
  st.setProperty('--opp-bg-x', `${t.bx}%`);
  st.setProperty('--opp-bg-y', `${t.by}%`);
  st.setProperty('--opp-char-scale', String(t.cs / 100));
  st.setProperty('--opp-char-x', `${t.cx}%`);
  st.setProperty('--opp-char-y', `${t.cy}%`);
}

// Gọi mỗi lần vẽ lại khung avatar đối thủ (renderLeftPanel)
export function applyAvatarTune(card, id) {
  curCard = card;
  curId = id || null;
  setVars(card, getAvatarTune(curId));
  if (isEditing()) refreshTuner();
}

// ---------------------------------------------------------------------------
// Bảng chỉnh (?avataredit=1)
// ---------------------------------------------------------------------------
const FIELDS = [
  { k: 'bs', label: 'Nền: cỡ', min: 50, max: 250, unit: '%' },
  { k: 'bx', label: 'Nền: dịch ngang', min: -100, max: 100, unit: '%' },
  { k: 'by', label: 'Nền: dịch dọc', min: -100, max: 100, unit: '%' },
  { k: 'cs', label: 'Nhân vật: cỡ', min: 50, max: 200, unit: '%' },
  { k: 'cx', label: 'Nhân vật: dịch ngang', min: -60, max: 60, unit: '%' },
  { k: 'cy', label: 'Nhân vật: dịch dọc', min: -60, max: 60, unit: '%' }
];

let tuner = null;

function buildTuner() {
  const root = document.documentElement;
  const box = document.createElement('div');
  box.className = 'hk-avatar-tuner';
  const title = document.createElement('b');
  box.appendChild(title);

  // Bề ngang cột (chung cho mọi nhân vật)
  const colLab = document.createElement('label');
  const colInp = document.createElement('input');
  colInp.type = 'range'; colInp.min = 220; colInp.max = 460; colInp.step = 1;
  let colSaved = null;
  try { colSaved = localStorage.getItem(COLW_KEY); } catch (_) { /* private */ }
  colInp.value = colSaved || 396;
  const syncCol = (save) => {
    colLab.textContent = `Bề ngang cột (chung): ${colInp.value}px`;
    root.style.setProperty('--opp-col-w', `${colInp.value}px`);
    if (save) { try { localStorage.setItem(COLW_KEY, colInp.value); } catch (_) { /* private */ } }
    window.dispatchEvent(new Event('resize'));
  };
  colInp.addEventListener('input', () => syncCol(true));
  box.append(colLab, colInp);

  const rows = FIELDS.map((f) => {
    const lab = document.createElement('label');
    const inp = document.createElement('input');
    inp.type = 'range'; inp.min = f.min; inp.max = f.max; inp.step = 1;
    inp.addEventListener('input', () => {
      if (!curId) return;
      const all = readEdits();
      all[curId] = { ...getAvatarTune(curId), [f.k]: Number(inp.value) };
      writeEdits(all);
      setVars(curCard, all[curId]);
      lab.textContent = `${f.label}: ${inp.value}${f.unit}`;
      showCode();
    });
    box.append(lab, inp);
    return { f, lab, inp };
  });

  const note = document.createElement('small');
  note.textContent = 'Chỉ áp cho avatar động (đồ hoạ đầy đủ, mở qua server). Ảnh tĩnh giữ nguyên.';
  const code = document.createElement('code');
  const showCode = () => {
    const all = readEdits();
    const ids = Object.keys(all);
    code.textContent = ids.length
      ? ids.map((id) => {
        const t = all[id];
        return `${id}: { bs: ${t.bs}, bx: ${t.bx}, by: ${t.by}, cs: ${t.cs}, cx: ${t.cx}, cy: ${t.cy} },`;
      }).join('\n') + `\n--opp-col-w: ${colInp.value}px;`
      : 'Chưa chỉnh nhân vật nào';
  };

  const copy = document.createElement('button');
  copy.textContent = 'Sao chép';
  copy.addEventListener('click', () => {
    if (navigator.clipboard) navigator.clipboard.writeText(code.textContent).catch(() => {});
    copy.textContent = 'Đã chép';
    setTimeout(() => { copy.textContent = 'Sao chép'; }, 1200);
  });
  const reset = document.createElement('button');
  reset.textContent = 'Về mặc định (nhân vật này)';
  reset.addEventListener('click', () => {
    if (!curId) return;
    const all = readEdits();
    delete all[curId];
    writeEdits(all);
    applyAvatarTune(curCard, curId);
  });
  box.append(note, code, copy, reset);
  document.body.appendChild(box);
  syncCol(false);

  tuner = {
    refresh() {
      const t = getAvatarTune(curId);
      title.textContent = `Chỉnh avatar: ${curId || '(không có đối thủ)'}`;
      rows.forEach(({ f, lab, inp }) => {
        inp.value = t[f.k];
        inp.disabled = !curId;
        lab.textContent = `${f.label}: ${t[f.k]}${f.unit}`;
      });
      showCode();
    }
  };
}

function refreshTuner() {
  if (!document.body) return;
  if (!tuner) buildTuner();
  tuner.refresh();
}
