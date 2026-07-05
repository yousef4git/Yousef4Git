import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findViolations } from '../lib/lint.mjs';

// Repo root is two levels up from cv/test/.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (rel) => {
  try { return fs.readFileSync(path.join(root, rel), 'utf8'); } catch { return ''; }
};

// Public copy of the Next.js site (the old static index.html lives in
// legacy/ and is no longer served). These must follow the voice rules.
const CONTENT = [
  'README.md',
  'content/site.ts',
  'content/persona.md',
  'app/layout.tsx',
];

for (const rel of CONTENT) {
  test(`${rel}: clean voice (no em/en dashes, no banned phrases)`, () => {
    const text = read(rel);
    assert.ok(text.length > 0, `${rel} is empty or missing`);
    assert.deepEqual(findViolations(text), [], `${rel} has voice violations`);
  });

  test(`${rel}: no Replyli`, () => {
    assert.ok(!/replyli/i.test(read(rel)), `${rel} still mentions Replyli`);
  });
}

test('persona and README: AWS in, Google Cloud out', () => {
  for (const rel of ['content/persona.md', 'README.md']) {
    const t = read(rel);
    assert.ok(/AWS/.test(t), `AWS missing from ${rel}`);
    assert.ok(!/google cloud/i.test(t), `Google Cloud still present in ${rel}`);
  }
});

test('site content: McKinsey Forward is 2026', () => {
  const t = read('content/site.ts');
  const m = t.match(/McKinsey Forward[\s\S]{0,200}?year: "(\d{4})"/);
  assert.ok(m, 'McKinsey Forward credential missing from content/site.ts');
  assert.equal(m[1], '2026', 'McKinsey date is not 2026');
});

test('CDMP stays spelled out on site and persona', () => {
  for (const rel of ['content/site.ts', 'content/persona.md']) {
    assert.ok(
      read(rel).includes('Certified Data Management Professional'),
      `${rel} does not spell out CDMP`,
    );
  }
});
