import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROLES = path.join(here, '..', 'roles');

// Certificate / program identifiers that must never appear in a role summary.
// The summary sells the person; certificate names belong in the Certifications
// section only. Curated to proper-noun cert tokens to avoid false positives.
const CERT_TOKENS = [
  'Apple', 'McKinsey', 'KAUST', 'Michigan', 'SDAIA', 'SDA Academy',
  'Bootcamp', 'scholarship', 'Vibe Coding',
  'ميشيغان', 'منحة', 'معسكر', 'برنامج Apple',
];

function roleFiles() {
  return fs.readdirSync(ROLES).filter((f) => f.endsWith('.json'));
}

test('no role summary names a certificate or program (en and ar)', () => {
  const offenders = [];
  for (const f of roleFiles()) {
    const r = JSON.parse(fs.readFileSync(path.join(ROLES, f), 'utf8'));
    for (const lang of ['en', 'ar']) {
      const text = String(r.summary?.[lang] || '');
      for (const token of CERT_TOKENS) {
        if (text.toLowerCase().includes(token.toLowerCase())) {
          offenders.push(`${f} (${lang}): "${token}"`);
        }
      }
    }
  }
  assert.deepEqual(offenders, [], `cert names found in summaries:\n${offenders.join('\n')}`);
});
