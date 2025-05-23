import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    typedRoutes: false,
    turbo: false, // ❗ Add this line to disable Turbopack
  },
};

export default nextConfig;
