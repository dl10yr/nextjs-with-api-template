const config = {
  env: {
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000/api',
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
}

module.exports = config
