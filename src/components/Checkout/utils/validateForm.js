export const validateForm = state => {
	const [number, cardholder, expiry, cvv, cpf, installments] = state
	const numberIsValid = number.replace(/\s/g, '')
	console.log(numberIsValid)
	const formIsValid = !!numberIsValid
	return formIsValid
}