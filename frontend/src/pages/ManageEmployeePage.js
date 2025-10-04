import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmployees, updateEmployee, deleteEmployee } from '../api';
import './css/ManageEmployeePage.css';

const ManageEmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDept, setSelectedDept] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Edit modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);

    const departmentProjects = {
        'HRMS': ['Induction', 'OnBoarding'],
        'Recruitment': ['IT-Recruitment', 'Non-IT-Recruitment'],
        'Development': ['Web', 'Mobile', 'Software'],
        'Digital Marketing': ['Content Awareness/Creation', 'Campaigns'],
        'Sales and Marketing': ['Sales', 'Marketing', 'Business Development']
    };

    // ✅ Fetch employees from backend
    const fetchEmployees = async () => {
        try {
            const res = await getEmployees();
            setEmployees(res.data);
        } catch (err) {
            console.error("Error fetching employees:", err.response || err);
            alert("Failed to fetch employees.");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const filteredEmployees = selectedDept === 'All'
        ? employees
        : employees.filter(emp => emp.dept === selectedDept);

    const departments = ['All', ...new Set(employees.map(emp => emp.dept))];

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

    const handleDeptChange = (e) => {
        setSelectedDept(e.target.value);
        setCurrentPage(1);
    };

    const handleUpdate = (employee) => {
        setEditEmployee(employee);
        setIsEditModalOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditEmployee(prev => ({ ...prev, [name]: value }));
        if (name === 'dept') setEditEmployee(prev => ({ ...prev, proj: '' }));
    };

    const handleSaveEdit = async () => {
        try {
            const { _id, ...updateData } = editEmployee; // exclude _id
            await updateEmployee(editEmployee._id, updateData);
            alert("Employee updated successfully!");
            setIsEditModalOpen(false);
            fetchEmployees();
        } catch (err) {
            console.error("Error updating employee:", err.response || err);
            alert("Failed to update employee.");
        }
    };

    const handleDelete = async (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(employeeId);
                alert("Employee deleted successfully!");
                fetchEmployees();
            } catch (err) {
                console.error("Error deleting employee:", err.response || err);
                alert("Failed to delete employee.");
            }
        }
    };

    return (
        <div className="container">
            <Header />
            <main className="manage-employee-main">
                <div className="manage-employee-box">
                    <h2>MANAGE EMPLOYEE</h2>

                    {/* Department Filter */}
                    <div className="filter-container">
                        <label htmlFor="dept-select">Select Dept.</label>
                        <select id="dept-select" value={selectedDept} onChange={handleDeptChange}>
                            {departments.map((dept, idx) => (
                                <option key={idx} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    {/* Employee Table */}
                    <div className="employee-table-container">
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Dept.</th>
                                    <th>Project</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedEmployees.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>No employees found.</td>
                                    </tr>
                                ) : (
                                    paginatedEmployees.map((emp, index) => (
                                        <tr key={emp._id}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{emp.name}</td>
                                            <td>{emp.code}</td>
                                            <td>{emp.dept}</td>
                                            <td>{emp.proj}</td>
                                            <td className="action-buttons">
                                                <button className="update-btn" onClick={() => handleUpdate(emp)}>✏️</button>
                                                <button className="delete-btn" onClick={() => handleDelete(emp._id)}>🗑️</button>
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
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>&lt;</button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                <button
                                    key={num}
                                    className={currentPage === num ? "active" : ""}
                                    onClick={() => setCurrentPage(num)}
                                >
                                    {num}
                                </button>
                            ))}
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>&gt;</button>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {isEditModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>Edit Employee</h3>
                                <label>Name:</label>
                                <input type="text" name="name" value={editEmployee.name} onChange={handleEditChange} />

                                <label>Department:</label>
                                <select name="dept" value={editEmployee.dept} onChange={handleEditChange}>
                                    <option value="">Select Department</option>
                                    {Object.keys(departmentProjects).map(dep => (
                                        <option key={dep} value={dep}>{dep}</option>
                                    ))}
                                </select>

                                <label>Project:</label>
                                <select name="proj" value={editEmployee.proj} onChange={handleEditChange}>
                                    <option value="">Select Project</option>
                                    {(departmentProjects[editEmployee.dept] || []).map(proj => (
                                        <option key={proj} value={proj}>{proj}</option>
                                    ))}
                                </select>

                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ManageEmployeePage;
