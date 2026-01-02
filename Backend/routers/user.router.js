const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const userRouter = require('express').Router();
const passport = require('passport');

// Search users (requires authentication)
userRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    userController.searchUser
);

// Get all users (requires authentication)
userRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    userController.getUserAll
);

// Get current user info (requires authentication)
userRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    userController.getUserInfo
);

// Update user by ID (requires authentication and file upload middleware)
userRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    authController.upload,
    userController.updateUser
);

// Delete user by ID (requires authentication)
userRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    userController.deleteUser
);

module.exports = userRouter;
