import * as path from 'path'
import fs from 'fs-extra'
import gzipSize from 'gzip-size'
import pug from 'pug'

const run = async () => {
  const pkg = fs.readJSONSync(
    path.join(path.resolve(), '../perfect-dark-mode/package.json'),
  )
  const fileContent = fs.readFileSync(
    path.join(path.resolve(), 'dist/perfect-dark-mode/dist/index.js'),
  )
  const versionWithoutV = pkg.version
  const sizeInBytes = gzipSize.sync(fileContent)

  const version = `v${versionWithoutV}`
  const size = `${sizeInBytes} B`
  await fs.writeJSONSync(path.join(path.resolve(), 'data.json'), {
    version,
    size,
  })
}

run()
