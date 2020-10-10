const { mode } = window.__perfect_dark_mode__

const label = document.getElementById('label')
const checkbox = document.getElementById('checkbox')

// Listen to the color mode and update the UI.
mode.subscribe((v) => {
  checkbox.checked = v === 'dark'
  label.childNodes[2].textContent = v === 'dark' ? '🌚 Dark' : '🌝 Light'
})

// At this point our callback will have been called,
// so the checkbox state and text will be correct and we can show them.
label.style.visibility = 'unset'

// When the checkbox is clicked we update the mode.
// Our listener above will do the rest.
checkbox.addEventListener('change', (e) =>
  mode.update((v) => (v === 'light' ? 'dark' : 'light')),
)

const button = document.getElementById('button')

button.addEventListener('click', () => mode.set(undefined))
