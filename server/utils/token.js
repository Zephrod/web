// ! generate token !!
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || secret;
const jwtExpiration = process.env.JWT_EXPIRATION || '1h';

module.exports = {
  // Generate JWT token
  generateToken: (payload) => {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpiration
    });
  },

  // Verify JWT token
  verifyToken: (token) => {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (err) {
      throw new Error('Invalid/Expired token');
    }
  },
};