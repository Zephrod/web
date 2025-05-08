const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  schedule: {
    weeks: [{
      weekNumber: Number,
      days: [{
        day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
        startTime: String,
        endTime: String,
        room: String
      }]
    }]
  }
});

module.exports = mongoose.model('Course', courseSchema);