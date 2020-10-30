var { modeOS, modeSaved } = window.__pdm__

// We can build a Readable using modeOS and modeSaved.
// With Svelte you could use derived: https://svelte.dev/docs#derived
const combinedMode = (() => {
  const listeners = new Set()
  let os
  let saved
  let previous
  const onChange = () => {
    const newValue = saved !== undefined ? saved : `System (${os})`
    if (previous !== newValue) {
      listeners.forEach((cb) => cb(newValue))
      previous = newValue
    }
  }
  modeOS.subscribe((v) => {
    os = v
    onChange()
  })
  modeSaved.subscribe((v) => {
    saved = v
    onChange()
  })
  onChange()
  return {
    subscribe(listener) {
      listeners.add(listener)
      listener(previous)
      return () => listeners.delete(listener)
    },
  }
})()

// Get label elements.
var labelEls = document.querySelectorAll('.pdm-label-with-system-mode')

// Update the label elements with the mode.
combinedMode.subscribe((m) => labelEls.forEach((el) => (el.textContent = m)))

// At this point we can show the elements.
labelEls.forEach((el) => (el.style.visibility = 'unset'))

// Get the button elements.
var buttonEls = document.querySelectorAll('.pdm-toggle-with-system-mode')

// These buttons will alternate through light, dark, and system modes.
buttonEls.forEach((el) => {
  el.addEventListener('click', (e) =>
    modeSaved.update((v) => {
      if (v === 'light') {
        return 'dark'
      }
      if (v === 'dark') {
        return undefined
      }
      if (v === undefined) {
        return 'light'
      }
    }),
  )
})
