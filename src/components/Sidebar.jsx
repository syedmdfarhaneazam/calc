import { useState, useEffect } from "react";
import { useSession } from "../context/SessionContext";
import ThemeToggle from "./ThemeToggle";

const Sidebar = ({ activePage, onPageChange }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [userDropdownActive, setUserDropdownActive] = useState(false);
    const { currentUser, logout } = useSession();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const toggleUserDropdown = (e) => {
        e.stopPropagation();
        setUserDropdownActive(!userDropdownActive);
    };

    const handleNavClick = (page) => {
        onPageChange(page);
        if (window.innerWidth < 992) {
            setCollapsed(true);
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        window.location.href = "/";
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setUserDropdownActive(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setCollapsed(true);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <aside
            className={`sidebar ${collapsed ? "collapsed" : ""}`}
            id="sidebar"
        >
            <div className="sidebar-header">
                {!collapsed && <div className="logo"></div>}
                <button
                    id="sidebar-toggle"
                    className="sidebar-toggle"
                    onClick={toggleSidebar}
                >
                    <i className={"fa-solid fa-bars"}></i>
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li
                        className={`nav-item ${activePage === "calculator" ? "active" : ""}`}
                    >
                        <a
                            href="#"
                            data-page="calculator"
                            onClick={() => handleNavClick("calculator")}
                        >
                            <i className="fa-solid fa-calculator"></i>
                            <span className="nav-text">Calculator</span>
                        </a>
                    </li>
                    <li
                        className={`nav-item ${activePage === "jobs" ? "active" : ""}`}
                    >
                        <a
                            href="#"
                            data-page="jobs"
                            onClick={() => handleNavClick("jobs")}
                        >
                            <i className="fa-solid fa-briefcase"></i>
                            <span className="nav-text">Job History</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div
                    className={`user-menu ${userDropdownActive ? "active" : ""}`}
                >
                    <button
                        id="user-menu-btn"
                        className="user-menu-btn"
                        onClick={toggleUserDropdown}
                    >
                        <i className="fa-solid fa-user"></i>
                        {!collapsed && (
                            <span className="nav-text user-name">
                                {currentUser?.name || "User Name"}
                            </span>
                        )}
                    </button>
                    <div
                        className={`user-dropdown ${userDropdownActive ? "active" : ""}`}
                    >
                        <a href="#" id="profile-link">
                            <i className="fa-solid fa-user"></i>
                            Profile
                        </a>
                        <a href="#" id="settings-link">
                            <i className="fa-solid fa-gear"></i>
                            Settings
                        </a>
                        <a href="#" id="logout-btn" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            Logout
                        </a>
                    </div>
                </div>
                <ThemeToggle />
            </div>
        </aside>
    );
};

export default Sidebar;
