import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useMemo } from 'react';
import CardType from '../../types/CardType';
import { deleteCardsFetch, getCardFetch, getMyGamesByCardFetch } from '../../api/game';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../state';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, Chip, Divider, Stack } from '@mui/material';
import isOwned from '../../utils/isOwned';
import { RootState } from '../../state/reducers';

const CardGamesPlate = ({index, id}:{index: number, id: string}) => {

        interface ExpandMoreProps extends IconButtonProps {
            expand: boolean;
        }
        const auth = useSelector((state: RootState) => state).auth
        const [title, setTitle] = useState<string>()
        const [gamesList, setGamesList] = useState<any[]>([])
        const [description, setDescription] = useState<string>()
        const [ownerId, setOwnerId] = useState<string>('')
        const [tags, setTags] = useState<string[]>([])
        const navigate = useNavigate();
        const { pathname } = useLocation();
        const dispatch = useDispatch();
        const { errorOn, errorOff } = bindActionCreators(actionCreators, dispatch)
        const ExpandMore = styled((props: ExpandMoreProps) => {
            const { expand, ...other } = props;
            return <IconButton {...other} />;
        })(({ theme, expand }) => ({
            transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
            }),
        }));
       
        useMemo(() =>  {getCardFetch(id).then(Response => {
            console.log(id)
            if (Response) {
                console.log(Response)
                    setTitle(Response.title) 
                    setDescription(Response.description) 
                    setTags(Response.tags)
                    setOwnerId(Response.authorId)
            } else {
                navigate(`..`); 
                errorOn('Card not found! It may be deleted or URL is not right.')
            }
        })}, []);

        useMemo(() =>  {getMyGamesByCardFetch(id, auth['id']).then(Response => {
            setGamesList(Response.reverse())
         })}, []);

         const games = gamesList.map((game, index) =>
         <>
            <button
            onClick={() =>{handleGoToGame(game.id)}}
            >
                <Typography sx={{color:'#fff'}} key={index}>
                    <p  style={{width: '100%'}}>Game {index + 1} </p>  
                </Typography>
            </button>
            <Divider />
         
         </>
        );


        const tagChips = tags.map((tag, index) =>
                <Chip sx={{marginTop: 0.5}}color='primary' variant="outlined" label={tag} key={index} />   
            );

      
        const [expanded, setExpanded] = React.useState(false);
      
        const handleExpandClick = () => {
          setExpanded(!expanded);
        };

        const handlePlayCard = async () => {
                navigate('/card/' + id + '/gamestart'); 
        } 
        const handleGoToGame = async (id: string) => {
            navigate('/game/' + id); 
        } 

        const handleDeleteCard = async (e: React.FormEvent) => {
            e.preventDefault()
            deleteCardsFetch(id, auth['id']).then(Response => {
                navigate('..'); 
        })} 
        const handleEditCard = async (e: React.FormEvent) => {
                e.preventDefault()
                    navigate('/card/edit/' + id); 
        } 

    return (
        <Card key={index} sx={{ width: 1000, backgroundColor: '#273049'}}>
            <Stack direction='row' sx={{justifyContent: 'space-between'}}>
            <CardHeader
                title={title ? title : 'No title'}
                subheader={ownerId}
                sx={{wordWrap: "break-word",  overflow: 'hidden', width: 700, height: 100, }}
            />  
            <Stack direction='column' sx={{margin: 2}}>
            <div>
                {isOwned(ownerId)?
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                onClick={handleEditCard}
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                            
                                >
                                    <EditIcon  fontSize="large" style={{ color: "#fff"}}></EditIcon>
                    </Button>
                    :
                    <></>
                }
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                >
                                    <ShareIcon fontSize="large" style={{ color: "#fff"}}></ShareIcon>
                    </Button>
                {isOwned(ownerId)?
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                onClick={handleDeleteCard}
                                variant="outlined"
                                sx={{ marginTop: 1, marginLeft: 1}}
                                
                                >
                                    <DeleteIcon fontSize="large" style={{ color: "#fff"}}></DeleteIcon>
                    </Button>
                    :
                    <></>
                }
            </div>
            <Button
                            size="medium"
                            aria-haspopup="true"
                            aria-label="password requirements"
                            onClick={handlePlayCard}
                            color="primary"
                            variant="outlined"
                            sx={{ marginTop: 1, marginLeft: 1, width: 208}}
                            >
                                <PlayArrowIcon  fontSize="large" style={{ color: "#fff" }}></PlayArrowIcon>
            </Button>

          </Stack>
            </Stack>
            <CardContent sx={{paddingY: 0}}>
                <Stack direction='row' sx={{justifyContent: 'space-between'}}>
                <Typography sx={{maxWidth: 968, maxHeight: 100, wordWrap: "break-word",  overflow: 'hidden' ,marginBottom: 2}} variant="body2" color="text.secondary">
                {description ? description : 'No description'}
                </Typography>
                  </Stack>
                  {tagChips}
            </CardContent>
            <CardActions disableSpacing>
               
                {gamesList.length >= 1 ?
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
                
                : <></>
                }
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{paddingTop: 0}}>
                    {games}
                </CardContent>
            </Collapse>
        </Card>

    )
}

export default CardGamesPlate