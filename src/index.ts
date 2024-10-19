import fastify from 'fastify'
import { invoicesChecker } from './invoiceParser/invoicesChecker'
import dotenv from 'dotenv'
import { knexDB } from './knex'
import { Invoice } from './invoiceParser/invoiceParser'

dotenv.config()
const port = parseInt(process.env.PORT || '4000')
const host = process.env.NODE_ENV == 'production' ? '0.0.0.0' : 'localhost'

const server = fastify()
server.get('/ping', async (request, reply) => {
  reply.code(200).send('pong')
})

server.get('/invoices', async (request, reply) => {
  const pg = knexDB()

  try {
    const invoices = await pg().select().from('invoices')
    reply.code(200).send(invoices)

  } catch (error) {

    reply.code(300).send('Erro na requisição')
  }
})

invoicesChecker()

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})