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
    label: "GS/FNC1コードをスペースに置換",
    category: "登録例",
    summary: "GS1-128とGS1 DataMatrixを対象に、GS/FNC1コードをスペースに置き換えて出力します。",
    requestText: "GS1-128とGS1 DataMatrixのFNC1をスペース文字に置き換え",
    keywords: ["gs", "gsコード", "gsキャラクター", "fnc1", "fnc 1", "group separator", "グループセパレータ", "gs1-128", "gs1 128", "gs1 datamatrix", "gs-1datamatrix", "gs1 data matrix", "スペース", "space", "置換", "置き換え", "変換", "e4", "1d", "20", "全コード", "全桁"],
    command: "DFMBK30099499999E4021D20F100|0099779999E4021D20F100.",
    notes: ["0 は Primary Data Format、099 は全端末、49 は GS1-128、77 は Data Matrix、9999 は全桁数を表す指定です。", "GS1-128やGS1 DataMatrixの可変長AI区切りで使われるFNC1は、出力データ上では GSキャラクタ(1D) として扱います。", "E4 は置換コマンド、02 は置換キャラクタ数、1D は置換前の GS/FNC1、20 は置換後のスペースです。", "F100 は置換完了後に全てのデータを送信する指定です。"],
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
    id: "df-example-qr-remove-space-first-140",
    label: "QR読み取り時、スペース削除して先頭から140桁出力",
    category: "登録例",
    summary: "QRを対象に、スペースを削除してから先頭140桁を出力します。",
    requestText: "QR読み取り時、スペース削除して先頭から140桁出力",
    keywords: ["qr", "qrコード", "スペース", "space", "削除", "先頭140桁", "140桁", "fb0120", "f29900", "f24100"],
    command: "DFMBK30099739999FB0120F7F29900F24100.",
    notes: ["0 は Primary Data Format、099 は全端末、73 は QR、9999 は全桁数を表す指定です。", "FB0120 はスペースを削除する指定です。", "F7 で削除後にカーソルを先頭へ戻し、F29900 と F24100 で99桁+41桁、合計140桁を出力します。"],
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
  { code: "BS", hex: "08", aliases: ["backspace", "バックスペース"] },
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
  { code: "ESC", hex: "1B", aliases: ["escape", "エスケープ"] },
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
  { key: "半/全", hex: "01", aliases: ["半角全角", "半角/全角", "半角全角キー", "半角/全角キー", "半全", "hankaku", "zenkaku", "hankaku/zenkaku"] },
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
  { key: "ESC", hex: "6E", aliases: ["escape", "エスケープ", "エスケープキー"] },
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
  { codeId: "77", label: "Data Matrix", aliases: ["data matrix", "datamatrix", "データマトリックス", "gs1 datamatrix", "gs-1datamatrix", "gs1 data matrix", "gs-1 data matrix"] },
  { codeId: "78", label: "MaxiCode", aliases: ["maxicode", "maxi code"] },
  { codeId: "72", label: "PDF417", aliases: ["pdf417", "pdf 417"] },
  { codeId: "52", label: "Micro PDF417", aliases: ["micro pdf417", "micro pdf 417"] },
  { codeId: "73", label: "QRコード", aliases: ["qr", "qrコード", "qr code", "qrcode", "microqr", "micro qr", "micro qr code"] },
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
const prefixWords = ["先頭", "前", "最初", "プリフィックス", "プレフィックス", "prefix"];
const suffixWords = ["末尾", "後ろ", "最後", "サフィックス", "suffix"];
const settingAppendWords = [...appendWords, "設定"];

const messages = document.querySelector("#messages");
const form = document.querySelector("#chatForm");
const input = document.querySelector("#messageInput");
const sendButton = document.querySelector(".send-button");
const clearButton = document.querySelector("#clearButton");
const quickActions = document.querySelector("#quickActions");
const categoryList = document.querySelector("#categoryList");
const template = document.querySelector("#messageTemplate");
const samplePrompts = document.querySelectorAll ? document.querySelectorAll(".sample-prompt") : [];
const scannerMark = document.querySelector(".scanner-mark");
let adminClickCount = 0;
let adminClickTimer = 0;
let pendingClarification = null;
let isAnswering = false;

function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/プレフィックス/g, "プリフィックス")
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
    if (/^[a-z0-9]$/i.test(normalizedKeyword)) return;
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

function findExactAdminCommandMatches(query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const exactMatches = adminCommandCatalog.filter((item) => {
    const requestText = normalizeText(item.requestText || "");
    const label = normalizeText(item.label || "");
    return normalizedQuery === requestText || normalizedQuery === label;
  });
  if (exactMatches.length > 0) return exactMatches;

  const relaxedQuery = normalizeAdminCommandMatchText(query);
  if (!relaxedQuery) return [];

  return adminCommandCatalog.filter((item) =>
    getAdminCommandMatchTexts(item).some((text) => normalizeAdminCommandMatchText(text) === relaxedQuery)
  );
}

function getAdminCommandMatchTexts(item) {
  return [...new Set([item.requestText || "", item.label || ""].filter(Boolean))];
}

function normalizeAdminCommandMatchText(value) {
  let text = normalizeText(value)
    .replace(/[\s、。，,.・･／\/:：;；!！?？()（）「」『』【】［］\[\]{}｛｝"'“”‘’`]+/g, "")
    .replace(/読取/g, "読み取り")
    .replace(/追加|付ける|つける/g, "付加")
    .replace(/除去|消して|消す/g, "削除")
    .replace(/送信|表示/g, "出力");

  let previous = "";
  while (text && text !== previous) {
    previous = text;
    text = text
      .replace(/(?:の)?(?:設定|登録|作成)(?:してください|して下さい|して|お願いします|お願い)?$/g, "")
      .replace(/(?:してください|して下さい|お願いします|お願い|ください|下さい|です|の場合|場合)$/g, "");
  }

  return text;
}

function getSymbologyTarget(normalizedQuery) {
  const targets = getSymbologyTargets(normalizedQuery);
  return targets[0]?.codeId === "99" ? null : targets[0];
}

function matchesExplicitSymbologyCodeId(normalizedQuery, codeId) {
  const id = escapeRegExp(normalizeText(codeId));
  return new RegExp(`(?:コード\\s*(?:種)?\\s*id|シンボル\\s*id|symbology\\s*id|code\\s*id)\\s*(?:指定|は|=|:|：)?\\s*${id}(?=$|[^a-z0-9])`, "i").test(normalizedQuery);
}

function matchesSymbologyTerm(normalizedQuery, item) {
  if (matchesExplicitSymbologyCodeId(normalizedQuery, item.codeId)) return true;

  const terms = [item.label, ...(item.aliases || [])]
    .map(normalizeText)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  return terms.some((term) => {
    if (/^[a-z0-9][a-z0-9 -]*$/i.test(term)) {
      return new RegExp(`(^|[^a-z0-9])${escapeRegExp(term)}(?=$|[^a-z0-9]|\\d{1,4}\\s*桁)`, "i").test(normalizedQuery);
    }
    return normalizedQuery.includes(term);
  });
}

function getSymbologyTargets(normalizedQuery) {
  const targets = symbologyCodeTable.filter((item) => {
    if (item.codeId === "99") return false;
    return matchesSymbologyTerm(normalizedQuery, item);
  });

  if (targets.length <= 1) return targets.length > 0 ? targets : [symbologyCodeTable[0]];

  const reducedTargets = targets.filter((target) => {
    const targetTerms = [target.label, ...(target.aliases || [])].map(normalizeText).filter(Boolean);
    return !targets.some((other) => {
      if (other === target) return false;
      const otherTerms = [other.label, ...(other.aliases || [])].map(normalizeText).filter(Boolean);
      return otherTerms.some((otherTerm) => targetTerms.some((targetTerm) => otherTerm.length > targetTerm.length && otherTerm.includes(targetTerm)));
    });
  });

  return reducedTargets.length > 0 ? reducedTargets : targets;
}

function getSymbologyTargetLegacy(normalizedQuery) {
  return symbologyCodeTable.find((item) => {
    const label = normalizeText(item.label);
    const aliases = (item.aliases || []).map(normalizeText);
    return matchesExplicitSymbologyCodeId(normalizedQuery, item.codeId) || normalizedQuery.includes(label) || aliases.some((alias) => normalizedQuery.includes(alias));
  }) || null;
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
    const inlineLengthPattern = new RegExp(`${escapeRegExp(symbologyName)}\\s*(?:の|で|を|:|：)?\\s*(\\d{1,4})\\s*桁(?!目)\\s*(?:読み取り|読取|バーコード|コード)?`, "g");
    while ((match = inlineLengthPattern.exec(normalizedQuery)) !== null) {
      lengths.push(Number(match[1]));
    }
  }

  const explicitLengthPatterns = [
    /(?:桁数|読取桁数|読み取り桁数|長さ|length)\s*(?:指定|条件)?\s*[:：]?\s*(\d{1,4})\s*桁/g,
    /(\d{1,4})\s*桁\s*(?:指定|の指定|条件)/g,
  ];
  for (const pattern of explicitLengthPatterns) {
    while ((match = pattern.exec(normalizedQuery)) !== null) {
      lengths.push(Number(match[1]));
    }
  }

  return [...new Set(lengths.filter((length) => Number.isInteger(length) && length >= 0 && length <= 9999))];
}

function getSymbologyLengthPairs(normalizedQuery) {
  const names = symbologyCodeTable
    .filter((item) => item.codeId !== "99")
    .flatMap((item) => [item.label, item.codeId, ...(item.aliases || [])].map((name) => ({
      target: item,
      name: normalizeText(name),
    })))
    .filter((entry) => entry.name)
    .sort((a, b) => b.name.length - a.name.length);
  const pairs = [];

  names.forEach((entry) => {
    const pattern = new RegExp(`${escapeRegExp(entry.name)}\\s*(?:の|で|を|:|：)?\\s*(\\d{1,4})\\s*桁(?!目)`, "g");
    let match;
    while ((match = pattern.exec(normalizedQuery)) !== null) {
      if (/^[a-z0-9][a-z0-9 -]*$/i.test(entry.name)) {
        const before = normalizedQuery[match.index - 1] || "";
        const after = normalizedQuery[match.index + entry.name.length] || "";
        if (/[a-z0-9]/i.test(before) || /[a-z0-9]/i.test(after)) continue;
      }
      const length = Number(match[1]);
      if (!Number.isInteger(length) || length < 0 || length > 9999) continue;
      pairs.push({
        index: match.index,
        target: entry.target,
        length,
      });
    }
  });

  const uniquePairs = [];
  const seen = new Set();
  pairs
    .sort((a, b) => a.index - b.index || b.target.label.length - a.target.label.length)
    .forEach((pair) => {
      const key = `${pair.index}-${pair.target.codeId}-${pair.length}`;
      if (seen.has(key)) return;
      seen.add(key);
      uniquePairs.push(pair);
    });

  return uniquePairs.map((pair) => ({ target: pair.target, length: pair.length }));
}

function buildTargetBlocks(symbologyTargets, readLengths, editorCommand) {
  const lengthFields = readLengths.length > 0 ? readLengths.map((length) => String(length).padStart(4, "0")) : ["9999"];
  return symbologyTargets.flatMap((target) =>
    lengthFields.map((lengthField) => `0099${target.codeId}${lengthField}${editorCommand}`)
  );
}

function buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand) {
  const pairs = getSymbologyLengthPairs(normalizedQuery);
  if (pairs.length < 2) return buildTargetBlocks(symbologyTargets, readLengths, editorCommand);

  return pairs.map((pair) => `0099${pair.target.codeId}${String(pair.length).padStart(4, "0")}${editorCommand}`);
}

function buildDataFormatCommandFromIntentConditions(query, editorCommand) {
  const conditions = buildTargetConditions(normalizeText(query));
  const blocks = conditions.map((condition) => `0099${condition.codeId}${condition.lengthField}${editorCommand}`);
  return buildDataFormatCommandFromBlocks(blocks);
}

function findSymbologyClauseStarts(normalizedQuery) {
  const names = symbologyCodeTable
    .filter((item) => item.codeId !== "99")
    .flatMap((item) => [item.label, ...(item.aliases || [])].map((name) => ({
      target: item,
      name: normalizeText(name),
    })))
    .filter((entry) => entry.name)
    .sort((a, b) => b.name.length - a.name.length);
  const starts = [];

  names.forEach((entry) => {
    const pattern = new RegExp(escapeRegExp(entry.name), "g");
    let match;
    while ((match = pattern.exec(normalizedQuery)) !== null) {
      starts.push({ index: match.index, length: entry.name.length, target: entry.target });
    }
  });

  const byIndex = new Map();
  starts.forEach((start) => {
    const existing = byIndex.get(start.index);
    if (!existing || start.length > existing.length) byIndex.set(start.index, start);
  });

  return [...byIndex.values()].sort((a, b) => a.index - b.index);
}

function splitIntoSymbologyClauses(query) {
  const normalizedQuery = normalizeText(query);
  const starts = findSymbologyClauseStarts(normalizedQuery);
  if (starts.length < 2) return [];

  return starts
    .map((start, index) => {
      const end = starts[index + 1]?.index ?? query.length;
      return query.slice(start.index, end).replace(/^[、,\s]+|[、,\s]+$/g, "").trim();
    })
    .filter(Boolean);
}

function splitIntoLengthConditionClauses(query) {
  const normalizedQuery = normalizeText(query);
  const starts = [];
  const pattern = /(?<!\d)\d{1,4}\s*桁\s*(?:読み取り|読取)/g;
  let match;

  while ((match = pattern.exec(normalizedQuery)) !== null) {
    starts.push({ index: match.index });
  }

  if (starts.length < 2) return [];

  return starts
    .map((start, index) => {
      const end = starts[index + 1]?.index ?? query.length;
      return query.slice(start.index, end).replace(/^[、,\s]+|[、,\s]+$/g, "").trim();
    })
    .filter(Boolean);
}

function extractDataFormatBlocks(command) {
  const normalizedCommand = normalizeSettingCommand(command);
  const commandBody = normalizedCommand.startsWith("DFMBK3")
    ? normalizedCommand.slice("DFMBK3".length, -1)
    : normalizedCommand.replace(/\.$/, "");
  return commandBody.split("|").filter(Boolean);
}

function buildSingleClauseCommand(clause) {
  const builders = [
    buildReplaceThenRangeCommand,
    buildReplaceThenDeleteCommand,
    buildTrimLeadingZeroesCommand,
    buildRemoveTrailingCharactersCommand,
    findExactSpaceTransformCommand,
    buildDeleteThenLeadingCommand,
    buildDeleteThenFromPositionToEndCommand,
    findExactDeleteCharacterCommand,
    buildUntilCharacterCommand,
    buildPrefixValueFilterCommand,
    buildRangeCharactersCommand,
    buildFromPositionToEndCommand,
    buildLeadingCharactersCommand,
    buildSegmentedSendInsertCommand,
    buildRepeatedSuffixControlInsertCommand,
    buildMultiPositionControlInsertCommand,
    buildInsertTextAtPositionCommand,
    buildPrefixTextCommand,
    buildSuffixTextCommand,
    buildPrefixSuffixB5Command,
    buildPrefixB5Command,
    buildSuffixB5Command,
    buildSymbologyDelayKeyCommand,
  ];

  for (const builder of builders) {
    const item = builder(clause);
    if (item) return item;
  }

  return null;
}

function buildMultiClauseCommand(query) {
  const clauses = splitIntoSymbologyClauses(query);
  const lengthClauses = clauses.length >= 2 ? [] : splitIntoLengthConditionClauses(query);
  const effectiveClauses = clauses.length >= 2 ? clauses : lengthClauses;
  if (effectiveClauses.length < 2) return null;

  const items = effectiveClauses.map(buildSingleClauseCommand);
  if (items.some((item) => !item)) return null;

  const blocks = items.flatMap((item) => extractDataFormatBlocks(item.command));
  if (blocks.length < 2) return null;

  return {
    id: `df-generated-multi-clause-${blocks.length}`,
    label: "複数条件のデータフォーマット",
    category: "登録例",
    summary: effectiveClauses.join(" / "),
    keywords: [],
    command: buildDataFormatCommandFromBlocks(blocks),
    skipGenerationValidation: true,
    notes: [
      "句読点で区切られたコード種ごとの依頼を、それぞれ別条件ブロックとして生成しました。",
      ...items.flatMap((item) => item.notes || []),
    ],
  };
}

