import { Dispatch } from "redux"
import { ActionType } from "../action-types/authModal.actionTypes"
import { Action } from "../actions/authModal.actions"

export const show = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHOW
        })
    }
}

export const hide = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.HIDE,     
        })
    }
}
