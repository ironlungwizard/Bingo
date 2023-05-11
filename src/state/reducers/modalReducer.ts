import { ActionType } from "../action-types/modal.actionTypes"
import { Action } from "../actions/modal.actions"

const initialState = {
   isShown: false,
   type: ''
};

const ModalReducer = (state = initialState, action: Action) => {
    switch (action.type){
        case ActionType.SHOW_LOGIN:
            return {
                isShown: true,
                type: 'LOGIN'
            }
        case ActionType.SHOW_SIGNUP:
            return {
                isShown: true,
                type: 'SIGNUP'
            }
        case ActionType.HIDE:
            return {
                isShown: false,
                type: state.type
            }
        default:
            return state
    }
}

export default ModalReducer