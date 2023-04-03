/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  basePath: '/lego-front',
}

module.exports = {
  nextConfig,
  images: {
    domains: [
      'www.lego.com',
      'avatarinventory.services.lego.com',
      'https://service.iamport.kr',
      'localhost',
      'https://port-0-lego-front-nx562olfs8ljco.sel3.cloudtype.app',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
}
