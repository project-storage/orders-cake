const userController = require('../controllers/userController');
const userRouter = require('express').Router();
const passport = require('passport');

// Method: GET
userRouter.get(
  '/users/search',
  passport.authenticate('jwt', { session: false }),
  userController.getUserWithAllParams
);

userRouter.get(
  '/users/all',
  passport.authenticate('jwt', { session: false }),
  userController.getAllUser
);

userRouter.get(
  '/users/info',
  passport.authenticate('jwt', { session: false }),
  userController.getUserInfo
);

// Method: PUT
userRouter.put(
  '/users/update/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
);

// Method: POST
userRouter.post('/admin/create-admin', userController.createAdminUser);
userRouter.post('/admin/create-super-admin', userController.createSuperAdminUser);
userRouter.post('/users/login', userController.loginUser);
userRouter.post('/users/register', userController.registerUser);

// Method: DELETE
userRouter.delete(
  '/users/delete/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);

module.exports = userRouter;
