// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost:5432',
      user: 'admin',
      password: process.env.DB_PASSWORD,
      database: 'rge-db'
    },
    migrations: {
      directory: './db/migrations'
    },
    // seeds: {
    //   directory: './db/seeds'
    // }
  },
  production: {
    client: 'pg',
    // connection: process.env.DATABASE_URL,  // Render.com fornece o DATABASE_URL em produção
    connection: {
      host: '0.0.0.0:5432',
      user: 'admin',
      password: process.env.DB_PASSWORD,
      database: 'rge-db'
    },
    migrations: {
      directory: './db/migrations'
    },
    // seeds: {
    //   directory: './db/seeds'
    // }

  }
}
