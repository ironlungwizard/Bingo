import { Dispatch } from "redux"
import { ActionType } from "../action-types/auth.actionTypes"
import { Action } from "../actions/auth.actions"

export const login = (id: string, name: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGIN,
            id: id, 
            name: name
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

export const signup = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SIGNUP,     
        })
    }
}
