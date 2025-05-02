// controllers/authController.js
const { generateToken } = require('../utils/token');
const { setAuthCookie, clearAuthCookie } = require('../utils/cookie');
const { findUserByEmail, createUser } = require('../utils/mongooseHelpers'); // Import helpers

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Changed from User.findOne() to helper
      const user = await findUserByEmail(email);
      
      if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

      const isMatch = await user.checkPassword(password);
      if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

      const token = generateToken({
        id: user._id, // Changed from user.id to user._id (Mongoose uses _id)
        name: user.name,
        role: user.role,
      });

      setAuthCookie(res, token);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  },

  register: async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;

      if (!['student', 'teacher', 'staff'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      // Changed from User.findOne() to helper
      const existing = await findUserByEmail(email);
      if (existing) return res.status(409).json({ message: 'Email already in use' });

      // Changed from User.create() to helper
      const user = await createUser({ name, email, password, role });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id, // Changed from user.id to user._id
          email: user.email,
          role: user.role,
        }
      });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res) => {
    clearAuthCookie(res);
    res.status(200).json({ message: 'Déconnexion réussie' });
  },
};