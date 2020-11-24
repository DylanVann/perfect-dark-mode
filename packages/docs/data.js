const fetch = require('node-fetch')
const gzipSize = require('gzip-size')
const fs = require('fs-extra')
const path = require('path')
const { makeBadge } = require('badge-maker')

const replace = (text, id, replacement) =>
  text
    .replace(`id="${id}"`, `id="${replacement}"`)
    .replace(`#${id}`, `#${replacement}`)

const run = async () => {
  const pkgPath = require.resolve('perfect-dark-mode/package.json')
  const pkg = fs.readJSONSync(pkgPath)

  const mainPath = require.resolve('perfect-dark-mode/dist/index.js')
  const mainContent = fs.readFileSync(mainPath)

  const versionWithoutV = pkg.version
  const sizeInBytes = gzipSize.sync(mainContent)

  const version = `v${versionWithoutV}`
  const size = `${sizeInBytes} B`
  const coverage = '100%'

  const badge = (message, label) =>
    makeBadge({
      message,
      color: 'black',
      ...(label !== undefined
        ? {
            label,
            labelColor: 'black',
          }
        : {}),
      style: 'flat-square',
    })

  let badges = [
    badge(version, 'npm'),
    badge(size, 'Size'),
    badge(coverage, 'Coverage'),
    badge('GitHub'),
  ]

  badges = badges.map((svg, i) => {
    let result = svg
    const char = String.fromCharCode(i + 65)
    result = replace(svg, 's', char)
    result = replace(svg, 'r', `${char}${char}`)
    return result
  })

  const [badgeNpm, badgeSize, badgeCoverage, badgeGitHub] = badges

  const data = {
    badgeNpm,
    badgeSize,
    badgeCoverage,
    badgeGitHub,
  }

  await fs.writeJSON(path.join(__dirname, 'data.json'), data)
}

run()
