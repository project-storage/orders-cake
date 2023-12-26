const cakeController = require('../controllers/CakeController')
const cakeRouter = require('express').Router()
const passport = require('passport')

cakeRouter.post(
    '/create-cake',
    passport.authenticate('jwt', { session: false }),
    cakeController.createCake,cakeController.upload
)

module.exports = cakeRouter