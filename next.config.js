/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true
// };

// module.exports = nextConfig;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "easynect-pages-contents.s3.ir-thr-at1.arvanstorage.ir",
      "easynect-static-contents.s3.ir-thr-at1.arvanstorage.ir"
    ]
  }
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
