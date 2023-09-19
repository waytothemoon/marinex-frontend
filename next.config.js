/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
  'react-syntax-highlighter',
  'react-dnd',
  'react-dnd-html5-backend'
]);

module.exports = withTM({
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'flagcdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ]
  },
  env: {
    REACT_APP_VERSION: process.env.REACT_APP_VERSION,
    REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SHIPFINEX_BACKEND_URL: process.env.SHIPFINEX_BACKEND_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY
  }
});
