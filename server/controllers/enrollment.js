// controllers/enrollmentController.js
const Enrollment = require('../models/Enrollment');

module.exports = {
  create: async (req, res, next) => {
    try {
      const enrollment = await Enrollment.create(req.body);
      res.status(201).json(enrollment);
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const enrollments = await Enrollment.find()
        .populate('student', 'name email')  // Optional: show student info
        .populate('course', 'title');       // Optional: show course info
      res.json(enrollments);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const enrollment = await Enrollment.findById(req.params.id)
        .populate('student', 'name email')
        .populate('course', 'title');
      if (!enrollment) return res.sendStatus(404);
      res.json(enrollment);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const enrollment = await Enrollment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!enrollment) return res.sendStatus(404);
      res.json(enrollment);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const result = await Enrollment.findByIdAndDelete(req.params.id);
      if (!result) return res.sendStatus(404);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
};
