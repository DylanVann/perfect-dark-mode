const React = require('react')
const fs = require('fs')
const { code } = require('perfect-dark-mode/dist/code')

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'gatsby-plugin-perfect-dark-mode',
      dangerouslySetInnerHTML: {
        __html: code,
      },
    }),
  ])
}
