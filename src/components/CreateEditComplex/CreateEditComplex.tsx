import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useMemo, useState } from 'react';
import { HexColorPicker } from "react-colorful";
import BingoField from '../BingoField/BingoField';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import Card from '../../types/CardType';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../state/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { signUpGuestFetch } from '../../api/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../state';
import PreviewIcon from '@mui/icons-material/Preview';
import { Grid, Paper, Stack } from '@mui/material';
import TileX from '../../images/TileX';

const CreateEditComplex = ({saveEditCard, type, initialState}:{saveEditCard: Function, type: string, initialState?: Card}) => {

    const [phrases, setPhrases] = useState<string[]>([])
    const [fontSizes, setFontSizes] = useState<string[]>(Array(25).fill('1.25rem'))
    const [tags, setTags] = useState<string[]>([])
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [tilesColor, setTilesColor] = useState<string>('#273146')
    const [textColor, setTextColor] = useState<string>('#ffffff')
    const [markColor, setMarkColor] = useState<string>('#000000')
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
        setMarkColor(initialState.markColor)
        setTextColor(initialState.textColor)
        setFontSizes(initialState.fontSizes)
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
            tags: tags.map(element => {return element.trim();}).filter(Boolean), 
            backgroundColor: backgroundColor, 
            textColor: textColor, 
            tilesColor: tilesColor,
            markColor: markColor,
            fontSizes: fontSizes
          };
        if (!auth['id']) {
            signUpGuestFetch().then((Response: XMLHttpRequest["response"]) => {
                saveEditCard(card, Response.data.id, Response.data.name)
             })  
        } else {
            saveEditCard(card)
        }
    }

    const handleSetPhrases = async (e: React.ChangeEvent<any>) => {
        var phrasesArray = e.target.value.split(/[\r\n]+/).slice(0,50)
        phrasesArray.forEach((value: string, index: number) => {
           if(value.length > 45) {
                var fontSizesArray = fontSizes
                fontSizesArray[index] = '0.90rem'
                setFontSizes(fontSizesArray)
           } else if(value.length > 27) {
                var fontSizesArray = fontSizes
                fontSizesArray[index] = '1rem'
                setFontSizes(fontSizesArray)
           } else {
                var fontSizesArray = fontSizes
                fontSizesArray[index] = '1.25rem'
                setFontSizes(fontSizesArray)
           }
        });
        setPhrases(phrasesArray)
    }




    return (
    <> 
    <Stack direction='column' sx={{justifyContent: 'space-around', width: '100%'}}>
    <Stack direction={{ xs: 'column', lg: 'row' }} sx={{justifyContent: 'space-around', width: '100%', alignItems: {lg:'flex-start', xs: 'center'}}}>
    {/* <Box sx={{ order: {xs: '2', lg: '1'}, width: {xs: '626px', lg: '420px'}, marginTop: {xs: '16px', lg: '0'}, marginLeft: {xs: '0', lg: '24px'}, marginRight: {xs: '0', lg: '16px'}}} 
    style={{display: 'flex', flexDirection: 'column',  minWidth: 160}}>
         <TextField
          id="standard-multiline-static"
          label="Phrases (split by Enter)"
          multiline
          minRows={4}
          maxRows={33}
          title={'Textfield for phrases'}
          value={phrases.join('\r\n')}
          onChange={(e) => {handleSetPhrases(e)}} 
          variant="outlined"
          sx={{ minWidth: 10}}
        />
        <Button
                        size="medium"
                        aria-haspopup="true"
                        aria-label="password requirements"
                        onClick={handleResortPhrases}
                        color="primary"
                        variant="outlined"
                        title={'Randomize phrases'}
                        sx={{ marginTop: 1,   minWidth: 160}}
                        >
                            <RefreshIcon fontSize="large" style={{ color: "#ffffff", aspectRatio: '1/1' }}></RefreshIcon>
                       
        </Button>
        </Box> */}
        <Box sx={{ order: {xs: '1', lg: '2'} }}>
            <BingoField title={title} 
                markColor={markColor}
                isAGame={false}
                setTitle={setTitle} 
                backgroundColor={backgroundColor} 
                tilesColor={tilesColor} 
                textColor={textColor} 
                phrases={phrases}
                headerEditable={true}
                playable={false}
                fontSizes={fontSizes}
                ></BingoField>
        {/* <Box  style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
                        size="medium"
                        aria-haspopup="true"
                        aria-label="password requirements"
                        onClick={handleSaveEditCard}
                        color="primary"
                        variant="outlined"
                        title={'Save card'}
                        sx={{ marginTop: 1, marginRight: 1}}
                        >
                            <SaveIcon fontSize="large" style={{ color: "#ffffff", aspectRatio: '1/1' }}></SaveIcon>
                       
            </Button>
            {type == 'edit' ?
                <Button
                size="medium"
                aria-haspopup="true"
                aria-label="password requirements"
                onClick={handleToCard}
                color="primary"
                variant="outlined"
                title={'View card'}
                sx={{ marginTop: 1, marginRight: 1, width: 120, marginLeft: 3}}
                >
                  
                  <PreviewIcon  fontSize="large" style={{ color: "#ffffff"}}></PreviewIcon>
            
                </Button> : <></>
            }
        </Box> */}
        </Box>
       
            {/* <Box sx={{  order: '3',  display: 'flex', alignItems: 'center', flexDirection: 'column', width: {xs: '626px', lg: '420px'}, minWidth: 160, marginLeft: {xs: '0', lg: '16px'}, marginRight: {xs: '0', lg: '24px'}, alignContent: 'center'}}>
                            <TextField 
                                margin="dense"
                                value={tags} 
                                label="Tags (split by ,)"
                                onChange={(e) => {setTags(e.target.value.split(','))}} 
                                fullWidth 
                                sx={{marginTop: {xs: '16px', lg: '0'}}}
                                id="Tags" 
                                title={'Textfield for tags'}
                                autoFocus={false} 
                                >
                            </TextField>
                            <TextField
                                id="standard-multiline-static"
                                label="Description"
                                multiline
                                rows={10}
                                title={'Textfield for description'}
                                value={description}
                                onChange={(e) => {setDescription(e.target.value)}} 
                                variant="outlined"
                                sx={{marginTop: 2, width: '100%'}}
                            />
                            <Paper sx={{aspectRatio: '1/1', width: '130px',  alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: backgroundColor, marginTop: 2}}>
                                <Paper sx={{aspectRatio: '1/1', width: '117px',  alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: tilesColor}}>
                                    <Typography 
                                        variant="h6" 
                                        style={{ wordWrap: "break-word", padding: 5}} 
                                        sx={{display: '-webkit-box', 
                                        overflow: 'hidden', 
                                        fontSize: '1rem',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: '5',
                                        color: textColor
                                        }} 
                                        align='center'
                                        component="div">
                                            Random text for checked example
                                    </Typography > 
                                    <TileX color={markColor}></TileX>
                                </Paper>
                            </Paper>
                          
                            
        </Box> */}
        </Stack>
        <Grid container spacing={5} style={{display: 'flex', justifyContent: 'space-evenly', marginTop: 50,paddingBottom:50}}>
                        <Grid item xs={'auto'} lg={'auto'} md={'auto'} sm={'auto'} >
                            <Typography 
                                variant="h6"
                                style={{ wordWrap: "break-word"}} 
                                sx={{display: '-webkit-box', 
                                overflow: 'hidden', 
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                color: "#ffffff"
                                }} 
                                component="div">
                                   Background color
                            </Typography >
                            <HexColorPicker style={{height: '250px', width: '250px', marginTop: 10}}
                             color={backgroundColor}
                             onChange={(color) => setBackgroundColor(color)}
                            />
                            </Grid>
                            <Grid item xs={'auto'} lg={'auto'} md={'auto'} sm={'auto'} >
                            <Typography 
                                variant="h6" 
                                style={{ wordWrap: "break-word"}} 
                                sx={{display: '-webkit-box', 
                                overflow: 'hidden', 
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                color: "#ffffff"
                                }} 
                                component="div">
                                    Tiles color
                            </Typography > 
                            <HexColorPicker style={{height: '250px', width: '250px', marginTop: 10}}
                             color={tilesColor}
                             onChange={(color) => setTilesColor(color)}
                            />
                            </Grid>
                            <Grid item xs={'auto'} lg={'auto'} md={'auto'} sm={'auto'} >
                            <Typography 
                                variant="h6" 
                                style={{ wordWrap: "break-word"}} 
                                sx={{display: '-webkit-box', 
                                overflow: 'hidden', 
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                color: "#ffffff"
                                }} 
                                component="div">
                                    Font color
                            </Typography > 
                            <HexColorPicker style={{height: '250px', width: '250px', marginTop: 10}}
                             color={textColor}
                             onChange={(color) => setTextColor(color)}
                            />
                            </Grid>
                            <Grid item xs={'auto'} lg={'auto'} md={'auto'} sm={'auto'} >
                            <Typography 
                                variant="h6" 
                                style={{ wordWrap: "break-word"}} 
                                sx={{display: '-webkit-box', 
                                overflow: 'hidden', 
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                color: "#ffffff"
                                }} 
                                component="div">
                                    Mark color
                            </Typography > 
                            <HexColorPicker style={{height: '250px', width: '250px', marginTop: 10}}
                             color={markColor}
                             onChange={(color) => setMarkColor(color)}
                            />
                            </Grid>
        </Grid>
        </Stack>
    </> 
        
    )
}


export default CreateEditComplex