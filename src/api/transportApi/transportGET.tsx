export default async function transportGET(path: string) {
    let response = await fetch(`http://localhost:8080/${path}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          })
          const result = await (response).json();
          console.log('get')
          return result    
}
  