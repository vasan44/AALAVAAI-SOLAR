import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingRoot: currentDir,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.splitChunks = false;
    }

    return config;
  },
};

export default nextConfig;
