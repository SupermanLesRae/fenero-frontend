/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "fenerodemo.local",
      },
      {
        protocol: "https",
        hostname: "13.60.181.6",
      },
    ],
  },
};

export default nextConfig;
