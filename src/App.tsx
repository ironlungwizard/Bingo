import './App.scss';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import {store} from "./state"
import { useDispatch, useSelector } from 'react-redux';
import  {RootState}  from './state/reducers';
import Modal from "./components/Modal/Modal"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { refreshFetch } from './api/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from './state';
import { debounce } from "lodash";
import LandingPage from './components/Pages/LandingPage';
import CreateCardPage from './components/Pages/CreateCardPage';

function App() {
const dispatch = useDispatch();
const { login } = bindActionCreators(actionCreators, dispatch)


refreshFetch().then(Response => {
  login(Response.id, Response.isGuest, Response.name)
})
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage></LandingPage>
    },
    {
      path: '/create',
      element: <CreateCardPage></CreateCardPage>
    },
   
  ]);

  const theme = createTheme({
    palette: {
        mode: 'dark',
      },
  });


  return (
 
    <ThemeProvider theme={theme}>
    <div className="App"> 
      <Navbar></Navbar>
      <Modal></Modal>
      <div className="appContainer">  
         <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode> 
  
      </div>
    </div>
    </ThemeProvider>
  
  );
}

export default App;
