const studentController = require('../controllers/student.controller');
const studentRouter = require('express').Router();
const passport = require('passport');

// Method: POST
studentRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    studentController.createStudent);

// Method: GET
studentRouter.get(
    '/info',
    passport.authenticate('jwt', { session: false }),
    studentController.getStudentInfo
);

studentRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    studentController.getStudentAll
);

studentRouter.get(
    '/search',
    passport.authenticate('jwt', { session: false }),
    studentController.searchStudent
);

// Method: PUT
studentRouter.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    studentController.updateStudent
);

// Method: DELETE
studentRouter.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    studentController.deleteStudent
);

module.exports = studentRouter;
