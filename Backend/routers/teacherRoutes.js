const TeacherController = require('../controller/TeacherController')
const TeacherRouter = require('express').Router()
const passport = require('passport')

// method get
TeacherRouter.get(
  '/all-teachcer',
  passport.authenticate('jwt', { session: false }),
  TeacherController.getAllTeacher
)
TeacherRouter.get(
  '/searhc-teachcer',
  passport.authenticate('jwt', { session: false }),
  TeacherController.getAllTeacherWithAllParams
)
TeacherRouter.get(
  '/teacher-info',
  passport.authenticate('jwt', { session: false }),
  TeacherController.getInfoTeacher
)

// method put
TeacherRouter.put(
  '/update-teacher/:id',
  passport.authenticate('jwt', { session: false }),
  TeacherController.updateTeacher
)

// method post
TeacherRouter.post('/create-teacher', TeacherController.createTeacher)
TeacherRouter.post('/login-teacher', TeacherController.loginTeacher)

// method delete
TeacherRouter.delete(
  '/delete-teacher/:id',
  passport.authenticate('jwt', { session: false }),
  TeacherController.deleteTeacher
)

module.exports = TeacherRouter
