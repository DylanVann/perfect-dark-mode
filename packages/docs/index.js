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
const toggleElements = document.querySelectorAll('.pdm-toggle')

const modeToLabel = (m) => {
  if (m === 'dark' || m === 'light' || m === 'blue') {
    return `<i class="emoji ${m}"></i> ${m}`
  }
  return m
}

// Listen to the color mode and update the UI.
mode.subscribe((m) => {
  toggleElements.forEach(
    (el) => (el.querySelector('.label').innerHTML = modeToLabel(m)),
  )
  changeFavicon(`images/${m}.png`)
})

// At this point our callback will have been called,
// so the checkbox state and text will be correct and we can show them.
toggleElements.forEach((el) => (el.style.visibility = 'unset'))

// When the checkbox is clicked we update the mode.
// Our listener above will do the rest.
toggleElements.forEach((el) => {
  el.addEventListener('click', (e) =>
    mode.update((v) => (v === 'light' ? 'dark' : 'light')),
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

const resetButtons = document.querySelectorAll('.pdm-reset')

resetButtons.forEach((el) =>
  el.addEventListener('click', () => mode.set(undefined)),
)

modeSaved.subscribe(
  (v) =>
    (document.getElementById(
      'mode-saved',
    ).textContent = `Saved Color Mode: ${v}`),
)

modeOS.subscribe(
  (v) =>
    (document.getElementById('mode-os').textContent = `OS Color Mode: ${v}`),
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
