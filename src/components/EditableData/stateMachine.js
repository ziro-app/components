import { useReducer } from 'react'

export const useMachine = initialState => {
	const [uiState, transition] = useReducer((uiState, action) => {
		const machine = {
			idle: { EDIT: 'editing', ERROR: 'error' },
			editing: { SUBMIT: 'submitting', EDIT: 'editing', ERROR: 'error' },
			submitting: { OK: 'success', ERROR: 'error' },
			success: { EDIT: 'editing' },
			error: { SUBMIT: 'submitting', EDIT: 'editing', ERROR: 'error' }
		}
		return machine[uiState][action]
	}, initialState)
	return [uiState, transition]
}