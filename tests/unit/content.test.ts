import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { siteContent, credentialById } from "../../content/site";

const RETRACTED = ["100%", "16 days", "Sixteen days", "30M", "30 million", "Arabic-first", "520 code", "21 database", "45 Riyadh Metro", "45 stations"];

// A claim followed by a sentence whose only job is to qualify it reads as
// machine-written. Facts carry their own context in one sentence or not at all.
const HEDGES = [
  /Not a claim/i,
  /Not a lifetime/i,
  /not guessed/i,
  /Not 88%/i,
  /based on the session attendance record/i,
  /remained (open|follow-up work)/i,
  /Product test screenshot/i,
  /demonstration data/i,
  /not a measured/i,
];

// Internal system and vendor names, record counts and unreleased status at
// Noon stay out of everything public: the page, the chat grounding, the
// README and the CV data. Named clients and the Apple applicant count go too.
const CONFIDENTIAL = [
  /Citadel/i,
  /ZenHR/i,
  /Noon Admin/i,
  /\b218\b/,
  /40 (employee )?records/i,
  /\bTalah\b/i,
  /400,000/,
  /400k/i,
  /FREIGHTLX/i,
  /classroom pilot/i,
  /pilot next/i,
];

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

describe("noon content", () => {
  const { noon, workSection, experience } = siteContent;

  it("carries the four public projects in order", () => {
    expect(noon.projects.map((p) => p.id)).toEqual([
      "noon-training-development",
      "noon-ops-hr-integration",
      "noon-mcit-genai",
      "noon-ai-week",
    ]);
  });

  it("splits the four cases between Selected work and the Experience fold without losing one", () => {
    const shown = [...workSection.noonCases, ...experience.noonMore.projects].sort();
    expect(shown).toEqual([...noon.projects.map((p) => p.id)].sort());
    expect(workSection.noonCases).toEqual(["noon-training-development", "noon-mcit-genai"]);
  });

  it("gives every case a one-paragraph summary for its card", () => {
    for (const p of noon.projects) {
      expect(p.summary.length, p.id).toBeGreaterThan(60);
      expect(p.summary, p.id).not.toMatch(/\b(we|our)\b/i);
    }
  });

  it("names the employer as Noon Academy", () => {
    expect(noon.title).toBe("Noon Academy");
    expect(noon.meta).toContain("AI Systems Engineer");
    expect(noon.logoAlt).toBe("Noon Academy");
    expect(workSection.noonContext).toBe("Built at Noon Academy");
  });

  it("points every media entry at a shipped file with alt text and a caption", () => {
    for (const p of noon.projects) {
      for (const m of p.media) {
        expect(existsSync(path.join(process.cwd(), "public", m.src)), m.src).toBe(true);
        expect(m.alt.length).toBeGreaterThan(10);
        expect(m.caption.length).toBeGreaterThan(10);
        expect(m.width).toBeGreaterThan(0);
        expect(m.height).toBeGreaterThan(0);
      }
    }
  });

  it("shows the training portal with its four images and no month in its status line", () => {
    const training = noon.projects.find((p) => p.id === "noon-training-development")!;
    expect(training.media).toHaveLength(4);
    expect(training.treatment).toBe("wide");
    expect(training.status).toBe("Live");
    expect(training.statusDetail).toBeNull();
  });

  it("shows the MCIT strip with ten screens and a plain Live status", () => {
    const mcit = noon.projects.find((p) => p.id === "noon-mcit-genai")!;
    expect(mcit.media).toHaveLength(10);
    expect(mcit.treatment).toBe("strip");
    expect(mcit.status).toBe("Live");
    expect(JSON.stringify(mcit)).not.toMatch(/pilot/i);
  });

  it("describes the HR integration without system or vendor names or record counts", () => {
    const hr = noon.projects.find((p) => p.id === "noon-ops-hr-integration")!;
    expect(hr.title).toBe("Ops-to-HR placement integration");
    expect(hr.metrics).toHaveLength(0);
    expect(hr.media).toHaveLength(0);
    expect(hr.treatment).toBe("flow");
    expect(hr.flow?.from.name).toBe("Ops system");
    expect(hr.flow?.to.name).toBe("HR platform");
    expect(hr.outcomes).toEqual([
      "Go-live reconciled a few hundred records with zero errors.",
      "Routine placement changes reach HR records without manual re-entry.",
    ]);
  });

  it("keeps the AI Week numbers and the artwork without a named co-presenter", () => {
    const week = noon.projects.find((p) => p.id === "noon-ai-week")!;
    expect(week.metrics.map((m) => m.value)).toEqual(["525", "88%"]);
    expect(week.media.map((m) => m.src)).toEqual(["/media/noon/ai-week-programme-artwork.png"]);
    expect(week.treatment).toBe("poster");
    expect(JSON.stringify(week)).not.toMatch(/Talah/);
    // Attendance and survey responses stay two different numbers.
    expect(week.summary).toMatch(/525 attendees/);
    expect(week.summary).toMatch(/88% positive responses in the end-of-session survey/);
  });

  it("links the two public Noon sites and nothing internal", () => {
    const hrefs = Object.fromEntries(noon.projects.map((p) => [p.id, p.links.map((l) => l.href)]));
    expect(hrefs["noon-training-development"]).toEqual(["https://trainingat.noon.edu.sa/"]);
    expect(hrefs["noon-mcit-genai"]).toEqual(["https://noonai.noon.edu.sa/"]);
    expect(hrefs["noon-ops-hr-integration"]).toEqual([]);
  });

  // The early placement tool was dropped from the Noon intro in the October
  // 2026 copy review. It never gets a card or a system name.
  it("gives the early placement tool no card and no system names", () => {
    expect(noon.projects.some((p) => /placement/i.test(p.id))).toBe(false);
    expect(noon.intro).toBe(
      "At Noon Academy, I build training platforms, AI learning experiences and operational integrations, working with the teams that use them."
    );
  });

  it("carries no technology lists", () => {
    for (const p of noon.projects) {
      expect(p).not.toHaveProperty("technologies");
    }
  });
});

