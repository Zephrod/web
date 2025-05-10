// models/Student.js
const mongoose = require('mongoose');
const User = require('./user');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, required: true },
  enrollmentDate: { type: Date, default: Date.now },
  graduationDate: Date,
  department: { 
    type: String, 
    required: true,
    enum: ['Computer Science', 'Engineering', 'Business'] // Add specific programs
  },
  academicYear: { 
    type: Number, 
    required: true,
  },
  coursesEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

module.exports = User.discriminator('Student', studentSchema);