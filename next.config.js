/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  env: {
    API_URL: process.env.API_URL
  },
  reactStrictMode: false,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

module.exports = nextConfig
