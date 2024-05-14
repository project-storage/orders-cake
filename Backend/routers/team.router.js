const passport = require('passport')
const teamController = require('../controllers/team.controller')
const teamRouter = require('express').Router()

// Method : POST
teamRouter.post('/create', teamController.createTeam)

// Method : GET
teamRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    teamController.getTeamInfo
)

teamRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    teamController.getTeamAll
)

teamRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    teamController.searchTeam
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