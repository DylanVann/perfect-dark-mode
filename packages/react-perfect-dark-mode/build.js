const execa = require('execa')

const run = async () => {
  await execa('esbuild', [
    '--bundle',
    'src/index.ts',
    '--platform=browser',
    `--outfile=dist/index.js`,
    `--format=cjs`,
    '--external:react',
    '--external:perfect-dark-mode',
    '--minify'
  ])

  await execa('esbuild', [
    '--bundle',
    'src/index.ts',
    '--platform=browser',
    `--outfile=dist/index.mjs`,
    `--format=esm`,
    '--external:react',
    '--external:perfect-dark-mode',
    '--minify'
  ])
}

run()
