/** Callback to inform of a value updates. */
declare type Subscriber<T> = (value: T) => void

/** Unsubscribes from value updates. */
declare type Unsubscriber = () => void

/** Callback to update a value. */
declare type Updater<T> = (value: T) => T

/** Readable interface for subscribing. */
export interface Readable<T> {
  /**
   * Subscribe on value changes.
   * @param run subscription callback
   * @param invalidate cleanup callback
   */
  subscribe(run: Subscriber<T>): Unsubscriber
}

/** Writable interface for both updating and subscribing. */
export interface Writable<T> extends Readable<T> {
  /**
   * Set value and inform subscribers.
   * @param value to set
   */
  set(value: T): void
  /**
   * Update value using callback and inform subscribers.
   * @param updater callback
   */
  update(updater: Updater<T>): void
}

type ColorMode = string

export interface PerfectColorMode {
  mode: Writable<ColorMode> & { get: () => ColorMode }
  colorModes: ColorMode[]
}

declare global {
  interface Window {
    __perfect_color_mode__: PerfectColorMode
  }
}

window.__perfect_color_mode__ = ((): PerfectColorMode => {
  const colorModes = ['light', 'dark']
  const colorModeKey = 'perfect-color-mode'

  const colorModeOS: Readable<ColorMode> = {
    subscribe() {
      const query = matchMedia
    }
  }

  const colorModeSaved: Writeable<ColorMode> = {
    subscribe() {

    }
  }

  let mediaQuery: MediaQueryList
  let mediaQueryHasListener: boolean

  /**
   * If mode is not within colorModes we default to the first item
   * in colorModes.
   */
  const parseColorMode = (mode: string): ColorMode =>
    colorModes.includes(mode) ? (mode as ColorMode) : colorModes[0]

  /**
   * Convert media query matches to a ColorMode.
   */
  const matchesToMode = (matches: boolean): ColorMode =>
    matches ? 'dark' : 'light'

  const getSavedMode = () => {
    const colorModeSaved: string | null = localStorage.getItem(colorModeKey)
    return colorModeSaved !== null ? parseColorMode(colorModeSaved) : undefined
  }

  const getOSMode = () => {
    if (!supportsMatchMedia) {
      return undefined
    }
    mediaQuery = matchMedia('(prefers-color-scheme: dark)')
    return matchesToMode(mediaQuery.matches)
  }

  /**
   * Get the initial mode.
   *
   * - If a color mode is saved use that.
   * - If not and matchMedia is supported than get preferred color mode.
   * - If not then return the first colorMode.
   */
  const getInitialMode = () => {
    const colorModeSaved = getSavedMode()
    if (colorModeSaved !== undefined) {
      return colorModeSaved
    }
    const colorModeOS = getOSMode()
    if (colorModeOS) {
      addMediaQueryListener()
      return colorModeOS
    }
    return colorModes[0]
  }

  const onChangeMediaQuery = (e: { matches: boolean }) =>
    internalSet(matchesToMode(e.matches), false)

  const addEventListener = 'addEventListener'
  const addMediaQueryListener = () => {
    if (!mediaQueryHasListener && supportsMatchMedia) {
      mediaQueryHasListener = true
      mediaQuery[addEventListener]
        ? mediaQuery[addEventListener]('change', onChangeMediaQuery)
        : mediaQuery.addListener(onChangeMediaQuery)
    }
  }

  const removeEventListener = 'removeEventListener'
  const removeMediaQueryListener = () => {
    if (mediaQueryHasListener && supportsMatchMedia) {
      mediaQueryHasListener = false
      mediaQuery[removeEventListener]
        ? mediaQuery[removeEventListener]('change', onChangeMediaQuery)
        : mediaQuery.removeListener(onChangeMediaQuery)
    }
  }

  let currentMode: ColorMode
  const htmlElement = document.documentElement
  const internalSet = (mode: ColorMode, save: boolean) => {
    htmlElement.classList.remove(currentMode)
    htmlElement.classList.add(mode)
    if (save) {
      if (mode === undefined) {
        localStorage.removeItem(colorModeKey)
      } else {
        localStorage.setItem(colorModeKey, mode)
      }
    }
    currentMode = mode
    listeners.forEach((l) => l(mode))
  }

  const listeners = new Set<Function>()

  internalSet(getInitialMode(), false)
  return {
    mode: {
      get: () => currentMode,
      subscribe: (listener) => {
        listener(currentMode)
        listeners.add(listener)
        return () => listeners.delete(listener)
      },
      set: (mode: ColorMode) => {
        internalSet(mode, true)
      },
      update: (updater) => {
        internalSet(updater(currentMode), true)
      },
    },
    colorModes,
  }
})()
