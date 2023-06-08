import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { getCardFetch, getGameFetch, updateGameFetch } from '../api/game';
import BingoField from '../components/BingoField/BingoField';
import { useMemo } from 'react';
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


export default function ProcessGamePage() {

    const [authorId, setAuthorId] = useState<string>('')
    const [gameId, setGameId] = useState<string>('')
    const [cardId, setCardId] = useState<string>('')
    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([''])
    const [description, setDescription] = useState<string>('')
    const [fontSizes, setFontSizes] = useState<string[]>([''])
    const [title, setTitle] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('')
    const [textColor, setTextColor] = useState<string>('')
    const [backgroundColor, setBackgroundColor] = useState<string>('')
    const auth = useSelector((state: RootState) => state).auth
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const {id} = useParams<string>();
    const [checkedArray, setCheckedArray] = useState<number[]>([])
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
    const { showSingUp, showLogIn, hide } = bindActionCreators(actionCreators, dispatch)
    useMemo(() =>  {getGameFetch(id!).then((Response: XMLHttpRequest["response"]) => {
                    setGameId(Response.data.id)
                    setCheckedArray(Response.data.checkedPhrases)
            if (Response) {getCardFetch(Response.data.cardId).then((Response: XMLHttpRequest["response"]) => {
                if (Response) {
                setPhrases(Response.data.phrases) 
                setTags(Response.data.tags)
                setDescription(Response.data.description)
                setTitle(Response.data.title)
                setTilesColor(Response.data.appearance.tilesColor)
                setTextColor(Response.data.appearance.textColor)
                setBackgroundColor(Response.data.appearance.backgroundColor)
                setAuthorId(Response.data.authorId)  
                setCardId(Response.data.id)
                setFontSizes(Response.data.appearance.fontSizes)
                errorOff()
                } else {
                    navigate(-1); 
                    errorOn('Card not found! It may be deleted or URL is not right.')
                }
            })}})}, []);

            const handleBackToCard = async () => {
                    navigate('../card/' + cardId); 
            } 

            const handleSaveGame = async () => {
               
                        updateGameFetch(gameId, auth['id'], checkedArray).then(Response => {
                            navigate((`..` + `/game/`+ gameId).replace('cards/', '')); 
                        })
                     
                }

                const handleShareGame = async () => {
                    if (auth['isGuest'] || !auth['id']) {
                      showSingUp()
                    } else {
                      navigator.clipboard.writeText(pathname)
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
                                variant="outlined"
                                title={'Back to card'}
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
                        onClick={handleSaveGame}
                        title={'Save game'}
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
                                color="primary"
                                title={'Share game'}
                                onClick={handleShareGame}
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <ShareIcon  fontSize="large" style={{ color: "#fff"}}></ShareIcon>
                    </Button>
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                title={'Share game image'}
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