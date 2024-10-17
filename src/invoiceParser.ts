import pdf from 'pdf-parse'
import fs from 'fs'
import { numberMonth } from './utils'

export type Fatura = {
  nInstalacao: string,
  nCliente: string,
  mesReferente: number,
  anoReferente: number,
  energiaEletricaQuant: string,
  energiaEletricaValor: string,
  energiaEletricaSceeQuant: string,
  energiaEletricaSceeValor: string,
  energiaEletricaGdIQuant: string,
  energiaEletricaGdIValor: string,
  contribIluminPublica: string,
  fileName: string
}

export async function invoiceParser(path: string) {
  //pdfs/3001116735-02-2024.pdf
  let dataBuffer = fs.readFileSync(path)

  let fatura = {
    nInstalacao: '',
    nCliente: '',
    mesReferente: 0,
    anoReferente: 0,
    energiaEletricaQuant: '',
    energiaEletricaValor: '',
    energiaEletricaSceeQuant: '',
    energiaEletricaSceeValor: '',
    energiaEletricaGdIQuant: '',
    energiaEletricaGdIValor: '',
    contribIluminPublica: '',
    fileName: ''
  } as Fatura

  await pdf(dataBuffer).then(data => {
    const array = data.text.split('\n').map(line => line.trim().replace(/\s+/g, ' '))

    const nClienteIndex = array.findIndex(line => line.includes('DO CLIENTE')) + 1
    const [nCliente, nInstalacao] = array[nClienteIndex].split(' ')

    const mesReferenteIndex = array.findIndex(line => line.includes('Referente a ')) + 1
    const [mesReferenteString, anoReferenteString] = array[mesReferenteIndex].split(' ')[0].split('/')
    const mesReferente = numberMonth(mesReferenteString)
    const anoReferente = parseInt(anoReferenteString)

    const energiaEletrica = array.find(line => line.includes('Energia ElétricakWh'))!.split(' ')
    const energiaEletricaQuant = energiaEletrica[2]
    const energiaEletricaValor = energiaEletrica[4]

    const energiaEletricaScee = array.find(line => line.includes('Energia SCEE'))!.split(' ')
    const energiaEletricaSceeQuant = energiaEletricaScee[4]
    const energiaEletricaSceeValor = energiaEletricaScee[6]

    const energiaEletricaGdI = array.find(line => line.includes('Energia compensada GD'))!.split(' ')
    const energiaEletricaGdIQuant = energiaEletricaGdI[4]
    const energiaEletricaGdIValor = energiaEletricaGdI[6]

    const contribIluminPublica = array.find(line => line.includes('Contrib Ilum Publica'))!.split(' ')[4]

    fatura = {
      nCliente,
      nInstalacao,
      mesReferente,
      anoReferente,
      energiaEletricaQuant,
      energiaEletricaValor,
      energiaEletricaSceeQuant,
      energiaEletricaSceeValor,
      energiaEletricaGdIQuant,
      energiaEletricaGdIValor,
      contribIluminPublica,
      fileName: path.replace('pdfs/', '')
    }
  })

  return fatura
}