const express = require('express');
const { professorOnly } = require('../middlewares/authorization');
const {
  submitGrade,
  updateGrade,
  getStudentGrades,
  getCourseGrades,
  calculateGPA
} = require('../controllers/grade');

const router = express.Router();

router.post('/', professorOnly, submitGrade);
router.patch('/:id', professorOnly, updateGrade);
router.get('/student/:id', getStudentGrades);
router.get('/course/:id', getCourseGrades);
router.get('/gpa/:studentId', calculateGPA);

module.exports = router;