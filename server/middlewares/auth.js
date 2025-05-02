const { verifyToken } = require('../utils/jwtTokens');

module.exports = (req, res, next) => {
    const token = req.cookies?.auth_token || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access token missing' });

  try {
    const decoded = verifyToken(token); // only JWT verification
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
