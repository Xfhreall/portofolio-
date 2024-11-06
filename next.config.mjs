/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "aceternity.com",
      },
      {
        hostname: "i.pinimg.com",
      },
      {
        hostname: "assets.aceternity.com",
      },
    ],
  },
};

export default nextConfig;
