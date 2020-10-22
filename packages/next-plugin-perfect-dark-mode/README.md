# `next-plugin-perfect-dark-mode`

[![Version][version-badge]][package]
[![Size][size-badge]][size]

[package]: https://www.npmjs.com/package/next-plugin-perfect-dark-mode
[version-badge]: https://img.shields.io/npm/v/next-plugin-perfect-dark-mode.svg
[size]: https://bundlephobia.com/result?p=next-plugin-perfect-dark-mode
[size-badge]: https://img.shields.io/bundlephobia/minzip/next-plugin-perfect-dark-mode?label=size

This plugin makes it easy to add `perfect-dark-mode` to Next.js.

- [Example](https://perfect-dark-mode-next.netlify.app/)
- [Example Code](https://github.com/DylanVann/perfect-dark-mode/tree/main/examples/nextjs-blog)

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
      {/* Add this line. */}
      <InjectPerfectDarkMode />
      {/* The rest... */}
    </div>
  )
}
```

In a component you can use the hook:

```jsx
import React from 'react'
import { usePerfectDarkMode } from 'next-plugin-perfect-dark-mode'

export const Toggle = () => {
  const { mode, updateMode } = usePerfectDarkMode()
  return (
    <button
      style={{ visibility: mode !== undefined ? 'visible' : 'hidden' }}
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
