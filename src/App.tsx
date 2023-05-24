import './App.scss';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import { useDispatch } from 'react-redux';
import Modal from "./components/Modal/Modal"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { refreshFetch } from './api/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from './state';
import LandingPage from './Pages/LandingPage';
import CreateCardPage from './Pages/CreateCardPage';
import InspectCard from './Pages/InspectCardPage';
import ErrorSnackBar from './components/ErrorSnackBar/ErrorSnackBar';


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
      path: 'card/create',
      element: <CreateCardPage></CreateCardPage>
    },
    {
      path: 'card/:id',
      element: <InspectCard></InspectCard>
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
      <ErrorSnackBar></ErrorSnackBar>
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
