import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = (window.HON_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseAnonKey = window.HON_SUPABASE_ANON_KEY || "";
const setupNotice = document.querySelector("#setupNotice");
const loginPanel = document.querySelector("#loginPanel");
const adminContent = document.querySelector("#adminContent");
const loginForm = document.querySelector("#loginForm");
const requestForm = document.querySelector("#requestForm");
const requestList = document.querySelector("#requestList");
const requestPagination = document.querySelector("#requestPagination");
const requestPageInfo = document.querySelector("#requestPageInfo");
const unregisteredList = document.querySelector("#unregisteredList");
const statusMessage = document.querySelector("#statusMessage");
const logoutButton = document.querySelector("#logoutButton");
const refreshButton = document.querySelector("#refreshButton");
const prevRequestPageButton = document.querySelector("#prevRequestPageButton");
const nextRequestPageButton = document.querySelector("#nextRequestPageButton");
const refreshUnregisteredButton = document.querySelector("#refreshUnregisteredButton");
const resetButton = document.querySelector("#resetButton");
const downloadLogButton = document.querySelector("#downloadLogButton");
const chatLogStorageKey = "honDataFormatChatLogs";
const suppressedUnregisteredStorageKey = "honDataFormatSuppressedUnregisteredQuestions";
const fields = {
  id: document.querySelector("#recordId"),
  title: document.querySelector("#titleInput"),
  requestText: document.querySelector("#requestTextInput"),
  command: document.querySelector("#commandInput"),
  keywords: document.querySelector("#keywordsInput"),
  notes: document.querySelector("#notesInput"),
  status: document.querySelector("#statusInput"),
};

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
const adminLoginMap = {
  imgtech: "imgtech@hon-data-format.local",
};
const requestPageSize = 5;
let requestRows = [];
let requestPageIndex = 0;

adminContent.hidden = true;

if (!supabase) {
  setupNotice.hidden = false;
  loginPanel.hidden = true;
  adminContent.hidden = true;
} else {
  initialize();
}

async function initialize() {
  const { data } = await supabase.auth.getSession();
  setAuthenticated(Boolean(data.session));

  supabase.auth.onAuthStateChange((_event, session) => {
    setAuthenticated(Boolean(session));
  });
}

async function setAuthenticated(isAuthenticated) {
  loginPanel.hidden = isAuthenticated;
  adminContent.hidden = !isAuthenticated;
  if (isAuthenticated) {
    await loadRequests();
  }
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("ログイン中です...");
  const loginId = document.querySelector("#loginId").value.trim();
  const email = adminLoginMap[loginId] || loginId;
  const password = document.querySelector("#loginPassword").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  setStatus(error ? `ログインできません: ${error.message}` : "");
});

logoutButton?.addEventListener("click", async () => {
  await supabase.auth.signOut();
  resetForm();
});

refreshButton?.addEventListener("click", loadRequests);
prevRequestPageButton?.addEventListener("click", () => changeRequestPage(-1));
nextRequestPageButton?.addEventListener("click", () => changeRequestPage(1));
refreshUnregisteredButton?.addEventListener("click", loadRequests);
resetButton?.addEventListener("click", resetForm);
downloadLogButton?.addEventListener("click", downloadChatLogsCsv);

requestForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = buildPayload();
  setStatus("保存中です...");

  const request = fields.id.value
    ? supabase.from("barcode_requests").update(payload).eq("id", fields.id.value)
    : supabase.from("barcode_requests").insert(payload);

  const { error } = await request;
  if (error) {
    setStatus(`保存できません: ${error.message}`);
    return;
  }

  setStatus("保存しました。");
  resetForm();
  await loadRequests();
});

function buildPayload() {
  return {
    title: fields.title.value.trim() || fields.requestText.value.trim(),
    request_text: fields.requestText.value.trim(),
    command: normalizeSettingCommand(fields.command.value),
    keywords: splitKeywords(fields.keywords.value),
    notes: fields.notes.value.trim(),
    status: fields.status.value,
  };
}

async function loadRequests() {
  setStatus("読み込み中です...");
  const { data, error } = await supabase
    .from("barcode_requests")
    .select("id,title,request_text,command,notes,keywords,status,updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    requestList.textContent = "";
    setStatus(`読み込めません: ${error.message}`);
    return;
  }

  const rows = data || [];
  requestRows = rows;
  requestPageIndex = 0;
  renderRequestsPage();
  await loadUnregisteredLogs(rows);
  setStatus("");
}

