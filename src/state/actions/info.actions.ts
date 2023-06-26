import { ActionType } from "../action-types/info.actionTypes"

interface ShowInfoAction {
    type: ActionType.INFOON
    text: string
    infoType: string
}

interface HideInfoAction {
    type: ActionType.INFOOFF
}

export type Action = ShowInfoAction | HideInfoAction