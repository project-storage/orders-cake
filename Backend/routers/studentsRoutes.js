const StudentController = require('../controllers/StudentController');
const StudentRouter = require('express').Router();
const passport = require('passport');

// Method: POST
StudentRouter.post('/register', StudentController.createStudent);

// Method: GET
StudentRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    StudentController.getInfoStudent
);

StudentRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    StudentController.getAllStudent
);

StudentRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    StudentController.getStudentWithAllParams
);

// Method: PUT
StudentRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    StudentController.updateStudent
);

// Method: DELETE
StudentRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    StudentController.deleteStudent
);

module.exports = StudentRouter;
