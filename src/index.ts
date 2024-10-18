import fastify from 'fastify'
import { invoicesChecker } from './invoiceParser/invoicesChecker'
import dotenv from 'dotenv'

dotenv.config()
const port = parseInt(process.env.PORT || '4000')
const host = process.env.NODE_ENV == 'production' ? '0.0.0.0' : 'localhost'

const server = fastify()
server.get('/ping', async (request, reply) => {
  reply.code(200).send('olá')
})

invoicesChecker()

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})