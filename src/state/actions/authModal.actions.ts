import { ActionType } from "../action-types/authModal.actionTypes"

interface ShowAction {
    type: ActionType.SHOW
}

interface HideAction {
    type: ActionType.HIDE
}

export type Action = ShowAction | HideAction;