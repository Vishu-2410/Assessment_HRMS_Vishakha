import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import approvalRoutes from './routes/approvalRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

import { seedHR } from './seed.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/approvals', approvalRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('MongoDB connected');
  await seedHR();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
