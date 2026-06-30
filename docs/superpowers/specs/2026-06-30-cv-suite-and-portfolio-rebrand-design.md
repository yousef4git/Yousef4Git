# CV Suite + Portfolio Rebrand — Design

Date: 2026-06-30
Owner: Yousef Alshuwayi
Status: Approved (design); pending spec review

## 1. Problem

The current resume and website sell Yousef as a serial founder running three
companies. Across 2025 and 2026 they stack five or more Founder, CEO, and CTO
titles, two of them only one to three months long (FREIGHTLX, Startup Hub
Riyadh). To a recruiter screening for an engineer or IT role this reads as
scattered, overqualified, and uncommitted. The strongest real asset (a paid
client risk-triage system, documented in `docs/Presintation.pptx`) barely
appears.

## 2. Goal

1. One master source of facts in a plain, humble, accurate voice.
2. Eight role-tailored, ATS-safe CVs generated from that master, in English and
   Arabic (16 documents).
3. A website and chatbot that tell the same story, so the public brand and the
   CVs agree.

## 3. Positioning strategy (the spine)

Lead with what is rare and true, in Yousef's own words:

> Operations at national scale, real teaching, and hands-on AI engineering, in
> one person, with a computer science degree in progress.

Every CV leads with engineering and that operations edge. Founder titles are
consolidated so nothing reads as job-hopping or "too senior to hire."

## 4. Voice and style rules (apply everywhere: CVs, website, chatbot)

- Plain, simple words. Do not make anything bigger than it is.
- No em-dashes. Use commas, periods, colons, parentheses, or a middot.
- No marketing or AI-sounding phrasing. Banned examples: "Arabic-first",
  "shipped solo in 3 weeks" as a boast, "full power", "deploy it, not demo it".
- Humble framing for the founder work (see Section 5).
- State facts and let them stand. Numbers are fine when real.

## 5. Master content (the facts, approved voice)

### Contact
- Name: Yousef Alshuwayi (Arabic: يوسف الشويعي). Standardize on this spelling
  even though the McKinsey badge reads "Yousef Ali Alshuwaiy".
- Location: Riyadh, Saudi Arabia
- Email: yousefalshuwayi@gmail.com
- Phone: +966 50 600 7446
- LinkedIn: linkedin.com/in/yousefalshuwayi
- GitHub: github.com/Yousef4Git
- Website: yousefalshuwayi.online

### Experience (consolidated)

**AI and Software Consultant (Freelance), Riyadh. 2025 to Present.**
Master bullet pool (the generator selects and orders per role):
- `op_design`: Built a document intake and risk-triage system for an education
  platform. It reads facilitator notes, scores each student's risk with fixed
  rules, and uses an AI model only for the Arabic text, never for the scoring.
- `op_integrity`: Caught that part of the source data was corrupted, with notes
  filed under the wrong students, reported it in a data-quality review, and kept
  it out of anything a parent would see.
- `op_cache`: Made re-runs cheap with caching. A full run was about 71 model
  calls; later runs were about 5.
- `op_judge`: Added an AI check on the AI-written messages before a person
  approved them (an LLM-as-judge step).
- `ghrs`: Through GHRS, delivered client work for Saudi businesses: rebuilt
  websites, automated WhatsApp Business, and connected internal tools to
  customer channels.
- `freightlx`: Advised an early logistics startup (FREIGHTLX) as an AI
  consultant on scope and build.

**Tutor, Shaguf. Jan 2022 to Present.**
- `tutor_scale`: Taught 1,800+ computer science students over four years at a
  4.9 of 5 rating.
- `tutor_method`: Built lesson plans and follow-up that worked across different
  skill levels.

**Staff Manager, Riyadh Metro Launch (YAX, Your Amazing Xperience). Nov 2024 to
May 2025.**
- `metro_scale`: Prepared 1,500 staff across 45 stations in one month for the
  metro opening, which served over 30 million visitors.
- `metro_coord`: Coordinated between the operating companies and the Royal
  Commission. The contract was extended three months after the launch.
- `metro_promo`: Promoted from Coordinator (Jun 2024 to Nov 2024), where I
  recruited and scheduled staff across Saudi Arabia and abroad.

**Operations Team Member, Allure Event. Nov 2022 to Oct 2024.**
- `allure`: Handled on-site logistics for large events.

