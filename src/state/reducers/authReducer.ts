import { ActionType } from "../action-types/auth.actionTypes"
import { Action } from "../actions/auth.actions"

const initialState = {
    id: undefined,
    isGuest: false,
    name: undefined
};

const AuthReducer = (state = initialState, action: Action) => {
    switch (action.type){
        case ActionType.LOGIN:
            return {
                id: action.id, 
                isGuest: action.isGuest, 
                name: action.name
            }
        case ActionType.LOGOUT:
            return {
                id: action.id, 
                isGuest: action.isGuest, 
                name: action.name
            }
        case ActionType.SIGNUP:    
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