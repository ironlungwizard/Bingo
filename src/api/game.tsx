import { transportPOST, transportGET, transportPUT, transportDELETE } from "./transport";
import Card from '../types/CardType';

export async function getCardsFetch(limit: number) {
   
    let response =  transportGET(`cards?limit=${limit}`)   
    const result = await (response);
          return result
}

export async function getMyGamesByCardFetch(cardId: string, userId: string) {
  let response =  transportGET(`games/byCard/${cardId}?userId=${userId}`)   
  const result = await (response);
        return result
}

export async function getCardFetch(id: string) {
   
  let response =  transportGET(`cards/${id}`)   
  const result = await (response);
  if (result.hidden || result.detail)
  {
    return null
  } else {
    return result
  }  
}

export async function getGameFetch(id: string) {
   
  let response =  transportGET(`games/${id}`)   
  const result = await (response);
  if (result.hidden || result.detail)
  {
    return null
  } else {
    return result
  }  
}

export async function startGameFetch(userId: string, cardId: any) {
    const body = {}
    let response =  transportPOST(`games/?userId=${userId}&cardId=${cardId}`, body)   
    const result = await (response);
          return result
}

export async function updateGameFetch(gameId: string, userId: string,  checkedPhrases: number[]) {
  const body = {
    "checkedPhrases": checkedPhrases
      }
  let response =  transportPUT(`games/${gameId}?userId=${userId}`, body)   
  const result = await (response);
        return result
}


export async function createCardFetch(userId: string, card: any, markType: string) {
  const body = {
    "phrases": card.phrases,
    "title": card.title,
    "description": card.description,
    "tags": card.tags,
    "appearance": {
      "backgroundColor": card.backgroundColor,
      "textColor": card.textColor,
      "tilesColor": card.tilesColor,
      "markType": markType
      }
    }
  let response =  transportPOST(`cards/?userId=${userId}`, body)   
  const result = await (response);
        return result
}


export async function updateCardFetch(userId: string, card: any, markType: string, id: string) {
    const body = {
      "phrases": card.phrases,
      "title": card.title,
      "description": card.description,
      "tags": card.tags,
      "appearance": {
        "backgroundColor": card.backgroundColor,
        "textColor": card.textColor,
        "tilesColor": card.tilesColor,
        "markType": markType
        }
      }
    let response =  transportPUT(`cards/${id}?userId=${userId}`, body)   
    const result = await (response);
          return result
}


export async function deleteCardsFetch(id: string, userId: string) {

  let response =  transportDELETE(`cards/${id}?userId=${userId}`)   
  const result = await (response);
        return result
}