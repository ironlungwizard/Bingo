import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { canEditCardFetch, cloneCardFetch, getCardFetch } from '../api/game';
import BingoField from '../components/BingoField/BingoField';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { getAttributesById, signUpGuestFetch } from '../api/auth';

export default function InspectCardPage() {
    const baseUrl = process.env.REACT_APP_DB_URL
    const [authorId, setAuthorId] = useState<string>('')
    const [cardId, setCardId] = useState<string>('')
    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([''])
    const [description, setDescription] = useState<string>('')
    const [canEdit, setCanEdit] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('')
    const [ownerName, setOwnerName] = useState<string>('')
    const [textColor, setTextColor] = useState<string>('')
    const [markColor, setMarkColor] = useState<string>('')
    const [fontSizes, setFontSizes] = useState<string[]>([''])
    const [backgroundColor, setBackgroundColor] = useState<string>('')
    const {id} = useParams<string>();
    const auth = useSelector((state: RootState) => state).auth
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
    const { showSingUp, showLogIn, hide } = bindActionCreators(actionCreators, dispatch)
    const { login } = bindActionCreators(actionCreators, dispatch)
    useEffect(() =>  {getCardFetch(id!).then((Response: XMLHttpRequest["response"]) => {
            if (Response ) {
            setPhrases(Response.data.phrases) 
            setTags(Response.data.tags)
            setDescription(Response.data.description)
            setTitle(Response.data.title)
            setTilesColor(Response.data.appearance.tilesColor)
            setTextColor(Response.data.appearance.textColor)
            setMarkColor(Response.data.appearance.markColor)
            setBackgroundColor(Response.data.appearance.backgroundColor)
            setAuthorId(Response.data.authorId)  
            setCardId(Response.data.id)
            setFontSizes(Response.data.appearance.fontSizes)
            getAttributesById(Response.data.authorId).then((Response: XMLHttpRequest["response"]) => {
                setOwnerName(Response.data.name)
             })
            errorOff()
            } else {
                navigate(-1); 
                errorOn('Card not found! It may be deleted or URL is not right.')
            }
        })}, [id]);


        const handleDeleteCard = async () => {
            deleteCardsFetch(cardId, auth['id']).then(Response => {
                navigate(-1); 
            })} 

            const handleEditCard = async () => {
                    navigate('/card/edit/' + id); 
            } 

            const handlePlayCard = async () => {
                    navigate('/card/' + id + '/gamestart'); 
            } 

            const handleShareCard = async () => {
                    if (auth['isGuest'] || !auth['id']) {
                      showSingUp()
                    } else {
                      navigator.clipboard.writeText(baseUrl+pathname)
                    }
            } 

            const handleCloneCard = async () => {
            if (auth['id']) {
                cloneCardFetch(auth['id'], cardId).then((Response: XMLHttpRequest["response"]) => {
                    navigate('/card/' + Response.data.id); 
                    setCardId(Response.data.id)

                })
               } else {
                signUpGuestFetch().then((Response: XMLHttpRequest["response"]) => {
                    login(Response.data.id, true, Response.data.name)   
                    cloneCardFetch(auth['id'], cardId).then((Response: XMLHttpRequest["response"]) => {
                        navigate('/card/' + Response.data.id); 
                        setCardId(Response.data.id)
                    })
                })  
                   
                }
            } 


            
            
            useEffect(() =>  {canEditCardFetch(id!).then((Response: XMLHttpRequest["response"]) => {
                setCanEdit(Response.data)
             })}, []);
       
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
                        variant="h4" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        color: '#ffffff'
                        }} 
                        component="div">
                           {ownerName} <br/>
                </Typography > 
                <Typography 
                        variant="h5" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        color: '#ffffff'
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
                        color: '#ffffff'
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
                        color: '#ffffff'
                        }} 
                        component="div">
                            {description}
                </Typography > 
            </Stack>
        </div>
        <div>
            <BingoField title={title} 
                isAGame={false}
                setTitle={setTitle} 
                backgroundColor={backgroundColor} 
                tilesColor={tilesColor} 
                textColor={textColor} 
                phrases={phrases}
                headerEditable={false}
                playable={false}
                fontSizes={fontSizes}
                markColor={markColor}
                ></BingoField>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                variant="outlined"
                                onClick={handlePlayCard}
                                title={'Play'}
                                sx={{ marginTop: 1, marginRight: 1, width: 120}}
                                >
                                    <PlayArrowIcon  fontSize="large" style={{ color: "#ffffff" }}></PlayArrowIcon>
                    </Button>

               
                <div >
                {isOwned(authorId) && canEdit ?
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                variant="outlined"
                                title={'Edit card'}
                                sx={{ marginTop: 1, marginLeft: 1}}
                                onClick={handleEditCard}
                                >
                                    <EditIcon  fontSize="large" style={{ color: "#ffffff"}}></EditIcon>
                    </Button>
                      :
                      <Button
                        size="medium"
                        aria-haspopup="true"
                        color="primary"
                        variant="outlined"
                        title={'Edit card'}
                        disabled
                        sx={{ marginTop: 1, marginLeft: 1}}
                    
                        >
                            <EditIcon  fontSize="large" style={{ color: "#ffffff"}}></EditIcon>
                      </Button>
                  }
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                onClick={handleCloneCard}
                                title={'Clone card'}
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <FileCopyIcon fontSize="large" style={{ color: "#ffffff"}}></FileCopyIcon>
                    </Button>
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                onClick={handleShareCard}
                                title={'Share card'}
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <ShareIcon fontSize="large" style={{ color: "#ffffff"}}></ShareIcon>
                    </Button>
                    { isOwned(authorId)?
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                variant="outlined"
                                title={'Delete card'}
                                sx={{ marginTop: 1, marginLeft: 1}}
                                onClick={handleDeleteCard}
                                >
                                    <DeleteIcon fontSize="large" style={{ color: "#ffffff"}}></DeleteIcon>
                    </Button>
                     :
                     <Button
                     size="medium"
                     aria-haspopup="true"
                     color="primary"
                     variant="outlined"
                     title={'Delete card'}
                     disabled
                     sx={{ marginTop: 1, marginLeft: 1}}
                 
                     >
                         <DeleteIcon fontSize="large" style={{ color: "#ffffff"}}></DeleteIcon>
                   </Button>
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