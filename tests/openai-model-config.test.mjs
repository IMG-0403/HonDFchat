import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = fs.readFileSync("supabase/functions/understand-intent/index.ts", "utf8");

test("intent API defaults to GPT-5.4 Mini and keeps GPT-4.1 fallback", () => {
  assert.match(source, /Deno\.env\.get\("OPENAI_INTENT_MODEL"\) \|\| "gpt-5\.4-mini"/);
  assert.match(source, /allowedFallbackModels = new Set\(\["gpt-4\.1"\]\)/);
});
