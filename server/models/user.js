const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
}, { discriminatorKey: 'role', timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') && !this.isNew) return next();

  try {
    if (!this.password) throw new Error('Password required');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(new Error('Password update failed: ' + error.message));
  }
});

// Method to compare password
userSchema.methods.checkPassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
