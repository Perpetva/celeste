import { bookATable } from '../commonFunctions.js'
import dotenv from 'dotenv'
dotenv.config()

const brunaName = process.env.BRUNA_NAME
const juliaName = process.env.JULIA_NAME
const richardName = process.env.RICHARD_NAME

const brunaTable = { name: brunaName, selector: 'path:nth-child(4)' }
const juliaTable = { name: juliaName, selector: 'path:nth-child(5)' }
const richardTable = { name: richardName, selector: 'path:nth-child(6)' }

export async function tableReservation() {
    await bookATable(richardTable)
    await bookATable(juliaTable)
    await bookATable(brunaTable)
}