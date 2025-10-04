import Request from '../models/Request.js';

export const getApprovals = async (req, res, next) => {
  try {
    const approvals = await Request.find()
      .populate('employee', 'name code dept proj email')
      .sort({ createdAt: -1 });
    res.json(approvals);
  } catch (err) {
    console.error("Error in getApprovals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleApproval = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Approved', 'Disapproved'].includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const updated = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('employee', 'name code dept proj email');

    if (!updated) return res.status(404).json({ message: 'Request not found' });

    res.json(updated);
  } catch (err) {
    console.error("Error in toggleApproval:", err);
    res.status(500).json({ message: "Server error" });
  }
};
