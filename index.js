const fs = require('fs')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const port = 3000

const dashboardTemplate = fs.readFileSync('./templates/dashboard.mustache', 'utf8')

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

// HTML Rendering

// function renderUser (user) {
//   return `
//   <div style="border: solid red 1px">
//     <div class="img-container">

//     </div>
//     <li><a href="/cohorts/${user.slug}">${user.name}</a></li>
//   </div>
//   `
// }

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
