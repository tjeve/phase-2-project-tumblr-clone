module.exports = function (app, passport) {
  const mustache = require('mustache')
  const fs = require('fs')
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  const { getAllUsers, insertNewUser } = require('./db/users.js')
  const fileUpload = require('express-fileupload')
  const imageDir = 'public/userImages/'
  const imageUrl = '/userImages/'
  const uuidv4 = require('uuid/v4')
  const { getOneUser } = require('./db/users')

  app.use(
    fileUpload({
      createParentPath: true
    })
  )

  const registerTemplate = fs.readFileSync(
    './templates/register.mustache',
    'utf8'
  )

  const LocalStrategy = require('passport-local').Strategy

  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function (email, password, done) {
      getOneUser({ email: email })
        .then(function (userArray) {
          if (userArray.length === 0) {
            // console.error('User is not found')
            return done('User is not found!!!')
          } else {
            const user = userArray[0]
            bcrypt.compare(password, user.password, function (
              err,
              authResponse
            ) {
              if (err) console.error(err)
              if (authResponse) {
                return done(null, user)
              } else {
                return done('User validation failed', user.email)
              }
            })
            // console.log(user)
          }
        })
        .catch(function (err) {
          console.error('Error on database')
          return done(err)
        })
    })
  )

  app.post(
    '/auth/local',
    passport.authenticate('local', { failureRedirect: '/auth/local-error' }),
    function (req, res) {
      res.redirect('/')
    }
  )

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
        userObj.userImage = imageUrl + filename
      })
    }

    // Check Requirements
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
      bcrypt.hash(userObj.password, salt, function (err, encrypted) {
        if (err) console.error(err)
        userObj.password = encrypted
        insertNewUser(userObj)
          .then(function () {
            res.redirect('/auth')
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
        console.log(allUsers.rows)
        res.send(allUsers.rows)
      })
      .error(function () {
        res.send('error occured!')
      })
  })

  app.get('/auth/local-success', function (req, res) {
    console.log('user information >>>>', req.user)
    res.send('Welcome ' + req.query.username + '!!')
  })
  app.get('/auth/local-error', function (req, res) {
    res.send('error logging in')
  })
}
