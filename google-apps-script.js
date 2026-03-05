// ════════════════════════════════════════════════════════════════════
//  FORTHERA — Google Apps Script Backend
//  1. Go to script.google.com → New Project
//  2. Paste this entire file, replacing default code
//  3. Deploy → New Deployment → Web App
//     - Execute as: Me
//     - Who has access: Anyone
//  4. Copy the Web App URL into script.js (APPS_SCRIPT_URL)
// ════════════════════════════════════════════════════════════════════

const ORDERS_SHEET = "Orders";
const STOCK_SHEET  = "Stock";

// ── Default stock for every item ID ──────────────────────────────
// Edit these numbers to set your actual inventory.
// Format: "item_id": quantity
const DEFAULT_STOCK = (function () {
  const s = {};
  // Rope colors
  for (let i = 1; i <= 10; i++) s[`rope_${i}`] = 15;
  // Clasp colors
  for (let i = 1; i <= 10; i++) s[`clasp_${i}`] = 15;
  // Letter variants (A–Z × 6 colors)
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
    ["red","blue","yellow","white","pink","gold"].forEach(color => {
      s[`${letter}_${color}`] = 5;
    });
  });
  // Special L-decoration variants
  ["star","heart","crown","flower","moon"].forEach(name => {
    ["red","blue","yellow","white","pink","gold"].forEach(color => {
      s[`ldeco_${name}_${color}`] = 5;
    });
  });
  // S-Decorations
  ["heart","star","circle"].forEach(shape => {
    ["orange","purple","pink","blue","green","white"].forEach(color => {
      s[`${shape}_${color}`] = 20;
    });
  });
  // Mini keychains
  for (let i = 1; i <= 5; i++) s[`sk_${i}`] = 8;
  // Recycled keychains
  for (let i = 1; i <= 8; i++) s[`rk_${i}`] = 5;
  return s;
})();

// ── GET: Return current stock ────────────────────────────────────
function doGet(e) {
  const action = e.parameter.action;
  if (action === "getStock") {
    return jsonResponse(getCurrentStock());
  }
  return jsonResponse({ error: "Unknown action" });
}

function getCurrentStock() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateStockSheet(ss);
  const rows  = sheet.getDataRange().getValues();
  const stock = {};
  // rows[0] = header, skip it
  for (let i = 1; i < rows.length; i++) {
    stock[rows[i][0]] = Number(rows[i][2]); // id, total, available
  }
  return stock;
}

// ── POST: Save order + decrement stock ───────────────────────────
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const p = e.parameter;

    // 1. Save order to Orders sheet
    const ordersSheet = getOrCreateOrdersSheet(
      SpreadsheetApp.getActiveSpreadsheet()
    );
    const timestamp = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    const row = [
      p.orderNumber || "",
      timestamp,
      p.name     || "",
      p.ig       || "",
      p.line     || "",
      p.delivery || "",
      p.rope     || "",
      p.clasp    || "",
      p.letters  || "",
      p.sDecos   || "",
      p.smallKc  || "",
      p.recycledKc || "",
      p.pieceOrder || "",
      p.notes    || "",
      Number(p.total) || 0,
      "",     // Slip URL — filled in below after Drive upload
      false,  // Payment Verified checkbox
      false,  // Finished Creation checkbox
      false,  // Finished Delivery checkbox
    ];
    ordersSheet.appendRow(row);

    // Set checkbox validation + colour for the 3 checkbox columns
    const lastRow        = ordersSheet.getLastRow();
    const checkboxStart  = row.length - 2; // first checkbox col (1-based), last 3 entries
    const checkboxColors = ["#fef9c3", "#dcfce7", "#dbeafe"]; // yellow, green, blue
    for (let i = 0; i < 3; i++) {
      const cell = ordersSheet.getRange(lastRow, checkboxStart + i);
      cell.setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
      cell.setHorizontalAlignment("center").setBackground(checkboxColors[i]);
    }

    // 2. Save payment slip to Drive (if provided)
    const slipUrlCol = row.length - 3; // Slip URL column index (1-based)
    if (p.slip && p.slip.startsWith("data:image")) {
      try {
        const base64Data  = p.slip.split(",")[1];
        const mimeType    = p.slip.split(";")[0].split(":")[1];
        const blob        = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, `slip_${timestamp}.jpg`);
        const folder      = getSlipFolder();
        const file        = folder.createFile(blob);
        ordersSheet.getRange(lastRow, slipUrlCol).setValue(file.getUrl());
      } catch (slipErr) {
        Logger.log("Slip save failed: " + slipErr);
      }
    }

    // 3. Decrement stock for ordered items
    decrementStock(p);

    return jsonResponse({ result: "success" });
  } finally {
    lock.releaseLock();
  }
}

