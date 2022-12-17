const config = {
  env: {
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
}

module.exports = config
