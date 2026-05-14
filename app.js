const commandCatalog = [
  {
    id: "df-default",
    label: "データフォーマット初期化",
    category: "基本操作",
    summary: "登録済みのデータフォーマットを工場出荷状態(None)に戻します。",
    keywords: ["default", "初期化", "デフォルト", "none", "消す", "リセット", "やり直し", "フォーマット削除"],
    command: "DFMDF3.",
    notes: ["PDF 103Pの Default Data Format に対応します。", "全体の初期化ではなく、データフォーマット設定だけを初期状態に戻す用途です。"],
  },
  {
    id: "df-show",
    label: "データフォーマット設定内容出力バーコード",
    category: "基本操作",
    summary: "現在登録されているデータフォーマット設定内容を出力します。",
    keywords: ["show", "表示", "確認", "現在", "設定確認", "設定内容", "内容出力", "設定内容出力", "一覧", "見る", "読み出し"],
    command: "DFMBK3?.",
    notes: ["PDF 103Pの Show Data Format / Data Format Settings に対応します。", "設定変更前の確認用として使います。"],
  },
  {
    id: "df-enter",
    label: "データフォーマット登録開始",
    category: "登録",
    summary: "Primary/Alternate、端末ID、コードID、長さ、編集コマンドを指定して登録します。",
    keywords: ["enter", "登録", "追加", "作成", "add", "format", "フォーマット作成", "データフォーマット"],
    command: "DFMBK3##.",
    notes: ["## には、形式番号 + 端末ID + コードID + 長さ + Editor Commands を入れます。", "例: Primary、全端末099、全シンボル99、全長9999、全送信+CR は DFMBK300999999F10D. です。"],
  },
  {
    id: "df-example-enter",
    label: "データフォーマットでEnter付加",
    category: "登録例",
    summary: "全シンボル、全桁数を対象に、読み取りデータを出力して末尾にEnterを付けます。",
    keywords: ["enter", "改行", "cr", "エンター", "末尾", "全送信", "f1", "0d", "サンプル", "例"],
    command: "DFMBK300999999F10D.",
    notes: ["0 は Primary Data Format、099 は全端末、99 は全シンボル、9999 は全長です。", "F1 は現在位置から全データを送信し、0D を追加する Send all characters コマンドです。"],
  },
  {
    id: "df-example-tab",
    label: "データフォーマットでTab付加",
    category: "登録例",
    summary: "全シンボル、全桁数を対象に、読み取りデータを出力して末尾にTabを付けます。",
    keywords: ["tab", "タブ", "末尾", "次項目", "全送信", "f1", "09", "サンプル", "例"],
    command: "DFMBK300999999F109.",
    notes: ["09 は Tab の16進値です。", "Suffix 設定ではなく Data Format Editor で同等の加工を行う例です。"],
  },
  {
    id: "df-example-qr-first-10",
    label: "QR読み取り時のみ先頭10桁を出力",
    category: "登録例",
    summary: "QRコードを読み取った時だけ、データ先頭から10桁のみを出力します。",
    keywords: ["qr", "qrコード", "先頭10桁", "10桁", "先頭", "最初", "一部", "部分出力", "f2", "73", "切り出し"],
    command: "DFMBK30099739999F21000.",
    notes: ["0 は Primary Data Format、099 は全端末、73 は QR Code、9999 は全長を表す指定です。", "F2 10 00 は先頭から10桁を送信する応用例です。"],
  },
  {
    id: "df-example-qr-20-first-10",
    label: "QR20桁読み取り時のみ先頭10桁を出力",
    category: "登録例",
    summary: "20桁のQRコードを読み取った時だけ、データ先頭から10桁のみを出力します。",
    keywords: ["qr", "qrコード", "20桁", "先頭10桁", "10桁", "先頭", "最初", "一部", "部分出力", "f2", "73", "0020", "切り出し"],
    command: "DFMBK30099730020F21000.",
    notes: ["0 は Primary Data Format、099 は全端末、73 は QR Code、0020 は20桁を表す指定です。", "20桁以外のQRコードにはこのデータフォーマットは適用されません。"],
  },
  {
    id: "df-example-code128-20-first-10",
    label: "Code128 20桁読み取り時のみ先頭10桁を出力",
    category: "登録例",
    summary: "20桁のCode128を読み取った時だけ、データ先頭から10桁のみを出力します。",
    keywords: ["code128", "code 128", "コード128", "20桁", "先頭10桁", "10桁", "先頭", "最初", "一部", "部分出力", "f2", "6a", "0020", "切り出し"],
    command: "DFMBK300996A0020F21000.",
    notes: ["0 は Primary Data Format、099 は全端末、6A は Code128、0020 は20桁を表す指定です。", "20桁以外のCode128にはこのデータフォーマットは適用されません。"],
  },
  {
    id: "df-example-ocr-remove-hyphen-space",
    label: "OCR読み取り時のみハイフンとスペースを削除",
    category: "登録例",
    summary: "OCR読み取りデータからハイフンとスペースを削除して出力します。",
    keywords: ["ocr", "ハイフン", "hyphen", "スペース", "space", "削除", "除去", "消す", "2d", "20", "fb", "f100", "文字削除"],
    command: "DFMBK300994F9999FB022D20F100.",
    notes: ["0 は Primary Data Format、099 は全端末、4F は OCR、9999 は全長を表す指定です。", "FB022D20 は 2文字分の削除対象としてハイフン(2D)とスペース(20)を指定し、F100 で残りのデータを出力する応用例です。"],
  },
  {
    id: "df-example-replace-gs-with-slash",
    label: "GSコードをスラッシュに置換",
    category: "登録例",
    summary: "コード種、桁数に関係なく、GSコードをスラッシュに置き換えて出力します。",
    keywords: ["gs", "gsコード", "gsキャラクター", "group separator", "グループセパレータ", "スラッシュ", "slash", "/", "/(スラッシュ)", "置換", "置き換え", "置き換えて", "変換", "e4", "1d", "2f", "全コード", "全桁"],
    command: "DFMBK30099999999E4021D2FF100.",
    notes: ["0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。", "E4 は置換コマンド、02 は置換キャラクタ数、1D は置換前の GS、2F は置換後のスラッシュです。", "F100 は置換完了後に全てのデータを送信する指定です。"],
  },
  {
    id: "df-example-replace-gs-with-space",
    label: "GSコードをスペースに置換",
    category: "登録例",
    summary: "コード種、桁数に関係なく、GSコードをスペースに置き換えて出力します。",
    keywords: ["gs", "gsコード", "gsキャラクター", "group separator", "グループセパレータ", "スペース", "space", "置換", "置き換え", "変換", "e4", "1d", "20", "全コード", "全桁"],
    command: "DFMBK30099999999E4021D20F100.",
    notes: ["0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。", "E4 は置換コマンド、02 は置換キャラクタ数、1D は置換前の GS、20 は置換後のスペースです。", "F100 は置換完了後に全てのデータを送信する指定です。"],
  },
  {
    id: "df-example-replace-space-with-a",
    label: "スペースをAに置換",
    category: "登録例",
    summary: "コード種、桁数に関係なく、スペースをAに置き換えて出力します。",
    keywords: ["スペース", "space", "空白", "a", "A", "置換", "置き換え", "置き換えて", "変換", "e4", "20", "41", "全コード", "全桁"],
    command: "DFMBK30099999999E4022041F100.",
    notes: ["0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。", "E4 は置換コマンド、02 は置換キャラクタ数、20 は置換前のスペース、41 は置換後の A です。", "F100 は置換完了後に全てのデータを送信する指定です。"],
  },
  {
    id: "df-example-remove-space",
    label: "スペースを削除",
    category: "登録例",
    summary: "コード種、桁数に関係なく、スペースを削除して出力します。",
    keywords: ["スペース", "space", "空白", "削除", "除去", "消す", "fb", "01", "20", "全コード", "全桁"],
    command: "DFMBK30099999999FB0120F100.",
    notes: ["0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。", "FB は削除コマンド、01 は削除キャラクタ数、20 は削除対象のスペースです。", "F100 は削除完了後に全てのデータを送信する指定です。"],
  },
  {
    id: "df-example-prefix-ctrl-shift-f5",
    label: "先頭にCtrl+Shift+F5を付加",
    category: "登録例",
    summary: "全コード種、全桁数を対象に、データ先頭へCtrl+Shift+F5を付加して出力します。",
    keywords: ["ctrl", "control", "shift", "f5", "ctrl+shift+f5", "ショートカット", "キー", "先頭", "付加", "追加", "b5", "011174", "全コード", "全桁"],
    command: "DFMBK30099999999B5011174F100.",
    notes: ["0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。", "B5011174 は Ctrl+Shift+F5 のキー付加、F100 は残りのデータ出力を表す応用例です。", "B5コマンドはUSB-HID使用時のみ有効です。RS232CやUSB-COMインターフェイス設定では使用できません。"],
  },
  {
    id: "df-example-code128-prefix-b21",
    label: "Code128限定で先頭にb21を付加",
    category: "登録例",
    summary: "Code128の全桁数を対象に、データ先頭へ文字列 b21 を付加して出力します。",
    keywords: ["code128", "code 128", "コード128", "b21", "先頭", "付加", "追加", "文字列", "ba", "0003", "623231", "6a", "全桁"],
    command: "DFMBK300996A9999BA0003623231F100.",
    notes: ["0 は Primary Data Format、099 は全端末、6A は Code128、9999 は全桁数を表す指定です。", "BA0003623231 は3文字の b21 を付加し、F100 で残りのデータを出力する応用例です。"],
  },
  {
    id: "df-clear-one",
    label: "データフォーマット1件削除",
    category: "削除",
    summary: "指定したPrimary/Alternate、端末ID、コードID、長さのフォーマットだけを削除します。",
    keywords: ["clear one", "1件", "一つ", "個別", "削除", "消す", "clear", "特定"],
    command: "DFMCL3.",
    notes: ["PDF 103Pの Clear One Data Format に対応します。", "対象の形式番号、端末ID、コードID、長さを指定して削除します。"],
  },
  {
    id: "df-clear-all",
    label: "データフォーマット全削除バーコード",
    category: "削除",
    summary: "登録済みのデータフォーマット設定をすべて削除します。",
    keywords: ["clear all", "全削除", "全部", "すべて", "削除", "消す", "クリア"],
    command: "DFMDF3.",
    notes: ["PDF 103Pの Data Format 初期化に対応します。", "Prefix/Suffix など他章の設定は削除対象ではありません。"],
  },
  {
    id: "df-off",
    label: "データフォーマッタOFF",
    category: "有効化",
    summary: "データフォーマット処理を無効にし、読み取ったまま出力します。",
    keywords: ["off", "無効", "止める", "使わない", "raw", "そのまま", "オフ"],
    command: "DFM_EN0.",
    notes: ["Data Formatter Off に対応します。", "バーコードデータは Prefix/Suffix を含めて通常どおり出力されます。"],
  },
  {
    id: "df-on-keep",
    label: "ON 任意一致 Prefix/Suffix保持",
    category: "有効化",
    summary: "一致するフォーマットがあれば加工し、Prefix/Suffixも送信します。",
    keywords: ["on", "有効", "keep", "保持", "prefix", "suffix", "任意", "not required", "デフォルト"],
    command: "DFM_EN1.",
    notes: ["Data Formatter On, Not Required, Keep Prefix/Suffix に対応します。", "マニュアル上のデフォルト設定です。"],
  },
  {
    id: "df-required-keep",
    label: "必須一致 Prefix/Suffix保持",
    category: "有効化",
    summary: "登録フォーマットに一致したデータだけ送信し、Prefix/Suffixも保持します。",
    keywords: ["required", "必須", "一致", "エラー", "keep", "保持", "厳密"],
    command: "DFM_EN2.",
    notes: ["Data Format Required, Keep Prefix/Suffix に対応します。", "一致しないバーコードは送信されず、通常はエラー音が鳴ります。"],
  },
  {
    id: "df-on-drop",
    label: "ON 任意一致 Prefix/Suffix破棄",
    category: "有効化",
    summary: "一致するフォーマットがあれば加工し、その時だけPrefix/Suffixを送信しません。",
    keywords: ["drop", "破棄", "削除", "prefix", "suffix", "not required", "任意", "捨てる"],
    command: "DFM_EN3.",
    notes: ["Data Formatter On, Not Required, Drop Prefix/Suffix に対応します。", "フォーマットが見つからない場合は Prefix/Suffix を含めて通常送信されます。"],
  },
  {
    id: "df-required-drop",
    label: "必須一致 Prefix/Suffix破棄",
    category: "有効化",
    summary: "登録フォーマットに一致したデータだけ送信し、Prefix/Suffixは送信しません。",
    keywords: ["required", "必須", "drop", "破棄", "prefix", "suffix", "一致", "厳密"],
    command: "DFM_EN4.",
    notes: ["Data Format Required, Drop Prefix/Suffix に対応します。", "B8 の Discard Data を使う場合など、Required が必要な処理に向いています。"],
  },
  {
    id: "df-error-tone-on",
    label: "不一致エラー音ON",
    category: "エラー音",
    summary: "必須フォーマットに一致しないバーコードでエラー音を鳴らします。",
    keywords: ["error", "tone", "エラー音", "不一致", "鳴る", "on", "警告"],
    command: "DFMDEC0.",
    notes: ["Data Format Non-Match Error Tone On に対応します。", "マニュアル上のデフォルト設定です。"],
  },
  {
    id: "df-error-tone-off",
    label: "不一致エラー音OFF",
    category: "エラー音",
    summary: "必須フォーマットに一致しないバーコードでもエラー音を鳴らしません。",
    keywords: ["error", "tone", "エラー音", "不一致", "鳴らない", "off", "静か"],
    command: "DFMDEC1.",
    notes: ["Data Format Non-Match Error Tone Off に対応します。", "不一致データは送信されませんが、エラー音だけ止めます。"],
  },
];

