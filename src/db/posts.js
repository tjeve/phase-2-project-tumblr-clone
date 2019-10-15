const {db} = require('../database.js')

const getAllPostsQuery = `
    SELECT *
    FROM Posts
`
function getAllPosts () {
    return db.raw(getAllPostsQuery)
}

// function getOnePost () { ... }

// function createPost () { ... }