const cakeController = require('../controllers/cake.controller');
const cakeRouter = require('express').Router();
const passport = require('passport');

// Method: POST
cakeRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    cakeController.createCake
);

cakeRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.updateCake
);

// Method: GET
cakeRouter.get(
    '/info/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.getCakeInfo
);

cakeRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    cakeController.getCakeAll
);

cakeRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    cakeController.searchCake
);

// Method: DELETE 
cakeRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.deleteCake
);

module.exports = cakeRouter;
