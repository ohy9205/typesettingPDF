/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bj-sup.kr",
      },
    ],
  },
};

module.exports = nextConfig;
