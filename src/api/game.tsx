import {
    requestGet,
    requestPut,
    requestDelete,
    requestPutRefreshFirst,
    requestPost,
} from "./transport";

export async function getMyCards(userId: string) {
    let response = requestGet(`cards/myCards?userId=${userId}`);
    const result = await response;
    return result;
}

export async function getMyGames(userId: string) {
    let response = requestGet(`cards/myGames?userId=${userId}`);
    const result = await response;
    return result;
}

export async function getCards(limit: number, tags?: string[]) {
    if (tags!.length >= 1) {
        let response = requestGet(
            `cards?tags=${tags!.join("&tags=")}&?limit=${limit}`
        );
        const result = await response;
        return result;
    } else {
        let response = requestGet(`cards?limit=${limit}`);
        const result = await response;
        return result;
    }
}

export async function getMyGamesByCard(cardId: string, userId: string) {
    let response = requestGet(`games/byCard/${cardId}?userId=${userId}`);
    const result = await response;
    return result;
}

export async function canEditCard(cardId: string) {
    let response = requestGet(`cards/${cardId}/canEdit`);
    const result = await response;
    return result;
}

export async function canShareGame(gamedId: string) {
    let response = requestGet(`games/${gamedId}/canShare`);
    const result = await response;
    return result;
}
export async function canShareCard(cardId: string) {
    let response = requestGet(`cards/${cardId}/canShare`);
    const result = await response;
    return result;
}

export async function getCard(id: string) {
    let response = requestGet(`cards/${id}`);
    const result: any = await response;
    if (result.data.hidden || result.data.hidden) {
        return null;
    } else {
        return result;
    }
}

export async function getGame(id: string) {
    let response = requestGet(`games/${id}`);
    const result: any = await response;
    if (result.data.hidden || result.data.hidden) {
        return null;
    } else {
        return result;
    }
}

export async function getTags(tags?: string[]) {
    if (tags!.length >= 1) {
        let response = requestGet(`cards/tags?tags=${tags!.join("&tags=")}`);
        const result: any = await response;
        return result;
    } else {
        let response = requestGet(`cards/tags`);
        const result: any = await response;
        return result;
    }
}

export async function startGame(userId: string, cardId: any) {
    const body = {};
    let response = requestPost(
        `games/?userId=${userId}&cardId=${cardId}`,
        body
    );
    const result = await response;
    return result;
}

export async function cloneCard(userId: string, cardId: any) {
    const body = {};
    let response = requestPost(`cards/${cardId}/clone?userId=${userId}`, body);
    const result = await response;
    return result;
}

export async function updateGame(
    gameId: string,
    userId: string,
    checkedPhrases: number[]
) {
    const body = {
        checkedPhrases: checkedPhrases,
    };
    let response = requestPut(`games/${gameId}?userId=${userId}`, body);
    const result = await response;
    return result;
}

export async function createCard(userId: string, card: any, markType: string) {
    const body = {
        phrases: card.phrases,
        title: card.title,
        description: card.description,
        tags: card.tags,
        appearance: {
            backgroundColor: card.backgroundColor,
            textColor: card.textColor,
            tilesColor: card.tilesColor,
            markColor: card.markColor,
            fontSizes: card.fontSizes,
        },
    };
    let response = requestPost(`cards/?userId=${userId}`, body);
    const result = await response;
    return result;
}

export async function updateCard(
    userId: string,
    card: any,
    markType: string,
    id: string
) {
    const body = {
        phrases: card.phrases,
        title: card.title,
        description: card.description,
        tags: card.tags,
        appearance: {
            backgroundColor: card.backgroundColor,
            textColor: card.textColor,
            tilesColor: card.tilesColor,
            markColor: card.markColor,
            fontSizes: card.fontSizes,
        },
    };
    let response = requestPut(`cards/${id}?userId=${userId}`, body);
    const result = await response;
    return result;
}

export async function deleteCards(id: string, userId: string) {
    let response = requestDelete(`cards/${id}?userId=${userId}`);
    const result = await response;
    return result;
}