const functionCodeTable = [
  { code: "NUL", hex: "00" },
  { code: "SOH", hex: "01" },
  { code: "STX", hex: "02" },
  { code: "ETX", hex: "03" },
  { code: "EOT", hex: "04" },
  { code: "ENQ", hex: "05" },
  { code: "ACK", hex: "06" },
  { code: "BEL", hex: "07" },
  { code: "BS", hex: "08" },
  { code: "HT", display: "HT (TAB)", hex: "09", aliases: ["tab", "タブ"] },
  { code: "LF", hex: "0A" },
  { code: "VT", hex: "0B" },
  { code: "FF", hex: "0C" },
  { code: "CR", hex: "0D", aliases: ["改行", "enter", "エンター"] },
  { code: "SO", hex: "0E" },
  { code: "SI", hex: "0F" },
  { code: "DLE", hex: "10" },
  { code: "DC1", hex: "11" },
  { code: "DC2", hex: "12" },
  { code: "DC3", hex: "13" },
  { code: "DC4", hex: "14" },
  { code: "NAK", hex: "15" },
  { code: "SYN", hex: "16" },
  { code: "ETB", hex: "17" },
  { code: "CAN", hex: "18" },
  { code: "EM", hex: "19" },
  { code: "SUB", hex: "1A" },
  { code: "ESC", hex: "1B" },
  { code: "FS", hex: "1C" },
  { code: "GS", hex: "1D", aliases: ["gsコード", "gsキャラクター", "group separator", "グループセパレータ"] },
  { code: "RS", hex: "1E" },
  { code: "US", hex: "1F" },
];