function buildTargetConditions(normalizedQuery) {
  const pairedConditions = getSymbologyLengthPairs(normalizedQuery);
  if (pairedConditions.length >= 2) {
    return pairedConditions.map((pair) => ({
      codeId: pair.target.codeId,
      label: pair.target.label,
      length: pair.length,
      lengthField: String(pair.length).padStart(4, "0"),
      source: "paired",
    }));
  }

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const lengths = readLengths.length > 0 ? readLengths : [9999];
  return symbologyTargets.flatMap((target) =>
    lengths.map((length) => ({
      codeId: target.codeId,
      label: target.label,
      length,
      lengthField: String(length).padStart(4, "0"),
      source: readLengths.length > 0 ? "explicit" : "default",
    }))
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

  const replacePairs = findReplaceCharacterPairs(query);
  const replaceChars = replacePairs[0] || null;
  if (replaceChars) {
    structured.operation = {
      type: "replace",
      sourceChar: replaceChars.sourceChar,
      targetChar: replaceChars.targetChar,
      replacements: replacePairs,
    };
  } else {
    const trailingDeleteCount = findTrailingDeleteCount(normalizedQuery);
    if (trailingDeleteCount) {
      structured.operation = {
        type: "removeTrailing",
        characterCount: trailingDeleteCount,
      };
    }
  }

  if (!structured.operation) {
    const deleteChars = findDeleteTargetCharacters(query);
    const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));
    const deleteFromMatch = normalizedQuery.match(/(?<!\d)(\d{1,4})\s*桁目\s*(?:以降|から\s*(?:(?:末尾|最後|全部|すべて|全て)|(?=(?:を)?\s*(?:出力|送信|表示|取り出|切り出))))/);
    const deleteLeadingMatch = normalizedQuery.match(/(?:先頭|最初)(?:から)?\s*(\d{1,4})\s*桁/);
    if (mentionsDelete && deleteChars.length > 0 && deleteFromMatch) {
      structured.operation = {
        type: "deleteFromPositionToEnd",
        chars: deleteChars,
        startPosition: Number(deleteFromMatch[1]),
      };
    } else if (mentionsDelete && deleteChars.length > 0 && deleteLeadingMatch && /(出力|送信|表示|取り出|切り出|のみ)/.test(normalizedQuery)) {
      structured.operation = {
        type: "deleteLeading",
        chars: deleteChars,
        characterCount: Number(deleteLeadingMatch[1]),
      };
    } else if (mentionsDelete && deleteChars.length > 0) {
      structured.operation = { type: "delete", chars: deleteChars };
    }
  }

  if (!structured.operation) {
    const rangeMatches = [...normalizedQuery.matchAll(/(?<!\d)(\d{1,4})\s*桁目\s*から\s*(\d{1,2})\s*桁/g)];
    if (rangeMatches.length > 0) {
      structured.operation = {
        type: "range",
        ranges: rangeMatches.map((match) => ({ startPosition: Number(match[1]), characterCount: Number(match[2]) })),
      };
    }
  }

  if (!structured.operation) {
    const fromMatch = normalizedQuery.match(/(?<!\d)(\d{1,4})\s*桁目\s*(?:以降|から\s*(?:(?:末尾|最後|全部|すべて|全て)|(?=(?:を)?\s*(?:出力|送信|表示|取り出|切り出))))/);
    if (fromMatch) {
      structured.operation = { type: "fromPositionToEnd", startPosition: Number(fromMatch[1]) };
    }
  }

  if (!structured.operation) {
    const leadingMatch = normalizedQuery.match(/(?:先頭|最初)(?:から)?\s*(\d{1,4})\s*桁/);
    if (leadingMatch && /(出力|送信|表示|取り出|切り出|のみ)/.test(normalizedQuery)) {
      structured.operation = { type: "leading", characterCount: Number(leadingMatch[1]) };
    }
  }

  if (!structured.operation) {
    const mentionsZeroSuppress = ["0サプレス", "0 サプレス", "ゼロサプレス", "ゼロ サプレス", "zero suppress"].some((word) =>
      normalizedQuery.includes(normalizeText(word))
    );
    const mentionsStandaloneZero = /(^|[^\d])0($|[^\d])/.test(normalizedQuery) || ["ゼロ", "zero"].some((word) => normalizedQuery.includes(normalizeText(word)));
    const mentionsLeadingZeroRemove =
      ["先頭", "頭", "前方"].some((word) => normalizedQuery.includes(normalizeText(word))) &&
      mentionsStandaloneZero &&
      ["削除", "除去", "消す", "消して", "取り除"].some((word) => normalizedQuery.includes(normalizeText(word)));
    if (mentionsZeroSuppress || mentionsLeadingZeroRemove) {
      structured.operation = { type: "zeroSuppress" };
    }
  }

  if (!structured.operation) return null;

  structured.canonicalQuery = buildCanonicalQueryFromStructuredNlp(structured);
  return structured;
}

function buildIntentUnderstanding(question) {
  const normalizedQuery = normalizeText(question);
  const structured = parseStructuredNlpRequest(question);
  const looksLikeDataFormat = looksLikeDataFormatRequest(normalizedQuery);
  const commonIntent = buildCommonCommandIntent(question, structured);

  if (!structured && commonIntent.actions.length === 0) {
    return {
      intent: looksLikeDataFormat ? "data_format_setting" : "unknown",
      confidence: looksLikeDataFormat ? 0.35 : 0.1,
      contextSources: buildIntentContextSources(),
      clearBeforeApply: shouldClearSettingsBeforeCommand(question),
      targetConditions: commonIntent.targetConditions,
      symbologies: commonIntent.symbologies,
      readLengths: commonIntent.readLengths,
      actions: [],
      missingSlots: looksLikeDataFormat ? ["operation"] : ["intent"],
      canonicalQuery: "",
      structured: null,
      original: question,
    };
  }

  const missingSlots = [];
  const operation = structured?.operation || null;
  if (!operation) missingSlots.push("operation");
  if (operation && !hasOperationTarget(operation)) missingSlots.push("target");
  if (commonIntent.actions.length > 0) {
    const operationIndex = missingSlots.indexOf("operation");
    if (operationIndex >= 0) missingSlots.splice(operationIndex, 1);
  }

  const hasSpecificSymbology = commonIntent.targetConditions.some((target) => target.codeId !== "99");
  let confidence = 0.58;
  if (operation || commonIntent.actions.length > 0) confidence += 0.22;
  if ((operation && hasOperationTarget(operation)) || commonIntent.actions.length > 0) confidence += 0.08;
  if (hasSpecificSymbology) confidence += 0.06;
  if (commonIntent.readLengths.length > 0) confidence += 0.03;
  if (commonIntent.targetConditions.some((target) => target.source === "paired")) confidence += 0.04;
  if (missingSlots.length > 0) confidence -= 0.2;
  confidence = Math.max(0.1, Math.min(0.98, confidence));

  return {
    intent: "data_format_setting",
    confidence,
    contextSources: buildIntentContextSources(),
    clearBeforeApply: shouldClearSettingsBeforeCommand(question),
    targetConditions: commonIntent.targetConditions,
    symbologies: commonIntent.symbologies,
    readLengths: commonIntent.readLengths,
    actions: commonIntent.actions.length > 0 ? commonIntent.actions : buildIntentActions(operation),
    missingSlots,
    canonicalQuery: structured?.canonicalQuery || "",
    structured,
    original: question,
  };
}

function buildCommonCommandIntent(question, structured = null) {
  const normalizedQuery = normalizeText(question);
  const targetConditions = buildTargetConditions(normalizedQuery);
  const symbologies = [...new Map(targetConditions.map((condition) => [condition.codeId, {
    label: condition.label,
    codeId: condition.codeId,
    explicit: condition.codeId !== "99",
  }])).values()];
  const readLengths = [...new Set(targetConditions
    .filter((condition) => condition.length !== 9999 || condition.source !== "default")
    .map((condition) => condition.length))];
  const actions = [];
  const segmentedSendInsertAction = buildSegmentedSendInsertIntentAction(question);
  if (segmentedSendInsertAction) actions.push(segmentedSendInsertAction);
  const repeatedSuffixAction = segmentedSendInsertAction ? null : buildRepeatedSuffixControlInsertIntentAction(question);
  if (repeatedSuffixAction) actions.push(repeatedSuffixAction);
  const b5Action = repeatedSuffixAction ? null : buildB5AppendIntentAction(question);
  if (b5Action) actions.push(b5Action);
  if (actions.length === 0 && structured?.operation) actions.push(...buildIntentActions(structured.operation));
  if (structured?.operation?.type === "replace") {
    const deleteChars = findDeleteTargetCharacters(question);
    const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));
    if (mentionsDelete && deleteChars.length > 0 && !actions.some((action) => action.type === "delete")) {
      actions.push({ type: "delete", targets: deleteChars.map(characterToRequestToken), hex: charsToHex(deleteChars) });
    }
  }

  return {
    targetConditions,
    symbologies,
    readLengths,
    actions,
  };
}

function buildSegmentedSendInsertIntentAction(query) {
  const steps = findSegmentedSendInsertSequence(query);
  if (steps.length === 0) return null;
  const editorCommand = buildSegmentedSendInsertEditorCommand(steps, hasSegmentedSendInsertRemainder(query));
  return {
    type: "segmented_send_insert",
    editorCommand,
    steps,
  };
}

function shouldUseLlmCanonicalQuery(originalQuestion, canonicalQuery) {
  const originalConditions = buildTargetConditions(normalizeText(originalQuestion));
  const canonicalConditions = buildTargetConditions(normalizeText(canonicalQuery));
  const relevant = (condition) => condition.codeId !== "99" || condition.lengthField !== "9999";
  const originalConditionKeys = new Set(originalConditions.filter(relevant).map((condition) => `${condition.codeId}-${condition.lengthField}`));
  const canonicalConditionKeys = new Set(canonicalConditions.filter(relevant).map((condition) => `${condition.codeId}-${condition.lengthField}`));

  if (originalConditionKeys.size > canonicalConditionKeys.size) return false;
  for (const key of originalConditionKeys) {
    if (!canonicalConditionKeys.has(key)) return false;
  }
  if (originalConditionKeys.size > 0 && canonicalConditionKeys.size !== originalConditionKeys.size) return false;

  return true;
}

function chooseLlmEffectiveQuestion(originalQuestion, llmIntent) {
  const localIntent = buildIntentUnderstanding(originalQuestion);
  const localCandidate = buildFirstCommandCandidate(originalQuestion, localIntent);
  if (localCandidate && !validateGeneratedCommand(localCandidate, localIntent)?.validationFailed) {
    return originalQuestion;
  }

  if (!llmIntent?.canonicalQuery || llmIntent.intent !== "data_format_setting" || llmIntent.confidence < 0.7) {
    return originalQuestion;
  }

  const detailedCanonical = buildCanonicalQueryFromLlmDetailedIntent(originalQuestion, llmIntent);
  const candidates = [detailedCanonical, llmIntent.canonicalQuery].filter(Boolean);
  for (const candidate of candidates) {
    if (
      shouldUseLlmCanonicalQuery(originalQuestion, candidate) &&
      !llmResultDropsCriticalInfo(originalQuestion, { ...llmIntent, canonicalQuery: candidate }) &&
      buildFirstCommandCandidate(candidate, buildIntentUnderstanding(candidate))
    ) {
      return candidate;
    }
  }

  return originalQuestion;
}

function buildCanonicalQueryFromLlmDetailedIntent(originalQuestion, llmIntent) {
  const detailed = llmIntent?.detailedIntent;
  if (!detailed || !Array.isArray(detailed.operations)) return "";

  const targetText = buildDetailedIntentTargetText(originalQuestion, detailed);
  const segmented = detailed.operations.find((operation) => operation.type === "segmented_send_insert");
  if (segmented?.segments?.length > 0) {
    const parts = [];
    segmented.segments.forEach((segment) => {
      if (segment.sendLength) parts.push(`${segment.sendLength}桁送信`);
      const insertion = normalizeDetailedInsertValue(segment.insertValue);
      if (insertion) parts.push(`${insertion}挿入`);
    });
    parts.push("設定");
    return `${targetText}${parts.join("、")}`;
  }

  const positionInsert = detailed.operations.find((operation) =>
    ["insert_control_at_position", "insert_text_at_position"].includes(operation.type) &&
    operation.position &&
    operation.value
  );
  if (positionInsert) {
    const value = normalizeDetailedInsertValue(positionInsert.value);
    const count = positionInsert.count && positionInsert.count > 1 ? `を${positionInsert.count}回` : "";
    return `${targetText}${positionInsert.position}桁目に${value}${count}付加して出力`;
  }

  return "";
}

function buildDetailedIntentTargetText(originalQuestion, detailed) {
  const originalConditions = buildTargetConditions(normalizeText(originalQuestion));
  const nonDefault = originalConditions.filter((condition) => condition.codeId !== "99" || condition.lengthField !== "9999");
  if (nonDefault.length > 0) {
    const labels = [...new Map(nonDefault.map((condition) => [condition.codeId, condition.label])).values()];
    const lengths = [...new Set(nonDefault.map((condition) => condition.length).filter((length) => length !== 9999))];
    return `${labels.join("と")}${lengths.length > 0 ? `の${lengths.join("桁と")}桁読み取り時、` : "読み取り時、"}`;
  }

  const targets = (detailed.targets || []).map((target) => target.symbology).filter(Boolean);
  return targets.length > 0 ? `${[...new Set(targets)].join("と")}読み取り時、` : "";
}

function normalizeDetailedInsertValue(value) {
  const normalized = normalizeText(value || "");
  if (!normalized) return "";
  if (normalized.includes("ハイフン") || normalized === "-" || normalized.includes("hyphen")) return "ハイフン";
  if (normalized.includes("スペース") || normalized.includes("space") || normalized === "sp") return "スペース";
  if (normalized.includes("tab")) return "TAB";
  if (normalized.includes("cr") || normalized.includes("enter") || normalized.includes("エンター")) return "CR";
  return value;
}

function llmResultDropsCriticalInfo(originalQuestion, llmIntent) {
  if (!llmIntent?.canonicalQuery) return false;
  const original = normalizeText(originalQuestion);
  const canonical = normalizeText(llmIntent.canonicalQuery);
  if (/[a-z]{6,}/i.test(original) && !/code|matrix|micro|datamatrix|code128|code39|jan|ean|ocr|qr|hyphen|space|prefix|suffix|enter|shift|ctrl|alt/i.test(original)) {
    return true;
  }
  if (/\bhaifunnwo\b/i.test(original)) return true;
  const detailedText = [
    ...(llmIntent.detailedIntent?.preservedTerms || []),
    ...(llmIntent.detailedIntent?.operations || []).flatMap((operation) => [
      operation.type,
      operation.target,
      operation.value,
      operation.replacement,
      ...(operation.segments || []).map((segment) => segment.insertValue),
    ]),
  ].map((value) => normalizeText(value || "")).join(" ");
  const combined = `${canonical} ${detailedText}`;

  const checks = [
    { present: /\bcr\b|enter|エンター/.test(original), pattern: /\bcr\b|enter|エンター/ },
    { present: /\btab\b|タブ/.test(original), pattern: /\btab\b|タブ/ },
    { present: /ハイフン|hyphen|-/.test(original), pattern: /ハイフン|hyphen|-/ },
    { present: /スペース|space|空白/.test(original), pattern: /スペース|space|空白/ },
    { present: /削除|除去|消す|消して/.test(original), pattern: /削除|除去|消す|消して|delete/ },
    { present: /置換|置き換え|変換/.test(original), pattern: /置換|置き換え|変換|replace/ },
    { present: /0\s*サプレス|ゼロサプレス|zero suppress/.test(original), pattern: /0\s*サプレス|ゼロサプレス|zero suppress/ },
  ];

  return checks.some((check) => check.present && !check.pattern.test(combined));
}

function buildRepeatedSuffixControlInsertIntentAction(query) {
  const insertion = findRepeatedSuffixControlInsertion(query);
  if (!insertion) return null;
  return {
    type: "suffix_repeated_character",
    command: `F100F4${insertion.hex}${String(insertion.count).padStart(2, "0")}`,
    hex: insertion.hex,
    count: insertion.count,
    label: insertion.label,
  };
}

function buildB5AppendIntentAction(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsAppend = settingAppendWords.some((word) => normalizedQuery.includes(normalizeText(word)));
  if (!mentionsAppend) return null;
  if (findRepeatedSuffixControlInsertion(query)) return null;
  if (hasPlainTextAppendTarget(query)) return null;

  const mentionsPrefix = prefixWords.some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsSuffix = suffixWords.some((word) => normalizedQuery.includes(normalizeText(word)));
  if (!mentionsPrefix && !mentionsSuffix) return null;

  const key = findB5KeyForAppend(query);
  const modifier = getB5ModifierForAppend(query);
  const mentionsModifier = ["ctrl", "control", "コントロール", "alt", "shift"].some((word) => normalizedQuery.includes(normalizeText(word)));
  if (!key && !mentionsModifier) return null;

  const keystrokeCommand = key ? `B501${modifier.hex}${key.hex}` : "B5012040";
  return {
    type: mentionsPrefix ? "prefix_key" : "suffix_key",
    command: keystrokeCommand,
    modifierHex: key ? modifier.hex : "20",
    keyHex: key ? key.hex : "40",
    label: key ? `${modifier.hex === "00" ? "" : `${modifier.label}+`}${key.key}` : "CTRL",
  };
}

function buildIntentContextSources() {
  return {
    conversationHistory: "current_session",
    userInfo: "not_configured",
    relatedKnowledge: ["local_command_rules", "registered_command_catalog"],
  };
}

function looksLikeDataFormatRequest(normalizedQuery) {
  if (!normalizedQuery) return false;
  return /(読み取り|読取|バーコード|コード|qr|ocr|code|data\s*matrix|データフォーマット|桁|出力|送信|表示|削除|除去|置換|付加|追加|挿入|サプレス|プリフィックス|プレフィックス|サフィックス|先頭|末尾|gs|f\d{1,2}|矢印)/i.test(normalizedQuery);
}

