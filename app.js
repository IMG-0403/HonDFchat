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
    id: "df-example-suffix-ctrl",
    label: "データ末尾にCTRLを付加",
    category: "登録例",
    summary: "全コード種、全桁数を対象に、読み取りデータを出力して末尾にCTRLキーを付加します。",
    requestText: "データ末尾にCTRL付加する設定",
    keywords: ["ctrl", "control", "コントロール", "末尾", "後ろ", "付加", "追加", "キー", "b5", "012040", "全コード", "全桁"],
    command: "DFMBK30099999999F100B5012040.",
    notes: ["0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。", "F100 は読み取りデータを全て出力し、B5012040 は末尾に CTRL キーを付加する指定です。", "B5コマンドはUSB-HID使用時のみ有効です。RS232CやUSB-COMインターフェイス設定では使用できません。"],
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

const symbologyCodeTable = [
  { codeId: "99", label: "全コード種", aliases: ["all symbologies", "全シンボル", "全コード", "全コード種"] },
  { codeId: "61", label: "Codabar/NW-7", aliases: ["codabar", "コーダバー", "nw-7", "nw7"] },
  { codeId: "68", label: "Code 11", aliases: ["code11", "code 11", "コード11"] },
  { codeId: "6A", label: "Code128", aliases: ["code128", "code 128", "コード128"] },
  { codeId: "3C", label: "Code32", aliases: ["code32", "code 32", "コード32", "pharmaceutical", "paraf"] },
  { codeId: "62", label: "Code39", aliases: ["code39", "code 39", "コード39"] },
  { codeId: "54", label: "TLC39", aliases: ["tlc39", "tcif linked code39"] },
  { codeId: "69", label: "Code93", aliases: ["code93", "code 93", "code 93i", "コード93"] },
  { codeId: "64", label: "EAN-13/JAN-13", aliases: ["ean", "ean13", "ean-13", "jan", "jan13", "jan-13", "bookland"] },
  { codeId: "44", label: "EAN-8", aliases: ["ean8", "ean-8"] },
  { codeId: "79", label: "GS1 DataBar", aliases: ["gs1", "gs1 databar", "gs1 composite", "gs1 omnidirectional"] },
  { codeId: "7B", label: "GS1 Limited", aliases: ["gs1 limited"] },
  { codeId: "7D", label: "GS1 Expanded", aliases: ["gs1 expanded"] },
  { codeId: "49", label: "GS1-128", aliases: ["gs1 128", "gs1-128"] },
  { codeId: "51", label: "China Post", aliases: ["china post", "中国郵便"] },
  { codeId: "65", label: "Interleaved 2 of 5", aliases: ["interleaved 2 of 5", "itf", "i2of5"] },
  { codeId: "6D", label: "Matrix 2 of 5", aliases: ["matrix 2 of 5"] },
  { codeId: "59", label: "NEC 2 of 5", aliases: ["nec 2 of 5"] },
  { codeId: "66", label: "Straight 2 of 5", aliases: ["straight 2 of 5", "iata", "industrial 2 of 5"] },
  { codeId: "67", label: "MSI", aliases: ["msi"] },
  { codeId: "74", label: "Telepen", aliases: ["telepen"] },
  { codeId: "63", label: "UPC-A", aliases: ["upc", "upc-a", "upca"] },
  { codeId: "45", label: "UPC-E", aliases: ["upc-e", "upce", "upc-e1"] },
  { codeId: "7A", label: "Aztec Code", aliases: ["aztec", "aztec code", "アズテック"] },
  { codeId: "48", label: "Chinese Sensible Code", aliases: ["chinese sensible code", "漢信コード"] },
  { codeId: "56", label: "Codablock A", aliases: ["codablock a"] },
  { codeId: "71", label: "Codablock F", aliases: ["codablock f"] },
  { codeId: "6C", label: "Code49", aliases: ["code49", "code 49"] },
  { codeId: "77", label: "Data Matrix", aliases: ["data matrix", "datamatrix", "データマトリックス"] },
  { codeId: "78", label: "MaxiCode", aliases: ["maxicode", "maxi code"] },
  { codeId: "72", label: "PDF417", aliases: ["pdf417", "pdf 417"] },
  { codeId: "52", label: "Micro PDF417", aliases: ["micro pdf417", "micro pdf 417"] },
  { codeId: "73", label: "QRコード", aliases: ["qr", "qrコード", "qr code", "micro qr", "micro qr code"] },
  { codeId: "4F", label: "OCR", aliases: ["ocr"] },
  { codeId: "41", label: "Australian Post", aliases: ["australian post"] },
  { codeId: "42", label: "British Post", aliases: ["british post"] },
  { codeId: "43", label: "Canadian Post", aliases: ["canadian post"] },
  { codeId: "2C", label: "InfoMail", aliases: ["infomail"] },
  { codeId: "4D", label: "Intelligent Mail Bar Code", aliases: ["intelligent mail", "imb"] },
  { codeId: "4A", label: "Japanese Post", aliases: ["japanese post", "日本郵便"] },
  { codeId: "4B", label: "KIX Post", aliases: ["kix", "kix post", "netherlands post"] },
  { codeId: "3F", label: "Korea Post", aliases: ["korea post"] },
  { codeId: "4C", label: "Planet Code", aliases: ["planet", "planet code"] },
  { codeId: "4E", label: "Postal-4i", aliases: ["postal-4i", "postal 4i"] },
  { codeId: "50", label: "Postnet", aliases: ["postnet"] },
];

