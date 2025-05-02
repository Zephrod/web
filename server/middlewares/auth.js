const { verifyToken } = require('../utils/token');

module.exports = (req, res, next) => {
    // Get token from cookies or Authorization header
    const token = req.cookies?.authToken || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Missing authentication token' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Attach user data to request
        next();
    } catch (err) {
        // Handle different error types if needed
        res.status(401).json({ message: 'Invalid token' });
    }
};