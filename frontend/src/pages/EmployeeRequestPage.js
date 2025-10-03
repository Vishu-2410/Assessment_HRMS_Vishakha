import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/EmployeeRequestPage.css';

const EmployeeRequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [requestText, setRequestText] = useState('');

    // Load requests from localStorage
    useEffect(() => {
        const storedRequests = JSON.parse(localStorage.getItem('requests') || '[]');
        setRequests(storedRequests);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!requestText.trim()) return;

        const newRequest = {
            id: Date.now(),
            text: requestText,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };

        const updatedRequests = [...requests, newRequest];
        setRequests(updatedRequests);
        localStorage.setItem('requests', JSON.stringify(updatedRequests));
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
