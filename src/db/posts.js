const { db } = require('../database.js')

function getAllPosts () {
  return db.raw(`SELECT * FROM "Posts"`)
}

// function getOnePost () {
//   return db.raw('SELECT * FROM "Posts" WHERE id = ?', [id])
// }

// function getAllPostsFromOneUser () { ... }

// function createPost () { ... }
