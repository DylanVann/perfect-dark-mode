<script setup lang="ts">
import { usePerfectDarkMode } from 'vue-perfect-dark-mode'

const { modeSaved: mode, setMode } = usePerfectDarkMode()
const onClickedMode = () => {
  const newMode = (() => {
    if (mode.value === undefined) return 'dark'
    if (mode.value === 'dark') return 'light'
    if (mode.value === 'light') return undefined
  })()
  setMode(newMode)
}
</script>

<template>
  <button @click="onClickedMode">
    {{ mode || 'system' }}
  </button>
</template>
