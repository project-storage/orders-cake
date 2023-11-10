const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const db = require('../models');
const Student = db.student;

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return Student
        .findOne({ where: { id: jwtPayload.id } })
        .then(student => {
          return done(null, student);
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);
