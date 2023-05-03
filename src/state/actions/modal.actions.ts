import { ActionType } from "../action-types/modal.actionTypes"

interface ShowLogInAction {
    type: ActionType.SHOW_LOGIN
}

interface ShowSignUpAction {
    type: ActionType.SHOW_SIGNUP
}

interface HideAction {
    type: ActionType.HIDE
}

export type Action = ShowLogInAction | ShowSignUpAction | HideAction;