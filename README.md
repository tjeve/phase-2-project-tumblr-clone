# Phase-2-Project-tumblr-clone

This is a backend project that utilizes backend and database technologies such as Express, Knex, and Postgres to make a clone of the popular blogging website Tumblr.

## Technologies Used
| Technology                                                    | Purpose                                                                                                                                                              |
|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Knex.js](http://knexjs.org/)                                 | A "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use |
| [Node.js](https://nodejs.org/en/)                             | Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.                                                                                             |
| [Express](https://expressjs.com/)                             | A node.js web application framework used to develop features for our web application                                                                                 |
| [Passport.js](http://www.passportjs.org/)                     | Passport.js was used to develop a local strategy for authentication.                                                                                                 |
| [Mustache.js](https://mustache.github.io/)                    | Mustache.js is a logic-less templating system we used for creating the HTML for our site.                                                                            |
| [PostgreSQL](https://www.postgresql.org/)                     | PostgreSQL as our database to store data                                                                                                                             |
| [Postico](https://eggerapps.at/postico/)                      | A PostgreSQL client for macbooks                                                                                                                                     |
| [Passport-facebook](http://www.passportjs.org/docs/facebook/) | Passport-facebook was used as a secondary authentication strategy                                                                                                    |
| [Travis CI](https://travis-ci.com/) | Automated testing <img src="https://travis-ci.com/tjeve/phase-2-project-tumblr-clone.svg?branch=master"> |
| [Standard JS](https://standardjs.com/) | Syntax check and test with Travis CI |
| (faker JS)[https://github.com/marak/Faker.js/] | Generate fake data for users and posts |

# Hosting URL

https://digitalcrafts-tumblr-clone.herokuapp.com

# Getting Started

Clone this repository, install the technologies above. 

**Available Scripts**

In the project directory, you can run these scripts in the following order:
`npm install` to install node modules folder, 
`npx knex migrate:latest` to install most recent database schema,
`npx knex seed:run` to initialize database, and
`npm start` to start express.js server on port 4000


## Features

- Ability to search for posts
- Post text and quote post
- Delete posts
- Log in via local authentication and Facebook
- Ability to create your own account

## What We Learned

- Creating tables using migration and seeds 
- Querying data from a database
- Creating templates for html
- User authentication with local and facebook
- Website hosting on heroku with PostgresQL

### Collaborators
* [Sue Park](https://github.com/suepark09)
* [Terrence Eveline](https://github.com/tjeve)
* [Kazue Sasatani](https://github.com/segakazzz)



