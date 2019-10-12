export const validateForm = validations => {
	let fieldsAreValid = []
	let errorMessages = {}
	for (let i = 0; i < validations.length; i++) {
		let state = validations[i]
		let fieldIsValid = state.validation(state.value)
		fieldsAreValid.push(fieldIsValid)
		errorMessages[state.name] = fieldIsValid ?  '' : state.message
	}
	const formIsValid = fieldsAreValid.every(field => field)
	return [formIsValid, errorMessages]
}