const dataFormatEditorCommandTable = [
  { code: "F1", title: "全データを送信", description: "現在のカーソル位置から末尾までを送信し、最後に指定した1文字を追加します。", format: "F1xx", aliases: ["全送信", "send all"] },
  { code: "F2", title: "指定桁数を送信", description: "現在のカーソル位置から指定した桁数だけ送信し、最後に指定した1文字を追加します。", format: "F2nnxx", aliases: ["指定桁数", "部分出力"] },
  { code: "F3", title: "指定文字の手前まで送信", description: "現在のカーソル位置から、指定した文字が出現する手前までを送信し、最後に指定した1文字を追加します。", format: "F3xxxx" },
  { code: "B9", title: "指定文字列の手前まで送信", description: "現在のカーソル位置から、指定した文字列が出現する手前までを送信します。", format: "B9nnnns..s" },
  { code: "E9", title: "末尾から指定桁を除いて送信", description: "現在のカーソル位置から末尾までのうち、最後の指定桁数を除いたデータを送信します。実行後、カーソルは入力データの末尾を過ぎた位置へ移動します。", format: "E9nn" },
  { code: "F5", title: "カーソルを前方へ移動", description: "現在のカーソル位置から指定した桁数分、データの末尾方向へ進めます。", format: "F5nn", aliases: ["前方移動"] },
  { code: "F6", title: "カーソルを後方へ移動", description: "現在のカーソル位置から指定した桁数分、データの先頭方向へ戻します。", format: "F6nn", aliases: ["後方移動"] },
  { code: "F7", title: "カーソルを先頭へ移動", description: "カーソルを読み取りデータの先頭へ移動します。", format: "F7", aliases: ["先頭へ戻す"] },
  { code: "EA", title: "カーソルを末尾へ移動", description: "カーソルを読み取りデータの最終キャラクタの手前へ移動します。", format: "EA" },
  { code: "F8", title: "前方のキャラクタを検索して移動", description: "現在のカーソル位置より前方にある指定キャラクタを検索し、その手前までカーソルを移動します。", format: "F8xx" },
  { code: "F9", title: "後方のキャラクタを検索して移動", description: "現在のカーソル位置より後方にある指定キャラクタを検索し、その手前までカーソルを移動します。", format: "F9xx" },
  { code: "B0", title: "前方の文字列を検索して移動", description: "現在のカーソル位置より前方にある指定文字列を検索し、その手前までカーソルを移動します。", format: "B0nnnns..s" },
  { code: "B1", title: "後方の文字列を検索して移動", description: "現在のカーソル位置より後方にある指定文字列を検索し、その手前までカーソルを移動します。", format: "B1nnnns..s" },
  { code: "E6", title: "前方の合致しないキャラクタを検索して移動", description: "指定キャラクタと一致しない最初のキャラクタの手前までカーソルを移動します。", format: "E6xx" },
  { code: "E7", title: "後方の合致しないキャラクタを検索して移動", description: "後方にある、指定キャラクタと一致しない最初のキャラクタの手前までカーソルを移動します。", format: "E7xx" },
  { code: "F4", title: "文字を繰り返し挿入", description: "現在のカーソル位置に、指定した1文字を指定回数だけ挿入します。カーソル位置は移動しません。", format: "F4xxnn" },
  { code: "BA", title: "文字列を挿入", description: "現在のカーソル位置に、指定した文字列を挿入します。カーソル位置は移動しません。", format: "BAnnnns..s" },
  { code: "B3", title: "シンボル名を挿入", description: "現在のカーソル位置にシンボル名を挿入します。対象はHoneywell IDを持つシンボルです。", format: "B3" },
  { code: "B4", title: "バーコード長を挿入", description: "現在のカーソル位置に、読み取ったバーコードの桁数を挿入します。", format: "B4" },
  { code: "B5", title: "キーストロークを挿入", description: "日本語105キー配列からキーを選択し、キーボード入力として挿入します。", format: "B5nn..." },
  { code: "EF", title: "ディレイを挿入", description: "現在のカーソル位置に、5ms単位の待ち時間を挿入します。キーボードウェッジインターフェースの場合のみ使用できます。", format: "EFnnnn" },
  { code: "FB", title: "キャラクタを無効にする", description: "カーソル位置はそのままで、最大15種類のキャラクタを無効化します。無効化したキャラクタも桁数としてはカウントされます。", format: "FBnnxxyyzz..." },
  { code: "E4", title: "キャラクタを置き換える", description: "最大15種類のキャラクタを、カーソルを移動せずに別のキャラクタへ置き換えます。", format: "E4nnxx1xx2yy1yy2..." },
  { code: "FE", title: "キャラクタを比較して移動", description: "現在のカーソル位置にあるキャラクタを指定キャラクタと比較します。一致した場合はカーソルを1つ進めます。", format: "FExx" },
  { code: "B2", title: "文字列を比較して移動", description: "現在のカーソル位置にある文字列を指定文字列と比較します。一致した場合はカーソルをその文字列の末尾まで移動します。", format: "B2nnnns..s" },
  { code: "EC", title: "数字をチェックする", description: "現在のカーソル位置のキャラクタが数字であることを確認します。数字でない場合はフォーマットを中止します。", format: "EC" },
  { code: "ED", title: "数字以外のキャラクタをチェックする", description: "現在のカーソル位置のキャラクタが数字以外であることを確認します。数字の場合はフォーマットを中止します。", format: "ED" },
];

