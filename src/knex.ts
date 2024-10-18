import knex from 'knex'
import knexConfig from '../knexfile'

export function knexDB() {
  const enviroment = process.env.NODE_ENV || 'development'

  const pg = knex(knexConfig[enviroment])
  return pg
}