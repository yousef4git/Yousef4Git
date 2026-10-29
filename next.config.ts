import type { NextConfig } from "next";

const config: NextConfig = {
  outputFileTracingIncludes: { "/api/chat": ["./content/**"] },
  // The development badge sits bottom-left by default, which is where the
  // chat bubble lives on the Arabic page; keep it out of both corners.
  devIndicators: { position: "top-left" },
};

export default config;
