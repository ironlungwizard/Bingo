export default async function refreshFetch() {
    let response = await fetch("http://localhost:8080/auth/refresh", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          })
          const result = await (response).json();
          console.log(result)
          return result    
}
  