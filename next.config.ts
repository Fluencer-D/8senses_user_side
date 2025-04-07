import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
