const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller')
const userRouter = require('express').Router();
const passport = require('passport');

// Method: GET
userRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    userController.searchUser
);

userRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    userController.getUserAll
);

userRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    userController.getUserInfo
);

// Method: PUT
userRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    authController.upload,
    userController.updateUser
);

// Method: DELETE
userRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    userController.deleteUser
);

module.exports = userRouter;
