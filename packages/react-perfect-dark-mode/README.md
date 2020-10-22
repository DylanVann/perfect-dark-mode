# `react-perfect-dark-mode`

[![Version][version-badge]][package]
[![Size][size-badge]][size]

[package]: https://www.npmjs.com/package/react-perfect-dark-mode
[version-badge]: https://img.shields.io/npm/v/react-perfect-dark-mode.svg
[size]: https://bundlephobia.com/result?p=react-perfect-dark-mode
[size-badge]: https://img.shields.io/bundlephobia/minzip/react-perfect-dark-mode?label=size

## Installation

For this to work you need to first install [`perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/perfect-dark-mode)
into the `<head>` of your document.
This needs to be done so the mode is setup as soon as possible.

```bash
yarn add react-perfect-dark-mode
```

## Usage

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
