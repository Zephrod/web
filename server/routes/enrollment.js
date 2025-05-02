const { Router } = require('express');
const router = new Router();

const enrollmentController = require('../controllers/enrollmentController');
const auth = require('../middlewares/auth'); // protect routes

router.post('/enrollments', auth, enrollmentController.create);
router.get('/enrollments', auth, enrollmentController.getAll);
router.get('/enrollments/:id', auth, enrollmentController.getOne);
router.patch('/enrollments/:id', auth, enrollmentController.update);
router.delete('/enrollments/:id', auth, enrollmentController.delete);

module.exports = router;