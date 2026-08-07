import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
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

// The degree is the fact worth stating; the graduation date is not. It reads
// as "still a student" and dates the CV the moment it stops being true.
const DEGREE = /(IMSIU|Imam Muhammad ibn Saud)/gi;
// Wide enough to cover a trailing ", Expected Jan 2027", short enough to stop
// before the certifications that follow, which carry legitimate years.
const TAIL = 40;

// Returns the degree mention plus what trails it, so a date on the next line
// is caught too. Newlines collapse first: persona.md wraps mid-sentence.
function degreeMentions(text) {
  const flat = String(text).replace(/\s+/g, ' ');
  const out = [];
  for (const m of flat.matchAll(DEGREE)) {
    out.push(flat.slice(m.index, m.index + m[0].length + TAIL));
  }
  return out;
}

function assertUndated(text, label) {
  const mentions = degreeMentions(text);
  assert.ok(mentions.length > 0, `${label}: degree is not mentioned at all`);
  for (const m of mentions) {
    assert.doesNotMatch(m, /\b(19|20)\d{2}\b/, `${label}: graduation year near: ${m}`);
    assert.doesNotMatch(m, /expected/i, `${label}: "expected" near: ${m}`);
  }
}

test('persona names the degree without a graduation date', () => {
  assertUndated(read('content/persona.md'), 'content/persona.md');
});

test('cv master data carries no education dates', () => {
  const master = JSON.parse(read('cv/data/master.json'));
  for (const ed of master.education) {
    assert.equal(ed.dates, undefined, `education entry has dates: ${ed.primary.en}`);
  }
});

test('served CVs name the degree without a graduation date', (t) => {
  const dir = path.join(root, 'public', 'cv');
  const pdfs = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.pdf'))
    : [];
  assert.ok(pdfs.length > 0, 'no CV is being served from public/cv');
  if (spawnSync('pdftotext', ['-v']).error) {
    t.skip('pdftotext not installed; cannot read the served PDFs');
    return;
  }
  for (const f of pdfs) {
    const text = spawnSync('pdftotext', [path.join(dir, f), '-'], { encoding: 'utf8' }).stdout || '';
    assertUndated(text, f);
  }
});
