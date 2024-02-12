const groupController = require('../controllers/groupController')
const groupRouter = require('express').Router()
const passport = require('passport')

// Method: GET
groupRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    groupController.getInfoGroup
)

groupRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    groupController.getAllGroup
)

groupRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    groupController.getGroupWithAllParams
)
// Method: POST
groupRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    groupController.createGroup
)

// Method: PUT
groupRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    groupController.updateGroup
)

// Method: DELETE
groupRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    groupController.deleteGroup
)

module.exports = groupRouter