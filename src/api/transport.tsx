import { infoOn, showLogIn } from "../state/action-creators";
import { ActionType } from "../state/action-types/auth.actionTypes";
import { store } from "./../state/store";

const baseUrl = process.env.REACT_APP_DB_URL;

export function requestDelete(path: string) {
    let response = requestWithRefresh(path, "DELETE");
    const result = response;
    return result;
}

export function requestGet(path: string) {
    let response = requestWithRefresh(path, "GET");
    const result = response;
    return result;
}

export function requestPut(path: string, body: object) {
    let response = requestWithRefresh(path, "PUT", body);
    const result = response;
    return result;
}

export function requestPutRefreshFirst(path: string, body: object) {
    let response = requestWithRefreshFirst(path, "PUT", body);
    const result = response;
    return result;
}

export function requestPost(path: string, body: object) {
    let response = requestWithRefresh(path, "POST", body);
    const result = response;
    return result;
}

export function requestWithRefresh(path: string, type: string, body?: object) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(type, `${baseUrl}${path}`, true);
        xhr.responseType = "json";
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body ? body : ""));
        xhr.onload = function () {
            if (this.status == 403) {
                xhr.open("GET", `${baseUrl}auth/refresh`, true);
                xhr.responseType = "json";
                xhr.withCredentials = true;
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(""));
                xhr.onload = function () {
                    xhr.open(type, `${baseUrl}${path}`, true);
                    xhr.responseType = "json";
                    xhr.withCredentials = true;
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(JSON.stringify(body ? body : ""));
                    xhr.onload = function () {
                        resolve({
                            data: this.response,
                        });
                    };
                };
            } else {
                resolve({
                    data: this.response,
                });
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
            store.dispatch(
                infoOn("Server does not response, please try later.", "error")
            );
        };
        xhr.ontimeout = function () {
            reject(new Error("Network Timeout"));
            store.dispatch(
                infoOn("Server does not response, please try later.", "error")
            );
        };
    });
}

export function requestWithRefreshFirst(
    path: string,
    type: string,
    body?: object
) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `${baseUrl}auth/refresh`, true);
        xhr.responseType = "json";
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(""));
        xhr.onerror = function () {
            reject(new Error("Network Error"));
            store.dispatch(
                infoOn("Server does not response, please try later.", "error")
            );
        };
        xhr.onload = function () {
            if (this.status != 403) {
                resolve({
                    data: this.response,
                });
            } else {
                xhr.open(type, `${baseUrl}${path}`, true);
                xhr.responseType = "json";
                xhr.withCredentials = true;
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(body ? body : ""));
                xhr.onload = function () {
                    if (this.status == 403) {
                        xhr.open("GET", `${baseUrl}auth/refresh`, true);
                        xhr.responseType = "json";
                        xhr.withCredentials = true;
                        xhr.setRequestHeader(
                            "Content-Type",
                            "application/json"
                        );
                        xhr.send(JSON.stringify(""));
                        xhr.onload = function () {
                            xhr.open(type, `${baseUrl}${path}`, true);
                            xhr.responseType = "json";
                            xhr.withCredentials = true;
                            xhr.setRequestHeader(
                                "Content-Type",
                                "application/json"
                            );
                            xhr.send(JSON.stringify(body ? body : ""));
                            xhr.onload = function () {
                                resolve({
                                    data: this.response,
                                });
                            };
                        };
                    } else {
                        resolve({
                            data: this.response,
                        });
                    }
                };
            }
            xhr.onerror = function () {
                reject(new Error("Network Error"));
                store.dispatch(
                    infoOn(
                        "Server does not response, please try later.",
                        "error"
                    )
                );
            };
            xhr.ontimeout = function () {
                reject(new Error("Network Timeout"));
                store.dispatch(
                    infoOn(
                        "Server does not response, please try later.",
                        "error"
                    )
                );
            };
        };
    });
}

export async function transportPOSTold(path: string, body: object) {
    let response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });
    const result = await response.json();
    //console.log('POST', {path})
    return result;
}

export async function transportPUTold(path: string, body: object) {
    let response = await fetch(`${baseUrl}${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
    });
    const result = await response.json();
    //console.log('PUT', {path})
    return result;
}

export async function transportGETold(path: string) {
    let response = await fetch(`${baseUrl}${path}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const result = await response.json();
    //console.log('GET', {path})
    return result;
}

export async function transportDELETEold(path: string) {
    let response = await fetch(`${baseUrl}${path}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const result = await response.json();
    //console.log('DELETE', {path})
    return result;
}
