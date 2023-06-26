import { combineReducers } from "redux";
import authReducer from "./authReducer"
import modalReducer from './modalReducer'
import infoReducer from './infoReducer'


const reducers = combineReducers({
    info: infoReducer,
    modal: modalReducer,
    auth: authReducer,
    
})

export default reducers

export type RootState = ReturnType<typeof reducers>