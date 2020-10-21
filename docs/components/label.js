var { mode } = window.__pdm__

// Get some elements we will use.
var labelEls = document.querySelectorAll('.pdm-label')

// Listen to the color mode and update the UI.
mode.subscribe((m) => labelEls.forEach((el) => (el.textContent = m)))

// At this point our callback will have been called,
// so the text of these will be correct and we can show them.
labelEls.forEach((el) => (el.style.visibility = 'unset'))
