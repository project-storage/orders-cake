const BranchController = require('../controllers/branchController')
const BranchRouter = require('express').Router()
const passport = require('passport')

// method POST
BranchRouter.post(
    '/create-branch',
    passport.authenticate('jwt', { session: false }),
    BranchController.createBranch
)
BranchRouter.post(
    '/update-branch/:id',
    passport.authenticate('jwt', { session: false }),
    BranchController.updateBranch
)

// method GET
BranchRouter.get(
    '/all-branchs',
    passport.authenticate('jwt', { session: false }),
    BranchController.getAllBranchs
)
BranchRouter.get(
    '/search-branch',
    passport.authenticate('jwt', { session: false }),
    BranchController.getAllBranchWithAllParams
)

// method delete
BranchRouter.delete(
    '/delete-branch/:id',
    passport.authenticate('jwt', { session: false }),
    BranchController.deleteBranch
)

module.exports = BranchRouter