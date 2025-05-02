const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { required } = require('joi');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['student', 'teacher', 'staff'],
      required: true 
    }
  }, { discriminatorKey: 'role' });

  // Hash password only on creation or explicit password change
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

module.exports = mongoose.model('User', userSchema);