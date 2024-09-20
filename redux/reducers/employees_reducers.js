import { FETCHING_EMPLOYEES, FETCHING_EMPLOYEES_SUCCESS, FETCHING_EMPLOYEES_FAILURE, CLEAR_LIST } from '../actions/employees_actions'

const initialState = {
	fetching: false,
	employees: [],
	error: ''
}

export const employees_reducer = (state = initialState, action) => {
	// debugger
	switch(action.type) {
		case FETCHING_EMPLOYEES:
			return {
				...state,
				fetching: true,
				employees: []
			}

		case FETCHING_EMPLOYEES_SUCCESS:
			return {
				...state,
				fetching: false,
				employees: action.payload
			}

		case FETCHING_EMPLOYEES_FAILURE:
			return {
				...state,
				error: action.payload
			}

		case CLEAR_LIST:
			return {
				...state,
				employees: []
			}

		default:
			return state
	}
}