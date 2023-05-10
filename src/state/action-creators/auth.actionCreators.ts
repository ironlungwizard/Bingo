import { Dispatch } from "redux"
import { ActionType } from "../action-types/auth.actionTypes"
import { Action } from "../actions/auth.actions"

export const login = (id: string, isGuest: boolean, name: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGIN,
            id: id, 
            isGuest: isGuest,
            name: name
        })
    }
}

export const logout = (id: string, isGuest: boolean, name: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGOUT,  
            id: id, 
            isGuest: isGuest,
            name: name   
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
