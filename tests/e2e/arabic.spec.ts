import { test, expect } from "@playwright/test";
import { siteContentAr } from "../../content/site.ar";
import { siteContent } from "../../content/site";
import { pickCredential } from "../../content/locale";

test("the Arabic page is served at /ar, right to left, with its own metadata", async ({ page }) => {
  await page.goto("/ar");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page).toHaveTitle(siteContentAr.meta.title);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/ar$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /youusef\.com\/?$/);
  await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", /\/ar$/);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "ar_SA");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-ar\.png/);
});

test("the English page keeps its canonical root and points at the Arabic page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /youusef\.com\/?$/);
  await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", /\/ar$/);
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", /youusef\.com\/?$/);
  // The social card the page advertises must actually be served.
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(og).toBeTruthy();
  const res = await page.request.get(new URL(og!).pathname + new URL(og!).search);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test("each page links to the other language from the nav", async ({ page }) => {
  await page.goto("/");
  const toAr = page.locator("[data-lang-switch]");
  await expect(toAr).toHaveText("العربية");
  await expect(toAr).toHaveAttribute("href", "/ar");
  await expect(toAr).toHaveAttribute("hreflang", "ar");
  await toAr.click();
  await expect(page).toHaveURL(/\/ar$/);
  const toEn = page.locator("[data-lang-switch]");
  await expect(toEn).toHaveText("English");
  await expect(toEn).toHaveAttribute("href", "/");
});

for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["phone", { width: 390, height: 844 }],
] as const) {
  test(`the Arabic hero leads with AWS then CDMP, both in view on ${name}, with no sideways overflow`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/ar");
    await expect(page.getByRole("heading", { name: siteContentAr.name })).toBeVisible();
    const creds = page.locator('section[data-chapter="hero"] [data-hero-cred] a');
    await expect(creds).toHaveCount(2);
    await expect(creds.nth(0)).toContainText(pickCredential(siteContentAr, "aws").name);
    await expect(creds.nth(1)).toContainText(pickCredential(siteContentAr, "cdmp").name);
    await expect(creds.nth(0)).toBeInViewport();
    await expect(creds.nth(1)).toBeInViewport();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBe(0);
    await ctx.close();
  });
}

test("the Arabic page renders every chapter, the legacy anchors and the folds", async ({ page }) => {
  await page.goto("/ar");
  const ids = await page.locator("section[data-chapter]").evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual([...siteContent.chapters]);
  for (const id of ["noon", "ghrs", "yax", "method", "credentials", "contact", "noon-training-development", "noon-ops-hr-integration", "noon-mcit-genai", "noon-ai-week"]) {
    await expect(page.locator(`#${id}`), id).toHaveCount(1);
  }
  const nav = page.locator('nav[aria-label="أقسام الموقع"] a[data-nav-link]');
  await expect(nav).toHaveText(siteContentAr.ui.nav.links.map((l) => l.label));
  const details = page.locator("article#noon-mcit-genai details").first();
  await details.locator("summary").scrollIntoViewIfNeeded();
  await details.locator("summary").click();
  await expect(details).toHaveAttribute("open", "");
  await expect(page.locator("article#noon-mcit-genai")).toContainText(siteContentAr.ui.caseLabels.work);
  await expect(page.locator("article#noon-mcit-genai [data-strip] li")).toHaveCount(10);
  await page.goto("/ar#noon-ops-hr-integration");
  await expect(page.locator("article#noon > details")).toHaveAttribute("open", "");
  await expect(page.locator("article#noon-ops-hr-integration [data-flow]")).toBeVisible();
});

test("the Arabic chat opens with Arabic starters and the assistant framing", async ({ page }) => {
  await page.goto("/ar");
  await page.locator("[data-chat-bubble]").click();
  const panel = page.locator("[data-chat-panel]");
  await expect(panel).toBeVisible();
  await expect(panel).toContainText(siteContentAr.chat.subtitle);
  for (const q of siteContentAr.chat.starters) {
    await expect(panel.getByRole("button", { name: q })).toBeVisible();
  }
  await expect(panel.getByPlaceholder(siteContentAr.chat.placeholder)).toBeVisible();
});

test("the Arabic chapters read without motion", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/ar");
  for (const name of [siteContentAr.workSection.title, siteContentAr.experience.title, siteContentAr.teaching.title, siteContentAr.method.title, siteContentAr.credentials.title]) {
    const h = page.getByRole("heading", { name, exact: true }).first();
    await h.scrollIntoViewIfNeeded();
    await expect(h).toBeVisible();
  }
  await ctx.close();
});
