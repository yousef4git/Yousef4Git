import type { NextConfig } from "next";

const config: NextConfig = {
  outputFileTracingIncludes: { "/api/chat": ["./content/**"] },
};

export default config;
