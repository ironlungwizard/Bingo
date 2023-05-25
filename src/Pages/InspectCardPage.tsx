import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { getCardFetch } from '../api/game';
import BingoField from '../components/BingoField/BingoField';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import  isOwned  from '../utils/isOwned';
import { deleteCardsFetch } from '../api/game';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../state/reducers';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../state';
import { Stack, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';

export default function InspectCardPage() {
    const [authorId, setAuthorId] = useState<string>('')
    const [cardId, setCardId] = useState<string>('')
    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([''])
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('')
    const [textColor, setTextColor] = useState<string>('')
    const [backgroundColor, setBackgroundColor] = useState<string>('')
    const { pathname } = useLocation();
    const auth = useSelector((state: RootState) => state).auth
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
    useMemo(() =>  {getCardFetch(pathname.replace('/card/', '')).then(Response => {
            if (Response) {
                console.log(Response)
            setPhrases(Response.phrases) 
            setTags(Response.tags)
            setDescription(Response.description)
            setTitle(Response.title)
            setTilesColor(Response.appearance.tilesColor)
            setTextColor(Response.appearance.textColor)
            setBackgroundColor(Response.appearance.backgroundColor)
            setAuthorId(Response.authorId)  
            setCardId(Response.id)
            errorOff()
            } else {
                navigate(`..`); 
                errorOn('Card not found! It may be deleted or URL is not right.')
            }
        })}, []);


        const handleDeleteCard = async (e: React.FormEvent) => {
            e.preventDefault()
            deleteCardsFetch(cardId, auth['id']).then(Response => {
                navigate(`..`); 
            })} 
            const handleEditCard = async (e: React.FormEvent) => {
                e.preventDefault()
                    navigate('/card/edit/' + pathname.replace('/card/', '')); 
            } 
            
       
            const tagChips = tags.map((tag, index) =>
                <Chip color='primary' variant="outlined" label={tag} key={index} />   
            );


    return (
    <>
    
         <div
          style={{width: 420, minWidth: 220, marginLeft: 3, marginRight: 2}}
        >
             <Stack direction="column" spacing={2}>
                <Typography 
                        variant="h5" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        color: '#fff'
                        }} 
                        component="div">
                            Tags: <br/>
                </Typography > 
                <Stack useFlexGap flexWrap="wrap" direction="row" spacing={{ xs: 1, sm: 0.5 }}>
                    {tagChips}
                </Stack>
                <Typography 
                        variant="h5" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        color: '#fff'
                        }} 
                        component="div">
                            Description:
                </Typography > 
                <Typography 
                        variant="h6" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        color: '#fff'
                        }} 
                        component="div">
                            {description}
                </Typography > 
            </Stack>
        </div>
        <div>
            <BingoField title={title} 
                setTitle={setTitle} 
                backgroundColor={backgroundColor} 
                tilesColor={tilesColor} 
                textColor={textColor} 
                phrases={phrases}
                headerEditable={false}
                ></BingoField>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                aria-label="password requirements"
                                color="primary"
                                variant="outlined"
                                sx={{ marginTop: 1, marginRight: 1, width: 120}}
                                >
                                    <PlayArrowIcon  fontSize="large" style={{ color: "#fff" }}></PlayArrowIcon>
                    </Button>

               
                <div >
                {isOwned(authorId)?
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                aria-label="password requirements"
                                color="primary"
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                onClick={handleEditCard}
                                >
                                    <EditIcon  fontSize="large" style={{ color: "#fff"}}></EditIcon>
                    </Button>
                      :
                      <></>
                  }
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                aria-label="password requirements"
                                color="primary"
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <ShareIcon fontSize="large" style={{ color: "#fff"}}></ShareIcon>
                    </Button>
                    { isOwned(authorId)?
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                aria-label="password requirements"
                                color="primary"
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                onClick={handleDeleteCard}
                                >
                                    <DeleteIcon fontSize="large" style={{ color: "#fff"}}></DeleteIcon>
                    </Button>
                     :
                      <></>
                  }
            </div>
            </div>
        </div>
       
        <div
          style={{width: 420, minWidth: 220, marginLeft: 3, marginRight: 2}}
        />
        
    </> 
        
    )
}