function hasOperationTarget(operation) {
  if (!operation) return false;
  if (operation.type === "delete" || operation.type === "deleteFromPositionToEnd") return operation.chars.length > 0;
  if (operation.type === "deleteLeading") return operation.chars.length > 0 && Number.isInteger(operation.characterCount);
  if (operation.type === "replace") return Boolean(operation.sourceChar && operation.targetChar);
  if (operation.type === "range") return operation.ranges.length > 0;
  if (operation.type === "fromPositionToEnd") return Number.isInteger(operation.startPosition);
  if (operation.type === "leading") return Number.isInteger(operation.characterCount);
  if (operation.type === "removeTrailing") return Number.isInteger(operation.characterCount);
  if (operation.type === "zeroSuppress") return true;
  return true;
}

function buildIntentActions(operation) {
  if (!operation) return [];
  if (operation.type === "delete") {
    return [{ type: "delete", targets: operation.chars.map(characterToRequestToken), hex: charsToHex(operation.chars) }];
  }
  if (operation.type === "deleteFromPositionToEnd") {
    return [
      { type: "delete", targets: operation.chars.map(characterToRequestToken), hex: charsToHex(operation.chars) },
      { type: "output_from_position_to_end", startPosition: operation.startPosition },
    ];
  }
  if (operation.type === "deleteLeading") {
    return [
      { type: "delete", targets: operation.chars.map(characterToRequestToken), hex: charsToHex(operation.chars) },
      { type: "output_leading", characterCount: operation.characterCount },
    ];
  }
  if (operation.type === "replace") {
    return [{
      type: "replace",
      source: characterToRequestToken(operation.sourceChar),
      target: characterToRequestToken(operation.targetChar),
      sourceHex: charsToHex([operation.sourceChar]),
      targetHex: charsToHex([operation.targetChar]),
      replacements: operation.replacements || [{ sourceChar: operation.sourceChar, targetChar: operation.targetChar }],
      editorCommand: buildReplaceEditorCommand(operation.replacements || [{ sourceChar: operation.sourceChar, targetChar: operation.targetChar }], ""),
    }];
  }
  if (operation.type === "range") {
    return [{ type: "output_ranges", ranges: operation.ranges }];
  }
  if (operation.type === "fromPositionToEnd") {
    return [{ type: "output_from_position_to_end", startPosition: operation.startPosition }];
  }
  if (operation.type === "leading") {
    return [{ type: "output_leading", characterCount: operation.characterCount }];
  }
  if (operation.type === "removeTrailing") {
    return [{ type: "remove_trailing", characterCount: operation.characterCount }];
  }
  if (operation.type === "zeroSuppress") {
    return [{ type: "zero_suppress" }];
  }
  return [{ type: operation.type }];
}

function charsToHex(chars) {
  return chars.map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("");
}

function buildCanonicalQueryFromStructuredNlp(structured) {
  const targetText = symbologyTargetsToText(structured.symbologyTargets);
  const lengthText = readLengthsToText(structured.readLengths);
  const scopeText = `${targetText}${lengthText}`;
  const scopePrefix = scopeText ? `${scopeText} ` : "";
  const operation = structured.operation;

  if (operation.type === "delete") {
    return `${scopePrefix}${operation.chars.map(characterToRequestToken).join("と")}を削除`;
  }

  if (operation.type === "deleteFromPositionToEnd") {
    return `${scopePrefix}${operation.chars.map(characterToRequestToken).join("と")}を削除して${operation.startPosition}桁目以降出力`;
  }

  if (operation.type === "deleteLeading") {
    return `${scopePrefix}${operation.chars.map(characterToRequestToken).join("と")}を削除して先頭${operation.characterCount}桁出力`;
  }

  if (operation.type === "replace") {
    const replacements = operation.replacements || [{ sourceChar: operation.sourceChar, targetChar: operation.targetChar }];
    const replaceText = replacements
      .map((pair) => `${characterToRequestToken(pair.sourceChar)}を${characterToRequestToken(pair.targetChar)}に置換`)
      .join("、");
    return `${scopePrefix}${replaceText}`;
  }

  if (operation.type === "range") {
    return `${scopePrefix}${operation.ranges.map((range) => `${range.startPosition}桁目から${range.characterCount}桁`).join("と")}出力`;
  }

  if (operation.type === "fromPositionToEnd") {
    return `${scopePrefix}${operation.startPosition}桁目から出力`;
  }

  if (operation.type === "leading") {
    return `${scopePrefix}先頭${operation.characterCount}桁出力`;
  }

  if (operation.type === "removeTrailing") {
    return `${scopePrefix}末尾${operation.characterCount}桁データ削除`;
  }

  if (operation.type === "zeroSuppress") {
    return `${scopePrefix}0サプレス`;
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

function findUntilCharacter(query) {
  const normalizedCaseQuery = query
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
  const tokenPattern = "スペース|space|空白|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus|カンマ|comma|fnc1|fnc 1|gs|gsコード|gsキャラクタ|gsキャラクター|group separator|グループセパレータ|[!-~]";
  const patterns = [
    new RegExp(`(${tokenPattern})\\s*まで\\s*(?:データ)?\\s*(?:を)?\\s*(?:出力|送信|表示)`, "i"),
    new RegExp(`(${tokenPattern})\\s*手前\\s*まで\\s*(?:データ)?\\s*(?:を)?\\s*(?:出力|送信|表示)`, "i"),
  ];

  for (const pattern of patterns) {
    const match = normalizedCaseQuery.match(pattern);
    if (!match) continue;
    const char = normalizeReplaceCharacter(match[1]);
    if (char) return char;
  }

  return null;
}

function buildUntilCharacterCommand(query) {
  const normalizedQuery = normalizeText(query);
  const untilChar = findUntilCharacter(query);
  if (!untilChar) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const targetHex = untilChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
  const targetLabel = describeReplaceCharacter(untilChar);
  const editorCommand = `F3${targetHex}00`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-until-${targetHex}-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}`,
    label: `${codeLabel}・${lengthLabel} ${targetLabel}までデータ出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、読み取りデータの現在位置から${targetLabel}の手前までを出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `F3${targetHex}00 は現在位置から ${targetLabel} が出現する手前までを送信し、追加文字なしで出力する指定です。`,
    ],
  };
}

function findSearchUntilCharacterSequences(query) {
  const normalizedCaseQuery = query
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
  const tokenPattern = "スペース|space|空白|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus|カンマ|comma|fnc1|fnc 1|gs|gsコード|gsキャラクタ|gsキャラクター|group separator|グループセパレータ|[!-~]";
  const pattern = new RegExp(`(${tokenPattern})\\s*(以降|から|後ろから|後から|の後ろから|の後から)\\s*(${tokenPattern})\\s*(?:手前)?\\s*まで\\s*(?:データ)?\\s*(?:を)?\\s*(?:出力|送信|表示)`, "gi");
  const sequences = [];
  let match;

  while ((match = pattern.exec(normalizedCaseQuery)) !== null) {
    const startChar = normalizeReplaceCharacter(match[1]);
    const endChar = normalizeReplaceCharacter(match[3]);
    if (!startChar || !endChar) continue;
    sequences.push({
      startChar,
      endChar,
      includeStart: match[2] === "以降" || match[2] === "から",
    });
  }

  return sequences;
}

function buildSearchUntilCharacterCommand(query) {
  const normalizedQuery = normalizeText(query);
  const sequences = findSearchUntilCharacterSequences(query);
  if (sequences.length === 0) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const commandParts = sequences.map((sequence, index) => {
    const startHex = sequence.startChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
    const endHex = sequence.endChar.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
    const reset = index > 0 ? "F7" : "";
    const startMove = sequence.includeStart ? "" : "F501";
    return `${reset}F8${startHex}${startMove}F3${endHex}00`;
  });
  const editorCommand = commandParts.join("");
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";
  const sequenceLabel = sequences.map((sequence) =>
    `${describeReplaceCharacter(sequence.startChar)}${sequence.includeStart ? "以降" : "後ろから"}${describeReplaceCharacter(sequence.endChar)}まで`
  ).join("、");

  return {
    id: `df-generated-search-until-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${editorCommand}`,
    label: `${codeLabel}・${lengthLabel} ${sequenceLabel}出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${sequenceLabel}のデータを出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      "F8xx は指定文字の手前までカーソルを移動し、F3xxxx は現在位置から指定文字の手前まで送信します。",
      "複数箇所を取り出す場合は F7 でカーソルを先頭へ戻してから次の検索を行います。",
    ],
  };
}

function findOutputAfterNthCharacter(query) {
  const normalizedCaseQuery = query
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
  const tokenPattern = "スペース|space|空白|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus|カンマ|comma|fnc1|fnc 1|gs|gsコード|gsキャラクタ|gsキャラクター|group separator|グループセパレータ|[!-~]";
  const patterns = [
    new RegExp(`(\\d{1,2})\\s*(?:個目|回目|つ目|番目)\\s*(?:の)?\\s*(${tokenPattern})\\s*(?:の)?\\s*(?:後ろ|後|以降|後方)\\s*(?:から|の)?\\s*(?:データ)?\\s*(?:を)?\\s*(?:出力|送信|表示)`, "i"),
    new RegExp(`(${tokenPattern})\\s*(?:の)?\\s*(\\d{1,2})\\s*(?:個目|回目|つ目|番目)\\s*(?:の)?\\s*(?:後ろ|後|以降|後方)\\s*(?:から|の)?\\s*(?:データ)?\\s*(?:を)?\\s*(?:出力|送信|表示)`, "i"),
  ];

  for (const pattern of patterns) {
    const match = normalizedCaseQuery.match(pattern);
    if (!match) continue;
    const count = Number(/^\d/.test(match[1]) ? match[1] : match[2]);
    const token = /^\d/.test(match[1]) ? match[2] : match[1];
    const char = normalizeReplaceCharacter(token);
    if (char && Number.isInteger(count) && count >= 1 && count <= 99) return { count, char };
  }

  return null;
}

function buildOutputAfterNthCharacterCommand(query) {
  const normalizedQuery = normalizeText(query);
  const target = findOutputAfterNthCharacter(query);
  if (!target) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const targetHex = target.char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
  const targetLabel = describeReplaceCharacter(target.char);
  const searchMove = `F8${targetHex}F501`;
  const editorCommand = `${searchMove.repeat(target.count)}F100`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-after-nth-${targetHex}-${target.count}-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}`,
    label: `${codeLabel}・${lengthLabel} ${target.count}個目の${targetLabel}後ろからデータ出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${target.count}個目の${targetLabel}の後ろから末尾までを出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `F8${targetHex} は次の ${targetLabel} の手前までカーソルを移動し、F501 はその1文字後ろへ移動する指定です。`,
      `この組み合わせを${target.count}回繰り返し、F100 でそこから末尾まで送信します。`,
    ],
  };
}

function buildCommandFromStructuredNlp(question, intentUnderstanding = buildIntentUnderstanding(question)) {
  const structured = intentUnderstanding?.structured;
  if (!structured || intentUnderstanding.confidence < 0.7) return null;

  const hasPairedConditions = (intentUnderstanding.targetConditions || []).some((condition) => condition.source === "paired");
  const query = hasPairedConditions ? question : (structured.canonicalQuery || question);
  const builders = [
    buildReplaceThenRangeCommand,
    buildTrimLeadingZeroesCommand,
    buildRemoveTrailingCharactersCommand,
    buildDeleteThenLeadingCommand,
    findExactSpaceTransformCommand,
    buildDeleteThenFromPositionToEndCommand,
    findExactDeleteCharacterCommand,
    buildSearchUntilCharacterCommand,
    buildOutputAfterNthCharacterCommand,
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
          ...buildNlpDecisionSteps(structured, intentUnderstanding),
          ...(command.notes || []),
        ],
      };
    }
  }

  return null;
}

function buildNlpDecisionSteps(structured, intentUnderstanding = null) {
  const operation = structured.operation;
  const intentJson = intentUnderstanding
    ? {
        intent: intentUnderstanding.intent,
        confidence: Number(intentUnderstanding.confidence.toFixed(2)),
        contextSources: intentUnderstanding.contextSources,
        targetConditions: intentUnderstanding.targetConditions.map((condition) => ({
          code: condition.label,
          codeId: condition.codeId,
          length: condition.length,
          source: condition.source,
        })),
        symbologies: intentUnderstanding.symbologies.map((item) => item.label),
        readLengths: intentUnderstanding.readLengths,
        actions: intentUnderstanding.actions,
        clearBeforeApply: intentUnderstanding.clearBeforeApply,
      }
    : null;
  const steps = [
    ...(intentJson ? [`判断0: Intent理解JSON ${JSON.stringify(intentJson)} を作成しました。`] : []),
    `判断1: コード種は ${symbologyTargetsToText(structured.symbologyTargets) || "全コード種"} と判断しました。`,
    `判断2: 桁数条件は ${readLengthsToText(structured.readLengths) || "全桁数"} と判断しました。`,
    `判断3: 処理内容は ${getOperationLabel(operation)} と判断しました。`,
  ];

  const targetText = getOperationTargetLabel(operation);
  if (targetText) {
    steps.push(`判断4: 処理対象は ${targetText} と判断しました。`);
  }

  steps.push(`判断5: 標準化した依頼文「${structured.canonicalQuery}」を既存ロジックに渡してコマンド生成しました。`);
  return steps;
}

function shouldAskClarification(intentUnderstanding) {
  if (!intentUnderstanding) return false;
  return intentUnderstanding.intent === "data_format_setting" && intentUnderstanding.confidence < 0.7;
}

function buildClarificationHtml(intentUnderstanding) {
  const missingSlots = intentUnderstanding?.missingSlots || [];
  const needsOperation = missingSlots.includes("operation");
  const guidance = needsOperation
    ? "処理内容をもう少し具体的に入力してください。削除、置換、指定桁出力、付加などを判断できる形にするとコマンド生成できます。"
    : "依頼内容をもう少し具体的に入力してください。";

  return `
    <div class="command-card">
      <strong>確認が必要です</strong>
      <p>${escapeHtml(guidance)}</p>
      <p>例: QR10桁読み取り時、ハイフン削除</p>
      <p>例: Code128読み取り時に5桁目から出力</p>
    </div>
  `;
}

function buildFunctionKeyTextAmbiguityHtml(query) {
  const key = getAmbiguousFunctionKeyAppend(query);
  if (!key) return "";

  return `
    <div class="command-card">
      <strong>確認が必要です</strong>
      <p>${escapeHtml(key)}はキー入力ですか？それとも文字入力ですか？</p>
      <p>キー入力の場合は「${escapeHtml(key)}キーを付加」、文字入力の場合は「文字列${escapeHtml(key)}を付加」と入力してください。</p>
    </div>
  `;
}

function getAmbiguousFunctionKeyAppend(query) {
  const normalizedQuery = normalizeText(query);
  const asciiQuery = normalizeAsciiText(query);
  const mentionsAppend = appendWords.some((word) => normalizedQuery.includes(normalizeText(word))) || normalizedQuery.includes("設定");
  const mentionsPrefixOrSuffix = [...prefixWords, ...suffixWords].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );
  if (!mentionsAppend || !mentionsPrefixOrSuffix) return "";

  const match = asciiQuery.match(/\b(f(?:1[0-2]|[1-9]))\b/i);
  if (!match) return "";

  const explicitKey = new RegExp(`\\b${match[1]}\\s*(?:キー|key)`, "i").test(asciiQuery);
  const explicitText = new RegExp(`(?:文字列|文字|テキスト)\\s*${match[1]}|${match[1]}\\s*(?:の)?\\s*(?:文字列|文字|テキスト)|${match[1][0]}\\s*と\\s*${match[1].slice(1)}`, "i").test(asciiQuery);
  const hasModifier = ["ctrl", "control", "コントロール", "alt", "shift"].some((word) => normalizedQuery.includes(normalizeText(word)));
  if (explicitKey || explicitText || hasModifier) return "";

  return match[1].toUpperCase();
}

function setPendingClarification(type, question, data = {}) {
  pendingClarification = {
    type,
    question,
    data,
    createdAt: Date.now(),
  };
}

function clearPendingClarification() {
  pendingClarification = null;
}

function resolvePendingClarification(answer) {
  if (!pendingClarification) return answer;

  const pending = pendingClarification;
  if (Date.now() - pending.createdAt > 10 * 60 * 1000) {
    clearPendingClarification();
    return answer;
  }

  if (pending.type === "function_key_text") {
    const resolved = resolveFunctionKeyTextClarification(pending.question, answer, pending.data.key);
    if (resolved) {
      clearPendingClarification();
      return resolved;
    }
    return answer;
  }

  if (pending.type === "general") {
    clearPendingClarification();
    return `${pending.question}、${answer}`;
  }

  if (pending.type === "llm_intent") {
    clearPendingClarification();
    return `${pending.question}、${answer}`;
  }

  clearPendingClarification();
  return answer;
}

function resolveFunctionKeyTextClarification(originalQuestion, answer, key) {
  const normalizedAnswer = normalizeText(answer);
  const asciiAnswer = normalizeAsciiText(answer);
  const keyPattern = new RegExp(`\\b${key}\\b`, "i");

  const saysKey =
    new RegExp(`\\b${key}\\s*(?:キー|key)`, "i").test(asciiAnswer) ||
    ["キー", "キー入力", "key入力", "ファンクションキー", "function key"].some((word) => normalizedAnswer.includes(normalizeText(word)));
  if (saysKey) {
    return originalQuestion.replace(keyPattern, `${key}キー`);
  }

  const saysText =
    new RegExp(`(?:文字列|文字|テキスト)\\s*${key}|${key}\\s*(?:の)?\\s*(?:文字列|文字|テキスト)|${key[0]}\\s*と\\s*${key.slice(1)}`, "i").test(asciiAnswer) ||
    ["文字", "文字列", "文字入力", "テキスト", "テキスト入力"].some((word) => normalizedAnswer.includes(normalizeText(word)));
  if (saysText) {
    return originalQuestion.replace(keyPattern, `文字列${key}`);
  }

  return "";
}

function getOperationLabel(operation) {
  if (!operation) return "未分類";
  const labels = {
    delete: "削除",
    deleteFromPositionToEnd: "削除後の指定桁以降出力",
    deleteLeading: "削除後の先頭桁数出力",
    removeTrailing: "末尾桁数削除",
    replace: "置換",
    range: "指定範囲出力",
    fromPositionToEnd: "指定桁以降出力",
    leading: "先頭桁数出力",
    zeroSuppress: "0サプレス",
  };
  return labels[operation.type] || operation.type;
}

function getOperationTargetLabel(operation) {
  if (!operation) return "";
  if (operation.type === "delete" || operation.type === "deleteFromPositionToEnd") {
    return operation.chars.map(describeReplaceCharacter).join("と");
  }
  if (operation.type === "deleteLeading") {
    return `${operation.chars.map(describeReplaceCharacter).join("と")}、先頭${operation.characterCount}桁`;
  }
  if (operation.type === "replace") {
    const replacements = operation.replacements || [{ sourceChar: operation.sourceChar, targetChar: operation.targetChar }];
    return replacements
      .map((pair) => `${describeReplaceCharacter(pair.sourceChar)} から ${describeReplaceCharacter(pair.targetChar)}`)
      .join("、");
  }
  if (operation.type === "range") {
    return operation.ranges.map((range) => `${range.startPosition}桁目から${range.characterCount}桁`).join("と");
  }
  if (operation.type === "fromPositionToEnd") {
    return `${operation.startPosition}桁目以降`;
  }
  if (operation.type === "leading") {
    return `先頭${operation.characterCount}桁`;
  }
  if (operation.type === "removeTrailing") {
    return `末尾${operation.characterCount}桁`;
  }
  return "";
}

function findTrailingDeleteCount(normalizedQuery) {
  const mentionsDelete = ["削除", "除去", "消す", "消して", "取り除", "カット", "送信しない", "出力しない", "表示しない", "送らない", "除外"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );
  if (!mentionsDelete) return 0;

  const patterns = [
    /(?:末尾|最後)(?:から|の)?\s*(\d{1,2})\s*桁(?:分|の)?\s*(?:データ|文字)?\s*(?:を)?\s*(?:削除|除去|消す|消して|取り除|カット)/,
    /(?:末尾|最後)(?:の)?\s*(?:データ|文字)?\s*(\d{1,2})\s*桁(?:分)?\s*(?:を)?\s*(?:削除|除去|消す|消して|取り除|カット)/,
    /(?:データ|文字)?\s*(?:末尾|最後)(?:から|の)?\s*(\d{1,2})\s*桁(?:分)?\s*(?:を)?\s*(?:削除|除去|消す|消して|取り除|カット)/,
    /(?:末尾|最後)(?:から|の)?\s*(\d{1,2})\s*桁(?:分|の)?\s*(?:データ|文字)?\s*(?:を)?\s*(?:送信しない|出力しない|表示しない|送らない|除外)/,
    /(?:末尾|最後)(?:の)?\s*(?:データ|文字)?\s*(\d{1,2})\s*桁(?:分)?\s*(?:を)?\s*(?:送信しない|出力しない|表示しない|送らない|除外)/,
    /(?:データ|文字)?\s*(?:末尾|最後)(?:から|の)?\s*(\d{1,2})\s*桁(?:分)?\s*(?:を)?\s*(?:送信しない|出力しない|表示しない|送らない|除外)/,
  ];

  for (const pattern of patterns) {
    const match = normalizedQuery.match(pattern);
    if (!match) continue;
    const count = Number(match[1]);
    if (Number.isInteger(count) && count >= 1 && count <= 99) return count;
  }

  return 0;
}

function buildLeadingCharactersCommand(query) {
  const normalizedQuery = normalizeText(query);
  const match = normalizedQuery.match(/(?:先頭|最初)(?:から)?\s*(\d{1,4})\s*桁/);

  if (!match || !/(出力|送信|表示|取り出|切り出|のみ)/.test(normalizedQuery)) return null;

  const characterCount = Number(match[1]);
  if (!Number.isInteger(characterCount) || characterCount < 1 || characterCount > 9999) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);

  const commandParts = splitSendCounts(characterCount).map((count) => `F2${String(count).padStart(2, "0")}00`);
  const editorCommand = commandParts.join("");
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const labelTarget = readLengths.length > 0 ? `${readLengths.join("桁と")}桁バーコード限定で` : "全桁数で";
  const summaryTarget = readLengths.length > 0 ? `${readLengths.join("桁と")}桁のバーコードだけを対象に、` : "読取桁数を限定せず、";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-first-${characterCount}`,
    label: `${codeLabel}・${labelTarget}先頭${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、${summaryTarget}読み取りデータの先頭${characterCount}桁のみを出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      "複数条件は | で区切り、2件目以降は DFMBK3 を付けずに条件ブロックだけを連結します。",
      `${editorCommand} は先頭から${characterCount}桁を送信する Data Format Editor コマンドです。99桁を超える場合はF2を分割します。`,
    ],
  };
}

function findPrefixValueFilter(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsPrefix = /(先頭文字|先頭値|先頭コード|先頭|prefix)/i.test(normalizedQuery);
  const mentionsOnly = /(のみ|だけ|限定|一致|場合)/.test(normalizedQuery);
  const mentionsOutput = /(読取出力|読み取り出力|読み取り|読取|出力|送信|表示)/.test(normalizedQuery);
  if (!mentionsPrefix || !mentionsOnly || !mentionsOutput) return null;

  const asciiQuery = normalizeAsciiText(query);
  const match = asciiQuery.match(/(?:先頭文字|先頭値|先頭コード|先頭)\s*(?:が|は|=|:|：)?\s*([A-Z0-9]{1,4}(?:\s*(?:、|,|，|\/|\+|&|and|と)\s*[A-Z0-9]{1,4})*)\s*(?=(?:の|が|は|のみ|だけ|限定|一致|時|とき|場合|なら|で|を|読取|読み取り|出力|送信|表示|$))/i);
  if (!match) return null;

  const values = [...new Set((match[1].match(/[A-Z0-9]{1,4}/gi) || []).map((value) => value.toUpperCase()))];
  if (values.length === 0 || values.some((value) => value.length < 1 || value.length > 4)) return null;
  return values;
}

function buildPrefixValueFilterCommand(query) {
  const normalizedQuery = normalizeText(query);
  const prefixValues = findPrefixValueFilter(query);
  if (!prefixValues) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const target = symbologyTargets.length === 1 ? symbologyTargets[0] : getSymbologyTargetLegacy(normalizedQuery);
  if (!target || target.codeId === "99") return null;

  const readLengths = getReadLengths(normalizedQuery);
  const lengthField = readLengths.length === 1 ? String(readLengths[0]).padStart(4, "0") : "9999";
  const blocks = prefixValues.map((value) => {
    const compareCommand = [...value].map((char) => `FE${char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")}`).join("");
    return `0099${target.codeId}${lengthField}${compareCommand}F7F100`;
  });
  const command = `${buildDataFormatCommandFromBlocks(blocks).replace(/\.$/, "")};DFM_EN2;DFMDEC1.`;

  return {
    id: `df-generated-prefix-filter-${target.codeId}-${lengthField}-${prefixValues.join("-")}`,
    label: `${target.label}・先頭${prefixValues.join("、")}のみ読取出力`,
    category: "登録例",
    summary: `${target.label}を対象に、先頭文字列が${prefixValues.join("、")}に一致するデータだけを出力します。`,
    keywords: [],
    command,
    skipGenerationValidation: true,
    notes: [
      `${target.codeId} は${target.label}、${lengthField} は${readLengths.length === 1 ? `${readLengths[0]}桁` : "全桁数"}を表す指定です。`,
      "FE は現在位置の文字を比較し、一致した場合だけカーソルを進める指定です。",
      "F7F100 は比較後にカーソルを先頭へ戻し、読み取りデータ全体を出力します。",
      "DFM_EN2 は一致必須、DFMDEC1 は不一致時のエラー音OFFです。",
    ],
  };
}

