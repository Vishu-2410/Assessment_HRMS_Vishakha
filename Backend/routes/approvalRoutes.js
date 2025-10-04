import express from 'express';
import { getApprovals,toggleApproval } from '../controllers/approvalController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Use PUT method to update approval status
router.put('/:id', auth, toggleApproval);
// Get all approvals
router.get('/', auth, getApprovals);

export default router;
