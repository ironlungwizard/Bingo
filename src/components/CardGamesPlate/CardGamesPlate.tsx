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
import { canEditCardFetch, canShareCardFetch, deleteCardsFetch, getCardFetch, getMyGamesByCardFetch } from '../../api/game';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../state';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Badge, Button, Chip, Divider, Stack } from '@mui/material';
import isOwned from '../../utils/isOwned';
import { RootState } from '../../state/reducers';
import { getAttributesById } from '../../api/auth';
import ModalDeleteConfirm from '../../ModalDeleteConfirm/ModalDeleteConfirm';

const CardGamesPlate = ({index, id, deleteCard}:{index: number, id: string, deleteCard: Function}) => {
        interface ExpandMoreProps extends IconButtonProps {
            expand: boolean;
        }
        const auth = useSelector((state: RootState) => state).auth
        const [title, setTitle] = useState<string>()
        const [ownerName, setOwnerName] = useState<string>('')
        const [canEdit, setCanEdit] = useState<boolean>(true)
        const [gamesList, setGamesList] = useState<any[]>([])
        const [description, setDescription] = useState<string>()
        const [ownerId, setOwnerId] = useState<string>('')
        const [tags, setTags] = useState<string[]>([])
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const [openModal, setOpenModal] = useState<boolean>(false);
        const { pathname } = useLocation();
        const frontUrl = process.env.REACT_APP_FRONT_URL
        const { infoOn, infoOff, showSingUp, showLogIn, hide } = bindActionCreators(actionCreators, dispatch)
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
        useMemo(() =>  {getCardFetch(id).then((Response: XMLHttpRequest["response"]) => {
            if (Response) {
                    setTitle(Response.data.title) 
                    setDescription(Response.data.description) 
                    setTags(Response.data.tags)
                    setOwnerId(Response.data.authorId)
                    getAttributesById(Response.data.authorId).then((Response: XMLHttpRequest["response"]) => {
                        setOwnerName(Response.data.name)
                     })
            } else {
                navigate(`..`); 
                infoOn('Card not found! It may be deleted or URL is not right.', 'error')
            }
        })}, [id]);

        useMemo(() =>  {getMyGamesByCardFetch(id, auth['id']).then((Response: XMLHttpRequest["response"]) => {
            setGamesList(Response.data.reverse())
         })}, []);
         

         useMemo(() =>  {canEditCardFetch(id).then((Response: XMLHttpRequest["response"]) => {
            setCanEdit(Response.data)
         })}, []);

         const games = gamesList.map((game, index) =>
         <div key={index}>
            <button
            onClick={() =>{handleGoToGame(game.id)}} 
            >
                <Typography sx={{color:'#fff',width: '100%'}}>
                    Game {index + 1}
                </Typography>
            </button>
            <Divider />
         
         </div>
        );


        const tagChips = tags.map((tag, index) =>
                <Chip sx={{marginTop: 0.5}}color='primary' variant="outlined" label={tag} key={index} />   
            );

      
        const [expanded, setExpanded] = React.useState(false);
      
        const handleShareCard = async () => {
            if (auth['isGuest'] || !auth['id'] ) {
              showSingUp()
            } else { 
            var canShare = false
            canShareCardFetch(id!).then((Response: XMLHttpRequest["response"]) => {
                canShare = Response.data
                if (canShare) {
                    navigator.clipboard.writeText(frontUrl+'/card/'+id)
                  }
            })
            }
    } 

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
            deleteCard(id)
        }
        const handleToCard = async (e: React.FormEvent) => {
                e.preventDefault()
                    navigate('/card/' + id); 
        } 

    return (
        <Card key={index} sx={{ width: {xs: '360px', sm: '620px', lg: '1000px'}, backgroundColor: '#273049'}}>
            <ModalDeleteConfirm deleteFunction={handleDeleteCard} open={openModal} setOpen={setOpenModal}></ModalDeleteConfirm>
            <Stack direction='row' sx={{justifyContent: 'space-between'}}>
            <CardHeader
                title={title ? title : 'No title'}
                subheader={ownerName}
                sx={{wordWrap: "break-word",  overflow: 'hidden', width: 700, height: 100, }}
            />  
            <Stack direction='column' sx={{margin: 2}}>
            <div>
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                onClick={handleToCard}
                                variant="outlined"
                                title={'View card'}
                                sx={{ marginTop: 1, marginLeft: 1, paddingLeft: {xs: '5px', lg: '15px'}, paddingRight: {xs: '5px', lg: '15px'}, minWidth: {xs: '30px', lg: '64px'}}}
                            
                                >
                                    <PreviewIcon  fontSize="large" style={{ color: "#fff"}}></PreviewIcon>
                    </Button>
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                onClick={handleShareCard}
                                variant="outlined"
                                title={'Share card'}
                                sx={{ marginTop: 1, marginLeft: 1, paddingLeft: {xs: '5px', lg: '15px'}, paddingRight: {xs: '5px', lg: '15px'}, minWidth: {xs: '30px', lg: '64px'}}}
                                >
                                    <ShareIcon fontSize="large" style={{ color: "#fff"}}></ShareIcon>
                    </Button>
                {isOwned(ownerId)?
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                onClick={() => {setOpenModal(true)}}
                                variant="outlined"
                                title={'Delete card'}
                                sx={{ marginTop: 1, marginLeft: 1, paddingLeft: {xs: '5px', lg: '15px'}, paddingRight: {xs: '5px', lg: '15px'}, minWidth: {xs: '30px', lg: '64px'}}}
                                
                                >
                                    <DeleteIcon fontSize="large" style={{ color: "#fff"}}></DeleteIcon>
                    </Button>
                    :
                    <Button
                                size="medium"
                                aria-haspopup="true"
                                color="primary"
                                variant="outlined"
                                title={'Delete card'}
                                disabled
                                sx={{ marginTop: 1, marginLeft: 1, paddingLeft: {xs: '5px', lg: '15px'}, paddingRight: {xs: '5px', lg: '15px'}, minWidth: {xs: '30px', lg: '64px'}}}
                            
                                >
                                    <DeleteIcon  fontSize="large" style={{ color: "#fff"}}></DeleteIcon>
                    </Button>
                }
            </div>
            <Button
                            size="medium"
                            aria-haspopup="true"
                            aria-label="password requirements"
                            onClick={handlePlayCard}
                            title={'Play'}
                            color="primary"
                            variant="outlined"
                            sx={{ marginTop: 1, marginLeft: 1, width: {xs: '144px', lg: '208px'}}}
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
                <Badge color="primary" badgeContent={expanded ? 0 : gamesList.length}>
                <ExpandMoreIcon fontSize="large" />
                </Badge>
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