const React = require('react')
const fs = require('fs')

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'gatsby-plugin-perfect-dark-mode',
      dangerouslySetInnerHTML: {
        __html: `{{code}}`,
      },
    }),
  ])
}
