import { test, expect } from "@playwright/test";
import { siteContent } from "../../content/site";

const CHAPTERS = siteContent.chapters;

test("every chapter renders", async ({ page }) => {
  await page.goto("/");
  for (const c of CHAPTERS) {
    await expect(page.locator(`section[data-chapter="${c}"]`)).toHaveCount(1);
  }
});

test("chapters follow the narrative order", async ({ page }) => {
  await page.goto("/");
  const ids = await page
    .locator("section[data-chapter]")
    .evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(CHAPTERS);
});

test("glass navbar links every stop", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('nav[aria-label="Sections"] a')).toHaveCount(CHAPTERS.length);
  await expect(page.locator('nav[aria-label="Sections"] a', { hasText: "Noon" })).toHaveAttribute(
    "href",
    "#noon"
  );
  await expect(
    page.locator('nav[aria-label="Sections"] a', { hasText: "How I work" })
  ).toHaveAttribute("href", "#method");
  await expect(
    page.locator('nav[aria-label="Sections"] a', { hasText: "Before AI" })
  ).toHaveAttribute("href", "#yax");
  // The logo link carries real text, so text-only readers never print its href.
  await expect(page.locator('a[href="#hero"]').first()).toHaveText(/back to top/i);
});

// The four steps are the section's whole job. They must be readable without
// the scroll animation ever firing, which is what reduced motion emulates.
test("the four forward deployed steps read without motion", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const method = page.locator('section[data-chapter="method"]');
  for (const step of siteContent.method.steps) {
    await expect(method.getByRole("heading", { name: step.name })).toBeVisible();
  }
  await ctx.close();
});

test("the CV link serves the AI Engineer CV", async ({ page }) => {
  await page.goto("/");
  const link = page.locator(`a[href="${siteContent.contact.cv}"]`).first();
  await expect(link).toHaveAttribute("href", /AI-Engineer\.pdf$/);
  const res = await page.request.get(siteContent.contact.cv);
  expect(res.status()).toBe(200);
});

test("the degree opens the credentials chapter", async ({ page }) => {
  await page.goto("/");
  const creds = page.locator('section[data-chapter="credentials"]');
  await expect(creds.locator("[data-cred-education]")).toContainText("BSc Computer Science");
});

test("credential verify links open in a new tab", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('section[data-chapter="credentials"] a[href^="https"]');
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
});

test("content is visible with reduced motion", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Yousef Alshuwayi" })).toBeVisible();
  await ctx.close();
});

test("hero video is muted, inline, poster-backed", async ({ page }) => {
  await page.goto("/");
  const video = page.locator("video[data-hero-video]");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video).toHaveAttribute("poster", "/media/apple-presenting-poster.jpg");
  await expect(video).toHaveJSProperty("muted", true);
});

test("the Noon chapter carries the four public projects with their media", async ({ page }) => {
  await page.goto("/");
  const noon = page.locator('section[data-chapter="noon"]');
  for (const p of siteContent.noon.projects) {
    const article = noon.locator(`article#${p.id}`);
    await expect(article).toHaveCount(1);
    await expect(article.locator("h3").first()).toHaveText(p.title);
    await expect(article.locator("[data-status]")).toHaveText(p.status);
  }
  await expect(noon.locator("[data-strip] li")).toHaveCount(10);
  await expect(noon.locator("article#noon-ops-hr-integration [data-flow]")).toHaveCount(1);
  await expect(noon.locator("article")).toHaveCount(siteContent.noon.projects.length);
});

// Every project must read with motion off: the reveals are an enhancement,
// never the thing that makes the content appear.
test("the Noon projects read without motion", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  for (const p of siteContent.noon.projects) {
    const title = page.locator(`article#${p.id} h3`).first();
    await title.scrollIntoViewIfNeeded();
    await expect(title).toBeVisible();
  }
  await ctx.close();
});
