// A house cat's one-star review of its human: one line, written once, byte for byte
// the same on every run. The grader runs this program twice and compares the bytes,
// so the text is a constant here and nothing reads the clock, the network, a random
// source or any file outside this repository. Standard library only; Node 22 runs
// this TypeScript as it is.
//
// In the grader's sandbox the output directory is /output. Outside the sandbox,
// MAKEFUN_OUTPUT_DIR stands in for it, as the harness documents.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The entry. A deadpan one-star review in the voice of a house cat, whose complaint
 * is a specific and ordinary household crime, and whose sting lands on the cat's own
 * standards rather than the human's.
 */
const REVIEW: string =
  "One star. He was on a call, so I walked across his keyboard and sent his boss a paragraph of j's. He shouted. Those j's were the only honest words in that meeting.";

/**
 * The gate the entry is held to: UTF-8 text of 1 to 200 characters, not only white
 * space, on a single line. Checked here so a bad edit fails loudly instead of
 * quietly scoring zero.
 */
function gate(text: string): void {
  const chars = Array.from(text).length;
  if (chars < 1 || chars > 200) {
    throw new Error(`the entry is ${chars} characters, outside the gate's 1 to 200`);
  }
  if (text.trim() === '') {
    throw new Error('the entry is only white space, which the gate refuses');
  }
  if (/[\r\n]/.test(text)) {
    throw new Error('the entry must be a single line');
  }
  if (text !== text.trim()) {
    throw new Error('the entry carries leading or trailing white space');
  }
}

function main(): void {
  gate(REVIEW);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'entry.txt'), REVIEW, { encoding: 'utf8' });
}

main();
