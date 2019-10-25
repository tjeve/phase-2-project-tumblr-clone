const { db } = require('../database.js')

function getAllUsers () {
  return db.raw('SELECT * FROM "Users"')
}

function insertNewUser (userObject) {
  console.log(userObject)
  return db('Users').insert(userObject)
}

function getOneUser (obj) {
  return db('Users').where(obj).limit(1)
}

module.exports = {
  getAllUsers: getAllUsers,
  insertNewUser: insertNewUser,
  getOneUser: getOneUser
}
