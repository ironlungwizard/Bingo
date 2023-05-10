import { ActionType } from "../action-types/auth.actionTypes"

interface LogInAction {
    type: ActionType.LOGIN
    id: string
    isGuest: boolean
    name: string
}

interface LogOutAction {
    type: ActionType.LOGOUT
    id: string
    isGuest: boolean
    name: string
}

interface SignUpAction {
    type: ActionType.SIGNUP
}


export type Action = LogInAction | LogOutAction | SignUpAction;