function changeRequestPage(direction) {
  const pageCount = getRequestPageCount();
  requestPageIndex = Math.max(0, Math.min(pageCount - 1, requestPageIndex + direction));
  renderRequestsPage();
}

function getRequestPageCount() {
  return Math.max(1, Math.ceil(requestRows.length / requestPageSize));
}

function renderRequestsPage() {
  const start = requestPageIndex * requestPageSize;
  renderRequests(requestRows.slice(start, start + requestPageSize));
  updateRequestPagination();
}

function updateRequestPagination() {
  if (!requestPagination || !requestPageInfo) return;
  const total = requestRows.length;
  const pageCount = getRequestPageCount();
  requestPagination.hidden = total <= requestPageSize;
  requestPageInfo.textContent = `${requestPageIndex + 1} / ${pageCount}ページ（${total}件）`;
  prevRequestPageButton.disabled = requestPageIndex <= 0;
  nextRequestPageButton.disabled = requestPageIndex >= pageCount - 1;
}

function renderRequests(rows) {
  requestList.textContent = "";

  if (requestRows.length === 0) {
    requestList.textContent = "登録はまだありません。";
    updateRequestPagination();
    return;
  }

  rows.forEach((row) => {
    const item = document.createElement("article");
    const statusClass = getStatusClass(row.status);
    item.className = `admin-list-item ${statusClass}`;
    item.dataset.status = getStatusKey(row.status);
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(row.title || row.request_text)}</strong>
        <span>${escapeHtml(getStatusLabel(row.status))} / ${escapeHtml(formatDate(row.updated_at))}</span>
      </div>
      <p>${escapeHtml(row.request_text)}</p>
      <code>${escapeHtml(row.command)}</code>
      ${row.notes ? `<p>${escapeHtml(row.notes)}</p>` : ""}
      <div class="admin-actions">
        <button class="admin-button secondary" type="button" data-action="edit">編集</button>
        <button class="admin-button danger" type="button" data-action="delete">削除</button>
      </div>
    `;

    item.querySelector('[data-action="edit"]').addEventListener("click", () => fillForm(row));
    item.querySelector('[data-action="delete"]').addEventListener("click", () => deleteRequest(row));
    requestList.append(item);
  });
}

async function loadUnregisteredLogs(registeredRows) {
  if (!unregisteredList) return;
  unregisteredList.textContent = "未登録ログを確認中です...";
  const logs = await getDownloadChatLogs();
  const suppressedQuestions = await getSuppressedUnregisteredQuestions();
  renderUnregisteredLogs(getUnregisteredFailedLogs(logs, registeredRows, suppressedQuestions));
}

function getUnregisteredFailedLogs(logs, registeredRows, suppressedQuestions = new Set()) {
  const registeredQuestions = new Set(
    registeredRows
      .map((row) => normalizeQuestionKey(row.request_text))
      .filter(Boolean)
  );
  const seen = new Set();

  return logs.filter((log) => {
    const key = normalizeQuestionKey(log.question);
    if (!key || seen.has(key) || registeredQuestions.has(key) || suppressedQuestions.has(key)) return false;
    if (!isQuestionInputLog(log)) return false;
    if (getBarcodeGenerationResult(log) !== "✖") return false;
    seen.add(key);
    return true;
  });
}

function isQuestionInputLog(log) {
  const source = String(log.source || "").trim();
  if (source === "question_input") return true;
  if (source && source !== "unknown") return false;
  return !isKnownToolGeneratedLog(log);
}

function isKnownToolGeneratedLog(log) {
  const question = String(log.question || "").trim();
  return [
    "シンボル設定",
    "シンボル設定 初期値バー",
    "アウトプットシーケンス設定",
  ].includes(question);
}

function renderUnregisteredLogs(logs) {
  unregisteredList.textContent = "";

  if (logs.length === 0) {
    unregisteredList.textContent = "未登録の生成失敗ログはありません。";
    return;
  }

  logs.forEach((log) => {
    const item = document.createElement("article");
    item.className = "admin-list-item admin-list-item-unregistered";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(log.question || "")}</strong>
        <span>✖ / ${escapeHtml(formatDate(log.createdAt))}</span>
      </div>
      <p>${escapeHtml(log.answer || "")}</p>
      <div class="admin-actions">
        <button class="admin-button secondary" type="button" data-action="create-draft">設定コマンド空白で登録</button>
        <button class="admin-button secondary" type="button" data-action="fill-form">入力欄へ反映</button>
      </div>
    `;

    item.querySelector('[data-action="create-draft"]').addEventListener("click", () => createDraftFromLog(log));
    item.querySelector('[data-action="fill-form"]').addEventListener("click", () => fillFormFromLog(log));
    unregisteredList.append(item);
  });
}

