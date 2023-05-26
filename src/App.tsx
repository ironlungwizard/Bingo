import './App.scss';
import React from 'react';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import { useDispatch } from 'react-redux';
import Modal from "./components/Modal/Modal"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { refreshFetch } from './api/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from './state';
import LandingPage from './pages/LandingPage';
import CreateCardPage from './pages/CreateCardPage';
import InspectCardPage from './pages/InspectCardPage';
import ErrorSnackBar from './components/ErrorSnackBar/ErrorSnackBar';
import EditCardPage from './pages/EditCardPage';
import ProcessGamePage from './pages/ProcessGamePage';

function App() {
const dispatch = useDispatch();
const { login } = bindActionCreators(actionCreators, dispatch)

refreshFetch().then(Response => {
  login(Response.id, Response.isGuest, Response.name)
})

 
  const theme = createTheme({
    palette: {
        mode: 'dark',
      },
  });


  return (
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <BrowserRouter>
              <div className="App"> 
                <Navbar></Navbar>
                <Modal></Modal>
                <ErrorSnackBar></ErrorSnackBar>
                <div className="appContainer">  
                <Routes>
                  <Route  path='/*' element={< LandingPage />}></Route>
                  <Route  path='card/create' element={< CreateCardPage />}></Route>
                  <Route  path='card/:id' element={< InspectCardPage />}></Route>
                  <Route  path='card/game/:id' element={< ProcessGamePage />}></Route>
                  <Route  path='card/edit/:id' element={< EditCardPage />}></Route>
                </Routes>
                </div>
              </div>
          </BrowserRouter>
        </React.StrictMode>
      </ThemeProvider>
  );
}

export default App;
