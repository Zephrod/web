const { Router } = require('express');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
const router = new Router();

router.post('/login', authController.login);
router.post('/register',authController.register);
router.post('/logout',authController.logout);

router.get('/me', authMiddleware, authController.getCurrentUser);
module.exports = router;