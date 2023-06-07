import { Button, Card, CardHeader, Chip, Grid, Stack, styled } from '@mui/material';
import * as React from 'react';
import { getCardFetch } from '../../api/game';
import { useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAttributesById } from '../../api/auth';
import PreviewIcon from '@mui/icons-material/Preview';


export default function ErrorSnackBar({id}:{id: string}) {
    const [title, setTitle] = useState<string>()
    const [ownerName, setOwnerName] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const navigate = useNavigate();



    const Item = styled(Card)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      useMemo(() =>  {getCardFetch(id).then((Response: XMLHttpRequest["response"]) => {
        if (Response) {
                setTitle(Response.data.title) 
                setTags(Response.data.tags)
                getAttributesById(Response.data.authorId).then((Response: XMLHttpRequest["response"]) => {
                    setOwnerName(Response.data.name)
                 })
        } else {

        }
    })}, [id]);




    

        const handleToCard = async () => {
                navigate('/card/' + id); 
        }

       const tagChips = tags.map((tag, index) =>
                 <Chip  size="small" color='primary' variant="outlined" label={tag} key={index} />   
             );

  return (
    <Grid item xs={'auto'} lg={'auto'} md={'auto'} sm={'auto'} >
    <Item sx={{minWidth: 300,  backgroundColor: '#273049', height: 370}}>
        <Stack direction='column' sx={{ alignItems: 'center'}}>
        <CardHeader
            title={title ? title : 'No title'}
            sx={{wordWrap: "break-word",  overflow: 'hidden', padding: '0px'}}
        /> 
        <div style={{width: 244, height: 244, backgroundColor: '#fff', margin: 8, marginBottom: 0}}></div> 
        <CardHeader
            title={ownerName}
            sx={{wordWrap: "break-word",  overflow: 'hidden', padding: '8px'}}
        /> 
        <Stack direction='row' sx={{ alignItems: 'center', overflow: 'hidden', maxWidth: 270}}>
            <Button
                                size="small"
                                aria-haspopup="true"
                                color="primary"
                                onClick={handleToCard}
                                variant="outlined"
                                sx={{ minWidth: '37.5px', marginRight: 1 }}
                            
                                >
                                    <PreviewIcon  fontSize="small" style={{ color: "#fff"}}></PreviewIcon>
            </Button>
            {tagChips}
        </Stack>
        </Stack>
    </Item>
    </Grid>
  );
}
