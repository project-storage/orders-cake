const authController = require('../controllers/auth.controller')
const authRouter = require('express').Router()

authRouter.post(
    '/register',
    // authController.upload,
    authController.register
)

authRouter.post(
    '/login',
    authController.login
)

authRouter.post(
    '/register/super-admin',
    authController.upload,
    authController.createSuperAdmin
)

authRouter.post(
    '/register/admin',
    authController.upload,
    authController.createAdmin
)

module.exports = authRouter