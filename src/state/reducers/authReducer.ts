import { ActionType } from "../action-types/auth.actionTypes"
import { Action } from "../actions/auth.actions"

const initialState = {
    id: '',
    isGuest: false,
    name: ''
};

const AuthReducer = (state = initialState, action: Action) => {
    switch (action.type){
        case ActionType.LOGIN:
            return {
                id: '1333' , 
                isGuest: false, 
                name: 'priv'
            }
        case ActionType.LOGOUT:
            return {
                id: '' , 
                isGuest: false, 
                name: ''
            }
        default:
            return state
    }
}

export default AuthReducer