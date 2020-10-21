const execa = require('execa')

const run = async () => {
  await execa('esbuild', [
    '--bundle',
    'src/index.ts',
    '--platform=browser',
    `--outfile=dist/index.js`,
    `--format=cjs`,
    '--external:vue',
    '--external:perfect-dark-mode',
    '--minify'
  ])

  await execa('esbuild', [
    '--bundle',
    'src/index.ts',
    '--platform=browser',
    `--outfile=dist/index.mjs`,
    `--format=esm`,
    '--external:vue',
    '--external:perfect-dark-mode',
    '--minify'
  ])
}

run()
