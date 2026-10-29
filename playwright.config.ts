import { defineConfig } from "@playwright/test";

// PORT picks the dev server's port, so the suite can run beside another
// Next.js project that already holds 3000.
const port = Number(process.env.PORT ?? 3000);

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `npm run dev -- -p ${port}`,
    port,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
