import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createRequest, getMyRequests } from '../api';
import './css/EmployeeRequestPage.css';

const EmployeeRequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [requestText, setRequestText] = useState('');
    const [loading, setLoading] = useState(true);

    // Load employee requests from API
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await getMyRequests();
                setRequests(res.data); // backend returns array of requests
            } catch (err) {
                console.error("Error fetching requests:", err.response || err);
                alert("Failed to load requests.");
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!requestText.trim()) return;

        try {
            const res = await createRequest({ text: requestText });
            // res.data should contain the created request
            setRequests(prev => [...prev, res.data]);
            setRequestText('');
        } catch (err) {
            console.error("Error submitting request:", err.response || err);
            alert("Failed to submit request.");
        }
    };

    if (loading) {
        return (
            <div className="container">
                <Header />
                <main className="employee-request-main">
                    <p>Loading requests...</p>
                </main>
                <Footer />
            </div>
        );
    }

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
                                    <tr key={req._id || idx}>
                                        <td>{idx + 1}</td>
                                        <td>{req.text}</td>
                                        <td>{req.status}</td>
                                        <td>{new Date(req.createdAt).toLocaleDateString('en-GB')}</td>
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
