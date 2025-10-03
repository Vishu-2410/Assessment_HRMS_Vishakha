import React, { useState, useEffect } from 'react'; // ✅ useEffect added for auto code/password generation
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/AddEmployeePage.css';

const AddEmployeePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',        // ✅ Auto-generated Employee Code
        doj: '',
        dept: '',
        proj: '',
        email: '',       // ✅ Mandatory Email field
        password: '',    // ✅ Auto-generated password
    });

    const [projectOptions, setProjectOptions] = useState([]); // ✅ Dependent Project dropdown
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('role');

    // ✅ Departments & Projects as per assignment
    const departmentProjects = {
        'HRMS': ['Induction', 'OnBoarding'],
        'Recruitment': ['IT-Recruitment', 'Non-IT-Recruitment'],
        'Development': ['Web', 'Mobile', 'Software'],
        'Account': [], // ✅ Added Account department
        'Digital Marketing': ['Content Awareness/Creation', 'Campaigns'],
        'Sales and Marketing': ['Sales', 'Marketing', 'Business Development']
    };

    useEffect(() => {
        // ✅ Authentication check for HR
        if (!isAuthenticated || userRole !== 'HR') {
            alert("Please login as HR to access this page.");
            navigate('/login');
            return;
        }

        // ✅ Auto-generate Employee Code & Password
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        const nextNumber = employees.length > 0
            ? Math.max(...employees.map(emp => emp.sr || 0)) + 1
            : 1;

        const now = new Date();
        const yy = String(now.getFullYear()).slice(-2);
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const code = `OS${yy}${mm}${String(nextNumber).padStart(3, '0')}`; // ✅ OSYYMMXXX

        const password = Math.random().toString(36).slice(-8); // ✅ Random password

        setFormData(prev => ({ ...prev, code, password }));
    }, [isAuthenticated, userRole, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // ✅ Update project dropdown based on department selection
        if (name === 'dept') {
            setProjectOptions(departmentProjects[value] || []);
            setFormData(prev => ({ ...prev, proj: '' })); // Reset project selection
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Validate mandatory fields
        if (!formData.name || !formData.code || !formData.doj || !formData.dept || !formData.proj || !formData.email) {
            alert('Please fill in all fields');
            return;
        }

        // ✅ Save to localStorage for assessment purposes
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        const nextSr = employees.length > 0 ? Math.max(...employees.map(emp => emp.sr || 0)) + 1 : 1;

        const newEmployee = {
            sr: nextSr,
            ...formData, // ✅ Include email & password
            addedDate: new Date().toISOString(),
            addedBy: 'HR'
        };

        employees.push(newEmployee);
        localStorage.setItem('employees', JSON.stringify(employees));

        alert('Employee added successfully!');
        setFormData({ name: '', code: '', doj: '', dept: '', proj: '', email: '', password: '' });
        navigate('/manage-employee'); // ✅ Navigate to Manage Employee page
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
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter employee name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Emp ID/Code *</label>
                            <input type="text" name="code" value={formData.code} readOnly /> {/* ✅ readonly */}
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Set Password</label>
                            <input type="text" name="password" value={formData.password} readOnly /> {/* ✅ readonly */}
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

                        <button type="submit" className="add-emp-btn">ADD EMP</button> {/* ✅ No backend call for assessment */}
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AddEmployeePage;
