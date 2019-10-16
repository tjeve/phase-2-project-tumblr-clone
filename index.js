const fs = require('fs')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const { getAllPosts } = require('./src/db/posts.js')

const port = 3000
console.log(port)
// --------------------------------------------------------------------------
// Express.js Endpoints
const homepageTemplate = fs.readFileSync('./templates/homepage.html', 'utf8')

app.get('/', function (req, res) {
  getAllPosts()
    .then(function (allPosts) {
      // insert templating string here
      res.send()
    })
  app.send(Mustache.render(homePageTemplate, { postListHTML: renderPost(posts) }))

  // app.get('/homepage', function (req, res) {
  //   getAllUsers()
  //     .then(function (allUsers) {
  //       res.send(mustache.render(dashboardTemplate, { usersHTML: renderAllUsers(allUsers)}))
  //     })
  // })

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

  /*
List of Questions:
1. How can I make sure that I am querying my data correctly?
2. How do I make sure my data is being rendered correctly?
3. Why can't I see what's going on on Port 3000?
*/

  // Database Queries
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
      })
  }

  function getAllPosts () {
    return db.raw(getAllPostsQuery)
  }
})
