const { modeSaved, modeOS } = window.__pdm__

// Show the saved mode for debugging.
const modeSavedEls = document.querySelectorAll('.pdm-mode-saved')
modeSaved.subscribe((v) =>
  modeSavedEls.forEach((el) => (el.textContent = `Saved Color Mode: ${v}`)),
)

// Show the system mode for debugging.
const modeSystemEls = document.querySelectorAll('.pdm-mode-system')
modeOS.subscribe((v) =>
  modeSystemEls.forEach((el) => (el.textContent = `System Color Mode: ${v}`)),
)
