import Script from 'next/script'
// @ts-ignore
import { code } from 'perfect-dark-mode/dist/code'

export const InjectPerfectDarkMode = () => (
  <Script strategy="beforeInteractive">{code}</Script>
)

export * from 'react-perfect-dark-mode'
