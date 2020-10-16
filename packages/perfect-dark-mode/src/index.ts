import { createPerfectDarkMode } from './createPerfectDarkMode'
import type { PerfectDarkMode } from './createPerfectDarkMode'

declare global {
  interface Window {
    __pdm__: PerfectDarkMode
  }
}

window.__pdm__ = createPerfectDarkMode({
  modes: document.documentElement.dataset.pdm?.split(' '),
})
