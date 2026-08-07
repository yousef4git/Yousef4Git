import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleCV } from '../lib/assemble.mjs';

const master = {
  contact: { name:{en:'Yousef Alshuwayi'}, location:{en:'Riyadh, Saudi Arabia'},
    email:'e@x.com', phone:'+1', links:{linkedin:'l',github:'g',website:'w'} },
  experience: [{ id:'consultant', title:{en:'AI and Software Consultant (Freelance)'},
    org:{en:''}, location:{en:'Riyadh'}, start:'2025', end:'present', bullets:[
      { id:'op_design', tags:['ai','agentic'], text:{en:'design bullet'} },
      { id:'op_cache', tags:['agentic'], text:{en:'cache bullet'} },
      { id:'ghrs', tags:['it'], text:{en:'ghrs bullet'} } ] }],
  projects: [{ id:'rusokh', title:{en:'Rusokh'}, org:{en:''}, location:{en:''},
    start:'2026', end:'2026', bullets:[{ id:'rusokh_desc', tags:['all'], text:{en:'rusokh bullet'} }] }],
  skills: { categories: [
    { key:'programming', label:{en:'Programming'}, items:['Python'] },
    { key:'ai', label:{en:'AI and agents'}, items:['MCP'] } ] },
  education: [{ primary:{en:'B.Sc. Computer Science'}, secondary:{en:'IMSIU'} }],
  certs: [{ name:{en:'Apple AI Program'}, org:{en:'Apple'}, year:'2025', note:{en:''} }],
  languages: [{ label:{en:'Arabic: native'} }],
};

const role = {
  key:'agentic_ai_engineer', file:'Agentic-AI-Engineer',
  title:{en:'Agentic AI Engineer'}, summary:{en:'agent summary'},
  sectionOrder:['summary','skills','experience','projects','education','certs','languages'],
  tags:['agentic','ai'], leadBullets:['op_design','op_cache'],
  skillOrder:['ai','programming'], keywords:['MCP'],
};

test('title and summary come from role', () => {
  const a = assembleCV(master, role, 'en');
  assert.equal(a.title, 'Agentic AI Engineer');
  assert.equal(a.blocks.summary.text, 'agent summary');
});

test('lead bullets come first and ghrs (it-only) is excluded', () => {
  const a = assembleCV(master, role, 'en');
  const ids = a.blocks.experience.entries[0].bullets.map(b => b.id);
  assert.deepEqual(ids, ['op_design','op_cache']);
});

test('skills reordered by skillOrder', () => {
  const a = assembleCV(master, role, 'en');
  assert.deepEqual(a.blocks.skills.groups.map(g => g.label), ['AI and agents','Programming']);
});

test('rtl for arabic', () => {
  const a = assembleCV(master, role, 'ar');
  assert.equal(a.dir, 'rtl');
});

// Education is deliberately undated: the degree is the fact, the timeline is
// not. An entry with no dates must assemble without inventing one.
test('education carries no dates', () => {
  for (const lang of ['en', 'ar']) {
    const a = assembleCV(master, role, lang);
    for (const e of a.blocks.education.entries) {
      assert.equal(e.dates, '', `${lang}: education entry has dates`);
    }
  }
});
