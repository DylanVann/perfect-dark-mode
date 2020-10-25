<template>
  <Toggle />
  <br />
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import Toggle from './components/Toggle.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    Toggle,
    HelloWorld,
  },
}
</script>
