const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User, Teacher, Student } = require('../models')

passport.use('user-local', new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use('teacher-local', new LocalStrategy(
  { usernameField: 'teach_username', passwordField: 'teach_password' },
  async (teach_username, teach_password, done) => {
    try {
      const teacher = await Teacher.findOne({ where: { username: teach_username } });

      if (!teacher) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (teacher.teach_password !== teach_password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, teacher);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use('student-local', new LocalStrategy(
  { usernameField: 'stu_username', passwordField: 'stu_password' },
  async (stu_username, stu_password, done) => {
    try {
      const student = await Student.findOne({ where: { username: stu_username } });

      if (!student) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (student.stu_password !== stu_password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, student);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    if (user) {
      done(null, user)
    } else {
      const teacher = await Teacher.findByPk(id)
      if (teacher) {
        done(null, teacher)
      } else {
        const student = await Student.findByPk(id)
        done(null, student)
      }
    }
  } catch (error) {
    done(error)
  }
})

module.exports = passport