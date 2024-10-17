import fastify from 'fastify'
import { Fatura, invoiceParser } from './invoiceParser'
import fs from 'fs'

const server = fastify()

let faturas = [] as Fatura[]
function getAllInvoicesInFolder(folderPath: string) {

  let invoicesToExtract = fs.readdirSync(folderPath)
  return invoicesToExtract
}

async function saveAllInvoices() {
  const invoicesToExtract = getAllInvoicesInFolder('pdfs')

  await Promise.all(invoicesToExtract.map(async invoice => {
    const fatura = await invoiceParser(`pdfs/${invoice}`)
    faturas.push(fatura)
  }));
}

saveAllInvoices()

server.get('/ping', async (request, reply) => {

  reply.code(200).send(faturas)
})

const port = parseInt(process.env.PORT || '4000')
const host = process.env.NODE_ENV == 'production' ? '0.0.0.0' : 'localhost'

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})