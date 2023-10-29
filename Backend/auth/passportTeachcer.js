const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt
const StrategyJwt = passportJwt.Strategy
const db = require('../models')
const teacher = db.teacher

passport.teacher(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    function (jwtPayload, done) {
      return teacher
        .findOne({ where: { id: jwtPayload.id } })
        .then(teacher => {
          return done(null, teacher)
        })
        .catch(err => {
          return done(err)
        })
    }
  )
)
