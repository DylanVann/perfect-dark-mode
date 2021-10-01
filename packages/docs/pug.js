import pug from 'pug'
import options from './options.js'
import * as fs from 'fs/promises'

const run = async () => {
  const output = pug.renderFile('src/index.pug', options)
  await fs.writeFile('./dist/index.html', output)
}

run()
