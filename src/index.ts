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
  const PAGINATION_LIMIT = 10

  let page = 1
  const { page: qPage } = request.query as { page?: string }
  if (qPage && parseInt(qPage) > 0) {
    page = parseInt(qPage)
  }
  const offset = (page - 1) * PAGINATION_LIMIT

  try {
    const [{ count }] = await pg('invoices').count('* as count') as { count: number }[]

    if (count == 0) {
      reply.code(204).send('No inoices found')
    }

    const invoices = await pg<Invoice>('invoices').select().limit(PAGINATION_LIMIT).offset(offset)

    reply.code(200).send({
      invoices,
      totalPages: Math.ceil(count / PAGINATION_LIMIT),
      totalItems: count,
      currentPage: page
    })
  } catch (error) {

    reply.code(500).send({ result: 'Erro na requisição', error: error })
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