const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

function loadAppContext(options = {}) {
  const code = fs.readFileSync("app.js", "utf8");
  const noop = () => {};
  const sequenceEntries = options.sequenceEntries || [
    { codeId: "62", length: "", char1: "", char2: "", char3: "" },
    { codeId: "6A", length: "", char1: "", char2: "", char3: "" },
  ];
  const appendSequenceInput = { checked: Boolean(options.appendSequenceToDataFormat), addEventListener: noop };
  const sequenceModeSelect = { value: options.sequenceMode || "1" };
  const dataFormatDefaultModeSelect = { value: options.dataFormatDefaultOn ? "on" : "off", addEventListener: noop };
  const dataFormatterModeSelect = { value: options.dataFormatterMode || "DFM_EN1", addEventListener: noop };
  const dataFormatErrorToneSelect = { value: options.dataFormatErrorTone || "DFMDEC0", addEventListener: noop };
  const sequenceItems = {
    textContent: "",
    append: noop,
    addEventListener: noop,
    querySelectorAll: () => sequenceEntries.map((entry) => ({
      querySelector: (selector) => {
        const field = selector.match(/data-sequence-field='([^']+)'/)?.[1] || "";
        return { value: entry[field] || "" };
      },
    })),
  };
  const elements = {
    "#appendSequenceToDataFormat": appendSequenceInput,
    "#sequenceMode": sequenceModeSelect,
    "#sequenceItems": sequenceItems,
    "#addSequenceItem": { disabled: false, addEventListener: noop },
    "#generateSequenceCommand": { addEventListener: noop },
    ...(options.enableDataFormatSettings ? {
      "#dataFormatDefaultMode": dataFormatDefaultModeSelect,
      "#dataFormatterMode": dataFormatterModeSelect,
      "#dataFormatErrorTone": dataFormatErrorToneSelect,
      "#dataFormatSettingsToggle": { getAttribute: () => "false", setAttribute: noop, textContent: "", addEventListener: noop },
      "#dataFormatSettingsBody": { hidden: true },
    } : {}),
  };
  const context = {
    console,
    navigator: { userAgent: "node-test" },
    URL,
    Blob,
    setTimeout,
    clearTimeout,
    localStorage: {
      getItem: () => null,
      setItem: noop,
    },
    fetch: options.fetch || (async () => ({ ok: true, json: async () => [] })),
    window: {
      setTimeout,
      clearTimeout,
      requestAnimationFrame: (fn) => fn(),
      open: noop,
      location: { href: "http://localhost/test" },
      isSecureContext: false,
      HON_SUPABASE_URL: options.supabaseUrl || "",
      HON_SUPABASE_ANON_KEY: options.supabaseAnonKey || "",
    },
    document: {
      body: { classList: { contains: () => false }, append: noop },
      querySelector: () => null,
      createElement: () => {
        const fields = {};
        return {
          innerHTML: "",
          textContent: "",
          addEventListener: noop,
          append: noop,
          select: noop,
          remove: noop,
          style: {},
          querySelector: (selector) => {
            if (!fields[selector]) fields[selector] = { value: "", addEventListener: noop };
            return fields[selector];
          },
        };
      },
      execCommand: () => false,
    },
  };
  context.document.querySelector = (selector) => elements[selector] || null;
  context.localStorage.getItem = (key) => {
    if (key === "honAppendSequenceToDataFormat") return options.appendSequenceToDataFormat ? "1" : "0";
    return null;
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

function checkedCommand(app, question, builderName) {
  const intent = app.buildIntentUnderstanding(question);
  const item = app[builderName](question);
  assert.ok(item, `${builderName} should generate a command`);
  const checked = app.validateGeneratedCommand(item, intent);
  assert.equal(checked.validationFailed, undefined, checked.validationErrors?.join("\n"));
  return checked.command;
}

test("data comparison toggle points to the existing form", () => {
  const html = fs.readFileSync("index.html", "utf8");
  const controlsId = html.match(/id="dataCompareToggle"[^>]*aria-controls="([^"]+)"/)?.[1];
  assert.equal(controlsId, "dataCompareForm");
  assert.match(html, new RegExp(`id="${controlsId}"`));
  assert.doesNotMatch(html.match(/<input id="dataCompareInsertion"[^>]*>/)?.[0] || "", /checked/);
  assert.match(html, /id="dataCompareExtraction"/);
});

test("data comparison starts with all codes and optional conditions disabled", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(html, /<option value="all" selected>全てのコード<\/option>/);
  assert.doesNotMatch(html.match(/<input id="dataCompareExactLength"[^>]*>/)?.[0] || "", /checked/);
  assert.doesNotMatch(html.match(/<input id="dataCompareInsertion"[^>]*>/)?.[0] || "", /checked/);
  assert.doesNotMatch(html.match(/<input id="dataCompareExtraction"[^>]*>/)?.[0] || "", /checked/);

  const app = loadAppContext();
  assert.match(String(app.initializeDataCompareDefaults), /dataCompareTargetMode\.value = "all"/);
  assert.match(String(app.initializeDataCompareDefaults), /dataCompareExactLength\.checked = false/);
  assert.match(String(app.initializeDataCompareDefaults), /dataCompareInsertion\.checked = false/);
  assert.match(String(app.initializeDataCompareDefaults), /dataCompareExtraction\.checked = false/);
});

test("successful data comparison collapses the builder before showing its barcode", () => {
  const app = loadAppContext();
  assert.match(String(app.submitDataComparisonForm), /setDataCompareExpanded\(false\)/);
  assert.match(String(app.setDataCompareExpanded), /dataCompareBody\.hidden = !expanded/);
});

