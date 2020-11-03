var { mode } = window.__pdm__

// Get some elements we will use.
var cycleEls = document.querySelectorAll('.pdm-cycle')

// These elements will cycle through all modes.
cycleEls.forEach((el) => {
  el.addEventListener('click', (e) =>
    mode.update(
      (mode, modes, modeIndex) => modes[(modeIndex + 1) % modes.length],
    ),
  )
})
