// I think this connects everything to the database and use the logging.js module to allow you to console.log everything as it happens
const log = require('./logging.js') // accesses logging module

log.info('Connecting to the database ...')

const dbConfigs = require('../knexfile.js') // accesses knexfile module that specifies the database to use
const environment = process.env.NODE_ENV || 'development'
const config = environment === 'production' ? dbConfigs.production : dbConfigs.development
const db = require('knex')(config)

db.raw('SELECT 1') // Queries the database for data, but why 'SELECT 1'?
  .then(function (result) {
    // When it retrieves the promise, it will log the following message
    log.info('Successfully connected to the database!')
  })
  .catch(function (err) { // If it does not retrieve it (return the promise), then the error message is sent
    console.error(err)
    log.error('Unable to connect to the database!')
  })

// -----------------------------------------------------------------------------
// Public API

module.exports = {
  db: db
}
