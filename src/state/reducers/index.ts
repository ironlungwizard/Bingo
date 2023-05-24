import { combineReducers } from "redux";
import authReducer from "./authReducer"
import modalReducer from './modalReducer'
import errorReducer from './errorReducer'


const reducers = combineReducers({
    error: errorReducer,
    modal: modalReducer,
    auth: authReducer,
    
})

export default reducers

export type RootState = ReturnType<typeof reducers>