const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

const weekdaysShort = [
    'Do',
    'Se',
    'Te',
    'Qu',
    'Qu',
    'Se',
    'Sa'
]

const weekdaysLong = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
]

export const dayPickerProps = {
    locale: 'br',
    months: months,
    weekdaysShort: weekdaysShort,
    weekdaysLong: weekdaysLong,
    disabledDays: [
        { before: new Date() },
        { daysOfWeek: [0, 6] }
    ]
}