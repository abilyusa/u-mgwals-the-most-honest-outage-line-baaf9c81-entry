// The Most Honest Outage Line — one line, at most 160 characters.
// The program writes the outage line to $MAKEFUN_OUTPUT_DIR/entry.txt,
// falling back to /output/entry.txt when the variable is unset.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Every server is down, including the one hosting this page. I don't know what broke or when they come back, and I won't pretend I do.";

// Gate guard: the sealed scorer requires UTF-8 text of 1-160 characters,
// a single line, and not only whitespace. Count code points so any
// multi-byte character is measured the way the scorer measures it.
const len = [...LINE].length;
if (len < 1 || len > 160 || LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error(`LINE violates the 1-160 character gate (length ${len})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE);
