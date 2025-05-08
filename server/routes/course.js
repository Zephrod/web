const express = require('express');
const { adminOnly, professorOnly } = require('../middlewares/authorization');
const {
  createCourse,
  updateCourse,
  getCourses,
  assignProfessor
} = require('../controllers/course');

const router = express.Router();

router.post('/', adminOnly, createCourse);
router.get('/', getCourses);
router.patch('/:id/professor', adminOnly, assignProfessor);
router.patch('/:id/schedule', adminOnly, updateSchedule);

export default router;