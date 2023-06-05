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

export default function LandingPage() {
  
       

    const Item = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));



        var aaa = [1, 2, 3,4 ,5 ,6, 7 ,8 ,9 ,10, 11, 12, 13,14,15,16,17,18,19,20]
        var tags = [1, 2, 3,4 ,5 ,6, 7 ,8 ,9 ,10, 11, 12, 13,14,15,16,17,18,19,20]

        const tagChips = tags.map((tag, index) =>
                <Chip  size="small" color='primary' variant="outlined" label={tag} key={index} />   
            );

        const cards = aaa.map((index) =>
        
                <Grid item xs={'auto'} lg={'auto'} md={'auto'} sm={'auto'} >
                <Item key={index}  sx={{minWidth: 300,  backgroundColor: '#273049', height: 370}}>
                    <Stack direction='column' sx={{ alignItems: 'center'}}>
                    <div style={{width: 244, height: 254, backgroundColor: '#fff', margin: 20, marginBottom: 0}}></div> 
                    <CardHeader
                        title={'arpo8ata'}
                        sx={{wordWrap: "break-word",  overflow: 'hidden', padding: '8px'}}
                    /> 
                    <Stack direction='row' sx={{ alignItems: 'center', overflow: 'hidden', maxWidth: 270}}>
                    {tagChips}
                    </Stack>
                    </Stack>
                
                </Item>
                </Grid>
            );

    
    return (
        <div >
        <Grid container spacing={5} style={{display: 'flex', justifyContent: 'space-evenly', paddingLeft: 20,paddingRight: 20}}>
         {cards}
        </Grid>
        
        </div>
        
          
    )
}