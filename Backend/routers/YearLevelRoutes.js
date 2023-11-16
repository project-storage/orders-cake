const YearlevelController = require('../controllers/yearLevelController')
const YearlevelRouter = require('express').Router()
const passport = require('passport')

//method get
YearlevelRouter.get(
  '/all-yearlevel',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.getAllYearlevel
)
YearlevelRouter.get(
  '/info-yearlevel/:id',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.getInfoYearlevel
)
YearlevelRouter.get(
  '/search-yearlevel',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.getAllYearlevelWithAllParans
)

// method put
YearlevelRouter.put(
  '/update-yearlevel/:id',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.updateYearlevel
)

// method post
YearlevelRouter.post(
  '/create-yearlevel',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.createYearlevel
)

// method delete
YearlevelRouter.delete(
  '/delete-yearlevel/:id',
  passport.authenticate('jwt', { session: false }),
  YearlevelController.deleteYearlevel
)

module.exports = YearlevelRouter
