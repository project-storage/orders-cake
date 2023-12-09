const TeamController = require('../controllers/TeamController')
const TeamRouter = require('express').Router()
const passport = require('passport')

TeamRouter.post('/create-team', TeamController.createTeam)
TeamRouter.post('/login-team', TeamController.loginTeam)

// method get
TeamRouter.get('/info-team', passport.authenticate('jwt', { session: false }), TeamController.getInfoTeam)
TeamRouter.get('/all-team', passport.authenticate('jwt', { session: false }), TeamController.getAllTeam)
module.exports = TeamRouter