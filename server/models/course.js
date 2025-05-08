const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, unique: true },
  credits: Number,
  professor: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async function(v) {
        const user = await mongoose.model('User').findById(v);
        return user?.role === 'professor';
      }
    }
  },
  schedule: {
    weeks: [{
      weekNumber: Number,
      days: [{
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        startTime: {
          type: String,
          match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        },
        endTime: {
          type: String,
          match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        }
      }]
    }]
  }
}, { timestamps: true });