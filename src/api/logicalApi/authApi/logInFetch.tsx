import transportPOST from "../../transportApi/transportPOST";
export default async function logInFetch(email: string, password: string) {
    const body = {
        "email": email,
        "password": password
    }
    let response =  transportPOST("auth/login", body)   
    const result = await (response);
          return result
}

  