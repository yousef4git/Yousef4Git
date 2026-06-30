import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findViolations } from '../lib/lint.mjs';

test('flags em-dash', () => {
  const v = findViolations('operations at scale — and AI');
  assert.equal(v.some(x => x.type === 'em-dash'), true);
});

test('flags banned phrase case-insensitively', () => {
  const v = findViolations('An Arabic-First platform');
  assert.equal(v.some(x => x.type === 'banned-phrase' && x.match === 'arabic-first'), true);
});

test('clean text has no violations', () => {
  assert.deepEqual(findViolations('I build practical AI systems. It is live and in use.'), []);
});