function decrementStock(p) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateStockSheet(ss);
  const rows  = sheet.getDataRange().getValues();

  // Build a map: itemId → row index
  const rowMap = {};
  for (let i = 1; i < rows.length; i++) rowMap[rows[i][0]] = i + 1;

  function decrement(itemId) {
    if (!rowMap[itemId]) return;
    const cell    = sheet.getRange(rowMap[itemId], 3); // column C = available
    const current = Number(cell.getValue());
    if (current > 0) cell.setValue(current - 1);
  }

  // Parse each field and decrement corresponding stock entries
  if (p.rope)  decrement(findIdByName(p.rope,  "rope_"));
  if (p.clasp) decrement(findIdByName(p.clasp, "clasp_"));

  // Letters: format "A(Red), B(Blue)"
  if (p.letters) {
    p.letters.split(",").forEach(part => {
      const m = part.trim().match(/^([^(]+)\(([^)]+)\)$/);
      if (m) {
        const name  = m[1].trim();
        const color = m[2].trim().toLowerCase();
        const prefix = name.length === 1 ? `${name}_${color}` : `ldeco_${name.toLowerCase()}_${color}`;
        decrement(prefix);
      }
    });
  }

  // S-Decos: format "Orange Heart ♥×2, Blue Star ★×1"
  if (p.sDecos) {
    p.sDecos.split(",").forEach(part => {
      const m = part.trim().match(/^(.+)×(\d+)$/);
      if (m) {
        const fullName = m[1].trim();
        // Try to extract shape and color from name
        // Stored as "{color} {shape}" e.g. "Orange Heart ♥"
        const tokens = fullName.split(" ");
        if (tokens.length >= 2) {
          const color = tokens[0].toLowerCase();
          const shape = tokens[1].toLowerCase().replace(/[^\w]/g, "");
          const qty   = Number(m[2]);
          for (let q = 0; q < qty; q++) decrement(`${shape}_${color}`);
        }
      }
    });
  }

  // Small keychains: format "Design 1×2"
  if (p.smallKc && p.smallKc !== "none") {
    p.smallKc.split(",").forEach(part => {
      const m = part.trim().match(/^Design (\d+)×(\d+)$/);
      if (m) {
        const qty = Number(m[2]);
        for (let q = 0; q < qty; q++) decrement(`sk_${m[1]}`);
      }
    });
  }

  // Recycled keychains: format "Design 1(Red+Blue)"
  if (p.recycledKc && p.recycledKc !== "none") {
    p.recycledKc.split(",").forEach(part => {
      const m = part.trim().match(/^Design (\d+)\(.*\)$/);
      if (m) decrement(`rk_${m[1]}`);
    });
  }
}

function findIdByName(name, prefix) {
  // name like "Color 3" → prefix + "3" → "rope_3"
  const num = name.replace("Color ", "").trim();
  return prefix + num;
}

// ── Sheet helpers ────────────────────────────────────────────────
function getOrCreateOrdersSheet(ss) {
  let sheet = ss.getSheetByName(ORDERS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(ORDERS_SHEET);
    const headers = ["Order Number","Timestamp","Name","Instagram","LINE ID","Delivery","Rope","Ring","Letters","S-Decos","Mini KC","Recycled KC","Piece Order","Notes","Total (฿)","Slip URL","Payment Verified","Finished Creation","Finished Delivery"];
    sheet.appendRow(headers);
    styleHeader(sheet, headers.length, "#7c3aed");
    // Style the 3 checkbox header cells with distinct colours
    const checkboxHeaders = [
      { name: "Payment Verified",   bg: "#ca8a04" },  // amber
      { name: "Finished Creation",  bg: "#16a34a" },  // green
      { name: "Finished Delivery",  bg: "#2563eb" },  // blue
    ];
    checkboxHeaders.forEach(({ name, bg }) => {
      const col = headers.indexOf(name) + 1;
      sheet.getRange(1, col).setBackground(bg).setFontColor("#ffffff").setFontWeight("bold");
    });
  }
  return sheet;
}

function getOrCreateStockSheet(ss) {
  let sheet = ss.getSheetByName(STOCK_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(STOCK_SHEET);
    sheet.appendRow(["Item ID", "Total Stock", "Available"]);
    styleHeader(sheet, 3, "#059669");
    // Populate with defaults
    Object.entries(DEFAULT_STOCK).forEach(([id, qty]) => {
      sheet.appendRow([id, qty, qty]);
    });
  }
  return sheet;
}

function getSlipFolder() {
  const folderName = "Forthera Payment Slips";
  const folders = DriveApp.getFoldersByName(folderName);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
}

function styleHeader(sheet, cols, color) {
  const range = sheet.getRange(1, 1, 1, cols);
  range.setFontWeight("bold").setBackground(color).setFontColor("#ffffff");
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
