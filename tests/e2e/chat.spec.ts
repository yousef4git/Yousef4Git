import { test, expect } from "@playwright/test";

test("chat panel renders starter questions and an input", async ({ page }) => {
  await page.goto("/");
  const panel = page.locator("[data-chat-panel]");
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("button", { name: /rusokh/i })).toBeVisible();
  await expect(panel.getByPlaceholder(/ask/i)).toBeVisible();
});

test("chat degrades to contact links when the API is unavailable", async ({ page }) => {
  await page.route("**/api/chat", (route) =>
    route.fulfill({ status: 503, json: { error: "chat_unavailable" } })
  );
  await page.goto("/");
  await page.locator("[data-chat-panel]").getByPlaceholder(/ask/i).fill("Hello");
  await page.locator("[data-chat-panel]").getByRole("button", { name: /send/i }).click();
  await expect(page.locator("[data-chat-fallback]")).toBeVisible();
  await expect(page.locator('[data-chat-fallback] a[href^="mailto:"]')).toBeVisible();
});
