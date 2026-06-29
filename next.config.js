/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias };
    return config;
  },
};
module.exports = nextConfig;
