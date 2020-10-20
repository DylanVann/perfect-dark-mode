import Head from 'next/head'
export * from 'react-perfect-dark-mode'
import { code } from 'perfect-dark-mode/dist/code'

export const InjectPerfectDarkMode = () => (
  <Head>
    <script dangerouslySetInnerHTML={{ __html: code }} />
  </Head>
)
