# `next-plugin-perfect-dark-mode`

[![Version](https://img.shields.io/npm/v/next-plugin-perfect-dark-mode.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/next-plugin-perfect-dark-mode)
[![Size](https://img.shields.io/bundlephobia/minzip/next-plugin-perfect-dark-mode?label=size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=next-plugin-perfect-dark-mode)

This plugin makes it easy to add `perfect-dark-mode` to Next.js.

- [Example](https://perfect-dark-mode-next.netlify.app/)
- [Example Code](https://github.com/DylanVann/perfect-dark-mode/tree/main/examples/react-next)

## Installation

You do not need to add `perfect-dark-mode` to `<head>` like you do for `react-perfect-dark-mode`.
This plugin provides `InjectPerfectDarkMode` to do that.

```bash
yarn add next-plugin-perfect-dark-mode
```

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

## Usage

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
