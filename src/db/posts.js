const {db} = require('../database.js')

const getAllPostsQuery = `
    SELECT *
    FROM "Posts"
`

function getAllPosts () {
    return db.raw(getAllPostsQuery)
}

function getOnePost () {
    return db.raw('SELECT * FROM "Posts" WHERE id = ?',[id])
}

// function getAllPostsFromOneUser () { ... }

// function createPost () { ... } 