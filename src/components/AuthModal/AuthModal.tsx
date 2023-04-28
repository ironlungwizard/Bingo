import * as React from 'react';
import './AuthModal.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RootState } from '../../state/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../state';
import TextField from '@mui/material/TextField';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#2E3B55',
  boxShadow: 14,
  p: 4,
  color: '#fff',
  height: 500
};


export default function AuthModal() {
  const dispatch = useDispatch();

  const { show, hide } = bindActionCreators(actionCreators, dispatch)

  const authModal = useSelector((state: RootState) => state).authModal

  return (
  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={authModal.isShown}
        onClose={hide}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 0,
          },
        }}
      >
        <Fade in={authModal.isShown}>
          <Box sx={style}>
            <Typography variant="h6" component="div">
                Sign Up
            </Typography >     
            <TextField fullWidth sx={{ marginTop: 5 }} className="nicknameTextfield" label="Nickname" variant="outlined" />
            <TextField fullWidth sx={{ marginTop: 2}} label="E-mail" variant="outlined" />
            <TextField fullWidth sx={{ marginTop: 2 }} className="passwordTextfield" label="Password" variant="outlined" type="password"/>
            <TextField fullWidth sx={{ marginTop: 2 }} className="passwordTextfield" label="Repeat password" variant="outlined" type="password"/>
          </Box>
        </Fade>
      </Modal>
 
  );
}