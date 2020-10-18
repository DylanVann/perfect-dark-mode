const execa = require('execa')

const run = async () => {
  const formats = ['cjs', 'esm']
  for (const format of formats) {
    await execa('esbuild', [
      '--bundle',
      'src/index.ts',
      '--platform=browser',
      `--outfile=dist/index.${format}.js`,
      `--format=${format}`,
      '--external:react',
      '--external:perfect-dark-mode',
      '--minify',
      '--sourcemap',
    ])
  }
}

run()
