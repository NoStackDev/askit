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
        pathname: "/**"
      }
    ],
  },
  env: {
    // API: "https://b045-197-210-29-64.ngrok-free.app/api",
  },
};

module.exports = nextConfig;
