"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getSessionData, setSessionData, removeSessionData } from "../utils/sessionUtils"

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    // Initialize session
    initSession()

    // Load current user from session storage
    const user = getSessionData("currentUser")
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
    }

    // Load jobs
    loadJobs()
  }, [])

  const initSession = () => {
    // Initialize users array in session storage if it doesn't exist
    if (!getUsers().length) {
      // Add a default user for testing
      const defaultUsers = [
        {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        },
      ]
      setSessionData("users", defaultUsers)
    }

    // Initialize jobs array in session storage if it doesn't exist
    if (!getJobs().length) {
      setSessionData("jobs", [])
    }
  }

  const getUsers = () => {
    return getSessionData("users", [])
  }

  const getJobs = () => {
    return getSessionData("jobs", [])
  }

  const loadJobs = () => {
    setJobs(getJobs())
  }

  const login = (email, password) => {
    const users = getUsers()

    // Find user with matching email and password
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      // Set current user in session
      setSessionData("currentUser", user)
      setCurrentUser(user)
      setIsLoggedIn(true)
      return true
    }

    return false
  }

  const register = (name, email, password) => {
    const users = getUsers()

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      return false
    }

    // Add new user
    const newUser = { name, email, password }
    users.push(newUser)
    setSessionData("users", users)

    // Log in the new user
    setSessionData("currentUser", newUser)
    setCurrentUser(newUser)
    setIsLoggedIn(true)

    return true
  }

  const logout = () => {
    removeSessionData("currentUser")
    setCurrentUser(null)
    setIsLoggedIn(false)
  }

  const saveJob = (job) => {
    const updatedJobs = [...jobs, job]
    setSessionData("jobs", updatedJobs)
    setJobs(updatedJobs)
  }

  const getJobById = (jobId) => {
    return jobs.find((job) => job.id === jobId) || null
  }

  return (
    <SessionContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        jobs,
        login,
        register,
        logout,
        saveJob,
        getJobById,
        loadJobs,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
