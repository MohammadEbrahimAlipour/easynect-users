/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true
// };

// module.exports = nextConfig;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.S3_PAGES_URL,
      process.env.S3_CONTENTS_URL
    ]
  }, 
  output: 'standalone'
};

module.exports = nextConfig;

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       "easynect-pages-contents.s3.ir-thr-at1.arvanstorage.ir"

//     ]
//   }
// };

// module.exports = nextConfig;
