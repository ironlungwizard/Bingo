import transportGET from "../../transportApi/transportGET";
export default async function refreshFetch() {
    let response =  transportGET("auth/refresh")   
    const result = await (response);
          return result
}
  