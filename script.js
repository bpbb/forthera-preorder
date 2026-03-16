// ═══════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwXkXP-rwsfDoqkz6fshE7WU83LunoakRkXo-7LLbfqypQKpKnBL6lJTyzYppq3RKkA2A/exec";

const PRICING = {
  base: 59,
  FREE_L: 3,
  FREE_S: 4,
  sExtra1: 3,   // 1 extra S-deco
  sExtra2: 5,   // 2 extra S-decos (bundle)
  lExtra1: 7,   // 1 extra L-item
  lExtra3: 20,  // 3 extra L-items (bundle)
  smallKc: 10,
  recycledKc: 15,
};

const STEP_LABELS = ['Info', 'Rope', 'Ring', 'Letters', 'S Decos', 'Recycled KC', 'Mini KC', 'Summary', 'Contact'];

// ═══════════════════════════════════════════════════════════════════
// PRODUCT DATA
// ═══════════════════════════════════════════════════════════════════

// ── Ropes: no images yet, emoji fallback ──────────────────────────
const ROPE_EMOJIS = ['🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🌸'];
const ROPE_COLORS = Array.from({ length: 10 }, (_, i) => ({
  id: `rope_${i + 1}`,
  name: `Color ${i + 1}`,
  image: '',
  emoji: ROPE_EMOJIS[i],
  stock: 15,
}));

// ── Clasp rings: 9 images from images/rings/ ──────────────────────
const CLASP_EMOJIS = ['⚪','🔘','🔵','🟣','🟡','🟠','🔴','🟤','🔲'];
const CLASP_FILES  = [
  'IMG_8079','IMG_8080','IMG_8081','IMG_8082','IMG_8083',
  'IMG_8084','IMG_8085','IMG_8086','IMG_8087',
];
const CLASP_COLORS = CLASP_FILES.map((file, i) => ({
  id: `clasp_${i + 1}`,
  name: `Color ${i + 1}`,
  image: `images/rings/${file}.jpg`,
  emoji: CLASP_EMOJIS[i],
  stock: 10,
}));

// ── Letters A–Z: real images per letter, stock 7 per color ────────
// Letters not listed below have no stock (show disabled)
const LETTER_IMAGES = {
  // each entry: { file, stock }
  A: [
    { file: 'IMG_8002', stock: 10 },
    { file: 'IMG_8003', stock: 1 },
    { file: 'IMG_8004', stock: 3 },
    { file: 'IMG_8005', stock: 2 },
    { file: 'IMG_8006', stock: 2 },
    { file: 'IMG_8007', stock: 3 },
    { file: 'IMG_8008', stock: 2 },
    { file: 'IMG_8009', stock: 2 },
  ],
  B: [
    { file: 'IMG_8010', stock: 10 },
    { file: 'IMG_8011', stock: 1 },
    { file: 'IMG_8012', stock: 1 },
    { file: 'IMG_8013', stock: 2 },
  ],
  C: [
    { file: 'IMG_7913', stock: 1 },
    { file: 'IMG_7914', stock: 1 },
    { file: 'IMG_7915', stock: 1 },
    { file: 'IMG_7916', stock: 1 },
  ],
  D: [
    { file: 'IMG_7924', stock: 2 },
  ],
  E: [
    { file: 'IMG_8014', stock: 2 },
    { file: 'IMG_8016', stock: 1 },
    { file: 'IMG_8017', stock: 9 },
    { file: 'IMG_8018', stock: 4 },
    { file: 'IMG_8019', stock: 3 },
    { file: 'IMG_8020', stock: 1 },
    { file: 'IMG_8021', stock: 3 },
    { file: 'IMG_8022', stock: 3 },
  ],
  F: [
    { file: 'IMG_7983', stock: 1 },
    { file: 'IMG_7984', stock: 1 },
    { file: 'IMG_7985', stock: 1 },
    { file: 'IMG_7986', stock: 1 },
  ],
  G: [
    { file: 'IMG_7987', stock: 1 },
    { file: 'IMG_7988', stock: 1 },
    { file: 'IMG_7989', stock: 2 },
    { file: 'IMG_7990', stock: 1 },
    { file: 'IMG_7991', stock: 1 },
  ],
  H: [
    { file: 'IMG_7912', stock: 1 },
  ],
  I: [
    { file: 'IMG_8023', stock: 1 },
    { file: 'IMG_8024', stock: 3 },
    { file: 'IMG_8025', stock: 5 },
    { file: 'IMG_8026', stock: 2 },
    { file: 'IMG_8027', stock: 3 },
    { file: 'IMG_8028', stock: 2 },
    { file: 'IMG_8029', stock: 1 },
    { file: 'IMG_8030', stock: 3 },
    { file: 'IMG_8031', stock: 1 },
    { file: 'IMG_8032', stock: 1 },
  ],
  J: [
    { file: 'IMG_7925', stock: 1 },
    { file: 'IMG_7926', stock: 2 },
  ],
  K: [
    { file: 'IMG_7992', stock: 2 },
    { file: 'IMG_7993', stock: 1 },
    { file: 'IMG_7994', stock: 2 },
    { file: 'IMG_7995', stock: 1 },
  ],
  L: [
    { file: 'IMG_7996', stock: 3 },
    { file: 'IMG_7997', stock: 1 },
    { file: 'IMG_7998', stock: 1 },
    { file: 'IMG_7999', stock: 1 },
    { file: 'IMG_8001', stock: 1 },
  ],
  M: [
    { file: 'IMG_8033', stock: 1 },
    { file: 'IMG_8034', stock: 2 },
    { file: 'IMG_8035', stock: 1 },
    { file: 'IMG_8036', stock: 1 },
    { file: 'IMG_8037', stock: 2 },
    { file: 'IMG_8038', stock: 3 },
    { file: 'IMG_8039', stock: 3 },
    { file: 'IMG_8040', stock: 1 },
  ],
  N: [
    { file: 'IMG_8041', stock: 2 },
    { file: 'IMG_8042', stock: 3 },
    { file: 'IMG_8043', stock: 4 },
    { file: 'IMG_8044', stock: 1 },
    { file: 'IMG_8045', stock: 3 },
    { file: 'IMG_8046', stock: 1 },
    { file: 'IMG_8047', stock: 3 },
  ],
  O: [
    { file: 'IMG_7960', stock: 2 },
    { file: 'IMG_7961', stock: 2 },
    { file: 'IMG_7962', stock: 4 },
    { file: 'IMG_7963', stock: 1 },
    { file: 'IMG_7964', stock: 3 },
    { file: 'IMG_7965', stock: 2 },
    { file: 'IMG_7966', stock: 2 },
  ],
  P: [
    { file: 'IMG_7953', stock: 1 },
    { file: 'IMG_7954', stock: 2 },
    { file: 'IMG_7955', stock: 2 },
    { file: 'IMG_7956', stock: 1 },
    { file: 'IMG_7957', stock: 3 },
    { file: 'IMG_7958', stock: 2 },
    { file: 'IMG_7959', stock: 2 },
  ],
  Q: [
    { file: 'IMG_7927', stock: 1 },
    { file: 'IMG_7928', stock: 2 },
    { file: 'IMG_7929', stock: 2 },
    { file: 'IMG_7930', stock: 1 },
  ],
  R: [
    { file: 'IMG_7922', stock: 1 },
    { file: 'IMG_7923', stock: 1 },
  ],
  S: [
    { file: 'IMG_7976', stock: 3 },
    { file: 'IMG_7977', stock: 3 },
    { file: 'IMG_7978', stock: 2 },
    { file: 'IMG_7979', stock: 2 },
    { file: 'IMG_7980', stock: 1 },
    { file: 'IMG_7981', stock: 1 },
    { file: 'IMG_7982', stock: 2 },
  ],
  T: [
    { file: 'IMG_7931', stock: 1 },
    { file: 'IMG_7932', stock: 1 },
    { file: 'IMG_7933', stock: 4 },
    { file: 'IMG_7934', stock: 1 },
    { file: 'IMG_7935', stock: 2 },
    { file: 'IMG_7936', stock: 2 },
    { file: 'IMG_7937', stock: 2 },
  ],
  U: [
    { file: 'IMG_7967', stock: 3 },
    { file: 'IMG_7968', stock: 2 },
    { file: 'IMG_7969', stock: 2 },
    { file: 'IMG_7970', stock: 1 },
    { file: 'IMG_7972', stock: 2 },
    { file: 'IMG_7973', stock: 2 },
    { file: 'IMG_7974', stock: 1 },
    { file: 'IMG_7975', stock: 1 },
  ],
  V: [
    { file: 'IMG_7920', stock: 1 },
    { file: 'IMG_7921', stock: 2 },
  ],
  W: [
    { file: 'IMG_7945', stock: 1 },
    { file: 'IMG_7947', stock: 1 },
    { file: 'IMG_7948', stock: 3 },
  ],
  X: [
    { file: 'IMG_7938', stock: 2 },
    { file: 'IMG_7939', stock: 1 },
    { file: 'IMG_7940', stock: 1 },
    { file: 'IMG_7941', stock: 2 },
    { file: 'IMG_7942', stock: 1 },
    { file: 'IMG_7943', stock: 2 },
    { file: 'IMG_7944', stock: 1 },
  ],
  Y: [
    { file: 'IMG_7917', stock: 1 },
    { file: 'IMG_7918', stock: 1 },
  ],
  Z: [
    { file: 'IMG_7949', stock: 2 },
    { file: 'IMG_7950', stock: 1 },
    { file: 'IMG_7951', stock: 3 },
    { file: 'IMG_7952', stock: 1 },
  ],
};
const L_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
  const variants_data = LETTER_IMAGES[letter] || [];
  const variants = variants_data.length > 0
    ? variants_data.map((v, i) => ({
        id: `letter_${letter}_${i + 1}`,
        color: `Color ${i + 1}`,
        image: `images/letters_7/${letter}/${v.file}.jpg`,
        stock: v.stock,
      }))
    : [{ id: `letter_${letter}_1`, color: 'Color 1', image: '', stock: 0 }];
  return { id: `letter_${letter}`, name: letter, type: 'letter', emoji: letter, variants };
});

