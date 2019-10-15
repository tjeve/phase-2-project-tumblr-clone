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
  app.send()
}
)


app.listen(port, function () {
    console.log('Listening on port ' + port + ' 👍')
  })
  
//--------------------------------------------------------------------------  
//HTML Rendering

function renderPost (post) {
  return '<li></li>'
}