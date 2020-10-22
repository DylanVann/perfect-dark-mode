import React from 'react'
import type {
  ColorMode,
  EnhancedUpdater,
  PerfectDarkMode,
  Updater,
} from 'perfect-dark-mode'

export * from 'perfect-dark-mode'

export interface UsePerfectDarkMode {
  mode: ColorMode | undefined
  setMode: (mode: ColorMode) => void
  updateMode: (updater: EnhancedUpdater) => void
  modes: ColorMode[]
  setModes: (modes: ColorMode[]) => void
  updateModes: (updater: Updater<ColorMode[]>) => void
}

export const usePerfectDarkMode = (): UsePerfectDarkMode => {
  const pdm: PerfectDarkMode =
    typeof window !== 'undefined' ? window.__pdm__ : ({} as any)
  const { mode: pdmMode, modes: pdmModes } = pdm

  const [mode, setModeInternal] = React.useState<ColorMode | undefined>(
    undefined,
  )
  const [modes, setModesInternal] = React.useState<ColorMode[]>(() => [])
  React.useEffect(() => pdmMode.subscribe((v) => setModeInternal(v)), [])
  React.useEffect(() => pdmModes.subscribe((v) => setModesInternal(v)))

  return {
    mode,
    setMode: pdmMode && pdmMode.set,
    updateMode: pdmMode && pdmMode.update,
    modes,
    setModes: pdmModes && pdmModes.set,
    updateModes: pdmModes && pdmModes.update,
  }
}
