import { CLEAR_LIST, FETCHING_EMPLOYEES, FETCHING_EMPLOYEES_SUCCESS, FETCHING_EMPLOYEES_FAILURE } from "../actions/employees_actions";

export const fetchingEmployees = () => {
	return  {
		type: FETCHING_EMPLOYEES
	}
}

export const fetchingEmployeesSuccess = (entries) => {
	return  {
		type: FETCHING_EMPLOYEES_SUCCESS,
		payload: entries
	}
}

export const fetchingEmployeesFailure = (error) => {
	return  {
		type: FETCHING_EMPLOYEES_FAILURE,
		payload: error
	}
}

export const employeesFetchAsync = () => {
	return async function(dispatch, getState) {
		dispatch(fetchingEmployees());

		const response = await fetch("https://employees-server-l554.onrender.com/record");

		if(!response.ok) {
			const message = `An error ocurred ${response.statusText}`;
			dispatch(fetchingEmployeesFailure(message));

			return;
		}

		const records = await response.json();
		
		dispatch(fetchingEmployeesSuccess(records));
	}
}

export const clearEmployeesList = () => {
	return  {
		type: CLEAR_LIST,
	}
}
