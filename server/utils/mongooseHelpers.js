// utils/mongooseHelpers.js
const User = require('../models/user');

module.exports = {
  // User operations
  findUserByEmail: (email) => User.findOne({ email }),
  findUserById: (id) => User.findById(id),
  getAllUsers: () => User.find({}),
  createUser: (userData) => User.create(userData),
  updateUser: async (id, updateData) => {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    
    if (!updateData) throw new Error('No update data provided');

    // Handle password update only if provided and valid
    if (updateData.password && typeof updateData.password === 'string') {
      user.password = updateData.password;
    }
    
    // Validate allowed fields
    const allowedUpdates = ['name', 'email', 'role'];
    const invalidFields = Object.keys(updateData)
      .filter(key => key !== 'password')
      .filter(key => !allowedUpdates.includes(key));

    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Update other fields excluding password
    Object.keys(updateData)
      .filter(key => key !== 'password')
      .forEach(key => {
        user[key] = updateData[key];
      });

    await user.save();
    return user;
  },
  deleteUser: (id) => User.findByIdAndDelete(id),

  // Generic operations (can be used for other models)
  findById: (model, id) => model.findById(id),
  findAll: (model) => model.find({}),
  createDoc: (model, data) => model.create(data),
  updateDoc: (model, id, data) => 
    model.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  deleteDoc: (model, id) => model.findByIdAndDelete(id)
};