# `perfect-dark-mode`

[![Version](https://img.shields.io/npm/v/perfect-dark-mode.svg)](https://www.npmjs.com/package/perfect-dark-mode)
[![Size](https://img.shields.io/bundlephobia/minzip/perfect-dark-mode?label=size)](https://bundlephobia.com/result?p=perfect-dark-mode)

- No flicker.
- Framework agnostic, easily supports **React** | **Vue** | **Svelte** | etc.
  - [`react-perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/react-perfect-dark-mode)
  - [`gatsby-plugin-perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/gatsby-plugin-perfect-dark-mode)
  - [`next-plugin-perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/next-plugin-perfect-dark-mode)
  - [`vue-perfect-dark-mode`](https://github.com/DylanVann/perfect-dark-mode/tree/main/packages/vue-perfect-dark-mode)
  - Svelte - This was written for Svelte :). `window.__pdm__.mode` is a [`Writable`](https://svelte.dev/docs#writable).
- Supports SSR.
- Supports no-js.
- Tiny, less than 1kb.
- Supports `prefers-color-scheme`.
- Listens for changes to `prefers-color-scheme`.
- Allows user to override and save their preference to `localStorage`.
- Allows clearing the saved preference and falling back to `prefers-color-scheme`.
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
<script src="https://unpkg.com/perfect-dark-mode@0.0.17/dist/index.js"></script>
```

### Copy and Paste

Add this code to the `<head>` of your page:

```js
<script>(()=>{const M=({prefix:l="pdm",modes:C=["light","dark"]}={})=>{const i=l,u=window.localStorage;let s=C;const h=(()=>{const t=new Set,a=e=>{s=e,t.forEach(n=>n(e))};return{subscribe(e){return e(s),t.add(e),()=>t.delete(e)},set:a,update(e){a(e(s))}}})(),f=(()=>{const t=new Set,a=matchMedia("(prefers-color-scheme: dark)");let e;const n=({matches:r})=>{const d=r?"dark":"light";e=d,t.forEach(o=>o(d))};return a.addEventListener?a.addEventListener("change",n):a.addListener(n),n(a),{subscribe(r){return r(e),t.add(r),()=>t.delete(r)}}})(),c=(()=>{const t=o=>!o||!s.includes(o)?void 0:o,a=new Set;let e;const n=o=>{if(o===e)return;o!==void 0?u.setItem(i,o):u.removeItem(i),a.forEach(g=>g(o)),e=o},r=u.getItem(i),d=t(r);return e=d,window.addEventListener("storage",o=>o.key===i&&n(o.newValue||void 0)),{subscribe(o){return o(d),a.add(o),()=>a.delete(o)},set:n,update(o){n(o(e))}}})(),m=(()=>{let t,a,e;const n=new Set;return c.subscribe(r=>{t=r;const d=t||a;d!==e&&(e=d,n.forEach(o=>o(e)))}),f.subscribe(r=>{a=r;const d=t||a;d!==e&&(e=d,n.forEach(o=>o(e)))}),{subscribe(r){return n.add(r),r(e),()=>n.delete(r)},set:c.set,update(r){let d=s.indexOf(e);d=d===-1?0:d,c.set(r(e,s,d))}}})(),b=document.documentElement.classList;let p;return m.subscribe(t=>{p&&b.remove(`${l}-${p}`),b.add(`${l}-${t}`),p=t}),b.add(l),{mode:m,modes:h,modeOS:f,modeSaved:c}};window.__pdm__=M({modes:document.documentElement.dataset.pdm?.split(" ")});})();</script>
```

## Usage

A class indicating the color mode will be added to `<html>` (e.g. `pdm-light` or `pdm-dark`).
This is done before the rest of your page is rendered (that's why it needs to be in head).

### This package does:

- Determine the correct color mode when the page is loaded.
- Save changes to the mode.
- Allow for listening to the mode and building controls that depend on it.

### This package does not:

- Handle styling for you.
  - Styling should be done using CSS variables.
- Automatically convert your page to dark mode.
  - This would be error prone, it is better to intentionally design your color modes using CSS variables.
- Provide UI components for you.
  - This page does show some examples of how to make simple controls in various frameworks that listen to the mode.

### Example CSS Implementation

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
    - The OS mode cannot be written by JS, it can
      be updated by the user in their system settings.
    - We do listen for changes to the OS color mode.
    - `subscribe(listener: (mode: ColorMode) => void): () => void`

## Pure Usage

If for some reason you don't want PDM to automatically initialize itself and add itself on `window.__pdm__` you can use the pure version:

```js
import { createPerfectDarkMode } from 'perfect-dark-mode'

const pdm = createPerfectDarkMode()
```

This version comes in a couple module formats:

- `dist/pure.js` - CJS
- `dist/pure.mjs` - ESM