function buildRemoveTrailingCharactersCommand(query) {
  const normalizedQuery = normalizeText(query);
  const characterCount = findTrailingDeleteCount(normalizedQuery);
  if (!characterCount) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const countHex = String(characterCount).padStart(2, "0");
  const editorCommand = `E9${countHex}`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-remove-trailing-${characterCount}`,
    label: `${codeLabel}・${lengthLabel} 末尾${characterCount}桁データ削除`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの末尾${characterCount}桁を除いて出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `${editorCommand} は現在位置から末尾までのうち、最後の${characterCount}桁を除いたデータを送信する指定です。`,
    ],
  };
}

function splitSendCounts(totalCount) {
  const counts = [];
  let remaining = totalCount;
  while (remaining > 0) {
    const count = Math.min(99, remaining);
    counts.push(count);
    remaining -= count;
  }
  return counts;
}

function splitCursorMoves(totalCount) {
  const moves = [];
  let remaining = totalCount;
  while (remaining > 0) {
    const move = Math.min(99, remaining);
    moves.push(move);
    remaining -= move;
  }
  return moves;
}

function buildCursorMoveCommand(totalCount) {
  if (totalCount === 0) return "F500";
  return splitCursorMoves(totalCount).map((move) => `F5${String(move).padStart(2, "0")}`).join("");
}

function buildRangeCharactersCommand(query) {
  const normalizedQuery = normalizeText(query);
  const rangeMatches = [...normalizedQuery.matchAll(/(?<!\d)(\d{1,4})\s*桁目\s*から\s*(\d{1,2})\s*桁/g)];
  const structuredStartMatch = normalizedQuery.match(/(?:スタート|開始)\s*桁\s*[:：]?\s*(\d{1,4})\s*桁目?/);
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
    range.startPosition > 9999 ||
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
    if (cursorMove < 0) return null;

    const countHex = range.characterCount.toString().padStart(2, "0");
    commandParts.push(`${buildCursorMoveCommand(cursorMove)}F2${countHex}00`);
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
    command: buildDataFormatCommandFromBlocks(buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      "F2実行後にカーソルが送信した桁数分進むため、2つ目以降のF5は直前の送信後位置からの差分で指定します。",
      `${editorCommand} は ${rangeLabel} を順番に送信する Data Format Editor コマンドです。`,
    ],
  };
}

function buildFromPositionToEndCommand(query) {
  const normalizedQuery = normalizeText(query);
  const match = normalizedQuery.match(/(?<!\d)(\d{1,4})\s*桁目\s*(?:以降|から\s*(?:(?:末尾|最後|全部|すべて|全て)|(?=(?:を)?\s*(?:出力|送信|表示|取り出|切り出))))/);

  if (!match || !/(出力|送信|表示|取り出|切り出)/.test(normalizedQuery)) return null;

  const startPosition = Number(match[1]);
  if (!Number.isInteger(startPosition) || startPosition < 1 || startPosition > 9999) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const cursorMove = startPosition - 1;
  const editorCommand = `${buildCursorMoveCommand(cursorMove)}F100`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-from-${cursorMove}-to-end`,
    label: `${codeLabel}・${lengthLabel} ${startPosition}桁目以降を出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの${startPosition}桁目以降を出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand)),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `${editorCommand.replace(/F100$/, "")} でカーソルを${cursorMove}桁移動し、F100 でそこから末尾まで送信します。`,
    ],
  };
}

function findExactTransformCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsGs = ["gs", "gsコード", "gsキャラクター", "fnc1", "fnc 1", "group separator", "グループセパレータ"].some((word) =>
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

  const replacePairs = findReplaceCharacterPairs(query);
  if (replacePairs.length === 0) return null;

  const replaceEditorCommand = buildReplaceEditorCommand(replacePairs, "F100");
  const replaceLabel = describeReplacePairs(replacePairs);
  const conditions = buildTargetConditions(normalizedQuery);
  const uniqueTargets = [];
  conditions.forEach((condition) => {
    if (!uniqueTargets.some((target) => target.codeId === condition.codeId)) {
      uniqueTargets.push({ codeId: condition.codeId, label: condition.label });
    }
  });
  const codeLabel = uniqueTargets.length === 1 && uniqueTargets[0].codeId === "99"
    ? "全コード種"
    : uniqueTargets.map((target) => target.label).join("と");
  const codeNote = uniqueTargets.length === 1 && uniqueTargets[0].codeId === "99"
    ? "99 は全コード種"
    : uniqueTargets.map((target) => `${target.codeId} は${target.label}`).join("、");

  return {
    id: `df-generated-replace-${replacePairs.map((pair) => `${charsToHex([pair.sourceChar])}-with-${charsToHex([pair.targetChar])}`).join("-")}-${uniqueTargets.map((target) => target.codeId).join("-")}`,
    label: `${codeLabel} ${replaceLabel}に置換`,
    category: "登録例",
    summary: `${codeLabel}を対象に、${replaceLabel}に置き換えて出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, replaceEditorCommand),
    notes: [
      `0 は Primary Data Format、099 は全端末、${codeNote}、9999 は全桁数を表す指定です。`,
      `${replaceEditorCommand.replace(/F100$/, "")} は ${replaceLabel}に置換する指定です。`,
      "F100 は置換完了後に全てのデータを送信する指定です。",
    ],
  };

}

function getReplaceTokenPattern() {
  return "tab|タブ|ht|スペース|space|空白|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus|fnc1|fnc 1|gsコード|gsキャラクタ|gsキャラクター|group separator|グループセパレータ|gs|[!-~]";
}

function findReplaceCharacterPairs(query) {
  const normalizedCaseQuery = query
    .replace(/[！-～]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
  const tokenPattern = getReplaceTokenPattern();
  const pattern = new RegExp(`(${tokenPattern})(?:文字|キャラクタ|キャラクター)?\\s*を\\s*(${tokenPattern})(?:文字|キャラクタ|キャラクター)?\\s*(?:に|へ)?\\s*(?:置換|置き換え|置き換えて|変換)`, "gi");
  const pairs = [];
  const seen = new Set();
  let match;

  while ((match = pattern.exec(normalizedCaseQuery)) !== null) {
    const sourceChar = normalizeReplaceCharacter(match[1]);
    const targetChar = normalizeReplaceCharacter(match[2]);
    if (!sourceChar || !targetChar) continue;
    const key = `${sourceChar}\u0000${targetChar}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pairs.push({ sourceChar, targetChar });
  }

  return pairs;
}

function findReplaceCharacters(query) {
  return findReplaceCharacterPairs(query)[0] || null;
}

function buildReplaceEditorCommand(replacePairs, suffix = "F100") {
  const pairHex = (replacePairs || [])
    .map((pair) => `${charsToHex([pair.sourceChar])}${charsToHex([pair.targetChar])}`)
    .join("");
  if (!pairHex) return "";
  return `E4${String(pairHex.length / 2).padStart(2, "0")}${pairHex}${suffix}`;
}

function buildDeleteEditorCommand(chars, suffix = "F100") {
  const targetHex = charsToHex(chars || []);
  if (!targetHex) return "";
  return `FB${String(targetHex.length / 2).padStart(2, "0")}${targetHex}${suffix}`;
}

function describeReplacePairs(replacePairs) {
  return (replacePairs || [])
    .map((pair) => `${describeReplaceCharacter(pair.sourceChar)}を${describeReplaceCharacter(pair.targetChar)}`)
    .join("、");
}

function buildReplaceThenRangeCommand(query) {
  const normalizedQuery = normalizeText(query);
  const rangeMatch = normalizedQuery.match(/(\d{1,2})\s*桁目\s*から\s*(\d{1,2})\s*桁/);
  const mentionsReplace = ["置換", "置き換え", "置き換えて", "変換"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (!rangeMatch || !mentionsReplace || !/(出力|送信|表示|取り出|切り出|ください)/.test(normalizedQuery)) return null;

  const replacePairs = findReplaceCharacterPairs(query);
  const replaceChars = replacePairs[0] || null;
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
  const sourceHex = charsToHex([replaceChars.sourceChar]);
  const targetHex = charsToHex([replaceChars.targetChar]);
  const replaceEditorCommand = buildReplaceEditorCommand(replacePairs, `F7F5${(startPosition - 1).toString().padStart(2, "0")}F2${String(characterCount).padStart(2, "0")}00`);
  const replaceLabel = describeReplacePairs(replacePairs);
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
    label: `${replaceLabel}に置換後 ${startPosition}桁目から${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${replaceLabel}に置き換えてから${startPosition}桁目から${characterCount}桁のみを出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, replaceEditorCommand),
    notes: [
      `${codeId} は${codeLabel}を表す指定です。${lengthNote}`,
      `${buildReplaceEditorCommand(replacePairs, "")} は ${replaceLabel}に置換する指定です。`,
      "F7 は置換後にカーソルを先頭へ戻す指定です。",
      `F5${cursorHex} でカーソルを${cursorMove}桁移動し、F2${countHex}00 でそこから${characterCount}桁を送信します。`,
    ],
  };
}

function buildReplaceThenDeleteCommand(query) {
  const normalizedQuery = normalizeText(query);
  const replacePairs = findReplaceCharacterPairs(query);
  const deleteChars = findDeleteTargetCharacters(query);
  const mentionsReplace = ["置換", "置き換え", "置き換えて", "変換"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );
  const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );

  if (replacePairs.length === 0 || deleteChars.length === 0 || !mentionsReplace || !mentionsDelete) return null;

  const replaceCommand = buildReplaceEditorCommand(replacePairs, "");
  const deleteCommand = buildDeleteEditorCommand(deleteChars, "");
  const editorCommand = `${replaceCommand}${deleteCommand}F100`;
  const replaceLabel = describeReplacePairs(replacePairs);
  const deleteLabel = deleteChars.map(describeReplaceCharacter).join("と");
  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-replace-delete-${replacePairs.map((pair) => `${charsToHex([pair.sourceChar])}-${charsToHex([pair.targetChar])}`).join("-")}-${charsToHex(deleteChars)}`,
    label: `${codeLabel}・${lengthLabel} ${replaceLabel}に置換、${deleteLabel}を削除`,
    category: "登録例",
    summary: `${codeLabel}を対象に、${replaceLabel}に置き換え、${deleteLabel}を削除して出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `${replaceCommand} は ${replaceLabel}に置換する指定です。`,
      `${deleteCommand} は ${deleteLabel}を削除する指定です。`,
      "F100 は処理完了後に全てのデータを送信する指定です。",
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
  if (["tab", "タブ", "ht"].includes(lowered)) return "\x09";
  if (["cr", "enter", "エンター", "改行"].includes(lowered)) return "\x0D";
  if (["gs", "gsコード", "gsキャラクタ", "gsキャラクター", "fnc1", "fnc 1", "group separator", "グループセパレータ"].includes(lowered)) return "\x1D";
  if (normalized.length === 1 && normalized >= "!" && normalized <= "~") return normalized;
  return null;
}

