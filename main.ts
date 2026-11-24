import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_ENTRY_CHARS = 400;
const MAX_SENTENCES = 2;

// The entry text lives next to this script, never in the working directory,
// so the grader's cwd cannot change what gets submitted.
const here = dirname(fileURLToPath(import.meta.url));
const postmortem = readFileSync(join(here, "entry.txt"), "utf8");

// Guard: the entry must be 1-400 characters and one or two sentences.
if (postmortem.length < 1 || postmortem.length > MAX_ENTRY_CHARS) {
  throw new Error(`entry must be 1-${MAX_ENTRY_CHARS} chars, got ${postmortem.length}`);
}
const sentenceCount = postmortem.split(/[.!?]+/).filter((part) => part.trim().length > 0).length;
if (sentenceCount < 1 || sentenceCount > MAX_SENTENCES) {
  throw new Error(`entry must be 1-${MAX_SENTENCES} sentences, got ${sentenceCount}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), postmortem);
