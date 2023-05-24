import { ActionType } from "../action-types/error.actionTypes"
import { Action } from "../actions/error.actions"

const initialState = {
    isShown: false,
    text: ''
};

const ErrorReducer = (state = initialState, action: Action) => {
    switch (action.type){
        case ActionType.ERRORON:
            return {
                isShown: true,
                text: action.text
            }
        case ActionType.ERROROFF:
            return {
                isShown: false
            }
        default:
            return state
    }
}

export default ErrorReducer