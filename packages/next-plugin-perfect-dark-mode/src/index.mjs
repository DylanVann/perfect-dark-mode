import NextHead from 'next/head'
import jsxRuntime from 'react/jsx-runtime'
import { code } from 'perfect-dark-mode/dist/code'

const { jsx } = jsxRuntime
const Head = NextHead.default

export * from 'react-perfect-dark-mode'

export const InjectPerfectDarkMode = () =>
  jsx(Head, {
    children: jsx('script', { dangerouslySetInnerHTML: { __html: code } }),
  })
