import { ActionType } from "../action-types/error.actionTypes"

interface ShowErrorAction {
    type: ActionType.ERRORON
    text: string
}

interface HideErrorAction {
    type: ActionType.ERROROFF
}

export type Action = ShowErrorAction | HideErrorAction