import fastify from 'fastify'
import { invoiceParser } from './invoiceParser'

const server = fastify()

server.get('/ping', async (request, reply) => {
  const fatura = await invoiceParser('pdfs/3001116735-02-2024.pdf')

  reply.code(200).send(fatura)
})

server.listen({ port: 4000, host: '::1' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})