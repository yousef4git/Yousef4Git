import { test, expect } from "@playwright/test";

test("chat bubble opens a panel with starters and an input", async ({ page }) => {
  await page.goto("/");
  const panel = page.locator("[data-chat-panel]");
  await expect(panel).toBeHidden();
  await page.locator("[data-chat-bubble]").click();
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("button", { name: /rusokh/i })).toBeVisible();
  await expect(panel.getByPlaceholder(/ask/i)).toBeVisible();
});

test("chat degrades to contact links when the API is unavailable", async ({ page }) => {
  await page.route("**/api/chat", (route) =>
    route.fulfill({ status: 503, json: { error: "chat_unavailable" } })
  );
  await page.goto("/");
  await page.locator("[data-chat-bubble]").click();
  await page.locator("[data-chat-panel]").getByPlaceholder(/ask/i).fill("Hello");
  await page.locator("[data-chat-panel]").getByRole("button", { name: /^send$/i }).click();
  await expect(page.locator("[data-chat-fallback]")).toBeVisible();
  await expect(page.locator('[data-chat-fallback] a[href^="mailto:"]')).toBeVisible();
});

test("conversation survives closing the bubble and reloading the tab", async ({ page }) => {
  await page.route("**/api/chat", (route) =>
    route.fulfill({ status: 503, json: { error: "chat_unavailable" } })
  );
  await page.goto("/");
  await page.locator("[data-chat-bubble]").click();
  await page.locator("[data-chat-panel]").getByPlaceholder(/ask/i).fill("Tell me about the Metro project");
  await page.locator("[data-chat-panel]").getByRole("button", { name: /^send$/i }).click();
  await expect(page.locator("[data-chat-fallback]")).toBeVisible();

  // Close the bubble, reload the tab: same browser session, same conversation.
  await page.locator("[data-chat-bubble]").click();
  await page.reload();
  await page.locator("[data-chat-bubble]").click();
  await expect(page.locator("[data-chat-panel]")).toContainText("Tell me about the Metro project");
});
