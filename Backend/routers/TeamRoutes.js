const TeamController = require('../controllers/TeamController')
const TeamRouter = require('express').Router()

TeamRouter.post('/create-team',TeamController.createTeam)
TeamRouter.post('/login-team',TeamController.loginTeam)

module.exports = TeamRouter