/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  env: {
    API_URL: process.env.API_URL
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
