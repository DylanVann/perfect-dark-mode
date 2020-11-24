const { mode } = window.__pdm__

// Get the color mode links.
const colorModeLinks = document.querySelectorAll('.codestyle')

// Disable color mode links we don't need.
mode.subscribe((m) => {
  colorModeLinks.forEach((link) => {
    const enabled = link.className.includes(m)
    const disabled = !enabled
    const media = enabled ? 'screen' : 'none'
    if (link.media !== media) {
      link.media = media
      link.disabled = disabled
    }
  })
})
