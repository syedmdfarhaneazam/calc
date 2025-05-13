import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
//import "./index.css"
import { SessionProvider, useSession } from "./context/SessionContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useSession();
    return isLoggedIn ? children : <Navigate to="/" />;
};

const AuthRoute = ({ children }) => {
    const { isLoggedIn } = useSession();
    return !isLoggedIn ? children : <Navigate to="/dashboard" />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <AuthRoute>
                        <AuthPage />
                    </AuthRoute>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NotificationProvider>
            <SessionProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </SessionProvider>
        </NotificationProvider>
    </React.StrictMode>,
);
