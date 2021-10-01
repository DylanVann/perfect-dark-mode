import { ref, watchEffect, Ref } from 'vue'
import type {
  Updater,
  ColorMode,
  EnhancedUpdater,
  PerfectDarkMode,
  Readable,
} from 'perfect-dark-mode'

export interface UsePerfectDarkMode {
  mode: Ref<ColorMode | undefined>
  modeOS: Ref<ColorMode | undefined>
  modeSaved: Ref<ColorMode | undefined>
  setMode: (mode: ColorMode | undefined) => void
  updateMode: (updater: EnhancedUpdater) => void
  modes: Ref<ColorMode[]>
  setModes: (modes: ColorMode[]) => void
  updateModes: (updater: Updater<ColorMode[]>) => void
}

function useSubscribe<Value>(
  readable: Readable<Value>,
  initial: Value | (() => Value) = undefined as any,
): Ref<Value> {
  const value = ref((initial as any) as string)
  watchEffect((onInvalidate) =>
    onInvalidate(readable.subscribe((v) => (value.value = v as any))),
  )
  return value as any
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
  const modes = useSubscribe(_modes, [])
  return {
    mode,
    modeOS,
    modeSaved,
    setMode: _mode && _mode.set,
    updateMode: _mode && _mode.update,
    modes,
    setModes: _modes && _modes.set,
    updateModes: _modes && _modes.update,
  }
}
