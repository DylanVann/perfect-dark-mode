# 🌚🌝 Perfect Dark Mode

[![Version][version-badge]][package]
[![Size][size-badge]][size]

- No flicker.
- Framework agnostic, easily supports **React** | **Vue** | **Svelte** | etc.
  - [react-perfect-dark-mode](./packages/react-perfect-dark-mode)
  - [gatsby-plugin-perfect-dark-mode]('./packages/gatsby-plugin-perfect-dark-mode)
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

**Yarn:**

```bash
yarn add perfect-dark-mode
```

Then you must somehow add `node_modules/perfect-dark-mode/dist/index.js` as a script in the `<head>` of your page.

How you do this will depend on the framework you are using.

**UNPKG:**

Add this code to the `<head>` of your page:

```html
<script src="https://unpkg.com/perfect-dark-mode@0.0.6/dist/index.js"></script>
```

## Usage

A class indicating the color mode will be added to `<html>` (e.g. `dark` or `light`).
This is done before the rest of your page is rendered (that's why it needs to be in head).

This package is intended to:

- Determine the correct color mode when the page is loaded.
- Save changes to the mode.
- Allow for listening to the mode and building controls that depend on it.

It does not handle styling the modes for you.
To style your color modes you should use CSS variables.

You can also add `@media (prefers-color-scheme: dark/light)` queries to support users with JS disabled.

Here is a simple implementation of dark and light modes:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color: white;
    --background: black;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --color: black;
    --background: white;
  }
}

:root.light {
  --color: black;
  --background: white;
}

:root.dark {
  --color: white;
  --background: black;
}

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

- `dist/pure.esm.js`
- `dist/pure.cjs.js`

[package]: https://www.npmjs.com/package/perfect-dark-mode
[version-badge]: https://img.shields.io/npm/v/perfect-dark-mode.svg
[size]: https://bundlephobia.com/result?p=perfect-dark-mode
[size-badge]: https://img.shields.io/bundlephobia/minzip/perfect-dark-mode?label=size
