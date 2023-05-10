export default async function refreshFetch() {
    let response = await fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          })
          const result = await (response).json();
          return result    
}
  