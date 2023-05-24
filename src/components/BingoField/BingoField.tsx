import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Paper, Grid, Typography, styled} from '@mui/material';


const BingoField = ({header, setHeader, backgroundColor, tilesColor, textColor, phrases, headerEditable}:
    {header: string, setHeader: Function, backgroundColor: string, tilesColor: string, textColor: string, phrases: string[], headerEditable: boolean}) => {

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: tilesColor,
            ...theme.typography.body2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
            paddingLeft: 0
          }));
        const blankArray = Array(25).fill('');
        var listItems
        if (phrases){
        listItems = phrases.fill(' ', phrases.length, 25).slice(0, 25).concat(blankArray.slice(phrases.length, 25)).map((phrase, index) =>
     
            <Grid xs={5} key={index} item >
                <Item sx={{aspectRatio: '1/0.95', width: '88%',  alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '13px'}}>
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
                </Item>
            </Grid>
        );}


    return (
        <>
          <Box sx={{  height: '70vh', aspectRatio: '1/1.1', padding: 2, backgroundColor: backgroundColor}}>
                <Paper sx={{marginBottom: 2, height: 70, backgroundColor: tilesColor, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {headerEditable ?
                    <TextField 
                        margin="dense"
                        value={header} 
                        onChange={(e) => {setHeader(e.target.value)}} 
                        fullWidth 
                        id="Header" 
                        autoFocus={false}
                        size='small' 
                        sx={{input: {textAlign: "center", fontSize: 25, color: textColor}, paddingX: 1}}> 
                    </TextField>
                    :
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
                            {header}
                    </Typography > 
                    }
                </Paper>
                <Grid  container  columns={25} sx={{margin: 0, width: 'calc(100% + 14px)'}}>
                    {listItems}
                </Grid>
                
        </Box>
        </> 
    )
}

export default BingoField