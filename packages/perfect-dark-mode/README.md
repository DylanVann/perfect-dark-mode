# `perfect-dark-mode`

[![Version](https://img.shields.io/npm/v/perfect-dark-mode.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/perfect-dark-mode)
[![Size](https://img.shields.io/bundlephobia/minzip/perfect-dark-mode?label=size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=perfect-dark-mode)
[![Build](https://img.shields.io/github/workflow/status/DylanVann/perfect-dark-mode/CI?style=flat&colorA=000000&colorB=000000)](https://github.com/DylanVann/perfect-dark-mode/actions?query=workflow%3ACI+branch%3Amain)
[![Codecov](https://img.shields.io/codecov/c/github/DylanVann/perfect-dark-mode?token=3EGL80UJEA&style=flat&colorA=000000&colorB=000000)](https://codecov.io/gh/DylanVann/perfect-dark-mode)


- No flicker.
- Framework agnostic. Supports **React** | **Vue** | **Svelte**.
  - [`react-perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/react-perfect-dark-mode)
  - [`gatsby-plugin-perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/gatsby-plugin-perfect-dark-mode)
  - [`next-plugin-perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/next-plugin-perfect-dark-mode)
  - [`vue-perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/vue-perfect-dark-mode)
  - Svelte - This was written for Svelte :). `window.__pdm__.mode` is a [`Writable`](https://svelte.dev/docs#writable).
- Tiny, less than 1kb.
- Works with server side rendering.
- Uses system color mode when JS is disabled.
- Listens for changes to the system color mode.
- Allows user to override the system color mode and save their preference.
- Allows clearing the saved preference and falling back to the system mode.
- Supports any number of color modes, not just `light` and `dark`.
- Syncs across tabs.
- Built for the web.

## Installation

There are a few options for installing `perfect-dark-mode`.
Note, if you use Gatsby or Next.js you do not need to do this.

### Yarn

```bash
yarn add perfect-dark-mode
```

Then you must add `node_modules/perfect-dark-mode/dist/index.js` as a script in the `<head>` of your page.

How you do this will depend on the framework you are using.

### UNPKG

Add this code to the `<head>` of your page:

```html
<script src="https://unpkg.com/perfect-dark-mode@1.0.0/dist/index.js"></script>
```

### Copy and Paste

Add this code to the `<head>` of your page:

```js
<script>(()=>{var W=({prefix:r="pdm",modes:w=["light","dark"]}={})=>{var n=r,l=window.localStorage,t=w,c=new Set,h=e=>{t=e,c.forEach(o=>o(e))},O={subscribe(e){return e(t),c.add(e),()=>c.delete(e)},set:h,update(e){h(e(t))}},u=new Set,a=matchMedia("(prefers-color-scheme: dark)"),m,f=({matches:e})=>{m=e?"dark":"light",u.forEach(o=>o(m))};a.addEventListener?a.addEventListener("change",f):a.addListener(f),f(a);var v={subscribe(e){return e(m),u.add(e),()=>u.delete(e)}},P=e=>{if(!(!e||!t.includes(e)))return e},p=new Set,s=P(l.getItem(n)),M=(e,o=!0)=>{e!==s&&(o&&(e!==void 0?l.setItem(n,e):l.removeItem(n)),p.forEach(T=>T(e)),s=e)};window.addEventListener("storage",e=>e.key===n&&M(e.newValue||void 0,!1));var i={subscribe(e){return e(s),p.add(e),()=>p.delete(e)},set:M,update(e){M(e(s))}},g,k,d,b=new Set,x=()=>{var e=g||k;e!==d&&(d=e,b.forEach(o=>o(d)))};i.subscribe(e=>{g=e,x()}),v.subscribe(e=>{k=e,x()});var E={subscribe(e){return e(d),b.add(e),()=>b.delete(e)},set:i.set,update(e){var o=t.indexOf(d);o=o===-1?0:o,i.set(e(d,t,o))}},C=document.documentElement.classList,S;return E.subscribe(e=>{S&&C.remove(`${r}-${S}`),C.add(`${r}-${e}`),S=e}),C.add(r),{mode:E,modes:O,modeOS:v,modeSaved:i}};window.__pdm__=W({modes:document.documentElement.dataset.pdm?.split(" ")});})();</script>
```

## Usage

A class indicating the color mode will be added to `<html>` (e.g. `pdm-light` or `pdm-dark`).
This is done before the rest of your page is rendered (that's why it needs to be in head).

### This does:

- Determine the correct color mode when the page is loaded.
- Save changes to the mode.
- Allow for listening to the mode and building controls that depend on it.

### This does not:

- Handle styling for you.
  - Styling should be done using CSS variables.
- Automatically convert your page to dark mode.
  - This would be error prone, it is better to intentionally design your color modes using CSS variables.
- Provide UI components for you.
  - This page does show some examples of how to make simple controls in various frameworks that listen to the mode.

### Example CSS

Here is a simple implementation of dark and light modes using CSS variables and the classes added by PDM:

```css
/* This supports users with JS disabled. */
@media (prefers-color-scheme: dark) {
  :root {
    --color: white;
    --background: black;
  }
}

/* This supports users with JS disabled. */
@media (prefers-color-scheme: light) {
  :root {
    --color: black;
    --background: white;
  }
}

/* Styles for when light mode is enabled. */
.pdm-light {
  --color: black;
  --background: white;
}

/* Styles for when dark mode is enabled. */
.pdm-dark {
  --color: white;
  --background: black;
}

/* Default color and background. */
/* If you add a color or background on other components (e.g. body or some custom Button) */
/* that will override these. You will need to change those styles to use these CSS variables. */
:root {
  color: var(--color);
  background: var(--background);
}
```

In the rest of your app use `--color` and `--background` as needed.

### Listening

- You can `subscribe` to the mode, this can be used for rendering a toggle component.
- The first call of your listener is synchronous so you can get the value before rendering.

```js
const { mode } = window.__pdm__
const unsubscribe = mode.subscribe((v) => console.log(v))
```

### Setting

- You can `set` the mode.
- You can `update` the mode based on the current mode.

```js
const { mode } = window.__pdm__
mode.set('light')
mode.update((mode) => (mode === 'light' ? 'dark' : 'light'))
```

## API Reference

- `window.__pdm__`
  - `mode: Writable<ColorMode>`
    - The resolved mode, `modeSaved || modeOS`.
    - Can be set or updated.
    - `subscribe(listener: (mode: ColorMode) => void): () => void`
    - `set(mode: ColorMode): void`
    - `update(updater: (mode: ColorMode, modes: ColorMode[], index: number | undefined) => ColorMode): void`
      - The update function gives you the current modes and the current mode index so you can cycle
        through by returning `modes[(modeIndex + 1) % modes.length]`.
  - `modes: Writable<ColorMode[]>`
    - Valid color modes, can be used to render a list.
    - Can be set or updated.
    - `subscribe(listener: (modes: ColorMode[]) => void): () => void`
    - `set(modes: ColorMode[]): void`
    - `update(updater: (modes: ColorMode[]) => ColorMode[]): void`
  - `modeSaved: Writable<ColorMode>`
    - This is mainly for debugging, prefer using `mode`.
    - `subscribe(listener: (mode: ColorMode) => void): () => void`
  - `modeOS: Readable<ColorMode>`
    - This is mainly for debugging, prefer using `mode`.
    - The system mode cannot be written by JS, it can
      be updated by the user in their system settings.
    - We do listen for changes to the system color mode.
    - `subscribe(listener: (mode: ColorMode) => void): () => void`

## Pure Usage

If for some reason you don't want PDM to automatically initialize itself and add itself on `window.__pdm__` you can use the pure version:

```js
import { createPerfectDarkMode } from 'perfect-dark-mode'

const pdm = createPerfectDarkMode()
```

