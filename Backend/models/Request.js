import mongoose from 'mongoose';
const requestSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref:'Employee', required: true },
  type: { type: String, enum:['leave','project-change','other'], required: true },
  message: { type: String },
  status: { type: String, enum:['pending','approved','rejected'], default:'pending' },
  hrComment: { type: String }
}, { timestamps: true });
export default mongoose.model('Request', requestSchema);
