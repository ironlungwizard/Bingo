import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit' 
import { actionCreators } from '../../state';
import { RootState } from '../../state/reducers';
import { Typography } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function InfoSnackBar() {

  const dispatch = useDispatch();

  const { infoOff } = bindActionCreators(actionCreators, dispatch)
  
  const info = useSelector((state: RootState) => state).info

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    infoOff()
  };
  return (
      <Snackbar open={info['isShown']} autoHideDuration={info['infoType'] == 'error' ? 6000 : 2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={info['infoType']} sx={{ width: '100%' }}>
        <Typography     
                style={{ wordWrap: "break-word"}} 
                sx={{display: '-webkit-box', 
                overflow: 'hidden', 
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                color: "#fff"
                }} 
                component="div">
                {info['text']}
        </Typography >
            
        </Alert>
      </Snackbar>
  );
}
