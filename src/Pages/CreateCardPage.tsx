import * as React from 'react';
import { createCardFetch } from '../api/game';
import { useSelector } from 'react-redux';
import { RootState } from '../state/reducers';
import { useNavigate } from 'react-router-dom';
import { refreshFetch } from '../api/auth';
import CreateEditComplex from '../components/CreateEditComplex/CreateEditComplex';
import Card from '../types/CardType';

export default function CreateCardPage() {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state).auth

    const saveCard = async (card: Card) => {
        console.log(card)
        refreshFetch().then(Result => {
        createCardFetch(auth['id'], card, 'default').then(Response => {
            navigate(`../card/edit/${Response.id}`);  })
    })}


    return (
    <> 
        <CreateEditComplex saveEditCard={saveCard} type='create'></CreateEditComplex>
    </>   
    )
}