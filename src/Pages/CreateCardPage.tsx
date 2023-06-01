import * as React from 'react';
import { createCardFetch } from '../api/game';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/reducers';
import { useNavigate } from 'react-router-dom';
import { refreshFetch } from '../api/auth';
import CreateEditComplex from '../components/CreateEditComplex/CreateEditComplex';
import Card from '../types/CardType';
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "../state";


export default function CreateCardPage() {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state).auth
    const dispatch = useDispatch();
    const { login } = bindActionCreators(actionCreators, dispatch)

    const saveCard = async (card: Card, guestId?: string, guestName?: string) => {
        refreshFetch().then(Result => {
            if (guestId && guestName) {
            createCardFetch(guestId, card, 'default').then(Response => {
            navigate(`../card/edit/${Response.id}`);  })
            login(guestId, true,  guestName)
        } else {
            createCardFetch(auth['id'], card, 'default').then(Response => {
                navigate(`../card/edit/${Response.id}`);  })
        }
    })}


    return (
    <> 
        <CreateEditComplex saveEditCard={saveCard} type='create'></CreateEditComplex>
    </>   
    )
}