import * as fs from 'fs-extra'
import * as path from 'path'
import prism from 'prismjs'
import 'prismjs/components/prism-jsx.min'
import markdownIt from 'markdown-it'
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor'
import gzipSize from 'gzip-size'
import { code } from 'perfect-dark-mode/dist/code'

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
      `<script type="module">${code.trim()}</script>`,
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
      `<script type="module" src="https://unpkg.com/perfect-dark-mode@${pkg.version}/dist/index.js"></script>`,
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

const getData = () => {
  const pkg = fs.readJSONSync(
    path.join(path.resolve(), '../packages/perfect-dark-mode/package.json'),
  )
  const fileContent = fs.readFileSync(
    require.resolve('perfect-dark-mode/dist/index.js'),
  )
  const versionWithoutV = pkg.version
  const sizeInBytes = gzipSize.sync(fileContent)

  const version = `v${versionWithoutV}`
  const size = `${sizeInBytes} B`
  return { version, size }
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
      let toc: string

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
    markdown: (originalText, options: { filename: string }) => {
      const markdownPath = path.join(path.resolve(), options.filename)
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
      }).use(markdownItTocAndAnchor, {
        wrapHeadingTextInAnchor: true,
        tocFirstLevel: 2,
      })

      text = md.render(text)

      text = text.replaceAll(
        /<include lang="(.*)" src="(.*)" \/>/g,
        (match, lang, src) => {
          const text = fs.readFileSync(path.join(__dirname, src), {
            encoding: 'utf8',
          })
          const code = prism.highlight(text, prism.languages[lang], lang)
          return wrapRenderedCode(code, lang)
        },
      )

      return text
    },
  },
  ...getData(),
}
