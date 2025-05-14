import { createContext, useContext, useState, useEffect } from "react"
import { getSessionData, setSessionData, removeSessionData } from "../utils/sessionUtils"

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [jobs, setJobs] = useState([])

  useEffect(() => {

    initSession()

    const user = getSessionData("currentUser")
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
    }
    loadJobs()
  }, [])

  const initSession = () => {
    if (!getUsers().length) {
      const defaultUsers = [
        {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        },
      ]
      setSessionData("users", defaultUsers)
    }
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

    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      setSessionData("currentUser", user)
      setCurrentUser(user)
      setIsLoggedIn(true)
      return true
    }

    return false
  }

  const register = (name, email, password) => {
    const users = getUsers()

    if (users.some((user) => user.email === email)) {
      return false
    }

    const newUser = { name, email, password }
    users.push(newUser)
    setSessionData("users", users)

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
