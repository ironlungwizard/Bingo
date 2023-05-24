import { transportPOST, transportGET, transportPUT, transportDELETE } from "./transport";


export async function getCardsFetch(limit: number) {
   
    let response =  transportGET(`cards?limit=${limit}`)   
    const result = await (response);
          return result
}

export async function getCardFetch(id: string) {
   
  let response =  transportGET(`cards/${id}`)   
  const result = await (response);
  if (result.hidden)
  {
    return null
  } else {
    return result
  }  
}

export async function createCardFetch(userId: string, phrases: string[], title: string, 
    description: string, tags: string[], outlineColor: string, textColor: string, backgroundColor: string, markType: string) {
    const body = {
        "phrases": phrases,
        "title": title,
        "description": description,
        "tags": tags,
        "appearance": {
          "outlineColor": outlineColor,
          "textColor": textColor,
          "backgroundColor": backgroundColor,
          "markType": markType
        }
      }
    let response =  transportPOST(`cards/?userId=${userId}`, body)   
    const result = await (response);
          return result
}

export async function deleteCardsFetch(id: string, userId: string) {

  let response =  transportDELETE(`cards/${id}?userId=${userId}`)   
  const result = await (response);
        return result
}