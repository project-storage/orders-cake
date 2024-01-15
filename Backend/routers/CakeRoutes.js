const cakeController = require('../controllers/cakeController');
const cakeRouter = require('express').Router();
const passport = require('passport');

// Method: POST
cakeRouter.post(
    '/cakes/create',
    passport.authenticate('jwt', { session: false }),
    cakeController.createCake
);

cakeRouter.post(
    '/cakes/update/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.updateCake
);

// Method: GET
cakeRouter.get(
    '/cakes/info/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.getInfoCake
);

cakeRouter.get(
    '/cakes/all',
    passport.authenticate('jwt', { session: false }),
    cakeController.getAllCake
);

cakeRouter.get(
    '/cakes/search',
    passport.authenticate('jwt', { session: false }),
    cakeController.getCakeWithAllParmans
);

// Method: DELETE 
cakeRouter.delete(
    '/cakes/delete/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.deleteCake
);

module.exports = cakeRouter;
