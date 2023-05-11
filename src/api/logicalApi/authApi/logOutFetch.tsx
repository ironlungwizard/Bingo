import transportPOST from "../../transportApi/transportPOST";
export default async function logOutFetch() {
    const body = {}
    let response =  transportPOST("auth/logout", body)   
    const result = await (response);
          return result
}

  
  