// models/Teacher.js
const mongoose = require('mongoose');
const User = require('./user');

const teacherSchema = new mongoose.Schema({
  department: { type: String, required: true },
  office: String
});

const Teacher = User.discriminator('teacher', teacherSchema);
module.exports = Teacher;
