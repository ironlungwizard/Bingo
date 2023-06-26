import { ActionType } from "../action-types/info.actionTypes"
import { Action } from "../actions/info.actions"

const initialState = {
    isShown: false,
    text: '',
    infoType: ''
};

const InfoReducer = (state = initialState, action: Action) => {
    switch (action.type){
        case ActionType.INFOON:
            return {
                isShown: true,
                text: action.text,
                infoType: action.infoType
            }
        case ActionType.INFOOFF:
            return {
                isShown: false
            }
        default:
            return state
    }
}

export default InfoReducer