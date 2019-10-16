const {db} = require('../database.js')

const getAllPostsQuery = `
    SELECT *
    FROM "Posts"
`

function getAllPosts () {
    return db.raw(getAllPostsQuery)
}

const getOnePostQuery = `
    SELECT *
    FROM "Posts"
    WHERE id = ?`,[id]

function getOnePost () {
    return db.raw('SELECT * FROM "Posts" WHERE id = ?',[id])
}

// function createPost () { ... }