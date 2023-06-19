export default  function authFrontValidation(setPassword: Function, password: string[], email: string[], setEmail: Function, 
    confirmPassword?: string[], setConfirmPassword?: Function, nickname?: string[], setNickname?: Function) {
    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;

    const uppercasePassword = uppercaseRegExp.test(password[0]);
    const lowercasePassword = lowercaseRegExp.test(password[0]);
    const digitsPassword = digitsRegExp.test(password[0]);
    const minLengthPassword =   password[0].length >= 8;
    if (nickname && setNickname && nickname[0].length < 3)
    {
        setNickname( [nickname[0], "nickname is too short"])
    }
    if (email[0].length < 3)
    {
        setEmail( [email[0], "email is too short"])
    }

    if (!uppercasePassword || !lowercasePassword || !digitsPassword || !minLengthPassword)
    {
        setPassword( [password[0], "password isn't strong enough"])
        return false
    } else if (confirmPassword && setConfirmPassword && password[0] != confirmPassword[0]) {
        setPassword( [password[0], "passwords doesn't match"])
        setConfirmPassword( [confirmPassword[0], "passwords doesn't match"])
        return false
    } else {
        return true
    }


}
  