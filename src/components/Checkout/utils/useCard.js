import React, { useState, useEffect } from 'react'
import maskInput from '@ziro/mask-input'
import { matchCreditCardBrand } from './matchCreditCardBrand'

export const useCard = number => {
	const [brand, setBrand] = useState('')
	const [numberMaskedCard, setNumberMaskedCard] = useState('')
	let numberMaskedInput
	switch (true) {
		case /^amex$/.test(brand):
			numberMaskedInput = number => maskInput(number, '#### ###### #####', true)
			break;
		case /^visa$|^mastercard$/.test(brand):
			numberMaskedInput = number => maskInput(number, '#### #### #### #######', true)
			break;
		default:
			numberMaskedInput = number => maskInput(number, '#### #### #### ####', true)
			break;
	}
	const expiryMasked = expiry => maskInput(expiry, '##/##', true)
	const cvvMasked = cvv => maskInput(cvv, '####', true)
	const cpfMasked = cpf => maskInput(cpf, '###.###.###-##', true)
	useEffect(() => {
		setBrand(matchCreditCardBrand(number.replace(/\s/g, '')))
		setNumberMaskedCard(number.replace(/\s/g, ''))
	}, [number])
	
	return [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked, cpfMasked]
}