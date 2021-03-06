const fs = require('fs')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const environment = process.env.NODE_ENV || 'development'
const config =
  environment === 'production' ? dbConfigs.production : dbConfigs.development
const db = require('knex')(config)
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

const port = process.env.PORT || 4000
// Express.js Endpoints
const homepageTemplate = fs.readFileSync('./templates/homepage.mustache', 'utf8')
const searchResultsTemplate = fs.readFileSync('./templates/search-results.mustache', 'utf8')

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
        // console.log('Your seed data should show up here') // console log this message
        // res.send(allPosts.rows) // then send back the rows full of data from your database

        getRecommendedUsers().then(function (allUsers) {
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
    // }
  }
})

app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})

// GET /users

app.get('/users', function (request, response, next) {
  getAllUsers()
    .then(function (allUsers) {
      console.log('get user info', allUsers.rows)
      response.send(allUsers.rows)
    })
    .catch(function () {
      response.status(500).send('No Users found')
    })
})

// POST new text post

app.post('/posts', function (req, res) {
  console.log(req.body, 'this is req.body')
  createPost(req.body, req.user.id)
    .then(function () {
      res.redirect('/')
    })
    .catch(function () {
      res.status(500).send('Not able to create new post')
    })
})

// Get Searched For Content

app.get('/search', function (req, res) {
  // console.log(req.query.search, '<-- This is req.query.search') // console logs what you searched for.
  getSearchedForContent(req.query.search)
    .then(function (results) {
      // console.log(results.rows, "<-- These are your results")
      // res.send('got' + JSON.stringify(req.query.search) )
      res.send( // see if you can get results.fields to render on the homepage
        mustache.render(searchResultsTemplate, {
          resultsHTML: renderPosts(results.rows)
        })
      )
    })
    .catch(function () {
      res.status(500).send('Not able to find searched term')
    })
  // res.send('got' + JSON.stringify(req.query.search)) // sends what is entered in the search bar on the homepage to the screen.
})

// POST new quote post

app.post('/quotes', function (req, res) {
  createQuotePost(req.body, req.user.id)
    .then(function () {
      getAllThingsPosted().then(function (allPosts) {
        res.redirect('/')
      })
    })
    .catch(function () {
      res.status(500).send('Not able to create new post')
    })
})

// DELETE post

app.delete('/posts', function (req, res) {
  deletePost(req.body.id).then(function (post) {
    // res.redirect(303, '/')
    res.end()
    // res.send(
    //   mustache.render(homepageTemplate, {
    //     postsHTML: renderPosts(allPosts.rows)
    //   })
    // )
  })
  // console.log('jhuh', req.body)
  // res.send('hy')
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

function deletePost (id) {
  return db
    .raw('DELETE FROM "Posts" WHERE id = ?', [id])
    .then(function (results) {
      if (results.rowCount === 0) {
        return null
      } else {
      }
    })
}

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
  return db.raw('SELECT * FROM "Users" ORDER BY RANDOM() LIMIT 4')
}

function getSearchedForContent (searchedWord) {
  const term = '%' + searchedWord + '%'

  // Raw
  return db.raw('SELECT * FROM "Posts" WHERE "postedMessage" LIKE ?', [term])
}

function renderPosts (post) {
  function createSinglePostHTML (postObject) {
    if (postObject.postedImage !== null) {
      return `
      <div class="post-container">
        <div class="user-img">  <img src= ${
  postObject.userImage
} height="60" width="59" alt=""></div>
        <div class="img-post-container">
          <img class="posted-img" src=${
  postObject.postedImage
} alt="" width="500">
          <div class="posted-message">${postObject.postedMessage}</div>
          <div class="post-footer">
            <div class="notes-container"> ${
  postObject.numberOfNotes
} notes </div>
              <div class="btn-container">
                <button id="delete-btn" onClick="

                deletePost(${postObject.id})            
                ">
                <img src="img/garbage.svg" width="20px"></button>
              </div>
           
          </div>
        </div>
      </div>`
    } else if (postObject.quote !== null) {
      return `
      <div class="post-container">
        <img src=${postObject.userImage} alt="" height="60" width="60">
        <div class="content-container">
         <div class="quote-container"> <span class=quote>"</span><h2>${
  postObject.quote
}</h2> <span class=quote>"</span> </div>
          ${postObject.source}
          <div class="post-footer">
          <div class="notes-container">${postObject.numberOfNotes} notes </div>
          <div class="btn-container">
          <button id="delete-btn" onClick="

          deletePost(${postObject.id})            
          ">
          <img src="img/garbage.svg" width="20px"></button>
        </div>
          </div>
        </div>
      </div>
      `
    } else {
      return `
      <div class="post-container">
        <img src=${postObject.userImage} alt="" height="60" width="60"> 
        
        <div class="content-container">
          <h2>${postObject.title}</h2>
          ${postObject.postedMessage}
          <div class="post-footer">
          <div class="notes-container"> ${postObject.numberOfNotes} notes </div>
          
            <div class="btn-container">
            <button id="delete-btn" onClick="

            deletePost(${postObject.id})            
            ">
            <img src="img/garbage.svg" width="20px"></button>
          </div>
          </div>
        </div>
    
      </div>
      `
    }
  }

  const CreateAllPostsHTML = post.map(createSinglePostHTML)

  return CreateAllPostsHTML.join('')
}

function createPost (postObject, userId) {
  return db.raw(
    'INSERT INTO "Posts" ("postedMessage", "title", "userId") VALUES (?, ?, ?)',
    [postObject.postedMessage, postObject.title, userId]
  )
}

function createQuotePost (postObject, userId) {
  return db.raw(
    'INSERT INTO "Posts" ("quote", "source", "userId") VALUES (?, ?, ?)',
    [postObject.quote, postObject.source, userId]
  )
}

// console.log('sup')
function renderRecommendedUsers (user) {
  function createSingleRecommendation (userObject) {
    return `
    <div class="rec-container">
      <div class="sectionthatisnoticon">
      <div class="rec-img">
      <img class="recommended-user-img" alt="" src=${
  userObject.userImage
} height="41" width="41">
      </div>
      <div class="rec-text">
        <h6 class="rec-username">${userObject.name}</h6>
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
