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

export default function ErrorSnackBar() {

  const dispatch = useDispatch();

  const { errorOff } = bindActionCreators(actionCreators, dispatch)
  
  const error = useSelector((state: RootState) => state).error

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    errorOff()
  };
  return (
      <Snackbar open={error['isShown']} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        <Typography     
                style={{ wordWrap: "break-word"}} 
                sx={{display: '-webkit-box', 
                overflow: 'hidden', 
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                color: "#fff"
                }} 
                component="div">
                {error['text']}
        </Typography >
            
        </Alert>
      </Snackbar>
  );
}
