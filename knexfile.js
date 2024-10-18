/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: '5432',
      user: 'admin',
      password: process.env.DB_PASSWORD || '',
      database: 'rge',
    },
    migrations: {
      directory: './db/migrations'
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,  // Render.com fornece o DATABASE_URL
    migrations: {
      directory: './db/migrations'
    },
  }
}


