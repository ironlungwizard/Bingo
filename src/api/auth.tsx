
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "../state";
import { transportPOST, transportGET, transportPUT } from "./transport";
import { useDispatch } from "react-redux";



export async function logInFetch(email: string, password: string) {
    const body = {
        "email": email,
        "password": password
    }
    let response =  transportPOST("auth/login", body)   
    const result = await (response);
          return result
}

export async function logOutFetch() {
    const body = {}
    let response =  transportPOST("auth/logout", body)   
    const result = await (response);
          return result
}

// export async function refreshFetch() {
//     let response =  transportGET("auth/refresh")   
//     const result = await (response);
//           return result
// }

export async function getAttributesById(ownerId: string) {
    let response =  transportGET(`auth/attributes/${ownerId}`)   
    const result = await (response);
          return result
}
export async function getAttributes() {
    let response =  transportGET(`auth/attributes`)   
    const result = await (response);
          return result
}
  
export async function signUpFetch(name: string, email: string, password: string) {
    const body = {
        "name": name,
        "email": email,
        "password": password
    }
    let response =  transportPUT("auth/signup", body)   
    const result = await (response);
          return result
}

export async function signUpGuestFetch() {
    const body = {}
    let response =  transportPUT("auth/signup-guest", body)   
    const result = await (response);
          return result
}
  
  