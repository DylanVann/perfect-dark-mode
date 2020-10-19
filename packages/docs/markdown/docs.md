## Examples

### Label

Display a label showing the mode.

<span class="pdm-label" style="visibility: hidden;">Light</span>

<include lang="js" src="./components/label.js" />

### Emoji

Display an emoji showing the mode.

<i class="pdm-emoji emoji light" style="visibility: hidden;"></i>

<include lang="js" src="./components/emoji.js" />

### Toggle

You can toggle the color mode.

<button class="pdm-toggle min-w-1 rounded-sm focus:outline-none focus:shadow-outline">
  <i class="pdm-emoji emoji light" style="visibility: hidden;"></i>
  <span class="pdm-label ml-1" style="visibility: hidden;">Light</span>
</button>

<include lang="js" src="./components/toggle-button.js" />

### Select

You can use a select for the color mode.

Perfect Dark Mode allows for more than just `light` and `dark` color modes.

On initialization PDM will read a list of modes from the `<html>` element's `data-pdm` attribute.
These become available on `.modes`.
`.modes` is a `Writable` like `.mode`, so it can also be `set` or `update`ed.

<select class="pdm-select min-w-1 form-select bg-color text-background focus:outline-none focus:shadow-outline border-0 focus:border-0">
  Light
</select>

<include lang="js" src="./components/select.js" />

### Cycle

You can use the `.update` method to cycle through color modes.

<button class="pdm-cycle min-w-1 rounded-sm focus:outline-none focus:shadow-outline">
  <i class="pdm-emoji emoji light" style="visibility: hidden;"></i>
  <span class="pdm-label ml-1" style="visibility: hidden;">Light</span>
</button>

<include lang="js" src="./components/cycle-button.js" />

### Reset

You can reset the color mode and fallback to system color mode.

<button class="pdm-reset min-w-1 rounded-sm focus:outline-none focus:shadow-outline">
  Reset
</button>

<include lang="js" src="./components/reset-button.js" />

### Mode

For debugging/understanding here is the saved color mode and the OS color mode.

The displayed color mode is `SavedColorMode || OSColorMode`.

<pre>
  <code class="pdm-mode-saved">Saved:</code>
</pre>

<pre>
  <code class="pdm-mode-os">OS:</code>
</pre>

<include lang="js" src="./components/mode.js" />

### Syntax Highlighting

You may wish to switch syntax highlighting themes based on the mode.

```html
<link
  class="codestyle light blue"
  rel="stylesheet"
  href="/syntax/prism-base16-ateliersulphurpool.light.css"
  media="(prefers-color-scheme: light)"
/>
<link
  class="codestyle dark"
  rel="stylesheet"
  href="/syntax/prism-nord.css"
  media="(prefers-color-scheme: dark)"
/>
```

<include lang="js" src="./components/syntax-highlight.js" />

### Animating Transitions

You should add the transition property with JS to avoid a transition between no-js and js.

<include lang="js" src="./components/root.js" />

## Installation

### Yarn

```bash
yarn add perfect-dark-mode
```

Then you must somehow add `node_modules/perfect-dark-mode/dist/index.js` as a script in the `<head>` of your page.

How you do this will depend on the framework you are using.

### UNPKG

You can add directly this directly to the `<head>` of your page:

```html
<script src="https://unpkg.com/perfect-dark-mode@0.0.6/dist/index.js"></script>
```

### Copy and Paste

You can add this code to the `<head>` of your page.

<copy src="./dist/perfect-dark-mode/dist/index.js" />

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
