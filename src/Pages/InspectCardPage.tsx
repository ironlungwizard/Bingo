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

export default function InspectCardPage() {
    const [authorId, setAuthorId] = useState<string>('')
    const [cardId, setCardId] = useState<string>('')
    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([''])
    const [description, setDescription] = useState<string>('')
    const [header, setHeader] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('#273146')
    const [textColor, setTextColor] = useState<string>('#fff')
    const [backgroundColor, setBackgroundColor] = useState<string>('#C2CCE1')
    const { pathname } = useLocation();
    const auth = useSelector((state: RootState) => state).auth
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
    useMemo(() =>  {getCardFetch(pathname.replace('/card/', '')).then(Response => {
            if (Response) {
            setPhrases(Response.phrases) 
            setTags(Response.tags)
            setDescription(Response.description)
            setHeader(Response.title)
            setTilesColor(Response.appearance.backgroundColor)
            setTextColor(Response.appearance.textColor)
            setBackgroundColor(Response.appearance.outlineColor)
            setAuthorId(Response.authorId)  
            setCardId(Response.id)
            errorOff()
            } else {
                errorOn('Card not found! It may be deleted or URL is not right.')
            }
        })}, []);


        const handleDeleteCard = async (e: React.FormEvent) => {
            e.preventDefault()
            deleteCardsFetch(cardId, auth['id']).then(Response => {
                navigate(`..`); 
            })}   

    return (
    <>
    
         <div
          style={{width: 420, minWidth: 220, marginLeft: 3, marginRight: 2}}
        />
        <div>
            <BingoField header={header} 
                setHeader={setHeader} 
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
                                color="inherit"
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
                                color="inherit"
                                sx={{ marginTop: 1, marginLeft: 1}}
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
                                color="inherit"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <ShareIcon fontSize="large" style={{ color: "#fff"}}></ShareIcon>
                    </Button>
                    { isOwned(authorId)?
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                aria-label="password requirements"
                                color="inherit"
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