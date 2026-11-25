// Worst Fix Ever: Funniest Commit Message
// Dependency-free (Node built-ins only). Run: node main.ts  |  node main.ts --self-test
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY = "fix: delete test that asserts user is alive (CI is green now)";
const MAX_LENGTH = 100;

interface Rule {
  id: string;
  describe: string;
  fails: (entry: string) => boolean;
}

// Named rule table: each rule has an id the self-test can target.
const RULES: Rule[] = [
  { id: "not-blank", describe: "entry is blank", fails: (e) => e.trim().length === 0 },
  { id: "max-length", describe: `entry is longer than ${MAX_LENGTH} characters`, fails: (e) => e.length > MAX_LENGTH },
  { id: "no-edge-whitespace", describe: "entry has leading or trailing whitespace", fails: (e) => e !== e.trim() },
  { id: "single-line", describe: "entry must be a single line", fails: (e) => /[\r\n]/.test(e) },
];

// Returns the ids of every rule the entry breaks (empty array = valid).
function validate(entry: string): string[] {
  return RULES.filter((r) => r.fails(entry)).map((r) => r.id);
}

function assertValid(entry: string): void {
  const broken = RULES.filter((r) => r.fails(entry));
  if (broken.length > 0) throw new Error(broken.map((r) => r.describe).join("; "));
}

// Reports the entry length in characters and bytes.
function entryLength(entry: string): string {
  return `${entry.length} characters, ${Buffer.byteLength(entry, "utf8")} bytes (max ${MAX_LENGTH} characters)`;
}

function writeEntry(entry: string, dir: string): string {
  assertValid(entry);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, entry, "utf8"); // no trailing newline
  const back = readFileSync(file);
  if (!back.equals(Buffer.from(entry, "utf8"))) throw new Error("read-back bytes differ from entry");
  console.log(`wrote ${file} (${entryLength(entry)})`);
  return file;
}

function selfTest(): void {
  const rejects: Array<[string, string, string]> = [
    ["empty", "", "not-blank"],
    ["whitespace only", "   \t ", "not-blank"],
    ["101 characters", "x".repeat(101), "max-length"],
    ["leading space", " fix: a", "no-edge-whitespace"],
    ["trailing space", "fix: a ", "no-edge-whitespace"],
    ["leading tab", "\tfix: a", "no-edge-whitespace"],
    ["embedded LF", "fix: a\nfix: b", "single-line"],
    ["embedded CRLF", "fix: a\r\nb", "single-line"],
    ["trailing newline", "fix: a\n", "single-line"],
  ];
  for (const [name, input, ruleId] of rejects) {
    const broken = validate(input);
    if (!broken.includes(ruleId)) throw new Error(`"${name}" not rejected by ${ruleId} (got: ${broken.join(",") || "nothing"})`);
    console.log(`ok  rejected by ${ruleId}: ${name}`);
  }
  if (validate("y".repeat(100)).length !== 0) throw new Error("100-character entry was rejected");
  console.log("ok  accepted: 100-character entry");
  if (validate(ENTRY).length !== 0) throw new Error("real entry was rejected");

  const tmp = mkdtempSync(join(tmpdir(), "worst-fix-"));
  try {
    const file = writeEntry(ENTRY, tmp);
    if (readFileSync(file, "utf8") !== ENTRY) throw new Error("round trip mismatch");
    console.log("ok  real entry round-trips byte-identical");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  console.log("self-test passed");
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const outDir = join(dirname(fileURLToPath(import.meta.url)), "output");
  writeEntry(ENTRY, outDir);
}
