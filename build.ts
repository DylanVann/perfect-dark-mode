import * as path from 'path'
import { renderMarkdownTemplate } from './renderMarkdownTemplate'

const run = async () => {
  renderMarkdownTemplate(path.join(__dirname, 'README.template.md'))
  renderMarkdownTemplate(
    path.join(__dirname, 'packages/perfect-dark-mode/README.template.md'),
  )
}

run()
