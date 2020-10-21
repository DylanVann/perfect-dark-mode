var { modeSaved, modeOS } = window.__pdm__

// Get some elements we will use.
var modeSavedEls = document.querySelectorAll('.pdm-mode-saved')
var modeOSEls = document.querySelectorAll('.pdm-mode-os')

// Show the saved mode for debugging.
modeSaved.subscribe((v) =>
  modeSavedEls.forEach((el) => (el.textContent = `Saved Color Mode: ${v}`)),
)

// Show the OS mode for debugging.
modeOS.subscribe((v) =>
  modeOSEls.forEach((el) => (el.textContent = `OS Color Mode: ${v}`)),
)