// ── L-Decorations: subfolders = designs, images within = colors ───
const L_DECO_DATA = {
  bells: {
    name: 'Bells', emoji: '🔔',
    variants: [
      { file: 'IMG_8088', stock: 10 },
      { file: 'IMG_8089', stock: 10 },
      { file: 'IMG_8090', stock: 10 },
      { file: 'IMG_8091', stock: 10 },
      { file: 'IMG_8092', stock: 10 },
      { file: 'IMG_8093', stock: 10 },
      { file: 'IMG_8094', stock: 10 },
      { file: 'IMG_8095', stock: 10 },
    ],
  },
  bows: {
    name: 'Bows', emoji: '🎀',
    variants: [
      { file: 'IMG_8096', stock: 2 },
      { file: 'IMG_8097', stock: 3 },
      { file: 'IMG_8098', stock: 2 },
      { file: 'IMG_8099', stock: 1 },
      { file: 'IMG_8100', stock: 1 },
    ],
  },
  flowers: {
    name: 'Flowers', emoji: '🌸',
    variants: [
      { file: 'IMG_8101', stock: 2 },
      { file: 'IMG_8103', stock: 2 },
      { file: 'IMG_8104', stock: 2 },
      { file: 'IMG_8105', stock: 2 },
      { file: 'IMG_8106', stock: 1 },
    ],
  },
};
const L_SPECIALS = Object.entries(L_DECO_DATA).map(([key, data]) => ({
  id: `ldeco_${key}`,
  name: data.name,
  emoji: data.emoji,
  type: 'special',
  variants: data.variants.map((v, i) => ({
    id: `ldeco_${key}_${i + 1}`,
    color: `Color ${i + 1}`,
    image: `images/large_decorations_7/${key}/${v.file}.jpg`,
    stock: v.stock,
  })),
}));

const L_ITEMS = [...L_LETTERS, ...L_SPECIALS];

// ── S-Decorations: 30 items from images/small_decorations_3/ ─────
const S_DECO_FILES = [
  'IMG_8048','IMG_8049','IMG_8050','IMG_8051','IMG_8052','IMG_8053',
  'IMG_8054','IMG_8055','IMG_8056','IMG_8057','IMG_8058','IMG_8059',
  'IMG_8060','IMG_8061','IMG_8062','IMG_8063','IMG_8064','IMG_8066',
  'IMG_8067','IMG_8068','IMG_8069','IMG_8070','IMG_8071','IMG_8072',
  'IMG_8073','IMG_8074','IMG_8075','IMG_8076','IMG_8077','IMG_8078',
];
const S_DECO_EMOJIS = ['❤️','⭐','⚫','🔶','💜','🌸','💙','💚','🤍','🧡','❤️','⭐','⚫','🔶','💜','🌸','💙','💚','🤍','🧡','❤️','⭐','⚫','🔶','💜','🌸','💙','💚','🤍','🧡'];
const S_DECO_STOCKS = [
  20, 20, 20, 20, 20, 20, 20, 20,       // sdeco_1–8 (IMG_8048–8055)
  30, 30, 30, 30, 30, 30, 30, 30, 30,   // sdeco_9–17 (IMG_8056–8064)
  30, 30, 30, 30, 30,                    // sdeco_18–22 (IMG_8066–8070, skip 8065)
  8, 14, 5, 8, 3, 6, 9, 7,              // sdeco_23–30 (IMG_8071–8078, hearts)
];
const S_DECOS = S_DECO_FILES.map((file, i) => ({
  id: `sdeco_${i + 1}`,
  name: `S-Deco ${i + 1}`,
  shape: `S-Deco ${i + 1}`,
  color: '',
  emoji: S_DECO_EMOJIS[i],
  colorHex: '#c0d8f0',
  image: `images/small_decorations_3/${file}.jpg`,
  stock: S_DECO_STOCKS[i] ?? 0,
}));

// ── Mini keychains (฿10): 17 items from images/small_keychains_10/
const SMALL_KC_FILES = [
  'IMG_1570','IMG_1572','IMG_1573','IMG_1574','IMG_1575','IMG_1576','IMG_1577',
  'IMG_1578','IMG_1579','IMG_1580','IMG_1581','IMG_1582','IMG_1583','IMG_1585',
  'IMG_1586','IMG_1587',
];
const SMALL_KC_EMOJIS = ['🔑','🏅','🎀','⚡','🌟','🦋','✨','💎','🌈','🍀','🎵','🎯','🔮','🌺','🦄','💫'];
const SMALL_KC_STOCKS = {
  'IMG_1574': 3, 'IMG_1585': 3, 'IMG_1587': 3,
  'IMG_1586': 2,
  'IMG_1575': 1,
};
const SMALL_KEYCHAINS = SMALL_KC_FILES.map((file, i) => ({
  id: `sk_${i + 1}`,
  name: `Design ${i + 1}`,
  image: `images/small_keychains_10/${file}.jpg`,
  emoji: SMALL_KC_EMOJIS[i],
  stock: SMALL_KC_STOCKS[file] ?? 1,
  price: 10,
}));

