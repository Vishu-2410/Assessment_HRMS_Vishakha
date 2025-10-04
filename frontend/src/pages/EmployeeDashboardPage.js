import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmployees } from '../api';
import './css/EmployeeDashboardPage.css';

const EmployeeDashboardPage = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const loggedInEmail = localStorage.getItem('loggedInUserEmail');
                const res = await getEmployees();
                const employees = res.data;
                const currentEmp = employees.find(emp => emp.email === loggedInEmail);
                setEmployee(currentEmp);
            } catch (err) {
                console.error("Error fetching employee:", err.response || err);
                alert("Failed to load employee data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <Header />
                <main className="employee-dashboard-main">
                    <div className="dashboard-box">
                        <p>Loading...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="container">
                <Header />
                <main className="employee-dashboard-main">
                    <div className="dashboard-box">
                        <p>No employee data found.</p>
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
                {/* Top Banner with Welcome */}
                <div className="dashboard-top-banner">
                    <h2>Welcome, <span>{employee.name}</span></h2>
                </div>

                {/* Employee Profile Card */}
                <div className="dashboard-profile-card">
                    <div className="profile-row">
                        <div className="profile-label">Employee Code:</div>
                        <div className="profile-value">{employee.code}</div>
                    </div>
                    <div className="profile-row">
                        <div className="profile-label">Date of Joining:</div>
                        <div className="profile-value">
                            {employee.doj
                                ? new Date(employee.doj).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric'
                                })
                                : '-'}
                        </div>
                    </div>
                    <div className="profile-row">
                        <div className="profile-label">Employee Reporting Manager:</div>
                        <div className="profile-value">-</div>
                    </div>
                    <div className="profile-row">
                        <div className="profile-label">Department:</div>
                        <div className="profile-value">{employee.dept}</div>
                    </div>
                    <div className="profile-row">
                        <div className="profile-label">Project:</div>
                        <div className="profile-value">{employee.proj}</div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmployeeDashboardPage;
