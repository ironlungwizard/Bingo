import { Dispatch } from "redux"
import { ActionType } from "../action-types/error.actionTypes"
import { Action } from "../actions/error.actions"

export const errorOn = (errorText: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ERRORON,
            text: errorText
        })
    }
}

export const errorOff = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ERROROFF,     
        })
    }
}
