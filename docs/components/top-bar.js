// Get a floating button element.
var floatingButtonEl = document.querySelector('.floating-button')
var topBarEl = document.querySelector('.top-bar')
var showingFloatingButton = false

// Show this floating button when the user scrolls down.
window.addEventListener(
  'scroll',
  () => {
    if (window.scrollY > 200) {
      if (!showingFloatingButton) {
        floatingButtonEl.classList.replace('opacity-0', 'opacity-100')
        floatingButtonEl.classList.replace(
          'pointer-events-none',
          'pointer-events-auto',
        )
        showingFloatingButton = true
      }
    } else {
      if (showingFloatingButton) {
        floatingButtonEl.classList.replace('opacity-100', 'opacity-0')
        floatingButtonEl.classList.replace(
          'pointer-events-auto',
          'pointer-events-none',
        )
        showingFloatingButton = false
      }
    }
  },
  { passive: true },
)
