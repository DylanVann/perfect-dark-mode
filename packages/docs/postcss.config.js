const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const copy = require('postcss-copy')
const postcssImport = require('postcss-import')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    postcssImport(),
    copy({
      template: '[name].[ext][query]',
      dest: 'static',
    }),
    tailwindcss('./tailwind.config.js'),
    production &&
      purgecss({
        content: ['index.pug', 'index.js'],
        defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
    production && cssnano({ preset: 'default' }),
  ].filter(Boolean),
}
