module.exports = {
  filters: {
    markdown: (text, options) => {
      return require('jstransformer-markdown-it').render(text, {
        highlight: function (str, lang) {
          const prism = require('prismjs')
          if (lang) {
            try {
              return prism.highlight(str, prism.languages[lang], lang)
            } catch (e) {
              return ''
            }
          }
          return ''
        },
      })
    },
  },
  ...require('./data.json'),
}
