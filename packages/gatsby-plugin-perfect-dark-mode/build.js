const fs = require('fs')
const path = require('path')

const run = async () => {
  const pdmDirectory = require
    .resolve('perfect-dark-mode/package.json')
    .replace('package.json', '')

  const code = fs.readFileSync(path.join(pdmDirectory, 'dist/index.js'), {
    encoding: 'utf8',
  })

  const template = fs.readFileSync(
    path.join(__dirname, 'gatsby-ssr.template.js'),
    { encoding: 'utf8' },
  )

  const rendered = template.replace('{{code}}', code)

  fs.writeFileSync('gatsby-ssr.js', rendered)
}

run()
