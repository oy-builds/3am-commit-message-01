// The 3AM Commit Message — writes one commit line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). Zero dependencies, Node 22+.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "fix: the bug left after i apologized to the code, i am not explaining this, do not ask";

// The kit's gate: UTF-8 text, 1-139 characters, not only whitespace, single line.
function validate(line: string): void {
  if (line.length < 1 || line.length > 139) {
    throw new Error(`entry must be 1-139 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${outFile}`);
