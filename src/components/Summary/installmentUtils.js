import currencyFormat from '@ziro/currency-format'

const quotient = (dividend, divisor) => parseInt((dividend/100/divisor).toFixed(2) * 100, 10)

export const installmentCharge = (charge, installments) => quotient(charge, installments)