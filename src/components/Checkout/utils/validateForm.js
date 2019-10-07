export const validateForm = state => {
	const [number, cardholder, expiry, cvv, cpf, installments] = state
	const numberIsValid = number.replace(/\s/g, '').length >= 12
	const cardholderIsValid = !!cardholder
	const expiryIsValid = !!expiry && expiry.length === 5
	const cvvIsValid = !!cvv && cvv.length >= 3
	const cpfIsValid = !!cpf && cpf.length === 14
	const installmentsIsValid = !!installments
	const formIsValid = numberIsValid && cardholderIsValid && expiryIsValid
		&& cvvIsValid && cpfIsValid && installmentsIsValid
	const errors = { numberIsValid, cardholderIsValid, expiryIsValid,
		cvvIsValid, cpfIsValid, installmentsIsValid }
	return [formIsValid, errors]
}