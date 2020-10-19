# react-perfect-dark-mode

## Installation

For this to work you need to first install [`perfect-dark-mode`](../../README.md)
into the `<head> of your document.
This needs to be done so the mode is setup as soon as possible.

```bash
yarn add react-perfect-dark-mode
```

## Usage

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
