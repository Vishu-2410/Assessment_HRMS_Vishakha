import express from 'express';
import { createEmployee, listEmployees, getEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (HR only)
router.post('/', auth, createEmployee);
router.get('/', auth, listEmployees);
router.get('/:id', auth, getEmployee);
router.put('/:id', auth, updateEmployee);
router.delete('/:id', auth, deleteEmployee);

export default router;
