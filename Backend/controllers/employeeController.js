import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Generate Employee Code (OSYYMMNNN)import bcrypt from 'bcryptjs';
const genEmpCode = async () => {
  const now = new Date();
  const YY = String(now.getFullYear()).slice(-2);
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const count = await Employee.countDocuments();
  const seq = String(count + 1).padStart(3, '0');
  return `OS${YY}${MM}${seq}`;
};

export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, dept, proj, doj } = req.body;

    if (!name || !email || !dept || !proj || !doj) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if email already exists
    const existingEmp = await Employee.findOne({ email });
    if (existingEmp) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Generate code and password
    const code = await genEmpCode();
    const rawPassword = Math.random().toString(36).slice(-8);
    const password = await bcrypt.hash(rawPassword, 10);

    // Ensure DOJ is a Date object
    const dojDate = new Date(doj);
    if (isNaN(dojDate)) {
      return res.status(400).json({ success: false, message: 'Invalid Date of Joining' });
    }

    // Create employee
    const emp = new Employee({ code, name, email, dept, proj, doj: dojDate, password });
    await emp.save(); // <-- ensure we call save()

    res.status(201).json({ success: true, employee: emp, rawPassword });
  } catch (err) {
    console.error("Create Employee Error:", err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// List All Employees
export const listEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json({ success: true, employees });
  } catch (err) {
    next(err);
  }
};

// Get Single Employee
export const getEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });

    const emp = await Employee.findById(id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });

    res.json({ success: true, employee: emp });
  } catch (err) {
    next(err);
  }
};

// Update Employee
export const updateEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    // Prevent code/password update directly
    delete body.code; 
    delete body.password;

    const emp = await Employee.findByIdAndUpdate(id, body, { new: true });
    res.json({ success: true, employee: emp });
  } catch (err) {
    next(err);
  }
};

// Delete Employee
export const deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Employee.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
