export async function nextWeekDay() {
    // Usa meio-dia para evitar efeitos de fuso/DST ao somar dias no servidor.
    const now = new Date()
    const base = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        12,
        0,
        0,
        0,
    )

    base.setDate(base.getDate() + 7)

    const year = base.getFullYear()
    const month = String(base.getMonth() + 1).padStart(2, '0')
    const day = String(base.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}