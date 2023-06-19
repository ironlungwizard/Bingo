import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { actionCreators } from '../../state';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';



export default function DeleteForm() {
    const dispatch = useDispatch();
    const { hide} = bindActionCreators(actionCreators, dispatch)
    const modal = useSelector((state: RootState) => state).modal

    



    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 5 }}  component="div">
                Are you sure you want to delete this? 
            </Typography> 
            <Button title={'No'} type="submit" sx={{ marginTop: 2 }} onClick={hide} size='large' variant="contained">No</Button>
            <Button title={'Delete'} sx={{ marginTop: 2, marginLeft: 5 }} onClick={hide} variant="text">Delete</Button>
        </> 
    )
}