import { bookATable } from '../commonFunctions.js'
import dotenv from 'dotenv'
dotenv.config()

const brunaName = process.env.BRUNA_NAME
const richardName = process.env.RICHARD_NAME
const brunoName = process.env.BRUNO_NAME
const viniName = process.env.VINI_NAME
const rosiName = process.env.ROSI_NAME
const gabrielName = process.env.GABRIEL_NAME
const diogoName = process.env.DIOGO_NAME
const virginiaName = process.env.VIRGINIA_NAME
const maduName = process.env.MADU_NAME

const brunaTable = { name: brunaName, number: 95 }
const richardTable = { name: richardName, number: 94 }
const brunoTable = { name: brunoName, number: 96 }
const viniTable = { name: viniName, number: 91 }
const rosiTable = { name: rosiName, number: 90 }
const gabrielTable = { name: gabrielName, number: 101 }
const diogoTable = { name: diogoName, number: 99 }
const virginiaTable = { name: virginiaName, number: 100 }
const maduTable = { name: maduName, number: 89 }

export async function tableReservation() {
    const people = [brunaTable, richardTable, brunoTable, viniTable, rosiTable, gabrielTable, diogoTable, virginiaTable, maduTable]
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