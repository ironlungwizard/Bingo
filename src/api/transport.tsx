export async function transportPUT(path: string, body: object) {
    let response = await fetch(`http://localhost:8080/${path}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                body
            ),
            credentials: 'include'
          })
          const result = await (response).json();
          console.log('put', {path})
          return result    
}

export async function transportPOST(path: string, body: object) {
    let response = await fetch(`http://localhost:8080/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                body
            ),
            credentials: 'include'
          })
          const result = await (response).json();
          console.log('post', {path})
          return result    
}
  

export async function transportGET(path: string) {
    let response = await fetch(`http://localhost:8080/${path}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          })
          const result = await (response).json();
          console.log('get', {path})
          return result    
}

export async function transportDELETE(path: string) {
    let response = await fetch(`http://localhost:8080/${path}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          })
          const result = await (response).json();
          console.log('delete', {path})
          return result    
}
  
  
  