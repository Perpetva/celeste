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
    await bookATable(brunaTable)
    await bookATable(juliaTable)
    await bookATable(richardTable)
}