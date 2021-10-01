import execa from 'execa'
import * as path from 'path'
import * as fs from 'fs/promises'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
    `--format=esm`,
    '--minify',
  ])

  const template = await fs.readFile(
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
    `--format=esm`,
    '--minify',
  ])

  await execa('tsc')
}

run()
