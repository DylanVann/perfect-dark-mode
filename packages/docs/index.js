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
const { mode } = window.__perfect_dark_mode__

// Get some elements we will use.
const toggleElements = document.querySelectorAll('.toggle')

// Listen to the color mode and update the UI.
mode.subscribe((v) => {
  toggleElements.forEach(
    (el) =>
      (el.querySelector('.label').innerHTML =
        v === 'dark'
          ? '<img class="emoji" src="moon.png" alt=""> Dark'
          : '<img class="emoji" src="sun.png" alt=""> Light'),
  )
  changeFavicon(v === 'dark' ? 'moon.png' : 'sun.png')
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

const resetButtons = document.querySelectorAll('.reset')

resetButtons.forEach((el) =>
  el.addEventListener('click', () => mode.set(undefined)),
)

const { modeOS, modeSaved } = window.__perfect_dark_mode__

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
