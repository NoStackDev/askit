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
    API: "https://2bcd-102-89-47-148.ngrok-free.app/api",
  },
};

module.exports = nextConfig;
