const NextHead = require('next/head')
const jsxRuntime = require('react/jsx-runtime')
const { code } = require('perfect-dark-mode/dist/code')

const { jsx } = jsxRuntime
const Head = NextHead.default

module.exports = require('react-perfect-dark-mode')

module.exports.InjectPerfectDarkMode = () =>
  jsx(Head, {
    children: jsx('script', { dangerouslySetInnerHTML: { __html: code } }),
  })
