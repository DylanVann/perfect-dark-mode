const fs = require('fs')
const path = require('path')
const { render } = require('pug')
const prism = require('prismjs')
require('prismjs/components/prism-jsx.min')
const replaceAll = require('string.prototype.replaceall')
const markdownIt = require('markdown-it')
const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default

const replaceMarkdown = (text) =>
  replaceAll(text, /<markdown src="(.*)" \/>/g, (match, src) => {
    const content = fs.readFileSync(path.join(__dirname, 'markdown', src))
    return content
  })

module.exports = {
  filters: {
    code: (text, options) => {
      const lang = options.lang
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
    'markdown-toc': (originalText, options) => {
      let text = replaceMarkdown(originalText)
      let toc

      const md = markdownIt({
        html: true,
        linkify: true,
        typographer: true,
      })
        .use(markdownItTocAndAnchor, {
          wrapHeadingTextInAnchor: true,
          tocFirstLevel: 1,
          tocCallback: (tocMarkdown, tocArray, tocHtml) => {
            toc = tocHtml
          },
        })
        .render(text)

      return toc
    },
    markdown: (originalText, options) => {
      let text = replaceMarkdown(originalText)
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
        tocFirstLevel: 2,
      })

      text = md.render(text)
      text = replaceAll(
        text,
        /<include lang="(.*)" src="(.*)" \/>/g,
        (match, lang, src) => {
          const text = fs.readFileSync(path.join(__dirname, src), {
            encoding: 'utf8',
          })
          const code = prism.highlight(text, prism.languages[lang], lang)
          return `<pre><code language="language-${lang}">${code}</code></pre>`
        },
      )
      text = replaceAll(text, /<copy src="(.*)" \/>/g, (match, src) => {
        let text = fs.readFileSync(path.join(__dirname, src), {
          encoding: 'utf8',
        })
        text = `<script>\n${text}</script>`
        const lang = 'html'
        const code = prism.highlight(text, prism.languages[lang], lang)
        return `<pre><code language="language-${lang}">${code}</code></pre>`
      })

      return text
    },
  },
  ...require('./data.json'),
}
