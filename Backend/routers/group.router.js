const groupController = require('../controllers/group.controller')
const groupRouter = require('express').Router()
const passport = require('passport')

// Method: GET
groupRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    groupController.getGroupInfo
)

groupRouter.get(
    '/info/:id',
    passport.authenticate('jwt', { session: false }),
    groupController.getGroupById
)

groupRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    groupController.getGroupAll
)

groupRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    groupController.searchGroup
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