async function createDraftFromLog(log) {
  const question = String(log.question || "").trim();
  if (!question) return;

  setStatus("未登録ログから下書きを作成中です...");
  await addSuppressedUnregisteredQuestion(question);
  const { error } = await supabase.from("barcode_requests").insert({
    title: question,
    request_text: question,
    command: "",
    keywords: [],
    notes: buildLogCandidateNotes(log),
    status: "draft",
  });

  if (error) {
    setStatus(`下書きを作成できません: ${error.message}`);
    return;
  }

  setStatus("設定コマンド空白の下書きを作成しました。");
  await loadRequests();
}

function fillFormFromLog(log) {
  resetForm();
  fields.title.value = String(log.question || "").trim();
  fields.requestText.value = String(log.question || "").trim();
  fields.command.value = "";
  fields.keywords.value = "";
  fields.notes.value = buildLogCandidateNotes(log);
  fields.status.value = "draft";
  fields.command.focus();
}

function buildLogCandidateNotes(log) {
  const parts = [
    "Chatbot生成失敗ログから自動作成",
    `日時: ${formatDate(log.createdAt)}`,
    `回答: ${String(log.answer || "").trim()}`,
  ];
  return parts.filter(Boolean).join("\n");
}

function getStatusClass(status) {
  const normalized = getStatusKey(status);
  if (normalized === "archived") return "admin-list-item-archived";
  if (normalized === "published") return "admin-list-item-published";
  return "admin-list-item-draft";
}

function getStatusLabel(status) {
  const normalized = getStatusKey(status);
  if (normalized === "archived") return "保管";
  if (normalized === "published") return "公開";
  return "下書き";
}

function getStatusKey(status) {
  const normalized = String(status || "draft").trim().toLowerCase();
  if (normalized === "archived" || normalized === "archive" || normalized === "保管") return "archived";
  if (normalized === "published" || normalized === "publish" || normalized === "公開") return "published";
  return "draft";
}

function fillForm(row) {
  fields.id.value = row.id;
  fields.title.value = row.title || "";
  fields.requestText.value = row.request_text || "";
  fields.command.value = row.command || "";
  fields.keywords.value = Array.isArray(row.keywords) ? row.keywords.join(", ") : "";
  fields.notes.value = row.notes || "";
  fields.status.value = row.status || "draft";
  fields.requestText.focus();
}

async function deleteRequest(row) {
  if (!window.confirm("削除しますか？")) return;
  const { error } = await supabase.from("barcode_requests").delete().eq("id", row.id);
  if (error) {
    setStatus(`削除できません: ${error.message}`);
    return;
  }
  await addSuppressedUnregisteredQuestion(row.request_text);
  setStatus("削除しました。");
  await loadRequests();
}

async function getSuppressedUnregisteredQuestions() {
  const localQuestions = getLocalSuppressedUnregisteredQuestions();
  const remoteQuestions = await getRemoteSuppressedUnregisteredQuestions();
  return new Set([...localQuestions, ...remoteQuestions]);
}

function getLocalSuppressedUnregisteredQuestions() {
  try {
    const values = JSON.parse(localStorage.getItem(suppressedUnregisteredStorageKey) || "[]");
    return new Set(Array.isArray(values) ? values.map(normalizeQuestionKey).filter(Boolean) : []);
  } catch (_error) {
    return new Set();
  }
}

async function getRemoteSuppressedUnregisteredQuestions() {
  try {
    const { data, error } = await supabase
      .from("suppressed_unregistered_questions")
      .select("question_key")
      .limit(10000);

    if (error) return new Set();
    return new Set((data || []).map((row) => normalizeQuestionKey(row.question_key)).filter(Boolean));
  } catch (_error) {
    return new Set();
  }
}

