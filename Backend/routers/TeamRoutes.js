const TeamController = require('../controllers/teamController');
const TeamRouter = require('express').Router();
const passport = require('passport');

// Method: POST
TeamRouter.post('/teams/create', TeamController.createTeam);

// Method: GET
TeamRouter.get(
    '/teams/info',
    passport.authenticate('jwt', { session: false }),
    TeamController.getInfoTeam
);

TeamRouter.get(
    '/teams/all',
    passport.authenticate('jwt', { session: false }),
    TeamController.getAllTeam
);

TeamRouter.get(
    '/teams/search',
    passport.authenticate('jwt', { session: false }),
    TeamController.getTeamWithAllParams
);

// Method: PUT
TeamRouter.put(
    '/teams/update/:id',
    passport.authenticate('jwt', { session: false }),
    TeamController.updateTeam
);

// Method: DELETE
TeamRouter.delete(
    '/teams/delete/:id',
    passport.authenticate('jwt', { session: false }),
    TeamController.deleteTeam
);

module.exports = TeamRouter;
