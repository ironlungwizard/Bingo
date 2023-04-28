import { ActionType } from "../action-types/auth.actionTypes"

interface LoginAction {
    type: ActionType.LOGIN
}

interface LogoutAction {
    type: ActionType.LOGOUT
}

export type Action = LoginAction | LogoutAction;