import "./App.scss";
import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal/Modal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getAttributes } from "./api/auth";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "./state";
import LandingPage from "./pages/LandingPage";
import CreateCardPage from "./pages/CreateCardPage";
import InspectCardPage from "./pages/InspectCardPage";
import InfoSnackBar from "./components/InfoSnackBar/InfoSnackBar";
import EditCardPage from "./pages/EditCardPage";
import ProcessGameStartPage from "./pages/ProcessGameStartPage";
import ProcessGamePage from "./pages/ProcessGamePage";
import MyCardsPage from "./pages/MyCardsPage";
import MyGamesPage from "./pages/MyGamesPage";
import { RootState } from "./state/reducers";
import { configDotenv } from "dotenv";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box, Typography } from "@mui/material";

function App() {
    const helmetContext = {};
    const dispatch = useDispatch();
    const { login } = bindActionCreators(actionCreators, dispatch);
    const auth = useSelector((state: RootState) => state).auth;

    useMemo(() => {
        getAttributes().then((Response: XMLHttpRequest["response"]) => {
            console.log(Response);
            login(Response.data.id, Response.data.isGuest, Response.data.name);
        });
    }, []);

    const theme = createTheme({
        palette: {
            mode: "dark",
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 626,
                md: 900,
                lg: 1024,
                xl: 1536,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <React.StrictMode>
                <BrowserRouter>
                    <HelmetProvider context={helmetContext}>
                        <div className="App">
                            <Navbar></Navbar>
                            <Modal></Modal>
                            <InfoSnackBar></InfoSnackBar>
                            <div className="appContainer">
                                <Routes>
                                    <Route
                                        path="/*"
                                        element={<LandingPage />}
                                    ></Route>
                                    <Route
                                        path="card/create"
                                        element={<CreateCardPage />}
                                    ></Route>
                                    <Route
                                        path="card/:id"
                                        element={<InspectCardPage />}
                                    ></Route>
                                    <Route
                                        path="card/:id/gamestart"
                                        element={<ProcessGameStartPage />}
                                    ></Route>
                                    <Route
                                        path="game/:id"
                                        element={<ProcessGamePage />}
                                    ></Route>
                                    <Route
                                        path="card/edit/:id"
                                        element={
                                            auth["id"] ? (
                                                <EditCardPage />
                                            ) : (
                                                <LandingPage />
                                            )
                                        }
                                    ></Route>
                                    <Route
                                        path="mycards/:page"
                                        element={
                                            auth["id"] ? (
                                                <MyCardsPage />
                                            ) : (
                                                <LandingPage />
                                            )
                                        }
                                    ></Route>
                                    <Route
                                        path="mygames/:page"
                                        element={
                                            auth["id"] ? (
                                                <MyGamesPage />
                                            ) : (
                                                <LandingPage />
                                            )
                                        }
                                    ></Route>
                                </Routes>
                            </div>
                        </div>
                    </HelmetProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ThemeProvider>
    );
}

export default App;
