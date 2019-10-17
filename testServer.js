const fs = require('fs')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)
const mustache = require('mustache')

const {getAllPosts, getOnePost, getAllPostsFromOneUser } = require('./src/db/posts.js')

const port = 3000
// --------------------------------------------------------------------------
// Express.js Endpoints
const homepageTemplate = fs.readFileSync('./templates/homepage.html', 'utf8')

app.get('/', function (req, res) {
  getAllPosts()
    .then(function (allPosts) {
      // insert templating string here
      res.send(`<h1>Hello World!</h1>`)
      res.send(mustache.render(homepageTemplate, { postListHTML: renderPost(post) })) // Creates the template for Homepage.html
    })

  // app.get('/homepage', function (req, res) {
  //   getAllUsers()
  //     .then(function (allUsers) {
  //       res.send(mustache.render(dashboardTemplate, { usersHTML: renderAllUsers(allUsers)}))
  //     })
  // })
  })
  // GET all users

  app.get('/users', function (request, response, next) {
    getAllUsers()
      .then(function (allUsers) {
        console.log('asdf', allUsers)
        response.send(allUsers.rows)
      })
      .catch(function () {
        response.status(500).send('No Users found')
      })
  })

  // GET all posts
  app.get('/posts', function (request, response, next) {
    getAllPosts()
      .then(function (allPosts) {
        response.send(allPosts.rows)
      })
      .catch(function () {
        response.status(500).send('No Posts found')
      })
  })

  // GET single user

  app.get('/users/:slug', function (req, res) {
    getSingleUser(res.params.slug)
    console.log('wut is slug', slug)
      .then(function (user) {
        console.log('wut is user', user)
        res.send(user.params.slug)
      })
      .catch(function () {
        res.status(500).send('User not available')
      })
  })

  app.listen(port, function () {
    console.log('Listening on port ' + port + ' 👍')
  })

  // --------------------------------------------------------------------------
  // HTML Rendering

  function renderPost (post) {
    return `<div>
    <h1>${post.id}</h1>
    <img src=${post.postedImage} height="200" width="100">
    <img src=${post.userImage} height="7" width="7">
    <div>${post.userId}</div>
    <p>${post.postedMessage}</p>
  </div>`
  }

  function renderAllPosts (allPosts) {
    return allPosts.map(renderPost).join('')
  }

 // --------------------------------------------------------------------------
  const getAllUsersQuery = `
SELECT *
FROM "Users"
`

  const getAllPostsQuery = `
SELECT *
FROM "Posts"
`

function getAllUsers () {
  return db.raw(getAllUsersQuery)
}

function getSingleUser (slug) {
  console.log('wut is slug', slug)
  return db.raw('SELECT * FROM "Users" WHERE "slug" = \'?\'', [slug])
    .then(function (results) {
      if (results.length !== 1) {
        throw null
      } else {
        return results[0]
      }
    })}




    
// ----------Testing, Delete afterward-------------------
const fs = require('fs')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)
const mustache = require('mustache')

const {getAllPosts, getOnePost, getAllPostsFromOneUser } = require('./src/db/posts.js')

const port = 4000
// --------------------------------------------------------------------------
// Express.js Endpoints
const homepageTemplate = fs.readFileSync('./templates/homepage.html', 'utf8')

function getAllThingsPosted() {
  return `SELECT * FROM "Posts"`
}

app.get('/', function (req, res) {
  res.send(getAllThingsPosted())
})


app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})


// --------------------------------------------------------------------------