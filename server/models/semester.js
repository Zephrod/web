// models/Semester.js
const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Fall 2025"
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('Semester', semesterSchema);
