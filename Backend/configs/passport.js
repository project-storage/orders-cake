const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt
const StrategyJwt = passportJwt.Strategy
const db = require('../models')
const user = db.tb_user

passport.use(
    new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
        function (jwtPayload, done) {
            return user
                .findOne({ where: { id: jwtPayload.id } })
                .then(user => {
                    return done(null, user)
                })
                .catch(err => {
                    return done(err)
                })
        }
    )
)