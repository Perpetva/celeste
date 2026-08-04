import cron from 'node-cron'
import { tableReservation } from './src/middlewares/reservations.js'

async function start() {
    console.log('Iniciando o script hoje (' + new Date().toLocaleString() + ')')
    await tableReservation()
}

cron.schedule('42 0 * * *', async () => {
    try {
        console.log('Execução agendada iniciada em ' + new Date().toLocaleString())
        await start()
    } catch (e) {
        console.error('Erro na execução agendada:', e)
    }
}, {
    timezone: 'America/Sao_Paulo',
})
