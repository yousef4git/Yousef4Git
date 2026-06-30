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

// Content files that must follow the plain/humble voice rules.
const CONTENT = [
  'index.html',
  'README.md',
  'theChatBot/me/summary.txt',
  'theChatBot/me/linkedin.txt',
  'assets/og-image.svg',
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

test('index.html: AWS in, Google Cloud out', () => {
  const t = read('index.html');
  assert.ok(/AWS/.test(t), 'AWS missing from index.html');
  assert.ok(!/google cloud/i.test(t), 'Google Cloud still present in index.html');
});

test('README.md: AWS in, Google Cloud out', () => {
  const t = read('README.md');
  assert.ok(/AWS/.test(t), 'AWS missing from README');
  assert.ok(!/google cloud/i.test(t), 'Google Cloud still present in README');
});

test('index.html: Selected work present and McKinsey is 2026', () => {
  const t = read('index.html');
  assert.ok(/Selected work/.test(t), '"Selected work" section missing');
  assert.ok(/McKinsey Forward/.test(t), 'McKinsey Forward missing');
  assert.ok(
    !/cred\.mckinsey\.date'?\s*[:>]\s*'?2025/.test(t),
    'McKinsey date still shows 2025',
  );
});

test('i18n en/ar key parity', () => {
  const t = read('index.html');
  const enStart = t.indexOf('en: {');
  const arStart = t.indexOf('\n      ar: {');
  assert.ok(enStart > 0 && arStart > enStart, 'i18n en/ar blocks not found');
  const arEnd = t.indexOf('\n    };', arStart);
  assert.ok(arEnd > arStart, 'i18n closing not found');
  const enBlock = t.slice(enStart, arStart);
  const arBlock = t.slice(arStart, arEnd);
  const keys = (block) => new Set([...block.matchAll(/^\s*'([^']+)':/gm)].map((m) => m[1]));
  const en = keys(enBlock);
  const ar = keys(arBlock);
  const missingInAr = [...en].filter((k) => !ar.has(k));
  const missingInEn = [...ar].filter((k) => !en.has(k));
  assert.deepEqual(missingInAr, [], `keys present in en but missing in ar: ${missingInAr}`);
  assert.deepEqual(missingInEn, [], `keys present in ar but missing in en: ${missingInEn}`);
});
