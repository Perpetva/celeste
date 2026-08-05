import { chromium } from 'playwright'
import { nextWeekDay } from './utils/nextWeekDay.js'
import dotenv from 'dotenv'

dotenv.config()

const login = process.env.LOGIN
const senha = process.env.SENHA

const link = process.env.LINK

const richardTable = 'path:nth-child(6)'

export async function bookATable(person) {
    const browser = await chromium.launch({
        headless: true,
    })

    const page = await browser.newPage()

    await page.goto(link, {
        waitUntil: 'networkidle',
    })

    await page.locator('input[type="email"]').fill(login)
    await page.keyboard.press('Enter')

    await page.locator('input[type="password"]').fill(senha)
    await page.keyboard.press('Enter')

    // espera pro cache
    await page.waitForLoadState('networkidle')

    await page.getByText('EPEvertrade - Rua Paraíso').click()

    await page.getByText('16º AndarEstação de trabalho').click()

    const nextDay = await nextWeekDay()
    await page.getByTestId(`undefined.day_${nextDay}`).click()

    await page.locator('div').filter({ hasText: /^Próximo$/ }).nth(1).click()

    await page.locator(person.selector).click()

    await page.getByText('Para mim').click()
    await page.getByRole('textbox', { name: 'Pesquisar' }).fill(person.name)

    await page.waitForLoadState('networkidle')

    await delay(2000)
    await page.getByText(person.name).click()

    await page.locator('div').filter({ hasText: /^Reservar$/ }).first().click()

    // // inspeção
    // await page.pause()

    await browser.close()
}

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    })
}
