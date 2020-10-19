const { render } = require('pug')

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
    'markdown-toc': (text, options) => {
      const markdownIt = require('markdown-it')
      const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor')
        .default
      let toc

      const md = markdownIt({
        html: true,
        linkify: true,
        typographer: true,
      })
        .use(markdownItTocAndAnchor, {
          wrapHeadingTextInAnchor: true,
          tocFirstLevel: 2,
          tocCallback: (tocMarkdown, tocArray, tocHtml) => {
            toc = tocHtml
          },
        })
        .render(text)

      return toc
    },
    markdown: (text, options) => {
      const replaceAll = require('string.prototype.replaceall')
      const markdownIt = require('markdown-it')
      const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor')
        .default
      const prism = require('prismjs')
      const fs = require('fs')
      const path = require('path')

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

      let rendered = md.render(text)

      rendered = replaceAll(
        rendered,
        /<include lang="(.*)" src="(.*)" \/>/g,
        (match, lang, src) => {
          const text = fs.readFileSync(path.join(__dirname, src), {
            encoding: 'utf8',
          })
          const code = prism.highlight(text, prism.languages[lang], lang)
          return `<pre><code language="language-${lang}">${code}</code></pre>`
        },
      )

      rendered = replaceAll(rendered, /<copy src="(.*)" \/>/g, (match, src) => {
        let text = fs.readFileSync(path.join(__dirname, src), {
          encoding: 'utf8',
        })
        text = `<script>\n${text}</script>`
        const lang = 'js'
        const code = prism.highlight(text, prism.languages[lang], lang)
        return `<pre><code language="language-${lang}">${code}</code></pre>`
      })

      return rendered
    },
  },
  ...require('./data.json'),
}
