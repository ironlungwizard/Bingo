import * as React from 'react';
import { updateCardFetch } from '../api/game';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/reducers';
import { useLocation, useNavigate } from 'react-router-dom';
import { refreshFetch } from '../api/auth';
import CreateEditComplex from '../components/CreateEditComplex/CreateEditComplex';
import Card from '../interfaces/CardType';
import { useMemo } from 'react';
import { getCardFetch } from '../api/game';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../state';
import { useState } from 'react';

export default function EditCardPage() {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state).auth
    const dispatch = useDispatch();
    const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
    const [initialState, setInitialState] = useState<Card>()
    const [tate, setTate] = useState<string>()
    const { pathname } = useLocation();
    const saveCard = async (card: Card) => {
        refreshFetch().then(Result => {
            updateCardFetch(auth['id'], card, 'default', pathname.replace('/card/edit/', '')).then(Response => {
            navigate(`../card/${Response.id}`);  })
    })}

    useMemo(() =>  {getCardFetch(pathname.replace('/card/edit/', '')).then(Response => {
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
        } else {
            navigate(`..`); 
            errorOn('Card not found! It may be deleted or URL is not right.')
        }
    })}, []);
   
    return (
    <> 
        <CreateEditComplex saveEditCard={saveCard} initialState={initialState} type='edit'></CreateEditComplex>
    </>   
    )
}