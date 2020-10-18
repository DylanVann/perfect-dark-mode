var { mode, modes } = window.__pdm__

// We can use a select element for choosing a color mode
// instead of a toggle button.
var selectEls = document.querySelectorAll('.pdm-select')

// Update the select options with the modes.
modes.subscribe((modes) => {
  selectEls.forEach((el) => {
    // Preserve the current selection by saving then re-assigning.
    var prevValue = el.value
    el.innerHTML = modes
      .map((m) => `<option value="${m}">${m}</option>`)
      .join('\n')
    el.value = prevValue
  })
})

// Set the mode on change.
selectEls.forEach((el) =>
  el.addEventListener('change', (e) => mode.set(e.target.value)),
)

// Set the value to mode.
mode.subscribe((m) => selectEls.forEach((el) => (el.value = m)))
