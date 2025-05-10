// controllers/userController.js
const mongoose = require('mongoose');

const { 
  getAllUsers,
  findUserById,
  updateUser,
  deleteUser
} = require('../utils/mongooseHelpers');
const { clearAuthCookie } = require('../utils/cookie');
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
        const updatedUser = await updateUser(id, updateData);
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
},

  delete: async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedUser = await deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.user.id === req.params.id) {
            clearAuthCookie(res);
        }

        res.sendStatus(204);
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
};