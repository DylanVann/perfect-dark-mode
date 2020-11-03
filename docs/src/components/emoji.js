var { mode } = window.__pdm__

// Get some elements we will use.
var emojiEls = document.querySelectorAll('.pdm-emoji')

// Listen to the color mode and update the UI.
mode.subscribe((m) =>
  emojiEls.forEach((el) => (el.className = `pdm-emoji emoji emoji-${m}`)),
)

// At this point we can show the elements.
emojiEls.forEach((el) => (el.style.visibility = 'unset'))
