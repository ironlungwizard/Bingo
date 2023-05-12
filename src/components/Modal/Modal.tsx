import * as React from 'react';
import './Modal.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import ModalWindow from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RootState } from '../../state/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../state';
import TextField from '@mui/material/TextField';
import { Dialog } from '@mui/material';
import SignUpForm from '../ModalForms/SignUpForm'
import LogInForm from '../ModalForms/LogInForm'


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#2E3B55',
  boxShadow: 14,
  p: 4,
  color: '#fff',
  transitionDuration: 100
};


export default function Modal() {
  const dispatch = useDispatch();

  const { hide } = bindActionCreators(actionCreators, dispatch)

  const modal = useSelector((state: RootState) => state).modal

  return (
  
      <ModalWindow
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal.isShown}
        onClose={hide}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 0,
          },
        }}
      >
        <Fade in={modal.isShown}>
          <Box sx={style}>
          {(function () {
            switch (modal.type) {
              case "LOGIN":
                return <LogInForm></LogInForm> ;
              case "SIGNUP":
                return <SignUpForm></SignUpForm>;
              default:
                return null;
            }
          })()}
          </Box>
        </Fade>
      </ModalWindow>
 
  );
}