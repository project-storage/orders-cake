const departmentController = require('../controllers/departmentController')
const departmentRouter = require('express').Router()
const passport = require('passport')

// method get
departmentRouter.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  departmentController.getDepartmentWithAllParams
)
departmentRouter.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  departmentController.getAllDepartment
)
departmentRouter.get(
  '/info/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.getInfoDepartment
)

// method put
departmentRouter.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.updateDepartment
)

// method post
departmentRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  departmentController.createDepartment
)

// method delete
departmentRouter.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  departmentController.deleteDepartment
)

module.exports = departmentRouter
