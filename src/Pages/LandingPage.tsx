import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { deleteCardsFetch, getCardsFetch, getTagsFetch } from '../api/game';
import { createCardFetch } from '../api/game';
import { useMemo, useState } from 'react';
import { Card, CardHeader, Chip, Grid, IconButton, Stack, styled } from '@mui/material';
import CardGamesPlate from '../components/CardGamesPlate/CardGamesPlate';
import { useSelector } from 'react-redux';
import { RootState } from '../state/reducers';
import PreviewCard from '../components/PreviewCard/PreviewCard'
import BackspaceIcon from '@mui/icons-material/Backspace';


export default function LandingPage() {
  
       
    const [ids, setIds] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [checkedTags, setCheckedTags] = useState<string[]>([])
 
      useMemo(() =>  {getCardsFetch(20, checkedTags).then((Response: XMLHttpRequest["response"]) => {
        setIds(Response.data)
      })}, [checkedTags]);
      
      useMemo(() =>  {getTagsFetch(checkedTags).then((Response: XMLHttpRequest["response"]) => {
        setTags(Response.data.slice(0, 15))
      })}, [checkedTags]);

      const handleClickTag = async (tag: string, index: number) => {
        setCheckedTags([...checkedTags, tag])
        setTags(tags.splice(index, 1))
      } 
      const handleDeleteTag = async (tag: string, index: number) => {
        console.log(1, index, checkedTags)
        var arr = [...checkedTags]
        setCheckedTags(arr.filter(word => word != tag))
        console.log(2, index,arr, checkedTags.filter(word => word != tag))
      } 
      const clearCheckedTags = async () => {
        setCheckedTags([])
      } 

        const cards = ids.map((id, index) =>
            <PreviewCard key={index} id={id} ></PreviewCard>     
        );

        const checkedTagChips = checkedTags.map((tag, index) =>
                <Chip color='primary' onDelete={(e) => {handleDeleteTag(tag, index)}} variant="outlined" label={tag} key={index} />   
        );
        const tagChips = tags.filter(item => !checkedTags.includes(item)).map((tag, index) =>
                <Chip label={tag} onClick={(e) => {handleClickTag(tag, index)}} color='primary' variant="outlined" key={index} />   
        );

    
    return (
        <div style={{width: '100%'}}>
          <Stack direction="row" spacing={1} sx={{marginLeft: 4, marginBottom: 2}}>
          <IconButton onClick={clearCheckedTags} aria-label="Clear checked tags"  size="large" style={{marginTop: -9}}>
            <BackspaceIcon color='primary' fontSize="inherit" />
          </IconButton>
          {checkedTagChips}
          {tagChips}
          </Stack>
        <Grid container spacing={5} style={{display: 'flex', justifyContent: 'space-evenly', paddingLeft: 30,paddingBottom:50,paddingRight: 30}}>
         {cards}
        </Grid>
        </div>
    )
}