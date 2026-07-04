import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderHTML } from '../lib/render.mjs';

const assembled = {
  lang:'en', dir:'ltr', name:'Yousef Alshuwayi', title:'Agentic AI Engineer',
  contactLine:'Riyadh  |  e@x.com', keywords:['MCP'],
  order:['summary','skills','experience'],
  blocks:{
    summary:{kind:'summary', heading:'Summary', text:'agent summary'},
    skills:{kind:'skills', heading:'Skills', groups:[{label:'AI and agents', items:['MCP','LangGraph']}]},
    experience:{kind:'experience', heading:'Experience', entries:[
      {title:'AI and Software Consultant (Freelance)', org:'', location:'Riyadh',
       dates:'2025 to Present', bullets:[{id:'op_design', text:'design bullet'}]}]},
  },
};

test('renders title, name, heading, and a bullet', () => {
  const html = renderHTML(assembled, 'body{}');
  assert.match(html, /Yousef Alshuwayi/);
  assert.match(html, /Agentic AI Engineer/);
  assert.match(html, /<h2[^>]*>Experience<\/h2>/);
  assert.match(html, /design bullet/);
});

test('sets dir and lang attributes', () => {
  const html = renderHTML({ ...assembled, dir:'rtl', lang:'ar' }, 'body{}');
  assert.match(html, /<html lang="ar" dir="rtl">/);
});

test('escapes HTML special characters', () => {
  const html = renderHTML({ ...assembled, name:'A & <B>' }, 'body{}');
  assert.match(html, /A &amp; &lt;B&gt;/);
  assert.doesNotMatch(html, /<B>/);
});
