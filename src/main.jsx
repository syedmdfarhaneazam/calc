import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
//import "./index.css"
import { SessionProvider } from "./context/SessionContext"
import { ThemeProvider } from "./context/ThemeContext"
import { NotificationProvider } from "./context/NotificationContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationProvider>
      <SessionProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SessionProvider>
    </NotificationProvider>
  </React.StrictMode>,
)
