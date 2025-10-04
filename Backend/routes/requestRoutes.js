import express from 'express';
import { createRequest, listRequests, updateRequestStatus } from '../controllers/requestController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();
router.post('/', auth, createRequest);
router.get('/', auth, listRequests);
router.put('/:id', auth, updateRequestStatus);
export default router;