// ── Large keychains add-on (฿15): 22 items from images/large_keychains_15/
const LARGE_KC_FILES = [
  'IMG_1547','IMG_1549','IMG_1550','IMG_1551','IMG_1552','IMG_1553','IMG_1554',
  'IMG_1555','IMG_1556','IMG_1557','IMG_1558','IMG_1559','IMG_1560','IMG_1561',
  'IMG_1562','IMG_1563','IMG_1564','IMG_1565','IMG_1566','IMG_1567','IMG_1568',
  'IMG_1569',
];
const LARGE_KC_EMOJIS = ['🔑','🏅','🎀','⚡','🌟','🦋','✨','💎','🌈','🍀','🎵','🎯','🔮','🌺','🦄','💫','🧸','🌻','🦊','🐻','🌙','⭐'];
const LARGE_KEYCHAINS = LARGE_KC_FILES.map((file, i) => ({
  id: `lk_${i + 1}`,
  name: `Design ${i + 1}`,
  image: `images/large_keychains_15/${file}.jpg`,
  emoji: LARGE_KC_EMOJIS[i],
  stock: 1,
  price: 15,
}));

const ALL_SMALL_KEYCHAINS = [...SMALL_KEYCHAINS, ...LARGE_KEYCHAINS];

// ── Recycled mini keychains: no images yet, emoji fallback ────────
const RECYCLED_KC_EMOJIS = ['♻️','🌿','🌊','🍃','🌸','🌈','🦋','🌻'];
const RECYCLED_AVAILABLE_COLORS = ['Red','Blue','Yellow','Green','Pink','Purple','White','Black'];
const RECYCLED_KEYCHAINS = Array.from({ length: 8 }, (_, i) => ({
  id: `rk_${i + 1}`,
  name: `Design ${i + 1}`,
  image: '',
  emoji: RECYCLED_KC_EMOJIS[i],
  stock: 5,
  price: 15,
  availableColors: RECYCLED_AVAILABLE_COLORS,
}));

// ═══════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════

let state = {
  step: 1,
  lSubStep: 0,      // 0 = select letters, 1 = pick colors
  rope: null,
  clasp: null,
  lItems: [],       // selected L-item ids
  lItemColors: {},  // { itemId: variantId }
  sDecos: {},       // { decoId: qty }
  smallKc: {},      // { id: qty }
  recycledKc: [],   // [{ id, colors: [c1, c2?] }]
  freeRecycledKc: null,  // { id, colors: [] } — 1 free pre-order bonus piece
  pieceOrder: [],        // flat ordered array of pieces for drag preview
  buyerName: '',
  buyerIG: '',
  buyerLine: '',
  buyerNotes: '',
  deliveryMethod: '',   // 'market' | 'kmutt' | 'other'
  deliveryKmuttLocation: '',
  deliveryKmuttDate: '',
  deliveryOtherAddress: '',
  slipBase64: null,
  stock: {},        // { itemId: available } fetched from backend
};

// ═══════════════════════════════════════════════════════════════════
// STOCK HELPERS
// ═══════════════════════════════════════════════════════════════════

function getStock(itemId) {
  if (state.stock[itemId] !== undefined) return state.stock[itemId];
  const allVariants = L_ITEMS.flatMap(i => i.variants);
  const allItems = [...ROPE_COLORS, ...CLASP_COLORS, ...allVariants, ...S_DECOS, ...ALL_SMALL_KEYCHAINS, ...RECYCLED_KEYCHAINS];
  return allItems.find(i => i.id === itemId)?.stock ?? 99;
}

// Total stock across all color variants for an L-item (for the selection step)
function lItemTotalStock(lItem) {
  return lItem.variants.reduce((sum, v) => sum + getStock(v.id), 0);
}

// How many times an L-item id appears in the current selection
function lItemCount(id) {
  return state.lItems.filter(i => i === id).length;
}