### Projects
- `rusokh`: Rusokh, course platform (personal project), 2026. As an instructor I
  hit the same problems on other course platforms, so I built my own. Next.js,
  Convex, payments, and video, in Arabic and English. It is live and in use.
- `trayath`: Trayath, built in Apple's AI program, 2025. A simple assistant that
  helps people make better day-to-day financial decisions. Built during the
  program (1 of 66 selected from over 400,000 applicants).

### Skills (master categories; generator reorders per role)
- Programming: Python, TypeScript, JavaScript, SQL
- AI and agents: LLMs, RAG, prompt engineering, LangChain, LangGraph, CrewAI,
  AutoGen, MCP, agent evaluation (LLM-as-judge), AgentOps
- Web and full-stack: Next.js, React, Tailwind CSS, FastAPI, Node, Convex
- Data: PostgreSQL, pgvector, Redis
- Cloud and infrastructure: AWS, Docker, GitHub Actions
- Ways of working: Git, CI/CD, requirements gathering, technical planning,
  stakeholder communication

Note: AWS replaces Google Cloud Run as the primary cloud. ML-specific tools
(pandas, NumPy, scikit-learn) to be confirmed before they appear on the ML CV;
only list what Yousef can defend in an interview.

### Education
- B.Sc. Computer Science, Imam Muhammad ibn Saud Islamic University (IMSIU),
  Riyadh. Expected Jan 2027.

### Certifications and programs
- Agentic AI Bootcamp, SDA Academy, 2026. Seven weeks, selective admission;
  LangGraph, CrewAI, AutoGen, MCP, RAG, AgentOps; real UK and Canada startup
  projects. (Completed; certificate not yet issued. List as completed, do not
  write "in progress".)
- McKinsey Forward, McKinsey & Company, 2026.
- Apple AI Program, Apple Developer Academy and Tuwaiq, 2025. 1 of 66 selected
  from over 400,000 applicants.
- Introduction to Artificial Intelligence, KAUST Academy, 2026. 40 hours.
- Data Science and Machine Learning scholarship, KAUST Academy, 2025.
- Data Collection and Processing with Python, University of Michigan, 2025.
- Introduction to Data Science, University of Michigan, 2025.
- Vibe Coding, SDAIA, 2026.

### Languages
- Arabic: native
- English: intermediate

### Removed or changed from the old materials
- Replyli: removed entirely.
- GHRS: from "Founder and CEO" to consulting work under the freelance umbrella.
- FREIGHTLX: from "CTO and Co-Founder" to "AI consultant".
- Rusokh: from "Founder and CEO" of a company to a personal project.
- YAX Coordinator and Staff Manager: merged into one entry with promotion.
- McKinsey Forward date corrected to 2026.

## 6. The eight CVs

All share the master content. Each tunes: title, summary, skill order, which
bullets lead, and ATS keywords. Section order is the same unless noted.

| # | Role | Lead experience and bullets | ATS keywords (sample) |
|---|------|------------------------------|------------------------|
| 1 | AI Engineer | `op_design`, `op_integrity`, `trayath`, `rusokh` | Python, LLM, RAG, machine learning, model evaluation |
| 2 | Agentic AI Engineer | `op_design`, `op_judge`, `op_cache` | LangGraph, CrewAI, AutoGen, MCP, AgentOps, LLM evaluation |
| 3 | Full-Stack Developer | `rusokh`, `ghrs`, `op_design` | Next.js, React, TypeScript, FastAPI, PostgreSQL, REST |
| 4 | Machine Learning Engineer | data/ML coursework, `op_design`, `trayath` | Python, machine learning, data pipelines, evaluation |
| 5 | IT Specialist | `ghrs`, AWS/infra skills, `metro_scale` | troubleshooting, AWS, automation, systems, support |
| 6 | IT Planning / Project Coordinator | `metro_scale`, `metro_coord`, `ghrs` | project coordination, planning, stakeholders, requirements |
| 7 | Solutions / Forward-Deployed AI Engineer | `op_design`, `ghrs`, `op_integrity` | client delivery, integration, solutions, onboarding |
| 8 | Technical Product/Program Manager | `metro_scale`, `rusokh`, `ghrs` | roadmap, delivery, stakeholders, product, program |

### Role summaries (approved voice)

1. **AI Engineer:** AI engineer and computer science student in Riyadh. I build
   practical AI systems end to end, from data intake to a working product. I
   built a risk-triage system for an education platform and a financial-decision
   assistant in Apple's AI program, and I have run operations at national scale.
