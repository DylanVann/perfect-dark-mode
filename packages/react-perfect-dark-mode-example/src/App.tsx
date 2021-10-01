import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { usePerfectDarkMode } from 'react-perfect-dark-mode'

function App() {
  const [count, setCount] = useState(0)
  const { modeSaved: mode, setMode } = usePerfectDarkMode()
  const onClickedMode = () => {
    const newMode = (() => {
      if (mode === undefined) return 'dark'
      if (mode === 'dark') return 'light'
      if (mode === 'light') return undefined
    })()
    setMode(newMode)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          <button type="button" onClick={onClickedMode}>
            {mode ?? 'system'}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
