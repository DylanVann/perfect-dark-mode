var { mode } = window.__pdm__

// Get the color mode links.
var colorModeLinks = document.querySelectorAll('.codestyle')

// Disable color mode links we don't need.
mode.subscribe((m) => {
  colorModeLinks.forEach((link) => {
    const disabled = !link.className.includes(m)
    if (link.disabled !== disabled) {
      if (disabled) {
        link.disabled = true
      } else {
        link.disabled = false
        link.media = 'screen'
      }
    }
  })
})
