/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/w40/**",
      },
    ],
  },
  env: {
    API: "https://e953-197-210-29-110.ngrok-free.app/api",
  },
};

module.exports = nextConfig;
