module.exports = function (app) {
  const passport = require('passport')
  const LocalStrategy = require('passport-local').Strategy
  const mustache = require('mustache')
  const fs = require('fs')
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  const textPassword = 'p3qbvkefashf4h2q'
  const { getAllUsers, insertNewUser } = require('./db/users.js')
  const fileUpload = require('express-fileupload')
  const imageDir = 'userImages/'
  const uuidv4 = require('uuid/v4')

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(
    fileUpload({
      createParentPath: true
    })
  )

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
    const userObj = req.body
    // Save file
    if (req.files) {
      const image = req.files.userImage
      const ext = image.name.split('.').pop()
      const filename = uuidv4() + '.' + ext
      userObj.userImage = imageDir + filename
      fs.writeFile(userObj.userImage, image.data, function (err) {
        if (err) console.error(err)
        console.log('Imagefile was saved. ', image.name)
      })
    }

    // Check Requirements
    // TODO
    if (!userObj.email) {
      res.status(500).send('Email is missing!')
    }

    if (!userObj.name) {
      res.status(500).send('User name is missing!')
    }

    // Update slug
    userObj.slug = userObj.slug
      ? userObj.slug.replace(/\s/g, '-')
      : userObj.name.replace(/\s/g, '-').toLowerCase()

    // Encrypt password and insert to Database
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) console.error(err)
      bcrypt.hash(textPassword, salt, function (err, encrypted) {
        if (err) console.error(err)
        userObj.password = encrypted
        insertNewUser(userObj)
          .then(function () {
            res.redirect('/users')
          })
          .catch(function (error) {
            console.log(error)
            res.send('error!')
          })
      })
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
