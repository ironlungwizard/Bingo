import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { actionCreators } from '../../state';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import signUpFetch from '../../fetches/signUpFetch';
import { useState } from 'react';

export default function Modal() {
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch();
    const { showLogIn, hide } = bindActionCreators(actionCreators, dispatch)
    const { login, logout } = bindActionCreators(actionCreators, dispatch)
    const handleSignUp = async (event: React.MouseEvent<HTMLElement>) => {
        signUpFetch(nickname, email, password).then(Response => {
            login(Response.id, Response.name)
        })
        hide()
    };

    return (
        <>
            <Typography variant="h6" component="div">
                Sign Up
            </Typography >     
            <TextField 
                value={nickname} 
                fullWidth 
                sx={{ marginTop: 5 }} 
                onChange={(e) => setNickname(e.target.value)} 
                className="nicknameTextfield" 
                label="Nickname" 
                variant="outlined" />
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
            <TextField 
                value={confirmPassword} 
                fullWidth 
                sx={{ marginTop: 2 }} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="passwordTextfield" 
                label="Confirm Password" 
                variant="outlined" 
                type="password"/>
            <Button sx={{ marginTop: 5 }} onClick={handleSignUp} size='large' variant="contained">Sign Up</Button>
            <Button sx={{ marginTop: 5, marginLeft: 2 }} onClick={showLogIn} variant="text" >I do have an account</Button>
        </> 
    )
}