const esc = (s) => String(s)
  .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');

function renderBlock(b) {
  if (b.kind === 'summary') return `<p class="summary">${esc(b.text)}</p>`;
  if (b.kind === 'skills') {
    return b.groups.map(g =>
      `<div class="skill-row"><span class="skill-label">${esc(g.label)}</span>`
      + `<span class="skill-items">${g.items.map(esc).join(', ')}</span></div>`).join('');
  }
  if (b.kind === 'experience') {
    return b.entries.map(e => {
      const org = e.org ? `, ${esc(e.org)}` : '';
      const lis = e.bullets.map(x => `<li>${esc(x.text)}</li>`).join('');
      const sub = e.location ? `<div class="entry-sub">${esc(e.location)}</div>` : '';
      return `<div class="entry"><div class="entry-head">`
        + `<span class="entry-title">${esc(e.title)}${org}</span>`
        + `<span class="entry-dates">${esc(e.dates)}</span></div>`
        + `${sub}<ul>${lis}</ul></div>`;
    }).join('');
  }
  if (b.kind === 'projects') {
    return b.entries.map(e => {
      const lis = e.bullets.map(x => `<li>${esc(x.text)}</li>`).join('');
      return `<div class="entry"><div class="entry-head">`
        + `<span class="entry-title">${esc(e.title)}</span>`
        + `<span class="entry-dates">${esc(e.dates)}</span></div><ul>${lis}</ul></div>`;
    }).join('');
  }
  if (b.kind === 'simple') {
    return b.entries.map(e =>
      `<div class="entry"><div class="entry-head">`
      + `<span class="entry-title">${esc(e.primary)}</span>`
      + `<span class="entry-dates">${esc(e.dates)}</span></div>`
      + `<div class="entry-sub">${esc(e.secondary)}</div></div>`).join('');
  }
  if (b.kind === 'certs') {
    return b.entries.map(e => {
      const note = e.note ? ` ${esc(e.note)}` : '';
      return `<div class="cert"><span class="cert-name">${esc(e.name)}</span>, `
        + `${esc(e.org)}, ${esc(e.year)}.${note}</div>`;
    }).join('');
  }
  if (b.kind === 'inline') {
    return `<p class="inline">${b.items.map(esc).join('  ·  ')}</p>`;
  }
  return '';
}

export function renderHTML(a, css) {
  const sections = a.order.map(id => {
    const b = a.blocks[id];
    if (!b) return '';
    return `<section><h2>${esc(b.heading)}</h2>${renderBlock(b)}</section>`;
  }).join('');

  return `<!doctype html>
<html lang="${esc(a.lang)}" dir="${esc(a.dir)}">
<head><meta charset="utf-8"><title>${esc(a.name)} CV</title>
<style>${css}</style></head>
<body>
<header>
  <h1>${esc(a.name)}</h1>
  <div class="role">${esc(a.title)}</div>
  <div class="contact">${esc(a.contactLine)}</div>
</header>
<main>${sections}</main>
</body></html>`;
}
