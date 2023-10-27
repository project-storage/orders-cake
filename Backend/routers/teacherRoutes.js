const TeacherController = require('../controller/TeacherController')
const TeacherRouter = require('express').Router()
const passport = require('passport')

// method post
TeacherRouter.post('/create-teacher', TeacherController.createTeacher)
TeacherRouter.post('/login-teacher', TeacherController.loginTeacher)

// method get
TeacherRouter.get(
  '/all-teahcer',
  passport.authenticate('jwt', { session: false }),
  TeacherController.getAllTeacher
)
TeacherRouter.get(
  '/searhc-teahcer',
  passport.authenticate('jwt', { session: false }),
  TeacherController.getAllTeacherWithAllParams
)
TeacherRouter.get(
  '/info-teahcer',
  passport.authenticate('jwt', { session: false }),
  TeacherController.getInfoTeacher
)

// method put
TeacherRouter.put(
  '/update-teacher/:id',
  passport.authenticate('jwt', { session: false }),
  TeacherController.updateTeacher
)

// method delete
TeacherRouter.delete(
  '/delete-teacher/:id',
  passport.authenticate('jwt', { session: false }),
  TeacherController.deleteTeacher
)

module.exports = TeacherRouter