function describeReplaceCharacter(char) {
  if (char === " ") return "スペース";
  if (char === "/") return "/(スラッシュ)";
  if (char === ".") return ".(ピリオド)";
  if (char === "-") return "-(ハイフン)";
  if (char === ",") return ",(カンマ)";
  if (char === "\x09") return "TAB";
  if (char === "\x0D") return "CR";
  if (char === "\x1D") return "GSキャラクタ";
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
    command: buildDataFormatCommandFromBlocks(buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand)),
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
  const mentionsAppend = settingAppendWords.some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!mentionsSuffix || !mentionsAppend || hasPlainTextAppendTarget(query)) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengthsForSuffixB5(normalizedQuery);
  const pairedLengthConditions = getSymbologyLengthPairs(normalizedQuery);
  const key = findB5KeyForAppend(query);
  const modifier = getB5ModifierForAppend(query);
  if (!key && !mentionsModifier) return null;

  const keystrokeCommand = key ? `B501${modifier.hex}${key.hex}` : "B5012040";
  const keystrokeLabel = key ? `${modifier.hex === "00" ? "" : `${modifier.label}+`}${key.key}` : "CTRL";
  const editorCommand = `F100${keystrokeCommand}`;
  const codeLabel = symbologyTargets.map((item) => item.label).join("、");
  const lengthLabel = pairedLengthConditions.length >= 2
    ? pairedLengthConditions.map((pair) => `${pair.target.label}${pair.length}桁`).join("、")
    : readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = pairedLengthConditions.length >= 2
    ? pairedLengthConditions.map((pair) => `${pair.target.codeId}${String(pair.length).padStart(4, "0")} は${pair.target.label}${pair.length}桁を対象にする指定です。`).join(" ")
    : readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-suffix-b5-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${keystrokeCommand}`,
    label: `${codeLabel}・${lengthLabel} 末尾に${keystrokeLabel}を付加`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、読み取りデータを出力して末尾に${keystrokeLabel}キーを付加します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand)),
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
  const mentionsPrefix = prefixWords.some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsAppend = settingAppendWords.some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!mentionsPrefix || !mentionsAppend || hasPlainTextAppendTarget(query)) return null;

  const key = findB5KeyForAppend(query);
  if (!key) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengthsForSuffixB5(normalizedQuery);
  const pairedLengthConditions = getSymbologyLengthPairs(normalizedQuery);
  const modifier = getB5ModifierForAppend(query);
  const keystrokeCommand = `B501${modifier.hex}${key.hex}`;
  const keystrokeLabel = `${modifier.hex === "00" ? "" : `${modifier.label}+`}${key.key}`;
  const editorCommand = `${keystrokeCommand}F100`;
  const codeLabel = symbologyTargets.map((item) => item.label).join("、");
  const lengthLabel = pairedLengthConditions.length >= 2
    ? pairedLengthConditions.map((pair) => `${pair.target.label}${pair.length}桁`).join("、")
    : readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = pairedLengthConditions.length >= 2
    ? pairedLengthConditions.map((pair) => `${pair.target.codeId}${String(pair.length).padStart(4, "0")} は${pair.target.label}${pair.length}桁を対象にする指定です。`).join(" ")
    : readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-prefix-b5-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${keystrokeCommand}`,
    label: `${codeLabel}・${lengthLabel} 先頭に${keystrokeLabel}を付加`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、読み取りデータの先頭に${keystrokeLabel}キーを付加します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand)),
    notes: [
      `0 は Primary Data Format、099 は全端末、${symbologyTargets.map((item) => `${item.codeId} は ${item.label}`).join("、")} を表す指定です。`,
      lengthNote,
      `${keystrokeCommand} は先頭に ${keystrokeLabel} キーを付加し、F100 はその後に読み取りデータを全て出力する指定です。左右指定がない修飾キーは左優先です。`,
      "B5コマンドはUSB-HID使用時のみ有効です。RS232CやUSB-COMインターフェイス設定では使用できません。",
    ],
  };
}

function buildPrefixSuffixB5Command(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsPrefix = prefixWords.some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsSuffix = ["末尾", "後ろ", "最後", "サフィックス", "suffix"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsAppend = settingAppendWords.some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!mentionsPrefix || !mentionsSuffix || !mentionsAppend || hasPlainTextAppendTarget(query)) return null;

  const key = findB5KeyForAppend(query);
  if (!key) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengthsForSuffixB5(normalizedQuery);
  const pairedLengthConditions = getSymbologyLengthPairs(normalizedQuery);
  const modifier = getB5ModifierForAppend(query);
  const keystrokeCommand = `B501${modifier.hex}${key.hex}`;
  const keystrokeLabel = `${modifier.hex === "00" ? "" : `${modifier.label}+`}${key.key}`;
  const editorCommand = `${keystrokeCommand}F100${keystrokeCommand}`;
  const codeLabel = symbologyTargets.map((item) => item.label).join("、");
  const lengthLabel = pairedLengthConditions.length >= 2
    ? pairedLengthConditions.map((pair) => `${pair.target.label}${pair.length}桁`).join("、")
    : readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = pairedLengthConditions.length >= 2
    ? pairedLengthConditions.map((pair) => `${pair.target.codeId}${String(pair.length).padStart(4, "0")} は${pair.target.label}${pair.length}桁を対象にする指定です。`).join(" ")
    : readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-prefix-suffix-b5-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${keystrokeCommand}`,
    label: `${codeLabel}・${lengthLabel} 先頭と末尾に${keystrokeLabel}を付加`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、読み取りデータの先頭と末尾に${keystrokeLabel}キーを付加します。`,
    keywords: [],
    command: buildDataFormatCommandFromBlocks(buildTargetBlocksForPairedLengths(normalizedQuery, symbologyTargets, readLengths, editorCommand)),
    notes: [
      `0 は Primary Data Format、099 は全端末、${symbologyTargets.map((item) => `${item.codeId} は ${item.label}`).join("、")} を表す指定です。`,
      lengthNote,
      `${keystrokeCommand} は ${keystrokeLabel} キー入力、F100 は読み取りデータを全て出力する指定です。`,
      "B5コマンドはUSB-HID使用時のみ有効です。RS232CやUSB-COMインターフェイス設定では使用できません。",
    ],
  };
}

function buildTrimLeadingZeroesCommand(query) {
  const normalizedQuery = normalizeText(query);
  const mentionsLeading = ["先頭", "頭", "前方"].some((word) => normalizedQuery.includes(normalizeText(word)));
  const mentionsZero = /(^|[^\d])0($|[^\d])/.test(normalizedQuery) || ["ゼロ", "zero"].some((word) => normalizedQuery.includes(normalizeText(word)));
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
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
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
    .replace(/プレフィックス/g, "プリフィックス")
    .replace(/\s+/g, " ")
    .trim();
}

function stringToAsciiHex(value) {
  return [...value].map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("");
}

function encodeAppendTextWithControlTokens(value) {
  const asciiValue = normalizeAsciiText(value).replace(/\s*\+\s*/g, "+");
  if (!asciiValue) return null;

  const hexParts = [];
  const labelParts = [];
  const parts = asciiValue.split("+").filter(Boolean);
  if (parts.length === 0) return null;

  for (const part of parts) {
    const control = normalizeInsertControlToken(part);
    if (control && /^[A-Za-z]+$/.test(part)) {
      hexParts.push(control.hex);
      labelParts.push(control.label);
      continue;
    }

    if (!/^[\x20-\x7E]+$/.test(part)) return null;
    hexParts.push(stringToAsciiHex(part));
    labelParts.push(part);
  }

  const byteCount = hexParts.join("").length / 2;
  if (byteCount < 1 || byteCount > 9999) return null;
  return {
    label: labelParts.join("+"),
    hex: hexParts.join(""),
    byteCount,
  };
}

function normalizeInsertControlToken(value) {
  const normalized = normalizeText(value);
  if (["tab", "タブ", "ht"].includes(normalized)) return { label: "TAB", hex: "09" };
  if (["cr", "enter", "エンター"].includes(normalized)) return { label: "ENTER", hex: "0D" };
  if (["lf", "ラインフィード"].includes(normalized)) return { label: "LF", hex: "0A" };
  if (["crlf", "cr+lf", "cr lf", "改行コード"].includes(normalized)) return { label: "CRLF", hex: "0D0A" };
  if (["sp", "space", "スペース", "空白"].includes(normalized)) return { label: "スペース", hex: "20" };
  if (["esc", "escape", "エスケープ"].includes(normalized)) return { label: "ESC", hex: "1B" };
  if (["bs", "backspace", "バックスペース"].includes(normalized)) return { label: "BS", hex: "08" };
  const functionCode = functionCodeTable.find((item) => {
    const code = normalizeText(item.code);
    const display = normalizeText(item.display || "");
    const aliases = (item.aliases || []).map(normalizeText);
    return normalized === code || normalized === display || aliases.includes(normalized);
  });
  if (functionCode) return { label: functionCode.display || functionCode.code, hex: functionCode.hex };
  const characterCode = normalizeReplaceCharacter(value);
  if (characterCode) {
    return {
      label: describeReplaceCharacter(characterCode),
      hex: characterCode.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"),
    };
  }
  return null;
}

function findDelayMilliseconds(query) {
  const asciiQuery = normalizeAsciiText(query);
  const millisecondMatch = asciiQuery.match(/(\d{1,5})\s*(?:m\s*秒|ms|ミリ秒)/i);
  if (millisecondMatch) {
    const milliseconds = Number(millisecondMatch[1]);
    if (Number.isInteger(milliseconds) && milliseconds >= 5 && milliseconds <= 49995 && milliseconds % 5 === 0) {
      return milliseconds;
    }
    return null;
  }

  const secondMatch = asciiQuery.match(/(\d{1,2}(?:\.\d+)?)\s*秒/);
  if (secondMatch) {
    const milliseconds = Math.round(Number(secondMatch[1]) * 1000);
    if (Number.isInteger(milliseconds) && milliseconds >= 5 && milliseconds <= 49995 && milliseconds % 5 === 0) {
      return milliseconds;
    }
  }

  return null;
}

function buildOutputControlDelayCommand(query) {
  const normalizedQuery = normalizeText(query);
  const asciiQuery = normalizeAsciiText(query);
  const mentionsAllOutput = /(全桁|全データ|すべて|全て|読み取りデータ)\s*(?:を)?\s*(?:出力|送信|表示)/.test(normalizedQuery);
  const mentionsDelay = /(ディレイ|delay|待機|m\s*秒|ms|ミリ秒|\d+(?:\.\d+)?\s*秒)/i.test(asciiQuery);
  if (!mentionsAllOutput || !mentionsDelay) return null;

  const control = /cr\s*\+?\s*lf|crlf|改行コード/i.test(asciiQuery)
    ? { label: "CRLF", hex: "0D0A" }
    : normalizeInsertControlToken((asciiQuery.match(/(?:後|あと|付加|挿入)\s*(CR|LF|TAB|ENTER|エンター|CRLF)/i) || [])[1] || "");
  const delayMs = findDelayMilliseconds(query);
  if (!control || !delayMs) return null;

  const delayCount = delayMs / 5;
  if (!Number.isInteger(delayCount) || delayCount < 1 || delayCount > 9999) return null;
  const delayCommand = `EF${String(delayCount).padStart(4, "0")}`;
  const insertCommand = control.hex.length === 2
    ? `F1${control.hex}`
    : `BA${String(control.hex.length / 2).padStart(4, "0")}${control.hex}`;
  const editorCommand = `F100${insertCommand}${delayCommand}`;
  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-output-${control.hex}-delay-${delayMs}`,
    label: `${codeLabel}・${lengthLabel} 全桁出力後${control.label}と${delayMs}msディレイ`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータを全桁出力後、${control.label}を付加して${delayMs}ms待機します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `F100 は読み取りデータを全て出力し、${insertCommand} は ${control.label} を挿入する指定です。`,
      `${delayCommand} は5ms単位で${delayCount}回、つまり${delayMs}ms待機する指定です。`,
    ],
  };
}

function findMultiPositionControlInsertions(query) {
  const asciiQuery = normalizeAsciiText(query);
  const tokenPattern = "TAB|タブ|HT|CR|ENTER|エンター|SP|SPACE|スペース|空白|ESC|エスケープ|BS|バックスペース|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus|カンマ|comma|gs|gsコード|gsキャラクタ|gsキャラクター|group separator|グループセパレータ|[!-~]";
  const pattern = new RegExp(`(\\d{1,2})\\s*桁目\\s*(?:に|へ)?\\s*(${tokenPattern})\\s*(?:を)?\\s*(?:(\\d{1,2})\\s*(?:回|個))?\\s*(?:付加|追加|つける|付ける|挿入)?`, "gi");
  const insertions = [];
  let match;

  while ((match = pattern.exec(asciiQuery)) !== null) {
    const control = normalizeInsertControlToken(match[2]);
    if (!control) continue;
    insertions.push({ position: Number(match[1]), count: Number(match[3] || 1), ...control });
  }

  const uniqueInsertions = [];
  const seen = new Set();
  insertions
    .filter((item) => Number.isInteger(item.position) && item.position >= 2 && item.position <= 99)
    .sort((a, b) => a.position - b.position)
    .forEach((item) => {
      const key = `${item.position}-${item.hex}-${item.count}`;
      if (seen.has(key)) return;
      seen.add(key);
      uniqueInsertions.push(item);
    });

  return uniqueInsertions;
}

function findRepeatedSuffixControlInsertion(query) {
  const asciiQuery = normalizeAsciiText(query);
  if (/\d{1,2}\s*桁目/.test(asciiQuery)) return null;
  const tokenPattern = "TAB|タブ|HT|CR|ENTER|エンター|SP|SPACE|スペース|空白|ESC|エスケープ|BS|バックスペース|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus|カンマ|comma|gs|gsコード|gsキャラクタ|gsキャラクター|group separator|グループセパレータ|[!-~]";
  const pattern = new RegExp(`(?:末尾|最後|データ末尾|サフィックス|suffix)?\\s*(${tokenPattern})\\s*(?:を)?\\s*(\\d{1,2})\\s*(?:回|個)\\s*(?:付加|追加|つける|付ける|挿入)`, "i");
  const match = asciiQuery.match(pattern);
  if (!match) return null;

  const control = normalizeInsertControlToken(match[1]);
  const count = Number(match[2]);
  if (!control || !Number.isInteger(count) || count < 2 || count > 99) return null;
  return { count, ...control };
}

function buildRepeatedSuffixControlInsertCommand(query) {
  const normalizedQuery = normalizeText(query);
  const insertion = findRepeatedSuffixControlInsertion(query);
  const mentionsOutput = /(出力|送信|表示|読み取り|読取)/.test(normalizedQuery);
  if (!insertion || !mentionsOutput) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const editorCommand = `F100F4${insertion.hex}${String(insertion.count).padStart(2, "0")}`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-repeated-suffix-${insertion.hex}-${insertion.count}`,
    label: `${codeLabel}・${lengthLabel} ${insertion.label}を${insertion.count}回付加して出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータを出力してから${insertion.label}を${insertion.count}回付加します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `F100 は読み取りデータを全て出力し、F4${insertion.hex}${String(insertion.count).padStart(2, "0")} で${insertion.label}を${insertion.count}回付加します。`,
    ],
  };
}

function findSegmentedSendInsertSequence(query) {
  const asciiQuery = normalizeAsciiText(query);
  const mentionsRemainder = hasSegmentedSendInsertRemainder(query);

  const tokenPattern = "TAB|タブ|HT|CR|ENTER|エンター|SP|SPACE|スペース|空白|ESC|エスケープ|BS|バックスペース|スラッシュ|slash|ピリオド|ドット|period|dot|ハイフン|hyphen|マイナス|minus|カンマ|comma|gs|gsコード|gsキャラクタ|gsキャラクター|group separator|グループセパレータ|[!-~]";
  const segments = asciiQuery.split(/\s*(?:、|,|，|\n)\s*/).map((segment) => segment.trim()).filter(Boolean);
  const steps = [];

  for (let index = 0; index < segments.length - 1; index += 1) {
    const countMatch = segments[index].match(/(\d{1,2})\s*桁\s*(?:を)?\s*(?:送信|出力|表示)/);
    if (!countMatch) continue;

    const insertPattern = new RegExp(`^\\s*(${tokenPattern})\\s*(?:(\\d{1,2})\\s*(?:回|個))?\\s*(?:を)?\\s*(?:挿入|付加|追加|つける|付ける)`, "i");
    const insertMatch = segments[index + 1].match(insertPattern);
    if (!insertMatch) continue;

    const insertion = normalizeInsertControlToken(insertMatch[1]);
    const count = Number(countMatch[1]);
    const insertCount = insertMatch[2] ? Number(insertMatch[2]) : 1;
    if (!insertion || !Number.isInteger(count) || count < 1 || count > 99) return [];
    if (!Number.isInteger(insertCount) || insertCount < 1 || insertCount > 99) return [];
    steps.push({ count, insertCount, ...insertion });
    index += 1;
  }

  if (steps.length === 0 && /[+＋]/.test(asciiQuery)) {
    const plusPattern = new RegExp(`(\\d{1,2})\\s*桁\\s*(?:を)?\\s*(?:送信|出力|表示)?\\s*[+＋]\\s*(${tokenPattern})\\s*(?:(\\d{1,2})\\s*(?:回|個))?(?=\\s*(?:[+＋]|設定|送信|出力|表示|$))`, "gi");
    let match;
    while ((match = plusPattern.exec(asciiQuery)) !== null) {
      const insertion = normalizeInsertControlToken(match[2]);
      const count = Number(match[1]);
      const insertCount = match[3] ? Number(match[3]) : 1;
      if (!insertion || !Number.isInteger(count) || count < 1 || count > 99) return [];
      if (!Number.isInteger(insertCount) || insertCount < 1 || insertCount > 99) return [];
      steps.push({ count, insertCount, ...insertion });
    }
  }

  if (!mentionsRemainder && steps.length < 2) return [];
  return steps;
}

function hasSegmentedSendInsertRemainder(query) {
  const asciiQuery = normalizeAsciiText(query);
  return /(残り|残余|以降|末尾まで|最後まで)\s*(?:の)?\s*(?:読み取りデータ|読取データ|データ|桁)?\s*(?:を)?\s*(?:送信|出力|表示)/.test(asciiQuery);
}

function buildSegmentedSendInsertEditorCommand(steps, includeRemainder = false) {
  const parts = steps.map((step) => {
    const sendCount = String(step.count).padStart(2, "0");
    const insertCount = step.insertCount || 1;
    if (insertCount > 1) return `F2${sendCount}00F4${step.hex}${String(insertCount).padStart(2, "0")}`;
    return `F2${sendCount}${step.hex}`;
  });
  return `${parts.join("")}${includeRemainder ? "F100" : ""}`;
}

function buildSegmentedSendInsertCommand(query) {
  const normalizedQuery = normalizeText(query);
  const steps = findSegmentedSendInsertSequence(query);
  const mentionsOutput = /(出力|送信|表示|読み取り|読取|設定)/.test(normalizedQuery);
  if (steps.length === 0 || !mentionsOutput) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const includeRemainder = hasSegmentedSendInsertRemainder(query);
  const editorCommand = buildSegmentedSendInsertEditorCommand(steps, includeRemainder);
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";
  const stepLabel = steps.map((step) => `${step.count}桁送信後に${step.label}${step.insertCount > 1 ? `${step.insertCount}個` : ""}`).join("、");

  return {
    id: `df-generated-segmented-send-insert-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${editorCommand}`,
    label: `${codeLabel}・${lengthLabel} ${stepLabel}を挿入`,
    category: "登録例",
    summary: `${codeLabel}を対象に、${stepLabel}を挿入して出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      ...steps.map((step) => {
        if (step.insertCount > 1) {
          return `F2${String(step.count).padStart(2, "0")}00 は現在位置から${step.count}桁を送信し、F4${step.hex}${String(step.insertCount).padStart(2, "0")} で${step.label}を${step.insertCount}個追加する指定です。`;
        }
        return `F2${String(step.count).padStart(2, "0")}${step.hex} は現在位置から${step.count}桁を送信し、${step.label}を追加する指定です。`;
      }),
      ...(includeRemainder ? ["F100 は続きの読み取りデータを全て送信する指定です。"] : []),
    ],
  };
}

