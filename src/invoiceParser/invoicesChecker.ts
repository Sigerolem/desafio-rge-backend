import fs from 'node:fs/promises'
import { Invoice, invoiceParser } from './invoiceParser';
import { knexDB } from '../knex';

async function getAllInvoicesInFolder(folderPath: string) {
  let folders = await fs.readdir('./')
  if (!folders.includes('pdfs')) {
    fs.mkdir('./pdfs/read', { recursive: true })
  }

  let filesOnFolder = await fs.readdir(folderPath)
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
  const invoicesToExtract = await getAllInvoicesInFolder('./pdfs')
  const invoices = await parseAllInvoices(invoicesToExtract)
  const pg = knexDB()

  if (invoices.length > 0) {
    const teste = await pg<Invoice>('invoices').insert(invoices).returning('*')
  }

}