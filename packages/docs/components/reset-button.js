//----------------------------------------------------------
// Reset Button
//----------------------------------------------------------

var { mode } = window.__pdm__

// Get some elements we will use.
var resetButtonEls = document.querySelectorAll('.pdm-reset')

// These elements will clear the saved color mode,
// which will cause the color mode to fallback to
// the OS color mode.
resetButtonEls.forEach((el) =>
  el.addEventListener('click', () => mode.set(undefined)),
)
