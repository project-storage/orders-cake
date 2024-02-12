const passport = require('passport')
const teamController = require('../controllers/teamController')
const teamRouter = require('express').Router()

// Method : POST
teamRouter.post('/create', teamController.createTeam)

// Method : GET
teamRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    teamController.getInfoTeam
)

teamRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    teamController.getAllTeam
)

teamRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    teamController.getTeamWithAllParams
)

// Method : PUT
teamRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    teamController.updateTeam
)

// Method : DELETE
teamRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    teamController.deleteTeam
)
module.exports = teamRouter