const StudentController = require('../controllers/StudentController');
const StudentRouter = require('express').Router();
const passport = require('passport');

// Method: POST
StudentRouter.post('/students/register', StudentController.createStudent);

// Method: GET
StudentRouter.get(
    '/students/info',
    passport.authenticate('jwt', { session: false }),
    StudentController.getInfoStudent
);

StudentRouter.get(
    '/students/all',
    passport.authenticate('jwt', { session: false }),
    StudentController.getAllStudent
);

StudentRouter.get(
    '/students/search',
    passport.authenticate('jwt', { session: false }),
    StudentController.getStudentWithAllParams
);

// Method: PUT
StudentRouter.put(
    '/students/update/:id',
    passport.authenticate('jwt', { session: false }),
    StudentController.updateStudent
);

// Method: DELETE
StudentRouter.delete(
    '/students/delete/:id',
    passport.authenticate('jwt', { session: false }),
    StudentController.deleteStudent
);

module.exports = StudentRouter;