test("paired QR and Code128 conditions are preserved for key prefix/suffix", () => {
  const app = loadAppContext();
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時データ先頭にCTRL+ALT+F4付加して出力", "buildPrefixB5Command"),
    "DFMBK30099730010B5011473F100|00996A0020B5011473F100."
  );
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時データ末尾にCTRL+ALT+F4付加して出力", "buildSuffixB5Command"),
    "DFMBK30099730010F100B5011473|00996A0020F100B5011473."
  );
  assert.equal(
    checkedCommand(app, "Code128読み取り時、データ末尾にCTRL+ALT+F5のキー入力設定", "buildSuffixB5Command"),
    "DFMBK300996A9999F100B5011474."
  );
  assert.equal(
    checkedCommand(app, "プリフィックスにESCキー挿入", "buildPrefixB5Command"),
    "DFMBK30099999999B501006EF100."
  );
  assert.equal(
    checkedCommand(app, "Code128読み取り時プリフィックスにESCキー挿入", "buildPrefixB5Command"),
    "DFMBK300996A9999B501006EF100."
  );
  assert.equal(
    checkedCommand(app, "データの先頭と末尾に半角全角キーを挿入する", "buildPrefixSuffixB5Command"),
    "DFMBK30099999999B5010001F100B5010001."
  );
  assert.equal(
    app.buildFirstCommandCandidate("データの先頭と末尾に半角全角キーを挿入する")?.command,
    "DFMBK30099999999B5010001F100B5010001."
  );
  assert.equal(
    app.buildSuffixTextCommand("Code128読み取り時、データ末尾にCTRL+ALT+F5のキー入力設定"),
    null
  );
  assert.equal(
    checkedCommand(app, "Datamatrixの1桁読み取り時、先頭データが1の場合、F1キー入力設定", "buildPrefixValueB5Command"),
    "DFMBK30099770001FE31B5010070."
  );
  assert.equal(
    app.buildFirstCommandCandidate("Datamatrixの1桁読み取り時、先頭データが1の場合、F1キー入力設定")?.command,
    "DFMBK30099770001FE31B5010070."
  );
  assert.deepEqual(Array.from(app.getReadLengths(app.normalizeText("Datamatrixの桁数が0001のとき"))), [1]);
  assert.equal(
    checkedCommand(
      app,
      "Datamatrixの桁数が0001のとき、データが1の場合、F1キー入力、データが2の場合、F2キー入力設定",
      "buildSingleCharacterValueKeyMappingsCommand"
    ),
    "DFMBK30099770001FE31B5010070|0099770001FE32B5010071."
  );
  assert.equal(
    app.buildFirstCommandCandidate("Datamatrixの桁数が0001のとき、データが1の場合、F1キー入力、データが2の場合、F2キー入力設定")?.command,
    "DFMBK30099770001FE31B5010070|0099770001FE32B5010071."
  );
  assert.equal(
    app.buildFirstCommandCandidate("Datamatrixの桁数が0001のとき、データが1の場合、F1キー入力設定")?.command,
    "DFMBK30099770001FE31B5010070."
  );
  assert.equal(
    checkedCommand(app, "Datamatrixの1桁読み取り時、先頭データがCの場合、読み取りデータは出力せずTABキーを3回入力", "buildPrefixValueRepeatedControlCommand"),
    "DFMBK30099770001FE43F40903."
  );
  assert.equal(
    app.buildFirstCommandCandidate("Datamatrixの1桁読み取り時、先頭データがCの場合、読み取りデータは出力せずTABキーを3回入力")?.command,
    "DFMBK30099770001FE43F40903."
  );
  assert.equal(
    checkedCommand(app, "Datamatrixの1桁読み取り時、先頭データがDの場合、読み取りデータは出力せずENTERキーを2回入力", "buildPrefixValueRepeatedControlCommand"),
    "DFMBK30099770001FE44F40D02."
  );
  assert.equal(
    checkedCommand(app, "Datamatrixの1桁読み取り時、先頭データがEの場合、読み取りデータは出力せずESCキーを2回入力", "buildPrefixValueRepeatedB5Command"),
    "DFMBK30099770001FE45B501006EB501006E."
  );
  assert.equal(
    checkedCommand(app, "Datamatrixの1桁読み取り時、先頭データがFの場合、読み取りデータは出力せずBSキーを2回入力", "buildPrefixValueRepeatedControlCommand"),
    "DFMBK30099770001FE46F40802."
  );
  assert.equal(
    checkedCommand(app, "Datamatrixの1桁読み取り時、先頭データがGの場合、読み取りデータは出力せずスペースキーを2回入力", "buildPrefixValueRepeatedControlCommand"),
    "DFMBK30099770001FE47F42002."
  );
  assert.equal(
    checkedCommand(app, "Datamatrixの1桁読み取り時、先頭データがHの場合、読み取りデータは出力せずF1キーを3回入力", "buildPrefixValueRepeatedB5Command"),
    "DFMBK30099770001FE48B5010070B5010070B5010070."
  );
  assert.equal(
    checkedCommand(app, "Datamatrixの1桁読み取り時、先頭データがIの場合、読み取りデータは出力せず左矢印キーを2回入力", "buildPrefixValueRepeatedB5Command"),
    "DFMBK30099770001FE49B501004FB501004F."
  );
  const dataMatrixFunctionKeyClauses = [
    ["1", "F1", "31", "70"],
    ["2", "F2", "32", "71"],
    ["3", "F3", "33", "72"],
    ["4", "F4", "34", "73"],
    ["5", "F5", "35", "74"],
    ["6", "F6", "36", "75"],
    ["7", "F7", "37", "76"],
    ["8", "F8", "38", "77"],
    ["9", "F9", "39", "78"],
    ["0", "F10", "30", "79"],
    ["A", "F11", "41", "7A"],
    ["B", "F12", "42", "7B"],
  ];
  const multiQuestion = dataMatrixFunctionKeyClauses
    .map(([value, key]) => `Datamatrixの1桁読み取り時、先頭データが${value}の場合、読み取りデータは出力せず${key}キー入力`)
    .join("、");
  const multiExpectedCommand = `DFMBK3${dataMatrixFunctionKeyClauses
    .map(([, , valueHex, keyHex]) => `0099770001FE${valueHex}B50100${keyHex}`)
    .join("|")}.`;
  assert.equal(
    checkedCommand(app, multiQuestion, "buildMultiClauseCommand"),
    multiExpectedCommand
  );
  assert.equal(
    app.buildFirstCommandCandidate(multiQuestion)?.command,
    multiExpectedCommand
  );
});

test("leading output over 99 characters is split into multiple F2 commands", () => {
  const app = loadAppContext();
  assert.equal(
    checkedCommand(app, "QR読み取り時先頭から120桁出力", "buildLeadingCharactersCommand"),
    "DFMBK30099739999F29900F22100."
  );
  assert.equal(
    checkedCommand(app, "MicroQRの12桁と10桁読み取り時、先頭10桁出力設定", "buildLeadingCharactersCommand"),
    "DFMBK30099730012F21000|0099730010F21000."
  );
  assert.equal(
    app.shouldUseLlmCanonicalQuery(
      "MicroQRの12桁と10桁読み取り時、先頭10桁出力設定",
      "MicroQRの10桁読み取り時、先頭10桁出力設定"
    ),
    false
  );
  assert.equal(
    app.shouldClearSettingsBeforeCommand("設定クリアして、MicroQRの12桁と10桁読み取り時、先頭10桁出力設定"),
    false
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、スペース削除して先頭から140桁出力", "buildDeleteThenLeadingCommand"),
    "DFMBK30099739999FB0120F7F29900F24100."
  );
  const catalogItem = app.findMatches("QR読み取り時、スペース削除して先頭から140桁出力")[0];
  assert.equal(catalogItem.command, "DFMBK30099739999FB0120F7F29900F24100.");
  const intent = app.buildIntentUnderstanding("QR読み取り時、スペース削除して先頭から140桁出力");
  assert.equal(JSON.stringify(intent.actions.map((action) => action.type)), JSON.stringify(["delete", "output_leading"]));
  assert.equal(
    app.buildCommandFromStructuredNlp("QR読み取り時、スペース削除して先頭から140桁出力", intent)?.command,
    "DFMBK30099739999FB0120F7F29900F24100."
  );
  assert.equal(
    app.validateGeneratedCommand(catalogItem, intent).validationFailed,
    undefined
  );
});

