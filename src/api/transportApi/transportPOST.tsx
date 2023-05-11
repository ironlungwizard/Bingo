export default async function transportPOST(path: string, body: object) {
    let response = await fetch(`http://localhost:8080/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                body
            ),
            credentials: 'include'
          })
          const result = await (response).json();
          console.log('post')
          return result    
}
  