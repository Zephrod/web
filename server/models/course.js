const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    credits: Number,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    schedule: [{
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
      startTime: String,
      endTime: String
    }]
  });
  