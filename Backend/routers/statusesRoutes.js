const statusController = require('../controllers/statusController')
const statusRouter = require('express').Router()
const passport = require('passport')

statusRouter.get('/all', passport.authenticate('jwt', { session: false }), statusController.getAllStatus)

statusRouter.post('/create', passport.authenticate('jwt', { session: false }), statusController.createStatues)

statusRouter.put('/update/:id', passport.authenticate('jwt', { session: false }), statusController.updateStatus)

statusRouter.delete('/delete/:id', passport.authenticate('jwt', { session: false }), statusController.deleteStatus)

module.exports = statusRouter