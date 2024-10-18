import fs from 'node:fs'
import { Invoice, invoiceParser } from './invoiceParser';
import { knexDB } from '../knex';

function getAllInvoicesInFolder(folderPath: string) {
  let teste = fs.readdirSync('../')
  console.log(teste)
  teste = fs.readdirSync('./')
  console.log(teste)
  let filesOnFolder = fs.readdirSync(folderPath)
  const invoicesToExtract = filesOnFolder.filter(file => file.includes('pdf'))

  return invoicesToExtract
}

async function parseAllInvoices(invoicesPaths: string[]) {
  let invoices = [] as Invoice[]

  await Promise.all(invoicesPaths.map(async invoicePdf => {
    const invoice = await invoiceParser(`pdfs/${invoicePdf}`)
    invoices.push(invoice)
  }));

  return invoices
}

export async function invoicesChecker() {
  const invoicesToExtract = getAllInvoicesInFolder('./pdfs')
  const invoices = await parseAllInvoices(invoicesToExtract)
  const pg = knexDB()

  if (invoices.length > 0) {
    const teste = await pg<Invoice>('invoices').insert(invoices).returning('*')
  }

}