# 🌚🌝 Perfect Dark Mode

- No flicker.
- Framework agnostic, supports **React** | **Vue** | **Svelte** | etc.
- Supports SSR.
- Supports no-js.
- Tiny - 498B gzipped.
- Supports `prefers-color-scheme`.
- Listens for changes to `prefers-color-scheme`.
- Allows user to override and save their preference to `localStorage`.
- Allows clearing the saved preference and falling back to `prefers-color-scheme`.
- Built for the web.

## Usage

Include `dist/index.js` in the `<head>` tag of your website.

A class indicating the color mode will be added to `<html>` (e.g. `dark` or `light`).
This is done before the rest of your page is rendered (that's why it needs to be in head).

To style your color modes you can use CSS variables, e.g.
You can add `@media (prefers-color-scheme: dark/light)` queries to support users with JS disabled.

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

**Listening:**

- You can `subscribe` to the mode, this can be used for rendering a toggle component.
- The first call of your listener is synchronous so you can get the value before rendering.

```js
const { mode } = window.__perfect_dark_mode__
const unsubscribe = mode.subscribe((v) => console.log(v))
```

**Setting:**

- You can `set` the mode.
- You can `update` the mode based on the current mode.

```js
const { mode } = window.__perfect_dark_mode__
mode.set('light')
mode.update((mode) => (mode === 'light' ? 'dark' : 'light'))
```
