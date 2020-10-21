# next-plugin-perfect-dark-mode

This plugin makes it easy to add `perfect-dark-mode` to Next.js.

- [Example](https://perfect-dark-mode-next.netlify.app/)
- [Example Code](../../examples/nextjs-blog)

## Installation

```bash
yarn add next-plugin-perfect-dark-mode
```

## Usage

You must render `InjectPerfectDarkMode` on any page you use it on.

```jsx
import Head from 'next/head'
import { InjectPerfectDarkMode } from 'next-plugin-perfect-dark-mode'

// In the Next.js blog starter you would add this to pages/index.js
// In other setups it would probably make sense to add to wherever your SEO component is.
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      // Adding this line.
      {/* Adding this line. */}
      <InjectPerfectDarkMode />
      {/* The rest... */}
```

In a component you can use the hook:

```js
import { usePerfectDarkMode } from 'next-plugin-perfect-dark-mode'

export const Toggle = () => {
  const { mode, updateMode } = usePerfectDarkMode()
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(true), [])
  return () => (
    <button
      style={{ visibility: visible ? 'visible' : 'hidden' }}
      onClick={() =>
        updateMode(
          (mode, modes, modeIndex) => modes[(modeIndex + 1) % modes.length],
        )
      }
    >
      {mode}
    </button>
  )
}
```
