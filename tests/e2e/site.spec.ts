import { test, expect, type Page } from "@playwright/test";
import { siteContent, credentialById } from "../../content/site";

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

test("glass navbar links the five stops and the skip link goes to the work", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('nav[aria-label="Sections"] a[data-nav-link]');
  await expect(links).toHaveText(["Work", "Experience", "Teaching", "Credentials", "Contact"]);
  await expect(links.nth(0)).toHaveAttribute("href", "#work");
  await expect(links.nth(1)).toHaveAttribute("href", "#experience");
  await expect(links.nth(4)).toHaveAttribute("href", "#contact");
  // The logo link carries real text, so text-only readers never print its href.
  await expect(page.locator('a[href="#hero"]').first()).toHaveText(/back to top/i);
  const skip = page.locator('a[href="#work"]', { hasText: "Skip to selected work" });
  await expect(skip).toHaveCount(1);
});

test("every legacy anchor still resolves", async ({ page }) => {
  await page.goto("/");
  for (const id of ["hero", "work", "experience", "noon", "ghrs", "yax", "teaching", "method", "credentials", "contact"]) {
    await expect(page.locator(`#${id}`), id).toHaveCount(1);
  }
});

// The two professional certifications are the hero's proof. Both must be
// readable before any scroll, on a laptop and on a phone, with no sideways
// overflow and no interaction.
for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["phone", { width: 390, height: 844 }],
] as const) {
  test(`the hero leads with AWS then CDMP, both in view on ${name}`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    const creds = page.locator('section[data-chapter="hero"] [data-hero-cred] a');
    await expect(creds).toHaveCount(2);
    const aws = credentialById("aws");
    const cdmp = credentialById("cdmp");
    await expect(creds.nth(0)).toContainText(aws.name);
    await expect(creds.nth(0)).toContainText(aws.designation!);
    await expect(creds.nth(0)).toHaveAttribute("href", aws.href!);
    await expect(creds.nth(1)).toContainText(cdmp.name);
    await expect(creds.nth(1)).toContainText(cdmp.designation!);
    await expect(creds.nth(1)).toHaveAttribute("href", cdmp.href!);
    await expect(creds.nth(0)).toBeInViewport();
    await expect(creds.nth(1)).toBeInViewport();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBe(0);
    await ctx.close();
  });
}

test("the hero links the work, the email, the CV and LinkedIn", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator('section[data-chapter="hero"]');
  await expect(hero.locator('a[href="#work"]')).toHaveText(siteContent.hero.cta.workLabel);
  const link = hero.locator("a", { hasText: "LinkedIn" });
  await expect(link).toHaveAttribute("href", siteContent.contact.linkedin);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(hero).toContainText(siteContent.hero.currentRole);
});

