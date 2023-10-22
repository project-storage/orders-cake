const userController = require('../controller/userController')
const userRouter = require('express').Router()
const passport = require('passport')

// method post
userRouter.post('/create-admin', userController.createAdminUser)
userRouter.post('/create-superAdmin', userController.createSuperAdminUser)
userRouter.post('/login', userController.loginUser)
userRouter.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  userController.registerUser
)

// method put
userRouter.put(
  '/update-users/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
)

// method get
userRouter.get(
  '/search-users',
  passport.authenticate('jwt', { session: false }),
  userController.getUserWithAllParams
)
userRouter.get(
  '/all-user',
  passport.authenticate('jwt', { session: false }),
  userController.getAllUser
)
userRouter.get(
  '/user-info',
  passport.authenticate('jwt', { session: false }),
  userController.getUserInfo
)

// method delete
userRouter.delete(
  '/delete-user/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
)

module.exports = userRouter
