"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSession } from "../context/SessionContext"
import { useNotification } from "../context/NotificationContext"
import ThemeToggle from "../components/ThemeToggle"

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")

  const { login, register } = useSession()
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    if (login(loginEmail, loginPassword)) {
      showNotification("Login successful! Redirecting...", "success")
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000)
    } else {
      showNotification("Invalid email or password. Please try again.", "error")
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (registerPassword !== registerConfirmPassword) {
      showNotification("Passwords do not match", "error")
      return
    }

    if (registerPassword.length < 6) {
      showNotification("Password must be at least 6 characters", "error")
      return
    }

    // Register user
    if (register(registerName, registerEmail, registerPassword)) {
      showNotification("Registration successful! Redirecting...", "success")
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000)
    } else {
      showNotification("Email already exists. Please use a different email.", "error")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <img
              src="https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Logo"
            />
            <h1>Endurance Thermal Calculator</h1>
          </div>
          <ThemeToggle />
        </div>
        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            data-tab="login"
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            data-tab="register"
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>
        </div>
        <div className="auth-form-container">
          <form
            id="login-form"
            className={`auth-form ${activeTab === "login" ? "active" : ""}`}
            onSubmit={handleLoginSubmit}
          >
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <form
            id="register-form"
            className={`auth-form ${activeTab === "register" ? "active" : ""}`}
            onSubmit={handleRegisterSubmit}
          >
            <div className="form-group">
              <label htmlFor="register-name">Full Name</label>
              <input
                type="text"
                id="register-name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input
                type="email"
                id="register-email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="register-confirm-password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
