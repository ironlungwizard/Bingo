import { transportPOST, transportGET, transportPUT, transportDELETE } from "./transport";
import Card from '../interfaces/CardType';

export async function getCardsFetch(limit: number) {
   
    let response =  transportGET(`cards?limit=${limit}`)   
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