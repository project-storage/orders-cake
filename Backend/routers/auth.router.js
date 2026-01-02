const authController = require('../controllers/auth.controller');
const authRouter = require('express').Router();

// Register a new user
authRouter.post('/register', authController.register);

// User login
authRouter.post('/login', authController.login);

// Create super admin (requires file upload middleware)
authRouter.post('/register/super-admin', authController.upload, authController.createSuperAdmin);

// Create admin (requires file upload middleware)
authRouter.post('/register/admin', authController.upload, authController.createAdmin);

module.exports = authRouter;