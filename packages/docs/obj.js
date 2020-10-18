module.exports = {
  filters: {
    code: (text, options) => {
      const lang = options.lang
      const prism = require('prismjs')
      if (lang) {
        try {
          const code = prism.highlight(text, prism.languages[lang], lang)
          return `<pre><code language="language-${lang}">${code}</code></pre>`
        } catch (e) {
          return ''
        }
      }
      return ''
    },
    markdown: (text, options) => {
      return require('jstransformer-markdown-it').render(text, {
        highlight: (str, lang) => {
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
