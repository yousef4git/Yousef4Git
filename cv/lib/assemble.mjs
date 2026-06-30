import { fmtRange } from './dates.mjs';

const HEADINGS = {
  summary: { en: 'Summary', ar: 'نبذة' },
  skills: { en: 'Skills', ar: 'المهارات' },
  experience: { en: 'Experience', ar: 'الخبرة' },
  projects: { en: 'Projects', ar: 'المشاريع' },
  education: { en: 'Education', ar: 'التعليم' },
  certs: { en: 'Certifications', ar: 'الشهادات' },
  languages: { en: 'Languages', ar: 'اللغات' },
};

const t = (obj, lang) => (obj && (obj[lang] ?? obj.en)) || '';

function includeBullet(b, role) {
  if (role.leadBullets.includes(b.id)) return true;
  if ((b.tags || []).includes('all')) return true;
  return (b.tags || []).some(tag => role.tags.includes(tag));
}

function orderBullets(bullets, role, lang) {
  const included = bullets.filter(b => includeBullet(b, role));
  const lead = role.leadBullets
    .map(id => included.find(b => b.id === id))
    .filter(Boolean);
  const rest = included.filter(b => !role.leadBullets.includes(b.id));
  return [...lead, ...rest].map(b => ({ id: b.id, text: t(b.text, lang) }));
}

function orderEntries(entries, role) {
  if (!role.experienceOrder) return entries;
  const byId = new Map(entries.map(e => [e.id, e]));
  const ordered = role.experienceOrder.map(id => byId.get(id)).filter(Boolean);
  const rest = entries.filter(e => !role.experienceOrder.includes(e.id));
  return [...ordered, ...rest];
}

export function assembleCV(master, role, lang) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const c = master.contact;
  const contactLine = [
    t(c.location, lang), c.email, c.phone, c.links.linkedin, c.links.github, c.links.website,
  ].filter(Boolean).join('  |  ');

  const expEntries = orderEntries(master.experience, role)
    .map(e => ({
      title: t(e.title, lang), org: t(e.org, lang), location: t(e.location, lang),
      dates: fmtRange(e.start, e.end, lang), bullets: orderBullets(e.bullets, role, lang),
    }))
    .filter(e => e.bullets.length > 0);

  const projEntries = master.projects
    .map(p => ({ title: t(p.title, lang), dates: fmtRange(p.start, p.end, lang),
      bullets: orderBullets(p.bullets, role, lang) }))
    .filter(p => p.bullets.length > 0);

  const skillOrder = role.skillOrder || master.skills.categories.map(c2 => c2.key);
  const groups = [...master.skills.categories]
    .sort((a, b) => {
      const ia = skillOrder.indexOf(a.key), ib = skillOrder.indexOf(b.key);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    })
    .map(cat => ({ label: t(cat.label, lang), items: cat.items }));

  const blocks = {
    summary: { kind: 'summary', heading: HEADINGS.summary[lang], text: t(role.summary, lang) },
    skills: { kind: 'skills', heading: HEADINGS.skills[lang], groups },
    experience: { kind: 'experience', heading: HEADINGS.experience[lang], entries: expEntries },
    projects: { kind: 'projects', heading: HEADINGS.projects[lang], entries: projEntries },
    education: { kind: 'simple', heading: HEADINGS.education[lang],
      entries: master.education.map(ed => ({ primary: t(ed.primary, lang), secondary: t(ed.secondary, lang), dates: ed.dates })) },
    certs: { kind: 'certs', heading: HEADINGS.certs[lang],
      entries: master.certs.map(ct => ({ name: t(ct.name, lang), org: t(ct.org, lang), year: ct.year, note: t(ct.note, lang) })) },
    languages: { kind: 'inline', heading: HEADINGS.languages[lang],
      items: master.languages.map(l => t(l.label, lang)) },
  };

  return {
    lang, dir, name: t(c.name, lang), title: t(role.title, lang),
    contactLine, keywords: role.keywords || [], order: role.sectionOrder, blocks,
  };
}
