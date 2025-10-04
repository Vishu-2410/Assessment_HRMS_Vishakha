import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createEmployee } from '../api';
import './css/AddEmployeePage.css';

const AddEmployeePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        doj: '',
        dept: '',
        proj: '',
        email: '',
        password: ''
    });
    const [projectOptions, setProjectOptions] = useState([]);
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("role");

    const departmentProjects = {
        'HRMS': ['Induction', 'OnBoarding'],
        'Recruitment': ['IT-Recruitment', 'Non-IT-Recruitment'],
        'Development': ['Web', 'Mobile', 'Software'],
        'Account': [],
        'Digital Marketing': ['Content Awareness/Creation', 'Campaigns'],
        'Sales and Marketing': ['Sales', 'Marketing', 'Business Development']
    };

    useEffect(() => {
        if (!isAuthenticated || userRole !== "HR") {
            alert("Please login as HR to access this page.");
            navigate("/login");
            return;
        }

        // Auto-generate code & password
        const now = new Date();
        const yy = String(now.getFullYear()).slice(-2);
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const code = `OS${yy}${mm}${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
        const password = Math.random().toString(36).slice(-8);

        setFormData(prev => ({ ...prev, code, password }));
    }, [isAuthenticated, userRole, navigate]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'dept') {
            setProjectOptions(departmentProjects[value] || []);
            setFormData(prev => ({ ...prev, proj: '' }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log("Add Employee button clicked!", formData);

        if (!formData.name || !formData.code || !formData.doj || !formData.dept || !formData.proj || !formData.email) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await createEmployee(formData);
            console.log("API Response:", response);

            if (response.status === 201 || response.data.success) {
                alert("Employee added successfully!");
                setFormData({ name: '', code: '', doj: '', dept: '', proj: '', email: '', password: '' });
                navigate("/manage-employee");
            } else {
                alert("Failed to add employee: " + JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Add Employee Error:", error.response || error);
            alert("Error adding employee. Check console.");
        }
    };

    return (
        <div className="container">
            <Header />
            <main className="add-employee-main">
                <div className="add-employee-box">
                    <h2>ADD EMPLOYEE</h2>
                    <form className="add-employee-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Emp Name *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Emp ID/Code *</label>
                            <input type="text" name="code" value={formData.code} readOnly />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" name="password" value={formData.password} readOnly />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Date of Joining *</label>
                            <input type="date" name="doj" value={formData.doj} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Department *</label>
                            <select name="dept" value={formData.dept} onChange={handleChange} required>
                                <option value="">Select Department</option>
                                {Object.keys(departmentProjects).map(dep => (
                                    <option key={dep} value={dep}>{dep}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Project *</label>
                            <select name="proj" value={formData.proj} onChange={handleChange} required>
                                <option value="">Select Project</option>
                                {projectOptions.map(proj => (
                                    <option key={proj} value={proj}>{proj}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="add-emp-btn">ADD EMP</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AddEmployeePage;
