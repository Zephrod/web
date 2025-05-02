// controllers/enrollmentController.js
const { 
    findById,
    findAll,
    createDoc,
    updateDoc,
    deleteDoc
  } = require('../utils/mongooseHelpers');
  const Enrollment = require('../models/Enrollment');
  
  module.exports = {
    create: async (req, res, next) => {
      try {
        const enrollment = await createDoc(Enrollment, req.body);
        res.status(201).json(enrollment);
      } catch (err) {
        next(err);
      }
    },
  
    getAll: async (req, res, next) => {
      try {
        const enrollments = await findAll(Enrollment)
          .populate('student', 'name email')
          .populate('course', 'title');
        res.json(enrollments);
      } catch (err) {
        next(err);
      }
    },
  
    getOne: async (req, res, next) => {
      try {
        const enrollment = await findById(Enrollment, req.params.id)
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
        const enrollment = await updateDoc(Enrollment, req.params.id, req.body);
        if (!enrollment) return res.sendStatus(404);
        res.json(enrollment);
      } catch (err) {
        next(err);
      }
    },
  
    delete: async (req, res, next) => {
      try {
        const result = await deleteDoc(Enrollment, req.params.id);
        if (!result) return res.sendStatus(404);
        res.sendStatus(204);
      } catch (err) {
        next(err);
      }
    }
  };