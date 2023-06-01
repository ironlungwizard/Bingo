import * as React from 'react';
import { canEditCardFetch, updateCardFetch } from '../api/game';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/reducers';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { refreshFetch } from '../api/auth';
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
    const dispatch = useDispatch();
    const [canEdit, setCanEdit] = useState<boolean>(true)
    const [ownerId, setOwnerId] = useState<string>('')
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
    const {id} = useParams<string>();
    const [initialState, setInitialState] = useState<Card>()

    useMemo(() =>  {canEditCardFetch(id!).then(Response => {
        setCanEdit(Response)
     })}, []);

    const saveCard = async (card: Card) => {
        refreshFetch().then(Result => {
            updateCardFetch(auth['id'], card, 'default', id!).then(Response => {
                navigate(`../card/edit/${Response.id}`);  })
    })}


    useMemo(() =>  {
        getCardFetch(id!).then(Response => {
        if (Response) {
            setInitialState({
                phrases: Response.phrases, 
                title: Response.title, 
                description: Response.description, 
                tags: Response.tags, 
                backgroundColor: Response.appearance.backgroundColor, 
                textColor: Response.appearance.textColor, 
                tilesColor: Response.appearance.tilesColor
                })
            setOwnerId(Response.authorId)    
        } else {
            navigate(`..`); 
            errorOn('Card not found! It may be deleted or URL is not right.')
        }
    })
}, []);
   
    return (
    <> 
        {canEdit && isOwned(ownerId) ? 
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