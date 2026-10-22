import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { siteContent } from "../../content/site";

const RETRACTED = ["100%", "16 days", "Sixteen days", "30M", "30 million", "Arabic-first", "520 code", "21 database"];

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

  it("keeps the test-data qualifiers on the MCIT screens", () => {
    const mcit = noon.projects.find((p) => p.id === "noon-mcit-genai")!;
    expect(mcit.media).toHaveLength(10);
    expect(mcit.treatment).toBe("strip");
    for (const m of mcit.media) {
      expect(m.caption).toMatch(/test|demonstration|Draft|Student entry/);
    }
  });

  it("keeps metric context on the AI Week and HR figures", () => {
    const week = noon.projects.find((p) => p.id === "noon-ai-week")!;
    expect(week.metrics.some((m) => m.context.includes("365"))).toBe(true);
    expect(week.media.some((m) => m.caption.includes("Talah"))).toBe(true);
    const hr = noon.projects.find((p) => p.id === "noon-citadel-zenhr")!;
    expect(hr.metrics[0].context).toMatch(/go-live/);
    expect(hr.media).toHaveLength(0);
    expect(hr.treatment).toBe("flow");
  });

  it("links the two public Noon sites and nothing internal", () => {
    const hrefs = Object.fromEntries(noon.projects.map((p) => [p.id, p.links.map((l) => l.href)]));
    expect(hrefs["noon-training-development"]).toEqual(["https://trainingat.noon.edu.sa/"]);
    expect(hrefs["noon-mcit-genai"]).toEqual(["https://noonai.noon.edu.sa/"]);
    expect(hrefs["noon-citadel-zenhr"]).toEqual([]);
    expect(hrefs["noon-school-staff-placements"]).toEqual([]);
  });

  it("marks placements as an initial build without media", () => {
    const placements = noon.projects.find((p) => p.id === "noon-school-staff-placements")!;
    expect(placements.status).toMatch(/initial/i);
    expect(placements.media).toHaveLength(0);
    expect(placements.treatment).toBe("none");
  });
});

describe("retracted claims", () => {
  const text = JSON.stringify(siteContent);
  for (const phrase of RETRACTED) {
    it(`does not contain "${phrase}"`, () => {
      expect(text).not.toContain(phrase);
    });
  }
  it("never claims the forward deployed title", () => {
    // "forward deployed engineering" names the discipline and is allowed;
    // "Forward Deployed Engineer" as a title is not.
    expect(text).not.toMatch(/Forward Deployed Engineer(?!ing)/i);
  });
});

describe("credentials and contact", () => {
  it("adds the AWS credential with its designation and no invented date", () => {
    const aws = siteContent.credentials.featured.find((c) => c.name === "AWS Certified AI Business Strategist");
    expect(aws).toBeDefined();
    expect(aws!.designation).toBe("Early Adopter");
    expect(aws!.issuer).toBe("Amazon Web Services Training and Certification");
    expect(aws!.year).toBeNull();
    expect(aws!.href).toBeNull();
    expect(aws!.description).toMatch(/pilot to production/);
    expect(existsSync(path.join(process.cwd(), "public", aws!.img))).toBe(true);
  });

  it("serves the AI Engineer CV from the hero and the footer", () => {
    expect(siteContent.contact.cv).toMatch(/AI-Engineer\.pdf$/);
    expect(siteContent.hero.cta.cv).toBe(siteContent.contact.cv);
  });

  it("uses the supplied experience descriptions", () => {
    const ghrs = siteContent.work.find((w) => w.id === "consulting")!;
    expect(ghrs.line).toContain("I built and launched software for Saudi businesses through GHRS.");
    expect(siteContent.teaching.lines[0]).toContain("1,800+ computer science students at Shaguf");
    expect(siteContent.yax.lines[0]).toContain("1,500 staff across 45 Riyadh Metro stations");
  });
});
