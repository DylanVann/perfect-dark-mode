import { ref, watchEffect, computed } from 'vue'
import type {
  Updater,
  ColorMode,
  EnhancedUpdater,
  PerfectDarkMode,
} from 'perfect-dark-mode'

export interface UsePerfectDarkMode {
  mode: ColorMode | undefined
  setMode: (mode: ColorMode) => void
  updateMode: (updater: EnhancedUpdater) => void
  modes: ColorMode[]
  setModes: (modes: ColorMode[]) => void
  updateModes: (updater: Updater<ColorMode[]>) => void
}

export const usePerfectDarkMode = () => {
  const pdm: PerfectDarkMode =
    typeof window !== 'undefined' ? window.__pdm__ : ({} as any)
  const { mode: pdmMode, modes: pdmModes } = pdm

  const mode = ref<ColorMode | undefined>(undefined)
  watchEffect((onInvalidate) =>
    onInvalidate(pdmMode.subscribe((v) => (mode.value = v))),
  )

  const modes = ref<ColorMode[]>([])
  watchEffect((onInvalidate) =>
    onInvalidate(pdmModes.subscribe((v) => (modes.value = v))),
  )

  return {
    mode,
    setMode: pdmMode && pdmMode.set,
    updateMode: pdmMode && pdmMode.update,
    modes,
    setModes: pdmModes && pdmModes.set,
    updateModes: pdmModes && pdmModes.update,
  }
}
