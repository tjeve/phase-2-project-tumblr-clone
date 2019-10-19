const { db } = require('../database.js')

function getAllUsers () {
  return db.raw('SELECT * FROM "Users"')
}

function insertNewUser (userObject) {
  console.log(userObject)
  return db('Users').insert(userObject)
}

module.exports = {
  getAllUsers: getAllUsers,
  insertNewUser: insertNewUser
}
