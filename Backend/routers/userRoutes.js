const userController = require('../controllers/userController');
const userRouter = require('express').Router();
const passport = require('passport');

// Method: GET
userRouter.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  userController.getUserWithAllParams
);

userRouter.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  userController.getAllUser
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
  userController.updateUser
);

// // Method: PUT
// userRouter.put(
//   '/update/profile',
//   passport.authenticate('jwt', { session: false }),
//   userController.updateProfile
// );

// Method: POST
userRouter.post('/admin/create-admin', userController.createAdminUser);
userRouter.post('/admin/create-super-admin', userController.createSuperAdminUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/register', userController.registerUser);

// Method: DELETE
userRouter.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);

module.exports = userRouter;