async function fetchStock() {
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=getStock`);
    const data = await res.json();
    state.stock = data;
    renderStep(state.step);
  } catch (_) { /* silent fail, use default stock */ }
}

// ═══════════════════════════════════════════════════════════════════
// PROGRESS BAR
// ═══════════════════════════════════════════════════════════════════

function updateProgress(step) {
  const bar = document.getElementById('progress-bar');
  const title = document.getElementById('step-title');
  if (!bar) return;
  bar.innerHTML = STEP_LABELS.map((label, i) => {
    const n = i + 1;
    const cls = n < step ? 'done' : n === step ? 'active' : '';
    return `
      <div class="prog-step ${cls}">
        <div class="prog-dot">${n < step ? '✓' : n}</div>
        <div class="prog-label">${label}</div>
      </div>
      ${n < 9 ? '<div class="prog-line"></div>' : ''}
    `;
  }).join('');
  if (title) title.textContent = `Step ${step}: ${STEP_LABELS[step - 1]}`;
}

// ═══════════════════════════════════════════════════════════════════
// STEP RENDERERS
// ═══════════════════════════════════════════════════════════════════

function renderStep(n, scrollToTop = false) {
  const app = document.getElementById('app');
  if (scrollToTop) window.scrollTo(0, 0);
  switch (n) {
    case 1: app.innerHTML = renderInfo(); break;
    case 2: app.innerHTML = renderColorGrid('rope', ROPE_COLORS, 'Choose Your Rope Color', '1 rope is included in the Starter Pack. Select one.', state.rope); break;
    case 3: app.innerHTML = renderColorGrid('clasp', CLASP_COLORS, 'Choose Your Ring Color', '1 clasp ring is included. Select one.', state.clasp); break;
    case 4: app.innerHTML = state.lSubStep === 0 ? renderLetterSelect() : renderLetterColors(); break;
    case 5: app.innerHTML = renderSDecos(); break;
    case 6: app.innerHTML = renderRecycledKc(); break;
    case 7: app.innerHTML = renderSmallKc(); break;
    case 8: buildPieceOrder(); app.innerHTML = renderSummary(); initSortable(); break;
    case 9: app.innerHTML = renderContact(); break;
  }
  updateProgress(n);
  updateNav(n);
}

// ── Step 1: Info ──────────────────────────────────────────────────
function renderInfo() {
  return `
    <div class="step-page">
      <h2>Welcome to Forthera 🔑</h2>
      <p class="step-desc">Build your own custom keychain step by step. Here's everything you need to know before starting.</p>

      <div class="info-card">
        <h3>🎁 Starter Pack — <strong>฿59</strong></h3>
        <ul>
          <li>✓ <strong>Step 2</strong> — Choose 1 rope color</li>
          <li>✓ <strong>Step 3</strong> — Choose 1 clasp ring color</li>
          <li>✓ <strong>Step 4</strong> — Choose at least 2 letters + up to 1 L-decoration (3 pieces included free). <em>At least 2 must be letters A–Z.</em></li>
          <li>✓ <strong>Step 5</strong> — Choose 4 S-Decorations (hearts, stars, circles) included free</li>
          <li>✓ <strong>Step 6</strong> — Pick your FREE recycled mini keychain (pre-order bonus!)</li>
          <li>➕ <strong>Step 7</strong> — Optional: add mini keychains at ฿10 each</li>
          <li>⭐ <em>Pre-order bonus:</em> FREE recycled mini keychain!</li>
        </ul>
      </div>

      <div class="info-card extras">
        <h3>➕ Add-On Pricing</h3>
        <table>
          <tr><td>Extra S-Decoration</td><td>฿3 each <span class="deal">(2 for ฿5)</span></td></tr>
          <tr><td>Extra Letter / L-Decoration</td><td>฿7 each <span class="deal">(3 for ฿20)</span></td></tr>
          <tr><td>Mini Keychain (Step 7)</td><td>฿10 each</td></tr>
          <tr><td>Extra Recycled Mini Keychain (Step 6)</td><td>฿15 each</td></tr>
        </table>
      </div>

      <div class="info-card note">
        <p>⚠️ Each item has <strong>limited stock</strong> shown in the form.<br/>
        Not sure about something? Contact us at <strong>...</strong></p>
      </div>
    </div>
  `;
}

// ── Step 2 & 3: Color grid (generic single-select) ────────────────
function renderColorGrid(type, items, title, desc, selectedId) {
  const cells = items.map(item => {
    const avail = getStock(item.id);
    const isSel = selectedId === item.id;
    const isOut = avail <= 0;
    return `
      <div class="img-card ${isSel ? 'selected' : ''} ${isOut ? 'disabled' : ''}"
           onclick="${isOut ? '' : `selectSingle('${type}','${item.id}')`}">
        <div class="img-slot">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span class="img-fallback">${item.emoji}</span>
        </div>
        <div class="img-label">${item.name}</div>
        <div class="img-stock ${avail <= 3 ? 'low' : ''}">${avail} left</div>
      </div>
    `;
  }).join('');
  return `
    <div class="step-page">
      <h2>${title}</h2>
      <p class="step-desc">${desc}</p>
      <div class="img-grid">${cells}</div>
    </div>
  `;
}

function selectSingle(type, id) {
  if (type === 'rope')  state.rope  = id;
  if (type === 'clasp') state.clasp = id;
  renderStep(state.step);
}

// ── Step 4a: Select letters / L-decorations ───────────────────────
function renderLetterSelect() {
  const count       = state.lItems.length;
  const letterCount = state.lItems.filter(id => id.startsWith('letter_')).length;
  const freeCount   = Math.min(count, PRICING.FREE_L);
  const extraCount  = Math.max(0, count - PRICING.FREE_L);

  function cardHtml(item) {
    const cnt        = lItemCount(item.id);
    const totalStock = lItemTotalStock(item);
    const outOfStock = totalStock <= 0;
    const atMax      = cnt >= totalStock;
    const isSpecial  = item.type === 'special';
    return `
      <div class="lcard ${cnt > 0 ? 'selected' : ''} ${outOfStock ? 'disabled' : ''}">
        <div class="lcard-name">${isSpecial ? item.emoji + ' ' + item.name : item.name}</div>
        <div class="lcard-stock ${totalStock <= 3 ? 'low' : ''}">${totalStock} left</div>
        <div class="lcard-ctrl" onclick="event.stopPropagation()">
          <button class="lcard-btn" onclick="removeLItem('${item.id}')" ${cnt <= 0 ? 'disabled' : ''}>−</button>
          <span class="lcard-count">${cnt}</span>
          <button class="lcard-btn" onclick="addLItem('${item.id}')" ${outOfStock || atMax ? 'disabled' : ''}>+</button>
        </div>
      </div>`;
  }

  const letterCards  = L_LETTERS.map(cardHtml).join('');
  const specialCards = L_SPECIALS.map(cardHtml).join('');

  let statusMsg;
  if (letterCount < 2) {
    statusMsg = `<p class="warn">At least 2 must be letters A–Z (currently ${letterCount}/2 letters).</p>`;
  } else if (count < 2) {
    statusMsg = `<p class="warn">Select at least 2 items total (${count}/2).</p>`;
  } else {
    statusMsg = `<p class="hint-next">✓ ${count} piece${count > 1 ? 's' : ''} selected (${letterCount} letter${letterCount !== 1 ? 's' : ''}). Click Next to choose colors.</p>`;
  }

  return `
    <div class="step-page">
      <h2>Letters & L-Decorations</h2>
      <p class="step-desc"><strong>3 included free</strong>, then ฿7 each (3 for ฿20).<br>
      <strong>Rule:</strong> At least 2 pieces must be letters A–Z. You can pick the same letter multiple times.</p>
      <div class="selection-counter">
        Letters: <strong>${letterCount}</strong> &nbsp;|&nbsp; L-Decos: <strong>${count - letterCount}</strong> &nbsp;|&nbsp; Total: <strong>${count}</strong>
        ${extraCount > 0 ? `<span class="counter-detail">(${freeCount} free + ${extraCount} extra = +฿${calcExtraLCost(extraCount)})</span>` : `<span class="counter-detail">(${freeCount}/${PRICING.FREE_L} free included)</span>`}
      </div>
      <h3 class="group-label">Letters A – Z</h3>
      <div class="lcard-grid">${letterCards}</div>
      <h3 class="group-label" style="margin-top:1.25rem">Special L-Decorations</h3>
      <div class="lcard-grid special">${specialCards}</div>
      ${statusMsg}
    </div>
  `;
}

function addLItem(id) {
  const slotIdx = state.lItems.length;
  state.lItems.push(id);
  // Auto-select the color if only 1 variant exists (e.g. L-deco designs)
  const item = L_ITEMS.find(i => i.id === id);
  if (item && item.variants.length === 1) {
    state.lItemColors[slotIdx] = item.variants[0].id;
  }
  renderStep(4);
}

function removeLItem(id) {
  // Find and remove the last occurrence, shift lItemColors accordingly
  let lastIdx = -1;
  for (let i = state.lItems.length - 1; i >= 0; i--) {
    if (state.lItems[i] === id) { lastIdx = i; break; }
  }
  if (lastIdx === -1) return;
  state.lItems.splice(lastIdx, 1);
  // Rebuild index-based color map, dropping the removed slot
  const newColors = {};
  Object.entries(state.lItemColors).forEach(([k, v]) => {
    const ki = Number(k);
    if (ki < lastIdx) newColors[ki] = v;
    else if (ki > lastIdx) newColors[ki - 1] = v;
  });
  state.lItemColors = newColors;
  renderStep(4);
}

// ── Step 4b: Pick color for each selected L-item ──────────────────
function renderLetterColors() {
  const sections = state.lItems.map((itemId, idx) => {
    const item = L_ITEMS.find(i => i.id === itemId);
    const chosenVariantId = state.lItemColors[idx];   // index-based

    const chips = item.variants.map(v => {
      const avail = getStock(v.id);
      const isSel = chosenVariantId === v.id;
      return `
        <div class="color-chip ${isSel ? 'selected' : ''} ${avail <= 0 ? 'disabled' : ''}"
             onclick="${avail > 0 ? `pickLetterColor(${idx},'${v.id}')` : ''}">
          <div class="color-img-slot">
            <img src="${v.image}" alt="${v.color}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <span class="img-fallback" style="font-size:1.2rem">${item.emoji || item.name}</span>
          </div>
          <div class="color-label">${v.color}</div>
          <div class="img-stock ${avail <= 3 ? 'low' : ''}" style="font-size:0.62rem">${avail} left</div>
        </div>
      `;
    }).join('');

    return `
      <div class="letter-color-section ${chosenVariantId ? 'done' : ''}">
        <h3>${idx + 1}. ${item.type === 'letter' ? `Letter "${item.name}"` : item.name + ' ' + (item.emoji || '')}</h3>
        <div class="color-chip-grid">${chips}</div>
      </div>
    `;
  }).join('');

  const allPicked = state.lItems.every((_id, idx) => state.lItemColors[idx]);
  return `
    <div class="step-page">
      <h2>Choose Colors for Your Letters</h2>
      <p class="step-desc">Pick a color for each selected letter or decoration.</p>
      ${sections}
      ${!allPicked ? '<p class="warn">Choose a color for every item before continuing.</p>' : ''}
    </div>
  `;
}

function pickLetterColor(slotIdx, variantId) {
  state.lItemColors[slotIdx] = variantId;   // index-based
  renderStep(4);
}

// ── Step 5: S-Decorations ─────────────────────────────────────────
function renderSDecos() {
  const totalQty = Object.values(state.sDecos).reduce((s, q) => s + q, 0);
  const freeQty  = Math.min(totalQty, PRICING.FREE_S);
  const extraQty = Math.max(0, totalQty - PRICING.FREE_S);

  const cells = S_DECOS.map(item => {
    const qty   = state.sDecos[item.id] || 0;
    const avail = getStock(item.id);
    return `
      <div class="deco-card ${qty > 0 ? 'selected' : ''} ${avail <= 0 ? 'disabled' : ''}">
        <div class="img-slot small" style="background:${item.colorHex}33">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span class="img-fallback" style="font-size:1.6rem">${item.emoji}</span>
        </div>
        <div class="img-label">${item.name}</div>
        <div class="img-stock ${avail <= 3 ? 'low' : ''}">${avail} left</div>
        <div class="qty-ctrl">
          <button onclick="changeSQty('${item.id}',-1)" ${qty <= 0 ? 'disabled' : ''}>−</button>
          <span>${qty}</span>
          <button onclick="changeSQty('${item.id}',1)" ${avail <= 0 ? 'disabled' : ''}>+</button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="step-page">
      <h2>S-Decorations</h2>
      <p class="step-desc"><strong>4 included free</strong>. Extra: ฿3 each (2 for ฿5). Hearts, stars, circles in 6 colors.</p>
      <div class="selection-counter">
        Total: <strong>${totalQty}</strong>
        ${totalQty > 0 ? `<span class="counter-detail">(${freeQty} free${extraQty > 0 ? ` + ${extraQty} extra = +฿${calcExtraSCost(extraQty)}` : ''})</span>` : ''}
      </div>
      <div class="deco-grid">${cells}</div>
      ${totalQty === 0 ? '<p class="warn">Add at least 1 decoration.</p>' : ''}
    </div>
  `;
}

function changeSQty(id, delta) {
  const newQty = (state.sDecos[id] || 0) + delta;
  if (newQty <= 0) delete state.sDecos[id];
  else state.sDecos[id] = newQty;
  renderStep(5);
}

// ── Step 6: Recycled Keychain (1 free + optional extras) ─────────
function renderRecycledKc() {
  function makeCard(item, entry, isFreeSlot) {
    const avail   = getStock(item.id);
    const isAdded = !!entry;
    const colorBtns = item.availableColors.map(c => {
      const active = entry?.colors.includes(c);
      return `<button class="color-btn ${active ? 'sel' : ''}"
        onclick="${isFreeSlot ? `toggleFreeRecycledColor('${item.id}','${c}')` : `toggleRecycledColor('${item.id}','${c}')`}"
        ${avail <= 0 && !isAdded ? 'disabled' : ''}>${c}</button>`;
    }).join('');
    const cardClass = isAdded
      ? (isFreeSlot ? 'recycled-card free-selected' : 'recycled-card selected')
      : avail <= 0 ? 'recycled-card disabled' : 'recycled-card';
    return `
      <div class="${cardClass}">
        <div class="recycled-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span class="img-fallback" style="font-size:2.2rem">${item.emoji}</span>
        </div>
        <div class="recycled-info">
          <div class="img-label">${item.name}</div>
          ${isFreeSlot ? '<div class="img-price" style="color:#db2777">FREE 🎁</div>' : `<div class="img-price">฿${item.price} each</div>`}
          <div class="img-stock ${avail <= 3 ? 'low' : ''}">${avail} left</div>
          <p class="color-hint">Choose 1 or 2 colors (can mix):</p>
          <div class="color-btn-row">${colorBtns}</div>
          ${isAdded ? `<p class="selected-colors">✓ ${entry.colors.join(' + ')}</p>` : ''}
        </div>
      </div>
    `;
  }

  const freeCards  = RECYCLED_KEYCHAINS.map(item => makeCard(item, state.freeRecycledKc?.id === item.id ? state.freeRecycledKc : null, true)).join('');
  const extraCards = RECYCLED_KEYCHAINS.map(item => makeCard(item, state.recycledKc.find(r => r.id === item.id), false)).join('');

  return `
    <div class="step-page">
      <h2>Recycled Mini Keychain ♻️</h2>
      <p class="step-desc">As a pre-order bonus you get <strong>1 FREE recycled mini keychain</strong>! Choose your design and colors below.</p>

      <div class="free-banner">
        <span class="free-badge">FREE</span>
        Pre-order bonus — pick 1 design (1 or 2 colors)
        ${state.freeRecycledKc ? `&nbsp;✓ <strong>${RECYCLED_KEYCHAINS.find(k=>k.id===state.freeRecycledKc.id)?.name} (${state.freeRecycledKc.colors.join(' + ')})</strong>` : ''}
      </div>
      <div class="recycled-grid">${freeCards}</div>
      ${!state.freeRecycledKc ? '<p class="warn">Please choose your free recycled keychain design.</p>' : ''}

      <div class="section-divider">➕ Want more? Extra recycled keychains at ฿15 each</div>
      <div class="recycled-grid">${extraCards}</div>
      <p class="hint-next">Extra keychains are optional. Click Next to continue.</p>
    </div>
  `;
}

function toggleFreeRecycledColor(itemId, color) {
  if (!state.freeRecycledKc || state.freeRecycledKc.id !== itemId) {
    // Select this design as the free one
    state.freeRecycledKc = { id: itemId, colors: [color] };
  } else {
    const entry = state.freeRecycledKc;
    if (entry.colors.includes(color)) {
      entry.colors = entry.colors.filter(c => c !== color);
      if (entry.colors.length === 0) state.freeRecycledKc = null;
    } else if (entry.colors.length < 2) {
      entry.colors.push(color);
    } else {
      entry.colors[0] = color;
    }
  }
  renderStep(6);
}

function toggleRecycledColor(itemId, color) {
  let entry = state.recycledKc.find(r => r.id === itemId);
  if (!entry) {
    entry = { id: itemId, colors: [color] };
    state.recycledKc.push(entry);
  } else {
    if (entry.colors.includes(color)) {
      entry.colors = entry.colors.filter(c => c !== color);
      if (entry.colors.length === 0) state.recycledKc = state.recycledKc.filter(r => r.id !== itemId);
    } else if (entry.colors.length < 2) {
      entry.colors.push(color);
    } else {
      entry.colors[0] = color;
    }
  }
  renderStep(6);
}

// ── Step 7: Mini Keychain add-on ──────────────────────────────────
function renderKcCards(items) {
  return items.map(item => {
    const qty   = state.smallKc[item.id] || 0;
    const avail = getStock(item.id);
    return `
      <div class="img-card ${qty > 0 ? 'selected' : ''} ${avail <= 0 ? 'disabled' : ''}">
        <div class="img-slot">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span class="img-fallback">${item.emoji}</span>
        </div>
        <div class="img-label">${item.name}</div>
        <div class="img-price">฿${item.price} each</div>
        <div class="img-stock ${avail <= 3 ? 'low' : ''}">${avail} left</div>
        <div class="qty-ctrl">
          <button onclick="changeSmallKcQty('${item.id}',-1)" ${qty <= 0 ? 'disabled' : ''}>−</button>
          <span>${qty}</span>
          <button onclick="changeSmallKcQty('${item.id}',1)" ${avail <= 0 ? 'disabled' : ''}>+</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderSmallKc() {
  return `
    <div class="step-page">
      <h2>Mini Keychain Add-On</h2>
      <p class="step-desc">Optional. Add as many as you like. Skip by clicking Next.</p>
      <div class="kc-section-label">Small &nbsp;•&nbsp; ฿10 each</div>
      <div class="img-grid">${renderKcCards(SMALL_KEYCHAINS)}</div>
      <div class="section-divider">Large &nbsp;•&nbsp; ฿15 each</div>
      <div class="img-grid">${renderKcCards(LARGE_KEYCHAINS)}</div>
    </div>
  `;
}

function changeSmallKcQty(id, delta) {
  const newQty = (state.smallKc[id] || 0) + delta;
  if (newQty <= 0) delete state.smallKc[id];
  else state.smallKc[id] = newQty;
  renderStep(7);
}

// ── Step 8: Piece order builder ───────────────────────────────────
function buildPieceOrder() {
  const pieces = [];

  // Letters / L-decos
  state.lItems.forEach((itemId, idx) => {
    const item    = L_ITEMS.find(i => i.id === itemId);
    const variant = item?.variants.find(v => v.id === state.lItemColors[idx]);
    pieces.push({
      key:      `l_${itemId}_${idx}`,
      label:    item?.name || itemId,
      sublabel: variant?.color || '',
      image:    variant?.image || '',
      emoji:    item?.emoji || item?.name || '?',
      colorHex: null,
    });
  });

  // S-Decorations — expand by quantity
  Object.entries(state.sDecos).forEach(([id, qty]) => {
    const item = S_DECOS.find(s => s.id === id);
    for (let i = 0; i < qty; i++) {
      pieces.push({
        key:      `s_${id}_${i}`,
        label:    item?.shape?.split(' ')[0] || id,
        sublabel: item?.color || '',
        image:    item?.image || '',
        emoji:    item?.emoji || '?',
        colorHex: item?.colorHex || null,
      });
    }
  });

  state.pieceOrder = pieces;
}

function initSortable() {
  const el = document.getElementById('piece-order-grid');
  if (!el || typeof Sortable === 'undefined') return;
  new Sortable(el, {
    animation: 150,
    ghostClass: 'piece-drag-ghost',
    chosenClass: 'piece-drag-chosen',
    onEnd(evt) {
      const moved = state.pieceOrder.splice(evt.oldIndex, 1)[0];
      state.pieceOrder.splice(evt.newIndex, 0, moved);
    },
  });
}

// ── Step 8: Summary ───────────────────────────────────────────────
function renderSummary() {
  const { extras } = getPriceBreakdown();
  const total = calculatePrice();

  const ropeItem  = ROPE_COLORS.find(r => r.id === state.rope);
  const claspItem = CLASP_COLORS.find(c => c.id === state.clasp);

  const lRows = state.lItems.map((id, idx) => {
    const item    = L_ITEMS.find(i => i.id === id);
    const variant = item?.variants.find(v => v.id === state.lItemColors[idx]);
    return `<tr><td>${item?.type === 'letter' ? 'Letter' : 'L-Deco'}: <strong>${item?.name}</strong></td><td>${variant?.color || '—'}</td></tr>`;
  }).join('');

  const sRows = Object.entries(state.sDecos).filter(([, q]) => q > 0).map(([id, qty]) => {
    const item = S_DECOS.find(s => s.id === id);
    return `<tr><td>${item?.emoji} ${item?.name}</td><td>×${qty}</td></tr>`;
  }).join('');

  const skRows = Object.entries(state.smallKc).filter(([, q]) => q > 0).map(([id, qty]) => {
    const item = ALL_SMALL_KEYCHAINS.find(k => k.id === id);
    return `<tr><td>${item?.emoji} ${item?.name} (mini keychain)</td><td>×${qty} — ฿${qty * 10}</td></tr>`;
  }).join('');

  const freeRkRow = state.freeRecycledKc ? (() => {
    const item = RECYCLED_KEYCHAINS.find(k => k.id === state.freeRecycledKc.id);
    return `<tr><td>${item?.emoji} ${item?.name} (recycled, ${state.freeRecycledKc.colors.join(' + ')})</td><td>FREE 🎁</td></tr>`;
  })() : '';

  const rkRows = state.recycledKc.map(r => {
    const item = RECYCLED_KEYCHAINS.find(k => k.id === r.id);
    return `<tr><td>${item?.emoji} ${item?.name} (recycled, ${r.colors.join(' + ')})</td><td>×1 — ฿15</td></tr>`;
  }).join('');

  const extraRows = extras.map(e =>
    `<tr class="extra-row"><td>${e.label}</td><td>+฿${e.cost}</td></tr>`
  ).join('');

  const pieceCards = state.pieceOrder.map(piece => `
    <div class="piece-card" data-key="${piece.key}">
      <div class="piece-drag-handle">⠿</div>
      <div class="piece-img-slot" ${piece.colorHex ? `style="background:${piece.colorHex}33"` : ''}>
        <img src="${piece.image}" alt="${piece.label}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span class="piece-fallback">${piece.emoji}</span>
      </div>
      <div class="piece-label">${piece.label}</div>
      ${piece.sublabel ? `<div class="piece-sublabel">${piece.sublabel}</div>` : ''}
    </div>
  `).join('');

  return `
    <div class="step-page">
      <h2>Order Summary</h2>

      <h3 class="group-label" style="margin-bottom:0.5rem">🔗 Arrange Your Pieces</h3>
      <p class="step-desc" style="margin-bottom:0.75rem">Drag the cards to set the order of your keychain from left to right.</p>
      <div id="piece-order-grid" class="piece-grid">${pieceCards}</div>

      <h3 class="group-label" style="margin:1.25rem 0 0.5rem">📋 Full Details</h3>
      <table class="summary-table">
        <tr><td><strong>Rope Color</strong></td><td>${ropeItem?.name || '—'} ${ropeItem?.emoji || ''}</td></tr>
        <tr><td><strong>Ring Color</strong></td><td>${claspItem?.name || '—'} ${claspItem?.emoji || ''}</td></tr>
        ${lRows}
        ${sRows}
        ${skRows}
        ${freeRkRow}
        ${rkRows}
      </table>
      <div class="price-box">
        <table class="price-table">
          <tr><td>Starter Pack (rope + ring + 3L + 4S)</td><td>฿${PRICING.base}</td></tr>
          ${extraRows}
          <tr class="total-row"><td><strong>Total</strong></td><td><strong>฿${total}</strong></td></tr>
        </table>
      </div>
    </div>
  `;
}

// ── Step 9: Contact & Payment ─────────────────────────────────────
function buildKmuttDates() {
  // April 15–28, 2026
  const dates = [];
  for (let d = 15; d <= 28; d++) {
    const date = new Date(2026, 3, d); // month is 0-indexed
    const label = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
    dates.push({ value: `2026-04-${String(d).padStart(2,'0')}`, label });
  }
  return dates;
}

function renderContact() {
  const m = state.deliveryMethod;
  const kmuttDates = buildKmuttDates();

  const kmuttExtra = m === 'kmutt' ? `
    <div class="delivery-extra">
      <label>Location in KMUTT *</label>
      <input type="text" id="inp-kmutt-loc" value="${escHtml(state.deliveryKmuttLocation)}"
        placeholder="e.g. CB2 Building, Canteen, Parking Lot..."
        oninput="state.deliveryKmuttLocation=this.value">
      <label>Pick-up Date *</label>
      <select id="inp-kmutt-date" onchange="state.deliveryKmuttDate=this.value">
        <option value="">— Select a date —</option>
        ${kmuttDates.map(d => `<option value="${d.value}" ${state.deliveryKmuttDate === d.value ? 'selected' : ''}>${d.label}</option>`).join('')}
      </select>
      <p class="delivery-note">🚚 Free delivery within KMUTT</p>
    </div>` : '';

  const otherExtra = m === 'other' ? `
    <div class="delivery-extra">
      <label>Delivery Address *</label>
      <textarea id="inp-other-addr" rows="3"
        placeholder="Full address including province / postal code..."
        oninput="state.deliveryOtherAddress=this.value">${escHtml(state.deliveryOtherAddress)}</textarea>
      <p class="delivery-note">📦 Shipping fee will be calculated from the actual shipping cost and charged separately. We'll contact you to confirm before shipping.</p>
    </div>` : '';

  return `
    <div class="step-page">
      <h2>Contact & Payment</h2>
      <p class="step-desc">Fill in your details, choose how to receive your order, and upload your payment slip.</p>
      <form id="contactForm" onsubmit="return false;">

        <label>Full Name *</label>
        <input type="text" id="inp-name" value="${escHtml(state.buyerName)}" placeholder="Your full name" oninput="state.buyerName=this.value">

        <label>Contact <span style="font-weight:400;color:#888">(at least one required)</span></label>
        <div class="contact-row">
          <div class="contact-field">
            <span class="contact-label">Instagram</span>
            <input type="text" id="inp-ig" value="${escHtml(state.buyerIG)}" placeholder="@username" oninput="state.buyerIG=this.value">
          </div>
          <div class="contact-or">or</div>
          <div class="contact-field">
            <span class="contact-label">LINE ID</span>
            <input type="text" id="inp-line" value="${escHtml(state.buyerLine)}" placeholder="LINE ID" oninput="state.buyerLine=this.value">
          </div>
        </div>

        <label>Delivery Method *</label>
        <div class="delivery-list">
          <label class="delivery-option ${m === 'market' ? 'selected' : ''}" onclick="setDelivery('market')">
            <input type="radio" name="delivery" value="market" ${m === 'market' ? 'checked' : ''} style="display:none">
            <span class="delivery-radio"></span>
            <div class="delivery-info">
              <span class="delivery-title">🏪 Pick up at Gen351 Market</span>
              <span class="delivery-detail">29 April 2026 &nbsp;•&nbsp; 9:30 – 12:30</span>
            </div>
          </label>
          <label class="delivery-option ${m === 'kmutt' ? 'selected' : ''}" onclick="setDelivery('kmutt')">
            <input type="radio" name="delivery" value="kmutt" ${m === 'kmutt' ? 'checked' : ''} style="display:none">
            <span class="delivery-radio"></span>
            <div class="delivery-info">
              <span class="delivery-title">🎓 Deliver at KMUTT</span>
              <span class="delivery-detail">Choose your location & date &nbsp;•&nbsp; Free</span>
            </div>
          </label>
          ${kmuttExtra}
          <label class="delivery-option ${m === 'other' ? 'selected' : ''}" onclick="setDelivery('other')">
            <input type="radio" name="delivery" value="other" ${m === 'other' ? 'checked' : ''} style="display:none">
            <span class="delivery-radio"></span>
            <div class="delivery-info">
              <span class="delivery-title">📮 Other / Shipping</span>
              <span class="delivery-detail">Shipping fee based on actual cost</span>
            </div>
          </label>
          ${otherExtra}
        </div>

        <label>Notes (optional)</label>
        <textarea id="inp-notes" rows="2" placeholder="Special requests..." oninput="state.buyerNotes=this.value">${escHtml(state.buyerNotes)}</textarea>

        <div class="payment-info">
          <div class="total-display">Total: <strong>฿${calculatePrice()}</strong></div>
          <p class="bank-label">Please transfer to:</p>
          <p class="bank-account">[Bank Name] &nbsp;•&nbsp; [Account Number]<br><span style="font-size:0.85rem">[Account Name]</span></p>
          <div class="qr-wrap">
            <img id="qr-img" src="qr-payment.png" alt="Payment QR Code" onerror="this.style.display='none';document.getElementById('qr-placeholder').style.display='flex'">
            <div id="qr-placeholder" class="qr-placeholder" style="display:none">QR code coming soon</div>
          </div>
        </div>

        <label>Payment Slip *</label>
        <div class="slip-upload" onclick="document.getElementById('slip-input').click()">
          <input type="file" id="slip-input" accept="image/*" onchange="handleSlip(event)" style="display:none">
          <div id="slip-preview">
            ${state.slipBase64
              ? `<img src="${state.slipBase64}" style="max-width:200px;border-radius:8px;">`
              : '📎 Tap to upload payment slip'}
          </div>
        </div>
      </form>
    </div>
  `;
}

function setDelivery(method) {
  state.deliveryMethod = method;
  // Reset sub-fields when switching
  if (method !== 'kmutt') { state.deliveryKmuttLocation = ''; state.deliveryKmuttDate = ''; }
  if (method !== 'other') { state.deliveryOtherAddress = ''; }
  renderStep(9);
}

function handleSlip(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { state.slipBase64 = ev.target.result; renderStep(9); };
  reader.readAsDataURL(file);
}

function copyOrderNumber(num) {
  navigator.clipboard.writeText(num).then(() => showToast('Order number copied!')).catch(() => {
    showToast('Copy failed — please write it down manually.');
  });
}

function escHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// ═══════════════════════════════════════════════════════════════════
// PRICE CALCULATION
// ═══════════════════════════════════════════════════════════════════

function calcExtraLCost(extraL) {
  return Math.floor(extraL / 3) * PRICING.lExtra3 + (extraL % 3) * PRICING.lExtra1;
}

function calcExtraSCost(extraS) {
  return Math.floor(extraS / 2) * PRICING.sExtra2 + (extraS % 2) * PRICING.sExtra1;
}

function getPriceBreakdown() {
  const extras = [];
  const extraL = Math.max(0, state.lItems.length - PRICING.FREE_L);
  if (extraL > 0) extras.push({ label: `${extraL} extra Letter/L-Deco`, cost: calcExtraLCost(extraL) });
  const totalSQty = Object.values(state.sDecos).reduce((s, q) => s + q, 0);
  const extraS = Math.max(0, totalSQty - PRICING.FREE_S);
  if (extraS > 0) extras.push({ label: `${extraS} extra S-Deco`, cost: calcExtraSCost(extraS) });
  const kcCost = Object.entries(state.smallKc).filter(([, q]) => q > 0).reduce((sum, [id, qty]) => {
    const item = ALL_SMALL_KEYCHAINS.find(k => k.id === id);
    return sum + (item?.price ?? PRICING.smallKc) * qty;
  }, 0);
  const totalSKc = Object.values(state.smallKc).reduce((s, q) => s + q, 0);
  if (totalSKc > 0) extras.push({ label: `${totalSKc}× Mini Keychain`, cost: kcCost });
  if (state.recycledKc.length > 0) extras.push({ label: `${state.recycledKc.length}× Recycled Keychain`, cost: state.recycledKc.length * PRICING.recycledKc });
  return { base: PRICING.base, extras };
}

function calculatePrice() {
  const { base, extras } = getPriceBreakdown();
  return base + extras.reduce((s, e) => s + e.cost, 0);
}

// ═══════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════

function updateNav(step) {
  const back = document.getElementById('btn-back');
  const next = document.getElementById('btn-next');
  const counter = document.getElementById('step-counter');
  back.style.visibility = step === 1 ? 'hidden' : 'visible';
  next.textContent = step === 9 ? 'Submit Order ✓' : 'Next →';
  next.className = step === 9 ? 'btn-submit' : '';
  next.disabled = false;
  counter.textContent = `${step} / 9`;
}

function prevStep() {
  if (state.step === 4 && state.lSubStep === 1) {
    state.lSubStep = 0;
    renderStep(4, true);
    return;
  }
  if (state.step <= 1) return;
  state.step--;
  renderStep(state.step, true);
}

function nextStep() {
  if (!validateStep(state.step)) return;

  if (state.step === 9) { submitOrder(); return; }

  if (state.step === 4 && state.lSubStep === 0) {
    const lc = state.lItems.filter(id => id.startsWith('letter_')).length;
    if (lc < 2) { showToast(`At least 2 letters A–Z required (currently ${lc}).`); return; }
    if (state.lItems.length < 2) { showToast('Select at least 2 items total.'); return; }
    state.lSubStep = 1;
    renderStep(4, true);
    return;
  }

  state.step++;
  if (state.step === 4) state.lSubStep = 0;
  renderStep(state.step, true);
}

function validateStep(step) {
  switch (step) {
    case 2:
      if (!state.rope)  { showToast('Please select a rope color.'); return false; }
      return true;
    case 3:
      if (!state.clasp) { showToast('Please select a ring color.'); return false; }
      return true;
    case 4:
      if (state.lSubStep === 0) {
        const lc = state.lItems.filter(id => id.startsWith('letter_')).length;
        if (lc < 2) { showToast(`At least 2 letters A–Z required (currently ${lc}).`); return false; }
        if (state.lItems.length < 2) { showToast('Select at least 2 items total.'); return false; }
      } else {
        const allPicked = state.lItems.every((_id, idx) => state.lItemColors[idx]);
        if (!allPicked) { showToast('Choose a color for every selected letter/decoration.'); return false; }
      }
      return true;
    case 5: {
      const total = Object.values(state.sDecos).reduce((s, q) => s + q, 0);
      if (total === 0) { showToast('Add at least 1 S-decoration.'); return false; }
      return true;
    }
    case 6:
      if (!state.freeRecycledKc) { showToast('Please choose your free recycled keychain design.'); return false; }
      return true;
    case 9:
      if (!state.buyerName.trim()) { showToast('Please enter your name.'); return false; }
      if (!state.buyerIG.trim() && !state.buyerLine.trim()) { showToast('Please enter at least one contact (Instagram or LINE ID).'); return false; }
      if (!state.deliveryMethod) { showToast('Please choose a delivery method.'); return false; }
      if (state.deliveryMethod === 'kmutt') {
        if (!state.deliveryKmuttLocation.trim()) { showToast('Please enter your location in KMUTT.'); return false; }
        if (!state.deliveryKmuttDate) { showToast('Please select a pick-up date.'); return false; }
      }
      if (state.deliveryMethod === 'other' && !state.deliveryOtherAddress.trim()) { showToast('Please enter your delivery address.'); return false; }
      if (!state.slipBase64) { showToast('Please upload your payment slip.'); return false; }
      return true;
    default:
      return true;
  }
}

// ═══════════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════════

let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3000);
}

