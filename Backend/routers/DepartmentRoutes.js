const departmentController = require('../controller/DepartmentController')
const departmentRouter = require('express').Router()
const passport = require('passport')

// method post
departmentRouter.post(
  '/create-department',
  passport.authenticate('jwt', { session: false }),
  departmentController.createDepartment
)

// method get
departmentRouter.get(
  '/search-department/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.getDepartmentWithAllParams
)

module.exports = departmentRouter
