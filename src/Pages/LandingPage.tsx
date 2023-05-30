import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { getCardsFetch } from '../api/game';
import { createCardFetch } from '../api/game';
import { useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import CardGamesPlate from '../components/CardGamesPlate/CardGamesPlate';

export default function LandingPage() {

    const [ids, setIds] = useState<string[]>([])

    useMemo(() =>  {getCardsFetch(2).then(Response => {
       setIds(Response)
       console.log(Response)
    })}, []);

    const tagChips = ids.map((id: any, index: any) =>
            <CardGamesPlate id={id} index={index}></CardGamesPlate>
        );

    return (
        <>
           <Stack direction="column" spacing={2}>
                {tagChips}
           </Stack>
        </> 
    )
}