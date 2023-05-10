export default async function transportWrapper(path: string, method: string, body: object) {
    let response = await fetch(`http://localhost:8080/${path}`, {
            method: `${method}`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                body
            ),
            credentials: 'include'
          })
          const result = await (response).json();
          return result    
}
  