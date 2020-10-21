let h = require('next/head')
let j = require('react/jsx-runtime')
let { code } = require('perfect-dark-mode/dist/code')

let { jsx } = j
let H = h.default

module.exports = require('react-perfect-dark-mode')

module.exports.InjectPerfectDarkMode = () =>
  jsx(H, {
    children: jsx('script', { dangerouslySetInnerHTML: { __html: code } }),
  })
