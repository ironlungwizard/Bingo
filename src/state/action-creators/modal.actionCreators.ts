import { Dispatch } from "redux"
import { ActionType } from "../action-types/modal.actionTypes"
import { Action } from "../actions/modal.actions"

export const showSingUp = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHOW_SIGNUP
        })
    }
}

export const showLogIn = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHOW_LOGIN
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
