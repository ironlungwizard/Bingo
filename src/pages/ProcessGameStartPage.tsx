import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { createCardFetch, getCardFetch, startGameFetch, updateGameFetch } from '../api/game';
import BingoField from '../components/BingoField/BingoField';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PhotoIcon from '@mui/icons-material/Photo';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import { refreshFetch } from '../api/auth';


export default function ProcessGameStartPage() {

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
    const [checkedArray, setCheckedArray] = useState<number[]>([])
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
    useMemo(() =>  {getCardFetch(pathname.replace('/card/', '').replace('/gamestart', '')).then(Response => {
            if (Response) {
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

            const handleBackToCard = async () => {
                    navigate('/card/' + pathname.replace('/card/', '').replace('/gamestart', '')); 
            } 
            const handleSaveGame = async () => {
                refreshFetch().then(Result => {
                    startGameFetch(auth['id'], cardId).then(Response => {
                        var gameId = Response.id
                        updateGameFetch(Response.id, auth['id'], checkedArray).then(Response => {
                            navigate((`..` + `/game/`+ gameId).replace('cards/', '')); 
                        })
                    })    
                })
            } 
       
            const tagChips = tags.map((tag, index) =>
                <Chip color='primary' variant="outlined" label={tag} key={index} />   
            );


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
                textColor={textColor} 
                phrases={phrases}
                headerEditable={false}
                playable={true}
                ></BingoField>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
               
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                aria-label="password requirements"
                                color="primary"
                                variant="outlined"
                                sx={{ marginTop: 1, marginRight: 1, width: 120, justifyContent: 'space-between'}}
                                onClick={handleBackToCard}
                                >
                                    <ArrowBackIcon  fontSize="large" style={{ color: "#fff" }}></ArrowBackIcon>to card
                    </Button>
                               
                <div >
                {isOwned(authorId) ? 
                <Button
                        size="medium"
                        aria-haspopup="true"
                        aria-label="password requirements"
                        onClick={handleSaveGame}
                        color="primary"
                        variant="outlined"
                        sx={{ marginTop: 1}}
                        >
                            <SaveIcon fontSize="large" style={{ color: "#fff"}}></SaveIcon>
                       
                </Button>
                : <></>
                }    
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                aria-label="password requirements"
                                color="primary"
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <ShareIcon  fontSize="large" style={{ color: "#fff"}}></ShareIcon>
                    </Button>
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                aria-label="password requirements"
                                color="primary"
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <PhotoIcon fontSize="large" style={{ color: "#fff"}}></PhotoIcon>
                    </Button>
                  
            </div>
            
            </div>
        </div>
       
        </div>
        
   
        
    )
}