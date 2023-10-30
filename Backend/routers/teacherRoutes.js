const TeacherController = require('../controller/TeacherController')
const TeacherRouter = require('express').Router()
const passport = require('passport')

// register
TeacherRouter.post('/register-teacher', TeacherController.createTeahcer)

// login
TeacherRouter.post('/login-teacher',TeacherController.loginTeacher)

module.exports = TeacherRouter
