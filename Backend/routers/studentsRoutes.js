const StudnetController = require('../controllers/StudentController')
const StudentRouter = require('express').Router()
const passport = require('passport')

// method post
StudentRouter.post('/register-student', StudnetController.createStudent)
StudentRouter.post('/login-student', StudnetController.loginStudnet)

// method get
StudentRouter.get('/info-student', passport.authenticate('jwt', { session: false }), StudnetController.getInfoStudent)

module.exports = StudentRouter