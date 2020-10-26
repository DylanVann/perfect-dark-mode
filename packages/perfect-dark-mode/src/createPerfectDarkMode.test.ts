import type { PerfectDarkMode } from './createPerfectDarkMode'

test('createPerfectDarkMode', () => {
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

  global.localStorage.__proto__.getItem = () => 'light'

  const { createPerfectDarkMode } = require('./createPerfectDarkMode')
  createPerfectDarkMode()
  const pdm: PerfectDarkMode = createPerfectDarkMode({ modes: ['light'] })
  pdm.modes.set(['orange'])
  // If the mode sent to update is not recognized index will be 0.
  pdm.mode.update((mode, modes, modeIndex) => {
    expect(modeIndex).toBe(0)
    expect(modes).toEqual(['orange'])
    expect(mode).toBe('light')
    return 'orange'
  })
})
