const TeacherController = require('../controllers/TeacherController');
const TeacherRouter = require('express').Router();
const passport = require('passport');

// Method: POST
TeacherRouter.post('/teachers/register', TeacherController.createTeahcer);

// Method: GET
TeacherRouter.get(
    '/teachers/info',
    passport.authenticate('jwt', { session: false }),
    TeacherController.getinfoTeacher
);

TeacherRouter.get(
    '/teachers/all',
    passport.authenticate('jwt', { session: false }),
    TeacherController.getAllTeacher
);

TeacherRouter.get(
    '/teachers/search',
    passport.authenticate('jwt', { session: false }),
    TeacherController.getTeacherWithAllParams
);

// Method: PUT
TeacherRouter.put(
    '/teachers/update/:id',
    passport.authenticate('jwt', { session: false }),
    TeacherController.updateTeacher
);

// Method: DELETE
TeacherRouter.delete(
    '/teachers/delete/:id',
    passport.authenticate('jwt', { session: false }),
    TeacherController.deleteTeacher
);

module.exports = TeacherRouter;
