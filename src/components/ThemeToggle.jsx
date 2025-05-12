import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="theme-toggle">
      <button id="theme-toggle-btn" aria-label="Toggle theme" onClick={toggleTheme}>
        <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
      </button>
    </div>
  )
}

export default ThemeToggle
