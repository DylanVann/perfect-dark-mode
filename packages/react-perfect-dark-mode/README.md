# `react-perfect-dark-mode`

[![Version](https://img.shields.io/npm/v/react-perfect-dark-mode.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-perfect-dark-mode)
[![Size](https://img.shields.io/bundlephobia/minzip/react-perfect-dark-mode?label=size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=react-perfect-dark-mode)

- [Example](https://react-perfect-dark-mode-example.netlify.app/)
- [Example Code](https://github.com/DylanVann/perfect-dark-mode/tree/main/examples/react-perfect-dark-mode-example)

## Installation

You must first install [`perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/perfect-dark-mode) into the `<head>` of your document.

```bash
yarn add react-perfect-dark-mode
```

## Usage

In a component you can use the hook:

```jsx
import React from 'react'
import { usePerfectDarkMode } from 'react-perfect-dark-mode'

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
