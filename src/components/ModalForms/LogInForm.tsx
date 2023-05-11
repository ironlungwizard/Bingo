import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { actionCreators } from '../../state';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import loginFetch from '../../api/logicalApi/authApi/logInFetch';
import authInputValidation from '../../validators/authInputValidation';
import {useForm} from 'react-hook-form'

export default function Modal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string[]>(['', ])
    const [password, setPassword] = useState<string[]>(['', ])
    const { showSingUp , hide} = bindActionCreators(actionCreators, dispatch)
    const { login, logout } = bindActionCreators(actionCreators, dispatch)


    const handleLogIn = async (event: React.MouseEvent<HTMLElement>) => {
        loginFetch(email[0], password[0]).then(Response => {
            if (!Response.id) {
                authInputValidation(Response, setEmail, email, setPassword, password)
               
            } else {
                login(Response.id, Response.isGuest,  Response.name)
                hide()
            }
        })
    };

    return (
        <>
            <Typography variant="h6" component="div">
                Log In
            </Typography >     
            <TextField 
                value={email[0]} 
                fullWidth 
                sx={{ marginTop: 2}} 
                onChange={(e) => setEmail([e.target.value])} 
                label="E-mail" 
                error={email[1] != undefined}
                helperText={email[1]}
                variant="outlined" />
            <TextField 
                value={password[0]} 
                fullWidth 
                sx={{ marginTop: 2 }} 
                onChange={(e) => setPassword([e.target.value])} 
                className="passwordTextfield" 
                label="Password" 
                error={password[1] != undefined}
                helperText={password[1]}
                variant="outlined" 
                type="password"/>
            <Button sx={{ marginTop: 5 }} onClick={handleLogIn} size='large' variant="contained">Log In</Button>
            <Button sx={{ marginTop: 5, marginLeft: 2 }} onClick={showSingUp} variant="text" >I don't have an account yet</Button>
        </> 
    )
}