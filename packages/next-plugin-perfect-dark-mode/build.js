import execa from 'execa'

const run = async () => {
  await execa('esbuild', [
    '--bundle',
    'src/index.ts',
    '--platform=browser',
    `--outfile=dist/index.js`,
    `--format=esm`,
    '--external:react',
    '--external:perfect-dark-mode',
    '--external:react-perfect-dark-mode',
    '--external:next',
    '--minify',
  ])
}

run()
