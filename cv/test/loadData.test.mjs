import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadMaster, collectText } from '../lib/loadData.mjs';
import { findViolations } from '../lib/lint.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const MASTER = path.join(here, '..', 'data', 'master.json');

test('master loads with required sections', () => {
  const m = loadMaster(MASTER);
  for (const k of ['contact','experience','projects','skills','education','certs','languages']) {
    assert.ok(m[k], `missing ${k}`);
  }
});

test('bullet ids are unique', () => {
  const m = loadMaster(MASTER);
  const ids = [...m.experience, ...m.projects].flatMap(e => e.bullets.map(b => b.id));
  assert.equal(ids.length, new Set(ids).size);
});

test('all English text passes the linter', () => {
  const m = loadMaster(MASTER);
  const bad = collectText(m, 'en').flatMap(findViolations);
  assert.deepEqual(bad, [], JSON.stringify(bad));
});
