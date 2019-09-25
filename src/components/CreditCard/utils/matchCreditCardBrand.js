import { brands } from './brands'

export const matchCreditCardBrand = () => {
	const match = brands.filter(brand =>
		!!brand[1].map(pattern => cardNumber.startsWith(pattern)).filter(value => !!value).pop()
	)
	/* matching algorithm conflicts Visa and Elo. In all cases of conflict must return Elo */
	if (match.length > 1 && match[0][1] < match[1][1]) {
		const [[result]] = match.filter(name => name[0] === 'elo')
		return result
	}
	if (match && match.length) {
		const [[result]] = match
		return result
	}
	return ''
}