const User = require('../models/user');
// reduce controller complexity
module.exports = {
  findByEmail: (email) => {
    return User.findOne({ email });
  },

  updateName: (userId, newName) => {
    return User.findByIdAndUpdate(userId, { name: newName }, { new: true });
  },

  deleteUser: (userId) => {
    return User.deleteOne({ _id: userId });
  }
};