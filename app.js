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
    id: "df-example-trim-leading-zeroes",
    label: "データ先頭の0をすべて削除して出力",
    category: "登録例",
    summary: "読み取りデータ先頭の連続する0をスキップし、0以外の文字から末尾までを出力します。",
    requestText: "データ先頭の複数桁ある0をすべて削除して出力する設定",
    keywords: ["先頭", "0", "ゼロ", "zero", "複数桁", "すべて削除", "全て削除", "削除", "除去", "e630", "e6", "f100"],
    command: "DFMBK30099999999E630F100.",
    notes: ["0 は Primary Data Format、099 は全端末、99 は全コード種、9999 は全桁数を表す指定です。", "E630 は現在のカーソル位置から 0 以外のキャラクタ手前まで移動する指定です。", "F100 は移動後の位置から末尾までを出力します。例: 0000123 は 123 と出力されます。"],
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
    id: "df-example-code39-delay-f4",
    label: "Code39データ入力の2秒後にF4を付加",
    category: "登録例",
    summary: "Code39を対象に、読み取りデータを出力して2秒待機した後、F4キーを付加します。",
    requestText: "Code39データ入力の2秒経過後にF4を付加",
    keywords: ["code39", "code 39", "コード39", "2秒", "2 秒", "経過後", "待機", "ディレイ", "delay", "f4", "付加", "追加", "キー", "ef0400", "b5010073"],
    command: "DFMBK30099629999F100EF0400B5010073.",
    notes: ["0 は Primary Data Format、099 は全端末、62 は Code39、9999 は全桁数を表す指定です。", "F100 は読み取りデータを全て出力し、EF0400 は5ms単位で400回、つまり2秒の待機を挿入する指定です。", "B5010073 は F4 キーを付加する指定です。EF/B5 はキーボードウェッジ、USB-HID使用時の応用例です。"],
  },
  {
    id: "df-example-code39-delay-1s-f4",
    label: "Code39データ入力の1秒後にF4を付加",
    category: "登録例",
    summary: "Code39を対象に、読み取りデータを出力して1秒待機した後、F4キーを付加します。",
    requestText: "Code39データ入力の1秒経過後にF4を付加",
    keywords: ["code39", "code 39", "コード39", "1秒", "1 秒", "経過後", "待機", "ディレイ", "delay", "f4", "付加", "追加", "キー", "ef0200", "b5010073"],
    command: "DFMBK30099629999F100EF0200B5010073.",
    notes: ["0 は Primary Data Format、099 は全端末、62 は Code39、9999 は全桁数を表す指定です。", "F100 は読み取りデータを全て出力し、EF0200 は5ms単位で200回、つまり1秒の待機を挿入する指定です。", "B5010073 は F4 キーを付加する指定です。EF/B5 はキーボードウェッジ、USB-HID使用時の応用例です。"],
  },
  {
    id: "df-example-code39-delay-3s-f3",
    label: "Code39データ入力の3秒後にF3を付加",
    category: "登録例",
    summary: "Code39を対象に、読み取りデータを出力して3秒待機した後、F3キーを付加します。",
    requestText: "Code39データ入力の3秒経過後にF3を付加",
    keywords: ["code39", "code 39", "コード39", "3秒", "3 秒", "経過後", "待機", "ディレイ", "delay", "f3", "付加", "追加", "キー", "ef0600", "b5010072"],
    command: "DFMBK30099629999F100EF0600B5010072.",
    notes: ["0 は Primary Data Format、099 は全端末、62 は Code39、9999 は全桁数を表す指定です。", "F100 は読み取りデータを全て出力し、EF0600 は5ms単位で600回、つまり3秒の待機を挿入する指定です。", "B5010072 は F3 キーを付加する指定です。EF/B5 はキーボードウェッジ、USB-HID使用時の応用例です。"],
  },
  {
    id: "df-example-code128-delay-2s-f4",
    label: "Code128データ入力の2秒後にF4を付加",
    category: "登録例",
    summary: "Code128を対象に、読み取りデータを出力して2秒待機した後、F4キーを付加します。",
    requestText: "Code128データ入力の2秒経過後にF4を付加",
    keywords: ["code128", "code 128", "コード128", "2秒", "2 秒", "経過後", "待機", "ディレイ", "delay", "f4", "付加", "追加", "キー", "ef0400", "b5010073"],
    command: "DFMBK300996A9999F100EF0400B5010073.",
    notes: ["0 は Primary Data Format、099 は全端末、6A は Code128、9999 は全桁数を表す指定です。", "F100 は読み取りデータを全て出力し、EF0400 は5ms単位で400回、つまり2秒の待機を挿入する指定です。", "B5010073 は F4 キーを付加する指定です。EF/B5 はキーボードウェッジ、USB-HID使用時の応用例です。"],
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
  { key: "A", hex: "1F", aliases: ["a", "アルファベットA"] },
  { key: "B", hex: "31", aliases: ["b", "アルファベットB"] },
  { key: "C", hex: "2F", aliases: ["c", "アルファベットC"] },
  { key: "D", hex: "21", aliases: ["d", "アルファベットD"] },
  { key: "E", hex: "13", aliases: ["e", "アルファベットE"] },
  { key: "F", hex: "22", aliases: ["f", "アルファベットF"] },
  { key: "G", hex: "23", aliases: ["g", "アルファベットG"] },
  { key: "H", hex: "24", aliases: ["h", "アルファベットH"] },
  { key: "I", hex: "18", aliases: ["i", "アルファベットI"] },
  { key: "J", hex: "25", aliases: ["j", "アルファベットJ"] },
  { key: "K", hex: "26", aliases: ["k", "アルファベットK"] },
  { key: "L", hex: "27", aliases: ["l", "アルファベットL"] },
  { key: "M", hex: "33", aliases: ["m", "アルファベットM"] },
  { key: "N", hex: "32", aliases: ["n", "アルファベットN"] },
  { key: "O", hex: "19", aliases: ["o", "アルファベットO"] },
  { key: "P", hex: "1A", aliases: ["p", "アルファベットP"] },
  { key: "Q", hex: "11", aliases: ["q", "アルファベットQ"] },
  { key: "R", hex: "14", aliases: ["r", "アルファベットR"] },
  { key: "S", hex: "20", aliases: ["s", "アルファベットS"] },
  { key: "T", hex: "15", aliases: ["t", "アルファベットT"] },
  { key: "U", hex: "17", aliases: ["u", "アルファベットU"] },
  { key: "V", hex: "30", aliases: ["v", "アルファベットV"] },
  { key: "W", hex: "12", aliases: ["w", "アルファベットW"] },
  { key: "X", hex: "2E", aliases: ["x", "アルファベットX"] },
  { key: "Y", hex: "16", aliases: ["y", "アルファベットY"] },
  { key: "Z", hex: "2D", aliases: ["z", "アルファベットZ"] },
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
  { key: "左矢印", hex: "4F", aliases: ["左矢印", "左矢印キー", "left arrow", "arrow left"] },
  { key: "右矢印", hex: "59", aliases: ["右矢印", "右矢印キー", "right arrow", "arrow right"] },
  { key: "上矢印", hex: "53", aliases: ["上矢印", "上矢印キー", "up arrow", "arrow up"] },
  { key: "下矢印", hex: "54", aliases: ["下矢印", "下矢印キー", "down arrow", "arrow down"] },
];

