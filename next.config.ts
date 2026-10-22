import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: { root: process.cwd() },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default createMDX({ extension: /\.mdx?$/ })(nextConfig);
