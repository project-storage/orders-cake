const cakeController = require('../controllers/CakeController')
const cakeRouter = require('express').Router()
const passport = require('passport')

// method post
cakeRouter.post(
    '/create-cake',
    passport.authenticate('jwt', { session: false }),
    cakeController.createCake
)

cakeRouter.post(
    '/update-cake/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.updateCake
)

// method get
cakeRouter.get(
    '/info-cake/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.getInfoCake
)

cakeRouter.get(
    '/all-cake',
    passport.authenticate('jwt', { session: false }),
    cakeController.getAllCake
)

cakeRouter.get(
    '/search-cake',
    passport.authenticate('jwt', { session: false }),
    cakeController.getCakeWithAllParmans
)

// method delete 
cakeRouter.delete(
    '/delete-cake/:id',
    passport.authenticate('jwt', { session: false }),
    cakeController.deleteCake
)
module.exports = cakeRouter