const efDelayTable = [
  { command: "EF0100", delay: "0.5秒", aliases: ["0.5秒", "0.5 秒", "500ms"] },
  { command: "EF0200", delay: "1秒", aliases: ["1秒", "1 秒", "1000ms"] },
  { command: "EF0300", delay: "1.5秒", aliases: ["1.5秒", "1.5 秒", "1500ms"] },
  { command: "EF0400", delay: "2秒", aliases: ["2秒", "2 秒", "2000ms"] },
  { command: "EF0500", delay: "2.5秒", aliases: ["2.5秒", "2.5 秒", "2500ms"] },
  { command: "EF0600", delay: "3秒", aliases: ["3秒", "3 秒", "3000ms"] },
];

const b5ModifierTable = [
  { label: "なし", hex: "00", aliases: ["なし", "修飾なし", "shift alt ctrlなし", "shift、alt、ctrlなし"] },
  { label: "左SHIFT", hex: "01", aliases: ["左shift", "left shift", "shift"] },
  { label: "右SHIFT", hex: "02", aliases: ["右shift", "right shift"] },
  { label: "左ALT", hex: "04", aliases: ["左alt", "left alt", "alt"] },
  { label: "右ALT", hex: "08", aliases: ["右alt", "right alt"] },
  { label: "左CTRL", hex: "10", aliases: ["左ctrl", "left ctrl", "ctrl", "control", "コントロール"] },
  { label: "右CTRL", hex: "20", aliases: ["右ctrl", "right ctrl"] },
  { label: "左CTRL + 左SHIFT", hex: "11", aliases: ["左ctrl 左shift", "ctrl shift", "control shift", "ctrl+shift"] },
  { label: "左CTRL + 右SHIFT", hex: "12", aliases: ["左ctrl 右shift", "ctrl 右shift"] },
  { label: "左CTRL + 左ALT", hex: "14", aliases: ["左ctrl 左alt", "ctrl alt", "control alt", "ctrl+alt"] },
  { label: "左CTRL + 右ALT", hex: "18", aliases: ["左ctrl 右alt", "ctrl 右alt"] },
  { label: "右CTRL + 左SHIFT", hex: "21", aliases: ["右ctrl 左shift"] },
  { label: "右CTRL + 右SHIFT", hex: "22", aliases: ["右ctrl 右shift"] },
  { label: "右CTRL + 左ALT", hex: "24", aliases: ["右ctrl 左alt"] },
  { label: "右CTRL + 右ALT", hex: "28", aliases: ["右ctrl 右alt"] },
];

