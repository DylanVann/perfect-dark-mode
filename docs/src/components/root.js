// We want to make sure that if the system mode is 'light'
// and the saved mode is 'dark' that we do not transition
// between the two, so we add the transition after a frame
// has passed.
requestAnimationFrame(() =>
  requestAnimationFrame(
    () =>
      (document.documentElement.style.transition =
        'background 0.5s, color 0.5s'),
  ),
)
