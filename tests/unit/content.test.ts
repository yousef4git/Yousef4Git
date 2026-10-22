import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
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

describe("noon content", () => {
  const { noon } = siteContent;

  it("carries the five handoff projects in order", () => {
    expect(noon.projects.map((p) => p.id)).toEqual([
      "noon-training-development",
      "noon-citadel-zenhr",
      "noon-mcit-genai",
      "noon-ai-week",
      "noon-school-staff-placements",
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

  it("shows the training portal with its four images and the MCIT strip with ten screens", () => {
    const training = noon.projects.find((p) => p.id === "noon-training-development")!;
    expect(training.media).toHaveLength(4);
    expect(training.treatment).toBe("wide");
    const mcit = noon.projects.find((p) => p.id === "noon-mcit-genai")!;
    expect(mcit.media).toHaveLength(10);
    expect(mcit.treatment).toBe("strip");
  });

  it("keeps the AI Week numbers and the artwork, and the HR integration as a figure", () => {
    const week = noon.projects.find((p) => p.id === "noon-ai-week")!;
    expect(week.metrics.map((m) => m.value)).toEqual(["525", "88%"]);
    expect(week.media.map((m) => m.src)).toEqual(["/media/noon/ai-week-programme-artwork.png"]);
    expect(week.treatment).toBe("poster");
    expect(week.role).toContain("Talah");
    const hr = noon.projects.find((p) => p.id === "noon-citadel-zenhr")!;
    expect(hr.metrics).toHaveLength(0);
    expect(hr.media).toHaveLength(0);
    expect(hr.treatment).toBe("flow");
    expect(hr.flow?.from.name).toBe("Citadel");
  });

  it("links the two public Noon sites and nothing internal", () => {
    const hrefs = Object.fromEntries(noon.projects.map((p) => [p.id, p.links.map((l) => l.href)]));
    expect(hrefs["noon-training-development"]).toEqual(["https://trainingat.noon.edu.sa/"]);
    expect(hrefs["noon-mcit-genai"]).toEqual(["https://noonai.noon.edu.sa/"]);
    expect(hrefs["noon-citadel-zenhr"]).toEqual([]);
    expect(hrefs["noon-school-staff-placements"]).toEqual([]);
  });

  it("marks placements as an initial build without media or caveats", () => {
    const placements = noon.projects.find((p) => p.id === "noon-school-staff-placements")!;
    expect(placements.status).toMatch(/initial/i);
    expect(placements.statusDetail).toBeNull();
    expect(placements.media).toHaveLength(0);
    expect(placements.treatment).toBe("none");
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

  it("uses the supplied experience descriptions with 85 Metro stations", () => {
    const ghrs = siteContent.work.find((w) => w.id === "consulting")!;
    expect(ghrs.line).toContain("I built and launched software for Saudi businesses through GHRS.");
    expect(siteContent.teaching.lines[0]).toContain("1,800+ computer science students at Shaguf");
    expect(siteContent.yax.lines[0]).toContain("1,500 staff across 85 Riyadh Metro stations");
    expect(siteContent.yax.figure[1]).toEqual({ value: "85", label: "stations" });
  });
});
