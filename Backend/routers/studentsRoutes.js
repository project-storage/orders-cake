const StudnetController = require('../controller/StudentController')
const StudentRouter = require('express').Router()
const passport = require('passport')

// method post
StudentRouter.post('/register-student',StudnetController.createStudent)

module.exports = StudentRouter