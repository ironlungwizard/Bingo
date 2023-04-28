import { combineReducers } from "redux";
import authReducer from "./authReducer"
import authModalReducer from './authModalReducer'


const reducers = combineReducers({
    auth: authReducer,
    authModal: authModalReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>