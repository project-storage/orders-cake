const cakeController = require('../controllers/CakeController');
const cakeRouter = require('express').Router();
const passport = require('passport');

// Method: POST
cakeRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    cakeController.createCake
);

cakeRouter.post(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.updateCake
);

// Method: GET
cakeRouter.get(
    '/info/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.getInfoCake
);

cakeRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    cakeController.getAllCakes
);

cakeRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    cakeController.getCakeWithAllParams
);

// Method: DELETE 
cakeRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.deleteCake
);

module.exports = cakeRouter;
