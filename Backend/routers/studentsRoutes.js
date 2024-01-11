const StudnetController = require('../controllers/StudentController')
const StudentRouter = require('express').Router()
const passport = require('passport')

// method post
StudentRouter.post('/register-student', StudnetController.createStudent)

// method get
StudentRouter.get('/info-student', passport.authenticate('jwt', { session: false }), StudnetController.getInfoStudent)
StudentRouter.get('/all-student', passport.authenticate('jwt', { session: false }), StudnetController.getAllStudent)
StudentRouter.get('/search-student', passport.authenticate('jwt', { session: false }), StudnetController.getStudentWithAllParams)

// method puh
StudentRouter.put('/update-student/:id', passport.authenticate('jwt', { session: false }), StudnetController.updateStudent)

// method delete
StudentRouter.delete('/delete-student/:id', passport.authenticate('jwt', { session: false }), StudnetController.deleteStudent)
module.exports = StudentRouter