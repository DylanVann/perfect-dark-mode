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
      const markdownIt = require('markdown-it')
      const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor')
        .default
      const prism = require('prismjs')

      const md = markdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: (str, lang) => {
          if (lang) {
            try {
              return prism.highlight(str, prism.languages[lang], lang)
            } catch (e) {
              return ''
            }
          }
          return ''
        },
      }).use(markdownItTocAndAnchor, {
        wrapHeadingTextInAnchor: true,
      })

      return md.render(text)
    },
  },
  ...require('./data.json'),
}