const symbologyCodeTable = [
  { codeId: "99", label: "全コード種", aliases: ["all symbologies", "全シンボル", "全コード", "全コード種", "全バーコード", "全バーコード種", "全てのバーコード種", "すべてのバーコード種"] },
  { codeId: "61", label: "Codabar/NW-7", aliases: ["codabar", "コーダバー", "nw-7", "nw7"] },
  { codeId: "68", label: "Code 11", aliases: ["code11", "code 11", "コード11"] },
  { codeId: "6A", label: "Code128", aliases: ["code128", "code 128", "コード128", "コード 128"] },
  { codeId: "3C", label: "Code32", aliases: ["code32", "code 32", "コード32", "pharmaceutical", "paraf"] },
  { codeId: "62", label: "Code39", aliases: ["code39", "code 39", "コード39", "コード 39"] },
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
  { code: "E6", title: "前方の合致しないキャラクタを検索して移動", description: "現在のカーソル位置から、指定したキャラクタ以外のキャラクタ手前までカーソルを移動します。", format: "E6xx" },
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

const appendWords = ["付加", "追加", "つける", "付ける", "挿入"];

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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

  const symbologyNames = symbologyCodeTable
    .flatMap((item) => [item.label, ...(item.aliases || [])])
    .map(normalizeText)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  for (const symbologyName of symbologyNames) {
    const inlineLengthPattern = new RegExp(`${escapeRegExp(symbologyName)}\\s*(\\d{1,4})\\s*桁\\s*(?:読み取り|読取|バーコード|コード)`, "g");
    while ((match = inlineLengthPattern.exec(normalizedQuery)) !== null) {
      lengths.push(Number(match[1]));
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

function symbologyTargetsToText(targets) {
  if (!targets || targets.length === 0 || targets.some((target) => target.codeId === "99")) return "";
  return targets.map((target) => target.label).join("と");
}

function readLengthsToText(readLengths) {
  return readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "";
}

function parseStructuredNlpRequest(query) {
  const normalizedQuery = normalizeText(query);
  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const structured = {
    original: query,
    normalized: normalizedQuery,
    symbologyTargets,
    readLengths,
    operation: null,
    canonicalQuery: "",
  };

  const replaceChars = findReplaceCharacters(query);
  if (replaceChars) {
    structured.operation = {
      type: "replace",
      sourceChar: replaceChars.sourceChar,
      targetChar: replaceChars.targetChar,
    };
  } else {
    const deleteChars = findDeleteTargetCharacters(query);
    const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));
    const deleteFromMatch = normalizedQuery.match(/(\d{1,2})\s*桁目\s*(?:以降|から\s*(?:(?:末尾|最後|全部|すべて|全て)|(?=(?:を)?\s*(?:出力|送信|表示|取り出|切り出))))/);
    if (mentionsDelete && deleteChars.length > 0 && deleteFromMatch) {
      structured.operation = {
        type: "deleteFromPositionToEnd",
        chars: deleteChars,
        startPosition: Number(deleteFromMatch[1]),
      };
    } else if (mentionsDelete && deleteChars.length > 0) {
      structured.operation = { type: "delete", chars: deleteChars };
    }
  }

  if (!structured.operation) {
    const rangeMatches = [...normalizedQuery.matchAll(/(\d{1,2})\s*桁目\s*から\s*(\d{1,2})\s*桁/g)];
    if (rangeMatches.length > 0) {
      structured.operation = {
        type: "range",
        ranges: rangeMatches.map((match) => ({ startPosition: Number(match[1]), characterCount: Number(match[2]) })),
      };
    }
  }

  if (!structured.operation) {
    const fromMatch = normalizedQuery.match(/(\d{1,2})\s*桁目\s*(?:以降|から\s*(?:(?:末尾|最後|全部|すべて|全て)|(?=(?:を)?\s*(?:出力|送信|表示|取り出|切り出))))/);
    if (fromMatch) {
      structured.operation = { type: "fromPositionToEnd", startPosition: Number(fromMatch[1]) };
    }
  }

  if (!structured.operation) {
    const leadingMatch = normalizedQuery.match(/(?:先頭|最初)(?:から)?\s*(\d{1,2})\s*桁/);
    if (leadingMatch && /(出力|送信|表示|取り出|切り出|のみ)/.test(normalizedQuery)) {
      structured.operation = { type: "leading", characterCount: Number(leadingMatch[1]) };
    }
  }

  if (!structured.operation) {
    const mentionsZeroSuppress = ["0サプレス", "0 サプレス", "ゼロサプレス", "ゼロ サプレス", "zero suppress"].some((word) =>
      normalizedQuery.includes(normalizeText(word))
    );
    const mentionsLeadingZeroRemove =
      ["先頭", "頭", "前方"].some((word) => normalizedQuery.includes(normalizeText(word))) &&
      ["0", "ゼロ", "zero"].some((word) => normalizedQuery.includes(normalizeText(word))) &&
      ["削除", "除去", "消す", "消して", "取り除"].some((word) => normalizedQuery.includes(normalizeText(word)));
    if (mentionsZeroSuppress || mentionsLeadingZeroRemove) {
      structured.operation = { type: "zeroSuppress" };
    }
  }

  structured.canonicalQuery = buildCanonicalQueryFromStructuredNlp(structured);
  return structured.operation ? structured : null;
}

function buildCanonicalQueryFromStructuredNlp(structured) {
  const targetText = symbologyTargetsToText(structured.symbologyTargets);
  const lengthText = readLengthsToText(structured.readLengths);
  const scopeText = `${targetText}${lengthText}` || "データ";
  const operation = structured.operation;

  if (operation.type === "delete") {
    return `${scopeText} ${operation.chars.map(characterToRequestToken).join("と")}を削除`;
  }

  if (operation.type === "deleteFromPositionToEnd") {
    return `${scopeText} ${operation.chars.map(characterToRequestToken).join("と")}を削除して${operation.startPosition}桁目以降出力`;
  }

  if (operation.type === "replace") {
    return `${scopeText} ${characterToRequestToken(operation.sourceChar)}を${characterToRequestToken(operation.targetChar)}に置換`;
  }

  if (operation.type === "range") {
    return `${scopeText} ${operation.ranges.map((range) => `${range.startPosition}桁目から${range.characterCount}桁`).join("と")}出力`;
  }

  if (operation.type === "fromPositionToEnd") {
    return `${scopeText} ${operation.startPosition}桁目から出力`;
  }

  if (operation.type === "leading") {
    return `${scopeText} 先頭${operation.characterCount}桁出力`;
  }

  if (operation.type === "zeroSuppress") {
    return `${scopeText} 0サプレス`;
  }

  return structured.original;
}

function characterToRequestToken(char) {
  if (char === " ") return "スペース";
  if (char === "/") return "スラッシュ";
  if (char === ".") return "ピリオド";
  if (char === "-") return "ハイフン";
  if (char === ",") return "カンマ";
  return char;
}

function buildCommandFromStructuredNlp(question) {
  const structured = parseStructuredNlpRequest(question);
  if (!structured) return null;

  const query = structured.canonicalQuery || question;
  const builders = [
    buildReplaceThenRangeCommand,
    buildTrimLeadingZeroesCommand,
    findExactSpaceTransformCommand,
    buildDeleteThenFromPositionToEndCommand,
    findExactDeleteCharacterCommand,
    buildRangeCharactersCommand,
    buildFromPositionToEndCommand,
    buildLeadingCharactersCommand,
  ];

  for (const builder of builders) {
    const command = builder(query);
    if (command) {
      return {
        ...command,
        notes: [
          `NLP解析: ${structured.operation.type} / 対象 ${symbologyTargetsToText(structured.symbologyTargets) || "全コード種"} / 桁数 ${readLengthsToText(structured.readLengths) || "全桁数"}`,
          ...(command.notes || []),
        ],
      };
    }
  }

  return null;
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
  const rangeMatches = [...normalizedQuery.matchAll(/(\d{1,2})\s*桁目\s*から\s*(\d{1,2})\s*桁/g)];
  const structuredStartMatch = normalizedQuery.match(/(?:スタート|開始)\s*桁\s*[:：]?\s*(\d{1,2})\s*桁目?/);
  const structuredCountMatch = normalizedQuery.match(/(?:出力|送信|表示)\s*桁数\s*[:：]?\s*(\d{1,2})\s*桁/);

  if (rangeMatches.length === 0 && structuredStartMatch && structuredCountMatch) {
    rangeMatches.push([
      structuredStartMatch[0],
      structuredStartMatch[1],
      structuredCountMatch[1],
    ]);
  }

  if (rangeMatches.length === 0 || !/(出力|送信|表示|取り出|切り出|のみ)/.test(normalizedQuery)) return null;

  const ranges = rangeMatches.map((match) => ({
    startPosition: Number(match[1]),
    characterCount: Number(match[2]),
  }));

  if (ranges.some((range) =>
    !Number.isInteger(range.startPosition) ||
    !Number.isInteger(range.characterCount) ||
    range.startPosition < 1 ||
    range.startPosition > 99 ||
    range.characterCount < 1 ||
    range.characterCount > 99
  )) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);

  let cursorPosition = 1;
  const commandParts = [];
  const rangeNotes = [];
  for (const range of ranges) {
    const cursorMove = range.startPosition - cursorPosition;
    if (cursorMove < 0 || cursorMove > 99) return null;

    const cursorHex = cursorMove.toString().padStart(2, "0");
    const countHex = range.characterCount.toString().padStart(2, "0");
    commandParts.push(`F5${cursorHex}F2${countHex}00`);
    rangeNotes.push(`${range.startPosition}桁目から${range.characterCount}桁`);
    cursorPosition = range.startPosition + range.characterCount;
  }

  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";
  const editorCommand = commandParts.join("");
  const rangeLabel = rangeNotes.join("と");

  return {
    id: `df-generated-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${commandParts.join("-")}`,
    label: `${codeLabel}・${lengthLabel} ${rangeLabel}を出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの${rangeLabel}を出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      "F2実行後にカーソルが送信した桁数分進むため、2つ目以降のF5は直前の送信後位置からの差分で指定します。",
      `${editorCommand} は ${rangeLabel} を順番に送信する Data Format Editor コマンドです。`,
    ],
  };
}

function buildFromPositionToEndCommand(query) {
  const normalizedQuery = normalizeText(query);
  const match = normalizedQuery.match(/(\d{1,2})\s*桁目\s*(?:以降|から\s*(?:(?:末尾|最後|全部|すべて|全て)|(?=(?:を)?\s*(?:出力|送信|表示|取り出|切り出))))/);

  if (!match || !/(出力|送信|表示|取り出|切り出)/.test(normalizedQuery)) return null;

  const startPosition = Number(match[1]);
  if (!Number.isInteger(startPosition) || startPosition < 1 || startPosition > 99) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const cursorMove = startPosition - 1;
  const cursorHex = cursorMove.toString().padStart(2, "0");
  const editorCommand = `F5${cursorHex}F100`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-from-${cursorHex}-to-end`,
    label: `${codeLabel}・${lengthLabel} ${startPosition}桁目以降を出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの${startPosition}桁目以降を出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `F5${cursorHex} でカーソルを${cursorMove}桁移動し、F100 でそこから末尾まで送信します。`,
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

  const replaceChars = findReplaceCharacters(query);
  const sourceChar = replaceChars?.sourceChar;
  const targetChar = replaceChars?.targetChar;
  if (!sourceChar || !targetChar) return null;

  const sourceHex = sourceChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
  const targetHex = targetChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
  const symbology = getSymbologyTarget(normalizedQuery);
  const codeId = symbology ? symbology.codeId : "99";
  const codeLabel = symbology ? symbology.label : "全コード種";

  return {
    id: `df-generated-replace-${sourceHex}-with-${targetHex}-${codeId}`,
    label: `${codeLabel} ${describeReplaceCharacter(sourceChar)}を${describeReplaceCharacter(targetChar)}に置換`,
    category: "登録例",
    summary: `${codeLabel}を対象に、${describeReplaceCharacter(sourceChar)}を${describeReplaceCharacter(targetChar)}に置き換えて出力します。`,
    keywords: [],
    command: `DFMBK30099${codeId}9999E402${sourceHex}${targetHex}F100.`,
    notes: [
      `0 は Primary Data Format、099 は全端末、${codeId} は${codeLabel}、9999 は全桁数を表す指定です。`,
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
    /([!-~]|スペース|space|空白|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus)\s*を\s*([!-~]|スペース|space|空白|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus)\s*(?:に|へ)?\s*(?:置換|置き換え|置き換えて|変換)/i
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

  let targetText = targetMatch[1]
    .replace(/^(?:.*?時|.*?場合|.*?とき)\s*/i, "")
    .replace(/^(?:.*?読み取りで|.*?読取で|.*?読み取り時に|.*?読取時に)\s*/i, "")
    .replace(/^(?:に|、|,|\s)+/, "")
    .replace(/を$/, "")
    .trim();
  const symbologyNamesForDelete = symbologyCodeTable
    .flatMap((item) => [item.label, ...(item.aliases || [])])
    .map(normalizeText)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  const normalizedTargetText = normalizeText(targetText);
  const leadingSymbology = symbologyNamesForDelete.find((name) => normalizedTargetText.startsWith(name));
  if (leadingSymbology) {
    targetText = targetText.slice(leadingSymbology.length).replace(/^(?:の|で|を|、|,|\s)+/, "").trim();
  }
  const rawTargets = targetText
    .split(/\s*(?:と|、|,|，|\/|\+|&|and)\s*/i)
    .map((value) => value.trim())
    .filter(Boolean);

  return rawTargets.flatMap(normalizeDeleteTargetCharacters).filter(Boolean);
}

function normalizeDeleteTargetCharacters(value) {
  const normalizedChar = normalizeReplaceCharacter(value);
  if (normalizedChar) return [normalizedChar];

  const normalized = normalizeAsciiText(value);
  if (/^[A-Za-z0-9]{2,15}$/.test(normalized)) {
    return [...normalized];
  }

  return [];
}

function normalizeReplaceCharacter(value) {
  const normalized = value.trim();
  const lowered = normalized.toLowerCase();
  if (["スペース", "space", "空白"].includes(lowered)) return " ";
  if (["スラッシュ", "slash"].includes(lowered)) return "/";
  if (["ピリオド", "ドット", "period", "dot"].includes(lowered)) return ".";
  if (["ハイフン", "hyphen", "マイナス", "minus"].includes(lowered)) return "-";
  if (["カンマ", "comma"].includes(lowered)) return ",";
  if (normalized.length === 1 && normalized >= "!" && normalized <= "~") return normalized;
  return null;
}

function describeReplaceCharacter(char) {
  if (char === " ") return "スペース";
  if (char === "/") return "/(スラッシュ)";
  if (char === ".") return ".(ピリオド)";
  if (char === "-") return "-(ハイフン)";
  if (char === ",") return ",(カンマ)";
  return char;
}

function findExactDeleteCharacterCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));
  if (!mentionsDelete) return null;

  const targetChars = findDeleteTargetCharacters(query);
  if (targetChars.length === 0) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const targetHex = targetChars.map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("");
  const suppressCount = targetChars.length.toString().padStart(2, "0");
  const targetLabel = targetChars.map(describeReplaceCharacter).join("と");
  const editorCommand = `FB${suppressCount}${targetHex}F100`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-delete-${targetHex}-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}`,
    label: `${codeLabel}・${lengthLabel} ${targetLabel}を削除`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${targetLabel}を削除して出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `0 は Primary Data Format、099 は全端末、${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `FB は削除コマンド、${suppressCount} は削除キャラクタ数、${targetHex} は削除対象の ${targetLabel} です。`,
      "F100 は削除完了後に全てのデータを送信する指定です。",
    ],
  };
}

function getReadLengthsForSuffixB5(normalizedQuery) {
  const structuredLengths = getReadLengths(normalizedQuery);
  if (structuredLengths.length > 0) return structuredLengths;

  const mentionsLength = ["桁数指定", "桁指定", "桁読み取り", "桁読取"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );
  if (!mentionsLength) return [];

  const matches = [...normalizedQuery.matchAll(/(\d{1,4})\s*桁/g)];
  return [...new Set(matches.map((match) => Number(match[1])).filter((length) => Number.isInteger(length) && length >= 0 && length <= 9999))];
}

function buildSuffixB5Command(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsModifier = ["ctrl", "control", "コントロール", "alt", "shift"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsSuffix = ["末尾", "後ろ", "最後", "サフィックス", "suffix"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsAppend = appendWords.some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!mentionsSuffix || !mentionsAppend) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengthsForSuffixB5(normalizedQuery);
  const key = findB5KeyForAppend(query);
  const modifier = getB5ModifierForAppend(query);
  if (!key && !mentionsModifier) return null;

  const keystrokeCommand = key ? `B501${modifier.hex}${key.hex}` : "B5012040";
  const keystrokeLabel = key ? `${modifier.hex === "00" ? "" : `${modifier.label}+`}${key.key}` : "CTRL";
  const editorCommand = `F100${keystrokeCommand}`;
  const codeLabel = symbologyTargets.map((item) => item.label).join("、");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-suffix-b5-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${keystrokeCommand}`,
    label: `${codeLabel}・${lengthLabel} 末尾に${keystrokeLabel}を付加`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、読み取りデータを出力して末尾に${keystrokeLabel}キーを付加します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `0 は Primary Data Format、099 は全端末、${symbologyTargets.map((item) => `${item.codeId} は ${item.label}`).join("、")} を表す指定です。`,
      lengthNote,
      `F100 は読み取りデータを全て出力し、${keystrokeCommand} は末尾に ${keystrokeLabel} キーを付加する指定です。左右指定がない修飾キーは左優先です。`,
      "B5コマンドはUSB-HID使用時のみ有効です。RS232CやUSB-COMインターフェイス設定では使用できません。",
    ],
  };
}

