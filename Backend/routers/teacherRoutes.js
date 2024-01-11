const TeacherController = require('../controllers/TeacherController')
const TeacherRouter = require('express').Router()
const passport = require('passport')

// method post
TeacherRouter.post('/register-teacher', TeacherController.createTeahcer)

// method get
TeacherRouter.get('/info-teacher', passport.authenticate('jwt', { session: false }), TeacherController.getinfoTeacher)
TeacherRouter.get('/all-teacher', passport.authenticate('jwt', { session: false }), TeacherController.getAllTeacher)
TeacherRouter.get('/search-teacher', passport.authenticate('jwt', { session: false }), TeacherController.getTeacherWithAllParams)

// method put 
TeacherRouter.put('/update-teacher/:id', passport.authenticate('jwt', { session: false }), TeacherController.updateTeacher)

// method delete
TeacherRouter.delete('/delete-teacher/:id', passport.authenticate('jwt', { session: false }), TeacherController.deleteTeacher)

module.exports = TeacherRouter
