const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const db = require('../models');
const tb_user = db.tb_user;

passport.use(
    new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'fallback_secret', // Provide fallback for security
        passReqToCallback: false
    },
    async function (jwtPayload, done) {
        try {
            const user = await tb_user.findByPk(jwtPayload.id, {
                attributes: { exclude: ['password'] } // Don't include password in the user object
            });

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }
));

module.exports = passport;