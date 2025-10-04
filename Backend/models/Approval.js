import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  employee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    required: true 
  }, // Link to Employee
  text: { 
    type: String, 
    required: [true, "Request text is required"], 
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Disapproved'], 
    default: 'Pending' 
  },
}, { 
  timestamps: true 
});

// Optional: Add a virtual to easily get employee info
requestSchema.virtual('employeeDetails', {
  ref: 'Employee',
  localField: 'employee',
  foreignField: '_id',
  justOne: true
});

export default mongoose.model('Request', requestSchema);
