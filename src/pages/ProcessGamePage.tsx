import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { canShareCardFetch, canShareGameFetch, getCardFetch, getGameFetch, updateGameFetch } from '../api/game';
import BingoField from '../components/BingoField/BingoField';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PhotoIcon from '@mui/icons-material/Photo';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import  isOwned  from '../utils/isOwned';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../state/reducers';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../state';
import { Helmet } from 'react-helmet-async';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { getAttributesById } from '../api/auth';


export default function ProcessGamePage() {
    const frontUrl = process.env.REACT_APP_FRONT_URL
    const dbUrl = process.env.REACT_APP_DB_URL
    const [authorId, setAuthorId] = useState<string>('')
    const [ownerName, setOwnerName] = useState<string>('')
    const [gameId, setGameId] = useState<string>('')
    const [cardId, setCardId] = useState<string>('')
    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([''])
    const [description, setDescription] = useState<string>('')
    const [fontSizes, setFontSizes] = useState<number[]>([])
    const [title, setTitle] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('')
    const [textColor, setTextColor] = useState<string>('')
    const [markColor, setMarkColor] = useState<string>('')
    const [backgroundColor, setBackgroundColor] = useState<string>('')
    const auth = useSelector((state: RootState) => state).auth
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const {id} = useParams<string>();
    const [checkedArray, setCheckedArray] = useState<number[]>([])
    const { infoOn, infoOff } = bindActionCreators(actionCreators, dispatch)
    const { showSingUp, showLogIn, hide } = bindActionCreators(actionCreators, dispatch)
    useEffect(() =>  {getGameFetch(id!).then((Response: XMLHttpRequest["response"]) => {
                    setGameId(Response.data.id)
                    setCheckedArray(Response.data.checkedPhrases)
                    setAuthorId(Response.data.ownerId) 
            if (  Response && !Response.data.detail ) {getCardFetch(Response.data.cardId).then((Response: XMLHttpRequest["response"]) => {
                if (Response && !Response.data.detail) {
                setPhrases(Response.data.phrases) 
                setTags(Response.data.tags)
                setDescription(Response.data.description)
                setTitle(Response.data.title)
                setTilesColor(Response.data.appearance.tilesColor)
                setMarkColor(Response.data.appearance.markColor)
                setTextColor(Response.data.appearance.textColor)
                setBackgroundColor(Response.data.appearance.backgroundColor)
                setCardId(Response.data.id)
                setFontSizes(Response.data.appearance.fontSizes)
                getAttributesById(Response.data.authorId).then((Response: XMLHttpRequest["response"]) => {
                    setOwnerName(Response.data.name)
                 })
               
                } else {
                    navigate(-1); 
                    infoOn('You cant edit this card, because it was already played!', 'error')
                }
            })}})}, [id]);

            const handleBackToCard = async () => {
                    navigate('../card/' + cardId); 
            } 

            const handleSaveGame = async () => {
                        updateGameFetch(id!, auth['id'], checkedArray).then(Response => {
                            navigate((`..` + `/game/`+ id!).replace('cards/', '')); 
                            infoOn('Game saved!', 'success')
                        })
                }

                const handleShareGame = async () => {
                    if (auth['isGuest'] || !auth['id'] ) {
                        showSingUp()
                      } else { 
                     
                      canShareGameFetch(id!).then((Response: XMLHttpRequest["response"]) => {
                          var canShare = false
                          canShare = Response.data
                          if (canShare) {
                            navigator.clipboard.writeText(frontUrl+pathname)
                            infoOn('Link copied!', 'success')
                          }
                      })
                     
                      }
                } 

            const handleShareGameImage = async () => {
                if (auth['isGuest'] || !auth['id']) {
                  showSingUp()
                } else {
                   
                    canShareGameFetch(id!).then(async (Response: XMLHttpRequest["response"]) => {
                        var canShare = false
                        canShare = Response.data
                        const response = await fetch(`${dbUrl}games/${id}/image-titled-full.png`)
                        const blob = (await response).blob()
                        await navigator.clipboard.write([
                            new ClipboardItem({
                              'image/png': blob
                            }),
                          ]);
                        infoOn('Image copied!', 'success')
                    })
                   
                }
        } 
            
        const tagChips = tags.map((tag, index) =>
        <Chip color='primary' variant="outlined" label={tag} key={index} />   
    );

    return (
  
    
         <div
         style={{width: '100%'}}
        >
        <Box>
            <Typography 
                          variant="h5" 
                          style={{ wordWrap: "break-word"}} 
                          sx={{display: '-webkit-box', 
                          overflow: 'hidden', 
                          WebkitBoxOrient: 'vertical',
                          color: '#ffffff',
                          marginLeft: 10,
                          marginTop: 2,
                          marginBottom: 2
                          }} 
                          component="div">
                           Game page
            </Typography>
        </Box>
        <Helmet>
            <link rel="canonical" href={frontUrl+pathname} />
            <meta property="og:image" content={`${dbUrl}games/${id}/image-titled-full.png`} />
        </Helmet>
          
      
       
    
    
       
        <Stack direction={{ xs: 'column', lg: 'row' }} sx={{width: '100%', justifyContent: 'space-around', alignItems: {xs: 'center', lg: 'inherit'}}}>
        <Box sx={{ order: {xs: '2', lg: '1'}, width: {sm: '626px', xs: '360px', lg: '375px'}, marginTop: {xs: '16px', lg: '0'}, marginLeft: {xs: '0', lg: '10px'}, marginRight: {xs: '0', lg: '6px'}}} >
           
           <Typography 
                      variant="h5" 
                      style={{ wordWrap: "break-word"}} 
                      sx={{display: '-webkit-box', 
                      overflow: 'hidden', 
                      WebkitBoxOrient: 'vertical',
                      color: '#ffffff',
                      marginBottom: 2
                      }} 
                      component="div">
                         Author: {ownerName} <br/>
              </Typography > 
              <Typography 
                      variant="h5" 
                      style={{ wordWrap: "break-word"}} 
                      sx={{display: '-webkit-box', 
                      overflow: 'hidden', 
                      WebkitBoxOrient: 'vertical',
                      color: '#ffffff',
                      marginBottom: 1
                      }} 
                      component="div">
                          Tags: <br/>
              </Typography > 
              <Stack useFlexGap sx={{ marginBottom: 2}} flexWrap="wrap" direction="row" spacing={{ xs: 1, sm: 0.5 }}>
                  {tagChips}
              </Stack>
              <Typography 
                      variant="h5" 
                      style={{ wordWrap: "break-word"}} 
                      sx={{display: '-webkit-box', 
                      overflow: 'hidden', 
                      WebkitBoxOrient: 'vertical',
                      color: '#ffffff',
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
                      color: '#ffffff',
                      }} 
                      component="div">
                          {description}
              </Typography > 
          
     </Box>
     <Box sx={{order: {xs: '1', lg: '2'}}}>
            <BingoField title={title} 
                    checkedArray={checkedArray}
                    setCheckedArray={setCheckedArray}
                    isAGame={true}
                    setTitle={setTitle} 
                    backgroundColor={backgroundColor} 
                    tilesColor={tilesColor}
                    markColor={markColor} 
                    textColor={textColor} 
                    phrases={phrases}
                    headerEditable={false}
                    playable={isOwned(authorId)}
                    fontSizes={fontSizes}
                ></BingoField>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
               
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                title={'Back to card'}
                                variant="outlined"
                                sx={{ marginTop: 1, marginRight: 1, width: 120, justifyContent: 'space-between'}}
                                onClick={handleBackToCard}
                                >
                                    <ArrowBackIcon  fontSize="large" style={{ color: "#ffffff" }}></ArrowBackIcon>to card
                    </Button>
                               
                <div >
                <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                title={'Share game image'}
                                onClick={handleShareGameImage}
                                variant="outlined"
                                sx={{ marginTop: 1}}
                                >
                                    <PhotoIcon fontSize="large" style={{ color: "#fff"}}></PhotoIcon>
                    </Button>
                <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                title={'Share game'}
                                onClick={handleShareGame}
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <ShareIcon  fontSize="large" style={{ color: "#fff"}}></ShareIcon>
                    </Button>
                    
                    {isOwned(authorId) ? 
                <Button
                        size="medium"
                        aria-haspopup="true"
                        onClick={handleSaveGame}
                        title={'Save game'}
                        color="primary"
                        variant="outlined"
                        sx={{ marginTop: 1, marginLeft: 1}}
                        >
                            <SaveIcon fontSize="large" style={{ color: "#ffffff"}}></SaveIcon>
                       
                </Button>
                : <Button
                size="medium"
                aria-haspopup="true"
                disabled
                title={'Save game'}
                color="primary"
                variant="outlined"
                sx={{ marginTop: 1, marginLeft: 1}}
                >
                    <SaveIcon fontSize="large" style={{ color: "#ffffff"}}></SaveIcon>
               
        </Button>
                }    
            </div>
            
            </div>
            </Box>
            <Box
            sx={{order: 3, width: {sm: '0px', xs: '0px', lg: '390px'}}}
            />
        </Stack> 
        
        </div>
        
   
        
    )
}