const characterHexTable = [
  { char: "SPACE", display: "スペース", hex: "20", aliases: ["space", "blank", "空白", "スペース"] },
  { char: "!", hex: "21", aliases: ["exclamation", "感嘆符"] },
  { char: '"', hex: "22", aliases: ["double quote", "ダブルクォート", "引用符"] },
  { char: "#", hex: "23", aliases: ["sharp", "hash", "井桁"] },
  { char: "$", hex: "24", aliases: ["dollar", "ドル"] },
  { char: "%", hex: "25", aliases: ["percent", "パーセント"] },
  { char: "&", hex: "26", aliases: ["ampersand", "アンパサンド"] },
  { char: "'", hex: "27", aliases: ["single quote", "シングルクォート", "アポストロフィ"] },
  { char: "(", hex: "28", aliases: ["left parenthesis", "左括弧"] },
  { char: ")", hex: "29", aliases: ["right parenthesis", "右括弧"] },
  { char: "*", hex: "2A", aliases: ["asterisk", "アスタリスク"] },
  { char: "+", hex: "2B", aliases: ["plus", "プラス"] },
  { char: ",", hex: "2C", aliases: ["comma", "カンマ"] },
  { char: "-", hex: "2D", aliases: ["hyphen", "minus", "ハイフン", "マイナス"] },
  { char: ".", hex: "2E", aliases: ["period", "dot", "ピリオド", "ドット"] },
  { char: "/", hex: "2F", aliases: ["slash", "スラッシュ"] },
  { char: "0", hex: "30", aliases: ["zero", "ゼロ"] },
  { char: "1", hex: "31", aliases: ["one"] },
  { char: "2", hex: "32", aliases: ["two"] },
  { char: "3", hex: "33", aliases: ["three"] },
  { char: "4", hex: "34", aliases: ["four"] },
  { char: "5", hex: "35", aliases: ["five"] },
  { char: "6", hex: "36", aliases: ["six"] },
  { char: "7", hex: "37", aliases: ["seven"] },
  { char: "8", hex: "38", aliases: ["eight"] },
  { char: "9", hex: "39", aliases: ["nine"] },
  { char: ":", hex: "3A", aliases: ["colon", "コロン"] },
  { char: ";", hex: "3B", aliases: ["semicolon", "セミコロン"] },
  { char: "<", hex: "3C", aliases: ["less than", "小なり"] },
  { char: "=", hex: "3D", aliases: ["equals", "イコール"] },
  { char: ">", hex: "3E", aliases: ["greater than", "大なり"] },
  { char: "?", hex: "3F", aliases: ["question", "疑問符"] },
  { char: "@", hex: "40", aliases: ["at", "アット"] },
  ...Array.from({ length: 26 }, (_, index) => {
    const char = String.fromCharCode(65 + index);
    return { char, hex: (65 + index).toString(16).toUpperCase(), aliases: [`大文字${char}`] };
  }),
  { char: "[", hex: "5B", aliases: ["left bracket", "左角括弧"] },
  { char: "\\", hex: "5C", aliases: ["backslash", "バックスラッシュ", "円記号"] },
  { char: "]", hex: "5D", aliases: ["right bracket", "右角括弧"] },
  { char: "^", hex: "5E", aliases: ["caret", "キャレット"] },
  { char: "_", hex: "5F", aliases: ["underscore", "アンダースコア"] },
  { char: "`", hex: "60", aliases: ["backtick", "バッククォート"] },
  ...Array.from({ length: 26 }, (_, index) => {
    const char = String.fromCharCode(97 + index);
    return { char, hex: (97 + index).toString(16).toUpperCase(), aliases: [`小文字${char}`] };
  }),
  { char: "{", hex: "7B", aliases: ["left brace", "左波括弧"] },
  { char: "|", hex: "7C", aliases: ["pipe", "縦線"] },
  { char: "}", hex: "7D", aliases: ["right brace", "右波括弧"] },
  { char: "~", hex: "7E", aliases: ["tilde", "チルダ"] },
];