function buildMultiPositionControlInsertCommand(query) {
  const normalizedQuery = normalizeText(query);
  const insertions = findMultiPositionControlInsertions(query);
  const mentionsOutput = /(出力|送信|表示|読み取り|読取)/.test(normalizedQuery);
  if (insertions.length < 2 && !insertions.some((item) => item.count > 1)) return null;
  if (!mentionsOutput) return null;

  let cursorPosition = 1;
  const commandParts = [];
  const notes = [];
  for (const insertion of insertions) {
    const sendCount = insertion.position - cursorPosition;
    if (sendCount < 0 || sendCount > 99) return null;
    const sendCountHex = sendCount.toString().padStart(2, "0");
    if (insertion.count > 1) {
      commandParts.push(`F2${sendCountHex}00F4${insertion.hex}${String(insertion.count).padStart(2, "0")}`);
    } else {
      commandParts.push(`F2${sendCountHex}${insertion.hex}`);
    }
    notes.push(`${insertion.position}桁目に${insertion.label}${insertion.count > 1 ? `${insertion.count}個` : ""}`);
    cursorPosition = insertion.position + insertion.count;
  }

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const editorCommand = `${commandParts.join("")}F100`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-multi-control-insert-${insertions.map((item) => `${item.position}-${item.hex}`).join("-")}`,
    label: `${codeLabel}・${lengthLabel} ${notes.join("、")}を付加して出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの${notes.join("、")}を付加して出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      ...insertions.map((item, index) => {
        const previousPosition = index === 0 ? 1 : insertions[index - 1].position + insertions[index - 1].count;
        const sendCount = item.position - previousPosition;
        if (item.count > 1) {
          return `F2${String(sendCount).padStart(2, "0")}00 で現在位置から${sendCount}桁を出力し、F4${item.hex}${String(item.count).padStart(2, "0")} で${item.label}を${item.count}個付加します。`;
        }
        return `F2${String(sendCount).padStart(2, "0")}${item.hex} は現在位置から${sendCount}桁を出力し、${item.label}を付加する指定です。`;
      }),
      "F100 は最後の付加後に残りの読み取りデータを全て出力する指定です。",
    ],
  };
}

function hasPlainTextAppendTarget(query) {
  const asciiQuery = normalizeAsciiText(query);
  if (/(?:ctrl|control|コントロール|alt|shift)/i.test(asciiQuery)) return false;
  if (/(?:^|[^A-Za-z0-9])F(?:1[0-2]|[1-9])\s*(?:キー|key)/i.test(asciiQuery)) return false;
  if (hasExplicitB5KeyAppendTarget(query)) return false;
  return /(?:先頭|データ先頭|末尾|データ末尾|プリフィックス|プレフィックス|サフィックス|prefix|suffix|\d{1,2}\s*桁目)\s*(?:設定)?\s*(?:に|へ|で)?\s*(?:文字列)?\s*[A-Za-z0-9+ ]{2,40}\s*(?:の)?\s*(?:文字列入力|文字列)?\s*(?:を)?\s*(?:付加|追加|つける|付ける|挿入|設定|の場合)?/i.test(asciiQuery);
}

function hasExplicitB5KeyAppendTarget(query) {
  const normalizedQuery = normalizeText(query);
  if (/(文字列|文字入力|テキスト)/.test(normalizedQuery)) return false;

  const key = findB5KeyForAppend(query);
  if (!key) return false;

  if (normalizedQuery.includes("キー") || /\bkey\b/i.test(normalizedQuery)) return true;
  return key.key.length > 1 && normalizedQuery.includes(normalizeText(key.key));
}

function findPrefixText(query) {
  const asciiQuery = normalizeAsciiText(query);
  const patterns = [
    /(?:先頭|データ先頭|プリフィックス|プレフィックス|prefix)\s*(?:設定)?\s*(?:に|へ|で)?\s*文字列\s*([A-Za-z0-9]{1,20})\s*(?:を)?\s*(?:付加|追加|つける|付ける|挿入|設定)/i,
    /(?:先頭|データ先頭|プリフィックス|プレフィックス|prefix)\s*(?:設定)?\s*(?:に|へ|で)?\s*([A-Za-z0-9]{1,20})\s*(?:の)?\s*文字列入力\s*(?:を)?\s*(?:付加|追加|つける|付ける|挿入|設定)?/i,
    /(?:先頭|データ先頭|プリフィックス|プレフィックス|prefix)\s*(?:に|へ)?\s*([A-Za-z0-9]{1,20})\s*(?:を)?\s*(?:付加|追加|つける|付ける|挿入)/i,
    /(?:文字列)\s*([A-Za-z0-9]{1,20})\s*(?:を)?\s*(?:先頭|データ先頭|プリフィックス|プレフィックス|prefix).*(?:付加|追加|つける|付ける|挿入|設定)/i,
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
  const mentionsOutput = /(出力|送信|表示|読み取り|読取|設定)/.test(normalizedQuery);
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
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `BA${textLength}${textHex} は ${prefixText} を現在位置、つまりデータ先頭に挿入する指定です。`,
      "F100 は挿入後に読み取りデータを全て出力する指定です。",
    ],
  };
}

function findSuffixText(query) {
  const asciiQuery = normalizeAsciiText(query);
  if (/(?:キー入力|キー|key|ctrl|control|コントロール|alt|shift)/i.test(asciiQuery)) return "";
  const tokenPattern = "[A-Za-z0-9][A-Za-z0-9+ ]{0,40}";
  const patterns = [
    new RegExp(`(?:末尾|データ末尾|サフィックス|suffix)\\s*(?:設定)?\\s*(?:に|へ|で)?\\s*(?:文字列)?\\s*(${tokenPattern})\\s*(?:の)?\\s*(?:文字列入力|文字列)?\\s*(?:を)?\\s*(?:付加|追加|つける|付ける|挿入|設定|の場合)?`, "i"),
    new RegExp(`(?:文字列)\\s*(${tokenPattern})\\s*(?:を)?\\s*(?:末尾|データ末尾|サフィックス|suffix).*(?:付加|追加|つける|付ける|挿入|設定)`, "i"),
  ];

  for (const pattern of patterns) {
    const match = asciiQuery.match(pattern);
    if (!match) continue;
    const text = match[1].trim().replace(/\s+/g, "");
    if (encodeAppendTextWithControlTokens(text)) return text;
  }

  return "";
}

function buildSuffixTextCommand(query) {
  const normalizedQuery = normalizeText(query);
  const suffixText = findSuffixText(query);
  const encoded = suffixText ? encodeAppendTextWithControlTokens(suffixText) : null;
  const mentionsOutput = /(出力|送信|表示|読み取り|読取|設定|場合)/.test(normalizedQuery);
  if (!encoded || !mentionsOutput) return null;

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const textLength = String(encoded.byteCount).padStart(4, "0");
  const editorCommand = `F100BA${textLength}${encoded.hex}`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-suffix-text-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-${encoded.hex}`,
    label: `${codeLabel}・${lengthLabel} 末尾に${encoded.label}を付加して出力`,
    category: "登録例",
    summary: `${codeLabel}を対象に、読み取りデータの末尾へ${encoded.label}を付加して出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    notes: [
      `${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      "F100 は読み取りデータを全て出力する指定です。",
      `BA${textLength}${encoded.hex} は ${encoded.label} をデータ末尾に挿入する指定です。`,
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
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
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
    const rawKeyMatches = key.length === 1
      ? new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(key)}(?:キー|key)(?=$|[^a-z0-9])`, "i").test(normalizedQuery)
      : normalizedQuery.includes(key);
    return rawKeyMatches || aliases.some((alias) => alias.length > 1 && normalizedQuery.includes(alias));
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
    command: buildDataFormatCommandFromIntentConditions(query, `F100${delay.command}B501${modifier.hex}${key.hex}`),
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
    command: buildDataFormatCommandFromIntentConditions(query, `FB${suppressCount}${targetHex}F7F5${cursorHex}F2${countHex}00`),
    notes: [
      `${codeId} は${codeLabel}を表す指定です。${lengthNote}`,
      `FB${suppressCount}${targetHex} は ${targetLabel} を削除する指定です。`,
      "F7 は削除後にカーソルを先頭へ戻す指定です。",
      `F5${cursorHex} でカーソルを${cursorMove}桁移動し、F2${countHex}00 でそこから${characterCount}桁を送信します。`,
    ],
  };
}

function buildDeleteThenLeadingCommand(query) {
  const normalizedQuery = normalizeText(query);
  const leadingMatch = normalizedQuery.match(/(?:先頭|最初)(?:から)?\s*(\d{1,4})\s*桁/);
  const mentionsDelete = ["削除", "除去", "消す", "消して"].some((word) => normalizedQuery.includes(normalizeText(word)));

  if (!leadingMatch || !mentionsDelete || !/(出力|送信|表示|取り出|切り出|ください)/.test(normalizedQuery)) return null;

  const targetChars = findDeleteTargetCharacters(query);
  const characterCount = Number(leadingMatch[1]);
  if (
    targetChars.length === 0 ||
    !Number.isInteger(characterCount) ||
    characterCount < 1 ||
    characterCount > 9999
  ) {
    return null;
  }

  const symbologyTargets = getSymbologyTargets(normalizedQuery);
  const readLengths = getReadLengths(normalizedQuery);
  const targetHex = targetChars.map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join("");
  const suppressCount = targetChars.length.toString().padStart(2, "0");
  const targetLabel = targetChars.map(describeReplaceCharacter).join("と");
  const outputCommand = splitSendCounts(characterCount).map((count) => `F2${String(count).padStart(2, "0")}00`).join("");
  const editorCommand = `FB${suppressCount}${targetHex}F7${outputCommand}`;
  const codeLabel = symbologyTargets.length === 1 ? symbologyTargets[0].label : symbologyTargets.map((item) => item.label).join("と");
  const lengthLabel = readLengths.length > 0 ? `${readLengths.join("桁と")}桁読み取り時` : "全桁数";
  const lengthNote = readLengths.length > 0
    ? `${readLengths.map((length) => String(length).padStart(4, "0")).join("、")} は${readLengths.join("桁と")}桁のバーコードだけを対象にする指定です。`
    : "9999 は全桁数を表す指定です。";

  return {
    id: `df-generated-delete-${targetHex}-${symbologyTargets.map((item) => item.codeId).join("-")}-${readLengths.join("-") || "9999"}-first-${characterCount}`,
    label: `${codeLabel}・${lengthLabel} ${targetLabel}を削除後 先頭${characterCount}桁を出力`,
    category: "登録例",
    summary: `${codeLabel}・${lengthLabel}を対象に、${targetLabel}を削除してから先頭${characterCount}桁を出力します。`,
    keywords: [],
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
    skipGenerationValidation: true,
    notes: [
      `0 は Primary Data Format、099 は全端末、${symbologyTargets.map((item) => `${item.codeId} は${item.label}`).join("、")}を表す指定です。${lengthNote}`,
      `FB${suppressCount}${targetHex} は ${targetLabel} を削除する指定です。`,
      "F7 は削除後にカーソルを先頭へ戻す指定です。",
      `${outputCommand} は先頭から${characterCount}桁を送信する指定です。99桁を超える場合はF2を分割します。`,
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
    command: buildDataFormatCommandFromIntentConditions(query, editorCommand),
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

const chatLogStorageKey = "honDataFormatChatLogs";
const chatLogLimit = 1000;

function addMessage(role, content, options = {}) {
  if (!content) return null;
  if (!messages || !template) return null;

  const node = template.content.firstElementChild.cloneNode(true);
  node.classList.add(role);
  const bubble = node.querySelector(".bubble");
  const statusText = options.status ? String(options.status) : "";

  if (statusText) {
    const status = document.createElement("span");
    status.className = "message-status";
    status.textContent = statusText;
    node.classList.add("has-status");
    node.insertBefore(status, bubble);
  }

  if (options.html) {
    bubble.innerHTML = content;
  } else {
    bubble.textContent = content;
  }

  messages.append(node);
  renderAztecBarcodes(bubble);
  messages.scrollTop = messages.scrollHeight;
  return node;
}

function addBotResponse(question, content, options = {}) {
  addMessage("bot", content, options);
  saveChatbotLog(question, content, options);
}

function setMessageStatus(messageNode, statusText) {
  if (!messageNode) return;
  const status = messageNode.querySelector(".message-status");
  if (!status) return;
  status.textContent = statusText || "";
  status.hidden = !statusText;
  messageNode.classList.toggle("has-status", Boolean(statusText));
  messages.scrollTop = messages.scrollHeight;
}

function setAnswerInputLocked(locked) {
  isAnswering = locked;
  if (input) input.disabled = locked;
  if (sendButton) sendButton.disabled = locked;
  if (form) form.setAttribute("aria-busy", locked ? "true" : "false");
  if (messages) messages.setAttribute("aria-busy", locked ? "true" : "false");

  samplePrompts.forEach((button) => {
    button.disabled = locked;
  });

  document.querySelectorAll(".quick-action").forEach((button) => {
    button.disabled = locked;
  });
}

function saveChatbotLog(question, answerContent, options = {}) {
  if (!question || !answerContent) return;
  const logEntry = {
    createdAt: new Date().toISOString(),
    question: String(question),
    answer: normalizeLogAnswer(answerContent, options),
  };

  try {
    const logs = JSON.parse(localStorage.getItem(chatLogStorageKey) || "[]");
    logs.push(logEntry);

    localStorage.setItem(chatLogStorageKey, JSON.stringify(logs.slice(-chatLogLimit)));
  } catch (_error) {
    // ログ保存に失敗してもチャット回答は継続します。
  }

  saveRemoteChatbotLog(logEntry);
}

async function saveRemoteChatbotLog(logEntry) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return;

  try {
    await fetch(`${url}/rest/v1/chatbot_logs`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        created_at: logEntry.createdAt,
        question: logEntry.question,
        answer: logEntry.answer,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      }),
    });
  } catch (_error) {
    // Supabaseへ保存できない場合も、ローカルログとチャット回答は継続します。
  }
}

