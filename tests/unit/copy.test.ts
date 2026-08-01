import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const EM_DASH = "—";
const EN_DASH = "–";

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return /\.(tsx?|md)$/.test(e.name) ? [full] : [];
  });
}

const FILES = [
  ...walk(path.join(process.cwd(), "content")),
  ...walk(path.join(process.cwd(), "components")),
  ...walk(path.join(process.cwd(), "app")),
];

describe("rendered copy", () => {
  it("scans a non-trivial number of files", () => {
    expect(FILES.length).toBeGreaterThan(10);
  });

  for (const file of FILES) {
    const rel = path.relative(process.cwd(), file);
    it(`has no em or en dashes in ${rel}`, () => {
      const text = readFileSync(file, "utf8");
      expect(text).not.toContain(EM_DASH);
      expect(text).not.toContain(EN_DASH);
    });
  }
});
