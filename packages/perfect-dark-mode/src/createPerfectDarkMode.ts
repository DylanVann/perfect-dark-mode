/** Callback to inform of a value updates. */
export type Subscriber<T> = (value: T) => void

/** Unsubscribes from value updates. */
export type Unsubscriber = () => void

/** Callback to update a value. */
export type Updater<T> = (value: T) => T

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

export type ColorMode = string

export interface PerfectDarkModeOptions {
  prefix?: string
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

export type ColorModeReadable = Readable<ColorMode | undefined>
export type ColorModeWritable = Writable<ColorMode | undefined>
export type ColorModesWritable = Writable<ColorMode[]>
export type EnhancedUpdater = (
  value: ColorMode | undefined,
  modes: ColorMode[],
  modeIndex: number | undefined,
) => ColorMode
export interface ColorModeWritableWithEnhancedUpdater
  extends ColorModeWritable {
  update: (updater: EnhancedUpdater) => void
}

export const createPerfectDarkMode = ({
  prefix = 'pdm',
  modes = ['light', 'dark'],
}: PerfectDarkModeOptions = {}): PerfectDarkMode => {
  const colorModeKey = prefix
  const localStorage = window.localStorage

  let currentModes = modes
  const modesWritable: ColorModesWritable = ((): ColorModesWritable => {
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

  const modeOS: ColorModeReadable = ((): ColorModeReadable => {
    const listeners = new Set<Function>()
    const mediaQuery = matchMedia('(prefers-color-scheme: dark)')
    let colorMode: ColorMode | undefined
    const onChangeMediaQuery = ({ matches }: { matches: boolean }) => {
      const newMode = matches ? 'dark' : 'light'
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

  const modeSaved: ColorModeWritable = ((): ColorModeWritable => {
    const parseColorMode = (mode: string | null): ColorMode | undefined =>
      mode
        ? currentModes.includes(mode)
          ? (mode as ColorMode)
          : currentModes[0]
        : undefined
    const listeners = new Set<Function>()
    let mode: ColorMode | undefined
    const set = (colorMode?: ColorMode) => {
      if (colorMode === mode) {
        return
      }
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
    window.addEventListener(
      'storage',
      (e) => e.key === colorModeKey && set(e.newValue || undefined),
    )
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

  const mode: ColorModeWritableWithEnhancedUpdater = ((): ColorModeWritableWithEnhancedUpdater => {
    let cmSaved: ColorMode | undefined
    let cmOS: ColorMode | undefined
    let cmMerged: ColorMode | undefined
    const listeners = new Set<Function>()
    modeSaved.subscribe((v) => {
      cmSaved = v
      cmMerged = cmSaved || cmOS
      listeners.forEach((cb) => cb(cmMerged))
    })
    modeOS.subscribe((v) => {
      cmOS = v
      cmMerged = cmSaved || cmOS
      listeners.forEach((cb) => cb(cmMerged))
    })
    return {
      subscribe(listener) {
        listeners.add(listener)
        listener(cmMerged)
        return () => listeners.delete(listener)
      },
      set: modeSaved.set,
      update(updater) {
        const index = cmMerged ? currentModes.indexOf(cmMerged) : undefined
        modeSaved.set(updater(cmMerged, currentModes, index))
      },
    }
  })()

  const htmlClassList = document.documentElement.classList
  let prevMode: string | undefined
  mode.subscribe((v) => {
    if (prevMode) {
      htmlClassList.remove(`${prefix}-${prevMode}`)
    }
    if (v) {
      htmlClassList.add(`${prefix}-${v}`)
    }
    prevMode = v
  })

  htmlClassList.add(prefix)
  return {
    mode,
    modes: modesWritable,
    modeOS,
    modeSaved,
  }
}
