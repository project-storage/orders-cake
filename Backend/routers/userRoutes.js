const userController = require('../controllers/userController')
const userRouter = require('express').Router()
const passport = require('passport')

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

// method put
userRouter.put(
  '/update-users/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
)

// method post
userRouter.post('/create-admin', userController.createAdminUser)
userRouter.post('/create-superAdmin', userController.createSuperAdminUser)
userRouter.post('/login', userController.loginUser)
userRouter.post(
  '/register', userController.registerUser
)

// method delete
userRouter.delete(
  '/delete-user/:id',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
)

module.exports = userRouter
