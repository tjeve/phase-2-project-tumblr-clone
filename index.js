const fs = require('fs')
const express = require('express')
const app = express()

const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const{getAllPosts} = require('./src/db/posts.js')

const port = 3000

//--------------------------------------------------------------------------  
// Express.js Endpoints
const hopepageTemplate=  fs.readFileSync('.templates.hompage.html', 'utf8')

app.get('/', function(req, res) {
  getAllPosts()
    .then(function(allPosts) {
      //insert templating string here
      res.send()
    })
  app.send(Mustache.render(homePageTemplate, {postListHTML: renderAllPosts (allPosts)} ))
})


app.listen(port, function () {
    console.log('Listening on port ' + port + ' 👍')
  })
  
//--------------------------------------------------------------------------  
//HTML Rendering

function renderPost (post) {
  return `<div>
    <h1>${post.userId}</h1>
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