async function addSuppressedUnregisteredQuestion(question) {
  const key = normalizeQuestionKey(question);
  if (!key) return;
  const values = [...getLocalSuppressedUnregisteredQuestions(), key];
  localStorage.setItem(suppressedUnregisteredStorageKey, JSON.stringify([...new Set(values)].slice(-1000)));

  try {
    await supabase
      .from("suppressed_unregistered_questions")
      .upsert({
        question_key: key,
        question_text: String(question || "").trim(),
      }, { onConflict: "question_key", ignoreDuplicates: true });
  } catch (_error) {
    // Supabaseへ保存できない場合も、この端末ではローカル除外を継続します。
  }
}

function resetForm() {
  fields.id.value = "";
  requestForm.reset();
  fields.status.value = "draft";
}

function setStatus(message) {
  statusMessage.textContent = message;
}

async function downloadChatLogsCsv() {
  setStatus("ログを読み込み中です...");
  const logs = await getDownloadChatLogs();
  if (logs.length === 0) {
    setStatus("ダウンロードできるログはありません。");
    return;
  }

  const header = ["バーコード生成結果", "日時", "質問入力内容", "Chatbot回答または聞き返し"];
  const rows = logs.map((log) => [
    getBarcodeGenerationResult(log),
    formatDate(log.createdAt),
    log.question || "",
    log.answer || "",
  ]);
  const csv = [header, ...rows].map((row) => row.map(toCsvCell).join(",")).join("\r\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `chatbot-log-${formatFilenameDate(new Date())}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus(`${logs.length}件のログCSVをダウンロードしました。`);
}

async function getDownloadChatLogs() {
  const remoteLogs = await getRemoteChatLogs();
  if (remoteLogs.length > 0) return remoteLogs;
  return getChatLogs();
}

async function getRemoteChatLogs() {
  if (!supabase) return [];

  try {
    let { data, error } = await supabase
      .from("chatbot_logs")
      .select("created_at,question,answer,source,barcode_generated")
      .order("created_at", { ascending: false })
      .limit(10000);

    if (error && /source|barcode_generated/i.test(error.message || "")) {
      const fallback = await supabase
        .from("chatbot_logs")
        .select("created_at,question,answer")
        .order("created_at", { ascending: false })
        .limit(10000);
      data = fallback.data;
      error = fallback.error;
    }

    if (error) {
      setStatus(`Supabaseログを読み込めません。ローカルログを確認します: ${error.message}`);
      return [];
    }

    return (data || []).map((log) => ({
      createdAt: log.created_at,
      question: log.question,
      answer: log.answer,
      source: log.source,
      barcodeGenerated: log.barcode_generated,
    }));
  } catch (error) {
    setStatus(`Supabaseログを読み込めません。ローカルログを確認します: ${error.message || ""}`);
    return [];
  }
}

function normalizeQuestionKey(value) {
  return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function getChatLogs() {
  try {
    const logs = JSON.parse(localStorage.getItem(chatLogStorageKey) || "[]");
    return Array.isArray(logs) ? logs : [];
  } catch (_error) {
    return [];
  }
}

function getBarcodeGenerationResult(log) {
  if (typeof log.barcodeGenerated === "boolean") return log.barcodeGenerated ? "〇" : "✖";
  if (isSettingCommandLog(log)) return "△";

  const answer = String(log.answer || "");
  const failedPatterns = [
    "設定バーコードを生成できません",
    "バーコード生成を停止",
    "生成前チェックで確認が必要",
    "確認が必要です",
    "該当するデータフォーマット設定が見つかりません",
  ];
  if (failedPatterns.some((pattern) => answer.includes(pattern))) return "✖";

  const hasBarcodeSection = answer.includes("設定用バーコード");
  const hasSettingCommand = /DFM(?:BK3|DF3|DF|CL3)[A-Z0-9;|?.]*/i.test(answer);
  return hasBarcodeSection && hasSettingCommand ? "〇" : "－";
}

function isSettingCommandLog(log) {
  const question = String(log.question || "").trim().replace(/\s+/g, "").toUpperCase();
  return /^DFM(?:BK3|DF3|DF|CL3)|^DFMDF3[.;]?/.test(question);
}

function toCsvCell(value) {
  return `"${String(value || "").replace(/"/g, '""')}"`;
}

function formatFilenameDate(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "-",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function splitKeywords(value) {
  return value
    .split(/\s*(?:,|、|\n)\s*/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function normalizeSettingCommand(command) {
  const trimmed = command.trim();
  if (!trimmed || trimmed.endsWith("?")) return trimmed;
  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[char];
  });
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString("ja-JP") : "";
}