describe("voice", () => {
  const text = JSON.stringify(siteContent);
  for (const phrase of RETRACTED) {
    it(`does not contain "${phrase}"`, () => {
      expect(text).not.toContain(phrase);
    });
  }
  for (const hedge of HEDGES) {
    it(`has no hedge matching ${hedge}`, () => {
      expect(text).not.toMatch(hedge);
    });
  }
  it("never claims the forward deployed title", () => {
    // "forward deployed engineering" names the discipline and is allowed;
    // "Forward Deployed Engineer" as a title is not.
    expect(text).not.toMatch(/Forward Deployed Engineer(?!ing)/i);
  });
  // Since the October 2026 copy review the phrase appears once on the page,
  // in the How I work closer, as a way of working. The hero aside, the Noon
  // framing and closer and the YAX bridge no longer carry it.
  it("uses the forward deployed phrase once, in the How I work closer", () => {
    expect(text.match(/forward deploy/gi)).toHaveLength(1);
    expect(siteContent.method.closer).toMatch(/forward deployed/);
    expect(siteContent).not.toHaveProperty("roleAside");
    expect(siteContent.yax.bridge).not.toMatch(/forward deploy/i);
  });
  it("leads with the broader identity and keeps the formal title as a fact", () => {
    expect(siteContent.role).toBe("AI Systems Engineer · Educator");
    expect(siteContent.hero.currentRole).toBe("Currently AI Systems Engineer at Noon Academy.");
    expect(siteContent.noon.meta).toMatch(/^AI Systems Engineer, Central Operations/);
  });
  it("orders the chapters work first, method after the evidence", () => {
    expect(siteContent.chapters).toEqual(["hero", "work", "experience", "teaching", "method", "credentials"]);
  });
});

