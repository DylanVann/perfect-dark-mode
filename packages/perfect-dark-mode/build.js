const execa = require('execa')

const outputs = [
  { entry: 'src/index.ts', formats: ['iife'] },
  { entry: 'src/pure.ts', formats: ['cjs', 'esm', 'iife'] },
]

const run = async () => {
  for (const output of outputs) {
    for (const format of output.formats) {
      const outputExtension =
        output.entry !== 'src/index.ts' ? `.${format}` : ``
      const outputFilename = `dist/${output.entry
        .replace('src/', '')
        .replace('.ts', '')}${outputExtension}.js`
      await execa('esbuild', [
        '--bundle',
        output.entry,
        '--platform=browser',
        `--outfile=${outputFilename}`,
        `--format=${format}`,
        '--minify',
        '--sourcemap',
      ])
    }
  }
}

run()
