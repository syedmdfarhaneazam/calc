"use client"

import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="theme-toggle">
      <button id="theme-toggle-btn" aria-label="Toggle theme" onClick={toggleTheme}>
        <span className="material-icons">{theme === "light" ? "dark_mode" : "light_mode"}</span>
      </button>
    </div>
  )
}

export default ThemeToggle
