/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_S3_PAGES_URL,
      process.env.NEXT_PUBLIC_S3_CONTENTS_URL,
    ],
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = nextConfig;
