import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/EmployeeRequestPage.css';

const EmployeeRequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [requestText, setRequestText] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    // Load employee info and requests
    useEffect(() => {
        // Get logged-in user info from localStorage (adjust based on your login setup)
        const loggedInEmail = localStorage.getItem('email'); // store email at login
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        const user = employees.find(emp => emp.email === loggedInEmail);
        setCurrentUser(user);

        // Load only this employee's requests
        const storedApprovals = JSON.parse(localStorage.getItem('approvals') || '[]');
        const myRequests = storedApprovals.filter(req => req.code === user?.code);
        setRequests(myRequests);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!requestText.trim() || !currentUser) return;

        const newRequest = {
            id: Date.now(),
            code: currentUser.code,
            name: currentUser.name,
            text: requestText,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };

        const storedApprovals = JSON.parse(localStorage.getItem('approvals') || '[]');
        const updatedApprovals = [...storedApprovals, newRequest];
        localStorage.setItem('approvals', JSON.stringify(updatedApprovals));

        // Update employee view
        setRequests(prev => [...prev, newRequest]);
        setRequestText('');
    };

    return (
        <div className="container">
            <Header />
            <main className="employee-request-main">
                <div className="request-box">
                    <h2>Submit Request</h2>

                    <form onSubmit={handleSubmit} className="request-form">
                        <textarea
                            value={requestText}
                            onChange={(e) => setRequestText(e.target.value)}
                            placeholder="Enter your request (leave/project change)..."
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>

                    <h3>Your Requests</h3>
                    {requests.length === 0 ? (
                        <p>No requests submitted yet.</p>
                    ) : (
                        <table className="request-table">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Request</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req, idx) => (
                                    <tr key={req.id}>
                                        <td>{idx + 1}</td>
                                        <td>{req.text}</td>
                                        <td>{req.status}</td>
                                        <td>{req.date}</td>
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

export default EmployeeRequestPage;
