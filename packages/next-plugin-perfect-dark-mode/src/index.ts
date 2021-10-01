import Head from 'next/head'
import { code } from 'perfect-dark-mode/dist/code'
// @ts-ignore
import { jsx as _jsx } from 'react/jsx-runtime'

export const InjectPerfectDarkMode = () =>
  /*#__PURE__*/ _jsx(Head, {
    children: /*#__PURE__*/ _jsx('script', {
      dangerouslySetInnerHTML: {
        __html: code,
      },
    }),
  })

export * from 'react-perfect-dark-mode'
