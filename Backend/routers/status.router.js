const statusController = require('../controllers/status.controller')
const statusRouter = require('express').Router()
const passport = require('passport')

statusRouter.get('/all', passport.authenticate('jwt', { session: false }), statusController.getStatusAll)

statusRouter.post('/create', passport.authenticate('jwt', { session: false }), statusController.createStatue)

statusRouter.put('/update/:id', passport.authenticate('jwt', { session: false }), statusController.updateStatus)

statusRouter.delete('/delete/:id', passport.authenticate('jwt', { session: false }), statusController.deleteStatus)

module.exports = statusRouter