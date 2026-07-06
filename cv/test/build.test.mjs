import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadMaster } from '../lib/loadData.mjs';
import { buildOne, loadRole, verifyPdf, allRoleKeys } from '../build.mjs';
import { findViolations } from '../lib/lint.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const master = loadMaster(path.join(here, '..', 'data', 'master.json'));

test('golden sample builds, has text, keywords, and <=2 pages', () => {
  const role = loadRole('agentic_ai_engineer');
  const { pdfPath } = buildOne(master, role, 'en');
  assert.ok(fs.existsSync(pdfPath));
  const { text, pages } = verifyPdf(pdfPath);
  assert.match(text, /Yousef Alshuwayi/);
  assert.match(text, /LangGraph/);
  assert.match(text, /experience/i);
  assert.ok(pages >= 1 && pages <= 2, `pages=${pages}`);
  assert.deepEqual(findViolations(text), []);
});

test('every English CV builds with name, its title, keywords, <=2 pages, clean text', () => {
  for (const key of allRoleKeys()) {
    const role = loadRole(key);
    const { pdfPath } = buildOne(master, role, 'en');
    const { text, pages } = verifyPdf(pdfPath);
    assert.match(text, /Yousef Alshuwayi/, key);
    assert.ok(text.includes(role.title.en), `${key}: title missing`);
    const hits = role.keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()));
    assert.ok(hits.length >= 2, `${key}: keywords found=${hits.length}`);
    assert.ok(pages >= 1 && pages <= 2, `${key}: pages=${pages}`);
    assert.deepEqual(findViolations(text), [], `${key}: voice violations`);
  }
});

// The suite ships English-only since 2026-07-05 (Arabic strings stay in the
// data so Arabic builds can return with `--lang=ar`; nothing verifies them).
