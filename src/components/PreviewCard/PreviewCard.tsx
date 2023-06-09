import {
    Button,
    Card,
    CardHeader,
    Chip,
    Grid,
    Stack,
    Typography,
    styled,
} from "@mui/material";
import * as React from "react";
import { getCard } from "../../api/game";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAttributesById } from "../../api/auth";
import PreviewIcon from "@mui/icons-material/Preview";

export default function ErrorSnackBar({ id }: { id: string }) {
    const [title, setTitle] = useState<string>();
    const [ownerName, setOwnerName] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [img, setImg] = useState<any>();
    const navigate = useNavigate();

    const Item = styled(Card)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    useMemo(() => {
        getCard(id).then((Response: XMLHttpRequest["response"]) => {
            if (Response) {
                setTitle(Response.data.title);
                setTags(Response.data.tags);
                getAttributesById(Response.data.authorId).then(
                    (Response: XMLHttpRequest["response"]) => {
                        setOwnerName(Response.data.name);
                    }
                );
            } else {
            }
        });
    }, [id]);

    const tagChips = tags.map((tag, index) => (
        <Chip
            size="small"
            color="primary"
            variant="outlined"
            label={tag}
            key={index}
        />
    ));

    return (
        <Grid item xs={"auto"} lg={"auto"} md={"auto"} sm={"auto"}>
            <Link to={`/card/${id}`}>
                <Item
                    sx={{
                        minWidth: 300,
                        backgroundColor: "#273049",
                        height: 370,
                    }}
                >
                    <Stack direction="column" sx={{ alignItems: "center" }}>
                        <div title={title ? title : "No title"}>
                            <Typography
                                style={{ wordWrap: "break-word" }}
                                sx={{
                                    marginX: 1,
                                    wordWrap: "break-word",
                                    display: "-webkit-box",
                                    overflow: "hidden",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    fontSize: 17.5,
                                    maxWidth: 266,
                                }}
                                title={title}
                                component="div"
                            >
                                {title ? title : "No title"}
                            </Typography>
                        </div>
                        <div
                            style={{
                                width: 244,
                                height: 244,
                                overflow: "hidden",
                                margin: 8,
                                marginBottom: 0,
                                alignContent: "center",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                display: "flex",
                            }}
                        >
                            <img
                                src={`http://localhost/i/cards/${id}/image-untitled-full.png`}
                                style={{
                                    width: 410,
                                    marginTop: 0,
                                    height: 420,
                                    objectFit: "contain",
                                    objectPosition: "center",
                                }}
                            ></img>
                        </div>

                        <div title={ownerName}>
                            <CardHeader
                                title={ownerName}
                                sx={{
                                    wordWrap: "break-word",
                                    overflow: "hidden",
                                    padding: "8px",
                                    maxWidth: 266,
                                }}
                            />
                        </div>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                overflow: "hidden",
                                maxWidth: 270,
                            }}
                        >
                            {tagChips}
                        </Stack>
                    </Stack>
                </Item>
            </Link>
        </Grid>
    );
}
