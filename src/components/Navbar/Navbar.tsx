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
import { Button, ListItemIcon } from '@mui/material';
import { actionCreators } from '../../state/';
import { makeStyles } from '@mui/material';
import { Theme } from '@mui/material';
import { Login, PersonAddAltRounded } from '@mui/icons-material';
import { logOutFetch } from '../../api/auth';

export default function Navbar() {
  const auth = useSelector((state: RootState) => state).auth
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const { login, logout } = bindActionCreators(actionCreators, dispatch)
  const { showSingUp, showLogIn, hide } = bindActionCreators(actionCreators, dispatch)

  const handleLogOut = async () => {
    logOutFetch().then(Response => {
        logout(Response.id, Response.isGuest,  Response.name)
    })
    hide()
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meme Bingo
          </Typography>
         
            <div className='rightNavbarBlock'>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {auth['isGuest'] ? 'Guest' : <label>{auth['name']}</label>}
                  {!auth['id'] && !auth['isGuest'] ? 
                   <Button
                   key='{page}'
                   onClick={showSingUp}
                   sx={{ mt: 0.5, color: 'white', display: 'block' }}
                 >
                   Register
                 </Button>
                   : <div></div>}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
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
                              <MenuItem onClick={handleClose}>My Cards</MenuItem>
                              <MenuItem onClick={handleClose}>My Games</MenuItem> 
                            </div>
                          : 
                        <div></div>} 
                        {!auth['id'] 
                          ?  
                              <div>
                                <MenuItem onClick={() =>{showSingUp(); handleClose()}}>
                                <ListItemIcon>
                                  <PersonAddAltRounded fontSize="small" />
                                </ListItemIcon>
                                  Sigh Up
                                </MenuItem>
                                <MenuItem onClick={() =>{showLogIn(); handleClose()}}>
                                  <ListItemIcon>
                                    <Login fontSize="small" />
                                  </ListItemIcon>
                                  Log In
                                </MenuItem>
                              </div>
                          : 
                        <div></div>} 
                        {auth['id']  ? <MenuItem onClick={() =>{handleLogOut(), handleClose()}} >Log Out</MenuItem> :  <div></div>} 
              </Menu>
            
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
