import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/portfolio-26" : "",
  assetPrefix: isProd ? "/portfolio-26/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
