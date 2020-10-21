# `vue-perfect-dark-mode`

[![Version][version-badge]][package]
[![Size][size-badge]][size]

[package]: https://www.npmjs.com/package/vue-perfect-dark-mode
[version-badge]: https://img.shields.io/npm/v/vue-perfect-dark-mode.svg
[size]: https://bundlephobia.com/result?p=vue-perfect-dark-mode
[size-badge]: https://img.shields.io/bundlephobia/minzip/vue-perfect-dark-mode?label=size

## Installation

For this to work you need to first install [`perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/perfect-dark-mode)
into the `<head>` of your document.
This needs to be done so the mode is setup as soon as possible.

```bash
yarn add vue-perfect-dark-mode
```

## Usage

```html
<script>
  import { usePerfectDarkMode } from 'vue-perfect-dark-mode'

  export default {
    name: 'App',
    setup(props) {
      const { mode, updateMode } = usePerfectDarkMode()
      return {
        mode: mode || 'light',
        onClick() {
          updateMode(
            (mode, modes, modeIndex) => modes[(modeIndex + 1) % modes.length],
          )
        },
      }
    },
  }
</script>

<template>
  <button :class="{ visible: mode !== undefined }" @click="onClick">
    {{ mode }}
  </button>
</template>

<style>
  button {
    visibility: hidden;
  }

  .visible {
    visibility: visible;
  }

  @media (prefers-color-scheme: light) {
    :root {
      --color: #2e353f;
      --background: #fff;
    }
  }

  .pdm-light {
    --color: #2e353f;
    --background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color: #fff;
      --background: #000;
    }
  }

  .pdm-dark {
    --color: #fff;
    --background: #000;
  }

  :root {
    color: var(--color);
    background: var(--background);
  }
</style>
```
