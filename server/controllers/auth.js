// controllers/authController.js
const { generateToken } = require('../utils/token');
const { setAuthCookie, clearAuthCookie } = require('../utils/cookie');
const { findUserByEmail, createUser } = require('../utils/mongooseHelpers'); // Import helpers

const User = require('../models/user');

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await findUserByEmail(email);
      
      if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

      const isMatch = await user.checkPassword(password);
      if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

      const token = generateToken({
        id: user._id,
        role: user.role,
      });

      setAuthCookie(res, token);
      res.status(200).json({ 
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          firstname: user.firstname,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
      next(err);
    }
  },

  register: async (req, res, next) => {
    try {
      const { firstname, lastname, email, password, role } = req.body;

      if (!['student', 'teacher'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      const existing = await findUserByEmail(email);
      if (existing) return res.status(409).json({ message: 'Email already in use' });

      // Changed from User.create() to helper
      const user = await createUser({ 
        firstname, 
        lastname, 
        email, 
        password, 
        role 
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role
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
  getCurrentUser: async (req, res) => {
    try {
      if (!req.user?.id) {
        console.error('No user ID in request');
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const user = await User.findById(req.user.id).select('-password');
      
      if (!user) {
        console.error('User not found for ID:', req.user.id);
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Me endpoint error:', {
        error: error.message,
        stack: error.stack,
        userId: req.user?.id
      });
      res.status(500).json({ message: 'Error fetching user data' });
    }
  },
};