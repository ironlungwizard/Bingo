import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Paper, Grid, Typography, styled, Button} from '@mui/material';
import { useState } from 'react';
import tileX from '../../images/tileX.svg?url'


const BingoField = ({title, setTitle, backgroundColor, tilesColor, textColor, phrases, headerEditable, isAGame, playable, checkedArray, setCheckedArray, fontSizes}:
    {title: string, setTitle: Function, backgroundColor: string, tilesColor: string, textColor: string, phrases: string[], 
        headerEditable: boolean, isAGame: boolean, playable: boolean, checkedArray?: number[], setCheckedArray?: Function, fontSizes: string[]}) => {
        

        const ButtonItem = styled(Button)(({ theme }) => ({
            backgroundColor: tilesColor,
            ...theme.typography.body2,
            textAlign: 'center',
            padding: 0,
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

        var fontSizeDummy: string[]  
        if (!fontSizes){
            fontSizeDummy = Array(25).fill('1.25rem');
        } else {
            fontSizeDummy = fontSizes
        }

        var linesCount = Array(25).fill('3');
        fontSizeDummy.forEach((value: string, index: number) => {
            if (value == '0.90rem') {
                linesCount[index] = 5
            } else if (value == '1rem') {
                linesCount[index] = 4
            } else if (value == '1.25rem') {
                linesCount[index] = 5
            }  
        });


        const blankArray = Array(25).fill('');
        var listItems
        if (phrases){
        listItems = phrases.fill(' ', phrases.length, 25).slice(0, 25).concat(blankArray.slice(phrases.length, 25)).map((phrase, index) =>
            <Grid xs={5} key={index} item >
                { playable ? 
                <ButtonItem sx={{aspectRatio: '1/1', width: '95%',  alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '8px'}} onClick={() => handleToggleTile(index)}>
                    <Typography 
                        variant="h6" 
                        style={{ wordWrap: "break-word", padding: 5}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        fontSize: fontSizeDummy[index],
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: linesCount[index],
                        color: textColor
                        }} 
                        title={phrase}
                        component="div">
                            {phrase}
                    </Typography >
                    { checkedArray && checkedArray.includes(index) ?
                        <img src={tileX} style={{position: 'absolute', marginLeft:0, opacity: '0.5'}}/>
                        :<></>
                    } 
                </ButtonItem>
                : 
                <PaperItem sx={{aspectRatio: '1/1', width: '95%',  alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '8px'}}>
                    <Typography 
                        variant="h6" 
                        style={{ wordWrap: "break-word", padding: 5}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        fontSize: fontSizeDummy[index],
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: linesCount[index],
                        color: textColor
                        }} 
                        title={phrase}
                        component="div">
                            {phrase}
                    </Typography > 
                </PaperItem>
                }
            </Grid>
        );}
    return (
        <div style={{width: '626px', height: '711px'}}>
          <Box sx={{ width: '100%', padding: 1, paddingBottom: 0, backgroundColor: backgroundColor}}>
                <Paper sx={{marginBottom: 1, height: 70, backgroundColor: tilesColor, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {headerEditable ?
                    <TextField 
                        margin="dense"
                        value={title} 
                        onChange={(e) => {setTitle(e.target.value)}} 
                        fullWidth 
                        id="Header" 
                        title={title}
                        autoFocus={false}
                        size='small' 
                        sx={{input: {wordWrap: "break-word",  overflow: 'hidden',textAlign: "center", fontSize: 25, color: textColor, WebkitLineClamp: 2}, paddingX: 1}}> 
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
                        fontSize: 25,
                        }} 
                        title={title}
                        component="div">
                            {title}
                    </Typography > 
                    }
                </Paper>
                <Grid  container  columns={25} sx={{margin: 0, width: 'calc(100% + 6px)'}}>
                    {listItems}
                </Grid>
                
        </Box>
        </div> 
    )
}

export default BingoField