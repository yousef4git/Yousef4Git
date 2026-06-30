import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { loadMaster } from './lib/loadData.mjs';
import { assembleCV } from './lib/assemble.mjs';
import { renderHTML } from './lib/render.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME_BIN
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = path.join(HERE, 'output');
const TMP = path.join(OUT, '.tmp');
const CSS = fs.readFileSync(path.join(HERE, 'template', 'cv.css'), 'utf8');

export function loadRole(key) {
  return JSON.parse(fs.readFileSync(path.join(HERE, 'roles', `${key}.json`), 'utf8'));
}
export function allRoleKeys() {
  return fs.readdirSync(path.join(HERE, 'roles'))
    .filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, '')).sort();
}

export function buildOne(master, role, lang, opts = {}) {
  fs.mkdirSync(TMP, { recursive: true });
  const suffix = lang === 'ar' ? '-ar' : '';
  const base = `Yousef-Alshuwayi-${role.file}${suffix}`;
  const htmlPath = path.join(TMP, `${base}.html`);
  const pdfPath = path.join(OUT, `${base}.pdf`);
  fs.writeFileSync(htmlPath, renderHTML(assembleCV(master, role, lang), CSS));
  const chrome = opts.chrome || CHROME;
  const r = spawnSync(chrome, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    '--no-sandbox', '--virtual-time-budget=3000',
    `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`,
  ], { encoding: 'utf8' });
  if (r.status !== 0 && !fs.existsSync(pdfPath)) {
    throw new Error(`Chrome failed for ${base}: ${r.stderr || r.error}`);
  }
  return { pdfPath, htmlPath };
}

export function verifyPdf(pdfPath) {
  const text = spawnSync('pdftotext', [pdfPath, '-'], { encoding: 'utf8' }).stdout || '';
  const info = spawnSync('pdfinfo', [pdfPath], { encoding: 'utf8' }).stdout || '';
  const m = info.match(/Pages:\s+(\d+)/);
  return { text, pages: m ? Number(m[1]) : 0 };
}

function parseArgs(argv) {
  const args = { langs: ['en'], all: false, role: null };
  for (const a of argv) {
    if (a === '--all') args.all = true;
    else if (a.startsWith('--role=')) args.role = a.slice(7);
    else if (a.startsWith('--lang=')) args.langs = a.slice(7).split(',');
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const master = loadMaster(path.join(HERE, 'data', 'master.json'));
  const keys = args.all ? allRoleKeys() : [args.role].filter(Boolean);
  if (keys.length === 0) { console.error('Pass --role=<key> or --all'); process.exit(1); }
  for (const key of keys) {
    const role = loadRole(key);
    for (const lang of args.langs) {
      const { pdfPath } = buildOne(master, role, lang);
      const { pages } = verifyPdf(pdfPath);
      console.log(`built ${path.basename(pdfPath)} (${pages} page(s))`);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
