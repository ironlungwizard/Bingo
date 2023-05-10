export default  function authInputValidation(Response: any, setEmail: Function, email: string[], setPassword: Function, password: string[]) {
    if (Response) {
        Response.detail.forEach((detail: any) => {
            if (detail.loc[Response.detail[0].loc.length - 1] == 'email') {
                setEmail( [email[0], detail.msg])
            }
            if (detail.loc[Response.detail[0].loc.length - 1] == 'password') {
                setPassword( [password[0], detail.msg])
            }
            if (detail.loc[Response.detail[0].loc.length - 1] == 'body') {
                setPassword( [password[0], detail.msg])
                setEmail( [email[0], detail.msg])
            }
        })

     

    }
}
  