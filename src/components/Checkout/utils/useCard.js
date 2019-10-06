import React, { useState, useEffect } from 'react'
import maskInput from '@ziro/mask-input'
import { matchCreditCardBrand } from './matchCreditCardBrand'

export const useCard = number => {
	const [brand, setBrand] = useState('')
	const [numberMaskedCard, setNumberMaskedCard] = useState('')
	// const [numberMaskedInput, setNumberMaskedInput] = useState('')
	let numberMaskedInput = number => maskInput(number, '#### #### #### ####', true)
	const expiryMasked = expiry => maskInput(expiry, '##/##', true)
	const cvvMasked = cvv => maskInput(cvv, '####', true)
	const cpfMasked = cpf => maskInput(cpf, '###.###.###-##', true)
	useEffect(() => {
		setBrand(matchCreditCardBrand(number.replace(/\s/g, '')))
		setNumberMaskedCard(number.replace(/\s/g, ''))
		if (brand === 'amex')
			numberMaskedInput = number => maskInput(number, '#### ###### #####', true)
		else if (brand === 'visa' || brand === 'mastercard')
			numberMaskedInput = number => maskInput(number, '#### #### #### #######', true)
		else
			numberMaskedInput = number => maskInput(number, '#### #### #### ####', true)
	}, [number])
	
	return [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked, cpfMasked]
}