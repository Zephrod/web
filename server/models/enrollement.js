// models/Enrollment.js
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  academicYear: {
    type: String, // Example: "2023-2024"
    required: true
  },
  semester: {
    type: String,
    enum: ['Fall', 'Spring', 'Summer'],
    required: true
  },
  grade: {
    type: String // optional, can be filled later
  },
  status: {
    type: String,
    enum: ['enrolled', 'passed', 'failed', 'retaken', 'dropped'],
    default: 'enrolled'
  }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
