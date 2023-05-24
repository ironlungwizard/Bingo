import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { getCardsFetch } from '../api/game';
import { createCardFetch } from '../api/game';
import { useMemo, useState } from 'react';
import { Stack } from '@mui/material';

export default function LandingPage() {
    const [ids, setIds] = useState<string[]>([''])
    useMemo(() =>  {getCardsFetch(20).then(Response => {
       setIds(Response)
         
    })}, []);
    const tagChips = ids.map((id: any, index: any) =>
                <div key={index} >{id} </div>  
            );
    return (
        <>
           <a href='/card/create'>привет</a> 
           <Stack direction="column" spacing={2}>
                {tagChips}
           </Stack>
        </> 
    )
}