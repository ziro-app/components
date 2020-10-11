import currencyFormat from '@ziro/currency-format'

const quotient = (dividend, divisor) => currencyFormat(parseInt((dividend/100/divisor).toFixed(2) * 100, 10))

export const installmentCharge = (charge, installments) => quotient(charge, installments)

export const installmentOptions = (charge, maxInstallments) => {
	let options = []
	for (let i = 1; i <= maxInstallments; i++)
		options.push(`${i}x ${quotient(charge, i)} = ${currencyFormat(charge)}`)
	return options
}