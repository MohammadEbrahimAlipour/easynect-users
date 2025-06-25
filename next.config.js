/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_S3_PAGES_URL || 'easynect-pages-contents.s3.ir-thr-at1.arvanstorage.ir',
      process.env.NEXT_PUBLIC_S3_CONTENTS_URL || 'easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir',
      'easynect-production-static-contents.s3.ir-thr-at1.arvanstorage.ir',
    ],
  },
  output: "standalone",
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
