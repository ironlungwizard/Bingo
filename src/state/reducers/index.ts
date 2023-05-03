import { combineReducers } from "redux";
import authReducer from "./authReducer"
import modalReducer from './modalReducer'


const reducers = combineReducers({
    modal: modalReducer,
    auth: authReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>