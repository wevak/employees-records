import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { employees_reducer } from "./reducers/employees_reducers";

const rootReducer = combineReducers({
    employees: employees_reducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));