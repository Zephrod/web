const { generateToken } = require('../utils/token');
const User = require('../models/user');
const { setAuthCookie, clearAuthCookie } = require('../utils/cookie');

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({email});
      if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

      const isMatch = await user.checkPassword(password);
      if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

      const token = generateToken({
        id: user.id,
        name: user.name,
        role: user.role,
      });

      setAuthCookie(res,token);

      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Optional: Validate role manually if needed
      if (!['student', 'teacher', 'staff'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
  
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: 'Email already in use' });
      }
  
      const user = await User.create({ name, email, password, role });
  
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        }
      });
    } catch (err) {
      next(err); // Let the global error middleware handle it
    }
  },
  

  logout: async (req, res) => {
    clearAuthCookie(res);
    res.status(200).json({ message: 'Déconnexion réussie' });
  },
};
