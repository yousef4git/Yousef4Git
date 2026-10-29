import { describe, it, expect } from "vitest";
import { siteContent } from "../../content/site";
import { siteContentAr } from "../../content/site.ar";
import { contentFor, localePath, pickCredential, pickProject } from "../../content/locale";

const ARABIC = /[؀-ۿ]/;
// Values that are data rather than copy: they must be identical in both
// languages, whatever key they sit under.
const isData = (s: string) =>
  s === "" || /^(\/|https?:|#|mailto:)/.test(s) || /^[\w.+-]+@[\w.-]+\.\w+$/.test(s);

type Diff = { path: string; reason: string };

function compare(en: unknown, ar: unknown, path: string, out: Diff[]) {
  if (Array.isArray(en)) {
    if (!Array.isArray(ar) || ar.length !== en.length) {
      out.push({ path, reason: `array length ${Array.isArray(ar) ? ar.length : "n/a"} vs ${en.length}` });
      return;
    }
    en.forEach((v, i) => compare(v, ar[i], `${path}[${i}]`, out));
    return;
  }
  if (en && typeof en === "object") {
    if (!ar || typeof ar !== "object" || Array.isArray(ar)) {
      out.push({ path, reason: "not an object" });
      return;
    }
    const ek = Object.keys(en).sort();
    const ak = Object.keys(ar as object).sort();
    if (ek.join() !== ak.join()) out.push({ path, reason: `keys ${ak.join(",")} vs ${ek.join(",")}` });
    for (const k of ek) compare((en as Record<string, unknown>)[k], (ar as Record<string, unknown>)[k], `${path}.${k}`, out);
    return;
  }
  if (typeof en === "string") {
    if (typeof ar !== "string") out.push({ path, reason: "not a string" });
    else if (isData(en) && ar !== en) out.push({ path, reason: `data differs: ${ar} vs ${en}` });
    else if (!ar.trim()) out.push({ path, reason: "empty" });
    return;
  }
  if (en !== ar) out.push({ path, reason: `${String(ar)} vs ${String(en)}` });
}

describe("arabic content", () => {
  it("mirrors the English shape, with every id, link, file and number identical", () => {
    const diffs: Diff[] = [];
    compare(siteContent, siteContentAr, "siteContent", diffs);
    // The locale fields and the language switch are the only data allowed to differ.
    const allowed = new Set([
      "siteContent.locale",
      "siteContent.dir",
      "siteContent.ui.nav.switch.href",
      "siteContent.ui.nav.switch.lang",
      "siteContent.meta.ogLocale",
    ]);
    expect(diffs.filter((d) => !allowed.has(d.path))).toEqual([]);
  });

  it("is served at /ar, right to left, and links back to the English root", () => {
    expect(siteContentAr.locale).toBe("ar");
    expect(siteContentAr.dir).toBe("rtl");
    expect(siteContentAr.ui.nav.switch).toEqual({ label: "English", href: "/", lang: "en" });
    expect(siteContent.ui.nav.switch).toEqual({ label: "العربية", href: "/ar", lang: "ar" });
    expect(localePath("ar")).toBe("/ar");
    expect(localePath("en")).toBe("/");
    expect(contentFor("ar")).toBe(siteContentAr);
  });

  it("translates the copy that carries the page and keeps official names in English", () => {
    const ar = siteContentAr;
    for (const s of [
      ar.name, ar.role, ar.tagline, ar.hero.currentRole, ar.hero.cta.workLabel,
      ar.workSection.title, ar.workSection.lead, ar.experience.title, ar.teaching.title,
      ar.method.title, ar.method.closer, ar.credentials.title, ar.footer.title, ar.footer.line,
      ar.chat.title, ar.chat.subtitle, ar.chat.assistant, ar.meta.title, ar.meta.description,
      ar.noon.intro, ar.yax.title, ar.ui.nav.skip, ar.ui.caseLabels.work,
    ]) {
      expect(s, s).toMatch(ARABIC);
    }
    for (const p of ar.noon.projects) {
      expect(p.summary, p.id).toMatch(ARABIC);
      expect(p.description, p.id).toMatch(ARABIC);
      for (const w of p.work) expect(w).toMatch(ARABIC);
      for (const m of p.media) {
        expect(m.alt).toMatch(ARABIC);
        expect(m.caption).toMatch(ARABIC);
      }
    }
    for (const id of ["aws", "cdmp", "apple", "sda", "mckinsey"] as const) {
      expect(pickCredential(ar, id).name).toBe(pickCredential(siteContent, id).name);
      expect(pickCredential(ar, id).designation).toBe(pickCredential(siteContent, id).designation);
    }
    expect(ar.noon.title).toBe("Noon Academy");
    expect(ar.experience.toolkit.items).toBe(siteContent.experience.toolkit.items);
  });

  it("keeps the same facts: figures, statuses in both languages, one working-style mention", () => {
    const ar = siteContentAr;
    expect(ar.teaching.stats.map((s) => s.value)).toEqual(["1,800", "4.9", "2022"]);
    expect(ar.yax.figure.map((f) => f.value)).toEqual(["1,500", "85", "1"]);
    expect(pickProject(ar, "noon-ai-week").metrics.map((m) => m.value)).toEqual(["525", "88%"]);
    expect(pickProject(ar, "noon-ai-week").summary).toMatch(/525/);
    expect(pickProject(ar, "noon-ai-week").summary).toMatch(/88%/);
    expect(JSON.stringify(ar).match(/forward deploy/gi) ?? []).toHaveLength(1);
    expect(JSON.stringify(ar)).not.toMatch(/Forward Deployed Engineer(?!ing)/i);
    expect(JSON.stringify(ar)).not.toMatch(/Citadel|ZenHR|Talah|FREIGHTLX|\b218\b|400,000/i);
  });
});
