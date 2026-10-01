import { chromium } from 'playwright'
import { nextWeekDay } from './utils/nextWeekDay.js'
import dotenv from 'dotenv'

dotenv.config()

const login = process.env.LOGIN
const senha = process.env.SENHA

const link = process.env.LINK

export async function bookATable(person) {
    validateEnvironment()

    await runWithRetry(async (attempt) => {
        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })

        const context = await browser.newContext({
            locale: 'pt-BR',
            timezoneId: 'America/Sao_Paulo',
            viewport: { width: 1366, height: 900 },
        })

        const page = await context.newPage()

        try {
            await page.goto(link, { waitUntil: 'domcontentloaded' })

            await page.locator('input[type="email"]').fill(login)
            await page.keyboard.press('Enter')

            await page.locator('input[type="password"]').fill(senha)
            await page.keyboard.press('Enter')

            await page.waitForLoadState('networkidle')

            await page.getByText('EPEvertrade - Rua Paraíso').click()

            await page.getByText('16º AndarEstação de trabalho').click()

            const nextDay = await nextWeekDay()
            await page.waitForLoadState('networkidle')
            await page.getByTestId(`undefined.day_${nextDay}`).click()

            await page.locator('div').filter({ hasText: /^Próximo$/ }).nth(1).click()

            await page.locator(`path:nth-child(${person.number})`).click()

            await page.getByText('Para mim').first().click()
            await page.getByRole('textbox', { name: 'Pesquisar' }).fill(person.name)

            const personOption = page.getByText(person.name, { exact: true }).first()
            await personOption.waitFor({ state: 'visible', timeout: 10000 })
            await personOption.click()

            const initialBodyText = await page.locator('body').innerText()
            await page.locator('div').filter({ hasText: /^Reservar$/ }).first().click()
            await waitForReservationResult(page, person.name, initialBodyText)

            console.log(`Reserva feita para ${person.name} com sucesso! (tentativa ${attempt})`)
        } finally {
            await context.close()
            await browser.close()
        }
    }, 3)
}

async function waitForReservationResult(page, personName, initialBodyText) {
    const confirmation = /reserva (?:realizada|confirmada|criada|efetuada)|reservad[oa] com sucesso|sucesso na reserva/i
    const failure = /erro|falha|indispon[ií]vel|n[aã]o foi poss[ií]vel|j[aá] reservad/i

    await page.waitForFunction(
        ({ initialText, confirmationSource, failureSource }) => {
            const text = document.body.innerText
            const changedText = text.replace(initialText, '')
            return new RegExp(confirmationSource, 'i').test(changedText)
                || new RegExp(failureSource, 'i').test(changedText)
        },
        {
            initialText: initialBodyText,
            confirmationSource: confirmation.source,
            failureSource: failure.source,
        },
        { timeout: 10000 },
    )

    const bodyText = await page.locator('body').innerText()
    const resultText = bodyText.replace(initialBodyText, '')
    if (failure.test(resultText) || !confirmation.test(resultText)) {
        throw new Error(`A aplicação não confirmou a reserva para ${personName}.`)
    }
}

async function runWithRetry(task, maxAttempts = 3) {
    let lastError

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await task(attempt)
            return
        } catch (error) {
            lastError = error
            console.error(`Tentativa ${attempt}/${maxAttempts} falhou:`, error?.message || error)
        }
    }

    throw lastError
}

function validateEnvironment() {
    const missing = []

    if (!login) missing.push('LOGIN')
    if (!senha) missing.push('SENHA')
    if (!link) missing.push('LINK')

    if (missing.length > 0) {
        throw new Error(`Variáveis de ambiente ausentes: ${missing.join(', ')}`)
    }
}
