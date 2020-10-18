//----------------------------------------------------------
// Toggle Button
//----------------------------------------------------------

var { mode } = window.__pdm__

// Get some elements we will use.
var toggleEls = document.querySelectorAll('.pdm-toggle')

// These elements will toggle between light and dark modes.
toggleEls.forEach((el) => {
  el.addEventListener('click', (e) =>
    mode.update((v) => (v === 'light' ? 'dark' : 'light')),
  )
})
