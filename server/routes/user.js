const { Router } = require("express");
const userController = require("../controllers/user.js");
const auth = require("../middlewares/auth.js");

const router = new Router();

// Public routes
router.get("/users", userController.getAll);
router.get("/user/:id", userController.getOne);

// Protected routes
router.patch("/user/:id", auth, userController.update);
router.delete("/user/:id", auth, userController.delete);

module.exports = router;