import { bookATable } from '../commonFunctions.js'
import dotenv from 'dotenv'
dotenv.config()

const brunaName = process.env.BRUNA_NAME
const juliaName = process.env.JULIA_NAME
const richardName = process.env.RICHARD_NAME

const brunaTable = { name: brunaName, number: 56 }
const juliaTable = { name: juliaName, number: 55 }
const richardTable = { name: richardName, number: 54 }

export async function tableReservation() {
    const people = [brunaTable, juliaTable, richardTable]
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