var { mode } = window.__pdm__

// Get the color mode links.
var colorModeLinks = document.querySelectorAll('.codestyle')

// Disable color mode links we don't need.
mode.subscribe((m) => {
  colorModeLinks.forEach((link) => {
    const enabled = link.className.includes(m)
    const disabled = !enabled
    if (enabled && link.media !== 'screen') {
      link.disabled = false
      link.media = 'screen'
    } else if (disabled && !link.disabled) {
      link.disabled = true
    }
  })
})
