import './Navbar.scss';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';
import { useEffect, useState } from 'react';
import { Button, Divider, ListItemIcon, Stack } from '@mui/material';
import { actionCreators } from '../../state/';
import { makeStyles } from '@mui/material';
import { Theme, Link } from '@mui/material';
import { Login, PersonAddAltRounded } from '@mui/icons-material';
import { logOutFetch } from '../../api/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import StyleIcon from '@mui/icons-material/Style';
import GamesIcon from '@mui/icons-material/Games';


export default function Navbar() {
  const auth = useSelector((state: RootState) => state).auth
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login, logout } = bindActionCreators(actionCreators, dispatch)
  const { showSingUp, showLogIn, hide } = bindActionCreators(actionCreators, dispatch)

  const handleLogOut = async () => {
    logOutFetch().then((Response: XMLHttpRequest["response"]) => {
        logout(Response.data.id, Response.data.isGuest,  Response.data.name)
    })
    hide()
  };
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCreateCard = (event: React.MouseEvent<HTMLElement>) => {
    navigate('/card/create')
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleToMyCards = () => {
    navigate('/mycards/1')
  };
  const handleToMyGames = () => {
    navigate('/mygames/1')
  };
  const handleToLanding = () => {
    navigate('/')
  };
  

 


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <Button
              onClick={handleToLanding}
              color="primary"
              sx={{ color: 'white', display: 'block', height: 64, textTransform: 'none'}}
            >
            <Typography title={'XD'} variant="h6"  sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 16, minWidth: '92px'}}>
                    Meme Bingo
            </Typography>
        </Button>
          
            <div className='rightNavbarBlock'>
              <Stack direction="row" >
                 <Button
                      onClick={handleCreateCard}
                      color="primary"
                      sx={{textTransform: 'none', color: 'white', display: 'block', height: 64}}
                    >
                   <Typography title={'Go to creating card'} variant="h6"  sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 16, minWidth: '85px'}}>
                    Create card
                   </Typography>
                 </Button>
                 
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                color="inherit"
                title={'Open menu'}
                sx={{aspectRatio: 1/1, width: 60, height: 60}}
              >
                <AccountCircle sx={{width: 32, height: 32}} />
              </IconButton>
              </Stack>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                transitionDuration = {100}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    backgroundColor: '#252e41',
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: '#252e41',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                        {auth['id']  || auth['isGuest']
                          ?  
                            <div>
                              <MenuItem onClick={() =>{handleToMyCards(); handleCloseMenu()}}>
                                <ListItemIcon>
                                  <StyleIcon fontSize="small" />
                                </ListItemIcon>
                                My Cards
                              </MenuItem>
                              <MenuItem onClick={() =>{handleToMyGames(); handleCloseMenu()}}>
                                <ListItemIcon>
                                  <GamesIcon fontSize="small" />
                                </ListItemIcon>
                                My Games
                              </MenuItem> 
                            </div>
                          : 
                        <div></div>} 
                        {!auth['id'] || auth['isGuest']
                          ?  
                              <div>
                                <MenuItem onClick={() =>{showSingUp(); handleCloseMenu()}}>
                                <ListItemIcon>
                                  <PersonAddAltRounded fontSize="small" />
                                </ListItemIcon>
                                  Sigh Up
                                </MenuItem>
                                <MenuItem onClick={() =>{showLogIn(); handleCloseMenu()}}>
                                  <ListItemIcon>
                                    <Login fontSize="small" />
                                  </ListItemIcon>
                                  Log In
                                </MenuItem>
                              </div>
                          : 
                        <div></div>} 
                        {auth['id'] && !auth['isGuest'] ? <MenuItem onClick={() =>{handleLogOut(), handleCloseMenu()}} >
                          <ListItemIcon>
                              <LogoutIcon fontSize="small" />
                          </ListItemIcon>
                          Log Out
                          </MenuItem> :  <div></div>} 
                          {auth['name'] ?
                          <MenuItem>
                          <Typography title={'Hello, ' + auth['name'] + '!'}   sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginBottom: 0.5}}>
                            {auth['name']}
                          </Typography>
                          </MenuItem> 
                          : <></>
                          }
              </Menu>
            
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
