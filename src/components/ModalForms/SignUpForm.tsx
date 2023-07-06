import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { actionCreators } from "../../state";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { signUp } from "../../api/auth";
import { useState } from "react";
import authServerValidation from "../../validators/authServerValidation";
import authFrontValidation from "../../validators/authFrontValidation";
import PasswordReqPopup from "../PasswordReqPopup/PasswordReqPopup";

export default function SignUpForm() {
    const [nickname, setNickname] = useState<string[]>([""]);
    const [email, setEmail] = useState<string[]>([""]);
    const [password, setPassword] = useState<string[]>([""]);
    const [confirmPassword, setConfirmPassword] = useState<string[]>([""]);
    const dispatch = useDispatch();
    const { infoOn, showLogIn, hide } = bindActionCreators(
        actionCreators,
        dispatch
    );
    const { login } = bindActionCreators(actionCreators, dispatch);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !authFrontValidation(
                setPassword,
                password,
                email,
                setEmail,
                confirmPassword,
                setConfirmPassword,
                nickname,
                setNickname
            )
        ) {
        } else {
            signUp(nickname[0], email[0], password[0]).then(
                (Response: XMLHttpRequest["response"]) => {
                    if (!Response.data.id) {
                        authServerValidation(
                            Response.data,
                            setEmail,
                            email,
                            setPassword,
                            password,
                            nickname,
                            setNickname
                        );
                    } else {
                        login(
                            Response.data.id,
                            Response.data.isGuest,
                            Response.data.name
                        );
                        hide();
                        infoOn(
                            `You signed up as ${Response.data.name}!`,
                            "success"
                        );
                    }
                }
            );
        }
    };

    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 5 }} component="div">
                Sign Up
            </Typography>
            <form onSubmit={handleSignUp}>
                <div className="textFieldWrapper">
                    <TextField
                        value={nickname[0]}
                        fullWidth
                        onChange={(e) => setNickname([e.target.value])}
                        error={nickname[1] != undefined}
                        helperText={nickname[1]}
                        className="nicknameTextfield"
                        label="Nickname"
                        title={"Textfield for nickname"}
                        variant="outlined"
                    />
                </div>
                <div className="textFieldWrapper">
                    <TextField
                        value={email[0]}
                        fullWidth
                        onChange={(e) => setEmail([e.target.value])}
                        error={email[1] != undefined}
                        helperText={email[1]}
                        title={"Textfield for email"}
                        label="E-mail"
                        variant="outlined"
                    />
                </div>
                <div className="textFieldWrapper">
                    <TextField
                        value={password[0]}
                        fullWidth
                        onChange={(e) => setPassword([e.target.value])}
                        error={password[1] != undefined}
                        helperText={password[1]}
                        className="passwordTextfield"
                        title={"Textfield for password"}
                        label="Password"
                        variant="outlined"
                        type="password"
                    />
                    <PasswordReqPopup />
                </div>
                <div className="textFieldWrapper">
                    <TextField
                        value={confirmPassword[0]}
                        fullWidth
                        onChange={(e) => setConfirmPassword([e.target.value])}
                        error={confirmPassword[1] != undefined}
                        helperText={confirmPassword[1]}
                        className="passwordTextfield"
                        label="Confirm Password"
                        title={"Textfield for password"}
                        variant="outlined"
                        type="password"
                    />
                </div>
                <Button
                    title={"Sign Up"}
                    type="submit"
                    sx={{ marginTop: 2 }}
                    onClick={handleSignUp}
                    size="large"
                    variant="contained"
                >
                    Sign Up
                </Button>
                <Button
                    title={"Go to Log In"}
                    sx={{ marginTop: 2, marginLeft: 2 }}
                    onClick={showLogIn}
                    variant="text"
                >
                    I do have an account
                </Button>
            </form>
        </>
    );
}
