import fs from 'node:fs';

const REQUIRED = ['contact','experience','projects','skills','education','certs','languages'];

export function loadMaster(p) {
  const m = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const k of REQUIRED) if (!m[k]) throw new Error(`master.json missing "${k}"`);
  return m;
}

function pick(obj, lang) {
  if (obj && typeof obj === 'object' && ('en' in obj || 'ar' in obj)) {
    return typeof obj[lang] === 'string' ? [obj[lang]] : [];
  }
  return [];
}

export function collectText(m, lang) {
  const out = [];
  const push = (o) => out.push(...pick(o, lang));
  push(m.contact.location);
  for (const e of [...m.experience, ...m.projects]) {
    push(e.title); push(e.org); push(e.location);
    for (const b of (e.bullets || [])) push(b.text);
  }
  for (const c of m.skills.categories) { push(c.label); }
  for (const ed of m.education) { push(ed.primary); push(ed.secondary); }
  for (const c of m.certs) { push(c.name); push(c.org); push(c.note); }
  for (const l of m.languages) push(l.label);
  return out.filter(Boolean);
}
