import React, { useState, useEffect } from 'react'; // ✅ useState and useEffect for state management
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/ApprovalPage.css';

const ApprovalPage = () => {
    const [approvals, setApprovals] = useState([]); // ✅ Store approval requests
    const [selectedStatus, setSelectedStatus] = useState('All'); // ✅ Filter Pending/Approved/Disapproved
    const [currentPage, setCurrentPage] = useState(1); // ✅ Pagination
    const itemsPerPage = 5; // ✅ Items per page

    // ✅ Load approvals from localStorage
    useEffect(() => {
        const storedApprovals = JSON.parse(localStorage.getItem('approvals') || '[]'); 
        setApprovals(storedApprovals);
    }, []);

    // ✅ Filter approvals based on selected status
    const filteredApprovals = selectedStatus === 'All'
        ? approvals
        : approvals.filter(req => req.status === selectedStatus);

    const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedApprovals = filteredApprovals.slice(startIndex, startIndex + itemsPerPage);

    // ✅ Approve/Disapprove action
    const handleApproval = (index, status) => {
        const actualIndex = approvals.findIndex(req => req.code === paginatedApprovals[index].code);
        if (actualIndex !== -1) {
            const updatedApprovals = [...approvals];
            updatedApprovals[actualIndex].status = status;
            setApprovals(updatedApprovals);
            localStorage.setItem('approvals', JSON.stringify(updatedApprovals)); // ✅ Persist changes
        }
    };

    return (
        <div className="container">
            <Header />
            <main className="approval-main">
                <div className="approval-content">
                    <h2>Approval Requests</h2>

                    {/* Status Filter */}
                    <div className="filter-container">
                        <label>Status:</label>
                        <select 
                            value={selectedStatus} 
                            onChange={(e) => { 
                                setSelectedStatus(e.target.value); 
                                setCurrentPage(1); // ✅ Reset page on filter change
                            }}
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Disapproved">Disapproved</option>
                        </select>
                    </div>

                    {/* Approval Table */}
                    <div className="approval-table-container">
                        <table className="approval-table">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Employee Name</th>
                                    <th>Code</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedApprovals.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>No approval requests found.</td>
                                    </tr>
                                ) : (
                                    paginatedApprovals.map((req, idx) => (
                                        <tr key={req.code}>
                                            <td>{startIndex + idx + 1}</td>
                                            <td>{req.name.split(' ')[0]}</td> {/* ✅ Show first name only */}
                                            <td>{req.code}</td>
                                            <td>{req.status}</td>
                                            <td className="action-buttons">
                                                {req.status === 'Pending' && ( // ✅ Only Pending can take action
                                                    <>
                                                        <button 
                                                            onClick={() => handleApproval(idx, 'Approved')} 
                                                            className="approve-btn"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button 
                                                            onClick={() => handleApproval(idx, 'Disapproved')} 
                                                            className="disapprove-btn"
                                                        >
                                                            Disapprove
                                                        </button>
                                                    </>
                                                )}
                                                {req.status !== 'Pending' && <span>—</span>} {/* ✅ No action for non-pending */}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                disabled={currentPage === 1} 
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                &lt;
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                <button 
                                    key={num} 
                                    className={currentPage === num ? "active" : ""} 
                                    onClick={() => setCurrentPage(num)}
                                >
                                    {num}
                                </button>
                            ))}
                            <button 
                                disabled={currentPage === totalPages} 
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ApprovalPage;
