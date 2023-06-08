import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { deleteCardsFetch, getCardsFetch } from '../api/game';
import { createCardFetch } from '../api/game';
import { useMemo, useState } from 'react';
import { Card, CardHeader, Chip, Grid, Stack, styled } from '@mui/material';
import CardGamesPlate from '../components/CardGamesPlate/CardGamesPlate';
import { useSelector } from 'react-redux';
import { RootState } from '../state/reducers';
import PreviewCard from '../components/PreviewCard/PreviewCard'


export default function LandingPage() {
  
       
    const [ids, setIds] = useState<string[]>([])
 
      useMemo(() =>  {getCardsFetch(20).then((Response: XMLHttpRequest["response"]) => {
        setIds(Response.data)
        console.log(Response.data)
      })}, []);
      
        const cards = ids.map((id, index) =>
            <PreviewCard key={index} id={id} ></PreviewCard>     
        );

    
    return (
        <div >
        <Grid container spacing={5} style={{display: 'flex', justifyContent: 'space-evenly', paddingLeft: 30,paddingBottom:50,paddingRight: 30}}>
         {cards}
        </Grid>
        </div>
    )
}