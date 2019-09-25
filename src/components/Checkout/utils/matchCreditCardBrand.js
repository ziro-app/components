import { brands } from './brands'

export const matchCreditCardBrand = cardNumber => {
	const match = brands.filter(brand =>
		!!brand[1].map(pattern => cardNumber.startsWith(pattern)).filter(value => !!value).pop()
	)
	/* matching algorithm has pattern conflicts. Resolve each case */
	if (match instanceof Array && match.length > 1) {
		if (match[1][0] === 'hipercard') return 'hipercard'
		if (match[1][0] === 'hiper') return 'hiper'
		if (match[1][0] === 'elo') return 'elo'
	}
	if (match instanceof Array && match.length === 1) {
		const [[result]] = match
		return result
	}
	return ''
}