import knex from 'knex'

const config = {
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

export function knexDB() {
  const enviroment = (process.env.NODE_ENV || 'development') as 'development' | 'production'

  const pg = knex(config[enviroment])
  return pg
}