describe("confidentiality", () => {
  const sources: Record<string, string> = {
    "content/site.ts": JSON.stringify(siteContent),
    "content/persona.md": read("content/persona.md"),
    "README.md": read("README.md"),
    "cv/data/master.json": read("cv/data/master.json"),
  };
  for (const [name, text] of Object.entries(sources)) {
    for (const pattern of CONFIDENTIAL) {
      it(`${name} has nothing matching ${pattern}`, () => {
        expect(text).not.toMatch(pattern);
      });
    }
  }
});

describe("chat grounding", () => {
  it("carries the degree, the public project framing and the Noon guardrail", () => {
    const persona = read("content/persona.md");
    expect(persona).toContain("BSc Computer Science, Imam Muhammad ibn Saud Islamic University (IMSIU)");
    expect(persona).toContain("Ops-to-HR placement integration");
    expect(persona).not.toMatch(/Live since July/i);
    const route = read("app/api/chat/route.ts");
    expect(route).toMatch(/Never name internal systems, vendors, employee counts or unreleased project status at Noon/);
  });

  it("presents the chat as an AI assistant, never as Yousef typing", () => {
    const persona = read("content/persona.md");
    expect(persona).toMatch(/AI assistant/);
    expect(persona).toContain("/cv/Yousef-Alshuwayi-AI-Engineer.pdf");
    expect(persona).not.toMatch(/Shaguf/i);
    expect(persona).not.toMatch(/founder of rusokh/i);
    const { chat } = siteContent;
    expect(chat.assistant).toBe("AI assistant");
    expect(chat.subtitle).toBe("AI-generated answers about my work.");
    expect(JSON.stringify(chat)).not.toMatch(/Chat with Yousef|answers from my CV/i);
    expect(chat.starters).toHaveLength(3);
  });
});