// The four steps are the section's whole job. They must be readable without
// the scroll animation ever firing, which is what reduced motion emulates.
test("the four steps read without motion", async ({ browser }) => {
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

test("the credentials chapter lists AWS and CDMP first, then the programmes, then the degree", async ({ page }) => {
  await page.goto("/");
  const creds = page.locator('section[data-chapter="credentials"]');
  const names = creds.locator("h4");
  await expect(names).toHaveText([
    "AWS Certified AI Business Strategist",
    "Certified Data Management Professional (CDMP)",
    "Apple AI Program",
    "Agentic AI Bootcamp",
    "McKinsey Forward",
  ]);
  await expect(creds.locator("[data-cred-primary]")).toContainText("Early Adopter");
  await expect(creds.locator("[data-cred-primary]")).toContainText("Associate");
  await expect(creds.locator("[data-cred-education]")).toContainText("BSc Computer Science");
  const links = creds.locator('a[href^="https"]');
  await expect(links).toHaveCount(3);
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
  for (const name of ["Rusokh", "Noon Academy", "GHRS Ventures", "Operational leadership"]) {
    const h = page.getByRole("heading", { name, exact: true }).first();
    await h.scrollIntoViewIfNeeded();
    await expect(h).toBeVisible();
  }
  await ctx.close();
});

test("hero video is muted, inline, poster-backed", async ({ page }) => {
  await page.goto("/");
  const video = page.locator("video[data-hero-video]");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video).toHaveAttribute("poster", "/media/apple-presenting-poster.jpg");
  await expect(video).toHaveJSProperty("muted", true);
});

async function fold(page: Page, articleId: string) {
  return page.locator(`article#${articleId} details`).first();
}

test("Selected work shows Rusokh and two attributed Noon cases, each case folded by default", async ({ page }) => {
  await page.goto("/");
  const work = page.locator('section[data-chapter="work"]');
  await expect(work.locator("h3").first()).toHaveText("Rusokh");
  await expect(work).toContainText("A project that grew into a full platform");
  for (const id of siteContent.workSection.noonCases) {
    const p = siteContent.noon.projects.find((x) => x.id === id)!;
    const article = work.locator(`article#${id}`);
    await expect(article).toHaveCount(1);
    await expect(article.locator("h3").first()).toHaveText(p.title);
    await expect(article.locator("[data-status]")).toHaveText(p.status);
    await expect(article).toContainText("Built at Noon Academy");
    await expect(article).toContainText(p.summary);
    await expect(await fold(page, id)).not.toHaveAttribute("open", "");
  }
  // The full case is in the HTML, just folded: the strip's ten screens exist.
  await expect(work.locator("article#noon-mcit-genai [data-strip] li")).toHaveCount(10);
  await expect(work.locator("article#noon-mcit-genai [data-strip]")).toBeHidden();
});

test("a case fold opens with the mouse and shows the full case", async ({ page }) => {
  await page.goto("/");
  const details = await fold(page, "noon-mcit-genai");
  await details.locator("summary").scrollIntoViewIfNeeded();
  await details.locator("summary").click();
  await expect(details).toHaveAttribute("open", "");
  await expect(page.locator("article#noon-mcit-genai [data-strip]")).toBeVisible();
  await expect(page.locator("article#noon-mcit-genai")).toContainText("What I did");
  await expect(details.locator("summary")).toHaveText(/Hide project details/, { useInnerText: true });
});

test("a fold opens from the keyboard", async ({ page }) => {
  await page.goto("/");
  const details = await fold(page, "noon-training-development");
  const summary = details.locator("summary");
  await summary.scrollIntoViewIfNeeded();
  await expect(summary).toBeVisible();
  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await expect(page.locator("article#noon-training-development")).toContainText("Where it stands");
});

test("the Experience fold holds the HR integration, AI Week and the hackathon", async ({ page }) => {
  await page.goto("/");
  const noon = page.locator("article#noon");
  await expect(noon).toContainText(siteContent.noon.intro);
  const details = noon.locator("details").first();
  await expect(details.locator("summary")).toHaveText(/More work at Noon Academy/, { useInnerText: true });
  await expect(page.locator("article#noon-ops-hr-integration")).toBeHidden();
  await details.locator("summary").scrollIntoViewIfNeeded();
  await details.locator("summary").click();
  await expect(page.locator("article#noon-ops-hr-integration [data-flow]")).toBeVisible();
  await expect(page.locator("article#noon-ai-week [data-status]")).toHaveText("Delivered");
  await expect(noon).toContainText("Also at Noon");
  await expect(details.locator("summary")).toHaveText(/Hide additional work/, { useInnerText: true });
});

// Old links to the cases must land on the content, not on a closed control.
// The two Selected work cases own their fold; the other two sit inside the
// Experience chapter's fold.
for (const id of siteContent.noon.projects.map((p) => p.id)) {
  test(`a link to #${id} opens the fold it sits in`, async ({ page }) => {
    await page.goto(`/#${id}`);
    const article = page.locator(`article#${id}`);
    await expect(article.locator("h3").first()).toBeVisible();
    const inWork = (siteContent.workSection.noonCases as readonly string[]).includes(id);
    const details = inWork ? article.locator("details").first() : page.locator("article#noon > details");
    await expect(details).toHaveAttribute("open", "");
    await expect(article).toContainText("What I did");
  });
}

test("the Noon cases read without motion once opened", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const p of siteContent.noon.projects) {
    await page.goto(`/#${p.id}`);
    const title = page.locator(`article#${p.id} h3`).first();
    await title.scrollIntoViewIfNeeded();
    await expect(title).toBeVisible();
  }
  await ctx.close();
});

test("the footer carries the site demonstration and the contact routes", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator('footer[data-chapter="footer"]');
  await expect(footer).toContainText("This portfolio, built as a product");
  await expect(footer.getByRole("button", { name: "Ask about my work" })).toHaveCount(1);
  await expect(footer.locator('a[href^="mailto:"]')).toHaveCount(1);
  await expect(footer.locator(`a[href="${siteContent.contact.cv}"]`)).toHaveCount(1);
});
