var { mode } = window.__pdm__

// Get the color mode links.
var colorModeLinks = document.querySelectorAll('.codestyle')

// Disable color mode links we don't need.
mode.subscribe((m) => {
  colorModeLinks.forEach((link) => {
    if (!link.className.includes(m)) {
      link.disabled = true
    } else {
      // Enable the link we do need.
      link.disabled = false
      link.media = 'screen'
    }
  })
})
