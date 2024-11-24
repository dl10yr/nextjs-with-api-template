import { NextConfig } from "next"

const config: NextConfig = {
  env: {
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000/api',
  },
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  }
}

module.exports = config
