import { infoOn } from "../state/action-creators";
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
            if (this.status == 403 || this.status == 404) {
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
            if (this.status != 403 && this.status != 404) {
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
