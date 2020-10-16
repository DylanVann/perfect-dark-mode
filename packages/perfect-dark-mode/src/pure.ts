import { PerfectDarkMode } from './createPerfectDarkMode'
export * from './createPerfectDarkMode'

declare global {
  interface Window {
    __pdm__: PerfectDarkMode
  }
}