2. **Agentic AI Engineer:** Agentic AI engineer and computer science student in
   Riyadh. I build agent systems with LangGraph, CrewAI, AutoGen, and MCP, and I
   keep AI out of the parts where plain rules are safer. I designed a risk-triage
   system where rules do the scoring and the model only handles language, with an
   LLM-as-judge check before anything reaches a person.
3. **Full-Stack Developer:** Full-stack developer and computer science student in
   Riyadh. I build web products with Next.js, React, TypeScript, and FastAPI. I
   built and shipped Rusokh, a course platform now live in production, and
   deliver client web work through GHRS.
4. **Machine Learning Engineer:** Computer science student and applied ML
   engineer in Riyadh. I work with Python and data, build and evaluate models,
   and ship AI features into real products. KAUST data science and machine
   learning scholarship, plus University of Michigan data science courses.
5. **IT Specialist:** IT specialist and computer science student in Riyadh. I set
   up and connect systems, automate manual work, and support users. I rebuilt
   websites, automated WhatsApp Business, and connected internal tools to
   customer channels, and I work with AWS, Docker, and GitHub Actions.
6. **IT Planning / Project Coordinator:** IT planning and project coordinator
   with a computer science background. I plan and coordinate delivery across
   teams. I prepared 1,500 staff across 45 stations for the Riyadh Metro launch
   in one month, coordinated between operating companies and the Royal
   Commission, and now plan and deliver technical projects for clients.
7. **Solutions / Forward-Deployed AI Engineer:** Solutions engineer and computer
   science student in Riyadh. I work directly with clients to turn a problem into
   a working system. I built a risk-triage system for an education platform,
   deliver web and automation work through GHRS, and explain technical choices in
   plain language.
8. **Technical Product/Program Manager:** Technical program manager with
   engineering and large-scale operations experience. I deliver projects from
   plan to launch. I prepared 1,500 staff for the Riyadh Metro launch, built and
   shipped a course platform, and coordinate technical delivery with clients.
   McKinsey Forward program.

## 7. ATS requirements (baked into the template)

- Single column.
- Real selectable text. No images or icons carrying content.
- Standard section headings: Summary, Skills, Experience, Projects, Education,
  Certifications, Languages.
- Standard, widely available fonts. Latin for English; a clean Arabic face
  (for example Cairo or IBM Plex Sans Arabic) for the Arabic version.
- Contact details in the body at the top, not in a PDF header or footer.
- Consistent dates in `MMM YYYY` form.
- No photo on the ATS version. An optional photo variant can be added later for
  in-person Saudi use.
- Arabic version is full RTL with correct alignment and punctuation.
- One page where possible; two pages maximum.
- File names: `Yousef-Alshuwayi-<Role>.pdf` and
  `Yousef-Alshuwayi-<Role>-ar.pdf`.

## 8. Generator architecture

```
cv/
  data/master.json        all facts, bilingual (en, ar), bullets carry ids and tags
  roles/<role>.json       per role: title, summary, skill order, lead bullet ids, keywords
  template/cv.html        one single-column template, supports dir=ltr and dir=rtl
  template/cv.css         print styles, @page margins, A4
  build.mjs               Node script: master + role + lang -> HTML -> PDF
  output/                 the 16 PDFs
```

Data shapes:

```jsonc
// master.json
{
  "contact": { "name": {"en": "...", "ar": "..."}, "location": {"en","ar"},
               "email": "...", "phone": "...",
               "links": {"linkedin": "...", "github": "...", "website": "..."} },
  "experience": [ { "id": "...", "title": {"en","ar"}, "org": {"en","ar"},
                    "location": {"en","ar"}, "start": "...", "end": "...",
                    "bullets": [ { "id": "op_design", "tags": ["ai","agentic"],
                                   "text": {"en": "...", "ar": "..."} } ] } ],
  "projects": [ /* same bullet shape */ ],
  "skills": { "categories": [ { "label": {"en","ar"}, "items": ["..."] } ] },
  "education": [ ... ], "certs": [ ... ], "languages": [ ... ]
}

// roles/agentic_ai_engineer.json
{
  "key": "agentic_ai_engineer",
  "title": {"en": "Agentic AI Engineer", "ar": "..."},
  "summary": {"en": "...", "ar": "..."},
  "sectionOrder": ["summary","skills","experience","projects","education","certs","languages"],
  "leadBullets": ["op_design","op_judge","op_cache"],
  "skillOrder": ["AI and agents","Programming","Web and full-stack","Data","Cloud and infrastructure","Ways of working"],
  "keywords": ["LangGraph","CrewAI","AutoGen","MCP","AgentOps","LLM evaluation"]
}
```

