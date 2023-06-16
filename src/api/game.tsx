import { transportGET, transportPUT, transportDELETE, transportPOST} from "./transport";

export async function getMyCardsFetch(userId: string) {
    let response =  transportGET(`cards/myCards?userId=${userId}`)   
    const result = await (response);
          return result
}

export async function getMyGamesFetch(userId: string) {
  let response =  transportGET(`cards/myGames?userId=${userId}`)   
  const result = await (response);
        return result
}

export async function getCardsFetch(limit: number, tags?: string[]) {
  if (tags!.length >= 1) {
    let response =  transportGET(`cards?tags=${tags!.join('&tags=')}&?limit=${limit}`) 
    const result = await (response);
    return result 
  } else {
    let response =  transportGET(`cards?limit=${limit}`) 
    const result = await (response);
    return result 
  } 
}

export async function getMyGamesByCardFetch(cardId: string, userId: string) {
  let response =  transportGET(`games/byCard/${cardId}?userId=${userId}`)   
  const result = await (response);
        return result
}


export async function canEditCardFetch(cardId: string) {
  let response =  transportGET(`cards/${cardId}/canEdit`)   
  const result = await (response);
        return result
}

export async function canShareGameFetch(gamedId: string) {
  let response =  transportGET(`games/${gamedId}/canShare`)   
  const result = await (response);
        return result
}
export async function canShareCardFetch(cardId: string) {
  let response =  transportGET(`cards/${cardId}/canShare`)   
  const result = await (response);
        return result
}

export async function getCardFetch(id: string) {
   
  let response =  transportGET(`cards/${id}`)   
  const result: any = await (response);
  if (result.data.hidden || result.data.hidden)
  {
    return null
  } else {
    return result
  }  
}

export async function getGameFetch(id: string) {
   
  let response =  transportGET(`games/${id}`)   
  const result: any = await (response);
  if (result.data.hidden || result.data.hidden)
  {
    return null
  } else {
    return result
  }  
}

export async function getTagsFetch(tags?: string[]) {
  if (tags!.length >= 1) {
    let response =  transportGET(`cards/tags/?tags=${tags!.join('&tags=')}`) 
    const result: any = await (response);
    return result
  } else {
    let response =  transportGET(`cards/tags`)
    const result: any = await (response);
    return result 
  }
}




export async function startGameFetch(userId: string, cardId: any) {
    const body = {}
    let response =  transportPOST(`games/?userId=${userId}&cardId=${cardId}`, body)   
    const result = await (response);
          return result
}

export async function cloneCardFetch(userId: string, cardId: any) {
  const body = {}
  let response =  transportPOST(`cards/${cardId}/clone?userId=${userId}`, body)   
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
      "markColor": card.markColor,
      "fontSizes": card.fontSizes
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
        "markColor": card.markColor,
        "fontSizes": card.fontSizes
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