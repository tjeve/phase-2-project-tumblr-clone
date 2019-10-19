const fs = require('fs')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)
const mustache = require('mustache')
const path = require('path')
// const bodyParser = require('body-parser')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// const {getAllPosts, getOnePost, getAllPostsFromOneUser } = require('./src/db/posts.js')
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser)

const port = 4000
// --------------------------------------------------------------------------
// Express.js Endpoints
const homepageTemplate = fs.readFileSync('./templates/homepage.html', 'utf8')
// const successTemplate = fs.readFileSync('./templates/success.mustache', 'utf8')

app.use('/', express.static(path.join(__dirname, '/public')))

app.get('/', function (req, res) {
  getAllThingsPosted() // The Promise
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
  // console.log('wuts disssss', request)
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
      getAllThingsPosted() // The Promise
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
      // res.send('hello world')
    })
    .catch(function (error) {
      console.error(error)
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

function getAllUsers () {
  return db.raw(getAllUsersQuery)
}

function getAllThingsPosted () {
  return db.raw('SELECT * FROM "Posts" order by "id" desc')
}

function renderPosts (post) {
  function createSinglePostHTML (postObject) {
    return `<div>
              <h1>${postObject.id}</h1>
              <img src=${postObject.postedImage} height="600" width="400">
              <div>${postObject.userId}</div>
              <img src=${postObject.userImage} height="20" width="20">
              <p>${postObject.postedMessage}</p>
            </div>`
  }

  const CreateAllPostsHTML = post.map(createSinglePostHTML)

  return CreateAllPostsHTML.join('')
}

function createPost (postObject) {
  console.log('~~~~~~~~~~', postObject)
  return db.raw('INSERT INTO "Posts" ("postedMessage") VALUES (?)', [
    postObject.postedMessage
  ])
}

// function renderSuccessInfo () {
//   return `
//     <p>Yay u did it.</p>
//     <p><a href="/">Go Back to Homepage</a></p>
//   `
// }

require('./src/local-auth.js')(app)
