import transportWrapper from "./transportWrapper";
export default async function loginFetch(email: string, password: string) {
    const body = {
        "email": email,
        "password": password
    }
    let response =  transportWrapper("auth/login", "POST", body)   
    const result = await (response);
          return result
}

  