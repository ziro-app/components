export const installmentOptions = (charge, maxInstallments) => {
	let options = []
	for (let i = 1; i <= maxInstallments; i++)
		options.push(`${i}x ${parseFloat(parseFloat(charge).toFixed(2)/i).toFixed(2)} = ${charge}`)
	return options
}