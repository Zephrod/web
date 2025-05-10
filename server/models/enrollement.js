// models/Enrollment.js
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  semester: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester',
    required: true 
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F', null],
    default: null
  },
  status: {
    type: String,
    enum: ['enrolled', 'completed', 'failed', 'dropped'],
    default: 'enrolled'
  }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
