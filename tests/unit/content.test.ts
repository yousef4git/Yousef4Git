import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { siteContent } from "../../content/site";

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
  const { noon } = siteContent;

  it("carries the four public projects in order", () => {
    expect(noon.projects.map((p) => p.id)).toEqual([
      "noon-training-development",
      "noon-ops-hr-integration",
      "noon-mcit-genai",
      "noon-ai-week",
    ]);
  });

  it("names the employer as Noon Academy", () => {
    expect(noon.title).toBe("Noon Academy");
    expect(noon.meta).toContain("AI Systems Engineer");
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
  });

  it("links the two public Noon sites and nothing internal", () => {
    const hrefs = Object.fromEntries(noon.projects.map((p) => [p.id, p.links.map((l) => l.href)]));
    expect(hrefs["noon-training-development"]).toEqual(["https://trainingat.noon.edu.sa/"]);
    expect(hrefs["noon-mcit-genai"]).toEqual(["https://noonai.noon.edu.sa/"]);
    expect(hrefs["noon-ops-hr-integration"]).toEqual([]);
  });

  it("mentions the placement tool in the intro only, without a card or system names", () => {
    expect(noon.intro).toContain("and an early internal placement tool for the school-staffing team");
    expect(noon.projects.some((p) => /placement/i.test(p.id))).toBe(false);
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
  it("uses the forward deployed phrase three times: hero, method closer, YAX bridge", () => {
    expect(text.match(/forward deploy/gi)).toHaveLength(3);
    expect(siteContent.roleAside).toMatch(/forward deployed/);
    expect(siteContent.method.closer).toMatch(/forward deployed/);
    expect(siteContent.yax.bridge).toMatch(/forward deployment/);
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
});

describe("credentials and contact", () => {
  it("adds the AWS credential with its designation, its badge page and no invented date", () => {
    const aws = siteContent.credentials.featured.find((c) => c.name === "AWS Certified AI Business Strategist");
    expect(aws).toBeDefined();
    expect(aws!.designation).toBe("Early Adopter");
    expect(aws!.issuer).toBe("Amazon Web Services Training and Certification");
    expect(aws!.year).toBeNull();
    expect(aws!.href).toBe("https://www.credly.com/badges/2d8a0251-c153-4109-9181-cce562481783");
    expect(aws!.description).toMatch(/pilot to production/);
    expect(existsSync(path.join(process.cwd(), "public", aws!.img))).toBe(true);
    const mck = siteContent.credentials.featured.find((c) => c.name === "McKinsey Forward")!;
    expect(mck.href).toBe("https://www.credly.com/badges/f8b63388-6689-450b-a8e3-a55681465472");
  });

  it("keeps the Apple selection without the applicant count", () => {
    const apple = siteContent.credentials.featured[0];
    expect(apple.name).toBe("Apple AI Program");
    expect(apple.note).toBe("Selected 1 of 66");
  });

  it("lists the degree first, without a graduation date", () => {
    expect(siteContent.credentials.education).toBe(
      "BSc Computer Science, Imam Muhammad ibn Saud Islamic University (IMSIU)"
    );
    expect(siteContent.credentials.education).not.toMatch(/\d{4}|expected/i);
  });

  it("puts the four credentials in the hero", () => {
    expect(siteContent.hero.badges).toEqual([
      "Apple AI Program, 1 of 66",
      "SDA Agentic AI Bootcamp",
      "AWS Certified AI Business Strategist",
      "Certified Data Management Professional (CDMP)",
    ]);
  });

  it("serves the AI Engineer CV from the hero and the footer", () => {
    expect(siteContent.contact.cv).toMatch(/AI-Engineer\.pdf$/);
    expect(siteContent.hero.cta.cv).toBe(siteContent.contact.cv);
  });

  it("frames GHRS as the venture, with the supplied descriptions and 85 Metro stations", () => {
    const ghrs = siteContent.work.find((w) => w.id === "consulting")!;
    expect(ghrs.title).toBe("GHRS Ventures");
    expect(ghrs.kicker).toBe("Co-Founder, AI & software consulting");
    expect(ghrs.meta).toBe("Jan 2025 to Jul 2026");
    expect(ghrs.line).toContain("I built and launched software for Saudi businesses through GHRS.");
    expect(ghrs.line).toContain("advised a freight company on its AI architecture");
    expect(siteContent.teaching.lines[0]).toContain("1,800+ computer science students at Shaguf");
    expect(siteContent.yax.lines[0]).toContain("1,500 staff across 85 Riyadh Metro stations");
    expect(siteContent.yax.figure[1]).toEqual({ value: "85", label: "stations" });
  });
});
