
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { login as loginAPI } from '../api';
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
            // ✅ Match backend expected body
            const response = await loginAPI({
                loginAs,
                loginId,
                email: loginId, // still pass as email for HR case
                password,
            });

            const data = response.data;

            if (data.token && data.role) {
                // Save auth info in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', data.role);
                localStorage.setItem('loggedInUserEmail', loginId);
                localStorage.setItem('authToken', data.token);

                // Update context
                login(data.role);

                alert('Login Successful!');

                // Navigate based on role
                if (data.role === 'HR') {
                    navigate('/add-employee');
                } else {
                    navigate('/employee-dashboard');
                }
            } else {
                alert('Login failed! Please check your credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Login failed! Please try again.');
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
                        Use your credentials to login
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
                            <label htmlFor="login-id">
                                {loginAs === 'Employee' ? 'Login ID (Email or Code)' : 'Email'}
                            </label>
                            <input
                                type="text"
                                id="login-id"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                required
                                placeholder={
                                    loginAs === 'Employee'
                                        ? 'Enter your employee code or email'
                                        : 'Enter your email'
                                }
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

