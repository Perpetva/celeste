import { bookATable } from '../commonFunctions.js'
import dotenv from 'dotenv'
dotenv.config()

const brunaName = process.env.BRUNA_NAME
const richardName = process.env.RICHARD_NAME
const brunoName = process.env.BRUNO_NAME
const vininame = process.env.VINI_NAME
const maduName = process.env.MADU_NAME
const rosiName = process.env.ROSINA_NAME

const brunaTable = { name: brunaName, number: 98 }
const richardTable = { name: richardName, number: 97 }
const brunoTable = { name: brunoName, number: 93 }
const viniTable = { name: vininame, number: 92 }
const maduTable = { name: maduName, number: 88 }
const rosiTable = { name: rosiName, number: 87 }

export async function tableReservation() {
    const people = [brunaTable, richardTable, brunoTable, viniTable, maduTable, rosiTable]
    const results = []

    for (const person of people) {
        try {
            await bookATable(person)
            results.push({ name: person.name, ok: true })
        } catch (error) {
            console.error(`Falha ao reservar para ${person.name}:`, error?.message || error)
            results.push({ name: person.name, ok: false })
        }
    }

    const success = results.filter((result) => result.ok).length
    const failed = results.length - success
    console.log(`Resumo da execução: ${success} sucesso(s), ${failed} falha(s).`)
}