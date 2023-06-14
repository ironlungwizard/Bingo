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
import {  signUpGuestFetch } from '../api/auth';


export default function ProcessGameStartPage() {

    const [authorId, setAuthorId] = useState<string>('')
    const [cardId, setCardId] = useState<string>('')
    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([''])
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('')
    const [fontSizes, setFontSizes] = useState<string[]>([''])
    const [markColor, setMarkColor] = useState<string>('')
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
            if (Response) {
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
       

    return (
  
    
         <div
          style={{display: 'flex'}}
        >
       
        <div>
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
        </div>
       
        </div>
        
   
        
    )
}