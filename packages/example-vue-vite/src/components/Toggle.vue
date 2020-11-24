<script>
import { usePerfectDarkMode } from 'vue-perfect-dark-mode'

export default {
  name: 'App',
  setup(props) {
    const { mode, updateMode } = usePerfectDarkMode()
    return {
      mode,
      onClick() {
        updateMode(
          (mode, modes, modeIndex) => modes[(modeIndex + 1) % modes.length],
        )
      },
    }
  },
}
</script>

<template>
  <button :class="{ visible: mode !== undefined }" @click="onClick">
    {{ mode }}
  </button>
</template>

<style>
button {
  visibility: hidden;
}

.visible {
  visibility: visible;
}
</style>
