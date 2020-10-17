// This isn't important for the example, just nice.
const changeFavicon = (src) => {
  const oldLink = document.querySelector('link[rel="icon"]')
  document.head.removeChild(oldLink)
  const link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/png'
  link.href = src
  document.head.appendChild(link)
}

// Here's the important stuff.
const { mode, modes, modeSaved, modeOS } = window.__pdm__

// Get some elements we will use.
const toggleEls = document.querySelectorAll('.pdm-toggle')
const cycleEls = document.querySelectorAll('.pdm-cycle')
const emojiEls = document.querySelectorAll('.pdm-emoji')
const labelEls = document.querySelectorAll('.pdm-label')
const resetButtonEls = document.querySelectorAll('.pdm-reset')
const modeSavedEls = document.querySelectorAll('.pdm-mode-saved')
const modeOSEls = document.querySelectorAll('.pdm-mode-os')

// Listen to the color mode and update the UI.
mode.subscribe((m) => {
  emojiEls.forEach((el) => (el.className = `pdm-emoji emoji ${m}`))
  labelEls.forEach((el) => (el.textContent = m))
  changeFavicon(`images/${m}.png`)
})

// At this point our callback will have been called,
// so the text of these will be correct and we can show them.
toggleEls.forEach((el) => (el.style.visibility = 'unset'))
cycleEls.forEach((el) => (el.style.visibility = 'unset'))

// These elements will toggle between light and dark modes.
toggleEls.forEach((el) => {
  el.addEventListener('click', (e) =>
    mode.update((v) => (v === 'light' ? 'dark' : 'light')),
  )
})

// These elements will cycle through all modes.
cycleEls.forEach((el) => {
  el.addEventListener('click', (e) =>
    mode.update(
      (mode, modes, modeIndex) => modes[(modeIndex + 1) % modes.length],
    ),
  )
})

// We want to make sure that if the OS mode is 'light'
// and the saved mode is 'dark' that we do not transition
// between the two, so we add the transition after a frame
// has passed.
requestAnimationFrame(() =>
  requestAnimationFrame(
    () =>
      (document.documentElement.style.transition =
        'background 0.5s, color 0.5s'),
  ),
)

// These elements will clear the saved color mode,
// which will cause the color mode to fallback to
// the OS color mode.
resetButtonEls.forEach((el) =>
  el.addEventListener('click', () => mode.set(undefined)),
)

// Show the saved mode for debugging.
modeSaved.subscribe((v) =>
  modeSavedEls.forEach((el) => (el.textContent = `Saved Color Mode: ${v}`)),
)

// Show the OS mode for debugging.
modeOS.subscribe((v) =>
  modeOSEls.forEach((el) => (el.textContent = `OS Color Mode: ${v}`)),
)

// We can use a select element for choosing a color mode
// instead of a toggle button.
const selectEls = document.querySelectorAll('.pdm-select')

// Update the select options with the modes.
modes.subscribe((modes) => {
  selectEls.forEach((el) => {
    // Preserve the current selection by saving then re-assigning.
    const prevValue = el.value
    el.innerHTML = modes
      .map((m) => `<option value="${m}">${m}</option>`)
      .join('\n')
    el.value = prevValue
  })
})

selectEls.forEach((el) =>
  el.addEventListener('change', (e) => mode.set(e.target.value)),
)

mode.subscribe((m) => selectEls.forEach((el) => (el.value = m)))

const colorModeLinks = document.querySelectorAll('.codestyle')

mode.subscribe((m) => {
  colorModeLinks.forEach((link) => {
    if (!link.className.includes(m)) {
      link.disabled = true
    } else {
      link.disabled = false
      link.media = 'screen'
    }
  })
})

// Get a floating button element.
const floatingButtonEl = document.querySelector('.floating-button')
const topBarEl = document.querySelector('.top-bar')
let showingFloatingButton = false

// Show this floating button when the user scrolls down.
window.addEventListener(
  'scroll',
  () => {
    if (window.scrollY > 200) {
      if (!showingFloatingButton) {
        floatingButtonEl.classList.remove('opacity-0')
        floatingButtonEl.classList.add('opacity-100')
        topBarEl.classList.remove('pointer-events-none')
        topBarEl.classList.add('pointer-events-auto')
        showingFloatingButton = true
      }
    } else {
      if (showingFloatingButton) {
        floatingButtonEl.classList.add('opacity-0')
        floatingButtonEl.classList.remove('opacity-100')
        topBarEl.classList.add('pointer-events-none')
        topBarEl.classList.remove('pointer-events-auto')
        showingFloatingButton = false
      }
    }
  },
  { passive: true },
)
