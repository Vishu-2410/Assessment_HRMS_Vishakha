import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/EmployeeDashboardPage.css';

const EmployeeDashboardPage = () => {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        // Get logged-in user email
        const loggedInEmail = localStorage.getItem('loggedInUserEmail');
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');

        // Find employee who is logged in
        const currentEmp = employees.find(emp => emp.email === loggedInEmail);
        setEmployee(currentEmp);
    }, []);

    if (!employee) {
        return (
            <div className="container">
                <Header />
                <main className="employee-dashboard-main">
                    <div className="dashboard-box">
                        <h2>Employee Dashboard</h2>
                        <p>No employee data found for logged-in user.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="container">
            <Header />

            <main className="employee-dashboard-main">
                {/* Welcome message */}
                <div className="welcome-banner">
                    <h3>Welcome, <span>{employee.name}</span></h3>
                </div>

                {/* Employee Profile Details */}
                <div className="dashboard-box">
                    <h2>My Profile</h2>
                    <div className="emp-details">
                        <p><strong>Employee Code:</strong> {employee.code}</p>
                        <p><strong>Date of Joining:</strong> 
                            {employee.doj
                                ? new Date(employee.doj).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric'
                                })
                                : '—'}
                        </p>
                        <p><strong>Employee Reporting Manager:</strong> —</p>
                        <p><strong>Department:</strong> {employee.dept}</p>
                        <p><strong>Project:</strong> {employee.proj}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmployeeDashboardPage;
