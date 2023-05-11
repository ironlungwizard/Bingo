export default async function transportPUT(path: string, body: object) {
    let response = await fetch(`http://localhost:8080/${path}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                body
            ),
            credentials: 'include'
          })
          const result = await (response).json();
          console.log('put')
          return result    
}
  