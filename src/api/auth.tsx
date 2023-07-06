import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "../state";
import {
    requestGet,
    requestPut,
    requestDelete,
    requestPutRefreshFirst,
    requestPost,
} from "./transport";
import { useDispatch } from "react-redux";

export async function logIn(email: string, password: string) {
    const body = {
        email: email,
        password: password,
    };
    let response = requestPost("auth/login", body);
    const result = await response;
    return result;
}

export async function logOut() {
    const body = {};
    let response = requestPost("auth/logout", body);
    const result = await response;
    return result;
}

// export async function refreshFetch() {
//     let response =  transportGET("auth/refresh")
//     const result = await (response);
//           return result
// }

export async function getAttributesById(ownerId: string) {
    let response = requestGet(`auth/attributes/${ownerId}`);
    const result = await response;
    return result;
}
export async function getAttributes() {
    let response = requestGet(`auth/attributes`);
    const result = await response;
    return result;
}

export async function signUp(name: string, email: string, password: string) {
    const body = {
        name: name,
        email: email,
        password: password,
    };
    let response = requestPut("auth/signup", body);
    const result = await response;
    return result;
}

export async function signUpGuest() {
    const body = {};
    let response = requestPutRefreshFirst("auth/signup-guest", body);
    const result = await response;
    return result;
}
