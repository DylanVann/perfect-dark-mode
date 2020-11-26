const execa = require('execa')
const path = require('path')
const fs = require('fs-extra')

const run = async () => {
  await execa('esbuild', [
    '--bundle',
    'src/index.ts',
    '--platform=browser',
    `--outfile=dist/index.js`,
    `--format=iife`,
    '--minify',
  ])

  await execa('esbuild', [
    '--bundle',
    'src/pure.ts',
    '--platform=browser',
    `--outfile=dist/pure.js`,
    `--format=cjs`,
    '--minify',
  ])

  await execa('esbuild', [
    '--bundle',
    'src/pure.ts',
    '--platform=browser',
    `--outfile=dist/pure.mjs`,
    `--format=esm`,
    '--minify',
  ])

  const template = fs.readFileSync(
    path.join(__dirname, 'src/code.template.ts'),
    { encoding: 'utf8' },
  )

  const perfectDarkModeCodePath = path.join(__dirname, 'dist/index.js')

  let perfectDarkModeCode = await fs.readFile(perfectDarkModeCodePath, {
    encoding: 'utf8',
  })

  perfectDarkModeCode = perfectDarkModeCode
    .replaceAll(/\bconst\b/g, 'var')
    .replaceAll(/\blet\b/g, 'var')

  await fs.writeFile(perfectDarkModeCodePath, perfectDarkModeCode)

  const escape = (v) => {
    let out = v
    out = out.replaceAll('`', '\\`')
    out = out.replaceAll('$', '\\$')
    return out
  }
  const rendered = template.replace('{{code}}', escape(perfectDarkModeCode))
  await fs.writeFile('src/code.ts', rendered)

  await execa('esbuild', [
    '--bundle',
    'src/code.ts',
    '--platform=browser',
    `--outfile=dist/code.js`,
    `--format=cjs`,
    '--minify',
  ])

  await execa('esbuild', [
    '--bundle',
    'src/code.ts',
    '--platform=browser',
    `--outfile=dist/code.mjs`,
    `--format=esm`,
    '--minify',
  ])

  await execa('tsc')
}

run()
