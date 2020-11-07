const { mode } = window.__pdm__

// Get some elements we will use.
const labelEls = document.querySelectorAll('.pdm-label')

// Listen to the color mode and update the UI.
mode.subscribe((m) => labelEls.forEach((el) => (el.textContent = m)))

// At this point we can show the elements.
labelEls.forEach((el) => (el.style.visibility = 'unset'))
