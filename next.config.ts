import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio-26",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
