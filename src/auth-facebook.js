module.exports = function (app, passport) {
  // ========== Facebook OAuth ==========
  //   const passport = require('passport')

  const FacebookStrategy = require('passport-facebook').Strategy
  const callbackURL =
    process.env.NODE_ENV === 'production'
      ? 'https://digitalcrafts-tumblr-clone.herokuapp.com/auth/facebook/callback'
      : '/auth/facebook/callback'
  passport.use(
    new FacebookStrategy(
      {
        clientID: 714303202382978,
        clientSecret: 'd73be09f0889564f3ed3c19017e32249',
        callbackURL: callbackURL
      },
      function (accessToken, refereshToken, profile, cb) {
        return cb(null, profile)
      }

      //  function (accessToken, refereshToken, profile, cb) {
      //    User.findOrCreate({ facebookId: profile.id }, function(err, user) {
      //      if (err) { return cb (err); }
      //      cb (null, user)
      //    })
      //  }
      //  return cb (null, profile)
    )
  )

  passport.serializeUser(function (user, cb) {
    cb(null, user)
  })

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
  })

  // app.use(passport.initialize())
  // app.use(passport.session())

  // ============= END ===============

  // ========== Passport-facebook routes ==========
  app.get('/auth/facebook', passport.authenticate('facebook'))

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
    }
  )
  // ================= END ======================
}
