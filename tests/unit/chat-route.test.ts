import { describe, it, expect, beforeEach } from "vitest";

describe("POST /api/chat degradation", () => {
  beforeEach(() => {
    delete process.env.AI_GATEWAY_API_KEY;
  });

  it("returns 503 chat_unavailable without an API key", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [] }),
      })
    );
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: "chat_unavailable" });
  });

  it("returns 400 bad_request for a malformed body", async () => {
    process.env.AI_GATEWAY_API_KEY = "test-key";
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: "not json",
      })
    );
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "bad_request" });
    delete process.env.AI_GATEWAY_API_KEY;
  });
});
