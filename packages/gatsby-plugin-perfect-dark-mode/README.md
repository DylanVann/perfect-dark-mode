# gatsby-plugin-perfect-dark-mode

[![Version][version-badge]][package]
[![Size][size-badge]][size]

[package]: https://www.npmjs.com/package/gatsby-plugin-perfect-dark-mode
[version-badge]: https://img.shields.io/npm/v/gatsby-plugin-perfect-dark-mode.svg
[size]: https://bundlephobia.com/result?p=gatsby-plugin-perfect-dark-mode
[size-badge]: https://img.shields.io/bundlephobia/minzip/gatsby-plugin-perfect-dark-mode?label=size

This plugin makes it easy to add `perfect-dark-mode` to Gatsby.

- [Example](https://perfect-dark-mode-gatsby.netlify.app/)
- [Example Code](../../examples/gatsby-starter-blog)

## Installation

You do not need to install `perfect-dark-mode` like you do for `react-perfect-dark-mode`.
This plugin puts `perfect-dark-mode` in `<head>` for you.

```bash
yarn add gatsby-plugin-perfect-dark-mode
```

## Setup

Add `gatsby-plugin-perfect-dark-mode` to your `gatsby-config.js` file.

You'll need to add some CSS.

```css
@media (prefers-color-scheme: light) {
  :root {
    --color-background: #fff;
    --color-primary: #005b99;
    --color-text: #2e353f;
    --color-text-light: #4f5969;
    --color-heading: #1a202c;
    --color-heading-black: black;
    --color-accent: #d1dce5;
  }
}

:root.light {
  --color-background: #fff;
  --color-primary: #005b99;
  --color-text: #2e353f;
  --color-text-light: #4f5969;
  --color-heading: #1a202c;
  --color-heading-black: black;
  --color-accent: #d1dce5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #000;
    --color-primary: #005b99;
    --color-text: #fff;
    --color-text-light: #fff;
    --color-heading: #fff;
    --color-heading-black: white;
    --color-accent: #d1dce5;
  }
}

:root.dark {
  --color-background: #000;
  --color-primary: #005b99;
  --color-text: #fff;
  --color-text-light: #fff;
  --color-heading: #fff;
  --color-heading-black: white;
  --color-accent: #d1dce5;
}

:root {
  color: var(--color);
  background: var(--color-background);
}
```

## Usage

In a component you can use the hook:

```js
import { usePerfectDarkMode } from 'gatsby-plugin-perfect-dark-mode'

export const Toggle = () => {
  const { mode, updateMode } = usePerfectDarkMode()
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(true), [])
  return () => (
    <button
      style={{ visibility: visible ? 'visible' : 'hidden' }}
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
