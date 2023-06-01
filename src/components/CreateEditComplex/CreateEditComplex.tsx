import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useMemo, useState } from 'react';
import { GithubPicker  } from 'react-color'
import BingoField from '../BingoField/BingoField';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import Card from '../../types/CardType';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../state/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { signUpGuestFetch } from '../../api/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../state';

const CreateEditComplex = ({saveEditCard, type, initialState}:{saveEditCard: Function, type: string, initialState?: Card}) => {

    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('#273146')
    const [textColor, setTextColor] = useState<string>('#fff')
    const [backgroundColor, setBackgroundColor] = useState<string>('#C2CCE1')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = bindActionCreators(actionCreators, dispatch)
    const { pathname } = useLocation();
    const auth = useSelector((state: RootState) => state).auth
    useMemo(() => {
    if (type == 'edit' && initialState) {
        setPhrases(initialState.phrases) 
        setTags(initialState.tags)
        setDescription(initialState.description)
        setTitle(initialState.title)
        setTilesColor(initialState.tilesColor)
        setTextColor(initialState.textColor)
        setBackgroundColor(initialState.backgroundColor)
    }}, [initialState]);

    const handleResortPhrases = async () => {
        setPhrases(phrases.sort(() => Math.random() - 0.5).slice())
    }
    const handleToCard = async () => {
        navigate(`../card/` + pathname.replace('/card/edit/', ''));  
    }
    const handleSaveEditCard = async () => {
        let card: Card = {
            phrases: phrases, 
            title: title, 
            description: description, 
            tags: tags, 
            backgroundColor: backgroundColor, 
            textColor: textColor, 
            tilesColor: tilesColor
          };
        if (!auth['id']) {
            signUpGuestFetch().then(Response => {
                saveEditCard(card, Response.id, Response.name)
             })  
        } else {
            saveEditCard(card)
        }
    }




    return (
    <> 
    <div style={{display: 'flex', flexDirection: 'column'}}>
         <TextField
          id="standard-multiline-static"
          label="Phrases (split by Enter)"
          multiline
          rows={32}
          value={phrases.join('\r\n')}
          onChange={(e) => {setPhrases(e.target.value.split(/[\r\n]+/).slice(0,50))}} 
          variant="outlined"
          sx={{width: 420, minWidth: 220, marginLeft: 3, marginRight: 2}}
        />
        <Button
                        size="medium"
                        aria-haspopup="true"
                        aria-label="password requirements"
                        onClick={handleResortPhrases}
                        color="primary"
                        variant="outlined"
                        sx={{ marginTop: 1, marginRight: 1, width: 420, minWidth: 220, marginLeft: 3}}
                        >
                            <RefreshIcon fontSize="large" style={{ color: "#fff", aspectRatio: '1/1' }}></RefreshIcon>
                       
        </Button>
        </div>
        <div>
            <BingoField title={title} 
                isAGame={false}
                setTitle={setTitle} 
                backgroundColor={backgroundColor} 
                tilesColor={tilesColor} 
                textColor={textColor} 
                phrases={phrases}
                headerEditable={true}
                playable={false}
                ></BingoField>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
                        size="medium"
                        aria-haspopup="true"
                        aria-label="password requirements"
                        onClick={handleSaveEditCard}
                        color="primary"
                        variant="outlined"
                        sx={{ marginTop: 1, marginRight: 1}}
                        >
                            <SaveIcon fontSize="large" style={{ color: "#fff", aspectRatio: '1/1' }}></SaveIcon>
                       
            </Button>
            {type == 'edit' ?
                <Button
                size="medium"
                aria-haspopup="true"
                aria-label="password requirements"
                onClick={handleToCard}
                color="primary"
                variant="outlined"
                sx={{ marginTop: 1, marginRight: 1, width: 120, marginLeft: 3}}
                >
                    To card
                                    <ArrowForwardIcon fontSize="large" style={{ color: "#fff", aspectRatio: '1/1' }}></ArrowForwardIcon>
            
                </Button> : <></>
            }
        </div>
        </div>
       
        <Box sx={{  display: 'flex', flexDirection: 'column', width: 420, minWidth: 220, marginRight: 3, marginLeft: 2, justifyContent: 'left'}}>
                            <Typography 
                                variant="h6" 
                                style={{ wordWrap: "break-word"}} 
                                sx={{display: '-webkit-box', 
                                overflow: 'hidden', 
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                color: "#fff"
                                }} 
                                component="div">
                                   Background color
                            </Typography >
                            <GithubPicker
                             onChangeComplete={(color) => setBackgroundColor(color.hex)}
                            />
                            <Typography 
                                variant="h6" 
                                style={{ wordWrap: "break-word"}} 
                                sx={{display: '-webkit-box', 
                                overflow: 'hidden', 
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                color: "#fff"
                                }} 
                                component="div">
                                    Tiles color
                            </Typography > 
                            <GithubPicker
                             onChangeComplete={(color) => setTilesColor(color.hex)}
                            />
                            <Typography 
                                variant="h6" 
                                style={{ wordWrap: "break-word"}} 
                                sx={{display: '-webkit-box', 
                                overflow: 'hidden', 
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                color: "#fff"
                                }} 
                                component="div">
                                    Font color
                            </Typography > 
                            <GithubPicker
                             onChangeComplete={(color) => setTextColor(color.hex)}
                            />
                            <TextField 
                                margin="dense"
                                value={tags} 
                                label="Tags (split by ,)"
                                onChange={(e) => {setTags(e.target.value.split(','))}} 
                                fullWidth 
                                id="Tags" 
                                autoFocus={false} 
                                sx={{marginTop: 5}}> 
                            </TextField>
                            <TextField
                                id="standard-multiline-static"
                                label="Description"
                                multiline
                                rows={10}
                                value={description}
                                onChange={(e) => {setDescription(e.target.value)}} 
                                variant="outlined"
                                sx={{marginTop: 2}}
                    />
        </Box>
        
    </> 
        
    )
}


export default CreateEditComplex