const b5KeyMapTable = [
  { key: "Ctrl", hex: "01", aliases: ["control", "コントロール", "ctrl"] },
  { key: "Shift", hex: "11", aliases: ["シフト", "shift"] },
  { key: "Alt", hex: "19", aliases: ["オルト", "alt"] },
  { key: "Enter", hex: "0D", aliases: ["return", "改行", "エンター"] },
  { key: "Tab", hex: "09", aliases: ["タブ"] },
  { key: "Esc", hex: "1B", aliases: ["escape", "エスケープ"] },
  { key: "Backspace", hex: "08", aliases: ["bs", "バックスペース"] },
  { key: "Space", hex: "3D", aliases: ["スペース", "space"] },
  { key: "F1", hex: "70", aliases: ["ファンクション1"] },
  { key: "F2", hex: "71", aliases: ["ファンクション2"] },
  { key: "F3", hex: "72", aliases: ["ファンクション3"] },
  { key: "F4", hex: "73", aliases: ["ファンクション4"] },
  { key: "F5", hex: "74", aliases: ["ファンクション5"] },
  { key: "F6", hex: "75", aliases: ["ファンクション6"] },
  { key: "F7", hex: "76", aliases: ["ファンクション7"] },
  { key: "F8", hex: "77", aliases: ["ファンクション8"] },
  { key: "F9", hex: "78", aliases: ["ファンクション9"] },
  { key: "F10", hex: "79", aliases: ["ファンクション10"] },
  { key: "F11", hex: "7A", aliases: ["ファンクション11"] },
  { key: "F12", hex: "7B", aliases: ["ファンクション12"] },
  { key: "Insert", hex: "2D", aliases: ["ins", "挿入"] },
  { key: "Delete", hex: "2E", aliases: ["del", "削除"] },
  { key: "Home", hex: "24", aliases: ["ホーム"] },
  { key: "End", hex: "23", aliases: ["エンド"] },
  { key: "PageUp", hex: "21", aliases: ["page up", "pgup", "ページアップ"] },
  { key: "PageDown", hex: "22", aliases: ["page down", "pgdn", "ページダウン"] },
  { key: "ArrowLeft", hex: "25", aliases: ["left", "左", "左矢印"] },
  { key: "ArrowUp", hex: "26", aliases: ["up", "上", "上矢印"] },
  { key: "ArrowRight", hex: "27", aliases: ["right", "右", "右矢印"] },
  { key: "ArrowDown", hex: "28", aliases: ["down", "下", "下矢印"] },
];

const fallbackText =
  "該当するデータフォーマット設定が見つかりませんでした。\n\n例のように、登録・削除・有効化・エラー音・出力例を含めて質問してください。\n「データフォーマットを表示」「全削除」「Enterを付ける例」「必須一致にしたい」「不一致エラー音を消したい」";

const welcomeText =
  "";

const messages = document.querySelector("#messages");
const form = document.querySelector("#chatForm");
const input = document.querySelector("#messageInput");
const clearButton = document.querySelector("#clearButton");
const quickActions = document.querySelector("#quickActions");
const categoryList = document.querySelector("#categoryList");
const template = document.querySelector("#messageTemplate");

function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
}

function scoreCommand(query, item) {
  const normalizedQuery = normalizeText(query);
  const normalizedLabel = normalizeText(item.label);
  let score = normalizedQuery.includes(normalizedLabel) ? 6 : 0;

  item.keywords.forEach((keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedQuery.includes(normalizedKeyword)) {
      score += normalizedKeyword.length > 3 ? 3 : 2;
    }
  });

  if (normalizedQuery.includes(normalizeText(item.category))) {
    score += 1;
  }

  return score;
}

function findMatches(query) {
  return commandCatalog
    .map((item) => ({ item, score: scoreCommand(query, item) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((result) => result.item);
}

function getSymbologyTarget(normalizedQuery) {
  if (normalizedQuery.includes("qr") || normalizedQuery.includes("qrコード")) {
    return { codeId: "73", label: "QRコード" };
  }
  if (normalizedQuery.includes("code128") || normalizedQuery.includes("code 128") || normalizedQuery.includes("コード128")) {
    return { codeId: "6A", label: "Code128" };
  }
  if (normalizedQuery.includes("ocr")) {
    return { codeId: "4F", label: "OCR" };
  }
  return null;
}

function buildLeadingCharactersCommand(query) {
  const normalizedQuery = normalizeText(query);
  const match = normalizedQuery.match(/(?:先頭|最初)(?:から)?\s*(\d{1,2})\s*桁/);

  if (!match || !/(出力|送信|表示|取り出|切り出|のみ)/.test(normalizedQuery)) return null;

  const characterCount = Number(match[1]);
  if (!Number.isInteger(characterCount) || characterCount < 1 || characterCount > 99) return null;

  const symbology = getSymbologyTarget(normalizedQuery);
  const readLengthMatch = normalizedQuery.match(/(\d{1,4})\s*桁\s*(?:読み取り|読取|バーコード|コード)/);
  const readLength = readLengthMatch ? Number(readLengthMatch[1]) : null;

  const countHex = characterCount.toString().padStart(2, "0");
  const codeId = symbology ? symbology.codeId : "99";
  const codeLabel = symbology ? symbology.label : "全コード種";
  const lengthField = readLength ? String(readLength).padStart(4, "0") : "9999";
  const labelTarget = readLength ? `${readLength}桁バーコード限定で` : "全桁数で";
  const summaryTarget = readLength ? `${readLength}桁のバーコードだけを対象に、` : "読取桁数を限定せず、";
  const lengthNote = readLength
    ? `${lengthField} は${readLength}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-${codeId}-${lengthField}-first-${countHex}`,
    label: `${codeLabel}・${labelTarget}先頭${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、${summaryTarget}読み取りデータの先頭${characterCount}桁のみを出力します。`,
    keywords: [],
    command: `DFMBK30099${codeId}${lengthField}F2${countHex}00.`,
    notes: [
      `${codeId} は${codeLabel}を表す指定です。${lengthNote}`,
      `F2${countHex}00 は先頭から${characterCount}桁を送信する Data Format Editor コマンドです。`,
    ],
  };
}

function buildRangeCharactersCommand(query) {
  const normalizedQuery = normalizeText(query);
  const match = normalizedQuery.match(/(\d{1,2})\s*桁目\s*から\s*(\d{1,2})\s*桁/);

  if (!match || !/(出力|送信|表示|取り出|切り出|のみ)/.test(normalizedQuery)) return null;

  const startPosition = Number(match[1]);
  const characterCount = Number(match[2]);
  if (
    !Number.isInteger(startPosition) ||
    !Number.isInteger(characterCount) ||
    startPosition < 1 ||
    startPosition > 99 ||
    characterCount < 1 ||
    characterCount > 99
  ) {
    return null;
  }

  const symbology = getSymbologyTarget(normalizedQuery);
  const readLengthMatch = normalizedQuery.match(/(\d{1,4})\s*桁\s*(?:読み取り|読取|バーコード|コード)/);
  const readLength = readLengthMatch ? Number(readLengthMatch[1]) : null;

  const cursorMove = startPosition - 1;
  const cursorHex = cursorMove.toString().padStart(2, "0");
  const countHex = characterCount.toString().padStart(2, "0");
  const codeId = symbology ? symbology.codeId : "99";
  const codeLabel = symbology ? symbology.label : "全コード種";
  const lengthField = readLength ? String(readLength).padStart(4, "0") : "9999";
  const lengthLabel = readLength ? `${readLength}桁読み取り時` : "全桁数";
  const lengthNote = readLength
    ? `${lengthField} は${readLength}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-${codeId}-${lengthField}-from-${cursorHex}-count-${countHex}`,
    label: `${codeLabel}・${lengthLabel} ${startPosition}桁目から${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの${startPosition}桁目から${characterCount}桁のみを出力します。`,
    keywords: [],
    command: `DFMBK30099${codeId}${lengthField}F5${cursorHex}F2${countHex}00.`,
    notes: [
      `${codeId} は${codeLabel}を表す指定です。${lengthNote}`,
      `F5${cursorHex} でカーソルを${cursorMove}桁移動し、F2${countHex}00 でそこから${characterCount}桁を送信します。`,
    ],
  };
}

function findExactTransformCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsGs = ["gs", "gsコード", "gsキャラクター", "group separator", "グループセパレータ"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );
  const mentionsReplace = ["置換", "置き換え", "置き換えて", "変換"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!mentionsGs || !mentionsReplace) return null;

  if (normalizedQuery.includes("/") || normalizedQuery.includes("スラッシュ") || normalizedQuery.includes("slash")) {
    return commandCatalog.find((item) => item.id === "df-example-replace-gs-with-slash");
  }

  if (normalizedQuery.includes("スペース") || normalizedQuery.includes("space") || normalizedQuery.includes("空白")) {
    return commandCatalog.find((item) => item.id === "df-example-replace-gs-with-space");
  }

  return null;
}

function findExactSpaceTransformCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsReplace = ["置換", "置き換え", "置き換えて", "変換"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!mentionsReplace) return null;

  const normalizedCaseQuery = query
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
  const transformMatch = normalizedCaseQuery.match(/(\S+)\s*を\s*(\S+)\s*(?:に|へ)?\s*(?:置換|置き換え|置き換えて|変換)/i);

  if (!transformMatch) return null;

  const sourceChar = normalizeReplaceCharacter(transformMatch[1]);
  const targetChar = normalizeReplaceCharacter(transformMatch[2]);
  if (!sourceChar || !targetChar) return null;

  const sourceHex = sourceChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
  const targetHex = targetChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");

  return {
    id: `df-generated-replace-${sourceHex}-with-${targetHex}`,
    label: `${describeReplaceCharacter(sourceChar)}を${describeReplaceCharacter(targetChar)}に置換`,
    category: "登録例",
    summary: `コード種、桁数に関係なく、${describeReplaceCharacter(sourceChar)}を${describeReplaceCharacter(targetChar)}に置き換えて出力します。`,
    keywords: [],
    command: `DFMBK30099999999E402${sourceHex}${targetHex}F100.`,
    notes: [
      "0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。",
      `E4 は置換コマンド、02 は置換キャラクタ数、${sourceHex} は置換前の ${describeReplaceCharacter(sourceChar)}、${targetHex} は置換後の ${describeReplaceCharacter(targetChar)} です。`,
      "F100 は置換完了後に全てのデータを送信する指定です。",
    ],
  };

}

function findReplaceCharacters(query) {
  const normalizedCaseQuery = query
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
  const transformMatch = normalizedCaseQuery.match(
    /([!-~]|スペース|space|空白|スラッシュ|slash)\s*を\s*([!-~]|スペース|space|空白|スラッシュ|slash)\s*(?:に|へ)?\s*(?:置換|置き換え|置き換えて|変換)/i
  );

  if (!transformMatch) return null;

  const sourceChar = normalizeReplaceCharacter(transformMatch[1]);
  const targetChar = normalizeReplaceCharacter(transformMatch[2]);
  if (!sourceChar || !targetChar) return null;

  return { sourceChar, targetChar };
}

function buildReplaceThenRangeCommand(query) {
  const normalizedQuery = normalizeText(query);
  const rangeMatch = normalizedQuery.match(/(\d{1,2})\s*桁目\s*から\s*(\d{1,2})\s*桁/);
  const mentionsReplace = ["置換", "置き換え", "置き換えて", "変換"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!rangeMatch || !mentionsReplace || !/(出力|送信|表示|取り出|切り出|ください)/.test(normalizedQuery)) return null;

  const replaceChars = findReplaceCharacters(query);
  const startPosition = Number(rangeMatch[1]);
  const characterCount = Number(rangeMatch[2]);
  if (
    !replaceChars ||
    !Number.isInteger(startPosition) ||
    !Number.isInteger(characterCount) ||
    startPosition < 1 ||
    startPosition > 99 ||
    characterCount < 1 ||
    characterCount > 99
  ) {
    return null;
  }

  const symbology = getSymbologyTarget(normalizedQuery);
  const readLengthMatch = normalizedQuery.match(/(\d{1,4})\s*桁\s*(?:読み取り|読取|バーコード|コード)/);
  const readLength = readLengthMatch ? Number(readLengthMatch[1]) : null;
  const sourceHex = replaceChars.sourceChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
  const targetHex = replaceChars.targetChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
  const cursorMove = startPosition - 1;
  const cursorHex = cursorMove.toString().padStart(2, "0");
  const countHex = characterCount.toString().padStart(2, "0");
  const codeId = symbology ? symbology.codeId : "99";
  const codeLabel = symbology ? symbology.label : "全コード種";
  const lengthField = readLength ? String(readLength).padStart(4, "0") : "9999";
  const lengthLabel = readLength ? `${readLength}桁読み取り時` : "全桁数";
  const lengthNote = readLength
    ? `${lengthField} は${readLength}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-replace-${sourceHex}-with-${targetHex}-${codeId}-${lengthField}-from-${cursorHex}-count-${countHex}`,
    label: `${describeReplaceCharacter(replaceChars.sourceChar)}を${describeReplaceCharacter(replaceChars.targetChar)}に置換後 ${startPosition}桁目から${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${describeReplaceCharacter(replaceChars.sourceChar)}を${describeReplaceCharacter(replaceChars.targetChar)}に置き換えてから${startPosition}桁目から${characterCount}桁のみを出力します。`,
    keywords: [],
    command: `DFMBK30099${codeId}${lengthField}E402${sourceHex}${targetHex}F7F5${cursorHex}F2${countHex}00.`,
    notes: [
      `${codeId} は${codeLabel}を表す指定です。${lengthNote}`,
      `E402${sourceHex}${targetHex} は ${describeReplaceCharacter(replaceChars.sourceChar)} を ${describeReplaceCharacter(replaceChars.targetChar)} に置換する指定です。`,
      "F7 は置換後にカーソルを先頭へ戻す指定です。",
      `F5${cursorHex} でカーソルを${cursorMove}桁移動し、F2${countHex}00 でそこから${characterCount}桁を送信します。`,
    ],
  };
}

