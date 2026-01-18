/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'th', 'he'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  images: {
    domains: ['atelier-samui.com'], // ЗАМЕНИТЕ на ваш домен Cloudflare R2
  },
}

module.exports = nextConfig
