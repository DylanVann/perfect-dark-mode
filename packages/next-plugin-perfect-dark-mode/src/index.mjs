import h from 'next/head'
import j from 'react/jsx-runtime'
import { code } from 'perfect-dark-mode/dist/code'

let { jsx } = j
let H = h.default

export * from 'react-perfect-dark-mode'

export const InjectPerfectDarkMode = () =>
  jsx(H, {
    children: jsx('script', { dangerouslySetInnerHTML: { __html: code } }),
  })
