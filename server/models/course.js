const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true,
    unique: true,
    match: /^[A-Z]{3,4}\d{3}$/ // Format like COMP101
  },
  title: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  schedule: {
    days: [String], // ['Monday', 'Wednesday']
    time: String,   // '14:00-16:00'
    room: String
  },
  capacity: {
    type: Number,
    default: 30,
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);