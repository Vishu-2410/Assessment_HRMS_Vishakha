import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // frontend uses 'code'
  name: { type: String, required: true }, // combined first + last as 'name'
  email: { type: String, required: true, unique: true },
  dept: { type: String, required: true }, // frontend uses 'dept'
  proj: { type: String, required: true }, // frontend uses 'proj'
  doj: { type: Date, required: true },
  password: { type: String, required: true }, // hashed
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
