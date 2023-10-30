const TeacherController = require('../controller/TeacherController')
const TeacherRouter = require('express').Router()
const passport = require('passport')

// register
TeacherRouter.post('/register-teacher', TeacherController.createTeahcer)

// login
TeacherRouter.post('/login-teacher', TeacherController.loginTeacher)

// info teahcer
TeacherRouter.get('/info-teacher', passport.authenticate('jwt', { session: false }), TeacherController.getinfoTeacher)
module.exports = TeacherRouter
