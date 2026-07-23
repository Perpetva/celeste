export async function nextWeekDay() {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(today)

    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekFormated = nextWeek.toISOString().split('T')[0];

    return nextWeekFormated
}