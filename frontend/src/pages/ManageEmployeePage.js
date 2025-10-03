import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        setEmployees(storedEmployees);
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

    // ✅ Open modal with selected employee
    const handleUpdate = (employeeCode) => {
        const emp = employees.find(e => e.code === employeeCode);
        setEditEmployee(emp);
        setIsEditModalOpen(true);
    };

    // ✅ Handle input changes inside modal
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditEmployee(prev => ({ ...prev, [name]: value }));
        if(name === 'dept') setEditEmployee(prev => ({ ...prev, proj: '' })); // Reset project when dept changes
    };

    // ✅ Save edited employee
    const handleSaveEdit = () => {
        const updatedEmployees = employees.map(emp =>
            emp.code === editEmployee.code ? editEmployee : emp
        );
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        setIsEditModalOpen(false);
    };

    const handleDelete = (employeeCode) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            const updatedEmployees = employees.filter(emp => emp.code !== employeeCode);
            setEmployees(updatedEmployees);
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
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
                                    paginatedEmployees.map(emp => (
                                        <tr key={emp.code}>
                                            <td>{emp.sr}</td>
                                            <td>{emp.name.split(' ')[0]}</td>
                                            <td>{emp.code}</td>
                                            <td>{emp.dept}</td>
                                            <td>{emp.proj}</td>
                                            <td className="action-buttons">
                                                <button className="update-btn" onClick={() => handleUpdate(emp.code)}>✏️</button>
                                                <button className="delete-btn" onClick={() => handleDelete(emp.code)}>🗑️</button>
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

                    {/* ✅ Edit Modal */}
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
