afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = ''
  jest.resetModules()
})

test('perfect-dark-mode', () => {
  const matchMediaListeners = new Set<Function>()
  const matchMediaMock = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    // Deprecated.
    addListener: (cb: any) => matchMediaListeners.add(cb),
    // Deprecated.
    removeListener: jest.fn(),
    addEventListener: (e: string, cb: any) => matchMediaListeners.add(cb),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })
  window.matchMedia = matchMediaMock

  const addEventListener = window.addEventListener
  const storageListeners = new Set<Function>()
  const addEventListenerMock = (...args: any) => {
    if (args[0] === 'storage') {
      storageListeners.add(args[1])
      return
    }
    return addEventListener(args[0], args[1])
  }
  window.addEventListener = addEventListenerMock

  // Should not yet be initialized.
  expect(document.documentElement.classList).not.toContain('pdm-light')
  expect(document.documentElement.classList).not.toContain('pdm')

  // Load the script.
  require('./index')

  // Should have initialized PDM, adding pdm class and pdm-light class.
  expect(document.documentElement.classList).toContain('pdm-light')
  expect(document.documentElement.classList).toContain('pdm')

  const pdm = window.__pdm__

  // We can listen to things.
  const listeners = [
    pdm.modeOS.subscribe((v) => v),
    pdm.modeSaved.subscribe((v) => v),
    pdm.mode.subscribe((v) => v),
    pdm.modes.subscribe((v) => v),
  ]

  // We can set the mode.
  pdm.mode.set('dark')
  expect(document.documentElement.classList).toContain('pdm-dark')
  expect(document.documentElement.classList).not.toContain('pdm-light')

  // We can update the mode.
  pdm.mode.update((mode) => 'light')
  pdm.modeSaved.update((mode) => 'light')
  expect(document.documentElement.classList).not.toContain('pdm-dark')
  expect(document.documentElement.classList).toContain('pdm-light')

  // We can set modes.
  pdm.modes.set(['light', 'dark'])
  // We can update modes.
  pdm.modes.update((modes) => ['light', 'dark'])

  // Clear the saved mode.
  pdm.mode.set(undefined)
  // Mock a change to the matchMedia query.
  matchMediaListeners.forEach((v) => v({ matches: true }))
  matchMediaListeners.forEach((v) => v({ matches: true }))
  matchMediaListeners.forEach((v) => v({ matches: false }))

  // Set a mode.
  pdm.mode.set('light')
  expect(document.documentElement.classList).toContain('pdm-light')
  // Listens to storage.
  storageListeners.forEach((cb) => cb({ key: 'pdm', newValue: 'dark' }))
  expect(document.documentElement.classList).toContain('pdm-dark')
  storageListeners.forEach((cb) => cb({ key: 'pdm', newValue: undefined }))

  // We can remove our listeners by calling them.
  listeners.forEach((remove) => remove())
})

test('perfect-dark-mode, invalid mode', () => {
  const matchMediaListeners = new Set<Function>()
  const matchMediaMock = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    // Deprecated.
    addListener: (cb: any) => matchMediaListeners.add(cb),
    // Deprecated.
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })

  window.matchMedia = matchMediaMock as any

  global.localStorage.__proto__.getItem = () => 'unrecognized'

  // Load the script.
  require('./index')

  // Should have initialized PDM, adding pdm class and pdm-light class.
  expect(document.documentElement.classList).toContain('pdm-light')
  expect(document.documentElement.classList).toContain('pdm')
  expect(document.documentElement.classList).not.toContain('unrecognized')
})

test('perfect-dark-mode, using matchMedia.addListener', () => {
  const matchMediaListeners = new Set<Function>()
  const matchMediaMock = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    // Deprecated.
    addListener: (cb: any) => matchMediaListeners.add(cb),
    // Deprecated.
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })

  window.matchMedia = matchMediaMock as any

  // Load the script.
  require('./index')

  // Should have initialized PDM, adding pdm class and pdm-light class.
  expect(document.documentElement.classList).toContain('pdm-light')
  expect(document.documentElement.classList).toContain('pdm')
})