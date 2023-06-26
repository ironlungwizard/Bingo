import { Dispatch } from "redux"
import { ActionType } from "../action-types/info.actionTypes"
import { Action } from "../actions/info.actions"

export const infoOn = (errorText: string, infoType: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.INFOON,
            infoType: infoType,
            text: errorText
        })
    }
}

export const infoOff = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.INFOOFF    
        })
    }
}
