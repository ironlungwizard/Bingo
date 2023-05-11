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
import refreshFetch from './api/logicalApi/authApi/refreshFetch';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from './state';
import { debounce } from "lodash";

function App() {
const dispatch = useDispatch();
const { login } = bindActionCreators(actionCreators, dispatch)


refreshFetch().then(Response => {
  login(Response.id, Response.isGuest, Response.name)
})
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
      <Modal></Modal>
        {/* <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode> */}
  
      </div>
    </div>
    </ThemeProvider>
  
  );
}

export default App;
