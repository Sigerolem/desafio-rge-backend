import fastify from 'fastify'
import { invoiceParser } from './invoiceParser'

const server = fastify()

server.get('/ping', async (request, reply) => {
  const fatura = await invoiceParser('pdfs/3001116735-02-2024.pdf')

  reply.code(200).send(fatura)
})

const port = parseInt(process.env.PORT || '4000')
const host = process.env.PORT == '4000' ? '0.0.0.0' : '::1'

server.listen({ port, host }, (err, address) => {
  console.log(process.env)
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})