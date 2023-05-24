import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useEffect } from 'react';
import { GithubPicker  } from 'react-color'
import { Popover } from '@mui/material';
import { createCardFetch } from '../api/game';
import { useSelector } from 'react-redux';
import { RootState } from '../state/reducers';
import BingoField from '../components/BingoField/BingoField';
import {IconButton} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { refreshFetch } from '../api/auth';
import RefreshIcon from '@mui/icons-material/Refresh';
import Navbar from '../components/Navbar/Navbar';

export default function CreateCardPage() {
    const [phrases, setPhrases] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [description, setDescription] = useState<string>('')
    const [header, setHeader] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('#273146')
    const [textColor, setTextColor] = useState<string>('#fff')
    const [backgroundColor, setBackgroundColor] = useState<string>('#C2CCE1')
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state).auth

    const handleSaveCard = async (e: React.FormEvent) => {
        refreshFetch().then(Result => {
        createCardFetch(auth['id'], phrases, header, description, tags.filter((letter) => letter !== ""), backgroundColor, textColor, tilesColor, 'default').then(Response => {
            navigate(`../card/${Response.id}`);  })
    })}

    const handleResortPhrases = async (e: React.FormEvent) => {
        setPhrases(phrases.sort(() => Math.random() - 0.5).slice())
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
            <BingoField header={header} 
                setHeader={setHeader} 
                backgroundColor={backgroundColor} 
                tilesColor={tilesColor} 
                textColor={textColor} 
                phrases={phrases}
                headerEditable={true}
                ></BingoField>

            <Button
                        size="medium"
                        aria-haspopup="true"
                        aria-label="password requirements"
                        onClick={handleSaveCard}
                        color="primary"
                        variant="outlined"
                        sx={{ marginTop: 1, marginRight: 1}}
                        >
                            <SaveIcon fontSize="large" style={{ color: "#fff", aspectRatio: '1/1' }}></SaveIcon>
                       
            </Button>
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