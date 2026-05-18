import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = (window.HON_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseAnonKey = window.HON_SUPABASE_ANON_KEY || "";
const setupNotice = document.querySelector("#setupNotice");
const loginPanel = document.querySelector("#loginPanel");
const adminContent = document.querySelector("#adminContent");
const loginForm = document.querySelector("#loginForm");
const requestForm = document.querySelector("#requestForm");
const requestList = document.querySelector("#requestList");
const statusMessage = document.querySelector("#statusMessage");
const logoutButton = document.querySelector("#logoutButton");
const refreshButton = document.querySelector("#refreshButton");
const resetButton = document.querySelector("#resetButton");
const downloadLogButton = document.querySelector("#downloadLogButton");
const chatLogStorageKey = "honDataFormatChatLogs";
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

if (!supabase) {
  setupNotice.hidden = false;
  loginPanel.hidden = true;
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

  renderRequests(data || []);
  setStatus("");
}

function renderRequests(rows) {
  requestList.textContent = "";

  if (rows.length === 0) {
    requestList.textContent = "登録はまだありません。";
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
    item.querySelector('[data-action="delete"]').addEventListener("click", () => deleteRequest(row.id));
    requestList.append(item);
  });
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

async function deleteRequest(id) {
  if (!window.confirm("削除しますか？")) return;
  const { error } = await supabase.from("barcode_requests").delete().eq("id", id);
  if (error) {
    setStatus(`削除できません: ${error.message}`);
    return;
  }
  setStatus("削除しました。");
  await loadRequests();
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

  const header = ["日時", "質問入力内容", "Chatbot回答または聞き返し"];
  const rows = logs.map((log) => [
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
    const { data, error } = await supabase
      .from("chatbot_logs")
      .select("created_at,question,answer")
      .order("created_at", { ascending: false })
      .limit(10000);

    if (error) {
      setStatus(`Supabaseログを読み込めません。ローカルログを確認します: ${error.message}`);
      return [];
    }

    return (data || []).map((log) => ({
      createdAt: log.created_at,
      question: log.question,
      answer: log.answer,
    }));
  } catch (error) {
    setStatus(`Supabaseログを読み込めません。ローカルログを確認します: ${error.message || ""}`);
    return [];
  }
}

function getChatLogs() {
  try {
    const logs = JSON.parse(localStorage.getItem(chatLogStorageKey) || "[]");
    return Array.isArray(logs) ? logs : [];
  } catch (_error) {
    return [];
  }
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
