import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { deleteCards, getCards, getTags } from "../api/game";
import { createCard } from "../api/game";
import { useMemo, useState, useEffect } from "react";
import {
    Box,
    Card,
    CardHeader,
    Chip,
    Grid,
    IconButton,
    Stack,
    styled,
} from "@mui/material";
import CardGamesPlate from "../components/CardGamesPlate/CardGamesPlate";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewCard from "../components/PreviewCard/PreviewCard";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "../state";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const [ids, setIds] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [checkedTags, setCheckedTags] = useState<string[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { infoOn, infoOff } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        getCards(20, checkedTags).then(
            (Response: XMLHttpRequest["response"]) => {
                if (Response && !Response.data.detail) {
                    setIds(Response.data);
                }
            }
        );
    }, [checkedTags]);

    useEffect(() => {
        getTags(checkedTags).then((Response: XMLHttpRequest["response"]) => {
            if (Response && !Response.data.detail) {
                setTags(Response.data.slice(0, 15));
            }
        });
    }, [checkedTags]);

    const handleClickTag = async (tag: string, index: number) => {
        setCheckedTags([...checkedTags, tag]);
        setTags(tags.splice(index, 1));
    };

    const handleDeleteTag = async (tag: string, index: number) => {
        var arr = [...checkedTags];
        setCheckedTags(arr.filter((word) => word != tag));
    };

    const clearCheckedTags = async () => {
        setCheckedTags([]);
    };

    const cards = ids.map((id, index) => (
        <PreviewCard key={index} id={id}></PreviewCard>
    ));

    const checkedTagChips = checkedTags.map((tag, index) => (
        <Chip
            color="primary"
            onDelete={(e) => {
                handleDeleteTag(tag, index);
            }}
            variant="outlined"
            label={tag}
            key={index}
            sx={{ marginTop: "8px" }}
        />
    ));
    const tagChips = tags
        .filter((item) => !checkedTags.includes(item))
        .map((tag, index) => (
            <Chip
                label={tag}
                onClick={(e) => {
                    handleClickTag(tag, index);
                }}
                color="primary"
                variant="outlined"
                key={index}
                sx={{ marginTop: "8px" }}
            />
        ));

    return (
        <div style={{ width: "100%" }}>
            <Box>
                <Typography
                    variant="h5"
                    style={{ wordWrap: "break-word" }}
                    sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        color: "#ffffff",
                        marginLeft: 6,
                        marginTop: 2,
                        marginBottom: 2,
                    }}
                    component="div"
                >
                    Landing page
                </Typography>
            </Box>
            <Stack
                flexWrap="wrap"
                direction="row"
                sx={{
                    marginLeft: 4,
                    marginRight: 4,
                    marginBottom: 2,
                    maxWidth: "95%",
                    overflow: "hidden",
                    alignItems: " flex-start",
                }}
            >
                {checkedTags.length > 0 ? (
                    <IconButton
                        onClick={clearCheckedTags}
                        aria-label="Clear checked tags"
                        size="large"
                        style={{ marginTop: 2, marginRight: 6, padding: "6px" }}
                    >
                        <DeleteIcon
                            fontSize="large"
                            color="primary"
                        ></DeleteIcon>
                    </IconButton>
                ) : (
                    <></>
                )}
                {checkedTagChips}
                {tagChips}
            </Stack>

            <Grid
                container
                spacing={5}
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    paddingLeft: 30,
                    paddingBottom: 50,
                    paddingRight: 30,
                }}
            >
                {cards}
            </Grid>
        </div>
    );
}
