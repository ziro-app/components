import currencyFormat from '@ziro/currency-format'

const quotient = (dividend, divisor) => (dividend/100/divisor).toFixed(2)

export const installmentCharge = (charge, installment) => quotient(charge, installment)

export const installmentOptions = (charge, maxInstallments) => {
	let options = []
	for (let i = 1; i <= maxInstallments; i++)
		options.push(`${i}x ${currencyFormat(parseInt(quotient(charge, i) * 100),10)} = ${currencyFormat(charge)}`)
	return options
}