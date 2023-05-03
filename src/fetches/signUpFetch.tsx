import loginFetch from "./logInFetch";

export default async function signUpFetch(name: string, email: string, password: string) {
    let response = await fetch("http://localhost:8080/auth/signup", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "name": name,
                    "email": email,
                    "password": password
                }
            ),
            credentials: 'same-origin'
          })
         
          const result = await (response).json();
          loginFetch(email, password)
          return result
          
}
  