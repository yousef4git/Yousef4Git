import { test, expect } from "@playwright/test";

const CHAPTERS = ["hero", "noon", "yax", "stage", "work", "credentials"];

test("all six chapters render", async ({ page }) => {
  await page.goto("/");
  for (const c of CHAPTERS) {
    await expect(page.locator(`section[data-chapter="${c}"]`)).toHaveCount(1);
  }
});

test("glass navbar links every stop", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('nav[aria-label="Sections"] a')).toHaveCount(5);
  await expect(page.locator('nav[aria-label="Sections"] a', { hasText: "Experience" })).toHaveAttribute(
    "href",
    "#noon"
  );
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
