const mongoose = require('mongoose');

const { 
  getAllUsers,
  findUserById,
  updateUser,
  deleteUser
} = require('../utils/mongooseHelpers');
const { clearAuthCookie } = require('../utils/cookie');
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
module.exports = {
  /**
   * @swagger
   * /users:
   *   get:
   *     tags: [Users]
   *     summary: Get all users
   *     responses:
   *       200:
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *       500:
   *         description: Server error
   */
  getAll: async (req, res, next) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags: [Users]
   *     summary: Get a single user by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: objectId
   *     responses:
   *       200:
   *         description: User details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   *       400:
   *         description: Invalid ID format
   */
  getOne: async (req, res, next) => {
    try {
      const user = await findUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     tags: [Users]
   *     summary: Update user details
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: objectId
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: Updated user details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Invalid input
   *       404:
   *         description: User not found
   */
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
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     tags: [Users]
   *     summary: Delete a user
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: objectId
   *     responses:
   *       204:
   *         description: User deleted successfully
   *       400:
   *         description: Invalid ID format
   *       404:
   *         description: User not found
   */
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