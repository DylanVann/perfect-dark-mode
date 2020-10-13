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
const labelElement = document.getElementById('label')
const checkboxElement = document.getElementById('checkbox')

// Listen to the color mode and update the UI.
mode.subscribe((v) => {
  checkboxElement.checked = v === 'dark'
  labelElement.childNodes[2].textContent = v === 'dark' ? '🌚 Dark' : '🌝 Light'
  changeFavicon(v === 'dark' ? 'moon.png' : 'sun.png')
})

// At this point our callback will have been called,
// so the checkbox state and text will be correct and we can show them.
labelElement.style.visibility = 'unset'

// When the checkbox is clicked we update the mode.
// Our listener above will do the rest.
checkboxElement.addEventListener('change', (e) =>
  mode.update((v) => (v === 'light' ? 'dark' : 'light')),
)

const button = document.getElementById('button')

button.addEventListener('click', () => mode.set(undefined))

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
