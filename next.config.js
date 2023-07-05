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
      {
        protocol: "https",
        hostname: "flagsapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    API: "https://7892-102-89-33-101.ngrok-free.app/api",
  },
};

module.exports = nextConfig;
