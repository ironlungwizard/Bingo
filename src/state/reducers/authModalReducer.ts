import { ActionType } from "../action-types/authModal.actionTypes"
import { Action } from "../actions/authModal.actions"

const initialState = {
   isShown: true
};

const AuthReducer = (state = initialState, action: Action) => {
    switch (action.type){
        case ActionType.SHOW:
            return {
                isShown: true
            }
        case ActionType.HIDE:
            return {
                isShown: false
            }
        default:
            return state
    }
}

export default AuthReducer