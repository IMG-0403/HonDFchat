# HON DATA FORMAT

スキャナの Data Format 設定内容を質問すると、設定コマンド候補を返す静的 Web アプリです。
初期データは Honeywell Xenon XP 系マニュアルの Data Format 章、特に PDF 103P 周辺の内容を元にしています。

## GitHub Pages + Supabaseで使う方法

静的ファイルはGitHub Pagesへアップロードします。

```text
index.html
styles.css
app.js
config.js
HonASCII.pdf
HonDataFormat.pdf
```

設定バーコード生成APIはSupabase Edge Functionsへデプロイします。

```powershell
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy barcode --no-verify-jwt
```

デプロイ後、`config.js` のURLを自分のSupabaseプロジェクトに変更してください。

```js
window.HON_BARCODE_API_URL = "https://YOUR_PROJECT_REF.supabase.co/functions/v1/barcode";
```

ローカルPCだけで使う場合は、従来どおり `barcode-server.ps1` を起動して `config.js` のURLを `http://127.0.0.1:8765/barcode` に変更してください。

## コマンド表の編集

設定コマンドは `app.js` の `commandCatalog` に定義しています。

- `label`: 画面に表示する設定名
- `category`: 設定カテゴリ
- `summary`: 短い説明
- `keywords`: 質問文に反応させるキーワード
- `command`: 回答する設定コマンド
- `notes`: 補足説明

実機のメーカー、型番、ファームウェアに合わせて `command` と `keywords` を差し替えてください。

## 対象範囲

この版では、Prefix/Suffix や接続方式ではなく Data Format に絞っています。

- Default / Show / Enter Data Format
- Clear One / Clear All Data Formats
- Data Formatter の有効化モード
- Data Format Non-Match Error Tone
- 登録例: 全データ送信 + Enter、全データ送信 + Tab
- 応用例: QR読み取り時のみ先頭10桁を出力
- 応用例: QRの20桁読み取り時のみ先頭10桁を出力
- 応用例: Code128の20桁読み取り時のみ先頭10桁を出力
- 自動生成: コード種・読取桁数指定なしの「先頭N桁のみ出力」
- 応用例: OCR読み取り時のみハイフンとスペースを削除
- 応用例: 全コード種・全桁数でGSコードをスラッシュに置換
- 応用例: 全コード種・全桁数でGSコードをスペースに置換
- 自動生成: 全コード種・全桁数で任意の1文字を任意の1文字に置換
- 自動生成: 全コード種・全桁数で任意の1文字を削除
- 自動生成: 任意の1文字を削除後、カーソルを先頭に戻して指定範囲を出力
- 応用例: 全コード種・全桁数で先頭に Ctrl+Shift+F5 を付加
- 応用例: Code128限定で全桁対象の先頭に b21 を付加
- ファンクションコード Hex/ASCII表: HT(TAB) `09`、CR `0D`、GS `1D` など
- キャラクター Hex/ASCII表: SPACE `20` から `~` `7E` まで
- B5キーマップ表: Ctrl、Shift、F1-F12、矢印キーなど
- コード種ID表: QR Code `73`、Code128 `6A`、Code39 `62`、Data Matrix `77` など
- Data Format Editor コマンド表: F1/F2/F5/F7/E4/FB に加え、F3/B9/E9/F4/BA/F8/F9/B0/B1/E6/E7/FE/B2/EC/ED/EF など

## コマンド表記

末尾の `.` は不揮発メモリへ保存する指定です。
画面上のコマンド表示では、`DFMBK...` や `DEFALT.` などの設定コマンドだけを表示します。

## 設定用バーコード

チャットボットがコマンドを回答する時、同時に設定用バーコードを生成します。
バーコードに入れるデータは次の形式です。

```text
コマンド + .
```

`DEFALT.` の正しいサンプルに合わせ、先頭の `SYN M CR` は付加しません。
AZTEC生成には ZXing core を使い、設定バーコードとして認識されるように Reader Initialization のモード情報を付加します。
Supabase版は `supabase/functions/barcode/index.ts` でTypeScript版ZXingを使います。
ローカルPowerShell版の `barcode-server.ps1` は、`lib\core-3.4.1.jar` またはローカルのGradleキャッシュから ZXing core を探します。

## 注意事項

`B5` コマンドは USB-HID 使用時のみ有効です。
RS232C や USB-COM インターフェイス設定では使用できません。