// ═══════════════════════════════════════════════════════════════════
// FORM SUBMISSION
// ═══════════════════════════════════════════════════════════════════

async function submitOrder() {
  const btn = document.getElementById('btn-next');
  btn.disabled = true;
  btn.textContent = 'Submitting…';

  const ropeItem  = ROPE_COLORS.find(r => r.id === state.rope);
  const claspItem = CLASP_COLORS.find(c => c.id === state.clasp);

  const lSummary = state.lItems.map((id, idx) => {
    const item    = L_ITEMS.find(i => i.id === id);
    const variant = item?.variants.find(v => v.id === state.lItemColors[idx]);
    return `${item?.name}(${variant?.color || '?'})`;
  }).join(', ');

  const sSummary = Object.entries(state.sDecos).filter(([, q]) => q > 0)
    .map(([id, qty]) => `${S_DECOS.find(s => s.id === id)?.name}×${qty}`).join(', ');

  const skSummary = Object.entries(state.smallKc).filter(([, q]) => q > 0)
    .map(([id, qty]) => `${ALL_SMALL_KEYCHAINS.find(k => k.id === id)?.name}×${qty}`).join(', ') || 'none';

  const freeRkSummary = state.freeRecycledKc
    ? `[FREE] ${RECYCLED_KEYCHAINS.find(k => k.id === state.freeRecycledKc.id)?.name}(${state.freeRecycledKc.colors.join('+')})`
    : '';
  const rkSummary = [freeRkSummary, ...state.recycledKc.map(r => {
    const item = RECYCLED_KEYCHAINS.find(k => k.id === r.id);
    return `${item?.name}(${r.colors.join('+')})`;
  })].filter(Boolean).join(', ') || 'none';

  const formData = new FormData();
  formData.append('name',        state.buyerName);
  formData.append('ig',          state.buyerIG);
  formData.append('line',        state.buyerLine);
  formData.append('delivery',    state.deliveryMethod === 'market' ? 'Gen351 Market (29 Apr 2026, 9:30-12:30)'
                               : state.deliveryMethod === 'kmutt'  ? `KMUTT – ${state.deliveryKmuttLocation} (${state.deliveryKmuttDate})`
                               : `Other – ${state.deliveryOtherAddress}`);
  formData.append('notes',       state.buyerNotes);
  formData.append('rope',        ropeItem?.name || '');
  formData.append('clasp',       claspItem?.name || '');
  formData.append('letters',     lSummary);
  formData.append('pieceOrder',  state.pieceOrder.map(p => `${p.label}${p.sublabel ? '(' + p.sublabel + ')' : ''}`).join(' → '));
  formData.append('sDecos',      sSummary);
  formData.append('smallKc',     skSummary);
  formData.append('recycledKc',  rkSummary);
  formData.append('total',       calculatePrice());
  formData.append('slip',        state.slipBase64 || '');

  // Generate order number: FTH-YYYYMMDD-XXXX (Thailand time UTC+7)
  const thaiDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const datePart = thaiDate.getFullYear().toString() +
    String(thaiDate.getMonth() + 1).padStart(2, '0') +
    String(thaiDate.getDate()).padStart(2, '0');
  const orderNumber = `FTH-${datePart}-${String(Math.floor(1000 + Math.random() * 9000))}`;
  formData.append('orderNumber', orderNumber);

  try {
    await fetch(APPS_SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
    showSuccessPage(orderNumber);
  } catch (_) {
    btn.disabled = false;
    btn.textContent = 'Submit Order ✓';
    showToast('Network error. Please try again.');
  }
}

function showSuccessPage(orderNumber) {
  document.getElementById('progress-wrap').style.display = 'none';
  document.getElementById('nav-row').style.display = 'none';
  document.getElementById('app').innerHTML = `
    <div class="success-page">
      <div class="success-icon">🎉</div>
      <h2>Order Received!</h2>
      <p>Thank you, <strong>${escHtml(state.buyerName)}</strong>!</p>
      <p>We'll contact you via <strong>${escHtml(state.buyerIG ? 'IG: @' + state.buyerIG : 'LINE: ' + state.buyerLine)}</strong> to confirm your order.</p>
      <div class="total-display">Total paid: <strong>฿${calculatePrice()}</strong></div>

      <div class="order-number-box">
        <div class="order-number-label">📋 Your Order Number</div>
        <div class="order-number">${orderNumber}</div>
        <p class="order-number-warn">⚠️ Please save this number! You will need it to track or collect your order.</p>
        <button class="copy-btn" onclick="copyOrderNumber('${orderNumber}')">Copy Order Number</button>
      </div>

      <button class="btn-new-order" onclick="location.reload()">Make Another Order</button>
    </div>
  `;
  document.getElementById('nav-row').style.display = 'none';
  document.getElementById('progress-wrap').style.display = 'none';
}

// ═══════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', () => {
  renderStep(state.step);
  fetchStock();
});
