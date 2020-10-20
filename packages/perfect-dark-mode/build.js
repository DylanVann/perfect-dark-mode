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
    '--sourcemap',
  ])

  await execa('esbuild', [
    '--bundle',
    'src/pure.ts',
    '--platform=browser',
    `--outfile=dist/pure.js`,
    `--format=cjs`,
    '--minify',
    '--sourcemap',
  ])

  await execa('esbuild', [
    '--bundle',
    'src/pure.ts',
    '--platform=browser',
    `--outfile=dist/pure.mjs`,
    `--format=esm`,
    '--minify',
    '--sourcemap',
  ])

  const template = fs.readFileSync(
    path.join(__dirname, 'src/code.template.ts'),
    { encoding: 'utf8' },
  )

  const perfectDarkModeCode = await fs.readFile(
    path.join(__dirname, 'dist/index.js'),
    {
      encoding: 'utf8',
    },
  )

  const rendered = template.replace('{{code}}', perfectDarkModeCode)
  await fs.writeFile('src/code.ts', rendered)

  await execa('esbuild', [
    '--bundle',
    'src/code.ts',
    '--platform=browser',
    `--outfile=dist/code.js`,
    `--format=cjs`,
    '--minify',
    '--sourcemap',
  ])

  await execa('esbuild', [
    '--bundle',
    'src/code.ts',
    '--platform=browser',
    `--outfile=dist/code.mjs`,
    `--format=esm`,
    '--minify',
    '--sourcemap',
  ])

  await execa('tsc')
}

run()
