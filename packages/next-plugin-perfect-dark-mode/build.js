const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')

const run = async () => {
  await execa('tsc')

  await execa('esbuild', [
    'src/index.tsx',
    '--platform=browser',
    `--outfile=dist/index.js`,
    `--format=cjs`,
    '--minify',
    '--sourcemap',
  ])

  await execa('esbuild', [
    'src/index.tsx',
    '--platform=browser',
    `--outfile=dist/index.mjs`,
    `--format=esm`,
    '--minify',
    '--sourcemap',
  ])
}

run()
