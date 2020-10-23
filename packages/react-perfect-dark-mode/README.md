# `react-perfect-dark-mode`

[![Version](https://img.shields.io/npm/v/react-perfect-dark-mode.svg)](https://www.npmjs.com/package/react-perfect-dark-mode)
[![Size](https://img.shields.io/bundlephobia/minzip/react-perfect-dark-mode?label=size)](https://bundlephobia.com/result?p=react-perfect-dark-mode)

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
