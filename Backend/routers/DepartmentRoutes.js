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
  '/search-department',
  passport.authenticate('jwt', { session: false }),
  departmentController.getDepartmentWithAllParams
)

departmentRouter.get(
  '/all-department',
  passport.authenticate('jwt', { session: false }),
  departmentController.getAllDepartment
)

departmentRouter.get(
  '/info-department/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.getInfoDepartment
)

// method pus
departmentRouter.put(
  '/update-department/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.updateDepartment
)

// method delete
departmentRouter.delete(
  '/delete-department/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.deleteDepartment
)
module.exports = departmentRouter
