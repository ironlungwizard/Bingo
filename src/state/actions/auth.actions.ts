import { ActionType } from "../action-types/auth.actionTypes"

interface LogInAction {
    type: ActionType.LOGIN
    id: string
    name: string
}

interface LogOutAction {
    type: ActionType.LOGOUT
}

interface SignUpAction {
    type: ActionType.SIGNUP
}


export type Action = LogInAction | LogOutAction | SignUpAction;