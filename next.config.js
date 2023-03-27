/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
}

module.exports = {
  nextConfig,
  images: {
    domains: [
      'www.lego.com',
      'avatarinventory.services.lego.com',
      'https://service.iamport.kr',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
}
