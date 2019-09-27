import React, { useState, useEffect } from 'react'
import { matchCreditCardBrand } from './matchCreditCardBrand'

export const useBrand = number => {
	const [brand, setBrand] = useState('')
	useEffect(() => {
		setBrand(matchCreditCardBrand(number))	
	}, [number])
	
	return [brand]
}