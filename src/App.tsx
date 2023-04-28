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
import AuthModal from "./components/AuthModal/AuthModal"
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

  // const router = createBrowserRouter([
  //   {
      
  //   },
  //   {
        
  //   },
   
  // ]);

  const theme = createTheme({
    palette: {
        mode: 'dark',
      },
  });


  return (
 
    <ThemeProvider theme={theme}>
    <div className="App"> 
      <div className="appContainer">  
      <Navbar></Navbar>
      <AuthModal></AuthModal>
        {/* <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode> */}
  
      </div>
    </div>
    </ThemeProvider>
  
  );
}

export default App;
