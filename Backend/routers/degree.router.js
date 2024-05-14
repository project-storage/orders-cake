const degreeController = require('../controllers/degree.controller')
const degreeRouter = require('express').Router()
const passport = require('passport')

// Method: GET
degreeRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    degreeController.getAllDegree
)

degreeRouter.get(
    '/info/:id',
    passport.authenticate('jwt', { session: false }),
    degreeController.getDegreeInfo
)

degreeRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    degreeController.searchDegree
)

// Method: POST
degreeRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    degreeController.createDegree
)

// Method: PUT
degreeRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    degreeController.updateDegree
)

// Method: DELETE
degreeRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    degreeController.deleteDegree
)

module.exports = degreeRouter