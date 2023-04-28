import { Dispatch } from "redux"
import { ActionType } from "../action-types/auth.actionTypes"
import { Action } from "../actions/auth.actions"

export const login = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGIN
        })
    }
}

export const logout = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGOUT,     
        })
    }
}
