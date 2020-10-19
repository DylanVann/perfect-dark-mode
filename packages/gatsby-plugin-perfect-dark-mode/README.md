# gatsby-plugin-perfect-dark-mode

[Example](https://perfect-dark-mode-gatsby.netlify.app/).

## Installation

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
