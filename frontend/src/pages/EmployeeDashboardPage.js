import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/EmployeeDashboardPage.css';

const EmployeeDashboardPage = () => {
    const [employees, setEmployees] = useState([]);

    // Load employees from localStorage
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        setEmployees(storedEmployees);
    }, []);

    return (
        <div className="container">
            <Header />
            <main className="employee-dashboard-main">
                <div className="dashboard-box">
                    <h2>Employee Dashboard</h2>

                    {employees.length === 0 ? (
                        <p>No employee data available.</p>
                    ) : (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Dept.</th>
                                    <th>Project</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp, idx) => (
                                    <tr key={emp.code}>
                                        <td>{idx + 1}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.code}</td>
                                        <td>{emp.dept}</td>
                                        <td>{emp.proj}</td>
                                        <td>{emp.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EmployeeDashboardPage;
