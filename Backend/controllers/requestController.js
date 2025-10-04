import Request from '../models/Request.js';
import Employee from '../models/Employee.js';

export const createRequest = async (req, res, next) => {
  try {
    const { employeeId, type, message } = req.body;
    const reqDoc = await Request.create({ employee: employeeId, type, message });
    res.json(reqDoc);
  } catch (err) { next(err); }
};

export const listRequests = async (req, res, next) => {
  try {
    const status = req.query.status;
    const filter = {};
    if (status) filter.status = status;
    const docs = await Request.find(filter).populate('employee');
    res.json(docs);
  } catch (err) { next(err); }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status, hrComment } = req.body;
    const doc = await Request.findByIdAndUpdate(id, { status, hrComment }, { new:true }).populate('employee');
    res.json(doc);
  } catch (err) { next(err); }
};
