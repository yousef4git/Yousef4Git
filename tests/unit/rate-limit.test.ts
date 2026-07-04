import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows up to the limit within a window", () => {
    for (let i = 0; i < 5; i++) expect(checkRateLimit("ip-a", 5, 60_000)).toBe(true);
    expect(checkRateLimit("ip-a", 5, 60_000)).toBe(false);
  });

  it("tracks IPs independently", () => {
    expect(checkRateLimit("ip-b", 1, 60_000)).toBe(true);
    expect(checkRateLimit("ip-c", 1, 60_000)).toBe(true);
    expect(checkRateLimit("ip-b", 1, 60_000)).toBe(false);
  });

  it("resets after the window", () => {
    expect(checkRateLimit("ip-d", 1, 1)).toBe(true);
    return new Promise((r) =>
      setTimeout(() => {
        expect(checkRateLimit("ip-d", 1, 1)).toBe(true);
        r(null);
      }, 5)
    );
  });
});
