import { useReducer } from 'react'

export const useMachine = initialState => {
	const [uiState, transition] = useReducer((uiState, action) => {
		const machine = {
			idle: { EDIT: 'editing' },
			editing: { SUBMIT: 'submitting', EDIT: 'editing' },
			submitting: { OK: 'success', ERROR: 'error' },
			success: { EDIT: 'editing' },
			error: { SUBMIT: 'submitting', EDIT: 'editing' }
		}
		return machine[uiState][action]
	}, initialState)
	return [uiState, transition]
}