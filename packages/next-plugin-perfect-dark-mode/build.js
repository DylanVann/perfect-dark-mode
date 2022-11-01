import { execa } from 'execa'

const run = async () => {
  await execa(`esbuild`, [
    `--bundle`,
    `src/index.tsx`,
    `--platform=browser`,
    `--outfile=dist/index.js`,
    `--format=esm`,
    `--jsx=automatic`,
    `--external:react`,
    `--external:perfect-dark-mode`,
    `--external:react-perfect-dark-mode`,
    `--external:next`,
    `--minify`,
  ])
}

run()
