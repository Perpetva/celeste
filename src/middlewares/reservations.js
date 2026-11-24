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
const angelicaName = process.env.ANGELICA_NAME
const brunaCintraName = process.env.BRUNA_CINTRA_NAME
const juliaName = process.env.JULIA_NAME
const ronyellioName = process.env.RONYELLIO_NAME
const ricardoName = process.env.RICARDO_NAME

const brunaTable = { name: brunaName, number: 90 }
const richardTable = { name: richardName, number: 89 }
const brunoTable = { name: brunoName, number: 91 }
const viniTable = { name: viniName, number: 96 }
const rosiTable = { name: rosiName, number: 94 }
const gabrielTable = { name: gabrielName, number: 101 }
const diogoTable = { name: diogoName, number: 99 }
const virginiaTable = { name: virginiaName, number: 100 }
const angelicaTable = { name: angelicaName, number: 95 }
const brunaCintraTable = { name: brunaCintraName, number: 92 }
const juliaTable = { name: juliaName, number: 87 }
const ronyellioTable = { name: ronyellioName, number: 88 }
const ricardoTable = { name: ricardoName, number: 93 }

export async function tableReservation() {
    const people = [brunaTable, richardTable, brunoTable, viniTable, angelicaTable, rosiTable, gabrielTable, diogoTable, virginiaTable, brunaCintraTable, juliaTable, ronyellioTable, ricardoTable]
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