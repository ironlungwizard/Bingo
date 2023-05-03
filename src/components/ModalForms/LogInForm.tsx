import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { actionCreators } from '../../state';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import loginFetch from '../../fetches/logInFetch';

export default function Modal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { showSingUp , hide} = bindActionCreators(actionCreators, dispatch)
    const { login, logout } = bindActionCreators(actionCreators, dispatch)
    const handleLogIn = async (event: React.MouseEvent<HTMLElement>) => {
        loginFetch(email, password).then(Response => {
            login(Response.id, Response.name)
        })
        hide()  
    };

    return (
        <>
            <Typography variant="h6" component="div">
                Log In
            </Typography >     
            <TextField 
                value={email} 
                fullWidth 
                sx={{ marginTop: 2}} 
                onChange={(e) => setEmail(e.target.value)} 
                label="E-mail" 
                variant="outlined" />
            <TextField 
                value={password} 
                fullWidth 
                sx={{ marginTop: 2 }} 
                onChange={(e) => setPassword(e.target.value)} 
                className="passwordTextfield" 
                label="Password" 
                variant="outlined" 
                type="password"/>
            <Button sx={{ marginTop: 5 }} onClick={handleLogIn} size='large' variant="contained">Log In</Button>
            <Button sx={{ marginTop: 5, marginLeft: 2 }} onClick={showSingUp} variant="text" >I don't have an account yet</Button>
        </> 
    )
}