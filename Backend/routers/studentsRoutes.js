const StudnetController = require('../controller/StudentController')
const StudentRouter = require('express').Router()
const passport = require('passport')

// method post
StudentRouter.post('/register-student', StudnetController.createStudent)
StudentRouter.post('/login-student', StudnetController.loginStudnet)
module.exports = StudentRouter