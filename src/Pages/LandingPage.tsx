import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { getCardsFetch } from '../api/game';
import { createCardFetch } from '../api/game';
import { useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import CardGamesPlate from '../components/CardGamesPlate/CardGamesPlate';
import { useSelector } from 'react-redux';
import { RootState } from '../state/reducers';

export default function LandingPage() {

    const [ids, setIds] = useState<string[]>([])
    const auth = useSelector((state: RootState) => state).auth

    useMemo(() =>  {getCardsFetch(2).then(Response => {
       setIds(Response)
    })}, []);

    const tagChips = ids.map((id: any, index: any) =>
            <div id={id}>{id}</div>
        );

    return (
        <>
           <Stack direction="column" spacing={2}>
                {tagChips}
           </Stack>
           <Button onClick={() => {console.log(auth)}}>a</Button>
        </> 
    )
}