test("paired conditions are preserved for delete, replace, range, from-position, and zero suppress", () => {
  const app = loadAppContext();
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時ハイフン削除して出力", "findExactDeleteCharacterCommand"),
    "DFMBK30099730010FB012DF100|00996A0020FB012DF100."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、CRを除去して出力", "findExactDeleteCharacterCommand"),
    "DFMBK30099739999FB010DF100."
  );
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時スラッシュをピリオドに置換して出力", "findExactSpaceTransformCommand"),
    "DFMBK30099730010E4022F2EF100|00996A0020E4022F2EF100."
  );
  assert.equal(
    checkedCommand(app, "GS1-128読み取り時、GSキャラクタを#に置き換えて出力設定", "findExactSpaceTransformCommand"),
    "DFMBK30099499999E4021D23F100."
  );
  assert.equal(
    checkedCommand(app, "Code128読み取り時、Aを1に置換、Bを2に置換出力の場合", "findExactSpaceTransformCommand"),
    "DFMBK300996A9999E40441314232F100."
  );
  assert.equal(
    checkedCommand(app, "スペースをTABに置換", "findExactSpaceTransformCommand"),
    "DFMBK30099999999E4022009F100."
  );
  assert.equal(
    checkedCommand(app, "Code128読み取り時スペースをTABに置換", "findExactSpaceTransformCommand"),
    "DFMBK300996A9999E4022009F100."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、データにカンマがあった場合、Enterに変換する。", "findExactSpaceTransformCommand"),
    "DFMBK30099739999E4022C0DF100."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、カンマをCRに置換", "findExactSpaceTransformCommand"),
    "DFMBK30099739999E4022C0DF100."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、カンマをEnterに置換設定の場合", "findExactSpaceTransformCommand"),
    "DFMBK30099739999E4022C0DF100."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、データに「,」があった場合、「CR」に変換する。", "findExactSpaceTransformCommand"),
    "DFMBK30099739999E4022C0DF100."
  );
  assert.equal(
    checkedCommand(app, "スペースをTABに置換、*削除設定", "buildReplaceThenDeleteCommand"),
    "DFMBK30099999999E4022009FB012AF100."
  );
  const replaceDeleteIntent = app.buildIntentUnderstanding("スペースをTABに置換、*削除設定");
  assert.equal(JSON.stringify(replaceDeleteIntent.actions.map((action) => action.type)), JSON.stringify(["replace", "delete"]));
  const wrongReplaceDeleteItem = {
    id: "wrong-replace-delete-missing-delete",
    label: "wrong",
    category: "test",
    summary: "",
    keywords: [],
    command: "DFMBK30099999999E4022009F100.",
  };
  assert.equal(
    app.validateGeneratedCommand(wrongReplaceDeleteItem, replaceDeleteIntent).validationFailed,
    true
  );
  const multiReplaceIntent = app.buildIntentUnderstanding("Code128読み取り時、Aを1に置換、Bを2に置換出力の場合");
  const wrongMultiReplaceItem = {
    id: "wrong-code128-single-replace",
    label: "wrong",
    category: "test",
    summary: "",
    keywords: [],
    command: "DFMBK300996A9999E4024131F100.",
  };
  assert.equal(
    app.validateGeneratedCommand(wrongMultiReplaceItem, multiReplaceIntent).validationFailed,
    true
  );
  assert.equal(
    checkedCommand(app, "gs1-128読み取り時、GSキャラクタを#に置き換えて出力設定", "findExactSpaceTransformCommand"),
    "DFMBK30099499999E4021D23F100."
  );
  assert.equal(
    app.buildFirstCommandCandidate("gs1-128読み取り時にGSをスペースに変換したい")?.command,
    "DFMBK30099499999E4021D20F100."
  );
  assert.equal(
    app.buildFirstCommandCandidate("GS1-128とGS-1DatamatrixのFNC1をスペース文字に置き換え")?.command,
    "DFMBK30099499999E4021D20F100|0099779999E4021D20F100."
  );
  assert.equal(
    app.findMatches("GS1-128とGS-1DatamatrixのFNC1をスペース文字に置き換え")[0]?.command,
    "DFMBK30099499999E4021D20F100|0099779999E4021D20F100."
  );
  const gs1DataMatrixIntent = app.buildIntentUnderstanding("GS1-128とGS-1DatamatrixのFNC1をスペース文字に置き換え");
  const wrongGs1DataMatrixItem = {
    id: "wrong-gs1-datamatrix-fnc1-space",
    label: "wrong",
    category: "test",
    summary: "",
    keywords: [],
    command: "DFMBK30099999999E4021D20F100.",
  };
  assert.equal(
    app.validateGeneratedCommand(wrongGs1DataMatrixItem, gs1DataMatrixIntent).validationFailed,
    true
  );
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時3桁目から5桁出力", "buildRangeCharactersCommand"),
    "DFMBK30099730010F502F20500|00996A0020F502F20500."
  );
  assert.equal(
    checkedCommand(app, "QRの36桁目から29桁出力設定", "buildRangeCharactersCommand"),
    "DFMBK30099739999F535F22900."
  );
  assert.equal(
    checkedCommand(app, "QRの191桁読み取り時、156桁目から9桁と166桁目から7桁出力", "buildRangeCharactersCommand"),
    "DFMBK30099730191F599F556F20900F501F20700."
  );
  assert.equal(
    checkedCommand(app, "CODE39において、先頭3桁目から10桁分の切り出しをして出力する設定", "buildRangeCharactersCommand"),
    "DFMBK30099629999F502F21000."
  );
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時4桁目以降出力", "buildFromPositionToEndCommand"),
    "DFMBK30099730010F503F100|00996A0020F503F100."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、先頭４桁目からデータ出力設定", "buildFromPositionToEndCommand"),
    "DFMBK30099739999F503F100."
  );
  assert.equal(
    app.buildFirstCommandCandidate("QR読み取り時、先頭４桁目からデータ出力設定")?.command,
    "DFMBK30099739999F503F100."
  );
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時0サプレス", "buildTrimLeadingZeroesCommand"),
    "DFMBK30099730010E630F100|00996A0020E630F100."
  );
});

test("trailing data deletion uses E9 with optional symbology and length conditions", () => {
  const app = loadAppContext();
  assert.equal(
    checkedCommand(app, "末尾1桁データ削除", "buildRemoveTrailingCharactersCommand"),
    "DFMBK30099999999E901."
  );
  assert.equal(
    checkedCommand(app, "末尾2桁データ削除", "buildRemoveTrailingCharactersCommand"),
    "DFMBK30099999999E902."
  );
  assert.equal(
    checkedCommand(app, "末尾3桁を送信しない設定", "buildRemoveTrailingCharactersCommand"),
    "DFMBK30099999999E903."
  );
  assert.equal(
    app.buildFirstCommandCandidate("末尾3桁を送信しない設定")?.command,
    "DFMBK30099999999E903."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、末尾2桁データ削除", "buildRemoveTrailingCharactersCommand"),
    "DFMBK30099739999E902."
  );
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時末尾1桁データ削除", "buildRemoveTrailingCharactersCommand"),
    "DFMBK30099730010E901|00996A0020E901."
  );

  const intent = app.buildIntentUnderstanding("QRの10桁とCode128の20桁読み取り時末尾1桁データ削除");
  assert.equal(JSON.stringify(intent.actions.map((action) => action.type)), JSON.stringify(["remove_trailing"]));
  assert.equal(
    app.buildCommandFromStructuredNlp("QRの10桁とCode128の20桁読み取り時末尾1桁データ削除", intent)?.command,
    "DFMBK30099730010E901|00996A0020E901."
  );
});

