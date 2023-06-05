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
import { Theme } from '@mui/material';
import { Login, PersonAddAltRounded } from '@mui/icons-material';
import { logOutFetch } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const auth = useSelector((state: RootState) => state).auth
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login, logout } = bindActionCreators(actionCreators, dispatch)
  const { showSingUp, showLogIn, hide } = bindActionCreators(actionCreators, dispatch)

  const handleLogOut = async () => {
    logOutFetch().then(Response => {
        logout(Response.id, Response.isGuest,  Response.name)
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
  

 


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meme Bingo
          </Typography>
         
            <div className='rightNavbarBlock'>
              <Stack direction="row" >
                 <Button
                      onClick={handleCreateCard}
                      color="primary"
                      sx={{ color: 'white', display: 'block', height: 64}}
                    >
                   <Typography variant="h6"  sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 16}}>
                    Create card
                   </Typography>
                 </Button>
                 
                 <Typography variant="h5"  sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginX: 2, marginBottom: 0.5}}>
                  {auth['isGuest'] ? auth['name'] : auth['name']}
                 </Typography>
               
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                color="inherit"
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
                    width: 148,
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
                              <MenuItem onClick={() =>{handleToMyCards(); handleCloseMenu()}}>My Cards</MenuItem>
                              <MenuItem onClick={() =>{handleToMyGames(); handleCloseMenu()}}>My Games</MenuItem> 
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
                        {auth['id'] && !auth['isGuest'] ? <MenuItem onClick={() =>{handleLogOut(), handleCloseMenu()}} >Log Out</MenuItem> :  <div></div>} 
              </Menu>
            
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
