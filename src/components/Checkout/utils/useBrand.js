import React, { useState, useEffect } from 'react'
import maskInput from '@ziro/mask-input'
import { matchCreditCardBrand } from './matchCreditCardBrand'

export const useBrand = number => {
	const [brand, setBrand] = useState('')
	const [numberMasked, setNumberMasked] = useState('')
	useEffect(() => {
		setBrand(matchCreditCardBrand(number))
		if (brand === 'amex')
			setNumberMasked(maskInput(number, '#### ###### #####', true))
		else if (brand === 'visa' || brand === 'mastercard')
			setNumberMasked(maskInput(number, '#### #### #### #######', true))
		else
			setNumberMasked(maskInput(number, '#### #### #### ####', true))
	}, [number])
	
	return [brand, numberMasked]
}