import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { canEditCard, cloneCard, getCard } from "../api/game";
import BingoField from "../components/BingoField/BingoField";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import isOwned from "../utils/isOwned";
import { deleteCards } from "../api/game";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/reducers";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "../state";
import { Box, Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { getAttributesById, signUpGuest } from "../api/auth";
import { canShareCard } from "../api/game";
import { Helmet } from "react-helmet-async";
import ModalDeleteConfirm from "../ModalDeleteConfirm/ModalDeleteConfirm";

export default function InspectCardPage() {
    const frontUrl = process.env.REACT_APP_FRONT_URL;
    const dbUrl = process.env.REACT_APP_DB_URL;
    const [authorId, setAuthorId] = useState<string>("");
    const [cardId, setCardId] = useState<string>("");
    const [phrases, setPhrases] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([""]);
    const [description, setDescription] = useState<string>("");
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [tilesColor, setTilesColor] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
    const [textColor, setTextColor] = useState<string>("");
    const [markColor, setMarkColor] = useState<string>("");
    const [fontSizes, setFontSizes] = useState<number[]>([]);
    const [backgroundColor, setBackgroundColor] = useState<string>("");
    const { id } = useParams<string>();
    const auth = useSelector((state: RootState) => state).auth;
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [canShare, setCanShare] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { infoOn, infoOff } = bindActionCreators(actionCreators, dispatch);
    const { showSingUp, showLogIn, hide } = bindActionCreators(
        actionCreators,
        dispatch
    );
    const { login } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        getCard(id!).then((Response: XMLHttpRequest["response"]) => {
            if (Response && !Response.data.detail) {
                setPhrases(Response.data.phrases);
                setTags(Response.data.tags);
                setDescription(Response.data.description);
                setTitle(Response.data.title);
                setTilesColor(Response.data.appearance.tilesColor);
                setTextColor(Response.data.appearance.textColor);
                setMarkColor(Response.data.appearance.markColor);
                setBackgroundColor(Response.data.appearance.backgroundColor);
                setAuthorId(Response.data.authorId);
                setCardId(Response.data.id);
                setFontSizes(Response.data.appearance.fontSizes);
                getAttributesById(Response.data.authorId).then(
                    (Response: XMLHttpRequest["response"]) => {
                        setOwnerName(Response.data.name);
                    }
                );
                canShareCard(id!).then(
                    (Response: XMLHttpRequest["response"]) => {
                        setCanShare(Response.data);
                    }
                );
            } else {
                navigate(-1);
                infoOn(
                    "You cant edit this card, because it was already played!",
                    "error"
                );
            }
        });
    }, [id]);
    console.log(isOwned(auth["id"]));
    const handleDeleteCard = async () => {
        deleteCards(cardId, auth["id"]).then((Response) => {
            navigate(-1);
            infoOn("Card deleted!", "success");
        });
    };

    const handleEditCard = async () => {
        navigate("/card/edit/" + id);
    };

    const handlePlayCard = async () => {
        navigate("/card/" + id + "/gamestart");
    };

    const handleShareCard = async () => {
        if (auth["isGuest"] || !auth["id"]) {
            showSingUp();
        } else {
            var canShare = false;
            canShareCard(id!).then((Response: XMLHttpRequest["response"]) => {
                canShare = Response.data;
                if (canShare) {
                    navigator.clipboard.writeText(frontUrl + pathname);
                    infoOn("Link copied!", "success");
                }
            });
        }
    };

    const handleCloneCard = async () => {
        if (auth["id"]) {
            cloneCard(auth["id"], cardId).then(
                (Response: XMLHttpRequest["response"]) => {
                    navigate("/card/" + Response.data.id);
                    setCardId(Response.data.id);
                    setCanEdit(true);
                    infoOn("Card cloned!", "success");
                }
            );
        } else {
            signUpGuest().then((Response: XMLHttpRequest["response"]) => {
                login(Response.data.id, true, Response.data.name);
                cloneCard(auth["id"], cardId).then(
                    (Response: XMLHttpRequest["response"]) => {
                        navigate("/card/" + Response.data.id);
                        setCardId(Response.data.id);
                        setCanEdit(true);
                        infoOn("Card cloned!", "success");
                    }
                );
            });
        }
    };

    useEffect(() => {
        canEditCard(id!).then((Response: XMLHttpRequest["response"]) => {
            setCanEdit(Response.data);
        });
    }, []);
    useEffect(() => {
        setIsOwner(authorId == auth["id"]);
    }, [auth["id"], authorId]);

    const tagChips = tags.map((tag, index) => (
        <Chip color="primary" variant="outlined" label={tag} key={index} />
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
                    Card page
                </Typography>
            </Box>
            <Helmet>
                <link rel="canonical" href={frontUrl + pathname} />
                <meta
                    property="og:image"
                    content={`${dbUrl}cards/${id}/image?size=full&withTitle=true`}
                />
            </Helmet>
            {isOwner || canShare ? (
                <Stack
                    direction={{ xs: "column", lg: "row" }}
                    sx={{
                        width: "100%",
                        justifyContent: "space-around",
                        alignItems: { xs: "center", lg: "inherit" },
                    }}
                >
                    <Box
                        sx={{
                            order: { xs: "2", lg: "1" },
                            width: { sm: "626px", xs: "374px", lg: "375px" },
                            marginTop: { xs: "16px", lg: "0" },
                            marginLeft: { xs: "0", lg: "10px" },
                            marginRight: { xs: "0", lg: "6px" },
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{ wordWrap: "break-word" }}
                            sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                color: "#ffffff",
                                marginBottom: 2,
                            }}
                            component="div"
                        >
                            Author: {ownerName} <br />
                        </Typography>
                        <Typography
                            variant="h5"
                            style={{ wordWrap: "break-word" }}
                            sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                color: "#ffffff",
                                marginBottom: 1,
                            }}
                            component="div"
                        >
                            Tags: <br />
                        </Typography>
                        <Stack
                            useFlexGap
                            sx={{ marginBottom: 2 }}
                            flexWrap="wrap"
                            direction="row"
                            spacing={{ xs: 1, sm: 0.5 }}
                        >
                            {tagChips}
                        </Stack>
                        <Typography
                            variant="h5"
                            style={{ wordWrap: "break-word" }}
                            sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                color: "#ffffff",
                            }}
                            component="div"
                        >
                            Description:
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{ wordWrap: "break-word" }}
                            sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                color: "#ffffff",
                            }}
                            component="div"
                        >
                            {description}
                        </Typography>
                    </Box>
                    <Box sx={{ order: { xs: "1", lg: "2" } }}>
                        <BingoField
                            title={title}
                            isAGame={false}
                            setTitle={setTitle}
                            backgroundColor={backgroundColor}
                            tilesColor={tilesColor}
                            textColor={textColor}
                            phrases={phrases}
                            headerEditable={false}
                            playable={false}
                            fontSizes={fontSizes}
                            markColor={markColor}
                        ></BingoField>
                        <ModalDeleteConfirm
                            deleteFunction={handleDeleteCard}
                            open={openModal}
                            setOpen={setOpenModal}
                        ></ModalDeleteConfirm>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                variant="outlined"
                                onClick={handlePlayCard}
                                title={"Play"}
                                sx={{
                                    marginTop: 1,
                                    marginRight: 1,
                                    width: { xs: 64, sm: 120 },
                                }}
                            >
                                <PlayArrowIcon
                                    fontSize="large"
                                    style={{ color: "#ffffff" }}
                                ></PlayArrowIcon>
                            </Button>

                            <div>
                                {isOwner && canEdit ? (
                                    <Button
                                        size="medium"
                                        aria-haspopup="true"
                                        color="primary"
                                        variant="outlined"
                                        title={"Edit card"}
                                        sx={{ marginTop: 1, marginLeft: 1 }}
                                        onClick={handleEditCard}
                                    >
                                        <EditIcon
                                            fontSize="large"
                                            style={{ color: "#ffffff" }}
                                        ></EditIcon>
                                    </Button>
                                ) : (
                                    <Button
                                        size="medium"
                                        aria-haspopup="true"
                                        color="primary"
                                        variant="outlined"
                                        title={"Edit card"}
                                        disabled
                                        sx={{ marginTop: 1, marginLeft: 1 }}
                                    >
                                        <EditIcon
                                            fontSize="large"
                                            style={{ color: "#ffffff" }}
                                        ></EditIcon>
                                    </Button>
                                )}
                                <Button
                                    size="medium"
                                    aria-haspopup="true"
                                    color="primary"
                                    onClick={handleCloneCard}
                                    title={"Clone card"}
                                    variant="outlined"
                                    sx={{ marginTop: 1, marginLeft: 1 }}
                                >
                                    <FileCopyIcon
                                        fontSize="large"
                                        style={{ color: "#ffffff" }}
                                    ></FileCopyIcon>
                                </Button>
                                <Button
                                    size="medium"
                                    aria-haspopup="true"
                                    color="primary"
                                    onClick={handleShareCard}
                                    title={"Share card"}
                                    variant="outlined"
                                    sx={{ marginTop: 1, marginLeft: 1 }}
                                >
                                    <ShareIcon
                                        fontSize="large"
                                        style={{ color: "#ffffff" }}
                                    ></ShareIcon>
                                </Button>
                                {isOwner ? (
                                    <Button
                                        size="medium"
                                        aria-haspopup="true"
                                        color="primary"
                                        variant="outlined"
                                        title={"Delete card"}
                                        sx={{ marginTop: 1, marginLeft: 1 }}
                                        onClick={() => {
                                            setOpenModal(true);
                                        }}
                                    >
                                        <DeleteIcon
                                            fontSize="large"
                                            style={{ color: "#ffffff" }}
                                        ></DeleteIcon>
                                    </Button>
                                ) : (
                                    <Button
                                        size="medium"
                                        aria-haspopup="true"
                                        color="primary"
                                        variant="outlined"
                                        title={"Delete card"}
                                        disabled
                                        sx={{ marginTop: 1, marginLeft: 1 }}
                                    >
                                        <DeleteIcon
                                            fontSize="large"
                                            style={{ color: "#ffffff" }}
                                        ></DeleteIcon>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Box>

                    <Box
                        sx={{
                            order: 3,
                            width: { sm: "0px", xs: "0px", lg: "390px" },
                        }}
                    />
                </Stack>
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        style={{ wordWrap: "break-word" }}
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            color: "#ffffff",
                        }}
                        component="div"
                    >
                        You can't inspect this card.
                    </Typography>
                </Box>
            )}
        </div>
    );
}
