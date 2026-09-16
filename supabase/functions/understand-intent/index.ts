const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const intentSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "intent",
    "confidence",
    "canonicalQuery",
    "targetSymbologies",
    "readLengths",
    "actions",
    "detailedIntent",
    "missingSlots",
    "clarifyingQuestion",
    "reason",
  ],
  properties: {
    intent: {
      type: "string",
      enum: ["data_format_setting", "reference_lookup", "unknown"],
    },
    confidence: {
      type: "number",
      minimum: 0,
      maximum: 1,
    },
    canonicalQuery: {
      type: "string",
      description: "A concise Japanese request suitable for deterministic command builders. Leave empty when missingSlots is not empty.",
    },
    targetSymbologies: {
      type: "array",
      items: {
        type: "string",
      },
    },
    readLengths: {
      type: "array",
      items: {
        type: "integer",
        minimum: 0,
        maximum: 9999,
      },
    },
    actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "target", "position", "length", "value", "replacement"],
        properties: {
          type: {
            type: "string",
            enum: [
              "delete",
              "replace",
              "output_leading",
              "output_range",
              "output_from_position_to_end",
              "zero_suppress",
              "prefix_text",
              "suffix_text",
              "prefix_key",
              "suffix_key",
              "unknown",
            ],
          },
          target: {
            anyOf: [{ type: "string" }, { type: "null" }],
          },
          position: {
            anyOf: [{ type: "integer", minimum: 1, maximum: 99 }, { type: "null" }],
          },
          length: {
            anyOf: [{ type: "integer", minimum: 0, maximum: 9999 }, { type: "null" }],
          },
          value: {
            anyOf: [{ type: "string" }, { type: "null" }],
          },
          replacement: {
            anyOf: [{ type: "string" }, { type: "null" }],
          },
        },
      },
    },
    detailedIntent: {
      type: "object",
      additionalProperties: false,
      required: ["targets", "operations", "preservedTerms"],
      properties: {
        targets: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["symbology", "codeId", "length"],
            properties: {
              symbology: { type: "string" },
              codeId: { anyOf: [{ type: "string" }, { type: "null" }] },
              length: { anyOf: [{ type: "integer", minimum: 0, maximum: 9999 }, { type: "null" }] },
            },
          },
        },
        operations: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["type", "target", "position", "length", "value", "replacement", "count", "segments"],
            properties: {
              type: {
                type: "string",
                enum: [
                  "delete",
                  "replace",
                  "output_leading",
                  "output_range",
                  "output_from_position_to_end",
                  "zero_suppress",
                  "prefix_text",
                  "suffix_text",
                  "prefix_key",
                  "suffix_key",
                  "insert_text_at_position",
                  "insert_control_at_position",
                  "segmented_send_insert",
                  "prefix_value_filter",
                  "unknown",
                ],
              },
              target: { anyOf: [{ type: "string" }, { type: "null" }] },
              position: { anyOf: [{ type: "integer", minimum: 1, maximum: 9999 }, { type: "null" }] },
              length: { anyOf: [{ type: "integer", minimum: 0, maximum: 9999 }, { type: "null" }] },
              value: { anyOf: [{ type: "string" }, { type: "null" }] },
              replacement: { anyOf: [{ type: "string" }, { type: "null" }] },
              count: { anyOf: [{ type: "integer", minimum: 0, maximum: 9999 }, { type: "null" }] },
              segments: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["sendLength", "insertValue"],
                  properties: {
                    sendLength: { anyOf: [{ type: "integer", minimum: 1, maximum: 99 }, { type: "null" }] },
                    insertValue: { anyOf: [{ type: "string" }, { type: "null" }] },
                  },
                },
              },
            },
          },
        },
        preservedTerms: {
          type: "array",
          items: { type: "string" },
          description: "Important literal tokens from the original request that must not be dropped, such as CR, TAB, hyphen, space delete, GS, or numeric filters.",
        },
      },
    },
    missingSlots: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "intent",
          "targetSymbology",
          "readLength",
          "operation",
          "target",
          "position",
          "length",
          "replacement",
          "prefixOrSuffix",
          "keyOrText",
        ],
      },
    },
    clarifyingQuestion: {
      anyOf: [{ type: "string" }, { type: "null" }],
    },
    reason: {
      type: "string",
    },
  },
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "method not allowed" }, 405);
  }

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return jsonResponse({ error: "OPENAI_API_KEY is not configured" }, 503);
  }

  try {
    const body = await request.json();
    const question = String(body.question || "").trim();
    if (!question) {
      return jsonResponse({ error: "question is required" }, 400);
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: getRequestedModel(body),
        instructions: buildInstructions(),
        input: buildInput(body, question),
        text: {
          format: {
            type: "json_schema",
            name: "hon_intent_understanding",
            strict: true,
            schema: intentSchema,
          },
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return jsonResponse({ error: "OpenAI request failed", detail }, 502);
    }

    const data = await response.json();
    const outputText = extractOutputText(data);
    if (!outputText) {
      return jsonResponse({ error: "OpenAI response did not include output text" }, 502);
    }

    return jsonResponse(JSON.parse(outputText), 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonResponse({ error: message }, 500);
  }
});

