const tailwindcss = require('tailwindcss')
const tailwindConfig = require('./tailwind.config.js')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const copy = require('postcss-copy')
const postcssImport = require('postcss-import')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    postcssImport(),
    copy({
      basePath: ['src', 'node_modules', '../../node_modules'],
      template: '[name].[ext][query]',
      dest: 'dist',
    }),
    tailwindcss(tailwindConfig),
    production &&
      purgecss({
        content: tailwindConfig.purge,
        defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
    production && cssnano({ preset: 'default' }),
  ].filter(Boolean),
}
