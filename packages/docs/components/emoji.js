//----------------------------------------------------------
// Emoji
//----------------------------------------------------------

var { mode } = window.__pdm__

// Get some elements we will use.
var emojiEls = document.querySelectorAll('.pdm-emoji')

// Listen to the color mode and update the UI.
mode.subscribe((m) =>
  emojiEls.forEach((el) => (el.className = `pdm-emoji emoji ${m}`)),
)

// At this point our callback will have been called,
// so the text of these will be correct and we can show them.
emojiEls.forEach((el) => (el.style.visibility = 'unset'))
