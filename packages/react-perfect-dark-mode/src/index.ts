import { useCallback, useLayoutEffect, useState } from 'react'
import type {
  ColorMode,
  EnhancedUpdater,
  PerfectDarkMode,
  Updater,
} from 'perfect-dark-mode'

export * from 'perfect-dark-mode'

export const pdm: PerfectDarkMode =
  typeof window !== 'undefined' && (window.__pdm__ as any)

export const usePerfectDarkMode = (): {
  mode: ColorMode | undefined
  setMode: (mode: ColorMode) => void
  updateMode: (updater: EnhancedUpdater) => void
  modes: ColorMode[]
  setModes: (modes: ColorMode[]) => void
  updateModes: (updater: Updater<ColorMode[]>) => void
} => {
  const { mode: pdmMode, modes: pdmModes } = pdm || {}
  const [mode, setModeInternal] = useState<ColorMode | undefined>(undefined)
  const [modes, setModesInternal] = useState<ColorMode[]>(() => [])
  useLayoutEffect(() => pdm.mode.subscribe((v) => setModeInternal(v)), [])
  useLayoutEffect(() => pdm.modes.subscribe((v) => setModesInternal(v)))
  const setMode = useCallback((mode) => pdmMode.set(mode), [])
  const updateMode = useCallback((updater) => pdmMode.update(updater), [])
  const setModes = useCallback((modes) => pdmModes.set(modes), [])
  const updateModes = useCallback(
    (updater: Updater<ColorMode[]>) => pdmModes.update(updater),
    [],
  )
  return { mode, setMode, updateMode, modes, setModes, updateModes }
}
