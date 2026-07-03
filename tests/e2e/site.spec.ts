import { test, expect } from "@playwright/test";

const CHAPTERS = ["hero", "noon", "work", "stage", "credentials", "finale"];

test("all six chapters render", async ({ page }) => {
  await page.goto("/");
  for (const c of CHAPTERS) {
    await expect(page.locator(`section[data-chapter="${c}"]`)).toHaveCount(1);
  }
});

test("nav has one dot per chapter", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('nav[aria-label="Chapters"] a')).toHaveCount(6);
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
