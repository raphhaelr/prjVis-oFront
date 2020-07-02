


export default function parseDate(date) {
    const [day, month, year] = String(date).split('/')

    return new Date(year, month - 1, day)
}