describe("credentials and contact", () => {
  const { credentials, hero } = siteContent;

  it("adds the AWS credential with its designation, its badge page and no invented date", () => {
    const aws = credentials.list.find((c) => c.id === "aws");
    expect(aws).toBeDefined();
    expect(aws!.name).toBe("AWS Certified AI Business Strategist");
    expect(aws!.designation).toBe("Early Adopter");
    expect(aws!.issuer).toBe("Amazon Web Services Training and Certification");
    expect(aws!.year).toBeNull();
    expect(aws!.href).toBe("https://www.credly.com/badges/2d8a0251-c153-4109-9181-cce562481783");
    expect(aws!.description).toMatch(/pilot to production/);
    expect(existsSync(path.join(process.cwd(), "public", aws!.img))).toBe(true);
    const mck = credentials.list.find((c) => c.id === "mckinsey")!;
    expect(mck.href).toBe("https://www.credly.com/badges/f8b63388-6689-450b-a8e3-a55681465472");
  });

  it("keeps CDMP spelled out with its Associate designation and its link", () => {
    const cdmp = credentialById("cdmp");
    expect(cdmp.name).toBe("Certified Data Management Professional (CDMP)");
    expect(cdmp.designation).toBe("Associate");
    expect(cdmp.issuer).toBe("DAMA");
    expect(cdmp.year).toBe("2026");
    expect(cdmp.href).toBe("https://eu.credential.net/1c13a3e1-5f2d-4840-a944-afc2a1c5f720");
  });

  it("keeps the Apple selection without the applicant count, as a programme", () => {
    const apple = credentialById("apple");
    expect(apple.name).toBe("Apple AI Program");
    expect(apple.note).toBe("Selected 1 of 66");
    expect(apple.category).toBe("programme");
  });

  it("lists the degree without a graduation date", () => {
    expect(credentials.education).toBe(
      "BSc Computer Science, Imam Muhammad ibn Saud Islamic University (IMSIU)"
    );
    expect(credentials.education).not.toMatch(/\d{4}|expected/i);
  });

  it("puts AWS then CDMP in the hero, by id, each with its designation and link", () => {
    expect(hero.credentials).toEqual(["aws", "cdmp"]);
    for (const id of hero.credentials) {
      const c = credentialById(id);
      expect(c.category).toBe("certification");
      expect(c.designation).toBeTruthy();
      expect(c.href).toMatch(/^https:/);
    }
  });

  it("orders the professional certifications before the programmes", () => {
    expect(credentials.list.map((c) => [c.id, c.category])).toEqual([
      ["aws", "certification"],
      ["cdmp", "certification"],
      ["apple", "programme"],
      ["sda", "programme"],
      ["mckinsey", "programme"],
    ]);
  });

  it("serves the AI Engineer CV from the hero and the footer", () => {
    expect(siteContent.contact.cv).toMatch(/AI-Engineer\.pdf$/);
    expect(hero.cta.cv).toBe(siteContent.contact.cv);
    expect(hero.cta.linkedin).toBe(siteContent.contact.linkedin);
    expect(hero.cta.linkedinLabel).toBe("LinkedIn");
    expect(hero.cta.work).toBe("#work");
  });

  it("frames GHRS as the venture, with the supplied descriptions and 85 Metro stations", () => {
    const ghrs = siteContent.work.find((w) => w.id === "consulting")!;
    expect(ghrs.title).toBe("GHRS Ventures");
    expect(ghrs.kicker).toBe("Co-Founder, AI & software consulting");
    expect(ghrs.meta).toBe("Jan 2025 to Jul 2026");
    expect(ghrs.line).toContain("I built and launched software for Saudi businesses through GHRS.");
    expect(ghrs.line).toContain("advised a freight company on its AI architecture");
    expect(siteContent.teaching.lines[0]).toContain("2,000+ students");
    expect(siteContent.yax.lines[0]).toContain("1,500 staff across 85 Riyadh Metro stations");
    expect(siteContent.yax.figure[1]).toEqual({ value: "85", label: "stations" });
  });

  it("scopes the GHRS highlights to one workflow with approximate counts", () => {
    const [calls, scoring] = siteContent.experience.ghrsHighlights;
    expect(calls).toBe("Reduced one workflow from about 71 model calls to about 5 through caching.");
    expect(scoring).toMatch(/rule based/);
    expect(JSON.stringify(siteContent.experience)).not.toMatch(/\d+%|saved|saving/i);
  });

  // Yousef's own framing (2026-10-29): Rusokh is a project that kept
  // improving until it became a full platform, told through the walls he hit
  // as an instructor; never a founder title. The teaching platform is not
  // named anywhere public.
  it("tells Rusokh as a project that grew into a platform, with no founder title", () => {
    const rusokh = siteContent.work.find((w) => w.id === "rusokh")!;
    expect(rusokh.kicker).toBe("A project that grew into a full platform");
    expect(rusokh.line).toMatch(/^I hit the same walls on every course platform I taught on, so I built my own\./);
    expect(rusokh.line).toMatch(/full platform that serves the need/);
    expect(hero.proof.map((p) => p.text)).toEqual([
      "Built Rusokh, a live course platform",
      "2,000+ computer science students taught",
      "4.9/5 learner rating",
    ]);
    const text = JSON.stringify(siteContent);
    expect(text).not.toMatch(/founder of|founded/i);
    expect(siteContent.role).not.toMatch(/founder/i);
    expect(text).not.toMatch(/Shaguf/i);
    expect(siteContent.teaching.stats[0]).toEqual({ value: "2,000", unit: "+", label: "Students taught" });
  });

  it("shows the teaching start year as a static stat, not a duration", () => {
    expect(siteContent.teaching.stats[2]).toEqual({ value: "2022", label: "Teaching since" });
    expect(JSON.stringify(siteContent.teaching)).not.toMatch(/four years|And counting/);
  });
});
