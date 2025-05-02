// controllers/userController.js
const bcryptjs = require("bcryptjs");
const mongoose = require('mongoose');
const User = require('../models/user');

const { 
  getAllUsers,
  findUserById,
  updateUser,
  deleteUser
} = require('../utils/mongooseHelpers');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const user = await findUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
      const updateData = { ...req.body };
    
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No update data provided' });
      }
    
      try {
        // Handle password updates separately
        if (updateData.password) {
          const salt = await bcryptjs.genSalt(10);
          updateData.password = await bcryptjs.hash(updateData.password, salt);
        }
    
        const updatedUser = await User.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
  },

  delete: async (req, res, next) => {
    try {
      // ID validation remains the same
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Format ID invalide' });
      }

      // Now we can safely assume req.user exists
      console.log('Authenticated user:', req.user);
      
      const deletedUser = await deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }

      // Clear cookie if deleting own account
      if (req.user.id === req.params.id) {
        clearAuthCookie(res);
      }

      res.sendStatus(204);
    } catch (err) {
      console.error('Delete error:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};