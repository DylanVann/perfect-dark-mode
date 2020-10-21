var { mode } = window.__pdm__

// For changing the tab icon.
var changeFavicon = (src) => {
  var oldLink = document.querySelector('link[rel="icon"]')
  document.head.removeChild(oldLink)
  var link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/png'
  link.href = src
  document.head.appendChild(link)
}

// Listen to the color mode and update the UI.
mode.subscribe((m) => changeFavicon(`images/${m}.png`))
