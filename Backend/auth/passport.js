// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const { User, Teacher, Student } = require('../models')

// passport.use('user-local', new LocalStrategy(
//   { usernameField: 'username', passwordField: 'password' },
//   async (username, password, done) => {
//     try {
//       const user = await User.findOne({ where: { username: username } }),

//       if (!user) {
//         return done(null, false, { message: " Incorrect username." })
//       }

//       if (user.password !== password) {
//         return done(null, false, { message: "Incorrect password" })
//       }

//       return done(null, user)
//     } catch (error) {
//       return done(error)
//     }
//   }
// ))

// passport.use('teacher-local',new LocalStrategy(
//   {usernameField:"te"}
// ))

// module.exports = passport