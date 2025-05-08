const { verifyToken } = require('../utils/token');

module.exports = (req, res, next) => {
    // Prioritize cookie-based authentication
    const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1]?.trim();
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };
        next();
    } catch (err) {
        const message = err.name === 'TokenExpiredError' 
            ? 'Session expired' 
            : 'Invalid authentication';
        
        res.status(401)
           .clearCookie('jwt')
           .json({ message });
    }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

exports.professorOnly = (req, res, next) => {
  if (req.user.role !== 'professor') {
    return res.status(403).json({ message: 'Professor access required' });
  }
  next();
};