function findDeleteTargetCharacter(query) {
  const normalizedCaseQuery = query
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
  const namedTargetMatch = normalizedCaseQuery.match(/(スペース|space|空白|スラッシュ|slash)\s*(?:を)?\s*(?:削除|除去|消す|消して)/i);
  const asciiTargetMatch = normalizedCaseQuery.match(/([!-~])\s*(?:を)?\s*(?:削除|除去|消す|消して)/i);
  const targetValue = namedTargetMatch?.[1] || asciiTargetMatch?.[1];
  return targetValue ? normalizeReplaceCharacter(targetValue) : null;
}

function normalizeReplaceCharacter(value) {
  const normalized = value.trim();
  const lowered = normalized.toLowerCase();
  if (["スペース", "space", "空白"].includes(lowered)) return " ";
  if (["スラッシュ", "slash"].includes(lowered)) return "/";
  if (normalized.length === 1 && normalized >= "!" && normalized <= "~") return normalized;
  return null;
}

function describeReplaceCharacter(char) {
  if (char === " ") return "スペース";
  if (char === "/") return "/(スラッシュ)";
  return char;
}

function findExactDeleteCharacterCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));
  if (!mentionsDelete) return null;

  const targetChar = findDeleteTargetCharacter(query);
  if (!targetChar) return null;

  const targetHex = targetChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");

  return {
    id: `df-generated-delete-${targetHex}`,
    label: `${describeReplaceCharacter(targetChar)}を削除`,
    category: "登録例",
    summary: `コード種、桁数に関係なく、${describeReplaceCharacter(targetChar)}を削除して出力します。`,
    keywords: [],
    command: `DFMBK30099999999FB01${targetHex}F100.`,
    notes: [
      "0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。",
      `FB は削除コマンド、01 は削除キャラクタ数、${targetHex} は削除対象の ${describeReplaceCharacter(targetChar)} です。`,
      "F100 は削除完了後に全てのデータを送信する指定です。",
    ],
  };
}

function buildDeleteThenRangeCommand(query) {
  const normalizedQuery = normalizeText(query);
  const rangeMatch = normalizedQuery.match(/(\d{1,2})\s*桁目\s*から\s*(\d{1,2})\s*桁/);
  const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!rangeMatch || !mentionsDelete || !/(出力|送信|表示|取り出|切り出|ください)/.test(normalizedQuery)) return null;

  const targetChar = findDeleteTargetCharacter(query);
  const startPosition = Number(rangeMatch[1]);
  const characterCount = Number(rangeMatch[2]);
  if (
    !targetChar ||
    !Number.isInteger(startPosition) ||
    !Number.isInteger(characterCount) ||
    startPosition < 1 ||
    startPosition > 99 ||
    characterCount < 1 ||
    characterCount > 99
  ) {
    return null;
  }

  const symbology = getSymbologyTarget(normalizedQuery);
  const readLengthMatch = normalizedQuery.match(/(\d{1,4})\s*桁\s*(?:読み取り|読取|バーコード|コード)/);
  const readLength = readLengthMatch ? Number(readLengthMatch[1]) : null;
  const targetHex = targetChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
  const cursorMove = startPosition - 1;
  const cursorHex = cursorMove.toString().padStart(2, "0");
  const countHex = characterCount.toString().padStart(2, "0");
  const codeId = symbology ? symbology.codeId : "99";
  const codeLabel = symbology ? symbology.label : "全コード種";
  const lengthField = readLength ? String(readLength).padStart(4, "0") : "9999";
  const lengthLabel = readLength ? `${readLength}桁読み取り時` : "全桁数";
  const lengthNote = readLength
    ? `${lengthField} は${readLength}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-delete-${targetHex}-${codeId}-${lengthField}-from-${cursorHex}-count-${countHex}`,
    label: `${describeReplaceCharacter(targetChar)}削除後 ${startPosition}桁目から${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${describeReplaceCharacter(targetChar)}を削除してから${startPosition}桁目から${characterCount}桁のみを出力します。`,
    keywords: [],
    command: `DFMBK30099${codeId}${lengthField}FB01${targetHex}F7F5${cursorHex}F2${countHex}00.`,
    notes: [
      `${codeId} は${codeLabel}を表す指定です。${lengthNote}`,
      `FB01${targetHex} は ${describeReplaceCharacter(targetChar)} を削除する指定です。`,
      "F7 は削除後にカーソルを先頭へ戻す指定です。",
      `F5${cursorHex} でカーソルを${cursorMove}桁移動し、F2${countHex}00 でそこから${characterCount}桁を送信します。`,
    ],
  };
}

function findFunctionCodes(query) {
  const normalizedQuery = normalizeText(query);
  const wantsHex = ["hex", "16進", "16進数", "ascii", "文字コード", "ファンクションコード"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!wantsHex) return [];

  return functionCodeTable.filter((item) => {
    const code = normalizeText(item.code);
    const display = normalizeText(item.display || "");
    const hex = normalizeText(item.hex);
    const aliases = item.aliases || [];
    return normalizedQuery.includes(code) || normalizedQuery.includes(display) || normalizedQuery.includes(hex) || aliases.some((alias) => normalizedQuery.includes(normalizeText(alias)));
  });
}