function buildInstructions(): string {
  return [
    "You are an intent-understanding service for a Honeywell scanner data-format chatbot.",
    "Return JSON only. Do not create scanner setting commands. Do not provide final answer text.",
    "Your job is to convert the user request into a structured intent JSON or one clarifying question.",
    "Return both canonicalQuery and detailedIntent. detailedIntent is the source of truth; canonicalQuery is only a compatibility bridge for deterministic command builders.",
    "Prefer Japanese canonicalQuery that the existing deterministic command builders can understand, but never remove conditions or operations from the original request.",
    "For segmented output, use this exact style in canonicalQuery: '3桁送信、ハイフン挿入、4桁送信、ハイフン挿入、残り送信設定'. Do not rewrite it as '最初の3桁' or '3桁+ハイフン'.",
    "For output after an ordinal delimiter with a fixed length, preserve both the delimiter occurrence and output length in canonicalQuery, for example: '3個目のカンマの後ろから10桁出力'.",
    "For control/text suffixes, preserve literal control tokens such as CR, TAB, Enter, ESC, BS in detailedIntent.preservedTerms and canonicalQuery.",
    "For paired conditions like 'QRの10桁とCode128の20桁', preserve each symbology-length pair exactly. Do not create cross-product combinations.",
    "For multiple lengths on the same symbology like 'MicroQRの12桁と10桁', preserve both lengths and their original order.",
    "If critical information is missing or ambiguous, set confidence below 0.7, include missingSlots, set canonicalQuery to an empty string, and ask one concise clarifyingQuestion in Japanese.",
    "If the request can be interpreted safely, set confidence 0.7 or higher and provide canonicalQuery.",
    "Use common Honeywell data-format wording: QR, Code128, JAN/EAN, Data Matrix, Code39, OCR, GS, CR, TAB, Enter, prefix, suffix, leading digits, ranges, delete, replace, zero suppress.",
    "Never invent unsupported scanner commands or barcode commands.",
  ].join("\n");
}

function getRequestedModel(body: any): string {
  const requested = String(body.modelOverride || "").trim();
  const allowedFallbackModels = new Set(["gpt-4.1"]);
  if (allowedFallbackModels.has(requested)) return requested;
  // Keep this environment-driven so the GPT-5.4 Mini trial can be rolled back
  // to gpt-4.1-mini without changing or redeploying the function code.
  return Deno.env.get("OPENAI_INTENT_MODEL") || "gpt-5.4-mini";
}

function buildInput(body: any, question: string): string {
  const payload = {
    question,
    conversationHistory: Array.isArray(body.conversationHistory) ? body.conversationHistory.slice(-6) : [],
    relatedCatalogHints: Array.isArray(body.relatedCatalogHints) ? body.relatedCatalogHints.slice(0, 8) : [],
    knownSymbologies: Array.isArray(body.knownSymbologies) ? body.knownSymbologies.slice(0, 80) : [],
  };

  return [
    "Understand this user request and produce the JSON schema result.",
    "Use the context only to resolve phrasing. If context is not enough, ask a clarifying question.",
    JSON.stringify(payload),
  ].join("\n\n");
}

function extractOutputText(data: any): string {
  if (typeof data.output_text === "string") return data.output_text;

  const parts: string[] = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }
  return parts.join("");
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
