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
    API: "https://18cb-102-89-22-53.ngrok-free.app/api",
  },
};

module.exports = nextConfig;
