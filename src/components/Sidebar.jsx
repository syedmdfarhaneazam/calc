"use client"

import { useState, useEffect } from "react"
import { useSession } from "../context/SessionContext"
import ThemeToggle from "./ThemeToggle"

const Sidebar = ({ activePage, onPageChange }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [userDropdownActive, setUserDropdownActive] = useState(false)
  const { currentUser, logout } = useSession()

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleUserDropdown = (e) => {
    e.stopPropagation()
    setUserDropdownActive(!userDropdownActive)
  }

  const handleNavClick = (page) => {
    onPageChange(page)

    // On mobile, collapse sidebar after navigation
    if (window.innerWidth < 992) {
      setCollapsed(true)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    window.location.href = "/"
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUserDropdownActive(false)
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setCollapsed(true)
      }
    }

    window.addEventListener("resize", handleResize)

    // Initially trigger resize to set correct state
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img
            src="https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Logo"
            className="logo-img"
          />
          <span className="logo-text">Thermal Calc</span>
        </div>
        <button id="sidebar-toggle" className="sidebar-toggle" onClick={toggleSidebar}>
          <span className="material-icons">{collapsed ? "menu_open" : "menu"}</span>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={`nav-item ${activePage === "calculator" ? "active" : ""}`}>
            <a href="#" data-page="calculator" onClick={() => handleNavClick("calculator")}>
              <span className="material-icons">calculate</span>
              <span className="nav-text">Calculator</span>
            </a>
          </li>
          <li className={`nav-item ${activePage === "jobs" ? "active" : ""}`}>
            <a href="#" data-page="jobs" onClick={() => handleNavClick("jobs")}>
              <span className="material-icons">work</span>
              <span className="nav-text">Job History</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className={`user-menu ${userDropdownActive ? "active" : ""}`}>
          <button id="user-menu-btn" className="user-menu-btn" onClick={toggleUserDropdown}>
            <span className="material-icons">account_circle</span>
            <span className="nav-text user-name">{currentUser?.name || "User Name"}</span>
            <span className="material-icons arrow">arrow_drop_down</span>
          </button>
          <div className={`user-dropdown ${userDropdownActive ? "active" : ""}`}>
            <a href="#" id="profile-link">
              <span className="material-icons">person</span>
              Profile
            </a>
            <a href="#" id="settings-link">
              <span className="material-icons">settings</span>
              Settings
            </a>
            <a href="#" id="logout-btn" onClick={handleLogout}>
              <span className="material-icons">logout</span>
              Logout
            </a>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  )
}

export default Sidebar
