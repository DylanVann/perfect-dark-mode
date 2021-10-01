import execa from 'execa'

const run = async () => {
  await execa('esbuild', [
    '--bundle',
    'src/index.ts',
    '--platform=browser',
    `--outfile=dist/index.js`,
    `--format=esm`,
    '--external:vue',
    '--external:perfect-dark-mode',
    '--minify',
  ])
}

run()