const fallbackText =
  "該当するデータフォーマット設定が見つかりませんでした。\n\n例のように、登録・削除・有効化・エラー音・出力例を含めて質問してください。\n「データフォーマットを表示」「全削除」「Enterを付ける例」「必須一致にしたい」「不一致エラー音を消したい」";

const barcodeUnavailableHtml = `
  <div class="contact-message">
    <p>申し訳ございません。設定バーコードを生成できません。</p>
    <p>恐れ入りますが、ご依頼の設定内容を下記のメールアドレスにご連絡ください。</p>
    <p class="contact-mail">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
      <span>infohp@imagers.co.jp</span>
    </p>
  </div>
`;

const welcomeText =
  "";

let adminCommandCatalog = [];

const messages = document.querySelector("#messages");
const form = document.querySelector("#chatForm");
const input = document.querySelector("#messageInput");
const clearButton = document.querySelector("#clearButton");
const quickActions = document.querySelector("#quickActions");
const categoryList = document.querySelector("#categoryList");
const template = document.querySelector("#messageTemplate");
const samplePrompt = document.querySelector(".sample-prompt");
const scannerMark = document.querySelector(".scanner-mark");
let adminClickCount = 0;
let adminClickTimer = 0;

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
  const normalizedSummary = normalizeText(item.summary || "");
  const normalizedRequestText = normalizeText(item.requestText || "");
  let score = normalizedQuery.includes(normalizedLabel) ? 6 : 0;

  if (normalizedRequestText && normalizedQuery.includes(normalizedRequestText)) {
    score += 10;
  } else if (normalizedRequestText && normalizedRequestText.includes(normalizedQuery)) {
    score += 8;
  }

  if (normalizedSummary && normalizedQuery.includes(normalizedSummary)) {
    score += 4;
  }

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
  return getAllCommandCatalog()
    .map((item) => ({ item, score: scoreCommand(query, item) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((result) => result.item);
}

function getAllCommandCatalog() {
  return [...commandCatalog, ...adminCommandCatalog];
}

function getSymbologyTarget(normalizedQuery) {
  return symbologyCodeTable.find((item) => {
    const codeId = normalizeText(item.codeId);
    const label = normalizeText(item.label);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(codeId) || normalizedQuery.includes(label) || aliases.some((alias) => normalizedQuery.includes(alias));
  }) || null;
}

function getSymbologyTargets(normalizedQuery) {
  const targets = symbologyCodeTable.filter((item) => {
    if (item.codeId === "99") return false;
    const codeId = normalizeText(item.codeId);
    const label = normalizeText(item.label);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(codeId) || normalizedQuery.includes(label) || aliases.some((alias) => normalizedQuery.includes(alias));
  });

  return targets.length > 0 ? targets : [symbologyCodeTable[0]];
}

function buildDataFormatCommandFromBlocks(blocks) {
  return blocks.map((block, index) => (index === 0 ? `DFMBK3${block}` : block)).join("|") + ".";
}

function getReadLengths(normalizedQuery) {
  const lengthPattern = /((?:\d{1,4}\s*桁\s*(?:と|、|,|，|\/|\+|&|and)?\s*)+)\s*(?:読み取り|読取|バーコード|コード)/g;
  const lengths = [];
  let match;

  while ((match = lengthPattern.exec(normalizedQuery)) !== null) {
    const lengthText = match[1];
    const numberMatches = lengthText.matchAll(/(\d{1,4})\s*桁/g);
    for (const numberMatch of numberMatches) {
      lengths.push(Number(numberMatch[1]));
    }
  }

  return [...new Set(lengths.filter((length) => Number.isInteger(length) && length >= 0 && length <= 9999))];
}

function buildTargetBlocks(symbologyTargets, readLengths, editorCommand) {
  const lengthFields = readLengths.length > 0 ? readLengths.map((length) => String(length).padStart(4, "0")) : ["9999"];
  return symbologyTargets.flatMap((target) =>
    lengthFields.map((lengthField) => `0099${target.codeId}${lengthField}${editorCommand}`)
  );
}

function buildLeadingCharactersCommand(query) {
  const normalizedQuery = normalizeText(query);
  const match = normalizedQuery.match(/(?:先頭|最初)(?:から)?\s*(\d{1,2})\s*桁/);

  if (!match || !/(出力|送信|表示|取り出|切り出|のみ)/.test(normalizedQuery)) return null;

  const characterCount = Number(match[1]);
  if (!Number.isInteger(characterCount) || characterCount < 1 || characterCount > 99) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);

  const countHex = characterCount.toString().padStart(2, "0");
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const labelTarget = readLengths.length > 0 ? `${readLengths.join("桁と")}桁バーコード限定で` : "全桁数で";
  const summaryTarget = readLengths.length > 0 ? `${readLengths.join("桁と")}桁のバーコードだけを対象に、` : "読取桁数を限定せず、";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";
  const editorCommand = `F2${countHex}00`;

  return {
    id: `df-generated-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-first-${countHex}`,
    label: `${codeLabel}・${labelTarget}先頭${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、${summaryTarget}読み取りデータの先頭${characterCount}桁のみを出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      "複数条件は | で区切り、2件目以降は DFMBK3 を付けずに条件ブロックだけを連結します。",
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

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);

  const cursorMove = startPosition - 1;
  const cursorHex = cursorMove.toString().padStart(2, "0");
  const countHex = characterCount.toString().padStart(2, "0");
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";
  const editorCommand = `F5${cursorHex}F2${countHex}00`;

  return {
    id: `df-generated-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-from-${cursorHex}-count-${countHex}`,
    label: `${codeLabel}・${lengthLabel} ${startPosition}桁目から${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの${startPosition}桁目から${characterCount}桁のみを出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
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
  return findDeleteTargetCharacters(query)[0] || null;
}

function findDeleteTargetCharacters(query) {
  const normalizedCaseQuery = query
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
  const targetMatch = normalizedCaseQuery.match(/(.+?)\s*(?:を)?\s*(?:削除|除去|消す|消して)/i);
  if (!targetMatch) return [];

  const targetText = targetMatch[1]
    .replace(/^(?:.*?時|.*?場合|.*?とき)\s*/i, "")
    .replace(/^(?:に|、|,|\s)+/, "")
    .trim();
  const rawTargets = targetText
    .split(/\s*(?:と|、|,|，|\/|\+|&|and)\s*/i)
    .map((value) => value.trim())
    .filter(Boolean);

  return rawTargets.map(normalizeReplaceCharacter).filter(Boolean);
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

  const targetChars = findDeleteTargetCharacters(query);
  if (targetChars.length === 0) return null;

  const symbology = getSymbologyTarget(normalizedQuery);
  const codeId = symbology ? symbology.codeId : "99";
  const codeLabel = symbology ? symbology.label : "全コード種";
  const targetHex = targetChars.map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("");
  const suppressCount = targetChars.length.toString().padStart(2, "0");
  const targetLabel = targetChars.map(describeReplaceCharacter).join("と");

  return {
    id: `df-generated-delete-${targetHex}-${codeId}`,
    label: `${codeLabel} ${targetLabel}を削除`,
    category: "登録例",
    summary: `${codeLabel}を対象に、${targetLabel}を削除して出力します。`,
    keywords: [],
    command: `DFMBK30099${codeId}9999FB${suppressCount}${targetHex}F100.`,
    notes: [
      `0 は Primary Data Format、099 は全端末、${codeId} は${codeLabel}、9999 は全桁数を表す指定です。`,
      `FB は削除コマンド、${suppressCount} は削除キャラクタ数、${targetHex} は削除対象の ${targetLabel} です。`,
      "F100 は削除完了後に全てのデータを送信する指定です。",
    ],
  };
}

function findExactSuffixCtrlCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsCtrl = ["ctrl", "control", "コントロール"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsSuffix = ["末尾", "後ろ", "最後"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsAppend = ["付加", "追加", "つける", "付ける"].some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!mentionsCtrl || !mentionsSuffix || !mentionsAppend) return null;

  return commandCatalog.find((item) => item.id === "df-example-suffix-ctrl") || null;
}

function buildDeleteThenRangeCommand(query) {
  const normalizedQuery = normalizeText(query);
  const rangeMatch = normalizedQuery.match(/(\d{1,2})\s*桁目\s*から\s*(\d{1,2})\s*桁/);
  const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!rangeMatch || !mentionsDelete || !/(出力|送信|表示|取り出|切り出|ください)/.test(normalizedQuery)) return null;

  const targetChars = findDeleteTargetCharacters(query);
  const startPosition = Number(rangeMatch[1]);
  const characterCount = Number(rangeMatch[2]);
  if (
    targetChars.length === 0 ||
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
  const targetHex = targetChars.map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("");
  const suppressCount = targetChars.length.toString().padStart(2, "0");
  const targetLabel = targetChars.map(describeReplaceCharacter).join("と");
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
    label: `${targetLabel}削除後 ${startPosition}桁目から${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${targetLabel}を削除してから${startPosition}桁目から${characterCount}桁のみを出力します。`,
    keywords: [],
    command: `DFMBK30099${codeId}${lengthField}FB${suppressCount}${targetHex}F7F5${cursorHex}F2${countHex}00.`,
    notes: [
      `${codeId} は${codeLabel}を表す指定です。${lengthNote}`,
      `FB${suppressCount}${targetHex} は ${targetLabel} を削除する指定です。`,
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
  const wantsB5 = ["キーマップ", "キーコード", "keyboard", "キーボード"].some((word) =>
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

function findDataFormatEditorCommands(query) {
  const normalizedQuery = normalizeText(query);
  const wantsEditorCommand = [
    "editor command",
    "編集コマンド",
    "データフォーマットコマンド",
    "data format command",
    "dfコマンド",
    "コマンド一覧",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b9",
    "ba",
    "e4",
    "e6",
    "e7",
    "e9",
    "ea",
    "ec",
    "ed",
    "ef",
    "fb",
    "fe",
  ].some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!wantsEditorCommand) return [];

  const matches = dataFormatEditorCommandTable.filter((item) => {
    const code = normalizeText(item.code);
    const title = normalizeText(item.title);
    const format = normalizeText(item.format);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(code) || normalizedQuery.includes(title) || normalizedQuery.includes(format) || aliases.some((alias) => normalizedQuery.includes(alias));
  });

  return matches.length > 0 ? matches : dataFormatEditorCommandTable;
}

function findSymbologyCodes(query) {
  const normalizedQuery = normalizeText(query);
  const wantsCodeId = ["code id", "コードid", "コード種id", "シンボルid", "symbology", "コード種", "シンボル"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!wantsCodeId) return [];

  const matches = symbologyCodeTable.filter((item) => {
    const codeId = normalizeText(item.codeId);
    const label = normalizeText(item.label);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(codeId) || normalizedQuery.includes(label) || aliases.some((alias) => normalizedQuery.includes(alias));
  });

  return matches.length > 0 ? matches : symbologyCodeTable;
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
  const settingCommand = normalizeSettingCommand(item.command);
  return `
    <div class="command-card">
      <div class="aztec-card">
        <div>
          <strong>設定用バーコード</strong>
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

function dataFormatEditorCommandsToHtml(items) {
  const rows = items
    .map(
      (item) => `
        <div class="df-command-row">
          <div>
            <strong>${escapeHtml(item.code)}｜${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.description)}</p>
          </div>
          <span>${escapeHtml(item.format)}</span>
        </div>
      `
    )
    .join("");

  return `
    <div class="command-card">
      <div>
        <div class="command-title">Data Format編集コマンド表</div>
        <p>IMG Scanner Utility for Honeywell_v2.0.0 の定義を元にした編集コマンド一覧です。</p>
      </div>
      <div class="df-command-table">${rows}</div>
    </div>
  `;
}

function symbologyCodesToHtml(items) {
  const rows = items
    .map(
      (item) => `
        <div class="function-code-row">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.codeId)}</span>
        </div>
      `
    )
    .join("");

  return `
    <div class="command-card">
      <div>
        <div class="command-title">コード種ID表</div>
        <p>Data Format条件ブロックのCode IDに指定するHoneywell IDです。</p>
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

function getSupabaseConfig() {
  return {
    url: (window.HON_SUPABASE_URL || "").replace(/\/$/, ""),
    anonKey: window.HON_SUPABASE_ANON_KEY || "",
  };
}

async function loadAdminCommandCatalog() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return;

  try {
    const response = await fetch(`${url}/rest/v1/barcode_requests?select=id,title,request_text,command,notes,keywords&status=eq.published&order=updated_at.desc`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    if (!response.ok) return;

    const rows = await response.json();
    adminCommandCatalog = rows
      .filter((row) => row.request_text && row.command)
      .map((row) => ({
        id: `admin-${row.id}`,
        label: row.title || row.request_text,
        category: "管理者登録",
        summary: row.request_text,
        requestText: row.request_text,
        keywords: Array.isArray(row.keywords) ? row.keywords : splitKeywords(row.keywords || ""),
        command: row.command,
        notes: row.notes ? [row.notes] : [],
      }));
  } catch {
    adminCommandCatalog = [];
  }
}

function splitKeywords(value) {
  return String(value)
    .split(/\s*(?:,|、|\n)\s*/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
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
  const replaceThenRangeCommand = buildReplaceThenRangeCommand(question);
  const suffixCtrlCommand = findExactSuffixCtrlCommand(question);
  const exactTransformCommand = findExactTransformCommand(question) || findExactSpaceTransformCommand(question);
  const deleteThenRangeCommand = buildDeleteThenRangeCommand(question);
  const exactDeleteCommand = findExactDeleteCharacterCommand(question);
  const generatedRangeCommand = buildRangeCharactersCommand(question);
  const generatedLeadingCommand = buildLeadingCharactersCommand(question);
  const matches = findMatches(question);

  if (replaceThenRangeCommand) {
    addMessage("bot", commandToHtml(replaceThenRangeCommand), { html: true });
    return;
  }

  if (deleteThenRangeCommand) {
    addMessage("bot", commandToHtml(deleteThenRangeCommand), { html: true });
    return;
  }

  if (suffixCtrlCommand) {
    addMessage("bot", commandToHtml(suffixCtrlCommand), { html: true });
    return;
  }

  if (exactTransformCommand) {
    addMessage("bot", commandToHtml(exactTransformCommand), { html: true });
    return;
  }

  if (exactDeleteCommand) {
    addMessage("bot", commandToHtml(exactDeleteCommand), { html: true });
    return;
  }

  if (generatedRangeCommand) {
    addMessage("bot", commandToHtml(generatedRangeCommand), { html: true });
    return;
  }

  if (generatedLeadingCommand) {
    addMessage("bot", commandToHtml(generatedLeadingCommand), { html: true });
    return;
  }

  if (matches.length === 0) {
    addMessage("bot", barcodeUnavailableHtml, { html: true });
    return;
  }

  if (matches.length > 1) {
    addMessage("bot", barcodeUnavailableHtml, { html: true });
    return;
  }

  addMessage("bot", matches.map(commandToHtml).join(""), { html: true });
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
  window.setTimeout(() => addMessage("bot", commandToHtml(item), { html: true }), 180);
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

samplePrompt?.addEventListener("click", () => {
  submitQuestion(samplePrompt.dataset.samplePrompt || "");
});

scannerMark?.addEventListener("click", () => {
  window.clearTimeout(adminClickTimer);
  adminClickCount += 1;
  if (adminClickCount >= 5) {
    window.location.href = "admin.html";
    return;
  }
  adminClickTimer = window.setTimeout(() => {
    adminClickCount = 0;
  }, 1600);
});

renderQuickActions();
renderCategories();
loadAdminCommandCatalog().finally(() => addMessage("bot", welcomeText));

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
