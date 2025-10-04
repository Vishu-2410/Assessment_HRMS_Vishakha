
import jwt from 'jsonwebtoken';

export const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Role-based restriction
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      }

      req.user = decoded; // { id, role }
      next();
    } catch (err) {
      console.error('Auth Middleware Error:', err);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

