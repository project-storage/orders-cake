const LFEDController = require('../controllers/yearLevelController')
const LFEDRouter = require('express').Router()
const passport = require('passport')

//method get
LFEDRouter.get(
  '/all-yearlevel',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.getAllYearlevel
)
LFEDRouter.get(
  '/info-yearlevel/:id',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.getInfoYearlevel
)
LFEDRouter.get(
  '/search-yearlevel',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.getAllYearlevelWithAllParans
)

// method put
LFEDRouter.put(
  '/update-yearlevel/:id',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.updateYearlevel
)

// method post
LFEDRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.createYearlevel
)

// method delete
LFEDRouter.delete(
  '/delete-yearlevel/:id',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.deleteYearlevel
)

module.exports = LFEDRouter
