import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    FaHome, 
    FaUsers, 
    FaUserTie, 
    FaSignInAlt, 
    FaSignOutAlt, 
    FaTasks, 
    FaClipboardCheck, 
    FaClipboardList // ✅ Added icon for Employee Request
} from 'react-icons/fa';
import './css/Footer.css';

const Footer = () => {
    const { isLoggedIn, logout, role } = useAuth();
    const location = useLocation();

    const isCurrentPath = (path) => location.pathname === path;

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        window.location.href = '/';
    };

    return (
        <footer className="footer">
            <nav className="footer-nav">
                {/* Home Link */}
                <NavLink to="/">
                    <FaHome className="footer-icon" />
                    <span className="footer-text">Home</span>
                </NavLink>

                {isLoggedIn ? (
                    <>
                        {/* HR Links */}
                        {role === 'HR' && (
                            <>
                                <NavLink 
                                    to="/add-employee"
                                    className={isCurrentPath('/add-employee') ? 'active' : ''}
                                >
                                    <FaUsers className="footer-icon" />
                                    <span className="footer-text">Add Emp</span>
                                </NavLink>

                                <NavLink 
                                    to="/manage-employee"
                                    className={isCurrentPath('/manage-employee') ? 'active' : ''}
                                >
                                    <FaTasks className="footer-icon" />
                                    <span className="footer-text">Manage</span>
                                </NavLink>

                                <NavLink 
                                    to="/approval"
                                    className={isCurrentPath('/approval') ? 'active' : ''}
                                >
                                    <FaClipboardCheck className="footer-icon" />
                                    <span className="footer-text">Approval</span>
                                </NavLink>
                            </>
                        )}

                        {/* Employee Links */}
                        {role === 'Employee' && (
                            <>
                                <NavLink 
                                    to="/employee-dashboard" // ✅ Employee dashboard route
                                    className={isCurrentPath('/employee-dashboard') ? 'active' : ''}
                                >
                                    <FaUsers className="footer-icon" />
                                    <span className="footer-text">Dashboard</span>
                                </NavLink>

                                <NavLink 
                                    to="/employee-request" // ✅ Employee request route
                                    className={isCurrentPath('/employee-request') ? 'active' : ''}
                                >
                                    <FaClipboardList className="footer-icon" />
                                    <span className="footer-text">Request</span>
                                </NavLink>
                            </>
                        )}

                        {/* Logout */}
                        <a href="#" onClick={handleLogout}>
                            <FaSignOutAlt className="footer-icon" />
                            <span className="footer-text">Logout</span>
                        </a>
                    </>
                ) : (
                    <>
                        {/* Non-authenticated links */}
                        <NavLink to="/manage-employee">
                            <FaUsers className="footer-icon" />
                            <span className="footer-text">EMP</span>
                        </NavLink>
                        
                        <NavLink to="/add-employee">
                            <FaUserTie className="footer-icon" />
                            <span className="footer-text">HR</span>
                        </NavLink>

                        <NavLink to="/login">
                            <FaSignInAlt className="footer-icon" />
                            <span className="footer-text">Login</span>
                        </NavLink>
                    </>
                )}
            </nav>
        </footer>
    );
};

export default Footer;
