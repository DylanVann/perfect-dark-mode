import { useEffect, useState } from 'react'
import type {
  ColorMode,
  EnhancedUpdater,
  PerfectDarkMode,
  Readable,
  Updater,
} from 'perfect-dark-mode'

export * from 'perfect-dark-mode'

export interface UsePerfectDarkMode {
  mode: ColorMode | undefined
  modeSaved: ColorMode | undefined
  modeOS: ColorMode | undefined
  setMode: (mode: ColorMode | undefined) => void
  updateMode: (updater: EnhancedUpdater) => void
  modes: ColorMode[]
  setModes: (modes: ColorMode[]) => void
  updateModes: (updater: Updater<ColorMode[]>) => void
}

function useSubscribe<Value>(
  readable: Readable<Value>,
  initial: Value | (() => Value) = undefined as any,
): Value {
  const [v, setV] = useState<Value>(initial)
  useEffect(() => readable.subscribe(setV), [])
  return v as any
}

export const usePerfectDarkMode = (): UsePerfectDarkMode => {
  const pdm: PerfectDarkMode =
    typeof window !== 'undefined' ? window.__pdm__ : ({} as any)
  const {
    mode: _mode,
    modeOS: _modeOS,
    modeSaved: _modeSaved,
    modes: _modes,
  } = pdm
  const mode = useSubscribe(_mode)
  const modeOS = useSubscribe(_modeOS)
  const modeSaved = useSubscribe(_modeSaved)
  const modes = useSubscribe(_modes, () => [])
  return {
    mode,
    modeSaved,
    modeOS,
    setMode: _mode && _mode.set,
    updateMode: _mode && _mode.update,
    modes,
    setModes: _modes && _modes.set,
    updateModes: _modes && _modes.update,
  }
}