function buildPrefixB5Command(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsPrefix = ["先頭", "前", "最初", "プリフィックス", "prefix"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsAppend = appendWords.some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!mentionsPrefix || !mentionsAppend) return null;

  const key = findB5KeyForAppend(query);
  if (!key) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengthsForSuffixB5(normalizedQuery);
  const modifier = getB5ModifierForAppend(query);
  const keystrokeCommand = `B501${modifier.hex}${key.hex}`;
  const keystrokeLabel = `${modifier.hex === "00" ? "" : `${modifier.label}+`}${key.key}`;
  const editorCommand = `${keystrokeCommand}F100`;
  const codeLabel = symbologyTargets.map((item) => item.label).join("、");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-prefix-b5-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${keystrokeCommand}`,
    label: `${codeLabel}・${lengthLabel} 先頭に${keystrokeLabel}を付加`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、読み取りデータの先頭に${keystrokeLabel}キーを付加します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `0 は Primary Data Format、099 は全端末、${symbologyTargets.map((item) => `${item.codeId} は ${item.label}`).join("、")} を表す指定です。`,
      lengthNote,
      `${keystrokeCommand} は先頭に ${keystrokeLabel} キーを付加し、F100 はその後に読み取りデータを全て出力する指定です。左右指定がない修飾キーは左優先です。`,
      "B5コマンドはUSB-HID使用時のみ有効です。RS232CやUSB-COMインターフェイス設定では使用できません。",
    ],
  };
}

function buildTrimLeadingZeroesCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsLeading = ["先頭", "頭", "前方"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsZero = ["0", "ゼロ", "zero"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsRemove = ["削除", "除去", "消す", "消して", "取り除"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsOutput = ["出力", "送信", "表示"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsZeroSuppress = ["0サプレス", "0 サプレス", "ゼロサプレス", "ゼロ サプレス", "zero suppress"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!mentionsZeroSuppress && (!mentionsLeading || !mentionsZero || !mentionsRemove || !mentionsOutput)) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const editorCommand = "E630F100";
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-zero-suppress-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}`,
    label: `${codeLabel}・${lengthLabel} 0サプレスして出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータ先頭の連続する0をスキップして出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      "E630 は現在のカーソル位置から 0 以外のキャラクタ手前まで移動する指定です。",
      "F100 は移動後の位置から末尾までを出力します。例: 0000123 は 123 と出力されます。",
    ],
  };
}

function normalizeAsciiText(value) {
  return String(value)
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
}

function stringToAsciiHex(value) {
  return [...value].map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("");
}

function findPrefixText(query) {
  const asciiQuery = normalizeAsciiText(query);
  const patterns = [
    /(?:先頭|データ先頭|プリフィックス|prefix)\s*(?:に|へ)?\s*([A-Za-z0-9]{1,20})\s*(?:を)?\s*(?:付加|追加|つける|付ける|挿入)/i,
    /(?:文字列)\s*([A-Za-z0-9]{1,20})\s*(?:を)?\s*(?:先頭|データ先頭|プリフィックス|prefix).*(?:付加|追加|つける|付ける|挿入)/i,
  ];

  for (const pattern of patterns) {
    const match = asciiQuery.match(pattern);
    if (match) return match[1];
  }

  return "";
}

function buildPrefixTextCommand(query) {
  const normalizedQuery = normalizeText(query);
  const prefixText = findPrefixText(query);
  const mentionsOutput = /(出力|送信|表示|読み取り|読取)/.test(normalizedQuery);
  if (!prefixText || !mentionsOutput) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const textLength = prefixText.length.toString().padStart(4, "0");
  const textHex = stringToAsciiHex(prefixText);
  const editorCommand = `BA${textLength}${textHex}F100`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-prefix-text-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${textHex}`,
    label: `${codeLabel}・${lengthLabel} 先頭に${prefixText}を付加して出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの先頭へ${prefixText}を付加して出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `BA${textLength}${textHex} は ${prefixText} を現在位置、つまりデータ先頭に挿入する指定です。`,
      "F100 は挿入後に読み取りデータを全て出力する指定です。",
    ],
  };
}

function findInsertTextAtPosition(query) {
  const asciiQuery = normalizeAsciiText(query);
  const patterns = [
    /(\d{1,2})\s*桁目\s*(?:に|へ)?\s*([A-Za-z0-9]{1,20})\s*(?:を)?\s*(?:付加|追加|つける|付ける|挿入)/i,
    /(?:文字列)\s*([A-Za-z0-9]{1,20})\s*(?:を)?\s*(\d{1,2})\s*桁目\s*(?:に|へ).*(?:付加|追加|つける|付ける|挿入)/i,
  ];

  for (const pattern of patterns) {
    const match = asciiQuery.match(pattern);
    if (!match) continue;
    if (pattern === patterns[0]) {
      return { position: Number(match[1]), text: match[2] };
    }
    return { position: Number(match[2]), text: match[1] };
  }

  return null;
}

function buildInsertTextAtPositionCommand(query) {
  const normalizedQuery = normalizeText(query);
  const insertion = findInsertTextAtPosition(query);
  const mentionsOutput = /(出力|送信|表示|読み取り|読取)/.test(normalizedQuery);
  if (!insertion || !mentionsOutput) return null;

  const { position, text } = insertion;
  if (!Number.isInteger(position) || position < 2 || position > 99) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const prefixCount = position - 1;
  const prefixCountHex = prefixCount.toString().padStart(2, "0");
  const textLength = text.length.toString().padStart(4, "0");
  const textHex = stringToAsciiHex(text);
  const editorCommand = `F2${prefixCountHex}00BA${textLength}${textHex}F100`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-insert-text-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${position}-${textHex}`,
    label: `${codeLabel}・${lengthLabel} ${position}桁目に${text}を付加して出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの${position}桁目に${text}を付加して出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `F2${prefixCountHex}00 は先頭${prefixCount}桁を出力し、カーソルを${position}桁目へ進める指定です。`,
      `BA${textLength}${textHex} は ${text} を現在位置に挿入する指定です。`,
      "F100 は挿入後に残りの読み取りデータを全て出力する指定です。",
    ],
  };
}

function findDelayCommand(query) {
  const normalizedQuery = normalizeText(query);
  return efDelayTable.find((item) => {
    const command = normalizeText(item.command);
    const delay = normalizeText(item.delay);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(command) || normalizedQuery.includes(delay) || aliases.some((alias) => normalizedQuery.includes(alias));
  }) || null;
}

function findB5KeyForAppend(query) {
  const normalizedQuery = normalizeText(query);
  const functionKeyMatch = normalizedQuery.match(/\bf(1[0-2]|[1-9])\b/);
  if (functionKeyMatch) {
    return b5KeyMapTable.find((item) => normalizeText(item.key) === `f${functionKeyMatch[1]}`) || null;
  }

  const namedKey = b5KeyMapTable.find((item) => {
    const key = normalizeText(item.key);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(key) || aliases.some((alias) => normalizedQuery.includes(alias));
  });
  if (namedKey) return namedKey;

  const letterMatch = normalizedQuery.match(/(?:^|[^a-z0-9])([a-z])(?:キー|key)?(?:を)?(?:付加|追加|つける|付ける|挿入)/);
  if (letterMatch) {
    return b5KeyMapTable.find((item) => normalizeText(item.key) === letterMatch[1]) || null;
  }

  return null;
}

function getB5ModifierForAppend(query) {
  const normalizedQuery = normalizeText(query);
  const hasLeftCtrl = normalizedQuery.includes("左ctrl") || normalizedQuery.includes("left ctrl");
  const hasRightCtrl = normalizedQuery.includes("右ctrl") || normalizedQuery.includes("right ctrl");
  const hasLeftShift = normalizedQuery.includes("左shift") || normalizedQuery.includes("left shift");
  const hasRightShift = normalizedQuery.includes("右shift") || normalizedQuery.includes("right shift");
  const hasLeftAlt = normalizedQuery.includes("左alt") || normalizedQuery.includes("left alt");
  const hasRightAlt = normalizedQuery.includes("右alt") || normalizedQuery.includes("right alt");
  const hasCtrl = hasLeftCtrl || hasRightCtrl || ["ctrl", "control", "コントロール"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const hasShift = hasLeftShift || hasRightShift || normalizedQuery.includes("shift");
  const hasAlt = hasLeftAlt || hasRightAlt || normalizedQuery.includes("alt");

  const ctrl = hasRightCtrl ? "right" : hasCtrl ? "left" : "";
  const shift = hasRightShift ? "right" : hasShift ? "left" : "";
  const alt = hasRightAlt ? "right" : hasAlt ? "left" : "";

  if (!ctrl && !shift && !alt) return b5ModifierTable[0];
  if (ctrl && shift) return b5ModifierTable.find((item) => item.hex === (ctrl === "right" ? (shift === "right" ? "22" : "21") : (shift === "right" ? "12" : "11")));
  if (ctrl && alt) return b5ModifierTable.find((item) => item.hex === (ctrl === "right" ? (alt === "right" ? "28" : "24") : (alt === "right" ? "18" : "14")));
  if (ctrl) return b5ModifierTable.find((item) => item.hex === (ctrl === "right" ? "20" : "10"));
  if (shift) return b5ModifierTable.find((item) => item.hex === (shift === "right" ? "02" : "01"));
  if (alt) return b5ModifierTable.find((item) => item.hex === (alt === "right" ? "08" : "04"));

  return b5ModifierTable[0];
}

function buildSymbologyDelayKeyCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsDelayOrAfter = ["経過後", "後", "待機", "ディレイ", "delay"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsAppend = appendWords.some((word) => normalizedQuery.includes(normalizeText(word)));
  if (!mentionsDelayOrAfter || !mentionsAppend) return null;

  const symbology = getSymbologyTarget(normalizedQuery);
  const delay = findDelayCommand(query);
  const key = findB5KeyForAppend(query);
  const modifier = getB5ModifierForAppend(query);
  if (!symbology || !delay || !key) return null;

  return {
    id: `df-generated-${symbology.codeId}-${delay.command}-${modifier.hex}-${key.hex}`,
    label: `${symbology.label}データ入力の${delay.delay}後に${modifier.hex === "00" ? "" : `${modifier.label}+`}${key.key}を付加`,
    category: "登録例",
    summary: `${symbology.label}を対象に、読み取りデータを出力して${delay.delay}待機した後、${key.key}キーを付加します。`,
    keywords: [],
    command: `DFMBK30099${symbology.codeId}9999F100${delay.command}B501${modifier.hex}${key.hex}.`,
    notes: [
      `0 は Primary Data Format、099 は全端末、${symbology.codeId} は ${symbology.label}、9999 は全桁数を表す指定です。`,
      `F100 は読み取りデータを全て出力し、${delay.command} は ${delay.delay} の待機を挿入する指定です。`,
      `B501${modifier.hex}${key.hex} は ${modifier.hex === "00" ? "" : `${modifier.label}+`}${key.key} キーを付加する指定です。左右指定がない修飾キーは左優先です。EF/B5 はキーボードウェッジ、USB-HID使用時の応用例です。`,
    ],
  };

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

function buildDeleteThenFromPositionToEndCommand(query) {
  const normalizedQuery = normalizeText(query);
  const fromMatch = normalizedQuery.match(/(\d{1,2})\s*桁目\s*(?:以降|から\s*(?:(?:末尾|最後|全部|すべて|全て)|(?=(?:を)?\s*(?:出力|送信|表示|取り出|切り出))))/);
  const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!fromMatch || !mentionsDelete || !/(出力|送信|表示|取り出|切り出|ください)/.test(normalizedQuery)) return null;

  const targetChars = findDeleteTargetCharacters(query);
  const startPosition = Number(fromMatch[1]);
  if (
    targetChars.length === 0 ||
    !Number.isInteger(startPosition) ||
    startPosition < 1 ||
    startPosition > 99
  ) {
    return null;
  }

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const targetHex = targetChars.map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("");
  const suppressCount = targetChars.length.toString().padStart(2, "0");
  const targetLabel = targetChars.map(describeReplaceCharacter).join("と");
  const cursorMove = startPosition - 1;
  const cursorHex = cursorMove.toString().padStart(2, "0");
  const editorCommand = `FB${suppressCount}${targetHex}F7F5${cursorHex}F100`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-delete-${targetHex}-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-from-${cursorHex}-to-end`,
    label: `${codeLabel}・${lengthLabel} ${targetLabel}を削除後 ${startPosition}桁目以降を出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${targetLabel}を削除してから${startPosition}桁目以降を出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocks(symbologyTargets, readLengths, editorCommand)),
    notes: [
      `0 は Primary Data Format、099 は全端末、${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `FB${suppressCount}${targetHex} は ${targetLabel} を削除する指定です。`,
      "F7 は削除後にカーソルを先頭へ戻す指定です。",
      `F5${cursorHex} でカーソルを${cursorMove}桁移動し、F100 でそこから末尾まで送信します。`,
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
  const wantsB5 = ["キーマップ", "キーコード", "keyboard", "キーボード", "キーストローク"].some((word) =>
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

function findB5Modifiers(query) {
  const normalizedQuery = normalizeText(query);
  const wantsModifier = ["ss", "修飾", "modifier", "shift", "alt", "ctrl", "control"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  ) && ["b5", "キーストローク"].some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!wantsModifier) return [];

  const matches = b5ModifierTable.filter((item) => {
    const label = normalizeText(item.label);
    const hex = normalizeText(item.hex);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(label) || normalizedQuery.includes(hex) || aliases.some((alias) => normalizedQuery.includes(alias));
  });

  return matches.length > 0 ? matches : b5ModifierTable;
}

function findEfDelays(query) {
  const normalizedQuery = normalizeText(query);
  const asksForEfReference = ["ef", "ディレイ表", "delay table", "待機時間", "換算", "一覧", "表", "何秒"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!asksForEfReference) return [];

  const matches = efDelayTable.filter((item) => {
    const command = normalizeText(item.command);
    const delay = normalizeText(item.delay);
    const aliases = (item.aliases || []).map(normalizeText);
    return normalizedQuery.includes(command) || normalizedQuery.includes(delay) || aliases.some((alias) => normalizedQuery.includes(alias));
  });

  return matches.length > 0 ? matches : efDelayTable;
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
  copy: buildIcon(["M8 8h10v12H8z", "M6 16H4V4h10v2"]),
};

function iconForCategory(category) {
  if (category === "登録" || category === "登録例") return icons.edit;
  if (category === "エラー音") return icons.sound;
  if (category === "有効化") return icons.connect;
  return icons.scan;
}

function addMessage(role, content, options = {}) {
  if (!content) return;
  if (!messages || !template) return;

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
        <div class="command-title">設定コマンド</div>
        <div class="command-code">
          <span>${escapeHtml(settingCommand)}</span>
          <button
            type="button"
            class="copy-command"
            data-command="${escapeHtml(settingCommand)}"
            title="コマンドをコピー"
            aria-label="コマンドをコピー"
          >${icons.copy}</button>
        </div>
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

function shouldClearSettingsBeforeCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsClear = [
    "設定削除してから",
    "設定削除して",
    "設定を削除してから",
    "設定を削除して",
    "設定消去してから",
    "設定消去して",
    "設定を消去してから",
    "設定を消去して",
    "設定クリアしてから",
    "設定クリアして",
    "設定をクリアしてから",
    "設定をクリアして",
  ].some((word) => normalizedQuery.includes(normalizeText(word)));
  const requestsNewDataFormat = normalizedQuery.includes("データフォーマット") && /(作成|登録|新規)/.test(normalizedQuery);

  return mentionsClear || requestsNewDataFormat;
}

function applyClearSettingsPrefix(item, shouldPrefix) {
  if (!shouldPrefix) return item;

  const command = normalizeSettingCommand(item.command);
  if (command.startsWith("DFMDF3;") || command.startsWith("DFMDF3.")) return item;

  return {
    ...item,
    command: `DFMDF3;${command}`,
    notes: [
      "DFMDF3; を先頭に付加して、現在登録されているデータフォーマット設定を削除してから新しい設定を登録します。",
      ...(item.notes || []),
    ],
  };
}

function getSymbologyLabelById(codeId) {
  return symbologyCodeTable.find((item) => item.codeId.toUpperCase() === codeId.toUpperCase())?.label || `コードID ${codeId}`;
}

function getB5KeyLabelByHex(hex) {
  return b5KeyMapTable.find((item) => item.hex.toUpperCase() === hex.toUpperCase())?.key || `キー番号 ${hex}`;
}

function getB5ModifierLabelByHex(hex) {
  return b5ModifierTable.find((item) => item.hex.toUpperCase() === hex.toUpperCase())?.label || `修飾キー ${hex}`;
}

function isDataFormatCommandText(value) {
  const command = value.trim().toUpperCase();
  return /^DFM(?:BK3|DF3|DF|CL3)|^DFMDF3[.;]?/.test(command);
}

function isEmptyDataFormatCommand(value) {
  return value.trim().replace(/\s+/g, "").toUpperCase() === "DFMBK3.";
}

function describeEditorCommands(commandHex) {
  const descriptions = [];
  let cursorPosition = 1;
  let index = 0;

  while (index < commandHex.length) {
    const code = commandHex.slice(index, index + 2).toUpperCase();

    if (code === "F5" && index + 4 <= commandHex.length) {
      const move = Number(commandHex.slice(index + 2, index + 4));
      cursorPosition += move;
      descriptions.push(`F5${commandHex.slice(index + 2, index + 4)}: カーソルを${move}桁進め、${cursorPosition}桁目の手前へ移動します。`);
      index += 4;
      continue;
    }

    if (code === "F2" && index + 6 <= commandHex.length) {
      const count = Number(commandHex.slice(index + 2, index + 4));
      const insertHex = commandHex.slice(index + 4, index + 6).toUpperCase();
      descriptions.push(`F2${commandHex.slice(index + 2, index + 6)}: 現在位置から${count}桁を出力します${insertHex === "00" ? "" : `。最後に ${insertHex} を追加します`}`);
      cursorPosition += count;
      index += 6;
      continue;
    }

    if (code === "F1" && index + 4 <= commandHex.length) {
      const insertHex = commandHex.slice(index + 2, index + 4).toUpperCase();
      descriptions.push(`F1${insertHex}: 現在位置から末尾までを出力します${insertHex === "00" ? "" : `。最後に ${insertHex} を追加します`}`);
      index += 4;
      continue;
    }

    if (code === "E6" && index + 4 <= commandHex.length) {
      const targetHex = commandHex.slice(index + 2, index + 4).toUpperCase();
      const targetText = targetHex === "30" ? "0" : targetHex;
      descriptions.push(`E6${targetHex}: 現在位置から ${targetText} 以外のキャラクタ手前まで移動します。`);
      index += 4;
      continue;
    }

    if (code === "EF" && index + 6 <= commandHex.length) {
      const efCommand = commandHex.slice(index, index + 6).toUpperCase();
      const delay = efDelayTable.find((item) => item.command === efCommand)?.delay || `${Number(commandHex.slice(index + 2, index + 6)) * 5}ms`;
      descriptions.push(`${efCommand}: ${delay}待機します。`);
      index += 6;
      continue;
    }

    if (code === "B5" && index + 8 <= commandHex.length) {
      const keyCount = Number(commandHex.slice(index + 2, index + 4));
      const parts = [];
      let offset = index + 4;
      for (let keyIndex = 0; keyIndex < keyCount && offset + 4 <= commandHex.length; keyIndex += 1) {
        const modifierHex = commandHex.slice(offset, offset + 2).toUpperCase();
        const keyHex = commandHex.slice(offset + 2, offset + 4).toUpperCase();
        const modifierLabel = getB5ModifierLabelByHex(modifierHex);
        const keyLabel = getB5KeyLabelByHex(keyHex);
        parts.push(`${modifierHex === "00" ? "" : `${modifierLabel}+`}${keyLabel}`);
        offset += 4;
      }
      descriptions.push(`B5${commandHex.slice(index + 2, offset)}: ${parts.join("、")} をキーストロークとして付加します。`);
      index = offset;
      continue;
    }

    if (code === "E4" && index + 4 <= commandHex.length) {
      const count = Number(commandHex.slice(index + 2, index + 4));
      const length = 4 + count * 4;
      descriptions.push(`${commandHex.slice(index, index + length)}: ${count}種類のキャラクタを置換します。`);
      index += length;
      continue;
    }

    if (code === "BA" && index + 6 <= commandHex.length) {
      const count = Number(commandHex.slice(index + 2, index + 6));
      const hexStart = index + 6;
      const hexEnd = hexStart + count * 2;
      const textHex = commandHex.slice(hexStart, hexEnd).toUpperCase();
      const text = textHex.match(/.{2}/g)?.map((hex) => String.fromCharCode(parseInt(hex, 16))).join("") || textHex;
      descriptions.push(`BA${commandHex.slice(index + 2, hexEnd)}: 現在位置に文字列 ${text} を挿入します。`);
      index = hexEnd;
      continue;
    }

    if (code === "FB" && index + 4 <= commandHex.length) {
      const count = Number(commandHex.slice(index + 2, index + 4));
      const length = 4 + count * 2;
      descriptions.push(`${commandHex.slice(index, index + length)}: ${count}種類のキャラクタを無効化します。`);
      index += length;
      continue;
    }

    descriptions.push(`${code}: 未対応または解析できない編集コマンドです。`);
    index += 2;
  }

  return descriptions;
}

function explainDataFormatCommandToHtml(rawCommand) {
  const command = normalizeSettingCommand(rawCommand).replace(/\s+/g, "").toUpperCase();
  const withoutClear = command.startsWith("DFMDF3;") ? command.slice("DFMDF3;".length) : command;
  if (!withoutClear.startsWith("DFMBK3")) return "";

  const fragments = withoutClear.replace(/\.$/, "").split("|");
  const conditionHtml = fragments.map((fragment, index) => {
    const body = index === 0 ? fragment.slice("DFMBK3".length) : fragment;
    if (body.length < 10) return `<p>条件 ${index + 1}: 条件ブロックの長さが不足しています。</p>`;

    const formatNumber = body.slice(0, 1);
    const terminalId = body.slice(1, 4);
    const codeId = body.slice(4, 6);
    const lengthField = body.slice(6, 10);
    const editorCommand = body.slice(10);
    const symbologyLabel = getSymbologyLabelById(codeId);
    const lengthLabel = lengthField === "9999" ? "全桁数" : `${Number(lengthField)}桁`;
    const editorDescriptions = describeEditorCommands(editorCommand);

    return `
      <div class="df-explain-condition">
        <strong>条件 ${index + 1}</strong>
        <ul>
          <li>形式: ${escapeHtml(formatNumber === "0" ? "Primary Data Format" : `Format ${formatNumber}`)}</li>
          <li>端末ID: ${escapeHtml(terminalId === "099" ? "全端末" : terminalId)}</li>
          <li>コード種: ${escapeHtml(codeId)} / ${escapeHtml(symbologyLabel)}</li>
          <li>桁数: ${escapeHtml(lengthField)} / ${escapeHtml(lengthLabel)}</li>
          <li>編集コマンド: ${escapeHtml(editorCommand)}</li>
        </ul>
        <ol>${editorDescriptions.map((description) => `<li>${escapeHtml(description)}</li>`).join("")}</ol>
      </div>
    `;
  }).join("");

  return `
    <div class="command-card">
      <div>
        <div class="command-title">設定コマンドの内容</div>
        <div class="command-code"><span>${escapeHtml(command)}</span></div>
      </div>
      ${command.startsWith("DFMDF3;") ? "<p>先頭の DFMDF3; により、現在のデータフォーマット設定を削除してから登録します。</p>" : ""}
      ${conditionHtml}
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
        <p>B5コマンドでキー付加する時のキーストローク番号です。</p>
        <p>B5コマンドはUSB-HID使用時のみ有効です。RS232CやUSB-COMインターフェイス設定では使用できません。</p>
      </div>
      <div class="function-code-table">${rows}</div>
    </div>
  `;
}

function b5ModifiersToHtml(items) {
  const rows = items
    .map(
      (item) => `
        <div class="function-code-row">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.hex)}</span>
        </div>
      `
    )
    .join("");

  return `
    <div class="command-card">
      <div>
        <div class="command-title">B5修飾キー ss 表</div>
        <p>B501ssnn の ss に指定する修飾キー値です。左右指定がない場合は左優先です。</p>
      </div>
      <div class="function-code-table">${rows}</div>
    </div>
  `;
}

function efDelaysToHtml(items) {
  const rows = items
    .map(
      (item) => `
        <div class="function-code-row">
          <strong>${escapeHtml(item.command)}</strong>
          <span>${escapeHtml(item.delay)}</span>
        </div>
      `
    )
    .join("");

  return `
    <div class="command-card">
      <div>
        <div class="command-title">EFディレイ表</div>
        <p>EFコマンドは5ms単位で待機時間を挿入します。</p>
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
        window.requestAnimationFrame(() => {
          const messageScroller = canvas.closest(".messages");
          if (messageScroller && messageScroller.scrollHeight > messageScroller.clientHeight + 2) {
            const scrollerRect = messageScroller.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();
            const canvasTop = canvasRect.top - scrollerRect.top + messageScroller.scrollTop;
            const centeredTop = canvasTop - (messageScroller.clientHeight - canvas.offsetHeight) / 2;
            messageScroller.scrollTo({
              top: Math.max(0, centeredTop),
              behavior: "smooth",
            });
            return;
          }

          canvas.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
        });
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
  if (isEmptyDataFormatCommand(question)) {
    addMessage("bot", "現在はデータフォーマット設定されていません。");
    return;
  }

  if (isDataFormatCommandText(question)) {
    const explanationHtml = explainDataFormatCommandToHtml(question);
    addMessage("bot", explanationHtml || barcodeUnavailableHtml, { html: true });
    return;
  }

  const shouldClearSettings = shouldClearSettingsBeforeCommand(question);
  const commandHtml = (item) => commandToHtml(applyClearSettingsPrefix(item, shouldClearSettings));
  const structuredNlpCommand = buildCommandFromStructuredNlp(question);
  const replaceThenRangeCommand = buildReplaceThenRangeCommand(question);
  const trimLeadingZeroesCommand = buildTrimLeadingZeroesCommand(question);
  const insertTextAtPositionCommand = buildInsertTextAtPositionCommand(question);
  const prefixB5Command = buildPrefixB5Command(question);
  const prefixTextCommand = buildPrefixTextCommand(question);
  const suffixB5Command = buildSuffixB5Command(question);
  const symbologyDelayKeyCommand = buildSymbologyDelayKeyCommand(question);
  const exactTransformCommand = findExactTransformCommand(question) || findExactSpaceTransformCommand(question);
  const deleteThenRangeCommand = buildDeleteThenRangeCommand(question);
  const deleteThenFromPositionToEndCommand = buildDeleteThenFromPositionToEndCommand(question);
  const exactDeleteCommand = findExactDeleteCharacterCommand(question);
  const generatedRangeCommand = buildRangeCharactersCommand(question);
  const fromPositionToEndCommand = buildFromPositionToEndCommand(question);
  const generatedLeadingCommand = buildLeadingCharactersCommand(question);
  const efDelayMatches = findEfDelays(question);
  const b5ModifierMatches = findB5Modifiers(question);
  const b5KeyMatches = findB5Keys(question);
  const matches = findMatches(question);

  if (structuredNlpCommand) {
    addMessage("bot", commandHtml(structuredNlpCommand), { html: true });
    return;
  }

  if (replaceThenRangeCommand) {
    addMessage("bot", commandHtml(replaceThenRangeCommand), { html: true });
    return;
  }

  if (trimLeadingZeroesCommand) {
    addMessage("bot", commandHtml(trimLeadingZeroesCommand), { html: true });
    return;
  }

  if (insertTextAtPositionCommand) {
    addMessage("bot", commandHtml(insertTextAtPositionCommand), { html: true });
    return;
  }

  if (prefixB5Command) {
    addMessage("bot", commandHtml(prefixB5Command), { html: true });
    return;
  }

  if (prefixTextCommand) {
    addMessage("bot", commandHtml(prefixTextCommand), { html: true });
    return;
  }

  if (deleteThenRangeCommand) {
    addMessage("bot", commandHtml(deleteThenRangeCommand), { html: true });
    return;
  }

  if (deleteThenFromPositionToEndCommand) {
    addMessage("bot", commandHtml(deleteThenFromPositionToEndCommand), { html: true });
    return;
  }

  if (symbologyDelayKeyCommand) {
    addMessage("bot", commandHtml(symbologyDelayKeyCommand), { html: true });
    return;
  }

  if (suffixB5Command) {
    addMessage("bot", commandHtml(suffixB5Command), { html: true });
    return;
  }

  if (exactTransformCommand) {
    addMessage("bot", commandHtml(exactTransformCommand), { html: true });
    return;
  }

  if (exactDeleteCommand) {
    addMessage("bot", commandHtml(exactDeleteCommand), { html: true });
    return;
  }

  if (generatedRangeCommand) {
    addMessage("bot", commandHtml(generatedRangeCommand), { html: true });
    return;
  }

  if (fromPositionToEndCommand) {
    addMessage("bot", commandHtml(fromPositionToEndCommand), { html: true });
    return;
  }

  if (generatedLeadingCommand) {
    addMessage("bot", commandHtml(generatedLeadingCommand), { html: true });
    return;
  }

  if (efDelayMatches.length > 0) {
    addMessage("bot", efDelaysToHtml(efDelayMatches), { html: true });
    return;
  }

  if (b5ModifierMatches.length > 0) {
    addMessage("bot", b5ModifiersToHtml(b5ModifierMatches), { html: true });
    return;
  }

  if (b5KeyMatches.length > 0) {
    addMessage("bot", b5KeysToHtml(b5KeyMatches), { html: true });
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

  addMessage("bot", matches.map(commandHtml).join(""), { html: true });
}

function submitQuestion(question) {
  const trimmed = question.trim();
  if (!trimmed) return;

  addMessage("user", trimmed);
  if (input) input.value = "";
  window.setTimeout(() => answerQuestion(trimmed), 180);
}

function submitCommandItem(item) {
  addMessage("user", item.label);
  if (input) input.value = "";
  window.setTimeout(() => addMessage("bot", commandToHtml(item), { html: true }), 180);
}

function openPdf(path) {
  window.open(path, "_blank", "noopener");
}

function renderQuickActions() {
  if (!quickActions) return;

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

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  submitQuestion(input?.value || "");
});

messages?.addEventListener("click", async (event) => {
  const button = event.target.closest(".copy-command");
  if (!button) return;

  const command = button.dataset.command;
  const copied = await copyToClipboard(command);
  button.title = copied ? "コピーしました" : "コピーできませんでした";
  window.setTimeout(() => {
    button.title = "コマンドをコピー";
  }, 1200);
});

clearButton?.addEventListener("click", () => {
  if (messages) messages.textContent = "";
  input?.focus();
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

if (document.body.classList.contains("mobile-page")) {
  window.setTimeout(() => {
    input?.focus({ preventScroll: true });
  }, 250);
}

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
