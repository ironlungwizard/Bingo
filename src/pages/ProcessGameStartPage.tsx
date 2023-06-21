import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { getCardFetch, startGameFetch, updateGameFetch } from '../api/game';
import BingoField from '../components/BingoField/BingoField';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../state/reducers';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../state';
import {  getAttributesById, signUpGuestFetch } from '../api/auth';
import { Box, Chip, Stack, Typography } from '@mui/material';


export default function ProcessGameStartPage() {

    const [cardId, setCardId] = useState<string>('')
    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([''])
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('')
    const [fontSizes, setFontSizes] = useState<string[]>([''])
    const [markColor, setMarkColor] = useState<string>('')
    const [ownerName, setOwnerName] = useState<string>('')
    const [textColor, setTextColor] = useState<string>('')
    const [backgroundColor, setBackgroundColor] = useState<string>('')
    const { pathname } = useLocation();
    const auth = useSelector((state: RootState) => state).auth
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [checkedArray, setCheckedArray] = useState<number[]>([])
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
    const { login } = bindActionCreators(actionCreators, dispatch)

    useEffect(() =>  {getCardFetch(pathname.replace('/card/', '').replace('/gamestart', '')).then((Response: XMLHttpRequest["response"]) => {
            if (Response && !Response.data.detail) {
            setPhrases(Response.data.phrases) 
            setTags(Response.data.tags)
            setDescription(Response.data.description)
            setTitle(Response.data.title)
            setTilesColor(Response.data.appearance.tilesColor)
            setTextColor(Response.data.appearance.textColor)
            setMarkColor(Response.data.appearance.markColor)
            setBackgroundColor(Response.data.appearance.backgroundColor) 
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
        })}, []);

            const handleBackToCard = async () => {
                    navigate('/card/' + pathname.replace('/card/', '').replace('/gamestart', '')); 
            } 
            const handleSaveGame = async () => {
                if (auth['id']) {
                    startGameFetch(auth['id'], cardId).then((Response: XMLHttpRequest["response"]) => {
                        var gameId = Response.data.id
                        console.log(Response)
                        updateGameFetch(gameId, auth['id'], checkedArray).then(Response => {
                            navigate((`..` + `/game/`+ gameId).replace('cards/', '')); 
                        })
                    })    
               } else {
                signUpGuestFetch().then((Response: XMLHttpRequest["response"]) => {
                    login(Response.data.id, true, Response.data.name)
                   
                        startGameFetch(Response.data.id, cardId).then((Response: XMLHttpRequest["response"]) => {
                            var gameId = Response.data.id
                            updateGameFetch(gameId, auth['id'], checkedArray).then(Response => {
                                navigate((`..` + `/game/`+ gameId).replace('cards/', '')); 
                            })
                        })    
                })  
                   
                }
            } 
       
            const tagChips = tags.map((tag, index) =>
            <Chip color='primary' variant="outlined" label={tag} key={index} />   
            );
    return (
  
    
    
       
       <Stack direction={{ xs: 'column', lg: 'row' }} sx={{width: '100%', justifyContent: 'space-around', alignItems: {xs: 'center', lg: 'inherit'}}}>
        <Box sx={{ order: {xs: '2', lg: '1'}, width: {sm: '626px', xs: '374px', lg: '375px'}, marginTop: {xs: '16px', lg: '0'}, marginLeft: {xs: '0', lg: '10px'}, marginRight: {xs: '0', lg: '6px'}}} >
           
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
                playable={true}
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
                        onClick={handleSaveGame}
                        color="primary"
                        title={'Save game'}
                        variant="outlined"
                        sx={{ marginTop: 1}}
                        >
                            <SaveIcon fontSize="large" style={{ color: "#ffffff"}}></SaveIcon>
                       
                </Button>
            </div>
            
            </div>
            </Box>
            <Box
            sx={{order: 3, width: {sm: '0px', xs: '0px', lg: '390px'}}}
            />
        </Stack> 
        
    )
}