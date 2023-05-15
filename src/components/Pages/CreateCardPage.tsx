import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createCardFetch } from '../../api/game';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useEffect } from 'react';

export default function LandingPage() {
    const [phrases, setPhrases] = useState<string[]>([])
    const blankArray = Array(25).fill('');

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));


    // createCardFetch().then(Response => {
    //     console.log(Response)


    // })

    useEffect(() => {   
        console.log(phrases)
      },[phrases]);

    const listItems = blankArray.slice(phrases.length, 25).concat(phrases.fill(' ', phrases.length, 25).slice(0, 25)).map((phrase) =>
                <>
                    <Grid  xs={5}>
                        <Item sx={{aspectRatio: '1/0.95', backgroundColor: '#273146'}}>{phrase}</Item>
                    </Grid>
                </>  

);

    return (
        <>
         <TextField
          id="standard-multiline-static"
          label="Enter your phrases!"
          multiline
          rows={30}
          value={phrases.join('\r\n')}
          onChange={(e) => {setPhrases(e.target.value.split(/[\r\n]+/).slice(0,25))}} 
          variant="outlined"
          sx={{width: 420,}}
        />
            <Box sx={{ flexGrow: 1, maxWidth: '35%', aspectRatio: '1/1', border: '1px solid white', padding: 2}}>
                 <Item sx={{marginBottom: 2, height: 50, backgroundColor: '#273146'}}>Meme Bingo!</Item>
                <Grid  container spacing={2} columns={25}>
                    {listItems}
                </Grid>
            </Box>
            <TextField
          id="standard-multiline-static"
          label="Enter your phrases!"
          multiline
          rows={4}
          variant="outlined"
          sx={{width: 420}}
        />
        </> 
        
    )
}