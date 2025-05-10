// controllers/authController.js
const { generateToken } = require('../utils/token');
const { setAuthCookie, clearAuthCookie } = require('../utils/cookie');
const { findUserByEmail, createUser } = require('../utils/mongooseHelpers'); // Import helpers

const User = require('../models/user');
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and session management
 */
module.exports = {
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Authenticate user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: user@univ.test
   *               password:
   *                 type: string
   *                 format: password
   *                 example: securePassword123!
   *     responses:
   *       200:
   *         description: Successfully authenticated
   *         headers:
   *           Set-Cookie:
   *             schema:
   *               type: string
   *               example: token=abcde12345; Path=/; HttpOnly
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Invalid credentials
   */
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
  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Register new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       409:
   *         description: Email already registered
   */
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
  /**
   * @swagger
   * /logout:
   *   post:
   *     summary: Invalidate user session
   *     tags: [Authentication]
   *     responses:
   *       200:
   *         description: Successfully logged out
   *         headers:
   *           Set-Cookie:
   *             schema:
   *               type: string
   *               example: token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
   */
  logout: async (req, res) => {
    clearAuthCookie(res);
    res.status(200).json({ message: 'Déconnexion réussie' });
  },
  /**
   * @swagger
   * /me:
   *   get:
   *     summary: Get current user profile
   *     tags: [Authentication]
   *     security:
   *       - cookieAuth: []
   *     responses:
   *       200:
   *         description: Current user details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   */
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