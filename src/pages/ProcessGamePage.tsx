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
import { Chip } from '@mui/material';


export default function ProcessGamePage() {
    const frontUrl = process.env.REACT_APP_FRONT_URL
    const dbUrl = process.env.REACT_APP_DB_URL
    const [authorId, setAuthorId] = useState<string>('')
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
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
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
                errorOff()
                } else {
                    navigate(-1); 
                    errorOn('Card not found! It may be deleted or URL is not right.')
                }
            })}})}, [id]);

            const handleBackToCard = async () => {
                    navigate('../card/' + cardId); 
            } 

            const handleSaveGame = async () => {
                        updateGameFetch(id!, auth['id'], checkedArray).then(Response => {
                            navigate((`..` + `/game/`+ id!).replace('cards/', '')); 
                        })
                }

                const handleShareGame = async () => {
                    if (auth['isGuest'] || !auth['id'] ) {
                        showSingUp()
                      } else { 
                      var canShare = false
                      canShareGameFetch(id!).then((Response: XMLHttpRequest["response"]) => {
                          canShare = Response.data
                      })
                      if (canShare) {
                        navigator.clipboard.writeText(frontUrl+pathname)
                      }
                      }
                } 

            const handleShareGameImage = async () => {
                if (auth['isGuest'] || !auth['id']) {
                  showSingUp()
                } else {
                    var canShare = false
                    canShareGameFetch(id!).then((Response: XMLHttpRequest["response"]) => {
                        canShare = Response.data
                    })
                    if (canShare) {
                    const response = await fetch(`${dbUrl}games/${id}/image-titled-full.png`)
                    const blob = await response.blob()
                    await navigator.clipboard.write([
                        new ClipboardItem({
                          'image/png': blob
                        }),
                      ]);
                    }
                }
        } 
            
        const tagChips = tags.map((tag, index) =>
        <Chip color='primary' variant="outlined" label={tag} key={index} />   
    );

    return (
  
    
         <div
          style={{display: 'flex'}}
        >
        <Helmet>
            <link rel="canonical" href={frontUrl+pathname} />
            <meta property="og:image" content={`${dbUrl}games/${id}/image-titled-full.png`} />
        </Helmet>
          
      
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
                markColor={markColor}
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
                                    <ArrowBackIcon  fontSize="large" style={{ color: "#ffffff" }}></ArrowBackIcon>to card
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
                            <SaveIcon fontSize="large" style={{ color: "#ffffff"}}></SaveIcon>
                       
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
                                onClick={handleShareGameImage}
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