const TeacherController = require('../controller/TeacherController')
const TeacherRouter = require('express').Router()
const passport = require('passport')

// method post
TeacherRouter.post('/register-teacher', TeacherController.createTeahcer)
TeacherRouter.post('/login-teacher', TeacherController.loginTeacher)

// method get
TeacherRouter.get('/info-teacher', passport.authenticate('jwt', { session: false }), TeacherController.getinfoTeacher)
TeacherRouter.get('/all-teacher', passport.authenticate('jwt', { session: false }), TeacherController.getAllTeacher)
TeacherRouter.get('/search-teacher', passport.authenticate('jwt', { session: false }), TeacherController.getTeacherWithAllParams)
module.exports = TeacherRouter
