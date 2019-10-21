const fs = require('fs')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)
const mustache = require('mustache')
const path = require('path')

// const bodyParser = require('body-parser')

// ========== Facebook OAuth ==========
const passport = require('passport')

const FacebookStrategy = require('passport-facebook').Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: 714303202382978,
      clientSecret: 'd73be09f0889564f3ed3c19017e32249',
      callbackURL: 'http://localhost:4000/auth/facebook/callback'
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

app.use(passport.initialize())
app.use(passport.session())
// ============= END ===============

app.use(express.json())
app.use(express.urlencoded())
// const {
//   getAllPosts,
//   getOnePost,
//   getAllPostsFromOneUser
// } = require('./src/db/posts.js')

const port = 4000
// -----------------------------------------------------------d---------------
// Express.js Endpoints
const homepageTemplate = fs.readFileSync('./templates/homepage.html', 'utf8')
// const successTemplate = fs.readFileSync('./templates/success.mustache', 'utf8')

// ========== Passport-facebook routes ==========
app.get('/auth/facebook', passport.authenticate('facebook'))

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)

// ================= END ======================
app.use('/', express.static(path.join(__dirname, '/public')))

app.get('/', function (req, res) {
  getAllItemsPosted()
    // The Promise
    .then(function (allPosts) {
      // When the Promise is received
      // console.log(allPosts.rows)
      console.log('Your seed data should show up here') // console log this message
      // res.send(allPosts.rows) // then send back the rows full of data from your database
      res.send(
        mustache.render(homepageTemplate, {
          postsHTML: renderPosts(allPosts.rows)
        })
      ) // Mustache is working! But why is everything undefined?
      // res.send((renderPosts(allPosts.rows))) //Wow! But why is everything undefined?
      // res.send(allPosts.rows)
    })
    .catch(function () {
      res.status(500).send('No Posts found')
    })
})

app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})

// GET /users

app.get('/users', function (request, response, next) {
  getAllUsers()
    .then(function (allUsers) {
      response.send(allUsers.rows)
    })
    .catch(function () {
      response.status(500).send('No Users found')
    })
})

// POST new text post

app.post('/posts', function (req, res) {
  console.log(req.body, 'this is req.body')
  createPost(req.body)
    .then(function () {
      getAllThingsPosted()
        .then(function (allPosts) {
          res.send(
            mustache.render(homepageTemplate, {
              postsHTML: renderPosts(allPosts.rows)
            })
          )
        })
        .catch(function () {
          res.status(500).send('No Posts found')
        })
    })
    .catch(function () {
      res.status(500).send('Not able to create new post')
    })
})

// --------------------------------------------------------------------------
// database Queries and Functions

const getAllUsersQuery = `
SELECT *
FROM "Users"
`
// const getAllPostsQuery = `
// SELECT *
// FROM "Posts"
// `

function getAllItemsPosted () {
  return db.raw('SELECT * FROM "Posts"')
}

function getAllUsers () {
  return db.raw(getAllUsersQuery)
}

function getAllThingsPosted () {
  return db.raw('SELECT * FROM "Posts"')
}

function renderPosts (post) {
  function createSinglePostHTML (postObject) {
    if (postObject.postedImage === null) {
      return `
      <div class="post-container">
        <img src=${postObject.userImage} height="60" width="60"> 
        
        <div class="content-container">
          <h2>${postObject.title}</h2>
          ${postObject.postedMessage}
          <div class="post-footer">
            ${postObject.numberOfNotes} notes
          </div>
        </div>
    
      </div>
      `
    } else {
      return `<div class="post-container">
                <img class="user-img" src=${
  postObject.userImage
} height="60" width="59">

                <div class="img-post-container">
                   <img class="posted-img" src=${
  postObject.postedImage
} height="700" width="500">
                   <div class="posted-message">${postObject.postedMessage}</div>
                    <div class="post-footer">
                      ${postObject.numberOfNotes} notes
                    </div>
                </div>
              </div>`
    }
  }

  const CreateAllPostsHTML = post.map(createSinglePostHTML)

  return CreateAllPostsHTML.join('')
}

function createPost (postObject) {
  return db.raw(
    'INSERT INTO "Posts" ("postedMessage", "title") VALUES (?, ?)',
    [postObject.postedMessage, postObject.title]
  )
}

// function renderSuccessInfo () {
//   return `
//     <p>Yay u did it.</p>
//     <p><a href="/">Go Back to Homepage</a></p>
//   `
// }
