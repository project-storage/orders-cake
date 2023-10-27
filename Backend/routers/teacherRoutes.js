const TeacherController = require('../controller/TeacherController')
const TeacherRouter = require('express').Router()
const passport = require('passport')

// method post
TeacherRouter.post('/create-teacher', TeacherController.createTeacher)
TeacherRouter.post('/login-teacher', TeacherController.loginTeacher)

module.exports = TeacherRouter;