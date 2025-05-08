const { Router } = require("express");
const router = new Router();
const { 
  createCourse,
  updateSchedule,
  getCourses,
  assignProfessor
} = require('../controllers/course');
const { checkScheduleConflicts } = require('../middlewares/ScheduleCheck');
const { professorOnly } = require('../middlewares/authorisation');

router.post('/courses', professorOnly, checkScheduleConflicts, createCourse);
router.get('/courses', getCourses);
router.patch('/:id/professor', professorOnly, assignProfessor);
router.patch('/:id/schedule', professorOnly, checkScheduleConflicts, updateSchedule);

module.exports = router;