const copy = require('postcss-copy')
const cssnano = require('cssnano')
const postcssImport = require('postcss-import')
const tailwindConfig = require('./tailwind.config.cjs')
const tailwindcss = require('tailwindcss')

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
    production && cssnano({ preset: 'default' }),
  ].filter(Boolean),
}
