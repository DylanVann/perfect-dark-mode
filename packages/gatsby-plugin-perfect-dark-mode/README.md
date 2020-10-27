# `gatsby-plugin-perfect-dark-mode`

[![Version](https://img.shields.io/npm/v/gatsby-plugin-perfect-dark-mode.svg)](https://www.npmjs.com/package/gatsby-plugin-perfect-dark-mode)
[![Size](https://img.shields.io/bundlephobia/minzip/gatsby-plugin-perfect-dark-mode?label=size)](https://bundlephobia.com/result?p=gatsby-plugin-perfect-dark-mode)

This plugin makes it easy to add `perfect-dark-mode` to Gatsby.

- [Example](https://perfect-dark-mode-gatsby.netlify.app/)
- [Example Code](https://github.com/DylanVann/perfect-dark-mode/tree/main/examples/react-gatsby)

## Installation

You do not need to add `perfect-dark-mode` to `<head>` like you do for `react-perfect-dark-mode`.
This plugin puts `perfect-dark-mode` in `<head>` for you.

```bash
yarn add gatsby-plugin-perfect-dark-mode
```

Add `gatsby-plugin-perfect-dark-mode` to your `gatsby-config.js` file.

## Usage

In a component you can use the hook:

```jsx
import React from 'react'
import { usePerfectDarkMode } from 'gatsby-plugin-perfect-dark-mode'

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
