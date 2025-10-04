import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { login as loginAPI } from '../api'; // ✅ Import login API
import './css/LoginPage.css';

const LoginPage = () => {
    const [loginAs, setLoginAs] = useState('');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginAs || !loginId.trim() || !password.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            // ✅ Use API from api.js
            const response = await loginAPI({
                email: loginId,
                password: password,
            });

            const data = response.data;

            if (data.success || data.token) { // adjust based on backend response
                const user = data.user || { role: loginAs, email: loginId };
                const token = data.token || 'fallback-token-' + Date.now();

                // Save auth info in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', user.role);
                localStorage.setItem('loggedInUserEmail', user.email);
                localStorage.setItem('authToken', token);

                // Update context
                login(user.role);

                alert('Login Successful!');

                // Navigate based on role
                if (user.role === 'HR') {
                    navigate('/add-employee');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Login failed! Please check your credentials.');
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="container login-page-container">
            <Header />
            <main className="login-main" style={{ marginTop: '70px', marginBottom: '70px' }}>
                <div className="login-box">
                    <h2>LOGIN</h2>
                    <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                        Use any credentials to login
                    </p>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="login-as">Login As</label>
                            <select
                                id="login-as"
                                value={loginAs}
                                onChange={(e) => setLoginAs(e.target.value)}
                                required
                            >
                                <option value="">-- Select Role --</option>
                                <option value="HR">HR</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-id">Login ID (Email)</label>
                            <input
                                type="email"
                                id="login-id"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group password-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                    <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
                        Forgot Password?
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;
