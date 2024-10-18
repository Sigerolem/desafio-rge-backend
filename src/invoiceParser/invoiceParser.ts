import pdf from 'pdf-parse'
import fs from 'fs'
import { numberMonth } from '../utils'

export type Invoice = {
  n_cliente: string,
  n_instalacao: string,
  mes_referente: number,
  ano_referente: number,
  quant_energia: number,
  valor_energia: number,
  quant_energia_scee: number,
  valor_energia_scee: number,
  quant_energia_gdi: number,
  valor_energia_gdi: number,
  contrib_publica: number,
  file_name: string,
}

export async function invoiceParser(path: string) {
  let invoice = {
    n_cliente: 'string',
    n_instalacao: 'string',
    mes_referente: 0,
    ano_referente: 0,
    quant_energia: 0,
    valor_energia: 0,
    quant_energia_scee: 0,
    valor_energia_scee: 0,
    quant_energia_gdi: 0,
    valor_energia_gdi: 0,
    contrib_publica: 0,
    file_name: 'string',
  } as Invoice
  let dataBuffer = fs.readFileSync(path)

  await pdf(dataBuffer).then(data => {
    const array = data.text.split('\n').map(line => line.trim().replace(/\s+/g, ' '))

    const nClienteIndex = array.findIndex(line => line.includes('DO CLIENTE')) + 1
    const [nCliente, nInstalacao] = array[nClienteIndex].split(' ')

    const mesReferenteIndex = array.findIndex(line => line.includes('Referente a ')) + 1
    const [mesReferenteString, anoReferenteString] = array[mesReferenteIndex].split(' ')[0].split('/')
    const mesReferente = numberMonth(mesReferenteString)
    const anoReferente = parseInt(anoReferenteString)

    const energiaEletrica = array.find(line => line.includes('Energia ElétricakWh'))!.split(' ')
    const energiaEletricaQuant = parseInt(energiaEletrica[2].replace('.', ''))
    const energiaEletricaValor = parseInt(energiaEletrica[4].replace('.', '').replace(',', ''))

    const energiaEletricaScee = array.find(line => line.includes('Energia SCEE'))!.split(' ')
    const energiaEletricaSceeQuant = parseInt(energiaEletricaScee[4].replace('.', ''))
    const energiaEletricaSceeValor = parseInt(energiaEletricaScee[6].replace('.', '').replace(',', ''))

    const energiaEletricaGdI = array.find(line => line.includes('Energia compensada GD'))!.split(' ')
    const energiaEletricaGdIQuant = parseInt(energiaEletricaGdI[4].replace('.', ''))
    const energiaEletricaGdIValor = parseInt(energiaEletricaGdI[6].replace('.', '').replace(',', ''))

    const contribIluminPublica = parseInt(array.find(line => line.includes('Contrib Ilum Publica'))!.split(' ')[4].replace('.', '').replace(',', ''))

    const fileName = path.replace('pdfs/', '')

    invoice = {
      n_cliente: nCliente,
      n_instalacao: nInstalacao,
      mes_referente: mesReferente,
      ano_referente: anoReferente,
      quant_energia: energiaEletricaQuant,
      valor_energia: energiaEletricaValor,
      quant_energia_scee: energiaEletricaSceeQuant,
      valor_energia_scee: energiaEletricaSceeValor,
      quant_energia_gdi: energiaEletricaGdIQuant,
      valor_energia_gdi: energiaEletricaGdIValor,
      contrib_publica: contribIluminPublica,
      file_name: fileName
    }
  })

  fs.rename(`./${path}`, `./pdfs/read/${invoice.file_name}`, (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`${path}, read and archived successfuly`)
  })

  return invoice
}