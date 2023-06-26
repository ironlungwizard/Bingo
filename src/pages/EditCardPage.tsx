import * as React from 'react';
import { canEditCardFetch, updateCardFetch } from '../api/game';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/reducers';
import { useNavigate, useParams } from 'react-router-dom';
import CreateEditComplex from '../components/CreateEditComplex/CreateEditComplex';
import Card from '../types/CardType';
import { useMemo } from 'react';
import { getCardFetch } from '../api/game';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../state';
import { useState } from 'react';
import { Typography } from '@mui/material';
import  isOwned  from '../utils/isOwned';

export default function EditCardPage() {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state).auth
    const [ownerId, setOwnerId] = useState<string>('')
    const dispatch = useDispatch();
    const { infoOn } = bindActionCreators(actionCreators, dispatch)
    const {id} = useParams<string>();
    const [initialState, setInitialState] = useState<Card>()
    const [canEdit, setCanEdit] = useState<boolean>(false)

    useMemo(() =>  {canEditCardFetch(id!).then((Response: XMLHttpRequest["response"]) => {

        if (Response.data == false) {
            infoOn('You cant edit this card, because it was already played!', 'error')
        } else {
            setCanEdit(true)
        }
     })}, []);

    const saveCard = async (card: Card) => {

            updateCardFetch(auth['id'], card, 'default', id!).then((Response: XMLHttpRequest["response"]) => {
                navigate(`../card/edit/${Response.data.id}`);  })
    }


    useMemo(() =>  {
        getCardFetch(id!).then((Response: XMLHttpRequest["response"]) => {
        if (Response) {
            setInitialState({
                phrases: Response.data.phrases, 
                title: Response.data.title, 
                description: Response.data.description, 
                tags: Response.data.tags, 
                backgroundColor: Response.data.appearance.backgroundColor, 
                textColor: Response.data.appearance.textColor, 
                tilesColor: Response.data.appearance.tilesColor,
                fontSizes: Response.data.appearance.fontSizes,
                markColor: Response.data.appearance.markColor
                })
            setOwnerId(Response.data.authorId)    
        } else {
            navigate(-1); 
            infoOn('You cant edit this card, because it was already played!', 'error')
        }
    })
}, []);
   
    return (
    <> 
        {isOwned(ownerId) &&  canEdit? 
        <CreateEditComplex saveEditCard={saveCard} initialState={initialState} type='edit'></CreateEditComplex> 
        :
        <Typography 
                        variant="h5" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        color: '#fff'
                        }} 
                        component="div">
                            You can't edit this card.
        </Typography > 
        }
    </>   
    )
}