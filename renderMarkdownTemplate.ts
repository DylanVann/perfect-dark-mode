import * as fs from 'fs-extra'
import * as path from 'path'
// @ts-ignore
import replaceAll from 'string.prototype.replaceall'
import { code } from 'perfect-dark-mode/dist/code'

const pkg = require('perfect-dark-mode/package.json')

const copyText = `${'```js'}\n<script>${code.trim()}</script>\n${'```'}`
const unpkgText = `${'```html'}\n<script src="https://unpkg.com/perfect-dark-mode@${
  pkg.version
}/dist/index.js"></script>\n${'```'}`

export const renderMarkdown = (markdownPath: string) => {
  const { dir } = path.parse(markdownPath)
  let text = fs.readFileSync(markdownPath, { encoding: 'utf8' })
  text = replaceAll(
    text,
    /<markdown src="(.*)" \/>/g,
    (_match: any, src: string) => renderMarkdown(path.join(dir, src)),
  )
  text = replaceAll(text, /<copy-inline-code \/>/g, () => copyText)
  text = replaceAll(text, /<copy-unpkg-code \/>/g, () => unpkgText)
  return text
}

export const renderMarkdownTemplate = (markdownPath: string) => {
  const { base, dir } = path.parse(markdownPath)
  const outputName = base.replace('.template.md', '.md')
  const output = renderMarkdown(markdownPath)
  fs.writeFileSync(path.join(dir, outputName), output)
}
