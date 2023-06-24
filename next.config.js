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
    API: "https://4dab-102-89-41-176.ngrok-free.app/api",
  },
};

module.exports = nextConfig;
