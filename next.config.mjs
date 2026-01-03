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
      {
        hostname: "images.unsplash.com",
      }
    ],
  },
};

export default nextConfig;
