import * as fs from 'fs-extra'
import * as path from 'path'
import prism from 'prismjs'
import 'prismjs/components/prism-jsx.min'
import markdownIt from 'markdown-it'
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor'
import { code } from 'perfect-dark-mode/dist/code'

const data = require('./data.json')
const pkg = require('perfect-dark-mode/package.json')

const wrapRenderedCode = (code: string, lang = 'html', className = '') =>
  `<pre><code class="${[`language-${lang}`, className].join(
    ' ',
  )}">${code}</code></pre>`

const addButton = (html: string, codeName: string) =>
  `${html}\n<button data-code="${codeName}" class="copy-code min-w-1 rounded-sm focus:outline-none focus:shadow-outline">Copy</button>`

const renderedCopyTextCode = addButton(
  wrapRenderedCode(
    prism.highlight(
      `<script>${code.trim()}</script>`,
      prism.languages.html,
      'html',
    ),
    'html',
    'copy-code copy-inline-code',
  ),
  'copy-inline-code',
)

const renderedUnpkgCode = addButton(
  wrapRenderedCode(
    prism.highlight(
      `<script src="https://unpkg.com/perfect-dark-mode@${pkg.version}/dist/index.js"></script>`,
      prism.languages.html,
      'html',
    ),
    'html',
    'copy-code copy-unpkg-code',
  ),
  'copy-unpkg-code',
)

export const renderMarkdown = (markdownPath: string) => {
  const { dir } = path.parse(markdownPath)
  let text = fs.readFileSync(markdownPath, { encoding: 'utf8' })
  text = text.replaceAll(
    /<markdown src="(.*)" \/>/g,
    (_match: any, src: string) => renderMarkdown(path.join(dir, src)),
  )
  text = text.replaceAll(
    'https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/perfect-dark-mode',
    '#perfect-dark-mode',
  )
  text = text.replaceAll(
    'https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/vue-perfect-dark-mode',
    '#vue-perfect-dark-mode',
  )
  text = text.replaceAll(
    'https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/react-perfect-dark-mode',
    '#react-perfect-dark-mode',
  )
  text = text.replaceAll(
    'https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/gatsby-plugin-perfect-dark-mode',
    '#gatsby-plugin-perfect-dark-mode',
  )
  text = text.replaceAll(
    'https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/next-plugin-perfect-dark-mode',
    '#next-plugin-perfect-dark-mode',
  )
  text = text.replaceAll(/<copy-inline-code \/>/g, () => renderedCopyTextCode)
  text = text.replaceAll(/<copy-unpkg-code \/>/g, () => renderedUnpkgCode)
  return text
}

const tocOptions = {
  tocFirstLevel: 1,
  wrapHeadingTextInAnchor: true,
}

module.exports = {
  filters: {
    code: (text, options) => {
      const lang = options.lang
      const code = prism.highlight(text, prism.languages[lang], lang)
      return wrapRenderedCode(code, lang)
    },
    'markdown-toc': (originalText, options: { filename: string }) => {
      const markdownPath = path.join(path.resolve(), options.filename)
      let text = renderMarkdown(markdownPath)
      let toc: string = ''

      markdownIt({
        html: true,
        linkify: true,
        typographer: true,
      })
        .use(markdownItTocAndAnchor, {
          ...tocOptions,
          tocCallback: (tocMarkdown, tocArray, tocHtml) => {
            toc = tocHtml
          },
        })
        .render(text)

      const replacements = [
        ['react-perfect-dark-mode', 'React'],
        ['gatsby-plugin-perfect-dark-mode', 'Gatsby'],
        ['next-plugin-perfect-dark-mode', 'Next.js'],
        ['vue-perfect-dark-mode', 'Vue'],
      ]

      replacements.forEach(
        ([original, replacement]) =>
          (toc = toc.replaceAll(`<code>${original}</code>`, replacement)),
      )

      return toc
    },
    markdown: (originalText, options: { filename: string }) => {
      const markdownPath = path.join(path.resolve(), options.filename)
      const markdownDir = path.parse(markdownPath).dir
      let text = renderMarkdown(markdownPath)
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
      }).use(markdownItTocAndAnchor, tocOptions)

      text = md.render(text)

      text = text.replaceAll(
        /<include lang="(.*)" src="(.*)" \/>/g,
        (match, lang, src) => {
          const text = fs.readFileSync(path.join(markdownDir, src), {
            encoding: 'utf8',
          })
          const code = prism.highlight(text, prism.languages[lang], lang)
          return wrapRenderedCode(code, lang)
        },
      )

      return text
    },
  },
  ...data,
}
