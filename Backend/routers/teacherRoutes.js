const TeacherController = require('../controller/TeacherController')
const TeacherRouter = require('express').Router()
const passport = require('passport')

// register
TeacherRouter.post('/register-teacher', TeacherController.createTeahcer)

module.exports = TeacherRouter
