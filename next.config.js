/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_S3_PAGES_URL,
      process.env.NEXT_PUBLIC_S3_CONTENTS_URL
    ]
  },
  output: "standalone"
};

module.exports = nextConfig;
