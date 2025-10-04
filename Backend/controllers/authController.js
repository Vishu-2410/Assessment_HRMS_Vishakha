
import User from '../models/User.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Login Controller
 * - HR login → checks User collection (by email)
 * - Employee login → checks Employee collection (by email or employee code)
 */
export const login = async (req, res) => {
  const { email, password, loginId, loginAs } = req.body;

  try {
    // 1) HR login (User collection)
    if (loginAs === 'HR' || email) {
      const user = await User.findOne({ email });
      if (user) {
        const match = await user.matchPassword(password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );
        return res.json({ token, role: user.role });
      }
      // if explicitly HR but not found → reject
      if (loginAs === 'HR') {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    // 2) Employee login (Employee collection)
    const identifier = loginId || email;
    if (!identifier) {
      return res.status(400).json({ message: 'Please provide loginId/email and password' });
    }

    const employee = await Employee.findOne({
      $or: [{ code: identifier }, { email: identifier }]
    });

    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: employee._id, role: 'Employee' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ token, role: 'Employee' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

