# `vue-perfect-dark-mode`

[![Version](https://img.shields.io/npm/v/vue-perfect-dark-mode.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/vue-perfect-dark-mode)
[![Size](https://img.shields.io/bundlephobia/minzip/vue-perfect-dark-mode?label=size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=vue-perfect-dark-mode)

- [Example](https://perfect-dark-mode-vue.netlify.app/)
- [Example Code](https://github.com/DylanVann/perfect-dark-mode/tree/main/examples/vue-vite)

**This integration is for Vue 3.**

## Installation

You must first install [`perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/perfect-dark-mode) into the `<head>` of your document.

```bash
yarn add vue-perfect-dark-mode
```

## Usage

In a component you can use the hook:

```html
<script>
  import { usePerfectDarkMode } from 'vue-perfect-dark-mode'

  export default {
    name: 'App',
    setup(props) {
      const { mode, updateMode } = usePerfectDarkMode()
      return {
        mode,
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
</style>
```
