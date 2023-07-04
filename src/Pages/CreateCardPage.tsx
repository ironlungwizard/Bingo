import * as React from "react";
import { createCardFetch } from "../api/game";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { useNavigate } from "react-router-dom";
import CreateEditComplex from "../components/CreateEditComplex/CreateEditComplex";
import Card from "../types/CardType";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "../state";
import { Box, Typography } from "@mui/material";

export default function CreateCardPage() {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state).auth;
    const dispatch = useDispatch();
    const { login, infoOn } = bindActionCreators(actionCreators, dispatch);

    const saveCard = async (
        card: Card,
        guestId?: string,
        guestName?: string
    ) => {
        if (guestId && guestName) {
            createCardFetch(guestId, card, "default").then(
                (Response: XMLHttpRequest["response"]) => {
                    navigate(`../card/edit/${Response.data.id}`);
                }
            );
            login(guestId, true, guestName);
            infoOn("Card saved!", "success");
        } else {
            createCardFetch(auth["id"], card, "default").then(
                (Response: XMLHttpRequest["response"]) => {
                    navigate(`../card/edit/${Response.data.id}`);
                }
            );
            infoOn("Card saved!", "success");
        }
    };

    return (
        <>
            <CreateEditComplex
                saveEditCard={saveCard}
                type="create"
            ></CreateEditComplex>
        </>
    );
}
