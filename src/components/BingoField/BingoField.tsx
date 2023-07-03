import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Paper, Grid, Typography, styled, Button} from '@mui/material';
import { useState } from 'react';
import TileX from '../../images/TileX';


const BingoField = ({title, setTitle, backgroundColor, tilesColor, textColor, markColor, phrases, headerEditable, isAGame, playable, checkedArray, setCheckedArray, fontSizes}:
    {title: string, setTitle: Function, backgroundColor: string, tilesColor: string, textColor: string, markColor: string, phrases: string[], 
        headerEditable: boolean, isAGame: boolean, playable: boolean, checkedArray?: number[], setCheckedArray?: Function, fontSizes: number[]}) => {
        

        const ButtonItem = styled(Button)(({ theme }) => ({
            backgroundColor: tilesColor,
            ...theme.typography.body2,
            textAlign: 'center',
            padding: 0,
            textTransform: 'none',
            borderRadius: '8px',
            ":hover": {
                backgroundColor: tilesColor
            }
          }));
          const PaperItem = styled(Paper)(({ theme }) => ({
            backgroundColor: tilesColor,
            ...theme.typography.body2,
            textAlign: 'center',
            borderRadius: '8px',
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

        var fontSizeDummy: number[]  
        if (!fontSizes){
            fontSizeDummy = Array(25).fill(1.25);
        } else {
            fontSizeDummy = fontSizes
        }

        var linesCount = Array(25).fill('3');
        fontSizeDummy.forEach((value: number, index: number) => {
            if (value == 0.90) {
                linesCount[index] = 5
            } else if (value == 1) {
                linesCount[index] = 4
            } else if (value == 1.25) {
                linesCount[index] = 5
            }  
        });

        const blankArray = Array(25).fill('');
        var listItems
        if (phrases){
        listItems = phrases.fill(' ', phrases.length, 25).slice(0, 25).concat(blankArray.slice(phrases.length, 25)).map((phrase, index) =>
            <Grid xs={5} key={index} item >
                { playable ? 
                <ButtonItem sx={{aspectRatio: '1/1', width: {xs: '67px', sm: '117px'},  alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: {xs: '3px', sm: '6px'}, 
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}} onClick={() => handleToggleTile(index)}>
                    <Typography 
                        variant="h6" 
                        style={{ wordWrap: "break-word", padding: 5}} 
                        sx={{display: '-webkit-box', 
                       
                        overflow: 'hidden', 
                        fontSize: {xs: fontSizeDummy[index] * 0.6 + 'rem', sm: fontSizeDummy[index] + 'rem'},
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: linesCount[index],
                        color: textColor
                        }} 
                        title={phrase}
                        component="div">
                            {phrase}
                    </Typography >
                    { checkedArray && checkedArray.includes(index) ?
                    <>
                        <TileX  color={markColor}></TileX>
                    </>
                        :<></>
                    } 
                </ButtonItem>
                : 
                <PaperItem sx={{aspectRatio: '1/1', width: {xs: '67px', sm: '117px'},  alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundImage: 'none', marginBottom: {xs: '3px', sm: '6px'}}}>
                    <Typography 
                        variant="h6" 
                        style={{ wordWrap: "break-word", padding: 5}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        fontSize: {xs: fontSizeDummy[index] * 0.6 + 'rem', sm: fontSizeDummy[index] + 'rem'},
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
        <Box sx={{width: {xs: '360px', sm: '626px'},  height: {xs: '426px', sm: '711px'}}}>
          <Box sx={{ width: '100%', padding: {xs: 0.5, sm: 1}, paddingBottom: '3px', backgroundColor: backgroundColor}}>
                <Paper sx={{marginBottom: {xs: 0.5, sm: 1}, height: {xs: 50, sm: 70}, backgroundColor: tilesColor, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'none', borderRadius: '8px'}}>
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
                        sx={{input: {wordWrap: "break-word",  overflow: 'hidden',textAlign: "center", 
                        fontSize: {xs: 18, sm: 25}, color: textColor, WebkitLineClamp: 2}, paddingX: 1, marginY: 1}}> 
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
                        fontSize: {xs: 18, sm: 25},
                        
                        }} 
                        title={title}
                        component="div">
                            {title}
                    </Typography > 
                    }
                </Paper>
                <Grid  container  columns={25} sx={{margin: 0, width: {xs: 'calc(100% + 4.5px)', sm: 'calc(100% + 6.5px)'}}}>
                    {listItems}
                </Grid>
                
        </Box>
        </Box> 
    )
}

export default BingoField