test("paired conditions are preserved for text prefix and insertion", () => {
  const app = loadAppContext();
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時先頭にABC付加して出力", "buildPrefixTextCommand"),
    "DFMBK30099730010BA0003414243F100|00996A0020BA0003414243F100."
  );
  assert.equal(
    checkedCommand(app, "12桁読み取り時、先頭に00挿入して出力、13桁読み取り時、先頭に0挿入して出力", "buildMultiClauseCommand"),
    "DFMBK30099990012BA00023030F100|0099990013BA000130F100."
  );
  assert.equal(
    checkedCommand(app, "NW-7読み取り時、先頭にABCの文字列入力設定", "buildPrefixTextCommand"),
    "DFMBK30099619999BA0003414243F100."
  );
  assert.equal(
    checkedCommand(app, "NW-7読み取り時、先頭にABCの文字列挿入設定", "buildPrefixTextCommand"),
    "DFMBK30099619999BA0003414243F100."
  );
  assert.equal(app.buildPrefixB5Command("NW-7読み取り時、先頭にABCの文字列入力設定"), null);
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時3桁目にABC付加して出力", "buildInsertTextAtPositionCommand"),
    "DFMBK30099730010F20200BA0003414243F100|00996A0020F20200BA0003414243F100."
  );
});

test("suffix text can include control characters for OCR length conditions", () => {
  const app = loadAppContext();
  assert.equal(
    checkedCommand(app, "JAN13読み取り時、データ末尾にCR付加", "buildSuffixTextCommand"),
    "DFMBK30099649999F10D."
  );
  assert.equal(
    checkedCommand(app, "ソロモンOCR＆16桁読み取り時のみデータ末尾 001+CRの場合", "buildSuffixTextCommand"),
    "DFMBK300994F0016F100BA00043030310D."
  );
  assert.equal(
    checkedCommand(app, "OCR16桁読み取り時データ末尾に001+CR付加して出力", "buildSuffixTextCommand"),
    "DFMBK300994F0016F100BA00043030310D."
  );
  assert.equal(
    checkedCommand(app, "ソロモンOCR＆16桁読み取り時のみデータ末尾 001+CR付加設定の場合", "buildSuffixTextCommand"),
    "DFMBK300994F0016F100BA00043030310D."
  );
});

test("ambiguous function-key text append asks for clarification", () => {
  const app = loadAppContext();
  assert.match(
    app.buildFunctionKeyTextAmbiguityHtml("プリフィックスにF9付加して出力"),
    /F9はキー入力ですか？それとも文字入力ですか？/
  );
  assert.match(
    app.buildFunctionKeyTextAmbiguityHtml("プリフィックス設定でF9を設定"),
    /F9はキー入力ですか？それとも文字入力ですか？/
  );
  assert.match(
    app.buildFunctionKeyTextAmbiguityHtml("プレフィックス設定でF9を設定"),
    /F9はキー入力ですか？それとも文字入力ですか？/
  );
  assert.equal(app.buildFunctionKeyTextAmbiguityHtml("プリフィックスにF9キーを付加して出力"), "");
  assert.equal(app.buildFunctionKeyTextAmbiguityHtml("プリフィックスに文字列F9を付加して出力"), "");
  app.setPendingClarification("function_key_text", "プリフィックスにF9付加して出力", { key: "F9" });
  assert.equal(app.resolvePendingClarification("F9キーです"), "プリフィックスにF9キー付加して出力");
  app.setPendingClarification("function_key_text", "プレフィックス設定でF9を設定", { key: "F9" });
  const resolvedKeyInput = app.resolvePendingClarification("F9キー入力");
  assert.equal(resolvedKeyInput, "プレフィックス設定でF9キーを設定");
  assert.equal(app.buildPrefixB5Command(resolvedKeyInput)?.command, "DFMBK30099999999B5010078F100.");
  app.setPendingClarification("function_key_text", "プレフィックス設定でF9を設定", { key: "F9" });
  const resolvedTextInput = app.resolvePendingClarification("文字列入力です。");
  assert.equal(resolvedTextInput, "プレフィックス設定で文字列F9を設定");
  assert.equal(app.buildPrefixTextCommand(resolvedTextInput)?.command, "DFMBK30099999999BA00024639F100.");
  assert.equal(app.buildPrefixB5Command(resolvedTextInput), null);
  app.setPendingClarification("function_key_text", "プリフィックスにF12付加して出力", { key: "F12" });
  assert.equal(app.resolvePendingClarification("文字です"), "プリフィックスに文字列F12付加して出力");
  app.setPendingClarification("general", "QR読み取り", {});
  assert.equal(app.resolvePendingClarification("ハイフン削除"), "QR読み取り、ハイフン削除");
});

