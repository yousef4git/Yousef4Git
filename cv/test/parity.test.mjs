import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadMaster } from '../lib/loadData.mjs';
import { findViolations } from '../lib/lint.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROLES = path.join(here, '..', 'roles');

function walkPairs(node, out = []) {
  if (node && typeof node === 'object') {
    if ('en' in node && typeof node.en === 'string') out.push(node);
    else for (const v of Object.values(node)) walkPairs(v, out);
  }
  return out;
}

test('every non-empty English text object has a non-empty Arabic counterpart', () => {
  const m = loadMaster(path.join(here, '..', 'data', 'master.json'));
  const missing = walkPairs(m).filter(o => o.en && !(o.ar && o.ar.trim()));
  assert.deepEqual(missing.map(o => o.en), []);
});

test('every role has Arabic title and summary', () => {
  for (const f of fs.readdirSync(ROLES).filter(x => x.endsWith('.json'))) {
    const r = JSON.parse(fs.readFileSync(path.join(ROLES, f), 'utf8'));
    assert.ok(r.title.ar && r.title.ar.trim(), `${f}: title.ar`);
    assert.ok(r.summary.ar && r.summary.ar.trim(), `${f}: summary.ar`);
  }
});

test('Arabic text has no em-dash or en-dash', () => {
  const m = loadMaster(path.join(here, '..', 'data', 'master.json'));
  const bad = walkPairs(m).flatMap(o => o.ar ? findViolations(o.ar) : [])
    .filter(v => v.type !== 'banned-phrase');
  assert.deepEqual(bad, []);
});
