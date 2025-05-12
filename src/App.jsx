import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import DashboardPage from "./pages/DashboardPage"
import { useSession } from "./context/SessionContext"
import "./styles/auth.css"
import "./styles/dashboard.css"
import "./styles/styles.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

function App() {
  const { isLoggedIn } = useSession()

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <AuthPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