test("until-character output supports spaces and paired conditions", () => {
  const app = loadAppContext();
  assert.equal(
    checkedCommand(app, "スペースまでデータ出力", "buildUntilCharacterCommand"),
    "DFMBK30099999999F32000."
  );
  assert.equal(
    checkedCommand(app, "コード種指定QR、桁数指定10桁でスペースまでデータ出力", "buildUntilCharacterCommand"),
    "DFMBK30099730010F32000."
  );
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時スペースまでデータ出力", "buildUntilCharacterCommand"),
    "DFMBK30099730010F32000|00996A0020F32000."
  );
  assert.equal(
    checkedCommand(app, "QRCODE読み取り時、P以降GSまで出力、Q以降GSまで出力", "buildSearchUntilCharacterCommand"),
    "DFMBK30099739999F850F31D00F7F851F31D00."
  );
  assert.equal(
    app.buildFirstCommandCandidate("QRCODE読み取り時、P以降GSまで出力、Q以降GSまで出力")?.command,
    "DFMBK30099739999F850F31D00F7F851F31D00."
  );
  assert.equal(
    checkedCommand(app, "3個目カンマ後ろのデータ出力設定", "buildOutputAfterNthCharacterCommand"),
    "DFMBK30099999999F82CF501F82CF501F82CF501F100."
  );
  assert.equal(
    app.buildFirstCommandCandidate("3個目カンマ後ろのデータ出力設定")?.command,
    "DFMBK30099999999F82CF501F82CF501F82CF501F100."
  );
  assert.equal(
    checkedCommand(app, "先頭から3つ目のカンマの後ろから10桁出力", "buildOutputAfterNthCharacterCommand"),
    "DFMBK30099999999F82CF501F82CF501F82CF501F21000."
  );
  assert.equal(
    app.buildFirstCommandCandidate("先頭から3つ目のカンマの後ろから10桁出力")?.command,
    "DFMBK30099999999F82CF501F82CF501F82CF501F21000."
  );
  assert.equal(
    checkedCommand(app, "先頭から3個目のスペース後から4個目のスペース前までのデータ出力", "buildOutputBetweenNthCharactersCommand"),
    "DFMBK30099999999F820F501F820F501F820F501F32000."
  );
  assert.equal(
    app.buildFirstCommandCandidate("先頭から3個目のスペース後から4個目のスペース前までのデータ出力")?.command,
    "DFMBK30099999999F820F501F820F501F820F501F32000."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時に先頭から3個目のスペース後から4個目のスペース前までのデータ出力", "buildOutputBetweenNthCharactersCommand"),
    "DFMBK30099739999F820F501F820F501F820F501F32000."
  );
  assert.equal(
    app.buildFirstCommandCandidate("QR読み取り時に先頭から3個目のスペース後から4個目のスペース前までのデータ出力")?.command,
    "DFMBK30099739999F820F501F820F501F820F501F32000."
  );
  assert.equal(
    checkedCommand(app, "QRの50桁読み取り時、3個目の#の後ろからデータ出力設定", "buildOutputAfterNthCharacterCommand"),
    "DFMBK30099730050F823F501F823F501F823F501F100."
  );
  assert.equal(
    checkedCommand(app, "コードID50の20桁読み取り時、3個目の#の後ろからデータ出力設定", "buildOutputAfterNthCharacterCommand"),
    "DFMBK30099500020F823F501F823F501F823F501F100."
  );
});

test("QR third-to-fourth space extraction remains QR-only", () => {
  const app = loadAppContext();
  const question = "QR読み取り時に先頭から3個目のスペース後から4個目のスペース前までのデータ出力";
  const item = app.buildOutputBetweenNthCharactersCommand(question);
  assert.ok(item, "QRのスペース間抽出コマンドを生成できること");
  assert.equal(item.command, "DFMBK30099739999F820F501F820F501F820F501F32000.");
  assert.match(item.command, /^DFMBK3009973/);
  assert.doesNotMatch(item.command, /^DFMBK3009999/);
  assert.match(item.summary, /QR/);

  const candidate = app.buildFirstCommandCandidate(question);
  assert.equal(candidate?.command, item.command);

  const checked = app.validateGeneratedCommand(item, app.buildIntentUnderstanding(question));
  assert.equal(checked.validationFailed, undefined, checked.validationErrors?.join("\n"));
  assert.equal(checked.command, item.command);
});

test("between-character deletion removes content enclosed by delimiters", () => {
  const app = loadAppContext();
  assert.equal(
    checkedCommand(app, "$で挟まれた部分だけを削除する設定", "buildBetweenCharacterDeleteCommand"),
    "DFMBK30099999999F32400F501F824F501F100."
  );
  assert.equal(
    app.buildFirstCommandCandidate("$で挟まれた部分だけを削除する設定")?.command,
    "DFMBK30099999999F32400F501F824F501F100."
  );
  assert.equal(
    checkedCommand(app, "QR読み取り時、$で挟まれた部分を削除して出力", "buildBetweenCharacterDeleteCommand"),
    "DFMBK30099739999F32400F501F824F501F100."
  );
});

