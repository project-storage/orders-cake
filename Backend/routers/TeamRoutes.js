const TeamController = require('../controllers/TeamController')
const TeamRouter = require('express').Router()
const passport = require('passport')

// method post
TeamRouter.post('/create-team', TeamController.createTeam)
TeamRouter.post('/login-team', TeamController.loginTeam)

// method get
TeamRouter.get('/info-team', passport.authenticate('jwt', { session: false }), TeamController.getInfoTeam)
TeamRouter.get('/all-team', passport.authenticate('jwt', { session: false }), TeamController.getAllTeam)
TeamRouter.get('/search-team', passport.authenticate('jwt', { session: false }), TeamController.getTeamWithAllParams)

// method put
TeamRouter.put('/update-team/:id', passport.authenticate('jwt', { session: false }), TeamController.updateTeam)

// method delete
TeamRouter.delete('/delete-team/:id',passport.authenticate('jwt',{session:false}),TeamController.deleteTeam)
module.exports = TeamRouter