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
      {
        protocol: "https",
        hostname: "cd94-102-89-34-201.ngrok-free.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    API: "https://cd94-102-89-34-201.ngrok-free.app/api",
  },
};

module.exports = nextConfig;
