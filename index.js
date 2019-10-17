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
  return db.raw(`SELECT * FROM "Posts"`)
}

app.get('/', function (req, res) {
  getAllThingsPosted() // The Promise
    .then(function (allPosts) { // When the Promise is received
      console.log(allPosts.rows)
      console.log("Your seed data should show up here") // console log this message
      // res.send(allPosts.rows) // then send back the rows full of data from your database
      res.send(mustache.render(homepageTemplate, { postsHTML: renderPosts(allPosts.rows) })) // Mustache is working! But why is everything undefined?
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

// --------------------------------------------------------------------------
// database Queries and Functions

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

function renderPosts (post) {
  function createSinglePostHTML (postObject) {
    return `<div>
              <h1>${post.id}</h1>
              <img src=${post.postedImage} height="600" width="400">
              <div>${post.userId}</div>
              <img src=${post.userImage} height="20" width="20">
              <p>${post.postedMessage}</p>
            </div>`
  }
  
  let CreateAllPostsHTML = post.map(createSinglePostHTML)

  return CreateAllPostsHTML.join('')
}