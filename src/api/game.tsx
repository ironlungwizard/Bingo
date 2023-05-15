import { transportPOST, transportGET, transportPUT } from "./transport";


export async function getCardsFetch(limit: number) {
   
    let response =  transportGET(`auth/cards?limit=${limit}`)   
    const result = await (response);
          return result
}

export async function createCardFetch(userId: string, phrases: string[], title: string, 
    description: string, tags: string[], outlineColor: string, textColor: string, backgroundColor: string, markType: string) {
    const body = {
        "phrases": phrases,
        "title": title,
        "description": description,
        "tags": tags,
        "outlineColor": outlineColor,
        "textColor": textColor,
        "backgroundColor": backgroundColor,
        "markType": markType
      }
    let response =  transportPOST(`auth/cards/${userId}`, body)   
    const result = await (response);
          return result
}