function normalizeLogAnswer(content, options = {}) {
  const text = options.html ? htmlToPlainText(content) : String(content);
  return text.replace(/\s+/g, " ").trim();
}

function htmlToPlainText(html) {
  const container = document.createElement("div");
  container.innerHTML = html;
  return container.textContent || "";
}

function commandToHtml(item) {
  if (item.validationFailed) {
    return `
      <div class="command-card">
        <strong>生成前チェックで確認が必要です</strong>
        <p>Intent理解JSONと生成コマンドの条件が一致しなかったため、バーコード生成を停止しました。</p>
        <ul>
          ${item.validationErrors.map((error) => `<li>${escapeHtml(error)}</li>`).join("")}
        </ul>
      </div>
    `;
  }

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
        <div class="barcode-contact">
          <p>生成された設定バーコード読み取り後、ご希望通りに動作しない場合は下記にご連絡ください。</p>
          <p class="contact-mail">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            <span>infohp@imagers.co.jp</span>
          </p>
        </div>
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

function validateGeneratedCommand(item, intentUnderstanding) {
  if (!item || !intentUnderstanding || intentUnderstanding.intent !== "data_format_setting") return item;
  if (item.skipGenerationValidation) return item;

  const command = normalizeSettingCommand(item.command);
  if (/FB[0-9A-F]{2}[0-9A-F]+F7F2[0-9]{2}00/i.test(command)) return item;
  const validationErrors = [];
  const targetConditions = intentUnderstanding.targetConditions || [];
  const conditionsToCheck = getValidationTargetConditions(targetConditions);

  conditionsToCheck.forEach((condition) => {
    const conditionPrefix = `0099${condition.codeId}${condition.lengthField}`;
    if (!command.includes(conditionPrefix)) {
      validationErrors.push(`${condition.label}${condition.length}桁の条件 ${conditionPrefix} がありません。`);
    }
  });

  intentUnderstanding.actions.forEach((action) => {
    const expectedEditorCommands = getExpectedEditorCommandsForAction(action);
    if (expectedEditorCommands.length === 0) return;

    const checkTargets = conditionsToCheck.length > 0 ? conditionsToCheck : targetConditions;
    checkTargets.forEach((condition) => {
      const conditionPrefix = `0099${condition.codeId}${condition.lengthField}`;
      expectedEditorCommands.forEach((expectedEditorCommand) => {
        const expectedBlock = `${conditionPrefix}${expectedEditorCommand}`;
        if (!command.includes(expectedBlock) && !command.includes(expectedEditorCommand)) {
          validationErrors.push(`${condition.label}${condition.length}桁の編集コマンド ${expectedEditorCommand} が一致しません。`);
        }
      });
    });
  });

  const fullEditorCommands = getExpectedFullEditorCommands(intentUnderstanding.actions);
  fullEditorCommands.forEach((editorCommand) => {
    const checkTargets = conditionsToCheck.length > 0 ? conditionsToCheck : [];
    checkTargets.forEach((condition) => {
      const expectedBlock = `0099${condition.codeId}${condition.lengthField}${editorCommand}`;
      if (!command.includes(expectedBlock)) {
        validationErrors.push(`${condition.label}${condition.length}桁の編集コマンド全体 ${editorCommand} が一致しません。`);
      }
    });
  });

  if (validationErrors.length > 0) {
    return {
      id: "df-validation-failed",
      label: "生成前チェックで不一致",
      category: "確認",
      summary: "生成したコマンドがIntent理解JSONの条件と一致しませんでした。",
      keywords: [],
      command: "",
      validationFailed: true,
      validationErrors,
    };
  }

  return {
    ...item,
    notes: [
      ...buildGenerationCheckNotes(intentUnderstanding),
      ...(item.notes || []),
    ],
  };
}

function getExpectedEditorCommandsForAction(action) {
  if (action.type === "prefix_key") return [`${action.command}F100`];
  if (action.type === "suffix_key") return [`F100${action.command}`];
  if (action.type === "replace") return [action.editorCommand || `E402${action.sourceHex}${action.targetHex}`];
  if (action.type === "delete") return [`FB${String((action.hex || "").length / 2).padStart(2, "0")}${action.hex}`];
  if (action.type === "output_from_position_to_end") {
    return [`${buildCursorMoveCommand(action.startPosition - 1)}F100`];
  }
  if (action.type === "output_leading") {
    return splitSendCounts(action.characterCount).map((count) => `F2${String(count).padStart(2, "0")}00`);
  }
  if (action.type === "remove_trailing") return [`E9${String(action.characterCount).padStart(2, "0")}`];
  if (action.type === "suffix_repeated_character") return [action.command];
  if (action.type === "segmented_send_insert") return [action.editorCommand];
  if (action.type === "zero_suppress") return ["E630F100"];
  return [];
}

function getValidationTargetConditions(targetConditions) {
  const pairedConditions = targetConditions.filter((condition) => condition.source === "paired");
  if (pairedConditions.length >= 2) return pairedConditions;

  const explicitCodeConditions = targetConditions.filter((condition) => condition.codeId !== "99");
  const uniqueExplicitCodes = new Set(explicitCodeConditions.map((condition) => condition.codeId));
  if (uniqueExplicitCodes.size >= 2) return explicitCodeConditions;

  const explicitConditions = targetConditions.filter((condition) =>
    condition.codeId !== "99" &&
    condition.lengthField &&
    condition.lengthField !== "9999"
  );
  if (explicitConditions.length >= 1) return explicitConditions;

  return [];
}

function getExpectedFullEditorCommands(actions) {
  const deleteAction = actions.find((action) => action.type === "delete");
  const fromAction = actions.find((action) => action.type === "output_from_position_to_end");
  if (deleteAction && fromAction) {
    return [`FB${String((deleteAction.hex || "").length / 2).padStart(2, "0")}${deleteAction.hex}F7${buildCursorMoveCommand(fromAction.startPosition - 1)}F100`];
  }

  const leadingAction = actions.find((action) => action.type === "output_leading");
  if (deleteAction && leadingAction) {
    const outputCommand = splitSendCounts(leadingAction.characterCount).map((count) => `F2${String(count).padStart(2, "0")}00`).join("");
    return [`FB${String((deleteAction.hex || "").length / 2).padStart(2, "0")}${deleteAction.hex}F7${outputCommand}`];
  }

  const rangeAction = actions.find((action) => action.type === "output_ranges");
  if (rangeAction) {
    let cursorPosition = 1;
    const parts = [];
    for (const range of rangeAction.ranges) {
      const cursorMove = range.startPosition - cursorPosition;
      if (cursorMove < 0) return [];
      parts.push(`${buildCursorMoveCommand(cursorMove)}F2${String(range.characterCount).padStart(2, "0")}00`);
      cursorPosition = range.startPosition + range.characterCount;
    }
    return [parts.join("")];
  }

  return [];
}

function buildGenerationCheckNotes(intentUnderstanding) {
  const notes = [];
  const pairedConditions = (intentUnderstanding.targetConditions || []).filter((condition) => condition.source === "paired");
  if (pairedConditions.length >= 2) {
    notes.push(`生成前チェック: ${pairedConditions.map((condition) => `${condition.label}${condition.length}桁=${condition.codeId}${condition.lengthField}`).join("、")} の条件ペアを確認しました。`);
  }

  intentUnderstanding.actions.forEach((action) => {
    if (action.type === "prefix_key") {
      notes.push(`生成前チェック: 先頭付加のため ${action.command}F100 の順序を確認しました。`);
    } else if (action.type === "suffix_key") {
      notes.push(`生成前チェック: 末尾付加のため F100${action.command} の順序を確認しました。`);
    } else if (action.type === "remove_trailing") {
      notes.push(`生成前チェック: 末尾${action.characterCount}桁削除のため E9${String(action.characterCount).padStart(2, "0")} を確認しました。`);
    } else if (action.type === "segmented_send_insert") {
      notes.push(`生成前チェック: 分割送信と挿入の編集コマンド ${action.editorCommand} を確認しました。`);
    }
  });

  return notes;
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

function describeHexCharacter(hex) {
  const normalizedHex = String(hex || "").toUpperCase();
  const labels = {
    "08": "BS",
    "0A": "LF",
    "09": "TAB",
    "0D": "CR",
    "1B": "ESC",
    "1D": "GS",
    "20": "スペース",
    "23": "#",
    "2C": "カンマ",
    "2D": "ハイフン",
    "2E": "ピリオド",
    "2F": "スラッシュ",
  };
  if (labels[normalizedHex]) return labels[normalizedHex];

  const codePoint = parseInt(normalizedHex, 16);
  if (Number.isFinite(codePoint) && codePoint >= 0x21 && codePoint <= 0x7e) {
    return String.fromCharCode(codePoint);
  }

  return normalizedHex;
}

function describeInsertedHexString(textHex) {
  const normalizedHex = String(textHex || "").toUpperCase();
  const bytes = normalizedHex.match(/.{2}/g) || [];
  if (bytes.length === 0) return normalizedHex;

  const allPrintable = bytes.every((hex) => {
    const codePoint = parseInt(hex, 16);
    return Number.isFinite(codePoint) && codePoint >= 0x21 && codePoint <= 0x7e;
  });

  if (allPrintable) {
    return bytes.map((hex) => String.fromCharCode(parseInt(hex, 16))).join("");
  }

  return `${bytes.map(describeHexCharacter).join("")} (${normalizedHex})`;
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

    if (code === "F3" && index + 6 <= commandHex.length) {
      const targetHex = commandHex.slice(index + 2, index + 4).toUpperCase();
      const insertHex = commandHex.slice(index + 4, index + 6).toUpperCase();
      descriptions.push(`F3${targetHex}${insertHex}: 現在位置から ${describeHexCharacter(targetHex)} が出現する手前までを出力します${insertHex === "00" ? "" : `。最後に ${describeHexCharacter(insertHex)} を追加します`}`);
      index += 6;
      continue;
    }

    if (code === "F1" && index + 4 <= commandHex.length) {
      const insertHex = commandHex.slice(index + 2, index + 4).toUpperCase();
      descriptions.push(`F1${insertHex}: 現在位置から末尾までを出力します${insertHex === "00" ? "" : `。最後に ${insertHex} を追加します`}`);
      index += 4;
      continue;
    }

    if (code === "FE" && index + 4 <= commandHex.length) {
      const targetHex = commandHex.slice(index + 2, index + 4).toUpperCase();
      descriptions.push(`FE${targetHex}: 現在位置の文字が ${describeHexCharacter(targetHex)} と一致するか比較し、一致時にカーソルを1桁進めます。`);
      cursorPosition += 1;
      index += 4;
      continue;
    }

    if (code === "F7") {
      descriptions.push("F7: カーソルを読み取りデータの先頭へ戻します。");
      cursorPosition = 1;
      index += 2;
      continue;
    }

    if (code === "F8" && index + 4 <= commandHex.length) {
      const targetHex = commandHex.slice(index + 2, index + 4).toUpperCase();
      descriptions.push(`F8${targetHex}: 現在位置から ${describeHexCharacter(targetHex)} が出現する手前までカーソルを移動します。`);
      index += 4;
      continue;
    }

    if (code === "E9" && index + 4 <= commandHex.length) {
      const count = Number(commandHex.slice(index + 2, index + 4));
      descriptions.push(`E9${commandHex.slice(index + 2, index + 4)}: 現在位置から末尾までのうち、最後の${count}桁を除いたデータを出力します。`);
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
      const length = 4 + count * 2;
      const pairs = [];
      let offset = index + 4;
      for (let pairIndex = 0; pairIndex < Math.floor(count / 2) && offset + 4 <= commandHex.length; pairIndex += 1) {
        const sourceHex = commandHex.slice(offset, offset + 2).toUpperCase();
        const targetHex = commandHex.slice(offset + 2, offset + 4).toUpperCase();
        pairs.push(`${describeHexCharacter(sourceHex)}を${describeHexCharacter(targetHex)}に置換します。`);
        offset += 4;
      }
      descriptions.push(`${commandHex.slice(index, index + length)}: ${pairs.join("、")}`);
      index += length;
      continue;
    }

    if (code === "BA" && index + 6 <= commandHex.length) {
      const count = Number(commandHex.slice(index + 2, index + 6));
      const hexStart = index + 6;
      const hexEnd = hexStart + count * 2;
      const textHex = commandHex.slice(hexStart, hexEnd).toUpperCase();
      const text = describeInsertedHexString(textHex);
      descriptions.push(`BA${commandHex.slice(index + 2, hexEnd)}: 現在位置に文字列 ${text} を挿入します。`);
      index = hexEnd;
      continue;
    }

    if (code === "FB" && index + 4 <= commandHex.length) {
      const count = Number(commandHex.slice(index + 2, index + 4));
      const length = 4 + count * 2;
      const targets = [];
      let offset = index + 4;
      for (let targetIndex = 0; targetIndex < count && offset + 2 <= commandHex.length; targetIndex += 1) {
        const targetHex = commandHex.slice(offset, offset + 2).toUpperCase();
        targets.push(`${describeHexCharacter(targetHex)}のキャラクタを無効化します。`);
        offset += 2;
      }
      descriptions.push(`${commandHex.slice(index, index + length)}: ${targets.join("、")}`);
      index += length;
      continue;
    }

    descriptions.push(`${code}: 未対応または解析できない編集コマンドです。`);
    index += 2;
  }

  return descriptions;
}

function describeAdminCommand(command) {
  const normalizedCommand = normalizeSettingCommand(command).toUpperCase();
  const item = commandCatalog.find((entry) => normalizeSettingCommand(entry.command).toUpperCase() === normalizedCommand);
  return item ? `${normalizedCommand}: ${item.label}。${item.summary}` : `${normalizedCommand}: 管理コマンドです。`;
}

function explainDataFormatCommandToHtml(rawCommand) {
  const command = normalizeSettingCommand(rawCommand).replace(/\s+/g, "").toUpperCase();
  const commandParts = command.replace(/\.$/, "").split(";").filter(Boolean);
  const hasClearCommand = commandParts[0] === "DFMDF3";
  const dataFormatCommand = commandParts.find((part) => part.startsWith("DFMBK3"));
  if (!dataFormatCommand) return "";
  const adminCommands = commandParts
    .filter((part) => part !== dataFormatCommand && part !== "DFMDF3")
    .map(normalizeSettingCommand);

  const fragments = dataFormatCommand.split("|");
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
  const adminHtml = adminCommands.length > 0
    ? `<div class="df-explain-condition"><strong>追加設定</strong><ol>${adminCommands.map((part) => `<li>${escapeHtml(describeAdminCommand(part))}</li>`).join("")}</ol></div>`
    : "";

  return `
    <div class="command-card">
      <div>
        <div class="command-title">設定コマンドの内容</div>
        <div class="command-code">
          <span>${escapeHtml(command)}</span>
          <button
            type="button"
            class="copy-command"
            data-command="${escapeHtml(command)}"
            title="コマンドをコピー"
            aria-label="コマンドをコピー"
          >${icons.copy}</button>
        </div>
      </div>
      ${hasClearCommand ? "<p>先頭の DFMDF3; により、現在のデータフォーマット設定を削除してから登録します。</p>" : ""}
      ${conditionHtml}
      ${adminHtml}
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

function getIntentApiUrl() {
  if (window.HON_INTENT_API_URL) return window.HON_INTENT_API_URL;
  const { url } = getSupabaseConfig();
  return url ? `${url}/functions/v1/understand-intent` : "";
}

function getRecentConversationHistory() {
  try {
    const logs = JSON.parse(localStorage.getItem(chatLogStorageKey) || "[]");
    if (!Array.isArray(logs)) return [];
    return logs.slice(-6).map((log) => ({
      question: String(log.question || "").slice(0, 300),
      answer: String(log.answer || "").slice(0, 500),
    }));
  } catch (_error) {
    return [];
  }
}

function getRelatedCatalogHints(question) {
  return findMatches(question).slice(0, 8).map((item) => ({
    label: item.label,
    summary: item.summary,
    requestText: item.requestText || "",
    keywords: item.keywords || [],
  }));
}

function getKnownSymbologyHints() {
  return symbologyCodeTable.map((item) => ({
    label: item.label,
    codeId: item.codeId,
    aliases: item.aliases || [],
  }));
}

function normalizeLlmIntentResult(value) {
  if (!value || typeof value !== "object") return null;
  const confidence = Number(value.confidence);
  return {
    intent: String(value.intent || "unknown"),
    confidence: Number.isFinite(confidence) ? Math.max(0, Math.min(1, confidence)) : 0,
    canonicalQuery: String(value.canonicalQuery || "").trim(),
    targetSymbologies: Array.isArray(value.targetSymbologies) ? value.targetSymbologies : [],
    readLengths: Array.isArray(value.readLengths) ? value.readLengths : [],
    actions: Array.isArray(value.actions) ? value.actions : [],
    detailedIntent: normalizeLlmDetailedIntent(value.detailedIntent),
    missingSlots: Array.isArray(value.missingSlots) ? value.missingSlots : [],
    clarifyingQuestion: value.clarifyingQuestion ? String(value.clarifyingQuestion).trim() : "",
    reason: String(value.reason || ""),
  };
}

function normalizeLlmDetailedIntent(value) {
  if (!value || typeof value !== "object") {
    return { targets: [], operations: [], preservedTerms: [] };
  }

  return {
    targets: Array.isArray(value.targets) ? value.targets.map((target) => ({
      symbology: String(target?.symbology || "").trim(),
      codeId: target?.codeId == null ? null : String(target.codeId).trim().toUpperCase(),
      length: Number.isInteger(Number(target?.length)) ? Number(target.length) : null,
    })).filter((target) => target.symbology || target.codeId || target.length != null) : [],
    operations: Array.isArray(value.operations) ? value.operations.map((operation) => ({
      type: String(operation?.type || "unknown"),
      target: operation?.target == null ? null : String(operation.target),
      position: Number.isInteger(Number(operation?.position)) ? Number(operation.position) : null,
      length: Number.isInteger(Number(operation?.length)) ? Number(operation.length) : null,
      value: operation?.value == null ? null : String(operation.value),
      replacement: operation?.replacement == null ? null : String(operation.replacement),
      count: Number.isInteger(Number(operation?.count)) ? Number(operation.count) : null,
      segments: Array.isArray(operation?.segments) ? operation.segments.map((segment) => ({
        sendLength: Number.isInteger(Number(segment?.sendLength)) ? Number(segment.sendLength) : null,
        insertValue: segment?.insertValue == null ? null : String(segment.insertValue),
      })) : [],
    })) : [],
    preservedTerms: Array.isArray(value.preservedTerms) ? value.preservedTerms.map((term) => String(term).trim()).filter(Boolean) : [],
  };
}

async function loadLlmIntentUnderstanding(question, options = {}) {
  const apiUrl = getIntentApiUrl();
  const { anonKey } = getSupabaseConfig();
  if (!apiUrl) return null;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        ...(anonKey ? { apikey: anonKey, Authorization: `Bearer ${anonKey}` } : {}),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        ...(options.modelOverride ? { modelOverride: options.modelOverride } : {}),
        conversationHistory: getRecentConversationHistory(),
        relatedCatalogHints: getRelatedCatalogHints(question),
        knownSymbologies: getKnownSymbologyHints(),
      }),
    });

    if (!response.ok) return null;
    return normalizeLlmIntentResult(await response.json());
  } catch (_error) {
    return null;
  }
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

function buildFirstCommandCandidate(question, intentUnderstanding = buildIntentUnderstanding(question)) {
  const builders = [
    buildMultiClauseCommand,
    buildReplaceThenRangeCommand,
    buildReplaceThenDeleteCommand,
    buildTrimLeadingZeroesCommand,
    buildRemoveTrailingCharactersCommand,
    buildPrefixValueFilterCommand,
    buildOutputControlDelayCommand,
    buildSegmentedSendInsertCommand,
    buildRepeatedSuffixControlInsertCommand,
    buildMultiPositionControlInsertCommand,
    buildInsertTextAtPositionCommand,
    buildPrefixSuffixB5Command,
    buildPrefixB5Command,
    buildPrefixTextCommand,
    buildSuffixTextCommand,
    buildDeleteThenRangeCommand,
    buildDeleteThenLeadingCommand,
    buildDeleteThenFromPositionToEndCommand,
    () => buildCommandFromStructuredNlp(question, intentUnderstanding),
    buildSymbologyDelayKeyCommand,
    buildSuffixB5Command,
    (value) => findExactSpaceTransformCommand(value) || findExactTransformCommand(value),
    findExactDeleteCharacterCommand,
    buildSearchUntilCharacterCommand,
    buildUntilCharacterCommand,
    buildOutputAfterNthCharacterCommand,
    buildRangeCharactersCommand,
    buildFromPositionToEndCommand,
    buildLeadingCharactersCommand,
  ];

  for (const builder of builders) {
    const item = builder(question);
    if (item?.command) return item;
  }

  const matches = findMatches(question);
  return matches.length === 1 ? matches[0] : null;
}

async function buildFallbackGpt41Command(originalQuestion) {
  const llmIntent = await loadLlmIntentUnderstanding(originalQuestion, { modelOverride: "gpt-4.1" });
  if (!llmIntent || llmIntent.intent !== "data_format_setting") return null;
  if (llmIntent.confidence < 0.7 && llmIntent.clarifyingQuestion) return null;

  const question = chooseLlmEffectiveQuestion(originalQuestion, llmIntent);
  const intentUnderstanding = buildIntentUnderstanding(question);
  const item = buildFirstCommandCandidate(question, intentUnderstanding);
  return item ? { question, intentUnderstanding, item, llmIntent } : null;
}

async function answerQuestion(question) {
  const originalQuestion = question;

  if (isEmptyDataFormatCommand(question)) {
    addBotResponse(originalQuestion, "現在はデータフォーマット設定されていません。");
    return;
  }

  if (isDataFormatCommandText(question)) {
    const explanationHtml = explainDataFormatCommandToHtml(question);
    addBotResponse(originalQuestion, explanationHtml || barcodeUnavailableHtml, { html: true });
    return;
  }

  const exactAdminMatches = findExactAdminCommandMatches(question);
  if (exactAdminMatches.length === 1) {
    const intentUnderstanding = buildIntentUnderstanding(question);
    const shouldClearSettings = shouldClearSettingsBeforeCommand(question);
    const item = validateGeneratedCommand(applyClearSettingsPrefix(exactAdminMatches[0], shouldClearSettings), intentUnderstanding);
    if (!item?.validationFailed) {
      addBotResponse(originalQuestion, commandToHtml(item), { html: true });
      return;
    }
  }

  const llmIntent = await loadLlmIntentUnderstanding(question);
  if (llmIntent?.intent === "data_format_setting" && llmIntent.confidence < 0.7 && llmIntent.clarifyingQuestion) {
    setPendingClarification("llm_intent", question, { llmIntent });
    addBotResponse(originalQuestion, `
      <div class="command-card">
        <strong>確認が必要です</strong>
        <p>${escapeHtml(llmIntent.clarifyingQuestion)}</p>
      </div>
    `, { html: true });
    return;
  }

  question = chooseLlmEffectiveQuestion(question, llmIntent);

  const shouldClearSettings = shouldClearSettingsBeforeCommand(originalQuestion) || shouldClearSettingsBeforeCommand(question);
  const intentUnderstanding = buildIntentUnderstanding(question);
  const commandHtml = async (item) => {
    const checked = validateGeneratedCommand(applyClearSettingsPrefix(item, shouldClearSettings), intentUnderstanding);
    if (!checked?.validationFailed) return commandToHtml(checked);

    const fallback = await buildFallbackGpt41Command(originalQuestion);
    if (fallback?.item && fallback?.intentUnderstanding) {
      const fallbackShouldClear = shouldClearSettingsBeforeCommand(originalQuestion) || shouldClearSettingsBeforeCommand(fallback.question);
      const fallbackChecked = validateGeneratedCommand(
        applyClearSettingsPrefix(fallback.item, fallbackShouldClear),
        fallback.intentUnderstanding
      );
      if (!fallbackChecked?.validationFailed) return commandToHtml(fallbackChecked);
    }

    return commandToHtml(checked);
  };
  const functionKeyTextAmbiguityHtml = buildFunctionKeyTextAmbiguityHtml(question);
  const multiClauseCommand = buildMultiClauseCommand(question);
  const structuredNlpCommand = buildCommandFromStructuredNlp(question, intentUnderstanding);
  const replaceThenRangeCommand = buildReplaceThenRangeCommand(question);
  const trimLeadingZeroesCommand = buildTrimLeadingZeroesCommand(question);
  const removeTrailingCharactersCommand = buildRemoveTrailingCharactersCommand(question);
  const prefixValueFilterCommand = buildPrefixValueFilterCommand(question);
  const outputControlDelayCommand = buildOutputControlDelayCommand(question);
  const repeatedSuffixControlInsertCommand = buildRepeatedSuffixControlInsertCommand(question);
  const segmentedSendInsertCommand = buildSegmentedSendInsertCommand(question);
  const multiPositionControlInsertCommand = buildMultiPositionControlInsertCommand(question);
  const insertTextAtPositionCommand = buildInsertTextAtPositionCommand(question);
  const prefixSuffixB5Command = buildPrefixSuffixB5Command(question);
  const prefixB5Command = buildPrefixB5Command(question);
  const prefixTextCommand = buildPrefixTextCommand(question);
  const suffixTextCommand = buildSuffixTextCommand(question);
  const suffixB5Command = buildSuffixB5Command(question);
  const symbologyDelayKeyCommand = buildSymbologyDelayKeyCommand(question);
  const exactTransformCommand = findExactSpaceTransformCommand(question) || findExactTransformCommand(question);
  const deleteThenRangeCommand = buildDeleteThenRangeCommand(question);
  const deleteThenLeadingCommand = buildDeleteThenLeadingCommand(question);
  const deleteThenFromPositionToEndCommand = buildDeleteThenFromPositionToEndCommand(question);
  const exactDeleteCommand = findExactDeleteCharacterCommand(question);
  const searchUntilCharacterCommand = buildSearchUntilCharacterCommand(question);
  const untilCharacterCommand = buildUntilCharacterCommand(question);
  const outputAfterNthCharacterCommand = buildOutputAfterNthCharacterCommand(question);
  const generatedRangeCommand = buildRangeCharactersCommand(question);
  const fromPositionToEndCommand = buildFromPositionToEndCommand(question);
  const generatedLeadingCommand = buildLeadingCharactersCommand(question);
  const efDelayMatches = findEfDelays(question);
  const b5ModifierMatches = findB5Modifiers(question);
  const b5KeyMatches = findB5Keys(question);
  const matches = findMatches(question);

  if (functionKeyTextAmbiguityHtml) {
    setPendingClarification("function_key_text", question, { key: getAmbiguousFunctionKeyAppend(question) });
    addBotResponse(originalQuestion, functionKeyTextAmbiguityHtml, { html: true });
    return;
  }

  if (multiClauseCommand) {
    addBotResponse(originalQuestion, await commandHtml(multiClauseCommand), { html: true });
    return;
  }

  if (replaceThenRangeCommand) {
    addBotResponse(originalQuestion, await commandHtml(replaceThenRangeCommand), { html: true });
    return;
  }

  if (trimLeadingZeroesCommand) {
    addBotResponse(originalQuestion, await commandHtml(trimLeadingZeroesCommand), { html: true });
    return;
  }

  if (removeTrailingCharactersCommand) {
    addBotResponse(originalQuestion, await commandHtml(removeTrailingCharactersCommand), { html: true });
    return;
  }

  if (prefixValueFilterCommand) {
    addBotResponse(originalQuestion, await commandHtml(prefixValueFilterCommand), { html: true });
    return;
  }

  if (outputControlDelayCommand) {
    addBotResponse(originalQuestion, await commandHtml(outputControlDelayCommand), { html: true });
    return;
  }

  if (segmentedSendInsertCommand) {
    addBotResponse(originalQuestion, await commandHtml(segmentedSendInsertCommand), { html: true });
    return;
  }

  if (repeatedSuffixControlInsertCommand) {
    addBotResponse(originalQuestion, await commandHtml(repeatedSuffixControlInsertCommand), { html: true });
    return;
  }

  if (multiPositionControlInsertCommand) {
    addBotResponse(originalQuestion, await commandHtml(multiPositionControlInsertCommand), { html: true });
    return;
  }

  if (insertTextAtPositionCommand) {
    addBotResponse(originalQuestion, await commandHtml(insertTextAtPositionCommand), { html: true });
    return;
  }

  if (prefixSuffixB5Command) {
    addBotResponse(originalQuestion, await commandHtml(prefixSuffixB5Command), { html: true });
    return;
  }

  if (prefixB5Command) {
    addBotResponse(originalQuestion, await commandHtml(prefixB5Command), { html: true });
    return;
  }

  if (prefixTextCommand) {
    addBotResponse(originalQuestion, await commandHtml(prefixTextCommand), { html: true });
    return;
  }

  if (suffixTextCommand) {
    addBotResponse(originalQuestion, await commandHtml(suffixTextCommand), { html: true });
    return;
  }

  if (deleteThenRangeCommand) {
    addBotResponse(originalQuestion, await commandHtml(deleteThenRangeCommand), { html: true });
    return;
  }

  if (deleteThenLeadingCommand) {
    addBotResponse(originalQuestion, await commandHtml(deleteThenLeadingCommand), { html: true });
    return;
  }

  if (deleteThenFromPositionToEndCommand) {
    addBotResponse(originalQuestion, await commandHtml(deleteThenFromPositionToEndCommand), { html: true });
    return;
  }

  if (structuredNlpCommand) {
    addBotResponse(originalQuestion, await commandHtml(structuredNlpCommand), { html: true });
    return;
  }

  if (symbologyDelayKeyCommand) {
    addBotResponse(originalQuestion, await commandHtml(symbologyDelayKeyCommand), { html: true });
    return;
  }

  if (suffixB5Command) {
    addBotResponse(originalQuestion, await commandHtml(suffixB5Command), { html: true });
    return;
  }

  if (exactTransformCommand) {
    addBotResponse(originalQuestion, await commandHtml(exactTransformCommand), { html: true });
    return;
  }

  if (exactDeleteCommand) {
    addBotResponse(originalQuestion, await commandHtml(exactDeleteCommand), { html: true });
    return;
  }

  if (searchUntilCharacterCommand) {
    addBotResponse(originalQuestion, await commandHtml(searchUntilCharacterCommand), { html: true });
    return;
  }

  if (untilCharacterCommand) {
    addBotResponse(originalQuestion, await commandHtml(untilCharacterCommand), { html: true });
    return;
  }

  if (outputAfterNthCharacterCommand) {
    addBotResponse(originalQuestion, await commandHtml(outputAfterNthCharacterCommand), { html: true });
    return;
  }

  if (generatedRangeCommand) {
    addBotResponse(originalQuestion, await commandHtml(generatedRangeCommand), { html: true });
    return;
  }

  if (fromPositionToEndCommand) {
    addBotResponse(originalQuestion, await commandHtml(fromPositionToEndCommand), { html: true });
    return;
  }

  if (generatedLeadingCommand) {
    addBotResponse(originalQuestion, await commandHtml(generatedLeadingCommand), { html: true });
    return;
  }

  if (efDelayMatches.length > 0) {
    addBotResponse(originalQuestion, efDelaysToHtml(efDelayMatches), { html: true });
    return;
  }

  if (b5ModifierMatches.length > 0) {
    addBotResponse(originalQuestion, b5ModifiersToHtml(b5ModifierMatches), { html: true });
    return;
  }

  if (b5KeyMatches.length > 0) {
    addBotResponse(originalQuestion, b5KeysToHtml(b5KeyMatches), { html: true });
    return;
  }

  if (matches.length === 0) {
    if (shouldAskClarification(intentUnderstanding)) {
      setPendingClarification("general", question, { intentUnderstanding });
      addBotResponse(originalQuestion, buildClarificationHtml(intentUnderstanding), { html: true });
      return;
    }

    addBotResponse(originalQuestion, barcodeUnavailableHtml, { html: true });
    return;
  }

  if (matches.length > 1) {
    addBotResponse(originalQuestion, barcodeUnavailableHtml, { html: true });
    return;
  }

  addBotResponse(originalQuestion, (await Promise.all(matches.map(commandHtml))).join(""), { html: true });
}

function submitQuestion(question) {
  if (isAnswering) return;
  const trimmed = question.trim();
  if (!trimmed) return;
  const resolvedQuestion = resolvePendingClarification(trimmed);

  setAnswerInputLocked(true);
  const userMessage = addMessage("user", trimmed, { status: "確認中..." });
  if (input) input.value = "";
  window.setTimeout(() => {
    answerQuestion(resolvedQuestion)
      .catch(() => addBotResponse(trimmed, barcodeUnavailableHtml, { html: true }))
      .finally(() => {
        setMessageStatus(userMessage, "");
        setAnswerInputLocked(false);
        input?.focus();
      });
  }, 180);
}

function submitCommandItem(item) {
  if (isAnswering) return;
  setAnswerInputLocked(true);
  addMessage("user", item.label);
  if (input) input.value = "";
  window.setTimeout(() => {
    addMessage("bot", commandToHtml(item), { html: true });
    setAnswerInputLocked(false);
    input?.focus();
  }, 180);
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

samplePrompts.forEach((button) => {
  button.addEventListener("click", () => {
    submitQuestion(button.dataset.samplePrompt || "");
  });
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