function findCharacters(query) {
  const normalizedQuery = normalizeText(query);
  const wantsHex = ["hex", "16進", "16進数", "ascii", "キャラクター", "文字"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!wantsHex) return [];

  return characterHexTable.filter((item) => {
    const char = normalizeText(item.char);
    const display = normalizeText(item.display || "");
    const hex = normalizeText(item.hex);
    const aliases = (item.aliases || []).map(normalizeText);

    if (normalizedQuery.includes(display) || aliases.some((alias) => normalizedQuery.includes(alias))) {
      return true;
    }

    if (normalizedQuery.includes(hex)) {
      return true;
    }

    if (item.char.length === 1) {
      return normalizedQuery.includes(`「${char}」`) || normalizedQuery.includes(`'${char}'`) || normalizedQuery.includes(`"${char}"`);
    }

    return false;
  });
}

function findB5Keys(query) {
  const normalizedQuery = normalizeText(query);
  const wantsB5 = ["b5", "キーマップ", "キーコード", "keyboard", "キーボード"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!wantsB5) return [];

  const matches = b5KeyMapTable.filter((item) => {
    const key = normalizeText(item.key);
    const hex = normalizeText(item.hex);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(key) || normalizedQuery.includes(hex) || aliases.some((alias) => normalizedQuery.includes(alias));
  });

  return matches.length > 0 ? matches : b5KeyMapTable;
}

