import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Paper, Grid, Typography, styled, Button} from '@mui/material';
import { useState } from 'react';
import tileX from '../../images/tileX.svg?url'


const BingoField = ({title, setTitle, backgroundColor, tilesColor, textColor, phrases, headerEditable, isAGame, playable, checkedArray, setCheckedArray}:
    {title: string, setTitle: Function, backgroundColor: string, tilesColor: string, textColor: string, phrases: string[], 
        headerEditable: boolean, isAGame: boolean, playable: boolean, checkedArray?: number[], setCheckedArray?: Function}) => {
        const ButtonItem = styled(Button)(({ theme }) => ({
            backgroundColor: tilesColor,
            ...theme.typography.body2,
            textAlign: 'center',
            paddingLeft: 0,
            textTransform: 'none',
            ":hover": {
                backgroundColor: tilesColor
            }
          }));
          const PaperItem = styled(Paper)(({ theme }) => ({
            backgroundColor: tilesColor,
            ...theme.typography.body2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
            paddingLeft: 0
          }));

          const handleToggleTile =  (index: number) => {
            if (checkedArray && setCheckedArray) {
                var array = [...checkedArray]
                if (array.includes(index)) {
                    var indexToRemove = array.indexOf(index);
                    if (index !== -1) {
                        array.splice(indexToRemove, 1);
                      }
                } else {
                    array.push(index)
                }
                setCheckedArray(array)
            }
            } 


        const blankArray = Array(25).fill('');
        var listItems
        if (phrases){
        listItems = phrases.fill(' ', phrases.length, 25).slice(0, 25).concat(blankArray.slice(phrases.length, 25)).map((phrase, index) =>
            <Grid xs={5} key={index} item >
                { playable ? 
                <ButtonItem sx={{aspectRatio: '1/1', width: '88%',  alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '13px'}} onClick={() => handleToggleTile(index)}>
                    <Typography 
                        variant="h6" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        color: textColor
                        }} 
                        component="div">
                            {phrase}
                    </Typography >
                    { checkedArray && checkedArray.includes(index) ?
                        <img src={tileX} style={{position: 'absolute', marginLeft: 6, opacity: '0.5'}}/>
                        :<></>
                    } 
                </ButtonItem>
                : 
                <PaperItem sx={{aspectRatio: '1/1', width: '88%',  alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '13px'}}>
                    <Typography 
                        variant="h6" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        color: textColor
                        }} 
                        component="div">
                            {phrase}
                    </Typography > 
                </PaperItem>
                }
            </Grid>
        );}
    return (
        <div style={{width: '626px'}}>
          <Box sx={{ width: '100%', padding: 2, backgroundColor: backgroundColor}}>
                <Paper sx={{marginBottom: 2, height: 70, backgroundColor: tilesColor, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {headerEditable ?
                    <TextField 
                        margin="dense"
                        value={title} 
                        onChange={(e) => {setTitle(e.target.value)}} 
                        fullWidth 
                        id="Header" 
                        autoFocus={false}
                        size='small' 
                        sx={{input: {wordWrap: "break-word",  overflow: 'hidden',textAlign: "center", fontSize: 25, color: textColor}, paddingX: 1}}> 
                    </TextField>
                    :
                    <Typography 
                        variant="h4" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{ marginX: 1, wordWrap: "break-word",  display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        color: textColor, 
                        fontSize: 25
                        }} 
                        component="div">
                            {title}
                    </Typography > 
                    }
                </Paper>
                <Grid  container  columns={25} sx={{margin: 0, width: 'calc(100% + 14px)'}}>
                    {listItems}
                </Grid>
                
        </Box>
        </div> 
    )
}

export default BingoField