import React, { useState, useEffect } from 'react'
import maskInput from '@ziro/mask-input'
import { matchCreditCardBrand } from './matchCreditCardBrand'

export const useCard = number => {
	const [brand, setBrand] = useState('')
	const [numberMaskedCard, setNumberMaskedCard] = useState('')
	const [numberMaskedInput, setNumberMaskedInput] = useState('')
	const expiryMasked = expiry => maskInput(expiry, '##/##', true)
	const cvvMasked = cvv => maskInput(cvv, '####', true)
	useEffect(() => {
		setBrand(matchCreditCardBrand(number.replace(/\s/g, '')))
		setNumberMaskedCard(number.replace(/\s/g, ''))
		if (brand === 'amex')
			setNumberMaskedInput(maskInput(number, '#### ###### #####', true))
		else if (brand === 'visa' || brand === 'mastercard')
			setNumberMaskedInput(maskInput(number, '#### #### #### #######', true))
		else
			setNumberMaskedInput(maskInput(number, '#### #### #### ####', true))
	}, [number])
	
	return [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked]
}