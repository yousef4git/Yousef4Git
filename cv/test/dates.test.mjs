import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fmtRange } from '../lib/dates.mjs';

test('English present-range keeps the "to" joiner', () => {
  assert.equal(fmtRange('2025', 'present', 'en'), '2025 to Present');
});

test('Arabic present-range drops the joiner ("حتى الآن" is already a connector)', () => {
  // Must NOT read "2025 إلى حتى الآن" (to until-now).
  assert.equal(fmtRange('2025', 'present', 'ar'), '2025 حتى الآن');
});

test('English dated range keeps "to"', () => {
  assert.equal(fmtRange('2024-11', '2025-05', 'en'), 'Nov 2024 to May 2025');
});

test('Arabic dated range keeps "إلى"', () => {
  assert.equal(fmtRange('2024-11', '2025-05', 'ar'), 'نوفمبر 2024 إلى مايو 2025');
});

test('single date renders without a joiner', () => {
  assert.equal(fmtRange('2026', '2026', 'ar'), '2026');
  assert.equal(fmtRange('2025', '2025', 'en'), '2025');
});
