export default async function loginFetch(email: string, password: string) {

    let response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            ),
            credentials: 'include'
          })
          const result = await (response).json();
          return result
         
}
  