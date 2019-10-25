const fs = require('fs')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)
const mustache = require('mustache')
const path = require('path')

// ========== Express Session ==========
const session = require('express-session')
app.use(
  session({
    secret: 'p3qbvkefashf4h2q',
    resave: false,
    saveUninitialized: false
  })
)

// ========== Setup Passport ==========
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

app.use('/', express.static(path.join(__dirname, '/public')))

app.get('/', function (req, res) {

  console.log('user information >>> ', req.user)
  if (!req.user) {
    res.redirect('/auth')
  } else {
    getAllItemsPosted()
      // The Promise
      .then(function (allPosts) {
        // console.log(allPosts)
        // When the Promise is received
        // console.log(allPosts.rows)
        console.log('Your seed data should show up here') // console log this message
        // res.send(allPosts.rows) // then send back the rows full of data from your database

        getAllUsers().then(function (allUsers) {
          res.send(
            mustache.render(homepageTemplate, {
              postsHTML: renderPosts(allPosts.rows),
              recommendedHTML: renderRecommendedUsers(allUsers.rows)
            })
          )     
        })

        // Mustache is working! But why is everything undefined?
        // res.send((renderPosts(allPosts.rows))) //Wow! But why is everything undefined?
        // res.send(allPosts.rows)
      })
      .catch(function () {
        res.status(500).send('No Posts found')
      })
  }
})

// GET Recommended posts

app.get('/recommendedposts', function (req, res) {
  console.log('helllo')
  getAllUsers()
    .then(function (allUsers) {
      // res.redirect('/')
      res.send(
        mustache.render(homepageTemplate, {
          recommendedHTML: renderRecommendedUsers(allUsers.rows)
        })
      )
    })
    .catch(function () {
      res.status(500).send('No recommendations found')
    })
})

app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})

// GET /users

// app.get('/users', function (request, response, next) {
//   getAllUsers()
//     .then(function (allUsers) {
//       console.log('#######', allUsers.rows)
//       response.send(allUsers.rows)
//     })
//     .catch(function () {
//       response.status(500).send('No Users found')
//     })
// })

// POST new text post

app.post('/posts', function (req, res) {
  createPost(req.body).then(function () {
    getAllThingsPosted()
      .then(function (allPosts) {
        res.redirect('/')
      })
      .catch(function () {
        res.status(500).send('No Posts found')
      })
  })
})

// POST new quote post

app.post('/quotes', function (req, res) {
  createQuotePost(req.body)
    .then(function () {
      getAllThingsPosted()
        .then(function (allPosts) {
          res.redirect('/')
        })
    })
    .catch(function () {
      res.status(500).send('Not able to create new quote post')
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
  return db.raw(
    'SELECT "Posts".*, "Users"."userImage" FROM "Posts" LEFT JOIN "Users" On "Users"."id" = "Posts"."userId" order by "Posts"."id" desc LIMIT 20'
  )
}

function getAllUsers () {
  return db.raw(getAllUsersQuery)
}

function getAllThingsPosted () {
  return db.raw(
    'SELECT "Posts".*, "Users"."userImage" FROM "Posts" LEFT JOIN "Users" On "Users"."id" = "Posts"."userId" order by "Posts"."id" desc LIMIT 20'
  )
}

function getRecommendedUsers () {
  return db.raw('SELECT * FROM "Users" ORDER BY name limit 4')
}

function renderPosts (post) {
  function createSinglePostHTML (postObject) {
    if (postObject.postedImage !== null) {
      return `
      <div class="post-container">
        <div class="user-img">  <img src= ${postObject.userImage} height="60" width="59"></div>
        <div class="img-post-container">
          <img class="posted-img" src= ${postObject.postedImage} width="500">
          <div class="posted-message">${postObject.postedMessage}</div>
          <div class="post-footer">
             ${postObject.numberOfNotes} notes
          </div>
        </div>
      </div>`
    } else if (postObject.quote !== null) {
      return `
      <div class="post-container">
        <img src=${postObject.userImage} height="60" width="60">
        <div class="content-container">
          "<h2>${postObject.quote}</h2>"
          ${postObject.source}
          <div class="post-footer">
            ${postObject.numberOfNotes} notes
          </div>
        </div>
      </div>
      `
    } else {
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

function createQuotePost (postObject) {
  return db.raw('INSERT INTO "Posts" ("quote", "source") VALUES (?, ?)', [
    postObject.quote,
    postObject.source
  ])
}

// console.log('sup')
function renderRecommendedUsers (user) {
  function createSingleRecommendation (userObject) {
    return `
    <div class="rec-container">
      <div class="sectionthatisnoticon">
      <div class="rec-img">
      <img class="recommended-user-img" src=${userObject.userImage} height="41" width="41">
      </div>
      <div class="rec-text">
        <h6 class="username">${userObject.name}</h6>
        <p class="tagline">${userObject.tagline}</p>
      </div>
      </div>
     
      <div class="rec-icon-container">
        <img src="img/add-user.png" height="30px" />
      </div>
    </div>
  `
  }
  const createRecommendationsHTML = user.map(createSingleRecommendation)

  return createRecommendationsHTML.join('')
}

require('./src/auth-local.js')(app, passport)
require('./src/auth-facebook.js')(app, passport)
require('./src/auth.js')(app, passport)