function buildIcon(pathList) {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      ${pathList.map((path) => `<path d="${path}" />`).join("")}
    </svg>
  `;
}

const icons = {
  connect: buildIcon(["M8 7V3h8v4", "M6 7h12v6a6 6 0 0 1-12 0V7z", "M12 19v2"]),
  edit: buildIcon(["M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z", "M13 6l5 5"]),
  sound: buildIcon(["M4 10v4h4l5 4V6L8 10H4z", "M16 9a4 4 0 0 1 0 6"]),
  scan: buildIcon(["M4 7V5a1 1 0 0 1 1-1h2", "M17 4h2a1 1 0 0 1 1 1v2", "M20 17v2a1 1 0 0 1-1 1h-2", "M7 20H5a1 1 0 0 1-1-1v-2", "M7 12h10"]),
};

function iconForCategory(category) {
  if (category === "登録" || category === "登録例") return icons.edit;
  if (category === "エラー音") return icons.sound;
  if (category === "有効化") return icons.connect;
  return icons.scan;
}

function addMessage(role, content, options = {}) {
  if (!content) return;

  const node = template.content.firstElementChild.cloneNode(true);
  node.classList.add(role);
  const bubble = node.querySelector(".bubble");

  if (options.html) {
    bubble.innerHTML = content;
  } else {
    bubble.textContent = content;
  }

  messages.append(node);
  renderAztecBarcodes(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function commandToHtml(item) {
  const notes = item.notes.map((note) => `<p>${escapeHtml(note)}</p>`).join("");
  const settingCommand = normalizeSettingCommand(item.command);
  return `
    <div class="command-card">
      <div>
        <div class="command-title">${escapeHtml(item.label)}</div>
        <p>${escapeHtml(item.summary)}</p>
      </div>
      <div class="command-code">
        <span>${escapeHtml(item.command)}</span>
        <button class="copy-command" type="button" data-command="${escapeHtml(item.command)}" aria-label="コマンドをコピー" title="コマンドをコピー">
          ${buildIcon(["M8 8h10v12H8z", "M6 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"])}
        </button>
      </div>
      <div>${notes}</div>
      <div class="aztec-card">
        <div>
          <strong>設定用バーコード</strong>
          <p>${escapeHtml(settingCommand)}</p>
        </div>
        <canvas
          class="aztec-canvas"
          width="260"
          height="260"
          data-setting-command="${escapeHtml(settingCommand)}"
          aria-label="設定用バーコード"
        ></canvas>
        <p class="barcode-status">生成中...</p>
      </div>
    </div>
  `;
}

function functionCodesToHtml(items) {
  const rows = items
    .map((item) => {
      const label = item.display || item.code;
      return `
        <div class="function-code-row">
          <strong>${escapeHtml(label)}</strong>
          <span>${escapeHtml(item.hex)}</span>
        </div>
      `;
    })
    .join("");

  return `
    <div class="command-card">
      <div>
        <div class="command-title">ファンクションコード Hex/ASCII表</div>
        <p>Data Formatの置換、削除、付加で使うHex/ASCII値です。</p>
      </div>
      <div class="function-code-table">${rows}</div>
    </div>
  `;
}

function charactersToHtml(items) {
  const rows = items
    .map((item) => {
      const label = item.display ? `${item.display} (${item.char})` : item.char;
      return `
        <div class="function-code-row">
          <strong>${escapeHtml(label)}</strong>
          <span>${escapeHtml(item.hex)}</span>
        </div>
      `;
    })
    .join("");

  return `
    <div class="command-card">
      <div>
        <div class="command-title">キャラクター Hex/ASCII表</div>
        <p>Data Formatの文字付加、置換、削除で使うHex/ASCII値です。</p>
      </div>
      <div class="function-code-table">${rows}</div>
    </div>
  `;
}

function b5KeysToHtml(items) {
  const rows = items
    .map(
      (item) => `
        <div class="function-code-row">
          <strong>${escapeHtml(item.key)}</strong>
          <span>${escapeHtml(item.hex)}</span>
        </div>
      `
    )
    .join("");

  return `
    <div class="command-card">
      <div>
        <div class="command-title">B5キーマップ</div>
        <p>B5コマンドでキー付加する時のヨーロッパスタイルキーボード用コードです。</p>
        <p>B5コマンドはUSB-HID使用時のみ有効です。RS232CやUSB-COMインターフェイス設定では使用できません。</p>
      </div>
      <div class="function-code-table">${rows}</div>
    </div>
  `;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[char];
  });
}

function normalizeSettingCommand(command) {
  const trimmed = command.trim();
  if (trimmed.endsWith("?")) return trimmed;
  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
}

function getEzConfigBarcodeUrl(command) {
  const apiUrl = window.HON_BARCODE_API_URL || "http://127.0.0.1:8765/barcode";
  return `${apiUrl}?cmd=${encodeURIComponent(normalizeSettingCommand(command))}`;
}

function renderAztecBarcodes(root = document) {
  const canvases = root.querySelectorAll(".aztec-canvas:not([data-rendered])");
  canvases.forEach(async (canvas) => {
    const status = canvas.parentElement.querySelector(".barcode-status");
    const command = canvas.dataset.settingCommand;

    try {
      const response = await fetch(getEzConfigBarcodeUrl(command));
      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`HTTP ${response.status}${detail ? `: ${detail}` : ""}`);
      }

      const blob = await response.blob();
      const image = new Image();
      const imageUrl = URL.createObjectURL(blob);
      image.onload = () => {
        const context = canvas.getContext("2d");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(imageUrl);
      };
      image.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        status.textContent = "EZConfig方式の設定バーコード画像を読み込めませんでした。";
      };
      image.src = imageUrl;
      canvas.dataset.rendered = "true";
      status.textContent = "";
    } catch (error) {
      status.textContent = `Supabaseの設定バーコード生成APIに接続できません。${error.message || ""}`;
    }
  });
}

function answerQuestion(question) {
  const functionCodes = findFunctionCodes(question);
  const characters = findCharacters(question);
  const b5Keys = findB5Keys(question);
  const replaceThenRangeCommand = buildReplaceThenRangeCommand(question);
  const exactTransformCommand = findExactTransformCommand(question) || findExactSpaceTransformCommand(question);
  const deleteThenRangeCommand = buildDeleteThenRangeCommand(question);
  const exactDeleteCommand = findExactDeleteCharacterCommand(question);
  const generatedRangeCommand = buildRangeCharactersCommand(question);
  const generatedLeadingCommand = buildLeadingCharactersCommand(question);
  const matches = findMatches(question);

  if (functionCodes.length > 0) {
    const lead = "<p>ファンクションコードの16進値はこちらです。</p>";
    addMessage("bot", lead + functionCodesToHtml(functionCodes), { html: true });
    return;
  }

  if (characters.length > 0) {
    const lead = "<p>キャラクターの16進値はこちらです。</p>";
    addMessage("bot", lead + charactersToHtml(characters), { html: true });
    return;
  }

  if (b5Keys.length > 0) {
    const lead = "<p>B5コマンド用のキーコードはこちらです。</p>";
    addMessage("bot", lead + b5KeysToHtml(b5Keys), { html: true });
    return;
  }

  if (replaceThenRangeCommand) {
    const lead = "<p>この設定コマンドを試してください。</p>";
    addMessage("bot", lead + commandToHtml(replaceThenRangeCommand), { html: true });
    return;
  }

  if (deleteThenRangeCommand) {
    const lead = "<p>この設定コマンドを試してください。</p>";
    addMessage("bot", lead + commandToHtml(deleteThenRangeCommand), { html: true });
    return;
  }

  if (exactTransformCommand) {
    const lead = "<p>この設定コマンドを試してください。</p>";
    addMessage("bot", lead + commandToHtml(exactTransformCommand), { html: true });
    return;
  }

  if (exactDeleteCommand) {
    const lead = "<p>この設定コマンドを試してください。</p>";
    addMessage("bot", lead + commandToHtml(exactDeleteCommand), { html: true });
    return;
  }

  if (generatedRangeCommand) {
    const lead = "<p>この設定コマンドを試してください。</p>";
    addMessage("bot", lead + commandToHtml(generatedRangeCommand), { html: true });
    return;
  }

  if (generatedLeadingCommand) {
    const lead = "<p>この設定コマンドを試してください。</p>";
    addMessage("bot", lead + commandToHtml(generatedLeadingCommand), { html: true });
    return;
  }

  if (matches.length === 0) {
    addMessage("bot", fallbackText);
    return;
  }

  if (matches.length > 1) {
    addMessage("bot", "コマンド不明のため設定バーコードは生成できません。");
    return;
  }

  const lead = "<p>この設定コマンドを試してください。</p>";
  addMessage("bot", lead + matches.map(commandToHtml).join(""), { html: true });
}

function submitQuestion(question) {
  const trimmed = question.trim();
  if (!trimmed) return;

  addMessage("user", trimmed);
  input.value = "";
  window.setTimeout(() => answerQuestion(trimmed), 180);
}

function submitCommandItem(item) {
  addMessage("user", item.label);
  input.value = "";
  const lead = "<p>この設定コマンドを試してください。</p>";
  window.setTimeout(() => addMessage("bot", lead + commandToHtml(item), { html: true }), 180);
}

function openPdf(path) {
  window.open(path, "_blank", "noopener");
}

function renderQuickActions() {
  const quickItems = [
    { type: "command", item: commandCatalog.find((item) => item.id === "df-show") },
    {
      type: "pdf",
      label: "ASCII表",
      summary: "Hex/ASCII表をPDFで表示します。",
      path: "HonASCII.pdf",
    },
    {
      type: "pdf",
      label: "データフォーマット機能説明",
      summary: "Data Formatの機能説明をPDFで表示します。",
      path: "HonDataFormat.pdf",
    },
    { type: "command", item: commandCatalog.find((item) => item.id === "df-clear-all") },
  ];

  quickItems
    .filter((entry) => entry.type === "pdf" || entry.item)
    .forEach((entry) => {
      const item = entry.item;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quick-action";
      button.innerHTML = `
        <span class="quick-icon">${entry.type === "pdf" ? icons.scan : iconForCategory(item.category)}</span>
        <span>
          <strong>${escapeHtml(entry.type === "pdf" ? entry.label : item.label)}</strong>
          <span>${escapeHtml(entry.type === "pdf" ? entry.summary : item.summary)}</span>
        </span>
      `;
      button.addEventListener("click", () => {
        if (entry.type === "pdf") {
          openPdf(entry.path);
          return;
        }
        submitCommandItem(item);
      });
      quickActions.append(button);
    });
}

function renderCategories() {
  if (!categoryList) return;
  const categories = [...new Set(commandCatalog.map((item) => item.category))];
  categories.forEach((category) => {
    const item = document.createElement("li");
    item.textContent = category;
    categoryList.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitQuestion(input.value);
});

messages.addEventListener("click", async (event) => {
  const button = event.target.closest(".copy-command");
  if (!button) return;

  const command = button.dataset.command;
  const copied = await copyToClipboard(command);
  button.title = copied ? "コピーしました" : "コピーできませんでした";
  window.setTimeout(() => {
    button.title = "コマンドをコピー";
  }, 1200);
});

clearButton.addEventListener("click", () => {
  messages.textContent = "";
  input.focus();
});

renderQuickActions();
renderCategories();
addMessage("bot", welcomeText);

async function copyToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return fallbackCopy(value);
    }
  }

  return fallbackCopy(value);
}

function fallbackCopy(value) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}
