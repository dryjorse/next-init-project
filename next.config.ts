import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: { test: { test: (param: string) => void } }) =>
        rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /src/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /src/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  experimental: {
    turbo: {
      loaders: {
        ".svg": ["@svgr/webpack"],
      },
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wemay.geekstudio.kg",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "http",
        hostname: "wemay.geekstudio.kg",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "wemay.edu.kg",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
