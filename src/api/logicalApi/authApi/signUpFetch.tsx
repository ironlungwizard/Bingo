import transportPUT from "../../transportApi/transportPUT";
export default async function signUpFetch(name: string, email: string, password: string) {
    const body = {
        "name": name,
        "email": email,
        "password": password
    }
    let response =  transportPUT("auth/signup", body)   
    const result = await (response);
          return result
}
  