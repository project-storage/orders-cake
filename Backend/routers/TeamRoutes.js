const TeamController = require('../controllers/teamController');
const TeamRouter = require('express').Router();
const passport = require('passport');

// Method: POST
TeamRouter.post('/create', TeamController.createTeam);

// Method: GET
TeamRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    TeamController.getInfoTeam
);

TeamRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    TeamController.getAllTeam
);

TeamRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    TeamController.getTeamWithAllParams
);

// Method: PUT
TeamRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    TeamController.updateTeam
);

// Method: DELETE
TeamRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    TeamController.deleteTeam
);

module.exports = TeamRouter;
