const departmentController = require('../controllers/departmentController')
const departmentRouter = require('express').Router()
const passport = require('passport')

// method get
departmentRouter.get(
  '/departments/search',
  passport.authenticate('jwt', { session: false }),
  departmentController.getDepartmentWithAllParams
)
departmentRouter.get(
  '/departments/all',
  passport.authenticate('jwt', { session: false }),
  departmentController.getAllDepartment
)
departmentRouter.get(
  '/departments/info/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.getInfoDepartment
)

// method put
departmentRouter.put(
  '/departments/update/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.updateDepartment
)

// method post
departmentRouter.post(
  '/department/create',
  passport.authenticate('jwt', { session: false }),
  departmentController.createDepartment
)

// method delete
departmentRouter.delete(
  '/departments/delete/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.deleteDepartment
)

module.exports = departmentRouter
