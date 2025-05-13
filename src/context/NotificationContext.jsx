import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        message: "",
        type: "info",
        show: false,
    });

    const showNotification = (message, type = "info", duration = 3000) => {
        setNotification({
            message,
            type,
            show: true,
        });

        setTimeout(() => {
            setNotification((prev) => ({
                ...prev,
                show: false,
            }));
        }, duration);
    };

    return (
        <NotificationContext.Provider
            value={{ notification, showNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
