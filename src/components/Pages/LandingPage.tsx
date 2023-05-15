import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { getCardsFetch } from '../../api/game';
import { createCardFetch } from '../../api/game';

export default function LandingPage() {
   
    getCardsFetch(20).then(Response => {
        console.log(Response)


    })

    return (
        <>
           <a href='/create'>привет</a> 
        </> 
    )
}