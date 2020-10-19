import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { usePerfectDarkMode } from "gatsby-plugin-perfect-dark-mode"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  const { mode, updateMode } = usePerfectDarkMode()
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(true), [])
  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <button
        style={{ visibility: visible ? "visible" : "hidden" }}
        onClick={() =>
          updateMode(
            (mode, modes, modeIndex) => modes[(modeIndex + 1) % modes.length]
          )
        }
      >
        {mode}
      </button>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
