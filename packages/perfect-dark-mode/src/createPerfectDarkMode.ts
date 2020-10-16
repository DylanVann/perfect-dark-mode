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

export interface PerfectDarkModeOptions {
  modes?: string[]
}

export interface PerfectDarkMode {
  /**
   * The resolved color mode, can be set or updated.
   */
  mode: Writable<ColorMode | undefined>
  /**
   * The saved color mode, probably only useful for debugging.
   */
  modeSaved: Writable<ColorMode | undefined>
  /**
   * The OS color mode, probably only useful for debugging.
   */
  modeOS: Readable<ColorMode | undefined>
  /**
   * A list of color modes.
   */
  modes: Writable<ColorMode[]>
}

export const createPerfectDarkMode = ({
  modes = ['light', 'dark'],
}: PerfectDarkModeOptions = {}): PerfectDarkMode => {
  const colorModeKey = 'pdm'
  const localStorage = window.localStorage

  let currentModes = modes
  const modesWritable: Writable<string[]> = ((): Writable<string[]> => {
    const modesListeners = new Set<Function>()
    const set = (v: string[]) => {
      currentModes = v
      modesListeners.forEach((cb) => cb(v))
    }
    return {
      subscribe(cb) {
        cb(currentModes)
        modesListeners.add(cb)
        return () => modesListeners.delete(cb)
      },
      set,
      update(updater) {
        set(updater(currentModes))
      },
    }
  })()

  type ColorModeOS = Readable<ColorMode | undefined>
  const modeOS: ColorModeOS = ((): ColorModeOS => {
    const matchesToMode = (matches: boolean): ColorMode =>
      matches ? 'dark' : 'light'
    const listeners = new Set<Function>()
    const mediaQuery = matchMedia('(prefers-color-scheme: dark)')
    let colorMode: ColorMode | undefined
    const onChangeMediaQuery = (e: { matches: boolean }) => {
      const newMode = matchesToMode(e.matches)
      colorMode = newMode
      listeners.forEach((cb) => cb(newMode))
    }
    mediaQuery.addEventListener
      ? mediaQuery.addEventListener('change', onChangeMediaQuery)
      : mediaQuery.addListener(onChangeMediaQuery)
    onChangeMediaQuery(mediaQuery)
    return {
      subscribe(cb) {
        cb(colorMode)
        listeners.add(cb)
        return () => listeners.delete(cb)
      },
    }
  })()

  type ColorModeSaved = Writable<ColorMode | undefined>
  const modeSaved: ColorModeSaved = ((): ColorModeSaved => {
    const parseColorMode = (mode: string | null): ColorMode | undefined =>
      mode
        ? currentModes.includes(mode)
          ? (mode as ColorMode)
          : currentModes[0]
        : undefined
    const listeners = new Set<Function>()
    let mode: ColorMode | undefined
    const set = (colorMode?: ColorMode) => {
      if (colorMode !== undefined) {
        localStorage.setItem(colorModeKey, colorMode)
      } else {
        localStorage.removeItem(colorModeKey)
      }
      listeners.forEach((cb) => cb(colorMode))
      mode = colorMode
    }
    const savedMode = localStorage.getItem(colorModeKey)
    const colorMode = parseColorMode(savedMode)
    mode = colorMode
    return {
      subscribe(cb) {
        cb(colorMode)
        listeners.add(cb)
        return () => listeners.delete(cb)
      },
      set,
      update(updater) {
        set(updater(mode))
      },
    }
  })()

  const mode: ColorModeSaved = ((): ColorModeSaved => {
    let cmSaved: ColorMode | undefined
    let cmOS: ColorMode | undefined
    const getMerged = () => cmSaved || cmOS
    const listeners = new Set<Function>()
    modeSaved.subscribe((v) => {
      cmSaved = v
      listeners.forEach((cb) => cb(getMerged()))
    })
    modeOS.subscribe((v) => {
      cmOS = v
      listeners.forEach((cb) => cb(getMerged()))
    })
    return {
      subscribe(listener) {
        listeners.add(listener)
        listener(getMerged())
        return () => listeners.delete(listener)
      },
      set: modeSaved.set,
      update(updater) {
        modeSaved.set(updater(getMerged()))
      },
    }
  })()

  const htmlElement = document.documentElement
  let colorMode: string | undefined
  mode.subscribe((v) => {
    if (colorMode) {
      htmlElement.classList.remove(colorMode)
    }
    if (v) {
      htmlElement.classList.add(v)
    }
    colorMode = v
  })

  htmlElement.classList.add('pdm')
  return {
    mode,
    modes: modesWritable,
    modeOS,
    modeSaved,
  }
}