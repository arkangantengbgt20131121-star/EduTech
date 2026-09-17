import type { NextConfig } from "next";

/**
 * EduTech — Next.js configuration.
 *
 * `allowedDevOrigins` lets the sandbox preview proxy (which serves the app from
 * a *.e2b.app / *.arena.ai host) talk to the dev server without Next.js
 * blocking the cross-origin dev requests.
 */
const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.e2b.app",
    "*.arena.ai",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