Build flow (`build.mjs`):
1. Load `master.json` and each `roles/*.json`.
2. For each role and each language, assemble sections. Within experience, place
   `leadBullets` first, then remaining bullets tagged for the role; drop bullets
   irrelevant to the role to keep length down.
3. Render the template (a plain template-literal function, no framework) with the
   correct `dir` and `lang`, inject an invisible keyword line for ATS.
4. Write a temporary HTML file, then call headless Chrome to print the PDF:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new
   --disable-gpu --no-pdf-header-footer --print-to-pdf=output/<name>.pdf
   file://<temp.html>`.
5. Verify each PDF has selectable text (`pdftotext` is installed) and a sane page
   count.

Constraints: zero npm dependencies; uses the Chrome already installed and Node
v26. `.docx` output is out of scope for now (PDFs are ATS-parseable); can be
added with pandoc on request.

## 9. Website changes (keep the gold and dark identity, change content and structure)

Target file: `index.html` (single file, inline CSS and JS, bilingual via
`data-key` i18n map).

- Hero: rewrite the tagline in plain voice. Keep the name treatment.
- "02 Proof / Scale in numbers": keep the real numbers (30M visitors, 1,500
  staff, 1,800 students at 4.9, 1 of 66). Plain captions.
- "03 Ventures / Three companies. One operator.": replace with a **Selected
  work** section. Three items: the risk-triage system (anonymized education
  platform), Rusokh (personal project), and GHRS client work. Remove Replyli.
- "04 Trajectory": update to the consolidated, humble timeline from Section 5.
- "05 Currently Running" and "on agentic AI": rewrite plainly; SDA bootcamp is
  completed.
- "06 Stack": AWS in, Google Cloud out. Keep accurate tools only.
- "07 Certificates": SDA completed, McKinsey Forward 2026, no "in progress".
- "08 Connect": keep. Optional: link to the generated CVs.
- i18n: keep English and Arabic in parity for every rewrite. No em-dashes in
  either language.

A deeper visual redesign is out of scope here; this phase aligns content and
structure to the new positioning.

## 10. Chatbot and README

- `theChatBot/me/summary.txt`: rewrite to match Section 5. This is the chatbot's
  knowledge, and it currently tells the old "running three companies" story.
  Verify in `theChatBot/app.py` which profile files are ingested (summary.txt
  and possibly `me/linkedin.pdf`) and update all of them.
- `README.md`: update the About, Currently Building table (remove Replyli,
  reframe GHRS and Rusokh), Credentials (SDA completed, McKinsey 2026), and
  remove "Arabic-first" and similar phrasing.

## 11. Build sequence

1. Foundation: write `cv/data/master.json` from Section 5. Lock the voice.
2. Golden sample: build one full CV (Agentic AI Engineer, English). Review look
   and voice. Adjust the template and voice once here.
3. Fan out: the other seven English CVs.
4. Arabic: all eight in Arabic, full RTL.
5. Website: rewrite `index.html` content and the Selected work section.
6. Chatbot and README: update to match.

Recommended order is CV-first so job applications are unblocked early, then the
website and chatbot follow from the same facts. (Alternatives considered:
CVs-only, or website-first. Rejected because the site would keep contradicting
the CVs, and the urgent need is applications.)

## 12. Non-goals (YAGNI)

- No web UI for CV generation; it is a local build script.
- No automated job applications.
- No `.docx` output in this phase (PDF is ATS-parseable; add later if needed).
- No cover-letter generator in this phase (possible later extension).
- No full visual redesign of the website in this phase.

## 13. Confirmed decisions

1. Consultant umbrella starts 2025.
2. Client stays anonymized as "an education platform". Can be flipped to name
   the client on request.
3. No photo on the ATS CVs; optional photo variant later.
4. English stays "intermediate".
5. PDF primary; `.docx` only on request.

## 14. Open items to confirm during implementation

- ML CV skills: confirm pandas, NumPy, scikit-learn before listing them.
- Whether to surface CV download links on the website Connect section.
- Arabic job titles for each role (translate and confirm natural phrasing).
