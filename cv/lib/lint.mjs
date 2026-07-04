const BANNED = [
  'arabic-first', 'arabic first', 'running three companies', 'one operator',
  'full power', 'shipped solo', 'deploy it', 'demo it',
  'founder & ceo', 'founder and ceo',
];

export function findViolations(text) {
  const out = [];
  const s = String(text);
  if (s.includes('—')) out.push({ type: 'em-dash', match: '—' });
  if (s.includes('–')) out.push({ type: 'en-dash', match: '–' });
  const lower = s.toLowerCase();
  for (const phrase of BANNED) {
    if (lower.includes(phrase)) out.push({ type: 'banned-phrase', match: phrase });
  }
  return out;
}