test("multi-position TAB insertion uses relative send counts", () => {
  const app = loadAppContext();
  assert.equal(
    app.buildFirstCommandCandidate("先頭が30、31、32ではじまるQRコードは先頭から10文字と、12桁目から1文字を出力")?.command,
    "DFMBK30099739999FE33FE30F7F21000F501F20100|0099739999FE33FE31F7F21000F501F20100|0099739999FE33FE32F7F21000F501F20100."
  );
  assert.equal(
    app.buildFirstCommandCandidate("先頭が30、31、32ではじまるQRコードは先頭から10文字と、12桁目から1文字を出力。それ以外はそのまま出力する。サフィックスはCR")?.command,
    "DFMBK30099739999FE33FE30F7F21000F501F2011D|0099739999FE33FE31F7F21000F501F2011D|0099739999FE33FE32F7F21000F501F2011D|0099739999F10D;DFM_EN1."
  );
  assert.equal(
    checkedCommand(app, "JAN13先頭文字 21、23、25、45、49のみ読取出力", "buildPrefixValueFilterCommand"),
    "DFMBK30099649999FE32FE31F7F100|0099649999FE32FE33F7F100|0099649999FE32FE35F7F100|0099649999FE34FE35F7F100|0099649999FE34FE39F7F100;DFM_EN2;DFMDEC1."
  );
  assert.equal(
    checkedCommand(app, "code39先頭Zの時のみ読み取り", "buildPrefixValueFilterCommand"),
    "DFMBK30099629999FE5AF7F100;DFM_EN2;DFMDEC1."
  );
  assert.equal(
    checkedCommand(app, "Code39読み取り時、先頭が1の場合、２桁目から出力", "buildPrefixValueThenFromPositionCommand"),
    "DFMBK30099629999FE31F100."
  );
  assert.equal(
    app.buildFirstCommandCandidate("Code39読み取り時、先頭が1の場合、２桁目から出力")?.command,
    "DFMBK30099629999FE31F100."
  );
  assert.equal(
    checkedCommand(app, "Code39の先頭が1の時、３桁目から出力する。", "buildPrefixValueThenFromPositionCommand"),
    "DFMBK30099629999FE31F501F100."
  );
  assert.equal(
    app.buildGeneratedCommandCandidate("Code39の先頭が1の時、３桁目から出力する。")?.command,
    "DFMBK30099629999FE31F501F100."
  );
  assert.equal(
    checkedCommand(app, "Code39読み取り時、３桁目が0の場合、５桁目から出力設定", "buildPositionValueThenFromPositionCommand"),
    "DFMBK30099629999F502FE30F501F100."
  );
  assert.equal(
    app.buildFirstCommandCandidate("Code39読み取り時、３桁目が0の場合、５桁目から出力設定")?.command,
    "DFMBK30099629999F502FE30F501F100."
  );
  assert.equal(
    app.buildGeneratedCommandCandidate("Code39読み取り時、３桁目が0の場合、５桁目から出力設定")?.command,
    "DFMBK30099629999F502FE30F501F100."
  );
  assert.equal(
    app.buildGeneratedCommandCandidate("Code39読み取り時、先頭が1の場合、２桁目から出力")?.command,
    "DFMBK30099629999FE31F100."
  );
  assert.equal(
    checkedCommand(app, "JAN-13読み取り時にCRを4回付加して出力", "buildRepeatedSuffixControlInsertCommand"),
    "DFMBK30099649999F100F40D04."
  );
  assert.equal(
    checkedCommand(app, "全桁出力後CRLF、ディレイ7500m秒を挿入する", "buildOutputControlDelayCommand"),
    "DFMBK30099999999F100BA00020D0AEF1500."
  );
  assert.equal(
    app.buildFirstCommandCandidate("全桁出力後CRLF、ディレイ7500m秒を挿入する")?.command,
    "DFMBK30099999999F100BA00020D0AEF1500."
  );
  assert.equal(
    checkedCommand(app, "JAN-13読み取り時、データ末尾にCRを４回付加して出力", "buildRepeatedSuffixControlInsertCommand"),
    "DFMBK30099649999F100F40D04."
  );
  assert.equal(
    checkedCommand(app, "CODE39とCODE128の8桁読み取り時、3桁送信、ハイフン挿入、4桁送信、ハイフン挿入設定", "buildSegmentedSendInsertCommand"),
    "DFMBK300996A0008F2032DF2042D|0099620008F2032DF2042D."
  );
  assert.equal(
    checkedCommand(app, "QRの8桁読み取り時、4桁出力、CR挿入、4桁出力、CR挿入設定", "buildSegmentedSendInsertCommand"),
    "DFMBK30099730008F2040DF2040D."
  );
  assert.equal(
    checkedCommand(app, "QRの8桁読み取り時、4桁出力、CR挿入、4桁出力、CR2個挿入設定", "buildSegmentedSendInsertCommand"),
    "DFMBK30099730008F2040DF20400F40D02."
  );

  assert.equal(
    checkedCommand(app, "CODE39とCODE128の8桁読み取り時、3桁送信、ハイフン挿入、4桁送信、ハイフン挿入、残り送信設定", "buildSegmentedSendInsertCommand"),
    "DFMBK300996A0008F2032DF2042DF100|0099620008F2032DF2042DF100."
  );
  assert.equal(
    checkedCommand(app, "QRの8桁読み取り時、4桁出力、CR挿入、4桁出力、CR挿入、残りデータ出力設定", "buildSegmentedSendInsertCommand"),
    "DFMBK30099730008F2040DF2040DF100."
  );
  assert.equal(
    checkedCommand(app, "datamatrix読み取り時、1桁目に(挿入、2桁データ出力して、3桁目に)挿入、14桁データ出力して、17桁目に(挿入、2桁データ出力して、19桁目に)挿入、6桁データ出力して、25桁目に(挿入、2桁データ出力して、27桁目に)挿入、末尾までデータ出力してください", "buildSegmentedSendInsertCommand"),
    "DFMBK30099779999F42801F20229F21428F20229F20628F20229F100."
  );
  assert.equal(
    app.buildGeneratedCommandCandidate("datamatrix読み取り時、1桁目に(挿入、2桁データ出力して、3桁目に)挿入、14桁データ出力して、17桁目に(挿入、2桁データ出力して、19桁目に)挿入、6桁データ出力して、25桁目に(挿入、2桁データ出力して、27桁目に)挿入、末尾までデータ出力してください")?.command,
    "DFMBK30099779999F42801F20229F21428F20229F20628F20229F100."
  );

  const segmentedQuestion = "CODE39とCODE128の8桁読み取り時、3桁送信、ハイフン挿入、4桁送信、ハイフン挿入設定";
  const segmentedIntent = app.buildIntentUnderstanding(segmentedQuestion);
  const wrongSegmentedItem = {
    id: "wrong-segmented",
    label: "wrong",
    category: "test",
    summary: "",
    keywords: [],
    command: "DFMBK300996A0398F20300|00996A0008F20300|0099620398F20300|0099620008F20300.",
  };
  const checkedWrongSegmented = app.validateGeneratedCommand(wrongSegmentedItem, segmentedIntent);
  assert.equal(checkedWrongSegmented.validationFailed, true);
  assert.match(checkedWrongSegmented.validationErrors.join("\n"), /F2032DF2042D/);

  assert.equal(
    checkedCommand(app, "20桁目にTABを2個付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099999999F21900F40902F100."
  );
  assert.equal(
    checkedCommand(app, "20桁目にハイフンを3個付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099999999F21900F42D03F100."
  );
  assert.equal(
    checkedCommand(app, "GS1-128読み取り時、17桁目に|を挿入", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099499999F2167CF100."
  );
  assert.equal(
    checkedCommand(app, "20桁目にスペースを2個付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099999999F21900F42002F100."
  );
  assert.equal(
    checkedCommand(app, "20桁目にSPを2個付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099999999F21900F42002F100."
  );
  assert.equal(
    checkedCommand(app, "20桁目にENTERを2個付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099999999F21900F40D02F100."
  );
  assert.equal(
    checkedCommand(app, "datamatrix読み取り時21桁目にCRを３回付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099779999F22000F40D03F100."
  );
  assert.equal(
    checkedCommand(app, "20桁目にESCを2個付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099999999F21900F41B02F100."
  );
  assert.equal(
    checkedCommand(app, "20桁目にBSを2個付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099999999F21900F40802F100."
  );
  assert.equal(
    checkedCommand(app, "10桁目にTAB、20桁目にTABを付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099999999F20909F20909F100."
  );
  assert.equal(
    checkedCommand(app, "QRの10桁とCode128の20桁読み取り時10桁目にTAB、20桁目にTABを付加して出力", "buildMultiPositionControlInsertCommand"),
    "DFMBK30099730010F20909F20909F100|00996A0020F20909F20909F100."
  );
});

test("generation check blocks the known wrong answer", () => {
  const app = loadAppContext();
  const question = "QRの10桁とCode128の20桁読み取り時データ先頭にCTRL+ALT+F4付加して出力";
  const intent = app.buildIntentUnderstanding(question);
  const wrongItem = {
    id: "wrong",
    label: "wrong",
    category: "test",
    summary: "",
    keywords: [],
    command: "DFMBK300996A0020B5011473F100|0099730020B5011473F100.",
  };
  const checked = app.validateGeneratedCommand(wrongItem, intent);
  assert.equal(checked.validationFailed, true);
  assert.ok(checked.validationErrors.length > 0);
});

test("data comparison prototype generates insertion, control, replacement, and multi-target commands", () => {
  const app = loadAppContext();
  const inserted = app.buildDataComparisonCommand({
    source: "01123456789012341725010110ABC",
    expectedPattern: "(01)12345678901234(17)250101(10)ABC[ENTER]",
    targetCodeIds: ["77"],
    exactLength: true,
  });
  assert.equal(inserted.ok, true, inserted.error);
  assert.equal(
    inserted.command,
    "DFMBK30099770029BA000128F20200BA000129F21400BA000128F20200BA000129F20600BA000128F20200BA000129F20300F40D01."
  );
  assert.equal(inserted.simulated, "(01)12345678901234(17)250101(10)ABC[ENTER]");

  const replaced = app.buildDataComparisonCommand({
    source: "A12A34",
    expectedPattern: "{A->B}B12B34[ENTER]",
    targetCodeIds: ["99"],
    exactLength: true,
  });
  assert.equal(replaced.ok, true, replaced.error);
  assert.equal(replaced.command, "DFMBK30099990006E4024142F20600F40D01.");

  const multiple = app.buildDataComparisonCommand({
    source: "ABC",
    expectedPattern: "ABC[TAB*2]",
    targetCodeIds: ["77", "73"],
    exactLength: false,
  });
  assert.equal(multiple.ok, true, multiple.error);
  assert.equal(multiple.command, "DFMBK30099779999F20300F40902|0099739999F20300F40902.");

  const unsupportedDeletion = app.buildDataComparisonCommand({
    source: "ABC",
    expectedPattern: "AC",
    targetCodeIds: ["77"],
  });
  assert.equal(unsupportedDeletion.ok, false);
  assert.match(unsupportedDeletion.error, /データ抽出にチェック/);

  const extracted = app.buildDataComparisonCommand({
    source: "ABCDEFG",
    expectedPattern: "CDE",
    targetCodeIds: ["77"],
    exactLength: true,
    dataInsertion: false,
    dataExtraction: true,
  });
  assert.equal(extracted.ok, true, extracted.error);
  assert.equal(extracted.command, "DFMBK30099770007F502F20300.");
  assert.equal(extracted.simulated, "CDE");
  assert.deepEqual(Array.from(extracted.descriptions), [
    "元データを2桁読み飛ばし",
    "データを3桁出力",
    "残り2桁は出力しない",
  ]);

  const insertedAtExpectedPosition = app.buildDataComparisonCommand({
    source: "ABCDE",
    expectedPattern: "AB-XCDE",
    targetCodeIds: ["77"],
    exactLength: true,
    dataInsertion: true,
    dataExtraction: false,
  });
  assert.equal(insertedAtExpectedPosition.ok, true, insertedAtExpectedPosition.error);
  assert.equal(insertedAtExpectedPosition.command, "DFMBK30099770005F20200BA00022D58F100.");

  const extractedAndInserted = app.buildDataComparisonCommand({
    source: "ABCDEF",
    expectedPattern: "AB-XEF",
    targetCodeIds: ["77"],
    exactLength: true,
    dataInsertion: true,
    dataExtraction: true,
  });
  assert.equal(extractedAndInserted.ok, true, extractedAndInserted.error);
  assert.equal(extractedAndInserted.command, "DFMBK30099770006F20200F502BA00022D58F100.");
  assert.equal(extractedAndInserted.simulated, "AB-XEF");
});

test("data comparison extracts data from the beginning", () => {
  const app = loadAppContext();
  const result = app.buildDataComparisonCommand({
    source: "ABCDE",
    expectedPattern: "ABC",
    targetCodeIds: ["77"],
    dataInsertion: false,
    dataExtraction: true,
  });
  assert.equal(result.ok, true, result.error);
  assert.equal(result.command, "DFMBK30099770005F20300.");
  assert.equal(result.simulated, "ABC");
});

test("data comparison prefers the longest contiguous source match for repeated digits", () => {
  const app = loadAppContext();
  const result = app.buildDataComparisonCommand({
    source: "01145123456789031711011930110ABC",
    expectedPattern: "(17)110119",
    targetCodeIds: ["77"],
    exactLength: true,
    dataInsertion: true,
    dataExtraction: true,
  });
  assert.equal(result.ok, true, result.error);
  assert.equal(result.command, "DFMBK30099770032F516BA000128F20200BA000129F20600.");
  assert.equal(result.simulated, "(17)110119");
  assert.deepEqual(Array.from(result.descriptions), [
    "元データを16桁読み飛ばし",
    "「(」を挿入",
    "データを2桁出力",
    "「)」を挿入",
    "データを6桁出力",
    "残り8桁は出力しない",
  ]);
});

test("data comparison extracts data through the end", () => {
  const app = loadAppContext();
  const result = app.buildDataComparisonCommand({
    source: "ABCDE",
    expectedPattern: "CDE",
    targetCodeIds: ["73"],
    dataInsertion: false,
    dataExtraction: true,
  });
  assert.equal(result.ok, true, result.error);
  assert.equal(result.command, "DFMBK30099730005F502F100.");
  assert.equal(result.simulated, "CDE");
});

test("data comparison extracts multiple separated ranges", () => {
  const app = loadAppContext();
  const result = app.buildDataComparisonCommand({
    source: "ABCDEF",
    expectedPattern: "ACE",
    targetCodeIds: ["77"],
    dataInsertion: false,
    dataExtraction: true,
  });
  assert.equal(result.ok, true, result.error);
  assert.equal(result.command, "DFMBK30099770006F20100F501F20100F501F20100.");
  assert.equal(result.simulated, "ACE");
});

test("data comparison inserts text at both ends", () => {
  const app = loadAppContext();
  const result = app.buildDataComparisonCommand({
    source: "ABC",
    expectedPattern: "XABCY",
    targetCodeIds: ["77"],
    dataInsertion: true,
    dataExtraction: false,
  });
  assert.equal(result.ok, true, result.error);
  assert.equal(result.command, "DFMBK30099770003BA000158F20300BA000159.");
  assert.equal(result.simulated, "XABCY");
});

test("data comparison reports when extraction is not enabled", () => {
  const app = loadAppContext();
  const result = app.buildDataComparisonCommand({
    source: "ABCDE",
    expectedPattern: "ACE",
    targetCodeIds: ["77"],
    dataInsertion: true,
    dataExtraction: false,
  });
  assert.equal(result.ok, false);
  assert.match(result.error, /データ抽出にチェック/);
});

test("data comparison reports when insertion is not enabled", () => {
  const app = loadAppContext();
  const result = app.buildDataComparisonCommand({
    source: "ABC",
    expectedPattern: "ABXC",
    targetCodeIds: ["77"],
    dataInsertion: false,
    dataExtraction: true,
  });
  assert.equal(result.ok, false);
  assert.match(result.error, /データ挿入にチェック/);
});

test("data comparison accepts an unchanged result without operations enabled", () => {
  const app = loadAppContext();
  const result = app.buildDataComparisonCommand({
    source: "ABC",
    expectedPattern: "ABC",
    targetCodeIds: ["99"],
    exactLength: false,
    dataInsertion: false,
    dataExtraction: false,
  });
  assert.equal(result.ok, true, result.error);
  assert.equal(result.command, "DFMBK30099999999F100.");
  assert.equal(result.simulated, "ABC");
});

test("data comparison splits extraction cursor moves over 99 characters", () => {
  const app = loadAppContext();
  const source = `${"A".repeat(120)}XYZ`;
  const result = app.buildDataComparisonCommand({
    source,
    expectedPattern: "XYZ",
    targetCodeIds: ["73"],
    dataInsertion: false,
    dataExtraction: true,
  });
  assert.equal(result.ok, true, result.error);
  assert.equal(result.command, "DFMBK30099730123F599F521F100.");
  assert.equal(result.simulated, "XYZ");
});

test("malformed romaji request does not match unrelated catalog commands", () => {
  const app = loadAppContext();
  const question = "DATAMATRIX読み取り時HAIFUNNWO";
  const intent = app.buildIntentUnderstanding(question);
  assert.equal(intent.intent, "data_format_setting");
  assert.equal(intent.confidence, 0.35);
  assert.equal(app.findExactSpaceTransformCommand(question), null);
  assert.equal(app.findMatches(question).length, 0);
  assert.equal(app.shouldAskClarification(intent), true);
});

test("admin command exact match tolerates safe wording variations", async () => {
  const app = loadAppContext({
    supabaseUrl: "https://example.supabase.co",
    supabaseAnonKey: "anon",
    fetch: async () => ({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: "Code128 b21 prefix",
          request_text: "Code128読み取り時、先頭にb21を付加して出力設定",
          command: "DFMBK300996A9999BA0003623231F100.",
          notes: "",
          keywords: [],
        },
      ],
    }),
  });

  await app.loadAdminCommandCatalog();
  assert.equal(
    app.findExactAdminCommandMatches("Code128読取時 先頭にb21を追加して出力してください")[0]?.command,
    "DFMBK300996A9999BA0003623231F100."
  );
});

test("multiple clauses can use different operations per symbology", () => {
  const app = loadAppContext();
  const question = "QR10桁読み取り時先頭5桁出力、OCR10桁読み取り時、ハイフン削除して出力、Code128読み取り時、スペースを#に置き換えて出力";
  const item = app.buildMultiClauseCommand(question);
  assert.ok(item);
  assert.equal(
    item.command,
    "DFMBK30099730010F20500|00994F0010FB012DF100|00996A9999E4022023F100."
  );
});

test("command explanation expands FB and E4 editor commands", () => {
  const app = loadAppContext();
  const html = app.explainDataFormatCommandToHtml("DFMDF3;DFMBK300994F0010FB012DF100|00996A9999E4022023F100.");
  assert.match(html, /FB012D: ハイフンのキャラクタを無効化します。/);
  assert.match(html, /F100: 現在位置から末尾までを出力します/);
  assert.match(html, /E4022023: スペースを#に置換します。/);
});

test("command explanation shows inserted control characters for BA commands", () => {
  const app = loadAppContext();
  const html = app.explainDataFormatCommandToHtml("DFMBK30099999999F100BA00020D0AEF1500.");
  assert.match(html, /BA00020D0A: 現在位置に文字列 CRLF \(0D0A\) を挿入します。/);
});

test("command explanation handles prefix filter commands with appended admin settings", () => {
  const app = loadAppContext();
  const html = app.explainDataFormatCommandToHtml("DFMBK30099629999FE5AF7F100;DFM_EN2;DFMDEC1.");
  assert.match(html, /コード種: 62 \/ Code39/);
  assert.match(html, /FE5A: 現在位置の文字が Z と一致するか比較し、一致時にカーソルを1桁進めます。/);
  assert.match(html, /F7: カーソルを読み取りデータの先頭へ戻します。/);
  assert.match(html, /DFM_EN2.: 必須一致 Prefix\/Suffix保持。/);
  assert.match(html, /DFMDEC1.: 不一致エラー音OFF。/);
});

test("prefix value condition can append CR at data suffix", () => {
  const app = loadAppContext();
  const item = app.buildFirstCommandCandidate("EAN13読み取り時、先頭が19の時にデータ末尾にCR付加する");
  assert.equal(
    item?.command,
    "DFMBK30099649999FE31FE39F7F10D."
  );
  assert.match(item.summary, /末尾にENTERを付加/);

  const typoItem = app.buildFirstCommandCandidate("ENA13読み取り時、先頭19の場合、データ末尾にCR付加して出力設定");
  assert.equal(
    typoItem?.command,
    "DFMBK30099649999FE31FE39F7F10D."
  );
  assert.match(typoItem.summary, /EAN-13/);
});

test("command explanation expands F8 and F3 search-until editor commands", () => {
  const app = loadAppContext();
  const html = app.explainDataFormatCommandToHtml("DFMBK30099739999F850F31D00F7F851F31D00.");
  assert.match(html, /コード種: 73 \/ QR/);
  assert.match(html, /F850: 現在位置から P が出現する手前までカーソルを移動します。/);
  assert.match(html, /F31D00: 現在位置から GS が出現する手前までを出力します/);
  assert.match(html, /F7: カーソルを読み取りデータの先頭へ戻します。/);
  assert.match(html, /F851: 現在位置から Q が出現する手前までカーソルを移動します。/);
});

test("output sequence command is generated from structured entries", () => {
  const app = loadAppContext();
  assert.equal(
    app.buildOutputSequenceCommand({
      mode: "1",
      entries: [
        { codeId: "62", length: "", char1: "A", char2: "", char3: "" },
        { codeId: "6A", length: "", char1: "B", char2: "", char3: "" },
      ],
    }).command,
    "SEQBLK62999941FF6A999942FF;SEQ_EN1."
  );
  assert.equal(
    app.buildOutputSequenceCommand({
      mode: "2",
      entries: [
        { codeId: "62", length: "12", char1: "A", char2: "B", char3: "C" },
        { codeId: "73", length: "20", char1: "", char2: "", char3: "" },
        { codeId: "6A", length: "9999", char1: "1", char2: "2", char3: "" },
      ],
    }).command,
    "SEQBLK620012414243FF730020FF6A99993132FF;SEQ_EN2."
  );
  assert.equal(
    app.buildOutputSequenceCommand({
      entries: [
        { codeId: "62", length: "", char1: "", char2: "B", char3: "" },
        { codeId: "6A", length: "", char1: "C", char2: "", char3: "" },
      ],
    }).validationFailed,
    true
  );
});

test("output sequence can be appended to data format command by switch", () => {
  const offApp = loadAppContext({ appendSequenceToDataFormat: false });
  assert.match(
    offApp.commandToHtml({ category: "登録例", command: "DFMBK30099649999F10D.", notes: [] }),
    /DFMBK30099649999F10D\./
  );
  assert.doesNotMatch(
    offApp.commandToHtml({ category: "登録例", command: "DFMBK30099649999F10D.", notes: [] }),
    /SEQBLK/
  );

  const onApp = loadAppContext({ appendSequenceToDataFormat: true });
  assert.match(
    onApp.commandToHtml({ category: "登録例", command: "DFMBK30099649999F10D.", notes: [] }),
    /DFMBK30099649999F10D;SEQBLK629999FF6A9999FF;SEQ_EN1\./
  );
});

test("data format settings form appends formatter and error tone commands", () => {
  const app = loadAppContext({
    enableDataFormatSettings: true,
    dataFormatDefaultOn: true,
    dataFormatterMode: "DFM_EN4",
    dataFormatErrorTone: "DFMDEC1",
  });
  assert.match(
    app.commandToHtml({ category: "登録例", command: "DFMBK30099649999F10D;DFM_EN2;DFMDEC0.", notes: [] }),
    /DFMDF3;DFMBK30099649999F10D;DFM_EN4;DFMDEC1\./
  );
});
