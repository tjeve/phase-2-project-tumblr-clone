module.exports = function (app) {
  const passport = require('passport')
  const LocalStrategy = require('passport-local').Strategy
  const mustache = require('mustache')
  const fs = require('fs')
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  const myPlaintextPassword = 'tumblrrrr'
  const { getAllUsers, insertNewUser } = require('./db/users.js')

  app.use(passport.initialize())
  app.use(passport.session())

  const authTemplate = fs.readFileSync('./templates/auth.mustache', 'utf8')
  const registerTemplate = fs.readFileSync(
    './templates/register.mustache',
    'utf8'
  )

  passport.use(new LocalStrategy(function (username, password, done) {}))

  app.get('/auth', function (req, res) {
    res.send(mustache.render(authTemplate))
  })

  app.post('/auth', function (req, res) {
    passport.authenticate('local', { failureRedirect: '/auth-error' }, function (
      req,
      res
    ) {
      res.redirect('/')
    })
  })

  app.get('/register', function (req, res) {
    res.send(mustache.render(registerTemplate))
  })

  app.post('/register', function (req, res) {
    bcrypt
      .hash(req.body.password, saltRounds)
      .then(function (err, hash) {
        const userObj = req.body
        if (err) {
          console.error(err)
        }
        userObj.password = hash
        console.log(typeof hash)
        console.log(userObj)
        insertNewUser(userObj)
          .then(function () {
            res.redirect('/users')
          })
          .catch(function (error) {
            console.log(error)
            res.send('error!')
          })
      })
      .catch(function (err) {
        console.error('Error on bcrypt!')
        console.error(err)
      })
  })

  app.get('/users', function (req, res) {
    getAllUsers()
      .then(function (allUsers) {
        console.log(allUsers)
        res.send(allUsers)
      })
      .error(function () {
        res.send('error occured!')
      })
  })

  app.get('/auth-success', function (req, res) {
    res.send('Welcome ' + req.query.username + '!!')
  })
  app.get('/auth-error', function (req, res) {
    res.send('error logging in')
  })

  passport.serializeUser(function (user, cb) {
    cb(null, user.id)
  })

  passport.deserializeUser(function (id, cb) {
    cb(null, null)
  })
}
