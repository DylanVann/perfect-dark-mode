const withTM = require('next-transpile-modules')([
  'next-plugin-perfect-dark-mode',
])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})
